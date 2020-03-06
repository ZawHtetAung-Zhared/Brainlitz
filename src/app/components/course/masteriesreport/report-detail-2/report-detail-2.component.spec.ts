import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDetail2Component } from './report-detail-2.component';

describe('ReportDetail2Component', () => {
  let component: ReportDetail2Component;
  let fixture: ComponentFixture<ReportDetail2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReportDetail2Component]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportDetail2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
