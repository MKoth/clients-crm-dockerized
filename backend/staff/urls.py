from django.urls import path, include, re_path

from .views import *

urlpatterns = [
    path('list/<company_id>/', StaffList.as_view(), name="staff_list"),
    path('update/<id>/', StaffUpdate.as_view(), name="staff_update"),
    path('get/<id>/', StaffGet.as_view(), name="staff_get"),
    path('delete/<id>/', StaffDelete.as_view(), name="staff_delete"),
    path('create/<company_id>/', StaffList.as_view(), name="staff_create"),
    path('schedule/list/<company_id>/', ScheduleList.as_view(), name="schedule_list"),
    path('schedule/update/<id>/', ScheduleUpdate.as_view(), name="schedule_update"),
    path('schedule/get/<schedule_id>/', ScheduleGet.as_view(), name="schedule_get"),
    path('schedule/delete/<schedule_id>/', ScheduleDelete.as_view(), name="schedule_delete"),
    path('schedule/create/<company_id>/', ScheduleList.as_view(), name="schedule_create"),
]