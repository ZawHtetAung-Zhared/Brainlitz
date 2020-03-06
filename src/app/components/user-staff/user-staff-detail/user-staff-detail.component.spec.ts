import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStaffDetailComponent } from './user-staff-detail.component';

describe('UserStaffDetailComponent', () => {
  let component: UserStaffDetailComponent;
  let fixture: ComponentFixture<UserStaffDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserStaffDetailComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserStaffDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
