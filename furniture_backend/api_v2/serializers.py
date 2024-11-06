from rest_framework import serializers
from api.models import Furniture,Contact
# from django.contrib.auth import get_user_model

class FurnitureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Furniture
        fields = ['id', 'name', 'description', 'price', 'image_url', 'category']

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['id', 'name', 'email', 'phone', 'message', 'created_at']
















# User = get_user_model()

# class UserRegistrationSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['username', 'email', 'password']  
#         extra_kwargs = {
#             'password': {'write_only': True} 
#         }

#     def create(self, validated_data):
#         user = User.objects.create_user(
#             username=validated_data['username'],
#             email=validated_data['email'],  # Save the email
#             password=validated_data['password']
#         )
#         return user


# class UserLoginSerializer(serializers.Serializer):
#     username = serializers.CharField()
#     password = serializers.CharField()
