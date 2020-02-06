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
  public locationId: any;
  public locationID = localStorage.getItem('locationId');
  public detailLists: any = {};
  public draft: boolean;
  public courseType: any;
  public disabledTab: boolean = true;
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
      console.log('CourseID', this.courseId);
    });
    this.getCourseDetail(this.courseId);
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
        this.locationId = res.locationId;
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
