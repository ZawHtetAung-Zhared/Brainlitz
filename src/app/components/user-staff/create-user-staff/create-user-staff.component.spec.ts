import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserStaffComponent } from './create-user-staff.component';

describe('CreateUserStaffComponent', () => {
  let component: CreateUserStaffComponent;
  let fixture: ComponentFixture<CreateUserStaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUserStaffComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
