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

// interface MyEvent extends CalendarEvent {
//   isTooltips: boolean;
//   meridian:any;
// }
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
  public totalLeaveDay;
  public leaveLeftDay;
  public giveMakeUp = false;
  public studentCount;
  public cancelType;
  public cancelReason = '';
  public courseIndex;
  public cancelClassArray = [];
  public modalReference: any;
  public cancelModalReference: any;
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
    { id: 0, name: 'Full Day', value: 1 },
    { id: 1, name: '1st Half-AM', value: 0.5 },
    { id: 2, name: '1st Half-PM', value: 0.5 }
  ];
  skipCourseArr: any = [];
  public showRelief: boolean = false;
  modalCourseData: any = [];
  searchTeacherLists = [];
  public reliefModalReference: any;
  events: CalendarEvent[] = [];
  assignedReliefAll: boolean = false;
  cancelAll: boolean = false;
  assignedReliefSingle: boolean = false;
  cancelSingle: boolean = false;
  isFocusSearch: boolean = true;
  searchKeyword: any = '';
  selectedTeacher: any = null;
  conflictLessonArr = [];

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
    this.getleaveforuser();
  }

  @HostListener('document:click', ['$event']) clickedOutside($event) {
    var a = $event.target.classList[6];
    var conTainer = document.getElementById('leave-day-list');
    if (a == 'leave-search-down') {
      this.isFocusleavetype = true;
      if (conTainer != undefined || conTainer != null) {
        conTainer.style.overflow = 'hidden';
      }
    } else {
      this.isFocusleavetype = false;
      if (conTainer != undefined || conTainer != null) {
        conTainer.style.overflow = 'overlay';
      }
    }
  }

  getUserLeaves(userId) {
    this.totalLeaveDay = 0;
    this._service.getUserLeaveDetails(this.regionID, userId).subscribe(
      (res: any) => {
        res.leaves.map(leave => {
          leave.percentLeave = leave.takenDays * 5 + 40;
          leave.maxPercentLeave = leave.leaveDays * 5 + 40;
          this.totalLeaveDay += leave.leaveDays;
        });
        console.error(this.totalLeaveDay);
        this.userLeave = res.leaves;
        this.leaveLogs = res.logs;
      },
      err => {}
    );
  }
  leaveReason;
  autoResize(e, type) {
    if (type === 'leave') {
      this.leaveReason = e.target.value;
    } else {
      this.cancelReason = e.target.value;
    }
    console.log(e.target.scrollHeight);
    e.target.style.cssText = 'height:auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  }
  closeCancelClassModal() {
    this.cancelModalReference.close();
  }
  closeOpenLeaveModal() {
    this.modalReference.close();
  }
  confirmCancelClass() {
    if (this.cancelType === 'single') {
      this.cancelSingle = true;
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
      this.cancelAll = true;
      this.skipCourseArr.map((courseObj, index) => {
        courseObj.courses.map(course => {
          course.pass = this.giveMakeUp;
          course.cancel = true;
          course.reason = this.cancelReason;
        });
      });
    }
    console.log(this.skipCourseArr);
    this.cancelModalReference.close();
  }
  public dateIndex;
  cancelClassModal(cancelClass, skipCourses, type, index, i) {
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
    this.cancelModalReference = this.cancelClassModalService.open(cancelClass, {
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
    this.getleaveforuser();
  }

  getJournalByMonth(viewDate) {
    console.log('view Date');
  }

  currentMonth: any;
  isTtlip: boolean = false;
  preClick: any;
  dayClicked(day: CalendarMonthViewDay, e): void {
    console.log(this.events);

    console.log(this.selectedDays);

    let dateFormat = this.datePipe.transform(day.date, 'yyyy-MM-dd');

    this.selectedMonthViewDay = day;
    let dateType = { id: 0, name: 'Full Day', date: day.date, value: 1 };
    const selectedDateTime = this.selectedMonthViewDay.date.getTime();
    const selectedDate = this.datePipe.transform(
      this.selectedMonthViewDay.date,
      'yyyy-MM-dd'
    );
    let today = new Date();
    this.clickDay = day.date;

    //to check future selected exit or not
    const dateIndex = this.selectedDays.findIndex(
      selectedDay => selectedDay.date.getTime() === selectedDateTime
    );
    //to check future hodliday exit or not
    const dateIndex2 = this.events.findIndex(
      e => this.datePipe.transform(e.start, 'yyyy-MM-dd') === selectedDate
    );

    //to show or hide toolips I used add class from type script
    if (this.events.length > 0 && dateIndex2 > -1) {
      if (this.preClick == undefined) {
        let tooltip = document.getElementById('tooltip' + day.date);
        let ttxt = document.getElementById('tooltiptxt' + day.date);
        tooltip.classList.add('addVisible');
        ttxt.classList.add('addVisible');
        this.preClick = day.date;
      } else {
        console.log(this.preClick);
        console.log(day.date);
        if (this.preClick == day.date) {
          //remove tooltips
          let ptooltip = document.getElementById('tooltip' + this.preClick);
          let pttxt = document.getElementById('tooltiptxt' + this.preClick);
          console.log(ptooltip);
          console.log(pttxt);
          ptooltip.classList.remove('addVisible');
          pttxt.classList.remove('addVisible');
          this.preClick = undefined;
        } else {
          console.log('else');
          //to remove the tooltips from pre click date
          let ptooltip = document.getElementById('tooltip' + this.preClick);
          let pttxt = document.getElementById('tooltiptxt' + this.preClick);
          ptooltip.classList.remove('addVisible');
          pttxt.classList.remove('addVisible');

          //to add the tooltips from crrent click date
          let tooltip = document.getElementById('tooltip' + day.date);
          let ttxt = document.getElementById('tooltiptxt' + day.date);
          tooltip.classList.add('addVisible');
          ttxt.classList.add('addVisible');
          this.preClick = day.date;
        }
      }
    }

    //to define selected or unselected check-availability calendar day
    if (
      //this condition check for past date or leave taken date for the future date
      dateFormat >= this.datePipe.transform(today, 'yyyy-MM-dd') &&
      this.currentMonth ==
        this.datePipe.transform(endOfMonth(day.date), 'MMMM') &&
      dateIndex2 == -1
    ) {
      let calCell = document.getElementById('cal-month-view' + day.date);
      let calDay = document.getElementById('cal-day-number' + day.date);
      if (dateIndex > -1) {
        //dateIndex > -1 mean exit this day so need to remove the css for selected
        delete this.selectedMonthViewDay.cssClass;
        this.selectedDays.splice(dateIndex, 1); //this for leave days add new
        this.skipCourseArr.splice(dateIndex, 1);
        calCell.classList.remove('cal-day-selected');
        calDay.classList.remove('cal-day-number-selected');
      } else {
        //add css class for selected
        this.selectedDays.push(dateType); //this for leave days add new
        this.selectedDays.map((day, index) => {
          day.id = index;
        });
        calCell.classList.add('cal-day-selected');
        calDay.classList.add('cal-day-number-selected');
        this.selectedMonthViewDay = day;

        console.log(dateFormat);
        this.getleaveCheck(dateFormat, dateType);
      }
    }
    this.getTotalLeaves(this.selectedDays);
    console.log(this.selectedDays);
    console.log(this.skipCourseArr);
    console.log(this.ddDate);
  }
  // this.ddDate = dateFormat;
  public totalLeaves;

  getTotalLeaves(leaveArray) {
    this.totalLeaves = 0;
    leaveArray.map(leave => {
      this.totalLeaves += leave.value;
    });
    this.leaveLeftDay = this.totalLeaveDay - this.totalLeaves;

    this.totalLeaves = this.totalLeaves.toString().split('.');
    if (String(this.totalLeaves[this.totalLeaves.length - 1]) == '5') {
      if (Number(this.totalLeaves[0]) === 0) {
        this.totalLeaves = ' half days ';
      } else {
        this.totalLeaves = this.totalLeaves[0] + ' days and half ';
      }
    } else {
      this.totalLeaves = this.totalLeaves[0] + ' days ';
    }

    this.leaveLeftDay = this.leaveLeftDay.toString().split('.');
    if (String(this.leaveLeftDay[this.leaveLeftDay.length - 1]) == '5') {
      if (Number(this.leaveLeftDay[0]) === 0) {
        this.leaveLeftDay = ' half days ';
      } else {
        this.leaveLeftDay = this.leaveLeftDay[0] + ' days and half ';
      }
    } else {
      this.leaveLeftDay = this.leaveLeftDay[0] + ' days ';
    }
  }

  getleaveCheck(date, type) {
    //to define meridian spelling for api
    let defineType;
    if (type.name === 'Full Day') {
      defineType = 'DAY';
    } else if (type.name === '1st Half-AM') {
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
            res.meridian = defineType;
            this.skipCourseArr.push(res);
            console.log(res);
          }
          console.log(this.skipCourseArr);
        },
        err => {}
      );
  }

  //to get leave taken day by one month
  getleaveforuser() {
    let tempArr = [];
    let res = this.viewDate;
    //this for to get start and end date for current months
    let lastday = function(y: any) {
      return new Date(y.getFullYear(), y.getMonth() + 1, 0);
    };
    let first = function(y: any) {
      return new Date(y.getFullYear(), y.getMonth());
    };
    let getlastDay = function(lDay: Date, isLast: boolean) {
      if (isLast) {
        lDay = lastday(lDay);
        console.log(lDay);
        lDay.setDate(lDay.getDate() + 6);
      } else {
        lDay = first(lDay);
        console.log(lDay);
        lDay.setDate(lDay.getDate() - 6);
      }
      let dd = lDay.getDate();
      let mm = lDay.getMonth() + 1;
      let y = lDay.getFullYear();
      console.log(lDay.getMonth());
      console.log(lDay.getDate());
      console.log(lDay.getDate());

      return y + '-' + mm + '-' + dd;
    };
    let startDate = getlastDay(res, false);
    let endDate = getlastDay(res, true);
    console.log(
      this.datePipe.transform(startDate, 'yyyy-MM-dd') +
        '' +
        this.datePipe.transform(endDate, 'yyyy-MM-dd')
    );

    this._service
      .getleaveofuser(
        this.regionID,
        this.staffObj.userId,
        this.datePipe.transform(startDate, 'yyyy-MM-dd'),
        this.datePipe.transform(endDate, 'yyyy-MM-dd')
      )
      .subscribe(
        (res: any) => {
          console.log(res);
          for (let i = 0; i < res.logs.length; i++) {
            let mer;
            if (res.logs[i].meridian == 'DAY') {
              mer = 'Full Day';
            } else if (res.logs[i].meridian == 'AM') {
              mer = '1st Half-AM';
            } else {
              mer = '1st Half-PM';
            }
            let tempObj = {
              start: new Date(res.logs[i].leaveDay),
              meridian: mer,
              id: res.logs[i]._id
            };
            tempArr.push(tempObj);
          }
          console.log(tempArr);
          this.events = tempArr;
        },
        err => {}
      );
    // this._service
    // .getAllHolidays(
    //   this.regionID,
    // )
    // .subscribe(
    //   (res: any) => {
    //     console.log(res);
    //     for(let i=0;i<res.length;i++){
    //       let tempObj={
    //         start: new Date(res[i].start),
    //         end: new Date(res[i].end),
    //         meridian: res[i].name,
    //         id: res[i]._id
    //       }
    //       tempArr.push(tempObj);
    //     }
    //     console.log(tempArr);
    //     this.events=tempArr;
    //   },
    //   err => {}
    // );
    console.log(this.events);
  }
  //beforeViewRender method to call after months change
  checkSelectedDate(e) {
    // if users change the perivious to next months to check this  months current leave days selected or not
    //if users selected day exit autoselected
    setTimeout(() => {
      e.body.forEach(element => {
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

  // hideSearch() {
  //   console.log('Reach');
  //   setTimeout(() => {
  //     // this.isFocusleavetype = false;
  //   }, 300);
  // }
  scrollPosition;
  checkScroll(e) {
    this.scrollPosition = e.target.scrollTop;
  }
  ddDate: any;
  downleaveType(e, index, date) {
    console.log('exit');
    var conTainer = document.getElementById('leave-day-part');
    var conTainer1 = document.getElementById('leave-day-list');
    console.log(e);
    this.checkId = index;
    this.ddDate = date;
    this.isFocusleavetype = true;
    setTimeout(() => {
      const ele = document.getElementById('zzz' + index);
      ele.style.left = e.target.parentNode.offsetLeft + 'px';
      ele.style.top =
        e.target.parentNode.offsetTop + 50 - this.scrollPosition + 'px';
      if (ele.style.display == 'block') {
        ele.style.display = 'none';
        conTainer1.style.overflow = 'auto';
      } else {
        ele.style.display = 'block';
        conTainer1.style.overflow = 'hidden';
      }
    }, 30);
  }

  selectedLeave: any = { id: 0, name: 'Full Day' };
  selectLeaveType(type, index, date) {
    console.log(type);
    let dateFormat = this.datePipe.transform(date, 'yyyy-MM-dd');
    // setTimeout(() => {
    this.selectedDays[index].name = type.name;
    this.selectedDays[index].value = type.value;
    this.selectedLeave = type;
    this.isFocusleavetype = false;
    console.log(this.selectedLeave);
    this.getleaveCheck(dateFormat, type);
    this.getTotalLeaves(this.selectedDays);

    // }, 100);
  }
  goTonext() {
    console.log('gotonext');
    this.showRelief = true;
  }
  createLeave(selectedDays, skipCourses) {
    console.log('create leave selectedDays', selectedDays);
    console.log('create leave skipCourses', skipCourses);
    console.log('create leave skipCourses', this.skipCourseArr);
  }

  formatDataForCancelledClass() {
    console.log('cancelled class');
  }

  formatDataForSwappedClass() {
    console.log('swapped class');
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
      this.assignedReliefAll = false;
      this.cancelAll = false;
      this.assignedReliefSingle = false;
      this.cancelSingle = false;
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
      this.assignedReliefAll = true;
      this.skipCourseArr.map(skipCourse => {
        skipCourse.courses.map(course => {
          console.log('skip course~~~', course);
          course['newTeacherId'] = selectedData.userId;
          course['newTeacherInfo'] = selectedData;
        });
      });
    } else {
      this.assignedReliefSingle = true;
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

  undoAll(type) {
    switch (type) {
      case 'relief':
        console.log('all relief');
        this.assignedReliefAll = false;
        this.skipCourseArr.map(skipCourse => {
          skipCourse.courses.map(course => {
            delete course['newTeacherId'];
            delete course['newTeacherInfo'];
          });
        });
        console.log('~~~', this.skipCourseArr);
        break;
      case 'cancel':
        console.log('all cancel');
        this.cancelAll = false;
        this.skipCourseArr.map(skipCourse => {
          skipCourse.courses.map(course => {
            delete course['cancel'];
            delete course['pass'];
            delete course['reason'];
          });
        });
        console.log('~~~', this.skipCourseArr);
        break;
    }
  }

  undoMethod(type, dayLevelIdx, courseIdx) {
    var course = this.skipCourseArr[dayLevelIdx].courses[courseIdx];
    switch (type) {
      case 'relief':
        this.assignedReliefSingle = false;
        delete course['newTeacherId'];
        delete course['newTeacherInfo'];
        break;
      case 'cancel':
        this.cancelSingle = false;
        delete course['cancel'];
        delete course['pass'];
        delete course['reason'];
        break;
    }
  }
}

//angular calendar refrence from under this page
//https://github.com/mattlewis92/angular-calendar/tree/v0.24.1
