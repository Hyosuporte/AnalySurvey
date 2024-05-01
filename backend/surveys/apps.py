# surveys/apps.py
from django.apps import AppConfig
from django.db.models.signals import post_migrate
from django.dispatch import receiver


class SurveysConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'surveys'

    def ready(self):
        @receiver(post_migrate, sender=self)
        def create_default_tipo_preguntas(sender, **kwargs):
            from .models import TipoPregunta  # Importa el modelo aquí para evitar errores
            if not TipoPregunta.objects.exists():
                TipoPregunta.objects.bulk_create([
                    TipoPregunta(tipo='mult'),
                    TipoPregunta(tipo='text'),
                    TipoPregunta(tipo='check'),
                    TipoPregunta(tipo='rating'),
                ])
