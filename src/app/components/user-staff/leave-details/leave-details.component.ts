import { Component, OnInit, Input } from '@angular/core';
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

@Component({
  selector: 'app-leave-details',
  templateUrl: './leave-details.component.html',
  styleUrls: ['./leave-details.component.css'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    },
    DatePipe
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
  events: CalendarEvent[] = [];

  constructor(
    private _service: appService,
    private cancelClassModalService: NgbModal,
    private datePipe: DatePipe
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
      this.skipCourseArr[this.courseIndex].pass = this.giveMakeUp;
      this.skipCourseArr[this.courseIndex].cancel = true;
      this.skipCourseArr[this.courseIndex].reason = this.cancelReason;
    } else {
      this.skipCourseArr.map((courseObj, index) => {
        courseObj.pass = this.giveMakeUp;
        courseObj.cancel = true;
        courseObj.reason = this.cancelReason;
      });
    }
    this.modalReference.close();
  }
  cancelClassModal(cancelClass, skipCourses, type, index) {
    this.giveMakeUp = false;
    this.cancelClassArray = [];
    this.cancelType = type;
    this.courseIndex = index;
    console.warn(skipCourses);
    if (type === 'single') {
      this.cancelClassArray.push(skipCourses);
    } else {
      this.cancelClassArray = skipCourses;
    }
    let totalCount = 0;
    this.cancelClassArray.map(courseObj => {
      courseObj.date = moment(`${courseObj.date}`).format('ddd, D MMM YYYY');
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
    let dateType = { id: 0, name: 'Full Day', date: day.date };
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
      } else {
        //add css class for selected
        this.selectedDays.push(dateType); //this for leave days add new
        calCell.classList.add('cal-day-selected');
        calDay.classList.add('cal-day-number-selected');
        this.selectedMonthViewDay = day;

        //to get skip lesson data from api call
        this.getleaveCheck(dateFormat, 'Full Day');
      }
    }

    console.log(this.selectedDays);
    console.log(this.skipCourseArr);
    console.log(this.ddDate);
  }
  // this.ddDate = dateFormat;

  getleaveCheck(date, type) {
    //to define meridian spelling for api
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

  hideSearch() {
    console.log('Reach');
    setTimeout(() => {
      // this.isFocusleavetype = false;
    }, 300);
  }

  ddDate: any;
  downleaveType(date) {
    console.log('exit', date);
    this.ddDate = date;
    this.isFocusleavetype = true;
  }

  selectedLeave: any = { id: 0, name: 'Full Day' };
  selectLeaveType(type, date) {
    let dateFormat = this.datePipe.transform(date, 'yyyy-MM-dd');

    // setTimeout(() => {
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
  createLeave() {
    console.log('create leave');
  }
  //end leave modal

  //for assign relief and cancel class UI
  assignReliefTeacher(modalName, data, date) {
    this.reliefModalReference = this.cancelClassModalService.open(modalName, {
      backdrop: 'static',
      windowClass:
        'modal-xl modal-inv d-flex justify-content-center align-items-center'
    });
    console.log(date);
    if (date == '') {
      //clicked assignRelife btn for all courses
      this.modalCourseData = data;
      console.log('for all', this.modalCourseData);
    } else {
      // clicked assignRelife btn for single courses
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
    } else {
      console.log('cancel assign relief and cancel class modal');
      this.modalReference.close();
      this.skipCourseArr = [];
      this.showRelief = false;
    }
  }

  searchMethod(keyword, usertype) {
    this._service
      .getSearchUser(this.regionID, keyword, usertype, 20, 0, '')
      .subscribe((res: any) => {
        console.log(res);
        this.searchTeacherLists = res;
      });
  }
}

//angular calendar refrence from under this page
//https://github.com/mattlewis92/angular-calendar/tree/v0.24.1
