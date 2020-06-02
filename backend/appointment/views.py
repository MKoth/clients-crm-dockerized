from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from dateutil.rrule import *
from dateutil.parser import *
from datetime import *
from rest_framework.generics import ListCreateAPIView

from staff.models import Schedule, Staff
from service.models import Service, ServiceStaffConnector, Category
from sale.models import Sale
from staff.serializers import StaffSerializerDeep
from service.serializers import ServiceSerializerDeep, CategorySerializer
from sale.serializers import SaleSerializer
from .functions import generate_timetable, get_list_of_service_categories

# Create your views here.

class AppointmentTimeTableGet(APIView):
  def post(self, request, **kwargs):
    data = request.data.copy()
    chosenDate = parse(data['date'])
    result = []
    if data['staff'] == 'all':
      staffInstances = Staff.objects.filter(active=True)
      for staff in staffInstances:
        scheduleInstances = Schedule.objects.filter(staff=staff)
        serviceInstances = Service.objects.filter(id__in=data['services'])
        saleInstances = Sale.objects.filter(startDate__startswith=data['date'], staff=staff)
        
        result.append(generate_timetable(staff_id=staff.id, serviceInstances=serviceInstances, day=chosenDate, 
          scheduleInstances=scheduleInstances, saleInstances=saleInstances))
    else:
      staffInstance = Staff.objects.get(id=data['staff'])
      scheduleInstances = Schedule.objects.filter(staff=staffInstance)
      serviceInstances = Service.objects.filter(id__in=data['services'])
      saleInstances = Sale.objects.filter(startDate__startswith=data['date'], staff=staffInstance)
      result.append(generate_timetable(staff_id=data['staff'], serviceInstances=serviceInstances, day=chosenDate, 
        scheduleInstances=scheduleInstances, saleInstances=saleInstances))

    return Response(result)

class AppointmentStaffGet(APIView):
  def post(self, request, **kwargs):
    staffInstances = Staff.objects.filter(active=True, company__id=kwargs['company_id'])
    staffData = StaffSerializerDeep(staffInstances, many=True)
    return Response(staffData.data)

class AppointmentServicesGet(APIView):
  def post(self, request, **kwargs):
    data = request.data.copy()
    if data['staff'] == 'all':
      serviceInstances = Service.objects.filter(active=True, company__id=kwargs['company_id'])
    else:
      serviceInstances = Service.objects.filter(active=True, company__id=kwargs['company_id'], staff_service_field__staff__id=data['staff'])
    serviceData = ServiceSerializerDeep(serviceInstances, many=True)
    categoryInstances = Category.objects.filter(active=True, company__id=kwargs['company_id'])
    categoriesData = CategorySerializer(categoryInstances, many=True)
    belong_to_service_categories = get_list_of_service_categories(serviceData.data, categoriesData.data)
    return Response({'services':serviceData.data, 'categories':belong_to_service_categories})

class AppointmentCreate(ListCreateAPIView):
  serializer_class = SaleSerializer
  queryset = Sale.objects.all()
