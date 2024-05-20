from uuid import UUID
from collections import defaultdict
from django.http import HttpResponse
from django.contrib.auth import get_user_model
from io import BytesIO
from openpyxl.drawing.image import Image
from openpyxl import Workbook
from scipy.stats import pearsonr
from .serializers import RespuestaFormularioSerializer
from .serializers import OpcionCampoFormularioSerializer
from .serializers import CampoFormularioSerializer
from .serializers import FormSerializer
from django.db.models import Count
from .models import RespuestaFormulario
from .models import OpcionCampoFormulario
from .models import CampoFormulario
from .models import Formulario
from rest_framework import status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view, permission_classes, authentication_classes
import numpy as np
from scipy.stats import linregress, pearsonr
import matplotlib.pyplot as plt
import matplotlib
matplotlib.use('Agg')


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
    return Response(serializer.data, status=status.HTTP_201_CREATED)


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
        return Response(serializer.data, status=status.HTTP_200_OK)
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
def create_campo(request, pk):
    form = get_object_or_404(Formulario, pk=pk)
    if form.creador != request.user:
        return Response({"message": "No authorizado para crear la opcion"}, status=status.HTTP_401_UNAUTHORIZED)

    datos_campo = request.data
    datos_campo["formulario"] = form.id

    serializer = CampoFormularioSerializer(data=datos_campo)
    if serializer.is_valid():
        serializer.save()
        if datos_campo["tipoPregunta"] == 4:
            OpcionCampoFormulario.objects.create(
                titulo=3,
                valor=3,
                campoFormulario=serializer.instance
            )
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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


