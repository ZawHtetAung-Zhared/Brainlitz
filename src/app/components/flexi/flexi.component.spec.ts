import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlexiComponent } from './flexi.component';

describe('FlexiComponent', () => {
  let component: FlexiComponent;
  let fixture: ComponentFixture<FlexiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlexiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlexiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
