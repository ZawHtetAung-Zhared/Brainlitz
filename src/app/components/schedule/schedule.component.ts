import { Component, OnInit, ViewContainerRef, HostListener, EventEmitter, AfterViewInit } from '@angular/core';

import { appService } from '../../service/app.service';
import { MinuteSecondsPipe } from '../../service/pipe/time.pipe'
import { NgbModal, ModalDismissReasons, NgbDatepickerConfig, NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastsManager } from 'ng5-toastr/ng5-toastr';

import * as moment from 'moment';
import { InvoiceComponent } from '../invoice/invoice.component';
declare var $: any;
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  // public isSearch:boolean = false;
  public result: any;
  public logo: any = localStorage.getItem("OrgLogo");
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
  public styleArr;
  public selectedDay = [];
  public lessonId: any;
  public keyword: any = '';
  public limit: number = 20;
  public skip: number = 0;
  public tempstafflist: any = [];
  public testin: any;
  public activeTeacher: any;
  public teacherListSearchResult: any = { staff: [] }
  public testshowbox: any = '';
  public selectedSeat: any;
  public isSearch: boolean = false;
  public coursePlanSearchKeyWord: any;
  // public SelectedDate = [];
  public monthCount: boolean = false;
  public monthArray: any = [];
  public noOfMonth: any = [];
  public isGlobal: boolean = false;
  public showSelectedDays = '~'
  public showSelectedDays1 = [0, 1, 2, 3, 4, 5, 6]
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
  goBackCat: boolean;
  isCategory: boolean = false;
  isPlan: boolean = false;
  isCourseCreate: boolean = false;


  // public toggleBool:boolean = true;
  // clickInit:boolean = false;
  model: any = {};
  public listings = [
    {
      'name': 'Dec'
    },
    {
      'name': 'Dec'
    },
    {
      'name': 'JAN'
    },
    {
      'name': 'JAN'
    },
    {
      'name': 'Feb'
    }
  ]

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
    { "day": "Sun", "val": 0 },
    { "day": "Mon", "val": 1 },
    { "day": "Tue", "val": 2 },
    { "day": "Wed", "val": 3 },
    { "day": "Thu", "val": 4 },
    { "day": "Fri ", "val": 5 },
    { "day": "Sat", "val": 6 }
  ];



  public teachers = [
    { "name": 'Aldous', "id": 0 },
    { "name": 'Harry ', "id": 2 },
    { "name": 'Lunox', "id": 3 },
    { "name": 'Leomord', "id": 4 },
    { "name": 'Hayabusa', "id": 5 },
    { "name": 'Leomord', "id": 4 },
    { "name": 'Hayabusa', "id": 5 },
    { "name": 'Leomord', "id": 4 },
    { "name": 'Hayabusa', "id": 5 },
    { "name": 'Leomord', "id": 4 },
    { "name": 'Hayabusa', "id": 5 },
    { "name": 'Leomord', "id": 4 },
    { "name": 'Hayabusa', "id": 5 },
    { "name": 'Leomord', "id": 4 },
    { "name": 'Hayabusa', "id": 5 },
    { "name": 'Leomord', "id": 4 },
    { "name": 'Hayabusa', "id": 5 },
    { "name": 'Leomord', "id": 4 },
    { "name": 'Hayabusa', "id": 5 },
    { "name": 'Leomord', "id": 4 },
    { "name": 'Hayabusa', "id": 5 },
    { "name": 'Leomord', "id": 4 },
    { "name": 'Hayabusa', "id": 5 },
    { "name": 'Leomord', "id": 4 },
    { "name": 'Hayabusa', "id": 5 },
    { "name": 'Leomord', "id": 4 },
    { "name": 'Hayabusa', "id": 5 },
    { "name": 'Kagura', "id": 6 }
  ]
  // public testTime = '13:00';

  //https://brainlitz.s3.amazonaws.com/development/stgbl-cw1/profile/154088885512582284596_original.jpg

  // gotoScheduleList(){
  //   this.scheduleList=false;
  // }

  constructor(private _service: appService, private modalService: NgbModal, public toastr: ToastsManager, public vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
    this._service.goback.subscribe(() => {
      console.log('goooo')
      this.isCategory = false;
      this.isPlan = false;
      this.goBackCat = false;
      this.isCourseCreate = false;
      this.courseCreate = true;
    });

    this._service.goCat.subscribe(() => {
      console.log('goback22', this.goBackCat)
      this.goBackCat = false;
      this.isCategory = true;
      this.isPlan = false;
      this.courseCreate = false;
    });

    this._service.goplan.subscribe(() => {
      console.log('go plan')
      this.isCategory = false;
      this.isPlan = true;
      this.goBackCat = true;
      this.isCourseCreate = false;
      this.courseCreate = false;
      // this.scheduleList = false;
    })

    this._service.goCourse.subscribe(() => {
      console.log('goback33')
      this.isCategory = false;
      this.isPlan = false;
      this.goBackCat = false;
      this.isCourseCreate = false;
      this.courseCreate = true;
      this.courseplanLists = [];
      this.getAllCoursePlan(0, 20);
      console.log("courseplanLists", this.courseplanLists)
      if (this.selectedDay.length == 0) {
        this.getStaffTimetable(this.selectedTeacher.userId, '0,1,2,3,4,5,6');
      } else if (this.selectedDay.length > 0) {
        this.getStaffTimetable(this.selectedTeacher.userId, this.selectedDay.toString());
      }
      console.log("schedule", this.scheduleList)
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
      console.log('go to cc')
      this.isCategory = false;
      this.isPlan = false;
      this.goBackCat = false;
      this.isCourseCreate = true;
    });
  }
  @HostListener('document:click', ['$event']) clickedOutside($event) {
    console.log($event);
    // here you can hide your menu
    this.testshowbox = '';
    this.testshowboxs = false;
    this.showDp = false;
    this.slotM = '';
    this.slotIdx = '';
    this.slotJidx = '';
  }

  ngOnInit() {
    this.activeTab = 'enroll';
    this.getAutoSelectDate();
    console.log("undefined currency", this.currency);
    if (this.currency == undefined || this.currency == null) {
      this.currency = {
        'invCurrencySign': '$'
      }
      console.log("undefined currency", this.currency);
    } else {
      if (this.currency.invCurrencySign == "") {
        console.log("has currency but sign null", this.currency);
        this.currency.invCurrencySign = '$';
      }
    }
    this.getRegionalInfo();
  }

  ngAfterViewInit() {
    this.staffList = [
      {
        'staff': [{}],
      }
    ]
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
    let tokenType = localStorage.getItem('tokenType')
    this.blockUI.start('Loading...');
    this._service.getRegionalAdministrator(this.regionId, token, tokenType)
      .subscribe((res: any) => {
        console.log("Operation Hours", res.operatingHour);
        this.calculateTime(res.operatingHour);
        this.calculateSlot(res.operatingHour.start);
        this.startTime = res.operatingHour.start;
        setTimeout(() => {
          this.blockUI.stop(); // Stop blocking
        }, 300);
      }, err => {
        this.blockUI.stop();
        console.log(err)
      })
  }

  calculateTime(time) {
    var sTime = time.start.hr + ':' + time.start.min + ' ' + time.start.meridiem;
    var eTime = time.end.hr + ':' + time.end.min + ' ' + time.end.meridiem;
    console.log(sTime, eTime)
    var timeStart: any;
    var timeEnd: any;

    timeStart = new Date("01/01/2007 " + sTime);
    console.log('timeStart', timeStart);
    timeEnd = new Date("01/01/2007 " + eTime);
    console.log('timeEnd', timeEnd);
    var diff = (timeEnd - timeStart) / 60000; //dividing by seconds and milliseconds
    console.log(diff)
    var diffMins = diff % 60;
    console.log("mins", diffMins);
    var diffHours = (diff - diffMins) / 60;
    console.log("hours", diffHours)

    if ((diffMins == 30 || diffMins < 30) && diffMins > 0) {
      diffHours = (diffHours * 2) + 1;
      console.log(diffHours)
    } else if (diffMins > 30 && diffMins < 60) {
      diffHours = (diffHours * 2) + 2;
      console.log(diffHours)
    } else if (diffMins == 0) {
      diffHours = diffHours * 2;
      console.log(diffHours)
    }

    // var hours= [];
    if (time.start.meridiem === 'PM') {
      var tempH = (time.start.hr + 12) * 60 + time.start.min;
    } else {
      if (time.start.hr == 12) {
        var tempH = 0 * 60 + time.start.min;
      } else {
        var tempH = time.start.hr * 60 + time.start.min;
        console.log("tempH", tempH)
      }
    }

    for (var i = 0; i <= diffHours; i++) {
      if (i > 0) {
        tempH = tempH + 30;
      } else {
        tempH = tempH;
      }
      var min = tempH % 60;
      var h = (tempH - min) / 60;

      console.log("min>", min)


      if (h > 12) {
        var hr = h - 12;
        if (hr == 12 && (i == diffHours)) {
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
        'start': {
          'hr': hr,
          'min': min,
          'meridiem': ampm
        }
      }
      console.log("hour", obj)
      this.operationTime.push(obj);
    }
    // let arrLength = this.operationTime.length;
    // console.log(arrLength);
    let lastIdx = this.operationTime.length - 1;
    console.log("lastIdx", this.operationTime[lastIdx].start);
    let last = this.operationTime[lastIdx].start;
    if (time.end.hr == last.hr && time.end.min == last.min && time.end.meridiem == last.meridiem) {
      console.log("Same");
      this.operationTime.pop();
    } else {
      console.log("not same")
    }
    console.log("opr Arr", this.operationTime)
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
    var min = start.min; // start time min 
    // var temp = [];
    // var tempnext = [];
    this.minArr = [];
    this.minNextArr = [];
    var next;
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
        var m = min + 15;
        if (m > 60) {
          min = m - 60;
          if (min == 60) {
            min = 0;
          }
        } else {
          min += 15
          if (min == 60) {
            min = 0;
          }
        }

      }
      this.minArr.push(min);
      this.minSlotArr.push(min);
    }
    console.log("temp", this.minArr);
    next = this.minArr[this.minArr.length - 1];
    console.log('next', next);

    for (var j = 0; j <= 1; j++) {
      // if (next == 45) {
      //   console.log("==59")
      //   next = 0;
      // } else {
      //   next += 15;
      // }
      m = next + 15;
      if (m > 60) {
        next = m - 60;
        if (next == 60) {
          next = 0;
        }
      } else {
        next += 15
        if (next == 60) {
          next = 0;
        }
      }
      this.minNextArr.push(next);
      this.minSlotArr.push(next);
    }
    console.log("temp next ===>", this.minNextArr);
  }



  getAutoSelectDate() {
    const todayDay = new Date().getDay();
    // this.selectedDay.push(todayDay);
    this.blockUI.start("Loading...");

    setTimeout(() => {
      this.selectedDay.push(todayDay);
      this.blockUI.stop();
    }, 300);

    // this.SelectedDate.push(this.days[todayDay].day); 
  }

  backtoSchedule() {
    // reset the initial values  
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
  }

  backtoTimetable() {
    this.scheduleList = false;
    this.isPlan = false;
    this.isCategory = false;
    this.courseCreate = false;
    this.showDp = false;
    this.courseplanLists = [];
  }

  // Selected Day //
  selectDay(data, event, day, type): void {
    if (type == "callTimetable") {
      setTimeout(() => {
        this.getschedulestaff('checkbox', this.staffList.staff.length, '0');
      }, 200)
    }
    var dayIdx = this.selectedDay.indexOf(data);

    if (event.target.checked) {
      if (dayIdx < 0)
        this.selectedDay.push(data);
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
    this.blockUI.start('Loading...');
    if (val.length > 0) {
      // this.blockUI.start('Loading...');
      this._service.getSearchCategory(this.regionId, val, this.locationID)
        .subscribe((res: any) => {
          console.log(res.length);
          console.log(this.categoryList.name)
          var element = <HTMLInputElement>document.getElementById("categoryList");
          console.log(element)
          if (element != null && this.selectedDay.length != 0) {
            element.disabled = true;
          }

          this.categoryList = res;
          this.blockUI.stop();
        }, err => {
          console.log(err);
          this.blockUI.stop();
        });
    }
    else if (val.length <= 0) {
      // this.blockUI.start('Loading...');
      this._service.getCategory(this.regionId, 20, 0)
        .subscribe((res: any) => {
          console.log(res);
          console.log(this.categoryList.name);
          this.categoryList = res;
          this.blockUI.stop();
        }, err => {
          console.log(err);
          this.blockUI.stop();
        });
    }
  }
  // Focus Search
  focusSearch(val, type) {
    this._service.getCategory(this.regionId, 20, 0)
      .subscribe((res: any) => {
        console.log(res);
        this.categoryList = res;
        console.log(val, 'OK');
      }, err => {
        console.log(err);
      });

    val.preventDefault();
    val.stopPropagation();
    this.isFousCategory = true;
  }
  //  Hide Search
  hideSearch() {
    setTimeout(() => {
      this.isFousCategory = false;
    }, 300);
  }
  selectDataApiCall(category) {
    this.selectedTeacher = {};
    console.log("selectDataApiCall works", category)
    this.selectData(category);
    this.getschedulestaff('button', '20', '0')
  }

  // single Select Data
  selectData(category) {
    var element = <HTMLInputElement>document.getElementById("categoryList");
    if (element != null && this.selectedDay.length != 0) {
      element.disabled = false;
    }

    console.log("selectData works", category)
    this.isSelected = true;
    this.selectedID = category._id;
    this.item.itemID = category.name;
    this.selectedCategory = category;
    this.selectedCat = false;
  }

  /// Fix Get Sechedule Staff API ///
  getschedulestaff(type, limit, skip) {
    var repeatDays;
    if (this.selectedDay.length == 0 || this.selectedDay.length < 0) {
      repeatDays = '0,1,2,3,4,5,6'
    } else {
      repeatDays = this.selectedDay.toString();
    }
    this.scheduleList = false;
    this._service.getscheduleStaffList(this.regionId, repeatDays, this.selectedID, limit, skip)
      .subscribe((res: any) => {
        this.result = res;
        this.staffList = res;
        console.log("this.selectedTeacher", this.selectedTeacher)
        console.log("this.staffList", this.staffList)
        if (this.staffList.staff.length > 0) {
          if (this.staffList.staff && type == 'checkbox') {
            this.selectedTeacher = this.tempSelectedTeacher
            if (this.tempSelectedTeacher == null) {
              this.selectedTeacher = this.staffList.staff[0];
            }
          } else {
            if (this.staffList.staff) {
              this.selectedTeacher = this.staffList.staff[0];
            }
          }
          console.log("Call staff timttable")
          if (JSON.stringify(this.selectedTeacher) != "{}") {
            this.getStaffTimetable(this.selectedTeacher.userId, repeatDays)
          }
        } else {
          console.log("no need to call staff timttable")
        }
      }, (err: any) => {
        // catch the error response from api   
        this.staffList = [];
      })
  }
  // for modal
  getViewAllStaff(type, skip, limit) {
    var repeatDays;
    if (this.selectedDay.length == 0 || this.selectedDay.length < 0) {
      repeatDays = '0,1,2,3,4,5,6'
    } else {
      repeatDays = this.selectedDay.toString();
    }
    this.scheduleList = false;
    this.blockUI.start('Loading')
    this._service.getscheduleStaffList(this.regionId, repeatDays, this.selectedID, limit, skip)
      .subscribe((res: any) => {
        setTimeout(() => {
          this.blockUI.stop();
        }, 300);
        this.result = res;
        if (type == 'search') {
          this.tempstafflist = res.staff;
        } else {
          this.tempstafflist = this.tempstafflist.concat(res.staff);
        }
        console.log("this.selectedTeacher", this.selectedTeacher)
        console.log("this.staffList", this.staffList)
      }, (err: any) => {
        // catch the error response from api   
        this.tempstafflist = [];
      })
  }

  getSearchscheulestaff(keyword, skip, limit) {
    var repeatDays;
    if (this.selectedDay.length == 0 || this.selectedDay.length < 0) {
      repeatDays = '0,1,2,3,4,5,6'
    } else {
      repeatDays = this.selectedDay.toString();
    }
    this.keyword = keyword;
    if (skip == '' && limit == '') {
      var isFirst = true;
      limit = 20;
      skip = 0;
    }
    if (keyword.length != 0) {
      this.isSearch = true;
      this._service.getscheduleSearchStaffList(this.regionId, repeatDays, this.selectedID, keyword, skip, limit)
        .subscribe((res: any) => {
          if (isFirst == true) {
            this.result = res;
            console.log('First Time Searching')
            this.tempstafflist = [];
            this.tempstafflist = res.staff;
          } else {
            console.log('Not First Time Searching');
            this.tempstafflist = res.staff;
            // this.tempstafflist = this.tempstafflist.concat(res.staff);
          }
        }, err => {
          console.log(err)
        })
    } else {
      this.tempstafflist = [];
      this.blockUI.start('Loading');
      setTimeout(() => {
        this.blockUI.stop();
        this.getViewAllStaff('search', skip, limit);
      }, 100);

      this.isSearch = false;
    }
  }

  staffLoadMore(skip: any) {
    if (this.isSearch == true && this.keyword.length != 0) {
      console.log("User Search");
      this.getSearchscheulestaff(this.keyword, skip, '20')
    } else {
      console.log("Not user search")
      this.getViewAllStaff('modal', skip, '20');
    }
  }

  openmodal(content) {
    this.modalReference = this.modalService.open(content, { backdrop: 'static', keyboard: false, windowClass: 'modal-xl modal-inv d-flex justify-content-center align-items-center' });
    this.getViewAllStaff('modal', '0', '20')
  }
  // fix get schedule staff api done ///

  getStaffTimetable(staffId, repeatDays) {
    this.blockUI.start('Loading...');
    this._service.getStaffSchedule(this.regionId, staffId, repeatDays, this.selectedID)
      .subscribe((res: any) => {
        setTimeout(() => {
          this.blockUI.stop();
        }, 100);
        console.log("staff timetable", res);
        setTimeout(() => {
          console.log($('.my-class').length);
          var mlen = $('.my-class').length;
          // for(){

          // }
        }, 300);
        this.finalLists = res;
        for (let i = 0; i < this.finalLists.length; i++) {
          this.monthArray.push(this.finalLists[i].date.month);
          this.noOfMonth = this.monthArray.filter((v, i, a) => a.indexOf(v) === i);
        }
        console.log(this.noOfMonth)
        for (let j = 0; j < this.noOfMonth.length; j++) {
          for (let k = 0; k < this.finalLists.length; k++) {
            if (this.noOfMonth[j] == this.finalLists[k].date.month) {
              this.finalLists[k]['multiply'] = j;
            }
          }
        }
        console.log("finalLists", this.finalLists)
      })
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

    }
  }

  activeTeachers(teacher) {
    this.selectedTeacher = teacher
    this.tempSelectedTeacher = teacher;
    this.selectedTeacher.userId = teacher.userId;
    if (this.staffList.staff.indexOf(this.selectedTeacher) > 4) {
      $('.teacher-list-wrapper').scrollLeft(150 * (this.staffList.staff.indexOf(this.selectedTeacher)));
    }
    else {
      $('.teacher-list-wrapper').scrollLeft(0);
    }
    console.log(this.selectedDay);
    if (this.selectedDay.length == 0) {
      this.getStaffTimetable(this.selectedTeacher.userId, '0,1,2,3,4,5,6');
    } else if (this.selectedDay.length > 0) {
      this.getStaffTimetable(this.selectedTeacher.userId, this.selectedDay.toString());
    }

  }
  activeTeachers1(teacher) {
    this.keyword = '';
    if (this.tempstafflist && this.staffList.staff.length < this.tempstafflist.length) {
      this.getschedulestaff('checkbox', this.tempstafflist.length, '0');
    }
    setTimeout(() => {
      this.selectedTeacher = teacher
      this.tempSelectedTeacher = teacher;
      this.selectedTeacher.userId = teacher.userId;
      if (this.tempstafflist) {
        $('.teacher-list-wrapper').scrollLeft(150 * (this.tempstafflist.indexOf(this.selectedTeacher)));
      } else {
        $('.teacher-list-wrapper').scrollLeft(0);
      }
      this.staff.staffId = '';
      this.tempstafflist = [];
      this.modalReference.close();
    }, 400)

  }

  addEnrollModal(modal, type, courseID, seat) {
    console.log("course-id-->", courseID)
    this.modalReference = this.modalService.open(modal, { backdrop: 'static', windowClass: 'modal-xl d-flex justify-content-center align-items-center' });
    this.courseId = courseID;
    this.selectedSeat = seat;
    this.lessonId = "5beb8c7d1f893164fff2c32b";
    this.getCourseDetail(this.courseId);
    this.onClickModalTab(type)
  }

  getCourseDetail(id) {
    this._service.getSingleCourse(id, this.locationID)
      .subscribe((res: any) => {
        this.detailLists = res;
        console.log(res)
        this.courseDetail = res;

      }, err => {
        console.log(err);
      });
  }

  onClickModalTab(type) {
    this.activeTab = type;
    if (type == 'enroll') {

    } else if (type == 'view') {
      this.getUserInCourse();
    }
    else {
      this.getUserInCourse();
    }
  }

  getUserInCourse() {
    //temp api for testing UI
    // this.blockUI.start('Loading...');
    this._service.getAssignUser(this.regionId, this.courseId, null, null, null)
      .subscribe((res: any) => {
        // this.blockUI.stop();
        console.log(res)
        this.studentLists = res.CUSTOMER;
      }, err => {
        console.log(err);
      });
  }

  focusMethod(e, userType) {
    // console.log(e)
    console.log(userType)
    this.isFous = true;
    this.userLists = [];
    // this.getAllUsers(userType);
  }

  hideFocus(e) {
    setTimeout(() => {
      this.isFous = false;
      this.showList = false;
    }, 300);
    this.formData = {}
  }

  changeMethod(searchWord, userType) {
    // let courseId = "5beb8c7d1f893164fff2c31d";
    userType = (userType == 'teacher') ? 'staff' : userType;
    console.log(userType)
    if (searchWord.length != 0) {
      this.showList = true;
      this._service.getSearchUser(this.regionId, searchWord, userType, 20, 0, this.courseId)
        .subscribe((res: any) => {
          console.log(res);
          this.userLists = res;
        }, err => {
          console.log(err);
        });
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
    this.blockUI.start('Loading...');
    console.log("this.selectedCustomer", this.selectedCustomer)
    this._service.editProfile(this.regionId, ID)
      .subscribe((res: any) => {
        this.blockUI.stop();
        console.log('selected Customer', res);
        this.selectedCustomer = res;
        this.custDetail.user = res;
        console.log(this.custDetail)
        this.stdLists = this.selectedCustomer.userId;
        console.log(this.stdLists)
        this.showList = false;
      })
  }

  closeDropdown(event, type) {
    console.log('close dropdown', event)
    if (type == 'search') {
      var parentWrap = event.path.filter(function (res) {
        return res.className == "search-wrap"
      })
      if (parentWrap.length == 0) {
        this.showList = false;
      }
    }
  }

  addCustomer(courseId, userType) {
    this.stdLists = [];
    console.log("call from addCustomer", this.selectedCustomer);
    let body = {
      'courseId': courseId,
      'userId': this.selectedCustomer.userId,
      'userType': userType
    }
    console.log("body", body);
    this.blockUI.start('Loading...');
    this._service.assignUser(this.regionId, body, this.locationID)
      .subscribe((res: any) => {
        this.blockUI.stop();

        console.log("res Assign customer", res);
        if (res.invoiceSettings == {} || res.invoiceSettings == undefined) {
          console.log("no invoice setting");
          this.invoiceInfo = {
            'address': "",
            'city': "",
            'companyName': "",
            'email': "",
            'prefix': "",
            'registration': ""
          }
        } else {
          console.log("has invoice setting");
          this.invoiceInfo = res.invoiceSettings;
        }
        // this.courseInfo = this.courseDetail;
        // Object.assign(this.courseInfo , res)
        this.invoice = res.invoice;
        this.showInvoice = true;
        Object.assign(this.detailLists, res)
        this.showOneInvoice(this.invoice);
      }, err => {
        console.log(err);
      })
    // this.showInvoice = true;

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
      this.invoice[i].subtotal = Number(Number(this.invoice[i].subtotal).toFixed(2));
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

      this.invoiceCourse["fees"] = invoice[i].courseFee.fee;
      if (invoice[i].courseId == this.courseDetail._id) {
        this.invoiceCourse["name"] = this.courseDetail.name;
        this.invoiceCourse["startDate"] = this.courseDetail.startDate;
        this.invoiceCourse["endDate"] = this.courseDetail.endDate;
        this.invoiceCourse["lessonCount"] = this.courseDetail.lessonCount;
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
    if ((this.hideReg == true && this.hideDeposit == true && this.hideMisc == true) || this.hideReg == true || this.hideDeposit == true || this.hideMisc == true) {
      this.isEditInv = true;
    } else {
      this.isEditInv = false;
    }
    console.log("hide popup")
    // this.showBox = false;
    if (type == 'courseFee') {
      this.feesBox = false;
      this.value.courseFee = '';
    }
  }

  updateCfee(data) {
    console.log("updateCfee", data);
    this.feesBox = false;
    for (var i in this.invoice) {
      if (this.invoice[i].courseFee.fee != data) {
        console.log("===not same");
        this.updateInvData["courseFee"] = data
        // this.updateInvData["courseFee"] = {
        //   'fee': Number(data)
        // };
        this.invoice[i].courseFee.fee = Number(data);
        console.log(this.invoice[i].courseFee.fee)
        // formula for calculating the inclusive tax
        // Product price x RATE OF TAX/ (100+RATE OF TAX);
        if (this.invoice[i].courseFee.taxInclusive == true) {
          var taxRate = this.invoice[i].tax.rate;
          var taxAmount = (this.invoice[i].courseFee.fee * taxRate / (100 + taxRate)).toFixed(2);
          this.invoice[i].courseFee.tax = Number(taxAmount);
          console.log("inclusiveTax for CFee", this.invoice[i].courseFee.tax);
          var cFee = (this.invoice[i].courseFee.fee - this.invoice[i].courseFee.tax).toFixed(2);
          this.invoice[i].courseFee.fee = Number(cFee);
          this.invoice[i].courseFee.amount = (this.invoice[i].courseFee.fee + this.invoice[i].courseFee.tax).toFixed(2);
          console.log("CFee without inclusive tax", this.invoice[i].courseFee.fee);
          console.log("Amount without inclusive tax", this.invoice[i].courseFee.amount);
        } else if (this.invoice[i].courseFee.taxInclusive == false) {
          var taxRate = this.invoice[i].tax.rate;
          var taxAmount = (this.invoice[i].courseFee.fee * taxRate / 100).toFixed(2);
          this.invoice[i].courseFee.tax = Number(taxAmount);
          console.log("inclusiveTax for CFee", this.invoice[i].courseFee.tax);
          this.invoice[i].courseFee.amount = this.invoice[i].courseFee.fee + this.invoice[i].courseFee.tax;
          console.log("CFee with exclusive tax", this.invoice[i].courseFee.fee);
          console.log("Fee amount with exclusive tax", this.invoice[i].courseFee.amount);
        }

        this.calculateHideFees('cFees')
      } else {
        console.log("===same");
      }
    }
    // this.discount = data;
    // this.showBox = false;
  }

  hideInvoiceRow(type) {
    this.isEditInv = true;
    if (type == 'reg') {
      this.hideReg = true;
      this.updateInvData["registrationFee"] = null;
      // this.updateInvData["registrationFee"] = {
      //   'fee': null
      // };
      this.calculateHideFees(type);
    } else if (type == 'deposit') {
      this.hideDeposit = true;
      this.updateInvData["deposit"] = null;
      this.calculateHideFees(type);
    } else if (type == 'misc') {
      this.hideMisc = true;
      this.updateInvData["miscFee"] = null;
      // this.updateInvData["miscFee"] = {
      //   'fee': null
      // };
      this.calculateHideFees(type);
    }
  }

  calculateHideFees(type) {
    console.log("calculateHideFees");
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
      console.log("Total taxes and deposit", totalTaxes, deposit)
      this.invoice[i].subtotal = (regFees + miscFees + deposit + this.invoice[i].courseFee.fee).toFixed(2);
      this.total = Number((Number(this.invoice[i].subtotal) + totalTaxes).toFixed(2));
      // this.invoice[i].total = Number(totalPrice).toFixed(2);
      // this.total = Number(this.invoice[i].total).toFixed(2);
      console.log("Subtotal", this.invoice[i].subtotal);
      console.log("Total", this.total);
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
    console.log("Inv Update Data", this.updateInvData);
    this._service.updateInvoiceInfo(this.invoiceID, this.updateInvData)
      .subscribe((res: any) => {
        this.blockUI.stop();
        console.log(res);
        this.isEditInv = false;
        //for updating invoice ui
        this.singleInv = [];
        this.singleInv.push(res);
        this.invoice = this.singleInv;
        console.log("invoice", this.invoice);
        this.showOneInvoice(this.invoice);
      }, err => {
        console.log(err);
      })
  }

  sendInvoice() {
    // this.showStudentOption = '';
    // this.xxxhello = '';
    console.log("send Invoice", this.invoiceID);
    var mailArr = [];
    mailArr.push(this.selectedCustomer.email);
    for (var i in this.selectedCustomer.guardianEmail) {
      mailArr.push(this.selectedCustomer.guardianEmail[i]);
    }
    console.log("mailArr", mailArr);
    let body = {
      "associatedMails": mailArr
    }
    console.log("body", body);
    this._service.invoiceOption(this.regionId, this.invoiceID, body, 'send')
      .subscribe((res: any) => {
        console.log(res);
        this.toastr.success("Successfully sent the Invoice.");
        this.cancelModal('enrollModal');
      }, err => {
        console.log(err);
        this.toastr.error('Fail to sent the Invoice.');
      })
  }

  showPayOption() {
    console.log("pay option");
    this.showPayment = true;
    this.showInvoice = false;
    if (this.invStatus == 'PAID[PARTIAL]') {
      var totalPaid = 0;
      for (var i in this.invPayment) {
        console.log("each payment", this.invPayment[i]);
        totalPaid = totalPaid + this.invPayment[i].amount;
      }
      console.log("total paid", totalPaid);
      this.paymentItem.amount = Number((this.total - totalPaid).toFixed(2));
      console.log("Total Amount for Pay", this.paymentItem.amount)
    } else {
      this.paymentItem.amount = this.total;
    }

    this._service.getPaymentMethod()
      .subscribe((res: any) => {
        console.log(res);
        this.paymentProviders = res;
        this.selectedPayment = this.paymentProviders[0].name;
        this.paymentId = this.paymentProviders[0].id;
      })
  }

  choosePayment(type) {
    console.log("choosePayment", type);
    this.selectedPayment = type.name;
    this.paymentId = type.id;
  }

  payNow(type) {
    // this.showStudentOption = '';
    // this.xxxhello = '';
    console.log("Pay Now", this.paymentItem, this.paymentId);
    let body = {
      'regionId': this.regionId,
      'refInvoiceId': this.refInvID,
      'amount': this.paymentItem.amount.toString(),
      'paymentMethod': this.paymentId.toString()
    }
    if (this.paymentItem.refNumber) {
      body["refNo"] = this.paymentItem.refNumber;
    }
    // console.log("data",body);
    this._service.makePayment(this.regionId, body)
      .subscribe((res: any) => {
        console.log(res);
        this.toastr.success(res.message);
        this.cancelModal('enrollModal');
      }, err => {
        if (err.message == "Amount is overpaid.") {
          this.toastr.success("Amount is overpaid.")
        }
        this.toastr.error("Payment Fail");
      })
  }

  backToInvoice() {
    console.log("Back To Invoice")
    this.showPayment = false;
    this.showInvoice = true;
    this.paymentItem = {};
  }
  showDp: boolean = false;
  scheduleObj = {};
  getSlotNumber(hr, min, ampm, e, i, j, date) {
    // if(this.startTime.min>min && this.startTime.hr > hr ){
    //   var h = hr+1
    //   console.log("add 1~~~>")
    // }else{
    //   var h = hr
    //   console.log("original~~~>")
    // }
    // this.slotHr = h + ':' + min + ' ' + ampm;
    // this.clickSlot(hr, min, ampm);

    // if (this.startTime.min > 0 && min == 0) {
    //   var h = hr + 1;
    //   console.log("ttt", h, ':', min, ':', ampm);
    // } else {
    //   var h = hr;
    //   console.log("original", h, ':', min, ':', ampm);
    // }

    console.log("minSlot", this.minSlotArr);

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
    var cIdx = this.minSlotArr.indexOf(min);
    console.log('cIdx', cIdx);
    var pIdx = cIdx - 1;
    if ((cIdx == 1 || cIdx == 3) && (this.minSlotArr[cIdx] >= 0 && this.minSlotArr[cIdx] <= 15) && this.minSlotArr[pIdx] > this.minSlotArr[cIdx]) {
      var h = hr + 1;
      if (h > 12) {
        h = h - 12;
      }
      console.log("add 1", h)
    } else {
      var h = hr;
      console.log("original", h)
    }

    // var h = hr;
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

    this.xPosition = $(event.target).offset().left - 150 + $(event.target).width() / 2;
    this.yPosition = $(event.target).offset().top + $(event.target).height() + 10;
    this.arrTop = $(event.target).offset().top + $(event.target).height() - 10;
    this.arrLeft = this.xPosition + 140;
    if ($(document).height() - this.yPosition < 180) {
      this.yPosition = $(event.target).offset().top - 170;
      this.arrTop = this.yPosition + 160;
      this.arrClasses = {
        'arr-box': true,
        'arr-down': true
      }
    } else {
      this.arrClasses = {
        'arr-box': true,
        'arr-up': true
      }
    }
    if ($(document).width() - this.xPosition < 300) {
      this.xPosition = 0;
      this.styleArr = {
        'top': this.yPosition + "px",
        'right': '0px'
      }
    }
    else if (this.xPosition < 0) {
      this.xPosition = 0;
      this.styleArr = {
        'top': this.yPosition + "px",
        'left': '0px'
      }
    }
    else {
      this.styleArr = {
        'top': this.yPosition + "px",
        'left': this.xPosition + "px"
      }
    }
    console.log("selected", this.selectedTeacher);
    console.log('selectdate', date);
    console.log('selectedDay', this.selectedDay);
    // this.scheduleObj["date"] = date;
    // this.scheduleObj["repeatDay"] = 
    var sDate = {
      "year": date.year,
      "month": date.month,
      "day": date.day
    };
    var time = {
      "hr": h,
      "min": this.slotM,
      "meridiem": this.slotAMPM
    };
    this.scheduleObj["repeatDays"] = this.selectedDay;
    this.scheduleObj["date"] = sDate;
    this.scheduleObj["teacher"] = this.selectedTeacher;
    this.scheduleObj["time"] = time;
    console.log('scheduleObj', this.scheduleObj);
  }

  // clickSlot(hr, min, ampm){
  //   var oprTime = this.startTime.hr;
  //   var m;

  // }

  onClickCreate() {
    this.courseCreate = true;
    this.courseplanLists = [];
    this.getAllCoursePlan('0', '20');
  }
  // onClickCreate() {
  //   this.courseCreate = true;
  //   this.getCoursePlan(0, 'createCourse');
  // }

  createPlan() {
    console.log("course Plan");
    this.isCategory = true;
    this.goBackCat = false;
    // this.isPlan = true;
    this.courseCreate = false;
    var category = {
      'categoryId': this.selectedCategory._id,
      'name': this.selectedCategory.name
    }
    localStorage.setItem("cpCategory", JSON.stringify(category));
  }
  selectPlan(plan) {
    this.courseplanLists = []
    console.log("plan", plan);
    console.log(this.selectedID);
    let planObj = {
      "name": plan.name,
      "id": plan._id,
      "duration": plan.lesson.duration,
      "paymentPolicy": plan.paymentPolicy,
      "from": 'schedule'
    };
    this.goBackCat = false;
    this.isCourseCreate = true;
    localStorage.setItem('cPlan', JSON.stringify(planObj));
    localStorage.setItem('scheduleObj', JSON.stringify(this.scheduleObj))
    // console.log("scheduleObj",this.scheduleObj);
  }

  cancelClassFun(lessonId) {
    let data = {
      "lessonId": lessonId
    }
    console.log(lessonId)
    // console.log(this.isGlobal)
    // Call cancel class api service
    // this.blockUI.start('Loading...');
    // this.isGlobal
    this._service.cancelUsersFromClass(this.courseId, data, this.isGlobal)
      .subscribe((res: any) => {
        // Success function
        // this.blockUI.stop();
        // this.cancelUI=false;
        // this.cancelUi=false;
        console.info("cancle user from class api calling is done");
        console.log(res)
        this.isGlobal = false;
        // this.disableCancel = true;
        this.getCourseDetail(this.courseId);
        // Close Dialog box
        // Show the canceled users
      }, err => {
        // Error function  
        this.isGlobal = false;
        console.error('cancle user from class has got error', err);
        // Do something
      })
    this.modalReference.close();
    // this.cancelUItext= false;
  }

  courseInfo = {};
  onClickCourse(course, lesson, e, date) {
    this.showInvoice = false;
    this.showPayment = false;
    this.selectedCustomer = {};
    console.log(e);
    console.log(course)
    console.log(lesson)
    e.preventDefault();
    e.stopPropagation();
    console.log("date", date)
    this.lessonD = date
    console.log(course.seat)
    console.log($(event.target).parents())
    if ($(event.target).parents(".options-box").length > 0 || $(event.target).hasClass("options-box")) {
      console.log("fffffffffff")
    } else {


      if (course.seat != {}) {
        console.log("dfdfdfdfdfdfdf")
        this.popUpHeight = 260;
      } else {
        this.popUpHeight = 250;
      }
      if ($(event.target).parents(".lesson-slot").length > 0) {
        this.yPosition = $(event.target).parents(".lesson-slot").offset().top + $(event.target).parents(".lesson-slot").height() + 20;
      }
      else {
        this.yPosition = $(event.target).offset().top + $(event.target).height() + 20;
      }

      this.arrTop = this.yPosition - 20;
      this.xPosition = e.x - 40;
      this.arrLeft = e.x - 10;

      if ($(document).height() - this.yPosition < this.popUpHeight) {
        console.log("I found u")
        this.yPosition = this.yPosition - this.popUpHeight - 40 - 20;
        this.arrTop = this.yPosition + this.popUpHeight;
        this.arrClasses = {
          'arr-down': true
        }
      } else {
        this.arrClasses = {
          'arr-up': true
        }
      }

      if ($(document).width() - this.xPosition < 420) {
        this.xPosition = 0;
        this.styleArr = {
          'top': this.yPosition + "px",
          'right': '0px'
        }
      } else {
        this.styleArr = {
          'top': this.yPosition + "px",
          'left': this.xPosition + 'px'
        }
      }
    }
    this.testshowboxs = true;
    this.testshowbox = course.course.courseId;
    this.courseInfo["course"] = course.course;
    this.courseInfo["lesson"] = lesson;

    console.log(this.courseInfo)
    console.log(course);
    console.log(lesson)
  }



  //  Test Course Plan List Api
  showMore(skip: any) {
    if (this.isSearch == true) {
      console.log("User Search");
      this.getSearchCoursePlan(this.keyword, skip, 20)
    } else {
      console.log("Not user search")
      this.getAllCoursePlan(skip, 20);
    }

  }
  getAllCoursePlan(skip, limit) {
    this.blockUI.start('Loading');
    this._service.getAllCourseplan(this.regionId, this.locationID, this.selectedID, skip, limit)
      .subscribe((res: any) => {
        console.log('Course Plan List', res)
        this.result = res;
        //  this.courseplanLists = [];
        this.courseplanLists = this.courseplanLists.concat(res);
        setTimeout(() => {
          this.blockUI.stop()
        }, 300);
      }, err => {
        this.blockUI.stop();
        console.log(err)
      })
  }

  getSearchCoursePlan(searchWord, skip, limit) {
    this.keyword = searchWord;
    if (skip == '' && limit == '') {
      var isFirst = true;
      limit = 20;
      skip = 0;
    }
    if (searchWord.length != 0) {
      this.isSearch = true;
      this._service.getSearchCoursePlan(this.regionId, this.locationID, this.selectedID, skip, limit, searchWord)
        .subscribe((res: any) => {
          this.result = res;
          if (isFirst == true) {
            console.log('First Time Searching')
            this.courseplanLists = [];
            this.courseplanLists = res;
          } else {
            console.log('Not First Time Searching');
            this.courseplanLists = this.courseplanLists.concat(res);
          }
        }, err => {
          console.log(err)
        })
    } else {
      setTimeout(() => {
        this.courseplanLists = [];
        this.getAllCoursePlan(skip, limit);
        this.isSearch = false;
      }, 300);
    }
  }


}