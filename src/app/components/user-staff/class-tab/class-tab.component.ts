import { Component, OnInit, OnChanges, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../../../service/data.service';
import { Course } from './course';

@Component({
  selector: 'app-class-tab',
  templateUrl: './class-tab.component.html',
  styleUrls: ['./class-tab.component.css']
})
export class ClassTabComponent implements OnInit, OnChanges, OnDestroy {
  @Input() courseList: Course[];
  courses: Course[] = [];
  constructor(private router: Router, private dataService: DataService) {}

  ngOnChanges() {
    if (this.courseList) {
      this.courses = this.courseList;
      console.log(this.courses);
    }
  }

  ngOnInit() {}

  ngOnDestroy() {
    console.log('destroy');
  }

  navigateToCourseDetail(courseid: string) {
    console.log(courseid);
    this.router.navigate(['/course']);
  }
}
