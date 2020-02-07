import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CustomDateFormatter } from '../../../service/pipe/custom-date-formatter.provider';

import {
  CalendarEvent,
  CalendarEventAction,
  CalendarMonthViewDay,
  CalendarDateFormatter
} from 'angular-calendar';
declare var $: any;

@Component({
  selector: 'app-assign-task',
  templateUrl: './assign-task.component.html',
  styleUrls: ['./assign-task.component.css'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    },
    DatePipe
  ]
})
export class AssignTaskComponent implements OnInit {
  public standActiveId: any;
  public classActiveId: any;
  public templateActiveObj: any = {};
  public activeStep: any;
  public txtextra: any = 1;
  public clickableSteps: Array<any> = ['1'];
  public scheduletemplateList: any = [];
  public isTaskBreakEnAble: any;
  public isStart: boolean = false;
  public isScheduleTask: boolean = false;

  public taskLists: any = [
    {
      _id: '5df764b23f0167abfa36772e',
      topicBreak: false,
      name: 'Cyber Attacks',
      description:
        'The four major types of cyber attacks are phishing, ransomware, distributed denial-of-service (DDOS), and backdoor.',
      annoucementDate: '2019-11-24 13:29:42.364Z',
      taskStartDate: '2019-11-24 13:29:42.364Z',
      taskEndDate: '2019-11-24 13:29:42.364Z',
      masteryCount: 1
    },
    {
      _id: '5df764f93f0167abfa36772f',
      topicBreak: false,
      name: 'Phishing',
      description:
        'Phishing - gaining access to computer systems to obtain personal or Enterprise information through clicking of email attachments or links. ',
      annoucementDate: '2019-11-24 13:29:42.364Z',
      taskStartDate: '2019-11-24 13:29:42.364Z',
      taskEndDate: '2019-11-24 13:29:42.364Z',
      masteryCount: 5
    },
    {
      _id: '5df765383f0167abfa367730',
      topicBreak: false,
      name: 'Ransomware',
      description:
        'Ransomware - malicious software designed to gain unauthorized access to users’ files and prevent them from accessing those files. Allows for ransom payments in exchange for file access',
      annoucementDate: '2019-11-24 13:29:42.364Z',
      taskStartDate: '2019-11-24 13:29:42.364Z',
      taskEndDate: '2019-11-24 13:29:42.364Z',
      masteryCount: 3
    },
    {
      _id: '5df765623f0167abfa367731',
      topicBreak: false,
      name: 'DDos',
      description:
        'Distributed Denial-of-Service (DDoS) - a deliberate attempt to overwhelm an online system/network (slowing it down significantly or crashing it) with increased traffic from multiple sources',
      annoucementDate: '2019-11-24 13:29:42.364Z',
      taskStartDate: '2019-11-24 13:29:42.364Z',
      taskEndDate: '2019-11-24 13:29:42.364Z',
      masteryCount: 2
    },
    {
      _id: '5df765983f0167abfa367732',
      topicBreak: false,
      name: 'Backdoor',
      description:
        'Backdoor - gaining illegal access to a system by downloading software through a hidden network or bypassing security',
      annoucementDate: '2019-11-24 13:29:42.364Z',
      taskStartDate: '2019-11-24 13:29:42.364Z',
      taskEndDate: '2019-11-24 13:29:42.364Z',
      masteryCount: 2
    }
  ];
  public standardList: any = [
    {
      _id: '1',
      name: 'NGSS'
    },
    {
      _id: '2',
      name: 'SingaporeMOE'
    },
    {
      _id: '3',
      name: 'Curiculum Standard I'
    }
  ];
  public classList: any = [];

  // calendar
  selectedMonthViewDay: CalendarMonthViewDay;
  events: CalendarEvent[] = [];
  viewDate: Date = new Date();
  currentMonth: any;
  selectedDays: any;
  view: any = 'month';
  clickDay: Date;
  // end calendar

  constructor(private datePipe: DatePipe) {}

  ngOnInit() {
    for (let i = 1; i < 50; i++) {
      let temp: any = {};
      temp._id = i;
      temp.name = 'Template sample ' + i;
      temp.description =
        ' Ut sit quis proident Lorem dolore est sint ea adipisicing amet. Ex ex culpa incididunt quis nostrud sunt incididunt veniam tempor enim elit cillum dolore.';
      this.scheduletemplateList.push(temp);
    }
    for (let i = 1; i < 50; i++) {
      let temp: any = {};
      temp._id = i;
      temp.name = 'Primary ' + i;
      this.classList.push(temp);
    }
    // for (let i = 1; i < 50; i++) {
    //   let temp: any = {};
    //   temp._id = i;
    //   temp.name = 'Light energy 0' + i;
    //   temp.masteries =  ["mastery1", "mastery2","mastery3"];
    //   temp.taskStartDate = '13 Jan 2019';
    //   temp.taskEndDate = '20 Feb 2019';
    //   temp.description =
    //     ' Ut sit quis proident Lorem dolore est sint ea adipisicing amet. Ex ex culpa incididunt quis nostrud sunt incididunt veniam tempor enim elit cillum dolore.';
    //   this.taskLists.push(temp);
    // }

    this.standActiveId = this.standardList[0]._id;
  }

