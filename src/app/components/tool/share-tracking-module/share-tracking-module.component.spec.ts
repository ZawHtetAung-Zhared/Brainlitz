import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareTrackingModuleComponent } from './share-tracking-module.component';

describe('ShareTrackingModuleComponent', () => {
  let component: ShareTrackingModuleComponent;
  let fixture: ComponentFixture<ShareTrackingModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShareTrackingModuleComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareTrackingModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
