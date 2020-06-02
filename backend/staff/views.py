from django.contrib.auth.models import User
from django.db.models import Q

from rest_framework.generics import ListCreateAPIView, UpdateAPIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from rest_auth.registration.serializers import RegisterSerializer

from setting.serializers import UserRegistrationSerializer, CustomUserDetailsSerializer
from setting.models import User
import json

from .models import *
from .serializers import *
from rest_framework.views import APIView


class StaffList(ListCreateAPIView):
  serializer_class = StaffSerializer
  permission_classes = (IsAuthenticated,)
  queryset = Staff.objects.all()

  def list(self, request, *args, **kwargs):
    staffQuery = self.queryset.filter(company__id=kwargs['company_id'])
    serializer = StaffSerializerDeep(staffQuery, many=True)
    return Response(serializer.data)

  def get_queryset(self):
    company_id = self.request.query_params.get('company')
    queryset = self.queryset.filter(company__id=company_id)
    return queryset

  def create(self, request, *args, **kwargs):
    data = request.data.copy()
    json_data = data.get('document')
    parsed_data = json.load(json_data)

    if 'image' in parsed_data:
      parsed_data['image'] = request.FILES.get('image')
    if not parsed_data['user']:
      return Response({}, status=status.HTTP_400_BAD_REQUEST)

    userData = parsed_data['user']
    userSerializer = UserRegistrationSerializer(data=userData)

    if not userSerializer.is_valid():
      return Response(userSerializer.errors, status=status.HTTP_400_BAD_REQUEST)
    user = userSerializer.save(request=request)
    
    parsed_data['user'] = user.id
    parsed_data['company'] = kwargs['company_id']
    serializer = StaffSerializerCreateUpdate(data=parsed_data)
    if serializer.is_valid():
      result = serializer.save()
      serializer = self.serializer_class(result)
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class StaffUpdate(UpdateAPIView):
  serializer_class = StaffSerializerCreateUpdate
  permission_classes = (IsAuthenticated,)
  queryset = Staff.objects.all()
  lookup_field = "id"

  def update(self, request, *args, **kwargs):
    data = request.data.copy()
    json_data = data.get('document')
    parsed_data = json.load(json_data)
    user = parsed_data.get('user').copy()
     
    if not user and not request.data.get('id'):
      return Response({"error":"No user object where detected"}, status=status.HTTP_400_BAD_REQUEST)
    
    userData = User.objects.get(id=user['id'])
    userSerializer = CustomUserDetailsSerializer(userData, data=user)
    if not userSerializer.is_valid():
      return Response(userSerializer.errors, status=status.HTTP_400_BAD_REQUEST)
    userSerializer.save()
   
    parsed_data['user'] = user['id']
    parsed_data['company'] = parsed_data['company']['id']

    partial = kwargs.pop('partial', False)
    instance = self.get_object()
    if 'image' in parsed_data:
      if 'image' in request.FILES:
        parsed_data['image'] = request.FILES.get('image')
        print('image present')
      else:
        parsed_data['image'] = None
        print('no image present')
    serializer = self.get_serializer(instance, data=parsed_data, partial=partial)
    serializer.is_valid(raise_exception=True)
    self.perform_update(serializer)
    return Response(serializer.data)

class StaffGet(APIView):
  permission_classes = (IsAuthenticated,)
  def get(self, request, **kwargs):
    staff_id = kwargs['id']
    staff = Staff.objects.get(id=staff_id)
    staffData = StaffSerializerDeep(staff)
    return Response(staffData.data)

class StaffDelete(APIView):
  permission_classes = (IsAuthenticated,)
  def get(self, request, **kwargs):
    staff_id = kwargs['id']
    staff = Staff.objects.get(id=staff_id)
    user_id = staff.values().get('user')
    user = User.objects.get(id=user_id)
    user.delete()
    staff.delete()
    return Response({'msg':'success'})



class ScheduleList(ListCreateAPIView):
  serializer_class = ScheduleSerializer
  permission_classes = (IsAuthenticated,)
  queryset = Schedule.objects.all()

  def list(self, request, *args, **kwargs):
    scheduleQuery = self.queryset.filter(company__id=kwargs['company_id'])
    serializer = self.serializer_class(scheduleQuery, many=True)
    return Response(serializer.data)

  def create(self, request, *args, **kwargs):
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    self.perform_create(serializer)

    scheduleQuery = self.queryset.filter(company__id=kwargs['company_id'])
    serializerList = self.serializer_class(scheduleQuery, many=True)

    return Response(serializerList.data, status=status.HTTP_201_CREATED)


class ScheduleUpdate(UpdateAPIView):
  serializer_class = ScheduleSerializer
  permission_classes = (IsAuthenticated,)
  queryset = Schedule.objects.all()
  lookup_field = "id"


class ScheduleGet(APIView):
  permission_classes = (IsAuthenticated,)
  def get(self, request, **kwargs):
    schedule_id = kwargs['schedule_id']
    schedule = Schedule.objects.get(id=schedule_id)
    scheduleData = ScheduleSerializer(schedule)
    return Response(scheduleData.data)

class ScheduleDelete(APIView):
  permission_classes = (IsAuthenticated,)
  def get(self, request, **kwargs):
    schedule_id = kwargs['schedule_id']
    schedule = Schedule.objects.get(id=schedule_id)
    schedule.delete()
    return Response({'msg':'success'})