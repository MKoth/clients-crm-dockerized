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


class UserList(ListCreateAPIView):
  serializer_class = UsersCompanyPermissionsSerializer
  permission_classes = (IsAuthenticated,)
  queryset = UsersCompanyPermissions.objects.all()

  def list(self, request, *args, **kwargs):
    usersQuery = UsersCompanyPermissions.objects.filter(company__id=kwargs['company_id'])
    serializer = UsersCompanyPermissionsSerializerDeep(usersQuery, many=True)
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
    serializer = self.serializer_class(data=parsed_data)
    if serializer.is_valid():
      result = serializer.save()
      serializer = self.serializer_class(result)
      
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response({}, status=status.HTTP_400_BAD_REQUEST)

class UserUpdate(UpdateAPIView):
  serializer_class = UsersCompanyPermissionsSerializer
  permission_classes = (IsAuthenticated,)
  queryset = UsersCompanyPermissions.objects.all()
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

class UserGet(APIView):
  permission_classes = (IsAuthenticated,)
  def get(self, request, **kwargs):
    user_id = kwargs['id']
    print(user_id)
    user = UsersCompanyPermissions.objects.get(id=user_id)
    userData = UsersCompanyPermissionsSerializerDeep(user)
    return Response(userData.data)

class UserDelete(APIView):
  permission_classes = (IsAuthenticated,)
  def get(self, request, **kwargs):
    user_permission_id = kwargs['id']
    user_permission = UsersCompanyPermissions.objects.get(id=user_permission_id)
    user_id = user_permission.values().get('user')
    user = User.objects.get(id=user_id)
    user.delete()
    user_permission.delete()
    return Response({'msg':'success'})

class GroupList(APIView):
  permission_classes = (IsAuthenticated,)
  def get(self, request, **kwargs):
    company_id = kwargs['company_id']
    groups = Group.objects.filter(company__id=company_id)
    groupsData = GroupSerializerGetList(groups, many=True)
    return Response(groupsData.data)

class GroupCreate(ListCreateAPIView):
  serializer_class = GroupSerializerDeep
  permission_classes = (IsAuthenticated,)
  queryset = Group.objects.all()

  def create(self, request, *args, **kwargs):
    data = request.data.copy()
    data['company'] = kwargs['company_id']
    serializer = self.serializer_class(data=data)
    if serializer.is_valid():
      result = serializer.save()
      serializer = self.serializer_class(result)
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GroupUpdate(UpdateAPIView):
  serializer_class = GroupSerializerDeep
  permission_classes = (IsAuthenticated,)
  queryset = Group.objects.all()
  lookup_field = "id"

class GroupGet(APIView):
  permission_classes = (IsAuthenticated,)
  def get(self, request, **kwargs):
    group_id = kwargs['group_id']
    group = Group.objects.get(id=group_id)
    groupData = GroupSerializerGetList(group)
    return Response(groupData.data)

class GroupDelete(APIView):
  #permission_classes = (IsAuthenticated,)
  def post(self, request, **kwargs):
    group_id = kwargs['group_id']
    group = Group.objects.get(id=group_id)
    group.delete()
    return Response({'msg':'success'})