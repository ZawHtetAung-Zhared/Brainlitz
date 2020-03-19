import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainToolContentComponent } from './main-tool-content.component';

describe('MainToolContentComponent', () => {
  let component: MainToolContentComponent;
  let fixture: ComponentFixture<MainToolContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MainToolContentComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainToolContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
