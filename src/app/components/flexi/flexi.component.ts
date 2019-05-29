import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { appService } from '../../service/app.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { templateJitUrl } from '@angular/compiler';
import { start } from 'repl';
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
  @Output() tempConflict = new EventEmitter<any>();
  @Output() passDataconflictBoxShow = new EventEmitter();

  ngOnInit() {
    console.log(this.showcb);
    console.log(this.selectedCustomer);
    console.log(this.ctype);
    console.log(this.course);
    console.log(this.flexyarr);
    console.log(this.flexyarr.lessons);
    this.lessonsObj = this.flexyarr.lessons;
    this.teacherDetail = this.flexyarr.teacherDetails;
    this.flitterFlexyObj(this.flexyarr.lessons);
  }

  flitterFlexyObj(obj) {
    console.log(obj);
    console.log(this.lessionIdArr);

    this.lessionIdArr = [];
    for (let i = 0; i < obj.length; i++) {
      console.log(obj[i]);
      if (obj[i].hasConflict == false) {
        this.lessionIdArr.push(i);
        //to remove id
        let tobj: any = {};

        tobj.startDate = obj[i].startDate;
        tobj.conflictWith = obj[i].conflictWith;
        tobj.endDate = obj[i].endDate;
        tobj.hasConflict = obj[i].hasConflict;
        tobj.isEnrolled = obj[i].isEnrolled;
        tobj.teacherId = obj[i].teacherId;
        this.lessonObjArr.push(tobj);
      }
      this.checkIdArr.emit(this.lessionIdArr);
      this.checkObjArr.emit(this.lessonObjArr);
      this.lessonsObj[i].id = i;
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
        this.lessonObjArr.map(x => x._id).indexOf(id),
        1
      );
    } else {
      this.lessionIdArr.push(id);
      this.lessonObjArr.push(tobj);
    }
    console.log(this.lessonObjArr);

    this.checkIdArr.emit(this.lessionIdArr);
    this.checkObjArr.emit(this.lessonObjArr);
    console.log(this.lessionIdArr.length);
  }

  clickId: any;
  conflictObj: any;
  lessonsCount: number = 0;
  showConflictBox(e, obj) {
    this.lessonsCount = 0;
    this.tempSignle = [];
    this.tempAll = [];
    console.log(this.temp.length);
    this.clickId = obj.id;
    this.conflictObj = obj;
    if (this.conflictBoxShow && this.showcb) {
      this.passDataconflictBoxShow.emit(false);
      this.conflictBoxShow = false;
      this.conflictCal();
    } else {
      this.temp = [];
      this.passDataconflictBoxShow.emit(true);
      this.conflictBoxShow = true;
      setTimeout(function() {
        console.log($('.conflictPopUp'));
        $('.conflictPopUp').show();
      });
    }
    if (this.ctype == 'schedule') {
      console.log(e.clientX);
      console.log(e.clientY);

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
      this.xPos = e.clientX - 173 - 65;
      this.yPos = e.clientY - 150 + 85;
      this.arrTop = e.clientY - 150 + 68;
      this.arrLeft = e.clientX - 173 - 65;
      this.styleArr = {
        top: this.yPos + 'px'
      };
    }
    for (let x = 0; x < this.conflictObj.conflictWith.length; x++) {
      this.lessonsCount += this.conflictObj.conflictWith[x].lessons.length;
    }
    console.log(this.lessonsObj);
  }
  conflictCal() {
    if (this.isconflictAll) {
      console.log('is me');
      if (this.temp.length != 0) {
        for (let i = 0; i < this.conflictObj.conflictWith.length; i++) {
          if (i == this.temp[i].i) {
            this.lessonsObj[this.conflictObj.id].hasConflict = false;
          } else {
            break;
          }
        }
      }
    } else {
      if (this.temp.length != 0) {
        for (let i = 0; i < this.conflictObj.conflictWith.length; i++) {
          for (
            let j = 0;
            j < this.conflictObj.conflictWith[i].lessons.length;
            j++
          ) {
            if (i == this.temp[j].i && j == this.temp[j].j) {
              this.lessonsObj[this.conflictObj.id].hasConflict = false;
            } else {
              break;
            }
          }
        }
      }
    }

    this.temp = [];
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
          for (let i = 0; i < res.lessons.length; i++) {
            tempflexy.push(res.lessons[i]);
            tempflexy[i].id = i;
            if (res.lessons[i].hasConflict == false) {
              tempLesson.push(i);
            }
          }

          for (let j = 0; j < this.lessonsObj.length; j++) {
            this.lessonsObj[j].id = j + res.lessons.length;
          }
          this.lessonsObj = tempflexy.concat(this.lessonsObj);

          for (let x = 0; x < this.lessionIdArr.length; x++) {
            this.lessionIdArr[x] = this.lessionIdArr[x] + res.lessons.length;
          }
          this.lessionIdArr = tempLesson.concat(this.lessionIdArr);
          this.lessonObjArr = tempflexy.concat(this.lessonObjArr);
          this.checkIdArr.emit(this.lessionIdArr);
          this.checkObjArr.emit(this.lessonObjArr);
          this.blockUI.stop();
        },
        err => {
          console.log(err);
        }
      );
  }

  tempSignle: any = [];
  onClickSkandAg(i, j, status) {
    console.log(this.lessonsCount);
    this.isconflictAll = false;
    console.log(this.temp);
    let tobj = { i: -1, j: -1 };
    tobj.i = i;
    tobj.j = j;
    if (status == 'ignore') {
      if (this.temp.find(data => data.j == j && data.i == i) == undefined) {
        this.temp.push(tobj);
        let obj = [];
        obj.push(this.temp);
        obj.push(this.conflictObj);
        obj.push(this.lessonsObj);
        obj.push(this.isconflictAll);
        this.tempConflict.emit(obj);
      }
    } else {
      this.temp = [];
      let obj = [];
      this.tempConflict.emit(obj);
    }

    let data = i + '' + j;

    if (this.tempSignle.find(d => d == data) == undefined) {
      this.tempSignle.push(data);
    }

    if (this.lessonsCount == this.tempSignle.length) {
      this.conflictBoxShow = false;
      this.passDataconflictBoxShow.emit(false);
      this.conflictCal();
    }
    console.log(this.tempSignle);
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
            if (res.lessons[i].hasConflict == false) {
              this.lessionIdArr.push(tempLen);
              this.lessonObjArr.push(res.lessons[i]);
            }
            tempLen += 1;
          }
          console.log(this.lessionIdArr);
          console.log(this.lessonsObj);
          this.checkIdArr.emit(this.lessionIdArr);
          this.checkObjArr.emit(this.lessonObjArr);
          this.blockUI.stop();
        },
        err => {
          console.log(err);
        }
      );
  }

  tempAll: any = [];
  onClickSkandAgall(i, status) {
    console.log(status, i, this.temp);
    console.log(this.conflictObj);
    console.log(this.tempAll.includes(i));

    this.isconflictAll = true;
    console.log(i);
    let tobj = { i: -1, j: -1 };
    tobj.i = i;

    if (status == 'ignore') {
      console.log('exit', tobj);
      if (this.temp.find(data => data.i == i) == undefined) {
        this.temp.push(tobj);
        let obj = [];
        obj.push(this.temp);
        obj.push(this.conflictObj);
        obj.push(this.lessonsObj);
        obj.push(this.isconflictAll);
        this.tempConflict.emit(obj);
      }
    } else {
      this.temp = [];
      let obj = [];
      this.tempConflict.emit(obj);
    }
    if (this.tempAll.includes(i) == false) {
      this.tempAll.push(i);
    }
    if (this.tempAll.length == this.conflictObj.conflictWith.length) {
      console.log('close');
      this.conflictBoxShow = false;
      this.passDataconflictBoxShow.emit(false);
      this.conflictCal();
    }
    console.log(this.tempAll);
  }
}
