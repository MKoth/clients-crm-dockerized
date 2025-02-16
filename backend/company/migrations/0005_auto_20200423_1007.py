# Generated by Django 3.0.2 on 2020-04-23 10:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('company', '0004_company_website'),
    ]

    operations = [
        migrations.AddField(
            model_name='company',
            name='cover',
            field=models.ImageField(blank=True, null=True, upload_to='uploads/cover/% Y/% m/% d/'),
        ),
        migrations.AddField(
            model_name='company',
            name='logo',
            field=models.ImageField(blank=True, null=True, upload_to='uploads/logo/% Y/% m/% d/'),
        ),
    ]
