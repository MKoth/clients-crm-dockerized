from django.db import models
from django.template.defaultfilters import slugify


class Group(models.Model):
  title = models.CharField(max_length=255)
  slug = models.CharField(max_length=255, null=True, blank=True)
  company = models.ForeignKey(
    'company.Company', on_delete=models.CASCADE)
  description = models.CharField(max_length=255, null=True, blank=True)
  permissions = models.CharField(max_length=255)
  
  class Meta:
    verbose_name = 'Group'
    verbose_name_plural = 'Groups'

  def __unicode__(self):
    return self.title

  def __str__(self):
    return self.title

  def save(self, *args, **kwargs):
    self.slug = slugify(self.title)
    super(Group, self).save(*args, **kwargs)


class UsersCompanyPermissions(models.Model):
  user = models.ForeignKey(
    'setting.User', on_delete=models.CASCADE, related_name='user_company_permissions_field')
  company = models.ForeignKey(
    'company.Company', on_delete=models.CASCADE)
  group = models.ForeignKey(
    Group, on_delete=models.SET_NULL, null=True, blank=True, related_name='user_company_group_field')
  phone = models.CharField(max_length=255, null=True, blank=True)
  description = models.CharField(max_length=255, null=True, blank=True)
  image = models.ImageField(upload_to ='users/%Y/%m/%d/', blank=True, null=True)
  active = models.BooleanField(default=True)

  class Meta:
    verbose_name = 'Users permission in the company'
    verbose_name_plural = 'Users permissions in the company'

  def __str__(self):
    return self.user.username