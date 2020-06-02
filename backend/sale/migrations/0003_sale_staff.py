# Generated by Django 3.0.2 on 2020-03-22 20:15

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('sale', '0002_sale_service'),
        ('staff', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='sale',
            name='staff',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='staff_sale', to='staff.Staff'),
        ),
    ]
