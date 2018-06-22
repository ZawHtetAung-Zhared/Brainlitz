import { Component, OnInit } from '@angular/core';
import { appService } from '../../service/app.service';
import { DataService } from '../../service/data.service';
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
  detailCourse:any;
  allCoursePlan:any;
  coursePlanName:any;
  teacherName:any;
  day;
  quizwerkz;
  dayArr=[];
  repeatDay:any;
  allUsers:any;
  allPdf;
  @BlockUI() blockUI: NgBlockUI;
  type: any;

  constructor(private router: Router, private _service: appService, public dataservice: DataService, private modalService: NgbModal) { }
  public regionId = localStorage.getItem('regionId');
  ngOnInit() {
  	this.getCourseLists();
    this.getCoursePlans();
    this.getUsers();
    this.getPdfList();
  }

  changeRoute(){
    console.log("Change Route")
    localStorage.removeItem('coursePlanId');
    localStorage.removeItem('courseId');
    localStorage.removeItem('splan');
    this.router.navigate(['/courseCreate']);
  }

  edit(course){
    console.log("Edit",course);
    localStorage.setItem('coursePlanId',course.coursePlanId);
    localStorage.setItem('courseId',course._id)
    this.dataservice.hero = course; 
    // this.dataservice.edit = true;
    this.router.navigate(['/courseCreate']);
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

  assignUser(course){
  	console.log(course)
  	this.router.navigate(['/assign']);
  	let obj = {
  		'courseid': course._id,
  		'coursename': course.name,
  		'coursecode': course.courseCode,
  	}
  	localStorage.setItem('courseObj',JSON.stringify(obj));
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

  getUsers(){
    this._service.getAllUsers(this.regionId, this.type)
    .subscribe((res:any)=>{
      this.allUsers = res;
      console.log("All Users",this.allUsers);
    })
  }

  getCoursePlans(){
    this._service.getAllCoursePlan(this.regionId)
    .subscribe((res:any)=>{
      this.allCoursePlan = res;
      console.log("Course Plans",this.allCoursePlan);
    })
  }

  getPdfList(){
    this._service.getAllPdf(this.regionId)
    .subscribe((res:any) => {
      this.allPdf = res;
      console.log("quizwerkz",this.allPdf)
    })
  }

  showCoursePlanName(planid){
    console.log("course plan id",planid);
    console.log("Test",this.allCoursePlan);
    let item1 = this.allCoursePlan.filter(item => item._id === planid)[0];
    console.log(item1);
    return item1;
  }
  showUserName(userid){
    console.log("user id",userid);
    console.log("Test",this.allUsers);
    let item = this.allUsers.filter(item => item.userId === userid)[0];
    console.log(item);
    return item;
  }
  nameArr=[];
  showQuizwerkz(qw){
    let qwArr = qw;
    console.log("qw",qwArr);
    for (let i=0; i < qwArr.length; i++){
      let qwId = qwArr[i];
      console.log(qwId);
      let qwName = this.allPdf.filter(item => item._id === qwId)[0].name;
      console.log(qwName)
      this.nameArr.push(qwName)
    }
    console.log(this.nameArr)
    return this.nameArr;
  }

  showRepeatedDays(arr){
    let test = arr;
    console.log("Test",test)
    for (let i = 0; i < arr.length; i++) {
      console.log(arr[i]);
      switch (arr[i]) {
        case 0:
        this.day = "Sunday";
        break;
        case 1:
        this.day = "Monday";
            break;
        case 2:
        this.day = "Tuesday";
            break;
        case 3:
        this.day = "Wednesday";
            break;
        case 4:
        this.day = "Thursday";
            break;
        case 5:
        this.day = "Friday";
            break;
        case  6:
        this.day = "Saturday";
      }
      this.dayArr.push(this.day) 
    }
    console.log(this.dayArr)
    return this.dayArr; 
  }

  getQuizwerkz(courseid){
    this._service.getQuizwerkzForCourse(courseid)
    .subscribe((res:any) => {
      console.log(res);
      this.quizwerkz = res;
    })
  }

  courseDetail(course,detail){
    this.dayArr =[];
    this.nameArr = [];
  	this._service.getSingleCourse(course._id)
  	.subscribe((res:any) => {
  		console.log("course detail",res);
      this.detailCourse = res;
      this.getQuizwerkz(this.detailCourse._id);
      let coursePlan=this.showCoursePlanName(this.detailCourse.coursePlanId);
      this.coursePlanName = coursePlan.name;
      console.log("coursePlanName",this.coursePlanName)
      let teacher = this.showUserName(this.detailCourse.teacherId);
      this.teacherName = teacher.preferredName;
      console.log("teacher name",this.teacherName)
      this.repeatDay = this.showRepeatedDays(this.detailCourse.repeatDays);
      console.log("Repeat",this.repeatDay)
      this.modalReference = this.modalService.open(detail);
      this.modalReference.result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  	})
  }
}
