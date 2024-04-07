from . import views
from django.urls import path

urlpatterns = [
    path("meal/create/", views.createMeal),
    path("meal/get/", views.getMealsByDay),
    path("meal/delete/<str:mealId>/", views.deleteMeal),
    
    path("water/create/", views.createWaterPortion),
    path("water/get/", views.getWaterByDay),
    
    path("sport-activity/create/", views.createSportActivity),
    path("sport-activity/get/", views.getSportActivityByDay),
    path("sport-activity/delete/<str:sportActivityId>/", views.deleteSportActivity),
]