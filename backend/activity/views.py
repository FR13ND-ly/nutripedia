from .models import Meal, WaterValue, SportActivity
from django.views.decorators.csrf import csrf_exempt
from django.utils import timezone
from rest_framework.parsers import JSONParser
from rest_framework import status
from django.http.response import JsonResponse
from datetime import datetime, timedelta

@csrf_exempt
def createMeal(request):
    data = JSONParser().parse(request)
    meal = Meal.objects.create(
        userId = data["userId"],
        name = data["name"],
        weight = data["weight"],
        kcal = data["kcal"],
        carbohydrates = data["carbohydrates"],
        protein = data["protein"],
        fats = data["fats"],
    )
    meal.save()
    res = getMealSer(meal)
    return JsonResponse(res, status=status.HTTP_200_OK, safe=False)



@csrf_exempt
def getMealsByDay(request):
    data = JSONParser().parse(request)
    days = getLastSevenDays()
    for day in days:
        for meal in Meal.objects.filter(
            userId = data["userId"],
            date__date = day["date"]
        ):
            day["content"].append(getMealSer(meal))
    return JsonResponse(days, status=status.HTTP_200_OK, safe=False)


@csrf_exempt
def deleteMeal(request, mealId):
    meal = Meal.objects.get(id = mealId)
    meal.delete()
    return JsonResponse({}, status=status.HTTP_200_OK, safe=False)


@csrf_exempt
def createWaterPortion(request):
    data = JSONParser().parse(request)
    water, created = WaterValue.objects.get_or_create(
        userId = data["userId"],
        date__date = timezone.now().date()
    )
    water.amount += data["amount"]
    water.save()
    res = getWaterValueSer(water)
    return JsonResponse(res, status=status.HTTP_200_OK, safe=False)


@csrf_exempt
def getWaterByDay(request):
    data = JSONParser().parse(request)
    days =  getLastSevenDays()
    for day in days:
        try:
            water = WaterValue.objects.get(
                userId = data["userId"],
                date__date = day["date"]
            )
            day["content"] = getWaterValueSer(water)
        except Exception as e:
            print(e)
            day["content"] = {
                "amount": 0
            }
    return JsonResponse(days, status=status.HTTP_200_OK, safe=False)




@csrf_exempt
def createSportActivity(request):
    data = JSONParser().parse(request)
    sportActivity = SportActivity.objects.create(
        userId = data["userId"],
        name = data["name"],
        kcalBurn = data["kcalBurn"]
    )
    sportActivity.save()
    res = getSportActivitySer(sportActivity)
    return JsonResponse(res, status=status.HTTP_200_OK, safe=False)



@csrf_exempt
def getSportActivityByDay(request):
    data = JSONParser().parse(request)
    days =  getLastSevenDays()
    for day in days:
        for sportActivity in SportActivity.objects.filter(
            userId = data["userId"],
            date__date = day["date"]
        ):
            day["content"].append(getSportActivitySer(sportActivity))
    return JsonResponse(days, status=status.HTTP_200_OK, safe=False)


@csrf_exempt
def deleteSportActivity(request, sportActivityId):
    sportActivity = SportActivity.objects.get(id = sportActivityId)
    sportActivity.delete()
    return JsonResponse({}, status=status.HTTP_200_OK, safe=False)



def normalizeDate(date, days=0):
    iso_date = datetime.fromisoformat(date)
    iso_date += timedelta(days=days)

    if timezone.is_naive(iso_date):
        try:
            iso_date = timezone.make_aware()
        except (ValueError, TypeError):
            pass
    return iso_date


def getMealSer(meal):
    return {
        "id": meal.id,
        "userId": meal.userId,
        "name": meal.name,
        "weight": meal.weight,
        "kcal": meal.kcal,
        "carbohydrates": meal.carbohydrates,
        "protein": meal.protein,
        "fats": meal.fats,
        "date": meal.date,
    }


def getWaterValueSer(water):
    return {
        "id": water.id,
        "userId": water.userId,
        "amount": water.amount,
    }


def getSportActivitySer(sportActivity):
    return {
        "id": sportActivity.id,
        "userId": sportActivity.userId,
        "name": sportActivity.name,
        "kcalBurn": sportActivity.kcalBurn,
        "date": sportActivity.date,
    }


def getLastSevenDays():
    days = []
    today = datetime.now()
    for i in range(6, -1, -1):
        date = today - timedelta(days=i)
        show_name = date.strftime("%d %B")
        days.append({
            "showName": show_name,
            "date": date,
            "day": date.day,
            "content": []
        })
    return days