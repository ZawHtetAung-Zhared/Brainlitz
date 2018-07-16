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

@Component({
  selector: 'app-coursecreate',
  templateUrl: './coursecreate.component.html',
  styleUrls: ['./coursecreate.component.css']
})
export class CoursecreateComponent implements OnInit {
  public closeResult: string;
  public modalReference: any;
  public choosePlan: any;
  public model: any = {};
  public showCourse:boolean = false;
  public courseObj:{};
  public coursePlan;
  public regionID = localStorage.getItem('regionId');
  public coursePlanId = localStorage.getItem('coursePlanId');    
  public coursePlanName;
  public courseId;
  public users;
  public locationList;
  public pdfList:any;
  public showPlanList:boolean = false;
  public showPlan:boolean = false;
  public toggleBool: boolean=true;
  public classend: any;
  public selectedDay = [];
  public isEdit:boolean = false;
  public days = [
    {"day":"Sun", "val": 0},
    {"day":"Mon", "val": 1},
    {"day":"Tue", "val": 2},
    {"day":"Wed", "val": 3},
    {"day":"Thu", "val": 4},
    {"day":"Fri ", "val": 5},
    {"day":"Sat", "val": 6},
  ];
  public selectedPdf = [];
  public cbChecked = [];
  public testChar:boolean;
  minDate:any;
  maxDate:any;
  courseList: any;
  bsValue: Date;
  powers: any;
  @BlockUI() blockUI: NgBlockUI;
  date = new Date();
  hello = JSON.parse(localStorage.getItem('splan')) ;
  public pdfListLength:any;
  public noPlan:boolean = false;

  constructor(private modalService: NgbModal, private _service: appService, public dataservice: DataService, private router: Router, private config: NgbDatepickerConfig, public toastr: ToastsManager, vcr: ViewContainerRef, private _eref: ElementRef) {
    this.toastr.setRootViewContainerRef(vcr);
    // config.markDisabled = (date: NgbDateStruct) => {
    //   const d = new Date(date.year, date.month - 1, date.day);
    //   return d.getDay() === this.model.startDate;
    // }
   }
   test;
  ngOnInit() {    
    // this.hello =JSON.parse(localStorage.getItem('splan'))
    this.getCoursePlanList();
    this.courseId = localStorage.getItem('courseId');
    console.log(this.coursePlanId)
    if(this.courseId){
      console.log("EDIT")
      this.getLocationsList();
      this.getUserList();
      this.getPdfList();
      setTimeout(() => {
         this.editCourse(this.courseId);
       }, 300);
      
    }else if(this.coursePlanId){
      console.log("Create")
      this.showCourse = true;
      this.getUserList();
      this.getPdfList();
      this.getLocationsList();
      console.log('this hello',this.hello);
      this.model.locationId = "";  
      this.model.teacherId = "";  
      this.model.coursePlanId = this.hello.planid;
      this.model.coursePlanName = this.hello.planname;
      this.model.durationTimes = this.hello.duration;
      this.original = this.hello.quizwerkz;
      this.cbChecked = this.hello.quizwerkz;
      console.log("CHECKED create state",this.cbChecked)
      console.log(this.model.duration)
      console.log(this.model.coursePlanId)
    }else{
      this.showCourse = false;
    }
  }

  getCoursePlanList(){
    this.blockUI.start('Loading...');
    this._service.getAllCoursePlan(this.regionID)
    .subscribe((res:any) => {
      this.coursePlan = res;
      console.log(this.coursePlan);
      if(this.coursePlan.length > 0){
        this.noPlan = false;
      }else{
        this.noPlan = true;
      }
      //this.blockUI.stop(); // Stop blocking
       setTimeout(() => {
         this.blockUI.stop(); // Stop blocking
       }, 300);
    });
  }

  getUserList(){
    this._service.getAllUsers(this.regionID,"staff")
    .subscribe((res:any) => {
      console.log(res);
      this.users = res;
      // this.model.teacherId = '';
    });
  }

  getLocationsList(){
    this._service.getLocations(this.regionID)
    .subscribe((res:any) => {
      this.locationList = res;
      console.log(this.locationList);
      // this.model.locationId = '';
    })
  }
  
  getPdfList(){
    this._service.getAllPdf(this.regionID)
    .subscribe((res:any) => {
      this.pdfList = res;
      this.pdfListLength = this.pdfList.length;
      console.log("quizwerkz",this.pdfList)
    })
  }

