import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleQuestionComponent } from './sample-question.component';

describe('SampleQuestionComponent', () => {
  let component: SampleQuestionComponent;
  let fixture: ComponentFixture<SampleQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SampleQuestionComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
