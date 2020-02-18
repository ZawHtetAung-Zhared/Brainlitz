import { last } from 'rxjs/operator/last';
import { connect } from 'tls';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  constructor() {}

  private _test = 1;

  public showDiv: boolean = true;

  public allTime = true;
  public startDate: any;
  public endDate: any;

  test(tt: number) {
    this._test = tt;
  }

  testing() {
    switch (this._test) {
      case 1:
        this.allTime = true;
        return 'button-parent';
      case 2:
        this.allTime = false;
        return 'button-parent2';
    }
  }

  goPrevious(startDate) {
    this.leaderList = [];
    var weeknumber = moment(startDate, 'MMDDYYYY').isoWeek();
    // weeknumber--
    this.startDate = this.dayandWeektoDate(
      weeknumber - 1,
      this.defaultStartDay
    );
    this.endDate = this.dayandWeektoDate(weeknumber, this.defaultStartDay - 1);
    for (let i = 0; i < 20; i++) {
      let first = Math.floor(Math.random() * 8);
      let last = Math.floor(Math.random() * 8);
      let score = Math.floor(Math.random() * 10000);
      let updown = Math.floor(Math.random() * 20);
      this.fakeObjGenerator(first, last, score, updown, i);
    }
  }

  goNext(startDate) {
    this.leaderList = [];
    var weeknumber = moment(startDate, 'MMDDYYYY').isoWeek();
    weeknumber++;
    this.startDate = this.dayandWeektoDate(weeknumber, this.defaultStartDay);
    this.endDate = this.dayandWeektoDate(
      weeknumber + 1,
      this.defaultStartDay - 1
    );
    for (let i = 0; i < 20; i++) {
      let first = Math.floor(Math.random() * 8);
      let last = Math.floor(Math.random() * 8);
      let score = Math.floor(Math.random() * 10000);
      let updown = Math.floor(Math.random() * 20);
      this.fakeObjGenerator(first, last, score, updown, i);
    }
  }

  ngOnInit() {
    for (let i = 0; i < 20; i++) {
      let first = Math.floor(Math.random() * 8);
      let last = Math.floor(Math.random() * 8);
      let score = Math.floor(Math.random() * 10000);
      let updown = Math.floor(Math.random() * 20);
      this.fakeObjGenerator(first, last, score, updown, i);
    }

    this.currentWeek();
  }

  public defaultStartWeek = 8;
  public defaultStartDay = 1;

  public Month = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec'
  ];

  public firstArr = [
    'Aung',
    'Phyo',
    'Oo',
    'Myo',
    'Kyaw',
    'Lwin',
    'Sai',
    'Pyae'
  ];
  public secondArr = [
    'Aung',
    'Phyo',
    'Oo',
    'Myo',
    'Kyaw',
    'Lwin',
    'Sai',
    'Pyae'
  ];
  public updownArray = [
    -5,
    -4,
    -3,
    -2,
    -1,
    0,
    1,
    2,
    3,
    4,
    5,
    0,
    2,
    3,
    -5,
    -10,
    -3,
    4,
    0,
    10
  ];

  public leaderList = [];

  public img = [
    'https://www.thersa.org/globalassets/profile-images/staff/tom-harrison-312.jpg',
    'https://www.vsb.org/images/Gum_KayleeR.jpg',
    'https://image.isu.pub/181120154931-fbaf9715a01968f1753f91e2ed28bd8e/jpg/page_1.jpg',
    'https://www.benedict.edu/wp-content/uploads/2019/02/monica_geter.jpg',
    'https://www.superprof.co.in/images/teachers/teacher-home-college-student-that-grew-zurich-switzerland-speaking-and-learning-german.jpg',
    'https://info.stvincent.edu/hubfs/Anastasia_Jaeger.png',
    'https://pbs.twimg.com/profile_images/720603979051171840/4Wh0XvNt_400x400.jpg',
    'https://qph.fs.quoracdn.net/main-thumb-122593007-200-yunivorkuxfbuwlnxvglkuhtnczvarer.jpeg',
    'https://media-exp1.licdn.com/dms/image/C5103AQEboAyY_d0Ahw/profile-displayphoto-shrink_200_200/0?e=1586995200&v=beta&t=GkCXP2U0Z0JVqxm6LAuf4jWyBjO0ffH5Pnrxi4vMQ_U',
    'https://s3.r29static.com/bin/entry/7f4/720x864,85/2117531/image.webp',
    'https://www.thersa.org/globalassets/profile-images/staff/tom-harrison-312.jpg',
    'https://www.vsb.org/images/Gum_KayleeR.jpg',
    'https://image.isu.pub/181120154931-fbaf9715a01968f1753f91e2ed28bd8e/jpg/page_1.jpg',
    'https://www.benedict.edu/wp-content/uploads/2019/02/monica_geter.jpg',
    'https://www.superprof.co.in/images/teachers/teacher-home-college-student-that-grew-zurich-switzerland-speaking-and-learning-german.jpg',
    'https://info.stvincent.edu/hubfs/Anastasia_Jaeger.png',
    'https://pbs.twimg.com/profile_images/720603979051171840/4Wh0XvNt_400x400.jpg',
    'https://qph.fs.quoracdn.net/main-thumb-122593007-200-yunivorkuxfbuwlnxvglkuhtnczvarer.jpeg',
    'https://media-exp1.licdn.com/dms/image/C5103AQEboAyY_d0Ahw/profile-displayphoto-shrink_200_200/0?e=1586995200&v=beta&t=GkCXP2U0Z0JVqxm6LAuf4jWyBjO0ffH5Pnrxi4vMQ_U',
    'https://s3.r29static.com/bin/entry/7f4/720x864,85/2117531/image.webp'
  ];

  fakeObjGenerator(first, last, score, updown, i) {
    //console.log(first, last);
    let name = this.firstArr[first] + ' ' + this.secondArr[last];
    let leader = {
      id: '',
      name: name,
      score: score,
      image: this.img[i],
      upOrDown: this.updownArray[updown]
    };
    //console.log(leader);
    this.leaderList.push(leader);
    //console.log(this.leaderList);
  }

  dayandWeektoDate(week, day) {
    return moment()
      .day(day)
      .week(week);
  }

  currentWeek() {
    //get week number
    var d = new Date();
    var day = d.getDate();
    var month = d.getMonth() + 1;
    // var month=(d.getMonth()+1) <10 ? '0'+d.getMonth()+1 : d.getMonth()+1
    var year = d.getFullYear();
    var today = month + '-' + day + '-' + year;

    var weeknumber = moment(today, 'MMDDYYYY').isoWeek();

    this.startDate = this.dayandWeektoDate(
      this.defaultStartWeek,
      this.defaultStartDay
    );
    this.endDate = this.dayandWeektoDate(
      this.defaultStartWeek + 1,
      this.defaultStartDay - 1
    );
  }
}
