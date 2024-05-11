from django.urls import path
from users import views

urlpatterns = [
    path('api/v1/login/', views.login),
    path('api/v1/register/', views.register),
    path('api/v1/profile/', views.profile),
    path('api/v1/verify/', views.verify),
    path('api/v1/users/forms/', views.listForm),
    path('api/v1/users/active/', views.active_acount),
    path('api/v1/code-reset-password/', views.code_reset_password),
    path('api/v1/reset-password/', views.reset_password),
]
