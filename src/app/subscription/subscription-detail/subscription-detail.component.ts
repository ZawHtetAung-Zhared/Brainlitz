import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  HostListener
} from '@angular/core';
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
import { appService } from '../../service/app.service';
import * as moment from 'moment';

@Component({
  selector: 'app-subscription-detail',
  templateUrl: './subscription-detail.component.html',
  styleUrls: ['./subscription-detail.component.css']
})
export class SubscriptionDetailComponent implements OnInit {
  @Output() flag = new EventEmitter<any>();
  @Output() refresh = new EventEmitter<any>();
  @Input() planInfo;
  @Input() custDetail;

  public modalReference: any;
  public lessonFlag: boolean = false;
  public todayCourse: any = [];
  public regionID = localStorage.getItem('regionId');
  public locationID = localStorage.getItem('locationId');
  public todayDate: any;
  public showCalendar: boolean = false;
  public dateModal: Date = new Date();
  public planFlag: boolean = false;
  public searchVal: any = '';

  public selectedCourse: any = null;

  constructor(
    private modalService: NgbModal,
    private _service: appService,
    private _Activatedroute: ActivatedRoute,
    public toastr: ToastrService
  ) {}

  // @HostListener('document:click', ['$event']) clickout($event) {
  //   if ($event.target.className != 'date') {
  //     this.showCalendar = false;
  //   }
  // }

  ngOnInit() {
    console.log('cusdetail', this.custDetail);
    this.todayDate = new Date();
    this.getLessons();
    this.getCoursePlan();
  }

  backClicked() {
    this.flag.emit();
  }

  enrollLesson(modal) {
    this.getTodayLesson();
    this.modalReference = this.modalService.open(modal, {
      backdrop: 'static',
      windowClass:
        'modal-xl modal-inv d-flex justify-content-center align-items-center'
    });
  }

  continue() {
    this.lessonFlag = true;
    console.log('zha testing', this.lessonFlag);
  }

  lessonbackClicked() {
    this.lessonFlag = false;
    console.log('zha testing', this.lessonFlag);
  }

  selectCourse(obj) {
    this.selectedCourse = obj;
    console.log('selected', obj);
  }

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
  public lessonList: any = [];
  getLessons() {
    this._service
      .getLessonList(
        this.regionID,
        this._Activatedroute.snapshot.paramMap.get('userid'),
        this.planInfo._id
      )
      .subscribe(
        (res: any) => {
          console.log(res);
          this.lessonList = res;
          console.log('subbed lessons', this.lessonList);
        },
        err => {
          console.log(err);
          this.toastr.error(err.error.message);
        }
      );
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
          this.refresh.emit();
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

  calendarToggle() {
    this.showCalendar = !this.showCalendar;
    console.log('calendarToggle', this.showCalendar);
  }

  stopEvent(e) {
    e.stopPropagation();
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

  onEnter() {
    this.getTodayLesson();
    console.log('search search', this.word);
  }

  planToggle() {
    this.planFlag = !this.planFlag;
  }

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
  public selectedPlanId: any = null;
  public selectedPlan: any = null;
  selectPlan(plan) {
    this.selectedPlanId = plan._id;
    this.selectedPlan = plan;
    console.log('selected plan', plan);
    this.getTodayLesson();
  }

  closeModal() {
    this.modalReference.close();
    this.getLessons();
    this.lessonFlag = false;
    this.word = null;
    this.selectedPlanId = null;
    this.searchVal = '';
    this.selectedPlan = null;
    this.dateModal = new Date();
    this.todayModal = new Date();
    this.todayDate = new Date();
  }

  removePlan(e) {
    e.stopPropagation();
    this.selectedPlan = null;
    this.selectedPlanId = null;
    this.getTodayLesson();
  }
  public invoiceSub: any = null;
  public invoiceID2: any;
  viewInvoice(modal) {
    this.invoiceID2 = this.planInfo.invoiceId;
    this.modalReference = this.modalService.open(modal, {
      backdrop: 'static',
      windowClass:
        'modal-xl borderless modal-inv d-flex justify-content-center align-items-center'
    });
  }

  closeInvModal(obj) {
    console.log(obj);
    this.closeModal();
    this.refresh.emit();
  }
}
