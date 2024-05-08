from django.contrib import admin
from surveys.models import Formulario, CampoFormulario, OpcionCampoFormulario, TipoPregunta, RespuestaFormulario


class FormularioAdmin(admin.ModelAdmin):
    list_display = ('id', 'titulo', 'creador', 'creado_en', 'actualizado_en')
    list_filter = ('creador', 'creado_en')  # Agrega filtros
    search_fields = ('titulo',)  # Agrega barra de búsqueda


class CampoFormularioAdmin(admin.ModelAdmin):
    list_display = ('id', 'titulo', 'formulario', 'tipoPregunta', 'orden')
    list_filter = ('formulario', 'tipoPregunta')  # Agrega filtros
    search_fields = ('titulo',)  # Agrega barra de búsqueda


class OpcionCampoFormularioAdmin(admin.ModelAdmin):
    list_display = ('id', 'titulo', 'valor', 'campoFormulario')
    list_filter = ('campoFormulario',)  # Agrega filtros
    search_fields = ('titulo', 'valor')  # Agrega barra de búsqueda


class TipoPreguntaAdmin(admin.ModelAdmin):
    list_display = ('id', 'tipo')
    search_fields = ('tipo',)  # Agrega barra de búsqueda


class RespuestaFormularioAdmin(admin.ModelAdmin):
    list_display = ('id', 'campoFormulario', 'usuario', 'valor', 'creado_en')
    list_filter = ('usuario', 'creado_en')  # Agrega filtros
    search_fields = ('valor',)  # Agrega barra de búsqueda


admin.site.register(Formulario, FormularioAdmin)
admin.site.register(CampoFormulario, CampoFormularioAdmin)
admin.site.register(OpcionCampoFormulario, OpcionCampoFormularioAdmin)
admin.site.register(TipoPregunta, TipoPreguntaAdmin)
admin.site.register(RespuestaFormulario, RespuestaFormularioAdmin)
