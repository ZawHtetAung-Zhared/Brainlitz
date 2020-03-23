import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainTrackingModuleComponent } from './main-tracking-module.component';

describe('MainTrackingModuleComponent', () => {
  let component: MainTrackingModuleComponent;
  let fixture: ComponentFixture<MainTrackingModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MainTrackingModuleComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainTrackingModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
