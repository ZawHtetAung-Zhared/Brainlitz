import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendHistoryComponent } from './send-history.component';

describe('SendHistoryComponent', () => {
  let component: SendHistoryComponent;
  let fixture: ComponentFixture<SendHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SendHistoryComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
