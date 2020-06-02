# Generated by Django 3.0.2 on 2020-05-06 13:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('staff', '0003_staff_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='schedule',
            name='endDate',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='schedule',
            name='exDate',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='schedule',
            name='rRule',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='schedule',
            name='startDate',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='schedule',
            name='title',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
