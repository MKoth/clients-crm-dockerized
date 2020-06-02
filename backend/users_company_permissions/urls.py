from django.urls import path, include, re_path

from .views import *

urlpatterns = [
    path('list/<company_id>/', UserList.as_view(), name="users_list"),
    path('update/<id>/', UserUpdate.as_view(), name="users_update"),
    path('get/<id>/', UserGet.as_view(), name="user_get"),
    path('delete/<id>/', UserDelete.as_view(), name="user_delete"),
    path('groups/list/<company_id>/', GroupList.as_view(), name="groups_list"),
    path('groups/create/<company_id>/', GroupCreate.as_view(), name="groups_create"),
    path('groups/update/<id>/', GroupUpdate.as_view(), name="groups_update"),
    path('groups/get/<group_id>/', GroupGet.as_view(), name="groups_get"),
    path('groups/delete/<group_id>/', GroupDelete.as_view(), name="groups_delete"),

]