import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { appService } from '../../../service/app.service';
import {
  NgbModal,
  NgbDatepickerConfig,
  NgbCalendar,
  NgbDateStruct
} from '@ng-bootstrap/ng-bootstrap';

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
  public singleSelectedTask: any = {};

  // get data from parent component
  @Input() courseDetail;
  @Input() selectStandard;
  // lists
  public customObj: any = {};
  public scheduletemplateList: any = [];
  public createCustom: any = {};
  public taskLists: any = [];
  public masteryList: any = [];
  // boolean
  public isShowAnnoBlock: boolean = false;
  public progressSlider: boolean = false;

  // other
  public annoTaskDate: any;
  public taskStartDate: any;
  public taskEndDate: any;
  public modalReference: any;

  // hour and date picker
  public selectedHrRange: any;
  public selectedMinRange: any;
  public overDurationHr: boolean = false;
  public startFormat: any;
  public startTime: any;
  model: any = {};
  public rangeMin: any;
  public rangeHr: any;
  public showFormat: any;

  public test =
    "<text index=0 value='\"The diagram below shows a paper cup filled with ice cubes. The paper cup was then left in the classroom.\n' ></text><image index=1 src='https://brainlitz-dev.s3.amazonaws.com/SparkWerkz-API/PD/HEY-12-01/Assets/questionsAssets/hey-12-01-01.jpg' ><text index=2 value='\nWhat can be done to make the ice melt faster?\nBlowing into the cup.\nReplacing the paper cup with a metal cup.\nWrapping his hands around the paper cup. \nPlacing a lid to cover the opening of the paper cup.' ></text>";
  constructor(
    private _route: Router,
    private _service: appService,
    private modalService: NgbModal
  ) {}

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
      this.customObj = res[0];
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
    this.getTemplateLists();
    this.clickableSteps.push(step);
    this.stepClick(event, step);
    this.addActiveBar(1, 2);
  }

  goToStep3(event, step) {
    for (let i = 0; i < 30; i++) {
      let obj: any = {};
      obj._id = i;
      obj.name = 'Needs for Survival' + i;
      obj.masteryCount = 20;
      obj.img =
        'https://brainlitz-dev.s3.ap-southeast-1.amazonaws.com/development/stgbl-cw1/quizwerkz/contents/image/157553244156011223790cute-unicorn-vector-object-background-png_225166.jpg';
      this.taskLists.push(obj);
    }
    console.log(this.taskLists);
    this.clickableSteps.push(step);
    this.addActiveBar(2, 3);
    this.stepClick(event, step);
  }

  goToStep4($event, step) {
    this._service
      .getsingletaskBytemplate(
        '5dda85c6b1c96001c43267ba',
        '5e452659df851f002c2f06a0'
      )
      .subscribe((res: any) => {
        this.masteryList = res.masteries;
        console.log(res);
        this.clickableSteps.push(step);
        this.activeStep = 1;
        this.addActiveBar(3, 4);
        this.stepClick($event, step);
      });
  }

  addActiveBar(current, next) {
    console.log(current, next);
    $('#step' + current).removeClass('active');
    for (let i = 1; i < next; i++) $('#step' + i).addClass('done');

    $('#step' + next).addClass('active');
  }

  backToPrevStep(prev, next) {
    this.activeStep = prev;
    $('#step' + prev).addClass('active');

    $('#astep' + next).addClass('finishdone');
    $('#step' + next).removeClass('active');
  }

  getTemplateLists() {
    this._service
      .getTemplateLists(this.selectStandard.standardId, this.courseDetail._id)
      .subscribe((res: any) => {
        console.log(res, 'template list');
        this.scheduletemplateList = res;
      });
  }

  checkTemplate(obj) {
    console.log(obj);
    let tempObj: any = {};
    tempObj.taskTemplateId = obj._id;
    tempObj.name = obj.templateName;
    tempObj.description = obj.description;
    tempObj.extraTasksAllowed = obj.extraTasksAllowed;
    tempObj.taskBreak = obj.taskBreak;

    this.createCustom.template = tempObj;
    console.log(this.createCustom);
  }

  checkTask(obj) {
    this.singleSelectedTask = obj;
  }

  durationProgress($event) {
    this.progressSlider = true;
  }

  closeDropdown(event, datePicker?) {
    console.log(event);

    if (typeof event.target.className === 'string') {
      if (event.target.className.includes('dropD')) {
        // datePicker.close()
      } else {
        if (event.target.offsetParent == null) {
          datePicker.close();
        } else if (event.target.offsetParent.nodeName != 'NGB-DATEPICKER') {
          datePicker.close();
        }
      }
    }
  }

  chooseTimeOpt(type) {
    console.log(type);
    this.isSelectedTime = type;
    this.formatTime();
  }

  formatTime() {
    console.log('this.selected', this.selectedHrRange, this.selectedMinRange);
    if (this.selectedHrRange > 0) {
      if (this.selectedHrRange < 10) {
        var hrFormat = 0 + this.selectedHrRange;
      } else {
        var hrFormat = this.selectedHrRange;
      }
    } else {
      this.selectedHrRange = '00';
      var hrFormat = this.selectedHrRange;
    }
    if (this.selectedMinRange > 0) {
      if (this.selectedMinRange < 10) {
        this.selectedMinRange = parseInt(this.selectedMinRange);
        this.selectedMinRange = this.selectedMinRange.toString();
        console.log('if', this.selectedMinRange);
        // var minFormat = this.selectedMinRange.concat('0',this.selectedMinRange);
        var minFormat = 0 + this.selectedMinRange;
        // console.log(this.selectedMinRange.concat('0',this.selectedMinRange));
        console.log(minFormat);
      } else {
        console.log('else', this.selectedMinRange);
        var minFormat = this.selectedMinRange;
      }
    } else {
      this.selectedMinRange = '00';
      var minFormat = this.selectedMinRange;
    }
    this.showFormat = hrFormat + ':' + minFormat;
    console.log(this.showFormat);
  }

  D(J) {
    return (J < 10 ? '0' : '') + J;
  }

  ChangedRangeValue(e, type) {
    // console.log(e)
    if (type == 'hr') {
      this.selectedHrRange = e;
      console.log('this.selectedHrRange', this.selectedHrRange);
    }
    if (type == 'min') {
      this.selectedMinRange = e;
      console.log('this.selectedMinRange', this.selectedMinRange);
    }
    this.formatTime();
  }

  checkMasteryExit(obj) {
    // console.log(obj);
    // return this.singleSelectedTask.masteries.findIndex(
    //   data => data.masteryId === obj.masteryId
    // );
  }

  checkedMastery() {
    console.log('hello');
  }

  showMasteryDetail(obj, masteryModal) {
    console.log(obj);
    this.modalReference = this.modalService.open(masteryModal, {
      backdrop: 'static',
      windowClass:
        'jouranlModal d-flex justify-content-center align-items-center'
    });
  }

  modalClose() {
    this.modalReference.close();
  }
}
