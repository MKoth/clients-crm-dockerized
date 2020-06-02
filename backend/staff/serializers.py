from rest_framework import serializers
from service.serializers import ServiceStaffConnectorSerializer
from service.models import ServiceStaffConnector

from .models import *

class StaffSerializerDeep(serializers.ModelSerializer):
    service_staff_field = ServiceStaffConnectorSerializer(many=True)
    class Meta:
        fields = ['id', 'user', 'company', 'active', 'booking', 'language', 'position', 
        'sex', 'phone', 'image', 'description', 'service_staff_field']
        model = Staff
        depth = 1

class StaffSerializerCreateUpdate(serializers.ModelSerializer):
    service_staff_field = ServiceStaffConnectorSerializer(many=True)
    class Meta:
        fields = ['id', 'user', 'company', 'active', 'booking', 'language', 'position', 
        'sex', 'phone', 'image', 'description', 'service_staff_field']
        model = Staff

    def create(self, validated_data):
        print(validated_data)
        service_staff_data = validated_data.pop('service_staff_field')
        staff = Staff.objects.create(**validated_data)
        for conn in service_staff_data:
            conn['staff'] = staff
            ServiceStaffConnector.objects.create(**conn)
        return staff

    def update(self, instance, validated_data):
        service_staff_data = validated_data.pop('service_staff_field')
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        ServiceStaffConnector.objects.filter(staff=instance).delete()
        
        for conn in service_staff_data:
            conn['staff'] = instance
            ServiceStaffConnector.objects.create(**conn)

        return instance

class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Staff

class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Schedule
