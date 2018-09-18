import { Component, OnInit, ViewChild,Input,Output,EventEmitter, ViewContainerRef, ElementRef, HostListener } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbModalRef, NgbDateStruct, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import {NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import { appService } from '../../service/app.service';
import { DataService } from '../../service/data.service';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastsManager } from 'ng5-toastr/ng5-toastr';
import * as moment from 'moment';

declare var $:any;

@Component({
  selector: 'app-coursecreate',
  templateUrl: './coursecreate.component.html',
  styleUrls: ['./coursecreate.component.css']
})
export class CoursecreateComponent implements OnInit {
  public regionID = localStorage.getItem('regionId');
  public coursePlan = JSON.parse(localStorage.getItem('cPlan'));
  @BlockUI() blockUI: NgBlockUI;

  hello = JSON.parse(localStorage.getItem('splan')) ;
  step1: boolean = false;
  step2: boolean = false;
  step3: boolean = false;
  step4: boolean = false;
  step1FormaData: any;
  step2FormaData: any;
  step3FormaData: any;
  step4FormaData: any;
  wordLength:any;
  model:any = {};
  isChecked:any;
  minDate: any;
  maxDate: any;
  public days = [
    {"day":"Sun", "val": 0},
    {"day":"Mon", "val": 1},
    {"day":"Tue", "val": 2},
    {"day":"Wed", "val": 3},
    {"day":"Thu", "val": 4},
    {"day":"Fri ", "val": 5},
    {"day":"Sat", "val": 6},
  ];
  public selectedDay = [];
  public toggleBool:boolean = true;
  public progressSlider: boolean = false;
  public focusCfee: boolean = false;
  public focusMisfee: boolean = false;
  public selectedHrRange: any;
  public selectedMinRange: any;
  public overDurationHr: boolean = false;
  public startFormat: any;
  public timeInminutes: any;
  public rangeMin: any;
  public rangeHr: any;
  public isSelected: any;
  public maxHrRange:any;
  public minHrRange:any;

  constructor(private modalService: NgbModal, private _service: appService, public dataservice: DataService, private router: Router, private config: NgbDatepickerConfig, public toastr: ToastsManager, vcr: ViewContainerRef, private _eref: ElementRef) {
    this.toastr.setRootViewContainerRef(vcr);
   }
   test;
  ngOnInit() {    
    console.log("CPLan",this.coursePlan)
    setTimeout(function(){
      $("#step1").addClass('active');
    }, 200)
    this.step2=true;
    this.isChecked = 'end';
    this.isSelected = 'am';
    this.rangeHr = '0';
    this.rangeMin = '0';
    this.selectedHrRange = "0";
    this.selectedMinRange = "00";
    this.maxHrRange = 12;
    this.minHrRange = 0;
  }

  focusMethod(e){
    console.log('hi', e)
    $('.limit-wordcount').show('slow'); 
  }
    
  blurMethod(e){
    console.log('blur', e);
    $('.limit-wordcount').hide('slow'); 
  }

  changeMethod(val : string){
    console.log(val)
    this.wordLength = val.length;
  }

  backToCourses(){
    this.router.navigate(['/course']);
    localStorage.removeItem('cPlan');
  }

  continueStep(type, data){
    if(type == 'step1'){
      this.step1FormaData = data;
      console.log(this.step1FormaData)
      this.step1 = false;
      if(this.step1 == false){
        $("#step1").removeClass('active');
        $("#step1").addClass('done');
        $("#step2").addClass('active');
        this.step2 = true;
      }
    }
  }

  backStep(step){
    console.log(step);
    if(step == 'step2'){
      this.step2 = false;
      this.step1 = true;
      if(this.step1 == true){
        $("#step2").removeClass('active');
        $("#step2").addClass('done');
        $("#step1").addClass('active');
      }
    }
  }

  chooseEndOpt(type){
    console.log("Type",type);
    this.isChecked = type;
      if(type == 'end'){
        this.model.end = "";
      }else{
        this.model.lessonCount = "";
        this.maxDate = "";
      }
  }

