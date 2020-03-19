import {
  Component,
  OnInit,
  ViewContainerRef,
  HostListener,
  EventEmitter,
  AfterViewInit,
  ViewChildren,
  OnDestroy,
  QueryList
} from '@angular/core';

import { appService } from '../../service/app.service';
import { DataService } from '../../service/data.service';
import { MinuteSecondsPipe } from '../../service/pipe/time.pipe';
import { HourMinutePipe } from '../../service/pipe/hourMinute.pipe';
import {
  NgbModal,
  ModalDismissReasons,
  NgbDatepickerConfig,
  NgbCalendar,
  NgbDateStruct
} from '@ng-bootstrap/ng-bootstrap';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { InvoiceComponent } from '../invoice/invoice.component';
import { isConstructorDeclaration } from 'typescript';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { FlexiComponent } from '../flexi/flexi.component';
declare var $: any;
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit, OnDestroy {
  @BlockUI() blockUI: NgBlockUI;
  // public isSearch:boolean = false;
  public totalWidth = 0;
  public scrollLeftPosition = 0;
  public result: any;
  public logo: any = localStorage.getItem('OrgLogo');
  public currency = JSON.parse(localStorage.getItem('currency'));
  public test: any = [];
  public testshowboxs: any;
  public tempSelectedTeacher: any;
  public yPosition: any;
  public xPosition: any;
  public popUpHeight: any;
  public arrTop: any;
  public arrLeft: any;
  public arrClasses: any;
  public custDetail: any = {};
  public createBoxLength;
  public isSide: boolean = false;
  public screenValue;
  public showRelief: boolean = false;
  selectedLesson: any = null;
  // public styleArr={top:"",left:"",right:"0"};
  // public styleArrDefault={top:"",left:"",right:""};
  // public styleArrDefault2={top:"",left:"",right:""};
  public styleArr = {};
  public styleArrDefault = {};
  public selectedDay = [];
  public lessonId: any;
  public keyword: any = '';
  public limit: number = 20;
  public skip: number = 0;
  public tempstafflist: any = [];
  public testin: any;
  public enrollBtnDisabled: boolean = false;
  public activeTeacher: any;
  public teacherListSearchResult: any = { staff: [] };
  public testshowbox: any = '';
  public selectedSeat: any;
  public isSearch: boolean = false;
  public coursePlanSearchKeyWord: any;
  // public SelectedDate = [];
  public mystyle;
  public monthCount: boolean = false;
  public monthArray: any = [];
  public noOfMonth: any = [];
  public isGlobal: boolean = false;
  public showSelectedDays = '~';
  public showSelectedDays1 = [0, 1, 2, 3, 4, 5, 6];
  public categoryList: any;
  public planList: any;
  public courseVal: any = {};
  public selectedID: any;
  public item: any = {};
  public staff: any = {};
  public modalReference: any;
  public isFousCategory: boolean = false;
  public isSelected: boolean = false;
  public scheduleList: boolean = true;
  public courseplanLists: any = [];
  public detailLists: any;
  public regionId = localStorage.getItem('regionId');

  public locationID = localStorage.getItem('locationId');
  // public daysOfWeek = localStorage.getItem('daysofWeek');
  // public categoryId = localStorage.getItem('categoryId');
  public selectedTeacher: any = {};
  public selectedCourse: any = {};
  public selectedTeacher_modal: any = {};
  public selectedCategory: any = {};
  public selectedCat: boolean = true;
  public activeTab: any;
  public studentLists: any = [];
  public showList: boolean = false;
  public userLists: any = [];
  public isFous: boolean = false;
  public formData: any = {};
  public staffList: any;
  public selectedCustomer: any = {};
  public stdLists: Array<any> = [];
  public courseId: any;
  // for invoice
  public invoiceInfo: any = {};
  public invoice: any;
  public showInvoice: boolean = false;
  public invoiceID: any;
  public refInvID: any;
  public invTaxName: any;
  public invCurrency: any = {};
  public invPayment = [];
  public total: number;
  public hideMisc: boolean = false;
  public hideReg: boolean = false;
  public hideDeposit: boolean = false;
  public invoiceCourse: any = {};
  public feesBox: boolean = false;
  public courseDetail: any = {};
  public isEditInv: boolean = false;
  public value: any = {};
  public updateInvData: any = {};
  public singleInv = [];
  public showPayment = false;
  public invStatus: any;
  public paymentItem: any = {};
  public paymentProviders: any;
  public selectedPayment: any;
  public paymentId: any;
  public operatingHours: any = [];
  public operationTime: any = [];
  public minArr = [];
  public minNextArr = [];
  public finalLists = [];
  public lessonD;
  public slotHr;
  public slotM;
  public slotAMPM;
  public slotIdx;
  public slotJidx;
  public courseCreate: boolean = false;
  public invoiceID2: any;
  goBackCat: boolean;
  isCategory: boolean = false;
  isPlan: boolean = false;
  isCourseCreate: boolean = false;
  public reasonValue: any;
  public textAreaOption = false;
  public studentArray = [];
  isProrated: boolean = false;
  // public toggleBool:boolean = true;
  // clickInit:boolean = false;
  public tempTeacher: any = {};

  model: any = {};
  rolloverCourse: any;
  highlightPlan: any;
  public listings = [
    {
      name: 'Dec'
    },
    {
      name: 'Dec'
    },
    {
      name: 'JAN'
    },
    {
      name: 'JAN'
    },
    {
      name: 'Feb'
    }
  ];
  //start fley
  public flexyarr = [];
  idarr: any = [];
  conflictObj: any = [];
  tempObj: any = [];
  dataObj: any = [];
  flexiTemp: any = [];
  checkobjArr: any = [];
  tempCourdeId: any;
  tempuserType: any;
  public showflexyCourse: boolean = false;
  public courseInfo = {};
  isDisabledBtn = false;
  stdArr = [];
  showcb: boolean = false;
  @ViewChildren(FlexiComponent) private FlexiComponent: QueryList<
    FlexiComponent
  >;
  // public finalLists = [
  //   {
  //     "timetable": [
  //       {
  //         "course": null,
  //         "seat": null,
  //         "category": null,
  //         "special_case": null,
  //         "available": true,
  //         "dayOfWeek": null,
  //         "start": {
  //           "hr": 8,
  //           "min": 0,
  //           "meridiem": "AM"
  //         },
  //         "end": {
  //           "hr": 9,
  //           "min": 0,
  //           "meridiem": "AM"
  //         }
  //       },
  //       {
  //         "course": {
  //           "coursePlanId": "5bebc2b65dccdb75024bf65f",
  //           "courseCode": "inv-003KKK",
  //           "name": "Testing For Invoice 001",
  //           "courseId": "5bfcb0357ef97856510d5a61"
  //         },
  //         "seat": {
  //           "taken": 21,
  //           "total": 30,
  //           "left": 9
  //         },
  //         "category": {
  //           "name": "   test category A-001",
  //           "categoryId": "5be9586d8c6e2975b6b6359e"
  //         },
  //         "special_case": null,
  //         "available": false,
  //         "dayOfWeek": 4,
  //         "start": {
  //           "hr": 8,
  //           "min": 0,
  //           "meridiem": "AM"
  //         },
  //         "end": {
  //           "hr": 9,
  //           "min": 45,
  //           "meridiem": "AM"
  //         }
  //       },
  //       {
  //         "course": {
  //           "coursePlanId": "5bebc2b65dccdb75024bf65f",
  //           "courseCode": "inv-004",
  //           "name": "Testing For Invoice 001",
  //           "courseId": "5bfcb0357ef97856510d5a61"
  //         },
  //         "seat": {
  //           "taken": 21,
  //           "total": 30,
  //           "left": 9
  //         },
  //         "category": {
  //           "name": "   test category A-001",
  //           "categoryId": "5be9586d8c6e2975b6b6359e"
  //         },
  //         "special_case": null,
  //         "available": false,
  //         "dayOfWeek": 4,
  //         "start": {
  //           "hr": 10,
  //           "min": 0,
  //           "meridiem": "AM"
  //         },
  //         "end": {
  //           "hr": 10,
  //           "min": 45,
  //           "meridiem": "AM"
  //         }
  //       },
  //       {
  //         "course": null,
  //         "seat": null,
  //         "category": null,
  //         "special_case": null,
  //         "available": true,
  //         "dayOfWeek": null,
  //         "start": {
  //           "hr": 11,
  //           "min": 0,
  //           "meridiem": "PM"
  //         },
  //         "end": {
  //           "hr": 11,
  //           "min": 30,
  //           "meridiem": "PM"
  //         }
  //       },
  //       {
  //         "course": {
  //           "coursePlanId": "5bebc2b65dccdb75024bf65f",
  //           "courseCode": "inv-T1",
  //           "name": "Testing For Invoice 001",
  //           "courseId": "5bfcb0357ef97856510d5a61"
  //         },
  //         "seat": {
  //           "taken": 21,
  //           "total": 30,
  //           "left": 9
  //         },
  //         "category": {
  //           "name": "   test category A-001",
  //           "categoryId": "5be9586d8c6e2975b6b6359e"
  //         },
  //         "special_case": null,
  //         "available": false,
  //         "dayOfWeek": 4,
  //         "start": {
  //           "hr": 1,
  //           "min": 0,
  //           "meridiem": "PM"
  //         },
  //         "end": {
  //           "hr": 1,
  //           "min": 45,
  //           "meridiem": "PM"
  //         }
  //       }
  //     ],
  //     "date": {
  //       "year": 2018,
  //       "month": 12,
  //       "day": 19,
  //       "dayOfWeek": "Wed"
  //     }
  //   },
  //   {
  //     "timetable": [
  //       {
  //         "course": null,
  //         "seat": null,
  //         "category": null,
  //         "special_case": null,
  //         "available": true,
  //         "dayOfWeek": null,
  //         "start": {
  //           "hr": 7,
  //           "min": 0,
  //           "meridiem": "AM"
  //         },
  //         "end": {
  //           "hr": 7,
  //           "min": 30,
  //           "meridiem": "AM"
  //         }
  //       },
  //       {
  //         "course": {
  //           "coursePlanId": "5bebc2b65dccdb75024bf65f",
  //           "courseCode": "inv-003",
  //           "name": "Testing For Invoice 001",
  //           "courseId": "5bfcb0357ef97856510d5a61"
  //         },
  //         "seat": {
  //           "taken": 21,
  //           "total": 30,
  //           "left": 9
  //         },
  //         "category": {
  //           "name": "   test category A-001",
  //           "categoryId": "5be9586d8c6e2975b6b6359e"
  //         },
  //         "special_case": null,
  //         "available": false,
  //         "dayOfWeek": 4,
  //         "start": {
  //           "hr": 7,
  //           "min": 30,
  //           "meridiem": "AM"
  //         },
  //         "end": {
  //           "hr": 9,
  //           "min": 0,
  //           "meridiem": "AM"
  //         }
  //       },
  //       {
  //         "course": {
  //           "coursePlanId": "5bebc2b65dccdb75024bf65f",
  //           "courseCode": "inv-003",
  //           "name": "Testing For Invoice 001",
  //           "courseId": "5bfcb0357ef97856510d5a61"
  //         },
  //         "seat": {
  //           "taken": 21,
  //           "total": 30,
  //           "left": 9
  //         },
  //         "category": {
  //           "name": "   test category A-001",
  //           "categoryId": "5be9586d8c6e2975b6b6359e"
  //         },
  //         "special_case": null,
  //         "available": false,
  //         "dayOfWeek": 4,
  //         "start": {
  //           "hr": 9,
  //           "min": 30,
  //           "meridiem": "PM"
  //         },
  //         "end": {
  //           "hr": 11,
  //           "min": 0,
  //           "meridiem": "PM"
  //         }
  //       },
  //       {
  //         "course": null,
  //         "seat": null,
  //         "category": null,
  //         "special_case": null,
  //         "available": true,
  //         "dayOfWeek": null,
  //         "start": {
  //           "hr": 8,
  //           "min": 0,
  //           "meridiem": "PM"
  //         },
  //         "end": {
  //           "hr": 9,
  //           "min": 59,
  //           "meridiem": "PM"
  //         }
  //       }
  //     ],
  //     "date": {
  //       "year": 2018,
  //       "month": 12,
  //       "day": 26,
  //       "dayOfWeek": "Wed"
  //     }
  //   },
  //   {
  //     "timetable": [
  //       {
  //         "course": {
  //           "coursePlanId": "5bebc2b65dccdb75024bf65f",
  //           "courseCode": "Row-3-1",
  //           "name": "Testing For Invoice 001",
  //           "courseId": "5bfcb0357ef97856510d5a61"
  //         },
  //         "seat": null,
  //         "category": null,
  //         "special_case": null,
  //         "available": true,
  //         "dayOfWeek": null,
  //         "start": {
  //           "hr": 1,
  //           "min": 0,
  //           "meridiem": "AM"
  //         },
  //         "end": {
  //           "hr": 1,
  //           "min": 30,
  //           "meridiem": "AM"
  //         }
  //       },
  //       {
  //         "course": {
  //           "coursePlanId": "5bebc2b65dccdb75024bf65f",
  //           "courseCode": "Row-3-2",
  //           "name": "Testing For Invoice 001",
  //           "courseId": "5bfcb0357ef97856510d5a61"
  //         },
  //         "seat": null,
  //         "category": null,
  //         "special_case": null,
  //         "available": true,
  //         "dayOfWeek": null,
  //         "start": {
  //           "hr": 2,
  //           "min": 40,
  //           "meridiem": "AM"
  //         },
  //         "end": {
  //           "hr": 4,
  //           "min": 45,
  //           "meridiem": "AM"
  //         }
  //       },
  //     ],
  //     "date": {
  //       "year": 2019,
  //       "month": 1,
  //       "day": 2,
  //       "dayOfWeek": "Wed"
  //     }
  //   },
  //   {
  //     "timetable": [
  //       {
  //         "course": {
  //           "coursePlanId": "5bebc2b65dccdb75024bf65f",
  //           "courseCode": "Feb-2-1",
  //           "name": "Testing For Invoice 001",
  //           "courseId": "5bfcb0357ef97856510d5a61"
  //         },
  //         "seat": null,
  //         "category": null,
  //         "special_case": null,
  //         "available": true,
  //         "dayOfWeek": null,
  //         "start": {
  //           "hr": 9,
  //           "min": 0,
  //           "meridiem": "AM"
  //         },
  //         "end": {
  //           "hr": 10,
  //           "min": 0,
  //           "meridiem": "AM"
  //         }
  //       },
  //       {
  //         "course": {
  //           "coursePlanId": "5bebc2b65dccdb75024bf65f",
  //           "courseCode": "Feb-2-2",
  //           "name": "Testing For Invoice 001",
  //           "courseId": "5bfcb0357ef97856510d5a61"
  //         },
  //         "seat": null,
  //         "category": null,
  //         "special_case": null,
  //         "available": true,
  //         "dayOfWeek": null,
  //         "start": {
  //           "hr": 12,
  //           "min": 45,
  //           "meridiem": "PM"
  //         },
  //         "end": {
  //           "hr": 1,
  //           "min": 45,
  //           "meridiem": "PM"
  //         }
  //       },
  //     ],
  //     "date": {
  //       "year": 2019,
  //       "month": 2,
  //       "day": 2,
  //       "dayOfWeek": "Wed"
  //     }
  //   },
  //   {
  //     "timetable": [
  //       {
  //         "course": {
  //           "coursePlanId": "5bebc2b65dccdb75024bf65f",
  //           "courseCode": "Feb-3-1",
  //           "name": "Testing For Invoice 001",
  //           "courseId": "5bfcb0357ef97856510d5a61"
  //         },
  //         "seat": null,
  //         "category": null,
  //         "special_case": null,
  //         "available": true,
  //         "dayOfWeek": null,
  //         "start": {
  //           "hr": 2,
  //           "min": 0,
  //           "meridiem": "PM"
  //         },
  //         "end": {
  //           "hr": 2,
  //           "min": 30,
  //           "meridiem": "PM"
  //         }
  //       },
  //       {
  //         "course": {
  //           "coursePlanId": "5bebc2b65dccdb75024bf65f",
  //           "courseCode": "Feb-3-2",
  //           "name": "Testing For Invoice 001",
  //           "courseId": "5bfcb0357ef97856510d5a61"
  //         },
  //         "seat": null,
  //         "category": null,
  //         "special_case": null,
  //         "available": true,
  //         "dayOfWeek": null,
  //         "start": {
  //           "hr": 3,
  //           "min": 0,
  //           "meridiem": "PM"
  //         },
  //         "end": {
  //           "hr": 4,
  //           "min": 40,
  //           "meridiem": "PM"
  //         }
  //       },
  //     ],
  //     "date": {
  //       "year": 2019,
  //       "month": 2,
  //       "day": 3,
  //       "dayOfWeek": "Wed"
  //     }
  //   },
  //   {
  //     "timetable": [
  //       {
  //         "course": {
  //           "coursePlanId": "5bebc2b65dccdb75024bf65f",
  //           "courseCode": "JAN-2",
  //           "name": "Testing For Invoice 001",
  //           "courseId": "5bfcb0357ef97856510d5a61"
  //         },
  //         "seat": null,
  //         "category": null,
  //         "special_case": null,
  //         "available": true,
  //         "dayOfWeek": null,
  //         "start": {
  //           "hr": 9,
  //           "min": 0,
  //           "meridiem": "AM"
  //         },
  //         "end": {
  //           "hr": 10,
  //           "min": 0,
  //           "meridiem": "AM"
  //         }
  //       },
  //       {
  //         "course": {
  //           "coursePlanId": "5bebc2b65dccdb75024bf65f",
  //           "courseCode": "JAN-2-1",
  //           "name": "Testing For Invoice 001",
  //           "courseId": "5bfcb0357ef97856510d5a61"
  //         },
  //         "seat": null,
  //         "category": null,
  //         "special_case": null,
  //         "available": true,
  //         "dayOfWeek": null,
  //         "start": {
  //           "hr": 10,
  //           "min": 0,
  //           "meridiem": "AM"
  //         },
  //         "end": {
  //           "hr": 11,
  //           "min": 30,
  //           "meridiem": "AM"
  //         }
  //       },
  //     ],
  //     "date": {
  //       "year": 2019,
  //       "month": 2,
  //       "day": 3,
  //       "dayOfWeek": "Wed"
  //     }
  //   }
  // ]

  public days = [
    { day: 'Sun', val: 0 },
    { day: 'Mon', val: 1 },
    { day: 'Tue', val: 2 },
    { day: 'Wed', val: 3 },
    { day: 'Thu', val: 4 },
    { day: 'Fri ', val: 5 },
    { day: 'Sat', val: 6 }
  ];

  public teachers = [
    { name: 'Aldous', id: 0 },
    { name: 'Harry ', id: 2 },
    { name: 'Lunox', id: 3 },
    { name: 'Leomord', id: 4 },
    { name: 'Hayabusa', id: 5 },
    { name: 'Leomord', id: 4 },
    { name: 'Hayabusa', id: 5 },
    { name: 'Leomord', id: 4 },
    { name: 'Hayabusa', id: 5 },
    { name: 'Leomord', id: 4 },
    { name: 'Hayabusa', id: 5 },
    { name: 'Leomord', id: 4 },
    { name: 'Hayabusa', id: 5 },
    { name: 'Leomord', id: 4 },
    { name: 'Hayabusa', id: 5 },
    { name: 'Leomord', id: 4 },
    { name: 'Hayabusa', id: 5 },
    { name: 'Leomord', id: 4 },
    { name: 'Hayabusa', id: 5 },
    { name: 'Leomord', id: 4 },
    { name: 'Hayabusa', id: 5 },
    { name: 'Leomord', id: 4 },
    { name: 'Hayabusa', id: 5 },
    { name: 'Leomord', id: 4 },
    { name: 'Hayabusa', id: 5 },
    { name: 'Leomord', id: 4 },
    { name: 'Hayabusa', id: 5 },
    { name: 'Kagura', id: 6 }
  ];
  // public testTime = '13:00';

  //https://brainlitz.s3.amazonaws.com/development/stgbl-cw1/profile/154088885512582284596_original.jpg

  // gotoScheduleList(){
  //   this.scheduleList=false;
  // }

  constructor(
    private _service: appService,
    private dataservice: DataService,
    private modalService: NgbModal,
    public toastr: ToastrService,
    public vcr: ViewContainerRef,
    private router: Router,
    private dataService: DataService,
    private http: HttpClient
  ) {
    this._service.goback.subscribe(() => {
      console.log('goooo');
      this.isCategory = false;
      this.isPlan = false;
      this.goBackCat = false;
      this.isCourseCreate = false;
      this.courseCreate = true;
    });

    this._service.goCat.subscribe(() => {
      console.log('gobackk22', this.goBackCat);
      this.goBackCat = false;
      this.isCategory = true;
      this.isPlan = false;
      this.courseCreate = false;
    });

    this._service.goplan.subscribe(() => {
      console.log('go to plan');
      this.isCategory = false;
      this.isPlan = true;
      this.goBackCat = true;
      this.isCourseCreate = false;
      this.courseCreate = false;
      // this.scheduleList = false;
    });

    this._service.goCourse.subscribe(() => {
      console.log('goback33');
      this.isCategory = false;
      this.isPlan = false;
      this.goBackCat = false;
      this.isCourseCreate = false;
      this.courseCreate = true;
      this.courseplanLists = [];
      this.getAllCoursePlan(0, 20);
      console.log('courseplanLists', this.courseplanLists);
      // if (this.selectedDay.length == 0) {
      //   this.getStaffTimetable(this.selectedTeacher.userId, '0,1,2,3,4,5,6');
      // } else if (this.selectedDay.length > 0) {
      //   this.getStaffTimetable(
      //     this.selectedTeacher.userId,
      //     this.selectedDay.toString()
      //   );
      // }
      // console.log('schedule', this.scheduleList);
    });
    // this._service.goSchedule.subscribe(()=>{
    //   console.log("go back SC");
    //   this.isCategory = false;
    //   this.isPlan = false;
    //   this.goBackCat = false;
    //   this.isCourseCreate = false;
    //   this.courseCreate = false;
    //   // this.scheduleList = false;
    //   if(this.selectedDay.length == 0){
    //    this.getStaffTimetable(this.selectedTeacher.userId,'0,1,2,3,4,5,6');
    //  }else if(this.selectedDay.length > 0){
    //    this.getStaffTimetable(this.selectedTeacher.userId,this.selectedDay.toString());
    //  }

    //   console.log("schedule",this.scheduleList)
    // })

    this._service.goCourseCreate.subscribe(() => {
      console.log('go to cc');
      this.isCategory = false;
      this.isPlan = false;
      this.goBackCat = false;
      this.isCourseCreate = true;
    });
  }

  @HostListener('document:click', ['$event'])
  public documentClick(event): void {}

  @HostListener('document:click', ['$event']) clickedOutside($event) {
    if (
      $event.target.offsetParent != null &&
      $event.target.offsetParent.className == 'single-slot test-bg'
    ) {
      this.overlap = true;
      this.caculatePosition($event);
    } else {
      this.overlap = false;
    }
    // here you can hide your menu
    this.testshowbox = '';
    this.testshowboxs = false;
    this.showDp = false;
    this.slotM = '';
    this.slotIdx = '';
    this.slotJidx = '';
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.overFlowWidth(20, 'button');
    //to define is side or not
    var diff = window.innerWidth - this.screenValue;
    if (this.isSide) {
      if (diff <= 40 && diff >= 0) {
        console.log('less than');
        this.styleArr = {
          top: this.yPosition + 'px',
          right: '0px'
        };
        //if left or right side position zero fix
      } else {
        console.log('greater than');
        this.styleArr = this.styleArrDefault; //if not left or right side position depend on first time click position
      }
    }
  }
  ngOnInit() {
    localStorage.removeItem('scheduleObj');
    this.activeTab = 'enroll';
    this.getAutoSelectDate();
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
    this.getRegionalInfo();
    //for rolloverCourse
    setTimeout(() => {
      this.dataservice.rolloverCId.subscribe(
        cId => (this.rolloverCourse = cId)
      );
      console.log('rolloverCID', this.rolloverCourse);
      this.dataService.categoryId.subscribe(cId => {
        if (cId) {
          this.courseCreate = false;
          this.isCategory = false;
          this.isPlan = false;
          this.isCourseCreate = false;
          this.selectedIndex = localStorage.getItem('teacherIndex');
          if (this.selectedDay.length == 0) {
            this.getStaffTimetable(
              this.selectedTeacher.userId,
              '0,1,2,3,4,5,6'
            );
          } else if (this.selectedDay.length > 0) {
            this.getStaffTimetable(
              this.selectedTeacher.userId,
              this.selectedDay.toString()
            );
          }
          setTimeout(() => {
            this.overFlowWidth(this.selectedIndex, 'modalteacher');
          }, 30);
          // courseCreate == false &&
          // isCategory == false &&
          // isPlan == false &&
          // isCourseCreate == false
        }
      });
      // if (this.rolloverCourse != '') {
      //   console.log('redirect to pick course plan');
      //   this.scheduleList = false;
      //   this.courseCreate = true;
      //   this.isCategory = false;
      //   this.isPlan = false;
      //   this.isCourseCreate = false;
      //   this.selectedID = this.rolloverCourse.category.id;
      //   this.item.itemID = this.rolloverCourse.category.name;
      //   this.highlightPlan = this.rolloverCourse.coursePlan.id;
      //   this.selectedCategory._id = this.rolloverCourse.category.id;
      //   this.selectedCategory.name = this.rolloverCourse.category.name;
      //   this.courseplanLists = [];
      //   this.getAllCoursePlan('0', '20');
      // } else {
      //   this.highlightPlan = '';
      // }
    }, 300);
  }

  ngAfterViewInit() {
    this.staffList = [
      {
        staff: [{}]
      }
    ];
  }

  // closeDP(event){
  //   var parentWrap = event.path.filter(function(res){
  //     return res.className == "slot-wrap"
  //   })
  //   console.log(parentWrap);
  //   if(parentWrap.length == 0){
  //    this.slotM = '';
  //     this.slotIdx = '';
  //     this.slotJidx = '';
  //   }
  // }

  public startTime;
  getRegionalInfo() {
    let token = localStorage.getItem('token');
    let tokenType = localStorage.getItem('tokenType');
    //this.blockUI.start('Loading...');
    this._service
      .getRegionalAdministrator(this.regionId, token, tokenType)
      .subscribe(
        (res: any) => {
          console.log('Operation Hours', res.operatingHour);
          this.calculateTime(res.operatingHour);
          this.calculateSlot(res.operatingHour.start);
          this.startTime = res.operatingHour.start;
          setTimeout(() => {
            //this.blockUI.stop(); // Stop blocking
          }, 300);
        },
        err => {
          //this.blockUI.stop();
          console.log(err);
        }
      );
  }

  calculateTime(time) {
    console.log(time);

    var sTime =
      time.start.hr + ':' + time.start.min + ' ' + time.start.meridiem;
    var eTime = time.end.hr + ':' + time.end.min + ' ' + time.end.meridiem;
    console.log(sTime, eTime);
    var timeStart: any;
    var timeEnd: any;

    timeStart = new Date('01/01/2007 ' + sTime);
    console.log('timeStart', timeStart);
    timeEnd = new Date('01/01/2007 ' + eTime);
    console.log('timeEnd', timeEnd);
    var diff = (timeEnd - timeStart) / 60000; //dividing by seconds and milliseconds
    console.log(diff);
    var diffMins = diff % 60;
    console.log('mins', diffMins);
    var diffHours = (diff - diffMins) / 60;
    console.log('hours', diffHours);

    console.log(time.start.min);
    if (time.start.min != 0) {
      diffHours = diffHours + 1;
    } else {
      diffHours = diffHours;
    }
    // if ((diffMins == 30 || diffMins < 30) && diffMins > 0) {
    //   diffHours = diffHours * 2 + 1;
    //   console.log(diffHours);
    // } else if (diffMins > 30 && diffMins < 60) {
    //   diffHours = diffHours * 2 + 2;
    //   console.log(diffHours);
    // } else if (diffMins == 0) {
    //   diffHours = diffHours * 2;
    //   console.log(diffHours);
    // }

    // var hours= [];
    if (time.start.meridiem === 'PM') {
      var tempH = (time.start.hr + 12) * 60 + time.start.min;
    } else {
      if (time.start.hr == 12) {
        var tempH = 0 * 60 + time.start.min;
      } else {
        var tempH = time.start.hr * 60 + time.start.min;
        console.log('tempH', tempH);
      }
    }

    for (var i = 0; i <= diffHours; i++) {
      if (i > 0) {
        tempH = tempH + 60; //if u want to different "30" minus,  tempH = tempH + 30
      } else {
        tempH = tempH;
      }
      var min = tempH % 60;
      var h = (tempH - min) / 60;

      console.log('min>', min);

      if (h > 12) {
        var hr = h - 12;
        if (hr == 12 && i == diffHours) {
          var ampm = 'AM';
        } else {
          var ampm = 'PM';
        }
        // console.log(">12",hr)
      } else if (h < 12) {
        var hr = h;
        // console.log("<12",hr)
        var ampm = 'AM';
      } else if (h == 12) {
        var hr = h;
        // console.log("==12",hr)
        var ampm = 'PM';
      }
      if (hr == 0) {
        hr = 12;
      }

      var obj = {
        start: {
          hr: hr,
          min: min,
          meridiem: ampm
        }
      };
      console.log('hour', obj);
      this.operationTime.push(obj);
    }
    // let arrLength = this.operationTime.length;
    // console.log(arrLength);
    let lastIdx = this.operationTime.length - 1;
    console.log('lastIdx', this.operationTime[lastIdx].start);
    let last = this.operationTime[lastIdx].start;
    if (
      time.end.hr == last.hr &&
      time.end.min == last.min &&
      time.end.meridiem == last.meridiem
    ) {
      console.log('Same');
      this.operationTime.pop();
    } else {
      console.log('not same');
    }
    console.log('opr Arr', this.operationTime);
  }

  // calculateSlot(start){
  //   var min = start.min; // start time min
  //   // var temp = [];
  //   // var tempnext = [];
  //   this.minArr = [];
  //   this.minNextArr = [];
  //   var next;
  //   for(var i = 0; i <= 29; i++){
  //       // min += 1;
  //       // if(min == 60){
  //       //   min = 0;
  //       // }
  //       if(i == 0){
  //         min += 0;
  //       }else{
  //         min += 1;
  //       }
  //     this.minArr.push(min);
  //   }
  //   console.log("temp",this.minArr);
  //   next = this.minArr[29];
  //   console.log('next',next);

  //   for(var j = 0; j <=29; j++){
  //     if(next == 59){
  //       console.log("==59")
  //       next = 0;
  //     }else{
  //        next += 1;
  //     }

  //     this.minNextArr.push(next);
  //   }
  //    console.log("temp next",this.minNextArr);
  // }

  minSlotArr = [];
  calculateSlot(start) {
    console.log(start);

    var min = start.min; // start time min
    // var temp = [];
    // var tempnext = [];
    this.minArr = [];
    this.minNextArr = [];
    var next;
    //if u want to calculate two division in one hour
    for (var i = 0; i <= 1; i++) {
      // min += 1;
      // if(min == 60){
      //   min = 0;
      // }
      if (i == 0) {
        min += 0;
      } else {
        // // min += 15;
        // if (min == 45) {
        //   console.log("==59")
        //   min = 0;
        // } else {
        //   min += 15;
        // }
        var m = min + 30; //if u want to different "30" minus,  min + 15
        if (m > 60) {
          min = m - 60;
          if (min == 60) {
            min = 0;
          }
        } else {
          min += 30; //if u want to different "30" minus,   min += 15;
          if (min == 60) {
            min = 0;
          }
        }
      }
      console.log(min);

      this.minArr.push(min);
      this.minSlotArr.push(min);
      this.minNextArr.push(min);
    }
    console.log('temp', this.minArr);
    //if u want to calculate four division in one hour
    // next = this.minArr[this.minArr.length - 1];
    // for (var j = 0; j <= 1; j++) {
    //   // if (next == 45) {
    //   //   console.log("==59")
    //   //   next = 0;
    //   // } else {
    //   //   next += 15;
    //   // }
    //   m = next + 30;  //if u want to different "30" minus,  m = next + 15;
    //   if (m > 60) {
    //     next = m - 60;
    //     if (next == 60) {
    //       next = 0;
    //     }
    //   } else {
    //     next += 30; //if u want to different "30" minus,    next += 15;;
    //     if (next == 60) {
    //       next = 0;
    //     }
    //   }
    //   this.minNextArr.push(next);
    //   this.minSlotArr.push(next);
    // }
    console.log(this.minSlotArr);

    console.log('temp next ===>', this.minNextArr);
  }

  getAutoSelectDate() {
    const todayDay = new Date().getDay();
    // this.selectedDay.push(todayDay);
    //this.blockUI.start('Loading...');

    setTimeout(() => {
      this.selectedDay.push(todayDay);
      //this.blockUI.stop();
    }, 300);

    // this.SelectedDate.push(this.days[todayDay].day);
  }

  backtoSchedule() {
    // reset the initial values
    console.error('back to');
    this.scheduleList = true;
    this.isPlan = false;
    this.isCategory = false;
    this.courseCreate = false;
    this.item.itemID = '';
    this.selectedID = '';
    this.selectedDay = [];
    this.getAutoSelectDate();
    this.showDp = false;
    this.selectedTeacher = {};
    setTimeout(() => {
      this.updateScrollbar('v-wrapper');
    }, 600);
  }

  backtoTimetable() {
    $('body').css('overflow', 'hidden');
    $('.disabledScroll').css('overflow', 'hidden');
    this.scheduleList = false;
    this.isPlan = false;
    this.isCategory = false;
    this.courseCreate = false;
    this.showDp = false;
    this.courseplanLists = [];
    setTimeout(() => {
      this.updateScrollbar('v-wrapper');
    }, 600);
  }

  // Selected Day //
  selectDay(data, event, day, type, index): void {
    if (type == 'callTimetable') {
      setTimeout(() => {
        this.getschedulestaff(
          'checkbox',
          this.staffList.staff.length,
          '0',
          index
        );
      }, 200);
    }
    var dayIdx = this.selectedDay.indexOf(data);

    if (event.target.checked) {
      if (dayIdx < 0) this.selectedDay.push(data);
    } else {
      if (dayIdx >= 0) {
        this.selectedDay.splice(dayIdx, 1);
      }
    }
    this.selectedDay.sort();
  }

  // Search Category

  searchCategoryList(val, type) {
    console.log(val, type);
    //this.blockUI.start('Loading...');
    if (val.length > 0) {
      // //this.blockUI.start('Loading...');
      this._service
        .getSearchCategory(this.regionId, val, this.locationID)
        .subscribe(
          (res: any) => {
            res.unshift({ name: 'All category', _id: 'all' });
            // console.log(res.length);
            console.log(this.categoryList.name);
            var element = <HTMLInputElement>(
              document.getElementById('categoryList')
            );
            console.log(element);
            if (element != null && this.selectedDay.length != 0) {
              element.disabled = true;
            }

            this.categoryList = res;
            //this.blockUI.stop();
          },
          err => {
            console.log(err);
            //this.blockUI.stop();
          }
        );
    } else if (val.length <= 0) {
      // //this.blockUI.start('Loading...');
      this._service.getCategory(this.regionId, 20, 0).subscribe(
        (res: any) => {
          console.log(res);
          console.log(this.categoryList.name);
          res.unshift({ name: 'All category', _id: 'all' });
          this.categoryList = res;
          //this.blockUI.stop();
        },
        err => {
          console.log(err);
          //this.blockUI.stop();
        }
      );
    }
  }
  // Focus Search
  focusSearch(val, type) {
    this._service.getCategory(this.regionId, 20, 0).subscribe(
      (res: any) => {
        console.log(res);
        res.unshift({ name: 'All category', _id: 'all' });
        this.categoryList = res;
        console.log(val, 'OK');
      },
      err => {
        console.log(err);
      }
    );

    val.preventDefault();
    val.stopPropagation();
    this.isFousCategory = true;
  }

  focusSearch2(val, tye) {
    val.preventDefault();
    val.stopPropagation();
    this.isFousCategory = true;
    this.overlap = false;
  }
  //  Hide Search
  hideSearch() {
    setTimeout(() => {
      this.isFousCategory = false;
    }, 300);
  }
  selectDataApiCall(category, index) {
    this.selectedTeacher = {};
    this.tempTchr = undefined;
    console.log('selectDataApiCall works', category);
    this.selectData(category);
    this.getschedulestaff('button', '20', '0', index);
    $('.teacher-list-wrapper').scrollLeft(0);
  }

  // single Select Data
  selectData(category) {
    var element = <HTMLInputElement>document.getElementById('categoryList');
    if (element != null && this.selectedDay.length != 0) {
      element.disabled = false;
    }

    console.log('selectData works', category);
    this.isSelected = true;
    this.selectedID = category._id;
    this.item.itemID = category.name;
    this.selectedCategory = category;
    this.selectedCat = false;
  }
  isTeacherAll: boolean = false;
  /// Fix Get Sechedule Staff API ///
  getschedulestaff(type, limit, skip, index) {
    console.error('call schedule');
    this.scheduleList = false;
    this.blockUI.start('Loading...');

    setTimeout(() => {
      this.updateScrollbar('v-wrapper');
      // this.blockUI.stop();
    }, 1000);

    var repeatDays;
    if (this.selectedDay.length == 0 || this.selectedDay.length < 0) {
      repeatDays = '0,1,2,3,4,5,6';
    } else {
      repeatDays = this.selectedDay.toString();
    }
    console.log(this.regionId);
    console.log(repeatDays);
    console.log(this.selectedID);
    console.log(limit);
    console.log(skip);

    this._service
      .getscheduleStaffList(
        this.regionId,
        repeatDays,
        this.selectedID,
        limit,
        skip
      )
      .subscribe(
        (res: any) => {
          console.log(res);
          this.result = res;
          this.staffList = res;
          console.log('this.selectedTeacher', this.selectedTeacher);
          console.log('this.staffList', this.staffList);
          if (this.staffList.staff.length > 0) {
            if (this.staffList.staff && type == 'checkbox') {
              if (this.isTeacherAll) {
                // remove auto selected
                this.isTeacherAll = true;
              } else {
                console.log('exit');
                this.selectedTeacher = this.tempSelectedTeacher;
                if (this.tempSelectedTeacher == null) {
                  this.selectedTeacher = this.staffList.staff[0];
                  this.isTeacherAll = false; // remove auto selected
                }
              }
            } else if (type == 'modalteacher') {
              console.log('two');
              this.selectedTeacher = this.tempSelectedTeacher;
              this.isTeacherAll = false;
              console.log('selected teacher');
            } else {
              console.log('three', this.staffList.staff);
              console.log(this.selectedTeacher);
              if (this.staffList.staff) {
                this.tempSelectedTeacher = null;
                // this.selectedTeacher = this.staffList.staff[0];
                this.isTeacherAll = true;
              }
            }
            console.log('Call staff timttable');
            if (
              JSON.stringify(this.selectedTeacher) != '{}' ||
              this.isTeacherAll
            ) {
              console.log('reach');
              this.getStaffTimetable(this.selectedTeacher.userId, repeatDays);
            }
            if (this.isTeacherAll) {
              this.selectedTeacher = {};
            }
          } else {
            console.log('no need to call staff timttable');
          }
          setTimeout(() => {
            if (type == 'modalteacher') {
              this.overFlowWidth(index, type);
            } else if (type == 'button') {
              this.overFlowWidth(20, type);
            }
          }, 300);

          if (this.tempTchr != undefined) {
            this.staffList.staff.map((staff, indexNumber) => {
              if (staff.userId == this.tempTchr.userId) {
                this.staffList.staff.splice(
                  this.staffList.staff.indexOf(staff),
                  1
                );
              }
            });
            this.staffList.staff.unshift(this.tempTchr);
          }
          $('body').css('overflow', 'hidden');
        },
        (err: any) => {
          // catch the error response from api
          this.staffList = [];
        }
      );
  }
  public selectedIndex;
  overFlowWidth(index, type) {
    // this.selectedIndex = index;
    localStorage.setItem('teacherIndex', index);
    var arr = index;
    // for normal calling
    if (type == 'button') {
      if (window.innerWidth < 1366) {
        for (let i = 0; i <= 5; i++) {
          var removeDecimal = Math.round($('#overFlowWidth' + i).width()) + 8;
          this.totalWidth += removeDecimal;
        }
        $('.teacher-wrapper').width(this.totalWidth);
      }
      if (window.innerWidth >= 1366 && window.innerWidth < 1920) {
        for (let i = 0; i <= 9; i++) {
          var removeDecimal = Math.round($('#overFlowWidth' + i).width()) + 8;
          this.totalWidth += removeDecimal;
          console.log(removeDecimal);
        }
        $('.teacher-wrapper').width(this.totalWidth);
      }

      if (window.innerWidth >= 1920) {
        for (let i = 0; i <= 14; i++) {
          var removeDecimal = Math.round($('#overFlowWidth' + i).width()) + 8;
          this.totalWidth += removeDecimal;
          console.log(removeDecimal);
        }
        $('.teacher-wrapper').width(this.totalWidth);
      }
    }
    // for modal
    if (type == 'modalteacher') {
      // for screensize less than 1366
      if (window.innerWidth < 1366) {
        console.log(index - 6, 'index =======', index);
        if (index >= 6) {
          for (let i = index - 5; i <= index; i++) {
            var removeDecimal = Math.round($('#overFlowWidth' + i).width()) + 8;
            this.totalWidth += removeDecimal;
            console.log(removeDecimal, '###', i);
          }
          $('.teacher-wrapper').width(this.totalWidth);
          var tempNum = index - 6;
          for (let i = 0; i <= tempNum; i++) {
            console.log(i);
            var removeDecimal = Math.round($('#overFlowWidth' + i).width()) + 8;
            this.scrollLeftPosition += removeDecimal;
            console.log(removeDecimal);
          }
        }
        if (index < 6) {
          for (let i = 0; i <= 5; i++) {
            var removeDecimal = Math.round($('#overFlowWidth' + i).width()) + 8;
            this.totalWidth += removeDecimal;
          }
          $('.teacher-wrapper').width(this.totalWidth);
        }
      }
      // for screensize greater than 1366 and less than 1920
      if (window.innerWidth >= 1366 && window.innerWidth < 1920) {
        var tempNum = index - 10;
        for (let i = 0; i <= tempNum; i++) {
          console.log(i);
          var removeDecimal = Math.round($('#overFlowWidth' + i).width()) + 8;
          this.scrollLeftPosition += removeDecimal;
          console.log(removeDecimal);
        }
        if (index >= 10) {
          for (let i = index - 9; i <= index; i++) {
            var removeDecimal = Math.round($('#overFlowWidth' + i).width()) + 8;
            this.totalWidth += removeDecimal;
            console.log(removeDecimal);
          }
          $('.teacher-wrapper').width(this.totalWidth);
        }

        if (index < 10) {
          for (let i = 0; i <= 9; i++) {
            var removeDecimal = Math.round($('#overFlowWidth' + i).width()) + 8;
            this.totalWidth += removeDecimal;
            console.log(removeDecimal);
          }
          $('.teacher-wrapper').width(this.totalWidth);
        }
      }

      // for screensize less than 1920
      if (window.innerWidth >= 1920) {
        var tempNum = index - 15;
        for (let i = 0; i <= tempNum; i++) {
          console.log(i);
          var removeDecimal = Math.round($('#overFlowWidth' + i).width()) + 8;
          this.scrollLeftPosition += removeDecimal;
          console.log(removeDecimal);
        }
        if (index >= 15) {
          for (let i = index - 14; i <= index; i++) {
            var removeDecimal = Math.round($('#overFlowWidth' + i).width()) + 8;
            this.totalWidth += removeDecimal;
            console.log(removeDecimal, '###', i);
          }
          console.log(index, 'indexx=======');
          $('.teacher-wrapper').width(this.totalWidth);
        }
        if (index < 15) {
          for (let i = 0; i <= 14; i++) {
            var removeDecimal = Math.round($('#overFlowWidth' + i).width()) + 8;
            this.totalWidth += removeDecimal;
            console.log(removeDecimal);
          }
          $('.teacher-wrapper').width(this.totalWidth);
        }
      }

      $('.teacher-list-wrapper').scrollLeft(this.scrollLeftPosition);
    }
    this.totalWidth = 0;
  }
  // for modal
  getViewAllStaff(type, skip, limit) {
    var repeatDays;
    if (this.selectedDay.length == 0 || this.selectedDay.length < 0) {
      repeatDays = '0,1,2,3,4,5,6';
    } else {
      repeatDays = this.selectedDay.toString();
    }
    this.scheduleList = false;
    //this.blockUI.start('Loading');
    console.log(this.selectedID);
    this._service
      .getscheduleStaffList(
        this.regionId,
        repeatDays,
        this.selectedID,
        limit,
        skip
      )
      .subscribe(
        (res: any) => {
          setTimeout(() => {
            //this.blockUI.stop();
          }, 300);
          this.result = res;
          if (type == 'search') {
            this.tempstafflist = res.staff;
          } else {
            this.tempstafflist = this.tempstafflist.concat(res.staff);
          }
          console.log('this.selectedTeacher', this.selectedTeacher);
          console.log('this.staffList', this.staffList);
        },
        (err: any) => {
          // catch the error response from api
          this.tempstafflist = [];
        }
      );
  }

  getSearchscheulestaff(keyword, skip, limit) {
    var repeatDays;
    if (this.selectedDay.length == 0 || this.selectedDay.length < 0) {
      repeatDays = '0,1,2,3,4,5,6';
    } else {
      repeatDays = this.selectedDay.toString();
    }
    this.keyword = keyword;
    if (skip == '' && limit == '') {
      var isFirst = true;
      limit = 20;
      skip = 0;
    }
    console.log(keyword);
    if (keyword.length != 0) {
      this.isSearch = true;
      this._service
        .getscheduleSearchStaffList(
          this.regionId,
          repeatDays,
          this.selectedID,
          keyword,
          skip,
          limit
        )
        .subscribe(
          (res: any) => {
            this.result = res;
            if (isFirst == true) {
              this.result = res;
              console.log('First Time Searching');
              this.tempstafflist = [];
              res.staff.map(staff => {
                staff.search = true;
              });
              // for adding option to the stafff list  end
              this.tempstafflist = res.staff;
              // this.tempstafflist = res.staff;
            } else {
              console.log('Not First Time Searching');
              // this.tempstafflist = res.staff;
              // for adding option to the stafff list
              res.staff.map(staff => {
                staff.search = true;
              });
              // for adding option to the stafff list  end
              // this.tempstafflist = res.staff;
              this.tempstafflist = this.tempstafflist.concat(res.staff);
            }
          },
          err => {
            console.log(err);
          }
        );
    } else {
      this.tempstafflist = [];
      //this.blockUI.start('Loading');
      setTimeout(() => {
        //this.blockUI.stop();
        this.getViewAllStaff('search', skip, limit);
      }, 100);

      this.isSearch = false;
    }
  }

  staffLoadMore(skip: any) {
    if (this.isSearch == true && this.keyword.length != 0) {
      console.log('User Search');
      this.getSearchscheulestaff(this.keyword, skip, '20');
    } else {
      console.log('Not user search');
      this.getViewAllStaff('modal', skip, '20');
    }
  }

  openmodal(content) {
    this.modalReference = this.modalService.open(content, {
      backdrop: 'static',
      keyboard: false,
      windowClass:
        'modal-xl modal-inv d-flex justify-content-center align-items-center'
    });
    this.getViewAllStaff('modal', '0', '20');
  }
  // fix get schedule staff api done ///

  getStaffTimetable(staffId, repeatDays) {
    console.log('ok');
    //this.blockUI.start('Loading...');
    let data;
    if (this.isTeacherAll) {
      data = 'all';
    } else {
      data = staffId;
    }
    this._service
      .getStaffSchedule(this.regionId, data, repeatDays, this.selectedID)
      .subscribe((res: any) => {
        setTimeout(() => {
          //this.blockUI.stop();
        }, 100);

        console.log('staff timetable', res);
        setTimeout(() => {
          console.log($('.my-class').length);
          var mlen = $('.my-class').length;
        }, 300);
        this.finalLists = res;

        for (let i = 0; i < this.finalLists.length; i++) {
          this.monthArray.push(this.finalLists[i].date.month);
          this.noOfMonth = this.monthArray.filter(
            (v, i, a) => a.indexOf(v) === i
          );
        }
        console.log(this.noOfMonth);
        for (let j = 0; j < this.noOfMonth.length; j++) {
          for (let k = 0; k < this.finalLists.length; k++) {
            if (this.noOfMonth[j] == this.finalLists[k].date.month) {
              this.finalLists[k]['multiply'] = j;
            }
          }
        }
        console.error('finalLists', this.finalLists);
      });
  }

  cancelModal(type) {
    this.modalReference.close();
    this.staff.staffId = '';
    this.tempstafflist = [];
    // this.getschedulestaff()
    if (type == 'enrollModal') {
      this.selectedCustomer = {};
      this.stdLists = [];
      this.showList = false;
      this.showInvoice = false;
      this.showPayment = false;
      // this.showPaidInvoice = false;
      this.paymentItem = {};
      this.hideReg = false;
      this.hideDeposit = false;
      this.hideMisc = false;
      this.isEditInv = false;
      this.singleInv = [];
      this.updateInvData = {};
      this.reasonValue = '';
      this.textAreaOption = false;
      this.isGlobal = false;
      this.stdArr = [];
      this.isDisabledBtn = false;
      console.log('exit');
    }
    this.showflexyCourse = false;
  }

  activeTeachers(teacher, index) {
    // this.selectedIndex = index;
    localStorage.setItem('teacherIndex', index);
    console.log(this.selectedTeacher);

    this.selectedTeacher = teacher;
    this.tempSelectedTeacher = teacher;
    this.selectedTeacher.userId = teacher.userId;
    this.isTeacherAll = false;
    // if (this.staffList.staff.indexOf(this.selectedTeacher) > 4) {
    //   $('.teacher-list-wrapper').scrollLeft(150 * (this.staffList.staff.indexOf(this.selectedTeacher)));
    // }
    // else {
    //   $('.teacher-list-wrapper').scrollLeft(0);
    // }
    this.tempTchr = undefined;
    console.log(this.selectedDay);
    if (this.selectedDay.length == 0) {
      this.getStaffTimetable(this.selectedTeacher.userId, '0,1,2,3,4,5,6');
    } else if (this.selectedDay.length > 0) {
      this.getStaffTimetable(
        this.selectedTeacher.userId,
        this.selectedDay.toString()
      );
    }
  }
  public tempTchr: any;
  activeTeachers1(teacher, index) {
    console.log(this.selectedTeacher);

    this.isTeacherAll = false;
    this.keyword = '';
    this.selectedTeacher = teacher;
    this.tempSelectedTeacher = teacher;
    this.selectedTeacher.userId = teacher.userId;
    if (teacher.search) {
      delete teacher.search;
      this.tempTchr = teacher;
      this.staffList.staff.map((staff, index) => {
        if (teacher.userId === staff.userId) {
          this.staffList.staff.splice(index, 1);
        }
      });
      setTimeout(() => {
        this.staffList.staff.unshift(teacher);
        $('.teacher-list-wrapper').scrollLeft(0);
      }, 100);
      this.overFlowWidth(index, 'modalteacher');
      if (this.selectedDay.length == 0) {
        this.getStaffTimetable(this.selectedTeacher.userId, '0,1,2,3,4,5,6');
      } else if (this.selectedDay.length > 0) {
        this.getStaffTimetable(
          this.selectedTeacher.userId,
          this.selectedDay.toString()
        );
      }
    } else {
      this.getschedulestaff(
        'modalteacher',
        this.tempstafflist.length,
        '0',
        index
      );
    }
    setTimeout(() => {
      if (this.tempstafflist) {
        // $('.teacher-list-wrapper').scrollLeft(75 *2 + 78 * 2 + 118 * 2);
        // $('.teacher-list-wrapper').scrollLeft(100 * (this.tempstafflist.indexOf(this.selectedTeacher)));
        console.log(50 * this.tempstafflist.indexOf(this.selectedTeacher));
      } else {
        $('.teacher-list-wrapper').scrollLeft(0);
      }

      this.staff.staffId = '';
      this.tempstafflist = [];
      this.modalReference.close();
      this.scrollLeftPosition = 0;
    }, 400);
  }

  addEnrollModal(modal, type, courseID, seat) {
    this.stdArr = [];
    console.log(type);
    console.log(this.selectedTeacher);

    console.log('course-id-->', courseID, seat);
    this.modalReference = this.modalService.open(modal, {
      backdrop: 'static',
      windowClass: 'modal-xl d-flex justify-content-center align-items-center'
    });
    console.log(courseID);

    this.courseId = courseID;
    this.selectedSeat = seat;
    console.log(this.selectedSeat);

    this.getCourseDetail(this.courseId, modal, type);
    // if (seat.left != null && seat.taken >= seat.total)
    // this.onClickModalTab(type);
    //   else this.onClickModalTab(type);
  }

  getCourseDetail(id, modal, type) {
    console.log(this.isTeacherAll);
    this.selectedTeacher_modal = this.tempTeacher;
    this._service.getSingleCourse(id, this.locationID).subscribe(
      (res: any) => {
        this.detailLists = res;
        this.courseDetail = res;
        if (type != '') this.onClickModalTab(type);
        console.log(
          '>>>>>>>>>>>>>>>>>>>\n>>>>>>>>>>>>>>>>\n>>>>>>>>>>>>>>>>',
          this.courseDetail
        );
        console.error(this.tempTeacher, 'temp selected teacher');
        if (this.isTeacherAll) {
          this.selectedTeacher_modal = this.tempTeacher;
          console.log(this.selectedTeacher_modal);
        }

        console.log(res);
        // if(modal !=  null){
        //   this.modalReference = this.modalService.open(modal, {
        //     backdrop: 'static',
        //     windowClass: 'modal-xl d-flex justify-content-center align-items-center'
        //   });
        // }
      },
      err => {
        console.log(err);
      }
    );
  }

  cancelReliefModal() {
    console.error('cancel relirf~~~');
    this.modalReference.close();
    return new Promise((resolve, reject) => {
      this.getStaffTimetable(
        this.selectedTeacher.userId,
        this.selectedDay.toString()
      );
      this.getCourseDetail(this.detailLists._id, null, '');
      resolve();
    }).then(() => {
      setTimeout(() => {
        // console.log(this.detailLists.lessons[this.currentLessonIdx]);
        // this.checkForRelief(this.detailLists.lessons[this.currentLessonIdx]);
      }, 300);
    });
    // this._service
    //   .editProfile(this.regionId, this.selectedLesson.teacherId)
    //   .subscribe((res: any) => {
    //     console.log(res);
    //   });
  }

  onClickModalTab(type, full?) {
    console.log(full);
    console.log(type);
    console.log(this.courseDetail);
    console.log(this.selectedLesson);

    // this.activeTab = type;
    if (type == 'enroll') {
      this.activeTab = type;
      return new Promise((resolve, reject) => {
        this.getUserInCourse();
        resolve();
      }).then(() => {
        setTimeout(() => {
          console.log(this.detailLists);
          if (this.detailLists && this.detailLists.type == 'REGULAR') {
            this.studentLists.map(customer => {
              this.stdArr.push(customer.userId);
            });
          }
        }, 1000);
      });
    } else if (type == 'view') {
      this.activeTab = type;
      this.getUserInCourse();
    } else if (type == 'relief') {
      console.log(type, this.courseDetail, this.selectedLesson);
      setTimeout(() => {
        this.searchSelectedLesson(type);
        this.activeTab = type;
      }, 500);
    } else if ((type = 'cancel')) {
      this.activeTab = 'cancel';
      this.getUserInCourse();
      console.log('exit cancel');
      setTimeout(() => {
        this.searchSelectedLesson(type);
      }, 500);
    } else {
      this.getUserInCourse();
      this.activeTab = type;
    }
  }

  searchSelectedLesson(type) {
    console.log(this.courseDetail.lessons);
    if (this.courseDetail.lessons != undefined) {
      this.courseDetail.lessons.map(lesson => {
        // console.log(lesson.startDate);
        var lessondate = lesson.startDate.split('T')[0];
        // console.log(lessondate);
        var m =
          this.lessonD.month < 10
            ? '0' + this.lessonD.month
            : this.lessonD.month;
        var d =
          this.lessonD.day < 10 ? '0' + this.lessonD.day : this.lessonD.day;
        var tempDate = this.lessonD.year + '-' + m + '-' + d;
        // console.log('tempDate', tempDate);
        if (lessondate == tempDate) {
          this.selectedLesson = lesson;
          console.log('selected lesson', this.selectedLesson);
          this.activeTab = type;
        }
      });
    }
  }
  getUserInCourse() {
    //temp api for testing UI
    // //this.blockUI.start('Loading...');
    console.log('lessonD~~~~~~~', this.lessonD);
    // console.log("selectedCourse ~~~~~~~~~~~~~",this.selectedCourse)
    const lessonDateObj = this.lessonD;
    this._service
      .getAssignUser(
        this.regionId,
        this.courseId,
        lessonDateObj.day,
        lessonDateObj.month,
        lessonDateObj.year
      )
      .subscribe(
        (res: any) => {
          // //this.blockUI.stop();
          console.log(res);
          this.studentLists = res.CUSTOMER;
          this.selectedSeat.taken = this.studentLists.length;
          this.selectedSeat.left =
            this.selectedSeat.total - this.selectedSeat.taken;
          console.log(this.selectedSeat);

          res.CUSTOMER.map(customer => {
            this.studentArray.push(customer.userId);
          });
        },
        err => {
          console.log(err);
        }
      );
  }

  focusMethod(e, userType) {
    // console.log(e)
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
    // let courseId = "5beb8c7d1f893164fff2c31d";

    userType = userType == 'teacher' ? 'staff' : userType;
    console.log(userType);
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
    } else if (searchWord.length == 0) {
      this.userLists = [];
      this.showList = false;
    }
  }

  selectCustomer(state, id, type) {
    this.getSingleCustomer(id);
    this.formData = {};
  }

  getSingleCustomer(ID) {
    //this.blockUI.start('Loading...');
    console.log('this.selectedCustomer', this.selectedCustomer);
    this._service.editProfile(this.regionId, ID).subscribe((res: any) => {
      res.details.map(info => {
        if (info.controlType === 'Datepicker')
          info.value = moment(info.value).format('YYYY-MM-DD');
      });
      //this.blockUI.stop();
      console.log('selected Customer', res);
      this.selectedCustomer = res;
      this.custDetail.user = res;
      console.log(this.custDetail);
      this.stdLists = this.selectedCustomer.userId;
      console.log(this.stdLists);
      this.showList = false;
      if (this.detailLists && this.detailLists.type == 'FLEXY') {
        if (this.detailLists.seat_left === 0) {
          // console.log(this.pplLists)
          var includedUserId = this.studentLists.findIndex(
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
      }
    });
  }

  closeDropdown(event, type) {
    console.log('close dropdown', event);
    if (type == 'search') {
      var parentWrap = event.path.filter(function(res) {
        return res.className == 'search-wrap';
      });
      if (parentWrap.length == 0) {
        this.showList = false;
      }
    }
  }
  ctype: any;
  addCustomer(cDetail, userType, invoiceAlert) {
    this.isDisabledBtn = false;
    console.log(userType);
    console.log(cDetail);
    console.log(this.courseDetail);
    console.log(this.selectCustomer);
    if (cDetail.type == 'FLEXY') {
      this.ctype = 'schedule';
      //this.blockUI.start('Loading...');
      this.tempCourdeId = cDetail._id;
      this.tempuserType = userType;
      //  getflexi
      let startDate;
      let endDate;
      this._service
        .getFlexi(cDetail._id, this.selectedCustomer.userId, startDate, endDate)
        .subscribe(
          (res: any) => {
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
      this.stdArr = [];
      console.log('call from addCustomer', this.selectedCustomer);
      let body = {
        courseId: cDetail._id,
        userId: this.selectedCustomer.userId,
        userType: userType
      };
      console.log('body', body);
      //this.blockUI.start('Loading...');
      this._service.assignUser(this.regionId, body, this.locationID).subscribe(
        (res: any) => {
          //this.blockUI.stop();
          if (this.selectedDay.length == 0) {
            this.getStaffTimetable(
              this.selectedTeacher.userId,
              '0,1,2,3,4,5,6'
            );
          } else if (this.selectedDay.length > 0) {
            this.getStaffTimetable(
              this.selectedTeacher.userId,
              this.selectedDay.toString()
            );
          }
          if (this.disableInvoice) {
            this.invoiceModalReference.close();
            this.cancelModal('closeInv');
            //this.blockUI.stop();
            return;
          }
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
          // this.courseInfo = this.courseDetail;
          // Object.assign(this.courseInfo , res)
          this.invoice = res.invoice;
          this.showInvoice = true;
          Object.assign(this.detailLists, res.body);
          this.invoiceID2 = this.detailLists.invoice[0]._id;
          this.showOneInvoice(this.invoice);

          this.getUserInCourse();
        },
        err => {
          console.log(err);
        }
      );
      // this.showInvoice = true;
    }
  }

  showOneInvoice(invoice) {
    for (var i in invoice) {
      // this.updatedDate = invoice[i].updatedDate;
      // this.dueDate = invoice[i].dueDate;
      this.invoiceID = invoice[i]._id;
      this.refInvID = invoice[i].refInvoiceId;
      this.invTaxName = invoice[i].tax.name;
      this.invCurrency = invoice[i].currency;
      this.invPayment = invoice[i].payments;
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
      if (invoice[i].courseId == this.courseDetail._id) {
        this.invoiceCourse['name'] = this.courseDetail.name;
        this.invoiceCourse['startDate'] = this.courseDetail.startDate;
        this.invoiceCourse['endDate'] = this.courseDetail.endDate;
        this.invoiceCourse['lessonCount'] = this.courseDetail.lessonCount;
      }
    }
  }

  showPopup(type, value) {
    this.isEditInv = true;
    if (type == 'courseFee') {
      this.feesBox = true;
      this.value.courseFee = value;
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
    if (type == 'courseFee') {
      this.feesBox = false;
      this.value.courseFee = '';
    }
  }

  updateCfee(data) {
    console.log('updateCfee', data);
    this.feesBox = false;
    for (var i in this.invoice) {
      if (this.invoice[i].courseFee.fee != data) {
        console.log('===not same');
        this.updateInvData['courseFee'] = data;
        // this.updateInvData["courseFee"] = {
        //   'fee': Number(data)
        // };
        this.invoice[i].courseFee.fee = Number(data);
        console.log(this.invoice[i].courseFee.fee);
        // formula for calculating the inclusive tax
        // Product price x RATE OF TAX/ (100+RATE OF TAX);
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
    //this.blockUI.start('Loading...');
    console.log('Inv Update Data', this.updateInvData);
    this._service
      .updateInvoiceInfo(this.invoiceID, this.updateInvData)
      .subscribe(
        (res: any) => {
          //this.blockUI.stop();
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

  sendInvoice() {
    // this.showStudentOption = '';
    // this.xxxhello = '';
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
          this.cancelModal('enrollModal');
        },
        err => {
          console.log(err);
          this.toastr.error('Fail to sent the Invoice.');
        }
      );
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

  choosePayment(type) {
    console.log('choosePayment', type);
    this.selectedPayment = type.name;
    this.paymentId = type.id;
  }

  payNow(type) {
    // this.showStudentOption = '';
    // this.xxxhello = '';
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
        this.cancelModal('enrollModal');
      },
      err => {
        if (err.message == 'Amount is overpaid.') {
          this.toastr.success('Amount is overpaid.');
        }
        this.toastr.error('Payment Fail');
      }
    );
  }

  backToInvoice() {
    console.log('Back To Invoice');
    this.showPayment = false;
    this.showInvoice = true;
    this.paymentItem = {};
  }
  showDp: boolean = false;
  scheduleObj = {};

  testTop;
  testLeft;

  getSlotNumber(hr, min, ampm, e, i, j, date, weekday) {
    this.isFousCategory = false;
    const ele = document.getElementById('overlap-wrapper');
    if (e.target.parentElement.className === 'slot-wrap border-0') {
      this.testTop = e.clientY;
      this.testLeft = e.clientX;
      e.preventDefault();
      e.stopPropagation();
      this.caculatePosition(e);
      return;
    } else {
      this.overlap = false;
    }

    $('.disabledScroll').css('overflow', 'hidden');
    this.screenValue = window.innerWidth; //for resize condition to mactch window size

    console.log('minSlot', this.minSlotArr);
    // var cIdx = this.minSlotArr.indexOf(min);
    // if(cIdx>=0){
    //    var pIdx = cIdx-1;
    //    if((min >=0 && min<=15) && this.minSlotArr[pIdx]>this.minSlotArr[cIdx]){
    //     var h = hr+1;
    //     console.log("add +1", h, ':', min, ':', ampm);
    //    }else{
    //     var h = hr;
    //     console.log("original", h, ':', min, ':', ampm);
    //    }
    // }
    console.log('min', min);

    var cIdx = this.minSlotArr.indexOf(min);
    console.log('cIdx', cIdx);
    var pIdx = cIdx - 1;
    if (
      (cIdx == 1 || cIdx == 3) &&
      this.minSlotArr[cIdx] >= 0 &&
      this.minSlotArr[cIdx] <= 15 &&
      this.minSlotArr[pIdx] > this.minSlotArr[cIdx]
    ) {
      var h = hr + 1;
      if (h > 12) {
        h = h - 12;
      }
      console.log('add 1', h);
    } else {
      var h = hr;
      console.log('original', h);
    }

    if (h == 12) {
      ampm = 'PM';
    }
    // var h = hr;

    if (min == ['']) {
      min = '00';
    }
    this.slotHr = h + ':' + min + ' ' + ampm;

    this.slotM = min;
    this.slotAMPM = ampm;
    this.slotIdx = i;
    this.slotJidx = j;
    this.showDp = true;
    e.preventDefault();
    e.stopPropagation();
    this.yPosition = e.layerY + 25;
    this.xPosition = e.layerX - 25;

    console.log($(event.target).offset().left + '<left');
    console.log($(event.target).offset().top + '<top');
    console.log($(event.target).height() + '<height');
    this.xPosition =
      $(event.target).offset().left - 150 + $(event.target).width() / 2;
    this.yPosition =
      $(event.target).offset().top + $(event.target).height() + 10;
    this.arrTop = $(event.target).offset().top + $(event.target).height() - 10;
    this.arrLeft = this.xPosition + 140;

    console.log('xPostiton>' + this.xPosition);
    console.log('yPosition>' + this.yPosition);
    console.log('arrTop>' + this.arrTop);
    console.log('arrLeft>' + this.arrLeft);
    console.log('width>', $(document).width());
    let height;
    if (this.isTeacherAll) {
      height = 136;
    } else {
      height = 160;
    }
    if ($(document).height() - this.yPosition < height) {
      this.yPosition = $(event.target).offset().top - height;
      this.arrTop = this.yPosition + height;
      this.arrClasses = {
        'arr-box': true,
        'arr-down': true
      };
    } else {
      this.arrClasses = {
        'arr-box': true,
        'arr-up': true
      };
    }

    this.styleArrDefault = {
      top: this.yPosition + 'px',
      left: this.xPosition + 'px'
    };
    if ($(document).width() - this.xPosition < 300) {
      console.log('here 1');
      this.xPosition = 0;
      this.isSide = true;
      this.styleArr = {
        top: this.yPosition + 'px',
        right: '0px'
      };
    } else if (this.xPosition < 0) {
      console.log('here 2');
      this.isSide = true;
      this.xPosition = 0;
      this.styleArr = {
        top: this.yPosition + 'px',
        left: '0px'
      };
    } else {
      console.log('here 3');
      this.isSide = false;
      this.styleArr = {
        top: this.yPosition + 'px',
        left: this.xPosition + 'px'
      };
    }
    console.log('selected', this.selectedTeacher);
    console.log('selectdate', date);
    var day = [];
    switch (weekday) {
      case 'Sun':
        day.push(0);
        break;
      case 'Mon':
        day.push(1);
        break;
      case 'Tue':
        day.push(2);
        break;
      case 'Wed':
        day.push(3);
        break;
      case 'Thu':
        day.push(4);
        break;
      case 'Fri':
        day.push(5);
        break;
      case 'Sat':
        day.push(6);
    }

    // this.scheduleObj["date"] = date;
    // this.scheduleObj["repeatDay"] =
    var sDate = {
      year: date.year,
      month: date.month,
      day: date.day
    };
    var time = {
      hr: h,
      min: this.slotM,
      meridiem: this.slotAMPM
    };

    this.scheduleObj['repeatDays'] = day;
    this.scheduleObj['date'] = sDate;
    this.scheduleObj['teacher'] = this.selectedTeacher;
    this.scheduleObj['time'] = time;
    console.log('scheduleObj', this.scheduleObj);
  }

  onClickCreate() {
    $('.disabledScroll').css('overflow', 'auto');
    $('body').css('overflow', 'auto');
    this.courseCreate = true;
    this.courseplanLists = [];
    this.getAllCoursePlan('0', '20');
  }
  // onClickCreate() {
  //   this.courseCreate = true;
  //   this.getCoursePlan(0, 'createCourse');
  // }

  createPlan() {
    // $('body').css('overflow', 'auto');
    console.log('course Plan');
    this.isCategory = true;
    this.goBackCat = false;
    // this.isPlan = true;
    this.courseCreate = false;
    var category = {
      categoryId: this.selectedCategory._id,
      name: this.selectedCategory.name
    };
    localStorage.setItem('cpCategory', JSON.stringify(category));
  }
  selectPlan(plan) {
    this.courseplanLists = [];
    console.log('plan', plan);
    console.log(this.selectedID);
    let planObj = {
      name: plan.name,
      id: plan._id,
      duration: plan.lesson.duration,
      paymentPolicy: plan.paymentPolicy,
      description: plan.description,
      from: 'schedule'
    };
    // this.goBackCat = false;
    // this.isCourseCreate = true;
    console.log('redirect rolloverCourse to courseCreate', this.rolloverCourse);
    if (this.rolloverCourse != '') {
      var isSame: boolean;
      console.log('for rollover');
      this.goBackCat = false;
      this.isCourseCreate = true;
      if (this.rolloverCourse.coursePlan.id == plan._id) {
        isSame = true;
      } else {
        isSame = false;
      }
      //rollover course use this type 'rollover' and localStorage.setItem("courseID") is also used in course
      let obj = {
        courseId: this.rolloverCourse.courseId,
        userId: this.rolloverCourse.userId,
        type: 'rollover',
        isSamePlan: isSame,
        plan: {
          name: plan.name,
          id: plan._id,
          duration: plan.lesson.duration,
          paymentPolicy: plan.paymentPolicy
        }
      };
      localStorage.setItem('courseID', JSON.stringify(obj));
      localStorage.removeItem('cPlan');
      localStorage.removeItem('scheduleObj');
    } else {
      console.log('not for rollover');
      this.goBackCat = false;
      this.isCourseCreate = true;
      localStorage.removeItem('courseID');
      localStorage.setItem('cPlan', JSON.stringify(planObj));
      console.log('scheduleObj', this.scheduleObj);
      if (this.isTeacherAll) {
        this.scheduleObj['teacher'] = '';
      }
      localStorage.setItem('scheduleObj', JSON.stringify(this.scheduleObj));
    }
    // console.log("scheduleObj",this.scheduleObj);
  }

  cancelClass(lessonId) {
    var cancelData;
    if (
      this.reasonValue == null ||
      this.reasonValue.length == 0 ||
      this.reasonValue == undefined ||
      this.isGlobal == false
    ) {
      var noReason = {
        lessonId: lessonId,
        students: this.studentArray
      };
      cancelData = noReason;
      console.log('exit');
    } else {
      var reason = {
        lessonId,
        students: this.studentArray,
        message: this.reasonValue
      };
      cancelData = reason;
    }

    console.log(cancelData);
    console.log(this.isGlobal);
    console.log(this.courseId);

    // console.log(this.isGlobal)
    // Call cancel class api service
    // //this.blockUI.start('Loading...');
    // this.isGlobal
    this._service
      .cancelUsersFromClass(this.courseId, cancelData, this.isGlobal)
      .subscribe(
        (res: any) => {
          // Success function
          // //this.blockUI.stop();
          // this.cancelUI=false;
          // this.cancelUi=false;

          console.log(res);

          console.info('cancle user from class api calling is done');
          console.log(res);
          this.isGlobal = false;
          // this.disableCancel = true;
          // this.getCourseDetail(this.courseId);
          this.getStaffTimetable(this.selectedTeacher.userId, '0,1,2,3,4,5,6');
          // Close Dialog box
          // Show the canceled users
          this.reasonValue = '';
          this.textAreaOption = false;
          this.isGlobal = false;
        },
        err => {
          // Error function
          this.isGlobal = false;
          console.log('cancle user from class has got error', err);
          // Do something
        }
      );
    this.modalReference.close();
    // this.cancelUItext= false;
  }

  onClickCourse(course, lesson, e, date, list, type) {
    console.error('here onclickcourse');
    this.isFousCategory = false;
    this.overlap = false;
    this.tempTeacher = course.teacher[0];
    console.error('temp teacher', this.tempTeacher);
    console.log(type);
    if (type == 'cancel') {
      var day = [];
      switch (date.dayOfWeek) {
        case 'Sun':
          day.push(0);
          break;
        case 'Mon':
          day.push(1);
          break;
        case 'Tue':
          day.push(2);
          break;
        case 'Wed':
          day.push(3);
          break;
        case 'Thu':
          day.push(4);
          break;
        case 'Fri':
          day.push(5);
          break;
        case 'Sat':
          day.push(6);
      }
      var sDate = {
        year: date.year,
        month: date.month,
        day: date.day
      };
      this.scheduleObj['repeatDays'] = day;
      this.scheduleObj['date'] = sDate;
      this.scheduleObj['teacher'] = this.selectedTeacher;
      this.scheduleObj['time'] = course.start;
    }
    this.selectedCourse = course;
    // if (list.isOverlap == true) {

    //   return;
    // }
    this.showInvoice = false;
    this.showPayment = false;
    this.selectedCustomer = {};
    // this.showDp = true;
    console.log(this.selectedCourse.course.type);
    e.preventDefault();
    e.stopPropagation();
    console.log(this.courseDetail);

    if (
      course.seat.left != null &&
      course.seat.taken >= course.seat.total &&
      this.selectedCourse.course.type == 'REGULAR'
    )
      this.enrollBtnDisabled = true;
    else this.enrollBtnDisabled = false;
    console.log('enrollBtnDisable', this.enrollBtnDisabled);
    this.lessonD = date;
    console.log(course.seat);
    console.log($(event.target).parents());
    if (
      $(event.target).parents('.options-box').length > 0 ||
      $(event.target).hasClass('options-box')
    ) {
      console.log('fffffffffff');
    } else {
      if (course.seat != {}) {
        console.log('dfdfdfdfdfdfdf');
        this.popUpHeight = 390;
      } else {
        this.popUpHeight = 380;
      }
      if ($(event.target).parents('.lesson-slot').length > 0) {
        this.yPosition =
          $(event.target)
            .parents('.lesson-slot')
            .offset().top +
          $(event.target)
            .parents('.lesson-slot')
            .height() +
          20;
      } else {
        this.yPosition =
          $(event.target).offset().top + $(event.target).height() + 20;
      }

      this.arrTop = this.yPosition - 41;
      this.xPosition = e.x - 40;
      this.arrLeft = e.x - 10;
      if ($(document).height() - (this.yPosition + 80) < this.popUpHeight) {
        console.log('I found u');
        this.yPosition = this.yPosition - this.popUpHeight - 20;
        this.arrTop = this.yPosition + this.popUpHeight - 10;
        this.arrClasses = {
          'arr-down': true
        };
      } else {
        this.arrClasses = {
          'arr-up': true
        };
      }
      if ($(document).width() - this.xPosition < 420) {
        this.xPosition = 0;
        this.styleArr = {
          top: this.yPosition - 21 + 'px',
          right: '0px'
        };
        // this.styleArr.top=this.yPosition+"px";
        // this.styleArr.right="0px";
      } else {
        this.styleArr = {
          top: this.yPosition - 21 + 'px',
          left: this.xPosition + 'px'
        };
        // this.styleArr.top=this.yPosition+"px";
        // this.styleArr.left=this.xPosition+"px";
      }
    }
    this.testshowboxs = true;
    this.testshowbox = course.course.courseId;
    this.courseInfo['course'] = course.course;
    this.courseInfo['lesson'] = lesson;

    console.log(this.courseInfo);
    console.log(course);
    console.log(lesson);

    e.preventDefault();
    e.stopPropagation();
    this.yPosition = e.layerY + 25;
    this.xPosition = e.layerX - 25;

    this.xPosition =
      $(event.target).offset().left - 150 + $(event.target).width() / 2;
    this.yPosition =
      $(event.target).offset().top + $(event.target).height() + 10;
    let arrTemptop =
      $(event.target).offset().top + $(event.target).height() - 10;
    let arrTempLeft = this.xPosition + 140;

    setTimeout(() => {
      // if (
      //   e.target.className == 'selectedCourse' ||
      //   e.target.className == 'lesson-slot selectedCourse'
      // ) {
      //   console.warn('bottom state')
      //   this.arrTop = arrTemptop;
      //   this.arrLeft = arrTempLeft;
      //   if ($(document).height() - this.yPosition < 180) {
      //     this.yPosition = $(event.target).offset().top - 170;
      //     this.arrTop = this.yPosition + 160;
      //     this.arrClasses = {
      //       'arr-box': true,
      //       'arr-down': true
      //     };
      //   } else {
      //     this.arrClasses = {
      //       'arr-box': true,
      //       'arr-up': true
      //     };
      //   }
      //   console.log('here me');
      //   this.styleArrDefault = {
      //     top: this.yPosition + 'px',
      //     left: this.xPosition + 'px'
      //   };
      //   if ($(document).width() - this.xPosition < 300) {
      //     console.log('here 1');
      //     this.xPosition = 0;
      //     this.isSide = true;
      //     this.styleArr = {
      //       top: this.yPosition + 'px',
      //       right: '0px'
      //     };
      //   } else if (this.xPosition < 0) {
      //     console.log('here 2');
      //     this.isSide = true;
      //     this.xPosition = 0;
      //     this.styleArr = {
      //       top: this.yPosition + 'px',
      //       left: '0px'
      //     };
      //   } else {
      //     console.log('here 3');
      //     this.isSide = false;
      //     this.styleArr = {
      //       top: this.yPosition + 'px',
      //       left: this.xPosition + 'px'
      //     };
      //   }
      // }
    }, 20);

    if (lesson.cancel) {
      this.yPosition = e.layerY + 25;
      this.xPosition = e.layerX - 25;

      console.log($(event.target).offset().left + '<left');
      console.log($(event.target).offset().top + '<top');
      console.log($(event.target).height() + '<height');
      this.xPosition =
        $(event.target).offset().left - 150 + $(event.target).width() / 2;
      this.yPosition =
        $(event.target).offset().top + $(event.target).height() + 10;
      this.arrTop =
        $(event.target).offset().top + $(event.target).height() - 10;
      this.arrLeft = this.xPosition + 140;

      console.log('xPostiton>' + this.xPosition);
      console.log('yPosition>' + this.yPosition);
      console.log('arrTop>' + this.arrTop);
      console.log('arrLeft>' + this.arrLeft);
      console.log('width>', $(document).width());
      let height;
      if (this.isTeacherAll) {
        height = 136;
      } else {
        height = 160;
      }
      if ($(document).height() - (this.yPosition + height - 20) < height) {
        this.yPosition = $(event.target).offset().top - height;
        this.arrTop = this.yPosition + height;
        this.arrClasses = {
          'arr-box': true,
          'arr-down': true
        };
      } else {
        this.arrClasses = {
          'arr-box': true,
          'arr-up': true
        };
      }

      this.styleArrDefault = {
        top: this.yPosition + 'px',
        left: this.xPosition + 'px'
      };
      if ($(document).width() - this.xPosition < 300) {
        console.log('here 1');
        this.isSide = true;
        this.styleArr = {
          top: this.yPosition + 'px',
          right: '0px'
        };
      } else if (this.xPosition < 0) {
        console.log('here 2');
        this.xPosition = 0;
        this.styleArr = {
          top: this.yPosition + 'px',
          left: '0px'
        };
      } else {
        console.log('here 3');
        this.styleArr = {
          top: this.yPosition + 'px',
          left: this.xPosition + 'px'
        };
      }
    }
  }

  //  Test Course Plan List Api
  showMore(skip: any) {
    if (this.isSearch == true) {
      console.log('User Search');
      this.getSearchCoursePlan(this.keyword, skip, 20);
    } else {
      console.log('Not user search');
      this.getAllCoursePlan(skip, 20);
    }
  }
  getAllCoursePlan(skip, limit) {
    //this.blockUI.start('Loading');
    let keyboard;
    this._service
      .getAllCourseplan(
        this.regionId,
        this.locationID,
        this.selectedID,
        skip,
        limit,
        this.keyword
      )
      .subscribe(
        (res: any) => {
          console.log('Course Plan List', res);
          this.result = res;
          //  this.courseplanLists = [];
          this.courseplanLists = this.courseplanLists.concat(res);
          setTimeout(() => {
            //this.blockUI.stop();
          }, 300);
        },
        err => {
          //this.blockUI.stop();
          console.log(err);
        }
      );
  }

  getSearchCoursePlan(searchWord, skip, limit) {
    console.log(searchWord);
    this.keyword = searchWord;
    if (skip == '' && limit == '') {
      var isFirst = true;
      limit = 20;
      skip = 0;
    }
    if (searchWord.length != 0) {
      this.isSearch = true;
      this._service
        .getSearchCoursePlan(
          this.regionId,
          this.locationID,
          this.selectedID,
          skip,
          limit,
          searchWord
        )
        .subscribe(
          (res: any) => {
            this.result = res;
            if (isFirst == true) {
              console.log('First Time Searching');
              this.courseplanLists = [];
              this.courseplanLists = res;
            } else {
              console.log('Not First Time Searching');
              this.courseplanLists = this.courseplanLists.concat(res);
            }
          },
          err => {
            console.log(err);
          }
        );
    } else {
      setTimeout(() => {
        this.courseplanLists = [];
        this.getAllCoursePlan(skip, limit);
        this.isSearch = false;
      }, 300);
    }
  }
  updateScrollbar(type) {
    // console.error('update scroll bar');
    var scrollbar = document.getElementById('fixed-bottom-test');
    var content = document.getElementById('testScroll');
    var inner = document.getElementById('innerScrollbar');
    if (content != null) {
      inner.style.width = content.scrollWidth + 'px';
      if (type == 'v-wrapper') {
        this.overlap = false;
        scrollbar.scrollLeft = content.scrollLeft;
      } else {
        content.scrollLeft = scrollbar.scrollLeft;
      }
    }

    // scrollbar.scrollLeft = content.scrollLeft;
    // content.scrollLeft = scrollbar.scrollLeft;
  }

  goToCourse(course) {
    // this.router.navigate(['/course']);
    // this.dataService.nevigateCourse(course.courseId);
    this.router.navigate(['/coursedetail', course.courseId]);
  }

  //startFlexi
  isConflictAll: boolean = false;
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

  clickOverlay() {
    console.log(this.flexyarr);
    this.showcb = false;
    this.FlexiComponent.changes.subscribe(e => {
      $('.conflictPopUp').hide();
      if (document.getElementById('flexiMid') != null) {
        let hideoverlay: HTMLElement = document.getElementById('flexiMid');
        hideoverlay.setAttribute('style', 'overflow: overlay;');
      }
      if (document.getElementById('lessonbox') != null) {
        let hideindex: HTMLElement = document.getElementById('lessonbox');

        hideindex.setAttribute('style', 'z-index: 0;');
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
    if (invoiceAlert) {
      this.invoiceModalReference = this.modalService.open(invoiceAlert, {
        backdrop: 'static',
        windowClass:
          'deleteModal d-flex justify-content-center align-items-center'
      });

      return;
    }
    //add cutomer
    this.stdLists = [];
    console.log('call from addCustomer', this.selectedCustomer);
    let lessonBody = {
      userType: this.tempuserType,
      courseId: this.tempCourdeId,
      userId: this.selectedCustomer.userId,
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
          this.cancelModal('closeInv');
          //this.blockUI.stop();
          return;
        }
        // this.courseInfo = this.detailLists;
        Object.assign(this.detailLists, res.body);
        console.log('-------->', this.detailLists);

        console.log('res Assign customer', res);
        if (
          res.body.invoiceSettings == {} ||
          res.body.invoiceSettings == undefined
        ) {
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
          this.invoiceInfo = res.body.invoiceSettings;
        }
        //this.blockUI.stop();
        this.invoice = res.body.invoice;
        this.invoiceID2 = this.invoice[0]._id;
        this.showInvoice = true;
        this.showflexyCourse = false;
        this.showPayment = false;
        this.showOneInvoice(this.invoice);
      });
    this.getUserInCourse();
    //add lesson
    console.log(this.checkobjArr);
  }
  // end flexy
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    $('body').css('overflow', 'auto');
    localStorage.removeItem('scheduleObj');
  }

  printSchedule() {
    window.print();
  }
  showTextarea() {
    this.textAreaOption = true;
  }
  //start cancel funtion

  public overlapClasses = {};
  public overlapArrClasses = {};
  public overlapXTop;
  public overlapYLeft;
  public overlap = false;
  caculatePosition(e) {
    this.overlap = true;
    // e.preventDefault();
    // e.stopPropagation();
    $('.disabledScroll').css('overflow', 'hidden');
    let YPosition = e.clientY;
    let XPosition = e.clientX;
    this.overlapArrClasses = {
      top: YPosition - 20 + 'px',
      left: XPosition + 'px'
    };
    this.overlapXTop = YPosition + 'px';
    this.overlapYLeft = XPosition + 'px';
    // this.overlapClasses = {
    //   top:  YPosition + 'px',
    //   left: XPosition + 'px',
    // }
    this.arrClasses = {
      'arr-box': true,
      'arr-down': false,
      'arr-up': true
    };
    if ($(document).width() - XPosition < 240) {
      // this.overlapArrClasses = {
      //   top : YPosition + 'px',
      //   left : XPosition-240+ 'px'
      // }
      this.arrClasses = {
        'arr-box': true,
        'arr-down': false,
        'arr-up': true
      };
      this.overlapYLeft = XPosition - 210 + 'px';
      this.overlapClasses = {
        top: YPosition + 'px',
        left: XPosition - 210 + 'px'
      };
    }

    if ($(document).height() - (YPosition + 112) < 56) {
      this.overlapXTop = YPosition - 56 + 'px';
      this.overlapClasses = {
        top: YPosition - 56 + 'px',
        left: XPosition + 'px'
      };
      this.arrClasses = {
        'arr-box': true,
        'arr-down': true
      };
      this.overlapArrClasses = {
        top: YPosition + 'px',
        left: XPosition + 'px'
      };
      this.arrClasses = {
        'arr-box': true,
        'arr-down': true,
        'arr-up': false
      };
    }
  }
  public disableInvoice;
  confirmInvoiceAlert(courseId, userType) {
    this.disableInvoice = false;
    if (this.courseDetail.type == 'FLEXY') {
      this.flexicomfirm(undefined);
    } else {
      this.addCustomer(this.courseDetail, this.tempuserType, undefined);
    }
    this.invoiceModalReference.close();
  }
  cancelInvoiceAlert() {
    this.disableInvoice = true;
    if (this.courseDetail.type == 'FLEXY') {
      this.flexicomfirm(undefined);
    } else {
      this.addCustomer(this.courseDetail, this.tempuserType, undefined);
    }
    this.invoiceModalReference.close();
  }
  public invoiceModalReference;
}
