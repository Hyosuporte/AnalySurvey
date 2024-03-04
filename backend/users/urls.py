from django.urls import path
from users import views

urlpatterns = [
    path('api/v1/login/', views.login),
    path('api/v1/register/', views.register),
    path('api/v1/profile/', views.profile),
    path('api/v1/verify/', views.verify),
    path('api/v1/users/<int:pk>/forms/', views.listForm),
]