  showPlanlist(){
    console.log("showPlanList")
    this.showPlan = true;
  }

  // checkedData(plan){
  //   this.choosePlan = plan;
  //   console.log('choose plan',this.choosePlan)
  // }

  original:any;
  selectCoursePlan(plan){
    let newSelect ={
      'planid': plan._id,
      'planname': plan.name,
      'duration': plan.lesson.duration,
      'quizwerkz': plan.quizwerkz,
    };
    localStorage.setItem('splan',JSON.stringify(newSelect));
    console.log("selectCoursePlan",plan);
    this.showCourse = true;
    localStorage.setItem('coursePlanId',plan._id);
    this.coursePlanId = localStorage.getItem('coursePlanId');
    // console.log("Course Plan",this.hello) 
    this.model.locationId = "";  
    this.model.teacherId = "";  
    this.model.coursePlanId = plan._id;
    this.model.coursePlanName = plan.name;
    this.model.durationTimes = plan.lesson.duration;
    // this.original = plan.quizwerkz;
    this.cbChecked = plan.quizwerkz;
    console.log("CHECKED create state",this.cbChecked)
    console.log(this.model.duration)
    console.log(this.model.coursePlanId)
    this.getUserList();
    this.getLocationsList();
    this.getPdfList();
    // let isplanSelect:boolean = true;
    // localStorage.setItem('selectedPlan',isplanSelect)
  }

  back(){
    console.log("Back Works")
    this.showCourse = false;
    this.model = {};
    this.cbChecked = [];
    console.log("pdf checked",this.cbChecked)
    this.selectedDay=[];
    let xxx = JSON.parse(localStorage.getItem('splan'))
    console.log(xxx.quizwerkz)
    console.log("choosePlan in Back",this.choosePlan);
    if(this.choosePlan){
      this.choosePlan.quizwerkz = xxx.quizwerkz
    }
    localStorage.removeItem('coursePlanId');
  }

