from __future__ import unicode_literals

from django.conf import settings
from django.db import models
from django.template.defaultfilters import slugify
from django.db.models.signals import post_save


class Category(models.Model):
    title = models.CharField(max_length=255)
    company = models.ForeignKey(
        'company.Company', on_delete=models.CASCADE, related_name='company_category', null=True)
    active = models.BooleanField(default=True)
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)
    language = models.CharField(max_length=255, null=True)
    AUDIENCE = (
        ('man', 'Man'),
        ('woman', 'Woman'),
        ('all', 'All'),
    )
    audience = models.CharField(max_length=255, choices=AUDIENCE, default='all')
    parent = models.ForeignKey('self', on_delete=models.SET_NULL, blank=True, null=True)
    image =  models.ImageField(upload_to ='category/%Y/%m/%d/', blank=True, null=True)


    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'

    def __unicode__(self):
        return self.title

    def __str__(self):
        return self.title

class Service(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, blank=True, null=True)
    company = models.ForeignKey(
        'company.Company', on_delete=models.CASCADE, related_name='company_service', null=True)
    category = models.ForeignKey(
        'service.Category', on_delete=models.SET_NULL, related_name='category_service', null=True)
    price = models.IntegerField(default=0)
    minutes = models.IntegerField(default=0)
    hours = models.IntegerField(default=1)
    interval = models.IntegerField(default=15)
    description = models.TextField(default='', null=True, blank=True)
    active = models.BooleanField(default=True)
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)
    language = models.CharField(max_length=255, null=True)
    image =  models.ImageField(upload_to ='service/%Y/%m/%d/', blank=True, null=True)

    TYPES = (
        ('groups', 'For groups'),
        ('person', 'For persons')
    )
    type = models.CharField(max_length=255, choices=TYPES, default='groups')

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super(Service, self).save(*args, **kwargs)

    class Meta:
        verbose_name = 'Service'
        verbose_name_plural = 'Servicies'

    def __unicode__(self):
        return self.title

    def __str__(self):
        return self.title

class ServiceStaffConnector(models.Model):
    service = models.ForeignKey(
        'service.Service', on_delete=models.CASCADE, null=True, related_name='staff_service_field')
    staff = models.ForeignKey(
        'staff.Staff', on_delete=models.CASCADE, null=True, related_name='service_staff_field')