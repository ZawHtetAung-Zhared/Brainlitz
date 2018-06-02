import { Component, OnInit } from '@angular/core';
import { appService } from '../../service/app.service';
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-assignuser',
  templateUrl: './assignuser.component.html',
  styleUrls: ['./assignuser.component.css']
})
export class AssignuserComponent implements OnInit {
  regionid = localStorage.getItem('regionId');
  selectedCourse =  JSON.parse(localStorage.getItem('courseObj'));
  userList: any;
  public chooseUser: any;
  constructor(private router: Router, private _service: appService, private modalService: NgbModal) { }

  ngOnInit() {
    console.log(this.selectedCourse)
  }

  open(content) {
    this.modalReference = this.modalService.open(content, { size: 'lg' });
    this.getUsers();
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

  getUsers(){
  	this._service.getAllUsers(this.regionid)
  	.subscribe((res:any) => {
  		console.log(res);
  		this.userList = res;
  	})
  }

  assignSelected(id){
  	console.log("Assign Users",id);
  	let obj = {
  		courseId: this.selectedCourse.courseid,
 		userId: id
  	}
  	this.modalReference.close();
  	this._service.assignUser(this.regionid,obj)
  	.subscribe((res:any) => {
  		console.log(res);
  	})
  }

  backtoCourse(){
  	this.router.navigate(['/course']);
  }

  // getCourseDetail(){
  // 	this._service.getSingleCourse(this.regionId)
  // 	.subscribe((res:any) => {
  // 		console.log(res);
  // 	})
  // }
}
