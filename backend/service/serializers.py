from rest_framework import serializers

from .models import *

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Category

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Service

class ServiceStaffConnectorSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ['service', 'staff']
        model = ServiceStaffConnector

class ServiceSerializerDeep(serializers.ModelSerializer):
    staff_service_field = ServiceStaffConnectorSerializer(many=True)
    class Meta:
        fields = ['id', 'title', 'company', 'category', 'type', 'price', 'minutes', 'hours', 'interval', 
        'description', 'active', 'language', 'image', 'staff_service_field']
        model = Service
    
    def create(self, validated_data):
        staff_service_data = validated_data.pop('staff_service_field')
        service = Service.objects.create(**validated_data)
        for conn in staff_service_data:
            conn['service'] = service
            ServiceStaffConnector.objects.create(**conn)
        return service

    def update(self, instance, validated_data):
        staff_service_data = validated_data.pop('staff_service_field')
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        ServiceStaffConnector.objects.filter(service=instance).delete()
        
        for conn in staff_service_data:
            conn['service'] = instance
            ServiceStaffConnector.objects.create(**conn)

        return instance