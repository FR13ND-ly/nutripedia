from rest_framework.parsers import JSONParser
from rest_framework import status
from django.http.response import JsonResponse
from .models import FriendRequest, Friendship, Group, Membership, Article, Like
from blog.views import getArticle
from file.views import getFile
from user.models import User
from django.views.decorators.csrf import csrf_exempt
from django.utils import timezone


@csrf_exempt
def sendFriendRequest(request):
    data = JSONParser().parse(request)
    req, created = FriendRequest.objects.get_or_create(
        requestUserId = data["requestUserId"],
        sendUserId = data["sendUserId"],
    )
    if created: req.save()
    return JsonResponse({}, status=status.HTTP_201_CREATED, safe=False)


@csrf_exempt
def resolveFriendRequest(request):
    data = JSONParser().parse(request)
    req = FriendRequest.objects.get(id = data["requestId"])
    if (data["state"] == "accepted"):
        friendship = Friendship.objects.create(
            firstUserId = req.sendUserId,
            secondUserId = req.requestUserId,
        )
        friendship.save()
    req.delete()
    return JsonResponse({}, status=status.HTTP_200_OK, safe=False)


@csrf_exempt
def unfriend(request):
    data = JSONParser().parse(request)
    friendship = Friendship.objects.get(
        firstUserId = data["firstUserId"],
        secondUserId = data["secondUserId"],
    )
    friendship.delete()
    return JsonResponse({}, status=status.HTTP_200_OK, safe=False)


def getFriendRequests(request, userId):
    res = []
    for req in FriendRequest.objects.filter(requestUserId = userId).order_by("-date"):
        user = User.objects.get(id = req.sendUserId)
        res.append({
            "id": req.id,
            "name": user.username,
            "imageUrl": getFile(user.imageId),
            "date": req.date,
        })
    return JsonResponse(res, status=status.HTTP_200_OK, safe=False)


def getFriends(request, userId):
    res = []
    for friendship in Friendship.objects.filter(firstUserId = userId).order_by("-date"):
        user = User.objects.get(id = friendship.secondUserId)
        res.append({
            "id": user.id,
            "name": user.username,
            "imageUrl": getFile(user.imageId),
            "date": friendship.date,
        })
    for friendship in Friendship.objects.filter(secondUserId = userId).order_by("-date"):
        user = User.objects.get(id = friendship.firstUserId)
        res.append({
            "id": user.id,
            "name": user.username,
            "imageUrl": getFile(user.imageId),
            "date": friendship.date,
        })
    return JsonResponse(res, status=status.HTTP_200_OK, safe=False)


@csrf_exempt
def createGroup(request):
    data = JSONParser().parse(request)
    group = Group.objects.create(
        creatorUserId = data["userId"],
        name = data["name"],
        description = data["description"],
        imageId = data["imageId"]
    ) 
    group.save()
    membership = Membership.objects.create(
        userId = data["userId"],
        groupId = group.id,
    )
    membership.save()
    user = User.objects.get(id = data["userId"])
    user.groupBadge = True
    user.save()
    res = getGroupSer(group)
    return JsonResponse(res, status=status.HTTP_200_OK, safe=False)


def getGroup(request, groupId):
    group = Group.objects.get(id = groupId)
    res = getGroupSer(group)
    return JsonResponse(res, status=status.HTTP_200_OK, safe=False)


def getGroupsByUser(request, userId):
    res = []
    for m in Membership.objects.filter(userId = userId).order_by("-date"):
        group = Group.objects.get(id = m.groupId)
        res.append(getGroupSer(group))
    return JsonResponse(res, status=status.HTTP_200_OK, safe=False)


@csrf_exempt
def updateGroup(request):
    data = JSONParser().parse(request)
    group = Group.objects.get(id = data["groupId"])
    group.creatorUserId = data["userId"]
    group.name = data["name"]
    group.description = data["description"]
    group.imageId = data["imageId"]
    group.save()
    res = getGroupSer(group)
    return JsonResponse(res, status=status.HTTP_200_OK, safe=False)


