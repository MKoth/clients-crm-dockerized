from django.db import models


class Staff(models.Model):
  user = models.ForeignKey(
    'setting.User', on_delete=models.CASCADE, related_name='user_staff', null=True)
  company = models.ForeignKey(
    'company.Company', on_delete=models.CASCADE, related_name='company_staff', null=True)
  active = models.BooleanField(default=True)
  booking = models.BooleanField(default=False)
  language = models.CharField(max_length=255, blank=True, null=True)
  position = models.CharField(max_length=255, blank=True, null=True)
  sex = models.CharField(max_length=255, blank=True, null=True)
  phone = models.CharField(max_length=255, blank=True, null=True)
  image =  models.ImageField(upload_to ='staff/%Y/%m/%d/', blank=True, null=True)
  description = models.CharField(max_length=255, blank=True, null=True)

  class Meta:
    verbose_name = 'Staff'
    verbose_name_plural = 'Staff members'



class Schedule(models.Model):
  staff = models.ForeignKey(
    Staff, on_delete=models.CASCADE, related_name='staff_schedule', null=True)
  company = models.ForeignKey(
    'company.Company', on_delete=models.CASCADE, related_name='company_schedule', null=True)
  startDate = models.CharField(max_length=255, null=True)
  endDate = models.CharField(max_length=255, null=True)
  title = models.CharField(max_length=255, null=True, blank=True)
  rRule = models.CharField(max_length=255, null=True, blank=True)
  exDate = models.CharField(max_length=255, null=True, blank=True)

  class Meta:
    verbose_name = 'Schedule'
    verbose_name_plural = 'Schedules'