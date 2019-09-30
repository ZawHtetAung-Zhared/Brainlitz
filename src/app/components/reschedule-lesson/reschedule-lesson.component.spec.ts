import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RescheduleLessonComponent } from './reschedule-lesson.component';

describe('RescheduleLessonComponent', () => {
  let component: RescheduleLessonComponent;
  let fixture: ComponentFixture<RescheduleLessonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RescheduleLessonComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RescheduleLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
