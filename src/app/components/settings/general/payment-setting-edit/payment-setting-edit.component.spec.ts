import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentSettingEditComponent } from './payment-setting-edit.component';

describe('PaymentSettingEditComponent', () => {
  let component: PaymentSettingEditComponent;
  let fixture: ComponentFixture<PaymentSettingEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentSettingEditComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentSettingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
