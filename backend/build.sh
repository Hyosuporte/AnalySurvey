#!/usr/bin/env bash
# Exit on error
set -o errexit

# Modify this line as needed for your package manager (pip, poetry, etc.)
pip install -r requirements.txt

# Convert static asset files
python manage.py collectstatic --no-input

# Apply any outstanding database migrations
python manage.py migrate

# Crear superusuario y capturar la contraseña generada automáticamente
PASSWORD=$(python manage.py shell -c 'from django.contrib.auth.models import User; User.objects.create_superuser("admin", "admin@example.com", "admin"); print("admin")')

# Mostrar la contraseña generada automáticamente en la consola
echo "La contraseña generada automáticamente es: $PASSWORD"
