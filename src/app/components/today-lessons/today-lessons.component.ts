import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { appService } from '../../service/app.service';
import { ToastsManager } from 'ng5-toastr/ng5-toastr';

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

  constructor(private _service: appService, public toastr: ToastsManager) {}

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
  onClickRadio(type, id, courseId) {
    var d = new Date(this.todayDate).getUTCDate();
    var m = new Date(this.todayDate).getUTCMonth() + 1;
    var y = new Date(this.todayDate).getUTCFullYear();
    var obj = {
      studentId: id
    };
    if (type == 'present') {
      obj['attendance'] = 'true';
    } else {
      obj['attendance'] = 'false';
    }
    console.log(d, '/', m, '/', y);
    console.log('obj~~~', obj);

    this._service.markAttendance(courseId, obj, d, m, y).subscribe(
      (res: any) => {
        setTimeout(() => {
          this.toastr.success(res.message);
        }, 100);
        console.log('res', res);
        // this.getUsersInCourse(this.courseId);

        // this.getAssignUsers(d, m, y);
      },
      err => {
        console.log(err);
        this.toastr.error('');
      }
    );
  }
}
