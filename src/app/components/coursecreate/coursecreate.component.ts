import { Component, OnInit, ViewChild,Input,Output,EventEmitter, ViewContainerRef, ElementRef, Inject, HostListener } from '@angular/core';
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
  @BlockUI() blockUI: NgBlockUI;

  hello = JSON.parse(localStorage.getItem('splan')) ;
  // step1: boolean = false;
  // step2: boolean = false;
  // step3: boolean = false;
  // step4: boolean = false;
  // step1FormaData: any;
  // step2FormaData: any;
  // step3FormaData: any;
  // step4FormaData: any;
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
  public selectedTeacher:any;
  public isSticky:boolean = false;
  public isShowDetail:boolean = false;
  public testConflitsArr = [
    {
      "date": "25 May 2018",
      "time": "10:30 AM - 11:30 AM",
      "lesson": "Pre School Music Academia",
      "location": "Bedok Point",
      "studentCount": 5
    },
    {
      "date": "27 May 2018",
      "time": "10:30 AM - 11:30 AM",
      "lesson": "Pre School Music Academia",
      "location": "Bedok Point",
      "studentCount": 5
    },
    {
      "date": "30 May 2018",
      "time": "10:30 AM - 11:30 AM",
      "lesson": "Pre School Music Academia",
      "location": "Bedok Point",
      "studentCount": 5
    }
  ];
  public testTimetable = [
    {
      "date": "May 2018",
      "time": "10:30 AM - 11:30 AM",
      "timetableArr": [
        {
          "date": "7 May",
          "time": "Sunday",
          "skip": false
        },
        {
          "date": "8 May",
          "time": "Monday",
          "skip": false
        },
        {
          "date": "14 May",
          "time": "Sunday",
          "skip": false
        },
        {
          "date": "15 May",
          "time": "Monday",
          "skip": false
        },
        {
          "date": "7 May",
          "time": "Sunday",
          "skip": false
        },
        {
          "date": "8 May",
          "time": "Monday",
          "skip": true
        },
        {
          "date": "14 May",
          "time": "Sunday",
          "skip": false
        }
      ]
    },
    {
      "date": "Jun 2018",
      "time": "10:30 AM - 11:30 AM",
      "timetableArr": [
        {
          "date": "7 May",
          "time": "Sunday",
          "skip": false
        },
        {
          "date": "8 May",
          "time": "Monday",
          "skip": false
        },
        {
          "date": "14 May",
          "time": "Sunday",
          "skip": false
        },
        {
          "date": "15 May",
          "time": "Sunday",
          "skip": true
        }
      ]
    },
  ]

  @ViewChild("myInput") inputEl: ElementRef;

  constructor( @Inject(DOCUMENT) private doc: Document,private modalService: NgbModal, private _service: appService, public dataservice: DataService, private router: Router, private config: NgbDatepickerConfig, public toastr: ToastsManager, vcr: ViewContainerRef, private _eref: ElementRef) {
    this.toastr.setRootViewContainerRef(vcr);
   }
   test;
  ngOnInit() {    
    console.log("CPLan",this.coursePlan)
    setTimeout(function(){
      $("#step1").addClass('active');
    }, 200)
    // this.step2=true;
    this.isChecked = 'end';
    this.isSelected = 'AM';
    this.rangeHr = '0';
    this.rangeMin = '0';
    this.showFormat = "00:00";
    this.createList();
    this.getAllLocations();
    window.scroll(0,0);
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

  createList(){
    console.log(this.coursePlan.duration);
    for(var i = 0; i <= 9; i++){
      var testVar = this.coursePlan.duration * (i+1);
      console.log("testVar",testVar);
      this.testList.push(testVar);
    }
    console.log("testList",this.testList);
    this.model.durationTimes = this.testList[0];
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

  backToCourses(){
    this.router.navigate(['/course']);
    localStorage.removeItem('cPlan');
  }

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

  chooseEndOpt(type){
    console.log("Type",type);
    this.isChecked = type;
      if(type == 'end'){
        this.model.end = "";
      }else{
        this.model.lessonCount = "";
        this.maxDate = "";
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
    this.model.starttime = this.startFormat; 
    this.startTime = moment(this.startFormat, "h:mm A").format("HH:mm");
    console.log('Output',this.startTime);
    this.calculateDuration(this.startTime);
  }

  calculateDuration(time){
    console.log("Calculate",time)
    let piece = time.split(':');
    let mins = Number(piece[0])*60 +Number(piece[1]) +this.model.durationTimes;
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

  onClickDuration(time){
    console.log("item",time);
    this.model.durationTimes = time;
    this.calculateDuration(this.startTime);
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
        console.log(this.selectedTeacher)
      }, err => {  
        console.log(err);
      });
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
  }

  viewDetailTimetable(){
    this.isShowDetail = true;
  }

  hideDetailTimetable(){
    this.isShowDetail = false;
  }

}
