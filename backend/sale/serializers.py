from rest_framework import serializers

from .models import *

class SaleSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Sale

class SaleSerializerMixed(serializers.ModelSerializer):
    class Meta:
        fields = ['id', 'company', 'title', 'startDate', 'endDate', 'status', 'staff', 'services','name', 'email', 'phone', 'description']
        model = Sale
    '''def create(self, validated_data):
        sale_service = validated_data.pop('sale_service')
        instance = Sale.objects.create(**validated_data)
        sale_service_list = []
        for sl_srvs in sale_service:
            sl_srvs['sale']=instance
            sl_srvs_obj = SaleServiceConnector.objects.create(**sl_srvs)
            sale_service_list.append(sl_srvs_obj)

        instance.sale_service.set(sale_service_list)
        return instance

    def update(self, instance, validated_data):
        sale_service_data = validated_data.pop('sale_service')
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        SaleServiceConnector.objects.filter(sale=instance).delete()
        
        for conn in sale_service_data:
            conn['sale'] = instance
            SaleServiceConnector.objects.create(**conn)

        return instance'''
        