@csrf_exempt
def createMembership(request):
    data = JSONParser().parse(request)
    membership = Membership.objects.create(
        userId = data["userId"],
        groupId = data["groupId"],
    )
    membership.save()
    res = getGroupSer(Group.objects.get(id = data["groupId"]))
    return JsonResponse(res, status=status.HTTP_200_OK, safe=False)


@csrf_exempt
def cancelMembership(request):
    data = JSONParser().parse(request)
    membership = Membership.objects.get(
        userId = data["userId"],
        groupId = data["groupId"],
    )
    membership.delete()
    res = getGroupSer(Group.objects.get(id = data["groupId"]))
    return JsonResponse(res, status=status.HTTP_200_OK, safe=False)


@csrf_exempt
def createArticle(request):
    data = JSONParser().parse(request)
    article = Article.objects.create(
        content = data["content"],
        userId = data["userId"],
        groupId = data["groupId"]
    )
    article.save()
    user = User.objects.get(id = article.userId)
    user.postsBadge = True
    user.save()
    res = getArticleSer(article)
    return JsonResponse(res, status=status.HTTP_201_CREATED, safe=False)


@csrf_exempt
def updateArticle(request, id):
    data = JSONParser().parse(request)
    article = Article.objects.get(id = id)
    article.content = data["content"]
    article.date = timezone.now()
    article.save()
    res = getArticleSer(article)
    return JsonResponse(res, status=status.HTTP_200_OK, safe=False)


@csrf_exempt
def deleteArticle(request, id):
    article = Article.objects.get(id = id)
    for like in Like.objects.filter(articleId = article.id):
        like.delete()
    article.delete()
    return JsonResponse({}, status=status.HTTP_200_OK, safe=False)


@csrf_exempt
def like(request):
    data = JSONParser().parse(request)
    like, created = Like.objects.get_or_create(articleId = data["articleId"], userId = data["userId"])
    if created: 
        like.save()
    else: like.delete()
    likes = []
    for like in Like.objects.filter(articleId = like.articleId):
        likes.append({
            "id": like.id,
            "userId": like.userId,
        })
    return JsonResponse(likes, status=status.HTTP_200_OK, safe=False)


def getProfile(request, userId):
    user = User.objects.get(id = userId)
    res = {
        "id": user.id,
        "name": user.username,
        "groupBadge": user.groupBadge,
        "postsBadge": user.postsBadge,
        "friendsBadge": user.friendsBadge,
        "sportBadge": user.sportBadge,
        "memberBadge": user.memberBadge,
        "foodBadge": user.foodBadge,
        "imageUrl": getFile(user.imageId),
        "friends": []
    }
    for friendship in Friendship.objects.filter(firstUserId = userId).order_by("-date"):
        user = User.objects.get(id = friendship.secondUserId)
        res["friends"].append({
            "id": user.id,
            "name": user.username,
            "imageId": getFile(user.imageId),
            "date": friendship.date,
        })
    for friendship in Friendship.objects.filter(secondUserId = userId).order_by("-date"):
        user = User.objects.get(id = friendship.firstUserId)
        res["friends"].append({
            "id": user.id,
            "name": user.username,
            "imageId": getFile(user.imageId),
            "date": friendship.date,
        })
    return JsonResponse(res, status=status.HTTP_200_OK, safe=False)


def getGroupSer(group):
    res = {
        "id": group.id,
        "name": group.name,
        "description": group.description,
        "imageUrl": getFile(group.imageId),
        "followers": [],
        "articles": []
    }
    for membership in Membership.objects.filter(groupId = group.id).order_by("date"):
        res["followers"].append(membership.userId)
    for article in Article.objects.filter(groupId = group.id):
        res["articles"].append(getArticleSer(article))
    return res


def getArticleSer(article):
    user = User.objects.get(id = article.userId)
    res = {
        "id": article.id,
        "content": article.content,
        "user": {
            "id": user.id,
            "username": user.username,
            "imageUrl": getFile(user.imageId),
        },
        "likes": [],
        "date": article.date
    }
    for like in Like.objects.filter(articleId = article.id):
        res["likes"].append({
            "id": like.id,
            "userId": like.userId,
        })
    return res


