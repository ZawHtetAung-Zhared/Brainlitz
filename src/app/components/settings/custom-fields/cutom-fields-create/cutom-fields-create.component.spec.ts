import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CutomFieldsCreateComponent } from './cutom-fields-create.component';

describe('CutomFieldsCreateComponent', () => {
  let component: CutomFieldsCreateComponent;
  let fixture: ComponentFixture<CutomFieldsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CutomFieldsCreateComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CutomFieldsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
