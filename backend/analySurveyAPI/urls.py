from django.contrib import admin
from django.urls import path, include

handler404 = 'analySurveyAPI.views.error_404'

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('users.urls')),
    path('', include('surveys.urls'))
]
