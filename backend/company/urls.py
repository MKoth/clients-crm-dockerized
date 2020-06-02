from django.urls import path, include, re_path

from .views import *

urlpatterns = [
    path('create/', CompanyList.as_view(), name="company_create"),
    path('update/<id>/', CompanyUpdate.as_view(), name="company_update"),
    path('hours/update/<company_id>/<day_index>/', WorkingTimeUpdateList.as_view(), name="hours_update_list"),
    path('hours/<company_id>/', WorkingTimeGetList.as_view(), name="hours_update"),
    path('socials/update/<social_id>/', SocialLinkUpdate.as_view(), name="socials_single_update"),
    path('socials/delete/<social_id>/', SocialLinkDelete.as_view(), name="socials_single_update"),
    path('socials/create/', SocialLinkCreate.as_view(), name="socials_single_create"),
    path('socials/<company_id>/', SocialLinkUpdateList.as_view(), name="socials_update"),
    path('media/<company_id>/', CompanyMediaUpdate.as_view(), name="media_update"),
    path('get/<company_id>/', CompanyGet.as_view(), name="company_get")
]