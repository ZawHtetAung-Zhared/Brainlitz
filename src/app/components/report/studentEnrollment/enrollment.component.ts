import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'student-enrollment-report',
  templateUrl: './enrollment.component.html',
  styleUrls: ['../report.component.css'] // we share same style url for all nested report component
})
export class StudentEnrollmentReport implements OnInit{
  constructor() {
    window.scroll(0, 0);
  }
  ngOnInit() {

  }
}
