import { Component, OnInit } from '@angular/core';
import { appService } from '../../service/app.service';
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastsManager } from 'ng5-toastr/ng5-toastr';

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
  public assignList= [];
  public selectedUser: any;
  public deleteUser: any;
  public checkedUser = [];
  public toggleBtn:boolean = true; 
  public checkedName = [];
  public assignedUser = [];
  public getAllUsers:any;
  public userType:any;
  @BlockUI('contact-list') blockUIList: NgBlockUI;

  constructor(private router: Router, private _service: appService, private modalService: NgbModal, public toastr: ToastsManager) { }

  ngOnInit() {
    console.log(this.regionid)
    console.log(this.selectedCourse)
    this.getAssignList();
    this.userType = 'all';
  }

  openStaff(content) {
    this.modalReference = this.modalService.open(content, { size: 'lg' });
    this.getUsers("staff");
    console.log(this.assignList)
    let test = this.assignList.indexOf("5b272018f6f5fb1b0d844ba3");
    console.log("Test",test);
    if(this.assignList.length > 0){
      for (var i=0; i < this.assignList.length ; i++) {
        this.assignedUser.push(this.assignList[i].userId);
      }
      console.log(this.checkedUser);
    }
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.chooseUser = '';
      this.checkedUser = [];
      this.checkedName = [];
      this.checkedUserStr = "";
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.chooseUser = '';
      this.checkedUser = [];
      this.checkedName = [];
      this.checkedUserStr = "";
    });
  }

  openCustomer(content1) {
    this.modalReference = this.modalService.open(content1, { size: 'lg' });
    this.getUsers("customer");
    if(this.assignList.length > 0){
      for (var i=0; i < this.assignList.length ; i++) {
        this.assignedUser.push(this.assignList[i].userId);
      }
      console.log(this.checkedUser);
    }
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.chooseUser = '';
      this.checkedUser = [];
      this.checkedName = [];
      this.checkedUserStr = "";
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.chooseUser = '';
      this.checkedUser = [];
      this.checkedName = [];
      this.checkedUserStr = "";
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


  getUsers(type){
    this.blockUIList.start('Loading...');
  	this._service.getAllUsers(this.regionid, type)
  	.subscribe((res:any) => {
  		console.log(res);
  		this.userList = res;
      this.blockUIList.stop();
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
     this.blockUIList.start('Loading...');
     this._service.assignUser(this.regionid,obj1)
     .subscribe((res:any) => {
       this.blockUIList.stop();
       console.log(res);
       this.getAssignList();
     })
     this.modalReference.close();
    }else{
     let obj = {
       'courseId': this.selectedCourse.courseid,
       'userId': id,
       'userType': 'customer'
     }
     this.blockUIList.start('Loading...');
     this._service.assignUser(this.regionid,obj)
     .subscribe((res:any) => {
       this.blockUIList.stop(); 
       console.log(res);
       this.getAssignList();
     })
     this.modalReference.close();
    }
  }

  getAssignList(){
    console.log("getAssignList")
    this._service.getAssignUser(this.regionid,this.selectedCourse.courseid)
     .subscribe((res:any) => {
       this.blockUIList.stop();
       console.log("getAssignList",res);
       this.assignList = res; 
     })
  }

  onclickDelete(user,comfirm){
    this.selectedUser = user;
    console.log("onclickDelete",user);
    this.modalReference = this.modalService.open(comfirm);
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  comfirmDelete(user,alert){
     console.log(user);
      this.deleteUser = user;
      this.modalReference.close();
      this.modalReference = this.modalService.open(alert);
      this.modalReference.result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }

  withdrawUser(userid){
    console.log(userid);
    console.log(this.selectedCourse.courseid)
    let userobj = {
       'courseId': this.selectedCourse.courseid,
       'userId': userid
     }
    this._service.withdrawAssignUser(this.regionid,userobj)
    .subscribe((res:any) => {
      this.modalReference.close();
      console.log(res);
      // this.toastr.success('WITHDRAWAL COMPLETED');
      this.getAssignList();
    })
  }

  backtoCourse(){
  	this.router.navigate(['/course']);
  }
  checkedUserStr:any;
  // for userlist checkbox
  selectUser(user,event){
    var idx = this.checkedUser.indexOf(user.userId);
    console.log(idx)
    console.log('selectUser',user.userId,event);
    if(event.target.checked){
      console.log("checked")
      this.checkedUser.push(user.userId);
      this.checkedUserStr = this.checkedUser.toString();
      this.checkedName.push(user.preferredName); 
      this.toggleBtn = false;
    }else{
      console.log("unchecked")
      this.checkedUser.splice(idx,1);
      this.checkedName.splice(idx,1);
      this.checkedUserStr = this.checkedUser.toString();
      console.log('unchecked str',this.checkedUserStr)
      console.log('unchecked arr',this.checkedUser)
       if(this.checkedUser.length > 0){
         this.toggleBtn = false;
       }else{
         this.toggleBtn = true;
       }
    }
    console.log(this.checkedUserStr);
  }

  clickTab(type){
      if(type == 'customer'){
        this.userType = 'customer';
      }else if(type == 'staff'){
        this.userType = 'staff';
      }else{
        this.userType = 'all';
      }
    }

}
