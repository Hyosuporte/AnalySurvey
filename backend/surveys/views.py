from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from .models import Formulario
from .models import CampoFormulario
from .models import OpcionCampoFormulario
from .serializers import FormSerializer
from .serializers import CampoFormularioSerializer
from .serializers import OpcionCampoFormularioSerializer


@api_view(['GET', 'DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def form(request, pk):
    if request.method == 'GET':
        form = get_object_or_404(Formulario, pk=pk)
        serializer = FormSerializer(form)
        if form.creador != request.user:
            return Response({"message": "No authorizado para elminar el formulario"}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'DELETE':
        form = get_object_or_404(Formulario, pk=pk)
        if form.creador != request.user:
            return Response({"message": "No authorizado para elminar el formulario"}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            campo = form.campos.first()
            if campo:
                if campo.opciones.exists():
                    campo.opciones.all().delete()
            if campo:
                if campo.respuestas.exists():
                    campo.respuestas.all().delete()
        except CampoFormulario.DoesNotExist:
            pass

        form.campos.all().delete()
        form.delete()
        return Response({"message": "El formulario fue eliminado con exito"}, status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def duplicate_form(request, pk):
    form_origen = get_object_or_404(Formulario, pk=pk)
    new_form = Formulario.objects.create(
        titulo=f"{form_origen.titulo} (Copia)",
        descripcion=form_origen.descripcion,
        creador=request.user
    )

    for campo_origen in form_origen.campos.all():
        new_campo = CampoFormulario.objects.create(
            titulo=campo_origen.titulo,
            requerido=campo_origen.requerido,
            deshabilitado=campo_origen.deshabilitado,
            formulario=new_form,
            tipoPregunta=campo_origen.tipoPregunta,
            orden=campo_origen.orden
        )

        for opcion_origen in campo_origen.opciones.all():
            OpcionCampoFormulario.objects.create(
                titulo=opcion_origen.titulo,
                valor=opcion_origen.valor,
                campoFormulario=new_campo
            )

    serializer = FormSerializer(new_form)
    return Response({"message": "Formulario duplicado con exito"}, status=status.HTTP_201_CREATED)


@api_view(['PATCH'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def update_form_title(request, pk):
    form = get_object_or_404(Formulario, pk=pk)

    if request.user != form.creador:
        return Response({"message": "No Authorizado para la informazion"}, status=status.HTTP_401_UNAUTHORIZED)

    serializer = FormSerializer(form, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Formulario Actualizado"}, status=status.HTTP_200_OK)
    else:
        return Response({serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def create_form(request):
    new_form = Formulario.objects.create(
        titulo="Nuevo formulario",
        descripcion=" ",
        creador=request.user
    )

    serializer = FormSerializer(new_form)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def actualizar_formulario(request, pk):
    form = get_object_or_404(Formulario, pk=pk)

    if request.user != form.creador:
        return Response({"message": "No Authorizado para la informazion"}, status=status.HTTP_403_FORBIDDEN)

    datos_formulario = request.data

    # Actualizar el formulario
    serializer = FormSerializer(form, data=datos_formulario)
    if serializer.is_valid():
        serializer.save()

        for datos_campo in datos_formulario.get('campos', []):
            campo_id = datos_campo.get('id')
            campo = get_object_or_404(
                CampoFormulario, id=campo_id, formulario=form)

            if campo.formulario != form:
                return Response({'message': 'El campo no pertenece a este formulario'}, status=status.HTTP_400_BAD_REQUEST)

            campo_serializer = CampoFormularioSerializer(
                campo, data=datos_campo)
            if campo_serializer.is_valid():
                campo_serializer.save()

                opciones_campo = datos_campo.get('opciones', [])
                for datos_opcion in opciones_campo:

                    opcion_id = datos_opcion.get('id')
                    print(opcion_id, campo.id)
                    opcion = get_object_or_404(
                        OpcionCampoFormulario, id=opcion_id, campoFormulario=campo)

                    # Asegurarse de que la opción pertenezca al campo
                    if opcion.campoFormulario != campo:
                        return Response({'message': 'La opción no pertenece a este campo'}, status=status.HTTP_400_BAD_REQUEST)

                    # Actualizar la opción
                    opcion_serializer = OpcionCampoFormularioSerializer(
                        opcion, data=datos_opcion)
                    if opcion_serializer.is_valid():
                        opcion_serializer.save()
                    else:
                        return Response({'message': 'Error al actualizar la opción del campo'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'message': 'Error al actualizar el campo del formulario'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'message': 'Formulario, campos y opciones actualizados correctamente'})
    else:
        return Response({'message': 'Error al actualizar el formulario'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def create_option(request, pk):
    campo = get_object_or_404(CampoFormulario, pk=pk)
    if campo.formulario.creador != request.user:
        return Response({"message": "No authorizado para crear la opcion"}, status=status.HTTP_401_UNAUTHORIZED)

    datos_option = request.data
    datos_option["campoFormulario"] = campo.id

    serializer = OpcionCampoFormularioSerializer(data=datos_option)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response({"message": "Error al crear la opcion"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PATCH'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def update_campo(request, pk):
    campo = get_object_or_404(CampoFormulario, pk=pk)
    if campo.formulario.creador != request.user:
        return Response({"message": "No authorizado para actualizar el campo"}, status=status.HTTP_401_UNAUTHORIZED)
    serializer = CampoFormularioSerializer(campo, data=request.data)
    print(serializer.is_valid())
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Campo Actualizado"}, status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def delete_option(request, pk):
    option = get_object_or_404(OpcionCampoFormulario, pk=pk)
    if option.campoFormulario.formulario.creador != request.user:
        return Response({"message": "No authorizado para crear la opcion"}, status=status.HTTP_401_UNAUTHORIZED)

    option.delete()
    return Response({"message": "La opcion fue eliminado con exito"}, status=status.HTTP_204_NO_CONTENT)


@api_view(['PATCH'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def update_option(request, pk):
    option = get_object_or_404(OpcionCampoFormulario, pk=pk)
    if option.campoFormulario.formulario.creador != request.user:
        return Response({"message": "No authorizado para actualizar la opcion"}, status=status.HTTP_401_UNAUTHORIZED)

    serializer = OpcionCampoFormularioSerializer(option, data=request.data)
    if serializer.is_valid():
        serializer.save()

        return Response({"message": "Opcion Actualizada"}, status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
