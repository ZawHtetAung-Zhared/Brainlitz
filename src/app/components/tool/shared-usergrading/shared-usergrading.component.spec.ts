import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedUsergradingComponent } from './shared-usergrading.component';

describe('SharedUsergradingComponent', () => {
  let component: SharedUsergradingComponent;
  let fixture: ComponentFixture<SharedUsergradingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SharedUsergradingComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedUsergradingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
