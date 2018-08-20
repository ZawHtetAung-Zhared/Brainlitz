import { Component, OnInit, ViewContainerRef, HostListener } from '@angular/core';
import { appService } from '../../service/app.service';
import { TimezonePickerService, Timezone } from 'ng2-timezone-selector/timezone-picker.service';
import { TimezonePickerModule } from 'ng2-timezone-selector';
import { ToastsManager } from 'ng5-toastr/ng5-toastr';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { FormsModule, FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public regionId = localStorage.getItem('regionId');
  public token: any;
  public type: any;
  public admin: any;
  public navIsFixed: boolean = false;
  public item:any = {
    name: '',
    timezone: '',
    url: ''
  };
  // public menuType:any = "location";
  public menuType:any = "admin";
  public checkedModule =[];
  public allModule;
  public emptyModule:boolean = false;
  public isEdit:boolean = false;
  public isUrlEdit:boolean = false;
  @BlockUI() blockUI: NgBlockUI;

  constructor(private _service: appService, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.getAdministrator();
    this.isModuleList();
  }

  @HostListener('window:scroll', ['$event']) onScroll($event){
    if(window.pageYOffset > 10){
      console.log('greater than 30')
      this.navIsFixed = true;
    }else{
      console.log('less than 30')
      this.navIsFixed = false;
    }
  }

  getAdministrator(){
    this.token = localStorage.getItem('token');
    this.type = localStorage.getItem('tokenType');
	  this._service.getRegionalAdministrator(this.regionId, this.token, this.type)
    .subscribe((res:any) => {
      this.admin = res;
      this.item.name = res.name;
      this.item.timezone = res.timezone;
      this.item.url = res.url
      console.log('~~~', this.item)
      localStorage.setItem('timezone', this.item.timezone)
      // let test=moment().tz("Singapore").format();
      // console.log(test)
      const offset = moment.tz("Asia/Singapore").utcOffset();
      console.log(offset)
    }, err => {
      console.log(err)
    })
  }

  isModuleList(){
    this._service.getAllModule(this.regionId)
    .subscribe((res:any) => {
      this.allModule = res;
      if(this.allModule.length > 0){
        this.emptyModule = false;
      }else{
        this.emptyModule = true;
      }
    })
  }

  editRegion(){
    this.isEdit = true;
  }
  editUrl(){
    this.isUrlEdit = true;
  }
  back(){
    this.isEdit = false;
    this.isUrlEdit = false;
  }

  updateRegionalInfo(data,type){
    console.log(type);
    this.token = localStorage.getItem('token');
    this.type = localStorage.getItem('tokenType');
    console.log(data)
    this._service.updateRegionalInfo(this.regionId, data, this.token, this.type)
    .subscribe((res:any) => {
      this.toastr.success('Successfully Updated.');
      console.log('~~~', res)
      localStorage.setItem('timezone', this.item.timezone)
      this.getAdministrator();
      if(type=="timezone"){
        this.isEdit = false;
      }else if(type=="url"){
        this.isUrlEdit = false;
      }
    }, err => {
      console.log(err)
    })
  }

  cancelUpdate(){
    this.isEdit = false;
  }

  clickTab(type){
    this.menuType = type;
  }
}
