import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleFooterComponent } from './single-footer.component';

describe('SingleFooterComponent', () => {
  let component: SingleFooterComponent;
  let fixture: ComponentFixture<SingleFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SingleFooterComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
