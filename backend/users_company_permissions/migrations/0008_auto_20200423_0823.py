# Generated by Django 3.0.2 on 2020-04-23 08:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users_company_permissions', '0007_permission_access_type'),
    ]

    operations = [
        migrations.AddField(
            model_name='group',
            name='permissions',
            field=models.CharField(default='user', max_length=255),
            preserve_default=False,
        ),
        migrations.DeleteModel(
            name='GroupPermission',
        ),
        migrations.DeleteModel(
            name='Permission',
        ),
    ]
