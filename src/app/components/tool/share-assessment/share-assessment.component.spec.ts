import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareAssessmentComponent } from './share-assessment.component';

describe('ShareAssessmentComponent', () => {
  let component: ShareAssessmentComponent;
  let fixture: ComponentFixture<ShareAssessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShareAssessmentComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
