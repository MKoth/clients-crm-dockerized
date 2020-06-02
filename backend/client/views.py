from django.contrib.auth.models import User
from django.db.models import Q

from rest_framework.generics import ListCreateAPIView, UpdateAPIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from rest_auth.registration.serializers import RegisterSerializer

from setting.serializers import UserRegistrationSerializer, CustomUserDetailsSerializer
from setting.models import User

from .models import *
from .serializers import *
from rest_framework.views import APIView

class ClientList(ListCreateAPIView):
  serializer_class = ClientSerializer
  #permission_classes = (IsAuthenticated,)
  queryset = Client.objects.all()

  def list(self, request, *args):
    serializer = ClientSerializerDeep(self.get_queryset(), many=True)
    return Response(serializer.data)

  def get_queryset(self):
    company_id = self.request.query_params.get('company')
    queryset = self.queryset.filter(company__id=company_id)
    return queryset

  def create(self, request, *args, **kwargs):
    data = request.data.copy()
    serializer = self.serializer_class(data=data)
    if serializer.is_valid():
      result = serializer.save()
      serializer = self.serializer_class(result)
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ClientUpdate(UpdateAPIView):
  serializer_class = ClientSerializer
  #permission_classes = (IsAuthenticated,)
  queryset = Client.objects.all()
  lookup_field = "id"

class ClientGet(APIView):
  #permission_classes = (IsAuthenticated,)
  def get(self, request):
    client_id = request.query_params.get('client')
    client = Client.objects.get(id=client_id)
    clientData = ClientSerializerDeep(client)
    return Response(clientData.data)

class ClientDelete(APIView):
  #permission_classes = (IsAuthenticated,)
  def post(self, request):
    if 'id' in request.data:
      client_id = request.data['id']
      client = Client.objects.get(id=client_id)
      client.delete()
      return Response({'msg':'success'})
    else:
      return Response({'msg':'You should provide id'}, status.HTTP_400_BAD_REQUEST)