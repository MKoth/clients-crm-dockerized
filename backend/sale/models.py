from __future__ import unicode_literals

from django.conf import settings
from django.db import models
from django.template.defaultfilters import slugify
from django.db.models.signals import post_save
from service.models import Service

class Sale(models.Model):
    company = models.ForeignKey(
        'company.Company', on_delete=models.CASCADE, related_name='company_sale', null=True)
    title = models.CharField(max_length=255, null=True, blank=True)
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)
    startDate = models.CharField(max_length=255, null=True)
    endDate = models.CharField(max_length=255, null=True)
    status = models.CharField(max_length=255, null=True)
    staff = models.ForeignKey(
        'staff.Staff', on_delete=models.SET_NULL, null=True, blank=True)
    name = models.CharField(max_length=255, null=True, blank=True, default='')
    email = models.CharField(max_length=255, null=True, blank=True)
    phone = models.CharField(max_length=255, null=True, blank=True)
    description = models.CharField(max_length=255, null=True, blank=True)
    services = models.ManyToManyField(Service)

    class Meta:
        verbose_name = 'Sale'
        verbose_name_plural = 'Sales'

    def __unicode__(self):
        return self.name

    def __str__(self):
        return self.name
    