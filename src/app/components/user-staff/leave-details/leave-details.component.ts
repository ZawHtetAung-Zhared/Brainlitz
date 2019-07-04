import { Component, OnInit, Input, HostListener } from '@angular/core';
import {
  NgbModalRef,
  NgbModal,
  NgbDateStruct,
  ModalDismissReasons,
  NgbDatepickerConfig
} from '@ng-bootstrap/ng-bootstrap';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarMonthViewDay,
  CalendarDateFormatter
} from 'angular-calendar';
import { DatePipe } from '@angular/common';
import { CustomDateFormatter } from '../../../service/pipe/custom-date-formatter.provider';
import * as moment from 'moment-timezone';
import { appService } from '../../../service/app.service';
import { LeaveService } from '../leave-details/leave.service';

@Component({
  selector: 'app-leave-details',
  templateUrl: './leave-details.component.html',
  styleUrls: ['./leave-details.component.css'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    },
    DatePipe,
    LeaveService
  ]
})
export class LeaveDetailsComponent implements OnInit {
  @Input() staffObj: any;
  public userLeave = [];
  public leaveLogs = [];
  public giveMakeUp = false;
  public studentCount;
  public cancelType;
  public cancelReason = '';
  public courseIndex;
  public cancelClassArray = [];
  public modalReference: any;
  public checkId;
  public regionID = localStorage.getItem('regionId');
  viewDate: Date = new Date();
  selectedDays: any = [];
  selectedMonthViewDay: CalendarMonthViewDay;
  clickDay: Date;
  selected_date: string;
  view: any = 'month';
  isFocusleavetype: boolean = false;
  selectedDayViewDate: Date;
  selectedDateArr: any = [];
  leaveTypeList: any = [
    { id: 0, name: 'Full Day' },
    { id: 1, name: '1st Half-AM' },
    { id: 2, name: '1st Half-PM' }
  ];
  skipCourseArr: any = [];
  public showRelief: boolean = false;
  modalCourseData: any = [];
  searchTeacherLists = [];
  public reliefModalReference: any;
  constructor(
    private _service: appService,
    private cancelClassModalService: NgbModal,
    private datePipe: DatePipe,
    private leaveService: LeaveService
  ) {}

  ngOnInit() {
    console.log(this.staffObj);

    this.getUserLeaves(this.staffObj.userId);
    console.log(this.selectedDays);
    //for calendar
    this.viewDate = new Date();
    this.currentMonth = this.datePipe.transform(this.viewDate, 'MMMM');
  }

  @HostListener('document:click', ['$event']) clickedOutside($event) {
    var a = $event.target.classList[6];
    if (a == 'leave-search-down') {
      this.isFocusleavetype = true;
    } else {
      this.isFocusleavetype = false;
    }
  }

