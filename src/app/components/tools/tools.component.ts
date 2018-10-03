import { Component, OnInit, ViewChild , ViewContainerRef, Input, ElementRef, OnChanges, HostListener, AfterViewInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, FormGroup, FormControl } from '@angular/forms';
import { appService } from '../../service/app.service';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map, merge} from 'rxjs/operators';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
declare var $:any;
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastsManager } from 'ng5-toastr/ng5-toastr';
import * as moment from 'moment-timezone';

import { ApgComponent } from '../apg/apg.component';
import { CalendarComponent } from '../calendar/calendar.component';
import { QuizwerkzComponent } from '../quizwerkz/quizwerkz.component';


@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css'],
  providers: [DatePipe]
})
export class ToolsComponent implements OnInit {
  @ViewChild('instance') instance: NgbTypeahead;
  @BlockUI() blockUI: NgBlockUI;
  @ViewChild('mainScreen') elementView: ElementRef;

  @ViewChild(ApgComponent) alertAPG: ApgComponent;
  @ViewChild(CalendarComponent) alertCal: CalendarComponent;
  @ViewChild(QuizwerkzComponent) alertQW: QuizwerkzComponent;

  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  public isSticky:boolean = false;
  public item:any = {};
  public regionID = localStorage.getItem('regionId');
  public locationId:any;
  public isChecked:any;
  public categoryLists:any;
  public userLists:any;
  public courseLists:any;
  public dataLists:any;
  public userCount:any;
  public notiType:any;
  public notiLists: Array<any> = [];
  public utcDate:any;
  public selectedID:any;
  public isdropdown: boolean = false;
  public isFous: boolean = false;
  public isFousCourse: boolean = false;
  public isFousCategory: boolean = false;
  public wordLength : number = 0;
  public notiTypes:any = [
    {name: 'Email',type: 'email',checked: false},
    {name: 'App notification',type: 'noti',checked: false}
  ];
  public checkedType: any = [];
  public today;
  public yesterday;
  public tempList = [];
  public active = [];
  public apgH:any;
  public calH:any;
  public windowH:any;
  public qwH:any;
  public scrollVal:any;
  public totalHeight:any;
  public yOffset:any;

  // test
  public testParagraph = "This is UI testing for view sent history.'Read more' will show for over 175 word count.This is UI testing for view sent history.'Read more' will show for over 175 word count.This is UI testing for view sent history.'Read more' will show for over 175 word count."

  constructor(private _service: appService, public toastr: ToastsManager, vcr: ViewContainerRef, private elementRef: ElementRef, private datePipe: DatePipe ) { 
    this.toastr.setRootViewContainerRef(vcr);
    this._service.locationID.subscribe((data) => {
        this.locationId = data;
        console.log(this.locationId) 
        this.setDefaultSelected();
    });
  }

  ngOnInit() {
    this.locationId = localStorage.getItem('locationId');
    this.notiType = 'send';
    this.setDefaultSelected();
    this.item.sendType = 'app';
  }  

