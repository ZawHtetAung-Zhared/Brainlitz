import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { appService } from '../../../service/app.service';

@Component({
  selector: 'custom-task',
  templateUrl: './custom-task.component.html',
  styleUrls: [
    './custom-task.component.css',
    '../assign-task/assign-task.component.css'
  ]
})
export class CustomTaskComponent implements OnInit {
  // active  && selected
  public activeStep: any;

  // progress
  public isSelectedTime: any;
  public clickableSteps: Array<any> = ['1'];
  public singleSelectedTask: any;

  // get data from parent component
  @Input() courseDetail;

  // lists
  public customObj: any = {};

  constructor(private _route: Router, private _service: appService) {}

  ngOnInit() {
    console.log(this.courseDetail);

    $('#placeholder_color').append(
      "<style id='feedback'>.data-name::-webkit-input-placeholder{color:" +
        '#788796' +
        ' !important;} .data-name::-moz-placeholder{color: #788796!important; opacity:1;} .data-name:-moz-placeholder{color: #788796 !important; opacity:1;}</style>'
    );

    setTimeout(function() {
      $('#step1').addClass('active');
    }, 200);
    this.activeStep = '1';

    this.getAssignTask();
  }

  getAssignTask() {
    this._service.getassignTasks().subscribe((res: any) => {
      this.customObj = res[1];
      console.log(res, 'assign task');
    });
  }

  backCourseDetail() {
    this._route.navigateByUrl('coursedetail/' + this.courseDetail._id);
  }

  stepClick(event, step) {
    console.log(this.clickableSteps);
    if (this.clickableSteps.includes(step)) {
      $('#' + 'step' + step).addClass('active');
      this.activeStep = step;
      this.addOrRemoveClassOfStep($(event.target));
    }
    console.log('active step', this.activeStep);
  }

  addOrRemoveClassOfStep(ele) {
    console.log(ele);
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
      $('#step' + this.clickableSteps[i])
        .children('a')
        .css('background-color', '#0080ff');
    }
    if (max != ele.parents('li').attr('id')) ele.parents('li').addClass('done');
  }

  goToStep2(event, step) {
    console.log(step, 'step');

    this.clickableSteps.push(step);

    this.stepClick(event, step);
  }
}
