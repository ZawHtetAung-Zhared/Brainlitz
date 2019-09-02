import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGradingComponent } from './user-grading.component';

describe('UserGradingComponent', () => {
  let component: UserGradingComponent;
  let fixture: ComponentFixture<UserGradingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserGradingComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGradingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
