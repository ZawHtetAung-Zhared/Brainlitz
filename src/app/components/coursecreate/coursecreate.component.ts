import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ViewContainerRef, ElementRef, Inject, HostListener, AfterViewInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DOCUMENT } from "@angular/platform-browser";
import { NgbModal, ModalDismissReasons, NgbModalRef, NgbDateStruct, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { appService } from '../../service/app.service';
import { DataService } from '../../service/data.service';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastsManager } from 'ng5-toastr/ng5-toastr';
import * as moment from 'moment';

declare var $: any;

@Component({
  selector: 'app-coursecreate',
  templateUrl: './coursecreate.component.html',
  styleUrls: ['./coursecreate.component.css']
})
export class CoursecreateComponent implements OnInit {
  @ViewChild("content") modalContent: TemplateRef<any>;
  public regionID = localStorage.getItem('regionId');
  public currentLocation = localStorage.getItem('locationId');
  public locationName = localStorage.getItem('locationName');
  public coursePlan = JSON.parse(localStorage.getItem('cPlan'));
  public course = JSON.parse(localStorage.getItem('courseID'));
  public currency = JSON.parse(localStorage.getItem('currency'));
  public scheduleObj = JSON.parse(localStorage.getItem('scheduleObj'));
  @BlockUI() blockUI: NgBlockUI;
  public addCheck: boolean = false;
  public isthereLC: boolean = false;
  public isSkipId: any;
  public isIgnoreId: any;
  public courseFeess: any;
  chooseFee: any = '';
  // hello = JSON.parse(localStorage.getItem('splan')) ;
  public courseObj: any = {};
  wordLength: any;
  model: any = {};
  isChecked: any;
  minDate: any;
  maxDate: any;
  public days = [
    { "day": "Sun", "val": 0 },
    { "day": "Mon", "val": 1 },
    { "day": "Tue", "val": 2 },
    { "day": "Wed", "val": 3 },
    { "day": "Thu", "val": 4 },
    { "day": "Fri ", "val": 5 },
    { "day": "Sat", "val": 6 },
  ];
  public ignoreTempID = [];
  public tempID = [];
  public selectedDay = [];
  public toggleBool: boolean = true;
  public progressSlider: boolean = false;
  public focusCfee: boolean = false;
  public focusMisfee: boolean = false;
  public selectedHrRange: any;
  public selectedMinRange: any;
  public overDurationHr: boolean = false;
  public showListWrap: boolean = false;
  public startFormat: any;
  public timeInminutes: any;
  public rangeMin: any;
  public rangeHr: any;
  public isSelected: any;
  public showFormat: any;
  public testChar: boolean;
  public testList = [];
  public durationMenuShow: boolean = false;
  public locationMenuShow: boolean = false;
  public searchMenuShow: boolean = false;
  public startTime: any;
  public classend: any;
  public locationList = [];
  public locationId: any;
  public isFocus: boolean = false;
  public isDpFocus: boolean = false;
  public detailLists: any;
  public userLists: any;
  public selectedTeacher: any = '';
  public isSticky: boolean = false;
  public isShowDetail: boolean = false;
  public save: boolean = false;
  public conflitCourseId: any = "";
  public skipArr = [];
  public ignoreArr = [];
  public tempArr = [];
  public conflitArr = [];
  public endAgain: boolean = false;
  public planId: any;
  public planName: any;
  public planDuration: any;
  public pplLists = [];
  public temp: any = {};
  public timetable: any;
  public ttCalendar: Array<any> = [];
  public timetableLists: Array<any> = [];
  public ttStartDate: Array<any> = [];
  public ttEndDate: Array<any> = [];
  public coursePayment: any = {};
  public tempVar: any;
  public tempValue: any;
  public feesOptions: any;
  objectKeys = Object.keys;
  isEdit: boolean = false;
  taxOptShow: boolean = false;
  feeOptShow: boolean = false;
  chooseTax: any = '';
  public flexiOn: boolean = false;
  public rolloverCId:any;
  public modalReference: any;

  @ViewChild('start') nameInputRef: ElementRef;
  @ViewChild('end') name1InputRef: ElementRef;
  @ViewChild("myInput") inputEl: ElementRef;

  constructor(@Inject(DOCUMENT) private doc: Document, private modalService: NgbModal, private _service: appService, private router: Router, private config: NgbDatepickerConfig, public toastr: ToastsManager, vcr: ViewContainerRef, private _eref: ElementRef, private dataService: DataService) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  test;
  ngOnInit() {
    console.log("CPLan", this.coursePlan)
    console.log("CourseID", this.course);
    console.log("Currency", this.currency);
    // this.isChecked = 'end';
    this.isSelected = 'AM';
    this.rangeHr = '0';
    this.rangeMin = '0';
    this.showFormat = "00:00";
    // this.createList();
    // this.getAllLocations();
    window.scroll(0, 0);
    // this.goBackCat = true;
    if (this.course) {
      if(this.course.type == 'edit'){
        console.log("Draft True", this.course);
        this.showDraftCourse(this.course.courseId, 'edit');
        // this.feesOptions = this.coursePlan.paymentPolicy.courseFeeOptions; 
      }else if(this.course.type == 'rollover'){
        console.log('Rollover');
        this.showDraftCourse(this.course.courseId, 'rollover');
      } 
    } else if (this.coursePlan) {
      console.log("course Create");
      this.isChecked = 'end';
      this.getAllLocations();
      this.model = [];
      this.planId = this.coursePlan.id;
      this.planName = this.coursePlan.name;
      this.model.duration = this.coursePlan.duration;
      this.createList(this.model.duration);
      this.feesOptions = this.coursePlan.paymentPolicy.courseFeeOptions;
      this.model.location = this.locationName;
      this.locationId = this.currentLocation;
      // this.feeOptList(this.coursePlan.paymentPolicy.courseFeeOptions);
      if (this.scheduleObj) {
        this.scheduleCourse();
      }
    }

    if (this.currency == undefined || this.currency == null) {
      this.currency = {
        'invCurrencySign': '$'
      }
      console.log("undefined currency", this.currency);
    } else {
      if (this.currency.invCurrencySign == "") {
        console.log("has currency but sign null", this.currency);
        this.currency.invCurrencySign = '$';
      }
    }
  }

