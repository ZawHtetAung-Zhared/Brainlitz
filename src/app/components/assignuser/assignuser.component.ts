import { Component, OnInit, ViewContainerRef } from '@angular/core';
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
  public assignCustomer = [];
  public assignStaff = [];
  public assignTeacher = [];
  public selectedUser: any;
  public deleteUser: any;
  public checkedUser = [];
  public toggleBtn:boolean = true; 
  public checkedName = [];
  public assignedUser = [];
  public getAllUsers:any;
  public userType:any = 'teacher';
  public listType:any;
  public emptyAssignStaff:boolean = false;
  public emptyAssignCustomer:boolean = false;
  @BlockUI('contact-list') blockUIList: NgBlockUI;

  constructor(private router: Router, private _service: appService, private modalService: NgbModal, public toastr: ToastsManager, public vcr: ViewContainerRef) {
     this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    console.log(this.regionid)
    console.log(this.selectedCourse)
    this.getAssignList();
  }

  openUserModal(modal,type) {
    console.log(modal,type)
    this.modalReference = this.modalService.open(modal, { size: 'lg' });
    if(type == "customer"){
      this.getUsers("customer");
      this.listType = "Customer List";
    }else{
      this.getUsers("staff");
      this.listType = "Staff List"
    }
    if(type == "customer"){
      if(this.assignCustomer.length > 0){
        for (var i=0; i < this.assignCustomer.length ; i++) {
          this.assignedUser.push(this.assignCustomer[i].userId);
        }
        console.log(this.checkedUser);
      }
    }else if(type == "staff"){
      if(this.assignTeacher.length > 0){
        for(var i = 0; i < this.assignTeacher.length; i++){
          this.assignedUser.push(this.assignTeacher[i].userId)
        }
      }
      console.log("Assign Staff Length",this.assignStaff.length)
      if(this.assignStaff.length > 0){
        for(var j = 0; j< this.assignStaff.length; j++){
          this.assignedUser.push(this.assignStaff[j].userId)
        }
      }
    }
    
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.chooseUser = '';
      this.checkedUser = [];
      this.checkedName = [];
      this.checkedUserStr = "";
      this.assignedUser = [];
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.chooseUser = '';
      this.checkedUser = [];
      this.checkedName = [];
      this.checkedUserStr = "";
      this.assignedUser = [];
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
  		console.log("userList",res);
  		this.userList = res;
      this.blockUIList.stop();
  	})
  }

  assignSelected(id, type){
  	console.log("Assign Users",id);
    this.assignedUser = [];
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
       this.toastr.success('Successfully Assigned.');
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
       this.toastr.success('Successfully Assigned.');
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
       this.assignCustomer = res.CUSTOMER;
       this.assignStaff = res.STAFF;
       this.assignTeacher = res.TEACHER;
       if(this.assignStaff.length>0){
         this.emptyAssignStaff = false;
       }else{
         this.emptyAssignStaff= true;
       }
       if(this.assignCustomer.length>0){
         this.emptyAssignCustomer = false;
       }else{
         this.emptyAssignCustomer = true;
       }
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
      this.toastr.success('Withdrawal Completed.');
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
      }else if(type == 'teacher'){
        this.userType = 'teacher';
      }else{
        this.userType = 'all';
      }
    }

}
