import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  HostListener
} from '@angular/core';
import { appService } from '../../service/app.service';
import { ToastrService } from 'ngx-toastr';
import {
  NgbModal,
  ModalDismissReasons,
  NgbDateAdapter,
  NgbDatepickerConfig,
  NgbCalendar,
  NgbDateStruct
} from '@ng-bootstrap/ng-bootstrap';
import {
  Router,
  ActivatedRoute,
  NavigationStart,
  NavigationExtras
} from '@angular/router';
import * as moment from 'moment';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';

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
  public locationID = localStorage.getItem('locationId');
  public modalReference: any;
  public makeupForm: any = {};
  public makeupLists: any = [];
  public isGlobal: boolean = false; //slider in issue makeup pass
  public reasonValue: any;
  public textAreaOption = false;
  public isSticky = false;
  public expirationDate: any = { year: '', month: '', day: '' };
  public dateModal: Date = new Date();
  public showCalendar: boolean = false;
  public checkboxFlag: any = {};
  public selectAllFlag: boolean;
  public selectedDate: Date = new Date();
  public regionID = localStorage.getItem('regionId');
  public locationList: any;
  public todayModal: Date = new Date();

  @Output() courseDetail = new EventEmitter();

  constructor(
    private _service: appService,
    public toastr: ToastrService,
    private modalService: NgbModal,
    private _router: Router
  ) {}

  @HostListener('window:scroll', ['$event']) onScroll($event) {
    if (window.pageYOffset > 81) {
      this.isSticky = true;
    } else {
      this.isSticky = false;
    }
  }
  @HostListener('document:click', ['$event']) clickout($event) {
    if (!$event.target.classList.contains('setting-date')) {
      this.showCalendar = false;
    }
    if (!$event.target.classList.contains('setting-loc')) {
      console.log('testing loc');

      this.locToggle = false;
    }
    console.log('testing click', $event.target.className);
  }

  ngOnInit() {
    this.getAllLocations();
    this.todayDate = new Date();
    // this.getTodayDatedLesson();
    this.getTodayLesson();
    console.log('abcd', this.selectedDate.toISOString());
  }

  getTodayLesson() {
    this._service
      .gettodayLesson(
        this.regionId,
        this.locationID,
        this.todayModal,
        null,
        null
      )
      .subscribe(
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
  getTodayDatedLesson() {
    this._service.gettodayDatedLesson(this.regionId, this.locationID).subscribe(
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
    // this._service.backCourse();
    this._router.navigateByUrl('/course');
  }

  expandTodayCourse() {
    this.isExpand = true;
  }

  studentDetail: any;
  courseId: any;
  index: any;
  attan_type: any;
  lessonObj: any;
  onClickRadio(modal, type, student, index) {
    console.log('student', student);
    console.log('index', index);
    console.log('course', this.todayCourse.courses[index]._id);
    this.courseId = this.todayCourse.courses[index]._id;
    this.studentDetail = student.userDetails;
    this.index = index;
    this.attan_type = type;
    this.lessonObj = student.todayLesson;
    //click same type again
    if (
      (type == 'absent' && student.todayLesson.attendance == false) ||
      (type == 'present' && student.todayLesson.attendance == true)
    ) {
      var D = new Date(this.todayDate).getUTCDate();
      var M = new Date(this.todayDate).getUTCMonth() + 1;
      var Y = new Date(this.todayDate).getUTCFullYear();
      var temp = {
        studentId: this.studentDetail._id,
        lessonId: this.lessonObj._id,
        attendance: 'null'
      };
      console.log('tempObj~~~', temp);
      this._service
        .markAttendance(this.todayCourse.courses[this.index]._id, temp, D, M, Y)
        .subscribe(
          (res: any) => {
            setTimeout(() => {
              this.toastr.success(res.message);
            }, 100);
            console.log('res', res);

            this.getAssignUsers(D, M, Y, this.index);
            // this.closemakeupmodal();
          },
          err => {
            console.log(err);
            this.toastr.error('');
          }
        );
    } else if (type == 'absent') {
      console.log('ABSENT CLICK');

      this.getMakeupLists(
        this.studentDetail._id,
        'course',
        this.regionId,
        this.courseId
      );
      this.modalReference = this.modalService.open(modal, {
        backdrop: 'static',
        windowClass:
          'modal-xl modal-inv d-flex justify-content-center align-items-center'
      });
    } else if (type == 'present') {
      console.log('PRESENT CLICK');
      var d = new Date(this.todayDate).getUTCDate();
      var m = new Date(this.todayDate).getUTCMonth() + 1;
      var y = new Date(this.todayDate).getUTCFullYear();
      var tempObj = {
        studentId: this.studentDetail._id,
        lessonId: this.lessonObj._id
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
        console.warn(res);
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
    console.warn(index, 'index');
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
            this.todayCourse.courses[index].students[
              j
            ].todayLesson.attendance = activeCourse.CUSTOMER.find(
              x =>
                x.userId ==
                this.todayCourse.courses[index].students[j].userDetails._id
            ).attendance;
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
    // this.courseDetail.emit(cid);
    this._router.navigate(['/coursedetail', cid]);
  }

  closemakeupmodal() {
    console.log('here close modal');
    this.isGlobal = false;
    this.reasonValue = '';
    this.index = '';
    if (this.attan_type == 'absent') {
      // this.getTodayLesson();
      this.modalReference.close();
    }
    this.attan_type = '';
    this.studentDetail = {};
    this.courseId = '';
    this.makeupForm = {};
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
        // this.getMakeupLists(
        //   this.studentDetail._id,
        //   'course',
        //   this.regionId,
        //   this.courseId
        // );
        console.warn(this.index, 'befor');
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
              console.warn(this.index, 'in res');
              // this.getAssignUsers(d, m, y, this.index);
              setTimeout(() => {
                this.toastr.success(res.message);
              }, 100);
              console.log('res', res);
            },
            err => {
              console.log(err);
              this.toastr.error('');
            }
          );
        resolve();
      }).then(() => {
        console.log(this.studentDetail);
        obj.lessonId = this.lessonObj._id;
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
              this.closemakeupmodal();
              this.getTodayLesson();
            },
            err => {
              // setTimeout(()=>{
              //   this.toastr.error('Fail to issue makeup pass.');
              // },100)
              this.toastr.error('Fail to issue makeup pass.');

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
        studentId: this.studentDetail._id,
        lessonId: this.lessonObj._id
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
            this.getAssignUsers(d, m, y, this.index);
            setTimeout(() => {
              this.toastr.success(res.message);
            }, 100);
            console.log('res', res);

            this.closemakeupmodal();
          },
          err => {
            console.log(err);
            this.toastr.error('');
          }
        );
    }
  }
  setExpirationDate(event) {
    this.makeupForm.expirationDate = event;
    console.log(' exp date test', event);
    console.log(' expirationDate', this.makeupForm.expirationDate);
  }
  closeCalendar(datePicker, event) {
    // console.log("closeCalendar", datePicker);
    // console.log("class input-wrap", event.target.className.includes('input-wrap'));
    // console.log("offset", event.target.offsetParent);

    if (event.target.offsetParent == null) datePicker.close();
    else if (event.target.offsetParent.nodeName != 'NGB-DATEPICKER')
      datePicker.close();
  }
  cancelMultiple(modal) {
    this.checkboxFlag = {};
    this.selectAllFlag = false;
    console.log('new modal', modal);
    this.modalReference = this.modalService.open(modal, {
      backdrop: 'static',
      windowClass: 'modal-xl modal-inv'
    });
  }
  closeTab() {
    window.close();
  }

  onDateSelect(event) {
    let year = event.year;
    let month = event.month <= 9 ? '0' + event.month : event.month;
    let day = event.day <= 9 ? '0' + event.day : event.day;
    let final = new Date(year + '-' + month + '-' + day);
    var momentToday = moment(final).toDate();
    console.log('####', momentToday);
    this.todayModal = momentToday;
    console.log('iso format', this.todayModal.toISOString());
    this.todayDate = this.todayModal;
    // this.calendarToggle();
    if (this.currentLoc == 'All') this.locAllSelected();
    else this.getTodayLesson();
  }
  calendarToggle() {
    this.showCalendar = !this.showCalendar;
    console.log('calendarToggle', this.showCalendar);
  }
  closeCancelModal() {
    this.modalReference.close();
  }
  checkLesson(i) {
    console.log('~~~~~~', this.checkboxFlag);
    if (this.checkboxFlag[i] != true) {
      this.checkboxFlag[i] = true;
    } else this.checkboxFlag[i] = false;
  }
  selectAll() {
    this.selectAllFlag = !this.selectAllFlag;
    for (var k = 0; k < this.todayCourse.courses.length; k++) {
      this.checkboxFlag[k] = this.selectAllFlag ? true : false;
    }
  }
  cancelClasses() {
    console.log('today modal', this.todayModal);

    console.log('cancel classes', this.checkboxFlag);
    var lessons = [];
    for (var k = 0; k < this.todayCourse.courses.length; k++) {
      if (this.checkboxFlag[k] == true) {
        console.log('####', this.todayCourse.courses[k]);
        lessons.push({
          courseId: this.todayCourse.courses[k]._id,
          lessonId: this.todayCourse.courses[k].todayLesson._id
        });
      }
    }
    var result = this.todayModal.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    console.log('locale date ', result);

    var body = {
      lessons: lessons,
      date: result
    };
    console.log('body', body);

    this._service.cancelLesson(body).subscribe(
      (res: any) => {
        console.log(res);
        this.toastr.success('Classes cancelled successfully');
        this.closeCancelModal();
        this.getTodayLesson();
      },
      err => {
        console.log(err);
        this.toastr.warning(err);
        this.closeCancelModal();
      }
    );
  }
  prevDate() {
    console.log('prevDate', this.todayModal);
    var temp = moment(this.todayModal).subtract(1, 'days');
    this.todayModal = temp.toDate();
    this.dateModal = this.todayModal;
    this.todayDate = this.dateModal;
    if (this.currentLoc == 'All') this.locAllSelected();
    else this.getTodayLesson();
  }
  nextDate() {
    console.log('prevDate', this.todayModal);
    var temp = moment(this.todayModal).add(1, 'days');
    this.todayModal = temp.toDate();
    this.dateModal = this.todayModal;
    this.todayDate = this.dateModal;
    if (this.currentLoc == 'All') this.locAllSelected();
    else this.getTodayLesson();
  }
  getTodayDate() {
    var today = new Date();
    this.todayModal = moment(today).toDate();
    this.dateModal = this.todayModal;
    this.todayDate = this.dateModal;
    if (this.currentLoc == 'All') this.locAllSelected();
    else this.getTodayLesson();
    // this.getTodayDatedLesson();
  }
  stopEvent(e) {
    e.stopPropagation();
  }
  customerDetail(id) {
    this._router.navigate(['/customer/customerdetail', id]);
  }
  teacherDetail(staffId, staff) {
    staff.userId = staffId;

    let navigationExtras: NavigationExtras = {
      queryParams: staff
    };
    // console.log("whats in staff", staff);

    return (
      '#' +
      this._router
        .createUrlTree(['/staff/staffdetail', staffId], navigationExtras)
        .toString()
    );
  }
  public currentLoc: any = '';
  getAllLocations() {
    this._service
      .getLocations(this.regionID, 20, 0, true)
      .subscribe((res: any) => {
        console.log('Locations', res);
        this.locationList = res;
        console.log(
          'testing',
          this.locationList.find(x => x._id === this.locationID).name
        );
        this.currentLoc = this.locationList.find(
          x => x._id === this.locationID
        ).name;
      });
  }
  public locToggle: boolean = false;
  openLoc() {
    this.locToggle = !this.locToggle;
    console.log('loc', this.locToggle);
  }
  selectLoc(obj) {
    console.log('selected loc', obj);
    this.locationID = obj._id;
    this.currentLoc = obj.name;
    this.getTodayLesson();
  }
  locAllSelected() {
    this.currentLoc = 'All';
    this.locationID = null;
    this.getTodayLesson();
  }
  public transformDay;
  public dateArray = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  public startDay;
  public length;
  public type = null;
  public showDate = null;

  dateFormatSetter(obj) {
    this.transformDay = [];
    // console.log("date format setter", obj);
    this.startDay = obj[0];
    this.length = obj.length;
    this.transformArray(obj);
    if (this.length == 1) {
      this.showDate = this.transformDay[0];
    } else this.checkCase(obj);

    return this.showDate;
  }
  transformArray(obj) {
    for (var k = 0; k < this.length; k++) {
      this.transformDay.push(this.dateArray[obj[k]]);
    }
    // console.log('transform array', this.transformDay);
  }

  checkCase(obj) {
    for (var i = 1; i < this.length; i++) {
      if (this.startDay + 1 == obj[i] && i != this.length - 1)
        this.startDay = obj[i];
      else if (this.startDay + 1 != obj[i] && i == this.length - 1)
        this.andCase();
      else this.toCase();
    }
  }

  toCase() {
    this.type = 'to';
    this.showDate =
      this.transformDay[0] + ' to ' + this.transformDay[this.length - 1];
  }

  andCase() {
    this.showDate = null;
    this.type = 'and';
    for (var j = 0; j < this.length; j++) {
      if (this.length - 1 == j) {
        this.showDate += ' & ' + this.transformDay[j];
      } else if (j != 0) {
        this.showDate += ', ' + this.transformDay[j];
      } else {
        this.showDate += this.transformDay[j];
      }
    }
    this.showDate = this.showDate.slice(4, this.showDate.length);
  }

  undoCancel(obj) {
    console.log('undo test', obj);
    var body = {
      lessons: [
        {
          courseId: obj._id,
          lessonId: obj.todayLesson._id
        }
      ]
    };
    this._service.undoCancelCourse(body).subscribe(
      (res: any) => {
        console.log('res', res);
        setTimeout(() => {
          this.toastr.success(res.message);
        }, 100);
        this.getTodayLesson();
      },
      err => {
        console.log(err);
        this.toastr.error(err.error.message);
      }
    );
  }
}
