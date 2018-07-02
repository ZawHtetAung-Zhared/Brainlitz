import { Component, OnInit, ViewChild , ViewContainerRef} from '@angular/core';
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

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent implements OnInit {
  @ViewChild('instance') instance: NgbTypeahead;
  @BlockUI() blockUI: NgBlockUI;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
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
  public notiLists:any;
  public utcDate:any;

  constructor(private _service: appService, public toastr: ToastsManager, vcr: ViewContainerRef) { 
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

  clickTab(type){
    this.notiType = type;
    if(type == 'view'){
      this.viewNoti();
    }else{
      this.setDefaultSelected();
    }
  }

  viewNoti(){
    console.log(this.regionID)
    const zone = localStorage.getItem('timezone');
    const format = 'YYYY/MM/DD HH:mm:ss ZZ';
    console.log(zone)

    this.blockUI.start('Loading...');
    this._service.viewNoti()
    .subscribe((res:any) => {  
      console.log(res);
      this.blockUI.stop();
      this.notiLists = res;
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
        console.log(this.utcDate)
        this.utcDate = this.utcDate.slice(0, -5);

        if(this.notiLists[i].utc){
          this.notiLists[i].utc = this.utcDate;
        }
      }
      console.log(this.notiLists)
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

  somethingChanged(type){
    console.log('what', type)
    this.isChecked = type;
    this.locationId = localStorage.getItem('locationId');
    let dataObj = {
      "regionId": this.regionID,
      "locationId": this.locationId,
      "option": type
    }

    console.log(dataObj)
    this._service.userCount(dataObj)
    .subscribe((res:any) => {      
      console.log(res.count);
      this.userCount = res.count; 
    }, err => {
      console.log(err)
    })

    this.item.itemID = '';
    if(type == 'category'){
      this._service.getCategory(this.regionID)
      .subscribe((res:any) => {
        let temp_category = res;
        this.categoryLists = res;
        this.dataLists = this.categoryLists.map(a => a.name);
      }, err => {
        console.log(err)
      })
    }else if(type == 'course'){
      this._service.getAllCourse(this.regionID)
      .subscribe((res:any) => {
        console.log('~~~', res)
        this.courseLists = res;
        this.dataLists = this.courseLists.map(a => a.name);
      }, err => {
        console.log(err)
      })
    }else if(type == 'user'){
      console.log(this.userLists)
      this._service.getAllUsers(this.regionID, 'all')
      .subscribe((res:any) => {
        console.log('~~~', res)
        this.userLists = res;
        this.dataLists = this.userLists.map(a => a.preferredName);
        console.log(this.dataLists)
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
      for (var i in this.courseLists) {
        if (this.courseLists[i].name == newValue) {
          console.log('....', this.courseLists[i]);
          let temp = this.courseLists[i];
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
    console.log(data.type)
    console.log(this.isChecked)

    let dataObj = {
      "regionId": this.regionID,
      "locationId": this.locationId,
      "option": this.isChecked
    }
    //dataObj["active"] = (data.active == true) ? 1 : 0;

    if(data.active == 1){
      dataObj["active"] = 1
    }
    if(data.sendType != undefined){
      dataObj["sendType"] = data.sendType
    }
    let body = {
      "title": data.subject,
      "message": data.message
    }

    if(this.isChecked == 'category'){
      for (var i in this.categoryLists) {
        if (this.categoryLists[i].name == data.itemID) {
          console.log('....', this.categoryLists[i]);
          let temp = this.categoryLists[i];
          dataObj["id"] = temp._id
        }
      }
    }else if(this.isChecked == 'course'){
      for (var i in this.courseLists) {
        if (this.courseLists[i].name == data.itemID) {
          console.log('....', this.courseLists[i]);
          let temp = this.courseLists[i];
          dataObj["id"] = temp._id
        }
      }
    }else if(this.isChecked == 'user'){
      for (var i in this.userLists) {
        if (this.userLists[i].preferredName == data.itemID) {
          console.log('....', this.userLists[i]);
          let temp = this.userLists[i];
          dataObj["id"] = temp.userId
        }
      }
    }else{
      console.log(':)')
    }
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

}
