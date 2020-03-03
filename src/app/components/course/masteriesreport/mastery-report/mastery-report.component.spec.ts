import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasteryReportComponent } from './mastery-report.component';

describe('MasteryReportComponent', () => {
  let component: MasteryReportComponent;
  let fixture: ComponentFixture<MasteryReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MasteryReportComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasteryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
