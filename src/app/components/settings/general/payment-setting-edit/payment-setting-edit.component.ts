import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ViewContainerRef,
  HostListener
} from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ISubscription } from 'rxjs/Subscription';
import { appService } from '../../../../service/app.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import * as moment from 'moment-timezone';
import * as currency from 'currency-symbol-map/map';

@Component({
  selector: 'app-schedule-setting-edit',
  templateUrl: './payment-setting-edit.component.html',
  styleUrls: [
    './payment-setting-edit.component.css',
    '../general-overview/general-overview.component.css'
  ]
})
export class PaymentSettingEditComponent implements OnInit {
  @ViewChild('fileLabel') elementView: ElementRef;
  @BlockUI('region-info') blockUIRegionInfo: NgBlockUI;
  @BlockUI('app-setting') blockUIAppSetting: NgBlockUI;
  @BlockUI('auto-enrol-setting') blockUIAutoEnrol: NgBlockUI;
  private permissionSubscription: ISubscription;
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
    operatingHour: {},
    notificationSettings: {},
    journalApprove: ''
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
  public CreEmail: any;
  public JourApp: any;
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
  public isAcceptPaynow = false;
  public isQRChanged = false;

  @BlockUI() blockUI: NgBlockUI;
  private isConnected;
  private isRegionLoading: boolean = false;
  private isAppLoading: boolean = false;
  public isNetwork: boolean;

