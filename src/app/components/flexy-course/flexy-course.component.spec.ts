import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlexyCourseComponent } from './flexy-course.component';

describe('FlexyCourseComponent', () => {
  let component: FlexyCourseComponent;
  let fixture: ComponentFixture<FlexyCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlexyCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlexyCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
