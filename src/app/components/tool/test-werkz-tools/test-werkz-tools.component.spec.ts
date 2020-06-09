import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestWerkzToolsComponent } from './test-werkz-tools.component';

describe('TestWerkzToolsComponent', () => {
  let component: TestWerkzToolsComponent;
  let fixture: ComponentFixture<TestWerkzToolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestWerkzToolsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestWerkzToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
