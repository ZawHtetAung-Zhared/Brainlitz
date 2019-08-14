import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { appService } from '../../service/app.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { templateJitUrl } from '@angular/compiler';
import { start } from 'repl';
import * as moment from 'moment-timezone';
declare var $: any;

@Component({
  selector: 'app-flexi',
  templateUrl: './flexi.component.html',
  styleUrls: ['./flexi.component.css']
})
export class FlexiComponent implements OnInit {
  public yPos: any;
  public xPos: any;
  public arrTop: any;
  public arrLeft: any;
  public arrClasses: any;
  conflictBoxShow: boolean = false;
  public skipCount: number = 0;
  temp: any = [];
  teacherDetail: any = {};
  skipIdArr: any = [];
  igoreIdArr: any = [];
  public styleArr = {};
  isconflictAll: boolean = false;
  // lessionIdArr:any=[];
  public modalReference: any;
  @BlockUI() blockUI: NgBlockUI;

  constructor(private _service: appService) {}
  @Input() flexyarr;
  @Input() showcb;
  @Input() course;
  @Input() selectedCustomer;
  @Input() ctype;
  lessonsObj: any = [];
  lessionIdArr: any = [];
  lessonObjArr: any = [];
  @Output() checkObjArr: any = new EventEmitter<any>();
  @Output() checkIdArr = new EventEmitter<number>();
  @Output() passDataconflictBoxShow = new EventEmitter();

  ngOnInit() {
    this.lessionIdArr = [];
    this.lessonObjArr = [];
    this.lessonsObj = this.flexyarr.lessons;
    this.teacherDetail = this.flexyarr.teacherDetails;
    this.flitterFlexyObj(this.flexyarr.lessons);
  }

  flitterFlexyObj(obj) {
    this.lessionIdArr = [];
    var j = 0;
    for (let i = 0; i < obj.length; i++) {
      console.log(obj[i]);
      if (obj[i].hasConflict == false && obj[i].isEnrolled == false) {
        j++;
        console.warn(j);
        this.lessionIdArr.push(i);
        //to remove id
        let tobj: any = {};
        tobj = obj[i];
        // tobj.startDate = obj[i].startDate;
        // tobj.conflictWith = obj[i].conflictWith;
        // tobj.endDate = obj[i].endDate;
        // tobj.hasConflict = obj[i].hasConflict;
        // tobj.isEnrolled = obj[i].isEnrolled;
        // tobj.teacherId = obj[i].teacherId;
        tobj.id = i;
        this.lessonObjArr.push(tobj);
      }
      this.checkIdArr.emit(this.lessionIdArr);
      // this.checkObjArr.emit(this.lessonObjArr);
      // this.lessonsObj[i].id = i;
      this.emittedObjArray(this.lessonObjArr);
      if (j === 10) {
        return;
      }
    }
  }
  lessonCheck(id, obj) {
    console.log(id);
    console.log(obj);
    console.log(this.lessonsObj);
    console.log(this.lessonObjArr);
    let tobj: any = {};

    tobj.startDate = obj.startDate;
    tobj.conflictWith = obj.conflictWith;
    tobj.endDate = obj.endDate;
    tobj.enrolledStudentCount = obj.enrolledStudentCount;
    tobj.hasConflict = obj.hasConflict;
    tobj.isEnrolled = obj.isEnrolled;
    tobj.teacherId = obj.teacherId;

    if (this.lessionIdArr.includes(id)) {
      this.lessionIdArr.splice(this.lessionIdArr.indexOf(id), 1);
      this.lessonObjArr.splice(
        // this.lessonObjArr.map(x => x._id).indexOf(id),
        this.lessonObjArr.indexOf(obj),
        1
      );
    } else {
      this.lessionIdArr.push(id);
      this.lessonObjArr.push(obj);
    }
    console.log(this.lessonObjArr);
    this.checkIdArr.emit(this.lessionIdArr);
    // this.checkObjArr.emit(this.lessonObjArr);
    this.emittedObjArray(this.lessonObjArr);
    console.log(this.lessionIdArr.length);
    // document.getElementById('flexiMid').setAttribute('style', 'overflow: overlay!important;')
  }

