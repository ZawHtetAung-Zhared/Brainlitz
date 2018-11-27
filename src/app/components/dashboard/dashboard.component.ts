import { Component, OnInit, ViewContainerRef, HostListener } from '@angular/core';
import { appService } from '../../service/app.service';
import { TimezonePickerService, Timezone } from 'ng2-timezone-selector/timezone-picker.service';
import { TimezonePickerModule } from 'ng2-timezone-selector';
import { ToastsManager } from 'ng5-toastr/ng5-toastr';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { FormsModule, FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment-timezone';
import { Router } from '@angular/router';
import * as currency from 'currency-symbol-map/map';
// import currencyToSymbolMap from 'currency-symbol-map/map'

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
  public permissionType: Array<any> = [];
  public navIsFixed: boolean = false;
  public isMidStick: boolean = false;
  public item:any = {
    name: '',
    timezone: '',
    url: ''
  };
  // public menuType:any = "location";
  public menuType:any = "general";
  public checkedModule =[];
  public allModule;
  public emptyModule:boolean = false;
  public isEdit:boolean = false;
  public isUrlEdit:boolean = false;
  public temp:any;
  public urlTemp:any;  
  public generalSidebar:any = [];
  public generalDemo:any = [];
  public locationSidebar:any = [];
  public customSidebar:any = [];
  public option:any;
  public invoice:any = {};
  
  public isOnline:boolean = false;
  public showDropdown:boolean = false;
  public online:any = {};
  public currency_symbol:any;
  public newCurrency:any = {};
  public objectKeys: any;
  public selectedCurrency: any;
  public selectedFlag: any;
  public invoiceData: any ={
    "companyName" : "",
    "address" : "",
    "email" : "",
    "prefix"  : "",
    "currencySign"  : "",
  };
  public payment:any = {}
  public paymentData:any = {
    "tax": {
      "rate": "",
      "name": ""
    },
    "paymentProviders": [
      {
        "id": 0,
        "name": "",
        "Mcptid": ""
      }
    ],
    "currencyCode": ""
  };
  @BlockUI() blockUI: NgBlockUI;

  constructor(private _service: appService, public toastr: ToastsManager, vcr: ViewContainerRef, private router: Router) {
    this.toastr.setRootViewContainerRef(vcr);
    window.scroll(0,0);
  }

  ngOnInit() {
    if(localStorage.getItem('locationId') == null){
      console.log('hi')
      this.permissionType = [];
      this.checkPermission();
      localStorage.setItem('permission', JSON.stringify([]))
    }
    this._service.permissionList.subscribe((data) => {
      if(this.router.url === '/dashboard'){
        this.permissionType = data;
        console.log(this.permissionType)
        this.checkPermission();
        localStorage.setItem('permission', JSON.stringify(data))
      }
    });

    this.getInvoiceSetting('invoiceSettings')
    this.getPaymentSetting('paymentSettings')
  }

  @HostListener('window:scroll', ['$event']) onScroll($event){
    if(window.pageYOffset > 81){
      console.log('greater than 40')
      this.navIsFixed = true;
      this.isMidStick = false;
    }else{
      console.log('less than 15')
      this.navIsFixed = false;
    }
    this.isMidStick = (window.pageYOffset > 45 && window.pageYOffset < 81) ? true : false;
  }

  checkPermission(){
    console.log(this.permissionType)
    this.generalSidebar = ['UPDATEREGIONALSETTINGS', 'UPDATEAPPSETTINGS'];
    this.locationSidebar = ['ADDNEWLOCATION', 'EDITLOCATION', 'DELETELOCATION' ];
    this.customSidebar = ["CREATECUSTOMFIELD","VIEWCUSTOMFIELD","EDITCUSTOMFIELD","DELETECUSTOMFIELD"];

    this.generalSidebar = this.generalSidebar.filter(value => -1 !== this.permissionType.indexOf(value));

    this.generalDemo['regional'] = (this.generalSidebar.includes("UPDATEREGIONALSETTINGS")) ? 'UPDATEREGIONALSETTINGS' : '';
    this.generalDemo['appsetting'] = (this.generalSidebar.includes("UPDATEAPPSETTINGS")) ? 'UPDATEAPPSETTINGS' : '';
    

    this.locationSidebar = this.locationSidebar.filter(value => -1 !== this.permissionType.indexOf(value));
    
    this.customSidebar = this.customSidebar.filter(value => -1 !== this.permissionType.indexOf(value));

    console.log(this.customSidebar)

    if(this.generalSidebar.includes('UPDATEREGIONALSETTINGS')){
      this.getAdministrator();
    }else if(this.generalSidebar.includes('UPDATEAPPSETTINGS')){
      this.isModuleList(); 
    }else{
      console.log('permission deny')
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

  getInvoiceSetting(type){
    this._service.invoiceSetting(this.regionId, type)
    .subscribe((res:any) => {
      console.log(res)
      this.invoiceData = res;
    }, err => {
      console.log(err)
    })
  }

  getPaymentSetting(type){
    this._service.invoiceSetting(this.regionId, type)
    .subscribe((res:any) => {
      console.log(res)
      this.paymentData = res;
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
    this.temp = this.item.timezone;
    console.log(this.temp);
  }
  editUrl(){
    this.isUrlEdit = true;
    this.urlTemp = this.item.url;
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
    this.item.timezone = this.temp;
  }
  closeEdit(){
    this.isUrlEdit = false;
    this.item.url = this.urlTemp
  }

  clickTab(type){
    this.menuType = type;
    this.cancel();
  }

  editSetting(type){
    console.log('hi')
    this.option = type;
    // var data = require('currency-codes/data');
    console.log(currency)
    this.objectKeys = Object.keys;
    console.log(this.objectKeys)
    this.currency_symbol = currency;
    // console.log(Object.keys(this.currency_symbol));
    var key, keys = Object.keys(this.currency_symbol);
    var n = keys.length;
    var newobj={}
    while (n--) {
      key = keys[n];
      this.newCurrency[key.toLowerCase()] = this.currency_symbol[key];
    }
    console.log(this.newCurrency)
  }

  showCurrencyBox(){
    this.showDropdown = true;
  }

  selectCurrency(data, key){
    console.log(data)
    this.selectedCurrency = data;
    this.selectedFlag = key;
  }

  updateInvoice(data){
    let body = {
      'invoiceSettings': data
    }
    console.log(body)
    this.blockUI.start('Loading...');
    this._service.updateInvoiceSetting(this.regionId, body)
    .subscribe((res:any) => {
      this.blockUI.stop();
      console.log(res)
      this.invoiceData = res.invoiceSettings;
      this.cancel();
    }, err => {
      this.blockUI.stop();
      console.log(err)
    })
  }

  cancel(){
    this.option = '';
    this.payment = {};
    this.invoice = {};
    this.online = {};
    this.isOnline = false;
  }

  numberOnly(event, type){
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    if(event.target.value.search(/^0/) != -1){
      event.target.value = '';  
    }
  }

  onlinePayment(){
    this.isOnline = !this.isOnline;
  }
}
