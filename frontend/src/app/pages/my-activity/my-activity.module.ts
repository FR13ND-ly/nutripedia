import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MyActivityComponent } from './my-activity.component';
import { MealComponent } from './meal/meal.component';
import { WaterComponent } from './water/water.component';
import { SportComponent } from './sport/sport.component';
import { RewardsComponent } from './rewards/rewards.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: MyActivityComponent,
        children: [
          { path: '', redirectTo: 'meal', pathMatch: 'full' },
          { path: 'meal', component: MealComponent },
          { path: 'water', component: WaterComponent },
          { path: 'sport-activity', component: SportComponent },
          { path: 'rewards', component: RewardsComponent },
        ],
      },
    ]),
  ],
})
export class MyActivityModule {}
