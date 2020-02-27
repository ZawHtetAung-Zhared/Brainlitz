import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-mastery-report',
  templateUrl: './mastery-report.component.html',
  styleUrls: ['./mastery-report.component.css']
})
export class MasteryReportComponent implements OnInit {
  public active = 'courses';
  isSticky: boolean = false;

  constructor() {}

  ngOnInit() {}

  @HostListener('window:scroll', ['$event']) onScroll($event) {
    if (window.pageYOffset > 81) {
      this.isSticky = true;
    } else {
      this.isSticky = false;
    }
  }
}
