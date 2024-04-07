from django.db import models
from django.utils import timezone


class FriendRequest(models.Model):
    requestUserId = models.PositiveIntegerField()
    sendUserId = models.PositiveIntegerField()
    date = models.DateTimeField(default=timezone.now)


class Friendship(models.Model):
    firstUserId = models.PositiveIntegerField()
    secondUserId = models.PositiveIntegerField()
    date = models.DateTimeField(default=timezone.now)


class Group(models.Model):
    creatorUserId = models.PositiveIntegerField()
    name = models.TextField()
    description = models.TextField()
    date = models.DateTimeField(default=timezone.now)
    imageId = models.PositiveIntegerField(default=1)


class Membership(models.Model):
    userId = models.PositiveIntegerField()
    groupId = models.PositiveIntegerField()
    rating = models.PositiveIntegerField(default=0)
    date = models.DateTimeField(default=timezone.now)


class Article(models.Model):
    groupId = models.PositiveIntegerField()
    userId = models.PositiveIntegerField()
    content = models.TextField()
    date = models.DateTimeField(default=timezone.now)


class Like(models.Model):
    articleId = models.PositiveIntegerField()
    userId = models.PositiveIntegerField()
    date = models.DateTimeField(default=timezone.now)


class Challenge(models.Model):
    pass
