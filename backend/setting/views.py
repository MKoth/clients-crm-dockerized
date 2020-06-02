from __future__ import unicode_literals

from rest_framework.generics import RetrieveUpdateAPIView, CreateAPIView, RetrieveAPIView, ListAPIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from django.conf import settings
from rest_auth.views import LoginView
from company.models import Company
from company.serializers import CompanySerializerDeep
from client.models import Client
from client.serializers import ClientSerializerDeep
from staff.models import Staff
from staff.serializers import StaffSerializerDeep
from users_company_permissions.models import *
from users_company_permissions.serializers import *
from setting.models import User

from .serializers import *
from .models import *

class CheckEmailView(APIView):
    serializer_class = CheckEmailSerializer
    """
    Check email
    """

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            return Response({"email": "Email is exists"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserView(RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.queryset.get(pk=self.request.user.id)

class CountryListView(ListAPIView):
    serializer_class = CountrySerializer

    def list(self, request, *args):
        queryset = Country.objects.filter(is_active=True)
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)


class CustomLoginView(LoginView):
    def get_response(self):
        orginal_response = super().get_response()
        print( orginal_response.data )
        user_id = orginal_response.data['user']['id']

        try:
            company = Company.objects.get(user__id=user_id)
        except Company.DoesNotExist:
            company = None
        try:
            staff = Staff.objects.get(user__id=user_id)
        except Staff.DoesNotExist:
            staff = None
        try:
            userWithPermission = UsersCompanyPermissions.objects.get(user__id=user_id)
        except UsersCompanyPermissions.DoesNotExist:
            userWithPermission = None

        if company:
            companyData = CompanySerializerDeep(company)
            customdata = {"user_type":"company", "company":companyData.data}
        elif staff:
            staffData = StaffSerializerDeep(staff)
            customdata = {"user_type":"staff", "additional_data":staffData.data, "company":staffData.data.company}
        elif userWithPermission:
            userWithPermissionData = UsersCompanyPermissionsSerializerDeep(userWithPermission)
            customdata = {"user_type":"user", "additional_data":userWithPermissionData.data, "company":userWithPermissionData.data.company}

        orginal_response.data.update(customdata)
        return orginal_response

class GetUserByToken(APIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        token = request.META.get('HTTP_AUTHORIZATION')
        tokenData = token.split(" ")
        user = Token.objects.get(key=tokenData[1]).user
        userData = self.serializer_class(user)
        print(userData.data)
        user_id = userData.data['id']

        try:
            company = Company.objects.get(user__id=user_id)
        except Company.DoesNotExist:
            company = None
        try:
            staff = Staff.objects.get(user__id=user_id)
        except Staff.DoesNotExist:
            staff = None
        try:
            userWithPermission = UsersCompanyPermissions.objects.get(user__id=user_id)
        except UsersCompanyPermissions.DoesNotExist:
            userWithPermission = None

        if company:
            companyData = CompanySerializerDeep(company)
            customdata = {"user_type":"company", "company":companyData.data}
        elif staff:
            staffData = StaffSerializerDeep(staff)
            customdata = {"user_type":"staff", "additional_data":staffData.data, "company":staffData.data.company}
        elif userWithPermission:
            userWithPermissionData = UsersCompanyPermissionsSerializerDeep(userWithPermission)
            customdata = {"user_type":"user", "additional_data":userWithPermissionData.data, "company":userWithPermissionData.data.company}

        customdata.update(userData.data)

        return Response(customdata)
        