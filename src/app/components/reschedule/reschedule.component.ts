import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as moment from 'moment-timezone';
import { appService } from '../../service/app.service';
import { log } from 'util';

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

  @Output() defaultCount = new EventEmitter();
  @Output() checkObjArr: any = new EventEmitter<any>();
  @Output() unavaiableLen: any = new EventEmitter<any>();

  teacherDetail: any = {};
  reScheduleLists: any = [];
  unavaiableLessons: any = [];
  lessonObjArr: any = [];
  lessonsObj: any = [];
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

    console.log(todayDate);
    console.log(currentTime);

    for (let i = 0; i < this.reScheduleLists.length; i++) {
      let endDate = this.datePipe.transform(
        this.reScheduleLists[i].endDate,
        'yyyy-MM-dd'
      );
      //past or future depend on today date
      if (todayDate < endDate) {
        //this is past date
        this.reScheduleLists[i].isAvaiable = true; //this is future isAvaiable 'true'
        //this method call the load more function if loadmore 'false' this condition is working
        if (loadmore == false) {
          this.avaiableLessonsCount += 1; //this for default lessons count
          this.reScheduleLists[i].isCheck = true; //this is for check or uncheck condition
        }
      } else {
        this.reScheduleLists[i].isAvaiable = false; //this is past isAvaiable 'false'
        if (loadmore == false) {
          this.unavaiableLessons.push(this.reScheduleLists[i]);
        }
      }
      if (loadmore == false) {
        this.lessonObjArr.push(this.reScheduleLists[i]);
        this.checkObjArr.emit(this.lessonObjArr);
        this.defaultCount.emit(
          this.lessonObjArr.length - this.unavaiableLessons.length
        );
        this.unavaiableLen.emit(this.unavaiableLessons);
      }
    }
  }

  lessonCheck(id, obj) {
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
        console.log(this.reScheduleLists.length);
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
}
