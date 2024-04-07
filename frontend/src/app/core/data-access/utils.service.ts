import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  http = inject(HttpClient);

  getProductFromApi(code: any) {
    return this.http.get(
      `https://world.openfoodfacts.org/api/v0/product/${code}.json`
    );
  }

  getLastSevenDays() {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const month = date.toLocaleString('default', { month: 'long' });
      const day = date.getDate();
      days.push({
        showName: `${day} ${month}`,
        date: date,
      });
    }
    return days;
  }
}
