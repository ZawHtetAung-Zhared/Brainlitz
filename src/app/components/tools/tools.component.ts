import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, FormGroup, FormControl } from '@angular/forms';
import { appService } from '../../service/app.service';
import { Observable } from 'rxjs/Rx';

declare var $:any;

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent implements OnInit {
	public item:any = {};
  public regionID = localStorage.getItem('regionId');
	public locationId = '5b13c2bd693dfb588d34f9de';
  public isChecked: boolean = false;
  public categoryLists:any;
  public userLists:any;
  public courseLists:any;
  constructor(private _service: appService) { }

  ngOnInit() {
  }

  sendNoti(data){
    console.log(data)
  	console.log(data.type)
    let dataObj = {
      "regionId": this.regionID,
      "locationId": this.locationId,
      "option": data.type
    }

    let body = {
      "title": data.subject,
      "message": data.message
    }

    console.log(dataObj)
    this._service.createNoti(dataObj, body)
    .subscribe((res:any) => {
      console.log('~~~', res)
      this.item = {};
    }, err => {
      console.log(err)
    })
  	
  }

  somethingChanged(type){
    console.log('what')
    this.isChecked = type;
    if(type == 'category'){
      this._service.getCategory(this.regionID)
      .subscribe((res:any) => {
        console.log('~~~', res)
        this.categoryLists = res;
      }, err => {
        console.log(err)
      })
    }else if(type == 'course'){
      this._service.getAllCourse(this.regionID)
      .subscribe((res:any) => {
        console.log('~~~', res)
        this.courseLists = res;
      }, err => {
        console.log(err)
      })
    }else if(type == 'user'){
      this._service.getAllUsers(this.regionID)
      .subscribe((res:any) => {
        console.log('~~~', res)
        this.userLists = res;
      }, err => {
        console.log(err)
      })
    }else{

    }

    var $radioButtons = $('input[type="radio"]');    
    $radioButtons.each(function() {
        $(this).parent().toggleClass('radio-selected', this.checked);
    });
    
  }


  
}
