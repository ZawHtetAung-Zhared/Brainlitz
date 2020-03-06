import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasteriesreportComponent } from './masteriesreport.component';

describe('MasteriesreportComponent', () => {
  let component: MasteriesreportComponent;
  let fixture: ComponentFixture<MasteriesreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MasteriesreportComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasteriesreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
