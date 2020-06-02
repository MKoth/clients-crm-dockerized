from django.urls import path, include, re_path

from .views import *

urlpatterns = [
    path('list/<company_id>/', ServiceList.as_view(), name="service_list"),
    path('create/<company_id>/', ServiceList.as_view(), name="service_create"),
    path('get/<id>/', ServiceGet.as_view(), name="service_get"),
    path('delete/<id>/', ServiceDelete.as_view(), name="service_delete"),
    path('update/<id>/', ServiceUpdate.as_view(), name="service_update"),

    path('category/list/<company_id>/', CategoryList.as_view(), name="category_list"),
    path('category/create/<company_id>/', CategoryList.as_view(), name="category_create"),
    path('category/get/<category_id>/', CategoryGet.as_view(), name="category_get"),
    path('category/delete/<category_id>/', CategoryDelete.as_view(), name="category_delete"),
    path('category/update/<id>/', CategoryUpdate.as_view(), name="category_update"),
]