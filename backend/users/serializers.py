from rest_framework import serializers
from django.contrib.auth import get_user_model


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)

    def validate_email(self, value):
        User = get_user_model()
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                "El correo electrónico ya está en uso")
        return value

    class Meta:
        User = get_user_model()
        model = User
        fields = ['id', 'password', 'username', 'first_name',
                  'last_name', 'email']
