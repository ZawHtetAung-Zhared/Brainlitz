import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'course-activities-report',
  templateUrl: './course.component.html',
  styleUrls: ['../report.component.css'] // we share same style url for all nested report component
})


export class CourseActivitiesReport implements OnInit{
  constructor() {
    window.scroll(0, 0);
  }
  ngOnInit() {

  }
}
