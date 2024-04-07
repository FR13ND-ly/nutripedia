import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../../../core/feature/material/material.module';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CommunityService } from '../../../../core/data-access/community.service';

@Component({
  selector: 'app-friend-requests-dialog',
  standalone: true,
  imports: [MaterialModule, RouterLink, DatePipe],
  templateUrl: './friend-requests-dialog.component.html',
  styleUrl: './friend-requests-dialog.component.scss',
})
export class FriendRequestsDialogComponent {
  friends = inject(MAT_DIALOG_DATA);
  communityService = inject(CommunityService);
  dialogRef = inject(MatDialogRef);

  onResolve(req: any, state: any) {
    let data = {
      requestId: req.id,
      state,
    };
    this.communityService.resolveFriendRequest(data).subscribe((res) => {
      this.dialogRef.close();
    });
  }
}