  scheduleCourse() {
    console.log("from schedule", this.scheduleObj);
    this.model.start = this.scheduleObj.date;
    this.selectedDay = this.scheduleObj.repeatDays;
    this.selectedTeacher = this.scheduleObj.teacher;
    this.model.teacherId = this.selectedTeacher.userId;
    this.model.durationTimes = 1;
    this.minDate = this.scheduleObj.date;
    this.rangeHr = this.scheduleObj.time.hr;
    this.rangeMin = this.scheduleObj.time.min;
    this.selectedHrRange = this.scheduleObj.time.hr
    this.selectedMinRange = this.scheduleObj.time.min
    this.isSelected = this.scheduleObj.time.meridiem;
    var hr:any;
    var min:any;
    var h:any;
    if(this.scheduleObj.time.hr <10){
      hr = '0'+this.scheduleObj.time.hr;
    }else{
      hr = this.scheduleObj.time.hr
    }
    if (this.scheduleObj.time.min < 10) {
      min = '0' + this.scheduleObj.time.min;
    } else {
      min = this.scheduleObj.time.min;
    }
    if(this.scheduleObj.time.meridiem == 'PM'){
      if(this.scheduleObj.time.hr==12){
        h = this.scheduleObj.time.hr;
      }else{
        h = this.scheduleObj.time.hr+12
      }  
    }else{
      if(this.scheduleObj.time.hr==12){
        h = 0;
      }else{
        h = this.scheduleObj.time.hr;
      }  
    }
    this.showFormat = hr + ':' + min;
    this.model.startT = hr + ':' + min + this.scheduleObj.time.meridiem;

    this.model.starttime = h + ':' + min;
  }

  // feeOptList(feeOptions){
  //   console.log(feeOptions);
  //   var options = feeOptions;
  //   for(var key in options){
  //     console.log("--Options",options[key]);
  //     // this.feesOptions = options[key].
  //   }
  // }

  showDraftCourse(cId,type) {
    console.log("Function Works");
    this.getAllLocations();
    this.blockUI.start('Loading...');
    this._service.getSingleCourse(cId, this.currentLocation)
      .subscribe((res: any) => {
        console.log("Course Detail", res);
        setTimeout(() => {
          this.blockUI.stop(); // Stop blocking
        }, 300);
        this.model = res;
        this.courseFeess = res.paymentPolicy.courseFee;
        if (this.model.type == "FLEXY") {
          this.flexiOn = true;
        } else {
          this.model.start = this.changeDateStrtoObj(this.model.startDate, "start");
          this.model.end = this.changeDateStrtoObj(this.model.endDate, "end");
          this.model.starttime = this.model.startDate.substr(this.model.startDate.search("T") + 1, 5);
          console.log(this.model.starttime)
          this.setToTimerange(this.model.starttime);
          this.minDate = this.model.start;
        }
        this.model.location = this.model.location.name;
        this.locationId = this.model.locationId;
        console.log("this location", this.locationId);
        this.selectedDay = this.model.repeatDays;
        this.planId = this.model.coursePlan.coursePlanId;
        this.planName = this.model.coursePlan.name;
        console.log("plan in draft", this.planName);
        console.log(this.model.coursePlan.lesson.duration * this.model.durationTimes);
        this.model.duration = this.model.coursePlan.lesson.duration * this.model.durationTimes;
        console.log(this.model.duration);
        this.calculateDuration(this.model.starttime, this.model.duration);
        this.createList(this.model.coursePlan.lesson.duration);
        this.model.durationTimes = this.model.durationTimes;
        this.startTime = this.model.starttime;
        //for tax option inclusive/exclusive
        if(this.model.paymentPolicy.courseFeeTaxInclusive == undefined){
          this.chooseTax = ""; 
        }else if(this.model.paymentPolicy.courseFeeTaxInclusive == true){
          this.chooseTax = "inclusive"; 
        }else if(this.model.paymentPolicy.courseFeeTaxInclusive == false){
          this.chooseTax = "exclusive"; 
        }
        console.log("this.model.taxInclusive",this.model.paymentPolicy.courseFeeTaxInclusive)
        /*=====*/
        this.selectedTeacher = this.model.teacher;
        this.staffArrLists.push(this.selectedTeacher.userId)
        console.log("staffArrLists==>",this.staffArrLists)
        var assiatantsArr = this.model.assistants;
        for (var i in assiatantsArr) {
          console.log("Assistant", assiatantsArr[i]);
          this.selectedUserLists.push(assiatantsArr[i]);
          this.selectedAssistants.push(assiatantsArr[i].userId);
          this.staffArrLists.push(assiatantsArr[i].userId)
          console.log("staffArrLists==>",this.staffArrLists)

        }
        if (this.model.end) {
          this.isChecked = 'end';
          this.tempVar = 'end';
          this.tempValue = this.changeDateStrtoObj(res.endDate, "end");
        } else if (this.model.lessonCount) {
          this.isChecked = 'lesson';
          this.tempVar = 'lesson';
          this.tempValue = res.lessonCount;
        }
        this.feesOptions = this.model.paymentPolicy.courseFeeOptions;
        this.chooseFee = this.model.paymentPolicy.courseFee;

        // var selectedDays= this.model.repeatDays;
        this.temp["endDate"] = this.model.endDate;
        this.temp["startDate"] = this.model.startDate;
        this.temp["lessonCount"] = this.model.lessonCount;
        this.temp["repeatDays"] = this.selectedDay;
        this.temp["durationTimes"] = this.model.durationTimes;
        localStorage.setItem("tempObj", JSON.stringify(this.temp));
        // setTimeout(() => {
        //    this.createCourse();
        //  }, 300);
        this.maxDate = this.changeDateStrtoObj(res.endDate, "end");
        this.save = true;
        this.addCheck = true;
        // this.conflitCourseId = res._id;
        if(type == 'edit'){
          this.conflitCourseId = res._id;
          if (this.model.draft == true) {
            console.log("Draft ===>", this.model.draft);
            this.createCourse('withDraf');
            this.isEdit = false;
          } else {
            this.isEdit = true;
          }
        }else{
          this.isEdit = false;
        }
        
      });
  }

