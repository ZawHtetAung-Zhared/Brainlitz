import {
  Component,
  OnInit,
  OnChanges,
  OnDestroy,
  Input,
  ChangeDetectorRef,
  SimpleChanges,
  SimpleChange
} from '@angular/core';
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
  @Input() activeTab: string;

  courses: Course[] = [];
  loading = true;
  constructor(
    private router: Router,
    private dataService: DataService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['courseList']) {
      if (this.courseList.length > 0) {
        this.loading = false;
        this.courses = this.courseList;
        console.log(this.courses);
      } else {
        this.loading = false;
      }
    }
  }

  ngOnInit() {
    this.loading = true;
    this.courses = [];
    console.log(this.loading);
    console.log(this.courses);
  }

  ngOnDestroy() {
    console.log('destroy');
    this.courseList = [];
  }

  navigateToCourseDetail(courseid: string) {
    console.log(courseid);
    this.router.navigate(['/course']);
    this.dataService.nevigateCourse(courseid);
  }
}
