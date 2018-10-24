import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'staff-performance-report',
  templateUrl: './staff.component.html',
  styleUrls: ['../report.component.css'] // we share same style url for all nested report component
})


export class StaffPerformanceReport implements OnInit{
  constructor() {
    window.scroll(0, 0);
  }
  ngOnInit() {

  }
}
