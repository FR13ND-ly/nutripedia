# Generated by Django 5.0.2 on 2024-04-06 19:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('community', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='membership',
            name='rating',
            field=models.PositiveIntegerField(default=0),
        ),
    ]