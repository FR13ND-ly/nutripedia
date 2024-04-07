from django.db import models
from django.utils import timezone


class User(models.Model):
    username = models.CharField(max_length=64, unique=True)
    password = models.TextField()
    isAdmin = models.BooleanField(default=False)
    imageId = models.PositiveIntegerField(default=1)
    points = models.PositiveIntegerField(default=0)
    groupBadge = models.BooleanField(default=False)
    postsBadge = models.BooleanField(default=False)
    friendsBadge = models.BooleanField(default=False)
    sportBadge = models.BooleanField(default=False)
    memberBadge = models.BooleanField(default=False)
    foodBadge = models.BooleanField(default=False)
    date = models.DateTimeField(default=timezone.now)


class Token(models.Model):
    userId = models.PositiveIntegerField()
    token = models.TextField()
    date = models.DateTimeField(default=timezone.now)


class DietaryPref(models.Model):
    userId = models.PositiveIntegerField()
    name = models.TextField()

    def __str__(self) -> str:
        return self.name + " " + User.objects.get(id = self.userId).username


class Allergen(models.Model):
    userId = models.PositiveIntegerField()
    name = models.TextField()

    def __str__(self) -> str:
        return self.name + " " + User.objects.get(id = self.userId).username