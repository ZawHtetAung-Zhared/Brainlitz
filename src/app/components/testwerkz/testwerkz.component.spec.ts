import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestwerkzComponent } from './testwerkz.component';

describe('TestwerkzComponent', () => {
  let component: TestwerkzComponent;
  let fixture: ComponentFixture<TestwerkzComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestwerkzComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestwerkzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
