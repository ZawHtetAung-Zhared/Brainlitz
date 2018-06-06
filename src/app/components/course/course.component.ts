import { Component, OnInit } from '@angular/core';
import { appService } from '../../service/app.service';
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  courseList:any;
  code:any ;
  @BlockUI() blockUI: NgBlockUI;

  constructor(private router: Router, private _service: appService, private modalService: NgbModal) { }
  public regionId = localStorage.getItem('regionId');;
  ngOnInit() {
  	this.getCourseLists();
  }

  getCourseLists(){
    this.blockUI.start('Loading...'); 
    this._service.getAllCourse(this.regionId)
    .subscribe((res:any) => {
      console.log(res);
      this.courseList = res;
       setTimeout(() => {
        this.blockUI.stop(); // Stop blocking
      }, 500);
    })
  }

  courseDetail(course){
  	console.log(course)
  	this.router.navigate(['/assign']);
  	let obj = {
  		courseid: course._id,
  		coursename: course.name,
  		coursecode: course.courseCode
  	}
  	localStorage.setItem('courseObj',JSON.stringify(obj));
  }

  changeRoute(){
  	console.log("Change Route")
  	this.router.navigate(['/courseCreate']);
  }

  // getCourseDetail(){
  // 	this._service.getSingleCourse()
  // 	.subscribe((res:any) => {
  // 		console.log(res);
  // 	})
  // }
}
