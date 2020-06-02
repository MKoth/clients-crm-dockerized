from django.urls import path, include, re_path

from .views import *

urlpatterns = [
    path('list/<company_id>/', SaleList.as_view(), name="sale_list"),
    path('update/<id>/', SaleUpdate.as_view(), name="sale_update"),
    path('get/<id>/', SaleGet.as_view(), name="sale_get"),
    path('delete/<id>/', SaleDelete.as_view(), name="sale_delete"),
    path('create/<company_id>/', SaleList.as_view(), name="sale_create"),
]