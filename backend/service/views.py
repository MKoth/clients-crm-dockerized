from __future__ import unicode_literals
import re

from django.contrib.auth.models import User
from django.db.models import Q

from rest_framework.generics import ListCreateAPIView, UpdateAPIView
from rest_framework.generics import ListCreateAPIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
import json

from .models import *
from .serializers import *
from rest_framework.views import APIView


class CategoryList(ListCreateAPIView):
    serializer_class = CategorySerializer
    permission_classes = (IsAuthenticated,)
    queryset = Category.objects.all()

    def list(self, request, *args, **kwargs):
        categoriesQuery = Category.objects.filter(company__id=kwargs['company_id'])
        serializer = CategorySerializer(categoriesQuery, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        json_data = data.get('document')
        parsed_data = json.load(json_data)
        if 'image' in parsed_data:
            parsed_data['image'] = request.FILES.get('image')

        parsed_data['company'] = kwargs['company_id']
        serializer = self.serializer_class(data=parsed_data)
        serializer.is_valid(raise_exception=True)
        result = serializer.save()
        serializer = self.serializer_class(result)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class CategoryUpdate(UpdateAPIView):
    serializer_class = CategorySerializer
    permission_classes = (IsAuthenticated,)
    queryset = Category.objects.all()
    lookup_field = "id"

    def update(self, request, *args, **kwargs):
        data = request.data.copy()
        json_data = data.get('document')
        parsed_data = json.load(json_data)

        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        if 'image' in parsed_data:
            if 'image' in request.FILES:
                parsed_data['image'] = request.FILES.get('image')
            else:
                parsed_data['image'] = None
        serializer = self.get_serializer(instance, data=parsed_data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

class CategoryGet(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request, **kwargs):
        category_id = kwargs['category_id']
        category = Category.objects.get(id=category_id)
        categoryData = CategorySerializer(category)
        return Response(categoryData.data)

class CategoryDelete(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request, **kwargs):
        category_id = kwargs['category_id']
        category = Category.objects.get(id=category_id)
        category.delete()
        return Response({'msg':'success'})



class ServiceList(ListCreateAPIView):
    serializer_class = ServiceSerializerDeep
    permission_classes = (IsAuthenticated,)
    queryset = Service.objects.all()

    def list(self, request, *args, **kwargs):
        servicesQuery = Service.objects.filter(company__id=kwargs['company_id'])
        serializer = self.serializer_class(servicesQuery, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        json_data = data.get('document')
        parsed_data = json.load(json_data)
        if 'image' in parsed_data:
            parsed_data['image'] = request.FILES.get('image')

        parsed_data['company'] = kwargs['company_id']
        serializer = self.serializer_class(data=parsed_data)
        if serializer.is_valid():
            result = serializer.save()
            serializer = self.serializer_class(result)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ServiceUpdate(UpdateAPIView):
    serializer_class = ServiceSerializerDeep
    permission_classes = (IsAuthenticated,)
    queryset = Service.objects.all()
    lookup_field = "id"

    def update(self, request, *args, **kwargs):
        data = request.data.copy()
        json_data = data.get('document')
        parsed_data = json.load(json_data)

        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        if 'image' in parsed_data:
            if 'image' in request.FILES:
                instance.image = request.FILES.get('image')
            else:
                instance.image = None
        serializer = self.get_serializer(instance, data=parsed_data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)    



class ServiceGet(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request, **kwargs):
        service_id = kwargs['id']
        service = Service.objects.get(id=service_id)
        serviceData = ServiceSerializerDeep(service)
        return Response(serviceData.data)

class ServiceDelete(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request, **kwargs):
        service_id = kwargs['id']
        service = Service.objects.get(id=service_id)
        service.delete()
        return Response({'msg':'success'})