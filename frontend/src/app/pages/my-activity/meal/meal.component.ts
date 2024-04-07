import { AsyncPipe, DatePipe, JsonPipe, NgIf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { MaterialModule } from '../../../core/feature/material/material.module';
import { DaysComponent } from '../ui/days/days.component';
import { selectUser } from '../../../store/user/user.reducer';
import { Observable, map, switchMap, tap } from 'rxjs';
import { ActivityService } from '../../../core/data-access/activity.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RaportPipe } from '../../../core/pipes/raport.pipe';

@Component({
  selector: 'app-meal',
  standalone: true,
  imports: [
    AsyncPipe,
    MaterialModule,
    DaysComponent,
    ReactiveFormsModule,
    DatePipe,
    NgIf,
    RaportPipe,
  ],
  templateUrl: './meal.component.html',
  styleUrl: './meal.component.scss',
})
export class MealComponent {
  store = inject(Store);
  activityService = inject(ActivityService);
  fb = new FormBuilder();

  selectedIndex = signal(6);

  today = new Date().getDate();

  newMealForm = this.fb.group({
    name: ['', Validators.required],
    weight: ['0 g', Validators.required],
    kcal: [0, Validators.required],
    carbohydrates: [0, Validators.required],
    protein: [0, Validators.required],
    fats: [0, Validators.required],
  });

  userId: any;
  user$ = this.store.select(selectUser).pipe(
    map((user: any) => user.user),
    tap((user: any) => (this.userId = user.id))
  );

  meals$: Observable<any> = this.user$.pipe(
    switchMap((user: any) =>
      this.activityService.getMealsByDay({ userId: user.id })
    )
  );

  onAddMeal(meals: any) {
    if (this.newMealForm.invalid) return;
    let data = {
      userId: this.userId,
      ...this.newMealForm.value,
    };
    this.activityService.createMeal(data).subscribe((res) => {
      meals.unshift(res);
    });
  }

  onDeleteMeal(meal: any, meals: any, index: any) {
    if (!confirm('Are you sure?')) return;
    this.activityService.deleteMeal(meal.id).subscribe(() => {
      meals.splice(index, 1);
    });
  }
}
