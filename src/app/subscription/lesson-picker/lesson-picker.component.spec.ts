import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonPickerComponent } from './lesson-picker.component';

describe('LessonPickerComponent', () => {
  let component: LessonPickerComponent;
  let fixture: ComponentFixture<LessonPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LessonPickerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
