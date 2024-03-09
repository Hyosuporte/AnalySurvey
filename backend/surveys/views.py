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


@api_view(['GET', 'DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def form(request, pk):
    if request.method == 'GET':
        form = get_object_or_404(Formulario, pk=pk)
        serializer = FormSerializer(form)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'DELETE':
        form = get_object_or_404(Formulario, pk=pk)
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

    print(request.data)
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
