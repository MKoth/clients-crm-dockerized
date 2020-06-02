from rest_framework import serializers

from .models import *

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Client

class ClientSerializerDeep(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Client
        depth = 1