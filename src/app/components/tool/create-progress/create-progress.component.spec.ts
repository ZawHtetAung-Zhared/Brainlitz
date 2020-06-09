import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProgressComponent } from './create-progress.component';

describe('CreateProgressComponent', () => {
  let component: CreateProgressComponent;
  let fixture: ComponentFixture<CreateProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateProgressComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
