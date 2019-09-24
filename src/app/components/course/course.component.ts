import { InvoiceComponent } from './../invoice/invoice.component';
import {
  Component,
  OnInit,
  ViewContainerRef,
  HostListener,
  Inject,
  AfterViewInit,
  ViewChildren,
  QueryList
} from '@angular/core';
import { appService } from '../../service/app.service';
import { DataService } from '../../service/data.service';
import { Router } from '@angular/router';
import {
  NgbModal,
  ModalDismissReasons,
  NgbDatepickerConfig,
  NgbCalendar,
  NgbDateStruct
} from '@ng-bootstrap/ng-bootstrap';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastsManager } from 'ng5-toastr/ng5-toastr';
import { DOCUMENT } from '@angular/platform-browser';
import * as moment from 'moment-timezone';
import { DatePipe } from '@angular/common';
import { cloneWithOffset } from 'ngx-bootstrap/chronos/units/offset';
import { last } from 'rxjs/operator/last';
import { ArrayType } from '@angular/compiler/src/output/output_ast';
import { isDate } from 'moment';
import { EmitterVisitorContext } from '@angular/compiler';
import { FlexiComponent } from '../flexi/flexi.component';
import { start } from 'repl';

// import { start } from 'repl';
declare var $: any;

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  providers: [NgbDatepickerConfig]
})
export class CourseComponent implements OnInit {
  @ViewChildren(FlexiComponent) private FlexiComponent: QueryList<
    FlexiComponent
  >;
  // @ViewChild('childComponent') FlexiComponent;

  courseList: Array<any> = [];
  code: any;
  public makeupLists = [];
  public reasonValue: any;
  public textAreaOption = false;
  public attendenceButton: any;
  public optionBox: any = false;
  public stdLists: Array<any> = [];
  public searching: boolean = false;
  public yPosition: any;
  public singleUserData: any = '';
  public makeupForm: any = {};
  public showStudentOption: any = '';
  public xxxhello: any = '';
  public currentDateObj: any = '';
  public isvalid: boolean = false;
  public isGlobal: boolean = false;
  public searchMore: boolean = false;
  public hideSearch: boolean = false;
  public isvalidID: any = '';
  public categoryList: any;
  public planList: any;
  public courseVal: any = {};
  public minDate: any;
  public maxDate: any;
  public recentLists: Array<any> = [];
  public tempCategory: Array<any> = [];
  public tempPlan: Array<any> = [];
  public planIDArray: Array<any> = [];
  public categoryIDArray: Array<any> = [];
  public startTime: boolean = false;
  public endTime: boolean = false;
  public isChecked: any;
  public isEndChecked: any;
  public timeFrame: Array<any> = ['AM', 'PM'];
  public rangeHr;
  public rangeMin;
  public rangeEndHr;
  public rangeEndMin;
  public selectedHrRange: any;
  public selectedMinRange: any;
  public selectedEndHrRange: any;
  public selectedEndMinRange: any;
  public timeRange: any;
  public showStartFormat: any;
  public showEndFormat: any;
  public start24HourFormat: any;
  public end24HourFormat: any;
  public repeatedDaysTemp: Array<any> = [];
  public daysLoop: any;
  public studentArray = [];
  public days = [
    { day: 'Sun', val: 0, checked: false },
    { day: 'Mon', val: 1, checked: false },
    { day: 'Tue', val: 2, checked: false },
    { day: 'Wed', val: 3, checked: false },
    { day: 'Thu', val: 4, checked: false },
    { day: 'Fri ', val: 5, checked: false },
    { day: 'Sat', val: 6, checked: false }
  ];
  public advancedSearchOn: boolean = false;
  public iswordcount: boolean = false;
  public iscourseSearch: boolean = false;
  public categorySearch: boolean = false;
  public planSearch: boolean = false;
  public searchVal: any = '';
  public searchObj: any = '';
  public simple: boolean = false;
  public advance: boolean = false;
  public isAdvancedSearch: boolean = false;
  public isSeatAvailable: boolean = true;
  emptyCourse: boolean = false;
  activeToday: boolean = false;
  todayIndex: any = '';
  isCourseCreate: boolean = false;
  isCategory: boolean = false;
  isPlan: boolean = false;
  isFous: boolean = false;
  isCourseDetail: boolean = false;
  isCoursePlanDetail: boolean = false;
  singlePlanData: any = {};
  public formData: any = {};
  public userLists: any = [];
  public detailLists: any = {};
  public activeCourseInfo: any = {};
  public todayDate: any;
  public LASD: any; //lastActiveStartDate
  public custDetail: any = {};
  public courseInfo: any = {};
  public momentTodayDate: any;
  public showCancelButton: boolean = false;
  public lastActiveStartDate: any;
  public disableCancel: boolean = false;
  public cancelUi: boolean = false;
  public cancelUItext: any;
  public cancelUI: boolean = false;
  public presentStudent: number = 0;
  public absentStudent: number = 0;
  public noStudent: number = 0;
  public selectedUserLists: any = [];
  public selectedTeacherLists: any = [];
  public trArrayLists: any = [];
  public selectedUserId: any = [];
  public locationName: any;
  public courseId: any;
  public locationId: any;
  public userType: any;
  public deleteId: any = {};
  public modalReference: any;
  public regionId = localStorage.getItem('regionId');
  public locationID = localStorage.getItem('locationId');
  // public currency:any = {};
  public currency = JSON.parse(localStorage.getItem('currency'));
  public invCurrency: any = {};
  public pplLists: any;
  public apgLists: any = {};
  public removeUser: any;
  public currentCourse: any;
  public activeTab: any = '';
  public activeUserTab: any = '';
  public result: any;
  isSticky: boolean = false;
  showBtn: boolean = false;
  @BlockUI() blockUI: NgBlockUI;
  public goBackCat: boolean = false;
  public permissionType: any;
  public coursePermission: any = [];
  public courseDemo: any = [];
  public editplanId: any;
  public planCategory: any;
  showList: boolean = false;