  numberOnly(event):boolean{
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      console.log("character");
      this.testChar = true;
      return false;
    }
    if(event.target.value.search(/^0/) != -1){
        event.target.value = '';  
    }
    this.testChar = false;
    return true;
  }
  public hide: boolean = true;
  onChange(technology) {
    console.log(technology);
    this.hide = false;
  }

  clickInit:boolean = false;
  selectDay(data, event): void {
    this.clickInit = true;
    console.log("Day",data,event);
    var dayIdx = this.selectedDay.indexOf(data);
    console.log(dayIdx)
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

  selectPdf(data, event): void {
    console.log("Pdf",data,event);
    console.log("cbChecked",this.cbChecked)
    var cbIdx = this.cbChecked.indexOf(data);
    console.log(cbIdx)
    if (event.target.checked) {
        if(cbIdx < 0 )
            this.cbChecked.push(data);
     } else {
       if(cbIdx >= 0 )
         console.log("else")
            this.cbChecked.splice(cbIdx,1);
    }
    console.log(this.cbChecked);
  }

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

  createCourse(){
    console.log("createCourse work",this.model);
    console.log(this.model.optionsSelected)
    console.log(this.model.opt)
    this.courseObj = {
      "coursePlanId": this.model.coursePlanId,
      "startDate": this.changeDateFormat(this.model.start,this.model.starttime),
      "endDate": this.changeDateFormat(this.model.end,"23:59:59:999"),
      "teacherId": this.model.teacherId,
      "courseCode": this.model.courseCode,
      "locationId": this.model.locationId,
      "room": this.model.room,
      "reservedNumberofSeat": this.model.reservedNumberofSeat,
      "name": this.model.name,
      "lessonCount": this.model.lessonCount,
      "repeatDays": this.selectedDay,
      "quizwerkz": this.cbChecked,
      "description": this.model.description,
    };
    console.log("Course",this.courseObj);
    this._service.createCourse(this.regionID,this.courseObj)
    .subscribe((res:any) => {
      console.log(res);
      setTimeout(() => {
        this.toastr.success('Successfully Created.');
      }, 300); 
      localStorage.removeItem('coursePlanId');
      localStorage.removeItem('splan');
      this.router.navigate(['course/']); 
    },err => {
        this.toastr.error('Create Fail');
        console.log(err)
      });
  }

  setMinDate(event){
    console.log("setMinDate",event);
    this.minDate = event;
  }
  setMaxDate(date){
    console.log("setMaxDate",date);
    this.maxDate =  date;
  }

  changeDateFormat(date,time){
      if (date == null) {
        console.log('null',date)
        return ""
      }else{
        console.log("Time",time)
        let sdate = date.year+ '-' +date.month+ '-' +date.day;
        let dateParts = sdate.split('-');
        console.log("dateParts",dateParts)
        if(dateParts[1]){
          console.log(Number(dateParts[1])-1);
          let newParts = Number(dateParts[1])-1;
          dateParts[1] = newParts.toString();
        }
        let timeParts = time.split(':');
        if(dateParts && timeParts) {
            let testDate = new Date(Date.UTC.apply(undefined,dateParts.concat(timeParts)));
            console.log("UTC",testDate)
            let fullDate = new Date(Date.UTC.apply(undefined,dateParts.concat(timeParts))).toISOString();
            console.log("ISO",fullDate)
            return fullDate;
        }
    }
  }
  
  cancel(){
    localStorage.removeItem('coursePlanId');
    localStorage.removeItem('courseId');
    localStorage.removeItem('splan');
    this.router.navigate(['course/']); 
    this.isEdit = true;
  }
   
  showCoursePlanName(planid){
    console.log("course planid ",planid);
    console.log("Course PLans",this.coursePlan)
    let item1 = this.coursePlan.filter(item => item._id === planid)[0];
    console.log(item1.name);
    return item1;
  }

  editCourse(cId){
    this.isEdit = true;
    this.showCourse = true;
    this._service.getSingleCourse(cId)
    .subscribe((res:any) => {
      this.model = res;
      console.log('Edit Course',this.model); 
      let coursePlan=this.showCoursePlanName(this.model.coursePlanId);
      this.model.coursePlanName = coursePlan.name;
      console.log("coursePlanName",this.coursePlanName);
      this.model.start = this.changeDateStrtoObj(this.model.startDate,"start");
      console.log(this.model.start);
      this.model.end = this.changeDateStrtoObj(this.model.endDate,"end");
      console.log(this.model.end);
      this.model.starttime = this.model.startDate.substr(this.model.startDate.search("T")+1,5)
      console.log(this.model.starttime);
      this.selectedDay = this.model.repeatDays;
      let checkedarr = this.model.quizwerkz;
      console.log("CHECKED create state",checkedarr)
      for(let i=0; i < checkedarr.length ; i++){
        let qw = checkedarr[i]._id;
        this.cbChecked.push(qw);
        console.log("cbChecked Arr",qw)
      }
      if(this.model.end){
        this.model.prop = 'B';
      }else if(this.model.lessonCount){
        this.model.prop= 'A';
      }
    })
  }

  updateCourse(courseid){
    console.log("updateCourse",courseid);
    if(this.model.prop == 'A'){
      this.model.end = null;
    }else if(this.model.prop == 'B'){
      this.model.lessonCount == null;
    }
    let obj = {
      "coursePlanId": this.model.coursePlanId,
      "startDate": this.changeDateFormat(this.model.start,this.model.starttime),
      "endDate": this.changeDateFormat(this.model.end,"00:00"),
      "teacherId": this.model.teacherId,
      "courseCode": this.model.courseCode,
      "locationId": this.model.locationId,
      "room": this.model.room,
      "reservedNumberofSeat": this.model.reservedNumberofSeat,
      "name": this.model.name,
      "lessonCount": this.model.lessonCount,
      "repeatDays": this.selectedDay,
      "quizwerkz": this.cbChecked,
      "description": this.model.description,
    };
    this._service.updateCourse(courseid,obj)
    .subscribe((res:any) => {
      console.log(res);
      localStorage.removeItem('coursePlanId');
      setTimeout(() => {
        this.toastr.success('Successfully Updated.');
      }, 300); 
      this.router.navigate(['course/']); 
    },err => {
      this.toastr.error('Edit Fail');
      console.log(err);
    })
  }
  
  changeDateStrtoObj(datestr,type){
    if(type == "start"){
      console.log(datestr)
      let test = datestr.substring(0, datestr.search("T"));
      let testSplit = test.split("-");
      let format = {year: Number(testSplit[0]), month: Number(testSplit[1]), day: Number(testSplit[2])};
      return format;
    }else if(type == "end"){ 
      if(datestr){
        console.log(datestr)
        let test = datestr.substring(0, datestr.search("T"));
        let testSplit = test.split("-");
        let format = {year: Number(testSplit[0]), month: Number(testSplit[1]), day: Number(testSplit[2])};
        return format;
      }else if(datestr == null){
        return null;
      }
    }
    
  }

}
