from __future__ import unicode_literals
import re

from django.contrib.auth.models import User
from django.db.models import Q

from rest_framework.generics import ListCreateAPIView, UpdateAPIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import *
from .serializers import *
from rest_framework.views import APIView


class SaleList(ListCreateAPIView):
  serializer_class = SaleSerializer
  permission_classes = (IsAuthenticated,)
  queryset = Sale.objects.all()

  def list(self, request, *args, **kwargs):
    SaleQuery = self.queryset.filter(company__id=kwargs['company_id'])
    serializer = self.serializer_class(SaleQuery, many=True)
    return Response(serializer.data)

  def create(self, request, *args, **kwargs):
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    self.perform_create(serializer)

    salesQuery = self.queryset.filter(company__id=kwargs['company_id'])
    salesList = self.serializer_class(salesQuery, many=True)

    return Response(salesList.data, status=status.HTTP_201_CREATED)


class SaleUpdate(UpdateAPIView):
  serializer_class = SaleSerializer
  permission_classes = (IsAuthenticated,)
  queryset = Sale.objects.all()
  lookup_field = "id"


class SaleGet(APIView):
  permission_classes = (IsAuthenticated,)
  def get(self, request, **kwargs):
    sale_id = kwargs['id']
    sale = Sale.objects.get(id=sale_id)
    saleData = SaleSerializer(sale)
    return Response(saleData.data)

class SaleDelete(APIView):
  permission_classes = (IsAuthenticated,)
  def get(self, request, **kwargs):
    sale_id = kwargs['id']
    sale = Sale.objects.get(id=sale_id)
    sale.delete()
    return Response({'msg':'success'})
