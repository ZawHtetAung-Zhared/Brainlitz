import {
  Component,
  OnInit,
  HostListener,
  ViewChild,
  ViewChildren,
  QueryList
} from '@angular/core';

import * as moment from 'moment-timezone';
import { appService } from '../../../service/app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';
import { NgbCarousel, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FlexiComponent } from '../../flexi/flexi.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  private permissionSubscription: ISubscription;
  isSticky: boolean = false;
  userArchive: boolean = false;
  public permissionType: any;
  public custDetail: any = {};
  public activeTab: any;
  public orgID = localStorage.getItem('OrgId');
  public regionID = localStorage.getItem('regionId');
  public locationID = localStorage.getItem('locationId');
  public customerDemo: any = [];
  public customerPermission: any = [];
  editId: any;
  public activePass: any = '';
  public makeupLists: any;
  public notifications: any;
  modalReference: any;
  public showflexyCourse: boolean = false;
  public lessonData: any;
  public currentPassObj: any;

  /*for invoice*/
  public showInvoice: boolean = false;
  public currency = JSON.parse(localStorage.getItem('currency'));
  public logo: any = localStorage.getItem('OrgLogo');
  public showBox: boolean = false;
  public discount: number = 0;
  public value: any = {};
  public showMailPopup: boolean = false;
  public invoiceInfo: any;
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
  public total: any;
  public singleInv: any = [];
  public isEditInv: any = false;
  public updateInvData: any = {};
  public hideMisc: boolean = false;
  public paymentId: any;
  public showPaidInvoice: boolean = false;
  public invStatus: any;
  public invCurrency: any = {};
  public invPayment: any = [];
  public achievementProgess: any = [];
  public achievementEvaluation: any = [];
  public achievementGrade: any = [];
  public noSetting: boolean = false;
  isProrated: boolean = false;
  public claimCourses: Array<any> = [];
  public className: any;
  //flexy
  public flexyarr = [];
  idarr: any = [];
  conflictObj: any = [];
  tempObj: any = [];
  dataObj: any = [];
  flexiTemp: any = [];
  checkobjArr: any = [];
  public gtxtColor: any;
  public gbgColor: any;

  //journal
  public jSkip: number = 0;
  public jLimit: number = 20;
  public jSlectedCourse: string;
  public toShowLoadMore: boolean;
  public toShowNoJournl: boolean;
  public journals: any = [];

  //for achievement pick grade
  public showPickGradeBox = false;
  public yPosition: any;
  public optionsBoxStdID = '';
  public apgName = '';
  public gradeOptions = [];
  public color = '';
  public bgcolor = '';
  public grade = [];
  public apId = '';
  public apCourseId = '';
  deleteGradeId: any = null;

  //for modal box
  public autoEnrollModal;
  public invoiceModalReference;
  public lessonOfStudent;
  public isJournal_delete = false;
  acResult: any;
  availableCourses: Array<any> = [];
  isACSearch: boolean = false;
  acWord: any;
  public isChecked: any = '';
  public checkCourse: any = '';
  public selectedCourse: any;
  selectedCustomer: any = {};
  public disableInvoice;
  searchData: any = {};
  public passForm: any = {};
  public transferFlag: boolean = false;
  public removeClass = {};

  //for loading
  public detailLoading: boolean = true;
  public tabLoading: boolean = false;
  public makeupLoading: boolean = false;
  public moreOpt: any = {};
  public clickedCourseID: any = null;
  public coursePlanID: any = null;
  public invFlag: boolean = null;
  public resetEvaluationApg;
  public resetEvaluationClicked = false;
  public resetEvaluationIndex = null;

  constructor(
    private _service: appService,
    private _Activatedroute: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    public toastr: ToastrService
  ) {}

  @HostListener('window:scroll', ['$event']) onScroll($event) {
    if (window.pageYOffset > 81) {
      this.isSticky = true;
    } else {
      this.isSticky = false;
    }
  }
  public headerFixed: boolean = false;
  public attendedFlag: boolean = false;
  @HostListener('document:wheel', ['$event.target'])
  public onWheel(targetElement) {
    var container = document.getElementById('rm-container');
    var parent = document.getElementById('rm-parent');
    if (container != null) {
      // console.log(
      //   "testing",
      //   container.getBoundingClientRect().top -
      //     parent.getBoundingClientRect().top
      // );
      if (
        container.getBoundingClientRect().top -
          parent.getBoundingClientRect().top <=
        0
      ) {
        this.headerFixed = true;
      } else {
        this.headerFixed = false;
      }
    }
    var line = document.getElementById('the-line');
    if (line != null) {
      console.log(
        'line testing',
        line.getBoundingClientRect().top -
          (parent.getBoundingClientRect().top + 48)
      );
      if (
        line.getBoundingClientRect().top -
          (parent.getBoundingClientRect().top + 48) <=
        0
      ) {
        this.attendedFlag = true;
      } else {
        this.attendedFlag = false;
      }
    }
  }

  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    console.log(
      'onClick',
      this.resetEvaluationClicked,
      this.resetEvaluationIndex
    );
    if (!this.resetEvaluationClicked) {
      //click was outside the element, do stuff
      console.log('clicked outside');
      this.resetEvaluationIndex = null;
    }
    this.resetEvaluationClicked = false;
  }

  @ViewChild('carousel') carousel: NgbCarousel;
  @ViewChildren(FlexiComponent) private FlexiComponent: QueryList<
    FlexiComponent
  >;

  ngOnInit() {
    localStorage.setItem('userType', 'customer');
    this.permissionSubscription = this._service.permissionList.subscribe(
      data => {
        this.permissionType = data;
        this.checkPermission();
      }
    );
    this.editId = this._Activatedroute.snapshot.paramMap.get('userid');
    this.showDetails(this.editId, 'class', 'user,courses');
  }

  ngOnDestroy() {
    this.permissionSubscription.unsubscribe();
  }

  checkPermission() {
    console.log(this.permissionType);
    this.customerPermission = [
      'CREATECUSTOMERS',
      'VIEWCUSTOMERS',
      'EDITCUSTOMERS',
      'DELETECUSTOMERS',
      'ENROLLCOURSE'
    ];
    this.customerPermission = this.customerPermission.filter(
      value => -1 !== this.permissionType.indexOf(value)
    );

    this.customerDemo['createCustomer'] = this.customerPermission.includes(
      'CREATECUSTOMERS'
    )
      ? 'CREATECUSTOMERS'
      : '';
    this.customerDemo['viewCustomer'] = this.customerPermission.includes(
      'VIEWCUSTOMERS'
    )
      ? 'VIEWCUSTOMERS'
      : '';
    this.customerDemo['editCustomer'] = this.customerPermission.includes(
      'EDITCUSTOMERS'
    )
      ? 'EDITCUSTOMERS'
      : '';
    this.customerDemo['deleteCustomer'] = this.customerPermission.includes(
      'DELETECUSTOMERS'
    )
      ? 'DELETECUSTOMERS'
      : '';
    this.customerDemo['enrollStudent'] = this.customerPermission.includes(
      'ENROLLCOURSE'
    )
      ? 'ENROLLCOURSE'
      : '';
  }

  showDetails(ID, val, reqdata) {
    console.log(this.custDetail);
    this.activeTab = val;
    console.log(ID);
    console.log('show details');
    const format = 'DD MMM YYYY';
    const zone = localStorage.getItem('timezone');
    // this.showCustDetail = true;
    this.getRegionInfo();
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

    //this.blockUI.start('Loading...');
    this._service
      .getUserDetail(this.regionID, ID, this.locationID, reqdata)
      .subscribe(
        (res: any) => {
          this.custDetail = res;
          this.userArchive = res.user.isArchive;
          res.user.details.map(info => {
            if (info.controlType === 'Datepicker') {
              info.value = moment(info.value).format('YYYY-MM-DD');

              const birthday = moment(info.value);
              info.year = moment().diff(birthday, 'years');
              // var month = moment().diff(birthday, 'months') - info.year * 12;
              // birthday.add(info.year, 'years').add(month, 'months'); for years months and days calculation
              birthday.add(info.year, 'years'); // for years and days calculation
              info.day = moment().diff(birthday, 'days');
            }
          });

          console.log('CustDetail', res);
          for (var i = 0; i < this.custDetail.ratings.length; i++) {
            var tempData = this.custDetail.ratings[i].updatedDate;
            var d = new Date(tempData);
            console.log(this.custDetail.ratings[i].updatedDate);
            this.custDetail.ratings[i].updatedDate = moment(d, format)
              .tz(zone)
              .format(format);
          }
          setTimeout(() => {
            //this.blockUI.stop();
            this.detailLoading = false;
            this.tabLoading = false;
          }, 2000);
        },
        err => {
          console.log(err);
          //this.blockUI.stop();
        }
      );
  }

  showGuardian(ID) {
    console.log('Gurdians::::' + ID);
    this.router.navigate(['../../customerdetail', ID], {
      relativeTo: this._Activatedroute
    });
    setTimeout(() => {
      this.editId = this._Activatedroute.snapshot.paramMap.get('userid');
      console.log(this.editId);
      this.showDetails(this.editId, 'class', 'user,courses');
    }, 100);
  }

  getRegionInfo() {
    this.token = localStorage.getItem('token');
    this.type = localStorage.getItem('tokenType');
    this._service
      .getRegionalAdministrator(this.regionID, this.token, this.type)
      .subscribe((res: any) => {
        console.log('regional info', res);
        // this.paymentProviders = res.invoiceSettings.paymentProviders;
        // console.log(this.paymentProviders);
        if (
          res.invoiceSettings == {} ||
          res.invoiceSettings == undefined ||
          res.paymentSettings == {} ||
          res.paymentSettings == undefined
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
          this.noSetting = true;
        } else {
          console.log('has invoice setting');
          this.invoiceInfo = res.invoiceSettings;
          this.noSetting = false;
        }
        console.log(this.getRegionInfo);
      });
  }

  backToCustomer() {
    this.router.navigate(['/customer']);
  }

  staffArchive(archive) {
    this.userArchive = archive;
    let customerId = this.custDetail.user.userId;
    let isArchive = archive;
    isArchive = this.userArchive;
    let regionId = this.regionID;
    const tempData = {
      customerId,
      isArchive,
      regionId
    };
    this._service.userArchive(tempData).subscribe(
      res => {
        console.error(res);
      },
      err => {
        console.error(err);
      }
    );
  }

  getSingleInfo(ID) {
    this.router.navigate(['../../customercreate/edit', ID], {
      relativeTo: this._Activatedroute
    });
  }

  selectedId: any = [];
  showMoreItem(itemid) {
    console.log(itemid);
    this.selectedId.push(itemid);
    console.log('selectedId Arr', this.selectedId);
  }

  clickTab(val) {
    this.tabLoading = true;
    this.activeTab = val;
    this.activePass = 'available';
    if (val == 'subscription') {
      this.tabLoading = false;
    } else if (val == 'makeup') {
      this.callMakeupLists();
    } else if (val == 'class') {
      this.showDetails(this.custDetail.user.userId, val, 'user,courses');
    } else if (val == 'activity') {
      this.showDetails(this.custDetail.user.userId, val, 'user,ratings');
    } else if (val == 'achievements') {
      console.log('cos', this.carousel);
      console.log('achievements');
      this.callAchievements(1);
      this.callAchievements(3);
      this.callAchievements(6);
    } else if (val == 'notifications') {
      this.getNotiList();
    }
  }

  //start makeup functions
  callMakeupLists() {
    console.log('cus details', this.custDetail);
    this._service
      .getMakeupLists(
        this.custDetail.user.userId,
        this.activePass,
        this.regionID,
        undefined
      )
      .subscribe(
        (res: any) => {
          //this.blockUI.stop();
          console.log(res);
          this.makeupLists = res;
          setTimeout(() => {
            this.tabLoading = false;
            this.makeupLoading = false;
          }, 2000);
        },
        err => {
          console.log(err);
        }
      );
  }

  clickPass(type) {
    this.makeupLoading = true;
    this.activePass = type;
    this.callMakeupLists();
  }
  //end makeup functions

  //start achievement functions
  callAchievements(type) {
    //this.blockUI.start('Loading...');
    this._service
      .getAchievementsByType(this.custDetail.user.userId, type)
      .subscribe(
        (res: any) => {
          //this.blockUI.stop();
          setTimeout(() => {
            this.tabLoading = false;
          }, 2000);
          if (type == 1) {
            this.achievementProgess = res;
            console.log('Progress', this.achievementProgess);
          } else if (type == 3) {
            this.achievementEvaluation = res;
            console.log('Evaluation', this.achievementEvaluation);
          } else if (type == 6) {
            this.achievementGrade = res;
            console.log('Grade', this.achievementGrade);
          }
        },
        err => {
          console.log(err);
        }
      );
  }

  pickGrade(pickGradeModal, clickedGrade, e) {
    e.preventDefault();
    e.stopPropagation();
    //this.showPickGradeBox=true
    this.modalReference = this.modalService.open(pickGradeModal, {
      backdrop: 'static',
      windowClass: 'd-flex justify-content-center align-items-center'
    });
    console.log(clickedGrade);
    this.apId = clickedGrade.assessment.apId;
    this.apCourseId = clickedGrade.course.id;
    this.apgName = clickedGrade.assessment.apgName;
    this.gradeOptions = clickedGrade.assessment.gradeOptions;
    this.color = clickedGrade.assessment.sepalColor.text;
    this.bgcolor = clickedGrade.assessment.sepalColor.background;
  }

  cancelGradePickUp() {
    this.modalReference.close();
  }

  public selectedOption = {
    _id: '',
    name: '',
    point: '',
    isSelected: false
  };

  selectAPG(option) {
    this.gradeOptions.filter(item => {
      item.isSelected = false;
      if (item._id === option._id) {
        item.isSelected = true;
        this.selectedOption = item;
      }
    });
  }

  updateAPG() {
    this.modalReference.close();
    var body = {
      id: this.apId,
      data: {
        grade: {
          name: this.selectedOption.name,
          point: this.selectedOption.point
        }
      }
    };
    console.log(body, this.custDetail.user.userId);
    this._service
      .updateGrading(
        this.custDetail.user.userId,
        body,
        this.regionID,
        this.apCourseId
      )
      .subscribe(
        res => {
          console.log(res);
          this.callAchievements(6);
          this.toastr.success('APG update successfully');
        },
        err => {
          console.log(err);
          this.toastr.error('APG can not update successfully');
        }
      );
  }

  gradeDeleteModal(gradeId, modal) {
    this.deleteGradeId = gradeId;
    this.autoEnrollModal = this.modalService.open(modal, {
      backdrop: 'static',
      windowClass:
        'deleteModal journal-delete-modal d-flex justify-content-center align-items-center'
    });
  }

  deleteGrade() {
    this._service
      .deleteGrade(this.custDetail.user.userId, this.deleteGradeId)
      .subscribe(
        res => {
          console.log(res);
          this.deleteGradeId = null;
          this.callAchievements(6); //calling grade achievements data
          this.toastr.success('Successfully Deleted.');
        },
        err => {
          console.error(err);
        }
      );
    this.autoEnrollModal.close();
  }
  //end achievement functions

  //start notification functions
  getNotiList() {
    this._service
      .getNotificationHistory(this.regionID, this.custDetail.user.userId)
      .subscribe(
        (res: any) => {
          this.notifications = res;
          for (var i = 0; i < this.notifications.length; i++) {
            for (var j = 0; j < this.notifications[i].noti.length; j++) {
              var data = this.notifications[i].noti[j];
              data.createdTime = this.formatAMPM(data.createdDate);
            }
          }
          console.log('notilist is', this.notifications);
          setTimeout(() => {
            this.tabLoading = false;
          }, 2000);
        },
        err => {
          console.log(err);
        }
      );
  }

  formatAMPM(date) {
    const zone = localStorage.getItem('timezone');
    var format = 'YYYY/MM/DD HH:mm:ss ZZ';
    var hours = parseInt(
      moment(date, format)
        .tz(zone)
        .format('HH')
    );
    var minutes = moment(date, format)
      .tz(zone)
      .format('mm');
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
  //end notification functions

  //start course functions
  callEnrollModal(enrollModal, userId) {
    this.transferFlag = false;
    console.log(userId);
    console.log(enrollModal);
    //this.blockUI.start('Loading...');
    this.showInvoice = false;
    this.showPaidInvoice = false;
    console.log(this.showInvoice, this.showPaidInvoice);
    this.modalReference = this.modalService.open(enrollModal, {
      backdrop: 'static',
      windowClass:
        'modal-xl modal-inv d-flex justify-content-center align-items-center'
    });
    this.getAC(20, 0, userId);
  }

  callTransferModal(transferModal, userId, course) {
    this.transferFlag = true;
    console.log(userId);
    console.log(transferModal);
    this.clickedCourseID = course._id;
    this.coursePlanID = course.coursePlan._id;
    console.log('courseplan', course);

    //this.blockUI.start('Loading...');
    this.showInvoice = false;
    this.showPaidInvoice = false;
    console.log(this.showInvoice, this.showPaidInvoice);
    this.modalReference = this.modalService.open(transferModal, {
      backdrop: 'static',
      windowClass:
        'modal-xl modal-inv d-flex justify-content-center align-items-center'
    });
    this.getAC(20, 0, userId);
  }

  getAC(limit, skip, userId) {
    console.log('limit,skip,userId', limit, skip, userId);
    var courseplanid = this.transferFlag ? this.coursePlanID : null;
    this._service
      .getAvailabelCourse(this.regionID, userId, limit, skip, courseplanid)
      .subscribe(
        (res: any) => {
          console.log(res);
          this.acResult = res;
          this.availableCourses = this.availableCourses.concat(res);
          console.log('Available C', this.availableCourses);
          this.checkedDisabled(this.availableCourses);
          //this.blockUI.stop();
        },
        err => {
          console.log(err);
        }
      );
  }

  checkedDisabled(ac) {
    for (var i in ac) {
      if (ac[i].type == 'FLEXY') {
        if (ac[i].isEnrolled == false && ac[i].seat_left == 0) {
          ac[i]['isDisabled'] = true;
        } else {
          ac[i]['isDisabled'] = false;
        }
      } else {
        if (ac[i].seat_left == 0) {
          ac[i]['isDisabled'] = true;
        } else {
          ac[i]['isDisabled'] = false;
        }
      }
    }
  }

  showMoreAC(skip, userId) {
    console.log(skip);
    // this.getAC(20, skip, userId);
    if (this.isACSearch == true) {
      console.log('AC Search');
      this.changeSearch(this.acWord, userId, 20, skip);
    } else {
      console.log('Not AC search');
      this.getAC(20, skip, userId);
    }
  }
  showMoreMakeup(skip) {
    console.log('Makeup skip', skip);
    this.getClaimCourses(this.currentPassObj.course.courseId, skip);
  }

  changeSearch2(searchWord, userId) {
    if (searchWord.length == 0) {
      this.changeSearch(searchWord, userId, '', '');
    }
  }

  changeSearch(searchWord, userId, limit, skip) {
    this.acWord = searchWord;
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
      var courseplanid = this.transferFlag ? this.coursePlanID : null;
      this._service
        .getSearchAvailableCourse(
          this.regionID,
          searchWord,
          userId,
          limit,
          skip,
          courseplanid
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
              this.checkedDisabled(this.availableCourses);
            } else {
              console.log('Not First time searching');
              this.availableCourses = this.availableCourses.concat(res);
              this.checkedDisabled(this.availableCourses);
            }
          },
          err => {
            console.log(err);
          }
        );
    } else {
      console.log('zero', searchWord.length);
      this.availableCourses = [];
      this.getAC(20, 0, userId);
      this.isACSearch = false;
    }
  }

  //start flexy
  showcb: boolean = false;
  isConflictAll: boolean = false;
  conflictBoxShow(e) {
    this.showcb = e;
    console.log($('.conflictPopUp'));
    this.FlexiComponent.changes.subscribe(e => {
      if (document.getElementById('flexiMid') != null) {
        let hideoverlay: HTMLElement = document.getElementById('flexiMid');
        hideoverlay.setAttribute('style', 'overflow: hidden;');
      }
    });
    // $('.conflictPopUp').show();
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
    console.log('lesson lesson', e);
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
    let courseId = this.selectedCourse._id;
    let body = {
      courseId: this.selectedCourse._id,
      userId: this.custDetail.user.userId,
      fromCourseId: this.clickedCourseID,
      userType: 'customer',
      lessons: this.checkobjArr,
      disableInvoice: this.disableInvoice,
      paymentPolicy: {
        allowProrated: this.isProrated
      }
    };
    if (!this.transferFlag) delete body.fromCourseId; //if not transfer course
    this._service.assignUser(this.regionID, body, this.locationID).subscribe(
      (res: any) => {
        console.log(res);

        console.log(this.custDetail, this.transferFlag, '####');
        this.toastr.success('Successfully Enrolled.');
        console.log(this.selectedCourse);
        if (this.disableInvoice) {
          this.invoiceModalReference.close();
          this.closeModal('closeInv');
          //this.blockUI.stop();
          return;
        }
        Object.assign(this.selectedCourse, res.body);
        // this.showDetails(this.custDetail.user.userId);
        // this.closeModel();
        /* for invoice*/
        // this.showInvoice = true;
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
        this.invoice = res.body.invoice;

        if (!this.transferFlag) this.showInvoice = true;
        this.showflexyCourse = false;
        this.showPayment = false;
        this.invoiceID2 = res.body.invoice[0] ? res.body.invoice[0]._id : null;
        if (this.transferFlag) {
          this.showDetails(this.editId, 'class', 'user,courses');
          this.closeModal('close');
        }
        //this.blockUI.stop();
        // this.showOneInvoice(this.selectedCourse, this.invoice);
      },
      err => {
        console.log(err);
        this.toastr.error(err.error.message);
      }
    );
  }

  //end flexy

  confirmInvoiceAlert(courseId, userType) {
    this.disableInvoice = false;
    if (this.selectedCourse.type == 'FLEXY') {
      this.flexicomfirm(undefined);
    } else {
      this.enrollUser(this.selectedCourse, this.selectedCourse.type, undefined);
    }
    this.invoiceModalReference.close();
  }
  cancelInvoiceAlert() {
    this.disableInvoice = true;
    if (this.selectedCourse.type == 'FLEXY') {
      this.flexicomfirm(undefined);
    } else {
      this.enrollUser(this.selectedCourse, this.selectedCourse.type, undefined);
    }
  }

  enrollUser(course, type, invoiceAlert) {
    console.log('enroll user');

    this.selectedCourse = course;
    console.log(course, type);
    if (type == 'FLEXY') {
      this.selectedCourse = course;
      this.selectedCustomer = this.custDetail.user;
      console.log('is flexy');
      let startDate;
      let endDate;
      this._service
        .getFlexi(course._id, this.custDetail.user.userId, startDate, endDate)
        .subscribe(
          (res: any) => {
            console.log(res);
            this.flexyarr = res;
            this.showInvoice = false;
            this.showflexyCourse = true;
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
      console.log(this.custDetail);
      let courseId = course._id;
      let body = {
        courseId: course._id,
        userId: this.custDetail.user.userId,
        userType: 'customer',
        disableInvoice: this.disableInvoice
      };
      this._service.assignUser(this.regionID, body, this.locationID).subscribe(
        (res: any) => {
          console.log(res);
          console.log(this.custDetail);
          if (res.status == 200) {
            this.toastr.success('Successfully Enrolled.');
            if (this.disableInvoice) {
              this.invoiceModalReference.close();
              this.closeModal('closeInv');
              //this.blockUI.stop();
              return;
            }
            Object.assign(this.selectedCourse, res.body);
            // this.showDetails(this.custDetail.user.userId);
            // this.closeModel();
            /* for invoice*/
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
            this.invoice = res.body.invoice;
            this.invoiceID2 = this.invoice[0]._id;
            if (!this.transferFlag) this.showInvoice = true;

            //this.blockUI.stop();
            this.showOneInvoice(course, this.invoice);
            if (this.transferFlag) {
              this.tabLoading = true;
              this.showDetails(this.editId, 'class', 'user,courses');
              this.closeModal('close');
            }
          } else {
            this.toastr.success('TIMETABLE IS ALREADY EXISTED');
            this.showInvoice = false;
            if (this.disableInvoice) {
              this.invoiceModalReference.close();
              this.closeModal('closeInv');
              return;
            }
          }
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  showOneInvoice(course, invoice) {
    console.log('showOneInvoice', course);
    for (var i in this.invoice) {
      this.updatedDate = this.dateFormat(invoice[i].updatedDate);
      this.dueDate = this.dateFormat(invoice[i].dueDate);
      this.invoiceID = invoice[i]._id;
      this.refInvID = invoice[i].refInvoiceId;
      this.invTaxName = invoice[i].tax.name;
      // this.invStatus = invoice[i].status;
      this.invCurrency = invoice[i].currency;
      this.invPayment = invoice[i].payments;
      var n = invoice[i].total;
      this.total = n.toFixed(2);
      this.invoice[i].subtotal = Number(Number(invoice[i].subtotal).toFixed(2));
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

      this.invoiceCourse['fees'] = this.invoice[i].courseFee.fee;
      if (invoice[i].courseId == course._id) {
        this.invoiceCourse['name'] = course.name;
        this.invoiceCourse['startDate'] = course.startDate;
        this.invoiceCourse['endDate'] = course.endDate;
        this.invoiceCourse['lessonCount'] = course.lessonCount;
      }
    }
  }

  backToInvoice() {
    console.log('Back To Invoice');
    this.showPayment = false;
    this.showInvoice = true;
    this.paymentItem = {};
  }

  onClickCourse(course) {
    console.log('clicking course', course);
    this.router.navigate(['/coursedetail', course._id]);
  }
  public mkSearchFlag: boolean = false;
  searchMakeup(keyword) {
    if (keyword.length > 0) {
      this.mkSearchFlag = true;
      //this.blockUI.start('Loading...');
      this._service
        .searchMakeupCourse(keyword, this.currentPassObj.course.courseId, 20, 0)
        .subscribe(
          (res: any) => {
            console.log(res);
            //this.blockUI.stop();
            this.claimCourses = res;
          },
          err => {
            //this.blockUI.stop();
            console.log(err);
          }
        );
    } else {
      this.claimCourses = [];
      this.mkSearchFlag = false;
      this.getClaimCourses(this.currentPassObj.course.courseId, 0);
    }
  }

  searchMakeup_input(keyword) {
    if (keyword.length == 0) {
      this.searchMakeup(keyword);
    }
  }

  openLessonsModal(modal, course) {
    this.lessonOfStudent = course;
    console.log(this.lessonOfStudent.lessonsOfStudent);
    this.modalReference = this.modalService.open(modal, {
      backdrop: 'static',
      windowClass: 'modal-xl d-flex justify-content-center align-items-center'
    });
  }

  public tempcIndex;
  public tempCourse;
  autoEnroll(i, data, autoEnroll) {
    console.log('auto enrol', i);
    console.log('auto enrol', data);
    this.tempCourse = data;
    console.warn(autoEnroll);
    this.autoEnrollModal = this.modalService.open(autoEnroll, {
      backdrop: 'static',
      windowClass:
        'deleteModal autoEnrollModal d-flex justify-content-center align-items-center'
    });
    this.tempcIndex = i;
    console.warn(this.custDetail.courses[this.tempcIndex].autoEnroll);
  }

  cancelAutoEnroll() {
    console.error('object');
    this.autoEnrollModal.close();
    this.isJournal_delete = false;
  }

  confirmAutoEnroll() {
    console.error('object');
    console.log('confirm course', this.custDetail.courses[this.tempcIndex]);

    this.custDetail.courses[this.tempcIndex].autoEnroll = !this.custDetail
      .courses[this.tempcIndex].autoEnroll;

    let tempObj = {
      courseId: this.custDetail.courses[this.tempcIndex]._id,
      userId: this.custDetail.user.userId,
      autoEnroll: this.custDetail.courses[this.tempcIndex].autoEnroll,
      disableAutoInvoiceOnAutoEnrol: this.custDetail.courses[this.tempcIndex]
        .disableAutoInvoiceOnAutoEnrol
    };
    this._service.autoEnroll(this.regionID, tempObj).subscribe(
      res => {
        console.log(res);
        this.tabLoading = true;
        this.showDetails(this.custDetail.user.userId, 'class', 'user,courses');
      },
      err => {
        console.error(err);
      }
    );
    this.autoEnrollModal.close();
  }

  public tempJournal;
  journalDeleteModal(journal, course, modal) {
    console.log(journal);
    console.log(course);
    console.log(modal);
    this.isJournal_delete = true;
    this.tempJournal = journal;
    this.autoEnrollModal = this.modalService.open(modal, {
      backdrop: 'static',
      windowClass:
        'deleteModal journal-delete-modal d-flex justify-content-center align-items-center'
    });
  }

  confirmJournalDelete() {
    this.isJournal_delete = false;
    this._service
      .journalDelete(
        this.regionID,
        this.tempJournal._id,
        this.tempCourse._id,
        this.custDetail.user.userId
      )
      .subscribe(
        res => {
          console.log(res);
          this.toastr.success('A Journal has been successfully removed.');
          this._service
            .getJournal(
              this.tempCourse._id,
              this.custDetail.user.userId,
              String(this.jSkip),
              String(this.jLimit),
              null
            )
            .subscribe((res: any) => {
              console.log(res.length);
              // tslint:disable-next-line: curly
              if (res.length >= 20) this.toShowLoadMore = true;
              else this.toShowLoadMore = false;
              this.jSlectedCourse = this.tempCourse._id;
              this.journals = res;
              console.log(this.journals.length);
              if (this.journals.length === 0) this.toShowNoJournl = true;
              else this.toShowNoJournl = false;
              //this.blockUI.stop();
            });
        },
        err => {
          console.error(err);
        }
      );
    this.autoEnrollModal.close();
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

  closeModal(type) {
    console.log(type);
    this.jSkip = 0;
    this.journals = [];
    this.isChecked = '';
    this.checkCourse = '';
    this.modalReference.close();
    this.availableCourses = [];
    this.showInvoice = false;
    this.showPayment = false;
    this.paymentItem = {};
    this.hideReg = false;
    this.hideDeposit = false;
    this.hideMisc = false;
    this.isEditInv = false;
    this.singleInv = [];
    this.updateInvData = {};
    this.invStatus = '';
    this.showPaidInvoice = false;
    this.invPayment = [];
    this.searchData.searchText = '';
    this.showflexyCourse = false;
    this.headerFixed = false;
    this.attendedFlag = false;
    this.scrollDirection = true;

    if (type == 'closeInv') {
      this.tabLoading = true;
      this.showDetails(this.custDetail.user.userId, 'class', 'user,courses');
    }
    this.showflexyCourse = false;
  }

  choosePayment(type) {
    console.log('choosePayment', type);
    this.selectedPayment = type.name;
    this.paymentId = type.id;
    // console.log('pItem',this.paymentItem);
  }

  payNow(type) {
    console.log('Pay Now', this.paymentItem, this.paymentId);
    let body = {
      regionId: this.regionID,
      refInvoiceId: this.refInvID,
      amount: this.paymentItem.amount.toString(),
      paymentMethod: this.paymentId.toString()
    };
    if (this.paymentItem.refNumber) {
      body['refNo'] = this.paymentItem.refNumber;
    }
    // console.log("data",body);
    this._service.makePayment(this.regionID, body).subscribe(
      (res: any) => {
        console.log(res);
        this.tabLoading = true;
        this.showDetails(this.custDetail.user.userId, 'class', 'user,courses');
        this.closeModal('closeInv');
        this.toastr.success(res.message);
      },
      err => {
        if (err.message == 'Amount is overpaid.') {
          this.toastr.success('Amount is overpaid.');
        }
        this.toastr.error('Payment Fail');
      }
    );
  }

  openClaimModal(claimModal, passObj) {
    this.currentPassObj = passObj;
    this.modalReference = this.modalService.open(claimModal, {
      backdrop: 'static',
      windowClass: 'modal-xl d-flex justify-content-center align-items-center'
    });
    this.getClaimCourses(this.currentPassObj.course.courseId, 0);
  }
  public mkResult: any;
  getClaimCourses(id, skip) {
    //this.blockUI.start('Loading...');
    this._service.getClaimPassCourses(id, 20, skip).subscribe(
      (res: any) => {
        //this.blockUI.stop();
        console.log(res);
        this.mkResult = res;
        this.claimCourses = this.claimCourses.concat(res);
        setTimeout(() => {
          this.scrollToLine();
        }, 1000);
      },
      err => {
        //this.blockUI.stop();
        console.log(err);
      }
    );
  }

  enrollPass(data, courseid) {
    console.log(data);
    console.log(this.lessonData);
    let body = {
      _id: this.lessonData._id,
      startDate: this.lessonData.startDate,
      endDate: this.lessonData.endDate,
      teacherId: this.lessonData.teacherId,
      makeupCourseId: data.courseId,
      passId: this.currentPassObj.passId
    };
    console.log(body);
    //this.blockUI.start('Loading...');
    this._service
      .enrollPass(
        body,
        this.custDetail.user.userId,
        this.currentPassObj.course.courseId
      )
      .subscribe(
        (res: any) => {
          console.log(res);
          this.modalReference.close();
          //this.blockUI.stop();
          this.isChecked = '';
          this.checkCourse = '';
          this.toastr.success('Successfully passed.');
          this.callMakeupLists();
        },
        err => {
          console.log(err);
          // this.toastr.error('Claim pass failed.');
          this.toastr.error(err.error.message);
          //this.blockUI.stop();
          this.isChecked = '';
          this.checkCourse = '';
          this.modalReference.close();
        }
      );
  }
  scrollToLine() {
    for (var i = 0; i < this.claimCourses.length; i++) {
      console.log(
        'position from left',
        document.getElementById('line-' + i).offsetLeft
      );
      document.getElementById('timeline-' + i).scrollLeft =
        document.getElementById('line-' + i).offsetLeft - 80;
    }
  }

  chooseDate(obj, data) {
    console.log(obj);
    console.log(data);
    this.lessonData = obj;
    this.isChecked = obj._id;
    this.checkCourse = data.courseId;
    // console.log(this.checkCourse)
  }
  jLoadMore() {
    this.jSkip += this.jLimit;
    console.log(this.jSkip);
    this._service
      .getJournal(
        this.jSlectedCourse,
        this.custDetail.user.userId,
        String(this.jSkip),
        String(this.jLimit),
        null
      )
      .subscribe((res: any) => {
        if (res.length > 0) {
          this.journals = this.journals.concat(res);
          if (res.length >= 20) {
            this.toShowLoadMore = true;
          } else this.toShowLoadMore = false;
        } else {
          this.toShowLoadMore = false;
        }
        console.log(this.journals);
        console.log(res);
        //this.blockUI.stop();
      });
  }

  viewJournal(journalModal, course, name) {
    this.jSkip = 0;
    this.tempCourse = course;
    this.journals = [];
    console.log(this.custDetail);
    console.log(course);
    console.log(name);
    this.className = course.name;
    console.log(this.className, course.name);
    this._service
      .getJournal(course._id, this.custDetail.user.userId, 0, 0, null)
      .subscribe((res: any) => {
        console.log(res.length);
        if (res.length >= 20) this.toShowLoadMore = true;
        else this.toShowLoadMore = false;
        this.jSlectedCourse = course._id;
        this.journals = res;
        console.log(this.journals.length);
        if (this.journals.length == 0) this.toShowNoJournl = true;
        else this.toShowNoJournl = false;
        console.log(res);
        this.modalReference = this.modalService.open(journalModal, {
          backdrop: 'static',
          windowClass:
            'jouranlModal d-flex justify-content-center align-items-center'
        });
        //this.blockUI.stop();
      });
  }

  viewFlexyInvoice(enrollModal, course, invoice) {
    this.selectedCourse = course;
    this.selectedCourse.invoice = invoice;
    this.singleInv = [];

    this.invStatus = invoice.status;
    this.modalReference = this.modalService.open(enrollModal, {
      backdrop: 'static',
      windowClass:
        'modal-xl modal-inv d-flex justify-content-center align-items-center'
    });
    this.getRegionInfo();
    //this.blockUI.start('Loading...');

    this._service.getSingleInvoice(invoice._id).subscribe(
      (res: any) => {
        //this.blockUI.stop();
        console.log('invoice detail', res);
        this.singleInv.push(res);
        this.invoice = this.singleInv;

        this.invoiceID2 = res._id;

        if (invoice.status == 'PAID') {
          this.showPaidInvoice = true;
        } else if (
          invoice.status == 'UNPAID' ||
          invoice.status == 'PAID[PARTIAL]'
        ) {
          this.showInvoice = true;
        }
        // this.showOneInvoice(course, this.invoice);
      },
      err => {
        console.log(err);
      }
    );
  }

  forward(target) {
    console.log('----', target);
    event.preventDefault();
    $('#' + target).animate(
      {
        scrollLeft: '+=150px'
      },
      'slow'
    );
  }

  backward(target) {
    console.log('----', target);
    event.preventDefault();
    $('#' + target).animate(
      {
        scrollLeft: '-=200px'
      },
      'slow'
    );
  }

  //end course functions

  public editMakeUpDate: any;
  public makeupId: any;
  oneditMakeup(editMakeup, list) {
    console.log(list);
    this.editMakeUpDate = list.expirationDate;
    this.makeupId = list.passId;
    this.modalReference = this.modalService.open(editMakeup, {
      backdrop: 'static',
      windowClass: 'holidayModal'
    });
  }

  closeDropdown(event, type, datePicker?) {
    console.log('close');
  }

  makeupModalClose() {
    this.modalReference.close();
    this.editMakeUpDate = undefined;
    this.makeupId = undefined;
  }

  editMakeupDate() {
    console.log(this.editMakeUpDate);
    let temp = {
      expiredDate: this.editMakeUpDate
    };
    this._service
      .editMakeupDate(temp, this.makeupId, this.regionID)
      .subscribe(res => {
        console.log(res);
        this.makeupModalClose();
        this.callMakeupLists();
      });
  }

  deleteMakeUp() {
    this._service.deleteMakeup(this.regionID, this.makeupId).subscribe(res => {
      console.log(res);
      this.makeupModalClose();
      this.callMakeupLists();
    });
  }

  saveAsPDF() {
    window.print();
  }

  fieldsChange(i, flag) {
    this.tempcIndex = i;
    this.invFlag = !flag;
    console.log('checkbox is ', this.invFlag);
    let tempObj = {
      courseId: this.custDetail.courses[this.tempcIndex]._id,
      userId: this.custDetail.user.userId,
      autoEnroll: this.custDetail.courses[this.tempcIndex].autoEnroll,
      disableAutoInvoiceOnAutoEnrol: this.invFlag
    };
    this._service.autoEnroll(this.regionID, tempObj).subscribe(
      res => {
        console.log(res);
        this.showDetails(this.custDetail.user.userId, 'class', 'user,courses');
      },
      err => {
        console.error(err);
      }
    );
  }
  public scrollDirection: boolean = true;
  scrollDiv() {
    this.scrollDirection = !this.scrollDirection;
    var ele = document.getElementById('rm-container');

    if (!this.scrollDirection) ele.scrollTop = ele.scrollHeight;
    else ele.scrollTop = 0;
  }

  showWithdrawClassModal(withdrawClassModal, course) {
    console.log('showWithdrawClassModal', course);
    this.removeClass = course;
    this.modalReference = this.modalService.open(withdrawClassModal, {
      backdrop: 'static',
      windowClass:
        'deleteModal d-flex justify-content-center align-items-center'
    });
  }

  cancelModal() {
    this.modalReference.close();
  }

  withdrawClass(userId, course) {
    console.log('withdrawClass', userId);
    let userobj = {
      courseId: course._id,
      userId: userId
    };
    this._service
      .withdrawAssignUser(this.regionID, userobj, this.locationID)
      .subscribe(
        (res: any) => {
          console.log(res);
          this.tabLoading = true;
          this.modalReference.close();
          this.toastr.success('Class successfully withdrawled.');
          this.showDetails(userId, 'class', 'user,courses');
        },
        err => {
          this.toastr.error('Withdrawal user failed.');
          this.modalReference.close();
          console.log(err);
        }
      );
  }

  onClickResetEvaluation(idx) {
    console.log('onClickResetEvaluation', this.resetEvaluationIndex);
    this.resetEvaluationClicked = true;
    this.resetEvaluationIndex = idx;
  }

  resetEvaluationConfirm(resetEvaluationModal, apg) {
    this.resetEvaluationApg = apg;
    this.modalReference = this.modalService.open(resetEvaluationModal, {
      backdrop: 'static',
      windowClass:
        'deleteModal d-flex justify-content-center align-items-center'
    });
  }

  resetEvaluation(userId, apg) {
    console.log('resetEvaluation', apg);
    this._service.resetEvaluation(userId, apg.id).subscribe(
      (res: any) => {
        console.log(res);
        this.modalReference.close();
        this.callAchievements(3);
      },
      err => {
        console.log(err);
        this.toastr.error('Reset evaluation failed.');
        this.modalReference.close();
      }
    );
  }
}
