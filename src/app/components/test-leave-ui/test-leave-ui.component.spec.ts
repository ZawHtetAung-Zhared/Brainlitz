import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestLeaveUiComponent } from './test-leave-ui.component';

describe('TestLeaveUiComponent', () => {
  let component: TestLeaveUiComponent;
  let fixture: ComponentFixture<TestLeaveUiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestLeaveUiComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestLeaveUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
