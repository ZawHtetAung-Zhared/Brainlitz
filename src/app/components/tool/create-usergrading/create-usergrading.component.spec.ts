import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUsergradingComponent } from './create-usergrading.component';

describe('CreateUsergradingComponent', () => {
  let component: CreateUsergradingComponent;
  let fixture: ComponentFixture<CreateUsergradingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUsergradingComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUsergradingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
