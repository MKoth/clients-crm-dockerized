from rest_framework import serializers

from .models import *

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Company

class WorkingTimeSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = WorkingTime

class SocialLinkSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = SocialLink

class CompanySerializerDeep(serializers.ModelSerializer):
    company_working_time = WorkingTimeSerializer(many=True)
    company_social_link = SocialLinkSerializer(many=True)
    class Meta:
        fields = ['id', 'title', 'user', 'slug', 'address', 'is_active', 'currency', 'language', 
        'vat', 'time_zone', 'description', 'phone', 'email', 'website', 'whatsap', 'telegram', 'viber',
        'logo', 'cover',
        'company_working_time', 'company_social_link']
        model = Company
    def create(self, validated_data):
        working_time_validated_data = validated_data.pop('company_working_time')
        social_link_validated_data = validated_data.pop('company_social_link')
        company = Company.objects.create(**validated_data)
        working_time_set_serializer = self.fields['company_working_time']
        social_link_set_serializer = self.fields['company_social_link']
        for each in working_time_validated_data:
            each['company'] = company
        for each in social_link_validated_data:
            each['company'] = company
        working_time = working_time_set_serializer.create(working_time_validated_data)
        social_link = social_link_set_serializer.create(social_link_validated_data)
        return company