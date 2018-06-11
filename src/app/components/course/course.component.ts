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
  modalReference:any;
  modalReference1:any;
  closeResult:any;
  selectCourse:any;
  deleteCourse:any;
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

  onclickDelete(course,content){
    this.selectCourse = course;
    console.log("onclickDelete",course);
    this.modalReference = this.modalService.open(content);
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  comfirmDelete(course,content1){
    console.log(course);
    this.deleteCourse = course;
    this.modalReference.close();
    this.modalReference1 = this.modalService.open(content1);
    this.modalReference1.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  courseDelete(courseId){
    console.log("course delete",courseId);
    this._service.deleteCourse(courseId)
    .subscribe((res:any) => {
      this.modalReference1.close();
      console.log("Res",res);
      this.getCourseLists();
    })
  }
  // getCourseDetail(){
  // 	this._service.getSingleCourse()
  // 	.subscribe((res:any) => {
  // 		console.log(res);
  // 	})
  // }
}
