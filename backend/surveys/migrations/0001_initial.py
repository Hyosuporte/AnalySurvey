# Generated by Django 5.0.2 on 2024-03-05 00:14

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='TipoPregunta',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('tipo', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Formulario',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('titulo', models.CharField(max_length=255)),
                ('descripcion', models.TextField(null=True)),
                ('creado_en', models.DateTimeField(auto_now_add=True)),
                ('actualizado_en', models.DateTimeField(auto_now_add=True)),
                ('creador', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='CampoFormulario',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('titulo', models.CharField(max_length=255)),
                ('requerido', models.BooleanField()),
                ('deshabilitado', models.BooleanField()),
                ('orden', models.IntegerField()),
                ('formulario', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='campos', to='surveys.formulario')),
                ('tipoPregunta', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='surveys.tipopregunta')),
            ],
        ),
        migrations.CreateModel(
            name='OpcionCampoFormulario',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('titulo', models.CharField(max_length=255, null=True)),
                ('valor', models.CharField(max_length=255)),
                ('campoFormulario', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='opciones', to='surveys.campoformulario')),
            ],
        ),
        migrations.CreateModel(
            name='RespuestaFormulario',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('valor', models.TextField()),
                ('creado_en', models.DateTimeField(auto_now_add=True)),
                ('campoFormulario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='respuestas', to='surveys.campoformulario')),
                ('usuario', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='respuestas', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
