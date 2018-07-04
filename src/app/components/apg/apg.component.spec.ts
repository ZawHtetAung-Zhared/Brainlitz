import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApgComponent } from './apg.component';

describe('ApgComponent', () => {
  let component: ApgComponent;
  let fixture: ComponentFixture<ApgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
