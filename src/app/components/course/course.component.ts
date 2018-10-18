import { Component, OnInit, ViewContainerRef, HostListener, Inject, AfterViewInit } from '@angular/core';
import { appService } from '../../service/app.service';
import { DataService } from '../../service/data.service';
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastsManager } from 'ng5-toastr/ng5-toastr';
import { DOCUMENT } from "@angular/platform-browser";
declare var $:any;

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  courseList: Array<any> = [];
  code:any ;
  public isvalidID:any = '';
  public isSeatAvailable:boolean = true;
  emptyCourse:boolean = false;
  activeToday:boolean = false;
  todayIndex:any = '';
  isCourseCreate:boolean = false;
  isCategory:boolean = false;
  isPlan:boolean = false;
  isFous:boolean = false;
  isCourseDetail:boolean = false;
  public formData:any = {};
  public userLists:any = {};
  public detailLists:any = {};
  public activeCourseInfo:any = {};
  public LASD:any; //lastActiceStartDate
  public presentStudent:number = 0;
  public absentStudent:number = 0;
  public noStudent:number = 0;
  public selectedUserLists:any = [];
  public selectedUserId:any = [];
  public todayDate:any;
  public courseId:any;
  public locationId:any;
  public userType:any;
  public deleteId:any = {};
  public modalReference: any;
  public regionId = localStorage.getItem('regionId');
  public locationID = localStorage.getItem('locationId');
  public pplLists:any;
  public removeUser:any;
  public currentCourse:any;
  public activeTab:any = '';
  public result:any;
  isSticky:boolean = false;
  showBtn:boolean = false;
  @BlockUI() blockUI: NgBlockUI;
  public goBackCat: boolean = false;
 

  
  public draft:boolean;

  constructor( @Inject(DOCUMENT) private doc: Document, private router: Router, private _service: appService, public dataservice: DataService, private modalService: NgbModal, public toastr: ToastsManager, public vcr: ViewContainerRef ) {
    this.toastr.setRootViewContainerRef(vcr);
    this._service.goback.subscribe(() => {   
      console.log('goooo') 
      this.isCategory = false;
      window.scroll(0,0);
    });

    this._service.goCourseCreate.subscribe(() => {   
      console.log('go to cc') 
      this.isCategory = false;
      this.isPlan = false;
      this.goBackCat = false;
      this.isCourseCreate = true;
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
      this.isCourseCreate = false;
      this.courseList = []
      this.getCourseLists(20, 0)
    });
  }

  ngOnInit() {
  	this.getCourseLists(20, 0);
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
      },
      'duration': {
        'startDate' : '',
        'endDate' : ''
      },
      'repeatDays': []
    }

    this.pplLists = {
      'CUSTOMER': [{}],
      'TEACHER': [{
              'preferredName': ''
      }],
      'STAFF': [{}],
    };
    this.userLists = [{}];
    
    
  }

  @HostListener('window:scroll', ['$event']) onScroll($event){    
    if(window.pageYOffset > 81){
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
    this.courseList = [];
    this.getCourseLists(20,0);
    this.activeTab = 'People';
  }

  showCourseDetail(courseId){
    console.log(courseId)
    this.currentCourse = courseId;
    this.isCourseDetail = true;
    this.getCourseDetail(courseId);
    this.getUsersInCourse(courseId);
    console.log(this.detailLists.seat_left);
  }

  goToConflict(courseId){
    localStorage.setItem("courseID",courseId);
    localStorage.removeItem('cPlan');
    localStorage.removeItem('tempObj');
    // this.router.navigate(['/courseCreate']);
    this.goBackCat = false;
    this.isCourseDetail = false;
    this.isCourseCreate = true;
    // this.router.navigate(['/courseCreate']);
  }

  getCourseDetail(id){
    this._service.getSingleCourse(id,this.locationID)
    .subscribe((res:any)=>{
      console.log(res)
      this.detailLists = res;
      this.courseId = res._id;
      this.locationId = res.locationId;
      this.draft = res.draft;
      console.log("Draft",this.draft)
      console.log(res.locationId)
      // if(this.draft == true){
      //   this.router.navigate(['/courseCreate']);
      // }
      // console.log(this.locationId)
    },err =>{
      console.log(err);
    });
  }

  getUsersInCourse(courseId){
    console.log('hi call course', courseId)
    this.getCourseDetail(courseId);
    this.blockUI.start('Loading...'); 
    this._service.getAssignUser(this.regionId,courseId,null,null,null)
    .subscribe((res:any)=>{
      this.blockUI.stop();
      console.log(res)
      this.pplLists = res;
    },err =>{
      console.log(err);
    });
  }

  clickTab(type){
    this.activeTab = type;
    this.noStudent = 0;
    this.presentStudent = 0;
    this.absentStudent = 0;
    if(type == 'Class'){
      this.blockUI.start('Loading...'); 
      const today = new Date();
      this.todayDate = today.toISOString();
      var to_day = new Date(today).getUTCDate();
      var currentMonth =  new Date(today).getUTCMonth()+1;
      let lessonCount = this.detailLists.lessons;
      console.log(lessonCount)
      console.log(lessonCount.length)
      let finishedDate = [];
      let unfinishedDate = [];
      let xx = false;
      for(let i=0; i< lessonCount.length; i++){
        let strDate = lessonCount[i].startDate;
        let courseDate = new Date(strDate).getUTCDate();
        let courseMonth = new Date(strDate).getUTCMonth()+1;        

        if(courseMonth < currentMonth){
          console.log('less than current month')
          finishedDate.push(i)
        }else if(courseMonth == currentMonth){
          console.log('same with current month')
          if(courseDate > to_day){
            console.log('unfinished course => ', courseDate)
            unfinishedDate.push(i);
          }else if(courseDate == to_day){
            console.log('same with today ', courseDate)
            finishedDate.push(i)
            this.activeToday = true;
            this.todayIndex = i;
          }else{
            console.log('finished course => ', courseDate)
            finishedDate.push(i)
          }
        }else{
          console.log('grater than current month')
          unfinishedDate.push(i)
        }
      }
      console.log('finish', finishedDate.length)
      console.log('unfinish' , unfinishedDate.length)
      let lastActiveDate;
      

      if(finishedDate.length != 0){
        console.log('hello in if')
        if(this.activeToday == true){
          this.LASD = lessonCount[this.todayIndex].startDate
        }else{
          lastActiveDate = finishedDate.length -1;
          console.log(lastActiveDate)
          //LASD = lastActiceStartDate
          this.LASD = lessonCount[lastActiveDate].startDate
          console.log(this.LASD)
        }
      }else{
        console.log('hello in else')
        lastActiveDate = 0;
        this.LASD = lessonCount[0].startDate
      }
      

      
      // ACD = activeCourseDate/Month/Year
      let ACD = new Date(this.LASD).getUTCDate()
      let ACM = new Date(this.LASD).getUTCMonth() + 1;
      let ACY = new Date(this.LASD).getUTCFullYear()
      this._service.getAssignUser(this.regionId,this.currentCourse,ACD,ACM,ACY)
      .subscribe((res:any)=>{
        console.log(res)
        this.blockUI.stop();
        this.activeCourseInfo = res;
        for(let j=0; j < this.activeCourseInfo.CUSTOMER.length; j++){
          if(this.activeCourseInfo.CUSTOMER[j].attendance == true){
            this.presentStudent += 1;
          }else if(this.activeCourseInfo.CUSTOMER[j].attendance == false){
            this.absentStudent += 1;
          }else{
            this.noStudent += 1;
          }
        }

        $('.timeline').scrollLeft( 80*(lastActiveDate-1) ); 
      },err =>{
        this.blockUI.stop();
        console.log(err);
      });
    }else{
      this.noStudent = 0;
      this.presentStudent = 0;
      this.absentStudent = 0;
    }
  }

  openRemoveModal(id, deleteModal){
    this.getSingleUser(id, 'withdraw')
    this.deleteId = id;
    this.modalReference = this.modalService.open(deleteModal, { backdrop:'static', windowClass: 'deleteModal d-flex justify-content-center align-items-center'});
  }
  

  addUserModal(type, userModal, state, id){
    console.log('====', state)
    this.isvalidID = state;
    if(state != 'inside' || this.detailLists.seat_left == null){
      console.log('has courseID', id)
      this.isSeatAvailable = true;
      this.getCourseDetail(id);
    }else{
      console.log('no courseID', this.detailLists.seat_left)
      if(this.detailLists.seat_left == 0){
        this.isSeatAvailable = false;
      }else{
        this.isSeatAvailable = true;
      }
    }
    
    this.selectedUserLists = [];
    this.selectedUserId = [];
    this.modalReference = this.modalService.open(userModal, { backdrop:'static', windowClass: 'modal-xl d-flex justify-content-center align-items-center'});
    this.userType = type;
    console.log("detail seats left",this.detailLists.seat_left)
    console.log(this.selectedUserLists.length)
    
  }

  withdrawUser(id){
    let userobj = {
      'courseId': this.courseId,
      'userId': id
    }
    this._service.withdrawAssignUser(this.regionId,userobj, this.locationId)
    .subscribe((res:any) => {
      this.modalReference.close();
      console.log(res);
      this.toastr.success('User successfully withdrawled.');
      this.getUsersInCourse(this.courseId);
    },err =>{
      this.toastr.error('Withdrawal user failed.');
      this.modalReference.close();
      console.log(err);
    });
  }

  cancelModal(){
    this.modalReference.close();
    this.isSeatAvailable = true;
  }

  getAllUsers(type){
    this.blockUI.start('Loading...');    
    this._service.getAllUsers(this.regionId, type, 20 , 0)
    .subscribe((res:any) => {      
      this.userLists = res;
      console.log('this.userLists', this.userLists);      
      setTimeout(() => {
            this.blockUI.stop(); // Stop blocking
        }, 300);
      }, err => {
        console.log(err);
      })
  }

  selectUser(state, id){
    console.log(this.detailLists.seat_left)
    console.log(this.selectedUserLists.length)
    console.log('hihi ~~')
    this.getSingleUser(id, state);
    this.formData = {};
  }

  getSingleUser(ID, state){
    this._service.editProfile(this.regionId, ID)
    .subscribe((res:any) => {
      console.log(res);
      if(state == 'search'){
        this.isFous = false;
        this.selectedUserLists.push(res);
        console.log(this.detailLists.seat_left)
        console.log(this.selectedUserLists.length)

        if(this.detailLists.seat_left - this.selectedUserLists.length == 0){
          console.log('cant add')
          this.isSeatAvailable = false;
        }else{
          this.isSeatAvailable = true;
        }
      }else{
        this.removeUser = res.preferredName;
      }
    }, err => {  
      console.log(err);
    });
  }

  focusMethod(e, userType){
    console.log(e)
    console.log(userType)
    this.isFous = true;
    // this.userLists = [];
    this.getAllUsers(userType);
  }

  hideFocus(e){
    setTimeout(() => {
      this.isFous = false;
    }, 300);
    this.formData = {}
  }

  changeMethod(searchWord, userType){
    console.log(this.detailLists.locationId)
    console.log(searchWord)
    let locationId = this.detailLists.locationId;
    if(searchWord.length != 0){
        this._service.getSearchUser(this.regionId, searchWord, userType, 20, 0)
        .subscribe((res:any) => {
          console.log(res);
          this.userLists = res;
        }, err => {  
          console.log(err);
        });
    }else if(searchWord.length == 0){
      this.userLists = [];
      this.getAllUsers(userType);
    }
  }

  removeSelectedUser(id){
    let getIndex;
    for(let x in this.selectedUserLists){
      if(id == this.selectedUserLists[x].userId){
        getIndex = x;
      }
    }
    this.selectedUserLists.splice(getIndex,1);
    console.log(this.selectedUserLists);
    console.log(this.detailLists.seat_left - this.selectedUserLists.length == 0)
    console.log(this.detailLists.seat_left)
    if(this.detailLists.seat_left != null){
      if(this.detailLists.seat_left - this.selectedUserLists.length == 0){
        console.log('cant add')
        this.isSeatAvailable = false;
      }else{
        this.isSeatAvailable = true;
      }
    }
    
  }

  getSelectedUserId(){
    console.log(this.selectedUserLists)
    console.log(this.selectedUserId)
    let userId;
    for(let y in this.selectedUserLists){
      userId = this.selectedUserLists[y].userId;
      this.selectedUserId.push(userId)
    }
    console.log(this.selectedUserId)
    this.selectedUserId = this.selectedUserId.toString();
  }

  enrollUserToCourse(courseId, userType){
    console.log('call from enrolluser', this.isvalidID)
    // let type = userType;
    // type = (userType == 'staff') ? 'teacher' : 'customer'
    this.getSelectedUserId();   
    let body = {
       'courseId': courseId,
       'userId': this.selectedUserId,
       'userType': userType
     }
     console.log('~~~~' , body)
    this._service.assignUser(this.regionId,body, this.locationID)
      .subscribe((res:any) => {
         console.log(res);
         this.modalReference.close();
         if(this.isvalidID == 'inside'){
           console.log('hi')
           // this.cancel();
           this.getUsersInCourse(courseId);
         }else{
           console.log('else hi')
           this.cancel();
           // this.getUsersInCourse(courseId);
         }
           
         
      }, err => {  
        console.log(err);
      });
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
    this._service.getAllCoursePlan(this.regionId,this.locationID)
    .subscribe((res:any) => {
      console.log("course plan list",res)
    })
  }

  showMore(skip: any){
    console.log(skip)
    this.getCourseLists(20, skip);
  }

  getCourseLists(limit, skip){
    this.blockUI.start('Loading...'); 
    this._service.getAllCourse(this.regionId,this.locationID, limit, skip)
    .subscribe((res:any) => {
      console.log('Course List',res);
      this.result = res;
      console.log(this.result)
      console.log(this.result.length)
      this.courseList = this.courseList.concat(res);
      if(this.courseList.length > 0 ){
        this.emptyCourse = false;
        for (var i in this.courseList) {
          let duration = this.courseList[i].coursePlan.lesson.duration;
          // console.log(duration);
          for(var j in this.courseList[i].courses){
            let date = this.courseList[i].courses[j].startDate;
            let starttime = date.substring(date.search("T")+1,date.search("Z")-7);
            // console.log(date);
            // console.log('starttime',starttime);
            let piece = starttime.split(':');
            let mins = piece[0]*60 + +piece[1] + +duration;
            let endtime = this.D(mins%(24*60)/60 | 0) + ':' + this.D(mins%60);  
            // console.log('endtime',endtime)
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

  addNewCourse(plan){
    localStorage.removeItem('courseID');
    localStorage.removeItem('tempObj');
    this.goBackCat = false;
    this.isCourseCreate = true;
    console.log("CPlanId",plan);
    // this.router.navigate(['/courseCreate']);
    let planObj={
      "name": plan.name,
      "id": plan.coursePlanId,
      "duration": plan.lesson.duration,
      "paymentPolicy": plan.paymentPolicy
    };
    localStorage.setItem('cPlan',JSON.stringify(planObj));
    localStorage.removeItem('courseID');
  }
}
