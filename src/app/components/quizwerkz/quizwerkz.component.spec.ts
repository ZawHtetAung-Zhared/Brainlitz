import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizwerkzComponent } from './quizwerkz.component';

describe('QuizwerkzComponent', () => {
  let component: QuizwerkzComponent;
  let fixture: ComponentFixture<QuizwerkzComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizwerkzComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizwerkzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
