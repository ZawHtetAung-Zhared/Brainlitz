import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSelfassessmentComponent } from './create-selfassessment.component';

describe('CreateSelfassessmentComponent', () => {
  let component: CreateSelfassessmentComponent;
  let fixture: ComponentFixture<CreateSelfassessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateSelfassessmentComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSelfassessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
