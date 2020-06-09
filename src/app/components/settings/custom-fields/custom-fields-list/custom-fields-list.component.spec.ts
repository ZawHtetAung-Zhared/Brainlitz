import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFieldsListComponent } from './custom-fields-list.component';

describe('CustomFieldsListComponent', () => {
  let component: CustomFieldsListComponent;
  let fixture: ComponentFixture<CustomFieldsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomFieldsListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomFieldsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
