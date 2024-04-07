import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  http = inject(HttpClient);
  apiUrl = environment.apiUrl + 'activity/';

  createMeal(data: any) {
    return this.http.post(`${this.apiUrl}meal/create/`, data);
  }

  getMealsByDay(data: any) {
    return this.http.post(`${this.apiUrl}meal/get/`, data);
  }

  deleteMeal(mealId: any) {
    return this.http.delete(`${this.apiUrl}meal/delete/${mealId}/`);
  }

  createWaterPortion(data: any) {
    return this.http.post(`${this.apiUrl}water/create/`, data);
  }

  getWaterByDay(data: any) {
    return this.http.post(`${this.apiUrl}water/get/`, data);
  }

  createSportActivity(data: any) {
    return this.http.post(`${this.apiUrl}sport-activity/create/`, data);
  }

  getSportActivityByDay(data: any) {
    return this.http.post(`${this.apiUrl}sport-activity/get/`, data);
  }

  deleteSportActivity(mealId: any) {
    return this.http.delete(`${this.apiUrl}sport-activity/delete/${mealId}/`);
  }
}
