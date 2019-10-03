import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
  HostListener
} from '@angular/core';

import { Router } from '@angular/router';
import { appService } from '../../service/app.service';
import { DataService } from '../../service/data.service';
import {
  NgbModal,
  ModalDismissReasons,
  NgbDatepickerConfig,
  NgbCalendar,
  NgbDateStruct
} from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ToastsManager } from 'ng5-toastr/ng5-toastr';
import { lastDayOfISOWeek } from 'date-fns';

declare var $: any;

@Component({
  selector: 'app-reschedule-lesson',
  templateUrl: './reschedule-lesson.component.html',
  styleUrls: ['./reschedule-lesson.component.css'],
  providers: [NgbDatepickerConfig, DatePipe]
})
export class RescheduleLessonComponent implements OnInit {
  public isConflict: boolean = false;
  public isReschedule: boolean = true;
  public progressSlider: boolean = false;
  public date: any;
  public pickdate: any;
  public startTime: any;
  public regionID = localStorage.getItem('regionId');
  public currentLocation = localStorage.getItem('locationId');
  public locationName = localStorage.getItem('locationName');
  public course = JSON.parse(localStorage.getItem('courseID'));
  public duration: any;
  public showFormat: any;
  model: any = {};
  public selectedHrRange: any;
  public selectedMinRange: any;
  public isSelected: any;
  public startFormat: any;
  public classend: any;
  public rangeHr: any;
  public rangeMin: any;
  public endDate: any;
  public formattedDate1: any;

  //checkfor date
  public correctRescheduleDate: boolean = false;
  public correctRescheduleTime: boolean = false;
  public todayDate: any;
  public disableReschedule: boolean = true;
  // public isDisableDate: boolean=true;

  constructor(
    private router: Router,
    private _service: appService,
    public dataservice: DataService,
    config: NgbDatepickerConfig,
    private datePipe: DatePipe,
    public toastr: ToastsManager
  ) {}
  @Output() cancelReschedule: any = new EventEmitter<any>();
  @Input() courseDetail;
  @Input() LASD;
  @Input() courseId;
  @Input() lessonId;
  @Input() defineType;

  // @Output() rescheduleLesson: any = new EventEmitter<any>();

