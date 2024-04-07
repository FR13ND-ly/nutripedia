from . import views
from django.urls import path

urlpatterns = [
    path("friend-request/send/", views.sendFriendRequest),
    path("friend-request/resolve/", views.resolveFriendRequest),
    path("friend-request/get/<int:userId>/", views.getFriendRequests),
    path("friends/get/<int:userId>/", views.getFriends),
    
    path("group/create/", views.createGroup),
    path("group/get/<int:groupId>/", views.getGroup),
    path("group/get-by-user/<int:userId>/", views.getGroupsByUser),
    path("group/update/", views.updateGroup),

    path("group/membership/create/", views.createMembership),
    path("group/membership/cancel/", views.cancelMembership),

    path("group/article/create/", views.createArticle),
    path("group/article/update/", views.updateArticle),
    path("group/article/like/", views.like),
    path("group/article/delete/<int:id>/", views.deleteArticle),

    path("profile/get/<int:userId>/", views.getProfile)
]