"""apps URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.urls import path, include, re_path
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
from django.contrib.auth.views import PasswordResetCompleteView, PasswordResetConfirmView, LoginView
from rest_framework import permissions

from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from allauth.account.views import confirm_email as allauthemailconfirmation
from setting.views import CustomLoginView, GetUserByToken

admin.site.site_header = 'Serftopia'

schema_view = get_schema_view(
   openapi.Info(
      title="Serftopia API",
      default_version='v1',
      description="Serftopia API",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@snippets.local"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

api_urlpatterns = [
    path('service/', include('service.urls')),
    path('company/', include('company.urls')),
    path('client/', include('client.urls')),
    path('users/', include('users_company_permissions.urls')),
    path('staff/', include('staff.urls')),
    path('sale/', include('sale.urls')),
    path('appointment/', include('appointment.urls')),
    path('', include('setting.urls')),
    re_path('reset/<uidb64>/<token>/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('reset/done/', PasswordResetCompleteView.as_view(), name='password_reset_complete'),
    re_path('rest-auth/registration/account-confirm-email/(?P<key>[-:\w]+)/$', allauthemailconfirmation, name='account_confirm_email'),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls'))
]

urlpatterns = [
    path('', TemplateView.as_view(template_name='index.html'), name='index'),
    path('swagger(?P<format>\.json|\.yaml)', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('admin/', admin.site.urls),
    path('api/login/', CustomLoginView.as_view(), name='my_custom_login'),
    path('api/me/', GetUserByToken.as_view(), name='get_token_owner'),
    path('api/v1/', include(api_urlpatterns)),
    path('docs/auth/', include('rest_framework.urls', namespace='rest_framework')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)