  setMinDate(event){
    console.log("setMinDate",event);
    this.minDate = event;
  }

  setMaxDate(date){
    console.log("setMaxDate",date);
    this.maxDate =  date;
  }
  clickInit:boolean = false;
  selectDay(data, event): void {
    this.clickInit = true;
    console.log("Day",data,event);
    var dayIdx = this.selectedDay.indexOf(data);
    console.log(dayIdx);
    if (event.target.checked) {
        if(dayIdx < 0 )
          this.selectedDay.push(data);
          this.toggleBool= false;
    } else {
        if(dayIdx >= 0 )
        this.selectedDay.splice(dayIdx,1);
        if(this.selectedDay.length>0){
          this.toggleBool= false;
        }else{
          this.toggleBool= true;
        }
    }
    this.selectedDay.sort();
    console.log(this.selectedDay);
  }

  durationProgress($event){
    this.progressSlider = true;
  }

  @HostListener('document:click', ['$event'])
    public documentClick(event): void {

        if(this.progressSlider != true){
           $('.bg-box').css({ 'display': "none" });   
        }
        else {
            $('.bg-box').css({ 'display': "block" }); 
            $('.bg-box').click(function(event){
                event.stopPropagation();
            });
            this.progressSlider = false;

        }

        if(this.focusCfee == true){
          $('.cfee-bg').addClass("focus-bg");
        }
        else {
          $('.cfee-bg').removeClass("focus-bg");
        }
        this.focusCfee = false;

        if(this.focusMisfee == true){
          $('.misfee-bg').addClass("focus-bg");
        }
        else {
          $('.misfee-bg').removeClass("focus-bg");
        }
        this.focusMisfee = false;
  }

  ChangedRangeValue(e, type){
    if(type == 'hr'){
      this.selectedHrRange = e;
      if(this.selectedHrRange == this.maxHrRange){
        this.overDurationHr = true;
        this.rangeMin = 0;
        this.selectedMinRange = 0;
      }else{
        this.overDurationHr = false;
      }
    }
    if(type == 'min'){
      this.selectedMinRange = e;
    }
    // if(this.isSelected == 'am'){
    //   console.log('AM drag');
    // }else{
    //   console.log('PM drag');
    // }
    this.formatTime()
  }

  chooseTimeOpt(type){
    console.log(type);
    this.isSelected = type;
    if(this.isSelected == 'pm'){
      this.minHrRange = 12;
      this.maxHrRange = 24;
      this.rangeHr = Number(this.selectedHrRange) + 12;
      this.selectedHrRange = Number(this.selectedHrRange) + 12;
      console.log('rangeHr',this.rangeHr);
    }else{
      this.minHrRange =0;
      this.maxHrRange = 12;
      this.rangeHr = Number(this.selectedHrRange) - 12;
      this.selectedHrRange = Number(this.selectedHrRange) - 12;
      console.log('rangeHr',this.rangeHr);
    }
    this.formatTime();
  }

  formatTime(){
    if(this.selectedHrRange<10){
      this.startFormat = 0+this.selectedHrRange + ':' + this.selectedMinRange;
      console.log('Start Format',this.startFormat);
      this.model.starttime = this.startFormat;
    }else{
      this.startFormat = this.selectedHrRange + ':' + this.selectedMinRange;
      console.log('Start Format',this.startFormat);
      this.model.starttime = this.startFormat;
    }
    
  }

  classend:any;
  calculateDuration(time){
    console.log("Calculate",time)
    // let myTime = time.substring(0,3).concat(this.model.duration);
    // console.log("end",myTime)
    let piece = time.split(':');
    let mins = piece[0]*60 + +piece[1] + +this.model.durationTimes;
    this.classend = this.D(mins%(24*60)/60 | 0) + ':' + this.D(mins%60);  
    console.log(this.classend)
  }
  D(J){ return (J<10? '0':'') + J};

}
