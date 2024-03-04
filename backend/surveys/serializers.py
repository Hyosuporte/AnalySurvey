from rest_framework import serializers
from .models import Formulario


class FormSerializer(serializers.ModelSerializer):
    class Meta:
        model = Formulario
        fields = ['id', 'titulo', 'credo_en',
                  'actualizado_en', 'creador_id', ]
