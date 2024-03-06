from rest_framework import serializers
from .models import Formulario
from .models import RespuestaFormulario
from .models import CampoFormulario

# FIXME: Mirar si hay datos que sobren
class RespuestaFormularioSerializer(serializers.ModelSerializer):
    class Meta:
        model = RespuestaFormulario
        fields = ['valor', 'campoFormulario_id', 'usuario_id']


class CampoFormularioSerializer(serializers.ModelSerializer):
    respuestas = RespuestaFormularioSerializer(many=True, read_only=True)

    class Meta:
        model = CampoFormulario
        fields = ['titulo', 'requerido',
                  'deshabilitado', 'orden', 'formulario_id', 'tipoPregunta_id', 'respuestas']


class FormSerializer(serializers.ModelSerializer):
    campos = CampoFormularioSerializer(many=True, read_only=True)

    class Meta:
        model = Formulario
        fields = ['id', 'titulo', 'creado_en',
                  'actualizado_en', 'creador_id', 'campos']