  constructor(
    private _service: appService,
    public toastr: ToastrService,
    vcr: ViewContainerRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.option = 'Invoice';
    console.log('here in general');
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
      },
      notificationSettings: {
        sendEmailNoti: null,
        sendAppNoti: null
      },
      journalApprove: ''
    };
    console.log(localStorage.getItem('locationId'));
    console.log(this.router.url);
    if (localStorage.getItem('locationId') == null) {
      console.log('hi');
      this.permissionType = [];
      this.checkPermission();
      localStorage.setItem('permission', JSON.stringify([]));
    }
    this.permissionSubscription = this._service.permissionList.subscribe(
      data => {
        this.permissionType = data;
        console.log(this.permissionType);
        this.checkPermission();
        localStorage.setItem('permission', JSON.stringify(data));
      }
    );

    this.getInvoiceSetting('invoiceSettings');
    this.getPaymentSetting('paymentSettings');
    console.log('invoice return');
    this.orgLogo = localStorage.getItem('OrgLogo');
  }

  editSetting(type) {
    console.log('hi');
    this.isQRChanged = false;
    this.option = type;
    this.getCurrency();
    this.selectedCurrency = this.invoiceData.currencySign;
    this.selectedFlag = this.invoiceData.currencyCode;
    console.log(
      this.paymentData.paymentProviders.length,
      'this.paymentData.paymentProviders.length'
    );
    this.isOnline = this.paymentData.paymentProviders.length > 0 ? true : false;
    console.log(this.isOnline, 'this.isOnline');
    this.isAcceptPaynow = this.paymentData.acceptPayNow;
    this.qrURL = this.paymentData.payNowQr;
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

  goToSettings() {
    this.router.navigateByUrl('/settings');
  }

  checkPermission() {
    console.log(this.permissionType);
    this.generalSidebar = ['UPDATEREGIONALSETTINGS', 'UPDATEAPPSETTINGS'];

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

    if (this.generalSidebar.includes('UPDATEREGIONALSETTINGS')) {
      this.getAdministrator();
    } else if (this.generalSidebar.includes('UPDATEAPPSETTINGS')) {
      this.isModuleList();
    } else {
      console.log('permission deny');
    }
  }

  getPaymentSetting(type) {
    this._service.invoiceSetting(this.regionId, type).subscribe(
      (res: any) => {
        console.log(res);
        this.paymentData = res;
        this.editSetting('Payment');
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
      },
      err => {
        console.log(err);
      }
    );
  }

  enroll = 0;
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
          // notificationSettings: {sendEmailNoti: true, sendAppNoti: true}

          this.item.notificationSettings.sendAppNoti =
            res.notificationSettings.sendAppNoti != undefined
              ? res.notificationSettings.sendAppNoti
              : true;
          this.item.notificationSettings.sendEmailNoti =
            res.notificationSettings.sendEmailNoti != undefined
              ? res.notificationSettings.sendEmailNoti
              : true;
          console.log('zhazha', this.item.notificationSettings.sendEmailNoti);
          this.CreEmail = res.notificationSettings.sendEmailNoti;
          console.log('journal approve get test', res.journalApprove);
          this.item.journalApprove = res.journalApprove;
          this.JourApp = res.journalApprove;
          this.enroll = res.autoEnrolDay;
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

  selectCurrency(data, key) {
    console.log(key);
    console.log(data);
    this.selectedCurrency = data;
    this.selectedFlag = key;
  }

  search(val) {
    console.log(val);
    this.getCurrency();
    var words = this.objectKeys(this.newCurrency);
    const result = words.filter(word => word.includes(val));
    var tempObj = {};
    if (val.length > 0) {
      for (let index = 0; index < result.length; index++) {
        if (this.newCurrency.hasOwnProperty(result[index])) {
          var keyObj = result[index];
          tempObj[keyObj] = this.newCurrency[keyObj];
        }
      }
      this.newCurrency = tempObj;
    } else {
      this.getCurrency();
    }

    console.log(this.newCurrency.hasOwnProperty(val));
    // if (val.length > 0) {
    //   if (this.newCurrency.hasOwnProperty(val)) {
    //     var keyObj = val;
    //     this.newCurrency = { [keyObj]: this.newCurrency[val] };
    //   }
    // } else {
    //   this.getCurrency();
    // }
  }

  updateInvoice(data, type) {
    console.log(data);
    var body;
    if (this.selectedFlag === 'sgd') {
      this.selectedCurrency = 'S$';
    }
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

      var qrFormData = new FormData();
      qrFormData.append('acceptPayNow', JSON.stringify(this.isAcceptPaynow));
      if (this.isAcceptPaynow == true) {
        qrFormData.append('qrcode', this.getQR('qrURL'));
      }
    }

    console.log(body);
    //this.blockUI.start('Loading...');
    // this._service.updatePayNowPayment(this.regionId, paynowData).subscribe((res:any)=>{
    //   console.log(res)
    // });

    this._service.updateInvoiceSetting(this.regionId, body).subscribe(
      (res1: any) => {
        //this.blockUI.stop();
        console.error(res1);
        this._service
          .updatePayNowPayment(this.regionId, qrFormData)
          .subscribe((res2: any) => {
            console.log('*******', res2);
            this.invoiceData = res1.invoiceSettings;
            this.paymentData = res1.paymentSettings;
            let currency = {
              invCurrencyCode: res1.invoiceSettings.currencyCode,
              invCurrencySign: res1.invoiceSettings.currencySign
            };
            console.log(currency);
            localStorage.setItem('currency', JSON.stringify(currency));
            this.router.navigateByUrl('settings');
            // this.cancel();
          });
      },
      err => {
        //this.blockUI.stop();
        console.log(err);
      }
    );
  }

  getCurrency() {
    this.objectKeys = Object.keys;
    console.warn(Object.keys);
    this.currency_symbol = currency;
    var key,
      keys = Object.keys(this.currency_symbol);
    console.warn(keys, 'keys');
    var n = keys.length;
    var i = 0;
    var newobj = {};

    while (i <= n - 1) {
      key = keys[i];
      this.newCurrency[key.toLowerCase()] = this.currency_symbol[key];
      i++;
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
      var element = document.getElementById('notibar2');
      if (typeof element == 'undefined' || element == null) {
        $('.p-top').css({ 'padding-top': '0px' });
      }
      this.navIsFixed = true;
      this.isMidStick = false;
    } else {
      console.log('less than 15');
      this.navIsFixed = false;
    }
    this.isMidStick =
      window.pageYOffset > 45 && window.pageYOffset < 81 ? true : false;
  }

  getQR(url) {
    console.log(url, 'url');
    console.log('is qr change', this.isQRChanged);
    if (this.isQRChanged) {
      let logo = document.getElementById(url).getAttribute('src');

      return this.dataURItoBlob(logo);
    } else {
      return null;
    }
  }

  onlinePayment() {
    this.isOnline = !this.isOnline;
    if (this.isOnline == true) {
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

  qrURL: any;
  handleQRInput(files: FileList, $event) {
    this.isQRChanged = true;
    console.log('handleqrInput~~~');
    var qrPath;
    console.log(files);
    this.elementView.nativeElement.innerText = files[0].name;
    this.message = '';
    var qr = files.item(0);
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

    if (qr.size >= 1048576) {
      this.message = 'Upload image file size should not be exceed 1MB.';
    } else {
      qrPath = files;
      reader.readAsDataURL(files[0]);
      reader.onload = _event => {
        this.qrURL = reader.result;
      };
    }
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

  acceptPaynow() {
    this.isAcceptPaynow = !this.isAcceptPaynow;
  }

  dataURItoBlob(dataURI: String) {
    console.warn(dataURI, 'data uri');
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
}
