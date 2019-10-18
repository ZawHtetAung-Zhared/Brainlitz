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
  isEmptyLesson: boolean = true;
  public regionId = localStorage.getItem('regionId');
  public locationID = localStorage.getItem('locationId');
  @Output() courseDetail = new EventEmitter();

  constructor(private _service: appService, public toastr: ToastsManager) {}

  ngOnInit() {
    this.todayDate = new Date();
    this.getTodayLesson();
  }

  getTodayLesson() {
    this._service.gettodayLesson(this.regionId, this.locationID).subscribe(
      (res: any) => {
        console.log(this.todayCourse);

        this.todayCourse = res;
        console.log('tday lessons', this.todayCourse);

        if (this.todayCourse.courses.length > 0) {
          this.isEmptyLesson = false;
        } else this.isEmptyLesson = true;
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
  onClickRadio(type, id, index) {
    console.log('index', index);
    console.log('course', this.todayCourse.courses[index]._id);
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

    this._service
      .markAttendance(this.todayCourse.courses[index]._id, obj, d, m, y)
      .subscribe(
        (res: any) => {
          setTimeout(() => {
            this.toastr.success(res.message);
          }, 100);
          console.log('res', res);
          // this.getUsersInCourse(this.courseId);

          this.getAssignUsers(d, m, y, index);
        },
        err => {
          console.log(err);
          this.toastr.error('');
        }
      );
  }
  getAssignUsers(d, m, y, index) {
    let prsentCount = 0;
    let absentCount = 0;
    //this.blockUI.start('Loading');
    this._service
      .getAssignUser(
        this.regionId,
        this.todayCourse.courses[index]._id,
        d,
        m,
        y
      )
      .subscribe(
        (res: any) => {
          console.log(res, 'active course info');
          let activeCourse = res;
          for (let j = 0; j < activeCourse.CUSTOMER.length; j++) {
            this.todayCourse.courses[index].students[j].todayLesson.attendance =
              activeCourse.CUSTOMER[j].attendance;
            if (activeCourse.CUSTOMER[j].attendance == true) {
              prsentCount += 1;
            } else if (activeCourse.CUSTOMER[j].attendance == false) {
              absentCount += 1;
            }
          }
          console.log('update course', this.todayCourse.courses[index]);
          this.todayCourse.courses[index].attendance.present = prsentCount;
          this.todayCourse.courses[index].attendance.absent = absentCount;
        },
        err => {
          //this.blockUI.stop();
          console.log(err);
        }
      );
    setTimeout(() => {
      //this.blockUI.stop();
    }, 500);
  }

  getcourseDetail(cid) {
    console.log(cid);
    this.courseDetail.emit(cid);
  }
}
