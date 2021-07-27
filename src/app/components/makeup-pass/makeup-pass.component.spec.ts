import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeupPassComponent } from './makeup-pass.component';

describe('MakeupPassComponent', () => {
  let component: MakeupPassComponent;
  let fixture: ComponentFixture<MakeupPassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MakeupPassComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeupPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
