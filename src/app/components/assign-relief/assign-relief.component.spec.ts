import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignReliefComponent } from './assign-relief.component';

describe('AssignReliefComponent', () => {
  let component: AssignReliefComponent;
  let fixture: ComponentFixture<AssignReliefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssignReliefComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignReliefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
