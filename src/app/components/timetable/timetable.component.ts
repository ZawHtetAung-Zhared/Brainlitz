import { Router } from '@angular/router';
import {
  Component,
  OnInit,
  ViewChildren,
  QueryList,
  ViewContainerRef,
  HostListener
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { FlexiComponent } from '../flexi/flexi.component';
import { appService } from '../../service/app.service';
import { DataService } from '../../service/data.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {
  //zha variable
  public stafflist: any;
  public timetablelist: any;
  //zha variable

  //apo variable
  public showPopUp = false;
  public modalReference: any;
  public testCategory = 'all';
  isnewcourseplan = false;
  //apo variable

  //copy from schedule variable
  @BlockUI() blockUI: NgBlockUI;
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
  //public modalReference: any;
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
    });

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
    //zha ngOnInit
    this.getStaffListperWeek();
    //zha ngOnInit

    //copy from schedule
    localStorage.removeItem('scheduleObj');
    this.activeTab = 'enroll';
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
    //this.getRegionalInfo();
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
            // this.getStaffTimetable(
            //   this.selectedTeacher.userId,
            //   '0,1,2,3,4,5,6'
            // );
          } else if (this.selectedDay.length > 0) {
            // this.getStaffTimetable(
            //   this.selectedTeacher.userId,
            //   this.selectedDay.toString()
            // );
          }
          setTimeout(() => {
            this.overFlowWidth(this.selectedIndex, 'modalteacher');
          }, 30);
        }
      });
    }, 300);
    //copy from schedule
  }

  //zha function
  getStaffListperWeek() {
    this._service.getStaffList().subscribe(
      (res: any) => {
        this.stafflist = res.staffList;
        console.log('SL', this.stafflist);
        this.getTimetables(this.stafflist.toString());
      },
      err => {
        console.log(err);
      }
    );
  }
  getTimetables(list) {
    this._service.getTimetableList(list).subscribe(
      (res: any) => {
        this.timetablelist = res.data;
        console.log('timetable list', this.timetablelist);
      },
      err => {
        console.log(err);
      }
    );
  }

  //zha function

  ngAfterViewInit() {
    this.staffList = [
      {
        staff: [{}]
      }
    ];
  }

  public startTime;
  // getRegionalInfo() {
  //   let token = localStorage.getItem('token');
  //   let tokenType = localStorage.getItem('tokenType');
  //   //this.blockUI.start('Loading...');
  //   this._service
  //     .getRegionalAdministrator(this.regionId, token, tokenType)
  //     .subscribe(
  //       (res: any) => {
  //         console.log('Operation Hours', res.operatingHour);
  //         this.startTime = res.operatingHour.start;
  //         setTimeout(() => {
  //           //this.blockUI.stop(); // Stop blocking
  //         }, 300);
  //       },
  //       err => {
  //         //this.blockUI.stop();
  //         console.log(err);
  //       }
  //     );
  // }

  // calculateTime(time) {
  //   console.log(time);

  //   var sTime =
  //     time.start.hr + ':' + time.start.min + ' ' + time.start.meridiem;
  //   var eTime = time.end.hr + ':' + time.end.min + ' ' + time.end.meridiem;
  //   console.log(sTime, eTime);
  //   var timeStart: any;
  //   var timeEnd: any;

  //   timeStart = new Date('01/01/2007 ' + sTime);
  //   console.log('timeStart', timeStart);
  //   timeEnd = new Date('01/01/2007 ' + eTime);
  //   console.log('timeEnd', timeEnd);
  //   var diff = (timeEnd - timeStart) / 60000; //dividing by seconds and milliseconds
  //   console.log(diff);
  //   var diffMins = diff % 60;
  //   console.log('mins', diffMins);
  //   var diffHours = (diff - diffMins) / 60;
  //   console.log('hours', diffHours);

  //   console.log(time.start.min);
  //   if (time.start.min != 0) {
  //     diffHours = diffHours + 1;
  //   } else {
  //     diffHours = diffHours;
  //   }

  //   if (time.start.meridiem === 'PM') {
  //     var tempH = (time.start.hr + 12) * 60 + time.start.min;
  //   } else {
  //     if (time.start.hr == 12) {
  //       var tempH = 0 * 60 + time.start.min;
  //     } else {
  //       var tempH = time.start.hr * 60 + time.start.min;
  //       console.log('tempH', tempH);
  //     }
  //   }

  //   for (var i = 0; i <= diffHours; i++) {
  //     if (i > 0) {
  //       tempH = tempH + 60; //if u want to different "30" minus,  tempH = tempH + 30
  //     } else {
  //       tempH = tempH;
  //     }
  //     var min = tempH % 60;
  //     var h = (tempH - min) / 60;

  //     console.log('min>', min);

  //     if (h > 12) {
  //       var hr = h - 12;
  //       if (hr == 12 && i == diffHours) {
  //         var ampm = 'AM';
  //       } else {
  //         var ampm = 'PM';
  //       }
  //       // console.log(">12",hr)
  //     } else if (h < 12) {
  //       var hr = h;
  //       // console.log("<12",hr)
  //       var ampm = 'AM';
  //     } else if (h == 12) {
  //       var hr = h;
  //       // console.log("==12",hr)
  //       var ampm = 'PM';
  //     }
  //     if (hr == 0) {
  //       hr = 12;
  //     }

  //     var obj = {
  //       start: {
  //         hr: hr,
  //         min: min,
  //         meridiem: ampm
  //       }
  //     };
  //     console.log('hour', obj);
  //     this.operationTime.push(obj);
  //   }
  //   // let arrLength = this.operationTime.length;
  //   // console.log(arrLength);
  //   let lastIdx = this.operationTime.length - 1;
  //   console.log('lastIdx', this.operationTime[lastIdx].start);
  //   let last = this.operationTime[lastIdx].start;
  //   if (
  //     time.end.hr == last.hr &&
  //     time.end.min == last.min &&
  //     time.end.meridiem == last.meridiem
  //   ) {
  //     console.log('Same');
  //     this.operationTime.pop();
  //   } else {
  //     console.log('not same');
  //   }
  //   console.log('opr Arr', this.operationTime);
  // }

  minSlotArr = [];
  // calculateSlot(start) {
  //   console.log(start);

  //   var min = start.min; // start time min
  //   // var temp = [];
  //   // var tempnext = [];
  //   this.minArr = [];
  //   this.minNextArr = [];
  //   var next;
  //   //if u want to calculate two division in one hour
  //   for (var i = 0; i <= 1; i++) {
  //     // min += 1;
  //     // if(min == 60){
  //     //   min = 0;
  //     // }
  //     if (i == 0) {
  //       min += 0;
  //     } else {
  //       // // min += 15;
  //       // if (min == 45) {
  //       //   console.log("==59")
  //       //   min = 0;
  //       // } else {
  //       //   min += 15;
  //       // }
  //       var m = min + 30; //if u want to different "30" minus,  min + 15
  //       if (m > 60) {
  //         min = m - 60;
  //         if (min == 60) {
  //           min = 0;
  //         }
  //       } else {
  //         min += 30; //if u want to different "30" minus,   min += 15;
  //         if (min == 60) {
  //           min = 0;
  //         }
  //       }
  //     }
  //     console.log(min);

  //     this.minArr.push(min);
  //     this.minSlotArr.push(min);
  //     this.minNextArr.push(min);
  //   }
  //   console.log('temp', this.minArr);

  //   console.log(this.minSlotArr);

  //   console.log('temp next ===>', this.minNextArr);
  // }

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
    this.showDp = false;
    this.selectedTeacher = {};
    // setTimeout(() => {
    //   this.updateScrollbar('v-wrapper');
    // }, 600);
  }

  backtoTimetable() {
    // $('body').css('overflow', 'hidden');
    // $('.disabledScroll').css('overflow', 'hidden');
    this.scheduleList = false;
    this.isPlan = false;
    this.isCategory = false;
    this.courseCreate = false;
    this.showDp = false;
    this.courseplanLists = [];
    this.showTimetable = true;
    this.addNewCoursePlan = false;
    // setTimeout(() => {
    //   this.updateScrollbar('v-wrapper');
    // }, 600);
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
    //this.overlap = false;
  }
  //  Hide Search
  hideSearch() {
    setTimeout(() => {
      this.isFousCategory = false;
    }, 300);
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
  // getViewAllStaff(type, skip, limit) {
  //   var repeatDays;
  //   if (this.selectedDay.length == 0 || this.selectedDay.length < 0) {
  //     repeatDays = '0,1,2,3,4,5,6';
  //   } else {
  //     repeatDays = this.selectedDay.toString();
  //   }
  //   this.scheduleList = false;
  //   //this.blockUI.start('Loading');
  //   console.log(this.selectedID);
  //   this._service
  //     .getscheduleStaffList(
  //       this.regionId,
  //       repeatDays,
  //       this.selectedID,
  //       limit,
  //       skip
  //     )
  //     .subscribe(
  //       (res: any) => {
  //         setTimeout(() => {
  //           //this.blockUI.stop();
  //         }, 300);
  //         this.result = res;
  //         if (type == 'search') {
  //           this.tempstafflist = res.staff;
  //         } else {
  //           this.tempstafflist = this.tempstafflist.concat(res.staff);
  //         }
  //         console.log('this.selectedTeacher', this.selectedTeacher);
  //         console.log('this.staffList', this.staffList);
  //       },
  //       (err: any) => {
  //         // catch the error response from api
  //         this.tempstafflist = [];
  //       }
  //     );
  // }

  // getSearchscheulestaff(keyword, skip, limit) {
  //   var repeatDays;
  //   if (this.selectedDay.length == 0 || this.selectedDay.length < 0) {
  //     repeatDays = '0,1,2,3,4,5,6';
  //   } else {
  //     repeatDays = this.selectedDay.toString();
  //   }
  //   this.keyword = keyword;
  //   if (skip == '' && limit == '') {
  //     var isFirst = true;
  //     limit = 20;
  //     skip = 0;
  //   }
  //   console.log(keyword);
  //   if (keyword.length != 0) {
  //     this.isSearch = true;
  //     this._service
  //       .getscheduleSearchStaffList(
  //         this.regionId,
  //         repeatDays,
  //         this.selectedID,
  //         keyword,
  //         skip,
  //         limit
  //       )
  //       .subscribe(
  //         (res: any) => {
  //           this.result = res;
  //           if (isFirst == true) {
  //             this.result = res;
  //             console.log('First Time Searching');
  //             this.tempstafflist = [];
  //             res.staff.map(staff => {
  //               staff.search = true;
  //             });
  //             // for adding option to the stafff list  end
  //             this.tempstafflist = res.staff;
  //             // this.tempstafflist = res.staff;
  //           } else {
  //             console.log('Not First Time Searching');
  //             // this.tempstafflist = res.staff;
  //             // for adding option to the stafff list
  //             res.staff.map(staff => {
  //               staff.search = true;
  //             });
  //             // for adding option to the stafff list  end
  //             // this.tempstafflist = res.staff;
  //             this.tempstafflist = this.tempstafflist.concat(res.staff);
  //           }
  //         },
  //         err => {
  //           console.log(err);
  //         }
  //       );
  //   } else {
  //     this.tempstafflist = [];
  //     //this.blockUI.start('Loading');
  //     setTimeout(() => {
  //       //this.blockUI.stop();
  //       this.getViewAllStaff('search', skip, limit);
  //     }, 100);

  //     this.isSearch = false;
  //   }
  // }

  // staffLoadMore(skip: any) {
  //   if (this.isSearch == true && this.keyword.length != 0) {
  //     console.log('User Search');
  //     this.getSearchscheulestaff(this.keyword, skip, '20');
  //   } else {
  //     console.log('Not user search');
  //     this.getViewAllStaff('modal', skip, '20');
  //   }
  // }

  // openmodal(content) {
  //   this.modalReference = this.modalService.open(content, {
  //     backdrop: 'static',
  //     keyboard: false,
  //     windowClass:
  //       'modal-xl modal-inv d-flex justify-content-center align-items-center'
  //   });
  //   //this.getViewAllStaff('modal', '0', '20');
  // }
  // fix get schedule staff api done ///

  // getStaffTimetable(staffId, repeatDays) {
  //   console.log('ok');
  //   //this.blockUI.start('Loading...');
  //   let data;
  //   if (this.isTeacherAll) {
  //     data = 'all';
  //   } else {
  //     data = staffId;
  //   }
  //   this._service
  //     .getStaffSchedule(this.regionId, data, repeatDays, this.selectedID)
  //     .subscribe((res: any) => {
  //       setTimeout(() => {
  //         //this.blockUI.stop();
  //       }, 100);

  //       console.log('staff timetable', res);
  //       setTimeout(() => {
  //         console.log($('.my-class').length);
  //         var mlen = $('.my-class').length;
  //       }, 300);
  //       this.finalLists = res;

  //       for (let i = 0; i < this.finalLists.length; i++) {
  //         this.monthArray.push(this.finalLists[i].date.month);
  //         this.noOfMonth = this.monthArray.filter(
  //           (v, i, a) => a.indexOf(v) === i
  //         );
  //       }
  //       console.log(this.noOfMonth);
  //       for (let j = 0; j < this.noOfMonth.length; j++) {
  //         for (let k = 0; k < this.finalLists.length; k++) {
  //           if (this.noOfMonth[j] == this.finalLists[k].date.month) {
  //             this.finalLists[k]['multiply'] = j;
  //           }
  //         }
  //       }
  //       console.error('finalLists', this.finalLists);
  //     });
  // }

  cancelModal(type) {
    //this.modalReference.close();
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

  // getCourseDetail(id, modal, type) {
  //   console.log(this.isTeacherAll);
  //   this.selectedTeacher_modal = this.tempTeacher;
  //   this._service.getSingleCourse(id, this.locationID).subscribe(
  //     (res: any) => {
  //       this.detailLists = res;
  //       this.courseDetail = res;
  //       if (type != '') this.onClickModalTab(type);
  //       console.log(
  //         '>>>>>>>>>>>>>>>>>>>\n>>>>>>>>>>>>>>>>\n>>>>>>>>>>>>>>>>',
  //         this.courseDetail
  //       );
  //       console.error(this.tempTeacher, 'temp selected teacher');
  //       if (this.isTeacherAll) {
  //         this.selectedTeacher_modal = this.tempTeacher;
  //         console.log(this.selectedTeacher_modal);
  //       }

  //       console.log(res);
  //       // if(modal !=  null){
  //       //   this.modalReference = this.modalService.open(modal, {
  //       //     backdrop: 'static',
  //       //     windowClass: 'modal-xl d-flex justify-content-center align-items-center'
  //       //   });
  //       // }
  //     },
  //     err => {
  //       console.log(err);
  //     }
  //   );
  // }

  // onClickModalTab(type, full?) {
  //   console.log(full);
  //   console.log(type);
  //   console.log(this.courseDetail);
  //   console.log(this.selectedLesson);

  //   // this.activeTab = type;
  //   if (type == 'enroll') {
  //     this.activeTab = type;
  //     return new Promise((resolve, reject) => {
  //       this.getUserInCourse();
  //       resolve();
  //     }).then(() => {
  //       setTimeout(() => {
  //         console.log(this.detailLists);
  //         if (this.detailLists && this.detailLists.type == 'REGULAR') {
  //           this.studentLists.map(customer => {
  //             this.stdArr.push(customer.userId);
  //           });
  //         }
  //       }, 1000);
  //     });
  //   } else if (type == 'view') {
  //     this.activeTab = type;
  //     this.getUserInCourse();
  //   } else if (type == 'relief') {
  //     console.log(type, this.courseDetail, this.selectedLesson);
  //     setTimeout(() => {
  //       this.searchSelectedLesson(type);
  //       this.activeTab = type;
  //     }, 500);
  //   } else if ((type = 'cancel')) {
  //     this.activeTab = 'cancel';
  //     this.getUserInCourse();
  //     console.log('exit cancel');
  //     setTimeout(() => {
  //       this.searchSelectedLesson(type);
  //     }, 500);
  //   } else {
  //     this.getUserInCourse();
  //     this.activeTab = type;
  //   }
  // }

  // searchSelectedLesson(type) {
  //   console.log(this.courseDetail.lessons);
  //   if (this.courseDetail.lessons != undefined) {
  //     this.courseDetail.lessons.map(lesson => {
  //       console.log(lesson.startDate);
  //       var lessondate = lesson.startDate.split('T')[0];
  //       console.log(lessondate);
  //       var m =
  //         this.lessonD.month < 10
  //           ? '0' + this.lessonD.month
  //           : this.lessonD.month;
  //       var d =
  //         this.lessonD.day < 10 ? '0' + this.lessonD.day : this.lessonD.day;
  //       var tempDate = this.lessonD.year + '-' + m + '-' + d;
  //       console.log('tempDate', tempDate);
  //       if (lessondate == tempDate) {
  //         this.selectedLesson = lesson;
  //         console.log('selected lesson', this.selectedLesson);
  //         this.activeTab = type;
  //       }
  //     });
  //   }
  // }

  // getUserInCourse() {
  //   //temp api for testing UI
  //   // //this.blockUI.start('Loading...');
  //   console.log('lessonD~~~~~~~', this.lessonD);
  //   // console.log("selectedCourse ~~~~~~~~~~~~~",this.selectedCourse)
  //   const lessonDateObj = this.lessonD;
  //   this._service
  //     .getAssignUser(
  //       this.regionId,
  //       this.courseId,
  //       lessonDateObj.day,
  //       lessonDateObj.month,
  //       lessonDateObj.year
  //     )
  //     .subscribe(
  //       (res: any) => {
  //         // //this.blockUI.stop();
  //         console.log(res);
  //         this.studentLists = res.CUSTOMER;
  //         this.selectedSeat.taken = this.studentLists.length;
  //         this.selectedSeat.left =
  //           this.selectedSeat.total - this.selectedSeat.taken;
  //         console.log(this.selectedSeat);

  //         res.CUSTOMER.map(customer => {
  //           this.studentArray.push(customer.userId);
  //         });
  //       },
  //       err => {
  //         console.log(err);
  //       }
  //     );
  // }

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

  // selectCustomer(state, id, type) {
  //   this.getSingleCustomer(id);
  //   this.formData = {};
  // }

  // getSingleCustomer(ID) {
  //   //this.blockUI.start('Loading...');
  //   console.log('this.selectedCustomer', this.selectedCustomer);
  //   this._service.editProfile(this.regionId, ID).subscribe((res: any) => {
  //     res.details.map(info => {
  //       if (info.controlType === 'Datepicker')
  //         info.value = moment(info.value).format('YYYY-MM-DD');
  //     });
  //     //this.blockUI.stop();
  //     console.log('selected Customer', res);
  //     this.selectedCustomer = res;
  //     this.custDetail.user = res;
  //     console.log(this.custDetail);
  //     this.stdLists = this.selectedCustomer.userId;
  //     console.log(this.stdLists);
  //     this.showList = false;
  //     if (this.detailLists && this.detailLists.type == 'FLEXY') {
  //       if (this.detailLists.seat_left === 0) {
  //         // console.log(this.pplLists)
  //         var includedUserId = this.studentLists.findIndex(
  //           x => x.userId === this.selectedCustomer.userId
  //         );
  //         console.log('includedUserId~~~', includedUserId);
  //         if (includedUserId == -1) {
  //           this.isDisabledBtn = true;
  //           console.log('includedUserId == -1', this.isDisabledBtn);
  //         } else {
  //           this.isDisabledBtn = false;
  //           console.log('includedUserId != -1', this.isDisabledBtn);
  //         }
  //       }
  //     }
  //   });
  // }

  // closeDropdown(event, type) {
  //   console.log('close dropdown', event);
  //   if (type == 'search') {
  //     var parentWrap = event.path.filter(function(res) {
  //       return res.className == 'search-wrap';
  //     });
  //     if (parentWrap.length == 0) {
  //       this.showList = false;
  //     }
  //   }
  // }
  ctype: any;

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

  // updateCfee(data) {
  //   console.log('updateCfee', data);
  //   this.feesBox = false;
  //   for (var i in this.invoice) {
  //     if (this.invoice[i].courseFee.fee != data) {
  //       console.log('===not same');
  //       this.updateInvData['courseFee'] = data;
  //       // this.updateInvData["courseFee"] = {
  //       //   'fee': Number(data)
  //       // };
  //       this.invoice[i].courseFee.fee = Number(data);
  //       console.log(this.invoice[i].courseFee.fee);
  //       // formula for calculating the inclusive tax
  //       // Product price x RATE OF TAX/ (100+RATE OF TAX);
  //       if (this.invoice[i].courseFee.taxInclusive == true) {
  //         var taxRate = this.invoice[i].tax.rate;
  //         var taxAmount = (
  //           (this.invoice[i].courseFee.fee * taxRate) /
  //           (100 + taxRate)
  //         ).toFixed(2);
  //         this.invoice[i].courseFee.tax = Number(taxAmount);
  //         console.log('inclusiveTax for CFee', this.invoice[i].courseFee.tax);
  //         var cFee = (
  //           this.invoice[i].courseFee.fee - this.invoice[i].courseFee.tax
  //         ).toFixed(2);
  //         this.invoice[i].courseFee.fee = Number(cFee);
  //         this.invoice[i].courseFee.amount = (
  //           this.invoice[i].courseFee.fee + this.invoice[i].courseFee.tax
  //         ).toFixed(2);
  //         console.log(
  //           'CFee without inclusive tax',
  //           this.invoice[i].courseFee.fee
  //         );
  //         console.log(
  //           'Amount without inclusive tax',
  //           this.invoice[i].courseFee.amount
  //         );
  //       } else if (this.invoice[i].courseFee.taxInclusive == false) {
  //         var taxRate = this.invoice[i].tax.rate;
  //         var taxAmount = (
  //           (this.invoice[i].courseFee.fee * taxRate) /
  //           100
  //         ).toFixed(2);
  //         this.invoice[i].courseFee.tax = Number(taxAmount);
  //         console.log('inclusiveTax for CFee', this.invoice[i].courseFee.tax);
  //         this.invoice[i].courseFee.amount =
  //           this.invoice[i].courseFee.fee + this.invoice[i].courseFee.tax;
  //         console.log('CFee with exclusive tax', this.invoice[i].courseFee.fee);
  //         console.log(
  //           'Fee amount with exclusive tax',
  //           this.invoice[i].courseFee.amount
  //         );
  //       }

  //       this.calculateHideFees('cFees');
  //     } else {
  //       console.log('===same');
  //     }
  //   }
  //   // this.discount = data;
  //   // this.showBox = false;
  // }

  // hideInvoiceRow(type) {
  //   this.isEditInv = true;
  //   if (type == 'reg') {
  //     this.hideReg = true;
  //     this.updateInvData['registrationFee'] = null;
  //     // this.updateInvData["registrationFee"] = {
  //     //   'fee': null
  //     // };
  //     this.calculateHideFees(type);
  //   } else if (type == 'deposit') {
  //     this.hideDeposit = true;
  //     this.updateInvData['deposit'] = null;
  //     this.calculateHideFees(type);
  //   } else if (type == 'misc') {
  //     this.hideMisc = true;
  //     this.updateInvData['miscFee'] = null;
  //     // this.updateInvData["miscFee"] = {
  //     //   'fee': null
  //     // };
  //     this.calculateHideFees(type);
  //   }
  // }

  // calculateHideFees(type) {
  //   console.log('calculateHideFees');
  //   for (var i in this.invoice) {
  //     var regFees: number;
  //     var regTax: number;
  //     var miscFees: number;
  //     var miscTax: number;
  //     var deposit: number;
  //     var totalTaxes: number;

  //     if (this.hideReg == true) {
  //       regFees = 0;
  //       regTax = 0;
  //     } else {
  //       regFees = this.invoice[i].registrationFee.fee;
  //       regTax = this.invoice[i].registrationFee.tax;
  //     }

  //     if (this.hideMisc == true) {
  //       miscFees = 0;
  //       miscTax = 0;
  //     } else {
  //       miscFees = this.invoice[i].miscFee.fee;
  //       miscTax = this.invoice[i].miscFee.tax;
  //     }

  //     if (this.hideDeposit == true) {
  //       deposit = 0;
  //     } else {
  //       deposit = this.invoice[i].deposit;
  //     }

  //     totalTaxes = regTax + miscTax + Number(this.invoice[i].courseFee.tax);
  //     console.log('Total taxes and deposit', totalTaxes, deposit);
  //     this.invoice[i].subtotal = (
  //       regFees +
  //       miscFees +
  //       deposit +
  //       this.invoice[i].courseFee.fee
  //     ).toFixed(2);
  //     this.total = Number(
  //       (Number(this.invoice[i].subtotal) + totalTaxes).toFixed(2)
  //     );
  //     // this.invoice[i].total = Number(totalPrice).toFixed(2);
  //     // this.total = Number(this.invoice[i].total).toFixed(2);
  //     console.log('Subtotal', this.invoice[i].subtotal);
  //     console.log('Total', this.total);
  //     // console.log("TTT",this.invoice[i].subtotal+totalTaxes)
  //   }
  // }

  // backToInvoice() {
  //   console.log('Back To Invoice');
  //   this.showPayment = false;
  //   this.showInvoice = true;
  //   this.paymentItem = {};
  // }
  showDp: boolean = false;
  scheduleObj = {};

  testTop;
  testLeft; //require
  // getSlotNumber(hr, min, ampm, e, i, j, date, weekday) {
  //   this.isFousCategory = false;
  //   const ele = document.getElementById('overlap-wrapper');
  //   if (e.target.parentElement.className === 'slot-wrap border-0') {
  //     this.testTop = e.clientY;
  //     this.testLeft = e.clientX;
  //     e.preventDefault();
  //     e.stopPropagation();
  //     //this.caculatePosition(e);
  //     return;
  //   } else {
  //     //this.overlap = false;
  //   }

  //   $('.disabledScroll').css('overflow', 'hidden');
  //   this.screenValue = window.innerWidth; //for resize condition to mactch window size

  //   console.log('minSlot', this.minSlotArr);
  //   // var cIdx = this.minSlotArr.indexOf(min);
  //   // if(cIdx>=0){
  //   //    var pIdx = cIdx-1;
  //   //    if((min >=0 && min<=15) && this.minSlotArr[pIdx]>this.minSlotArr[cIdx]){
  //   //     var h = hr+1;
  //   //     console.log("add +1", h, ':', min, ':', ampm);
  //   //    }else{
  //   //     var h = hr;
  //   //     console.log("original", h, ':', min, ':', ampm);
  //   //    }
  //   // }
  //   console.log('min', min);

  //   var cIdx = this.minSlotArr.indexOf(min);
  //   console.log('cIdx', cIdx);
  //   var pIdx = cIdx - 1;
  //   if (
  //     (cIdx == 1 || cIdx == 3) &&
  //     this.minSlotArr[cIdx] >= 0 &&
  //     this.minSlotArr[cIdx] <= 15 &&
  //     this.minSlotArr[pIdx] > this.minSlotArr[cIdx]
  //   ) {
  //     var h = hr + 1;
  //     if (h > 12) {
  //       h = h - 12;
  //     }
  //     console.log('add 1', h);
  //   } else {
  //     var h = hr;
  //     console.log('original', h);
  //   }

  //   if (h == 12) {
  //     ampm = 'PM';
  //   }
  //   // var h = hr;

  //   if (min == ['']) {
  //     min = '00';
  //   }
  //   this.slotHr = h + ':' + min + ' ' + ampm;

  //   this.slotM = min;
  //   this.slotAMPM = ampm;
  //   this.slotIdx = i;
  //   this.slotJidx = j;
  //   this.showDp = true;
  //   e.preventDefault();
  //   e.stopPropagation();
  //   this.yPosition = e.layerY + 25;
  //   this.xPosition = e.layerX - 25;

  //   console.log($(event.target).offset().left + '<left');
  //   console.log($(event.target).offset().top + '<top');
  //   console.log($(event.target).height() + '<height');
  //   this.xPosition =
  //     $(event.target).offset().left - 150 + $(event.target).width() / 2;
  //   this.yPosition =
  //     $(event.target).offset().top + $(event.target).height() + 10;
  //   this.arrTop = $(event.target).offset().top + $(event.target).height() - 10;
  //   this.arrLeft = this.xPosition + 140;

  //   console.log('xPostiton>' + this.xPosition);
  //   console.log('yPosition>' + this.yPosition);
  //   console.log('arrTop>' + this.arrTop);
  //   console.log('arrLeft>' + this.arrLeft);
  //   console.log('width>', $(document).width());
  //   let height;
  //   if (this.isTeacherAll) {
  //     height = 136;
  //   } else {
  //     height = 160;
  //   }
  //   if ($(document).height() - this.yPosition < height) {
  //     this.yPosition = $(event.target).offset().top - height;
  //     this.arrTop = this.yPosition + height;
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
  //   console.log('selected', this.selectedTeacher);
  //   console.log('selectdate', date);
  //   var day = [];
  //   switch (weekday) {
  //     case 'Sun':
  //       day.push(0);
  //       break;
  //     case 'Mon':
  //       day.push(1);
  //       break;
  //     case 'Tue':
  //       day.push(2);
  //       break;
  //     case 'Wed':
  //       day.push(3);
  //       break;
  //     case 'Thu':
  //       day.push(4);
  //       break;
  //     case 'Fri':
  //       day.push(5);
  //       break;
  //     case 'Sat':
  //       day.push(6);
  //   }

  //   // this.scheduleObj["date"] = date;
  //   // this.scheduleObj["repeatDay"] =
  //   var sDate = {
  //     year: date.year,
  //     month: date.month,
  //     day: date.day
  //   };
  //   var time = {
  //     hr: h,
  //     min: this.slotM,
  //     meridiem: this.slotAMPM
  //   };

  //   this.scheduleObj['repeatDays'] = day;
  //   this.scheduleObj['date'] = sDate;
  //   this.scheduleObj['teacher'] = this.selectedTeacher;
  //   this.scheduleObj['time'] = time;
  //   console.log('scheduleObj', this.scheduleObj);
  // }

  // onClickCreate() {
  //   $('.disabledScroll').css('overflow', 'auto');
  //   $('body').css('overflow', 'auto');
  //   this.courseCreate = true;
  //   this.courseplanLists = [];
  //   this.getAllCoursePlan('0', '20');
  // }
  // onClickCreate() {
  //   this.courseCreate = true;
  //   this.getCoursePlan(0, 'createCourse');
  // }

  onClickCourse(course, lesson, e, date, list, type) {
    console.error('here onclickcourse');
    this.isFousCategory = false;
    //this.overlap = false;
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
            console.log(this.result);
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

  goToCourse(course) {
    // this.router.navigate(['/course']);
    // this.dataService.nevigateCourse(course.courseId);
    this.router.navigate(['/coursedetail', course.courseId]);
  }

  // clickOverlay() {
  //   console.log(this.flexyarr);
  //   this.showcb = false;
  //   this.FlexiComponent.changes.subscribe(e => {
  //     $('.conflictPopUp').hide();
  //     if (document.getElementById('flexiMid') != null) {
  //       let hideoverlay: HTMLElement = document.getElementById('flexiMid');
  //       hideoverlay.setAttribute('style', 'overflow: overlay;');
  //     }
  //     if (document.getElementById('lessonbox') != null) {
  //       let hideindex: HTMLElement = document.getElementById('lessonbox');

  //       hideindex.setAttribute('style', 'z-index: 0;');
  //     }
  //   });
  // }

  // end flexy

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    $('body').css('overflow', 'auto');
    localStorage.removeItem('scheduleObj');
  }

  //
  public selectedStaff: any;
  public timetable: any;
  public absent: boolean;

  showPopUpFunc(staff, schedule) {
    var staffObj = {
      staffId: staff.staffId,
      staffName: staff.staffName,
      profilePic: staff.profilePic
    };
    this.selectedStaff = staffObj;
    console.log(this.selectedStaff);
    this.timetable = schedule.timetable;
    this.absent = schedule.absent;
    this.getAllCoursePlan('0', '20');
    //this.selectedTeacher.id = '5e194245f813ae005e6ab4f9';
    var weekday = 'Sun';
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

    var sDate = {
      year: schedule.date.year,
      month: schedule.date.month,
      day: schedule.date.day
    };

    var time = {
      hr: 0,
      min: 0,
      meridiem: 'AM'
    };
    console.log(this.selectedStaff);
    this.scheduleObj['repeatDays'] = day;
    this.scheduleObj['date'] = sDate;
    this.scheduleObj['teacher'] = this.selectedStaff;
    console.log(this.scheduleObj['teacher']);
    this.scheduleObj['time'] = time;

    //this.scheduleObj['repeatDays'] = day;
    //this.scheduleObj['date'] = sDate;
    //this.scheduleObj['teacher'] = this.selectedStaff; //give selected teacher
    //this.scheduleObj['time'] = time;
    this.showPopUp = true;
  }

  clickOverlay() {
    this.showPopUp = false;
  }

  goCourseDetails(id) {
    var courseId = '5e4cb79ed0019f00125bf69a'; //testing
    this.router.navigate(['/coursedetail', id]);
  }

  public showTimetable = true;
  public addNewCoursePlan = false;

  addNewCourse() {
    this.showTimetable = false;
    this.showPopUp = false;
    this.addNewCoursePlan = true;
    console.log('I am in addNewCourse');
    this.scheduleList = false;
    this.isCategory = false;
    this.isPlan = false;
    this.isCourseCreate = false;
  }

  createPlan() {
    if (this.testCategory == 'all') {
      this.isCategory = true;
      this.isPlan = false;
    } else {
      this.isPlan = true;
      this.isCategory = false;
    }
    // console.log('course Plan');
    // this.isCategory = true;
    // this.goBackCat = false;
    // this.courseCreate = false;
    var category = {
      categoryId: this.selectedCategory._id,
      name: this.selectedCategory.name
    };
    localStorage.setItem('cpCategory', JSON.stringify(category));
  }

  selectPlan(plan) {
    this.addNewCoursePlan = false;

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
    console.log('plan', JSON.stringify(planObj));
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
}
