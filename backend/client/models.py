from django.db import models


class Client(models.Model):
  company = models.ForeignKey(
    'company.Company', on_delete=models.CASCADE, related_name='company_client', null=True)
  first_name = models.CharField(max_length=255, blank=True, null=True)
  last_name = models.CharField(max_length=255, blank=True, null=True)
  email = models.CharField(max_length=255, blank=True, null=True)
  phone = models.CharField(max_length=255, unique=True)

  class Meta:
    verbose_name = 'Client'
    verbose_name_plural = 'Clients'

  def __unicode__(self):
    return self.user.username

  def __str__(self):
    return self.user.username