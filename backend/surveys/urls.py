from django.urls import path
from surveys import views

urlpatterns = [
    path('api/v1/forms/<uuid:pk>/', views.form),
    path('api/v1/forms/<uuid:pk>/duplicate/', views.duplicate_form),
    path('api/v1/forms/<uuid:pk>/update/title/', views.update_form_title),
    path('api/v1/forms/create/', views.create_form),
    path('api/v1/forms/<uuid:pk>/update/campos/', views.actualizar_formulario),
    path('api/v1/forms/create_option/<uuid:pk>/', views.create_option),
    path('api/v1/forms/create_campo/<uuid:pk>/', views.create_campo),
    path('api/v1/forms/delete/option/<uuid:pk>/', views.delete_option),
    path('api/v1/forms/delete/campo/<uuid:pk>/', views.delete_campo),
    path('api/v1/forms/<uuid:pk>/update/option/', views.update_option),
    path('api/v1/forms/<uuid:pk>/update/campo/', views.update_campo),
    path('api/v1/forms/ask/', views.save_ask),
    path('api/v1/forms/<uuid:pk>/charts/', views.chart_analitys),
    path('api/v1/forms/<uuid:pk>/excel/', views.create_excel),
    path('api/v1/forms/<uuid:pk>/answered/', views.ready_Answered),
]
