from django.urls import path
from surveys import views

urlpatterns = [
    path('api/v1/forms/<int:pk>/', views.form),
    path('api/v1/forms/<int:pk>/duplicate/', views.duplicate_form),
    path('api/v1/forms/<int:pk>/update/title/', views.update_form_title),
    path('api/v1/forms/create/', views.create_form),
    path('api/v1/forms/<int:pk>/update/campos/', views.actualizar_formulario),
    path('api/v1/forms/create_option/<int:pk>/', views.create_option),
    path('api/v1/forms/delete/option/<int:pk>/', views.delete_option),
    path('api/v1/forms/<int:pk>/update/option/', views.update_option),
    path('api/v1/forms/<int:pk>/update/campo/', views.update_campo),
]
