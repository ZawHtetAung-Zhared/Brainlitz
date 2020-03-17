import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleSettingEditComponent } from './schedule-setting-edit.component';

describe('ScheduleSettingEditComponent', () => {
  let component: ScheduleSettingEditComponent;
  let fixture: ComponentFixture<ScheduleSettingEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduleSettingEditComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleSettingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
