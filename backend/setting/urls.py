from django.urls import path, include, re_path

from .views import *

urlpatterns = [
    path('user/', UserView.as_view(), name="user_view"),
    path('check/email/', CheckEmailView.as_view(), name="check_email_view")
]