@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def delete_campo(request, pk):
    campo = get_object_or_404(CampoFormulario, pk=pk)
    if campo.formulario.creador != request.user:
        return Response({"message": "No authorizado para eliminar el campo"}, status=status.HTTP_401_UNAUTHORIZED)

    campo.delete()
    return Response({"message": "El campo fue eliminado con exito"}, status=status.HTTP_204_NO_CONTENT)


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


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def save_ask(request):
    data = request.data.get("respuestas", [])
    for ask in data:
        ask['usuario'] = request.user.id
        serializer = RespuestaFormularioSerializer(data=ask)
        if serializer.is_valid():
            serializer.save()
        else:
            return Response({"message": "Error al guardar la respuesta"}, status=status.HTTP_400_BAD_REQUEST)

    return Response({"message": "Se guardo la respuesta"}, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def chart_analitys(request, pk):
    form = get_object_or_404(Formulario, pk=pk)
    if form.creador != request.user:
        return Response({"message": "No authorizado para elminar el formulario"}, status=status.HTTP_401_UNAUTHORIZED)

    has_responses = RespuestaFormulario.objects.filter(
        campoFormulario__formulario=form).exists()

    if not has_responses:
        return Response({"message": "No hay respuestas para el formulario"}, status=status.HTTP_204_NO_CONTENT)

    data = {
        "preguntas": []
    }
    for campos in form.campos.all():
        preguntas = {
            "id": campos.id,
            "titulo": campos.titulo,
            "respuestas": [],
            "total": total_res(campos),
            "tipoPregunta": campos.tipoPregunta.id,
            "correlacion": 0,
            "desviacion": 0
        }
        if campos.tipoPregunta.id == 1:
            resul_multi(preguntas, campos)
        elif campos.tipoPregunta.id == 2:
            resul_text(preguntas, campos)
        elif campos.tipoPregunta.id == 3:
            resul_check(preguntas, campos)
        elif campos.tipoPregunta.id == 4:
            result_ratin(preguntas, campos)

        data["preguntas"].append(preguntas)
    return Response(data, status=status.HTTP_200_OK)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def create_excel(request, pk):
    form = get_object_or_404(Formulario, pk=pk)
    if form.creador != request.user:
        return Response({"message": "No autorizado para crear el archivo Excel"}, status=status.HTTP_401_UNAUTHORIZED)

    preguntas = CampoFormulario.objects.filter(formulario_id=pk)
    respuestas = RespuestaFormulario.objects.filter(
        campoFormulario__formulario_id=pk)

    respuestas_por_usuario = defaultdict(lambda: defaultdict(str))

    for respuesta in respuestas:
        usuario_id = respuesta.usuario.id
        campo_id = respuesta.campoFormulario_id
        respuestas_por_usuario[usuario_id][campo_id] = respuesta.valor

    wb = Workbook()
    ws = wb.active

    encabezados = ["Usuario"] + [pregunta.titulo for pregunta in preguntas]

    ws.append(encabezados)

    for usuario_id, respuestas_usuario in respuestas_por_usuario.items():
        row = [respuestas_usuario.get(pregunta.id, "")
               for pregunta in preguntas]
        User = get_user_model()
        usuario = User.objects.get(id=usuario_id).email
        row.insert(0, usuario)
        ws.append(row)

    ws_graficos = wb.create_sheet(title="Gráficos")

    indece = 1
    for idx, pregunta in enumerate(preguntas, start=1):
        if pregunta.tipoPregunta.id != 2 and pregunta.tipoPregunta.id != 4:

            if pregunta.tipoPregunta.id == 1:
                opciones = [
                    opcion.titulo for opcion in pregunta.opciones.all()]
                respuestas_totales = total_multi(pregunta)

                plt.bar(opciones, respuestas_totales, color='skyblue')
                plt.title(pregunta.titulo)
                plt.xlabel('Opciones')
                buffer_bar = BytesIO()
                plt.savefig(buffer_bar, format='png')
                plt.close()

                colores = plt.cm.tab10(range(len(respuestas_totales)))
                plt.pie(respuestas_totales, labels=opciones, autopct='%1.1f%%',
                        colors=colores)
                plt.title(pregunta.titulo)
                plt.xlabel('Opciones')
                buffer_pie = BytesIO()
                plt.savefig(buffer_pie, format='png')
                plt.close()

                buffer_bar.seek(0)
                img_bar = Image(buffer_bar)
                ws_graficos.add_image(img_bar, f"A{indece*10}")

                buffer_pie.seek(0)
                img_pie = Image(buffer_pie)
                ws_graficos.add_image(img_pie, f"L{indece*10}")
                indece += 3

            elif pregunta.tipoPregunta.id == 3:
                opciones = [
                    opcion.titulo for opcion in pregunta.opciones.all()]
                respuestas_totales = total_check(pregunta)

                plt.bar(opciones, respuestas_totales, color='skyblue')
                plt.title(pregunta.titulo)
                plt.xlabel('Opciones')
                buffer_bar = BytesIO()
                plt.savefig(buffer_bar, format='png')
                plt.close()

                colores = plt.cm.tab10(range(len(respuestas_totales)))
                plt.pie(respuestas_totales, labels=opciones, autopct='%1.1f%%',
                        colors=colores)
                plt.title(pregunta.titulo)
                plt.xlabel('Opciones')
                buffer_pie = BytesIO()
                plt.savefig(buffer_pie, format='png')
                plt.close()

                buffer_bar.seek(0)
                img_bar = Image(buffer_bar)
                ws_graficos.add_image(img_bar, f"A{indece*10}")

                buffer_pie.seek(0)
                img_pie = Image(buffer_pie)
                ws_graficos.add_image(img_pie, f"L{indece*10}")
                indece += 3

    response = HttpResponse(
        content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    response['Content-Disposition'] = 'attachment; filename=respuestas_formulario.xlsx'
    wb.save(response)

    return response


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def ready_Answered(request, pk):
    form = get_object_or_404(Formulario, pk=pk)
    user = request.user

    if RespuestaFormulario.objects.filter(campoFormulario__formulario=form, usuario=user).exists():
        return Response({"message": "Ya has respondido este formulario"}, status=status.HTTP_204_NO_CONTENT)
    else:
        return Response({"message": "Puede responder el formulario"}, status=status.HTTP_200_OK)


def resul_multi(preguntas, campos):
    for opciones in campos.opciones.all():
        res = RespuestaFormulario.objects.filter(
            campoFormulario_id=campos.id, valor=opciones.valor).aggregate(count=Count('valor'))
        preguntas["respuestas"].append({
            "titulo": opciones.titulo,
            "total": res["count"]
        })
    preguntas["desviacion"] = desviacion_estandar(preguntas)


def resul_text(preguntas, campos):
    res = RespuestaFormulario.objects.filter(campoFormulario_id=campos.id)
    for respuesta in res:
        preguntas["respuestas"].append(
            respuesta.valor
        )


def resul_check(preguntas, campos):
    for opciones in campos.opciones.all():
        res = RespuestaFormulario.objects.filter(
            campoFormulario_id=campos.id, valor__contains=opciones.valor).count()

        preguntas["respuestas"].append({
            "titulo": opciones.titulo,
            "total": res
        })
    preguntas["desviacion"] = desviacion_estandar(preguntas)


def result_ratin(preguntas, campos):
    for opciones in campos.opciones.all():

        for option_ratin in range(1, int(opciones.valor)+1):
            res = RespuestaFormulario.objects.filter(
                campoFormulario_id=campos.id, valor=option_ratin).aggregate(count=Count('valor'))
            preguntas["respuestas"].append({
                "titulo": "Calificacion de " + str(option_ratin),
                "total": res["count"]
            })
    regresion_lineal(preguntas)
    preguntas["desviacion"] = desviacion_estandar(preguntas)


def regresion_lineal(preguntas):
    x = np.array(range(1, len(preguntas["respuestas"])+1))
    y = np.array([item['total'] for item in preguntas["respuestas"]])
    slope, intercept, _, _, _ = linregress(x, y)
    regression_line = slope * x + intercept
    for i in range(len(preguntas["respuestas"])):
        preguntas["respuestas"][i]["regression"] = regression_line[i]
    preguntas["correlacion"], _ = pearsonr(x, y)


def desviacion_estandar(preguntas):
    return np.std([item['total'] for item in preguntas["respuestas"]])


def total_res(campos):
    res = RespuestaFormulario.objects.filter(
        campoFormulario_id=campos.id).count()
    return res


def resul_cova(pregunta_1, pregunta_2,):
    muestra_1 = np.array(range(1, len(pregunta_1["respuestas"])+1))
    muestra_2 = np.array(range(1, len(pregunta_2["respuestas"])+1))
    covariance = np.cov(pregunta_1, pregunta_2)
    return covariance


def total_multi(campos):
    resultados = []
    for opciones in campos.opciones.all():
        res = RespuestaFormulario.objects.filter(
            campoFormulario_id=campos.id, valor=opciones.valor).aggregate(count=Count('valor'))
        resultados.append(res["count"])
    return resultados


def total_check(campos):
    resultados = []
    for opciones in campos.opciones.all():
        res = RespuestaFormulario.objects.filter(
            campoFormulario_id=campos.id, valor__contains=opciones.valor).count()
        resultados.append(res)
    return resultados
