from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
    activation_code = models.CharField(max_length=5, editable=False)
