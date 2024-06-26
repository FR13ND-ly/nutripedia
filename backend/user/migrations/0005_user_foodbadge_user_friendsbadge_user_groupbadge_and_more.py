# Generated by Django 5.0.2 on 2024-04-06 19:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0004_rename_value_allergen_name_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='foodBadge',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='user',
            name='friendsBadge',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='user',
            name='groupBadge',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='user',
            name='memberBadge',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='user',
            name='points',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AddField(
            model_name='user',
            name='postsBadge',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='user',
            name='sportBadge',
            field=models.BooleanField(default=False),
        ),
    ]
