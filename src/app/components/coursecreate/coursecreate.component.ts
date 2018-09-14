import { Component, OnInit, ViewChild,Input,Output,EventEmitter, ViewContainerRef, ElementRef } from '@angular/core';
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
  // public closeResult: string;
  // public modalReference: any;
  // public choosePlan: any;
  // public model: any = {};
  // public showCourse:boolean = false;
  // public courseObj:{};
  // public coursePlan;
  // public regionID = localStorage.getItem('regionId');
  // public coursePlanId = localStorage.getItem('coursePlanId');    
  // public coursePlanName;
  // public courseId;
  // public users;
  // public locationList;
  // public pdfList:any;
  // public showPlanList:boolean = false;
  // public showPlan:boolean = false;
  // public toggleBool: boolean=true;
  // public classend: any;
  // public selectedDay = [];
  // public isEdit:boolean = false;
  // public days = [
  //   {"day":"Sun", "val": 0},
  //   {"day":"Mon", "val": 1},
  //   {"day":"Tue", "val": 2},
  //   {"day":"Wed", "val": 3},
  //   {"day":"Thu", "val": 4},
  //   {"day":"Fri ", "val": 5},
  //   {"day":"Sat", "val": 6},
  // ];
  // public selectedPdf = [];
  // public cbChecked = [];
  // public testChar:boolean;
  // minDate:any;
  // maxDate:any;
  // courseList: any;
  // bsValue: Date;
  // powers: any;
  // public pdfListLength:any;
  // public noPlan:boolean = false;
  // date = new Date();
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

}
