#!/usr/bin/env bash
# Exit on error
set -o errexit

pip install -r requirements.txt

# Convert static asset files
python manage.py collectstatic --no-input

# Apply any outstanding database migrations
python manage.py makemigrations
python manage.py migrate

# Create root user
python manage.py shell <<EOF
import os
from django.contrib.auth import get_user_model
User = get_user_model()
username = os.getenv("DJANGO_SUPERUSER_USERNAME", "admin")
email = os.getenv("DJANGO_SUPERUSER_EMAIL", "admin@example.com")
password = os.getenv("DJANGO_SUPERUSER_PASSWORD", "adminpassword")
if not User.objects.filter(username=username).exists():
    User.objects.create_superuser(username, email, password)
EOF
