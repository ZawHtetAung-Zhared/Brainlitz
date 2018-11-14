import { Component, OnInit, ViewContainerRef, HostListener, Inject, AfterViewInit } from '@angular/core';
import { appService } from '../../service/app.service';
import { DataService } from '../../service/data.service';
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons, NgbDatepickerConfig, NgbCalendar, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastsManager } from 'ng5-toastr/ng5-toastr';
import { DOCUMENT } from "@angular/platform-browser";
import * as moment from 'moment-timezone';
import {DatePipe} from '@angular/common';
declare var $:any;

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  providers: [NgbDatepickerConfig]
})
export class CourseComponent implements OnInit {
  courseList: Array<any> = [];
  code:any ;
  public isvalidID:any = '';
  public categoryList:any;
  public planList:any;
  public courseVal:any = {};
  public recentLists: Array<any> = [];
  public tempCategory: Array<any> = [];
  public tempPlan: Array<any> = [];  
  public startTime:boolean = false;
  public endTime:boolean = false;  
  public isChecked:boolean = false;  
  public timeFrame:Array<any> = ['AM','PM'];
  public days = [
    {"day":"Sun", "val": 0, 'checked': true},
    {"day":"Mon", "val": 1, 'checked': true},
    {"day":"Tue", "val": 2, 'checked': true},
    {"day":"Wed", "val": 3, 'checked': true},
    {"day":"Thu", "val": 4, 'checked': true},
    {"day":"Fri ", "val": 5, 'checked': true},
    {"day":"Sat", "val": 6, 'checked': true},
  ];
  public iswordcount:boolean = false;
  public iscourseSearch:boolean = false;
  public categorySearch:boolean = false;
  public planSearch:boolean = false;
  public isAdvancedSearch:boolean = false;
  public isSeatAvailable:boolean = true;
  emptyCourse:boolean = false;
  activeToday:boolean = false;
  todayIndex:any = '';
  isCourseCreate:boolean = false;
  isCategory:boolean = false;
  isPlan:boolean = false;
  isFous:boolean = false;
  isCourseDetail:boolean = false;
  isCoursePlanDetail:boolean = false;
  singlePlanData:any = {};
  public formData:any = {};
  public userLists:any = [];
  public detailLists:any = {};
  public activeCourseInfo:any = {};
  public LASD:any; //lastActiceStartDate
  public presentStudent:number = 0;
  public absentStudent:number = 0;
  public noStudent:number = 0;
  public selectedUserLists:any = [];
  public selectedUserId:any = [];
  public todayDate:any;
  public locationName:any;
  public courseId:any;
  public locationId:any;
  public userType:any;
  public deleteId:any = {};
  public modalReference: any;
  public regionId = localStorage.getItem('regionId');
  public locationID = localStorage.getItem('locationId');
  public pplLists:any;
  public apgLists:any;
  public removeUser:any;
  public currentCourse:any;
  public activeTab:any = '';
  public result:any;
  isSticky:boolean = false;
  showBtn:boolean = false;
  @BlockUI() blockUI: NgBlockUI;
  public goBackCat: boolean = false;
  public permissionType: any;
  public coursePermission:any = [];
  public courseDemo:any = [];
  public editplanId:any;
  public planCategory:any;
  showList:boolean = false;
  
  public draft:boolean;
  public selectedCustomer:any = {};
  public showInvoice:boolean = false;
  public logo:any = localStorage.getItem("OrgLogo");
  public showBox:boolean = false;
  public discount:number;
  public value;
  public showMailPopup:boolean = false;
  public invoiceInfo:any;
  public invoice:any;
  public updatedDate;
  public dueDate;
  public subTotal;
  public totalTax;
  public invoiceID;
  public showPayment:boolean = false;
  public selectedPayment:any;
  public paymentItem = {};

