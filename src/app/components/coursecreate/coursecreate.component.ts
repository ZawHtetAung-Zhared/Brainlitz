import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef, NgbDateStruct, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { appService } from '../../service/app.service';
import { Router } from '@angular/router';
// declare var jQuery: any;

// import { Course } from './course'

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
  public showPlanList:boolean = false;
  public showPlan:boolean = false;
  minDate:any;
  maxDate:any;
  // isDisabled:any;
  courseList: any;
  bsValue: Date;
  powers: any;
   // powers = ['Really Smart', 'Super Flexible',
   //          'Super Hot', 'Weather Changer'];

  constructor(private modalService: NgbModal, private _service: appService, private router: Router, private config: NgbDatepickerConfig) {
      // weekends are disabled
    // config.markDisabled = (date: NgbDateStruct) => {
    //   const d = new Date(date.year, date.month - 1, date.day);
    //   return d.getDay() === this.model.startDate;
    // }

   }



  ngOnInit() {
  	this.getCoursePlanList();
    this.getCourseLists();
  }

  showPlanlist(){
    console.log("showPlanList")
    this.showPlan = true;
  }

  getCoursePlanList(){
  	this._service.getAllCoursePlan(this.regionID)
    .subscribe((res:any) => {
    	this.coursePlan = res;
    	console.log(this.coursePlan);
    });
  }

  selectCoursePlan(plan){
  	console.log("selectCoursePlan",plan);
  	this.showCourse = true;
  	this.model.coursePlanId = this.choosePlan;
  	console.log(this.model.coursePlanId)
    // this._service.getAllUsers(this.regionID)
    // .subscribe((res:any) => {
    //   console.log(res);
    //   this.users = res;
    //   this.model.teacherId = '';
    // });

    // this._service.getLocations(this.regionID)
    // .subscribe((res:any) => {
    //   this.locationList = res;
    //   console.log(this.locationList);
    //   this.model.locationId = '';
    // })
    this.getUserList();
    this.getLocationsList();
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

  //  closeDatepicker(id){
  //   id.close();
  // }

  // newTest(){
  //     console.log("Test")
  //     jQuery("#end").hide();

  // }
  
  back(){
  	console.log("Back Works")
  	this.showCourse = false;
  }
  createCourse(){
  	console.log("createCourse work",this.model);
    this.courseObj = {
      "coursePlanId": this.model.coursePlanId,
      "startDate": this.changeDateFormat(this.model.startDate),
      "endDate": this.changeDateFormat(this.model.endDate),
      "teacherId": this.model.teacherId,
      "courseCode": this.model.courseCode,
      "locationId": this.model.locationId,
      "room": this.model.room,
      "reservedNumberofSeat": this.model.reservedNumSeat,
      "name": this.model.courseName,
      "lessonCount": 2,
      "repeatDays": "[6]",
      "description": this.model.description,
    };
  	console.log("Course",this.courseObj);
  	this._service.createCourse(this.regionID,this.courseObj)
  	.subscribe((res:any) => {
    	console.log(res); 
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
  // isDisabled(date: NgbDateStruct) {
  //   const d = new Date(date.year, date.month - 1, date.day);
  //   console.log(d);
  //   return date.day==13;
  // }
  
  changeDateFormat(date){
  	let ngbDate = date;
  	let myDate = new Date(ngbDate.year, ngbDate.month-1, ngbDate.day);
    let newFormat = (myDate.toISOString()); 
    console.log(newFormat);
  	return newFormat;
  }
  cancel(){
  	this.router.navigate(['course/']); 
  }
  getCourseLists(){
    this._service.getAllCourse(this.regionID)
    .subscribe((res:any) => {
      console.log(res);
      this.courseList = res;
    })
  }

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
