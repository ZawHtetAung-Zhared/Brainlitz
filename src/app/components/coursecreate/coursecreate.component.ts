import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-coursecreate',
  templateUrl: './coursecreate.component.html',
  styleUrls: ['./coursecreate.component.css']
})
export class CoursecreateComponent implements OnInit {
  closeResult: string;
  coursePlan = ["CoursePlan1","CoursePlan2","CoursePlan3","CoursePlan4"]

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  open(content){
  	this.modalService.open(content);
  }
  showCourseModal(){
  	console.log("Show Course")
  }
  getValue(plan){
  	console.log(plan)
  }
}
