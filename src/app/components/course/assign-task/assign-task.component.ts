import { Component, OnInit } from '@angular/core';
declare var $: any;

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
  public clickableSteps: Array<any> = ['step1'];
  public activeStep: any;
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
    setTimeout(function() {
      $('#step1').addClass('active');
    }, 200);
    this.activeStep = '1';
    this.isScheduleTask = true;
  }

  stepClick(event, step) {
    if (this.clickableSteps.includes(step)) {
      $('#' + step).addClass('active');
      this.activeStep = step;
      this.addOrRemoveClassOfStep($(event.target));
    }
    console.log('active step', this.activeStep);
  }

  addOrRemoveClassOfStep(ele) {
    var max = this.clickableSteps[this.clickableSteps.length - 1];
    ele.parents('li').removeClass('done');
    ele
      .parents('li')
      .prevAll('li')
      .addClass('done');
    ele
      .parents('li')
      .prevAll('li')
      .removeClass('active');
    ele
      .parents('li')
      .nextAll('li')
      .removeClass('active');
    for (var i = 0; i < this.clickableSteps.length; i++) {
      $('#' + this.clickableSteps[i])
        .children('a')
        .css('background-color', '#0080ff');
    }
    if (max != ele.parents('li').attr('id')) ele.parents('li').addClass('done');
  }
}
