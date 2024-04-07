import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../../core/feature/material/material.module';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../store/user/user.reducer';
import { CommunityService } from '../../../core/data-access/community.service';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { Observable, map, switchMap, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CreateGroupDialogComponent } from './create-group-dialog/create-group-dialog.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-communities',
  standalone: true,
  imports: [MaterialModule, AsyncPipe, NgIf, RouterLink],
  templateUrl: './communities.component.html',
  styleUrl: './communities.component.scss',
})
export class CommunitiesComponent {
  store = inject(Store);
  communityService = inject(CommunityService);
  dialog = inject(MatDialog);

  userId: any;
  user$ = this.store.select(selectUser).pipe(
    map((el: any) => el.user),
    tap((user: any) => (this.userId = user.id))
  );

  communities$: Observable<any> = this.user$.pipe(
    switchMap((user: any) => {
      return this.communityService.getGroupsByUser(user.id);
    })
  );

  onCreateGroup(communities: any) {
    let d = this.dialog.open(CreateGroupDialogComponent);
    d.afterClosed().subscribe((res: any) => {
      if (!res) return;
      let data = {
        ...res,
        userId: this.userId,
      };
      this.communityService.createGroup(data).subscribe((res) => {
        communities.unshift(res);
      });
    });
  }

  onUnsubscribe(group: any, groups: any, index: any) {
    if (!confirm('Are you sure')) return;
    let data = {
      groupId: group.id,
      userId: this.userId,
    };
    this.communityService.cancelMembership(data).subscribe(() => {
      groups.splice(index, 1);
    });
  }
}