  @HostListener('window:scroll', ['$event']) onScroll($event){
    this.windowH = window.innerHeight;
    // console.log(this.windowH)
    if(this.notiType == 'apg'){
      this.apgH= this.alertAPG.getContentHeight();
      console.log('apg content =', this.apgH)  
      if(this.windowH < (this.apgH + 107)){
        this.totalHeight = this.apgH + 107
        // console.log(totalH)
        const diff = this.totalHeight - this.windowH
        console.log('content height is grater', diff);
        this.scrollVal = diff;
      }
    }else if(this.notiType == 'calendar'){
      this.calH= this.alertCal.getContentHeight();
      console.log('cal content =', this.calH)  
      // console.log('cal content =', this.calH + 150)  
      // console.log('windowH = ' , window.innerHeight)

      if(this.windowH < (this.calH + 107)){
        this.totalHeight = this.calH + 107
        // console.log(totalHeight)
        const diff = this.totalHeight - this.windowH
        // console.log('content height is grater', diff);
        this.scrollVal = diff;
      }
    }else if(this.notiType == 'quizwerkz'){
      this.qwH= this.alertQW.getContentHeight();
      console.log('qw content =', this.qwH)  
      console.log(this.windowH)  
      if(this.windowH < (this.qwH + 107)){
        this.totalHeight = this.qwH + 107
        const diff = this.totalHeight - this.windowH
        console.log('content height is grater', diff);
        this.scrollVal = diff;
      }
    }
    console.log(window.pageYOffset)
    if (window.pageYOffset > 81) {
      console.log('if', window.pageYOffset)
      this.isSticky = true;
    } else {
      console.log('else', window.pageYOffset)
      this.isSticky = false;
    }

    // else{
    //   console.log('else', window.pageYOffset)
    //   this.yOffset = window.pageYOffset + 84;
    //   this.isSticky = false;
    // }
    // else if(window.pageYOffset < this.scrollVal){     
    //   console.log('else',  window.pageYOffset)
    //   if(window.pageYOffset > 40){
    //     console.log('hi inner')
    //     this.isSticky = false;
    //   }
    // }
    
    
  }
  
  clickTab(type){
    this.isSticky = false;
    console.log('clik', type)
    this.notiType = type;
    if(type == 'view'){
      this.notiLists = [];
      this.viewNoti(20, 0);
      var date = new Date();
      var dFormat = this.datePipe.transform(date,"yyyy-MM-dd");
      // console.log(dFormat); //output : 2018-02-13
      this.today = dFormat.replace(/-/g, "/");
      // console.log(this.today);
      var ydate = new Date(date.setDate(date.getDate() - 1));
      var yFormat = this.datePipe.transform(ydate,"yyyy-MM-dd");
      this.yesterday = yFormat.replace(/-/g, "/");
      console.log("Yesterday",this.yesterday);
    }else if(type == 'dropdown'){
      this.isdropdown = !this.isdropdown;
      this.notiType = 'send'
    }else if(type == 'apg'){
      console.log('apg ~~~')
      this.isdropdown = false;
    }else if(type == 'quizwerkz'){
      console.log(type)
      this.isdropdown = false;
    }else{
      this.setDefaultSelected();
    }
  }

  focusSearch(e, type){
    if(type == 'course'){
      this.isFousCourse = true;
      this.userLists = []
    }else if(type == 'user'){
      this.isFous = true;
      this.courseLists = []
    }else if(type == 'category'){
      this.isFousCategory = true;
    }
  }

  hideSearch(e){
    setTimeout(() => {
      this.isFous = false;
      this.isFousCourse = false;
      this.isFousCategory = false;
    }, 300);
  }

  changeSearch(searchWord, type){
    console.log(searchWord)
    this.userCount = (searchWord.length == 0 ) ? 0 : 0;
    if(type == 'user'){
      this._service.getSearchUser(this.regionID, searchWord, 'all')
      .subscribe((res:any) => {
        console.log(res);
        this.userLists = res;
      }, err => {  
        console.log(err);
      });
    }else if(type == 'course'){
      this._service.getSearchCourse(this.regionID, searchWord, this.locationId)
      .subscribe((res:any) => {
        console.log(res);
        this.courseLists = res;
      }, err => {  
        console.log(err);
      });
    }else if(type == 'category'){
      this._service.getSearchCategory(this.regionID, searchWord, this.locationId)
      .subscribe((res:any) => {
        console.log(res);
        this.categoryLists = res;

      }, err => {  
        console.log(err);
      });
    }
    
  }

  selectData(id, name, type){
    console.log(id)
    this.selectedID = id;
    this.item.itemID = name;
    if(type == 'user'){
      this.userCount = 1;
    }else{
      this.getUserCount(type)
    }
  }


