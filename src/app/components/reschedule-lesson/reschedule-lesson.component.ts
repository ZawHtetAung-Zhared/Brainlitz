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
import { ToastrService } from 'ngx-toastr';
import { lastDayOfISOWeek } from 'date-fns';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { UtcDateAndDayPipe } from '../../service/pipe/utc-date-and-day.pipe';

declare var $: any;

@Component({
  selector: 'app-reschedule-lesson',
  templateUrl: './reschedule-lesson.component.html',
  styleUrls: ['./reschedule-lesson.component.css'],
  providers: [NgbDatepickerConfig, DatePipe, UtcDateAndDayPipe]
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
  public dateSelect: any;
  // public isDisableDate: boolean=true;

  //conflict modal
  public modalReference: any;

  constructor(
    private router: Router,
    private _service: appService,
    public dataservice: DataService,
    config: NgbDatepickerConfig,
    private datePipe: DatePipe,
    public toastr: ToastrService,
    private modalService: NgbModal,
    private utcDateAndDayPipe: UtcDateAndDayPipe
  ) {}
  @Output() cancelReschedule: any = new EventEmitter<any>();
  @Output() updatedlessonObj: any = new EventEmitter<any>();
  @Input() courseDetail;
  @Input() LASD;
  @Input() lessonId;
  @Input() defineType;

  // @Output() rescheduleLesson: any = new EventEmitter<any>();

  ngOnInit() {
    console.log(this.defineType);
    this.duration = this.courseDetail.coursePlan.lesson.duration;
    this.dateSelect = this.LASD;

    const current = new Date();
    this.todayDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate()
    };

    // default time for time picker
    this.selectedMinRange = moment.utc(this.LASD).format('mm');
    var H = toInteger(moment.utc(this.LASD).format('HH'));
    var h = H % 12 || 12;
    this.selectedHrRange = h + '';
    var ampm = H < 12 ? 'AM' : 'PM';
    this.isSelected = ampm;
    this.rangeHr = h;
    this.rangeMin = this.selectedMinRange;
    this.formatTime();
  }

  backTo() {
    this.cancelReschedule.emit(false);
    console.log(this.model);
  }

  rescheduleTo() {
    var formattedDate = moment(
      `${this.model.start.year}-${this.model.start.month}-${this.model.start.day}`
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

      // if there is conflict in reschedule lesson api response
      // this.isReschedule = false;
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
    this._service
      .updateLesson(this.courseDetail._id, this.lessonId, data)
      .subscribe(
        (res: any) => {
          this.toastr.success('Successfully reschedule the lesson');
          console.log('..........reschedule lesson.........', res);
          this.getUpdatedObj();
        },
        err => {
          this.toastr.error(err.error.message);
          console.log(err);
        }
      );
  }

  getUpdatedObj() {
    this._service
      .getSingleCourse(this.courseDetail._id, this.currentLocation)
      .subscribe(
        (res: any) => {
          this.courseDetail = res;
          var lessons = this.courseDetail.lessons;
          for (var i = 0; i < lessons.length; i++) {
            if (lessons[i].startDate == this.pickdate) {
              this.updatedlessonObj.emit(lessons[i]);
              this.backTo();
            }
          }
        },
        err => {
          console.log(err);
        }
      );
  }

  isSameDate: boolean = false;
  setMinDate(event) {
    // if (this.pickdate == undefined) {
    //   this.pickdate = this.changeDateFormat(event, '00:00:00:000');
    // }
    // let tempdate = event.year + '-' + event.month + '-' + event.day;
    // let temptoday =
    //   this.todayDate.year +
    //   '-' +
    //   this.todayDate.month +
    //   '-' +
    //   this.todayDate.day;
    // console.log('temp date', tempdate);
    // console.log('today date', this.todayDate);
    // console.log(
    //   'date slected',
    //   this.datePipe.transform(this.dateSelect, 'yyyy-MM-d')
    // );
    // if (
    //   this.datePipe.transform(this.dateSelect, 'yyyy-MM-d') == tempdate ||
    //   this.datePipe.transform(this.dateSelect, 'yyyy-MM-d') == temptoday
    // ) {
    //   this.isSameDate = true;
    // } else {
    //   this.isSameDate = false;
    // }
    // console.log('is same date', this.isSameDate);
    // console.log('setMinDate', event);

    // if (this.pickdate == undefined) {
    //   this.pickdate = this.changeDateFormat(event, '00:00:00:000');
    // }
    this.model.start = event;
    this.pickdate = this.changeDateFormat(
      this.model.start,
      this.model.starttime
    );
    this.endDate = this.changeDateFormat(this.model.start, this.model.endTime);
    this.changeDateTimeFormat();
    this.checkDate();
  }

  changeDateTimeFormat() {
    // var formattedDate = moment(
    //   `${this.model.start.year}-${this.model.start.month}-${this.model.start.day}`
    // ).format('dddd, D MMM YYYY');
    // $('.input-day')[0].value = formattedDate;
    // console.log("formatted Date?????????????", formattedDate);

    var formattedDate = this.utcDateAndDayPipe.transform(this.pickdate);
    $('.input-day')[0].value = formattedDate;
  }

  checkDate() {
    console.log('check date');

    // if (this.model.start != undefined && this.model.starttime != undefined) {
    if (this.model.start != undefined) {
      this.pickdate = this.changeDateFormat(
        this.model.start,
        this.model.starttime
      );
      this.endDate = this.changeDateFormat(
        this.model.start,
        this.model.endTime
      );
      // console.log(this.pickdate);
      // console.log(this.endDate);
      this.checkDayExist(this.pickdate);
    } else if (this.model.start == undefined) {
      this.correctRescheduleTime = true;
    }
  }

  checkDayExist(day) {
    let lessons = this.courseDetail.lessons;
    let pickDate = day.toLocaleString().substring(0, 10);
    console.error(pickDate, 'pick date');
    let oldDate = this.LASD.toLocaleString().substring(0, 10);
    console.error(oldDate, 'olddate');
    if (this.defineType == 'New') {
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
    } else if (this.defineType == 'Reschedule') {
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
        console.log(this.correctRescheduleTime, 'correct time');
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
    }

    // if (
    //   this.correctRescheduleDate == true &&
    //   this.correctRescheduleTime == true
    // ) {
    //   var todaydate = new Date();
    //   let onlytodayTime = todaydate.toString().substring(16, 24);
    //   let onlytodayDate = todaydate.toISOString().substring(0, 10);

    //   let pickTime = day.toLocaleString().substring(11, 19);

    //   console.error(onlytodayTime,'only today time');
    //   console.error(pickTime,'pick time')
    //   if (pickDate >= onlytodayDate) {
    //     // console.log('lesson date is grater than and equal to today');

    //     if (pickDate == onlytodayDate) {
    //       // console.log('same as today');

    //       if (onlytodayTime < pickTime) {
    //         // console.log(' grater time ==>today');
    //         this.correctRescheduleTime = true;
    //       } else {
    //         // console.log('~~~ less time');
    //         this.correctRescheduleTime = false;
    //       }
    //     } else {
    //       // console.log('=== grater today');
    //       this.correctRescheduleTime = true;
    //     }
    //   } else {
    //     console.log('less than today ');
    //     this.correctRescheduleTime = false;
    //   }
    //   // if(this.correctRescheduleDate && this.correctRescheduleTime) this.disableReschedule= false;
    // }

    if (
      this.correctRescheduleDate &&
      this.correctRescheduleTime &&
      this.model.start &&
      this.classend
    )
      this.disableReschedule = false;
    else this.disableReschedule = true;
    // if (this.defineType == 'New' && this.isSameDate) {
    //   this.disableReschedule = true;
    //   this.correctRescheduleDate = false;
    // }
    console.log('today time:::::::::::' + this.correctRescheduleTime);
    console.log('today date:::::::' + this.correctRescheduleDate);
    console.log('Disable:::::::' + this.disableReschedule);
    console.log('start and end date>>>>>>', this.pickdate, this.endDate);
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
      console.log('dropD', event);
      datePicker.toggle();
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
  testOpen(datePicker?) {
    datePicker.open();
    console.log('open datepicker!!');
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
    this.startFormat = hrFormat + ':' + minFormat + ' ' + this.isSelected;
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

  goConflict(userModal) {
    //to test modal
    // this.isReschedule = false;
    // this.isConflict = true;
    //end to test modal

    this.LASD = this.pickdate;
    this.checkDayExist(this.pickdate);

    console.log('LASD ' + this.LASD);
    console.log('courseId ' + this.courseDetail._id);
    console.log('lessonId ' + this.lessonId);
    console.log('teacher name ' + this.courseDetail.teacher.fullName); //this.courseDetail.teacher.profilePic

    this.addUserModal(userModal);

    // console.log(this.courseDetail.lessons.filter(lesson=>lesson.lessonId.indexOf(this.lessonId) !== -1));
  }

  addUserModal(userModal) {
    this.modalReference = this.modalService.open(userModal, {
      backdrop: 'static',
      windowClass:
        'modal-xl modal-inv d-flex justify-content-center align-items-center'
    });
  }

  cancelModal() {
    console.log('....');
    this.modalReference.close();
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
          // this.backTo();
          this.getUpdatedObj();
          this.toastr.success('Successfully created new lesson');
          console.log(res, 'res create new lesson');
        },
        err => {
          //this.blockUI.stop(); // Stop blocking
          this.toastr.error('Error in creating new lesson');
          console.log(err);
        }
      );
    }
  }
}
