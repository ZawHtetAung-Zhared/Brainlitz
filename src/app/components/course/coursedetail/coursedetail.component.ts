import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { appService } from '../../../service/app.service';

@Component({
  selector: 'app-coursedetail',
  templateUrl: './coursedetail.component.html',
  styleUrls: ['./coursedetail.component.css']
})
export class CoursedetailComponent implements OnInit {
  private courseId: any;
  public locationID: any;
  public locationName: any;
  public detailLists: any = {};
  public draft: boolean;
  public courseType: any;
  public disabledTab: boolean = true;
  public permissionType: any;
  public coursedetailDemo: any = [];
  public coursePermission: any = [];
  isSticky: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _service: appService
  ) {}

  ngOnInit() {
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
      },
      teacher: {
        profilePic: '../../../../assets/images/profile.svg'
      }
    };

    this.route.params.subscribe(params => {
      this.courseId = params.id;
      localStorage.setItem('COURSEID', this.courseId);
      console.log('CourseID', this.courseId);
    });
    this.getCourseDetail(this.courseId);
    console.log('CDRU', this.router.url.includes('coursedetail'));
    this._service.permissionList.subscribe(data => {
      if (this.router.url.includes('coursedetail')) {
        this.permissionType = data;
        this.checkPermission();
        console.log('CourseDetail Permission check');
      }
    });
  }

  checkPermission() {
    console.log(this.permissionType);
    this.coursePermission = [
      'ASSIGNTEACHER',
      'ASSIGNSTUDENTS',
      'CREATECOURSEPLAN',
      'VIEWCOURSEPLAN',
      'EDITCOURSEPLAN'
    ];
    this.coursePermission = this.coursePermission.filter(
      value => -1 !== this.permissionType.indexOf(value)
    );
    console.log(this.coursePermission.includes('VIEWCOURSEPLAN'));

    this.coursedetailDemo['assignTeacher'] = this.coursePermission.includes(
      'ASSIGNTEACHER'
    )
      ? 'ASSIGNTEACHER'
      : '';
    this.coursedetailDemo['assignStudent'] = this.coursePermission.includes(
      'ASSIGNSTUDENTS'
    )
      ? 'ASSIGNSTUDENTS'
      : '';
    this.coursedetailDemo['createCP'] = this.coursePermission.includes(
      'CREATECOURSEPLAN'
    )
      ? 'CREATECOURSEPLAN'
      : '';
    this.coursedetailDemo['viewCP'] = this.coursePermission.includes(
      'VIEWCOURSEPLAN'
    )
      ? 'VIEWCOURSEPLAN'
      : '';
    this.coursedetailDemo['editCP'] = this.coursePermission.includes(
      'EDITCOURSEPLAN'
    )
      ? 'EDITCOURSEPLAN'
      : '';

    if (this.coursePermission.includes('VIEWCOURSEPLAN') != false) {
      this.locationName = localStorage.getItem('locationName');
      this.locationID = localStorage.getItem('locationId');
      console.log('Coursedetail Permission granted');
      // this.gtxtColor = localStorage.getItem('txtColor');
      // this.gbgColor = localStorage.getItem('backgroundColor');

      // console.log('hi permission', this.locationName, this.locationID);
      // this.courseList = [];
      // this.getCourseLists(20, 0);
    } else {
      console.log('permission deny');
      // this.courseList = [];
    }
  }

  @HostListener('window:scroll', ['$event']) onScroll($event) {
    if (window.pageYOffset > 81) {
      this.isSticky = true;

      // this.showBtn = true;
    } else {
      this.isSticky = false;
      // this.showBtn = false;
    }
  }

  getCourseDetail(id) {
    this._service.getSingleCourse(id, this.locationID).subscribe(
      (res: any) => {
        this.detailLists = res;
        console.log('here details list', this.detailLists);
        this.courseId = res._id;
        this.locationID = res.locationId;
        this.draft = res.draft;
        this.courseType = res.type;
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
}
