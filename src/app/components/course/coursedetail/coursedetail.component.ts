import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { appService } from '../../../service/app.service';
import { DataService } from '../../../service/data.service';

@Component({
  selector: 'app-coursedetail',
  templateUrl: './coursedetail.component.html',
  styleUrls: ['./coursedetail.component.css']
})
export class CoursedetailComponent implements OnInit {
  private courseId: any;
  public locationID: any = localStorage.getItem('locationId');
  public locationName: any = localStorage.getItem('locationName');
  public detailLists: any = {};
  public draft: boolean;
  public courseType: any;
  public disabledTab: boolean = true;
  public permissionType: any;
  public coursedetailDemo: any = [];
  public coursePermission: any = [];
  private courseplanId: any;
  isSticky: boolean = false;
  public active = 'courses';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _service: appService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    console.log('tttttt', this.locationID, this.locationName);
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
      localStorage.setItem('course_id', this.courseId);
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
      console.log('Coursedetail Permission granted');
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
        this.courseplanId = res.coursePlan.coursePlanId;
        this.locationID = res.locationId;
        this.draft = res.draft;
        this.courseType = res.type;
        if (res.lessons.length > 0) {
          this.disabledTab = false;
        } else {
          this.disabledTab = true;
        }
        console.log('res.sparkWerkz', res.sparkWerkz);

        localStorage.setItem('SPC', res.sparkWerkz.sparkWerkzCourse);
        console.log('SPC set', res.sparkWerkz.sparkWerkzCourse);

        localStorage.setItem('courseDetail', JSON.stringify(res));
      },
      err => {
        console.log(err);
      }
    );
  }

  editCourse(courseId) {
    //both conflit and edit use this type 'edit' and localStorage.setItem("courseID") is also used in schedule
    let obj = {
      courseId: courseId,
      type: 'edit'
    };
    localStorage.setItem('courseID', JSON.stringify(obj));
    localStorage.removeItem('cPlan');
    localStorage.removeItem('tempObj');
    this.router.navigate(['/coursecreate']);
    // this.goBackCat = false;
    // this.isCourseDetail = false;
    // this.isCourseCreate = true;
    // this.router.navigate(['/courseCreate'])
  }

  backToCourses() {
    // this.router.navigate(['/course'])
    this.router.navigate(['/course']);
    this.dataService.navagateActivePlan(this.courseplanId);
  }
}
