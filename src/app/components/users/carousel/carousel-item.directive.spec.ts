// import { CarouselItemDirective } from './carousel-item.directive';

// describe('CarouselItemDirective', () => {
//   it('should create an instance', () => {
//     const directive = new CarouselItemDirective();
//     expect(directive).toBeTruthy();
//   });
// });

import { CarouselItemDirective } from './carousel-item.directive';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

describe('CarouselItemDirective', () => {
  let component: CarouselItemDirective;
  let fixture: ComponentFixture<CarouselItemDirective>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CarouselItemDirective]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselItemDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });
  // it('should create an instance', () => {
  //   const directive = new CarouselItemDirective();
  //   expect(directive).toBeTruthy();
  // });
});