  getUserCount(type){
    console.log(type)
    let dataObj = {
      "regionId": this.regionID,
      "locationId": this.locationId,
      "option": type
    }
    dataObj["id"] = this.selectedID;
    this._service.userCount(dataObj)
      .subscribe((res:any) => {    
          console.log(res);
          console.log(res.count);
          this.userCount = res.count
          console.log(this.userCount);
      }, err => {
        console.log(err)
      })
  }

  focusMethod(e, status){
    console.log('hi', e)
    if(status == 'subject'){
      $('.limit-word').show('slow'); 
    }else{
      $('.limit-word1').show('slow'); 
    }
  }
  
  blurMethod(e, status){
    console.log('blur', e);
    if(status == 'subject'){
      $('.limit-word').hide('slow'); 
    }else{
      $('.limit-word1').hide('slow'); 
    }
  }

  changeMethod(val : string){
    console.log(val)
    this.wordLength = val.length;
  }

  showMore(skip){
    console.log('~~~', this.notiLists);
    this.viewNoti(20, skip);
  }

  viewNoti(limit, skip){
    console.log('~~~', this.notiLists);
    // console.log(this.regionID)
    const zone = localStorage.getItem('timezone');
    const format = 'YYYY/MM/DD HH:mm:ss ZZ';
    // console.log(zone)

    this.blockUI.start('Loading...');
    this._service.viewNoti(limit, skip)
    .subscribe((res:any) => {  
      console.log('~~~', this.notiLists);
      console.log(res);
      this.blockUI.stop();
      
      this.notiLists = res;
      console.log(this.notiLists)
      for (var i in this.notiLists) {
        let year = this.notiLists[i].utc.year;
        let month = this.notiLists[i].utc.month - 1;
        let day = this.notiLists[i].utc.day;
        let hour = this.notiLists[i].utc.hour;
        let minutes = this.notiLists[i].utc.minutes;

        var utcTemp = new Date(Date.UTC(year, month, day, hour, minutes));
        const utcToString = utcTemp.toUTCString();
        const time = new Date(utcToString)
        this.utcDate = moment(time, format).tz(zone).format(format)
        // console.log(this.utcDate)
        this.utcDate = this.utcDate.slice(0, -5);
        /*===for testing Confirm UI===*/
        let utcDate = this.utcDate;
        let onlyDate = utcDate.substring(0, 10);
        let onlyTime = utcDate.substring(11, 19)
        // console.log(onlyDate)
        /*===end Testing===*/
        if(this.notiLists[i].utc){
          this.notiLists[i].utc = this.utcDate;
          this.notiLists[i].sentdate = onlyDate;
          this.notiLists[i].senttime = onlyTime;
        }
      }
      this.notiLists = this.notiLists.concat(this.notiLists);
      console.log('Noti List',this.notiLists);
    }, err => {
      this.blockUI.stop();
      this.toastr.error('View sent history fail');
      console.log(err)
    })
  }

  setDefaultSelected(){
    let dataObj = {
      "regionId": this.regionID,
      "locationId": this.locationId,
      "option": 'allcustomer'
    }
    console.log(dataObj)
    setTimeout(()=>{ 
      this.isChecked = 'allcustomer';
    }, 10);
    
    this._service.userCount(dataObj)
    .subscribe((res:any) => {  
      console.log(res.count);
      this.userCount = res.count;
      // if(this.userCount == 0){
      //   this.toastr.error("You have no user to send notification.");
      // }  
    }, err => {
      console.log(err);
      this.toastr.error("Error in calling API.");
    })    
  }

  checkedOptions(option, e){
    console.log(option)
    var val = option.type;
    if(this.checkedType.includes(val) == false){
      this.checkedType.push(val)
    }else{
      val = [val]
      this.checkedType =this.checkedType.filter(f => !val.includes(f));
    }
    console.log(this.checkedType)
    console.log(this.checkedType.length)
  }

