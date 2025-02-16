# Generated by Django 3.0.2 on 2020-04-29 20:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('service', '0007_auto_20200324_1523'),
    ]

    operations = [
        migrations.RenameField(
            model_name='category',
            old_name='is_active',
            new_name='active',
        ),
        migrations.RenameField(
            model_name='service',
            old_name='is_active',
            new_name='active',
        ),
        migrations.RenameField(
            model_name='service',
            old_name='duration_hours',
            new_name='hours',
        ),
        migrations.RenameField(
            model_name='service',
            old_name='duration_minutes',
            new_name='minutes',
        ),
        migrations.AddField(
            model_name='category',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='category/%Y/%m/%d/'),
        ),
        migrations.AddField(
            model_name='category',
            name='parent',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='service.Category'),
        ),
        migrations.AddField(
            model_name='service',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='service/%Y/%m/%d/'),
        ),
        migrations.AddField(
            model_name='service',
            name='interval',
            field=models.IntegerField(default=15),
        ),
        migrations.AddField(
            model_name='service',
            name='language',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='service',
            name='description',
            field=models.TextField(blank=True, default='', null=True),
        ),
        migrations.AlterField(
            model_name='servicestaffconnector',
            name='service',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='staff_service_field', to='service.Service'),
        ),
        migrations.DeleteModel(
            name='CategoryStaffConnector',
        ),
    ]