  ngOnInit() {
    console.log(this.defineType);
    this.duration = this.courseDetail.coursePlan.lesson.duration;

    this.isSelected = 'AM';
    this.rangeHr = '0';
    this.rangeMin = '0';
    this.showFormat = '00:00';

    const current = new Date();
    this.todayDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate()
    };
  }

  backTo() {
    this.cancelReschedule.emit(false);
    console.log(this.model);
  }

  rescheduleTo() {
    // this.isReschedule = true;
    // this.isConflict = true;

    // if(this.correctRescheduleDate==true){
    //   console.log("API Callsssssssssssss");

    // }
    var formattedDate = moment(
      `${this.formattedDate1.year}-${this.formattedDate1.month}-${this.formattedDate1.day}`
    ).format('dddd, D MMM YYYY');
    $('.input-day')[0].value = formattedDate;
    console.log(formattedDate);
    console.log(this.correctRescheduleDate, this.correctRescheduleTime);
    if (
      this.correctRescheduleDate == true &&
      this.correctRescheduleTime == true
    ) {
      let lessonObj = {
        startDate: this.pickdate,
        endDate: this.endDate,
        teacherId: this.courseDetail.teacherId
      };
      console.log(lessonObj);
      this.putRescheduleLesson(lessonObj);

      //if there is conflict in reschedule lesson api response
      // this.isReschedule= false;
      // this.isConflict = true;
      // this.goConflict();
      // end if
    } else {
      this.toastr.error(
        'You cannot reschedule this lesson to ' +
          formattedDate +
          ' ' +
          this.startTime
      );
    }
  }

  putRescheduleLesson(data) {
    this._service.updateLesson(this.courseId, this.lessonId, data).subscribe(
      (res: any) => {
        this.toastr.success('Successfully reschedule the lesson');
        console.log('..........reschedule lesson.........', res);
      },
      err => {
        this.toastr.error('Error at rescheduling lesson');
        console.log(err);
      }
    );
  }

  setMinDate(event) {
    var formattedDate = moment(
      `${event.year}-${event.month}-${event.day}`
    ).format('dddd, D MMM YYYY');
    $('.input-day')[0].value = formattedDate;
    this.formattedDate1 = formattedDate;
    console.log('setMinDate', event);
    if (this.pickdate == undefined) {
      this.pickdate = this.changeDateFormat(event, '00:00:00:000');
    }
    this.model.start = event;
    console.log(this.pickdate);
    console.log(this.model.start);
    console.log(this.courseDetail);
    this.checkDate();
  }
  check() {
    console.log(this.model.start);
  }
  checkDate() {
    console.log('check date');
    console.log(this.courseDetail.lessons);
    console.log(this.LASD);
    console.log(this.model.startT);
    console.log(this.model.start);

    if (this.model.start != undefined && this.model.startT != undefined) {
      this.pickdate = this.changeDateFormat(
        this.model.start,
        this.model.starttime
      );
      this.endDate = this.changeDateFormat(
        this.model.start,
        this.model.endTime
      );
      console.log(this.pickdate);
      console.log(this.endDate);

      this.checkDayExist(this.pickdate);
    } else if (
      this.model.start != undefined &&
      this.model.startT == undefined
    ) {
      console.log('checkkk');
      this.pickdate = this.changeDateFormat(this.model.start, '00:00:00:000');
      console.log(this.pickdate);
      this.checkDayExist(this.pickdate);
    } else if (
      this.model.start == undefined &&
      this.model.startT != undefined
    ) {
      this.correctRescheduleTime = true;
    }
  }

  checkDayExist(day) {
    let lessons = this.courseDetail.lessons;
    let pickDate = day.toLocaleString().substring(0, 10);
    console.log(pickDate);
    let oldDate = this.LASD.toLocaleString().substring(0, 10);

    if (pickDate == oldDate) {
      this.correctRescheduleDate = true;
      let oldTime = this.LASD.toLocaleString().substring(11, 19);
      let pickTime = day.toLocaleString().substring(11, 19);
      if (oldTime != pickTime) {
        this.correctRescheduleTime = true;
      } else {
        this.correctRescheduleTime = false;
      }
    } else {
      this.correctRescheduleTime = true;
      for (let i = 0; i < lessons.length; i++) {
        let existingDate = lessons[i].startDate
          .toLocaleString()
          .substring(0, 10);
        if (existingDate == pickDate) {
          this.correctRescheduleDate = false;
          break;
        } else {
          this.correctRescheduleDate = true;
        }
      }
    }

    if (
      this.correctRescheduleDate == true &&
      this.correctRescheduleTime == true
    ) {
      var todaydate = new Date();
      let onlytodayTime = todaydate.toString().substring(16, 24);
      let onlytodayDate = todaydate.toISOString().substring(0, 10);

      let pickTime = day.toLocaleString().substring(11, 19);

      if (pickDate >= onlytodayDate) {
        // console.log('lesson date is grater than and equal to today');

        if (pickDate == onlytodayDate) {
          // console.log('same as today');

          if (onlytodayTime < pickTime) {
            // console.log(' grater time ==>today');
            this.correctRescheduleTime = true;
          } else {
            // console.log('~~~ less time');
            this.correctRescheduleTime = false;
          }
        } else {
          // console.log('=== grater today');
          this.correctRescheduleTime = true;
        }
      } else {
        // console.log('less than today ');
        this.correctRescheduleTime = false;
      }
      // if(this.correctRescheduleDate && this.correctRescheduleTime) this.disableReschedule= false;
    }

    if (this.correctRescheduleDate && this.correctRescheduleTime)
      this.disableReschedule = false;
    else this.disableReschedule = true;
    console.log('today time:::::::::::' + this.correctRescheduleTime);
    console.log('today date:::::::' + this.correctRescheduleDate);
    console.log('Disable:::::::' + this.disableReschedule);
  }

  validDay(new_day) {
    var todaydate = new Date();

    var newTempTime = this.pickdate;
    var hr = new Date(this.pickdate).getUTCHours();
    var min = new Date(this.pickdate).getUTCMinutes();
    var totalMin = hr * 60 + this.duration + min;
    console.warn(totalMin);

    let onlytodayTime = todaydate.toString().substring(16, 24);
    let onlytodayDate = todaydate.toISOString().substring(0, 10);
    console.warn(onlytodayTime);
    console.warn(onlytodayDate);
    console.warn(new_day);
    let new_time = String(new_day)
      .toLocaleString()
      .substring(11, 19);
    // console.warn( new_time);

    let new_date = String(new_day)
      .toLocaleString()
      .substring(0, 10);
    // console.warn(new_date);
    this.courseDetail.lessons.map(lesson => {
      console.log('equal date');
      let targetdate = String(lesson.startDate)
        .toLocaleString()
        .substring(0, 10);
      let tarGetTimeS = String(lesson.startDate)
        .toLocaleString()
        .substring(11, 19);
      var targetHrS = new Date(lesson.startDate).getUTCHours();
      var targetMinS = new Date(lesson.startDate).getUTCMinutes();
      var targetTotalMinS = targetHrS * 60 + targetMinS;
      // console.warn(targetTotalMinS);
      let tarGetTimeE = String(lesson.endDate)
        .toLocaleString()
        .substring(11, 19);
      var targetHrE = new Date(lesson.endDate).getUTCHours();
      var targetMinE = new Date(lesson.endDate).getUTCMinutes();
      var targetTotalMinE = targetHrE * 60 + targetMinE;
      // console.warn(targetTotalMinE);

      if (targetdate == new_date) {
        console.error(true);
        if (totalMin <= targetTotalMinS || totalMin > targetTotalMinE) {
          console.warn('it is true');
        } else {
          console.warn('false ======');
        }
      }
    });

    if (new_date >= onlytodayDate) {
      // console.log('lesson date is grater than and equal to today');
      console.warn(new_date);
      console.warn(onlytodayDate);

      console.warn(new_date == onlytodayDate);

      if (new_date == onlytodayDate) {
        console.log('same as today');

        if (onlytodayTime < new_time) {
          console.log(' grater time ==>today');

          // console.log('current time is greater');
          this.correctRescheduleDate = true;
        } else {
          console.log('~~~ less time');
          this.correctRescheduleDate = false;
        }
      } else {
        console.log('=== grater today');
        this.correctRescheduleDate = true;
      }
    } else {
      // console.log('ok reschedule ');
      console.log('less than today ');
      this.correctRescheduleDate = false;
    }
    console.log(this.correctRescheduleDate);
  }

  changeDateFormat(date, time) {
    console.log('==>date,time', date, time);
    if (date == null) {
      console.log('null', date);
      return '';
    } else {
      console.log('utc date', date);
      console.log('Time', time);
      let sdate = date.year + '-' + date.month + '-' + date.day;
      console.log(sdate);
      let dateParts = sdate.split('-');
      console.log('dateParts', dateParts);
      if (dateParts[1]) {
        console.log(Number(dateParts[1]) - 1);
        let newParts = Number(dateParts[1]) - 1;
        dateParts[1] = newParts.toString();
      }
      let timeParts = time.split(':');
      if (dateParts && timeParts) {
        // let testDate = new Date(Date.UTC.apply(undefined,dateParts.concat(timeParts)));
        // console.log("UTC",testDate)
        let fullDate = new Date(
          Date.UTC.apply(undefined, dateParts.concat(timeParts))
        ).toISOString();
        console.log('ISO', fullDate);
        return fullDate;
      }
    }
    console.log('ELSE');
  }

  closeDropdown(event, type, datePicker?) {
    if (event.target.className.includes('dropD')) {
      console.log('dropD');
    } else {
      if (type == 'start' || type == 'end') {
        if (event.target.offsetParent == null) {
          datePicker.close();
          console.log('hh');
        } else if (event.target.offsetParent.nodeName != 'NGB-DATEPICKER') {
          datePicker.close();
          console.log('hh');
        }
      }
    }
  }

  durationProgress($event) {
    this.progressSlider = true;
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

    // if (this.focusCfee == true) {
    //   $('.cfee-bg').addClass('focus-bg');
    // } else {
    //   $('.cfee-bg').removeClass('focus-bg');
    // }
    // this.focusCfee = false;

    // if (this.focusMisfee == true) {
    //   $('.misfee-bg').addClass('focus-bg');
    // } else {
    //   $('.misfee-bg').removeClass('focus-bg');
    // }
    // this.focusMisfee = false;
  }

  chooseTimeOpt(type) {
    console.log(type);
    this.isSelected = type;
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
    this.startFormat = hrFormat + ':' + minFormat + '' + this.isSelected;
    console.log('Start Format', this.startFormat);
    // this.model.starttime = this.startFormat;
    this.startTime = moment(this.startFormat, 'h:mm A').format('HH:mm');
    console.log('Output', this.startTime);
    this.model.startT = this.startFormat;
    this.model.starttime = this.startTime;
    this.calculateDuration(this.startTime, this.duration);
    this.checkDate();
  }

  calculateDuration(time, duration) {
    console.log('Calculate', time, duration);

    let totalduration = duration / 60;
    let gethour = Math.floor(totalduration);
    let getmin = duration % 60;

    console.log(gethour);
    console.log(getmin);

    // this.classend = time +
    if (time) {
      let piece = time.split(':');
      let mins = Number(piece[0]) * 60 + Number(piece[1]) + duration;
      var endTime =
        this.D(((mins % (24 * 60)) / 60) | 0) + ':' + this.D(mins % 60);
      this.model.endTime = endTime;
      console.log('Classend', endTime);
      var H = +endTime.substr(0, 2);
      var h = H % 12 || 12;
      var ampm = H < 12 ? 'AM' : 'PM';
      if (h < 10) {
        this.classend = '0' + h + endTime.substr(2, 3) + ' ' + ampm;
        console.log('Class end', this.classend);
      } else {
        this.classend = h + endTime.substr(2, 3) + ampm;
        console.log('Class end', this.classend);
      }
    }
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

  goConflict() {
    this.LASD = '2019-10-11T11:00:00.000Z';
    if (this.model.start) {
      var formattedDate = moment(
        `${this.formattedDate1.year}-${this.formattedDate1.month}-${this.formattedDate1.day}`
      ).format('dddd, D MMM YYYY');
      $('.input-day')[0].value = formattedDate;
      console.log('formatted Date: ', formattedDate);
    }

    console.log('LASD ' + this.LASD);
    console.log('courseId ' + this.courseId);
    console.log('lessonId ' + this.lessonId);
    console.log('teacher name ' + this.courseDetail.teacher.fullName); //this.courseDetail.teacher.profilePic
    // console.log(this.courseDetail.lessons.filter(lesson=>lesson.lessonId.indexOf(this.lessonId) !== -1));
  }

  createNewLesson() {
    console.log('here create new lesson');
    console.log('pick date', this.pickdate);
    console.log('end date', this.endDate);
    console.log('correctRescheduleDate', this.correctRescheduleDate);
    if (this.correctRescheduleDate) {
      let tempObj = {
        startDate: this.pickdate,
        endDate: this.endDate,
        teacherId: this.courseDetail.teacherId
      };
      this._service.createNewLesson(this.courseDetail._id, tempObj).subscribe(
        (res: any) => {
          //this.blockUI.stop();
          this.backTo();
          console.log(res, 'res create new lesson');
        },
        err => {
          //this.blockUI.stop(); // Stop blocking
          console.log(err);
        }
      );
    }
  }
}
