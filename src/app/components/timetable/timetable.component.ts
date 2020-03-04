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
  public showPopUp = false;
  public modalReference: any;

  isnewcourseplan = false;
  //
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

  // @HostListener('document:click', ['$event']) clickedOutside($event) {
  //   this.testshowbox = '';
  //   this.testshowboxs = false;
  //   this.showDp = false;
  //   this.slotM = '';
  //   this.slotIdx = '';
  //   this.slotJidx = '';
  // }

  // @HostListener('window:resize', ['$event'])
  // onResize(event) {
  //   //this.overFlowWidth(20, 'button');
  //   //to define is side or not
  //   var diff = window.innerWidth - this.screenValue;
  //   if (this.isSide) {
  //     if (diff <= 40 && diff >= 0) {
  //       console.log('less than');
  //       this.styleArr = {
  //         top: this.yPosition + 'px',
  //         right: '0px'
  //       };
  //       //if left or right side position zero fix
  //     } else {
  //       console.log('greater than');
  //       this.styleArr = this.styleArrDefault; //if not left or right side position depend on first time click position
  //     }
  //   }
  // }

  public testCategory = 'all';

  ngOnInit() {
    this.selectedID = '007';
    localStorage.removeItem('scheduleObj');
    this.activeTab = 'enroll';
    console.log('undefined currency', this.currency);
    //this.getRegionalInfo();
    this.getAllCoursePlan(0, 20);
  }

  ngAfterViewInit() {
    this.staffList = [
      {
        staff: [{}]
      }
    ];
  }

  public startTime;

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
    //this.getAutoSelectDate();
    this.showDp = false;
    this.selectedTeacher = {};
    setTimeout(() => {
      //this.updateScrollbar('v-wrapper');
    }, 600);
  }

  backtoTimetable() {
    // $('body').css('overflow', 'hidden');
    // $('.disabledScroll').css('overflow', 'hidden');
    // this.scheduleList = false;
    // this.isPlan = false;
    // this.isCategory = false;
    // this.courseCreate = false;
    // this.showDp = false;
    // this.courseplanLists = [];
    // setTimeout(() => {
    //   this.updateScrollbar('v-wrapper');
    // }, 600);
    this.addNewCoursePlan = false;
    this.showTimetable = true;
    this.isPlan = false;
    this.isCategory = false;
    this.isCourseCreate = false;
  }

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

  showDp: boolean = false;
  scheduleObj = {};

  testTop;
  testLeft;

  onClickCreate() {
    $('.disabledScroll').css('overflow', 'auto');
    $('body').css('overflow', 'auto');
    this.courseCreate = true;
    this.courseplanLists = [];
    this.getAllCoursePlan('0', '20');
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
      localStorage.setItem('scheduleObj', JSON.stringify(this.scheduleObj));
    }
    // console.log("scheduleObj",this.scheduleObj);
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

  goToCourse(course) {
    // this.router.navigate(['/course']);
    // this.dataService.nevigateCourse(course.courseId);
    this.router.navigate(['/coursedetail', course.courseId]);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    $('body').css('overflow', 'auto');
    localStorage.removeItem('scheduleObj');
  }
  //

  showPopUpFunc(modal) {
    this.showPopUp = true;
  }

  clickOverlay() {
    this.showPopUp = false;
  }

  cancelModal() {
    console.log('....');
    this.showPopUp = false;
  }

  goCourseDetails(id) {
    var courseId = '5e4cb79ed0019f00125bf69a'; //testing
    this.router.navigate(['/coursedetail', courseId]);
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
    // this.scheduleList =false
    // this.isCategory = false
    // this.isPlan = false
    // this.isCourseCreate = false
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
    // var category = {
    //   categoryId: this.selectedCategory._id,
    //   name: this.selectedCategory.name
    // };
    // localStorage.setItem('cpCategory', JSON.stringify(category));
  }
}
