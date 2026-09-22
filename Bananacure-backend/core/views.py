from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import status, viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import UserSerializer


@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user is not None:
        return Response({
            "message": "Login successful",
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "first_name": user.first_name,
                "is_staff": user.is_staff
            }
        }, status=status.HTTP_200_OK)
    else:
        return Response(
            {"error": "Invalid username or password"}, 
            status=status.HTTP_401_UNAUTHORIZED
        )


class UserViewSet(viewsets.ModelViewSet):
    """
    Provides default list(), create(), retrieve(), update(),
    partial_update(), and destroy() actions for User management.
    """
    queryset = User.objects.all().order_by('-id')
    serializer_class = UserSerializer