  somethingChanged(type){
    this.tempList = [];
    this.active = [];
    console.log('what', type)
    this.isChecked = type;
    this.locationId = localStorage.getItem('locationId');
    let dataObj = {
      "regionId": this.regionID,
      "locationId": this.locationId,
      "option": type
    }

    console.log(dataObj)
    this.userCountCalc(dataObj);

    this.item.itemID = '';
    if(type == 'category'){
      this._service.getCategory(this.regionID, 20, 0)
      .subscribe((res:any) => {
        let temp_category = res;
        this.categoryLists = res;
        console.log(this.categoryLists)
        this.dataLists = this.categoryLists.map(a => a.name);
      }, err => {
        console.log(err)
      })
    }else if(type == 'course'){
      console.log('hi course')
      this._service.getAllCourse(this.regionID, 20, 0)
      .subscribe((res:any) => {
        console.log('~~~', res)
        this.courseLists = res;
        for(var key in this.courseLists){
            for(var i in this.courseLists[key].courses){
                this.tempList.push(this.courseLists[key].courses[i]);
            }
        }
        console.log('templist',this.tempList)
        this.courseLists = this.tempList;
        this.dataLists = this.tempList.map(a => a.name);
        console.log("Length",this.dataLists.length)
      }, err => {
        console.log(err)
      })
    }else if(type == 'user'){
      console.log(this.userLists)
      this._service.getAllUsers(this.regionID, 'all', 20, 0)
      .subscribe((res:any) => {
        console.log('~~~', res)
        this.userLists = res;
        // for (var i in this.userLists) {
        //   this.userLists[i].preferredName = this.userLists[i].preferredName + " - (" + this.userLists[i].email + ")";
        // }

        // this.dataLists = this.userLists.map(a => a.preferredName);
        
      }, err => {
        console.log(err)
      })
    }else{
      console.log('=)')
    }

    // var $radioButtons = $('input[type="radio"]');    
    // $radioButtons.each(function() {
    //     $(this).parent().toggleClass('radio-selected', this.checked);
    // });
    
  }

  checkedActive(e, type){
    console.log(e)
    console.log('~~~' ,this.isChecked)
    this.locationId = localStorage.getItem('locationId');
    let dataObj = {
      "regionId": this.regionID,
      "locationId": this.locationId,
      "option": this.isChecked
    }

    var val = type;
    if(this.active.includes(val) == false){
      this.active.push(val)
    }else{
      val = [val]
      this.active =this.active.filter(f => !val.includes(f));
    }
    console.log(this.active)
    if(this.active.length != 0){
      console.log('no zero')
      dataObj["active"] = true;
      console.log(dataObj)
      this.userCountCalc(dataObj);
    }else{
      console.log('length is zero')
      console.log(dataObj)
      this.userCountCalc(dataObj);
    }
  }

  userCountCalc(obj){
    this._service.userCount(obj)
    .subscribe((res:any) => {      
      console.log(res.count);
      this.userCount = res.count; 
    }, err => {
      console.log(err)
    })
  }


