import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as moment from 'moment-timezone';
import { appService } from '../../service/app.service';
import { log } from 'util';
declare var $: any;

@Component({
  selector: 'app-reschedule',
  templateUrl: './reschedule.component.html',
  styleUrls: ['./reschedule.component.css'],
  providers: [DatePipe]
})
export class RescheduleComponent implements OnInit {
  @Input() reScheduleData;
  @Input() course;
  @Input() selectedCustomer;
  @Input() showcb;
  @Output() defaultCount = new EventEmitter();
  @Output() checkObjArr: any = new EventEmitter<any>();
  @Output() unavaiableLen: any = new EventEmitter<any>();
  conflictBoxShow: boolean = false;
  @Output() passDataconflictBoxShow = new EventEmitter();
  temp: any = [];
  tempSignle: any = [];
  tempSkip: any = [];
  tempIgnore: any = [];
  tempAll: any = [];
  tempskipAll: any = [];
  tempIgnoreAll: any = [];
  teacherDetail: any = {};
  reScheduleLists: any = [];
  unavaiableLessons: any = [];
  lessonObjArr: any = [];
  lessonsObj: any = [];
  public yPos: any;
  public xPos: any;
  public arrTop: any;
  public arrLeft: any;
  public arrClasses: any;
  public styleArr = {};
  avaiableLessonsCount: any = 0;
  constructor(private datePipe: DatePipe, private _service: appService) {}

  ngOnInit() {
    this.avaiableLessonsCount = 0;
    this.unavaiableLessons = [];
    this.reScheduleLists = [];
    this.teacherDetail = {};
    this.lessonObjArr = [];
    this.teacherDetail = this.reScheduleData.teacherDetails[0];
    this.reScheduleLists = this.reScheduleData.lessons;
    console.log(this.reScheduleLists);

    this.checkAvaiableReschedule(false);
  }
  checkAvaiableReschedule(loadmore) {
    let todayDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    let currentTime = this.datePipe.transform(new Date(), 'h:MM:ss TT');

    console.log(todayDate, 'today date');
    console.log(currentTime, 'current date');

    for (let i = 0; i < this.reScheduleLists.length; i++) {
      let endDate = this.datePipe.transform(
        this.reScheduleLists[i].endDate,
        'yyyy-MM-dd'
      );
      this.reScheduleLists[i].isAvaiable = true;
      if (loadmore == false && this.reScheduleLists[i].isEnrolled) {
        this.avaiableLessonsCount += 1; //this for default lessons count
        this.reScheduleLists[i].isCheck = true; //this is for check or uncheck condition
      } else {
        this.reScheduleLists[i].isCheck = false;
      }
      //past or future depend on today date
      // if (todayDate < endDate) {
      //   //this is past date
      //   this.reScheduleLists[i].isAvaiable = true; //this is future isAvaiable 'true'
      //   //this method call the load more function if loadmore 'false' this condition is working
      //   if (loadmore == false) {
      //     this.avaiableLessonsCount += 1; //this for default lessons count
      //     this.reScheduleLists[i].isCheck = true; //this is for check or uncheck condition
      //   }
      // } else {
      //   this.reScheduleLists[i].isAvaiable = false; //this is past isAvaiable 'false'
      //   if (loadmore == false) {
      //     this.unavaiableLessons.push(this.reScheduleLists[i]);
      //   }
      // }
      if (loadmore == false) {
        this.lessonObjArr.push(this.reScheduleLists[i]);
        this.checkObjArr.emit(this.lessonObjArr);
        this.defaultCount.emit(
          this.lessonObjArr.length - this.unavaiableLessons.length
        );
        this.unavaiableLen.emit(this.unavaiableLessons);
      }
      // this.reScheduleLists[i].re_id=i;
    }
    console.log(this.reScheduleLists, 'reschedule list');

    console.log(this.lessonObjArr, 'lessonObjArr');
  }

