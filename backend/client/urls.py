from django.urls import path, include, re_path

from .views import *

urlpatterns = [
    path('list/', ClientList.as_view(), name="client_list"),
    path('update/<id>/', ClientUpdate.as_view(), name="client_update"),
    path('get/', ClientGet.as_view(), name="client_get"),
    path('delete/', ClientDelete.as_view(), name="client_delete"),

]