# Generated by Django 3.0.2 on 2020-04-03 17:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('company', '0004_company_website'),
        ('users_company_permissions', '0003_userscompanypermissions_active'),
    ]

    operations = [
        migrations.AddField(
            model_name='group',
            name='company',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='company.Company'),
        ),
    ]
