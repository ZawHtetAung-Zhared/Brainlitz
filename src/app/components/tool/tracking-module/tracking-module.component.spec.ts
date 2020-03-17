import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingModuleComponent } from './tracking-module.component';

describe('TrackingModuleComponent', () => {
  let component: TrackingModuleComponent;
  let fixture: ComponentFixture<TrackingModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TrackingModuleComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
