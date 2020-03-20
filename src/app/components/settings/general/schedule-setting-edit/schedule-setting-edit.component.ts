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
import {
  TimezonePickerService,
  Timezone
} from 'ng2-timezone-selector/timezone-picker.service';
import { TimezonePickerModule } from 'ng2-timezone-selector';
import { ToastrService } from 'ngx-toastr';
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
import { Observable } from 'rxjs/Observable';
import { Subscription, ISubscription } from 'rxjs/Subscription';
import { appService } from '../../../../service/app.service';
// import currencyToSymbolMap from 'currency-symbol-map/map'
declare var $: any;

@Component({
  selector: 'app-schedule-setting-edit',
  templateUrl: './schedule-setting-edit.component.html',
  styleUrls: [
    './schedule-setting-edit.component.css',
    '../general-overview/general-overview.component.css'
  ]
})
export class ScheduleSettingEditComponent implements OnInit {
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
  ) {
    window.scroll(0, 0);
    this.isConnected = Observable.merge(
      Observable.of(navigator.onLine),
      Observable.fromEvent(window, 'online').map(() => true),
      Observable.fromEvent(window, 'offline').map(() => false)
    );
    this.isConnected.subscribe(connection => {
      this.isNetwork = connection;
      if (!connection) {
        if (this.isRegionLoading) this.blockUIRegionInfo.stop();
        else if (this.isAppLoading) this.blockUIAppSetting.stop();
      } else {
        if (this.isRegionLoading)
          this.blockUIRegionInfo.start('Updating app setting...');
        else if (this.isAppLoading)
          this.blockUIAppSetting.start('Updating regional setting...');
      }
    });
  }

  ngOnInit() {
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
    this._service
      .getPermission(localStorage.getItem('locationId'))
      .subscribe((data: any) => {
        this.permissionType = data;
        console.log(this.permissionType);
        this.checkPermission();
        localStorage.setItem('permission', JSON.stringify(data));
      });
    this.getInvoiceSetting('invoiceSettings');
    console.log('invoice return');
    this.getPaymentSetting('paymentSettings');
    this.orgLogo = localStorage.getItem('OrgLogo');
  }

  ngOnDestroy() {
    // this.permissionSubscription.unsubscribe();
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
      this.editEnroll('value');
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
          console.log(this.enroll, 'enroll output');
          this.tempSchedule.enroll = this.enroll;
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

        this.tempSchedule.beforeD = this.invoiceData.beforeDue;
        this.tempSchedule.overD = this.invoiceData.overDue;

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

  //for Auto-enroll setting
  isEnrollEdit = false;
  enroll = 0;
  tempSchedule: any = {
    enroll: 0,
    beforeD: 0,
    overD: 0
  };
  isAuto = false;
  editEnroll(value) {
    if (this.enroll > 0) this.isAuto = true;
    else this.isAuto = false;
    this.isEnrollEdit = true;
    this.tempSchedule.enroll = this.enroll;
    this.tempSchedule.beforeD = this.invoiceData.beforeDue;
    this.tempSchedule.overD = this.invoiceData.overDue;
  }
  updateEnroll() {
    this.updateInvoice(this.invoiceData, 'invoice');
    let data = { autoEnrolDay: this.enroll };
    // this.blockUIAutoEnrol.start('Updating auto enrollment setting...');
    setTimeout(() => {
      this._service.setAutoEnrol(this.regionId, data).subscribe(
        (res: any) => {
          console.log(res);
          // this.blockUIAutoEnrol.stop();
          this.toastr.success('Successfully Updated.');
          this.goToSettings();
        },
        err => {
          console.log(err);
        }
      );
    }, 100);
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

  closeEnroll() {
    this.enroll = this.tempSchedule.enroll;
    this.invoiceData.beforeDue = this.tempSchedule.beforeD;
    this.invoiceData.overDue = this.tempSchedule.overD;
    this.isEnrollEdit = false;
  }
  autoEnrollSwitch() {
    this.isAuto = !this.isAuto;
    if (!this.isAuto) this.enroll = 0;
    else if (this.tempSchedule.enroll == 0) this.enroll = 30;
    else this.enroll = this.tempSchedule.enroll;
  }
  //end for Auto-enroll setting

  goToSettings() {
    this.router.navigateByUrl('/settings');
  }
}
