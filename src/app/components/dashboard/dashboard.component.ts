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
  public showProvider:boolean = false;
  public online:any = {};
  public currency_symbol:any;
  public providers:any = {};
  public providerTemp:any = {};
  public providerArray:Array<any> = [];
  public newCurrency:any = {};
  public objectKeys: any;
  public selectedCurrency: any;
  public selectedProvider: any= '';
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
      this.providerTemp = this.paymentData.paymentProviders;      

      if(this.providerTemp.length > 0){
        this.providerArray= [];
        for(let j=0; j< this.providerTemp.length; j++){
          this.providerArray.push(this.providerTemp[j].name)
        }
      }else{
        this.providerArray = []
      }
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
    this.getCurrency();
    this.selectedCurrency = this.invoiceData.currencySign;
    this.selectedFlag = this.invoiceData.currencyCode;
    
    this.isOnline = (this.paymentData.paymentProviders.length > 0) ? true : false;
    if(this.isOnline == true){
      this._service.paymentProvider()
      .subscribe((res:any) => {
        console.log(res)
        this.providers = res;
      }, err => {
        console.log(err)
      })
    }
  }

  getCurrency(){
    this.objectKeys = Object.keys;
    this.currency_symbol = currency;
    var key, keys = Object.keys(this.currency_symbol);
    var n = keys.length;
    var newobj={}
    while (n--) {
      key = keys[n];
      this.newCurrency[key.toLowerCase()] = this.currency_symbol[key];
    }
    console.log(this.newCurrency)
  }

  search(val){
    console.log(this.newCurrency.hasOwnProperty(val))
    if(val.length > 0){
      if(this.newCurrency.hasOwnProperty(val)){
        var keyObj = val
        this.newCurrency = {[keyObj]: this.newCurrency[val]}      
      }
    }else{
      this.getCurrency();
    }
    
  }

  showCurrencyBox(type){
    console.log('hiii')
    if(type == 'currency'){
      this.showDropdown = true;
      this.getCurrency();
    }else{
      this.showProvider = true;
    }
  }

  closeBox(event) {
    console.log('~~~ :P')
    var parentWrap = event.path.filter(function(res){
      return res.className == "currency-wrap"
    })
    if(parentWrap.length == 0){
      this.showDropdown = false;
    }
  }

  closeProvider(event) {
    console.log('~~~ :P')
    var parentWrap = event.path.filter(function(res){
      return res.className == "current-currency d-flex justify-content-between"
    })
    if(parentWrap.length == 0){
      this.showProvider = false;
    }
  }

  removeTempData(id){
    let dataIndex;
    for(let x in this.providerTemp){
      if(this.providerTemp[x].id == id){
        dataIndex = x;
      }
    }
    this.providerTemp.splice(dataIndex,1);
    console.log(this.providerTemp);
    console.log(this.paymentData.paymentProviders);
    if(this.providerTemp == 0){
      this.payment = {}
    }
  }

  selectCurrency(data, key){
    console.log(key)
    console.log(data)
    this.selectedCurrency = data;
    this.selectedFlag = key;
  }

  selectProvider(id, name){
    console.log(id, '-' ,name)
    this.selectedProvider = name
    this.payment.name = name
  }

  updateInvoice(data, type){
    console.log(data)
    var body;
    data['currencyCode'] = this.selectedFlag;
    data['currencySign'] = this.selectedCurrency;
    if(type == 'invoice'){
      console.log('if')
      this.paymentData['currencyCode'] = this.selectedFlag;
      this.paymentData['currencySign'] = this.selectedCurrency;
      
      body = {
        'invoiceSettings': data,
        'paymentSettings': this.paymentData
      }
    }else{
      console.log('else')
      this.invoiceData['currencyCode'] = this.selectedFlag;
      this.invoiceData['currencySign'] = this.selectedCurrency;
      if(this.isOnline == true){
        console.log(this.payment)
        if(this.providerTemp.length > 0){
          console.log('no', this.providerTemp)
          data.paymentProviders = this.providerTemp;
        }else{
          if(this.payment.hasOwnProperty('name') == true){
            data.paymentProviders.push(this.payment);
          }else{
            data.paymentProviders = []
          }       
        }
      }else{
        data.paymentProviders = []
      }
      body = {
        'invoiceSettings': this.invoiceData,
        'paymentSettings': data
      }
    }
    
    console.log(body)
    this.blockUI.start('Loading...');
    this._service.updateInvoiceSetting(this.regionId, body)
    .subscribe((res:any) => {
      this.blockUI.stop();
      console.log(res)
      this.invoiceData = res.invoiceSettings;
      this.paymentData = res.paymentSettings;
      let currency = {
      'invCurrencyCode': res.invoiceSettings.currencyCode,
      'invCurrencySign': res.invoiceSettings.currencySign
    };
    console.log(currency);
    localStorage.setItem('currency',JSON.stringify(currency))
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
    this.selectedProvider= '';
    this.getInvoiceSetting('invoiceSettings')
    this.getPaymentSetting('paymentSettings')
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
    if(this.isOnline == true){
      this._service.paymentProvider()
      .subscribe((res:any) => {
        console.log(res)
        this.providers = res;
      }, err => {
        console.log(err)
      })
    }else{
      this.payment = {}
    }
  }
}
