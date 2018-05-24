import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { appService } from '../../service/app.service';
import { Router } from '@angular/router';

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

  constructor(private modalService: NgbModal, private service: appService, private router: Router) { }

  ngOnInit() {
  	this.getCoursePlanList();
  }

  getCoursePlanList(){
  	this.service.getAllCoursePlan(this.regionID)
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
  	this.service.getAllUsers(this.regionID)
  	.subscribe((res:any) => {
  		console.log(res);
  		this.users = res;
  		this.model.teacherId = '';
  	});

    this.service.getLocations(this.regionID)
    .subscribe((res:any) => {
    	this.locationList = res;
    	console.log(this.locationList);
    	this.model.locationId = '';
    })
  }
  
  back(){
  	console.log("Back Works")
  	this.showCourse = false;
  }
  createCourse(){
  	console.log("createCourse work",this.model);
  	this.courseObj = {
	  "coursePlanId": this.model.coursePlanId,
	  "name": this.model.courseName,
	  "start": this.changeDateFormat(this.model.startDate),
	  "end": this.changeDateFormat(this.model.endDate),
	  "teacherId": this.model.teacherId,
	  "courseCode": this.model.courseCode,
	  "locationId": this.model.locationId,
	  "room": this.model.room,
	  "reservedNumberofSeat": this.model.reservedNumSeat,
	  "description": this.model.description
  	};
  	console.log("Course",this.courseObj);
  	this.service.createCourse(this.regionID,this.courseObj)
  	.subscribe((res:any) => {
    	console.log(res); 
    });
    this.router.navigate(['course/']); 
  }
  changeDateFormat(date){
  	let ngbDate = date;
  	let myDate = new Date(ngbDate.year, ngbDate.month-1, ngbDate.day);
  	console.log(myDate);
  	return myDate;
  }
  cancel(){
  	this.router.navigate(['course/']); 
  }
}
