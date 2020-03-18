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
import { appService } from '../../service/app.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment-timezone';
import * as currency from 'currency-symbol-map/map';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
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
    console.log('here in setting');
    // this.item = {
    //   name: '',
    //   timezone: '',
    //   url: '',
    //   logo: '',
    //   operatingHour: {
    //     start: {
    //       hr: '',
    //       min: '',
    //       meridiem: ''
    //     },
    //     end: {
    //       hr: '',
    //       min: '',
    //       meridiem: ''
    //     }
    //   },
    //   notificationSettings: {
    //     sendEmailNoti: null,
    //     sendAppNoti: null
    //   },
    //   journalApprove: ''
    // };

    // if (localStorage.getItem('locationId') == null) {
    //   console.log('hi');
    //   this.permissionType = [];
    //   this.checkPermission();
    //   localStorage.setItem('permission', JSON.stringify([]));
    // }
    // this.permissionSubscription = this._service.permissionList.subscribe(
    //   data => {
    //     if (this.router.url === '/dashboard') {
    //       this.permissionType = data;
    //       console.log(this.permissionType);
    //       this.checkPermission();
    //       localStorage.setItem('permission', JSON.stringify(data));
    //     }
    //   }
    // );

    // this.getInvoiceSetting('invoiceSettings');
    // console.log('invoice return');
    // this.getPaymentSetting('paymentSettings');
    // this.orgLogo = localStorage.getItem('OrgLogo');
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

  clickTab(type) {
    this.isEdit = false;
    this.isUrlEdit = false;
    this.menuType = type;
    this.cancel();
  }
  cancel() {
    this.option = '';
    this.payment = {};
    this.invoice = {};
    this.online = {};
    this.isOnline = false;
    this.selectedProvider = '';
    // this.providerField = [];
    // this.getInvoiceSetting('invoiceSettings');
    // this.getPaymentSetting('paymentSettings');
  }
}
