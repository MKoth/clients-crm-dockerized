# Generated by Django 3.0.2 on 2020-03-24 12:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service', '0003_category_language'),
    ]

    operations = [
        migrations.AddField(
            model_name='service',
            name='type',
            field=models.CharField(choices=[('groups', 'For groups'), ('person', 'Fro persons')], default='groups', max_length=255),
        ),
    ]
