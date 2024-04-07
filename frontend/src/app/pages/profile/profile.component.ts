import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommunityService } from '../../core/data-access/community.service';
import { ActivatedRoute } from '@angular/router';
import { MaterialModule } from '../../core/feature/material/material.module';
import { AsyncPipe, DatePipe, JsonPipe, NgIf } from '@angular/common';
import { selectUser } from '../../store/user/user.reducer';
import { Observable, map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MaterialModule, AsyncPipe, NgIf, DatePipe, JsonPipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  store = inject(Store);
  communityService = inject(CommunityService);
  route = inject(ActivatedRoute);

  userId: any;
  user$ = this.store.select(selectUser).pipe(
    map((user: any) => user.user),
    tap((user) => (this.userId = user.id))
  );

  profile$: Observable<any> = this.route.paramMap.pipe(
    switchMap((params: any) =>
      this.communityService.getProfile(params.params.userId)
    )
  );

  profile: any;

  ngOnInit(): void {
    this.user$.subscribe();
    this.profile$.subscribe((res: any) => (this.profile = res));
  }

  onSendFriendRequest() {
    let data = {
      requestUserId: this.userId,
      sendUserId: this.profile.id,
    };

    this.communityService.sendFriendRequest(data).subscribe();
  }

  onUnfriend() {}
}
