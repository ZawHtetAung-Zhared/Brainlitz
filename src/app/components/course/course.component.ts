import { Component, OnInit, ViewContainerRef, HostListener, Inject } from '@angular/core';
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
  allLocation;
  allCategories;
  locationName;
  emptyCourse:boolean = false;
  isCategory:boolean = false;
  isPlan:boolean = false;
  isSticky:boolean = false;
  showBtn:boolean = false;
  @BlockUI() blockUI: NgBlockUI;
  public goBackCat: boolean = false;

  constructor( @Inject(DOCUMENT) private doc: Document, private router: Router, private _service: appService, public dataservice: DataService, private modalService: NgbModal, public toastr: ToastsManager, public vcr: ViewContainerRef ) {
    this.toastr.setRootViewContainerRef(vcr);
    this._service.goback.subscribe(() => {   
      console.log('goooo') 
      this.isCategory = false;
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
    this.getCoursePlans();
    this.getLocationList();
    this.getCategoryList();
    localStorage.removeItem('categoryID');
    localStorage.removeItem('categoryName');
    // this.calculateTime(this.courseList)
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
    console.log("scrollTop")
    this.doc.documentElement.scrollTop = 0;
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

  getLocationList(){
    this._service.getLocations(this.regionId)
    .subscribe((res:any) => {
      console.log(res);
      this.allLocation = res;
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
    this.modalReference = this.modalService.open(content, { backdrop:'static', windowClass: 'animation-wrap'});
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

  confirmDelete(course,content1){
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
      this.toastr.success('Successfully Deleted.');
      this.getCourseLists();
    })
  }

  getUsers(){
    this._service.getAllUsers(this.regionId, 'all')
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

  getCategoryList(){
    this._service.getCategory(this.regionId)
    .subscribe((res:any) => {
      this.allCategories = res;
      console.log("All Categories",this.allCategories)
    })
  }

  // calculateTime(list){
  //   let arrLength = list.length;
  //   for(var i=0; i< arrLength;i++ ){
  //     let duration = list[i].coursePlan.duration;
  //     let arrayL = list[i].course.length;
  //     console.log(arrayL)
  //     // for (var j=0; j< arrayL; j++) {
  //     //   let time = list[0].course[j].startDate;
  //     //   console.log(duration,time);
  //     // }
  //   }
  // }

  // myMethod(days){
  //   console.log('Days',days)
  // }

  

  showItemName(itemid,type){
    if(type == "plan"){
      console.log("itemid",itemid);
      let item1 = this.allCoursePlan.filter(item => item._id === itemid)[0];
      console.log(item1);
      return item1;
    }else if(type == "location"){
      console.log("location id",itemid);
      let item = this.allLocation.filter(item => item._id === itemid)[0];
      console.log(item);
      return item;
    }else if(type == "category"){
      let item = this.allCategories.filter(item => item._id === itemid)[0];
      console.log(item);
      return item;
    }
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
  
  courseDetail(course,detail){
    this.dayArr =[];
    this.nameArr = [];
  	this._service.getSingleCourse(course._id)
  	.subscribe((res:any) => {
  		console.log("course detail",res);
      this.detailCourse = res;
      let coursePlan=this.showItemName(this.detailCourse.coursePlanId,"plan");
      this.coursePlanName = coursePlan.name;
      console.log("coursePlanName",this.coursePlanName)
      this.repeatDay = this.showRepeatedDays(this.detailCourse.repeatDays);
      console.log("Repeat",this.repeatDay);
      let location = this.showItemName(this.detailCourse.locationId,"location");
      console.log(location);
      this.locationName = location.name;
      console.log("location",this.locationName);
      this.modalReference = this.modalService.open(detail, { backdrop:'static', windowClass: 'animation-wrap'});
      this.modalReference.result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  	})
  }
}
