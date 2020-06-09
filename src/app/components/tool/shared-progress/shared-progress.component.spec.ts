import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedProgressComponent } from './shared-progress.component';

describe('SharedProgressComponent', () => {
  let component: SharedProgressComponent;
  let fixture: ComponentFixture<SharedProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SharedProgressComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
