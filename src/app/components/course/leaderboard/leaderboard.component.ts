import { Component, OnInit } from '@angular/core';

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
  public startDate = '';
  public endDate = '';

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

  ngOnInit() {
    this.startDate = '1 Sep 2019';
    this.endDate = '7 Sep 2019';
    for (let i = 0; i < 20; i++) {
      let first = Math.floor(Math.random() * 8);
      let last = Math.floor(Math.random() * 8);
      let score = Math.floor(Math.random() * 10000);
      let updown = Math.floor(Math.random() * 20);
      this.fakeObjGenerator(first, last, score, updown);
    }

    // this.fakeObjGenerator
    // this.fakeObjGenerator
    // this.fakeObjGenerator
    // this.fakeObjGenerator
    // this.fakeObjGenerator
    // this.fakeObjGenerator
    // this.fakeObjGenerator
    // this.fakeObjGenerator
    // this.fakeObjGenerator
    // this.fakeObjGenerator
    // this.fakeObjGenerator
    // this.fakeObjGenerator
    // this.fakeObjGenerator
    // this.fakeObjGenerator
    // this.fakeObjGenerator
    // this.fakeObjGenerator
    // this.fakeObjGenerator
    // this.fakeObjGenerator
    // this.fakeObjGenerator
    // this.fakeObjGenerator
    console.log(this.leaderList);
  }

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

  fakeObjGenerator(first, last, score, updown) {
    console.log(first, last);
    let name = this.firstArr[first] + ' ' + this.secondArr[last];
    let leader = {
      id: '',
      name: name,
      score: score,
      image:
        'https://www.thersa.org/globalassets/profile-images/staff/tom-harrison-312.jpg',
      upOrDown: this.updownArray[updown]
    };
    console.log(leader);
    this.leaderList.push(leader);
    console.log(this.leaderList);
  }
}
