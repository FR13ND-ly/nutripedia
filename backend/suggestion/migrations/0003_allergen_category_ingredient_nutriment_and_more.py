# Generated by Django 5.0.2 on 2024-03-17 18:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('suggestion', '0002_suggestionallergen_suggestioncategory_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Allergen',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('suggestionId', models.PositiveIntegerField()),
                ('name', models.PositiveIntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('suggestionId', models.PositiveIntegerField()),
                ('name', models.PositiveIntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Ingredient',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('suggestionId', models.PositiveIntegerField()),
                ('name', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Nutriment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('suggestionId', models.PositiveIntegerField()),
                ('name', models.TextField()),
                ('unit', models.TextField()),
                ('value', models.PositiveIntegerField()),
            ],
        ),
        migrations.DeleteModel(
            name='SuggestionAllergen',
        ),
        migrations.DeleteModel(
            name='SuggestionCategory',
        ),
        migrations.DeleteModel(
            name='SuggestionInfo',
        ),
        migrations.DeleteModel(
            name='SuggestionIngredient',
        ),
        migrations.DeleteModel(
            name='SuggestionNutriment',
        ),
        migrations.AddField(
            model_name='suggestion',
            name='brand',
            field=models.TextField(default=''),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='suggestion',
            name='imageUrl',
            field=models.TextField(default=''),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='suggestion',
            name='name',
            field=models.TextField(default=''),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='suggestion',
            name='weight',
            field=models.TextField(default=''),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='suggestion',
            name='state',
            field=models.IntegerField(default=-1),
        ),
    ]