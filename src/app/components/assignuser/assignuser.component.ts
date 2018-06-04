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
  modalReference:any;
  closeResult: any;
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

  open1(content1) {
    this.modalReference = this.modalService.open(content1, { size: 'lg' });
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

  assignSelected(id, type){
  	console.log("Assign Users",id);
    if(type == 'staff'){
     let obj1 = {
       'courseId': this.selectedCourse.courseid,
        'userId': id,
       'userType': 'staff'
     }
     this._service.assignUser(this.regionid,obj1)
     .subscribe((res:any) => {
       this.modalReference.close();
       console.log(res);
     })
    }else{
     let obj = {
       'courseId': this.selectedCourse.courseid,
        'userId': id,
       'userType': 'customer'
     }
     this._service.assignUser(this.regionid,obj)
     .subscribe((res:any) => {
       this.modalReference.close();
       console.log(res);
     })
    }
  	
  	
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
