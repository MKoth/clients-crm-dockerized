from django.contrib import admin

from .models import *

class ServiceStaffConnectorAdminInline(admin.TabularInline):
    model = ServiceStaffConnector

class ServiceAdmin(admin.ModelAdmin):
    list_display = ('id', 'company', 'category', 'title', 'price', 'minutes', 'hours', 'interval', 'description', 'active', 'language', 'image')
    inlines = [ServiceStaffConnectorAdminInline]

admin.site.register(Service, ServiceAdmin)
admin.site.register(Category)