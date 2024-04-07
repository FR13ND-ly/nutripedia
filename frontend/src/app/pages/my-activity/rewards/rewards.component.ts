import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommunityService } from '../../../core/data-access/community.service';
import { selectUser } from '../../../store/user/user.reducer';
import { Observable, map, switchMap, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-rewards',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './rewards.component.html',
  styleUrl: './rewards.component.scss',
})
export class RewardsComponent {
  store = inject(Store);
  communityService = inject(CommunityService);

  userId: any;
  user$ = this.store.select(selectUser).pipe(
    map((user: any) => user.user),
    tap((user) => (this.userId = user.id))
  );

  profile$: Observable<any> = this.user$.pipe(
    switchMap((user: any) => this.communityService.getProfile(user.id))
  );
}
