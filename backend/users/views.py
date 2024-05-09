from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from .serializers import UserSerializer
from rest_framework import status
from surveys.models import Formulario
from surveys.serializers import FormSerializer
from django.core.mail import send_mail
import random
import string


@api_view(['POST'])
def login(request):
    User = get_user_model()
    user = get_object_or_404(User, email=request.data['email'])

    if not user.check_password(request.data['password']):
        return Response(['Invalid password'], status=status.HTTP_400_BAD_REQUEST)

    Token.objects.filter(user=user).delete()
    token, created = Token.objects.get_or_create(user=user)
    serializer = UserSerializer(instance=user)

    return Response({'token': token.key, 'user': serializer.data}, status=status.HTTP_200_OK)


@api_view(['POST'])
def register(request):
    User = get_user_model()
    serializer = UserSerializer(data=request.data)

    if serializer.is_valid():
        user = User.objects.create_user(
            username=serializer.validated_data['username'],
            password=serializer.validated_data['password'],
            email=serializer.validated_data['email'],
            is_active=False,
            activation_code=''.join(random.choices(
                string.ascii_uppercase + string.digits, k=5))
        )

        send_mail(
            'Código de activación',
            'Tu código de activación es: {}'.format(user.activation_code),
            'cacuervo120@gmail.com',
            [user.email],
            fail_silently=False,
        )

        return Response({'user': serializer.data}, status=status.HTTP_201_CREATED)

    error_messages = []
    for field, errors in serializer.errors.items():
        error_messages.extend(errors)
    return Response(error_messages, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def profile(request):
    try:
        return Response({'message': f'Estás logueado como {request.user.username}'}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response([str(e)], status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def verify(request):
    user = request.user
    serializer = UserSerializer(instance=user)

    token = Token.objects.get(user=user)
    if not token.user.is_active:
        raise AuthenticationFailed('Token no válido')

    return Response({'user': serializer.data}, status=status.HTTP_200_OK)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def listForm(request):
    User = get_user_model()
    user = get_object_or_404(User, pk=request.user.id)
    try:
        forms = Formulario.objects.filter(creador_id=user)
    except Formulario.DoesNotExist:
        forms = []

    serializer = FormSerializer(forms, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def active_acount(request):
    User = get_user_model()
    user = get_object_or_404(
        User, activation_code=request.data['code'])
    user.is_active = True
    user.activation_code = ''
    user.save()
    token, created = Token.objects.get_or_create(user=user)
    serializer = UserSerializer(instance=user)

    return Response({'token': token.key, 'user': serializer.data}, status=status.HTTP_200_OK)
