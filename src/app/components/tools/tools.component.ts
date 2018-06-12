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
	public locationId = '5b13c2bd693dfb588d34f9de';
  public isChecked: boolean = false;
  public categoryLists:any;
  public userLists:any;
  public courseLists:any;
  public dataLists:any;
  constructor(private _service: appService) { }

  ngOnInit() {
  }



  somethingChanged(type){
    console.log('what')
    this.isChecked = type;
    if(type == 'category'){
      this._service.getCategory(this.regionID)
      .subscribe((res:any) => {
        console.log('~~~', res.name)
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

  search = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    merge(this.focus$),
    merge(this.click$.pipe(filter(() => !this.instance.isPopupOpen()))),
    map(term => (term === '' ? this.dataLists
      : this.dataLists.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
  );
  

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

    if(data.type == 'category'){
      for (var i in this.categoryLists) {
        if (this.categoryLists[i].name == data.itemID) {
          console.log('....', this.categoryLists[i]);
          let temp = this.categoryLists[i];
          dataObj["id"] = temp._id
        }
      }
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
}
