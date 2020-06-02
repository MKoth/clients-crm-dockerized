from django.contrib import admin

from .models import *

class WorkingTimeAdmin(admin.ModelAdmin):
    list_display = ('id', 'day', 'hour_from', 'hour_to','is_active')

admin.site.register(WorkingTime, WorkingTimeAdmin)

class SocialLinkAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'link', 'is_active')

admin.site.register(SocialLink, SocialLinkAdmin)

class WorkingTimeAdminInline(admin.TabularInline):
    model = WorkingTime

class SocialLinkAdminInline(admin.TabularInline):
    model = SocialLink

class CompanyAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'user', 'slug', 'address', 'is_active', 'currency', 'language', 
        'vat', 'time_zone', 'description', 'phone', 'email', 'website', 'whatsap', 'telegram', 'viber',
        'logo', 'cover')
    inlines = [WorkingTimeAdminInline, SocialLinkAdminInline]

admin.site.register(Company, CompanyAdmin)
