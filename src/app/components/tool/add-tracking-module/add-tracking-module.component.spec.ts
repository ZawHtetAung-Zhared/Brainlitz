import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTrackingModuleComponent } from './add-tracking-module.component';

describe('AddTrackingModuleComponent', () => {
  let component: AddTrackingModuleComponent;
  let fixture: ComponentFixture<AddTrackingModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddTrackingModuleComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTrackingModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
