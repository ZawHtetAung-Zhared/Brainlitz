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

import { appService } from '../../../service/app.service';
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
  @Input() userId: any;
  public userLeave = [];
  public leaveLogs = [];
  public giveMakeUp = false;
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
  constructor(
    private _service: appService,
    private cancelClassModalService: NgbModal,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.getUserLeaves(this.userId);

    //for calendar
    this.viewDate = new Date();
    this.currentMonth = this.datePipe.transform(this.viewDate, 'MMMM');
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
    console.log(e.target.scrollHeight);
    e.target.style.cssText = 'height:auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  }
  closeCancelClassModal() {
    this.modalReference.close();
  }

  cancelClassModal(cancelClass) {
    this.giveMakeUp = false;
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
        calCell.classList.remove('cal-day-selected');
        calDay.classList.remove('cal-day-number-selected');
      } else {
        this.selectedDays.push(dateType);
        calCell.classList.add('cal-day-selected');
        calDay.classList.add('cal-day-number-selected');
        this.selectedMonthViewDay = day;

        console.log(dateFormat);
        this._service
          .getleaveCheckAvaiable(this.regionID, this.userId, dateFormat, 'DAY')
          .subscribe(
            (res: any) => {
              console.log(res);
            },
            err => {}
          );
      }
    }
    console.log(this.selectedDays);
  }

  checkSelectedDate(e) {
    console.log(e);
    setTimeout(() => {
      e.body.forEach(element => {
        console.log(element.isToday);
        if (element.isToday) {
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
    console.log(this.selectedDays);
  }

  hideSearch() {
    console.log('Reach');
    setTimeout(() => {
      // this.isFocusleavetype = false;
    }, 300);
  }

  downleaveType() {
    console.log('exit');
    this.isFocusleavetype = true;
  }

  selectedLeave: any = { id: 0, name: 'Full Day' };
  selectLeaveType(type) {
    console.log(type);
    // setTimeout(() => {
    this.selectedLeave = type;
    this.isFocusleavetype = false;
    console.log(this.selectedLeave);
    // }, 100);
  }
  //end leave modal
}

//angular calendar refrence from under this page
//https://github.com/mattlewis92/angular-calendar/tree/v0.24.1
