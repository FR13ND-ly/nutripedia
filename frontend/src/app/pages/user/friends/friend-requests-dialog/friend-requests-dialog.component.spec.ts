import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendRequestsDialogComponent } from './friend-requests-dialog.component';

describe('FriendRequestsDialogComponent', () => {
  let component: FriendRequestsDialogComponent;
  let fixture: ComponentFixture<FriendRequestsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FriendRequestsDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FriendRequestsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