  checkStandard(id) {
    this.standActiveId = id;
  }

  choiceClass(id) {
    this.classActiveId = id;
  }

  goToStart() {
    this.isStart = true;
  }

  goToScheduleTask() {
    $('#placeholder_color').append(
      "<style id='feedback'>.data-name::-webkit-input-placeholder{color:" +
        '#788796' +
        ' !important;} .data-name::-moz-placeholder{color: #788796!important; opacity:1;} .data-name:-moz-placeholder{color: #788796 !important; opacity:1;}</style>'
    );

    setTimeout(function() {
      $('#step1').addClass('active');
    }, 200);
    this.activeStep = '1';
    this.isScheduleTask = true;
  }

  stepClick(event, step) {
    if (this.clickableSteps.includes(step)) {
      $('#' + 'step' + step).addClass('active');
      this.activeStep = step;
      this.addOrRemoveClassOfStep($(event.target));
    }
    console.log('active step', this.activeStep);
  }

  addOrRemoveClassOfStep(ele) {
    var max = this.clickableSteps[this.clickableSteps.length - 1];
    ele.parents('li').removeClass('done');
    ele
      .parents('li')
      .prevAll('li')
      .addClass('done');
    ele
      .parents('li')
      .prevAll('li')
      .removeClass('active');
    ele
      .parents('li')
      .nextAll('li')
      .removeClass('active');
    for (var i = 0; i < this.clickableSteps.length; i++) {
      $('#' + this.clickableSteps[i])
        .children('a')
        .css('background-color', '#0080ff');
    }
    if (max != ele.parents('li').attr('id')) ele.parents('li').addClass('done');
  }

  goToStep2(event, step) {
    console.log(step, 'step');
    this.isTaskBreakEnAble = 'Enable';
    this.clickableSteps.push(step);
    this.viewDate = new Date();
    this.currentMonth = this.datePipe.transform(this.viewDate, 'MMMM');
    this.stepClick(event, step);
  }

  goToStep3(event, step) {
    console.log('step', step);
    this.clickableSteps.push(step);
    this.stepClick(event, step);
  }

  checkTemplate(obj) {
    this.templateActiveObj = obj;
  }

  dayClicked(day: CalendarMonthViewDay, e): void {
    console.log(day.date, 'day click');
    console.log(this.clickDay, 'click day');

    this.selectedMonthViewDay = day;
    let dateType = { id: 0, name: 'Full Day', date: day.date, value: 1 };

    if (this.clickDay) {
      let calCell = document.getElementById('cal-month-view' + this.clickDay);
      let calDay = document.getElementById('cal-day-number' + this.clickDay);
      calCell.classList.remove('cal-day-selected');
      calDay.classList.remove('cal-day-number-selected');
    }

    this.clickDay = day.date;
    let calCell = document.getElementById('cal-month-view' + day.date);
    let calDay = document.getElementById('cal-day-number' + day.date);
    console.log(calCell, 'cal cell');
    console.log(calDay, 'cal day');
    calCell.classList.add('cal-day-selected');
    calDay.classList.add('cal-day-number-selected');
    this.selectedDays = dateType;
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
          todayCell.classList.add('cal-day-selected');
          tDay.classList.add('cal-day-number-selected');
          console.log(todayCell);
        }
        // if (!this.selectedDays) {
        //   if (
        //     this.datePipe.transform(element.date, 'MMMM') == this.currentMonth
        //   ) {
        //     const selectedDateTime = element.date.getTime();
        //     const dateIndex = this.selectedDays.findIndex(
        //       selectedDay => selectedDay.date.getTime() === selectedDateTime
        //     );
        //     let calCell = document.getElementById(
        //       'cal-month-view' + element.date
        //     );
        //     let calDay = document.getElementById(
        //       'cal-day-number' + element.date
        //     );
        //     if (dateIndex > -1) {
        //       calCell.classList.add('cal-day-selected');
        //       calDay.classList.add('cal-day-number-selected');
        //       this.selectedMonthViewDay = element.date;
        //     }
        //   }
        // }
      });
    }, 100);
    console.log(this.selectedDays);
  }

  extraDecrease() {
    this.txtextra = this.txtextra == 1 ? this.txtextra : this.txtextra - 1;
  }

  extraIncrease() {
    this.txtextra = this.txtextra + 1;
  }
}
