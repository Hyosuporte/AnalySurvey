from django.contrib import admin

from surveys.models import Formulario, CampoFormulario, OpcionCampoFormulario, TipoPregunta, RespuestaFormulario

admin.site.register(Formulario)
admin.site.register(CampoFormulario)
admin.site.register(OpcionCampoFormulario)
admin.site.register(TipoPregunta)
admin.site.register(RespuestaFormulario)