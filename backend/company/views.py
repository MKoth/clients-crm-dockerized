from __future__ import unicode_literals

from django.contrib.auth.models import User
from django.db.models import Q

from rest_framework.generics import ListCreateAPIView, UpdateAPIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from setting.serializers import UserRegistrationSerializer
import json

from .models import *
from .serializers import *


class CompanyList(ListCreateAPIView):
    serializer_class = CompanySerializerDeep
    #permission_classes = (IsAuthenticated,)
    queryset = Company.objects.all()

    def list(self, request, *args):
        serializer = self.serializer_class(self.get_queryset(), many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        json_data = data.get('document')
        
        parsed_data = json.load(json_data)
        if 'logo' in parsed_data:
            parsed_data['logo'] = request.FILES.get('logo')
        if 'cover' in parsed_data:
            parsed_data['cover'] = request.FILES.get('cover')
        if not parsed_data['user']:
            return Response({}, status=status.HTTP_400_BAD_REQUEST)

        userData = parsed_data['user']
        userSerializer = UserRegistrationSerializer(data=userData)

        if not userSerializer.is_valid():
            return Response(userSerializer.errors, status=status.HTTP_400_BAD_REQUEST)
        user = userSerializer.save(request=request)
        
        parsed_data['user'] = user.id

        serializer = self.serializer_class(data=parsed_data)
        if serializer.is_valid():
            result = serializer.save()
            serializer = self.serializer_class(result)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CompanyGet(APIView):
    serializer_class = CompanySerializer
    queryset = Company.objects.all()

    def get(self, request, **kwargs):
        serializer = self.serializer_class(self.queryset.get(id=kwargs['company_id']))
        return Response(serializer.data)

class CompanyMediaUpdate(APIView):
    serializer_class = CompanySerializer
    queryset = Company.objects.all()

    def post(self, request, **kwargs):
        companyInstance = self.queryset.get(id=kwargs['company_id'])
        for key in request.data:
            if key in request.FILES:
                if key == 'logo':
                    companyInstance.logo = request.FILES.get(key)
                else:
                    companyInstance.cover = request.FILES.get(key)
            else:
                if key == 'logo':
                    companyInstance.logo = None
                else:
                    companyInstance.cover = None
        companyInstance.save()
        serializer = self.serializer_class(companyInstance)
        return Response(serializer.data)
        


class CompanyUpdate(UpdateAPIView):
    serializer_class = CompanySerializer
    permission_classes = (IsAuthenticated,)
    queryset = Company.objects.all()
    lookup_field = "id"

class WorkingTimeUpdateList(APIView):
    permission_classes = (IsAuthenticated,)
    def post(self, request, **kwargs):
        company_id = kwargs['company_id']
        day_index = kwargs['day_index']
        hours = request.data
        print(hours)
        #return Response({"msg":"cool"}, status=status.HTTP_201_CREATED)
        if not company_id or not day_index:
            return Response({}, status=status.HTTP_400_BAD_REQUEST)
        
        hoursSerializer = WorkingTimeSerializer(data=hours, many=True)
        if hoursSerializer.is_valid():
            prev_hours = WorkingTime.objects.filter(company=company_id, day=day_index)
            prev_hours.delete()
            hoursSerializer.save()

        allHours = WorkingTime.objects.filter(company=company_id)
        resultData = WorkingTimeSerializer(allHours, many=True)
        
        return Response(resultData.data, status=status.HTTP_201_CREATED)
    def get(self, request):
        company_id = request.query_params.get('company')
        
        hours = WorkingTime.objects.filter(company=company_id)
        hoursData = WorkingTimeSerializer(hours, many=True)

        return Response(hoursData.data)

class WorkingTimeGetList(APIView):
    def get(self, request, **kwargs):
        company_id = kwargs['company_id']
        
        hours = WorkingTime.objects.filter(company=company_id)
        hoursData = WorkingTimeSerializer(hours, many=True)

        return Response(hoursData.data)

class SocialLinkUpdate(APIView):
    serializer_class = SocialLinkSerializer
    permission_classes = (IsAuthenticated,)
    queryset = SocialLink.objects.all()
    def post(self, request, **kwargs):
        social_id = kwargs['social_id']
        socialInstance = self.queryset.get(id=social_id)
        serializer = self.serializer_class(socialInstance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        socialInstances = self.queryset.filter(company=serializer.data['company'])
        serializers = self.serializer_class(socialInstances, many=True)
        return Response(serializers.data)

class SocialLinkCreate(APIView):
    serializer_class = SocialLinkSerializer
    permission_classes = (IsAuthenticated,)
    queryset = SocialLink.objects.all()
    def post(self, request, format=None):
        print(request.data)
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        print(serializer.data)
        socialInstances = self.queryset.filter(company=serializer.data['company'])
        serializers = self.serializer_class(socialInstances, many=True)
        return Response(serializers.data)

class SocialLinkDelete(APIView):
    serializer_class = SocialLinkSerializer
    permission_classes = (IsAuthenticated,)
    queryset = SocialLink.objects.all()
    def get(self, request, **kwargs):
        socialInstance = SocialLink.objects.get(id=kwargs['social_id'])
        company_id = socialInstance.company
        socialInstance.delete()
        socialInstances = self.queryset.filter(company=company_id)
        serializers = self.serializer_class(socialInstances, many=True)
        return Response(serializers.data)

class SocialLinkUpdateList(APIView):
    permission_classes = (IsAuthenticated,)
    def post(self, request, **kwargs):
        #company = request.data.get('company')
        company = kwargs['company_id']
        socials = request.data.get('socials')
        #return Response({"msg":"cool"}, status=status.HTTP_201_CREATED)
        if not company and not socials:
            return Response({}, status=status.HTTP_400_BAD_REQUEST)
        socialsSerializer = SocialLinkSerializer(data=socials, many=True)
        if socialsSerializer.is_valid(raise_exception=True):
            prev_socials = SocialLink.objects.filter(company=company)
            prev_socials.delete()
            result = socialsSerializer.save()
            resultData = SocialLinkSerializer(result, many=True)
            return Response(resultData.data, status=status.HTTP_201_CREATED)

    def get(self, request, **kwargs):
        #company_id = request.query_params.get('company')
        company_id = kwargs['company_id']
        print(company_id)
        
        socials = SocialLink.objects.filter(company=company_id)
        socialsData = SocialLinkSerializer(socials, many=True)

        return Response(socialsData.data)