  clickId: any;
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
    this.clickId = obj.id;
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
    if (this.ctype == 'schedule') {
      this.xPos = e.clientX - 173 - 65;
      this.yPos = e.clientY - 50 + 85;
      this.arrTop = e.clientY - 50 + 68;
      this.arrLeft = e.clientX - 173 - 65;
      this.styleArr = {
        top: this.yPos + 'px'
      };
      console.log(this.xPos);
      console.log(this.yPos);
    } else {
      console.log(e);
      console.log(e.path[4].offsetLeft);
      console.log($(event.target).offset().top);
      this.xPos = e.clientX - 173 - 65;
      this.yPos = e.clientY - 150 + 112;
      this.arrTop = e.clientY - 150 + 92;
      if (e.srcElement.className == 'fa fa-angle-down downIcon') {
        this.arrLeft = e.path[4].offsetLeft + 40;
      } else {
        this.arrLeft = e.path[3].offsetLeft + 40;
      }

      this.styleArr = {
        top: this.yPos + 'px'
      };
    }
    for (let x = 0; x < this.conflictObj.conflictWith.length; x++) {
      this.lessonsCount += this.conflictObj.conflictWith[x].lessons.length;
    }
    console.log(this.lessonsCount);
    console.log(this.lessonsObj);
  }

  getPreLessons() {
    let startDate;
    let date = new Date(this.lessonsObj[0].startDate);
    let dres = new Date(date.setDate(date.getDate() - 1)).toISOString();
    this.blockUI.start('Loading...');
    this._service
      .getFlexi(this.course._id, this.selectedCustomer.userId, startDate, dres)
      .subscribe(
        (res: any) => {
          let tempLesson = [];
          let tempflexy = [];
          let tempdata = [];
          let tempLength = this.lessonsObj.length;
          for (let i = 0; i < res.lessons.length; i++) {
            tempflexy.push(res.lessons[i]);
            tempflexy[i].id = i;
            res.lessons[i].id += tempLength;
            if (res.lessons[i].hasConflict == false) {
              tempLesson.push(i);
              tempdata.push(res.lessons[i]);
            }
            this.lessonsObj.unshift(res.lessons[i]);
          }

          // for (let j = 0; j < this.lessonsObj.length; j++) {
          //   this.lessonsObj[j].id = j + res.lessons.length;
          // }
          // this.lessonsObj = tempflexy.concat(this.lessonsObj);

          // for (let x = 0; x < this.lessionIdArr.length; x++) {
          //   this.lessionIdArr[x] = this.lessionIdArr[x] + res.lessons.length;
          // }

          console.log(this.lessonObjArr);
          console.log(tempflexy);
          console.log(tempdata);
          // this.lessionIdArr = tempLesson.concat(this.lessionIdArr);
          // this.lessonObjArr = tempdata.concat(this.lessonObjArr);
          // this.checkIdArr.emit(this.lessionIdArr);
          // this.checkObjArr.emit(this.lessonObjArr);
          this.blockUI.stop();
        },
        err => {
          console.log(err);
        }
      );
  }

  tempSignle: any = [];
  tempSkip: any = [];
  tempIgnore: any = [];
  onClickSkandAg(i, j, status) {
    var number = this.lessonsObj.indexOf(this.conflictObj);
    console.log(this.lessonsCount);
    this.isconflictAll = false;
    console.log(this.temp);
    let tobj = { i: -1, j: -1 };
    tobj.i = i;
    tobj.j = j;

    let data = i + '' + j;

    if (this.tempSignle.find(d => d == data) == undefined) {
      this.tempAll.push(i);
      if (status == 'skip') {
        this.tempSkip.push(i);
      } else {
        this.tempIgnore.push(i);
      }
    }

    if (
      this.tempIgnore.length == this.lessonsCount &&
      this.tempSkip.length == 0
    ) {
      this.lessonsObj[number].hasConflict = false;
    }

    if (this.tempSignle.find(d => d == data) == undefined) {
      this.tempSignle.push(data);
    }
    console.log(this.lessonsCount);
    console.log(this.tempSignle.length);
    if (this.lessonsCount == this.tempSignle.length) {
      this.conflictBoxShow = false;
      this.passDataconflictBoxShow.emit(false);
      // this.conflictCal();
    }
    setTimeout(() => {
      if (document.getElementById('flexiMid') != null) {
        document
          .getElementById('flexiMid')
          .setAttribute('style', 'overflow: overlay;');
      }
    }, 200);
  }

  loadmoreLessons() {
    console.log(this.lessonsObj);
    console.log(this.lessonsObj[this.lessonsObj.length - 1]);
    let enddate;
    let date = new Date(this.lessonsObj[this.lessonsObj.length - 1].startDate);
    let startDate = new Date(date.setDate(date.getDate() + 1)).toISOString();
    console.log(startDate);
    this.blockUI.start('Loading...');
    this._service
      .getFlexi(
        this.course._id,
        this.selectedCustomer.userId,
        startDate,
        enddate
      )
      .subscribe(
        (res: any) => {
          let tempLen = this.lessonsObj.length;
          for (let i = 0; i < res.lessons.length; i++) {
            this.lessonsObj[tempLen] = res.lessons[i];
            this.lessonsObj[tempLen].id = tempLen;
            console.log(tempLen);
            // if (res.lessons[i].hasConflict == false) {
            //   this.lessionIdArr.push(tempLen);
            //   this.lessonObjArr.push(res.lessons[i]);
            // }
            tempLen += 1;
          }
          console.log(this.lessionIdArr);
          console.log(this.lessonsObj);
          // this.checkIdArr.emit(this.lessionIdArr);
          // this.checkObjArr.emit(this.lessonObjArr);
          this.blockUI.stop();
        },
        err => {
          console.log(err);
        }
      );
  }

  tempAll: any = [];
  tempskipAll: any = [];
  tempIgnoreAll: any = [];
  onClickSkandAgall(i, status) {
    var number = this.lessonsObj.indexOf(this.conflictObj);
    console.log(status, i, this.temp);
    console.log(this.conflictObj);
    console.log(this.tempAll.includes(i));

    console.log(i);
    let tobj = { i: -1, j: -1 };
    tobj.i = i;

    if (this.tempAll.includes(i) == false) {
      this.tempAll.push(i);
      if (status == 'skip') {
        this.tempskipAll.push(i);
      } else {
        this.tempIgnoreAll.push(i);
      }
    }
    console.log(this.tempIgnoreAll);
    console.log(this.temp);
    if (
      this.tempIgnoreAll.length == this.conflictObj.conflictWith.length &&
      this.tempskipAll.length == 0
    ) {
      this.lessonsObj[number].hasConflict = false;
    }
    if (this.tempAll.length == this.conflictObj.conflictWith.length) {
      console.log('close');
      this.conflictBoxShow = false;
      this.passDataconflictBoxShow.emit(false);
      // this.conflictCal();
    }
    setTimeout(() => {
      if (document.getElementById('flexiMid') != null) {
        let hideoverlay: HTMLElement = document.getElementById('flexiMid');
        document
          .getElementById('flexiMid')
          .setAttribute('style', 'overflow: overlay!important;');
      }
    }, 200);
    console.log(this.tempAll);
  }

  emittedObjArray(array) {
    let tempArray = [];
    array.map(item => {
      let tempObj: any = {};
      tempObj.startDate = item.startDate;
      tempObj.conflictWith = item.conflictWith;
      tempObj.endDate = item.endDate;
      tempObj.hasConflict = item.hasConflict;
      tempObj.isEnrolled = item.isEnrolled;
      tempObj.teacherId = item.teacherId;
      tempArray.push(tempObj);
    });
    this.checkObjArr.emit(tempArray);
  }
}
