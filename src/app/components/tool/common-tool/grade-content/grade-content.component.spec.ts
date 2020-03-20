import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeContentComponent } from './grade-content.component';

describe('GradeContentComponent', () => {
  let component: GradeContentComponent;
  let fixture: ComponentFixture<GradeContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GradeContentComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradeContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