  setToTimerange(time) {
    console.log(time);
    var timeString = time;
    var H = +timeString.substr(0, 2);
    console.log(H);
    var h = (H % 12) || 12;
    var ampm = H < 12 ? "AM" : "PM";
    var forSelected = h + timeString.substr(2, 3);
    console.log("For Selected", forSelected);
    if (h < 10) {
      timeString = '0' + h + timeString.substr(2, 3) + ampm;
    } else {
      timeString = h + timeString.substr(2, 3) + ampm;
    }
    this.isSelected = ampm;
    this.showFormat = timeString.substring(0, 5);
    this.model.startT = timeString;
    console.log(this.showFormat);
    this.rangeHr = timeString.substring(0, timeString.search(":"));
    console.log('this.rangeHr', this.rangeHr)
    this.rangeMin = timeString.substring(timeString.search(":") + 1);
    console.log('this.rangeMin', this.rangeMin);
    this.selectedHrRange = forSelected.substring(0, forSelected.search(":"));
    this.selectedMinRange = forSelected.substring(forSelected.search(":") + 1);
    console.log("MinRange in Draft", this.selectedMinRange);
  }

  changeDateStrtoObj(datestr, type) {
    if (type == "start") {
      console.log(datestr)
      let test = datestr.substring(0, datestr.search("T"));
      let testSplit = test.split("-");
      let format = { year: Number(testSplit[0]), month: Number(testSplit[1]), day: Number(testSplit[2]) };
      return format;
    } else if (type == "end") {
      if (datestr) {
        console.log(datestr)
        let test = datestr.substring(0, datestr.search("T"));
        let testSplit = test.split("-");
        let format = { year: Number(testSplit[0]), month: Number(testSplit[1]), day: Number(testSplit[2]) };
        return format;
      } else if (datestr == null) {
        return null;
      }
    }

  }

  @HostListener("window:scroll", [])
  scrollHandler() {
    let num = this.doc.documentElement.scrollTop;
    if (num > 20) {
      this.doc.getElementById("navbar").style.top = "0";
    } else {
      this.doc.getElementById("navbar").style.top = "-120px";
    }
  }

  getAllLocations() {
    this._service.getLocations(this.regionID, 20, 0, false)
      .subscribe((res: any) => {
        console.log("Locations", res);
        this.locationList = res;
      })
  }



  createList(duration) {
    console.log(duration);
    for (var i = 0; i <= 3; i++) {
      var testVar = duration * (i + 1);
      // console.log("testVar",testVar);
      this.testList.push(testVar);
    }
    console.log("testList", this.testList);
    // this.model.duration = this.testList[0];
    console.log("Duration Times", this.model.duration);
  }

  focusMethod(e, status, word) {
    console.log('hi', e)
    if (status == 'name') {
      this.wordLength = word.length;
      $('.limit-wordcount').show('slow');
    } else {
      this.wordLength = word.length;
      $('.limit-wordcount1').show('slow');
    }
  }

  blurMethod(e, status) {
    console.log('blur', e);
    if (status == 'name') {
      $('.limit-wordcount').hide('slow');
    } else {
      $('.limit-wordcount1').hide('slow');
    }
    this.wordLength = 0;
  }

  changeMethod(val: string) {
    console.log(val)
    this.wordLength = val.length;
  }

