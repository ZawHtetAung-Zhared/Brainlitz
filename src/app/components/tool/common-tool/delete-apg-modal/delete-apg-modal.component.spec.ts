import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteApgModalComponent } from './delete-apg-modal.component';

describe('DeleteApgModalComponent', () => {
  let component: DeleteApgModalComponent;
  let fixture: ComponentFixture<DeleteApgModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteApgModalComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteApgModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
