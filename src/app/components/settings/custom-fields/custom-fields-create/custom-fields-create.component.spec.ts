import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFieldsCreateComponent } from './custom-fields-create.component';

describe('CutomFieldsCreateComponent', () => {
  let component: CustomFieldsCreateComponent;
  let fixture: ComponentFixture<CustomFieldsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomFieldsCreateComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomFieldsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
