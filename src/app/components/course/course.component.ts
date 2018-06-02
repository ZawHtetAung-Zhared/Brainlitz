import { Component, OnInit } from '@angular/core';
import { appService } from '../../service/app.service';
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  courseList:any;
  code:any ;
  constructor(private router: Router, private _service: appService, private modalService: NgbModal) { }
  public regionId = localStorage.getItem('regionId');;
  ngOnInit() {
  	this.getCourseLists();
  }

  getCourseLists(){
    this._service.getAllCourse(this.regionId)
    .subscribe((res:any) => {
      console.log(res);
      this.courseList = res;
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

  // getCourseDetail(){
  // 	this._service.getSingleCourse()
  // 	.subscribe((res:any) => {
  // 		console.log(res);
  // 	})
  // }
}