  getUserLeaves(userId) {
    this._service.getUserLeaveDetails(this.regionID, userId).subscribe(
      (res: any) => {
        res.leaves.map(leave => {
          leave.percentLeave = leave.takenDays * 5 + 40;
          leave.maxPercentLeave = leave.leaveDays * 5 + 40;
        });
        this.userLeave = res.leaves;

        this.leaveLogs = res.logs;
      },
      err => {}
    );
  }
  autoResize(e) {
    console.log(e.target.style);
    this.cancelReason = e.target.value;
    console.log(e.target.scrollHeight);
    e.target.style.cssText = 'height:auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  }
  closeCancelClassModal() {
    this.modalReference.close();
  }
  confirmCancelClass() {
    if (this.cancelType === 'single') {
      this.skipCourseArr[this.dateIndex].courses[
        this.courseIndex
      ].pass = this.giveMakeUp;
      this.skipCourseArr[this.dateIndex].courses[
        this.courseIndex
      ].cancel = true;
      this.skipCourseArr[this.dateIndex].courses[
        this.courseIndex
      ].reason = this.cancelReason;
    } else {
      this.skipCourseArr.map((courseObj, index) => {
        courseObj.courses.map(course => {
          course.pass = this.giveMakeUp;
          course.cancel = true;
          course.reason = this.cancelReason;
        });
      });
    }
    console.log(this.skipCourseArr);
    this.modalReference.close();
  }
  public dateIndex;
  cancelClassModal(cancelClass, skipCourses, type, index, i) {
    console.warn(i);
    console.warn(index);
    this.giveMakeUp = false;
    this.cancelClassArray = [];
    this.cancelType = type;
    this.courseIndex = index;
    this.dateIndex = i;
    if (type === 'single') {
      this.cancelClassArray.push(skipCourses);
    } else {
      this.cancelClassArray = skipCourses;
    }
    let totalCount = 0;
    this.cancelClassArray.map(courseObj => {
      courseObj.courses.map(lessonObj => {
        totalCount += lessonObj.enrolledStudentCount;
      });
    });
    this.studentCount = totalCount;
    this.modalReference = this.cancelClassModalService.open(cancelClass, {
      backdrop: 'static',
      windowClass:
        'modal-xl modal-inv d-flex justify-content-center align-items-center'
    });
  }

  //start leave modal
  openLeaveModal(openLeave) {
    this.modalReference = this.cancelClassModalService.open(openLeave, {
      backdrop: 'static',
      windowClass:
        'modal-xl modal-inv d-flex justify-content-center align-items-center'
    });
  }

  showExistData(e) {
    console.log(e);
    console.log(this.selectedDays);
    this.currentMonth = this.datePipe.transform(e, 'MMMM');
    console.log(this.view);
  }

  getJournalByMonth(viewDate) {
    console.log('view Date');
  }

  currentMonth: any;
  dayClicked(day: CalendarMonthViewDay, e): void {
    console.log(this.selectedDays);

    let dateFormat = this.datePipe.transform(day.date, 'yyyy-MM-dd');
    this.selectedMonthViewDay = day;
    let dateType = { id: 0, name: 'Full Day', date: day.date };
    const selectedDateTime = this.selectedMonthViewDay.date.getTime();
    let today = new Date();
    this.clickDay = day.date;

    const dateIndex = this.selectedDays.findIndex(
      selectedDay => selectedDay.date.getTime() === selectedDateTime
    );

    console.log(dateIndex);
    if (
      dateFormat >= this.datePipe.transform(today, 'yyyy-MM-dd') &&
      this.currentMonth == this.datePipe.transform(endOfMonth(day.date), 'MMMM')
    ) {
      console.log('exit');
      let calCell = document.getElementById('cal-month-view' + day.date);
      let calDay = document.getElementById('cal-day-number' + day.date);
      if (dateIndex > -1) {
        delete this.selectedMonthViewDay.cssClass;
        this.selectedDays.splice(dateIndex, 1);
        this.skipCourseArr.splice(dateIndex, 1);
        calCell.classList.remove('cal-day-selected');
        calDay.classList.remove('cal-day-number-selected');
      } else {
        this.selectedDays.push(dateType);
        this.selectedDays.map((day, index) => {
          day.id = index;
        });
        calCell.classList.add('cal-day-selected');
        calDay.classList.add('cal-day-number-selected');
        this.selectedMonthViewDay = day;

        console.log(dateFormat);
        this.getleaveCheck(dateFormat, 'Full Day');
      }
    }

    console.log(this.selectedDays);
    console.log(this.skipCourseArr);
    console.log(this.ddDate);
  }
  // this.ddDate = dateFormat;
  getleaveCheck(date, type) {
    console.log(type);

    let defineType;
    if (type.name == 'Full Day') {
      defineType = 'DAY';
    } else if (type.name == '1st Half-AM') {
      defineType = 'AM';
    } else {
      defineType = 'PM';
    }
    this._service
      .getleaveCheckAvaiable(
        this.regionID,
        this.staffObj.userId,
        date,
        defineType
      )
      .subscribe(
        (res: any) => {
          if (res.isAvailable == false) {
            res.date = date;
            this.skipCourseArr.push(res);
            console.log(res);
          }
          console.log(this.skipCourseArr);
        },
        err => {}
      );
  }
  checkSelectedDate(e) {
    console.log(e);
    setTimeout(() => {
      e.body.forEach(element => {
        console.log(element.date);
        console.log(element.isToday);

        if (
          element.isToday &&
          this.datePipe.transform(element.date, 'MMMM') == this.currentMonth
        ) {
          let todayCell = document.getElementById(
            'cal-month-view' + element.date
          );
          let tDay = document.getElementById('cal-day-number' + element.date);
          todayCell.classList.add('cal-today-selected');
          tDay.classList.add('cal-today-number-selected');
          console.log(todayCell);
        }
        if (this.selectedDays.length != 0) {
          if (
            this.datePipe.transform(element.date, 'MMMM') == this.currentMonth
          ) {
            const selectedDateTime = element.date.getTime();
            const dateIndex = this.selectedDays.findIndex(
              selectedDay => selectedDay.date.getTime() === selectedDateTime
            );
            let calCell = document.getElementById(
              'cal-month-view' + element.date
            );
            let calDay = document.getElementById(
              'cal-day-number' + element.date
            );
            if (dateIndex > -1) {
              calCell.classList.add('cal-day-selected');
              calDay.classList.add('cal-day-number-selected');
              this.selectedMonthViewDay = element.date;
            }
          }
        }
      });
    }, 100);
    console.log(this.selectedDays.length);
  }

  hideSearch() {
    console.log('Reach');
    setTimeout(() => {
      // this.isFocusleavetype = false;
    }, 300);
  }
  ddDate: any;
  downleaveType(e, index, date) {
    console.log('exit');
    this.checkId = index;
    this.ddDate = date;
    this.isFocusleavetype = true;
  }

  selectedLeave: any = { id: 0, name: 'Full Day' };
  selectLeaveType(type, index, date) {
    console.log(type);
    let dateFormat = this.datePipe.transform(date, 'yyyy-MM-dd');
    // setTimeout(() => {
    this.selectedDays[index].name = type.name;
    this.selectedLeave = type;
    this.isFocusleavetype = false;
    console.log(this.selectedLeave);
    this.getleaveCheck(dateFormat, type);
    // }, 100);
  }
  goTonext() {
    console.log('gotonext');
    this.showRelief = true;
  }
  createLeave(selectedDays, skipCourses) {
    console.log('create leave selectedDays', selectedDays);
    console.log('create leave skipCourses', skipCourses);
  }
  //end leave modal
  reliefObj = {
    type: '',
    dateLevelIdx: '',
    courseIdx: ''
  };
  //for assign relief and cancel class UI
  assignReliefTeacher(modalName, data, date, dateLevelIdx, courseIdx) {
    this.reliefModalReference = this.cancelClassModalService.open(modalName, {
      backdrop: 'static',
      windowClass:
        'modal-xl modal-inv d-flex justify-content-center align-items-center'
    });
    console.log(date);
    if (date == '') {
      //clicked assignRelife btn for all courses
      this.reliefObj.type = 'all';
      this.reliefObj.dateLevelIdx = '';
      this.reliefObj.courseIdx = '';
      this.modalCourseData = data;
      console.log('for all', this.modalCourseData);
    } else {
      // clicked assignRelife btn for single courses
      this.reliefObj.type = 'single';
      this.reliefObj.dateLevelIdx = dateLevelIdx;
      this.reliefObj.courseIdx = courseIdx;
      var obj = {
        date: date,
        courses: []
      };
      obj.courses.push(data);
      this.modalCourseData.push(obj);
      console.log('for single', this.modalCourseData);
    }
  }

  cancelModal(type) {
    if (type == 'relief') {
      console.log('cancel relief modal');
      this.reliefModalReference.close();
      this.modalCourseData = [];
      this.selectedTeacher = null;
      this.conflictLessonArr = [];
    } else {
      console.log('cancel assign relief and cancel class modal');
      this.modalReference.close();
      this.skipCourseArr = [];
      this.showRelief = false;
    }
  }

  searchMethod(keyword, usertype) {
    if (keyword == 0) {
      this.searchTeacherLists = [];
    } else {
      this._service
        .getSearchUser(this.regionID, keyword, usertype, 20, 0, '')
        .subscribe((res: any) => {
          console.log(res);
          this.searchTeacherLists = res;
        });
    }
  }
  isFocusSearch: boolean = true;
  searchKeyword: any = '';
  selectedTeacher: any = null;
  conflictLessonArr = [];
  focusSearch(e, type) {
    if (type == 'focusOn') {
      this.isFocusSearch = true;
      this.searchTeacherLists = [];
    } else {
      setTimeout(() => {
        this.isFocusSearch = false;
        this.searchKeyword = '';
      }, 300);
    }
  }

  onSelectTeacher(data) {
    console.log('onSelectTeacher', this.skipCourseArr);
    this.selectedTeacher = data;
    this.conflictLessonArr = [];
    console.log('selected Teacher', data);
    return Promise.all(
      this.skipCourseArr.map(skipCourse => {
        return new Promise((resolve, reject) => {
          this._service
            .getClassCheckAvailable(
              this.regionID,
              this.selectedTeacher.userId,
              skipCourse.date,
              'DAY'
            )
            .subscribe((res: any) => {
              console.log('conflict lessons', res);
              this.conflictLessonArr.push(res);
              console.log('conflictLessonArr', this.conflictLessonArr);
            });
        });
      })
    );
  }

  confirmRelief(selectedData) {
    if (this.reliefObj.type == 'all') {
      this.skipCourseArr.map(skipCourse => {
        // console.log("skipcourse",skipCourse)
        // skipCourse.["newTeacherId"] = selectedData.userId;
        // skipCourse["newTeacherInfo"] = selectedData;
        skipCourse.courses.map(course => {
          console.log('skip course~~~', course);
          course['newTeacherId'] = selectedData.userId;
          course['newTeacherInfo'] = selectedData;
        });
      });
    } else {
      console.log(this.reliefObj);
      this.skipCourseArr[this.reliefObj.dateLevelIdx].courses[
        this.reliefObj.courseIdx
      ]['newTeacherId'] = selectedData.userId;
      this.skipCourseArr[this.reliefObj.dateLevelIdx].courses[
        this.reliefObj.courseIdx
      ]['newTeacherInfo'] = selectedData;
      console.log(this.skipCourseArr[this.reliefObj.dateLevelIdx]);
    }
    console.log('~~~', this.skipCourseArr);
    setTimeout(() => {
      this.cancelModal('relief');
    }, 300);
  }
}

//angular calendar refrence from under this page
//https://github.com/mattlewis92/angular-calendar/tree/v0.24.1
