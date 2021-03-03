import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  HostListener
} from '@angular/core';
import { appService } from '../service/app.service';
import {
  NgbModal,
  ModalDismissReasons,
  NgbDateAdapter,
  NgbDatepickerConfig,
  NgbCalendar,
  NgbDateStruct
} from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {
  @Input() custDetail: any;

  public modalReference: any;
  public subDetail: boolean = false;
  public regionID = localStorage.getItem('regionId');
  public locationID = localStorage.getItem('locationId');
  public subscriptionList = [];
  public planFlag: boolean = false;
  public subPlanList = [];
  public dateModal: Date = new Date();

  constructor(
    private modalService: NgbModal,
    private _service: appService,
    private _Activatedroute: ActivatedRoute,
    public toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getSubPlans();
  }

  newSubModal(modal) {
    this.modalReference = this.modalService.open(modal, {
      backdrop: 'static',
      windowClass:
        'modal-xl modal-inv d-flex justify-content-center align-items-center'
    });
    this._service.getSubscriptionList(this.regionID).subscribe((res: any) => {
      console.log('sub list', res);
      this.subscriptionList = res;
    });
  }
  public subInfo: any;
  gotoDetail(sub) {
    this.subDetail = true;
    this.subInfo = sub;
  }
  backClicked() {
    this.subDetail = false;
  }

  subscribeNewPlan(id) {
    var body = {
      userId: this._Activatedroute.snapshot.paramMap.get('userid')
    };

    this._service.subscribeNewPlan(body, this.regionID, id).subscribe(
      (res: any) => {
        console.log('subscribe', res);
        this.getSubPlans();
        this.toastr.success('Successfully subscribed!');
      },
      err => {
        console.log(err);
        this.toastr.error(err.error.message);
      }
    );
  }

  getSubPlans() {
    this._service
      .getSubscribedPlans(
        this.regionID,
        this._Activatedroute.snapshot.paramMap.get('userid')
      )
      .subscribe(
        (res: any) => {
          console.log('plans', res);
          this.subPlanList = res;
          if (this.subPlanList.length > 0) {
            this.planFlag = true;
          }
        },
        err => {
          console.log(err);
          this.toastr.error(err.error.message);
        }
      );
  }

  calculateDiff(obj) {
    // var create = moment(obj.createdDate);
    var today = moment(new Date());
    var expire = moment(obj.expireDate);
    var diff = expire.diff(today, 'days');

    return diff;
  }

  refresh() {
    this.subDetail = false;
    this.getSubPlans();
  }

  //enroll modal
  public todayDate: any;
  public planInfo: any;
  openEnrollModal(modal, sub) {
    this.planInfo = sub;
    this.todayDate = new Date();
    // this.getLessons();
    this.getCoursePlan();
    this.getTodayLesson();

    this.modalReference = this.modalService.open(modal, {
      backdrop: 'static',
      windowClass:
        'modal-xl modal-inv d-flex justify-content-center align-items-center'
    });
  }

  // public lessonList: any = [];
  // getLessons() {
  //   this._service
  //     .getLessonList(
  //       this.regionID,
  //       this._Activatedroute.snapshot.paramMap.get('userid'),
  //       this.planInfo._id
  //     )
  //     .subscribe(
  //       (res: any) => {
  //         console.log(res);
  //         this.lessonList = res;
  //         console.log('subbed lessons', this.lessonList);
  //       },
  //       err => {
  //         console.log(err);
  //       }
  //     );
  // }

  public coursePlanList: any = [];
  getCoursePlan() {
    this._service
      .getCourseplanCollection(this.regionID, this.locationID, null)
      .subscribe(
        (res: any) => {
          console.log('plan plan', res);
          this.coursePlanList = res;
        },
        err => {
          console.log(err);
          this.toastr.error('Get Course Plan Fail');
        }
      );
  }
  public lessonFlag: boolean = false;
  continue() {
    this.lessonFlag = true;
    console.log('zha testing', this.lessonFlag);
  }

  lessonbackClicked() {
    this.lessonFlag = false;
    console.log('zha testing', this.lessonFlag);
  }
  public selectedCourse: any = null;
  selectCourse(obj) {
    this.selectedCourse = obj;
    console.log('selected', obj);
  }
  public lessons: any = [];
  pickedLessons(obj) {
    console.log('count count', obj);
    // this.planInfo.subscribedLessonCount = obj.length;
    this.lessons = obj;
  }
  enrollSubLesson() {
    var body = {
      courseId: this.selectedCourse._id,
      userId: this._Activatedroute.snapshot.paramMap.get('userid'),
      userType: 'customer',
      userSubscriptionId: this.planInfo._id,
      lessons: this.lessons
    };
    this._service
      .enrollSubLesson(body, this.regionID, this.locationID)
      .subscribe(
        (res: any) => {
          console.log('******', res);
          this.toastr.success('Successfully Enrolled!');
          this.closeModal();
          this.refresh();
        },
        err => {
          console.log(err);
          this.toastr.error(err.error.message);
        }
      );
  }
  public searchVal: any = '';
  closeModal() {
    this.modalReference.close();
    // this.getLessons();
    this.lessonFlag = false;
    this.word = null;
    this.selectedPlanId = null;
    this.searchVal = '';
    this.selectedPlan = null;
    this.dateModal = new Date();
    this.todayModal = new Date();
    this.todayDate = new Date();
  }

  public word: any;
  searchCourse(val) {
    if (val.length > 0) {
      console.log(val);
      this.word = val;
    } else {
      console.log('clear search');
      this.word = '';
    }
  }

  public selectedPlanId: any = null;
  public selectedPlan: any = null;
  selectPlan(plan) {
    this.selectedPlanId = plan._id;
    this.selectedPlan = plan;
    console.log('selected plan', plan);
    this.getTodayLesson();
  }
  public todayCourse: any = [];
  getTodayLesson() {
    this._service
      .gettodayLesson(
        this.regionID,
        this.locationID,
        this.todayDate,
        this.word,
        this.selectedPlanId
      )
      .subscribe(
        (res: any) => {
          console.log(this.todayCourse);

          this.todayCourse = res;
          console.log('tday lessons', this.todayCourse);
        },
        err => {
          console.log(err);
          this.toastr.error(err.error.message);
        }
      );
  }

  public todayModal: Date = new Date();
  onDateSelect(event) {
    let year = event.year;
    let month = event.month <= 9 ? '0' + event.month : event.month;
    let day = event.day <= 9 ? '0' + event.day : event.day;
    let final = new Date(year + '-' + month + '-' + day);
    var momentToday = moment(final).toDate();
    console.log('####', momentToday);
    this.todayModal = momentToday;
    console.log('iso format', this.todayModal.toISOString());
    this.todayDate = this.todayModal;
    // this.calendarToggle();
    this.getTodayLesson();
  }
  public showCalendar: boolean = false;
  calendarToggle() {
    this.showCalendar = !this.showCalendar;
    console.log('calendarToggle', this.showCalendar);
  }

  stopEvent(e) {
    e.stopPropagation();
  }

  closeInvModal(obj) {
    console.log(obj);
    this.closeModal();
    this.refresh();
  }

  removePlan(e) {
    e.stopPropagation();
    this.selectedPlan = null;
    this.selectedPlanId = null;
    this.getTodayLesson();
  }

  onEnter() {
    this.getTodayLesson();
    console.log('search search', this.word);
  }
  public coursePlanFlag: any;
  planToggle() {
    this.coursePlanFlag = !this.coursePlanFlag;
  }
  //enroll modal
}