  constructor( @Inject(DOCUMENT) private doc: Document, private router: Router, private _service: appService, public dataservice: DataService, private modalService: NgbModal, public toastr: ToastsManager, public vcr: ViewContainerRef,config: NgbDatepickerConfig, calendar: NgbCalendar ) {
    this.toastr.setRootViewContainerRef(vcr);
    this._service.goback.subscribe(() => {   
      console.log('goooo') 
      this.courseList = []
      this.isCategory = false;
      window.scroll(0,0);
    });

    this._service.goCourseCreate.subscribe(() => {   
      console.log('go to cc') 
      this.courseList = []
      this.isCategory = false;
      this.isPlan = false;
      this.goBackCat = false;
      this.isCourseCreate = true;
      window.scroll(0,0);
    });
   
    this._service.goplan.subscribe(() => {
     console.log('muuuu')
     this.courseList = []
     this.isCategory = false;
      this.isPlan = true;
      this.goBackCat = true;
    })

    this._service.goCat.subscribe(() => {   
      console.log('goback22', this.goBackCat) 
      this.goBackCat = false;
      this.isCategory = true;
      this.isPlan = false;
      this.courseList = []
    });

    this._service.goCourse.subscribe(() => {   
      console.log('goback33') 
      this.isCategory = false;
      this.isPlan = false;
      this.goBackCat = false;
      this.isCourseCreate = false;
      this.courseList = []
      console.log(this.courseList.length)
    });
  }

  ngOnInit() {
    let recentTemp = localStorage.getItem('recentSearchLists')
    // this.recentLists = localStorage.getItem('recentSearchLists')
    // console.log(this.recentLists)
    this.recentLists = (recentTemp == null) ? [] : JSON.parse(recentTemp);
    localStorage.removeItem('categoryID');
    localStorage.removeItem('categoryName');
    setTimeout(() => {
      console.log('~~~', this.locationName)  
      this.locationName = localStorage.getItem('locationName');
      }, 300);
    this.activeTab = 'People';

    this._service.permissionList.subscribe((data) => {
      if(this.router.url === '/course'){
        this.permissionType = data;
        this.checkPermission();
      }
    });

    this.discount = 0;

  }


