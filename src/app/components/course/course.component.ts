import { Component, OnInit } from '@angular/core';
import { appService } from '../../service/app.service';
import { Router } from '@angular/router';
// import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  courseList:any;

  constructor(private router: Router, private _service: appService) { }
  public regionID = '5af915541de9052c869687a3';
  ngOnInit() {
  	this.getCourseLists();
  }
  getCourseLists(){
    this._service.getAllCourse(this.regionID)
    .subscribe((res:any) => {
      console.log(res);
      this.courseList = res;
    })
  }
  // open(content){
  // 	console.log("View");
  // 	this.modalService.open(content).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }

  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return  `with: ${reason}`;
  //   }
  // }

}
