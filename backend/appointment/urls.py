from django.urls import path, include, re_path

from .views import *

urlpatterns = [
    path('timetable/', AppointmentTimeTableGet.as_view(), name="appointment_timetable"),
    path('staffs/<company_id>/', AppointmentStaffGet.as_view(), name="appointment_staff"),
    path('services/<company_id>/', AppointmentServicesGet.as_view(), name="appointment_services"),
    path('create/<company_id>/', AppointmentCreate.as_view(), name="appointment_create"),
]
