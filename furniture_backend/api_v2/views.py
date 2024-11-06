import logging
from django.contrib.auth import get_user_model, authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from rest_framework import viewsets
from api.models import Furniture, Contact
from .serializers import FurnitureSerializer, ContactSerializer
from django_ratelimit.decorators import ratelimit
from django.utils.decorators import method_decorator
from django_ratelimit.exceptions import Ratelimited

# Initialize logger
logger = logging.getLogger(__name__)

User = get_user_model()

class FurnitureViewSet(viewsets.ModelViewSet):
    queryset = Furniture.objects.all()
    serializer_class = FurnitureSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    filterset_fields = ('category',)

    def list(self, request, *args, **kwargs):
        logger.info("Furniture list accessed.")
        return super().list(request, *args, **kwargs)

class UserRegistrationView(APIView):
    permission_classes = [AllowAny]  # Allow any user to access this view

    def post(self, request):
        data = request.data
        try:
            user = User.objects.create_user(username=data['username'], email=data['email'], password=data['password'])
            user.save()
            logger.info(f"User registered successfully: {data['username']}")
            return Response({"msg": "User registered successfully"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            logger.error(f"User registration failed: {e}")
            return Response({"msg": "Registration failed"}, status=status.HTTP_400_BAD_REQUEST)

class UserLoginView(APIView):
    permission_classes = [AllowAny]  # Allow any user to access this view

    @method_decorator(ratelimit(key='ip', rate='3/m', method='POST', block=True))
    def post(self, request):
        data = request.data
        try:
            # Ensure that the username and password are provided
            if 'username' not in data or 'password' not in data:
                logger.warning("Login attempt with missing username or password.")
                return Response({"msg": "Username and password are required."}, status=status.HTTP_400_BAD_REQUEST)

            user = authenticate(username=data['username'], password=data['password'])
            if user:
                refresh = RefreshToken.for_user(user)
                logger.info(f"User logged in successfully: {data['username']}")
                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                })
            logger.warning(f"Invalid login attempt for username: {data['username']}")
            return Response({"msg": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        except Ratelimited:
            logger.warning(f"Too many login attempts for IP: {request.META.get('REMOTE_ADDR')}")
            return Response({"msg": "Too many login attempts. Please try again later."}, status=status.HTTP_429_TOO_MANY_REQUESTS)
        except Exception as e:
            logger.error(f"Error during login for username {data.get('username', 'unknown')}: {e}")
            return Response({"msg": "An error occurred during login"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ContactCreateView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"msg": "Message sent successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)