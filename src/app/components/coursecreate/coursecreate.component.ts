import { Component, OnInit, ViewChild,Input,Output,EventEmitter, ViewContainerRef } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef, NgbDateStruct, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import {NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import { appService } from '../../service/app.service';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastsManager } from 'ng5-toastr/ng5-toastr';

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
  public coursePlan:{};
  public regionID = '5af915541de9052c869687a3';
  public users;
  public locationList;
  public pdfList:any;
  public showPlanList:boolean = false;
  public showPlan:boolean = false;
  public toggleBool: boolean=true;
  public classend: any;
  public selectedDay = [];
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
  public cbChecked;
  minDate:any;
  maxDate:any;
  // isDisabled:any;
  courseList: any;
  bsValue: Date;
  powers: any;
  @BlockUI() blockUI: NgBlockUI;
  date = new Date();
  // mytime: Date = new Date(); 

  constructor(private modalService: NgbModal, private _service: appService, private router: Router, private config: NgbDatepickerConfig, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
      // weekends are disabled
    // config.markDisabled = (date: NgbDateStruct) => {
    //   const d = new Date(date.year, date.month - 1, date.day);
    //   return d.getDay() === this.model.startDate;
    // }
   }

  ngOnInit() {
  	this.getCoursePlanList();
    // this.getCourseLists();
  }
  
  showPlanlist(){
    console.log("showPlanList")
    this.showPlan = true;
  }

  getCoursePlanList(){
    this.blockUI.start('Loading...');
  	this._service.getAllCoursePlan(this.regionID)
    .subscribe((res:any) => {
    	this.coursePlan = res;
    	console.log(this.coursePlan);
       setTimeout(() => {
        this.blockUI.stop(); // Stop blocking
      }, 80);
    });
  }
  original:any;
  selectCoursePlan(plan){
  	console.log("selectCoursePlan",plan);
  	this.showCourse = true;
  	this.model.coursePlanId = plan._id;
    this.model.coursePlanName = plan.name;
    this.model.duration = plan.lesson.duration;
    this.original = plan.quizwerkz;
    this.cbChecked = plan.quizwerkz;
    console.log("qw",this.cbChecked)
    console.log(this.model.duration)
  	console.log(this.model.coursePlanId)
    this.getUserList();
    this.getLocationsList();
    this.getPdfList();
  }

  getUserList(){
    this._service.getAllUsers(this.regionID)
    .subscribe((res:any) => {
      console.log(res);
      this.users = res;
      this.model.teacherId = '';
    });
  }

  getLocationsList(){
    this._service.getLocations(this.regionID)
    .subscribe((res:any) => {
      this.locationList = res;
      console.log(this.locationList);
      this.model.locationId = '';
    })
  }

  getPdfList(){
    this._service.getAllPdf(this.regionID)
    .subscribe((res:any) => {
      this.pdfList = res;
      console.log(this.pdfList)
    })
  }
  
  back(){
  	console.log("Back Works")
  	this.showCourse = false;
  }

  selectDay(data, event): void {
    console.log("Day",data,event);
    if (event.target.checked) {
        this.selectedDay.push(data);
        this.toggleBool= false;
     } else {
       var index = this.selectedDay.indexOf(event.target.value);
       console.log("Else")
        this.selectedDay.splice(index, 1);
        this.toggleBool= true;
    }
    this.selectedDay.sort();
    console.log(this.selectedDay);
  }

  selectPdf(data, event): void {
    console.log("Day",data,event);
    var cbIdx = this.cbChecked.indexOf(data);
    console.log(cbIdx)
    if (event.target.checked) {
        if(cbIdx < 0 )
            this.cbChecked.push(data);
     } else {
       if(cbIdx >= 0 )
            this.cbChecked.splice(cbIdx,1);
    }
    console.log(this.cbChecked);
  }

  calculateDuration(time){
    console.log("Calculate",time)
    // let myTime = time.substring(0,3).concat(this.model.duration);
    // console.log("end",myTime)
    let piece = time.split(':');
    let mins = piece[0]*60 + +piece[1] + +this.model.duration;
    this.classend = this.D(mins%(24*60)/60 | 0) + ':' + this.D(mins%60);  
    console.log(this.classend)
  }
  D(J){ return (J<10? '0':'') + J};

  createCourse(){
  	console.log("createCourse work",this.model);
    console.log(this.model.optionsSelected)
    this.courseObj = {
      "coursePlanId": this.model.coursePlanId,
      "startDate": this.changeDateFormat(this.model.startDate,this.model.starttime),
      "endDate": this.changeDateFormat(this.model.endDate,0),
      "teacherId": this.model.teacherId,
      "courseCode": this.model.courseCode,
      "locationId": this.model.locationId,
      "room": this.model.room,
      "reservedNumberofSeat": this.model.reservedNumSeat,
      "name": this.model.courseName,
      "lessonCount": this.model.lessonCount,
      "repeatDays": this.selectedDay,
      "quizwerkz": this.cbChecked,
      "description": this.model.description,
    };
  	console.log("Course",this.courseObj);
  	this._service.createCourse(this.regionID,this.courseObj)
  	.subscribe((res:any) => {
    	console.log(res); 
      this.toastr.success('Successfully Created.');
    });
    this.router.navigate(['course/']); 
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
    if(time == 0){
      let enddate =  date.year+ '-' +date.month+ '-' +date.day;
      return enddate;
    }else{
      let sdate = date.year+ '-' +date.month+ '-' +date.day;
      let dateParts = sdate.split('-');
      let timeParts = time.split(':');
      if(dateParts && timeParts) {
          let fullDate = new Date(Date.UTC.apply(undefined,dateParts.concat(timeParts))).toISOString();
          console.log(fullDate)
          return fullDate;
      }
    }
  }
  
  cancel(){
  	this.router.navigate(['course/']); 
  }
  onClickedOutside(e: Event) {
    console.log('Clicked outside:', e);
  }
  // getCourseLists(){
  //   this._service.getAllCourse(this.regionID)
  //   .subscribe((res:any) => {
  //     console.log(res);
  //     this.courseList = res;
  //   })
  // }

  // editCourse(course){
  //   console.log("Edit Course",course);
  //   this.model = course;
  //   this.getUserList();
  //   this.getLocationsList();
  //   this.showCourse = true;
  //   this._service.getSingleCourse(id,regionid)
  //   .subscribe((res:any)=>{
  //     console.log(res)
  //   })
  // }

  // deleteCourse(id,regionid){
  //   console.log("Delete Course",id,regionid);
  //   this._service.deleteCourse(id,regionid)
  //   .subscribe((res:any) => {
  //     console.log(res);
  //     this.getCourseLists();
  //   })
  // }
}
