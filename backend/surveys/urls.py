from django.urls import path
from surveys import views

urlpatterns = [
    path('api/v1/forms/<int:pk>', views.form),
    path('api/v1/forms/<int:pk>/duplicate', views.duplicate_form),
    path('api/v1/forms/<int:pk>/update', views.update_form_title),
    path('api/v1/forms/create', views.create_form),
]
