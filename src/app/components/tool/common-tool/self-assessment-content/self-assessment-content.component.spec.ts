import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfAssessmentContentComponent } from './self-assessment-content.component';

describe('SelfAssessmentContentComponent', () => {
  let component: SelfAssessmentContentComponent;
  let fixture: ComponentFixture<SelfAssessmentContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelfAssessmentContentComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfAssessmentContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
