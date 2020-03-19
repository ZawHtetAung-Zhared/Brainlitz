import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardToolContentComponent } from './card-tool-content.component';

describe('CardToolContentComponent', () => {
  let component: CardToolContentComponent;
  let fixture: ComponentFixture<CardToolContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardToolContentComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardToolContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
