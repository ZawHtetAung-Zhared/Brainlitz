import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'side-menu',
  templateUrl: './main-block.component.html',
  styleUrls: ['./main-block.component.css']
})
export class MainBlockComponent implements OnInit {
  public isMidStick: boolean = false;
  constructor() {}

  ngOnInit() {}

  @HostListener('window:scroll', ['$event']) onScroll($event) {
    if (window.pageYOffset > 45) {
      this.isMidStick = true;
    } else {
      this.isMidStick = false;
    }
  }
}
