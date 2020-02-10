import { Component, OnInit, HostListener } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CustomDateFormatter } from '../../../service/pipe/custom-date-formatter.provider';
import {
  NgbModal,
  ModalDismissReasons,
  NgbDatepickerConfig,
  NgbCalendar,
  NgbDateStruct
} from '@ng-bootstrap/ng-bootstrap';

import {
  CalendarEvent,
  CalendarEventAction,
  CalendarMonthViewDay,
  CalendarDateFormatter
} from 'angular-calendar';
declare var $: any;
import * as moment from 'moment';

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
  public progressSlider: boolean = false;
  public selectedTaskArr: any = [];
  public modalReference: any;
  public singleSelectedTask: any;
  public showFormat: any;
  public isSelectedTime: any;
  public masteryList: any = [];
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
  public selectedHrRange: any;
  public selectedMinRange: any;
  public overDurationHr: boolean = false;
  public startFormat: any;
  public startTime: any;
  public classend: any;
  model: any = {};
  public rangeMin: any;
  public rangeHr: any;

  constructor(
    private datePipe: DatePipe,
    private modalService: NgbModal,
    private config: NgbDatepickerConfig
  ) {}

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
    console.log(day, 'day click');
    console.log(this.clickDay, 'click day');

    this.selectedMonthViewDay = day;
    let dateType = { id: 0, name: 'Full Day', date: day.date, value: 1 };

    if (this.clickDay && day.inMonth) {
      let calCell = document.getElementById('cal-month-view' + this.clickDay);
      let calDay = document.getElementById('cal-day-number' + this.clickDay);
      calCell.classList.remove('cal-day-selected');
      calDay.classList.remove('cal-day-number-selected');
    }
    if (day.inMonth) {
      this.clickDay = day.date;
      let calCell = document.getElementById('cal-month-view' + day.date);
      let calDay = document.getElementById('cal-day-number' + day.date);
      console.log(calCell, 'cal cell');
      console.log(calDay, 'cal day');
      calCell.classList.add('cal-day-selected');
      calDay.classList.add('cal-day-number-selected');
      this.selectedDays = dateType;
    }
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
          this.clickDay = element.date;
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

  selectedTask(obj) {
    if (this.selectedTaskArr.includes(obj)) {
      this.selectedTaskArr.splice(this.selectedTaskArr.indexOf(obj), 1);
    } else {
      this.selectedTaskArr.push(obj);
    }
    console.log(this.selectedTaskArr, 'selected tast arr');
  }

  showmasteryList(masteriesModal, task) {
    this.isSelectedTime = 'AM';
    this.singleSelectedTask = task;
    for (let i = 1; i < 30; i++) {
      let temp = {
        masteryId: 'CST-KPMG-01-01' + i,
        shortMasteryName: 'Types of Cyber Attacks',
        masteryIconUrl:
          'https://brainlitz-dev.s3.amazonaws.com/SparkWerkz-API/PD/CST-KPMG-01-01/Assets/cst-kpmg-01-01-icon.png'
      };
      this.masteryList.push(temp);
    }
    this.modalReference = this.modalService.open(masteriesModal, {
      backdrop: 'static',
      windowClass:
        'modal-xl modal-inv d-flex justify-content-center align-items-center'
    });
  }

  closeDropdown(event, datePicker?) {
    console.log(datePicker, event.target.className.includes('dropD'));
    console.log(event.target.className);
    console.log(datePicker);
    if (event.target.className.includes('dropD')) {
      // datePicker.close()
    } else {
      if (event.target.offsetParent == null) {
        console.log('exit if');
        datePicker.close();
      } else if (event.target.offsetParent.nodeName != 'NGB-DATEPICKER') {
        console.log('exit else');
        datePicker.close();
      }
    }
  }

  @HostListener('document:click', ['$event'])
  public categorySearch(event): void {
    if (this.progressSlider != true) {
      $('.bg-box').css({ display: 'none' });
    } else {
      $('.bg-box').css({ display: 'block' });
      $('.bg-box').click(function(event) {
        event.stopPropagation();
      });
      this.progressSlider = false;
    }
  }
  closeModal() {
    this.modalReference.close();
  }

  durationProgress($event) {
    this.progressSlider = true;
  }
  chooseTimeOpt(type) {
    console.log(type);
    this.isSelectedTime = type;
    this.formatTime();
  }

  formatTime() {
    console.log('this.selected', this.selectedHrRange, this.selectedMinRange);
    if (this.selectedHrRange > 0) {
      if (this.selectedHrRange < 10) {
        var hrFormat = 0 + this.selectedHrRange;
      } else {
        var hrFormat = this.selectedHrRange;
      }
    } else {
      this.selectedHrRange = '00';
      var hrFormat = this.selectedHrRange;
    }
    if (this.selectedMinRange > 0) {
      if (this.selectedMinRange < 10) {
        this.selectedMinRange = parseInt(this.selectedMinRange);
        this.selectedMinRange = this.selectedMinRange.toString();
        console.log('if', this.selectedMinRange);
        // var minFormat = this.selectedMinRange.concat('0',this.selectedMinRange);
        var minFormat = 0 + this.selectedMinRange;
        // console.log(this.selectedMinRange.concat('0',this.selectedMinRange));
        console.log(minFormat);
      } else {
        console.log('else', this.selectedMinRange);
        var minFormat = this.selectedMinRange;
      }
    } else {
      this.selectedMinRange = '00';
      var minFormat = this.selectedMinRange;
    }
    this.showFormat = hrFormat + ':' + minFormat;
    console.log(this.showFormat);
  }

  D(J) {
    return (J < 10 ? '0' : '') + J;
  }
  ChangedRangeValue(e, type) {
    // console.log(e)
    if (type == 'hr') {
      this.selectedHrRange = e;
      console.log('this.selectedHrRange', this.selectedHrRange);
    }
    if (type == 'min') {
      this.selectedMinRange = e;
      console.log('this.selectedMinRange', this.selectedMinRange);
    }
    this.formatTime();
  }
}
