import { Component, OnInit, ViewContainerRef, HostListener, Inject, AfterViewInit } from '@angular/core';
import { appService } from '../../service/app.service';
import { DataService } from '../../service/data.service';
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastsManager } from 'ng5-toastr/ng5-toastr';
import { DOCUMENT } from "@angular/platform-browser";

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  courseList:any;
  code:any ;
  emptyCourse:boolean = false;
  isCategory:boolean = false;
  isPlan:boolean = false;
  isCourseDetail:boolean = false;
  public detailLists:any = {};
  public pplLists:any;
  public activeTab:any = '';
  isSticky:boolean = false;
  showBtn:boolean = false;
  @BlockUI() blockUI: NgBlockUI;
  public goBackCat: boolean = false;

  constructor( @Inject(DOCUMENT) private doc: Document, private router: Router, private _service: appService, public dataservice: DataService, private modalService: NgbModal, public toastr: ToastsManager, public vcr: ViewContainerRef ) {
    this.toastr.setRootViewContainerRef(vcr);
    this._service.goback.subscribe(() => {   
      console.log('goooo') 
      this.isCategory = false;
      window.scroll(0,0);
    });
   
   this._service.goplan.subscribe(() => {
     console.log('muuuu')
     this.isCategory = false;
      this.isPlan = true;
      this.goBackCat = true;
   })

   this._service.goCat.subscribe(() => {   
      console.log('goback22', this.goBackCat) 
      this.goBackCat = false;
      this.isCategory = true;
      this.isPlan = false;
    });

   this._service.goCourse.subscribe(() => {   
      console.log('goback33') 
      this.isCategory = false;
      this.isPlan = false;
      this.goBackCat = false;
    });

    
  }
  public regionId = localStorage.getItem('regionId');
  ngOnInit() {
  	this.getCourseLists();
    localStorage.removeItem('categoryID');
    localStorage.removeItem('categoryName');
    this.getCPlanList();
    this.activeTab = 'People';
  }

  ngAfterViewInit() {
    console.log('AfterViewInit');
    this.detailLists = {
      'paymentPolicy': {
        "courseFee": "",
        "miscFee": "",
        "deposit": {"amount": ""},
        "proratedLessonFee": ""
      },
      'location': {
        'name': ""
      }
    }

    this.pplLists = {
      'CUSTOMER': [{}],
      'TEACHER': [{
              'preferredName': ''
            }],
      'STAFF': [{}],
    }
  }

  @HostListener('window:scroll', ['$event']) onScroll($event){    
    if(window.pageYOffset > 10){
      console.log('greater than 30')
      this.isSticky = true;
      this.showBtn = true
    }else{
      console.log('less than 30')
      this.isSticky = false;
      this.showBtn = false;
    }
  }

  // start course detail
  cancel(){
    this.isCourseDetail = false;
  }

  showCourseDetail(id){
    console.log(id)
    this.isCourseDetail = true;
    this.getCourseDetail(id);
    this.getUsersInCourse(id);
  }

  getCourseDetail(id){
    this._service.getSingleCourse(id)
    .subscribe((res:any)=>{
      console.log(res)
      this.detailLists = res;
      console.log(this.detailLists)
    },err =>{
      console.log(err);
    });
  }

  getUsersInCourse(id){
    this._service.getAssignUser(this.regionId,id)
    .subscribe((res:any)=>{
      console.log(res)
      this.pplLists = res;
      // this.detailLists = res;
      // console.log(this.detailLists)
    },err =>{
      console.log(err);
    });
  }

  clickTab(type){
    this.activeTab = type;
  }

  // end course detail

  changeRoute(){
    this.isCategory = true;
    this.goBackCat = false;
    // console.log("Change Route")
    // localStorage.removeItem('coursePlanId');
    // localStorage.removeItem('courseId');
    // localStorage.removeItem('splan');
    // this.router.navigate(['/courseCreate']);
    // this.router.navigate(['courseplan']);
  }

  scrollTop(){
    console.log("scrollTop");
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }

  edit(course){
    console.log("Edit",course);
    localStorage.setItem('coursePlanId',course.coursePlanId);
    localStorage.setItem('courseId',course._id)
    this.dataservice.hero = course; 
    // this.dataservice.edit = true;
    this.router.navigate(['/courseCreate']);
  }
  getCPlanList(){
    this._service.getAllCoursePlan(this.regionId)
    .subscribe((res:any) => {
      console.log("course plan list",res)
    })
  }
  getCourseLists(){
    this.blockUI.start('Loading...'); 
    this._service.getAllCourse(this.regionId)
    .subscribe((res:any) => {
      console.log('Course List',res);
      this.courseList = res;
      if(this.courseList.length > 0 ){
        this.emptyCourse = false;
        for (var i in this.courseList) {
          let duration = this.courseList[i].coursePlan.lesson.duration;
          // console.log(duration);
          for(var j in this.courseList[i].courses){
            let date = this.courseList[i].courses[j].startDate;
            let starttime = date.substring(date.search("T")+1,date.search("Z")-7);
            // console.log(date);
            console.log('starttime',starttime);
            let piece = starttime.split(':');
            let mins = piece[0]*60 + +piece[1] + +duration;
            let endtime = this.D(mins%(24*60)/60 | 0) + ':' + this.D(mins%60);  
            console.log('endtime',endtime)
            this.courseList[i].courses[j].courseDuration = {"starttime": starttime, "endtime": endtime};
          }
        }
      }else{
        this.emptyCourse = true;
      }
       setTimeout(() => {
        this.blockUI.stop(); // Stop blocking
      }, 500);
    })
  }
  D(data){ return (data<10? '0':'') + data};

  assignUser(course){
  	console.log(course)
  	this.router.navigate(['/assign']);
  	let obj = {
  		'courseid': course._id,
  		'coursename': course.name,
  		'coursecode': course.courseCode,
      'locationId': course.location.locationId
  	}
  	localStorage.setItem('courseObj',JSON.stringify(obj));
  }
}
