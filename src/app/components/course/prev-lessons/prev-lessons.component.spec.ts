import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevLessonsComponent } from './prev-lessons.component';

describe('PrevLessonsComponent', () => {
  let component: PrevLessonsComponent;
  let fixture: ComponentFixture<PrevLessonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PrevLessonsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrevLessonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
