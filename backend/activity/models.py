from django.db import models
from django.utils import timezone


class Meal(models.Model):
    userId = models.PositiveIntegerField()
    name = models.TextField()
    weight = models.TextField()
    kcal = models.PositiveIntegerField()
    carbohydrates = models.PositiveIntegerField()
    protein = models.PositiveIntegerField()
    fats = models.PositiveIntegerField()
    date = models.DateTimeField(default=timezone.now)


class WaterValue(models.Model):
    userId = models.PositiveIntegerField()
    amount = models.PositiveIntegerField(default=0)
    date = models.DateTimeField(default=timezone.now)


class SportActivity(models.Model):
    userId = models.PositiveIntegerField()
    name = models.TextField()
    kcalBurn = models.PositiveIntegerField(default=0)
    date = models.DateTimeField(default=timezone.now)


class Challenge(models.Model):
    pass
