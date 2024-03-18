from rest_framework import serializers
from .models import Formulario
from .models import RespuestaFormulario
from .models import CampoFormulario
from .models import OpcionCampoFormulario

# FIXME: Mirar si hay datos que sobren


class RespuestaFormularioSerializer(serializers.ModelSerializer):
    class Meta:
        model = RespuestaFormulario
        fields = ['valor', 'campoFormulario_id', 'usuario_id']


class OpcionCampoFormularioSerializer(serializers.ModelSerializer):
    class Meta:
        model = OpcionCampoFormulario
        fields = '__all__'


class CampoFormularioSerializer(serializers.ModelSerializer):
    respuestas = RespuestaFormularioSerializer(many=True, read_only=True)
    opciones = OpcionCampoFormularioSerializer(many=True, read_only=True)

    class Meta:
        model = CampoFormulario
        fields = '__all__'


class FormSerializer(serializers.ModelSerializer):
    campos = CampoFormularioSerializer(many=True, read_only=True)

    class Meta:
        model = Formulario
        fields = ['id', 'titulo', 'creado_en',
                  'actualizado_en', 'creador_id', 'campos']
