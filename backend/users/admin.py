from django.contrib import admin
from .models import CustomUser
from surveys.models import Formulario, CampoFormulario, OpcionCampoFormulario, TipoPregunta, RespuestaFormulario


class FormularioAdmin(admin.ModelAdmin):
    list_display = ('id', 'titulo', 'creador', 'creado_en', 'actualizado_en')
    list_filter = ('creador', 'creado_en')
    search_fields = ('titulo',)


class CampoFormularioAdmin(admin.ModelAdmin):
    list_display = ('id', 'titulo', 'formulario', 'tipoPregunta', 'orden')
    list_filter = ('formulario', 'tipoPregunta')
    search_fields = ('titulo',)


class OpcionCampoFormularioAdmin(admin.ModelAdmin):
    list_display = ('id', 'titulo', 'valor', 'campoFormulario')
    list_filter = ('campoFormulario',)
    search_fields = ('titulo', 'valor')


class TipoPreguntaAdmin(admin.ModelAdmin):
    list_display = ('id', 'tipo')
    search_fields = ('tipo',)


class RespuestaFormularioAdmin(admin.ModelAdmin):
    list_display = ('id', 'campoFormulario', 'usuario', 'valor', 'creado_en')
    list_filter = ('usuario', 'creado_en')
    search_fields = ('valor',)


class CustomUserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email', 'is_staff']
    list_filter = ['is_staff']
    search_fields = ['username', 'email']


admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Formulario, FormularioAdmin)
admin.site.register(CampoFormulario, CampoFormularioAdmin)
admin.site.register(OpcionCampoFormulario, OpcionCampoFormularioAdmin)
admin.site.register(TipoPregunta, TipoPreguntaAdmin)
admin.site.register(RespuestaFormulario, RespuestaFormularioAdmin)
