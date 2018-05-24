import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { appService } from '../../service/app.service';

// import { Course } from './course'

@Component({
  selector: 'app-coursecreate',
  templateUrl: './coursecreate.component.html',
  styleUrls: ['./coursecreate.component.css']
})
export class CoursecreateComponent implements OnInit {
  public closeResult: string;
  public modalReference: any;
  public coursePlan =[
        { "id": 1111 , "name":"CoursePlan1"},
        { "id": 2222 , "name":"CoursePlan2"},
        { "id": 3333 , "name":"CoursePlan3"},
        { "id": 4444 , "name":"CoursePlan4"}
    ]
  public choosePlan: any;
  public model: any = {};
  public showCourse:boolean = false;
  public courseObj:{};
  public coursePlanTest;
  public regionID = '5af915541de9052c869687a3';
  public users;
  public locationList;

  constructor(private modalService: NgbModal, private service: appService) { }

  ngOnInit() {

  }

  open(content){
    this.modalReference = this.modalService.open(content);
	this.modalReference.result.then((result) => {
	  this.closeResult = `Closed with: ${result}`;
	}, (reason) => {
	  this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
	});
    if(this.closeResult != ''){
    	this.choosePlan = '';
    	this.showCourse = false;
    }else{
    	this.showCourse = true;
    }

    this.service.getTest(this.regionID)
    .subscribe((res:any) => {
    	this.coursePlanTest = res;
    	console.log(this.coursePlanTest);
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  showCourseModal(plan,course){
  	console.log("Show Course",plan)
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

  	// this.modalService.open(course);
  	// console.log(this.choosePlan);
  }
  back(){
  	console.log("Back Works")
  	this.showCourse = false;
  }
  createCourse(){
  	this.modalReference.close();
  	// let testDate = this.changeDateFormat(this.model.startDate);
  	console.log("createCourse work",this.model);
  	var test = JSON.stringify(this.model.startDate);
  	console.log(test)
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
  }
  changeDateFormat(date){
  	let ngbDate = date;
  	let myDate = new Date(ngbDate.year, ngbDate.month-1, ngbDate.day);
  	console.log(myDate);
  	return myDate;
  }
}