  backToCourses(ToCourses,cId) {
    // console.log('backtocourse')
    console.log("backToCourses works");
    if (this.isEdit == true) {
      console.log("this.isEdit",this.isEdit);
      console.log('backtocourseDetail');
      this._service.backCourseDetail();
    }else{
      console.log("this.isEdit===",this.isEdit);
      if(this.coursePlan != null){
        console.log("this.coursePlan != null",this.coursePlan.from);
        if(this.coursePlan.from == "schedule" && ToCourses == ''){
          console.log('backtocourse schedule')
          this.router.navigate(['course/']);
          this.dataService.nevigateCDetail(cId);
        }else if((this.coursePlan.from == "courses" && ToCourses == '') || (this.coursePlan.from = "schedule" && ToCourses == 'back') || (this.coursePlan.from = "courses" && ToCourses == 'back')){
          console.log('backtocourse')
          this._service.backCourse();
        }
      }else{
        console.log("this.coursePlan == null");
        console.log('backtocourse')
        if(this.course.type == 'rollover'){
          // this.enrollUser(this.course.courseId,this.course.userId);
          // this.router.navigate(['/customer']);
          // this.dataService.nevigateCustomer(this.course.userId);
          // this._service.backCourse();
          this._service.backCourse();
        }else{
          this._service.backCourse();
        }
      }
    }

    //clear data
    setTimeout(()=>{
      this.staffArrLists = [];
      localStorage.removeItem('cPlan');
      localStorage.removeItem('courseID');
      localStorage.removeItem('tempObj');
      localStorage.removeItem('scheduleObj');
    },100)
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

  lCount(val) {
    console.log(val)
    this.isthereLC = (val == '') ? false : true;
    console.log(this.isthereLC)
  }

  chooseEndOpt(type) {
    // this.isChecked = type;
    // if(type == 'end'){
    //   this.model.end = "";
    //   if(this.model.lesson){
    //     this.model.lessonCount = "";
    //   }
    // }else if(type == 'lesson'){
    //   if(this.model.end){
    //     this.model.end = "";
    //   }
    //   this.model.lessonCount = "";
    // }
    this.isChecked = type;
    if (this.tempVar) {
      if (this.tempVar == this.isChecked) {
        console.log("Draft Choose", this.tempVar);
        if (this.tempVar == 'end') {
          this.model.end = this.tempValue;
          this.model.lessonCount = ""
        } else {
          this.model.lessonCount = this.tempValue;
          this.model.end = ""
        }
      }
    } else {
      console.log("CREATE");
      if (this.isChecked == 'end') {
        this.model.lessonCount = "";
      } else {
        this.model.end = "";
      }
    }


  }

  setMinDate(event) {
    console.log("setMinDate", event);
    this.minDate = event;
  }

  setMaxDate(date) {
    console.log("setMaxDate", date);
    this.maxDate = date;
  }
  clickInit: boolean = false;
  selectDay(data, event): void {
    this.clickInit = true;
    console.log("Day", data, event);
    var dayIdx = this.selectedDay.indexOf(data);
    console.log(dayIdx);
    if (event.target.checked) {
      if (dayIdx < 0)
        this.selectedDay.push(data);
      this.toggleBool = false;
    } else {
      if (dayIdx >= 0)
        this.selectedDay.splice(dayIdx, 1);
      if (this.selectedDay.length > 0) {
        this.toggleBool = false;
      } else {
        this.toggleBool = true;
      }
    }
    this.selectedDay.sort();
    console.log(this.selectedDay);
  }

  durationProgress($event) {
    this.progressSlider = true;
  }

  @HostListener('document:click', ['$event'])
  public categorySearch(event): void {
    if (this.progressSlider != true) {
      $('.bg-box').css({ 'display': "none" });
    }
    else {
      $('.bg-box').css({ 'display': "block" });
      $('.bg-box').click(function (event) {
        event.stopPropagation();
      });
      this.progressSlider = false;

    }

    if (this.focusCfee == true) {
      $('.cfee-bg').addClass("focus-bg");
    }
    else {
      $('.cfee-bg').removeClass("focus-bg");
    }
    this.focusCfee = false;

    if (this.focusMisfee == true) {
      $('.misfee-bg').addClass("focus-bg");
    }
    else {
      $('.misfee-bg').removeClass("focus-bg");
    }
    this.focusMisfee = false;
    console.log(event)
    // for search dropdown
    // if(this.searchMenuShow == false){
    //    $('.search-dropdown').css('display', 'none'); 
    // }
    // else {
    //     $('.search-dropdown').css('display', 'block');
    //     this.searchMenuShow = false;
    //     $("#myInput").focus();
    // }
  }

  showDropdown(type, state) {
    console.log(type, state)
    if (type == 'feeOpt') {
      this.feeOptShow = true;
    } else if (type == 'taxOpt') {
      this.taxOptShow = true;
    } else if (type == 'duration') {
      this.durationMenuShow = true;
    } else if (type == 'search') {
      this.searchMenuShow = true;
    }
  }
  closeDropdown(event, type, datePicker?) {


    // if(event.path){
    //   if(type == 'feeOpt'){
    //     var parentWrap = event.path.filter(function(res){
    //       return res.className == "form-group has-feedback feeOpt-wrap"
    //     })
    //     if(parentWrap.length == 0){
    //       this.feeOptShow = false;
    //     }
    //   }else if(type == 'taxOpt'){
    //     var parentWrap = event.path.filter(function(res){
    //       return res.className == "form-group has-feedback taxOpt-wrap"
    //     })
    //     if(parentWrap.length == 0){
    //       this.taxOptShow = false;
    //     }
    //   }else if(type == 'duration'){
    //     var parentWrap = event.path.filter(function(res){
    //       return res.className == "cursor-on d-flex justify-content-between time-dropdown font-semi durationDp"
    //     })
    //     if(parentWrap.length == 0){
    //       this.durationMenuShow = false;
    //     }
    //   }else if(type == 'search'){
    //     var parentWrap = event.path.filter(function(res){
    //       return res.className == "search-wrap"
    //     })
    //     if(parentWrap.length == 0){
    //       this.searchMenuShow = false;
    //       $("#myInput").focus();
    //     }
    //   }
    // }
    // else{
    console.log(event.target.className)
    if (event.target.className.includes("dropD")) {
      this.feeOptShow = false;
      this.taxOptShow = false;
      this.durationMenuShow = false;
      if (event.target.className.includes("taxInput")) {
        this.taxOptShow = true;
        if(datePicker)
          datePicker.close();
      }
      else if (event.target.className.includes("feeInput")){
        if(datePicker)
          datePicker.close();
        this.feeOptShow = true;
      }
        
      else if (event.target.className.includes("durationInput")){
        this.durationMenuShow = true;
        if(datePicker)
          datePicker.close();
      }
      else if (event.target.className.includes("teacherInput")){
        // this.searchMenuShow = true;
        if(datePicker)
          datePicker.close();
      }
      // else if (event.target.className.includes("startInput")){
      //   this.durationMenuShow = true;
      //   if(datePicker)
      //     datePicker.close();
      // }
      // else if (event.target.className.includes("endInput")){
      //   this.durationMenuShow = true;
      //   if(datePicker)
      //     datePicker.close();
      // }
    }
    else if (event.target.className.includes("search-user")){
      console.log("------------------------------>")
      this.searchMenuShow= false;
      // this.durationMenuShow = true;
      // if(datePicker)
      //   datePicker.close();
    }
    else {
      this.searchMenuShow= false;
      // if (type == "start")
      //   datePicker.close();
      // else if (type== 'end')
      //   datePicker.close();
     if(type == "start" || type == "end"){
         if(event.target.offsetParent == null){
            datePicker.close();
         }else if(event.target.offsetParent.nodeName != "NGB-DATEPICKER"){

            datePicker.close();
         }
     }
      this.feeOptShow = false;
      this.taxOptShow = false;
      this.durationMenuShow = false;
      this.showListWrap = false;
    }
    //this.taxOptShow = !this.taxOptShow;
    //}

  }
  // closefix(event, datePicker) {
  //   if(event.target.offsetParent == null)
  //     datePicker.close();
  //   else if(event.target.offsetParent.nodeName != "NGB-DATEPICKER")
  //     datePicker.close();
  // }

  // showSearch:boolean = false;
  // searchDropdown(item){
  //   if(item == false){
  //     var z = document.getElementsByClassName('search-dropdown');
  //     if( (z[0]as HTMLElement).style.display == 'block'){
  //       (z[0]as HTMLElement).style.display = 'none';
  //     }
  //     else {
  //        (z[0]as HTMLElement).style.display = 'block';
  //        this.searchMenuShow = true;
  //        $("#myInput").focus();
  //     }
  //   }
  // }

  ChangedRangeValue(e, type) {
    // console.log(e)
    if (type == 'hr') {
      this.selectedHrRange = e;
      console.log("this.selectedHrRange", this.selectedHrRange);
    }
    if (type == 'min') {
      this.selectedMinRange = e;
      console.log("this.selectedMinRange", this.selectedMinRange)
    }
    this.formatTime();
  }

  chooseTimeOpt(type) {
    console.log(type);
    this.isSelected = type;
    this.formatTime();
  }

  formatTime() {
    console.log("this.selected", this.selectedHrRange, this.selectedMinRange)
    if (this.selectedHrRange > 0) {
      if (this.selectedHrRange < 10) {
        var hrFormat = 0 + this.selectedHrRange;
      } else {
        var hrFormat = this.selectedHrRange;
      }
    } else {
      this.selectedHrRange = "00";
      var hrFormat = this.selectedHrRange;
    }
    if (this.selectedMinRange > 0) {
      if (this.selectedMinRange < 10) {
        this.selectedMinRange = parseInt(this.selectedMinRange);
        this.selectedMinRange = this.selectedMinRange.toString();
        console.log('if', this.selectedMinRange)
        // var minFormat = this.selectedMinRange.concat('0',this.selectedMinRange);
        var minFormat = 0 + this.selectedMinRange;
        // console.log(this.selectedMinRange.concat('0',this.selectedMinRange));
        console.log(minFormat)
      } else {
        console.log('else', this.selectedMinRange)
        var minFormat = this.selectedMinRange;
      }
    } else {
      this.selectedMinRange = "00";
      var minFormat = this.selectedMinRange;
    }
    this.showFormat = hrFormat + ':' + minFormat;
    console.log(this.showFormat)
    this.startFormat = hrFormat + ':' + minFormat + '' + this.isSelected;
    console.log('Start Format', this.startFormat);
    // this.model.starttime = this.startFormat;  
    this.startTime = moment(this.startFormat, "h:mm A").format("HH:mm");
    console.log('Output', this.startTime);
    this.model.startT = this.startFormat;
    this.model.starttime = this.startTime;
    this.calculateDuration(this.startTime, this.model.duration);
  }

  calculateDuration(time, duration) {
    console.log("Calculate", time, duration)

    let totalduration = duration / 60;
    let gethour = Math.floor(totalduration);
    let getmin = duration % 60;

    console.log(gethour)
    console.log(getmin)

    // this.classend = time + 
    if (time) {
      let piece = time.split(':');
      let mins = Number(piece[0]) * 60 + Number(piece[1]) + duration;
      var endTime = this.D(mins % (24 * 60) / 60 | 0) + ':' + this.D(mins % 60);
      console.log("Classend", endTime);
      var H = +endTime.substr(0, 2);
      var h = (H % 12) || 12;
      var ampm = H < 12 ? "AM" : "PM";
      if (h < 10) {
        this.classend = '0' + h + endTime.substr(2, 3) + ampm;
        console.log("Class end", this.classend);
      } else {
        this.classend = h + endTime.substr(2, 3) + ampm;
        console.log("Class end", this.classend);
      }
    }
  }
  D(J) { return (J < 10 ? '0' : '') + J };

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      console.log("character");
      this.testChar = true;
      return false;
    }
    if (event.target.value.search(/^0/) != -1) {
      event.target.value = '';
    }
    this.testChar = false;
    return true;
  }

  onClickDuration(time, index) {
    console.log("item", time);
    console.log("index", index);
    this.model.duration = time;
    this.model.durationTimes = index + 1;
    console.log(this.model.durationTimes);
    this.calculateDuration(this.startTime, this.model.duration);
  }

  chooseLocation(item) {
    console.log("Choose Location", item);
    this.model.location = item.name;
    this.locationId = item._id;
  }

  focusInputMethod(e, userType, staffType) {
    console.log("staffType", staffType)
    if (staffType == 'teacher') {
      console.log(e)
      console.log(staffType, userType)
      this.getAllUsers(userType);
    } else if (staffType == 'assistant') {
      console.log(e)
      console.log(staffType, userType)
      this.isFocus = true;
      this.getAllUsers(userType);
    }
  }

  hideFocus(e, staffType) {
    if (staffType == 'teacher') {
      this.model.teacherSearch = "";
      //this.searchMenuShow = false;
    } else if (staffType == 'assistant') {
      console.log("Assistant", staffType)
      setTimeout(() => {
        this.isFocus = false;
      }, 300);
      this.model.assistantSearch = "";
    }
  }

  changeInputMethod(searchWord) {
    // console.log(this.detailLists.locationId)
    // console.log(searchWord)
    // let locationId = this.detailLists.locationId;
    console.log('searchword', searchWord);
    if (searchWord == '') {
      console.log("NULL");
      this._service.getAllUsers(this.regionID, 'staff', 20, 0)
        .subscribe((res: any) => {
          this.userLists = res;
          console.log("userLists", this.userLists);
        })
    } else {
      this._service.getSearchUser(this.regionID, searchWord, 'staff', 20, 0, '')
      .subscribe((res: any) => {
        console.log(res);
        this.userLists = res;
      }, err => {
        console.log(err);
      });
      // var pplArr = [];
      // var pplListArr = [];
      // if (this.selectedTeacher) {
      //   pplArr.push(this.selectedTeacher);
      // }
      // if (this.selectedUserLists.length > 0) {
      //   for (var i in this.selectedUserLists) {
      //     pplArr.push(this.selectedUserLists[i]);
      //   }
      // }
      // console.log("pplArr", pplArr)

      // if (pplArr.length > 0) {
      //   console.log("to send userIds PPLs");
      //   for (let y in pplArr) {
      //     let id = pplArr[y].userId;
      //     pplListArr.push(id)
      //   }
      //   console.log('pplListArr', pplListArr)
      //   var pplListStr = pplListArr.toString();
      //   console.log("pplListsStr", pplListStr);

      //   this._service.getSearchUser(this.regionID, searchWord, 'staff', 20, 0, '')
      //     .subscribe((res: any) => {
      //       console.log(res);
      //       this.userLists = res;
      //     }, err => {
      //       console.log(err);
      //     });
      // } else {
      //   console.log("not send");
      //   this._service.getSearchUser(this.regionID, searchWord, 'staff', 20, 0, '')
      //     .subscribe((res: any) => {
      //       console.log(res);
      //       this.userLists = res;
      //     }, err => {
      //       console.log(err);
      //     });
      // }
    }
  }

  getAllUsers(type) {
    this.blockUI.start('Loading...');
    this._service.getAllUsers(this.regionID, type, 20, 0)
      .subscribe((res: any) => {
        this.userLists = res;
        console.log('this.userLists', this.userLists);
        setTimeout(() => {
          this.blockUI.stop(); // Stop blocking
        }, 300);
      }, err => {
        console.log(err);
      })
  }

  staffArrLists = [];
  selectedAssistants = [];
  selectedUserLists = [];
  chooseUser(user, type) {
    if (type == 'assistant') {
      console.log(user);
      this._service.getCurrentUser(user.userId)
        .subscribe((res: any) => {
          console.log(res);
          this.isFocus = false;
          console.log(this.selectedUserLists.length)
          this.selectedUserLists.push(res);
          this.selectedAssistants.push(res.userId);
          console.log(this.selectedUserLists)
          console.log(this.selectedUserLists.length)
          this.staffArrLists.push(res.userId)
          console.log("staffArrLists==>",this.staffArrLists)
        }, err => {
          console.log(err);
        });
    } else if (type == 'teacher') {
      console.log("Teacher")
      this._service.getCurrentUser(user.userId)
        .subscribe((res: any) => {
          this.searchMenuShow = false;
          console.log(res);
          this.selectedTeacher = res;
          this.model.teacherId = this.selectedTeacher.userId;
          console.log("selected Teacher", this.model.teacherId);
          this.staffArrLists = [];
          this.staffArrLists.push(res.userId);
          for(var i in this.selectedUserLists){
            this.staffArrLists.push(this.selectedUserLists[i].userId)
          }
          console.log("staffArrLists==>",this.staffArrLists)
          // this.staffArrLists.push(res.userId)
          // console.log("staffArrLists==>",this.staffArrLists)
          // if(this.staffArrLists.length > 0){
          //   // var dayIdx = this.staffArrLists.indexOf();
          //   for(var i in this.selectedTeacher){

          //   }
          // }
        }, err => {
          console.log(err);
        });
    }
  }

  removeSelectedUser(id) {
    this.staffArrLists = [];
    this.selectedAssistants = [];
    let getIndex;
    let nextIndex;
    for (let x in this.selectedUserLists) {
      if (id == this.selectedUserLists[x].userId) {
        getIndex = x;
      }
      // if (id == this.selectedAssistants[x].userId) {
      //   nextIndex = x;
      // }
    }
    this.selectedUserLists.splice(getIndex, 1);
    // this.selectedAssistants.splice(nextIndex, 1);
    console.log("this.selectedUserLists",this.selectedUserLists);

    for(var i in this.selectedUserLists){
      this.selectedAssistants.push(this.selectedUserLists[i].userId);
      this.staffArrLists.push(this.selectedUserLists[i].userId);
      console.log("staffArrLists===>",this.staffArrLists);
    }
    this.staffArrLists.push(this.selectedTeacher.userId);
    console.log("staffArrLists===>",this.staffArrLists);
    console.log("this.selectedAssistants",this.selectedAssistants);
  }



  saveDraft() {
    this.addCheck = false;
    this.save = true;
    if (this.save == true) {
      this.createCourse('withoutDraf');
    }
  }

  publishCourse() {
    this.addCheck = false;
    this.save = false;
    if (this.save == false) {
      this.createCourse('withoutDraf');
    }
  }

  createCourse(state) {
    console.log("This Plan", this.planId, this.planName, this.locationId)
    this.courseObj = {
      "coursePlanId": this.planId,
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
      "ignoreLessons": JSON.stringify(this.ignoreArr),
    };

    if (this.chooseFee != '') {
      console.log("KKKK", this.chooseFee);
      this.courseObj["courseFee"] = this.chooseFee;
    }

    if (this.chooseTax != '') {
      console.log("TTT", this.chooseTax);
      if (this.chooseTax == 'inclusive') {
        this.courseObj["taxInclusive"] = true;
      } else {
        this.courseObj["taxInclusive"] = false;
      }

    }
    // console.log("createCourse work",this.model);
    // console.log("Temp Obj",this.temp);
    if (this.conflitCourseId == "") {
      console.log("First Time");
      // this.courseObj["startDate"] = this.changeDateFormat(this.model.start,this.model.starttime);
      this.courseObj["repeatDays"] = this.selectedDay;

      if (this.flexiOn == false) {
        this.courseObj["startDate"] = this.changeDateFormat(this.model.start, this.model.starttime);
      }
      if (this.model.end && this.flexiOn == false) {
        console.log("Is end date???", this.model.end)
        this.courseObj["endDate"] = this.changeDateFormat(this.model.end, "23:59:59:999");
        this.temp["endDate"] = this.changeDateFormat(this.model.end, "23:59:59:999");
        this.tempVar = "end";
        this.tempValue = this.model.end;
        this.model.lessonCount = null;
      } else {
        console.log("Lesson???", this.model.lessonCount)
        this.courseObj["lessonCount"] = this.model.lessonCount;
        this.temp["lessonCount"] = this.model.lessonCount;
        this.tempVar = "lesson";
        this.tempValue = this.model.lessonCount;
        this.model.end = null;
      }
      this.temp["durationTimes"] = this.model.durationTimes;
      this.temp["startDate"] = this.changeDateFormat(this.model.start, this.model.starttime);
      this.temp["repeatDays"] = this.selectedDay;
      localStorage.setItem("tempObj", JSON.stringify(this.temp));
    } else {
      var testObj = JSON.parse(localStorage.getItem("tempObj"));
      console.log("Temp obj", testObj)
      console.log("Not First Time");

      if (this.model.end) {
        console.log("this.model.end", this.model.end)
        var endD = this.changeDateFormat(this.model.end, "23:59:59:999");
        if (testObj.endDate != endD) {
          console.log("Not same endD", testObj.endDate, "&&&", endD);
          this.courseObj["endDate"] = endD;
          this.temp["endDate"] = endD;
          //other Obj
          this.courseObj["startDate"] = this.changeDateFormat(this.model.start, this.model.starttime);
          this.courseObj["repeatDays"] = this.selectedDay;
          localStorage.setItem("tempObj", JSON.stringify(this.temp));
          this.tempVar = "end";
          this.tempValue = this.model.end;
          this.model.lessonCount = null;
        }
      }

      if (this.model.lessonCount && this.flexiOn == false) {
        console.log("LessonCount KKK");
        if (testObj.lessonCount != this.model.lessonCount) {
          console.log("Not Same", testObj.lessonCount, "&&&", this.model.lessonCount);
          this.courseObj["lessonCount"] = this.model.lessonCount;
          this.temp["lessonCount"] = this.model.lessonCount;
          // other obj
          this.courseObj["startDate"] = this.changeDateFormat(this.model.start, this.model.starttime);
          this.courseObj["repeatDays"] = this.selectedDay;
          localStorage.setItem("tempObj", JSON.stringify(this.temp));
          this.tempVar = "lesson";
          this.tempValue = this.model.lessonCount;
          this.model.end = null;
        }
      } else if (this.model.lessonCount && this.flexiOn == true) {
        this.courseObj["lessonCount"] = this.model.lessonCount;
        this.temp["lessonCount"] = this.model.lessonCount;
        this.courseObj["startDate"] = this.changeDateFormat(this.model.start, this.model.starttime);
        this.courseObj["repeatDays"] = this.selectedDay;
        localStorage.setItem("tempObj", JSON.stringify(this.temp));
        this.tempVar = "lesson";
        this.tempValue = this.model.lessonCount;
      }

      var startD = this.changeDateFormat(this.model.start, this.model.starttime);
      if (testObj.startDate != startD) {
        console.log("Not Same StartD", testObj.lessonCount, "&&&", this.model.lessonCount);
        this.courseObj["startDate"] = startD;
        this.temp["startDate"] = startD;
        // other obj
        if (this.model.end) {
          this.courseObj["endDate"] = this.changeDateFormat(this.model.end, "23:59:59:999");
        } else if (this.model.lessonCount) {
          this.courseObj["lessonCount"] = this.model.lessonCount;
        }
        this.courseObj["repeatDays"] = this.selectedDay;
        localStorage.setItem("tempObj", JSON.stringify(this.temp));
      }

      if (JSON.stringify(testObj.repeatDays) != JSON.stringify(this.selectedDay)) {
        console.log("not same repeat", testObj.repeatDays, this.selectedDay);
        this.courseObj["repeatDays"] = this.selectedDay;
        this.temp["repeatDays"] = this.selectedDay;
        if (this.model.end) {
          this.courseObj["endDate"] = this.changeDateFormat(this.model.end, "23:59:59:999");
        } else if (this.model.lessonCount) {
          this.courseObj["lessonCount"] = this.model.lessonCount;
        }
        this.courseObj["startDate"] = this.changeDateFormat(this.model.start, this.model.starttime);
        localStorage.setItem("tempObj", JSON.stringify(this.temp));
      }

      if (testObj.durationTimes != this.model.durationTimes) {
        console.log("Change Duration", testObj);
        console.log("duration", this.model.durationTimes)
        this.temp["durationTimes"] = this.model.durationTimes;
        if (this.model.end) {
          this.courseObj["endDate"] = this.changeDateFormat(this.model.end, "23:59:59:999");
        } else if (this.model.lessonCount) {
          this.courseObj["lessonCount"] = this.model.lessonCount;
        }
        this.courseObj["startDate"] = this.changeDateFormat(this.model.start, this.model.starttime);
        this.courseObj["repeatDays"] = this.selectedDay;
        localStorage.setItem("tempObj", JSON.stringify(this.temp));
      }

    }

    if (this.flexiOn == true) {
      var flexy: boolean;
      flexy = true;
    }

    console.log("Course", this.courseObj);
    this.blockUI.start('Loading...');
    this._service.createCourse(this.regionID, this.courseObj, this.save, this.conflitCourseId, this.addCheck, this.currentLocation, flexy)
      .subscribe((res: any) => {
        console.log(res);
        this.blockUI.stop();
        // localStorage.removeItem('coursePlanId');
        // localStorage.removeItem('splan');
        localStorage.removeItem('cPlan');
        localStorage.removeItem('courseID');
        // localStorage.removeItem('tempObj');
        // this.router.navigate(['course/']); 

        console.log(res.status);
        if (res.status === 201) {

          this.toastr.success('You have no conflict.');

          this.addCheck = false;
          console.log('201 status', this.addCheck)
        } else {
          console.log("status",res.status)
          setTimeout(() => {
            this.toastr.success('Successfully Created.');
          }, 300);
          localStorage.removeItem('coursePlanId');
          localStorage.removeItem('splan');
          if(this.course.type == 'rollover'){
            console.log("RES",res)
            let createdId = res.body.courseId;
            this.enrollUser(createdId, this.course.userId);
            // this.backToCourses('',res.body.courseId)
          }else{
            this.backToCourses('',res.body.courseId);
          }
        }
      }, err => {
        console.log(err);
        console.log(err.status);
        this.blockUI.stop();
        if (err.status == 409) {
          console.log(this.model.end)
          console.log(this.model.lessonCount)
          this.toastr.error(err.error.message);
          this.conflitArr = err.error.lessons;
          console.log(this.conflitArr)
          this.conflitCourseId = err.error.courseId;
          this.coursePayment = err.error.paymentPolicy;
          this.tempID = [];
          this.ignoreTempID = [];
          this.skipArr = [];
          this.ignoreArr = [];
          this.timetable = err.error.timetable
          this.ttCalendar = err.error.timetable.calendar
          this.timetableLists = err.error.timetable.calendar
          console.log(this.ttCalendar)
          console.log(this.timetableLists[0].lessons[0])
          this.ttStartDate = this.timetableLists[0].lessons[0];
          console.log(this.ttStartDate)
          const lastItem = this.timetableLists[this.timetableLists.length - 1].lessons.length - 1;
          console.log(lastItem)
          console.log(this.timetableLists[this.timetableLists.length - 1].lessons[lastItem])
          this.ttEndDate = this.timetableLists[this.timetableLists.length - 1].lessons[lastItem];

        } else if (err.status == 400) {
          if (err.error.message == "LESSONS CAN'T BE EMPTY") {
            this.endAgain = true;
            console.log("Please choose the end date again that should be later than the first one");
            // this.toastr.error("Please choose the end date again that should be later than the first one");
            this.toastr.error("please choose end date or lesson count");
          } else if (err.error.message == "LESSON COUNT,END DATE,START DATE AND REPEATDAYS ARE NEEDED") {

            console.log("...");
            // this.toastr.error("Please choose the end date again that should be later than the first one");
            this.toastr.error(err.error.message);
          } else {
            this.toastr.error('Create Fail');
          }
        }
      });
  }

  userDetail:any = {};
  courseDetails:any;
  showInvoice:boolean = false;
  enrollUser(createdCID,userID){
    console.log("courseID",createdCID)
    return new Promise((resolve,reject)=>{
      this._service.editProfile(this.regionID, userID)
      .subscribe((res:any) => {
        console.log("res UserDetail",res)
        this.userDetail.user = res;
      })

      this._service.getSingleCourse(createdCID, this.locationId)
      .subscribe((res:any) => {
        console.log("res CourseDetail",res)
        this.courseDetails = res;
      })
      resolve();
    }).then(()=>{
      let body = {
         'courseId': createdCID,
         'userId': userID,
         'userType': 'customer'
       }
       // this.modalReference = this.modalService.open('invModal', { backdrop:'static', windowClass: 'modal-xl modal-inv d-flex justify-content-center align-items-center'});
       setTimeout(()=>{
         this._service.assignUser(this.regionID,body, this.locationId)
         .subscribe((res:any) => {
           // this.showInvoice = true;
           this.modalReference = this.modalService.open(this.modalContent, { backdrop:'static', windowClass: 'modal-xl modal-inv d-flex justify-content-center align-items-center'})
             this.showInvoice = true;
             Object.assign(this.courseDetails , res)
             console.log("CALL INVOICE",this.courseDetails)
             console.log("==>",this.userDetail)
         })
       },500)
      
    })

  }

  cancelInvoiceModal(){
    this.modalReference.close();
      this.router.navigate(['/customer']);
      this.dataService.nevigateCustomer(this.course.userId);
      setTimeout(()=>{
        this.dataService.nevigateSchedule('');
        localStorage.removeItem('courseID');
      },300)
  }
  

  // updateCourse(){
  //   this.courseObj= {
  //     "courseCode": this.model.courseCode,
  //     "locationId": this.locationId,
  //     "room": this.model.room,
  //     "reservedNumberofSeat": this.model.reservedNumberofSeat,
  //     "name": this.model.name,
  //     "quizwerkz": [],
  //     "description": this.model.description,
  //   };
  //   if(this.chooseFee !=''){
  //     console.log("KKKK",this.chooseFee);
  //     this.courseObj["courseFee"] = this.chooseFee;
  //   }
  //   console.log('update CourseObj',this.courseObj);
  //   this.blockUI.start('Loading...');
  //   this._service.updateCourse(this.conflitCourseId,this.courseObj, this.currentLocation)
  //   .subscribe((res:any)=>{
  //     console.log(res);
  //     this.blockUI.stop();
  //     this.backToCourses('');
  //     setTimeout(() => {
  //       this.toastr.success('Successfully Created.');
  //     }, 300); 
  //   },err=>{
  //     this.blockUI.stop();
  //     setTimeout(() => {
  //       this.toastr.error('Update Fail');
  //     }, 300); 
  //   });
  // }

  changeDateFormat(date,time){
    console.log("==>date,time",date,time);
      if (date == null) {
        console.log('null',date)
        return ""
      }else{
        console.log("utc date",date);
        console.log("Time",time);
        let sdate = date.year+ '-' +date.month+ '-' +date.day;
        console.log(sdate);
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

  skipStaff: any;
  lessonID: any;
  skip(id, staffid) {
    this.isSkipId = id;

    var val = id;
    var val1 = staffid;
    if (this.skipArr.includes(val) == false) {
      console.log('in the if')
      this.skipArr.push(val)
      // this.tempID.push(staffid);
    } else {
      console.log('in the else')
      val = [val]
      val1 = [val1]
      this.skipArr = this.skipArr.filter(f => !val.includes(f));
      // this.tempID =this.tempID.filter(f => !val1.includes(f));
    }
    console.log(this.skipArr)
  }

  undo(id) {
    var val = id;
    this.isSkipId = ''
    console.log('is skip true')
    if (this.skipArr.includes(id) == true) {
      val = [id]
      this.skipArr = this.skipArr.filter(f => !val.includes(f));
    }
    console.log(this.skipArr)
  }

  undoIG(id) {
    var val = id;
    this.isIgnoreId = ''
    console.log('is ignore true')
    if (this.ignoreArr.includes(id) == true) {
      val = [id]
      this.ignoreArr = this.ignoreArr.filter(f => !val.includes(f));
    }
    console.log(this.ignoreArr)
  }

  ignore(id, staffid) {
    this.isIgnoreId = id;

    // this.ignoreArr.push(id);
    var val = id;
    var val1 = id;
    if (this.ignoreArr.includes(val) == false) {
      console.log('in the if ignore')
      this.ignoreArr.push(val)
      // this.tempID.push(staffid);
    } else {
      console.log('in the else ignore')
      val = [val]
      val1 = [val1]
      this.ignoreArr = this.ignoreArr.filter(f => !val.includes(f));
      // this.tempID =this.tempID.filter(f => !val1.includes(f));
    }
    console.log("ignore", this.ignoreArr);
  }


  skipAll(item) {
    this.ignoreArr = [];
    if (this.ignoreTempID.length > 0) {
      for (var i in this.ignoreTempID) {
        if (this.ignoreTempID[i] == item.staffId) {
          var remove = Number(i);
          this.ignoreTempID.splice(remove, 1);
          this.ignoreArr = [];
        }
      }
    }
    this.tempID.push(item.staffId);
    for (var key in item.conflictWith) {
      let conflictTempId = item.conflictWith[key]._id;
      if (this.skipArr.includes(conflictTempId) == false) {
        this.skipArr.push(item.conflictWith[key]._id);
      }
      console.log("ignoreArr", this.ignoreArr)
      console.log("skipArr", this.skipArr);
    }
  }

  ignoreAll(item) {
    this.skipArr = []
    if (this.tempID.length > 0) {
      for (var i in this.tempID) {
        if (this.tempID[i] == item.staffId) {
          var remove = Number(i);
          this.tempID.splice(remove, 1);
          this.skipArr = [];
        }
      }
    }
    this.ignoreTempID.push(item.staffId);
    for (var key in item.conflictWith) {
      let conflictTempId = item.conflictWith[key]._id;
      if (this.ignoreArr.includes(conflictTempId) == false) {
        this.ignoreArr.push(item.conflictWith[key]._id);
      }
      console.log("skipArr", this.skipArr);
      console.log("ignoreArr", this.ignoreArr);
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

  viewDetailTimetable() {
    this.isShowDetail = true;
  }

  hideDetailTimetable() {
    this.isShowDetail = false;
  }

  closeStart(event, datePicker) {
    // var parentWrap = event.path.filter(function(res){
    //   return res.className == "cc-start"
    // })
    // if(parentWrap.length == 0){
    //   // console.log('blank')
    //   datePicker.close();
    // }
    datePicker.close();
  }

  closeEnd(event, endPicker) {
    console.log("end", endPicker)
    // var parentWrap = event.path.filter(function(res){
    //   return res.className == "cc-end"
    // })
    // if(parentWrap.length == 0){
    //   // console.log('blank')
    //   endPicker.close();
    // }
    endPicker.close();
  }

  chooseFeeOption(key, data) {
    this.chooseFee = data;
    console.log(key, data);
    // console.log("option",this.chooseFee);
  }

  chooseTaxOption(type) {
    this.chooseTax = type;
    console.log("choose Tax", type);
  }

  flexiOnOff() {
    console.log("Flexible timetable")
    if (this.flexiOn == false) {
      this.flexiOn = true;
    } else {
      this.flexiOn = false;
    }

  }

  //for rollover
  // enrollUser(){
  //   let body = {

  //   }
  //   this._service.assignUser(this.regionID,body,this.locationId)
  //   .subscribe((res:any) => {
  //     console.log("--->assignUser",res);
      
  //   })
  // }

}