  checkPermission(){
    console.log(this.permissionType)
    this.coursePermission = ["CREATECOURSE","VIEWCOURSE","EDITCOURSE","DELETECOURSE","ASSIGNTEACHER","ASSIGNSTUDENTS","CREATECOURSEPLAN","VIEWCOURSEPLAN","EDITCOURSEPLAN"];    
    this.coursePermission = this.coursePermission.filter(value => -1 !== this.permissionType.indexOf(value));
    console.log(this.coursePermission.includes('VIEWCOURSE'))
    
    
    this.courseDemo['addCourse'] = (this.coursePermission.includes("CREATECOURSE")) ? 'CREATECOURSE' : '';
    this.courseDemo['viewCourse'] = (this.coursePermission.includes("VIEWCOURSE")) ? 'VIEWCOURSE' : '';
    this.courseDemo['editCourse'] = (this.coursePermission.includes("EDITCOURSE")) ? 'EDITCOURSE' : '';
    this.courseDemo['deleteCourse'] = (this.coursePermission.includes("DELETECOURSE")) ? 'DELETECOURSE' : '';
    this.courseDemo['assignTeacher'] = (this.coursePermission.includes("ASSIGNTEACHER")) ? 'ASSIGNTEACHER' : '';
    this.courseDemo['assignStudent'] = (this.coursePermission.includes("ASSIGNSTUDENTS")) ? 'ASSIGNSTUDENTS' : '';    
    this.courseDemo['createCP'] = (this.coursePermission.includes("CREATECOURSEPLAN")) ? 'CREATECOURSEPLAN' : '';
    this.courseDemo['viewCP'] = (this.coursePermission.includes("VIEWCOURSEPLAN")) ? 'VIEWCOURSEPLAN' : '';
    this.courseDemo['editCP'] = (this.coursePermission.includes("EDITCOURSEPLAN")) ? 'EDITCOURSEPLAN' : '';
    

    if(this.coursePermission.includes('VIEWCOURSE') != false){      
      console.log('hi permission')
      this.locationName = localStorage.getItem('locationName');
      this.getCPlanList();
      this.getCourseLists(20, 0);
    }else{
        console.log('permission deny')
        this.courseList = [];
      }
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
      this.isSticky = true;
      this.showBtn = true
    }else{
      this.isSticky = false;
      this.showBtn = false;
    }
  }

  //start course search

  focusCourseSearch(){
    this.iscourseSearch = true;    
  }

  hideCourseSearch(){
    console.log(this.iswordcount)
    // this.iswordcount = true;
    if(this.iswordcount != true){
      this.iscourseSearch = false;
    }
    this.isAdvancedSearch = false;
  }

  cancelAS(){
    console.log('close')
    this.isAdvancedSearch = false;
    this.clearSearch();
  }

  clearSearch(){
    console.log('clear')
    this.courseVal = {};
    this.iswordcount = false;
    this.iscourseSearch = false;  
    this.courseList = [];
    this.getCourseLists(20, 0);
  }

  getAllCategories(limit, skip){
    this.blockUI.start('Loading...');
    this._service.getCategory(this.regionId, limit, skip)
    .subscribe((res:any) => {
      setTimeout(() => {
        this.blockUI.stop(); // Stop blocking
      }, 300);
      this.categoryList = res;
      console.log(res);
    })
  }

  showDropBoxData(state){
    this.categorySearch = (state == 'category') ? !this.categorySearch : false;
    this.planSearch = (state == 'plan') ? !this.planSearch : false;
  }

  searchCourse(val){
    // this.courseVal = val
    if(val.length > 0){
      this.iswordcount = true;
    }else{
      this.iswordcount = false;
    }
  }

  selectedList(obj, state){
    let temp = {
      'name': obj.name,
      'id': obj._id
    }
    if(state == 'plan'){
      this.tempPlan.push(temp)
    }else{
      this.tempCategory.push(temp)
    }
    console.log(this.tempCategory)
    console.log(this.tempPlan)
  }

  removeTempData(id, state){
    console.log('remove list ..', id)
    let dataIndex;
    if(state == 'category'){
      for(let x in this.tempCategory){
        if(this.tempCategory[x].id == id){
          dataIndex = x;
        }
      }
      this.tempCategory.splice(dataIndex,1);
      console.log(this.tempCategory);
    }else if(state == 'plan'){
      for(let x in this.tempPlan){
        if(this.tempPlan[x].id == id){
          dataIndex = x;
        }
      }
      this.tempPlan.splice(dataIndex,1);
      console.log(this.tempPlan);
    }else{
      for(let x in this.days){
        if(this.days[x].val == id){
          this.days[x].checked = !this.days[x].checked;
        }
      }
      // this.days.splice(dataIndex,1);
      console.log(this.days);
    }

    
  }

  setMinDate(event){
    console.log("setMinDate",event);
    this.minDate = event;
    this.showText = false;
  }

  setMaxDate(date){
    console.log("setMaxDate",date);
    this.maxDate =  date;
  }

  closeFix(event, datePicker) {
    var parentWrap = event.path.filter(function(res){
      return res.className == "xxx-start col-md-6 pl-zero"
    })
    console.log('~~~ ', parentWrap.length)
    if(parentWrap.length == 0){
      console.log('blank')
      datePicker.close();
    }
    
    // if(event.target.id == "dpStart" || event.target.nodeName == 'SELECT' || event.target.className =='ngb-dp-navigation-chevron' || event.target.nodeName == 'ngb-datepicker-navigation'){
    //       console.log('in the if')
    //       datePicker.open();
    // }else if(event.target.id != "dpStart"){
    //   console.log('in the else if')
    //   datePicker.close();
    // }
  }

  closeFixEnd(event, endPicker){
    var parentWrap = event.path.filter(function(res){
      return res.className == "xxx-end col-md-6"
    })
    console.log('~~~ ', parentWrap.length)
    if(parentWrap.length == 0){
      console.log('blank')
      endPicker.close();
    }
  }

  currentMonth(event){
    console.log(event.next.month) 
    let vim = event;
    if(vim.next.month == 12){
      console.log(vim.next.month)
      $('.datepicker-wrap').addClass('hideRight');
    }else{
      $('.datepicker-wrap').removeClass('hideRight');
    }
    if(vim.next.month == 1){
      console.log(vim.next.month)
      $('.datepicker-wrap').addClass('hideLeft');
    }else{
      $('.datepicker-wrap').removeClass('hideLeft');
    }
  }

  resetAS(){
    this.tempCategory = []
    this.tempPlan = []
    this.courseVal = {}
    this.days = [
      {"day":"Sun", "val": 0, 'checked': true},
      {"day":"Mon", "val": 1, 'checked': true},
      {"day":"Tue", "val": 2, 'checked': true},
      {"day":"Wed", "val": 3, 'checked': true},
      {"day":"Thu", "val": 4, 'checked': true},
      {"day":"Fri ", "val": 5, 'checked': true},
      {"day":"Sat", "val": 6, 'checked': true},
    ];
  }

  chooseMoment(obj){
    this.isChecked = obj;
  }

  startTimeConfigure(state){
    this.startTime = (state == 'start') ? true : false;
    this.endTime = (state == 'end') ? true : false;
  }

  ChangedTimeValue(obj, state){
    
  }

  searchStart(e){
    if(e.keyCode == 13){
      this.recentLists.unshift(e.target.value)
      this.blockUI.start('Loading...');    
      this._service.simpleCourseSearch(this.regionId, e.target.value ,this.locationID)
      .subscribe((res:any)=>{
          this.blockUI.stop();
          console.log(res)
          this.courseList = res;
          this.iscourseSearch = false;
        },err =>{
          console.log(err);
      });

      if(this.recentLists.length > 3){
        console.log('if', this.recentLists)
        this.recentLists = this.recentLists.slice(0, 3);
      }else{
        console.log('else')
      }
      localStorage.setItem('recentSearchLists', JSON.stringify(this.recentLists));      
    }
  }

  showAdvancedSearch(){
    this.isAdvancedSearch = true;
    this.getAllCategories(20, 0);
  }

  //end course search

  // start course detail

  cancel(){
    this.isCourseDetail = false;
    this.isCoursePlanDetail = false;
    this.courseList = [];
    this.getCourseLists(20,0);
    this.activeTab = 'People';
  }

  showCourseDetail(courseId){
    console.log('~~~~~')
    this.currentCourse = courseId;
    this.isCourseDetail = true;
    this.getCourseDetail(courseId);
    this.getUsersInCourse(courseId);
    console.log(this.detailLists.seat_left);
  }

  showCPDetail(planID){
    this.editplanId = planID;
    console.log('hi', planID)
    this.isCoursePlanDetail = true;
    this.getCoursePlanDetail(planID)
  }

  getCoursePlanDetail(planID){
    this.blockUI.start('Loading...'); 
    this._service.getSinglePlan(planID, this.locationID)
    .subscribe((res:any)=>{
      this.blockUI.stop();
      this.singlePlanData = res;
      this.planCategory = this.singlePlanData.category;
    },err =>{
      console.log(err);
    });
  }

  goToCoursePlan(planId){
    localStorage.setItem("editCPId",planId);
    localStorage.setItem("cpCategory",JSON.stringify(this.planCategory));
    this.isCoursePlanDetail = false;
    this.isCategory = true;
    this.goBackCat = false;
    // console.log('go to cp', this.singlePlanData)
    // this.isCoursePlanDetail = false;
    // this.isCategory = true;
    // this._service.dataParsing(this.singlePlanData);
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
      // console.log("Draft",this.draft)
      // console.log(res.locationId)
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
    // this.getCourseDetail(courseId);
    this.courseId = courseId
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
    }else if(type == 'APG'){
      this._service.getAssessment(this.regionId,this.currentCourse,true)
      .subscribe((res:any)=>{
        console.log(res)
        this.apgLists = res;
      },err =>{
        this.blockUI.stop();
        console.log(err);
      });
      this.noStudent = 0;
      this.presentStudent = 0;
      this.absentStudent = 0;
    }else{
      this.noStudent = 0;
      this.presentStudent = 0;
      this.absentStudent = 0;
    }
  }

  checkAttendance(targetDate){
    console.log('hi', targetDate)
    this.presentStudent = 0;
    this.absentStudent = 0;
    this.noStudent = 0;
    let ACD = new Date(targetDate).getUTCDate()
    let ACM = new Date(targetDate).getUTCMonth() + 1;
    let ACY = new Date(targetDate).getUTCFullYear()
    this._service.getAssignUser(this.regionId,this.currentCourse,ACD,ACM,ACY)
    .subscribe((res:any)=>{
      this.presentStudent = 0;
      this.absentStudent = 0;
      this.noStudent = 0;
      console.log(res)
      this.blockUI.stop();
      this.activeCourseInfo = res;
      console.log(this.noStudent)
      for(let j=0; j < this.activeCourseInfo.CUSTOMER.length; j++){
        if(this.activeCourseInfo.CUSTOMER[j].attendance == true){
          this.presentStudent += 1;
        }else if(this.activeCourseInfo.CUSTOMER[j].attendance == false){
          this.absentStudent += 1;
        }else{

          this.noStudent += 1;
        }
      }

    },err =>{
      this.blockUI.stop();
      console.log(err);
    });
  }

  openRemoveModal(id, deleteModal){
    this.getSingleUser(id, 'withdraw')
    this.deleteId = id;
    this.modalReference = this.modalService.open(deleteModal, { backdrop:'static', windowClass: 'deleteModal d-flex justify-content-center align-items-center'});
  }
  

  addUserModal(type, userModal, state, id){
    console.log('====', state)
    
    this.isvalidID = state;
    if(state != 'inside'){
       console.log("state",state)
      console.log('has courseID', id)
      this.isSeatAvailable = true;
      this.getCourseDetail(id);
      this.getUsersInCourse(id);
    }else if(this.detailLists.seat_left == null){
      console.log("detailLists.seat_left",this.detailLists.seat_left)
      console.log('has courseID', id)
      this.isSeatAvailable = true;
      // this.getCourseDetail(id);
    }else{
      console.log("state",state)
      console.log('no courseID', this.detailLists.seat_left)
      if(this.detailLists.seat_left == 0){
        this.isSeatAvailable = false;
      }else{
        this.isSeatAvailable = true;
      }
    }

    // if(state == 'outside'){
    //   console.log("outside");
    //   this.getUsersInCourse(id);
    // }
    
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
      this.getCourseDetail(this.courseId)
    },err =>{
      this.toastr.error('Withdrawal user failed.');
      this.modalReference.close();
      console.log(err);
    });
  }

  cancelModal(){
    this.modalReference.close();
    // this.isSeatAvailable = true;
    this.showList = false;
    this.selectedCustomer = {};
    this.showInvoice = false;
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

  selectUser(state, id, type){
    console.log(this.detailLists.seat_left)
    console.log(this.selectedUserLists.length)
    console.log('hihi ~~')
    this.getSingleUser(id, state);
    this.formData = {};
  }

  selectCustomer(state, id, type){
    this.getSingleCustomer(id, state);
    this.formData = {};
  }

  getSingleUser(ID, state){
    this._service.editProfile(this.regionId, ID)
    .subscribe((res:any) => {
      console.log(res);
      if(state == 'search'){
        this.isFous = false;
        this.showList = false;
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

  getSingleCustomer(ID, state){
    console.log("this.selectedCustomer",this.selectedCustomer)
    this._service.editProfile(this.regionId, ID)
    .subscribe((res:any) => {
      console.log('selected Customer',res);
      this.selectedCustomer = res;
      this.showList = false;
    })
  }

  focusMethod(e, userType){
    console.log(e)
    console.log(userType)
    this.isFous = true;
    this.userLists = [];
    // this.getAllUsers(userType);
  }

  hideFocus(e){
    setTimeout(() => {
      this.isFous = false;
      this.showList = false;
    }, 300);
    this.formData = {}
  }

  changeMethod(searchWord, userType){
    console.log(this.detailLists.locationId)
    console.log(searchWord)
    console.log(this.courseId)
    let locationId = this.detailLists.locationId;
    if(searchWord.length != 0){
        this.showList = true;
        this._service.getSearchUser(this.regionId, searchWord, userType, 20, 0, this.courseId)
        .subscribe((res:any) => {
          console.log(res);
          this.userLists = res;
        }, err => {  
          console.log(err);
        });

        // var selectedIdArr=[];
        // var pplListArr = [];
        // var pplArr = [];
        
        // switch(userType){
        //   case 'customer':
        //     pplArr = this.pplLists.CUSTOMER;
        //     console.log("customer pplArr",pplArr)
        //     break;
        //   case 'staff':
        //     // pplArr = this.pplLists.TEACHER;
        //     for(var i in this.pplLists.TEACHER){
        //       let ppl = this.pplLists.TEACHER[i];
        //       pplArr.push(ppl);
        //     }
        //     for(var j in this.pplLists.STAFF){
        //       let ppl = this.pplLists.STAFF[j];
        //       pplArr.push(ppl);
        //     }
        //     console.log("staff pplArr",pplArr)
        // }

        //   if(pplArr.length > 0){
        //       console.log("to send userIds PPLs");
        //       for(let y in pplArr){
        //         let id = pplArr[y].userId;
        //         pplListArr.push(id)
        //       }

        //       if(this.selectedUserLists.length>0){
        //         for(var i in this.selectedUserLists){
        //           let id = this.selectedUserLists[i].userId;
        //           pplListArr.push(id);
        //         }
        //       }
        //       // console.log('Testing json',JSON.stringify(this.selectedCustomer))
        //       if(JSON.stringify(this.selectedCustomer) != "{}"){
        //         console.log("has selected customer",this.selectedCustomer.userId);
        //         let id = this.selectedCustomer.userId;
        //         pplListArr.push(id);
        //       }else{
        //         console.log("no selected customer")
        //       }

        //       console.log('pplListArr',pplListArr)
        //       var pplListStr = pplListArr.toString();
        //       console.log("pplListsStr",pplListStr);
              
        //       this._service.getSearchUser(this.regionId, searchWord, userType, 20, 0, pplListStr)
        //       .subscribe((res:any) => {
        //         console.log(res);
        //         this.userLists = res;
        //       }, err => {  
        //         console.log(err);
        //       });
        //   }else{
        //     console.log("not send");
        //     this._service.getSearchUser(this.regionId, searchWord, userType, 20, 0, '')
        //     .subscribe((res:any) => {
        //       console.log(res);
        //       this.userLists = res;
        //     }, err => {  
        //       console.log(err);
        //     });
        //   }
    }else if(searchWord.length == 0){
      this.userLists = [];
      this.showList = false;
      // this.getAllUsers(userType);
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
           this.getCourseDetail(courseId)
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

  addCustomer(courseId, userType){
    
    console.log("call from addCustomer",this.selectedCustomer);
    let body = {
       'courseId': courseId,
       'userId': this.selectedCustomer.userId,
       'userType': userType
     }
     console.log("body",body);
     this._service.assignUser(this.regionId,body, this.locationID)
     .subscribe((res:any) => {
       console.log("res Assign customer",res);
       this.invoiceInfo = res.invoiceInfo;
       this.invoice = res.invoice;
       this.showInvoice = true; 
       for(var i in this.invoice){
         this.updatedDate = this.dateFormat(this.invoice[i].updatedDate);
         this.dueDate = this.dateFormat(this.invoice[i].dueDate);
         this.totalTax = this.invoice[i].taxOnCourseFee + this.invoice[i].taxOnRegistrationFee;
         console.log("total tax",this.totalTax);
         this.subTotal = this.invoice[i].total - this.totalTax;
         console.log("unit Price",this.subTotal);
         this.invoiceID = this.invoice[i]._id;
         if(this.invoice[i].deposit>0){
           this.subTotal = this.subTotal - this.invoice[i].deposit;
         }
       }
       
     }, err => {  
        console.log(err);
      })
    // this.showInvoice = true; 

  }

  dateFormat(dateStr){
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ]; 
     var d = new Date(dateStr);
     var month = monthNames[d.getUTCMonth()];
     var year = d.getUTCFullYear();
     var date = d.getUTCDate();
     console.log(date,month,year)
     var dFormat = date + ' ' + month + ' ' + year;
     console.log("DD MM YYYY",dFormat);
     return dFormat;
  }

  // end course detail
  changeRoute(){
    this.isCategory = true;
    this.goBackCat = false;
    localStorage.removeItem("cpCategory");
    localStorage.removeItem("editCPId");
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
    console.log(this.locationID)
    console.log('----', localStorage.getItem('locationId'))
    this._service.getAllCoursePlan(this.regionId,localStorage.getItem('locationId'))
    .subscribe((res:any) => {
      this.planList = res;
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
      console.log(this.courseList)
      this.courseList = this.courseList.concat(res);
      console.log(this.courseList)
      console.log(this.courseList.length)
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

  showPopup(){
    console.log("show popup");
    this.showBox = true;
  }

  cancelPopup(){
    console.log("hide popup")
    this.showBox = false;
  }

  addDiscount(data){
    console.log("Discount",data);
    this.discount = data;
    this.showBox = false;
  }

  showAssociatePopup(){
    this.showMailPopup = true;
  }

  sendInvoice(){
    console.log("send Invoice",this.invoiceID);
    var mailArr = [];
    mailArr.push(this.selectedCustomer.email);
    for(var i in this.selectedCustomer.guardianEmail){
      mailArr.push(this.selectedCustomer.guardianEmail[i]);
    }
    console.log("mailArr",mailArr);
    let body = {
      "associatedMails": mailArr
    }
    console.log("body",body);
    this._service.invoiceOption(this.regionId, this.invoiceID, body, 'send')
    .subscribe((res:any) => {
      console.log(res);
      this.toastr.success("Successfully sent the Invoice.");
      // this.modalReference.close();
      this.getCourseDetail(this.detailLists._id)
      this.getUsersInCourse(this.detailLists._id);
      this.cancelModal();
    }, err => {  
      console.log(err);
      this.toastr.error('Fail to sent the Invoice.');
    })
  }

  showPayOption(){
    console.log("pay option");
    this.showPayment = true;
    this.showInvoice = false;
  }

  choosePayment(type){
    console.log("choosePayment",type);
    this.selectedPayment = type;
  }

}
