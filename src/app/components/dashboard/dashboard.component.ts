import {
  Component,
  OnInit,
  ViewContainerRef,
  HostListener,
  ViewChild,
  ElementRef,
  EventEmitter,
  Output,
  AfterViewInit
} from '@angular/core';
import { appService } from '../../service/app.service';
import {
  TimezonePickerService,
  Timezone
} from 'ng2-timezone-selector/timezone-picker.service';
import { TimezonePickerModule } from 'ng2-timezone-selector';
import { ToastsManager } from 'ng5-toastr/ng5-toastr';
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalRef
} from '@ng-bootstrap/ng-bootstrap';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { FormsModule, FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment-timezone';
import { Router } from '@angular/router';
import * as currency from 'currency-symbol-map/map';
// import currencyToSymbolMap from 'currency-symbol-map/map'
declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('fileLabel') elementView: ElementRef;
  @BlockUI('region-info') blockUIRegionInfo: NgBlockUI;
  @BlockUI('app-setting') blockUIAppSetting: NgBlockUI;
  public orgLogo;
  public srangeHr;
  public srangeMin;
  public sisSelected;
  public erangeHr;
  public erangeMin;
  public logo;
  public imagePath;
  public imgURL: any;
  public message: string;
  public eisSelected;

  public showFormat;
  public selectedHrRange;
  public selectedMinRange;
  public selected;
  public isChecked: boolean = true;
  public sprogressSlider: boolean = false;
  public eprogressslider: boolean = false;
  public regionId = localStorage.getItem('regionId');
  public token: any;
  public type: any;
  public admin: any;
  public permissionType: Array<any> = [];
  public navIsFixed: boolean = false;
  public isMidStick: boolean = false;
  public operationStart: any = '';
  public operationEnd: any = '';
  public item: any = {
    name: '',
    timezone: '',
    url: '',
    logo: '',
    operatingHour: {}
  };

  // public menuType:any = "location";

  public menuType: any = 'general';
  public checkedModule = [];
  public allModule;
  public emptyModule: boolean = false;
  public isEdit: boolean = false;
  public isUrlEdit: boolean = false;
  public temp: any;
  public urlTemp: any;
  public generalSidebar: any = [];
  public generalDemo: any = [];
  public locationSidebar: any = [];
  public customSidebar: any = [];
  public option: any;
  public invoice: any = {};

  public isOnline: boolean = false;
  public showDropdown: boolean = false;
  public showProvider: boolean = false;
  public online: any = {};
  public currency_symbol: any;
  public providers: any;
  public providerTemp: any = {};
  public providerArray: Array<any> = [];
  public newCurrency: any = {};
  public objectKeys: any;
  public selectedCurrency: any;
  public selectedProvider: any = '';
  public selectedFlag: any;
  public invoiceData: any = {
    companyName: '',
    address: '',
    email: '',
    prefix: '',
    currencySign: '',
    invoiceNote: ''
  };
  public payment: any = {};
  public paymentData: any = {
    tax: {
      rate: '',
      name: ''
    },
    paymentProviders: [
      {
        id: 0,
        name: ''
      }
    ],
    currencyCode: ''
  };
  public emptyPaymentData: boolean = false;
  public emptyInvoiceData: boolean = false;
  public startT: any;
  public endT: any;
  public flags = [
    'aed',
    'afn',
    'all',
    'amd',
    'ang',
    'aoa',
    'ars',
    'aud',
    'awg',
    'azn',
    'bam',
    'bbd',
    'bdt',
    'bgn',
    'bhd',
    'bif',
    'bmd',
    'bnd',
    'bob',
    'brl',
    'bsd',
    'btn',
    'bwp',
    'byn',
    'bzd',
    'cad',
    'cdf',
    'chf',
    'clp',
    'cny',
    'cop',
    'crc',
    'cup',
    'cve',
    'czk',
    'djf',
    'dkk',
    'dop',
    'dzd',
    'egp',
    'ern',
    'etb',
    'eur',
    'fjd',
    'fkp',
    'gbp',
    'gel',
    'ghs',
    'gip',
    'gmd',
    'gnf',
    'gtq',
    'gyd',
    'hkd',
    'hnl',
    'hrk',
    'htg',
    'huf',
    'idr',
    'ils',
    'inr',
    'iqd',
    'irr',
    'isk',
    'jmd',
    'jod',
    'jpy',
    'kes',
    'kgs',
    'khr',
    'kmf',
    'kpw',
    'krw',
    'kwd',
    'kyd',
    'kzt',
    'lak',
    'lbp',
    'lkr',
    'lrd',
    'ltl',
    'lyd',
    'mad',
    'mdl',
    'mga',
    'mkd',
    'mmk',
    'mnt',
    'mop',
    'mro',
    'mur',
    'mvr',
    'mwk',
    'mxn',
    'myr',
    'mzn',
    'nad',
    'ngn',
    'nio',
    'nok',
    'npr',
    'nzd',
    'omr',
    'pen',
    'pgk',
    'php',
    'pkr',
    'pln',
    'pyg',
    'qar',
    'ron',
    'rsd',
    'rub',
    'rwf',
    'sar',
    'sbd',
    'scr',
    'sek',
    'sgd',
    'shp',
    'sll',
    'sos',
    'srd',
    'std',
    'svc',
    'syp',
    'szl',
    'thb',
    'tjs',
    'tnd',
    'top',
    'try',
    'ttd',
    'twd',
    'tzs',
    'uah',
    'ugx',
    'usd',
    'uyu',
    'uzs',
    'vef',
    'vnd',
    'vuv',
    'wst',
    'xaf',
    'xcd',
    'xof',
    'xpf',
    'yer',
    'zar',
    'zmw'
  ];
  @BlockUI() blockUI: NgBlockUI;

  constructor(
    private _service: appService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    private router: Router
  ) {
    this.toastr.setRootViewContainerRef(vcr);
    window.scroll(0, 0);
  }

  ngOnInit() {
    this.item = {
      name: '',
      timezone: '',
      url: '',
      logo: '',
      operatingHour: {
        start: {
          hr: '',
          min: '',
          meridiem: ''
        },
        end: {
          hr: '',
          min: '',
          meridiem: ''
        }
      }
    };
    // this.c = 3+':'+20+' '+this.item.operatingHour.start.meridiem;

    if (localStorage.getItem('locationId') == null) {
      console.log('hi');
      this.permissionType = [];
      this.checkPermission();
      localStorage.setItem('permission', JSON.stringify([]));
    }
    this._service.permissionList.subscribe(data => {
      if (this.router.url === '/dashboard') {
        this.permissionType = data;
        console.log(this.permissionType);
        this.checkPermission();
        localStorage.setItem('permission', JSON.stringify(data));
      }
    });

    this.getInvoiceSetting('invoiceSettings');
    this.getPaymentSetting('paymentSettings');
    this.orgLogo = localStorage.getItem('OrgLogo');
  }

  // valueChanged() {
  //   this.valueChange.emit(this.counter);
  // }

  ngAfterViewInit() {
    // this.item.operatingHour = {
    //   'start':{
    //     'hr':0,
    //     'min':0,
    //     "meridiem":'AM'
    //   },
    //   'end':{
    //     'hr':0,
    //     'min':0,
    //     "meridiem":"PM"
    //   }
    // }
  }
  @HostListener('document:click', ['$event'])
  public test(event): void {
    if (this.showDropdown != true) {
      $('.currency-dropdown').css({ display: 'none' });
    } else {
      $('.currency-dropdown').css({ display: 'block' });
      $('.currency-dropdown').click(function(event) {
        event.stopPropagation();
      });
    }
    this.showDropdown = false;
    if (this.showProvider != true) {
      $('.payment-provider').css({ display: 'none' });
    } else {
      $('.payment-provider').css({ display: 'block' });
      $('.payment-provider').click(function(event) {
        event.stopPropagation();
      });
    }
    this.showProvider = false;
  }
  @HostListener('window:scroll', ['$event']) onScroll($event) {
    if (window.pageYOffset > 81) {
      console.log('greater than 40');
      this.navIsFixed = true;
      this.isMidStick = false;
    } else {
      console.log('less than 15');
      this.navIsFixed = false;
    }
    this.isMidStick =
      window.pageYOffset > 45 && window.pageYOffset < 81 ? true : false;
  }

  checkPermission() {
    console.log(this.permissionType);
    this.generalSidebar = ['UPDATEREGIONALSETTINGS', 'UPDATEAPPSETTINGS'];
    this.locationSidebar = ['ADDNEWLOCATION', 'EDITLOCATION', 'DELETELOCATION'];
    this.customSidebar = [
      'CREATECUSTOMFIELD',
      'VIEWCUSTOMFIELD',
      'EDITCUSTOMFIELD',
      'DELETECUSTOMFIELD'
    ];

    this.generalSidebar = this.generalSidebar.filter(
      value => -1 !== this.permissionType.indexOf(value)
    );

    this.generalDemo['regional'] = this.generalSidebar.includes(
      'UPDATEREGIONALSETTINGS'
    )
      ? 'UPDATEREGIONALSETTINGS'
      : '';
    this.generalDemo['appsetting'] = this.generalSidebar.includes(
      'UPDATEAPPSETTINGS'
    )
      ? 'UPDATEAPPSETTINGS'
      : '';

    this.locationSidebar = this.locationSidebar.filter(
      value => -1 !== this.permissionType.indexOf(value)
    );

    this.customSidebar = this.customSidebar.filter(
      value => -1 !== this.permissionType.indexOf(value)
    );

    console.log(this.customSidebar);

    if (this.generalSidebar.includes('UPDATEREGIONALSETTINGS')) {
      this.getAdministrator();
    } else if (this.generalSidebar.includes('UPDATEAPPSETTINGS')) {
      this.isModuleList();
    } else {
      console.log('permission deny');
    }
  }

  getAdministrator() {
    console.log('getAdministrator works');
    this.token = localStorage.getItem('token');
    this.type = localStorage.getItem('tokenType');
    this._service
      .getRegionalAdministrator(this.regionId, this.token, this.type)
      .subscribe(
        (res: any) => {
          console.log('res admin', res);
          this.admin = res;
          this.item.name = res.name;
          this.item.timezone = res.timezone;
          this.item.url = res.url;
          this.item.logo = res.logo;
          if (res.operatingHour == undefined) {
            this.item.operatingHour.start = { hr: 0, min: 0, meridiem: 'AM' };
            this.item.operatingHour.end = { hr: 0, min: 0, meridiem: 'PM' };
          } else {
            this.item.operatingHour = res.operatingHour;
          }
          console.log('~~~', this.item);
          localStorage.setItem('timezone', this.item.timezone);
          // let test=moment().tz("Singapore").format();
          // console.log(test)
          const offset = moment.tz('Asia/Singapore').utcOffset();
          console.log(offset);
        },
        err => {
          console.log(err);
        }
      );
  }

  getInvoiceSetting(type) {
    this._service.invoiceSetting(this.regionId, type).subscribe(
      (res: any) => {
        console.log(res);
        this.invoiceData = res;
        console.log('this.invoiceData', this.invoiceData);
        console.log(Object.keys(this.invoiceData).length);

        this.emptyInvoiceData =
          Object.keys(this.invoiceData).length == 0 ? true : false;

        if (Object.keys(this.invoiceData).length == 0) {
          this.invoiceData = {
            companyName: '',
            registration: '',
            address: '',
            city: '',
            email: '',
            prefix: '',
            currencySign: undefined,
            currencyCode: undefined
          };
        }
        this.autogrow();
      },
      err => {
        console.log(err);
      }
    );
  }

  getPaymentSetting(type) {
    this._service.invoiceSetting(this.regionId, type).subscribe(
      (res: any) => {
        console.log(res);
        this.paymentData = res;
        console.log('this.paymentData', this.paymentData);
        this.emptyPaymentData =
          Object.keys(this.paymentData).length == 0 ? true : false;

        if (Object.keys(this.paymentData).length == 0) {
          this.paymentData = {
            tax: {
              rate: '',
              name: ''
            },
            paymentProviders: [],
            currencyCode: undefined,
            currencySign: undefined
          };
        }

        this.providerTemp = this.paymentData.paymentProviders;
        console.log('provider Temp', this.providerTemp);
        if (this.providerTemp.length > 0) {
          this.providerArray = [];
          for (let j = 0; j < this.providerTemp.length; j++) {
            this.providerArray.push(this.providerTemp[j].name);
          }
        } else {
          this.providerArray = [];
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  isModuleList() {
    this._service.getAllModule(this.regionId).subscribe((res: any) => {
      this.allModule = res;
      if (this.allModule.length > 0) {
        this.emptyModule = false;
      } else {
        this.emptyModule = true;
      }
    });
  }

  chooseTimeOpt(type, type1) {
    if (type1 == 'start') {
      this.sisSelected = type;
    } else this.eisSelected = type;
    console.log(type);
  }
  durationProgress($event, type) {
    if (type == 'start') {
      this.sprogressSlider = true;
      this.eprogressslider = false;
    } else {
      this.sprogressSlider = false;

      this.eprogressslider = true;
    }
  }

  toDataUrl(url: any, id: any) {
    const xhr = new XMLHttpRequest();
    const ele = document.getElementById(id);
    console.log(ele);

    xhr.onload = function() {
      const reader = new FileReader();
      reader.onloadend = function() {
        ele.setAttribute('src', reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.onloadend = function() {
      console.log('loadend');
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }

  dataURItoBlob(dataURI: String) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI
      .split(',')[0]
      .split(':')[1]
      .split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }

  handleFileInput(files: FileList, $event) {
    console.log(files);
    this.elementView.nativeElement.innerText = files[0].name;
    this.message = '';
    this.logo = files.item(0);
    // this.item.logo = this.logo;
    const reader = new FileReader();

    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }

    if (this.logo.size >= 1048576) {
      this.message = 'Upload image file size should not be exceed 1MB.';
    } else {
      this.imagePath = files;
      reader.readAsDataURL(files[0]);
      reader.onload = _event => {
        this.imgURL = reader.result;
      };
    }
  }
  editRegion() {
    console.log(this.item);
    setTimeout(() => {
      console.log(document.getElementById('imgURL'));
      this.toDataUrl(this.item.logo, 'imgURL');
    }, 1000);
    this.imgURL = this.item.logo;
    this.isEdit = true;
    this.temp = this.item.timezone;
    // this.startT = this.getTwentyFourHourStartTime(this.item.operatingHour.start);
    // this.endT = this.getTwentyFourHourStartTime(this.item.operatingHour.end);
    // if (String(this.item.operatingHour.start.min).length == 1)
    //   this.startT = String(this.item.operatingHour.start.hr) + ":" + String("0" + this.item.operatingHour.start.min) + " " + this.item.operatingHour.start.meridiem;
    // else
    //   this.startT = String(this.item.operatingHour.start.hr) + ":" + String(this.item.operatingHour.start.min) + " " + this.item.operatingHour.start.meridiem;
    this.srangeHr = this.item.operatingHour.start.hr;
    this.srangeMin = this.item.operatingHour.start.min;
    this.sisSelected = this.item.operatingHour.start.meridiem;
    this.erangeHr = this.item.operatingHour.end.hr;
    this.erangeMin = this.item.operatingHour.end.min;
    this.eisSelected = this.item.operatingHour.end.meridiem;
    console.log(this.srangeHr, this.srangeMin, this.sisSelected);
    console.log(this.erangeHr, this.erangeMin, this.eisSelected);
    // this.endT = this.item.operatingHour.end.hr + String(this.item.operatingHour.end.min) + this.item.operatingHour.end.meridiem;
    // console.log(this.changeTime(this.startT))
    // console.log(this.changeTime(this.endT))

    console.log('--->', this.startT, this.endT);
    this.temp = this.item.timezone;
    // this.startT = this.getTwentyFourHourStartTime(this.item.operatingHour.start);
    // this.endT = this.getTwentyFourHourStartTime(this.item.operatingHour.end);
  }
  editUrl() {
    this.isUrlEdit = true;
    this.urlTemp = this.item.url;
  }
  validateTime(time) {
    var starTTemp = time.trim().split(':');
    console.log(starTTemp);
    if (starTTemp[0].length == 1) starTTemp[0] = '0' + starTTemp[0];
    if (starTTemp[1].length < 4) starTTemp[1] = '0' + starTTemp[1];
    return starTTemp;
  }

  getLogo() {
    let logo = document.getElementById('imgURL').getAttribute('src');

    return this.dataURItoBlob(logo);
  }

  updateRegionalInfo(data, type) {
    console.log(data, type);
    let regionalSettingFormData = new FormData();
    this.token = localStorage.getItem('token');
    this.type = localStorage.getItem('tokenType');
    var updateType = '';
    if (type == 'url') {
      console.log('url');
      updateType = 'url';
      console.log(data);
    } else if (type == 'timezone') {
      updateType = 'timezone';
      console.log('timezone');
      console.log(this.startT);
      let start = {
        hr: this.srangeHr,
        min: this.srangeMin,
        meridiem: this.sisSelected
      };
      this.item.operatingHour['start'] = start;
      let end = {
        hr: this.erangeHr,
        min: this.erangeMin,
        meridiem: this.eisSelected
      };
      this.item.operatingHour['end'] = end;
    }
    console.log('DATA~~~', data);
    if (updateType == 'url') {
      this.blockUIAppSetting.start('Updating regional setting...');
      regionalSettingFormData.append('url', data.url);
    } else {
      this.blockUIRegionInfo.start('Updating app setting...');
      regionalSettingFormData.append('name', data.name);
      regionalSettingFormData.append('timezone', data.timezone);
      regionalSettingFormData.append('url', data.url);
      regionalSettingFormData.append('logo', this.getLogo());
      regionalSettingFormData.append(
        'operatingHour',
        JSON.stringify(data.operatingHour)
      );
    }
    // console.log('DATA~~~', data);
    // regionalSettingFormData.append('name', data.name);
    // regionalSettingFormData.append('timezone', data.timezone);
    // regionalSettingFormData.append('url', data.url);
    // regionalSettingFormData.append('logo', this.getLogo());
    // regionalSettingFormData.append(
    //   'operatingHour',
    //   JSON.stringify(data.operatingHour)
    // );
    // console.log(regionalSettingFormData.get('name'));
    // console.log(regionalSettingFormData.get('timezone'));
    // console.log(regionalSettingFormData.get('url'));
    // console.log(regionalSettingFormData.get('logo'));
    // console.log(regionalSettingFormData.get('operatingHour'));

    setTimeout(() => {
      this._service
        .updateRegionalInfo(
          this.regionId,
          regionalSettingFormData,
          this.token,
          this.type
        )
        .subscribe(
          (res: any) => {
            if (updateType == 'url') {
              this.blockUIAppSetting.stop();
            } else {
              this.blockUIRegionInfo.stop();
            }
            this.toastr.success('Successfully Updated.');
            console.log('~~~', res);
            this.orgLogo = res.logo;
            localStorage.setItem('timezone', this.item.timezone);
            this.getAdministrator();
            if (type == 'timezone') {
              this.isEdit = false;
            } else if (type == 'url') {
              this.isUrlEdit = false;
            }
          },
          err => {
            console.log(err);
          }
        );
    }, 100);
  }

  cancelUpdate() {
    this.isEdit = false;
    this.item.timezone = this.temp;
  }
  closeEdit() {
    this.isUrlEdit = false;
    this.item.url = this.urlTemp;
  }

  clickTab(type) {
    this.isEdit = false;
    this.isUrlEdit = false;
    this.menuType = type;
    this.cancel();
  }

  editSetting(type) {
    console.log('hi');
    this.option = type;
    this.getCurrency();
    this.selectedCurrency = this.invoiceData.currencySign;
    this.selectedFlag = this.invoiceData.currencyCode;

    this.isOnline = this.paymentData.paymentProviders.length > 0 ? true : false;
    // if(this.isOnline == true){
    //   this.selectedProvider = this.paymentData.paymentProviders.name;
    // }
    if (this.isOnline == true && this.option == 'Payment') {
      this._service.paymentProvider().subscribe(
        (res: any) => {
          console.log(res);
          this.providers = res;
          if (this.providerTemp.length > 0) {
            for (var i = 0; i < this.providerTemp.length; i++) {
              for (var j = 0; j < this.providers.length; j++) {
                if (this.providerTemp[i].name == this.providers[j].name) {
                  // console.log("same provider name",Object.keys(this.providerTemp[i]));
                  for (var m in this.providers[j].requiredField) {
                    console.log('req', this.providers[j].requiredField[m]);
                    let reqName = this.providers[j].requiredField[m].name;
                    var reqVal = this.providerTemp[i][reqName];
                    console.log('req VAl', reqVal);
                    this.providers[j].requiredField[m].value = reqVal;
                    console.log(
                      'req field',
                      this.providers[j].requiredField[m]
                    );
                    // console.log(this.providerTemp[i].hasOwnProperty(reqName));
                    // if(this.providerTemp[i].hasOwnProperty(reqName) == true){

                    // }
                  }
                }
              }
            }
          }
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  getCurrency() {
    this.objectKeys = Object.keys;
    this.currency_symbol = currency;
    var key,
      keys = Object.keys(this.currency_symbol);
    var n = keys.length;
    var newobj = {};
    while (n--) {
      key = keys[n];
      this.newCurrency[key.toLowerCase()] = this.currency_symbol[key];
    }
    console.log(this.newCurrency);
  }

  search(val) {
    console.log(this.newCurrency.hasOwnProperty(val));
    if (val.length > 0) {
      if (this.newCurrency.hasOwnProperty(val)) {
        var keyObj = val;
        this.newCurrency = { [keyObj]: this.newCurrency[val] };
      }
    } else {
      this.getCurrency();
    }
  }

  showCurrencyBox(type, $event: Event) {
    $event.preventDefault();
    $event.stopPropagation();
    console.log('hiii');
    if (type == 'currency') {
      this.showDropdown = true;
      this.getCurrency();
    } else {
      this.showProvider = true;
    }
  }

  closeBox(event) {
    console.log('~~~ :P');
    var parentWrap = event.path.filter(function(res) {
      return res.className == 'currency-wrap';
    });
    if (parentWrap.length == 0) {
      this.showDropdown = false;
    }
  }

  closeProvider(event) {
    console.log('~~~ :P');
    var parentWrap = event.path.filter(function(res) {
      return res.className == 'current-currency d-flex justify-content-between';
    });
    if (parentWrap.length == 0) {
      this.showProvider = false;
    }
  }

  removeTempData(id) {
    let dataIndex;
    for (let x in this.providerTemp) {
      if (this.providerTemp[x].id == id) {
        dataIndex = x;
      }
    }
    this.providerTemp.splice(dataIndex, 1);
    console.log(this.providerTemp);
    console.log(this.paymentData.paymentProviders);
    if (this.providerTemp == 0) {
      this.payment = {};
    }
  }

  selectCurrency(data, key) {
    console.log(key);
    console.log(data);
    this.selectedCurrency = data;
    this.selectedFlag = key;
  }
  providerField = [];
  selectProvider(id, name) {
    console.log(id, '-', name);
    this.selectedProvider = name;
    this.payment.name = name;
    // this.providerField = [];
    // for(var i in this.providers){
    //   if(this.providers[i].name == this.selectedProvider){
    //     this.providerField = this.providers[i].requiredField;
    //   }
    // }
  }

  updateInvoice(data, type) {
    console.log(data);
    var body;
    data['currencyCode'] = this.selectedFlag;
    data['currencySign'] = this.selectedCurrency;
    if (type == 'invoice') {
      console.log('if');
      this.paymentData['currencyCode'] = this.selectedFlag;
      this.paymentData['currencySign'] = this.selectedCurrency;

      this.paymentData = this.emptyPaymentData == true ? {} : this.paymentData;
      console.log(this.paymentData);
      body = {
        invoiceSettings: data,
        paymentSettings: this.paymentData
      };
    } else {
      console.log('else');
      this.invoiceData['currencyCode'] = this.selectedFlag;
      this.invoiceData['currencySign'] = this.selectedCurrency;
      if (this.isOnline == true) {
        console.log(this.payment);
        if (this.providerTemp.length > 0) {
          console.log('no', this.providerTemp);
          for (var k = 0; k < this.providerTemp.length; k++) {
            for (var l = 0; l < this.providers.length; l++) {
              if (this.providerTemp[k].name == this.providers[l].name) {
                // console.log("same provider name",Object.keys(this.providerTemp[i]));
                for (var m in this.providers[l].requiredField) {
                  // console.log("req",this.providers[j].requiredField[m])
                  let reqName = this.providers[l].requiredField[m].name;
                  this.providerTemp[k][reqName] = this.providers[
                    l
                  ].requiredField[m].value;
                }
              }
            }
          }
          data.paymentProviders = this.providerTemp;
          console.log('Providers update', data.paymentProviders);
        } else {
          console.log('no provider at first', this.providerTemp);
          if (this.payment.hasOwnProperty('name') == true) {
            for (var i in this.providers) {
              if (this.providers[i].name == this.payment.name) {
                console.log('same name', this.payment);
                for (var j in this.providers[i].requiredField) {
                  console.log(
                    'provider field',
                    this.providers[i].requiredField[j]
                  );
                  this.payment[
                    this.providers[i].requiredField[j].name
                  ] = this.providers[i].requiredField[j].value;
                }
              }
            }
            data.paymentProviders.push(this.payment);
          } else {
            data.paymentProviders = [];
          }
        }
      } else {
        data.paymentProviders = [];
      }

      data['currencyCode'] = this.selectedFlag;
      data['currencySign'] = this.selectedCurrency;

      this.invoiceData = this.emptyInvoiceData == true ? {} : this.invoiceData;
      console.log(this.invoiceData);
      console.log(data);

      body = {
        invoiceSettings: this.invoiceData,
        paymentSettings: data
      };
    }

    console.log(body);
    this.blockUI.start('Loading...');
    this._service.updateInvoiceSetting(this.regionId, body).subscribe(
      (res: any) => {
        this.blockUI.stop();
        console.log(res);
        this.invoiceData = res.invoiceSettings;
        this.paymentData = res.paymentSettings;
        let currency = {
          invCurrencyCode: res.invoiceSettings.currencyCode,
          invCurrencySign: res.invoiceSettings.currencySign
        };
        console.log(currency);
        localStorage.setItem('currency', JSON.stringify(currency));
        this.cancel();
      },
      err => {
        this.blockUI.stop();
        console.log(err);
      }
    );
  }

  cancel() {
    this.option = '';
    this.payment = {};
    this.invoice = {};
    this.online = {};
    this.isOnline = false;
    this.selectedProvider = '';
    this.providerField = [];
    this.getInvoiceSetting('invoiceSettings');
    this.getPaymentSetting('paymentSettings');
  }

  numberOnly(event, type) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    if (event.target.value.search(/^0/) != -1) {
      event.target.value = '';
    }
  }
  onlinePayment() {
    this.isOnline = !this.isOnline;
    if (this.isOnline == true) {
      // this.providers = [
      //   {
      //     'id': 0,
      //     'logo': "/public/img/mc-payment-logo.png",
      //     'name': "MC Payment",
      //     'requiredField': [{name: "Mcptid", type: "string"}]
      //   },
      //   {
      //     'id': 1,
      //     'logo': "/public/img/mc-payment-logo.png",
      //     'name': "Test Payment",
      //     'requiredField': [{name: "MerchantID", type: "string"},{name: "APIKey", type: "string"}]
      //   }
      // ]
      this._service.paymentProvider().subscribe(
        (res: any) => {
          console.log(res);
          this.providers = res;
        },
        err => {
          console.log(err);
        }
      );
    } else {
      this.payment = {};
    }
  }
  getTwentyFourHourStartTime(obj) {
    console.log('time obj', obj);
    this.operationStart = obj.hr + ':' + obj.min + ' ' + obj.meridiem;
    var time = this.operationStart;
    if (time) {
      var hours = Number(time.match(/^(\d+)/)[1]);
      var minutes = Number(time.match(/:(\d+)/)[1]);
      var AMPM = time.match(/\s(.*)$/)[1];
      if (AMPM == 'PM' && hours < 12) hours = hours + 12;
      if (AMPM == 'AM' && hours == 12) hours = hours - 12;
      var sHours = hours.toString();
      var sMinutes = minutes.toString();
      if (hours < 10) sHours = '0' + sHours;
      if (minutes < 10) sMinutes = '0' + sMinutes;
      // this.startT= sHours + ":" + sMinutes;
      let t = sHours + ':' + sMinutes;
      return t;
    }
  }
  chooseEndOpt(type) {
    this.isChecked = type;
  }
  ChangedRangeValue(e, type, type1) {
    // console.log(e)
    if (type1 == 'start') {
      if (type == 'hr') {
        this.srangeHr = e;
        console.log('this.selectedHrRange', this.selectedHrRange);
      }
      if (type == 'min') {
        this.srangeMin = e;
        console.log('this.selectedMinRange', this.selectedMinRange);
      }
    } else {
      if (type == 'hr') {
        this.erangeHr = e;
        console.log('this.selectedHrRange', this.selectedHrRange);
      }
      if (type == 'min') {
        this.erangeMin = e;
        console.log('this.selectedMinRange', this.selectedMinRange);
      }
    }
  }
  editTime(hr, min, medrian) {
    console.log(hr, min, medrian);
    console.log(String(hr).length);
    console.log(String(min).length);
    if (String(hr).length == 1) {
      hr = '0' + String(hr);
    }
    if (String(min).length == 1) {
      min = '0' + String(min);
    }
    console.log('res', hr + ':' + min + ' ' + medrian);
    return hr + ':' + min + ' ' + medrian;
  }
  updateBtnDisabled() {
    return (
      new Date(
        'January 31 1980 ' +
          String(this.srangeHr) +
          ':' +
          String(this.srangeMin) +
          ':' +
          this.sisSelected
      ) >=
      new Date(
        'January 31 1980 ' +
          String(this.erangeHr) +
          ':' +
          String(this.erangeMin) +
          ':' +
          this.eisSelected
      )
    );
  }
  documentclick(event) {
    if (
      $(event.target).hasClass('timepicker') ||
      $(event.target)
        .parents()
        .hasClass('timepicker')
    ) {
      if (
        $(event.target).hasClass('stimepicker') ||
        $(event.target)
          .parents()
          .hasClass('stimepicker')
      ) {
        this.sprogressSlider = true;
        this.endT = this.editTime(
          this.erangeHr,
          this.erangeMin,
          this.eisSelected
        );
      } else if (
        $(event.target).hasClass('etimepicker') ||
        $(event.target)
          .parents()
          .hasClass('etimepicker')
      ) {
        this.eprogressslider = true;
        this.startT = this.editTime(
          this.srangeHr,
          this.srangeMin,
          this.sisSelected
        );
      }
    } else {
      this.endT = this.editTime(
        this.erangeHr,
        this.erangeMin,
        this.eisSelected
      );
      this.startT = this.editTime(
        this.srangeHr,
        this.srangeMin,
        this.sisSelected
      );
      this.sprogressSlider = false;
      this.eprogressslider = false;
    }
  }

  autogrow() {
    setTimeout(() => {
      let textArea = document.getElementById('settingInvNote');
      console.log(textArea);
      if (textArea != null) {
        textArea.style.overflow = 'hidden';
        textArea.style.height = 'auto';
        textArea.style.height = textArea.scrollHeight + 'px';
        console.log('textArea', textArea.style.height);
      }
    }, 1000);
  }
}
