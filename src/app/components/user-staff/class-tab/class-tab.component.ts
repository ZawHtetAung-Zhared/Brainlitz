import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Course } from './course';

@Component({
  selector: 'app-class-tab',
  templateUrl: './class-tab.component.html',
  styleUrls: ['./class-tab.component.css']
})
export class ClassTabComponent implements OnInit, OnChanges {
  @Input() courseList: Course[];
  courses: Course[] = [];
  constructor() {}

  ngOnChanges() {
    if (this.courseList) {
      this.courses = this.courseList;
      console.log(this.courses);
    }
  }

  ngOnInit() {}
}
