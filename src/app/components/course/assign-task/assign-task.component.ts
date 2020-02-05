import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assign-task',
  templateUrl: './assign-task.component.html',
  styleUrls: ['./assign-task.component.css']
})
export class AssignTaskComponent implements OnInit {
  public standActiveId: any;
  public classActiveId: any;
  public isStart: boolean = false;
  public isScheduleTask: boolean = false;

  public standardList: any = [
    {
      _id: '1',
      name: 'NGSS'
    },
    {
      _id: '2',
      name: 'SingaporeMOE'
    },
    {
      _id: '3',
      name: 'Curiculum Standard I'
    }
  ];
  public classList: any = [];

  constructor() {}
  ngOnInit() {
    for (let i = 0; i < 50; i++) {
      let temp: any = {};
      temp._id = i;
      temp.name = 'Primary ' + i;
      this.classList.push(temp);
    }
    this.standActiveId = this.standardList[0]._id;
  }

  checkStandard(id) {
    this.standActiveId = id;
  }

  choiceClass(id) {
    this.classActiveId = id;
  }

  goToStart() {
    this.isStart = true;
  }

  goToScheduleTask() {
    this.isScheduleTask = true;
  }
}
