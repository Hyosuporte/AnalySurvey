from django.db import models
from django.contrib.auth.hashers import make_password


class Users(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=255, unique=True)
    full_name = models.CharField(max_length=255, blank=True, null=True)
    email = models.EmailField(max_length=255, unique=True)
    password_hash = models.CharField(max_length=255)

    def save(self, *args, **kwargs):
        if self.password_hash:
            self.password_hash = make_password(self.password_hash)
        super().save(*args, **kwargs)
