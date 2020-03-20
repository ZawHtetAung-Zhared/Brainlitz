import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentContentComponent } from './assessment-content.component';

describe('AssessmentContentComponent', () => {
  let component: AssessmentContentComponent;
  let fixture: ComponentFixture<AssessmentContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssessmentContentComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
