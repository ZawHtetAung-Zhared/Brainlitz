import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { appService } from '../../service/app.service';

@Component({
  selector: 'app-today-lessons',
  templateUrl: './today-lessons.component.html',
  styleUrls: ['./today-lessons.component.css']
})
export class TodayLessonsComponent implements OnInit {
  todayDate: any;
  isExpand: boolean = false;
  todayCourse: any;
  public regionId = localStorage.getItem('regionId');

  constructor(private _service: appService) {}

  ngOnInit() {
    this.todayDate = new Date();
    this.getTodayLesson();
  }

  getTodayLesson() {
    this._service.gettodayLesson(this.regionId).subscribe(
      (res: any) => {
        console.log(this.todayCourse);

        this.todayCourse = res;
        console.log('tday lessons', this.todayCourse);
      },
      err => {
        console.log(err);
      }
    );
  }
  backToCourse() {
    this._service.backCourse();
  }

  expandTodayCourse() {
    this.isExpand = true;
  }
}
