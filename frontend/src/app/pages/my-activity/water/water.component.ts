import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MaterialModule } from '../../../core/feature/material/material.module';
import { DaysComponent } from '../ui/days/days.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RaportPipe } from '../../../core/pipes/raport.pipe';
import { Store } from '@ngrx/store';
import { ActivityService } from '../../../core/data-access/activity.service';
import { selectUser } from '../../../store/user/user.reducer';
import { Observable, map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-water',
  standalone: true,
  imports: [
    AsyncPipe,
    MaterialModule,
    DaysComponent,
    DatePipe,
    NgIf,
    RaportPipe,
  ],
  templateUrl: './water.component.html',
  styleUrl: './water.component.scss',
})
export class WaterComponent {
  store = inject(Store);
  activityService = inject(ActivityService);

  selectedIndex = signal(6);

  today = new Date().getDate();

  userId: any;
  user$ = this.store.select(selectUser).pipe(
    map((user: any) => user.user),
    tap((user: any) => (this.userId = user.id))
  );

  water$: Observable<any> = this.user$.pipe(
    switchMap((user: any) =>
      this.activityService.getWaterByDay({ userId: user.id })
    )
  );

  onAddWater(amount: any, day: any) {
    let data = {
      userId: this.userId,
      amount,
    };
    this.activityService.createWaterPortion(data).subscribe(() => {
      day.content.amount += amount;
    });
  }
}
