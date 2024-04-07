import { Component, inject, signal } from '@angular/core';
import { RaportPipe } from '../../../core/pipes/raport.pipe';
import { AsyncPipe, DatePipe, JsonPipe, NgIf } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DaysComponent } from '../ui/days/days.component';
import { MaterialModule } from '../../../core/feature/material/material.module';
import { Store } from '@ngrx/store';
import { ActivityService } from '../../../core/data-access/activity.service';
import { Observable, map, switchMap, tap } from 'rxjs';
import { selectUser } from '../../../store/user/user.reducer';

@Component({
  selector: 'app-sport',
  standalone: true,
  imports: [
    AsyncPipe,
    MaterialModule,
    DaysComponent,
    ReactiveFormsModule,
    DatePipe,
    NgIf,
    RaportPipe,
    JsonPipe,
  ],
  templateUrl: './sport.component.html',
  styleUrl: './sport.component.scss',
})
export class SportComponent {
  store = inject(Store);
  activityService = inject(ActivityService);
  fb = new FormBuilder();

  selectedIndex = signal(6);

  today = new Date().getDate();

  newActivity = this.fb.group({
    name: ['', Validators.required],
    kcalBurn: [0, Validators.required],
  });

  userId: any;
  user$ = this.store.select(selectUser).pipe(
    map((user: any) => user.user),
    tap((user: any) => (this.userId = user.id))
  );

  sports$: Observable<any> = this.user$.pipe(
    switchMap((user: any) =>
      this.activityService.getSportActivityByDay({ userId: user.id })
    )
  );

  onAddSportActivity(sports: any) {
    if (this.newActivity.invalid) return;
    let data = {
      userId: this.userId,
      ...this.newActivity.value,
    };
    this.activityService.createSportActivity(data).subscribe((res) => {
      sports.unshift(res);
    });
  }

  onDeleteActivity(activity: any, sports: any, index: any) {
    if (!confirm('Are you sure?')) return;
    this.activityService.deleteSportActivity(activity.id).subscribe(() => {
      sports.splice(index, 1);
    });
  }
}
