import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

import { Course } from './course'

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
  public model: Course = new Course();
  public showCourse:boolean = false;


  constructor(private modalService: NgbModal) { }

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
  	// this.modalService.open(course);
  	// console.log(this.choosePlan);
  }
  back(){
  	console.log("Back Works")
  	this.showCourse = false;
  }
  createCourse(){
  	console.log("createCourse work");
  	this.modalReference.close();
  }
}