  lessonCheck(id, obj) {
    console.log(id);
    console.log(obj);
    console.log(this.lessonsObj);
    console.log(this.lessonObjArr);
    console.log(this.unavaiableLessons);

    if (this.lessonObjArr.includes(obj)) {
      // this.lessionIdArr.splice(this.lessionIdArr.indexOf(id), 1);
      this.lessonObjArr.splice(
        // this.lessonObjArr.map(x => x._id).indexOf(id),
        this.lessonObjArr.indexOf(obj),
        1
      );
      this.checkObjArr.emit(this.lessonObjArr);
    } else {
      // this.lessionIdArr.push(id);
      this.lessonObjArr.push(obj);
      this.checkObjArr.emit(this.lessonObjArr);
    }
    console.log(this.reScheduleLists.indexOf(obj));

    if (
      this.lessonObjArr.length - this.unavaiableLessons.length <
      this.avaiableLessonsCount
    ) {
      console.log('this equal');
      for (let i = 0; i < this.reScheduleLists.length; i++) {
        this.reScheduleLists[i].isCheck = true;
      }
    } else {
      console.log('else');
      for (let i = 0; i < this.reScheduleLists.length; i++) {
        const index = this.lessonObjArr.findIndex(
          obj => obj === this.reScheduleLists[i]
        );
        console.log(index);
        if (index != -1) {
          this.reScheduleLists[i].isCheck = true;
        } else {
          this.reScheduleLists[i].isCheck = false;
        }
      }
    }
    console.log(this.lessonObjArr);
  }

  loadmoreReschedule(courseId, uId, lessons) {
    let date = new Date(
      this.reScheduleLists[this.reScheduleLists.length - 1].startDate
    );
    const startDate = moment(new Date(date))
      .add(1, 'days')
      .toISOString();
    console.log(this.course._id);
    console.log(this.selectedCustomer.userId);

    this._service
      .getRescheduleList(
        this.course._id,
        this.selectedCustomer.userId,
        startDate,
        undefined
      )
      .subscribe((res: any) => {
        console.log(res.lessons);
        console.log(this.avaiableLessonsCount);
        console.log(this.reScheduleLists.length, '<length');
        console.log(this.lessonObjArr.length - this.unavaiableLessons.length);
        for (let i = 0; i < res.lessons.length; i++) {
          // res.lessons[i]._id=this.reScheduleLists.length+i;

          if (
            this.lessonObjArr.length - this.unavaiableLessons.length <
            this.avaiableLessonsCount
          ) {
            res.lessons[i].isCheck = true;
          } else {
            res.lessons[i].isCheck = false;
          }
        }
        this.reScheduleLists = this.reScheduleLists.concat(res.lessons);
        this.checkAvaiableReschedule(true);
        console.log(this.reScheduleLists);
      });
  }

  clickObj: any;
  conflictObj: any;
  lessonsCount: number = 0;
  showConflictBox(e, obj) {
    console.log(obj);
    this.lessonsCount = 0;
    this.tempSignle = [];
    this.tempAll = [];
    this.tempIgnoreAll = [];
    this.tempskipAll = [];
    this.tempIgnore = [];
    this.tempSkip = [];
    this.clickObj = obj;
    this.conflictObj = obj;
    console.log(e);
    if (this.conflictBoxShow && this.showcb) {
      this.passDataconflictBoxShow.emit(false);
      this.conflictBoxShow = false;
      setTimeout(() => {
        if (document.getElementById('flexiMid') != null) {
          document
            .getElementById('flexiMid')
            .setAttribute('style', 'overflow: overlay;');
        }
      });
    } else {
      this.temp = [];
      this.passDataconflictBoxShow.emit(true);
      this.conflictBoxShow = true;
      // hideoverlay.setAttribute('style','background: red;');
      setTimeout(function() {
        console.log($('.conflictPopUp'));
        $('.conflictPopUp').show();
        document
          .getElementById('flexiMid')
          .setAttribute('style', 'overflow: hidden;');
      });
    }

    this.xPos = e.clientX - 173 - 65;
    console.log('e>>', e);
    for (let i = 0; i < e.path.length; i++) {
      if (e.path[i].classList != undefined) {
        if (e.path[i].classList.value == 'modal-dialog') {
          this.yPos = e.clientY - e.path[i].offsetTop + 16;
          break;
        }
      }
    }
    console.log('yPos', this.yPos);
    if (
      e.srcElement.className == 'fa fa-exclamation-circle exclamationIcon' ||
      e.srcElement.className ==
        'fa fa-exclamation-circle exclamationIcon exclamationIconSelected'
    ) {
      this.arrLeft = e.path[4].offsetLeft + 130;
    } else {
      this.arrLeft = e.path[3].offsetLeft + 130;
    }

    this.styleArr = {
      top: this.yPos + 'px'
    };

    for (let x = 0; x < this.conflictObj.conflictWith.length; x++) {
      this.lessonsCount += this.conflictObj.conflictWith[x].lessons.length;
    }
    console.log(this.lessonsCount);
    console.log(this.lessonsObj);
  }
}
