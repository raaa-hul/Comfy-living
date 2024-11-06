from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FurnitureViewSet,UserLoginView,UserRegistrationView,ContactCreateView

router = DefaultRouter()
router.register(r'furniture', FurnitureViewSet)

app_name = 'api'
urlpatterns = [
    path('', include(router.urls)),
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('contact/', ContactCreateView.as_view(), name='contact-create'),
]
