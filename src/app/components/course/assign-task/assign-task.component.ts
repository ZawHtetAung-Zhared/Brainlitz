import { Component, OnInit, HostListener } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
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
import { appService } from '../../../service/app.service';

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
  public courseDetail: any;
  public sparkWerkz: any;

  // active  && selected

  public activeStep: any;
  public activeMasteryList: any = [];
  public isSelectedTime: any;
  public activeModeObj: any = {};
  public clickableSteps: Array<any> = ['1'];
  public selectedTaskArr: any = [];
  public singleSelectedTask: any;

  // list
  public standardList: any = [];
  public classList: any = [];
  public assignTaskList: any = [];
  public assignModeList: any = [];
  public masteryList: any = [];
  public taskLists: any = [];
  public scheduletemplateList: any = [];

  // other
  public modalReference: any;
  public createassignTask: any = {};

  // boolean
  public isScheduleTask: boolean = false;
  public progressSlider: boolean = false;
  public isStart: boolean = false;
  public isTaskBreakEnAble: any;

  // calendar
  selectedMonthViewDay: CalendarMonthViewDay;
  events: CalendarEvent[] = [];
  viewDate: Date = new Date();
  currentMonth: any;
  selectedDays: any;
  view: any = 'month';
  // clickDay: Date;
  // end calendar

  // hour and date picker
  public selectedHrRange: any;
  public selectedMinRange: any;
  public overDurationHr: boolean = false;
  public startFormat: any;
  public startTime: any;
  model: any = {};
  public rangeMin: any;
  public rangeHr: any;
  public showFormat: any;

  constructor(
    private datePipe: DatePipe,
    private modalService: NgbModal,
    private config: NgbDatepickerConfig,
    private _service: appService,
    private _route: Router
  ) {}

  ngOnInit() {
    this.courseDetail = JSON.parse(localStorage.getItem('courseDetail'));
    this.sparkWerkz = this.courseDetail.sparkWerkz;
    this.getStandardClass();
    console.log(this.sparkWerkz, 'sparkWerkz');
  }

  checkStandard(id) {
    this.createassignTask.standard.standardId = id;
  }

  choiceClass(id) {
    this.createassignTask.standard.classLevelId = id;
    console.log(this.createassignTask, 'assign task');
  }

  goToStart() {
    this._service.getassignTasks().subscribe((res: any) => {
      this.isStart = true;
      this.assignTaskList = res;
      console.log(res, 'assign task');
    });
  }

  goToScheduleTask(obj) {
    this.createassignTask.taskType = obj;
    if (obj.id == 1) {
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

      this.getTemplateLists();
    }
    console.log(this.createassignTask);
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
    console.log(this.createassignTask.template.taskTemplateId, 'temp active');
    this._service
      .getsingleTemplate(this.createassignTask.template.taskTemplateId)
      .subscribe((res: any) => {
        console.log(res, 'single template');
        // this.createassignTask.template.name=res.templateName;
        // this.createassignTask.template.description=res.description;
        // this.createassignTask.template.extraTasksAllowed=res.extraTasksAllowed;
        // this.createassignTask.template.taskBreak=res.taskBreak;
        this.isTaskBreakEnAble = res.taskBreak ? 'Enable' : 'Disable';
        // this.calculatedatefromweeknumber('1','MONDAY')
      });
    this.clickableSteps.push(step);
    this.viewDate = new Date();
    this.currentMonth = this.datePipe.transform(this.viewDate, 'MMMM');
    this.stepClick(event, step);
  }

  goToStep3(event, step) {
    this._service
      .getTaskBytemplate(
        this.createassignTask.template.taskTemplateId,
        new Date(this.createassignTask.template.startDate).toISOString()
      )
      .subscribe((res: any) => {
        console.log(res, 'task list');
        this.taskLists = res;
        this.createassignTask.template.tasks = res;
        this.clickableSteps.push(step);
        this.stepClick(event, step);
      });
    console.log(this.createassignTask);
  }

  goToStep4(event, step) {
    this._service.getassignMode().subscribe((res: any) => {
      console.log(res, 'assign mode');
      this.assignModeList = res;
    });
    this.clickableSteps.push(step);
    this.stepClick(event, step);
  }
  checkTemplate(obj) {
    console.log(obj);
    let tempObj: any = {};
    tempObj.taskTemplateId = obj._id;
    tempObj.name = obj.templateName;
    tempObj.description = obj.description;
    tempObj.extraTasksAllowed = obj.extraTasksAllowed;
    tempObj.taskBreak = obj.taskBreak;

    this.createassignTask.template = tempObj;
    console.log(this.createassignTask);
  }

  showExistData(e) {
    console.log(e);
    this.currentMonth = this.datePipe.transform(e, 'MMMM');
    console.log(this.currentMonth);
  }

  dayClicked(day: CalendarMonthViewDay, e): void {
    console.log(day, 'day click');
    console.log(this.createassignTask.template.startDate, 'click day');

    this.selectedMonthViewDay = day;
    //to check future selected exit or not
    const currentMonth = this.datePipe.transform(
      this.selectedMonthViewDay.date,
      'MMMM'
    );
    const selectedMonth = this.datePipe.transform(
      this.createassignTask.template.startDate,
      'MMMM'
    );
    console.log('month', currentMonth, selectedMonth);

    if (currentMonth.toUpperCase() == selectedMonth.toUpperCase()) {
      let calCell = document.getElementById(
        'cal-month-view' + this.createassignTask.template.startDate
      );
      let calDay = document.getElementById(
        'cal-day-number' + this.createassignTask.template.startDate
      );
      calCell.classList.remove('cal-day-selected');
      calDay.classList.remove('cal-day-number-selected');
    }
    if (day.inMonth) {
      let calCell = document.getElementById('cal-month-view' + day.date);
      let calDay = document.getElementById('cal-day-number' + day.date);
      console.log(calCell, 'cal cell');
      console.log(calDay, 'cal day');
      calCell.classList.add('cal-day-selected');
      calDay.classList.add('cal-day-number-selected');
      this.viewDate = new Date(day.date);
      this.createassignTask.template.startDate = day.date;
    }
  }
  //beforeViewRender method to call after months change
  checkSelectedDate(e) {
    console.log('ok');
    // if users change the perivious to next months to check this  months current leave days selected or not
    //if users selected day exit autoselected
    setTimeout(() => {
      e.body.forEach(element => {
        if (!this.createassignTask.template.startDate) {
          if (
            element.isToday &&
            this.datePipe.transform(element.date, 'MMMM') == this.currentMonth
          ) {
            console.log('is reach');
            let todayCell = document.getElementById(
              'cal-month-view' + element.date
            );
            let tDay = document.getElementById('cal-day-number' + element.date);
            todayCell.classList.add('cal-day-selected');
            tDay.classList.add('cal-day-number-selected');
            this.createassignTask.template.startDate = element.date;
            console.log(todayCell);
          }
        } else {
          if (
            this.datePipe.transform(element.date, 'dd-MM-yyyy') ==
              this.datePipe.transform(
                this.createassignTask.template.startDate,
                'dd-MM-yyyy'
              ) &&
            this.currentMonth == this.datePipe.transform(element.date, 'MMMM')
          ) {
            console.log('ok smae');
            let calCell = document.getElementById(
              'cal-month-view' + element.date
            );
            let calDay = document.getElementById(
              'cal-day-number' + element.date
            );

            calCell.classList.add('cal-day-selected');
            calDay.classList.add('cal-day-number-selected');
          }
          // if (this.currentMonth == this.datePipe.transform(element.date, 'MMMM')) {
          //   let calCell = document.getElementById('cal-month-view' + this.createassignTask.template.startDate);
          //   let calDay = document.getElementById('cal-day-number' + this.createassignTask.template.startDate);
          //   console.log(calCell, 'cal cell');
          //   console.log(calDay, 'cal day');
          //   calCell.classList.add('cal-day-selected');
          //   calDay.classList.add('cal-day-number-selected');
          //   this.viewDate = new Date(this.createassignTask.template.startDate);
          // }
        }
      });
    }, 100);
  }

  extraDecrease() {
    this.createassignTask.template.extraTasksAllowed =
      this.createassignTask.template.extraTasksAllowed == 1
        ? this.createassignTask.template.extraTasksAllowed
        : this.createassignTask.template.extraTasksAllowed - 1;
  }

  extraIncrease() {
    this.createassignTask.template.extraTasksAllowed =
      this.createassignTask.template.extraTasksAllowed + 1;
  }

  selectedTask(obj) {
    if (this.selectedTaskArr.includes(obj)) {
      this.selectedTaskArr.splice(this.selectedTaskArr.indexOf(obj), 1);
    } else {
      this.selectedTaskArr.push(obj);
    }
    console.log(this.selectedTaskArr, 'selected tast arr');
  }

  showmasteryList(masteriesModal, task, e) {
    console.log(e);
    console.log(e.target.classList);
    console.log(masteriesModal, task);
    console.log(e.target.classList.length, e.target.classList[0]);
    if (e.target.classList.length != 0 && e.target.classList[0] != 'slider') {
      console.log('is reach');
      this.isSelectedTime = 'AM';
      this.singleSelectedTask = task;
      console.log(this.singleSelectedTask, 'selected task');
      this._service
        .getsingletaskBytemplate(
          this.createassignTask.template.taskTemplateId,
          task._id
        )
        .subscribe((res: any) => {
          console.log('single task', res);
          this.masteryList = res.masteries;
          for (let obj of res.masteries)
            this.activeMasteryList.push(obj.masteryId);

          console.log(this.activeMasteryList, 'activeMasteryList');
        });
      this.modalReference = this.modalService.open(masteriesModal, {
        backdrop: 'static',
        windowClass:
          'modal-xl modal-inv d-flex justify-content-center align-items-center'
      });
    }
  }

  closeDropdown(event, datePicker?) {
    if (event.target.className.includes('dropD')) {
      // datePicker.close()
    } else {
      if (event.target.offsetParent == null) {
        datePicker.close();
      } else if (event.target.offsetParent.nodeName != 'NGB-DATEPICKER') {
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
    console.log('close');
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

  getStandardClass() {
    this._service.getStandardClass().subscribe((res: any) => {
      console.log(res, 'standard class');
      this.standardList = res;
      let temp = {
        standardId: res[0]._id
      };
      this.createassignTask.standard = temp;

      this.classList = res[0].classLevelId;

      console.log(this.createassignTask);
      console.log(this.classList, 'class list');
      console.log(this.standardList, 'standard list');
    });
  }

  getTemplateLists() {
    this._service
      .getTemplateLists(
        this.createassignTask.standard.standardId,
        this.courseDetail._id
      )
      .subscribe((res: any) => {
        console.log(res, 'template list');
        this.scheduletemplateList = res;
      });
  }
  // start back to
  backCourseDetail() {
    this._route.navigateByUrl('coursedetail/' + this.courseDetail._id);
  }

  backtoassignTask() {
    this.isScheduleTask = false;
    this.isStart = true;
  }
  // end back to

  calculatedatefromweeknumber(week, day) {
    const date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    let dayCount: any;
    if (week > 1) {
    } else {
      console.log(this.getDayOfWeek(day));
      console.log(
        new Date(firstDay.setDate(firstDay.getDate() + this.getDayOfWeek(day)))
      );
    }
    const res = this.addDays(firstDay, dayCount);

    console.log(firstDay, 'first day');
    console.log(res);
  }

  addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  getDayOfWeek(day) {
    if (day == 'SUNDAY') day = 0;
    else if (day == 'MONDAY') day = 1;
    else if (day == 'TUESDAY') day = 2;
    else if (day == 'WEDNESDAY') day = 3;
    else if (day == 'THURDAY') day = 4;
    else if (day == 'FRIDAY') day = 5;
    else if (day == 'SATURDAY') day = 6;
    return day;
  }

  checkedMastery(obj, id) {
    console.log(this.activeMasteryList);
    if (this.activeMasteryList.includes(obj.masteryId))
      this.activeMasteryList.splice(
        this.activeMasteryList.indexOf(obj.masteryId),
        1
      );
    else this.activeMasteryList.push(obj.masteryId);

    console.log(this.activeMasteryList);
  }

  choicemode(obj) {
    this.activeModeObj = obj;
  }
}
