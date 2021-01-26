import { LessonDurationPipe } from './../../../../service/pipe/lesson-duration.pipe';
import { filter } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CustomerComponent } from './../customer.component';
import { UserGradingComponent } from './../../../apg/user-grading/user-grading.component';
import { FilterPipe } from './../../../../service/pipe/filter.pipe';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Component,
  OnInit,
  HostListener,
  ViewChildren,
  QueryList,
  ViewChild
} from '@angular/core';
import { appService } from '../../../../service/app.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../../../service/data.service';
import { environment } from '../../../../../environments/environment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
// import moment = require('moment');
import * as moment from 'moment';
import * as $ from 'jquery';
import { Location } from '@angular/common';
import { FlexiComponent } from '../../../flexi/flexi.component';
import { ISubscription } from 'rxjs/Subscription';
import { ModalDirective } from 'ngx-bootstrap';
import { concat } from 'rxjs/observable/concat';

@Component({
  selector: 'app-enroll-user',
  templateUrl: './enroll-user.component.html',
  styleUrls: ['./enroll-user.component.css']
})
export class EnrollUserComponent implements OnInit {
  @ViewChildren(FlexiComponent) private FlexiComponent: QueryList<
    FlexiComponent
  >;
  public backToCourse: any;
  //public clickCancel: any;
  public seatLeft = 0;
  ngOnInit(): void {
    console.log(this.userLists.length);
    this.enrollUserList = [];
    this.userType = localStorage.getItem('userType');
    console.log(
      'User Type from local storage ' + localStorage.getItem('userType')
    );
    this.courseId = localStorage.getItem('COURSEID');
    this.backToCourse = `/coursedetail/${this.courseId}/customers`;
    console.log(' I got Id : ' + this.courseId);
    // this.getUsersInCourse(this.courseId);
    this.getCourseDetail(this.courseId);
    this.permissionSubscription = this._service.permissionList.subscribe(
      data => {
        this.permissionType = data;
        this.checkPermission();
      }
    );
  }

  ngOnDestroy() {
    this.permissionSubscription.unsubscribe();
  }

  clickCancel() {
    this._location.back();
  }

  constructor(
    private _service: appService,
    private router: Router,
    private modalService: NgbModal,
    public toastr: ToastrService,
    public dataservice: DataService,
    public route: ActivatedRoute,
    private _location: Location
  ) {}

  private permissionSubscription: ISubscription;

  @HostListener('document:click', ['$event'])
  public test(event): void {
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
  }

