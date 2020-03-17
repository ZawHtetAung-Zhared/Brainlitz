import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageRatingsComponent } from './average-ratings.component';

describe('AverageRatingsComponent', () => {
  let component: AverageRatingsComponent;
  let fixture: ComponentFixture<AverageRatingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AverageRatingsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AverageRatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
