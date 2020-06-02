from django.db.models import Q
from django.contrib.auth.models import User
from django.contrib.sites.models import Site
from django.urls import reverse
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings

from rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers
from rest_auth.models import TokenModel
from rest_auth.serializers import UserDetailsSerializer

from .models import *


class CheckEmailSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = User


class UserRegistrationSerializer(RegisterSerializer):
    first_name = serializers.CharField(max_length=255, required=True)
    last_name = serializers.CharField(max_length=255, required=True)

    def custom_signup(self, request, user):
        if self.validated_data.get('first_name', None):
            user.first_name = self.validated_data.get('first_name', '')
            user.save(update_fields=['first_name'])
        if self.validated_data.get('last_name', None):
            user.last_name = self.validated_data.get('last_name', '')
            user.save(update_fields=['last_name'])

'''class UserDetailsSerializer(serializers.ModelSerializer):
    get_token = serializers.SerializerMethodField('is_token', read_only=True)

    def is_token(self, obj):
        token = TokenModel.objects.filter(user=obj).first()
        if token:
            return {
                'token': str(token)
            }
        else:
            return {
                'token': None
            }

    class Meta:
        fields = '__all__'
        model = User'''

class CustomUserDetailsSerializer(UserDetailsSerializer):
    class Meta:
        model = User
        fields = ('pk', 'username', 'email', 'first_name', 'last_name', 'is_active', 'description')
        read_only_fields = ('email', )


class CountrySerializer(serializers.ModelSerializer):

    class Meta:
        fields = '__all__'
        model = Country


class TokenSerializer(serializers.ModelSerializer):
    """
    Serializer for Token model.
    """
    user = UserSerializer()

    class Meta:
        model = TokenModel
        fields = '__all__'