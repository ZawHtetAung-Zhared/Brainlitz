import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralOverviewComponent } from './general-overview.component';

describe('GeneralOverviewComponent', () => {
  let component: GeneralOverviewComponent;
  let fixture: ComponentFixture<GeneralOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GeneralOverviewComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
