from django.contrib.auth.models import User
from django.db import models


class Formulario(models.Model):
    id = models.AutoField(primary_key=True)
    titulo = models.CharField(max_length=255)
    descripcion = models.TextField(null=True)
    creador = models.ForeignKey(User, on_delete=models.CASCADE)
    creado_en = models.DateTimeField(auto_now_add=True, auto_now=False)
    actualizado_en = models.DateTimeField(auto_now_add=True, auto_now=False)


class TipoPregunta(models.Model):
    id = models.AutoField(primary_key=True)
    tipo = models.CharField(max_length=100)


class CampoFormulario(models.Model):
    id = models.AutoField(primary_key=True)
    titulo = models.CharField(max_length=255, null=False)
    requerido = models.BooleanField(null=False)
    deshabilitado = models.BooleanField(null=False)
    formulario = models.ForeignKey(
        Formulario, on_delete=models.SET_NULL, null=True, related_name='campos')
    tipoPregunta = models.ForeignKey(TipoPregunta, on_delete=models.CASCADE)
    orden = models.IntegerField(null=False)


class OpcionCampoFormulario(models.Model):
    id = models.AutoField(primary_key=True)
    titulo = models.CharField(max_length=255, null=True)
    valor = models.CharField(max_length=255, null=False)
    campoFormulario = models.ForeignKey(
        CampoFormulario, on_delete=models.SET_NULL, null=True, related_name='opciones')


class RespuestaFormulario(models.Model):
    id = models.AutoField(primary_key=True)
    campoFormulario = models.ForeignKey(
        CampoFormulario, on_delete=models.CASCADE, related_name='respuestas')
    usuario = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, related_name='respuestas')
    valor = models.TextField(null=False)
    creado_en = models.DateTimeField(auto_now_add=True, auto_now=False)
