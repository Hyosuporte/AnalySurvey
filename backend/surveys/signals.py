from django.db.models.signals import post_migrate
from django.dispatch import receiver
from .models import TipoPregunta


@receiver(post_migrate)
def create_default_tipo_preguntas(sender, **kwargs):
    if sender.name == 'your_app_name':  # Reemplaza 'your_app_name' con el nombre de tu aplicación
        if not TipoPregunta.objects.exists():
            TipoPregunta.objects.bulk_create([
                TipoPregunta(tipo='mult'),
                TipoPregunta(tipo='text'),
                TipoPregunta(tipo='check'),
                TipoPregunta(tipo='rating'),
            ])
