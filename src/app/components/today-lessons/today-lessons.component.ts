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
  constructor(private _service: appService) {}

  ngOnInit() {
    this.todayDate = new Date();
  }

  backToCourse() {
    this._service.backCourse();
  }

  expandTodayCourse() {
    this.isExpand = true;
  }
}
