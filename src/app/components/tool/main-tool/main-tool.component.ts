import { Component, OnInit, HostListener } from '@angular/core';
import { SlideInOutAnimation } from './animations';

@Component({
  selector: 'app-main-tool',
  templateUrl: './main-tool.component.html',
  styleUrls: ['./main-tool.component.css'],
  animations: [SlideInOutAnimation]
})
export class MainToolComponent implements OnInit {
  public isDisplay: boolean = false;
  isSticky: boolean = false;
  showBtn: boolean = false;
  public type: any = 'send-notification';
  constructor() {}

  ngOnInit() {}

  @HostListener('window:scroll', ['$event']) onScroll($event) {
    if (window.pageYOffset > 81) {
      this.isSticky = true;

      this.showBtn = true;
    } else {
      this.isSticky = false;
      this.showBtn = false;
    }
  }

  animationState = 'out';
  toggleShowDiv(divName: string) {
    if (divName === 'divA') {
      console.log(this.animationState);
      this.animationState = this.animationState === 'out' ? 'in' : 'out';
      console.log(this.animationState);
    }
  }
}
