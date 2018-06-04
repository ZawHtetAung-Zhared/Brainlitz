import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursecreateComponent } from './coursecreate.component';

describe('CoursecreateComponent', () => {
  let component: CoursecreateComponent;
  let fixture: ComponentFixture<CoursecreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursecreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursecreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
