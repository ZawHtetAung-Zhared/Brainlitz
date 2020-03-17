import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceSettingEditComponent } from './invoice-setting-edit.component';

describe('InvoiceSettingEditComponent', () => {
  let component: InvoiceSettingEditComponent;
  let fixture: ComponentFixture<InvoiceSettingEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InvoiceSettingEditComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceSettingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
