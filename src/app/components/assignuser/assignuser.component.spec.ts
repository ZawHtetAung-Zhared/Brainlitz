import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignuserComponent } from './assignuser.component';

describe('AssignuserComponent', () => {
  let component: AssignuserComponent;
  let fixture: ComponentFixture<AssignuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
