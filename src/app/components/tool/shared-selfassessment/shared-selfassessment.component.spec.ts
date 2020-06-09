import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedSelfassessmentComponent } from './shared-selfassessment.component';

describe('SharedSelfassessmentComponent', () => {
  let component: SharedSelfassessmentComponent;
  let fixture: ComponentFixture<SharedSelfassessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SharedSelfassessmentComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedSelfassessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
