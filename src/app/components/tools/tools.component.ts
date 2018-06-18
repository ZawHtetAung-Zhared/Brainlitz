import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, FormGroup, FormControl } from '@angular/forms';
import { appService } from '../../service/app.service';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map, merge} from 'rxjs/operators';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
declare var $:any;

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent implements OnInit {
  @ViewChild('instance') instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
	public item:any = {};
  public regionID = localStorage.getItem('regionId');
	public locationId = localStorage.getItem('locationId');
  public isChecked:any;
  public categoryLists:any;
  public userLists:any;
  public courseLists:any;
  public dataLists:any;
  public userCount:any;
  public notiType:any;
  public notiLists:any;
  constructor(private _service: appService) { }

  ngOnInit() {
    this.notiType = 'send';
    this.setDefaultSelected();
  }

  clickTab(type){
    this.notiType = type;
    if(type == 'view'){
      // this.viewNoti();
    }else{
      this.setDefaultSelected();
    }
  }

  viewNoti(){
    console.log(this.regionID)
    this._service.viewNoti(this.regionID)
    .subscribe((res:any) => {  
      console.log(res);
      this.notiLists = res; 
    }, err => {
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
    }, err => {
      console.log(err)
    })    
  }

  somethingChanged(type){
    console.log('what')
    this.isChecked = type;
    let dataObj = {
      "regionId": this.regionID,
      "locationId": this.locationId,
      "option": type
    }

    console.log(dataObj)
    this._service.userCount(dataObj)
    .subscribe((res:any) => {      
      if(type != 'course'){
        console.log(res);
        console.log(res.count);
        this.userCount = res.count;
      }else{
        console.log(res);
        console.log(res.length);    
        this.userCount = res.length;  
      }
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
    }else if(type == 'alluser'){
      this._service.getAllUsers(this.regionID)
      .subscribe((res:any) => {
        console.log('~~~', res)
        this.userLists = res;
        this.dataLists = this.userLists.map(a => a.preferredName);
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
    console.log(newValue)
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
    }
    

    console.log(dataObj)

    this._service.userCount(dataObj)
    .subscribe((res:any) => {      
      
        console.log(res);
        console.log(res.count);
        this.userCount = res.count;
      
    }, err => {
      console.log(err)
    })
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
    console.log(dataObj.option)

    let body = {
      "title": data.subject,
      "message": data.message
    }

    if(data.type == 'category'){
      for (var i in this.categoryLists) {
        if (this.categoryLists[i].name == data.itemID) {
          console.log('....', this.categoryLists[i]);
          let temp = this.categoryLists[i];
          dataObj["id"] = temp._id
        }
      }
    }else if(data.type == 'course'){
      for (var i in this.courseLists) {
        if (this.courseLists[i].name == data.itemID) {
          console.log('....', this.courseLists[i]);
          let temp = this.courseLists[i];
          dataObj["id"] = temp._id
        }
      }
    }else if(data.type == 'alluser'){
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
    // this.item = {};
    console.log(dataObj)
    this._service.createNoti(dataObj, body)
    .subscribe((res:any) => {
      console.log('~~~', res)
      this.item = {};
    }, err => {
      console.log(err)
    })
    
  }

  resetForm(){
    this.item = {};
    this.isChecked = 'allcustomer';
  }

}
