import {
  Component,
  OnInit,
  Input,
  HostListener,
  Output,
  EventEmitter
} from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ISubscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { appService } from '../../../service/app.service';
import {
  NgbModal,
  NgbDatepickerConfig,
  NgbCalendar,
  NgbDateStruct
} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { parse } from 'querystring';

declare var $: any;

export interface ISize {
  width: number;
  height: number;
}

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
  @Output() backAssign: EventEmitter<boolean> = new EventEmitter();
  // lists && obj
  public customObj: any = {};
  public scheduletemplateList: any = [];
  public createCustom: any = {};
  public taskLists: any = [];
  public masteryList: any = [];
  public assignModeList: any = [];
  public questionObj: any = {};
  // boolean
  public isShowAnnoBlock: boolean = false;
  public progressSlider: boolean = false;
  public loading1: boolean = false;
  public loading2: boolean = false;
  public loading3: boolean = false;
  public loading4: boolean = false;
  public loading5: boolean = false;

  // other
  public annoTaskDate: any;
  public taskStartDate: any;
  public taskEndDate: any;
  public modalReference: any;
  private subscription: ISubscription;

  // hour and date picker
  public selectedHrRange: any;
  public selectedMinRange: any;
  public overDurationHr: boolean = true;
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
    private modalService: NgbModal,
    private datePipe: DatePipe,
    public toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loading1 = true;
    console.log(this.courseDetail);
    console.log(this.selectStandard);
    this.createCustom.standard = this.selectStandard;
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
    this._service.getassignTasks().subscribe(
      (res: any) => {
        this.customObj = res[0];
        this.createCustom.taskType = res[0];
        this.loading1 = false;
        console.log(this.createCustom);
        console.log(res, 'assign task');
      },
      err => {
        this.loading1 = false;
        console.log(err);
      }
    );
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
    this.loading2 = true;
    this.getTemplateLists(null);
    this.clickableSteps.push(step);
    this.stepClick(event, step);
    this.addActiveBar(1, 2);
  }

  goToStep3(event, step) {
    this.loading3 = true;
    this.isSelectedTime = 'AM';
    this._service
      .getTaskBytemplate(
        this.createCustom.template.taskTemplateId,
        this.createCustom.template.startDate
      )
      .subscribe(
        (res: any) => {
          console.log(res, 'task list');
          this.taskLists = res;
          // this.selectedTaskLists = res.slice();
          // this.selectedTaskLists = res.slice();
          this.clickableSteps.push(step);
          this.addActiveBar(2, 3);
          this.stepClick(event, step);
          this.loading3 = false;
        },
        err => {
          this.loading3 = false;
          console.log(err);
        }
      );
  }

  goToStep4($event, step) {
    this.loading4 = true;
    let temp = [];

    this.singleSelectedTask.announcementDate = this.singleSelectedTask
      .announcementDate
      ? this.singleSelectedTask.announcementDate
      : new Date();
    temp.push(this.singleSelectedTask);
    this.createCustom.template.tasks = temp;
    console.log(this.createCustom);
    this._service
      .getsingletaskBytemplate(
        this.createCustom.template.taskTemplateId,
        this.singleSelectedTask._id
      )
      .subscribe(
        (res: any) => {
          this.createCustom.template.tasks[0].masteries = res.masteries;
          this.masteryList = res.masteries.slice();

          console.log(res);
          this.clickableSteps.push(step);
          this.activeStep = 1;
          this.addActiveBar(3, 4);
          this.stepClick($event, step);
          this.loading4 = false;
        },
        err => {
          this.loading4 = false;
          console.log(err);
        }
      );
  }

  goToStep5($event, step) {
    this.loading5 = true;
    let annDate;
    this.createCustom.template.tasks[0].taskStartDate = this.taskStartDate
      ? this.changeObjDateFormat(this.taskStartDate)
      : this.createCustom.template.tasks[0].taskStartDate;

    this.createCustom.template.tasks[0].taskEndDate = this.taskEndDate
      ? this.changeObjDateFormat(this.taskEndDate)
      : this.createCustom.template.tasks[0].taskEndDate;

    annDate = this.changeDateTimeFormat(
      this.annoTaskDate
        ? this.annoTaskDate
        : this.createCustom.template.tasks[0].announcementDate,
      !this.showFormat == true
        ? this.changeDatetoTime(
            this.createCustom.template.tasks[0].announcementDate
          )
        : this.showFormat
    );

    console.log(this.createCustom.template.tasks[0].taskStartDate);
    console.log(this.createCustom.template.tasks[0].taskEndDate);

    this.createCustom.template.tasks[0].announcementDate = annDate;

    this._service.getassignMode(this.createCustom.taskType.id).subscribe(
      (res: any) => {
        console.log(res, 'assign mode');
        this.addActiveBar(4, 5);
        this.assignModeList = res;
        this.createCustom.template.distributionMode = res[0];

        this.clickableSteps.push(step);
        this.stepClick($event, step);
        this.loading5 = false;
      },
      err => {
        console.log(err);
        this.loading5 = false;
      }
    );
    console.log(this.createCustom);
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

  getTemplateLists(searchValue) {
    this.loading2 = true;
    this._service
      .getTemplateLists(
        this.selectStandard.standardId,
        this.courseDetail._id,
        searchValue
      )
      .subscribe(
        (res: any) => {
          console.log(res, 'template list');
          this.scheduletemplateList = res;
          this.loading2 = false;
        },
        err => {
          this.loading2 = false;
        }
      );
  }

  checkTemplate(obj) {
    console.log(obj);
    let tempObj: any = {};
    tempObj.taskTemplateId = obj._id;
    tempObj.name = obj.templateName;
    tempObj.description = obj.description;
    tempObj.extraTasksAllowed = obj.extraTasksAllowed;
    tempObj.taskBreak = obj.taskBreak;
    tempObj.startDate = new Date().toISOString();
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
    return this.createCustom.template.tasks[0].masteries.findIndex(
      data => data.masteryId === obj.masteryId
    );
  }

  checkedMastery(obj, e) {
    console.log(e.target.tagName);
    if (e.target.tagName != 'svg' && e.target.tagName != 'rect') {
      if (this.checkMasteryExit(obj) != -1) {
        this.createCustom.template.tasks[0].masteries.splice(
          this.checkMasteryExit(obj),
          1
        );
        this.createCustom.template.tasks[0].masteryCount = this.createCustom.template.tasks[0].masteries.length;
      } else {
        this.createCustom.template.tasks[0].masteries.push(obj);
        this.createCustom.template.tasks[0].masteryCount = this.createCustom.template.tasks[0].masteries.length;
      }

      console.log(this.createCustom);
    }
  }

  showMasteryDetail(obj, masteryModal, e) {
    console.log(obj);
    // this.loading = true;
    this._service
      .getQuestionbymastery(this.courseDetail._id, obj.masteryId)
      .subscribe(
        (res: any) => {
          console.log(res);
          this.questionObj = res.data;

          this.modalReference = this.modalService.open(masteryModal, {
            backdrop: 'static',
            windowClass:
              'jouranlModal d-flex justify-content-center align-items-center'
          });
          // this.loading = false;
        },
        err => {
          // this.loading = false;
          console.log(err);
        }
      );
  }

  modalClose() {
    this.modalReference.close();
  }

  choicemode(obj) {
    this.createCustom.template.distributionMode = obj;
    console.log(this.createCustom);
  }

  createAssign() {
    // this.loading = true;
    this.createCustom.template.tasks[0].taskId = this.createCustom.template.tasks[0]._id;
    delete this.createCustom.template.tasks[0]._id;
    console.log('final obj', this.createCustom);
    this._service
      .createAssigntask(this.courseDetail._id, this.createCustom)
      .subscribe(
        (res: any) => {
          console.log(res);
          this._route.navigateByUrl(
            'coursedetail/' + this.courseDetail._id + '/tasks'
          );
          // this.loading = false;
          this.toastr.success('Success Custom Task Create');
        },
        err => {
          // this.loading = false;
          this.toastr.error(err.error.message);
          console.log(err);
        }
      );
  }

  backtoassignTask() {
    if (this.courseDetail.sparkWerkz.standardSelected) this.backCourseDetail();
    else this.backAssign.emit(false);
  }

  @HostListener('document:click', ['$event'])
  public categorySearch(event): void {
    if (this.progressSlider != true) {
      $('.bg-box').css({ display: 'none' });
    } else {
      $('.bg-box').css({ display: 'block' });
      $('.bg-box').click(function(event) {
        event.stopPropagation();
      });
      this.progressSlider = false;
    }
  }

  changeObjDateFormat(date) {
    console.log(date);
    let sdate =
      date.year +
      '-' +
      (date.month >= 10 ? date.month : '0' + date.month) +
      '-' +
      (date.day >= 10 ? date.day : '0' + date.day);
    console.log(sdate);
    return new Date(sdate).toISOString();
  }

  changeDateTimeFormat(date, time) {
    console.log(date, time);
    if (date.year == null) {
      console.log('null', date);
      return date;
    } else {
      console.log('utc date', date);
      console.log('Time', time);
      let sdate = date.year + '-' + date.month + '-' + date.day;
      console.log(sdate);
      let dateParts = sdate.split('-');
      console.log('dateParts', dateParts);
      if (dateParts[1]) {
        console.log(Number(dateParts[1]) - 1);
        let newParts = Number(dateParts[1]) - 1;
        dateParts[1] = newParts.toString();
      }
      let timeParts = time.split(':');
      if (dateParts && timeParts) {
        // let testDate = new Date(Date.UTC.apply(undefined,dateParts.concat(timeParts)));
        // console.log("UTC",testDate)
        let fullDate = new Date(
          Date.UTC.apply(undefined, dateParts.concat(timeParts))
        ).toISOString();
        console.log('ISO', fullDate);
        return fullDate;
      }
    }
  }

  changeDatetoTime(date) {
    console.log(date);
    return this.datePipe.transform(date, 'HH:mm');
  }

  changeHTMLFormat(xml) {
    let arr = [];
    $(xml).each(function(index, value) {
      let temp: any = {};
      temp.tag = value.tagName;
      temp.value =
        value.tagName == 'IMG' ? $(value).prop('src') : $(value).attr('value');
      arr.push(temp);
    });
    return arr;
  }

  searchTemplate(value) {
    console.log(value);
    this.getTemplateLists(value);
  }

  checkImgSize(url) {
    console.log(url, 'img url');
    let img = new Image();
    img.src = url;
    console.log(img, 'img');
    let autoSize;

    console.log(img.height);
    return img.height;
  }

  //   getImgSize(imageSrc: string): Observable<ISize> {
  //     let mapLoadedImage = (event): ISize => {
  //         return {
  //             width: event.target.width,
  //             height: event.target.height
  //         };
  //     }
  //     var image = new Image();
  //     let $loadedImg = Observable.fromEvent(image, "load").take(1).map(mapLoadedImage);
  //     image.src = imageSrc;
  //     return $loadedImg;
  // }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }
}
