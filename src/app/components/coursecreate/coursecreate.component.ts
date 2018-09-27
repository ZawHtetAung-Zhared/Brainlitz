import { Component, OnInit, ViewChild,Input,Output,EventEmitter, ViewContainerRef, ElementRef, Inject, HostListener, AfterViewInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { DOCUMENT } from "@angular/platform-browser";
import { NgbModal, ModalDismissReasons, NgbModalRef, NgbDateStruct, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import {NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import { appService } from '../../service/app.service';
import { DataService } from '../../service/data.service';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastsManager } from 'ng5-toastr/ng5-toastr';
import * as moment from 'moment';

declare var $:any;

@Component({
  selector: 'app-coursecreate',
  templateUrl: './coursecreate.component.html',
  styleUrls: ['./coursecreate.component.css']
})
export class CoursecreateComponent implements OnInit {
  public regionID = localStorage.getItem('regionId');
  public currentLocation = localStorage.getItem('locationId');
  public coursePlan = JSON.parse(localStorage.getItem('cPlan'));
  public courseID = localStorage.getItem('courseID');
  @BlockUI() blockUI: NgBlockUI;
  public addCheck: boolean = false;
  public isthereLC: boolean = false;
  public isSkipId: any;
  public isIgnoreId: any;
  hello = JSON.parse(localStorage.getItem('splan')) ;
  public courseObj = {};
  wordLength:any;
  model:any = {};
  isChecked:any;
  minDate: any;
  maxDate: any;
  public days = [
    {"day":"Sun", "val": 0},
    {"day":"Mon", "val": 1},
    {"day":"Tue", "val": 2},
    {"day":"Wed", "val": 3},
    {"day":"Thu", "val": 4},
    {"day":"Fri ", "val": 5},
    {"day":"Sat", "val": 6},
  ];
  public tempID = [];
  public selectedDay = [];
  public toggleBool:boolean = true;
  public progressSlider: boolean = false;
  public focusCfee: boolean = false;
  public focusMisfee: boolean = false;
  public selectedHrRange: any;
  public selectedMinRange: any;
  public overDurationHr: boolean = false;
  public startFormat: any;
  public timeInminutes: any;
  public rangeMin: any;
  public rangeHr: any;
  public isSelected: any;
  public showFormat:any;
  public testChar:boolean;
  public testList = [];
  public durationMenuShow: boolean = false;
  public locationMenuShow: boolean = false;
  public searchMenuShow: boolean = false;
  public startTime: any;
  public classend:any;
  public locationList = [];
  public locationId:any;
  public isFocus:boolean = false;
  public isDpFocus:boolean = false;
  public detailLists:any;
  public userLists:any;
  public selectedTeacher:any = '';
  public isSticky:boolean = false;
  public isShowDetail:boolean = false;
  public save:boolean = false;
  public conflitCourseId :any = "";
  public skipArr = [];
  public ignoreArr = [];
  public tempArr = [];
  public conflitArr = [];
  public endAgain:boolean = false;
  public planId:any;
  public planName:any;
  public planDuration:any;
  public pplLists = [];
  
  @ViewChild("myInput") inputEl: ElementRef;

  constructor( @Inject(DOCUMENT) private doc: Document,private modalService: NgbModal, private _service: appService, public dataservice: DataService, private router: Router, private config: NgbDatepickerConfig, public toastr: ToastsManager, vcr: ViewContainerRef, private _eref: ElementRef) {
    this.toastr.setRootViewContainerRef(vcr);
   }
   test;
  ngOnInit() { 
    console.log("CPLan",this.coursePlan)
    console.log("CourseID",this.courseID);
    // this.isChecked = 'end';
    this.isSelected = 'AM';
    this.rangeHr = '0';
    this.rangeMin = '0';
    this.showFormat = "00:00";
    // this.createList();
    // this.getAllLocations();
    window.scroll(0,0);
    // this.goBackCat = true;
    if(this.courseID){
      console.log("Draft True",this.courseID);
      this.showDraftCourse(this.courseID);
    }else if(this.coursePlan){
      console.log("course Create");
      this.isChecked = 'end';
      this.getAllLocations();
      this.model = [];
      this.planId = this.coursePlan.id;
      this.planName = this.coursePlan.name;
      this.model.duration = this.coursePlan.duration;
      this.createList(this.model.duration);
    }
    
  }

  showDraftCourse(cId){
    console.log("Function Works");
    this.getAllLocations();
    this._service.getSingleCourse(cId)
    .subscribe((res:any) => {
      console.log("Course Detail",res);
      this.model = res;
      this.model.start = this.changeDateStrtoObj(this.model.startDate,"start");
      // console.log(this.model.start);
      this.model.end = this.changeDateStrtoObj(this.model.endDate,"end");
      // console.log(this.model.end);
      this.model.starttime = this.model.startDate.substr(this.model.startDate.search("T")+1,5)
      console.log(this.model.starttime);
      this.model.location = this.model.location.name;
      this.locationId = this.model.locationId;
      console.log("this location",this.locationId);
      this.selectedDay = this.model.repeatDays;
      this.planId = this.model.coursePlan.coursePlanId;
      this.planName = this.model.coursePlan.name;
      console.log("plan in draft",this.planName)
      this.model.duration = this.model.coursePlan.lesson.duration;
      this.createList(this.model.duration);
      this.model.durationTimes = this.model.durationTimes;
      // // this.getUsersInCourse(this.courseID);
      this.selectedTeacher = this.model.teacher;
      // // this.selectedUserLists.push(this.model.assistants);
      var assiatantsArr = this.model.assistants;
      for(var i in assiatantsArr){
        console.log("Assistant",assiatantsArr[i]);
        this.selectedUserLists.push(assiatantsArr[i]);
        this.selectedAssistants.push(assiatantsArr[i].userId);
      }
      if(this.model.end){
        this.isChecked = 'end';
      }else if(this.model.lessonCount){
        this.isChecked = 'lesson';
      }
      // setTimeout(() => {
      //    this.createCourse();
      //  }, 300);
      this.save = true;
      this.addCheck = true;
      this.conflitCourseId = res._id;
      this.createCourse('withDraf');
    });
  }

  
  // getUsersInCourse(courseId){
  //   console.log('hi call course', courseId)
  //   this._service.getAssignUser(this.regionID,courseId)
  //   .subscribe((res:any)=>{
  //     this.blockUI.stop();
  //     console.log('Users',res)
  //     this.pplLists = res;
  //   },err =>{
  //     console.log(err);
  //   });
  // }

  changeDateStrtoObj(datestr,type){
    if(type == "start"){
      console.log(datestr)
      let test = datestr.substring(0, datestr.search("T"));
      let testSplit = test.split("-");
      let format = {year: Number(testSplit[0]), month: Number(testSplit[1]), day: Number(testSplit[2])};
      return format;
    }else if(type == "end"){ 
      if(datestr){
        console.log(datestr)
        let test = datestr.substring(0, datestr.search("T"));
        let testSplit = test.split("-");
        let format = {year: Number(testSplit[0]), month: Number(testSplit[1]), day: Number(testSplit[2])};
        return format;
      }else if(datestr == null){
        return null;
      }
    }
    
  }

  @HostListener("window:scroll", [])
  scrollHandler() {
    let num = this.doc.documentElement.scrollTop;
    if(num>20){
       this.doc.getElementById("navbar").style.top = "0";
    }else{
      this.doc.getElementById("navbar").style.top = "-120px";
    }
  }

  getAllLocations(){
    this._service.getLocations(this.regionID, 20, 0, false)
    .subscribe((res:any)=>{
      console.log("Locations",res);
      this.locationList = res;
    })
  }



  createList(duration){
    console.log(duration);
    for(var i = 0; i <= 9; i++){
    var testVar = duration * (i+1);
      // console.log("testVar",testVar);
      this.testList.push(testVar);
    }
    console.log("testList",this.testList);
    // this.model.duration = this.testList[0];
    console.log("Duration Times",this.model.duration)
  }

  focusMethod(e){
    console.log('hi', e)
    $('.limit-wordcount').show('slow'); 
  }
    
  blurMethod(e){
    console.log('blur', e);
    $('.limit-wordcount').hide('slow'); 
  }

  changeMethod(val : string){
    console.log(val)
    this.wordLength = val.length;
  }

  backToCourses(state){
    console.log('backtocourse')
    // this.router.navigate(['/course']);
    this._service.backCourse();
    localStorage.removeItem('cPlan');
    localStorage.removeItem('courseID');
  }

  // back(){
  //   this.goBackCat = false;
  //   this.backToCourses();
  // }

  // continueStep(type, data){
  //   if(type == 'step1'){
  //     this.step1FormaData = data;
  //     console.log(this.step1FormaData)
  //     this.step1 = false;
  //     if(this.step1 == false){
  //       $("#step1").removeClass('active');
  //       $("#step1").addClass('done');
  //       $("#step2").addClass('active');
  //       this.step2 = true;
  //     }
  //   }
  // }

  // backStep(step){
  //   console.log(step);
  //   if(step == 'step2'){
  //     this.step2 = false;
  //     this.step1 = true;
  //     if(this.step1 == true){
  //       $("#step2").removeClass('active');
  //       $("#step2").addClass('done');
  //       $("#step1").addClass('active');
  //     }
  //   }
  // }

  lCount(val){
    console.log(val)
    this.isthereLC = (val == '') ? false : true;
    console.log(this.isthereLC)
  }

  chooseEndOpt(type){
    this.model.lessonCount = ''
    console.log("Type",type);
    this.isChecked = type;
      if(type == 'end'){
        this.model.end = "";
        // this.isthereLC = '';
      }else{
        console.log(this.model.lessonCount)
        this.model.lessonCount = "";
        
        // this.maxDate = "";
      }
  }

  setMinDate(event){
    console.log("setMinDate",event);
    this.minDate = event;
  }

  setMaxDate(date){
    console.log("setMaxDate",date);
    this.maxDate =  date;
  }
  clickInit:boolean = false;
  selectDay(data, event): void {
    this.clickInit = true;
    console.log("Day",data,event);
    var dayIdx = this.selectedDay.indexOf(data);
    console.log(dayIdx);
    if (event.target.checked) {
        if(dayIdx < 0 )
          this.selectedDay.push(data);
          this.toggleBool= false;
    } else {
        if(dayIdx >= 0 )
        this.selectedDay.splice(dayIdx,1);
        if(this.selectedDay.length>0){
          this.toggleBool= false;
        }else{
          this.toggleBool= true;
        }
    }
    this.selectedDay.sort();
    console.log(this.selectedDay);
  }

  durationProgress($event){
    this.progressSlider = true;
  }

  @HostListener('document:click', ['$event'])
    public documentClick(event): void {

        if(this.progressSlider != true){
           $('.bg-box').css({ 'display': "none" });   
        }
        else {
            $('.bg-box').css({ 'display': "block" }); 
            $('.bg-box').click(function(event){
                event.stopPropagation();
            });
            this.progressSlider = false;

        }

        if(this.focusCfee == true){
          $('.cfee-bg').addClass("focus-bg");
        }
        else {
          $('.cfee-bg').removeClass("focus-bg");
        }
        this.focusCfee = false;

        if(this.focusMisfee == true){
          $('.misfee-bg').addClass("focus-bg");
        }
        else {
          $('.misfee-bg').removeClass("focus-bg");
        }
        this.focusMisfee = false;



        // for duration dropdown
        if(this.durationMenuShow == false){
           $('.duration-dropdown').css('display', 'none'); 
        }
        else {
            $('.duration-dropdown').css('display', 'block');
            this.durationMenuShow = false;
        }

        //for location dropdown
        if(this.locationMenuShow == false){
           $('.location-dropdown').css('display', 'none'); 
        }
        else {
            $('.location-dropdown').css('display', 'block');
            this.locationMenuShow = false;
        }

        // this.showSearch = false;

        // for search dropdown
        if(this.searchMenuShow == false){
           $('.search-dropdown').css('display', 'none'); 
        }
        else {
            $('.search-dropdown').css('display', 'block');
            this.searchMenuShow = false;
            $("#myInput").focus();
        }
  }

  dropDown(){
    var x = document.getElementsByClassName('duration-dropdown');
    if( (x[0]as HTMLElement).style.display == 'block'){
      (x[0]as HTMLElement).style.display = 'none';
    }
    else {
       (x[0]as HTMLElement).style.display = 'block';
       this.durationMenuShow = true;
    }
  }
  locationDropdown(){
    var y = document.getElementsByClassName('location-dropdown');
    if( (y[0]as HTMLElement).style.display == 'block'){
      (y[0]as HTMLElement).style.display = 'none';
    }
    else {
       (y[0]as HTMLElement).style.display = 'block';
       this.locationMenuShow = true;
    }
  }
  showSearch:boolean = false;
  searchDropdown(){
    var z = document.getElementsByClassName('search-dropdown');
    if( (z[0]as HTMLElement).style.display == 'block'){
      (z[0]as HTMLElement).style.display = 'none';
    }
    else {
       (z[0]as HTMLElement).style.display = 'block';
       this.searchMenuShow = true;
       $("#myInput").focus();
    }
    // if(this.showSearch == false){
    //   this.showSearch = true;
    //    console.log("TRUE",this.showSearch)
    // }else if(this.showSearch == true){
    //   this.showSearch = false;
    //   console.log("False",this.showSearch)
    // }
  }

  ChangedRangeValue(e, type){
    if(type == 'hr'){
      this.selectedHrRange = e;
    }
    if(type == 'min'){
      this.selectedMinRange = e;
    }
    this.formatTime();
  }

  chooseTimeOpt(type){
    console.log(type);
    this.isSelected = type;
    this.formatTime();
  }

  formatTime(){
    if(this.selectedHrRange > 0 ){
      if(this.selectedHrRange<10){
        var hrFormat = 0 + this.selectedHrRange;
      }else{
        var hrFormat = this.selectedHrRange;
      }
    }else{
      this.selectedHrRange = "00";
      var hrFormat = this.selectedHrRange;
    }
    if(this.selectedMinRange > 0){
      if(this.selectedMinRange<10){
        var minFormat = 0 + this.selectedMinRange;
      }else{
        var minFormat = this.selectedMinRange;
      }
    }else{
      this.selectedMinRange = "00";
      var minFormat = this.selectedMinRange;
    }
    this.showFormat = hrFormat + ':' + minFormat;
    this.startFormat = hrFormat + ':' + minFormat +''+ this.isSelected;
    console.log('Start Format',this.startFormat);
    // this.model.starttime = this.startFormat;  
    this.startTime = moment(this.startFormat, "h:mm A").format("HH:mm");
    console.log('Output',this.startTime);
    this.model.starttime = this.startTime;
    this.calculateDuration(this.startTime);
  }

  calculateDuration(time){
    console.log("Calculate",time,this.model.duration)
    let piece = time.split(':');
    let mins = Number(piece[0])*60 +Number(piece[1]) +this.model.duration;
    var endTime = this.D(mins%(24*60)/60 | 0) + ':' + this.D(mins%60);  
    console.log("Classend",endTime);
    var test1 = Number(this.D(mins%(24*60)/60 | 0));
    if(test1 > 12){
      this.classend = endTime + 'PM';
      console.log("classend PM",this.classend);
    } else{
      this.classend = endTime + 'AM';
      console.log("classend AM",this.classend);
    }
  }
  D(J){ return (J<10? '0':'') + J};

  numberOnly(event):boolean{
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      console.log("character");
      this.testChar = true;
      return false;
    }
    if(event.target.value.search(/^0/) != -1){
        event.target.value = '';  
    }
    this.testChar = false;
    return true;
  }

  onClickDuration(time,index){
    console.log("item",time);
    console.log("index",index);
    this.model.duration = time;
    this.model.durationTimes = index+1;
    console.log(this.model.durationTimes);
    // this.calculateDuration(this.startTime);
  }

  chooseLocation(item){
    console.log("Choose Location",item);
    this.model.location = item.name;
    this.locationId = item._id;
  }

  focusInputMethod(e, userType, staffType){
    console.log(staffType)
    if(staffType == 'teacher'){
      console.log(e)
      console.log(staffType,userType)
      this.getAllUsers(userType);
    }else if(staffType == 'assistant'){
      console.log(e)
      console.log(staffType,userType)
      this.isFocus = true;
      this.getAllUsers(userType);
    }
  }

  hideFocus(e, staffType){
    if(staffType == 'teacher'){
      this.model.teacherSearch = "";
    }else if(staffType == 'assistant'){
      console.log("Assistant",staffType)
      setTimeout(() => {
        this.isFocus = false;
      }, 300);
      this.model.assistantSearch = "";
    }
  }

  changeInputMethod(searchWord){
    // console.log(this.detailLists.locationId)
    // console.log(searchWord)
    // let locationId = this.detailLists.locationId;
    console.log('searchword',searchWord);
    if(searchWord == ''){
      console.log("NULL")
    }else{
      this._service.getSearchUser(this.regionID, searchWord,this.currentLocation)
      .subscribe((res:any) => {
        console.log(res);
        this.userLists = res;
      }, err => {  
        console.log(err);
      });
    }
  }

  getAllUsers(type){
    this.blockUI.start('Loading...');    
    this._service.getAllUsers(this.regionID, type, 20 , 0)
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
  selectedAssistants = [];
  selectedUserLists =[];
  chooseUser(user,type){
    if (type == 'assistant') {
      console.log(user);
      this._service.getCurrentUser(user.userId)
      .subscribe((res:any) => {
        console.log(res);
        this.isFocus = false;
        console.log(this.selectedUserLists.length)
        this.selectedUserLists.push(res);
        this.selectedAssistants.push(res.userId);
        console.log(this.selectedUserLists)
        console.log(this.selectedUserLists.length)
      }, err => {  
        console.log(err);
      });
    }else if (type == 'teacher') {
      console.log("Teacher")
      this._service.getCurrentUser(user.userId)
      .subscribe((res:any) => {
        console.log(res);
        this.selectedTeacher = res;
        this.model.teacherId = this.selectedTeacher.userId;
        console.log("selected Teacher",this.model.teacherId)
      }, err => {  
        console.log(err);
      });
    }
  }

  removeSelectedUser(id){
    let getIndex;
    let nextIndex;
    for(let x in this.selectedUserLists){
      if(id == this.selectedUserLists[x].userId){
        getIndex = x;
      }
      if(id == this.selectedAssistants[x].userId){
        nextIndex = x;
      }
    }
    this.selectedUserLists.splice(getIndex,1);
    this.selectedAssistants.splice(nextIndex,1);
    console.log(this.selectedUserLists);
    console.log(this.selectedAssistants);
  }



  saveDraft(){
    this.addCheck = false;
    this.save = true;
    if(this.save == true){
      this.createCourse('withoutDraf');
    }
  }

  publishCourse(){
    this.addCheck = false;
    this.save = false;
    if(this.save == false){
      this.createCourse('withoutDraf');
    }
  }

  createCourse(state){
    console.log("This Plan",this.planId,this.planName,this.locationId)
    this.courseObj = {
      "coursePlanId": this.planId,
      // "startDate": this.changeDateFormat(this.model.start,this.model.starttime),
      // "endDate": this.changeDateFormat(this.model.end,"23:59:59:999"),
      "teacherId": this.model.teacherId,
      "assistants": JSON.stringify(this.selectedAssistants),
      "courseCode": this.model.courseCode,
      "locationId": this.locationId,
      "room": this.model.room,
      "reservedNumberofSeat": this.model.reservedNumberofSeat,
      "name": this.model.name,
      "durationTimes": this.model.durationTimes,
      // "repeatDays": this.selectedDay,
      "quizwerkz": [],
      "description": this.model.description,
      "skipLessons": JSON.stringify(this.skipArr),
      "ignoreLessons": JSON.stringify(this.ignoreArr)
    };
    // console.log("createCourse work",this.model);
    if(this.conflitCourseId == ""){
      console.log("First Time");
      this.courseObj["startDate"] = this.changeDateFormat(this.model.start,this.model.starttime);
      this.courseObj["repeatDays"] = this.selectedDay;
      if(this.model.end){
        this.courseObj["endDate"] = this.changeDateFormat(this.model.end,"23:59:59:999");
      }else{
        this.courseObj["lessonCount"] = this.model.lessonCount;
      }
    }else{
      console.log("Not First Time ", this.addCheck);
      console.log(this.model.end);
      console.log(this.model.lessonCount);
      // this.courseObj["check"] = (this.addCheck == true) ? true: false;
      if(this.endAgain == true){
        if(this.model.end){
          this.courseObj["endDate"] = this.changeDateFormat(this.model.end,"23:59:59:999");
        }else if(this.model.lessonCount){
          this.courseObj["lessonCount"] = this.model.lessonCount;
        }   
      }
    }
    
    console.log("Course",this.courseObj);

    this._service.createCourse(this.regionID,this.courseObj,this.save,this.conflitCourseId, this.addCheck)
    .subscribe((res:any) => {
      console.log(res);
      console.log(res.status);
      if(res.status === 201){
        
        this.toastr.success('You have no conflict.');
         
        this.addCheck = false;
        console.log('201 status', this.addCheck)
      }else{
        setTimeout(() => {
          this.toastr.success('Successfully Created.');
        }, 300); 
        localStorage.removeItem('coursePlanId');
        localStorage.removeItem('splan');
        this.backToCourses();
      }
    },err => {
        console.log(err);
        console.log(err.status);
        if(err.status == 409){
          this.toastr.error(err.error.message);
          this.conflitArr = err.error.lessons;
          this.conflitCourseId = err.error.courseId;
          this.tempID =[];
          this.ignoreTempID= [];
          this.skipArr = [];
          this.ignoreArr = [];
        }else if(err.status == 400){
          if(err.error.message == "LESSONS CAN'T BE EMPTY"){
            this.endAgain = true;
            console.log("Please choose the end date again that should be later than the first one");
            // this.toastr.error("Please choose the end date again that should be later than the first one");
            this.toastr.error("please choose end date or lesson count");
          }else if(err.error.message == "LESSON COUNT,END DATE,START DATE AND REPEATDAYS ARE NEEDED"){
            
            console.log("...");
            // this.toastr.error("Please choose the end date again that should be later than the first one");
            this.toastr.error(err.error.message);
          }else{
            this.toastr.error('Create Fail');
          }
        }
      });
  }

  changeDateFormat(date,time){
      if (date == null) {
        console.log('null',date)
        return ""
      }else{
        console.log("Time",time)
        let sdate = date.year+ '-' +date.month+ '-' +date.day;
        let dateParts = sdate.split('-');
        console.log("dateParts",dateParts)
        if(dateParts[1]){
          console.log(Number(dateParts[1])-1);
          let newParts = Number(dateParts[1])-1;
          dateParts[1] = newParts.toString();
        }
        let timeParts = time.split(':');
        if(dateParts && timeParts) {
            // let testDate = new Date(Date.UTC.apply(undefined,dateParts.concat(timeParts)));
            // console.log("UTC",testDate)
            let fullDate = new Date(Date.UTC.apply(undefined,dateParts.concat(timeParts))).toISOString();
            console.log("ISO",fullDate)
            return fullDate;
        }
    }
  }

  skipStaff:any;
  lessonID:any;
  skip(id,staffid){
    this.isSkipId = id;

    var val = id;
    var val1 = staffid;
    if(this.skipArr.includes(val) == false){
      console.log('in the if')
      this.skipArr.push(val)
      // this.tempID.push(staffid);
    }else{
      console.log('in the else')
      val = [val]
      val1 = [val1]
      this.skipArr =this.skipArr.filter(f => !val.includes(f));
      // this.tempID =this.tempID.filter(f => !val1.includes(f));
    }
    console.log(this.skipArr)
  }

  undo(id){
    var val = id;
    this.isSkipId = ''
    console.log('is skip true')
    if(this.skipArr.includes(id) == true){
      val = [id]
      this.skipArr =this.skipArr.filter(f => !val.includes(f));
    }
    console.log(this.skipArr)
  }

  undoIG(id){
    var val = id;
    this.isIgnoreId = ''
    console.log('is ignore true')
    if(this.ignoreArr.includes(id) == true){
      val = [id]
      this.ignoreArr =this.ignoreArr.filter(f => !val.includes(f));
    }
    console.log(this.ignoreArr)
  }

  ignore(id, staffid){
    this.isIgnoreId = id;

    // this.ignoreArr.push(id);
    var val = id;
    var val1 = id;
    if(this.ignoreArr.includes(val) == false){
      console.log('in the if ignore')
      this.ignoreArr.push(val)
      // this.tempID.push(staffid);
    }else{
      console.log('in the else ignore')
      val = [val]
      val1 = [val1]
      this.ignoreArr =this.ignoreArr.filter(f => !val.includes(f));
      // this.tempID =this.tempID.filter(f => !val1.includes(f));
    }
    console.log("ignore",this.ignoreArr);
  }


  skipAll(item){
    console.log(item);
    if(this.ignoreTempID.length > 0){
       for(var i in this.ignoreTempID){
          if(this.ignoreTempID[i]==item.staffId){
            var remove = Number(i);
            console.log("Remove from ignore",i);
            this.ignoreTempID.splice(remove,1);
            console.log("temp",this.ignoreTempID);
          }
        }
    }
    this.tempID.push(item.staffId);
    console.log('~~~~', this.tempID)
    for(var key in item.conflictWith){
      console.log("id",item.conflictWith[key]._id);
      this.skipArr.push(item.conflictWith[key]._id);
      // this.removeValues.push(lesson[key]._id);
      console.log("ignoreArr",this.ignoreArr)
      console.log("skipArr",this.skipArr);
    }
  }
  ignoreTempID = [];
  ignoreAll(item){
    console.log(item);
    if(this.tempID.length>0){
       for(var i in this.tempID){
          if(this.tempID[i]==item.staffId){
            var remove = Number(i);
            console.log("Remove from skip",i);
            this.tempID.splice(remove,1);
            console.log("temp",this.tempID);
            this.skipArr = [];
          }
        }
    }
    this.ignoreTempID.push(item.staffId);
    console.log('~~~~', this.ignoreTempID)
    for(var key in item.conflictWith){
      console.log("id",item.conflictWith[key]._id);
      this.ignoreArr.push(item.conflictWith[key]._id);
      // this.removeValues.push(lesson[key]._id);
      console.log("skipArr",this.skipArr);
      console.log("ignoreArr",this.ignoreArr);
    }

    
    // for(var key in lesson){
    //   console.log("id",lesson[key]._id);
    //   this.ignoreArr.push(lesson[key]._id);
    //   this.removeArr.push(lesson[key]._id);
    //   console.log(this.ignoreArr);
    // }
    // if(this.ignoreArr.length > 0){
    //   this.ignoreArr =  Array.from(new Set(this.ignoreArr));
    //   console.log("Ignore array",this.ignoreArr)
    // }

    // if(this.removeArr.length >0){
    //   this.skipArr = this.skipArr.filter((i) => (this.removeArr.indexOf(i) === -1));
    //   console.log("Final Skip",this.skipArr);
    //   this.removeArr = [];
    // }
  }

  // undo(id){
    // var skipIdx = this.skipArr.indexOf(id);
    // console.log('skipIdx',skipIdx);
    // this.skipArr.splice(skipIdx,1);
    // console.log("Splice SkipArr",this.skipArr);
  // }

  viewDetailTimetable(){
    this.isShowDetail = true;
  }

  hideDetailTimetable(){
    this.isShowDetail = false;
  }

}
