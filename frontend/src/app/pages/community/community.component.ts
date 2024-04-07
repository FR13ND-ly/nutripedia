import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser } from '../../store/user/user.reducer';
import { Observable, map, switchMap, tap } from 'rxjs';
import { CommunityService } from '../../core/data-access/community.service';
import { ActivatedRoute } from '@angular/router';
import { MaterialModule } from '../../core/feature/material/material.module';
import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserComponent } from '../../core/ui/user/user.component';
import { LikedPipe } from '../../core/pipes/liked.pipe';

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [
    MaterialModule,
    AsyncPipe,
    NgIf,
    ReactiveFormsModule,
    UserComponent,
    DatePipe,
    LikedPipe,
  ],
  templateUrl: './community.component.html',
  styleUrl: './community.component.scss',
})
export class CommunityComponent implements OnInit {
  store = inject(Store);
  communityService = inject(CommunityService);
  route = inject(ActivatedRoute);
  fb = new FormBuilder();

  userId: any;
  user$ = this.store.select(selectUser).pipe(
    map((user: any) => user.user),
    tap((user) => (this.userId = user.id))
  );

  articleForm = this.fb.group({
    content: ['', Validators.required],
  });

  group$: Observable<any> = this.route.paramMap.pipe(
    switchMap((params: any) =>
      this.communityService.getGroup(params.params.groupId)
    )
  );

  group: any;

  ngOnInit(): void {
    this.user$.subscribe();
    this.group$.subscribe((res: any) => (this.group = res));
  }

  onUnsubscribe(group: any) {
    if (!confirm('Are you sure')) return;
    let data = {
      groupId: group.id,
      userId: this.userId,
    };
    this.communityService.cancelMembership(data).subscribe((res: any) => {
      this.group$ = this.route.paramMap.pipe(
        switchMap((params: any) =>
          this.communityService.getGroup(params.params.groupId)
        )
      );
    });
  }

  onSubscribe(group: any) {
    let data = {
      userId: this.userId,
      groupId: group.id,
    };
    this.communityService.createMembership(data).subscribe((res: any) => {
      this.group$ = this.route.paramMap.pipe(
        switchMap((params: any) =>
          this.communityService.getGroup(params.params.groupId)
        )
      );
    });
  }

  onPublish() {
    if (this.articleForm.invalid) return;
    let data = {
      groupId: this.group.id,
      userId: this.userId,
      content: this.articleForm.value.content,
    };
    this.communityService.createArticle(data).subscribe((res) => {
      this.group.articles.unshift(res);
    });
  }

  onLike(article: any) {
    let data = {
      articleId: article.id,
      userId: this.userId,
    };
    this.communityService.like(data).subscribe((res) => (article.likes = res));
  }

  onDeleteArticle(article: any, articles: any, index: any) {
    this.communityService.deleteArticle(article.id).subscribe(() => {
      articles.splice(index, 1);
    });
  }
}
