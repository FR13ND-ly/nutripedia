import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommunityService } from '../../../core/data-access/community.service';
import { MatDialog } from '@angular/material/dialog';
import { selectUser } from '../../../store/user/user.reducer';
import { Observable, map, switchMap, tap } from 'rxjs';
import { MaterialModule } from '../../../core/feature/material/material.module';
import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FriendRequestsDialogComponent } from './friend-requests-dialog/friend-requests-dialog.component';

@Component({
  selector: 'app-friends',
  standalone: true,
  imports: [MaterialModule, NgIf, AsyncPipe, RouterLink, DatePipe],
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.scss',
})
export class FriendsComponent {
  store = inject(Store);
  communityService = inject(CommunityService);
  dialog = inject(MatDialog);

  userId: any;
  user$ = this.store.select(selectUser).pipe(
    map((el: any) => el.user),
    tap((user: any) => (this.userId = user.id))
  );

  friendRequests$: Observable<any> = this.user$.pipe(
    switchMap((user: any) => this.communityService.getFriendRequests(user.id))
  );

  friends$: Observable<any> = this.user$.pipe(
    switchMap((user: any) => this.communityService.getFriendsByUser(user.id))
  );

  onOpenFriendRequests(friendRequests: any) {
    this.dialog.open(FriendRequestsDialogComponent, { data: friendRequests });
  }
}