  public detailLists = {
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
    },
    seat_left: null,
    type: '',
    _id: '',
    lessons: [],
    locationId: '',
    name: ''
  };

  //copy
  courseList: Array<any> = [];
  code: any;
  public courseTypeDisabled = environment.courseTypeDisabled;
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
  public temp: any;
  public studentArray = [];
  public days = [
    { day: 'Sun', val: 0, checked: true },
    { day: 'Mon', val: 1, checked: true },
    { day: 'Tue', val: 2, checked: true },
    { day: 'Wed', val: 3, checked: true },
    { day: 'Thu', val: 4, checked: true },
    { day: 'Fri ', val: 5, checked: true },
    { day: 'Sat', val: 6, checked: true }
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
  //public userType: any;
  public userType: any = 'customer';
  public deleteId: any = {};
  public modalReference: any;
  public regionId = localStorage.getItem('regionId');
  public locationID = localStorage.getItem('locationId');
  public absentmakeupLists: any = [];
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
  //start flexy
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
  isProrated: boolean = false;
  public showflexyCourse: boolean = false;
  public isDisabledBtn = false;
  public isTodayLesson: boolean = false;
  public isNewLesson: boolean = false;
  public defineType: any;
  public gtxtColor: any;
  public gbgColor: any;
  //reschedule
  public isRescheduleLesson: boolean;
  public isReview: boolean = false;

  //
  currentLessonIdx: any = null;
  selectedLesson: any = null;
  lastSelectedObj: any = null;
  public reScheduleCId;
  public reScheduleUId;
  public loading: boolean;

  getCourseDetail(id) {
    this._service.getSingleCourse(id, this.locationID).subscribe(
      (res: any) => {
        // console.log('here details list', res);
        this.detailLists = res;
        // console.log(
        //   this.detailLists.seat_left +
        //     ' this.deatailLists.seat_left from get course detail'
        // );
        if (this.detailLists.seat_left !== null) {
          this.seatLeft = this.detailLists.seat_left;
        }
        this.courseId = res._id;
        this.locationId = res.locationId;
        this.draft = res.draft;
        this.courseType = res.type;
        this.loading = false;
        if (res.lessons.length > 0) {
          this.disabledTab = false;
        } else {
          this.disabledTab = true;
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  getCourseLists(limit, skip) {
    //this.blockUI.start('Loading...');
    this._service
      .getAllCourse(this.regionId, this.locationID, limit, skip)
      .subscribe((res: any) => {
        // console.log('Course List', res);
        this.result = res;
        // console.log(this.result);
        // console.log(this.result.length);
        // console.log(this.courseList);
        this.courseList = this.courseList.concat(res);
        // console.log(this.courseList);
        // console.log(this.courseList.length);
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
            }
          }
        } else {
          this.emptyCourse = true;
        }
        setTimeout(() => {
          //this.blockUI.stop(); // Stop blocking
        }, 500);
      });
  }

  D(data) {
    return (data < 10 ? '0' : '') + data;
  }

  checkPermission() {
    //console.log(this.permissionType);
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
    //console.log(this.coursePermission.includes('VIEWCOURSE'));

    // this.courseDemo['addCourse'] = this.coursePermission.includes(
    //   'CREATECOURSE'
    // )
    //   ? 'CREATECOURSE'
    //   : '';
    // this.courseDemo['viewCourse'] = this.coursePermission.includes('VIEWCOURSE')
    //   ? 'VIEWCOURSE'
    //   : '';
    // this.courseDemo['editCourse'] = this.coursePermission.includes('EDITCOURSE')
    //   ? 'EDITCOURSE'
    //   : '';
    // this.courseDemo['deleteCourse'] = this.coursePermission.includes(
    //   'DELETECOURSE'
    // )
    //   ? 'DELETECOURSE'
    //   : '';
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
    // this.courseDemo['createCP'] = this.coursePermission.includes(
    //   'CREATECOURSEPLAN'
    // )
    //   ? 'CREATECOURSEPLAN'
    //   : '';
    // this.courseDemo['viewCP'] = this.coursePermission.includes('VIEWCOURSEPLAN')
    //   ? 'VIEWCOURSEPLAN'
    //   : '';
    // this.courseDemo['editCP'] = this.coursePermission.includes('EDITCOURSEPLAN')
    //   ? 'EDITCOURSEPLAN'
    //   : '';

    if (this.coursePermission.includes('VIEWCOURSE') != false) {
      this.locationName = localStorage.getItem('locationName');
      this.locationID = localStorage.getItem('locationId');
      this.gtxtColor = localStorage.getItem('txtColor');
      this.gbgColor = localStorage.getItem('backgroundColor');
      // console.error(this.gbgColor, 'backgroundColor', this.gtxtColor);

      console.log('hi permission', this.locationName, this.locationID);
      // this.getCPlanList(0,20);
      this.courseList = [];
      this.getCourseLists(20, 0);
    } else {
      console.log('permission deny');
      this.courseList = [];
    }
  }

  public optionsBoxStdID = '';

  showOptionsBox(stdID, e) {
    e.preventDefault();
    e.stopPropagation();

    if (this.optionsBoxStdID !== stdID) {
      this.optionsBoxStdID = stdID;
      this.yPosition = e.layerY + 40;
    }
    //this.yPosition = e.layerY + 40;
    // this.yPosition = e.offsetY - 30;
    this.showStudentOption = stdID;
    this.optionBox = true;
    this.xxxhello = stdID;
    console.log(this.showStudentOption);
    // this.router.navigate(['/customer']);
  }

  getSingleCustomer(ID, type?) {
    //this.blockUI.start('Loading...');
    // console.log(this.detailLists);
    console.log('this.selectedCustomer', this.selectedCustomer);
    console.log(this.detailLists);
    this._service.editProfile(this.regionId, ID).subscribe((res: any) => {
      //this.blockUI.stop();
      // console.log('selected Customer', res);
      //console.log(res);
      res.details.map(info => {
        if (info.controlType === 'Datepicker')
          info.value = moment(info.value).format('YYYY-MM-DD');
      });

      this.activeUserTab = type;

      this.custDetail.user = res;
      console.log('custDetail --->', this.custDetail);
      this.selectedCustomer = res;
      //apo
      this.selectedUserLists.push(res);
      console.log(this.selectedUserLists);
      //apoend
      this.stdLists = this.selectedCustomer.userId;
      console.log(this.stdLists);
      if (this.detailLists.type == 'FLEXY') {
        console.log('I am flexy');
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

  invoicesOfCourse: any = [];
  isFlexyInvoice: boolean = false;

  // showTabsModal(modal, type, data) {
  //   this.isFlexyInvoice = false;
  //   console.log('show Tabs Modal', data);
  //   console.warn(type, 'type');

  //   this.showStudentOption = '';
  //   this.xxxhello = '';
  //   this.getSingleCustomer(data.userId, type);
  //   this.singleUserData = data;
  //   this.modalReference = this.modalService.open(modal, {
  //     backdrop: 'static',
  //     windowClass:
  //       'modal-xl modal-inv d-flex justify-content-center align-items-center'
  //   });

  //   if (type == 'transfer') {
  //     this.getAllAC(20, 0, data.userId);
  //   } else if (type == 'invoice') {
  //     console.warn('just show invoice', data);
  //     if (data.invoice != null) {
  //       console.warn('exit', data);
  //       if (this.courseType == 'FLEXY') {
  //         this.invoicesOfCourse = data.invoicesOfCourse;
  //         this.isFlexyInvoice = true;
  //         console.warn('invoicesOfCourse', this.invoicesOfCourse);
  //       }
  //       this.invoiceID2 = data.invoice._id;

  //       // this.viewInvoice(data);
  //     }
  //   } else if (type == 'makeup') {
  //     this.activeUserTab = type;
  //     console.log('ddddd');
  //     this.getMakeupLists(data.userId, 'course', this.regionId, this.courseId);
  //   }
  //   console.log('show Tabs Modal', this.activeUserTab);
  //   console.warn(this.isFlexyInvoice, 'flexy invoice');
  // }

  getMakeupLists(userId, type, regionId, courseId) {
    //this.blockUI.start('Loading...');
    this._service.getMakeupLists(userId, type, regionId, courseId).subscribe(
      (res: any) => {
        //this.blockUI.stop();
        console.log(res);
        this.makeupLists = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  // cancelInvoiceModal() {
  //   this.showStudentOption = '';
  //   this.xxxhello = '';
  //   //this.modalReference.close();
  //   this.showList = false;
  //   this.selectedCustomer = {};
  //   this.showInvoice = false;
  //   this.showPayment = false;
  //   this.showPaidInvoice = false;
  //   this.paymentItem = {};
  //   this.hideReg = false;
  //   this.hideDeposit = false;
  //   this.hideMisc = false;
  //   this.isEditInv = false;
  //   this.singleInv = [];
  //   this.updateInvData = {};
  //   this.availableCourses = [];
  //   this.makeupForm = {};
  //   this.invPayment = [];
  //   console.log('hideMisc', this.hideMisc);
  //   // this.getCourseDetail(this.detailLists._id);
  //   // this.getUsersInCourse(this.detailLists._id);
  //   this.activeTab = 'People';
  //   if (this.isvalidID == 'inside') {
  //     console.log('hi');
  //     // this.cancel();
  //     this.getCourseDetail(this.detailLists._id);
  //     console.log('call getUsersInCourse from swap');
  //     //this.getUsersInCourse(this.detailLists._id);
  //     // this.cancelModal();
  //   } else {
  //     console.log('else hi');
  //     // this.cancel();
  //     //this.modalReference.close();
  //     this.courseList = [];
  //     this.getCourseLists(20, 0);
  //     // this.cancelModal();
  //     // this.getUsersInCourse(courseId);
  //   }
  //   // this.courseList = [];
  //   // this.getCourseLists(20,0);
  // }

  cancelInvoiceModal() {
    this.showStudentOption = '';
    this.xxxhello = '';
    //this.modalReference.close();
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
  }

  closeInvoiceModal() {
    console.log('Close invoice modal');
    this.invoiceModalReference.close();
    this.cancelInvoiceModal();
    this.router.navigateByUrl(`/coursedetail/${this.courseId}/customers`);
  }

  getAllAC(limit, skip, userId) {
    console.log('...XXD', this.availableCourses);
    this._service
      .getAvailabelCourse(
        this.regionId,
        this.singleUserData.userId,
        limit,
        skip,
        null
      )
      .subscribe((res: any) => {
        // console.log("Available C",res);
        this.acResult = res;
        this.availableCourses = this.availableCourses.concat(res);
        console.log('Available C', this.availableCourses);
      });
  }

  clickTab(type, state) {
    this.isNewLesson = false;
    // this.isRescheduleLesson= JSON.parse(localStorage.getItem('isRescheduleLesson'));
    // console.log("is reschedule lesson",this.isRescheduleLesson);
    console.warn(type, state);
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
      //this.blockUI.start('Loading...');
      const today = new Date();
      this.todayDate = today.toISOString();
      var to_day = new Date(today).getUTCDate();
      var currentMonth = new Date(today).getUTCMonth() + 1;
      var currentYear = new Date(today).getUTCFullYear();
      let lessonCount = this.detailLists.lessons;
      console.log(lessonCount);
      console.log(lessonCount.length);
      console.log(this.selectedLesson);

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
        console.warn(this.LASD, 'last');
        console.warn(this.lastSelectedObj, 'last selected date');
        console.warn(this.selectedLesson);
        this.lastSelectedObj = this.selectedLesson;
        console.warn(this.lastSelectedObj, 'last selected dat');
      } else {
        console.log('hello in else', lessonCount[0].startDate);
        lastActiveDate = 0;
        this.currentLessonIdx = 0;
        this.checkForRelief(lessonCount[0]);
        this.LASD = lessonCount[0].startDate;
        this.currentDateObj = lessonCount[0]._id;
        this.cancelUi = lessonCount[0].cancel == true ? false : true;
        this.disableCancel = lessonCount[0].cancel == true ? true : false;
        console.log('~~ dateID ~~', this.currentDateObj);
        console.warn(this.LASD, 'last');
        console.warn(this.lastSelectedObj, 'last selected date');
        console.warn(this.selectedLesson);
        this.lastSelectedObj = this.selectedLesson;
        console.warn(this.lastSelectedObj, 'last selected date');
      }

      console.log(this.LASD);
      // this.lastSelectedObj = null;

      // ACD = activeCourseDate/Month/Year
      let ACD = new Date(this.LASD).getUTCDate();
      let ACM = new Date(this.LASD).getUTCMonth() + 1;
      let ACY = new Date(this.LASD).getUTCFullYear();
      console.log('ACD', ACD);
      console.log('ACM', ACM);
      console.log('ACY', ACY);
      this._service
        .getAssignUser(this.regionId, this.currentCourse, ACD, ACM, ACY)
        .subscribe(
          (res: any) => {
            console.log(res);
            //this.blockUI.stop();
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
            //this.blockUI.stop();
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
            //this.blockUI.stop();
            console.log(err);
          }
        );
      this.noStudent = 0;
      this.presentStudent = 0;
      this.absentStudent = 0;
    } else if (type == 'People') {
      this.isRescheduleLesson = false;
      this.noStudent = 0;
      this.presentStudent = 0;
      this.absentStudent = 0;
      this.currentDateObj = '';
    } else if (type == 'transfer') {
      this.getAllAC(20, 0, this.singleUserData.userId);
    } else if (type == 'invoice') {
      console.warn('tab inv user id', this.singleUserData);
      console.warn(this.courseType);
      console.warn(this.singleUserData);
      if (this.singleUserData.invoicesOfCourse) {
        if (this.courseType == 'FLEXY') {
          this.invoicesOfCourse = this.singleUserData.invoicesOfCourse;
          this.isFlexyInvoice = true;
        } else {
          this.isFlexyInvoice = false;
        }
      }

      this.viewInvoice(this.singleUserData);
    }
  }

  reliefTeacher: any = null;
  checkForRelief(classInfo) {
    this.selectedLesson = classInfo;
    console.warn('checkForRelief', this.selectedLesson);
    if (
      this.selectedLesson.makeup != undefined &&
      this.selectedLesson.makeup == true
    ) {
      this._service
        .editProfile(this.regionId, this.selectedLesson.teacherId)
        .subscribe((res: any) => {
          console.warn(res);
          this.reliefTeacher = res;
        });
    } else {
      this.reliefTeacher = null;
    }
  }

  viewInvoice(data) {
    this.isvalidID = 'inside';
    this.singleInv = [];
    this.invoiceID2 = this.singleUserData.invoice._id;
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
  }

  cancelButtonShowHide() {
    console.log(this.LASD);
    let lsessonTime = this.LASD.toLocaleString().substring(11, 19);
    let lessonDate = this.LASD.toLocaleString().substring(0, 10);

    var todaydate = new Date();
    let onlytodayTime = todaydate.toString().substring(16, 24);
    let onlytodayDate = todaydate.toISOString().substring(0, 10);
    console.log(this.todayDate, 'today');
    console.log('.....', onlytodayTime);
    console.log('.....', this.cancelUi);

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

    console.error(this.showCancelButton);
  }

  backToInvoiceList() {
    this.isFlexyInvoice = true;
  }

  public modalType;

  issuePass(obj, userId) {
    console.log(obj);
    console.log(userId);
    console.log(this.detailLists._id);
    this.showStudentOption = '';
    this.xxxhello = '';
    this.modalType = ';';
    // obj.lessonId = this.selectedLesson._id;
    console.log('obj', obj);
    this._service.makeupPassIssue(obj, this.detailLists._id, userId).subscribe(
      (res: any) => {
        console.log(res);
        //this.blockUI.stop();
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
        //this.blockUI.stop();
        console.log(err);
      }
    );
  }

  onClickCustomer(id) {
    // localStorage.setItem("courseCustomer",id)
    console.log('*-------*', id);

    this.router.navigate(['/customer']);
    this.dataservice.nevigateCustomer(id);
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

  // withdrawUser(id) {
  //   let userobj = {
  //     courseId: this.courseId,
  //     userId: id
  //   };
  //   this._service
  //     .withdrawAssignUser(this.regionId, userobj, this.locationId)
  //     .subscribe(
  //       (res: any) => {
  //         this.modalReference.close();
  //         console.log(res);
  //         this.toastr.success('User successfully withdrawled.');
  //         this.getCourseDetail(this.courseId);
  //         //this.getUsersInCourse(this.courseId);
  //       },
  //       err => {
  //         this.toastr.error('Withdrawal user failed.');
  //         this.modalReference.close();
  //         console.log(err);
  //       }
  //     );
  // }

  cancelModal() {
    console.log('....');
    //this.modalReference.close();
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
    //this.stdLists = [];
    this.trArrayLists = [];
    this.flexyarr = [];
    this.showflexyCourse = false;
    this.tempCourdeId = '';
    this.tempuserType = '';
    this.isProrated = false;
    this.isDisabledBtn = false;
    this._location.back();
  }

  selectCustomer(state, id, type) {
    console.log('select customer', id);
    console.log('user list ', this.userLists.length);
    this.getSingleCustomer(id);
    //this.formData = {};
  }

  addUserModal(type, userModal, state, id, courseType) {
    this.router.navigateByUrl(`/coursedetail/${this.courseId}/enroll`);
  }
  backClicked() {
    this._location.back();
  }

  focusMethod(e, userType) {
    console.log(e);
    console.log(userType);
    this.isFous = true;
    //this.userLists = []; apo
    // this.getAllUsers(userType);
  }

  hideFocus(e) {
    console.log('hide focus', this.isFous);
    console.log('show list', this.showList);

    // setTimeout(() => {
    //   this.isFous = false;
    //   this.showList = false;
    // }, 300);
    //this.formData = {};
  }

  searchUserList: any = [];

  getUsersInCourse(courseId) {
    this.reScheduleCId = '';
    console.log('hi call course', courseId);
    localStorage.setItem('COURSEID', courseId);
    // this.getCourseDetail(courseId);
    this.courseId = courseId;
    this.reScheduleCId = courseId;
    //this.blockUI.start('Loading...');
    this._service
      .getAssignUser(this.regionId, courseId, null, null, null)
      .subscribe(
        (res: any) => {
          //this.blockUI.stop();
          console.log(res);
          this.pplLists = res;
        },
        err => {
          console.log(err);
        }
      );
  }

  changeMethod2(searchWord, userType) {
    if (searchWord.length == 0) {
      this.changeMethod(searchWord, userType);
    }
  }

  private searchword = '';

  changeMethod(searchWord, userType) {
    this.searchword = searchWord;
    this.loading = true;
    console.log(this.detailLists.locationId);
    console.log(searchWord);
    console.log(userType);
    console.log(this.courseId);
    let locationId = this.detailLists.locationId;
    console.log(this.selectedUserLists);
    console.log(this.selectUser);
    // this.selectedUserLists = [];

    userType = userType == 'teacher' ? 'staff' : userType;
    if (searchWord.length != 0) {
      // this.enrollUserList = [];
      this.userLists = [];
      //this.seatLeft = this.detailLists.seat_left;
      setTimeout(() => {
        this.getUsersInCourse(this.courseId); // Stop blocking
      }, 1000);
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
            res.map(item => {
              item.addOrRemove = 'add-user';
            });
            this.loading = false;
            if (this.courseType == 'FLEXY') {
              this.userLists = res;
              this.selectedUserLists = this.selectUser;
            } else {
              this.userLists = res;
              this.enrolledCustomer = this.pplLists.CUSTOMER;
              //console.log(this.enrolledCustomer[0].userId);
              for (var i = 0; i < this.enrolledCustomer.length; i++) {
                this.removeEnrolledUser(this.enrolledCustomer[i]);
              }
              for (var i = 0; i < this.enrollUserList.length; i++) {
                this.removeEnrolledUser(this.enrollUserList[i]);
              }

              // this.userLists=this.userLists.filter(item => item.userId != this.enrolledCustomer[0].userId)
            }
            // setTimeout(() => {
            //   this.loading = false;
            // }, 1000);

            //this.loading=false
            // console.log(this.userLists);
            // console.log('length of user list ' + this.userLists.length);
          },
          err => {
            console.log(err);
          }
        );
    } else if (searchWord.length == 0) {
      this.loading = false;
      this.userLists = [];
      this.showList = false;
    }
  }

  getSingleUser(ID, state) {
    console.log('~~~ ', state);
    //this.blockUI.start('Loading...');
    this._service.editProfile(this.regionId, ID).subscribe(
      (res: any) => {
        //this.blockUI.stop();
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

  selectUser(state, id, type) {
    console.log(this.detailLists.seat_left);
    console.log(this.selectedUserLists.length);
    console.log('hihi ~~');
    this.getSingleUser(id, state);
    //this.formData = {};
  }

  //my func
  enrollUserList: any = [];
  enrollAssistantTeacherList: any = [];
  isHideSelected: boolean = false;

  enrolledCustomer: any = [];

  removeEnrolledUser(user) {
    this.userLists = this.userLists.filter(item => item.userId != user.userId);
  }

  public found = null;

  chooseCustomer(user) {
    console.log('user', user);
    this.custDetail.user = user;
    console.log(this.detailLists);
    console.log(this.seatLeft);
    if (
      this.seatLeft <= 0 &&
      this.detailLists.seat_left !== null &&
      this.courseType !== 'FLEXY'
    ) {
      this.toastr.error('You can not select because no more seat.');
    } else if (this.courseType == 'FLEXY') {
      console.log('I am in FLEXY');
      setTimeout(() => {
        this.getUsersInCourse(this.courseId);
      }, 1000);
      if (this.seatLeft <= 0 && this.detailLists.seat_left !== null) {
        console.log(user.userId);
        //flexy reEnroll
        this.enrolledCustomer = this.pplLists.CUSTOMER;
        var earlierCount = this.enrolledCustomer.length;
        this.enrolledCustomer = this.enrolledCustomer.filter(
          item => item.userId != user.userId
        );
        var currentCount = this.enrolledCustomer.length;
        this.found = earlierCount - currentCount;
        console.log(
          'found is ' + this.found + ' and seatLeft is ' + this.seatLeft
        );

        this.userLists.map(item => {
          item.addOrRemove = 'add-user';
          if (item.userId == user.userId) {
            item.addOrRemove = 'remove-user';
          }
        });
        this.enrollUserList.pop();
        this.enrollUserList.push(user);

        //this.toastr.error('Old student only can be enrolled')

        //multienrolluser block

        //this.seatLeft--;
      } else {
        this.userLists.map(item => {
          item.addOrRemove = 'add-user';
          if (item.userId == user.userId) {
            item.addOrRemove = 'remove-user';
          }
        });
        //multienrolluser block
        this.enrollUserList.pop();
        this.enrollUserList.push(user);
        // --this.seatLeft;
        console.log('from choose customer flexy' + this.seatLeft);
      }
    } else {
      this.userLists.map(item => {
        item.addOrRemove = 'add-user';
        if (item.userId == user.userId) {
          item.addOrRemove = 'remove-user';
        }
      });
      //multienrolluser block
      this.enrollUserList.pop();
      this.enrollUserList.push(user);
      // --this.seatLeft;
      console.log('from choose customer flexy' + this.seatLeft);
      // this.userLists.map(item => {
      //   if (item.userId == user.userId) {
      //     item.addOrRemove = 'remove-user';
      //     this.enrollUserList.push(user);
      //   }
      // });
      // --this.seatLeft;
      // console.log('from choose customer regular' + this.seatLeft);
    }
    //this.showAndHideModal()
  }

  // @ViewChild('showSelectedCustomer') showSelectedCustomer: ModalDirective;

  // showAndHideModal() {
  //   this.showSelectedCustomer.show();

  //   setTimeout(() => {
  //     this.showSelectedCustomer.hide();
  //   }, 1500);
  // }

  chooseStaff(user) {
    this.userLists.map(item => {
      if (item.userId == user.userId) {
        item.addOrRemove = 'remove-user';
        this.enrollUserList.push(user);
        this.formData = {};
      }
    });
  }

  chooseTeacher(user) {
    this.userLists.map(item => {
      item.addOrRemove = 'add-user';
      if (item.userId == user.userId) {
        item.addOrRemove = 'remove-user';
      }
    });
    console.log('my block work');
    //multienrolluser block
    this.enrollUserList.pop();
    this.enrollUserList.push(user);
  }

  unchooseCustomer(user) {
    this.enrollUserList = this.enrollUserList.filter(
      removeuser => removeuser !== user
    );
    console.log(this.enrollUserList);
    this.userLists.map(item => {
      if (item.userId == user.userId) {
        item.addOrRemove = 'add-user';
      }
    });
    console.log('From unchoose ' + this.seatLeft);
    // if (this.seatLeft >= 0) {
    //   ++this.seatLeft;
    // }
    console.log('From unchoose ' + this.seatLeft);
  }

  unchooseTeacher(user) {
    this.enrollUserList = [];
    this.userLists.map(item => {
      if (item.userId == user.userId) {
        item.addOrRemove = 'add-user';
      }
    });
  }

  unchooseStaff(user) {
    this.enrollUserList = this.enrollUserList.filter(
      removeuser => removeuser !== user
    );
    console.log(this.enrollUserList);
    this.userLists.map(item => {
      if (item.userId == user.userId) {
        item.addOrRemove = 'add-user';
      }
    });
  }

  chooseUser(user) {
    switch (user.addOrRemove) {
      case 'add-user':
        switch (this.userType) {
          case 'teacher':
            this.chooseTeacher(user);
            break;
          case 'staff':
            this.chooseStaff(user);
            break;
          case 'customer':
            this.chooseCustomer(user);
            break;
          default:
            console.error('user type is not undefined in add-user');
        }
        break;
      case 'remove-user':
        switch (this.userType) {
          case 'teacher':
            this.unchooseTeacher(user);
            break;
          case 'staff':
            this.unchooseStaff(user);
            break;
          case 'customer':
            this.unchooseCustomer(user);
            break;
          default:
            console.error('user type is not undefined in remove-user');
            break;
        }
    }
  }

  // chooseUser(user) {
  //   if (user.addOrRemove == 'add-user') {
  //     if (this.userType == 'teacher') {
  //       this.chooseTeacher(user);
  //       console.log('Teacher');
  //     } else if (this.userType == 'staff') {
  //       this.chooseStaff(user);
  //       console.log('Staff');
  //     } else {
  //       this.chooseCustomer(user);
  //       console.log('Customer');
  //     }
  //   } else {
  //     if (this.userType == 'teacher') {
  //       this.enrollUserList = [];
  //       this.userLists.map(item => {
  //         if (item.userId == user.userId) {
  //           item.addOrRemove = 'add-user';
  //         }
  //       });
  //     } else if (this.userType !== 'teacher') {
  //       this.enrollUserList = this.enrollUserList.filter(
  //         removeuser => removeuser !== user
  //       );
  //       console.log(this.enrollUserList);
  //       this.userLists.map(item => {
  //         if (item.userId == user.userId) {
  //           item.addOrRemove = 'add-user';
  //         }
  //       });
  //       if (this.userType == 'customer') {
  //         this.seatLeft++;
  //       }
  //     }
  //   }
  // }

  // chooseUser(user) {
  //   console.log('this.seatLeft ' + this.seatLeft + ' detailLists.seat_left ' + this.detailLists.seat_left)
  //   if (user.addOrRemove == 'add-user') {
  //     if (this.seatLeft <= 0) {
  //       this.toastr.error('You can not select because no more seat.');
  //     } else {
  //       this.userLists.map(item => {
  //         if (
  //           item.userId == user.userId &&
  //           (this.courseType == 'FLEXY' || this.userType == 'teacher')
  //         ) {
  //           this.userLists.map(myitem => {
  //             if (myitem.userId != user) {
  //               myitem.selected = false;
  //               myitem.addOrRemove = 'add-user';
  //             }
  //           }); // set for all
  //           item.selected = true;
  //           item.addOrRemove = 'remove-user';
  //           console.log('my block work');
  //           //multienrolluser block
  //           this.enrollUserList.pop();
  //           this.enrollUserList.push(user);
  //         } else if (this.courseType == 'FLEXY' || this.userType == 'staff') {
  //           this.userLists.map(myitem => {
  //             if (myitem.userId == user) {
  //               item.selected = true;
  //               item.addOrRemove = 'remove-user';
  //               this.enrollAssistantTeacherList.push(user);
  //               this.formData = {}
  //             }
  //           });

  //         } else if (item.userId == user.userId && this.courseType !== 'FLEXY') {
  //           this.seatLeft--;
  //           item.selected = true;
  //           item.addOrRemove = 'remove-user';
  //           this.enrollUserList.push(user);
  //         }
  //       });
  //       this.toastr.success(user.preferredName + 'has selected.');
  //     }

  //   } else if (user.addOrRemove == 'remove-user') {
  //     this.seatLeft++
  //     this.userLists.filter(item => {
  //       if (item.userId == user.userId) {
  //         item.selected = false;
  //         item.addOrRemove = 'add-user';
  //         this.enrollUserList = this.enrollUserList.filter(
  //           item => item != user
  //         );
  //         this.enrollAssistantTeacherList = this.enrollAssistantTeacherList.filter(
  //           item => item != user
  //         )
  //         return console.log(this.userLists, this.enrollAssistantTeacherList);
  //       }
  //     });
  //     this.toastr.success(user.preferredName + 'has unselected.');
  //   }
  //   console.log('this.seatLeft ' + this.seatLeft + ' detailLists.seat_left ' + this.detailLists.seat_left)
  // }

  showSelectedUserView = false;
  showFlexyBox = false;
  // showSelectedUserViewFunc() {
  //   this.showSelectedUserView = true;
  //   console.log('this.enrollUserList');
  //   console.log(this.enrollUserList);
  // }

  swapTeacherToCourse(courseId, teacherId) {
    let body = {
      newTeacherId: teacherId
    };
    //this.blockUI.start('Loading...');
    this._service.swapTeacher(courseId, body).subscribe(
      (res: any) => {
        //this.blockUI.stop();
        this.toastr.success('Teacher successfully swaped.');
        console.log(res);
        //this.modalReference.close();
        // this.getCourseDetail(courseId)
        //this.getUsersInCourse(courseId);
        this._location.back();
        //this.router.navigateByUrl(`coursedetail/${courseId}/customers`);
      },
      err => {
        //this.modalReference.close();
        //this.blockUI.stop();
        this.toastr.error('Swap teacher failed.');
        console.log(err);
      }
    );
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

  enrollUserToCourse(courseId, userType) {
    console.log(courseId + ' course id ' + userType + ' user type');
    //this.router.navigateByUrl(`coursedetail/${courseId}/customer/customers`);
    console.log('call from enrolluser', this.isvalidID);
    // let type = userType;
    // type = (userType == 'staff') ? 'teacher' : 'customer'
    this.getSelectedUserId();
    let body = {
      courseId: courseId,
      userId: '',
      userType: userType
    };
    this.enrollUserList.map(item => {
      if (body.userId == '') {
        body.userId = item.userId;
      } else {
        body.userId += ',' + item.userId;
      }
    });

    if (this.courseType == 'FLEXY') {
      console.log('It is flexy');
      console.log(this.enrollUserList[0].userId);
      let startDate;
      let endDate;
      this._service
        .getFlexi(courseId, this.enrollUserList[0].userId, startDate, endDate)
        .subscribe(
          (res: any) => {
            console.log('This is add assistant result ');
            console.log(res);
            this.flexyarr = res;
            this.showInvoice = false;
            this.showflexyCourse = true;
            //this.blockUI.stop();
          },
          err => {
            console.log(err);
          }
        );
      this.showSelectedUserView = false;
      this.showFlexyBox = true;
    } else {
      this.blockUI.start('Loading...');
      this._service.assignUser(this.regionId, body, this.locationID).subscribe(
        (res: any) => {
          console.log(res);
          //this.blockUI.stop();
          setTimeout(() => {
            this.toastr.success('Assistant successfully assigned.');
          }, 100);
          this._location.back();
          // this.toastr.success("Assistant successfully assigned.");
          //this.modalReference.close();
          if (this.isvalidID == 'inside') {
            console.log('hi');
            // this.getCourseDetail(courseId)
            //this.getUsersInCourse(courseId);
          } else {
            console.log('else hi');
            this.cancel();
            // this.getUsersInCourse(courseId);
          }
        },
        err => {
          //this.modalReference.close();
          //this.blockUI.stop();
          this.toastr.error('Assign teacher failed.');
          console.log(err);
        }
      );
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

  cancel() {
    ///zzz start
    if (this.isCourseDetail == true && this.iswordcount == true) {
      this.recentSearch(this.courseVal.keyword, 20, 0);
    } else if (
      (this.isCourseDetail == true && this.iswordcount == false) ||
      this.isCoursePlanDetail == true
    ) {
      this.courseList = [];
      this.iswordcount = false;
      this.getCourseLists(20, 0);
    }
    ///zzz end

    this.xxxhello = '';
    this.showStudentOption = '';
    this.isCourseDetail = false;
    this.isCoursePlanDetail = false;
    // this.courseList = []; //zzz
    // this.getCourseLists(20, 0); //zzz
    this.activeTab = 'People';
    this.showList = false;
    this.selectedCustomer = {};
    this.showInvoice = false;
    this.showPayment = false;
    this.searchMore = false;
    this.hideSearch = false;
    // this.iswordcount = false;//zzz
    this.paymentItem = {};
    this.cancelUItext = false;
    this.cancelUI = false;
    this.dataservice.nevigateCourse('');
    this.activeToday = false;
    this.isRescheduleLesson = false;
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
          //this.blockUI.stop();
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

  flexicomfirm(invoiceAlert) {
    //add cutomer
    this.stdLists = [];
    console.log('flexyconfirm');
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
      userId: this.enrollUserList[0].userId,
      lessons: this.checkobjArr,
      paymentPolicy: {
        allowProrated: this.isProrated
      }
    };
    console.log('body', lessonBody);
    //this.blockUI.start('Loading...');
    this._service
      .assignUser(this.regionId, lessonBody, this.locationID)
      .subscribe((res: any) => {
        console.log('-------->', res);
        if (this.disableInvoice) {
          this.invoiceModalReference.close();
          // this.modalReference.close();
          //this.blockUI.stop();
          this.showflexyCourse = false;
          this.cancelInvoiceModal();
          this.router.navigateByUrl(`/coursedetail/${this.courseId}/customers`);
          return;
        }
        this.courseInfo = this.detailLists;
        Object.assign(this.courseInfo, res.body);
        console.log('-------->', this.courseInfo);
        console.log('custDetail >>>>>>>', this.custDetail);

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
        //this.blockUI.stop();
        this.invoice = res.invoice;
        this.showInvoice = true;
        this.showflexyCourse = false;
        this.showPayment = false;
        this.isProrated = false;
        this.invoiceID2 = res.body.invoice[0]._id;
        this.invoiceModalReference = this.modalService.open(this.invModal, {
          backdrop: 'static',
          windowClass:
            'modal-xl modal-inv d-flex justify-content-center align-items-center'
        });
        // this.router.navigateByUrl(`/coursedetail/${this.courseId}/customers`);
      });

    //add lesson
    console.log(this.checkobjArr);
  }

  confirmInvoiceAlert(courseId, userType) {
    this.disableInvoice = false;
    if (this.courseType == 'FLEXY') {
      this.flexicomfirm(undefined);
    } else {
      this.addCustomer(
        this.tempCourdeId,
        this.tempuserType,
        undefined,
        undefined
      );
    }
    this.invoiceModalReference.close();
    console.log(' Invoice Genereate confirm ');
  }

  cancelInvoiceAlert() {
    this.disableInvoice = true;
    if (this.courseType == 'FLEXY') {
      this.flexicomfirm(undefined);
    } else {
      this.addCustomer(
        this.tempCourdeId,
        this.tempuserType,
        undefined,
        undefined
      );
    }
    this.invoiceModalReference.close();
    console.log(' Invoice Genereate cancel ');
  }

  public invoiceModalReference;
  public disableInvoice;
  public invModal;

  addCustomer(courseId, userType, invoiceAlert, invoiceModal) {
    //console.log("ADD CUSTOMER")
    if (invoiceModal != undefined) {
      this.invModal = invoiceModal;
    }
    this.tempCourdeId = courseId;
    this.tempuserType = userType;
    this.isDisabledBtn = false;
    if (this.courseType == 'FLEXY') {
      console.log('It is flexy');
      // let iDs: string = '';
      // if (this.enrollUserList.length > 1) {
      //   this.enrollUserList.map(item => {
      //     if (iDs != '') {
      //       iDs += ',' + item.userId;
      //     } else {
      //       iDs = item.userId;
      //     }
      //   });
      // } else if (this.enrollUserList.length == 1) {
      //   iDs = this.enrollUserList[0].userId;
      // }
      console.log(this.enrollUserList[0].userId);
      let startDate;
      let endDate;
      this._service
        .getFlexi(courseId, this.enrollUserList[0].userId, startDate, endDate)
        .subscribe(
          (res: any) => {
            console.log('This is add customer result ');
            console.log(res);
            this.flexyarr = res;
            this.showInvoice = false;
            this.showflexyCourse = true;
            //this.blockUI.stop();
          },
          err => {
            console.log(err);
          }
        );
      this.showSelectedUserView = false;
      this.showFlexyBox = true;
    } else {
      console.log(invoiceAlert);
      if (invoiceAlert && userType == 'customer') {
        console.log('I am in invoice alert');
        this.invoiceModalReference = this.modalService.open(invoiceAlert, {
          backdrop: 'static',
          windowClass:
            'deleteModal d-flex justify-content-center align-items-center'
        });

        return;
      }
      this.stdLists = [];
      //console.log('call from addCustomer', this.selectedCustomer);
      console.log('call from addcustomer ');
      let iDs: any;
      if (this.enrollUserList.length > 1) {
        this.enrollUserList.map(item => {
          if (iDs == null || iDs == undefined) {
            iDs = item.userId;
          } else {
            iDs += ',' + item.userId;
          }
        });
      } else {
        iDs = this.enrollUserList[0].userId;
      }
      //
      let body = {
        courseId: courseId,
        userId: iDs,
        userType: userType,
        disableInvoice: this.disableInvoice
      };
      console.log('body', body);
      console.log('custDetail --->', this.custDetail);
      //this.blockUI.start('Loading...');
      this._service.assignUser(this.regionId, body, this.locationID).subscribe(
        (res: any) => {
          console.log('-------->', res);
          // console.log(this.detailLists.invoice);
          if (this.disableInvoice) {
            console.log('disableInvoice');
            this.invoiceModalReference.close();
            this.cancelInvoiceModal();
            // this.modalReference.close();
            //this.blockUI.stop();
            this.router.navigateByUrl(
              `/coursedetail/${this.courseId}/customers`
            );
            return;
          }
          this.courseInfo = this.detailLists;
          Object.assign(this.courseInfo, res.body);
          console.log('-------->', this.courseInfo);
          this.invoice = res.invoice;
          this.showInvoice = true;
          this.invoiceID2 = res.body.invoice[0]._id;
          this.invoiceModalReference = this.modalService.open(this.invModal, {
            backdrop: 'static',
            windowClass:
              'modal-xl modal-inv d-flex justify-content-center align-items-center'
          });
          // this.router.navigateByUrl(`/coursedetail/${this.courseId}/customers`);
        },
        err => {
          console.log(err);
          this.toastr.error('Can not Enroll');
        }
      );
      //this.router.navigateByUrl(`/coursedetail/${this.courseId}/customers`);
    }
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

  conflictBoxShow(e) {
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

  backtoCustomer() {
    this.showflexyCourse = false;
    this.showInvoice = false;
    this.showPayment = false;
  }

  lessionObjArr(e) {
    console.log(e);
    this.checkobjArr = e;
  }
  // end flexy
  flexicomfirmStaff() {
    console.log('confirm staff flexii');
    console.log('selected lesson dates', this.checkobjArr);

    this.getSelectedUserId();
    let body = {
      courseId: this.courseId,
      userId: '',
      userType: 'staff',
      lessons: this.checkobjArr
    };
    this.enrollUserList.map(item => {
      if (body.userId == '') {
        body.userId = item.userId;
      } else {
        body.userId += ',' + item.userId;
      }
    });

    this._service.assignUser(this.regionId, body, this.locationID).subscribe(
      (res: any) => {
        console.log(res);
        setTimeout(() => {
          this.toastr.success('Assistant successfully assigned.');
        }, 100);
        this._location.back();
        if (this.isvalidID == 'inside') {
          console.log('hi');
        } else {
          console.log('else hi');
          this.cancel();
        }
      },
      err => {
        this.toastr.error('Assign teacher failed.');
        console.log(err);
      }
    );
  }
}
