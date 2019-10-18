import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { appService } from '../../service/app.service';
import { ToastsManager } from 'ng5-toastr/ng5-toastr';
import {
  NgbModal,
  ModalDismissReasons,
  NgbDatepickerConfig,
  NgbCalendar,
  NgbDateStruct
} from '@ng-bootstrap/ng-bootstrap';

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
  public modalReference: any;
  public makeupForm: any = {};
  public makeupLists: any = [];
  public isGlobal: boolean = false;
  public reasonValue: any;
  public textAreaOption = false;

  @Output() courseDetail = new EventEmitter();

  constructor(
    private _service: appService,
    public toastr: ToastsManager,
    private modalService: NgbModal
  ) {}

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

  studentDetail: any;
  courseId: any;
  index: any;
  attan_type: any;
  onClickRadio(modal, type, student, index) {
    console.log('student', student);
    console.log('index', index);
    console.log('course', this.todayCourse.courses[index]._id);
    this.courseId = this.todayCourse.courses[index]._id;
    this.studentDetail = student.userDetails;
    this.index = index;
    this.attan_type = type;
    if (type == 'absent') {
      this.modalReference = this.modalService.open(modal, {
        backdrop: 'static',
        windowClass:
          'modal-xl modal-inv d-flex justify-content-center align-items-center'
      });
    } else {
      var d = new Date(this.todayDate).getUTCDate();
      var m = new Date(this.todayDate).getUTCMonth() + 1;
      var y = new Date(this.todayDate).getUTCFullYear();
      var tempObj = {
        studentId: this.studentDetail._id
      };
      if (this.attan_type == 'present') {
        tempObj['attendance'] = 'true';
      } else {
        tempObj['attendance'] = 'false';
      }
      console.log(d, '/', m, '/', y);
      console.log('tempObj~~~', tempObj);
      this.getMakeupLists(
        this.studentDetail._id,
        'course',
        this.regionId,
        this.courseId
      );
      this._service
        .markAttendance(
          this.todayCourse.courses[this.index]._id,
          tempObj,
          d,
          m,
          y
        )
        .subscribe(
          (res: any) => {
            setTimeout(() => {
              this.toastr.success(res.message);
            }, 100);
            console.log('res', res);

            this.getAssignUsers(d, m, y, this.index);
            this.closemakeupmodal();
          },
          err => {
            console.log(err);
            this.toastr.error('');
          }
        );
    }
  }

  getMakeupLists(userId, type, regionId, courseId) {
    console.log(userId, ' ', type, ' ', regionId, ' ', courseId, ' ');
    //this.blockUI.start('Loading...');
    this._service.getMakeupLists(userId, type, regionId, courseId).subscribe(
      (res: any) => {
        //this.blockUI.stop();
        console.log(res);
        this.makeupLists = res;
      },
      err => {
        console.log(err);
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

  closemakeupmodal() {
    this.isGlobal = false;
    this.reasonValue = '';
    this.index = '';
    this.attan_type = '';
    this.studentDetail = {};
    this.courseId = '';
    this.modalReference.close();
  }

  issuePass(obj, userId) {
    console.log(obj);
    console.log(userId);
    console.log(this.isGlobal);
    if (this.isGlobal) {
      return new Promise((resolve, reject) => {
        var d = new Date(this.todayDate).getUTCDate();
        var m = new Date(this.todayDate).getUTCMonth() + 1;
        var y = new Date(this.todayDate).getUTCFullYear();
        var tempObj = {
          studentId: this.studentDetail._id
        };
        if (this.attan_type == 'present') {
          tempObj['attendance'] = 'true';
        } else {
          tempObj['attendance'] = 'false';
        }
        console.log(d, '/', m, '/', y);
        console.log('tempObj~~~', tempObj);
        this.getMakeupLists(
          this.studentDetail._id,
          'course',
          this.regionId,
          this.courseId
        );
        this._service
          .markAttendance(
            this.todayCourse.courses[this.index]._id,
            tempObj,
            d,
            m,
            y
          )
          .subscribe(
            (res: any) => {
              setTimeout(() => {
                this.toastr.success(res.message);
              }, 100);
              console.log('res', res);

              this.getAssignUsers(d, m, y, this.index);
            },
            err => {
              console.log(err);
              this.toastr.error('');
            }
          );
        resolve();
      }).then(() => {
        console.log(this.studentDetail);
        this._service
          .makeupPassIssue(obj, this.courseId, this.studentDetail._id)
          .subscribe(
            (res: any) => {
              console.log(res);
              //this.blockUI.stop();
              this.modalReference.close();
              this.toastr.success('Makeup pass successfully created.');
              // setTimeout(()=>{
              //   this.toastr.success('Makeup pass successfully created.');
              // },100)
              this.makeupForm = {};
              this.getTodayLesson();
            },
            err => {
              // setTimeout(()=>{
              //   this.toastr.error('Fail to issue makeup pass.');
              // },100)
              this.toastr.error('Fail to issue makeup pass.');
              this.closemakeupmodal();
              //this.blockUI.stop();
              console.log(err);
            }
          );
      });
    } else {
      console.log(this.studentDetail);
      var d = new Date(this.todayDate).getUTCDate();
      var m = new Date(this.todayDate).getUTCMonth() + 1;
      var y = new Date(this.todayDate).getUTCFullYear();
      var tempObj = {
        studentId: this.studentDetail._id
      };
      if (this.attan_type == 'present') {
        tempObj['attendance'] = 'true';
      } else {
        tempObj['attendance'] = 'false';
      }
      console.log(d, '/', m, '/', y);
      console.log('tempObj~~~', tempObj);
      this.getMakeupLists(
        this.studentDetail._id,
        'course',
        this.regionId,
        this.courseId
      );
      this._service
        .markAttendance(
          this.todayCourse.courses[this.index]._id,
          tempObj,
          d,
          m,
          y
        )
        .subscribe(
          (res: any) => {
            setTimeout(() => {
              this.toastr.success(res.message);
            }, 100);
            console.log('res', res);

            this.getAssignUsers(d, m, y, this.index);
            this.closemakeupmodal();
          },
          err => {
            console.log(err);
            this.toastr.error('');
          }
        );
    }
  }
}