  public grade = 1;
  public draft: boolean;
  public selectedCustomer: any = {};
  public showInvoice: boolean = false;
  public logo: any = localStorage.getItem('OrgLogo');
  public showBox: boolean = false;
  public discount: number;
  public value: any = {};
  public showMailPopup: boolean = false;
  public invoiceInfo: any = {};
  public invoice: any;
  public updatedDate;
  public dueDate;
  public invoiceID;
  public invoiceID2;
  public showPayment: boolean = false;
  public selectedPayment: any;
  public paymentItem: any = {};
  public invoiceCourse: any = {};
  public feesBox: boolean = false;
  public depositBox: boolean = false;
  public regBox: boolean = false;
  public prefixInvId: any;
  public token: any;
  public type: any;
  public paymentProviders: any;
  public refInvID: any;
  public invTaxName: any;
  public hideReg: boolean = false;
  public hideDeposit: boolean = false;
  public total: number;
  public singleInv: any = [];
  public isEditInv: any = false;
  public updateInvData: any = {};
  public hideMisc: boolean = false;
  public availableCourses: any = [];
  public isACSearch: boolean = false;
  public acWord: any;
  public userid: any;
  public acResult: any;
  public searchData: any = {};
  public paymentId: any;
  public showPaidInvoice: boolean = false;
  public invPayment = [];
  public invStatus: any;
  public noSetting: boolean = false;
  public isoutSideClick: boolean = false;
  public courseType: any;
  //start fley
  public flexyarr = [];
  idarr: any = [];
  conflictObj: any = [];
  tempObj: any = [];
  dataObj: any = [];
  flexiTemp: any = [];
  checkobjArr: any = [];
  public disabledTab: boolean = true;
  tempCourdeId: any;
  tempuserType: any;
  showcb: boolean = false;
  showcb_reschedule: boolean = false;
  isProrated: boolean = false;
  public showflexyCourse: boolean = false;
  public isDisabledBtn = false;

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private router: Router,
    private _service: appService,
    public dataservice: DataService,
    private modalService: NgbModal,
    public toastr: ToastsManager,
    public vcr: ViewContainerRef,
    config: NgbDatepickerConfig,
    calendar: NgbCalendar
  ) {
    this.toastr.setRootViewContainerRef(vcr);
    this._service.goCourseCreate.subscribe(() => {
      this.courseList = [];
      console.log('go to cc');
      this.courseList = [];
      this.isCategory = false;
      this.isPlan = false;
      this.goBackCat = false;
      this.isCourseCreate = true;
      window.scroll(0, 0);
    });

    this._service.goplan.subscribe(() => {
      this.courseList = [];
      console.log('muuuu');
      this.courseList = [];
      this.isCategory = false;
      this.isPlan = true;
      this.goBackCat = true;
    });

    this._service.goCat.subscribe(() => {
      this.courseList = [];
      console.log('goback22', this.goBackCat);
      this.goBackCat = false;
      this.isCategory = true;
      this.isPlan = false;
      this.courseList = [];
    });

    this._service.goCourse.subscribe(() => {
      console.log('goback33 in course');
      this.isCategory = false;
      this.isPlan = false;
      this.goBackCat = false;
      this.isCourseCreate = false;
      this.courseList = [];
      console.log(this.courseList.length);
    });

    this._service.goCourseDetail.subscribe(() => {
      console.log('go back CDetail', this.courseId);
      this.isCategory = false;
      this.isPlan = false;
      this.goBackCat = false;
      this.isCourseCreate = false;
      this.isCourseDetail = true;
      this.showCourseDetail(this.courseId);
      this.courseList = [];
    });

    this._service.goPlanDetail.subscribe(() => {
      console.log('go back PlanDetail', this.courseId);
      this.isCategory = false;
      this.isPlan = false;
      this.goBackCat = false;
      this.isCourseCreate = false;
      this.isCoursePlanDetail = false;
      this.getCoursePlanDetail(this.editplanId, 'goback');
      this.courseList = [];
    });

    // this.dataservice.cId.subscribe((cId)=>{
    //   console.log("cid~~",cId)
    //   this.courseId = cId
    //   console.log("go to CDetail",this.courseId);
    //   this.isCategory = false;
    //   this.isPlan = false;
    //   this.goBackCat = false;
    //   this.isCourseCreate = false;
    //   this.isCourseDetail = true;
    //   this.showCourseDetail(this.courseId);
    //   this.courseList = []
    // })
  }
  cID: string;
  ngOnInit() {
    // this.courseId = localStorage.getItem("userCourse");
    this.dataservice.currentCourse.subscribe(cID => (this.cID = cID));
    if (this.cID != '') {
      setTimeout(() => {
        this.showCourseDetail(this.cID);
      }, 300);
    }

    this.dataservice.cId.subscribe(cid => (this.courseId = cid));
    if (this.courseId != '') {
      setTimeout(() => {
        this.showCourseDetail(this.courseId);
      }, 300);
    }
    let recentTemp = localStorage.getItem('recentSearchLists');
    // this.recentLists = localStorage.getItem('recentSearchLists')
    // console.log(this.recentLists)
    this.recentLists = recentTemp == null ? [] : JSON.parse(recentTemp);
    localStorage.removeItem('categoryID');
    localStorage.removeItem('categoryName');
    setTimeout(() => {
      console.log('~~~', this.locationName);
      this.locationName = localStorage.getItem('locationName');
      this.locationID = localStorage.getItem('locationId');
    }, 300);
    this.activeTab = 'People';

    this._service.permissionList.subscribe(data => {
      if (this.router.url === '/course') {
        this.permissionType = data;
        this.checkPermission();
      }
    });

    this.discount = 0;
    this.selectedPayment = 'Cash';

    this.getRegionInfo();
  }

  openDatePicker(datePicker) {
    datePicker.open();
  }
  // closeDatePicker(datePicker){
  //   datePicker.close();
  // }
  closefix(event, datePicker) {
    if (event.target.offsetParent == null) datePicker.close();
    else if (event.target.offsetParent.nodeName != 'NGB-DATEPICKER')
      datePicker.close();
  }

  checkPermission() {
    console.log(this.permissionType);
    this.coursePermission = [
      'CREATECOURSE',
      'VIEWCOURSE',
      'EDITCOURSE',
      'DELETECOURSE',
      'ASSIGNTEACHER',
      'ASSIGNSTUDENTS',
      'CREATECOURSEPLAN',
      'VIEWCOURSEPLAN',
      'EDITCOURSEPLAN'
    ];
    this.coursePermission = this.coursePermission.filter(
      value => -1 !== this.permissionType.indexOf(value)
    );
    console.log(this.coursePermission.includes('VIEWCOURSE'));

    this.courseDemo['addCourse'] = this.coursePermission.includes(
      'CREATECOURSE'
    )
      ? 'CREATECOURSE'
      : '';
    this.courseDemo['viewCourse'] = this.coursePermission.includes('VIEWCOURSE')
      ? 'VIEWCOURSE'
      : '';
    this.courseDemo['editCourse'] = this.coursePermission.includes('EDITCOURSE')
      ? 'EDITCOURSE'
      : '';
    this.courseDemo['deleteCourse'] = this.coursePermission.includes(
      'DELETECOURSE'
    )
      ? 'DELETECOURSE'
      : '';
    this.courseDemo['assignTeacher'] = this.coursePermission.includes(
      'ASSIGNTEACHER'
    )
      ? 'ASSIGNTEACHER'
      : '';
    this.courseDemo['assignStudent'] = this.coursePermission.includes(
      'ASSIGNSTUDENTS'
    )
      ? 'ASSIGNSTUDENTS'
      : '';
    this.courseDemo['createCP'] = this.coursePermission.includes(
      'CREATECOURSEPLAN'
    )
      ? 'CREATECOURSEPLAN'
      : '';
    this.courseDemo['viewCP'] = this.coursePermission.includes('VIEWCOURSEPLAN')
      ? 'VIEWCOURSEPLAN'
      : '';
    this.courseDemo['editCP'] = this.coursePermission.includes('EDITCOURSEPLAN')
      ? 'EDITCOURSEPLAN'
      : '';

    if (this.coursePermission.includes('VIEWCOURSE') != false) {
      this.locationName = localStorage.getItem('locationName');
      this.locationID = localStorage.getItem('locationId');
      console.log('hi permission', this.locationName, this.locationID);
      // this.getCPlanList(0,20);
      this.courseList = [];
      this.getCourseLists(20, 0);
    } else {
      console.log('permission deny');
      this.courseList = [];
    }
  }

  ngAfterViewInit() {
    console.log('AfterViewInit');
    this.detailLists = {
      paymentPolicy: {
        courseFee: '',
        miscFee: '',
        deposit: { amount: '' },
        proratedLessonFee: ''
      },
      location: {
        name: ''
      },
      duration: {
        startDate: '',
        endDate: ''
      },
      repeatDays: [],
      coursePlan: {
        name: '',
        seats: ''
      }
    };

    this.pplLists = {
      CUSTOMER: [{}],
      TEACHER: [
        {
          preferredName: ''
        }
      ],
      STAFF: [{}]
    };
    this.userLists = [{}];

    this.invoiceInfo = {
      companyName: '',
      tax: {
        name: ''
      },
      registration: ''
    };

    this.paymentProviders = '';

    this.invCurrency = {
      sign: ''
    };
  }

  @HostListener('window:scroll', ['$event']) onScroll($event) {
    if (window.pageYOffset > 81) {
      this.isSticky = true;

      this.showBtn = true;
    } else {
      this.isSticky = false;
      this.showBtn = false;
    }
  }

  @HostListener('document:click', ['$event'])
  public test(event): void {
    // for category Search
    if (this.categorySearch != true) {
      $('.data-dropbox').css({ display: 'none' });
    } else {
      $('.data-dropbox').css({ display: 'block' });
      $('.data-dropbox').click(function(event) {
        event.stopPropagation();
      });
      this.categorySearch = false;
    }
    // for plan search
    if (this.planSearch != true) {
      $('.hide-dropbox').css({ display: 'none' });
    } else {
      $('.hide-dropbox').css({ display: 'block' });
      $('.hide-dropbox').click(function(event) {
        event.stopPropagation();
      });
      this.planSearch = false;
    }
    // for start time
    if (this.startTime != true) {
      $('.duration-progress').css({ display: 'none' });
    } else {
      $('.duration-progress').css({ display: 'block' });
      $('.duration-progress').click(function(event) {
        event.stopPropagation();
      });
      this.startTime = false;
    }
    // for end time
    if (this.endTime != true) {
      $('.end-duration-progress').css({ display: 'none' });
    } else {
      $('.end-duration-progress').css({ display: 'block' });
      $('.end-duration-progress').click(function(event) {
        event.stopPropagation();
      });
      this.endTime = false;
    }
    // For student option box
    if (this.optionBox != true) {
      $('.options-box').css({ display: 'none' });
    } else {
      $('.options-box').css({ display: 'block' });
      $('.options-box').click(function(event) {
        event.stopPropagation();
      });
      this.optionBox = false;
    }

    // if(this.attdBox != true){
    //   $('.att-box').css({ 'display': "none" });
    // }else{
    //   $('.att-box').css({ 'display': "block" });
    //   $('.att-box').click(function (event) {
    //     event.stopPropagation();
    //   })
    //   this.attdBox = false;
    // }
  }

  // @HostListener('document:click', ['$event']) clickedOutside($event){

  //   console.log($event);
  //    // here you can hide your menu
  //    this.xxxhello = '';
  //    console.log("CLICKED OUTSIDE");
  //  }

  //for attendance
  closeDropdown(e, type) {
    var divToHide = document.getElementById('divToHide');
    if (e.target.parentNode != null) {
      if (e.target.parentNode.id != 'divToHide') {
        this.attdBox = false;
      }
    }
  }

  //start course search

  focusCourseSearch() {
    // console.log('focusing ...');
    this.iscourseSearch = true;
    this.isoutSideClick = false;
  }
  focusOut() {
    // console.log('focusout : called');
    this.iscourseSearch = false;
  }

  //if searching click the overlay
  clickoutSide() {
    this.isoutSideClick = true;
    this.iscourseSearch = false;
  }

  hideCourseSearch() {
    console.log(this.iswordcount);
    // this.iswordcount = true;
    if (this.iswordcount != true) {
      this.iscourseSearch = false;
    }
    this.isAdvancedSearch = false;
  }

  cancelAS() {
    console.log('close');
    this.isAdvancedSearch = false;
    this.clearSearch();
  }

  clearSearch() {
    console.log('clear');
    this.hideSearch = false;
    this.searchVal = '';
    this.iswordcount = false;
    this.iscourseSearch = false;
    this.advancedSearchOn = false;
    this.searchMore = false;
    this.courseList = [];
    this.resetAS();
    this.getCourseLists(20, 0);
  }

  getAllCategories(limit, skip) {
    this.blockUI.start('Loading...');
    this._service
      .getCategory(this.regionId, limit, skip)
      .subscribe((res: any) => {
        setTimeout(() => {
          this.blockUI.stop(); // Stop blocking
        }, 300);
        this.categoryList = res;
        console.log(res);
      });
  }

  dropDown1($event: Event, state) {
    $event.preventDefault();
    $event.stopPropagation();
    console.log('000', state);
    if (state == 'category') {
      if (this.categorySearch) {
        this.categorySearch = false;
      } else {
        this.categorySearch = true;
        this.planSearch = false;
      }
    } else {
      if (this.planSearch) {
        this.planSearch = false;
      } else {
        this.planSearch = true;
        this.categorySearch = false;
      }
    }
    // this.categorySearch = (state == 'category') ? !this.categorySearch : false;
    // this.planSearch = (state == 'plan') ? !this.planSearch : false;
  }

  dropDown($event: Event, state) {
    $event.preventDefault();
    $event.stopPropagation();
    console.log('000');
    if (state == 'category') {
      this.categorySearch = true;
    } else {
      this.planSearch = true;
    }
    // this.categorySearch = (state == 'category') ? !this.categorySearch : false;
    // this.planSearch = (state == 'plan') ? !this.planSearch : false;
  }

  // dropDown($event: Event, state){
  //   $event.preventDefault();
  //   $event.stopPropagation();
  //   console.log('000')
  //   this.dropMenuShow = (state == 'profile') ? !this.dropMenuShow : false;
  //   this.locationDpShow = (state == 'loc') ? !this.locationDpShow : false;
  // }

  searchCourse(val) {
    // this.courseVal = val
    if (val.length > 0) {
      this.iswordcount = true;
    } else {
      this.iswordcount = false;
      this.courseList = [];
      setTimeout(() => {
        this.getCourseLists(20, 0);
      }, 300);
    }
  }

  selectedList(obj, state) {
    let temp = {
      name: obj.name,
      id: obj._id
    };
    if (state == 'plan') {
      this.tempPlan.push(temp);
      this.planIDArray.push(obj._id);
    } else {
      this.tempCategory.push(temp);
      this.categoryIDArray.push(obj._id);
    }
    console.log(this.tempCategory);
    console.log(this.planIDArray);
    console.log(this.tempPlan);
  }

  removeTempData(id, state) {
    console.log('remove list ..', id);
    let dataIndex;
    if (state == 'category') {
      for (let x in this.tempCategory) {
        if (this.tempCategory[x].id == id) {
          dataIndex = x;
        }
      }
      this.tempCategory.splice(dataIndex, 1);
      console.log(this.tempCategory);
      if (this.tempCategory.length > 0) {
        this.categoryIDArray = [];
        for (let j = 0; j < this.tempCategory.length; j++) {
          this.categoryIDArray.push(this.tempCategory[j].id);
        }
      } else {
        this.categoryIDArray = [];
      }

      console.log(this.categoryIDArray);
    } else if (state == 'plan') {
      for (let x in this.tempPlan) {
        if (this.tempPlan[x].id == id) {
          dataIndex = x;
        }
      }
      this.tempPlan.splice(dataIndex, 1);
      console.log(this.tempPlan);
      if (this.tempPlan.length > 0) {
        this.planIDArray = [];
        for (let j = 0; j < this.tempPlan.length; j++) {
          this.planIDArray.push(this.tempPlan[j].id);
        }
      } else {
        this.planIDArray = [];
      }

      console.log(this.planIDArray);
    } else {
      for (let x in this.days) {
        if (this.days[x].val == id) {
          this.days[x].checked = !this.days[x].checked;
        }
      }
      // this.days.splice(dataIndex,1);
      console.log(this.days);
    }
  }

  setMinDate(event) {
    this.minDate = event;
    // this.isvalid = (this.minDate!= undefined && this.maxDate != undefined && this.start24HourFormat != undefined && this.end24HourFormat != undefined) ? false : true;
    console.log(this.isvalid);
  }

  setMaxDate(date) {
    this.maxDate = date;
    // this.isvalid = (this.minDate!= undefined && this.maxDate != undefined && this.start24HourFormat != undefined && this.end24HourFormat != undefined) ? false : true;
    console.log(this.isvalid);
  }

  // closeFix(event, datePicker) {
  //   var parentWrap = event.path.filter(function(res){
  //     return res.className == "xxx-start col-md-6 pr-12 pl-zero"
  //   })
  //   if(parentWrap.length == 0){
  //     datePicker.close();
  //   }
  // }

  // closeFixEnd(event, endPicker){
  //   var parentWrap = event.path.filter(function(res){
  //     return res.className == "xxx-end col-md-6 pl-12"
  //   })
  //   if(parentWrap.length == 0){
  //     endPicker.close();
  //   }
  // }

  closeSimpleSearch(event) {
    // this.iscourseSearch = false;
    var parentWrap = event.path.filter(function(res) {
      return res.className == 'simple-search input-group col-md-12 pd-zero';
    });
    if (parentWrap.length == 0) {
      if (this.iswordcount != true) {
        this.iscourseSearch = false;
      }
      this.isAdvancedSearch = false;
    }
  }

  closeOptionsBox(event) {
    console.log('~~~');
    var parentWrap = event.path.filter(function(res) {
      // return res.className == "ml-auto remover-wrap"
      return (
        res.className ==
        'option-wrap col-sm-6 col-md-6 col-lg-6 col-xl-4 col-xxl-3'
      );
    });
    if (parentWrap.length == 0) {
      this.showStudentOption = '';
      this.xxxhello = '';
    }
  }

  closeTimeRange(event, state) {
    var parentWrap = event.path.filter(function(res) {
      return res.className == state;
    });
    if (parentWrap.length == 0) {
      if (state == 'startRange') {
        this.startTime = false;
      } else {
        this.endTime = false;
      }
    }
  }

  closeDataBox(event, state) {
    // console.log('.... ....')
    var parentWrap = event.path.filter(function(res) {
      return res.className == 'search-box d-flex flex-row';
    });
    if (parentWrap.length == 0) {
      if (state == 'category') {
        this.categorySearch = false;
      } else {
        this.planSearch = false;
      }
    }
  }

  currentMonth(event) {
    console.log(event.next.month);
    let vim = event;
    if (vim.next.month == 12) {
      console.log(vim.next.month);
      $('.datepicker-wrap').addClass('hideRight');
    } else {
      $('.datepicker-wrap').removeClass('hideRight');
    }
    if (vim.next.month == 1) {
      console.log(vim.next.month);
      $('.datepicker-wrap').addClass('hideLeft');
    } else {
      $('.datepicker-wrap').removeClass('hideLeft');
    }
  }

  resetAS() {
    this.rangeHr = '0';
    this.rangeMin = '0';
    this.rangeEndHr = '0';
    this.rangeEndMin = '0';
    this.showStartFormat = '00:00';
    this.showEndFormat = '00:00';
    this.courseVal = {};
    this.tempCategory = [];
    this.tempPlan = [];
    this.planIDArray = [];
    this.categoryIDArray = [];
    this.repeatedDaysTemp = [];
    this.days = [
      { day: 'Sun', val: 0, checked: false },
      { day: 'Mon', val: 1, checked: false },
      { day: 'Tue', val: 2, checked: false },
      { day: 'Wed', val: 3, checked: false },
      { day: 'Thu', val: 4, checked: false },
      { day: 'Fri ', val: 5, checked: false },
      { day: 'Sat', val: 6, checked: false }
    ];
  }

  startTimeConfigure(state) {
    this.startTime = true;
  }
  endTimeConfigure(state) {
    this.endTime = true;
  }

  showAdvancedSearch() {
    this.searchVal = '';
    this.simple = false;
    this.searching = false;
    this.isAdvancedSearch = true;
    this.isChecked = 'AM';
    this.isEndChecked = 'AM';
    this.rangeHr = '0';
    this.rangeMin = '0';
    this.selectedHrRange = '0';
    this.selectedMinRange = '0';
    this.showStartFormat = '00:00';
    this.showEndFormat = '00:00';
    this.rangeEndHr = '0';
    this.rangeEndMin = '0';
    this.selectedEndHrRange = '0';
    this.selectedEndMinRange = '0';
    this.getAllCategories(20, 0);
    this.getCPlanList(0, 20);
    console.log('exit mee meee ');
  }

  ChangedTimeValue(obj, val, state) {
    console.log(val, state);
    console.log(this.courseVal.startTime);
    console.log(this.courseVal.endTime);
    if (val == 'hr') {
      this.selectedHrRange = obj;
    } else if (val == 'min') {
      this.selectedMinRange = obj;
    } else if (val == 'endhr') {
      this.selectedEndHrRange = obj;
    } else {
      this.selectedEndMinRange = obj;
    }
    console.log('~~~', this.selectedEndMinRange);
    this.formatTime(state);
  }

  chooseTimeOpt(type, state) {
    console.log(type);
    if (state == 'start') {
      this.isChecked = type;
    } else {
      this.isEndChecked = type;
    }
    this.formatTime(state);
  }

  formatTime(state) {
    console.log(state, this.selectedHrRange, this.selectedMinRange);
    console.log(state, this.selectedEndHrRange, this.selectedEndMinRange);
    let tempHr, tempMin;
    tempHr = state == 'start' ? this.selectedHrRange : this.selectedEndHrRange;
    tempMin =
      state == 'start' ? this.selectedMinRange : this.selectedEndMinRange;
    console.log(tempHr);
    console.log(tempMin);
    if (tempHr > 0) {
      if (tempHr < 10) {
        var hrFormat = 0 + tempHr;
      } else {
        var hrFormat = tempHr;
      }
    } else {
      tempHr = '00';
      var hrFormat = tempHr;
    }

    if (tempMin > 0) {
      console.log('~~~ if');
      if (tempMin < 10) {
        tempMin = parseInt(tempMin);
        tempMin = tempMin.toString();
        var minFormat = 0 + tempMin;
      } else {
        var minFormat = tempMin;
      }
    } else {
      console.log('~~~ else');
      tempMin = '00';
      var minFormat = tempMin;
    }

    if (state == 'start') {
      this.showStartFormat = hrFormat + ':' + minFormat;
      this.courseVal.startTime = this.showStartFormat + ' ' + this.isChecked;
      this.start24HourFormat = this.convert24HourFormat(
        this.courseVal.startTime
      );
      console.log(this.start24HourFormat);
    } else {
      this.showEndFormat = hrFormat + ':' + minFormat;
      this.courseVal.endTime = this.showEndFormat + ' ' + this.isEndChecked;
      this.end24HourFormat = this.convert24HourFormat(this.courseVal.endTime);
      console.log(this.end24HourFormat);
    }
    // this.isvalid = (this.minDate!= undefined && this.maxDate != undefined && this.start24HourFormat != undefined && this.end24HourFormat != undefined) ? false : true;
    console.log(this.isvalid);
  }

  convert24HourFormat(time) {
    var hours = Number(time.match(/^(\d+)/)[1]);
    var minutes = Number(time.match(/:(\d+)/)[1]);
    var AMPM = time.match(/\s(.*)$/)[1];
    if (AMPM == 'PM' && hours < 12) hours = hours + 12;
    if (AMPM == 'AM' && hours == 12) hours = hours - 12;
    var sHours = hours.toString();
    var sMinutes = minutes.toString();
    if (hours < 10) sHours = '0' + sHours;
    if (minutes < 10) sMinutes = '0' + sMinutes;
    console.log(sHours + ':' + sMinutes);
    return sHours + ':' + sMinutes;
  }

  recentSearch(val, limit, skip) {
    this.courseList = [];
    this.searchVal = val;
    this.courseVal.keyword = val;
    this.iswordcount = true;
    this._service
      .simpleCourseSearch(this.regionId, val, this.locationID, limit, skip)
      .subscribe(
        (res: any) => {
          this.blockUI.stop();
          console.log(res);
          this.courseList = this.courseList.concat(res);
          console.log('----- ', this.courseList);
          this.searchMore = res.length == 0 ? false : true;
          this.hideSearch = true;
          this.iscourseSearch = false;
          this.simple = true;
          this.advance = false;
        },
        err => {
          console.log(err);
        }
      );
  }

  recentSearch1(val, limit, skip) {
    this.searchVal = val;
    this.courseVal.keyword = val;
    this.iswordcount = true;
    this.blockUI.start('Loading...');
    this._service
      .simpleCourseSearch(this.regionId, val, this.locationID, limit, skip)
      .subscribe(
        (res: any) => {
          this.blockUI.stop();
          console.log(res);
          this.blockUI.stop(); // Stop blocking
          this.courseList = this.courseList.concat(res);
          console.log('----- ', this.courseList);
          this.searchMore = res.length == 0 ? false : true;
          this.hideSearch = true;
          this.iscourseSearch = false;
          this.simple = true;
          this.advance = false;
        },
        err => {
          this.blockUI.stop(); // Stop blocking
          console.log(err);
        }
      );
  }

  searchStart(e, limit, skip) {
    this.searchVal = e.target.value;
    this.searchObj = e.target.value;
    if (e.keyCode == 13) {
      this.courseList = [];
      this.recentLists.unshift(e.target.value);
      this.blockUI.start('Loading...');
      this._service
        .simpleCourseSearch(
          this.regionId,
          e.target.value,
          this.locationID,
          limit,
          skip
        )
        .subscribe(
          (res: any) => {
            this.blockUI.stop();

            this.courseList = this.courseList.concat(res);
            console.log(this.courseList);
            $('#course-search').blur();
            this.iscourseSearch = false;
            this.searchMore = res.length == 0 ? false : true;
            this.hideSearch = true;
            this.simple = true;
            this.advance = false;
          },
          err => {
            console.log(err);
          }
        );

      if (this.recentLists.length > 3) {
        console.log('if', this.recentLists);
        this.recentLists = this.recentLists.slice(0, 3);
      } else {
        console.log('else');
      }
      localStorage.setItem(
        'recentSearchLists',
        JSON.stringify(this.recentLists)
      );
    }
  }

  changeAdvancedSearch(val, type) {
    console.log(val, type);
    if (type == 'category') {
      if (val.length > 0) {
        this._service
          .getSearchCategory(this.regionId, val, this.locationID)
          .subscribe(
            (res: any) => {
              console.log(res);

              this.categoryList = res;
            },
            err => {
              console.log(err);
            }
          );
      } else {
        console.log('~~~ hi');
        this.categoryList = [];
        setTimeout(() => {
          this.getAllCategories(20, 0);
        }, 300);
      }
    } else {
      console.log('exit');
      if (val.length > 0) {
        console.log('search plan in progress ..');
        let cid;
        let skip;
        let limit;

        this._service
          .getAllCourseplan(
            this.regionId,
            localStorage.getItem('locationId'),
            cid,
            skip,
            limit,
            val
          )
          .subscribe((res: any) => {
            this.planList = res;
            console.log('course plan list', res);
          });
      } else {
        this.planList = [];
        setTimeout(() => {
          this.getCPlanList(0, 20);
        }, 300);
      }
    }
  }

  updateASCall(state) {
    console.log('call updates ...');
    if (state == 'day') {
      this.days = [
        { day: 'Sun', val: 0, checked: false },
        { day: 'Mon', val: 1, checked: false },
        { day: 'Tue', val: 2, checked: false },
        { day: 'Wed', val: 3, checked: false },
        { day: 'Thu', val: 4, checked: false },
        { day: 'Fri ', val: 5, checked: false },
        { day: 'Sat', val: 6, checked: false }
      ];
      this.repeatedDaysTemp = [];
    } else if (state == 'cat') {
      this.tempCategory = [];
      this.categoryIDArray = [];
    } else {
      this.tempPlan = [];
      this.planIDArray = [];
    }
    console.log(this.repeatedDaysTemp.length == 0);
    console.log(this.tempCategory.length == 0);
    console.log(this.tempPlan.length == 0);
    console.log(this.searchVal);
    // console.log(this.searchVal.length == 0)
    if (this.searchVal == undefined) {
      this.searchVal = '';
    }
    console.log(
      this.repeatedDaysTemp.length == 0 &&
        this.tempCategory.length == 0 &&
        this.tempPlan.length == 0 &&
        this.searchVal.length == 0
    );
    if (
      this.repeatedDaysTemp.length == 0 &&
      this.tempCategory.length == 0 &&
      this.tempPlan.length == 0 &&
      this.searchVal.length == 0
    ) {
      console.log('hide advanced search');
      this.courseList = [];
      this.hideSearch = false;
      this.getCourseLists(20, 0);
    } else {
      console.log('call advanced search');
      this.advancedSearch(this.courseVal, 20, 0);
    }
  }

  advancedSearch(obj, limit, skip) {
    console.log(obj);
    console.log(this.days);
    console.log(this.searching);
    this.searchObj = obj;
    if (this.searching == false) {
      this.courseList = [];
    }
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];
    if (obj.startDate != undefined) {
      console.log(this.start24HourFormat);
      console.log(obj.startDate);
      this.start24HourFormat =
        this.start24HourFormat != undefined
          ? this.start24HourFormat
          : '00:00:00';
      var tempStart =
        obj.startDate.day +
        ' ' +
        monthNames[obj.startDate.month - 1] +
        ' ' +
        obj.startDate.year +
        ' ' +
        this.start24HourFormat +
        ' UTC';
      console.log(tempStart);
      var eventStartTemp = new Date(tempStart);
      var eventStart = eventStartTemp.toISOString();
    } else {
      console.log(this.selectedEndHrRange);
      console.log(this.selectedEndMinRange);
      if (this.start24HourFormat != undefined) {
        var eventStartTemp = new Date(
          Date.UTC(
            0,
            0,
            0,
            this.start24HourFormat.substring(0, 2),
            this.start24HourFormat.substring(3),
            0
          )
        );
        console.log(eventStartTemp);
        var eventStart = eventStartTemp.toISOString();
      } else {
        eventStart = null;
      }
    }

    if (obj.endDate != undefined) {
      console.log(this.end24HourFormat);
      this.end24HourFormat =
        this.end24HourFormat != undefined ? this.end24HourFormat : '23:59:59';
      var tempEnd =
        obj.endDate.day +
        ' ' +
        monthNames[obj.endDate.month - 1] +
        ' ' +
        obj.endDate.year +
        ' ' +
        this.end24HourFormat +
        ' UTC';
      var eventEndTemp = new Date(tempEnd);
      var eventEnd = eventEndTemp.toISOString();
    } else {
      if (this.end24HourFormat != undefined) {
        var tempEnd = '9999-01-01' + ' ' + this.end24HourFormat + ' UTC';
        console.log(tempEnd);
        var eventEndTemp = new Date(tempEnd);
        console.log(eventEndTemp);
        var eventEnd = eventEndTemp.toISOString();
      } else {
        eventEnd = null;
      }
    }

    this.daysLoop = this.days.filter(function(repeat) {
      return repeat.checked == true;
    });
    if (this.daysLoop.length > 0) {
      this.repeatedDaysTemp = [];
      for (let i = 0; i < this.daysLoop.length; i++) {
        console.log(this.daysLoop[i].val);
        this.repeatedDaysTemp.push(this.daysLoop[i].val);
      }
      var repeatedDays = this.repeatedDaysTemp.toString();
    } else {
      var repeatedDays = '';
    }

    console.log(this.planIDArray);
    console.log(this.categoryIDArray);

    var tempPlans = this.planIDArray;
    var tempCats = this.categoryIDArray;

    console.log(this.planIDArray.length > 0);
    var plans = this.planIDArray.length > 0 ? tempPlans.toString() : null;
    var cats = this.categoryIDArray.length > 0 ? tempCats.toString() : null;

    this.searchVal = obj.keyword;

    console.log(repeatedDays);
    console.log(eventStart);
    console.log(eventEnd);
    console.log(obj.keyword);
    console.log(this.planIDArray);
    console.log(this.categoryIDArray);
    this.recentLists.unshift(obj.keyword);
    this.advancedSearchOn =
      this.planIDArray != null ||
      this.categoryIDArray != null ||
      repeatedDays != null
        ? true
        : false;
    this.blockUI.start('Loading...');
    this._service
      .advanceCourseSearch(
        this.regionId,
        this.locationID,
        obj.keyword,
        repeatedDays,
        eventStart,
        eventEnd,
        plans,
        cats,
        limit,
        skip
      )
      .subscribe(
        (res: any) => {
          this.blockUI.stop();
          console.log(res);
          this.searchMore = res.length == 0 ? false : true;
          this.hideSearch = true;
          this.courseList = this.courseList.concat(res);
          console.log(this.courseList);
          this.iscourseSearch = false;
          this.isAdvancedSearch = false;
          this.advance = true;
          this.simple = false;
          console.log('~~~~ ', this.recentLists);
          this.iswordcount =
            obj.keyword == undefined || obj.keyword == '' || obj.keyword == ' '
              ? false
              : true;
          if (this.recentLists.length > 3) {
            console.log('if', this.recentLists);
            this.recentLists = this.recentLists.slice(0, 3);
            // this.iswordcount = true;
          } else {
            console.log('else');
            // this.iswordcount = false;
          }
          localStorage.setItem(
            'recentSearchLists',
            JSON.stringify(this.recentLists)
          );
        },
        err => {
          console.log(err);
        }
      );
  }

  //end course search

  // start course detail

  cancel() {
    this.xxxhello = '';
    this.showStudentOption = '';
    this.isCourseDetail = false;
    this.isCoursePlanDetail = false;
    this.courseList = [];
    this.getCourseLists(20, 0);
    this.activeTab = 'People';
    this.showList = false;
    this.selectedCustomer = {};
    this.showInvoice = false;
    this.showPayment = false;
    this.searchMore = false;
    this.hideSearch = false;
    this.iswordcount = false;
    this.paymentItem = {};
    this.cancelUItext = false;
    this.cancelUI = false;
    this.dataservice.nevigateCourse('');
    this.activeToday = false;
  }

  showCourseDetail(courseId) {
    this.hideSearch = false;
    this.searchMore = false;
    this.iswordcount = false;
    this.repeatedDaysTemp = [];
    this.tempCategory = [];
    this.tempPlan = [];
    this.searchVal = '';
    this.days = [
      { day: 'Sun', val: 0, checked: false },
      { day: 'Mon', val: 1, checked: false },
      { day: 'Tue', val: 2, checked: false },
      { day: 'Wed', val: 3, checked: false },
      { day: 'Thu', val: 4, checked: false },
      { day: 'Fri ', val: 5, checked: false },
      { day: 'Sat', val: 6, checked: false }
    ];
    console.log('~~~~~');
    console.log(this.showCancelButton);
    console.log(this.cancelUI);
    console.log(this.cancelUi);
    window.scroll(0, 0);
    this.categoryIDArray = [];
    this.planIDArray = [];
    this.repeatedDaysTemp = [];
    this.courseVal.keyword = '';
    this.xxxhello = '';
    this.showStudentOption = '';
    this.activeTab = 'People';
    this.currentCourse = courseId;
    this.isCourseDetail = true;
    this.getCourseDetail(courseId);
    this.getUsersInCourse(courseId);
    // this.getRegionInfo();
    console.log(this.detailLists.seat_left);
    this.cancelUi = false;
    this.showCancelButton = false;
    this.cancelUItext = true;
    console.log('undefined currency', this.currency);
    if (this.currency == undefined || this.currency == null) {
      this.currency = {
        invCurrencySign: '$'
      };
      console.log('undefined currency', this.currency);
    } else {
      if (this.currency.invCurrencySign == '') {
        console.log('has currency but sign null', this.currency);
        this.currency.invCurrencySign = '$';
      }
    }
  }

  showCPDetail(planID) {
    this.hideSearch = false;
    this.searchMore = false;
    this.iswordcount = false;
    this.repeatedDaysTemp = [];
    this.tempCategory = [];
    this.tempPlan = [];
    this.searchVal = '';
    this.days = [
      { day: 'Sun', val: 0, checked: false },
      { day: 'Mon', val: 1, checked: false },
      { day: 'Tue', val: 2, checked: false },
      { day: 'Wed', val: 3, checked: false },
      { day: 'Thu', val: 4, checked: false },
      { day: 'Fri ', val: 5, checked: false },
      { day: 'Sat', val: 6, checked: false }
    ];

    console.log('cp');
    this.categoryIDArray = [];
    this.planIDArray = [];
    this.repeatedDaysTemp = [];
    this.courseVal.keyword = '';
    this.editplanId = planID;
    console.log('hi', planID);
    this.isCoursePlanDetail = false;
    this.getCoursePlanDetail(planID, 'edit');
  }

  getCoursePlanDetail(planID, type) {
    this.blockUI.start('Loading...');
    this._service.getSinglePlan(planID, this.locationID).subscribe(
      (res: any) => {
        this.blockUI.stop();
        this.singlePlanData = res;
        this.planCategory = res.category;
        if (type == 'edit') {
          this.goToCoursePlan(planID);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  goToCoursePlan(planId) {
    localStorage.setItem('editCPId', planId);
    localStorage.setItem('cpCategory', JSON.stringify(this.planCategory));
    this.isCoursePlanDetail = false;
    this.isCategory = true;
    this.goBackCat = false;
    // console.log('go to cp', this.singlePlanData)
    // this.isCoursePlanDetail = false;
    // this.isCategory = true;
    // this._service.dataParsing(this.singlePlanData);
  }

  goToConflict(courseId) {
    //both conflit and edit use this type 'edit' and localStorage.setItem("courseID") is also used in schedule
    let obj = {
      courseId: courseId,
      type: 'edit'
    };
    localStorage.setItem('courseID', JSON.stringify(obj));
    localStorage.removeItem('cPlan');
    localStorage.removeItem('tempObj');
    // this.router.navigate(['/courseCreate']);
    this.goBackCat = false;
    this.isCourseDetail = false;
    this.isCourseCreate = true;
    // this.router.navigate(['/courseCreate']);
  }
  getCourseDetail(id) {
    this._service.getSingleCourse(id, this.locationID).subscribe(
      (res: any) => {
        console.log('here details list', res);
        this.detailLists = res;
        this.courseId = res._id;
        this.locationId = res.locationId;
        this.draft = res.draft;
        this.courseType = res.type;
        if (res.lessons.length > 0) {
          this.disabledTab = false;
        } else {
          this.disabledTab = true;
        }
        // console.log("Draft",this.draft)
        // console.log(res.locationId)
        // if(this.draft == true){
        //   this.router.navigate(['/courseCreate']);
        // }
        // console.log(this.locationId)
      },
      err => {
        console.log(err);
      }
    );
  }

  getUsersInCourse(courseId) {
    this.reScheduleCId = '';
    console.log('hi call course', courseId);
    // this.getCourseDetail(courseId);
    this.courseId = courseId;
    this.reScheduleCId = courseId;
    this.blockUI.start('Loading...');
    this._service
      .getAssignUser(this.regionId, courseId, null, null, null)
      .subscribe(
        (res: any) => {
          this.blockUI.stop();
          console.log(res);
          this.pplLists = res;
        },
        err => {
          console.log(err);
        }
      );
  }

  clickTab(type, state) {
    console.log(type, state);
    this.isFlexyInvoice = false;
    this.currentDateObj = '';
    if (state == 'course') {
      this.activeTab = type;
    } else if (state == 'user') {
      this.makeupForm = {};
      this.activeUserTab = type;
    }
    this.noStudent = 0;
    this.presentStudent = 0;
    this.absentStudent = 0;
    this.cancelUItext = false;
    this.cancelUI = false;
    if (type == 'Class') {
      this.blockUI.start('Loading...');
      const today = new Date();
      this.todayDate = today.toISOString();
      var to_day = new Date(today).getUTCDate();
      var currentMonth = new Date(today).getUTCMonth() + 1;
      var currentYear = new Date(today).getUTCFullYear();
      let lessonCount = this.detailLists.lessons;
      console.log(lessonCount);
      console.log(lessonCount.length);
      let finishedDate = [];
      let unfinishedDate = [];
      let xx = false;
      for (let i = 0; i < lessonCount.length; i++) {
        let strDate = lessonCount[i].startDate;
        let courseDate = new Date(strDate).getUTCDate();
        let courseMonth = new Date(strDate).getUTCMonth() + 1;
        let courseYear = new Date(strDate).getUTCFullYear();

        // console.log(courseYear, currentYear)
        if (courseYear > currentYear) {
          unfinishedDate.push(i);
        } else if (courseYear < currentYear) {
          finishedDate.push(i);
        } else {
          if (courseMonth < currentMonth) {
            finishedDate.push(i);
          } else if (courseMonth == currentMonth) {
            console.log(courseDate, to_day);
            if (courseDate > to_day) {
              // console.log('if ', courseDate)
              unfinishedDate.push(i);
            } else if (courseDate == to_day) {
              // console.log('else if ', courseDate)
              finishedDate.push(i);
              this.activeToday = true;
              this.todayIndex = i;
            } else {
              // console.log('else ', courseDate)
              finishedDate.push(i);
            }
          } else {
            unfinishedDate.push(i);
          }
        }
      }
      console.log('finish', finishedDate.length);
      console.log('unfinish', unfinishedDate.length);
      let lastActiveDate;

      console.log(finishedDate);
      if (finishedDate.length != 0) {
        console.log('~~~~ if');
        // moment1.isSameOrAfter(moment2);

        if (this.activeToday == true) {
          console.log('~~~~ active', lessonCount[this.todayIndex]);
          this.currentLessonIdx = this.todayIndex;
          this.checkForRelief(lessonCount[this.todayIndex]);
          this.cancelUi =
            lessonCount[this.todayIndex].cancel == true ? false : true;
          this.LASD = lessonCount[this.todayIndex].startDate;
          this.currentDateObj = lessonCount[this.todayIndex]._id;
          console.log('~~ currentDateObj ~~', this.currentDateObj);

          this.disableCancel =
            lessonCount[this.todayIndex].cancel == true ? true : false;
        } else {
          console.log('~~~~ last active');
          lastActiveDate = finishedDate.length - 1;
          console.log(lastActiveDate);
          this.currentLessonIdx = lastActiveDate;
          this.checkForRelief(lessonCount[lastActiveDate]);
          //LASD = lastActiveStartDate
          this.LASD = lessonCount[lastActiveDate].startDate;
          this.cancelUi =
            lessonCount[lastActiveDate].cancel == true ? false : true;
          console.log(this.LASD);
          this.currentDateObj = lessonCount[lastActiveDate]._id;
          this.disableCancel =
            lessonCount[lastActiveDate].cancel == true ? true : false;
          console.log('~~ dateID ~~', this.currentDateObj);
        }
      } else {
        console.log('hello in else');
        lastActiveDate = 0;
        this.currentLessonIdx = 0;
        this.checkForRelief(lessonCount[0]);
        this.LASD = lessonCount[0].startDate;
        this.currentDateObj = lessonCount[0]._id;
        this.cancelUi = lessonCount[0].cancel == true ? false : true;
        this.disableCancel = lessonCount[0].cancel == true ? true : false;
        console.log('~~ dateID ~~', this.currentDateObj);
      }

      console.log(this.LASD);

      // ACD = activeCourseDate/Month/Year
      let ACD = new Date(this.LASD).getUTCDate();
      let ACM = new Date(this.LASD).getUTCMonth() + 1;
      let ACY = new Date(this.LASD).getUTCFullYear();
      this._service
        .getAssignUser(this.regionId, this.currentCourse, ACD, ACM, ACY)
        .subscribe(
          (res: any) => {
            console.log(res);
            this.blockUI.stop();
            this.activeCourseInfo = res;
            for (let j = 0; j < this.activeCourseInfo.CUSTOMER.length; j++) {
              if (this.activeCourseInfo.CUSTOMER[j].attendance == true) {
                this.presentStudent += 1;
              } else if (
                this.activeCourseInfo.CUSTOMER[j].attendance == false
              ) {
                this.absentStudent += 1;
              } else {
                this.noStudent += 1;
              }
            }
            if (this.LASD != null) {
              this.cancelButtonShowHide();
            }
            $('.timeline').scrollLeft(80 * (lastActiveDate - 1));
          },
          err => {
            this.blockUI.stop();
            console.log(err);
          }
        );
    } else if (type == 'APG') {
      this._service
        .getAssessment(this.regionId, this.currentCourse, true)
        .subscribe(
          (res: any) => {
            console.log(res);
            this.apgLists = res;
          },
          err => {
            this.blockUI.stop();
            console.log(err);
          }
        );
      this.noStudent = 0;
      this.presentStudent = 0;
      this.absentStudent = 0;
    } else if (type == 'People') {
      this.noStudent = 0;
      this.presentStudent = 0;
      this.absentStudent = 0;
      this.currentDateObj = '';
    } else if (type == 'transfer') {
      this.getAllAC(20, 0, this.singleUserData.userId);
    } else if (type == 'invoice') {
      console.log('tab inv user id', this.singleUserData);
      console.log(this.courseType);
      if (this.courseType == 'FLEXY') {
        this.isFlexyInvoice = true;
      } else {
        this.isFlexyInvoice = false;
      }
      this.viewInvoice(this.singleUserData);
    }
  }

  cancelButtonShowHide() {
    // this.cancelUi=true;
    // let onlyTime = this.LASD.toString().substring(11, 19)
    // let onlyDate = this.LASD.toString().substring(0,10);
    console.log(this.LASD);
    let lsessonTime = this.LASD.toLocaleString().substring(11, 19);
    let lessonDate = this.LASD.toLocaleString().substring(0, 10);

    var todaydate = new Date();
    let onlytodayTime = todaydate.toString().substring(16, 24);
    let onlytodayDate = todaydate.toISOString().substring(0, 10);
    console.log(this.todayDate, 'today');
    console.log('.....', onlytodayTime);
    console.log('.....', this.cancelUi);
    // console.log(onlytodayTime)
    // console.log(onlytodayDate)

    // Validate for giving attendence
    // if (lessonDate <= onlytodayDate) {
    //   this.attendenceButton = true;
    // } else {
    //   this.attendenceButton = false;
    // }

    if (lessonDate >= onlytodayDate) {
      console.log('lesson date is grater than and equal to today');
      if (lessonDate == onlytodayDate) {
        if (onlytodayTime >= lsessonTime) {
          console.log('current time is grater');
          this.showCancelButton = false;
        } else {
          console.log('~~~');
          this.showCancelButton = true;
        }
      } else {
        console.log('===');
        this.showCancelButton = true;
      }
    } else {
      console.log('noooooo');
      this.showCancelButton = false;
    }

    console.log(this.showCancelButton);
    // if(lessonDate == onlytodayDate && onlytodayTime < lsessonTime || (lessonDate > onlytodayDate) ){
    //   console.log('same as today and not grater than today time')
    //   this.showCancelButton=true;
    // }
    // else if(lessonDate == onlytodayDate && onlytodayTime > lsessonTime || (lessonDate < onlytodayDate )){
    //   console.log('same as today and not grater than today time')
    //   this.showCancelButton=false;
    // }
  }

  currentLessonIdx: any = null;
  selectedLesson: any = null;
  checkAttendance(targetDate, classInfo, status, currentIdx) {
    console.log('hi', targetDate);
    console.log('....', classInfo);
    $('.timeline div.single-date').on('click', function() {
      $(this)
        .addClass('day-highlight')
        .siblings()
        .removeClass('day-highlight');
    });
    this.currentLessonIdx = currentIdx;
    this.checkForRelief(classInfo);
    this.disableCancel = classInfo.cancel == true ? true : false;

    this.currentDateObj = classInfo._id;
    console.log(this.currentDateObj);
    this.cancelUI = classInfo.cancel;
    console.log(this.cancelUI);
    // Adding the class Start Date into LASD
    this.LASD = classInfo.startDate;
    this.cancelUi = true;
    this.cancelUItext = true;
    // Validate the cancel button whether show or hide
    this.cancelButtonShowHide();

    this.presentStudent = 0;
    this.absentStudent = 0;
    this.noStudent = 0;
    let ACD = new Date(targetDate).getUTCDate();
    let ACM = new Date(targetDate).getUTCMonth() + 1;
    let ACY = new Date(targetDate).getUTCFullYear();
    this._service
      .getAssignUser(this.regionId, this.currentCourse, ACD, ACM, ACY)
      .subscribe(
        (res: any) => {
          this.presentStudent = 0;
          this.absentStudent = 0;
          this.noStudent = 0;
          console.log(res);
          this.blockUI.stop();
          res.CUSTOMER.map(customer => {
            this.studentArray.push(customer.userId);
          });
          // this.studentArray = res.CUSTOMER;
          this.activeCourseInfo = res;
          console.log(this.noStudent);
          for (let j = 0; j < this.activeCourseInfo.CUSTOMER.length; j++) {
            if (this.activeCourseInfo.CUSTOMER[j].attendance == true) {
              this.presentStudent += 1;
            } else if (this.activeCourseInfo.CUSTOMER[j].attendance == false) {
              this.absentStudent += 1;
            } else {
              this.noStudent += 1;
            }
          }
        },
        err => {
          this.blockUI.stop();
          console.log(err);
        }
      );
  }

  hixxx() {
    console.log('helo');
  }

  openRemoveModal(id, deleteModal, n) {
    // this.getSingleUser(id, 'withdraw')
    console.log('__', n);
    this.showStudentOption = '';
    this.xxxhello = '';
    this.deleteId = id;
    this.removeUser = n;
    this.modalReference = this.modalService.open(deleteModal, {
      backdrop: 'static',
      windowClass:
        'deleteModal d-flex justify-content-center align-items-center'
    });
  }

  addUserModal(type, userModal, state, id, courseType) {
    this.selectedCustomer = {};
    this.selectedTeacherLists = [];
    this.isvalidID = state;
    this.selectedUserLists = [];
    this.selectedUserId = [];
    this.modalReference = this.modalService.open(userModal, {
      backdrop: 'static',
      windowClass:
        'modal-xl modal-inv d-flex justify-content-center align-items-center'
    });
    this.userType = type;
    return new Promise((resolve, reject) => {
      if (state != 'inside') {
        console.log('first');
        this.isSeatAvailable = true;
        this.getCourseDetail(id);
        this.getUsersInCourse(id);
      } else if (this.detailLists.seat_left == null) {
        console.log('second');
        this.isSeatAvailable = true;
        // this.getCourseDetail(id);
      } else {
        console.log('third');

        if (
          this.pplLists.CUSTOMER.length >= this.detailLists.coursePlan.seats
        ) {
          this.isSeatAvailable = false;
        } else {
          this.isSeatAvailable = true;
        }
      }
      resolve();
    }).then(() => {
      setTimeout(() => {
        console.log('detail lists', this.detailLists);
        if (courseType == 'REGULAR' && type == 'customer') {
          for (var i in this.pplLists.CUSTOMER) {
            console.log(this.pplLists.CUSTOMER[i]);
            this.stdLists.push(this.pplLists.CUSTOMER[i].userId);
          }
        }
        console.log(this.stdLists);
      }, 500);
    });
  }

  viewInvoice(data) {
    this.isvalidID = 'inside';
    this.singleInv = [];
    console.log('user data in view inv', data);
    if (data.invoice != null) {
      this.invStatus = data.invoice.status;
      if (data.invoice.status == 'PAID') {
        this.showPaidInvoice = true;
      } else if (
        data.invoice.status == 'UNPAID' ||
        data.invoice.status == 'PAID[PARTIAL]'
      ) {
        this.showInvoice = true;
      }
    }

    var invData = {
      invoice: data.invoice
    };
    this.courseInfo = this.detailLists;
    Object.assign(this.courseInfo, invData);
    console.log('-------->courseInfo', this.courseInfo);

    // this.getRegionInfo();
    // console.log(this.invoiceInfo);
    // var invoiceId = data.invoice._id;
    // this.blockUI.start('Loading...');
    // this._service.getSingleInvoice(invoiceId)
    // .subscribe((res:any) => {
    //   this.blockUI.stop();
    //   console.log('invoice detail',res);
    //   this.singleInv.push(res);
    //   this.invoice = this.singleInv;
    //   console.log("invoice",this.invoice);
    //   this.showOneInvoice(this.invoice);
    // }, err => {
    //   console.log(err);
    // })
  }

  showOneInvoice(invoice) {
    for (var i in invoice) {
      this.updatedDate = this.dateFormat(invoice[i].updatedDate);
      this.dueDate = this.dateFormat(invoice[i].dueDate);
      this.invoiceID = invoice[i]._id;
      this.refInvID = invoice[i].refInvoiceId;
      this.invTaxName = invoice[i].tax.name;
      this.invCurrency = invoice[i].currency;
      this.invPayment = invoice[i].payments;
      // if(invoice[i].payments){
      //   var invPayment = invoice[i].payments;
      //   for(var j in invPayment){
      //     if(invPayment[i].status == 'COMPLETE'){
      //       this.payment = invPayment[i];
      //       console.log("Payment",this.payment)
      //     }
      //   }
      // }
      var n = invoice[i].total;
      this.total = n.toFixed(2);
      this.invoice[i].subtotal = Number(
        Number(this.invoice[i].subtotal).toFixed(2)
      );
      console.log('n and total', n, this.total);
      if (this.invoice[i].registrationFee.fee == null) {
        this.hideReg = true;
      }
      if (this.invoice[i].miscFee.fee == null) {
        this.hideMisc = true;
      }
      if (this.invoice[i].deposit == null) {
        this.hideDeposit = true;
      }

      this.invoiceCourse['fees'] = invoice[i].courseFee.fee;
      if (invoice[i].courseId == this.detailLists._id) {
        this.invoiceCourse['name'] = this.detailLists.name;
        this.invoiceCourse['startDate'] = this.detailLists.startDate;
        this.invoiceCourse['endDate'] = this.detailLists.endDate;
        this.invoiceCourse['lessonCount'] = this.detailLists.lessonCount;
      }
    }
  }

  showOptionsBox(stdID, e) {
    e.preventDefault();
    e.stopPropagation();
    this.yPosition = e.layerY + 40;
    // this.yPosition = e.offsetY - 30;
    this.showStudentOption = stdID;
    this.optionBox = true;
    this.xxxhello = stdID;
    console.log(this.showStudentOption);
    // this.router.navigate(['/customer']);
  }

  onClickCustomer(id) {
    // localStorage.setItem("courseCustomer",id)
    console.log('*-------*', id);

    this.router.navigate(['/customer']);
    this.dataservice.nevigateCustomer(id);
  }
  uId: any;
  attdBox = false;

  withdrawUser(id) {
    let userobj = {
      courseId: this.courseId,
      userId: id
    };
    this._service
      .withdrawAssignUser(this.regionId, userobj, this.locationId)
      .subscribe(
        (res: any) => {
          this.modalReference.close();
          console.log(res);
          this.toastr.success('User successfully withdrawled.');
          this.getCourseDetail(this.courseId);
          this.getUsersInCourse(this.courseId);
        },
        err => {
          this.toastr.error('Withdrawal user failed.');
          this.modalReference.close();
          console.log(err);
        }
      );
  }

  cancelModal() {
    console.log('....');
    this.modalReference.close();
    console.log(this.selectCustomer);
    console.log(this.selectedTeacherLists);
    // this.isSeatAvailable = true;
    this.isGlobal = false;
    this.showList = false;
    this.selectedCustomer = {};
    this.selectedTeacherLists = [];
    this.showInvoice = false;
    this.textAreaOption = false;
    // this.currentDateObj = '';
    this.showStudentOption = '';
    this.xxxhello = '';
    this.stdLists = [];
    this.trArrayLists = [];
    this.flexyarr = [];
    this.showflexyCourse = false;
    this.tempCourdeId = '';
    this.tempuserType = '';
    this.isProrated = false;
    this.isDisabledBtn = false;
  }
  cancelClass(content) {
    this.modalType = '';
    this.getUsersInCourse(this.courseId);
    this.modalReference = this.modalService.open(content, {
      backdrop: 'static',
      windowClass:
        'modal-xl modal-inv d-flex justify-content-center align-items-center'
    });
  }
  showTextarea() {
    this.textAreaOption = true;
  }
  absentClass(obj, userId) {
    if (this.modalType == 'absent' && !this.isGlobal) {
      console.log(this.activeCourseInfo);
      console.log('LASD~~~', this.LASD);
      var d = new Date(this.LASD).getUTCDate();
      var m = new Date(this.LASD).getUTCMonth() + 1;
      var y = new Date(this.LASD).getUTCFullYear();
      var studentID = {
        studentId: this.absentInfo.userId
      };
      // if (type == 'present') {
      //   obj['attendance'] = 'true';
      // } else {
      studentID['attendance'] = 'false';
      // }
      console.log(d, '/', m, '/', y);
      console.log('obj~~~', obj);
      console.log(this.courseId);
      this._service.markAttendance(this.courseId, studentID, d, m, y).subscribe(
        (res: any) => {
          setTimeout(() => {
            this.toastr.success(res.message);
          }, 100);
          console.log('res', res);
          // this.getUsersInCourse(this.courseId);
          this.activeTab = 'Class';
          this.attdBox = false;
          this.getAssignUsers(d, m, y);
          this.modalClose();
        },
        err => {
          console.log(err);
          this.toastr.error('');
        }
      );
      return;
    } else if (this.modalType == 'absent' && this.isGlobal) {
      return new Promise((resolve, reject) => {
        var d = new Date(this.LASD).getUTCDate();
        var m = new Date(this.LASD).getUTCMonth() + 1;
        var y = new Date(this.LASD).getUTCFullYear();
        var studentID = {
          studentId: this.absentInfo.userId
        };
        // if (type == 'present') {
        //   obj['attendance'] = 'true';
        // } else {
        studentID['attendance'] = 'false';
        // }
        console.log(d, '/', m, '/', y);
        console.log('obj~~~', obj);
        console.log(this.courseId);
        this._service
          .markAttendance(this.courseId, studentID, d, m, y)
          .subscribe(
            (res: any) => {
              setTimeout(() => {
                this.toastr.success(res.message);
              }, 100);
              console.log('res', res);
              // this.getUsersInCourse(this.courseId);
              this.activeTab = 'Class';
              this.attdBox = false;
              this.getAssignUsers(d, m, y);
              this.modalClose();
            },
            err => {
              console.log(err);
              this.toastr.error('');
            }
          );
        resolve();
      }).then(() => {
        setTimeout(() => {
          this.showStudentOption = '';
          this.xxxhello = '';
          this._service.makeupPassIssue(obj, this.courseId, userId).subscribe(
            (res: any) => {
              console.log(res);
              this.blockUI.stop();
              this.modalReference.close();
              // this.activeTab = 'People';
              // this.toastr.success('Makeup pass successfully created.');
              setTimeout(() => {
                this.toastr.success('Makeup pass successfully created.');
              }, 100);
              this.makeupForm = {};
            },
            err => {
              this.modalReference.close();
              setTimeout(() => {
                this.toastr.error('Fail to issue makeup pass.');
              }, 100);
              // this.toastr.error('Fail to issue makeup pass.');
              this.blockUI.stop();
              console.log(err);
            }
          );
        }, 500);
      });
    }
  }
  cancelClassFun(lessonId) {
    this.modalType = '';
    var cancelData;
    if (
      this.reasonValue == null ||
      this.reasonValue.length == 0 ||
      this.reasonValue == undefined
    ) {
      var noReason = {
        lessonId: lessonId,
        students: this.studentArray
      };
      cancelData = noReason;
    } else {
      var reason = {
        lessonId,
        students: this.studentArray,
        message: this.reasonValue
      };
      cancelData = reason;
    }
    console.log(lessonId);
    console.log(this.isGlobal);
    console.log(cancelData);

    // Call cancel class api service
    this.blockUI.start('Loading...');
    this._service
      .cancelUsersFromClass(this.courseId, cancelData, this.isGlobal)
      .subscribe(
        (res: any) => {
          // Success function
          this.blockUI.stop();
          this.cancelUI = false;
          this.cancelUi = false;
          console.info('cancle user from class api calling is done');
          console.log(res);
          this.isGlobal = false;
          this.disableCancel = true;
          this.getCourseDetail(this.courseId);
          this.studentArray = [];
          this.modalClose();
          // Close Dialog box
          // Show the canceled users
        },
        err => {
          // Error function
          this.isGlobal = false;
          console.log('cancle user from class has got error', err);
          // Do something
        }
      );
    this.cancelUItext = false;
  }

  modalClose() {
    this.isGlobal = false;
    this.cancelUItext = false;
    this.cancelUI = false;
    this.reasonValue = '';
    this.textAreaOption = false;
    this.modalReference.close();
    // this.currentDateObj = '';
  }

  getAllUsers(type) {
    this.blockUI.start('Loading...');
    this._service.getAllUsers(this.regionId, type, 20, 0).subscribe(
      (res: any) => {
        this.userLists = res;
        console.log('this.userLists', this.userLists);
        setTimeout(() => {
          this.blockUI.stop(); // Stop blocking
        }, 300);
      },
      err => {
        console.log(err);
      }
    );
  }

  selectUser(state, id, type) {
    console.log(this.detailLists.seat_left);
    console.log(this.selectedUserLists.length);
    console.log('hihi ~~');
    this.getSingleUser(id, state);
    this.formData = {};
  }

  selectCustomer(state, id, type) {
    this.getSingleCustomer(id);
    this.formData = {};
  }

  getSingleUser(ID, state) {
    console.log('~~~ ', state);
    this.blockUI.start('Loading...');
    this._service.editProfile(this.regionId, ID).subscribe(
      (res: any) => {
        this.blockUI.stop();
        console.log(res);
        if (state == 'user') {
          this.isFous = false;
          this.showList = false;
          this.selectedUserLists.push(res);
          console.log(this.detailLists.seat_left);
          console.log(this.selectedUserLists.length);

          for (var i in this.selectedUserLists) {
            console.log(this.selectedUserLists[i]);
            this.trArrayLists.push(this.selectedUserLists[i].userId);
          }
          console.log(this.trArrayLists);

          if (this.detailLists.seat_left - this.selectedUserLists.length == 0) {
            console.log('cant add');
            this.isSeatAvailable = false;
          } else {
            this.isSeatAvailable = true;
          }
        } else {
          console.log(':)', res);
          this.isFous = false;
          this.showList = false;
          if (this.selectedTeacherLists.length == 1) {
            this.selectedTeacherLists[0] = res;
          } else {
            this.selectedTeacherLists.unshift(res);
            console.log(this.selectedTeacherLists);
          }
          this.trArrayLists.push(this.selectedTeacherLists[0].userId);
          console.log(this.trArrayLists);
          // this.removeUser = res.preferredName;
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  getSingleCustomer(ID, type?) {
    this.blockUI.start('Loading...');
    // console.log(this.detailLists);
    console.log('this.selectedCustomer', this.selectedCustomer);
    this._service.editProfile(this.regionId, ID).subscribe((res: any) => {
      this.blockUI.stop();
      console.log('selected Customer', res);
      console.log(res);
      res.details.map(info => {
        if (info.controlType === 'Datepicker')
          info.value = moment(info.value).format('YYYY-MM-DD');
      });

      this.activeUserTab = type;

      this.custDetail.user = res;
      console.log('custDetail --->', this.custDetail);
      this.selectedCustomer = res;
      this.stdLists = this.selectedCustomer.userId;
      console.log(this.stdLists);
      if (this.detailLists.type == 'FLEXY') {
        if (this.detailLists.seat_left === 0) {
          // console.log(this.pplLists)
          var includedUserId = this.pplLists.CUSTOMER.findIndex(
            x => x.userId === this.selectedCustomer.userId
          );
          console.log('includedUserId~~~', includedUserId);
          if (includedUserId == -1) {
            this.isDisabledBtn = true;
            console.log('includedUserId == -1', this.isDisabledBtn);
          } else {
            this.isDisabledBtn = false;
            console.log('includedUserId != -1', this.isDisabledBtn);
          }
        }
        this.showList = false;
      }
    });
  }

  focusMethod(e, userType) {
    console.log(e);
    console.log(userType);
    this.isFous = true;
    this.userLists = [];
    // this.getAllUsers(userType);
  }

  hideFocus(e) {
    setTimeout(() => {
      this.isFous = false;
      this.showList = false;
    }, 300);
    this.formData = {};
  }

  changeMethod(searchWord, userType) {
    console.log(this.detailLists.locationId);
    console.log(searchWord);
    console.log(userType);
    console.log(this.courseId);
    let locationId = this.detailLists.locationId;

    userType = userType == 'teacher' ? 'staff' : userType;
    if (searchWord.length != 0) {
      this.showList = true;
      this._service
        .getSearchUser(
          this.regionId,
          searchWord,
          userType,
          20,
          0,
          this.courseId
        )
        .subscribe(
          (res: any) => {
            console.log(res);
            this.userLists = res;
          },
          err => {
            console.log(err);
          }
        );

      // var selectedIdArr=[];
      // var pplListArr = [];
      // var pplArr = [];

      // switch(userType){
      //   case 'customer':
      //     pplArr = this.pplLists.CUSTOMER;
      //     console.log("customer pplArr",pplArr)
      //     break;
      //   case 'staff':
      //     // pplArr = this.pplLists.TEACHER;
      //     for(var i in this.pplLists.TEACHER){
      //       let ppl = this.pplLists.TEACHER[i];
      //       pplArr.push(ppl);
      //     }
      //     for(var j in this.pplLists.STAFF){
      //       let ppl = this.pplLists.STAFF[j];
      //       pplArr.push(ppl);
      //     }
      //     console.log("staff pplArr",pplArr)
      // }

      //   if(pplArr.length > 0){
      //       console.log("to send userIds PPLs");
      //       for(let y in pplArr){
      //         let id = pplArr[y].userId;
      //         pplListArr.push(id)
      //       }

      //       if(this.selectedUserLists.length>0){
      //         for(var i in this.selectedUserLists){
      //           let id = this.selectedUserLists[i].userId;
      //           pplListArr.push(id);
      //         }
      //       }
      //       // console.log('Testing json',JSON.stringify(this.selectedCustomer))
      //       if(JSON.stringify(this.selectedCustomer) != "{}"){
      //         console.log("has selected customer",this.selectedCustomer.userId);
      //         let id = this.selectedCustomer.userId;
      //         pplListArr.push(id);
      //       }else{
      //         console.log("no selected customer")
      //       }

      //       console.log('pplListArr',pplListArr)
      //       var pplListStr = pplListArr.toString();
      //       console.log("pplListsStr",pplListStr);

      //       this._service.getSearchUser(this.regionId, searchWord, userType, 20, 0, pplListStr)
      //       .subscribe((res:any) => {
      //         console.log(res);
      //         this.userLists = res;
      //       }, err => {
      //         console.log(err);
      //       });
      //   }else{
      //     console.log("not send");
      //     this._service.getSearchUser(this.regionId, searchWord, userType, 20, 0, '')
      //     .subscribe((res:any) => {
      //       console.log(res);
      //       this.userLists = res;
      //     }, err => {
      //       console.log(err);
      //     });
      //   }
    } else if (searchWord.length == 0) {
      this.userLists = [];
      this.showList = false;
      // this.getAllUsers(userType);
    }
  }

  removeSelectedUser(id) {
    this.trArrayLists = [];
    let getIndex;
    for (let x in this.selectedUserLists) {
      if (id == this.selectedUserLists[x].userId) {
        getIndex = x;
      }
    }
    this.selectedUserLists.splice(getIndex, 1);
    console.log(this.selectedUserLists);

    for (var i in this.selectedUserLists) {
      console.log(this.selectedUserLists[i]);
      this.trArrayLists.push(this.selectedUserLists[i].userId);
    }
    console.log(this.trArrayLists);

    console.log(
      this.detailLists.seat_left - this.selectedUserLists.length == 0
    );
    console.log(this.detailLists.seat_left);
    if (this.detailLists.seat_left != null) {
      if (this.detailLists.seat_left - this.selectedUserLists.length == 0) {
        console.log('cant add');
        this.isSeatAvailable = false;
      } else {
        this.isSeatAvailable = true;
      }
    }
  }

  getSelectedUserId() {
    console.log(this.selectedUserLists);
    console.log(this.selectedUserId);
    let userId;
    for (let y in this.selectedUserLists) {
      userId = this.selectedUserLists[y].userId;
      this.selectedUserId.push(userId);
    }
    console.log(this.selectedUserId);
    this.selectedUserId = this.selectedUserId.toString();
  }

  swapTeacherToCourse(courseId, teacherId) {
    let body = {
      newTeacherId: teacherId
    };
    this.blockUI.start('Loading...');
    this._service.swapTeacher(courseId, body).subscribe(
      (res: any) => {
        this.blockUI.stop();
        this.toastr.success('Teacher successfully swaped.');
        console.log(res);
        this.modalReference.close();
        // this.getCourseDetail(courseId)
        this.getUsersInCourse(courseId);
      },
      err => {
        this.modalReference.close();
        this.blockUI.stop();
        this.toastr.error('Swap teacher failed.');
        console.log(err);
      }
    );
  }

  enrollUserToCourse(courseId, userType) {
    console.log('call from enrolluser', this.isvalidID);
    // let type = userType;
    // type = (userType == 'staff') ? 'teacher' : 'customer'
    this.getSelectedUserId();
    let body = {
      courseId: courseId,
      userId: this.selectedUserId,
      userType: userType
    };
    console.log('~~~~', body);
    this.blockUI.start('Loading...');
    this._service.assignUser(this.regionId, body, this.locationID).subscribe(
      (res: any) => {
        console.log(res);
        this.blockUI.stop();
        setTimeout(() => {
          this.toastr.success('Assistant successfully assigned.');
        }, 100);
        // this.toastr.success("Assistant successfully assigned.");
        this.modalReference.close();
        if (this.isvalidID == 'inside') {
          console.log('hi');
          // this.getCourseDetail(courseId)
          this.getUsersInCourse(courseId);
        } else {
          console.log('else hi');
          this.cancel();
          // this.getUsersInCourse(courseId);
        }
      },
      err => {
        this.modalReference.close();
        this.blockUI.stop();
        this.toastr.error('Assign teacher failed.');
        console.log(err);
      }
    );
  }

  confirmInvoiceAlert(courseId, userType) {
    // this.confirmInvoiceAlert(courseId,userType,invoiceAlert)
    // this.addCustomer
    this.disableInvoice = false;
    if (this.courseType == 'FLEXY') {
      this.flexicomfirm(undefined);
    } else {
      this.addCustomer(this.tempCourdeId, this.tempuserType, undefined);
    }
    this.invoiceModalReference.close();
  }
  cancelInvoiceAlert() {
    this.disableInvoice = true;
    if (this.courseType == 'FLEXY') {
      this.flexicomfirm(undefined);
    } else {
      this.addCustomer(this.tempCourdeId, this.tempuserType, undefined);
    }
  }
  public invoiceModalReference;
  public disableInvoice;
  addCustomer(courseId, userType, invoiceAlert) {
    this.tempCourdeId = courseId;
    this.tempuserType = userType;
    this.isDisabledBtn = false;
    if (this.courseType == 'FLEXY') {
      this.blockUI.start('Loading...');
      // this.tempCourdeId = courseId;
      // this.tempuserType = userType;
      //  getflexi
      let startDate;
      let endDate;
      this._service
        .getFlexi(courseId, this.selectedCustomer.userId, startDate, endDate)
        .subscribe(
          (res: any) => {
            console.log(res);
            this.flexyarr = res;
            this.showInvoice = false;
            this.showflexyCourse = true;
            this.blockUI.stop();
          },
          err => {
            console.log(err);
          }
        );
    } else {
      if (invoiceAlert) {
        this.invoiceModalReference = this.modalService.open(invoiceAlert, {
          backdrop: 'static',
          windowClass:
            'deleteModal d-flex justify-content-center align-items-center'
        });

        return;
      }
      this.stdLists = [];
      console.log('call from addCustomer', this.selectedCustomer);
      let body = {
        courseId: courseId,
        userId: this.selectedCustomer.userId,
        userType: userType,
        disableInvoice: this.disableInvoice
      };
      console.log('body', body);
      this.blockUI.start('Loading...');
      this._service.assignUser(this.regionId, body, this.locationID).subscribe(
        (res: any) => {
          console.log('-------->', res);
          // console.log(this.detailLists.invoice);
          if (this.disableInvoice) {
            this.invoiceModalReference.close();
            this.cancelInvoiceModal();
            // this.modalReference.close();
            this.blockUI.stop();
            return;
          }
          this.courseInfo = this.detailLists;
          Object.assign(this.courseInfo, res.body);
          console.log('-------->', this.courseInfo);

          console.log('res Assign customer', res);
          if (res.invoiceSettings == {} || res.invoiceSettings == undefined) {
            console.log('no invoice setting');
            this.invoiceInfo = {
              address: '',
              city: '',
              companyName: '',
              email: '',
              prefix: '',
              registration: ''
            };
          } else {
            console.log('has invoice setting');
            this.invoiceInfo = res.invoiceSettings;
          }

          this.invoice = res.invoice;
          this.showInvoice = true;

          this.invoiceID2 = this.detailLists.invoice[0]._id;
          this.showOneInvoice(this.invoice);
          this.blockUI.stop();
          // for(var i in this.invoice){
          //   this.updatedDate = this.dateFormat(this.invoice[i].updatedDate);
          //   this.dueDate = this.dateFormat(this.invoice[i].dueDate);
          //   this.invoiceID = this.invoice[i]._id;
          //   this.refInvID = this.invoice[i].refInvoiceId;
          //   this.invTaxName = this.invoice[i].taxName;
          //   var n = this.invoice[i].total;
          //   this.total = n.toFixed(2);
          //   console.log('n and total',n,this.total);
          //   if(this.invoice[i].courseId == courseId){
          //     this.invoiceCourse["name"] = this.detailLists.name;
          //     this.invoiceCourse["startDate"] = this.detailLists.startDate;
          //     this.invoiceCourse["endDate"] = this.detailLists.endDate;
          //     this.invoiceCourse["lessonCount"] = this.detailLists.lessonCount;
          //   }
          // }
        },
        err => {
          console.log(err);
        }
      );
    }
    // this.showInvoice = true;
  }

  dateFormat(dateStr) {
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];
    var d = new Date(dateStr);
    var month = monthNames[d.getUTCMonth()];
    var year = d.getUTCFullYear();
    var date = d.getUTCDate();
    console.log(date, month, year);
    var dFormat = date + ' ' + month + ' ' + year;
    console.log('DD MM YYYY', dFormat);
    return dFormat;
  }

  // end course detail
  changeRoute() {
    this.hideSearch = false;
    this.searchMore = false;
    this.iswordcount = false;
    this.repeatedDaysTemp = [];
    this.tempCategory = [];
    this.tempPlan = [];
    this.searchVal = '';
    this.days = [
      { day: 'Sun', val: 0, checked: false },
      { day: 'Mon', val: 1, checked: false },
      { day: 'Tue', val: 2, checked: false },
      { day: 'Wed', val: 3, checked: false },
      { day: 'Thu', val: 4, checked: false },
      { day: 'Fri ', val: 5, checked: false },
      { day: 'Sat', val: 6, checked: false }
    ];
    this.categoryIDArray = [];
    this.planIDArray = [];
    this.repeatedDaysTemp = [];
    this.courseVal.keyword = '';
    this.isCategory = true;
    this.goBackCat = false;
    localStorage.removeItem('cpCategory');
    localStorage.removeItem('editCPId');
    // console.log("Change Route")
    // localStorage.removeItem('coursePlanId');
    // localStorage.removeItem('courseId');
    // localStorage.removeItem('splan');
    // this.router.navigate(['/courseCreate']);
    // this.router.navigate(['courseplan']);
  }

  scrollTop() {
    console.log('scrollTop');
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }

  edit(course) {
    console.log('Edit', course);
    localStorage.setItem('coursePlanId', course.coursePlanId);
    localStorage.setItem('courseId', course._id);
    // this.dataservice.hero = course;
    // // this.dataservice.edit = true;
    // this.router.navigate(['/courseCreate']);
  }
  getCPlanList(skip, limit) {
    console.log('----', localStorage.getItem('locationId'));
    let cid;
    let key;
    this._service
      .getAllCourseplan(
        this.regionId,
        localStorage.getItem('locationId'),
        cid,
        skip,
        limit,
        key
      )
      .subscribe((res: any) => {
        console.log(res);
        this.planList = res;
        console.log('course plan list', res);
      });
  }

  showMore(skip: any) {
    console.log(skip);
    console.log(this.simple);
    console.log(this.searchMore);
    console.log(this.searchObj);
    if (this.searchMore == true) {
      if (this.simple == true) {
        console.log('in the if');
        this.recentSearch1(this.searchVal, 20, skip);
      } else {
        console.log('in the else');
        this.searching = true;
        this.advancedSearch(this.searchObj, 20, skip);
      }
    } else {
      console.log('else else');
      this.getCourseLists(20, skip);
    }
  }

  getCourseLists(limit, skip) {
    this.blockUI.start('Loading...');
    this._service
      .getAllCourse(this.regionId, this.locationID, limit, skip)
      .subscribe((res: any) => {
        console.log('Course List', res);
        this.result = res;
        console.log(this.result);
        console.log(this.result.length);
        console.log(this.courseList);
        this.courseList = this.courseList.concat(res);
        console.log(this.courseList);
        console.log(this.courseList.length);
        if (this.courseList.length > 0) {
          this.emptyCourse = false;
          for (var i in this.courseList) {
            let duration = this.courseList[i].coursePlan.lesson.duration;
            // console.log(duration);
            for (var j in this.courseList[i].courses) {
              let date = this.courseList[i].courses[j].startDate;
              if (date) {
                let starttime = date.substring(
                  date.search('T') + 1,
                  date.search('Z') - 7
                );
                // console.log(date);

                // console.log('starttime',starttime);
                let piece = starttime.split(':');
                let mins = piece[0] * 60 + +piece[1] + +duration;
                let endtime =
                  this.D(((mins % (24 * 60)) / 60) | 0) +
                  ':' +
                  this.D(mins % 60);
                // console.log('endtime',endtime)
                this.courseList[i].courses[j].courseDuration = {
                  starttime: starttime,
                  endtime: endtime
                };
              }
              // // console.log(date);
              // // console.log('starttime',starttime);
              // let piece = starttime.split(':');
              // let mins = piece[0]*60 + +piece[1] + +duration;
              // let endtime = this.D(mins%(24*60)/60 | 0) + ':' + this.D(mins%60);
              // // console.log('endtime',endtime)
              // this.courseList[i].courses[j].courseDuration = {"starttime": starttime, "endtime": endtime};
            }
          }
        } else {
          this.emptyCourse = true;
        }
        setTimeout(() => {
          this.blockUI.stop(); // Stop blocking
        }, 500);
      });
  }
  D(data) {
    return (data < 10 ? '0' : '') + data;
  }

  assignUser(course) {
    console.log(course);
    this.router.navigate(['/assign']);
    let obj = {
      courseid: course._id,
      coursename: course.name,
      coursecode: course.courseCode,
      locationId: course.location.locationId
    };
    localStorage.setItem('courseObj', JSON.stringify(obj));
  }

  addNewCourse(plan) {
    this.hideSearch = false;
    this.searchMore = false;
    this.iswordcount = false;
    this.repeatedDaysTemp = [];
    this.tempCategory = [];
    this.tempPlan = [];
    this.searchVal = '';
    this.days = [
      { day: 'Sun', val: 0, checked: false },
      { day: 'Mon', val: 1, checked: false },
      { day: 'Tue', val: 2, checked: false },
      { day: 'Wed', val: 3, checked: false },
      { day: 'Thu', val: 4, checked: false },
      { day: 'Fri ', val: 5, checked: false },
      { day: 'Sat', val: 6, checked: false }
    ];
    localStorage.removeItem('courseID');
    localStorage.removeItem('tempObj');
    this.goBackCat = false;
    this.isCourseCreate = true;
    // this.router.navigate(['/courseCreate']);
    let planObj = {
      name: plan.name,
      id: plan.coursePlanId,
      duration: plan.lesson.duration,
      paymentPolicy: plan.paymentPolicy,
      from: 'courses',
      description: plan.description
    };

    localStorage.setItem('cPlan', JSON.stringify(planObj));
    localStorage.removeItem('courseID');
  }

  showPopup(type, value) {
    this.isEditInv = true;
    console.log('show popup');
    if (type == 'discount') {
      this.showBox = true;
      this.value.discountFee = value;
    } else if (type == 'courseFee') {
      this.feesBox = true;
      this.value.courseFee = value;
    } else if (type == 'deposit') {
      this.depositBox = true;
      this.value.deposit = value;
    } else if (type == 'reg') {
      this.regBox = true;
      this.value.regFee = value;
    }
  }

  cancelPopup(type) {
    if (
      (this.hideReg == true &&
        this.hideDeposit == true &&
        this.hideMisc == true) ||
      this.hideReg == true ||
      this.hideDeposit == true ||
      this.hideMisc == true
    ) {
      this.isEditInv = true;
    } else {
      this.isEditInv = false;
    }
    console.log('hide popup');
    // this.showBox = false;
    if (type == 'discount') {
      this.showBox = false;
      this.value.discountFee = '';
    } else if (type == 'courseFee') {
      this.feesBox = false;
      this.value.courseFee = '';
    } else if (type == 'deposit') {
      this.depositBox = false;
      this.value.deposit = '';
    } else if (type == 'reg') {
      this.regBox = false;
      this.value.regFee = '';
    }
  }

  updateCfee(data) {
    console.log('updateCfee', data);
    this.feesBox = false;
    for (var i in this.invoice) {
      if (this.invoice[i].courseFee.fee != data) {
        console.log('===not same');
        this.updateInvData['courseFee'] = data;
        this.invoice[i].courseFee.fee = Number(data);
        console.log(this.invoice[i].courseFee.fee);
        if (this.invoice[i].courseFee.taxInclusive == true) {
          var taxRate = this.invoice[i].tax.rate;
          var taxAmount = (
            (this.invoice[i].courseFee.fee * taxRate) /
            (100 + taxRate)
          ).toFixed(2);
          this.invoice[i].courseFee.tax = Number(taxAmount);
          console.log('inclusiveTax for CFee', this.invoice[i].courseFee.tax);
          var cFee = (
            this.invoice[i].courseFee.fee - this.invoice[i].courseFee.tax
          ).toFixed(2);
          this.invoice[i].courseFee.fee = Number(cFee);
          this.invoice[i].courseFee.amount = (
            this.invoice[i].courseFee.fee + this.invoice[i].courseFee.tax
          ).toFixed(2);
          this.invoice[i].tax.taxTotal = (
            this.invoice[i].courseFee.tax +
            this.invoice[i].registrationFee.tax +
            this.invoice[i].miscFee.tax
          ).toFixed(2);
          console.log(
            'CFee without inclusive tax',
            this.invoice[i].courseFee.fee
          );
          console.log(
            'Amount without inclusive tax',
            this.invoice[i].courseFee.amount
          );
        } else if (this.invoice[i].courseFee.taxInclusive == false) {
          var taxRate = this.invoice[i].tax.rate;
          var taxAmount = (
            (this.invoice[i].courseFee.fee * taxRate) /
            100
          ).toFixed(2);
          this.invoice[i].courseFee.tax = Number(taxAmount);
          console.log('inclusiveTax for CFee', this.invoice[i].courseFee.tax);
          this.invoice[i].courseFee.amount =
            this.invoice[i].courseFee.fee + this.invoice[i].courseFee.tax;
          this.invoice[i].tax.taxTotal = (
            this.invoice[i].courseFee.tax +
            this.invoice[i].registrationFee.tax +
            this.invoice[i].miscFee.tax
          ).toFixed(2);
          console.log('CFee with exclusive tax', this.invoice[i].courseFee.fee);
          console.log(
            'Fee amount with exclusive tax',
            this.invoice[i].courseFee.amount
          );
        }

        this.calculateHideFees('cFees');
      } else {
        console.log('===same');
      }
    }
    // this.discount = data;
    // this.showBox = false;
  }

  showAssociatePopup() {
    this.showMailPopup = true;
  }

  sendInvoice() {
    this.showStudentOption = '';
    this.xxxhello = '';
    console.log('send Invoice', this.invoiceID);
    var mailArr = [];
    mailArr.push(this.selectedCustomer.email);
    for (var i in this.selectedCustomer.guardianEmail) {
      mailArr.push(this.selectedCustomer.guardianEmail[i]);
    }
    console.log('mailArr', mailArr);
    let body = {
      associatedMails: mailArr
    };
    console.log('body', body);
    this._service
      .invoiceOption(this.regionId, this.invoiceID, body, 'send')
      .subscribe(
        (res: any) => {
          console.log(res);
          this.toastr.success('Successfully sent the Invoice.');
          // this.modalReferencshowTabsModal
          // this.getCourseDetail(this.detailLists._id)
          // this.getUsersInCourse(this.detailLists._id);
          // this.cancelModal();
          if (this.isvalidID == 'inside') {
            console.log('hi');
            // this.cancel();
            this.getCourseDetail(this.detailLists._id);
            this.getUsersInCourse(this.detailLists._id);
            // this.cancelModal();
            this.cancelInvoiceModal();
          } else {
            console.log('else hi');
            // this.cancel();
            this.modalReference.close();
            this.cancelInvoiceModal();
            // this.cancelModal();
            // this.getUsersInCourse(courseId);
          }
        },
        err => {
          console.log(err);
          this.toastr.error('Fail to sent the Invoice.');
        }
      );
  }

  cancelInvoiceModal() {
    this.showStudentOption = '';
    this.xxxhello = '';
    this.modalReference.close();
    this.showList = false;
    this.selectedCustomer = {};
    this.showInvoice = false;
    this.showPayment = false;
    this.showPaidInvoice = false;
    this.paymentItem = {};
    this.hideReg = false;
    this.hideDeposit = false;
    this.hideMisc = false;
    this.isEditInv = false;
    this.singleInv = [];
    this.updateInvData = {};
    this.availableCourses = [];
    this.makeupForm = {};
    this.invPayment = [];
    console.log('hideMisc', this.hideMisc);
    // this.getCourseDetail(this.detailLists._id);
    // this.getUsersInCourse(this.detailLists._id);
    this.activeTab = 'People';
    if (this.isvalidID == 'inside') {
      console.log('hi');
      // this.cancel();
      this.getCourseDetail(this.detailLists._id);
      this.getUsersInCourse(this.detailLists._id);
      // this.cancelModal();
    } else {
      console.log('else hi');
      // this.cancel();
      this.modalReference.close();
      this.courseList = [];
      this.getCourseLists(20, 0);
      // this.cancelModal();
      // this.getUsersInCourse(courseId);
    }
    // this.courseList = [];
    // this.getCourseLists(20,0);
  }

  showPayOption() {
    console.log('pay option');
    this.showPayment = true;
    this.showInvoice = false;
    if (this.invStatus == 'PAID[PARTIAL]') {
      var totalPaid = 0;
      for (var i in this.invPayment) {
        console.log('each payment', this.invPayment[i]);
        totalPaid = totalPaid + this.invPayment[i].amount;
      }
      console.log('total paid', totalPaid);
      this.paymentItem.amount = Number((this.total - totalPaid).toFixed(2));
      console.log('Total Amount for Pay', this.paymentItem.amount);
    } else {
      this.paymentItem.amount = this.total;
    }

    this._service.getPaymentMethod().subscribe((res: any) => {
      console.log(res);
      this.paymentProviders = res;
      this.selectedPayment = this.paymentProviders[0].name;
      this.paymentId = this.paymentProviders[0].id;
    });
  }

  getRegionInfo() {
    this.token = localStorage.getItem('token');
    this.type = localStorage.getItem('tokenType');
    this.blockUI.start('Loading...');
    this._service
      .getRegionalAdministrator(this.regionId, this.token, this.type)
      .subscribe((res: any) => {
        console.log('regional info', res);
        this.blockUI.stop();
        if (
          res.invoiceSettings == {} ||
          res.invoiceSettings == undefined ||
          res.paymentSettings == {} ||
          res.paymentSettings == undefined
        ) {
          console.log('no invoice setting', res.invoiceSettings);
          console.log('no invoice setting', res.paymentSettings);
          this.invoiceInfo = {
            address: '',
            city: '',
            companyName: '',
            email: '',
            prefix: '',
            registration: ''
          };
          this.noSetting = true;
        } else {
          console.log('has invoice setting');
          this.invoiceInfo = res.invoiceSettings;
          this.noSetting = false;
        }
        console.log(this.invoiceInfo);
      });
  }

  choosePayment(type) {
    console.log('choosePayment', type);
    this.selectedPayment = type.name;
    this.paymentId = type.id;
  }

  payNow(type) {
    this.showStudentOption = '';
    this.xxxhello = '';
    console.log('Pay Now', this.paymentItem, this.paymentId);
    let body = {
      regionId: this.regionId,
      refInvoiceId: this.refInvID,
      amount: this.paymentItem.amount.toString(),
      paymentMethod: this.paymentId.toString()
    };
    if (this.paymentItem.refNumber) {
      body['refNo'] = this.paymentItem.refNumber;
    }
    // console.log("data",body);
    this._service.makePayment(this.regionId, body).subscribe(
      (res: any) => {
        console.log(res);
        this.toastr.success(res.message);
        this.cancelInvoiceModal();
      },
      err => {
        if (err.message == 'Amount is overpaid.') {
          this.toastr.success('Amount is overpaid.');
        }
        this.toastr.error('Payment Fail');
      }
    );
  }

  hideInvoiceRow(type) {
    this.isEditInv = true;
    if (type == 'reg') {
      this.hideReg = true;
      this.updateInvData['registrationFee'] = null;
      // this.updateInvData["registrationFee"] = {
      //   'fee': null
      // };
      this.calculateHideFees(type);
    } else if (type == 'deposit') {
      this.hideDeposit = true;
      this.updateInvData['deposit'] = null;
      this.calculateHideFees(type);
    } else if (type == 'misc') {
      this.hideMisc = true;
      this.updateInvData['miscFee'] = null;
      // this.updateInvData["miscFee"] = {
      //   'fee': null
      // };
      this.calculateHideFees(type);
    }
  }

  calculateHideFees(type) {
    console.log('calculateHideFees');
    for (var i in this.invoice) {
      var regFees: number;
      var regTax: number;
      var miscFees: number;
      var miscTax: number;
      var deposit: number;
      var totalTaxes: number;

      if (this.hideReg == true) {
        regFees = 0;
        regTax = 0;
      } else {
        regFees = this.invoice[i].registrationFee.fee;
        regTax = this.invoice[i].registrationFee.tax;
      }

      if (this.hideMisc == true) {
        miscFees = 0;
        miscTax = 0;
      } else {
        miscFees = this.invoice[i].miscFee.fee;
        miscTax = this.invoice[i].miscFee.tax;
      }

      if (this.hideDeposit == true) {
        deposit = 0;
      } else {
        deposit = this.invoice[i].deposit;
      }

      totalTaxes = regTax + miscTax + Number(this.invoice[i].courseFee.tax);
      console.log('Total taxes and deposit', totalTaxes, deposit);
      this.invoice[i].subtotal = (
        regFees +
        miscFees +
        deposit +
        this.invoice[i].courseFee.fee
      ).toFixed(2);
      this.total = Number(
        (Number(this.invoice[i].subtotal) + totalTaxes).toFixed(2)
      );
      this.invoice[i].tax.taxTotal = (
        this.invoice[i].courseFee.tax +
        regTax +
        miscTax
      ).toFixed(2);
      // this.invoice[i].total = Number(totalPrice).toFixed(2);
      // this.total = Number(this.invoice[i].total).toFixed(2);
      console.log('Subtotal', this.invoice[i].subtotal);
      console.log('Total', this.total);
      // console.log("TTT",this.invoice[i].subtotal+totalTaxes)
    }
  }

  printInvoice() {
    window.print();
  }

  updateInvoice() {
    // let data = {};
    // if(this.hideReg == true){
    //   data["registrationFee"] = null;
    // }else if(this.hideDeposit == true){
    //   data["deposit"] = null;
    // }else if(this.invoiceCourse.fees != this.value.courseFee){
    //   data["courseFee"] = this.value.courseFee;
    // }
    this.blockUI.start('Loading...');
    console.log('Inv Update Data', this.updateInvData);
    this._service
      .updateInvoiceInfo(this.invoiceID, this.updateInvData)
      .subscribe(
        (res: any) => {
          this.blockUI.stop();
          console.log(res);
          this.isEditInv = false;
          //for updating invoice ui
          this.singleInv = [];
          this.singleInv.push(res);
          this.invoice = this.singleInv;
          console.log('invoice', this.invoice);
          this.showOneInvoice(this.invoice);
        },
        err => {
          console.log(err);
        }
      );
  }

  // cancelInvoice(){
  //   console.log("Cancel Invoice",this.invoiceID);
  //   let body = '';
  //   this._service.invoiceOption(this.regionId, this.invoiceID, body, 'cancel')
  //   .subscribe((res:any) => {
  //     console.log("res",res);
  //     this.getCourseDetail(this.detailLists._id)
  //     this.getUsersInCourse(this.detailLists._id);
  //     this.cancelModal();
  //   })
  // }
  invoicesOfCourse: any = [];
  isFlexyInvoice: boolean = false;
  showTabsModal(modal, type, data) {
    console.log('show Tabs Modal', data);

    this.showStudentOption = '';
    this.xxxhello = '';
    this.getSingleCustomer(data.userId, type);
    this.singleUserData = data;
    this.modalReference = this.modalService.open(modal, {
      backdrop: 'static',
      windowClass:
        'modal-xl modal-inv d-flex justify-content-center align-items-center'
    });

    if (type == 'transfer') {
      this.getAllAC(20, 0, data.userId);
    } else if (type == 'invoice') {
      if (data.invoice != null) {
        console.log('exit');
        if (this.courseType == 'FLEXY') {
          this.invoicesOfCourse = data.invoicesOfCourse;
          this.isFlexyInvoice = true;
          console.log('invoicesOfCourse', this.invoicesOfCourse);
        }
        this.invoiceID2 = data.invoice._id;

        // this.viewInvoice(data);
      }
    } else if (type == 'makeup') {
      this.activeUserTab = type;
      console.log('ddddd');
      this.getMakeupLists(data.userId, 'course', this.regionId, this.courseId);
    }
    console.log('show Tabs Modal', this.activeUserTab);
  }

  getAllAC(limit, skip, userId) {
    console.log('...XXD', this.availableCourses);
    this._service
      .getAvailabelCourse(
        this.regionId,
        this.singleUserData.userId,
        limit,
        skip
      )
      .subscribe((res: any) => {
        // console.log("Available C",res);
        this.acResult = res;
        this.availableCourses = this.availableCourses.concat(res);
        console.log('Available C', this.availableCourses);
      });
  }

  // cancelTabsModal(){
  //   console.log("cancelTabsModal");
  //   this.modalReference.close();
  //   this.showList = false;
  //   // this.selectedCustomer = {};
  //   // this.selectedTeacherLists = []
  //   this.showInvoice = false;
  //   this.currentDateObj = '';
  //   this.availableCourses = [];
  //   this.activeTab = 'People';
  //   this.makeupForm = {};
  //   this.getCourseDetail(this.detailLists._id);
  //   this.getUsersInCourse(this.detailLists._id);
  // }

  changeSearch(searchWord, userId, limit, skip) {
    this.acWord = searchWord;
    this.userid = userId;
    console.log(searchWord);
    console.log('userid', userId);
    if (skip == '' && limit == '') {
      console.log('First time search');
      var isFirst = true;
      limit = 20;
      skip = 0;
    }
    if (searchWord.length != 0) {
      this.isACSearch = true;
      this._service
        .getSearchAvailableCourse(
          this.regionId,
          searchWord,
          userId,
          limit,
          skip
        )
        .subscribe(
          (res: any) => {
            console.log(res);
            this.acResult = res;
            // this.availableCourses = res;
            if (isFirst == true) {
              console.log('First time searching');
              this.availableCourses = [];
              this.availableCourses = res;
              console.log('Search AC', this.availableCourses);
            } else {
              console.log('Not First time searching');
              this.availableCourses = this.availableCourses.concat(res);
              console.log('Search AC', this.availableCourses);
            }
          },
          err => {
            console.log(err);
          }
        );
    } else {
      console.log('zero', searchWord.length);
      this.availableCourses = [];
      this.getAllAC(20, 0, this.singleUserData.userId);
      this.isACSearch = false;
    }
  }

  showMoreAC(skip, userId) {
    console.log(skip);
    // this.getAC(20, skip, userId);
    if (this.isACSearch == true) {
      console.log('AC Search');
      this.changeSearch(this.acWord, this.userid, 20, skip);
    } else {
      console.log('Not AC search');
      this.getAllAC(20, skip, userId);
    }
  }

  transferClass(course, userid) {
    this.showStudentOption = '';
    this.xxxhello = '';
    console.log('transfer class', course, userid);
    let body = {
      from: this.detailLists._id,
      to: course._id,
      userId: userid
    };
    this._service.transferClass(body).subscribe(
      (res: any) => {
        console.log('res', res);
        this.toastr.success(res.message);
        this.cancelInvoiceModal();
        // this.cancelTabsModal();
      },
      err => {
        console.log(err);
      }
    );
  }
  issueForAbsent(obj, userId) {
    this.showStudentOption = '';
    this.xxxhello = '';
    this._service.makeupPassIssue(obj, this.courseId, userId).subscribe(
      (res: any) => {
        console.log(res);
        this.blockUI.stop();
        this.modalReference.close();
        this.activeTab = 'People';
        this.toastr.success('Makeup pass successfully created.');
        // setTimeout(()=>{
        //   this.toastr.success('Makeup pass successfully created.');
        // },100)
        this.makeupForm = {};
      },
      err => {
        this.modalReference.close();
        // setTimeout(()=>{
        //   this.toastr.error('Fail to issue makeup pass.');
        // },100)
        this.toastr.error('Fail to issue makeup pass.');
        this.blockUI.stop();
        console.log(err);
      }
    );
  }
  issuePass(obj, userId) {
    console.log(obj);
    console.log(userId);
    console.log(this.detailLists._id);
    this.showStudentOption = '';
    this.xxxhello = '';
    this.modalType = ';';
    this._service.makeupPassIssue(obj, this.detailLists._id, userId).subscribe(
      (res: any) => {
        console.log(res);
        this.blockUI.stop();
        this.modalReference.close();
        this.activeTab = 'People';
        this.toastr.success('Makeup pass successfully created.');
        // setTimeout(()=>{
        //   this.toastr.success('Makeup pass successfully created.');
        // },100)
        this.makeupForm = {};
      },
      err => {
        this.modalReference.close();
        // setTimeout(()=>{
        //   this.toastr.error('Fail to issue makeup pass.');
        // },100)
        this.toastr.error('Fail to issue makeup pass.');
        this.blockUI.stop();
        console.log(err);
      }
    );
  }

  backToInvoice() {
    console.log('Back To Invoice');
    this.showPayment = false;
    this.showInvoice = true;
    this.paymentItem = {};
  }

  globalMakeupPass() {
    //this.isGlobal = true;
  }
  showAttendanceBox(e, uID) {
    console.log(this.detailLists.type);
    // if (this.attendenceButton == true) {
    //   e.preventDefault();
    //   e.stopPropagation();
    //   this.yPosition = e.layerY;
    //   this.uId = uID;
    //   this.attdBox = true;
    //   console.log('showAttendanceBox Works', this.uId);
    // }
    e.preventDefault();
    e.stopPropagation();
    this.reScheduleUId = '';
    this.yPosition = e.layerY;
    this.uId = uID;
    this.reScheduleUId = uID;
    this.attdBox = true;
    console.log('showAttendanceBox Works', this.uId);
  }
  public modalType;
  public absentInfo;
  onClickRadio(type, id, modal, user) {
    if (type == 'absent') {
      this.modalType = type;
      this.absentInfo = user;
      this.modalReference = this.modalService.open(modal, {
        backdrop: 'static',
        windowClass:
          'modal-xl modal-inv d-flex justify-content-center align-items-center'
      });
      return;
    }

    this.activeCourseInfo = [];
    console.log('LASD~~~', this.LASD);
    var d = new Date(this.LASD).getUTCDate();
    var m = new Date(this.LASD).getUTCMonth() + 1;
    var y = new Date(this.LASD).getUTCFullYear();
    var obj = {
      studentId: id
    };
    if (type == 'present') {
      obj['attendance'] = 'true';
    } else {
      obj['attendance'] = 'false';
    }
    console.log(d, '/', m, '/', y);
    console.log('obj~~~', obj);
    console.log(this.courseId);
    this._service.markAttendance(this.courseId, obj, d, m, y).subscribe(
      (res: any) => {
        setTimeout(() => {
          this.toastr.success(res.message);
        }, 100);
        console.log('res', res);
        // this.getUsersInCourse(this.courseId);
        this.activeTab = 'Class';
        this.attdBox = false;
        this.getAssignUsers(d, m, y);
      },
      err => {
        console.log(err);
        this.toastr.error('');
      }
    );
  }

  getAssignUsers(d, m, y) {
    this.presentStudent = 0;
    this.absentStudent = 0;
    this.noStudent = 0;
    this.blockUI.start('Loading');
    this._service
      .getAssignUser(this.regionId, this.currentCourse, d, m, y)
      .subscribe(
        (res: any) => {
          console.log(res);
          this.activeCourseInfo = res;
          for (let j = 0; j < this.activeCourseInfo.CUSTOMER.length; j++) {
            if (this.activeCourseInfo.CUSTOMER[j].attendance == true) {
              this.presentStudent += 1;
            } else if (this.activeCourseInfo.CUSTOMER[j].attendance == false) {
              this.absentStudent += 1;
            } else {
              this.noStudent += 1;
            }
          }
          if (this.LASD != null) {
            this.cancelButtonShowHide();
          }
        },
        err => {
          this.blockUI.stop();
          console.log(err);
        }
      );
    setTimeout(() => {
      this.blockUI.stop();
    }, 500);
  }

  getMakeupLists(userId, type, regionId, courseId) {
    this.blockUI.start('Loading...');
    this._service.getMakeupLists(userId, type, regionId, courseId).subscribe(
      (res: any) => {
        this.blockUI.stop();
        console.log(res);
        this.makeupLists = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  //startFlexi
  conflictBoxShow(e) {
    console.log('eee', e);

    this.showcb = e;
    console.log($('.conflictPopUp'));
    // $('.conflictPopUp').show();
    this.FlexiComponent.changes.subscribe(e => {
      if (document.getElementById('flexiMid') != null) {
        let hideoverlay: HTMLElement = document.getElementById('flexiMid');
        hideoverlay.setAttribute('style', 'overflow: hidden;');
      }
    });
  }

  clickOverlay() {
    console.log(this.flexyarr);
    this.showcb = false;
    this.FlexiComponent.changes.subscribe(e => {
      $('.conflictPopUp').hide();
      if (document.getElementById('flexiMid') != null) {
        let hideoverlay: HTMLElement = document.getElementById('flexiMid');
        hideoverlay.setAttribute('style', 'overflow: overlay;');
      }
    });
  }

  backtoCustomer() {
    this.showflexyCourse = false;
    this.showInvoice = false;
    this.showPayment = false;
  }

  lessionObjArr(e) {
    console.log(e);
    this.checkobjArr = e;
  }

  flexicomfirm(invoiceAlert) {
    //add cutomer
    this.stdLists = [];
    if (invoiceAlert) {
      this.invoiceModalReference = this.modalService.open(invoiceAlert, {
        backdrop: 'static',
        windowClass:
          'deleteModal d-flex justify-content-center align-items-center'
      });

      return;
    }
    console.log('call from addCustomer', this.selectedCustomer);
    //sorting array as iso date string
    // var myArray = this.checkobjArr;
    // myArray.sort((a, b) => a.startDate.localeCompare(b.startDate))
    // console.log("sort Array",myArray)
    let lessonBody = {
      userType: this.tempuserType,
      disableInvoice: this.disableInvoice,
      courseId: this.tempCourdeId,
      userId: this.selectedCustomer.userId,
      lessons: this.checkobjArr,
      paymentPolicy: {
        allowProrated: this.isProrated
      }
    };
    console.log('body', lessonBody);
    this.blockUI.start('Loading...');
    this._service
      .assignUser(this.regionId, lessonBody, this.locationID)
      .subscribe((res: any) => {
        console.log('-------->', res);
        if (this.disableInvoice) {
          this.invoiceModalReference.close();
          // this.modalReference.close();
          this.blockUI.stop();
          this.showflexyCourse = false;
          this.cancelInvoiceModal();
          return;
        }
        this.courseInfo = this.detailLists;
        Object.assign(this.courseInfo, res.body);
        console.log('-------->', this.courseInfo);

        console.log('res Assign customer', res);
        if (res.invoiceSettings == {} || res.invoiceSettings == undefined) {
          console.log('no invoice setting');
          this.invoiceInfo = {
            address: '',
            city: '',
            companyName: '',
            email: '',
            prefix: '',
            registration: ''
          };
        } else {
          console.log('has invoice setting');
          this.invoiceInfo = res.invoiceSettings;
        }
        this.blockUI.stop();
        this.invoice = res.invoice;
        this.showInvoice = true;
        this.showflexyCourse = false;
        this.showPayment = false;
        this.isProrated = false;
        this.invoiceID2 = this.detailLists.invoice[0]._id;
        // this.showOneInvoice(this.invoice);
      });

    //add lesson
    console.log(this.checkobjArr);
  }
  // end flexy
  public resechduleList: any = [];
  isReschedule: boolean = false;
  getReschedule(reschedule, user) {
    this.blockUI.start('Loading...');
    this.isReschedule = false;
    this.resechduleList = [];
    this.modalReference = this.modalService.open(reschedule, {
      backdrop: 'static',
      windowClass:
        'modal-xl modal-inv d-flex justify-content-center align-items-center'
    });
    this._service
      .getRescheduleList(
        this.reScheduleCId,
        this.reScheduleUId,
        undefined,
        undefined
      )
      .subscribe((res: any) => {
        console.log(res);
        this.selectedCustomer = user;
        res.teacherDetails = this.pplLists.TEACHER;
        this.resechduleList = res;
        this.isReschedule = true;
        this.blockUI.stop();
      });
  }

  dcount: any;
  defaultCount($event) {
    this.dcount = $event;
    console.log(this.dcount);
  }
  checkArr: any = [];
  lessonsArray;
  checkObj($event) {
    this.lessonsArray = [];

    this.checkArr = JSON.parse(JSON.stringify($event));
    this.lessonsArray = this.checkArr;
  }

  unavaiablelessons: any = [];
  getlen(e) {
    console.log(e);
    this.unavaiablelessons = e;
  }
  public reScheduleCId;
  public reScheduleUId;

  createReschedule(userId, courseId, lessons) {
    lessons.map(lesson => {
      delete lesson.isAvaiable;
      delete lesson.isCheck;
    });
    const obj = {
      lessons
    };
    console.log(userId);
    console.log(courseId);
    console.log(lessons);
    this._service.createStudentReschedule(userId, courseId, obj).subscribe(
      res => {
        console.log(res);
        this.toastr.success('Successfully reschedule.');
        this.getCourseDetail(courseId);
        this.clickTab('Class', 'course');
        this.modalReference.close();
      },
      err => {
        this.toastr.error('Reschedule Failed.');
      }
    );
  }

  confimAlert;
  confirmReschedule(confirmReschedule) {
    if (
      this.checkArr.length == 0 ||
      this.unavaiablelessons.length == this.checkArr.length
    ) {
      this.showRescheduleConfirmModal(confirmReschedule);
    } else {
      this.createReschedule(
        this.reScheduleUId,
        this.reScheduleCId,
        this.lessonsArray
      );
    }
  }

  showRescheduleConfirmModal(confirmReschedule) {
    this.confimAlert = this.modalService.open(confirmReschedule, {
      backdrop: 'static',
      windowClass:
        'deleteModal d-flex justify-content-center align-items-center'
    });
  }

  cancelConfirm() {
    this.confimAlert.close();
  }
  rescheduleConfirm() {
    this.createReschedule(
      this.reScheduleUId,
      this.reScheduleCId,
      this.lessonsArray
    );
    this.confimAlert.close();
    this.modalReference.close();
  }

  onClickAssignRelief(reliefModal, lesson) {
    this.modalReference = this.modalService.open(reliefModal, {
      backdrop: 'static',
      windowClass:
        'modal-xl modal-inv d-flex justify-content-center align-items-center'
    });
  }

  reliefTeacher: any = null;
  checkForRelief(classInfo) {
    console.log('checkForRelief', this.selectedLesson);
    this.selectedLesson = classInfo;
    if (
      this.selectedLesson.makeup != undefined &&
      this.selectedLesson.makeup == true
    ) {
      this._service
        .editProfile(this.regionId, this.selectedLesson.teacherId)
        .subscribe((res: any) => {
          console.log(res);
          this.reliefTeacher = res;
        });
    } else {
      this.reliefTeacher = null;
    }
  }

  cancelReliefModal() {
    console.log('cancel relirf~~~');
    this.modalReference.close();
    return new Promise((resolve, reject) => {
      this.getCourseDetail(this.detailLists._id);
      resolve();
    }).then(() => {
      setTimeout(() => {
        console.log(this.detailLists.lessons[this.currentLessonIdx]);
        this.checkForRelief(this.detailLists.lessons[this.currentLessonIdx]);
      }, 300);
    });
    // this._service
    //   .editProfile(this.regionId, this.selectedLesson.teacherId)
    //   .subscribe((res: any) => {
    //     console.log(res);
    //   });
  }

  viewSingleInvoice(id) {
    console.log('id', id, this.activeUserTab);
    this.invoiceID2 = id;
    this.isFlexyInvoice = false;
  }

  backToInvoiceList() {
    this.isFlexyInvoice = true;
  }
}
