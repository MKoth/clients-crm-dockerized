from __future__ import unicode_literals

from django.conf import settings
from django.db import models
from django.template.defaultfilters import slugify
from django.db.models.signals import post_save

class Company(models.Model):
    user = models.ForeignKey(
        'setting.User', on_delete=models.SET_NULL, related_name='user_company', null=True)
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, blank=True, null=True)
    address = models.CharField(max_length=255, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)
    currency = models.CharField(max_length=255, blank=True, null=True)
    language = models.CharField(max_length=255, blank=True, null=True)
    vat = models.IntegerField(blank=True, null=True)
    time_zone = models.CharField(max_length=255, blank=True, null=True)
    description = models.CharField(max_length=255, blank=True, null=True)
    phone = models.CharField(max_length=255, blank=True, null=True)
    email = models.CharField(max_length=255, blank=True, null=True)
    website = models.CharField(max_length=255, blank=True, null=True)
    whatsap = models.CharField(max_length=255, blank=True, null=True)
    telegram = models.CharField(max_length=255, blank=True, null=True)
    viber = models.CharField(max_length=255, blank=True, null=True)
    logo = models.ImageField(upload_to ='uploads/%Y/%m/%d/', blank=True, null=True)
    cover = models.ImageField(upload_to ='uploads/%Y/%m/%d/', blank=True, null=True)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super(Company, self).save(*args, **kwargs)

    class Meta:
        verbose_name = 'Company'
        verbose_name_plural = 'Companies'

    def __unicode__(self):
        return self.title

    def __str__(self):
        return self.title


class WorkingTime(models.Model):
    day = models.IntegerField(null=True)
    hour_from = models.TimeField(null=True)
    hour_to = models.TimeField(null=True)
    company = models.ForeignKey(
        'company.Company', on_delete=models.CASCADE, related_name='company_working_time', null=True)
    is_active = models.BooleanField(default=True)
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Working time'
        verbose_name_plural = 'Working times'

    def __unicode__(self):
        week_days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        return self.hour_from.strftime("%H:%M")+'-'+self.hour_to.strftime("%H:%M")+", "+week_days[self.day]

    def __str__(self):
        week_days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        return self.hour_from.strftime("%H:%M")+'-'+self.hour_to.strftime("%H:%M")+", "+week_days[self.day]

class SocialLink(models.Model):
    title = models.CharField(max_length=255)
    link = models.CharField(max_length=255)
    company = models.ForeignKey(
        'company.Company', on_delete=models.CASCADE, related_name='company_social_link', null=True)
    is_active = models.BooleanField(default=True)
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Social link'
        verbose_name_plural = 'Social links'

    def __unicode__(self):
        return self.title

    def __str__(self):
        return self.title
