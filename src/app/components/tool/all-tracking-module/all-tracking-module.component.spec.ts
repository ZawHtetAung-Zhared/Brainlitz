import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTrackingModuleComponent } from './all-tracking-module.component';

describe('AllTrackingModuleComponent', () => {
  let component: AllTrackingModuleComponent;
  let fixture: ComponentFixture<AllTrackingModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AllTrackingModuleComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTrackingModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