  search = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    merge(this.focus$),
    merge(this.click$.pipe(filter(() => !this.instance.isPopupOpen()))),
    map(term => (term === '' ? this.dataLists
      : this.dataLists.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
  );
  
  valuechange(newValue, type) {
    console.log('<3 <3 ',newValue)
    let dataObj = {
      "regionId": this.regionID,
      "locationId": this.locationId,
      "option": type
    }

    if(type == 'course'){
      // for (var i in this.courseLists) {
      //   if (this.courseLists[i].name == newValue) {
      //     console.log('....', this.courseLists[i]);
      //     let temp = this.courseLists[i];
      //     dataObj["id"] = temp._id
      //   }
      // }
      for (var i in this.tempList) {
        if (this.tempList[i].name == newValue) {
          console.log('....', this.tempList[i]);
          let temp = this.tempList[i];
          dataObj["id"] = temp._id
        }
      }
    }else if(type == 'category'){
      for (var i in this.categoryLists) {
        if (this.categoryLists[i].name == newValue) {
          console.log('....', this.categoryLists[i]);
          let temp = this.categoryLists[i];
          dataObj["id"] = temp._id
        }
      }
    }else{
      this.userCount = 1;
    }
    

    console.log(dataObj)

    if(type != 'user'){
      this._service.userCount(dataObj)
      .subscribe((res:any) => {    
          console.log(res);
          console.log(res.count);
          this.userCount = res.count
          console.log(this.userCount);

          // if(this.userCount == 0){
          //   this.toastr.error("You have no user to send notification.");
          // }
      }, err => {
        console.log(err)
      })
    }else{

    }
    
  }


  sendNoti(data){
    console.log(data)
    console.log(this.isChecked)

    let dataObj = {
      "regionId": this.regionID,
      "locationId": this.locationId,
      "option": this.isChecked,
      "sendType": this.checkedType
    }

    if(data.active == 1){
      dataObj["active"] = 1
    }

    // if(data.appType == true && data.emailType == true){
    //   dataObj["sendType"] = 'both'
    // }else if(data.appType != true){
    //   dataObj["sendType"] = 'email'
    // }else{
    //   dataObj["sendType"] = 'noti'
    // }
   
    let body = {
      "title": data.subject,
      "message": data.message
    }

    // if(this.isChecked == 'category'){
    //   for (var i in this.categoryLists) {
    //     if (this.categoryLists[i].name == data.itemID) {
    //       console.log('....', this.categoryLists[i]);
    //       let temp = this.categoryLists[i];
    //       dataObj["id"] = temp._id
    //     }
    //   }
    // }else if(this.isChecked == 'course'){
    //   // for (var i in this.courseLists) {
    //   //   if (this.courseLists[i].name == data.itemID) {
    //   //     console.log('....', this.courseLists[i]);
    //   //     let temp = this.courseLists[i];
    //   //     dataObj["id"] = temp._id
    //   //   }
    //   // }
    //   for (var i in this.tempList) {
    //     if (this.tempList[i].name == data.itemID) {
    //       console.log('....', this.tempList[i]);
    //       let temp = this.tempList[i];
    //       dataObj["id"] = temp._id
    //       console.log("dataObj",dataObj["id"]);
    //     }
    //   }
    // }else if(this.isChecked == 'user'){
    //   for (var i in this.userLists) {
    //     if (this.userLists[i].preferredName == data.itemID) {
    //       console.log('....', this.userLists[i]);
    //       let temp = this.userLists[i];
    //       dataObj["id"] = temp.userId
    //     }
    //   }
    // }else{
    //   console.log(':)')
    // }
    dataObj["id"] = this.selectedID;
    console.log(dataObj)


    this.blockUI.start('Loading...');
    this._service.createNoti(dataObj, body)
    .subscribe((res:any) => {
      console.log('~~~', res)
      console.log('~~~', this.isChecked)
      this.toastr.success('Successfully notified.');
      this.blockUI.stop();
      this.item = {};
      this.item.sendType = 'app';
      this.checkedType = [];
      this.notiTypes = [
        {name: 'Email',type: 'email',checked: false},
        {name: 'App notification',type: 'noti',checked: false}
      ];
      if(this.isChecked == 'user' || this.isChecked == 'category' ||this.isChecked == 'course' ){
        this.userCount = 0;
      }
    }, err => {
      this.toastr.error('Notify fail');
      console.log(err)
    })
    
  }

  resetForm(){
    this.item = {};
    this.item.sendType = 'app';
    this.isChecked = 'allcustomer';
  }
  viewHeight:any;
  clickMe(){
        this.viewHeight = this.elementView.nativeElement.offsetHeight;
        console.log("Height",this.viewHeight);
      }


// testing
// isCollapsed:boolean = true;
  toggleView(){
    // this.isCollapsed = false;
  }
// testing
}
