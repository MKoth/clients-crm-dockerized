from django.contrib import admin
from .models import Staff
from .models import Schedule

# Register your models here.
admin.site.register(Staff)
admin.site.register(Schedule)