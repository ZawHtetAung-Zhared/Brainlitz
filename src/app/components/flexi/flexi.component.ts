import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ElementRef
} from '@angular/core';
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
  elelf: any;
  constructor(private _service: appService, elelf: ElementRef) {
    this.elelf = elelf;
  }
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
    console.log('I am in flexi');
    this.lessionIdArr = [];
    this.lessonObjArr = [];
    this.lessonsObj = this.flexyarr.lessons;
    this.teacherDetail = this.flexyarr.teacherDetails;
    this.flitterFlexyObj(this.flexyarr.lessons);
    console.log(this.flexyarr);
  }

  flitterFlexyObj(obj) {
    this.lessionIdArr = [];
    var j = 0;
    for (let i = 0; i < obj.length; i++) {
      if (obj[i].isEnrolled == false) {
        j++;

        //to remove id
        let tobj: any = {};
        tobj = obj[i];
        tobj.id = i;

        if (j <= this.course.defaultlessonCount) {
          this.lessionIdArr.push(i);
          this.lessonObjArr.push(tobj);
        }
      }
      this.checkIdArr.emit(this.lessionIdArr);
      // this.checkObjArr.emit(this.lessonObjArr);
      this.lessonsObj[i].id = i;
      this.emittedObjArray(this.lessonObjArr);
      // if (j === 10) {
      //   return;
      // }
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
  showConflictBox(e, obj, ref: ElementRef) {
    // User screen size
    const screenHeight = window.screen.height;
    const screenWidth = window.innerWidth;
    console.log(screenHeight, screenWidth);

    console.log('ele', e);
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

    this.xPos = e.clientX - 173 - 65;
    console.log('e>>', e.composedPath());
    if (e.path == undefined) {
      for (let i = 0; i < e.composedPath().length; i++) {
        console.log(e.composedPath()[i].classList.value);
        if (e.composedPath()[i].classList.value == 'modal-dialog') {
          this.yPos = e.clientY - e.composedPath()[i].offsetTop + 16;
          break;
        }
      }

      if (
        e.srcElement.className == 'fa fa-exclamation-circle exclamationIcon' ||
        e.srcElement.className ==
          'fa fa-exclamation-circle exclamationIcon exclamationIconSelected'
      ) {
        console.log('reach1', e.composedPath()[4].offsetLeft);
        this.arrLeft = e.composedPath()[4].offsetLeft + 130;
      } else {
        console.log('reach2', e.composedPath()[3].offsetLeft);
        this.arrLeft = e.composedPath()[3].offsetLeft + 130;
      }
    } else {
      for (let i = 0; i < e.path.length; i++) {
        if (e.path[i].classList != undefined) {
          console.log(e.path[i].classList.value);
          if (e.path[i].classList.value == 'modal-dialog') {
            this.yPos = e.clientY - e.path[i].offsetTop + 16;
            break;
          } else {
            console.log(e.path[i].offsetTop);
            console.log(e.clientY);
            this.yPos = e.clientY - e.path[i].offsetTop + 26;
          }
        }
      }

      if (
        e.srcElement.className == 'fa fa-exclamation-circle exclamationIcon' ||
        e.srcElement.className ==
          'fa fa-exclamation-circle exclamationIcon exclamationIconSelected'
      ) {
        console.log('here1', e.path[4].offsetLeft);
        if (screenWidth >= 1366) {
          console.log('reach1');
          this.arrLeft = e.path[4].offsetLeft - 100;
        } else {
          console.log('reach2');
          this.arrLeft = e.path[4].offsetLeft + 150;
        }
      } else {
        console.log('here2', e.path[3].offsetLeft);
        if (screenWidth >= 1366) {
          console.log('reach hereee');
          this.arrLeft = e.path[3].offsetLeft + 190;
        } else {
          console.log('reach hereee2');
          this.arrLeft = e.path[3].offsetLeft + 190;
        }
      }
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

  getPreLessons() {
    let startDate;
    let date = new Date(this.lessonsObj[0].startDate);
    let dres = new Date(date.setDate(date.getDate() - 1)).toISOString();
    //this.blockUI.start('Loading...');
    this._service
      .getFlexi(this.course._id, this.selectedCustomer.userId, startDate, dres)
      .subscribe(
        (res: any) => {
          console.log(res);
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
            // console.log(i+".........",res.lessons[i]);
            // this.lessonsObj.unshift(res.lessons[i]);
          }

          for (let i = res.lessons.length - 1; i >= 0; i--) {
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
          console.log(this.lessonsObj);
          // this.lessionIdArr = tempLesson.concat(this.lessionIdArr);
          // this.lessonObjArr = tempdata.concat(this.lessonObjArr);
          // this.checkIdArr.emit(this.lessionIdArr);
          // this.checkObjArr.emit(this.lessonObjArr);
          //this.blockUI.stop();
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
    } else {
      console.log('exit skip');
      if (this.lessionIdArr.includes(this.conflictObj.id)) {
        this.lessionIdArr.splice(
          this.lessionIdArr.indexOf(this.conflictObj.id),
          1
        );
        this.lessonObjArr.splice(
          // this.lessonObjArr.map(x => x._id).indexOf(id),
          this.lessonObjArr.indexOf(this.conflictObj),
          1
        );
      }
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
    //this.blockUI.start('Loading...');
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
          //this.blockUI.stop();
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
    } else {
      if (this.lessionIdArr.includes(this.conflictObj.id)) {
        this.lessionIdArr.splice(
          this.lessionIdArr.indexOf(this.conflictObj.id),
          1
        );
        this.lessonObjArr.splice(
          // this.lessonObjArr.map(x => x._id).indexOf(id),
          this.lessonObjArr.indexOf(this.conflictObj),
          1
        );
      }
    }
    console.log(this.lessonObjArr);
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
