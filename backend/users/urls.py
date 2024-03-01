from django.urls import path
from users import views

urlpatterns = [
    path('api/v1/login', views.login),
    path('api/v1/register', views.register),
]
