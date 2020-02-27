import { Component, OnInit, HostListener } from '@angular/core';

import { appService } from '../../../service/app.service';
import { DataService } from '../../../service/data.service';
import { Router } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  private permissionSubscription: ISubscription;
  private regionId = localStorage.getItem('regionId');
  private locationID = localStorage.getItem('locationId');
  private courseTypeDisabled = environment.courseTypeDisabled;
  private courseList: Array<any> = [];
  private emptyCourse: boolean;
  private gtxtColor: any;
  private gbgColor: any;
  private locationName: any;
  private permissionType: any;
  private coursePermission: any = [];
  private courseDemo: any = [];
  private token: any;
  private type: any;
  private recentLists: Array<any> = [];
  private selectedPlan: any;
  private isCategory: boolean = false;
  private goBackCat: boolean = false;
  private isPlan: boolean = false;
  private isCourseCreate: boolean = false;
  private editplanId: any;
  private isCoursePlanDetail: boolean = false;
  private singlePlanData: any = {};
  private planCategory: any;
  private isSticky = false;
  private scrollDirection = '';
  private coursePlanCollection: Array<any> = [];
  private courseCollection;
  private courses = [];
  private page = 1;
  private limit = 10;
  private skip = 0;
  private courseLoading: boolean;
  private coursePlanLoading: boolean = false;
  private iscourseSearch: boolean = false;
  private searchVal = '';
  public isoutSideClick: boolean = false;
  public iswordcount: boolean = false;
  private isMidStick: boolean = false;
  private navIsFixed: boolean = false;
  private oldValue = 0;
  private searchKeyword: any = null;
  private activePlanId: any = '';
  private removeHeight: boolean = false;
  private coursesResLength;

  constructor(
    private _service: appService,
    public dataservice: DataService,
    private router: Router,
    public toastr: ToastrService
  ) {
    this._service.goplan.subscribe(() => {
      this.courseList = [];
      console.log('muuuu');
      this.courseList = [];
      this.isCategory = false;
      this.isPlan = true;
      this.goBackCat = true;
    });

    this._service.goCat.subscribe(() => {
      this.courseList = [];
      console.log('goback22', this.goBackCat);
      this.goBackCat = false;
      this.isCategory = true;
      this.isPlan = false;
      this.courseList = [];
    });

    this._service.goCourse.subscribe(() => {
      console.log('goback33 in course');
      this.isCategory = false;
      this.isPlan = false;
      this.goBackCat = false;
      this.isCourseCreate = false;
      // this.isTodayLesson = false;
      this.courseList = [];
      console.log(this.courseList.length);
    });

    this._service.goPlanDetail.subscribe(() => {
      // console.log('go back PlanDetail', this.courseId);
      this.isCategory = false;
      this.isPlan = false;
      this.goBackCat = false;
      this.isCourseCreate = false;
      this.isCoursePlanDetail = false;
      this.getCoursePlanDetail(this.editplanId, 'goback');
      this.courseList = [];
    });
  }

  @HostListener('window:scroll', ['$event']) onScroll($event) {
    if (window.pageYOffset > 81) {
      this.isSticky = true;
      this.isMidStick = false;
      this.navIsFixed = true;
      var element = document.getElementById('notibar2');
      if (typeof element == 'undefined' || element == null) {
        $('.p-top').css({ 'padding-top': '0px' });
      }
    } else {
      this.isSticky = false;
      this.navIsFixed = false;
    }

    this.isMidStick =
      window.pageYOffset > 45 && window.pageYOffset < 81 ? true : false;

    // if (window.innerHeight + window.scrollY === document.body.scrollHeight) {
    //   console.log('bottom');
    //   this.continuousScroll();
    // }

    this.continuousScroll();
  }

  scrollToActiveElement(activePlan) {
    console.log('scrollToActiveElement', activePlan);
    setTimeout(() => {
      var topPos = document.getElementById(activePlan).offsetTop;
      console.log(topPos);
      document.getElementById('sidenav-wrap').scrollTop = topPos - 155;
      console.log(
        '~~~~~~',
        (document.getElementById('sidenav-wrap').scrollTop = topPos - 155)
      );
    }, 200);
  }

  continuousScroll() {
    // infinite scroll
    // Get the new Value
    let newValue = window.pageYOffset;

    //Subtract the two and conclude
    if (this.oldValue - newValue < 0) {
      // console.log('Direction Down', window.pageYOffset);
      if (
        this.courseCollection != null &&
        window.innerHeight + window.scrollY === document.body.scrollHeight
      ) {
        //for current plan ID
        if (
          this.courseLoading == false &&
          this.courseCollection.current_page < this.courseCollection.totalPages
        ) {
          //for next page
          console.log('call next page');
          this.page = this.page + 1;
          this.skip = this.courseCollection.courses.length;
          if (this.searchKeyword == null || this.searchKeyword == undefined) {
            this.getCoursesPerPlan(
              this.selectedPlan,
              this.limit,
              this.skip,
              this.page,
              'onScroll'
            );
          } else {
            this.simpleCourseSearchPerPlan(
              this.selectedPlan,
              this.limit,
              this.skip,
              this.page,
              this.searchKeyword
            );
          }
        }
      }
    } else if (this.oldValue - newValue > 0) {
      console.log('Direction Up');
    }
    // Update the old value
    this.oldValue = newValue;
  }

  ngOnInit() {
    this.dataservice.currentActivePlan.subscribe(
      planID => (this.activePlanId = planID)
    );
    let recentTemp = localStorage.getItem('recentSearchLists');
    this.recentLists = recentTemp == null ? [] : JSON.parse(recentTemp);
    console.log('recent lists', this.recentLists);
    console.log('0', this.recentLists[0]);
    localStorage.removeItem('categoryID');
    localStorage.removeItem('categoryName');
    setTimeout(() => {
      console.log('~~~', this.locationName);
      this.locationName = localStorage.getItem('locationName');
      this.locationID = localStorage.getItem('locationId');
      this.gtxtColor = localStorage.getItem('txtColor');
      this.gbgColor = localStorage.getItem('backgroundColor');
    }, 300);

    this.permissionSubscription = this._service.permissionList.subscribe(
      data => {
        if (this.router.url === '/course') {
          this.permissionType = data;
          this.checkPermission();
        }
      }
    );
  }

  ngOnDestroy() {
    this.permissionSubscription.unsubscribe();
  }

  checkPermission() {
    console.log(this.permissionType);
    this.coursePermission = [
      'CREATECOURSE',
      'VIEWCOURSE',
      'EDITCOURSE',
      'DELETECOURSE',
      'ASSIGNTEACHER',
      'ASSIGNSTUDENTS',
      'CREATECOURSEPLAN',
      'VIEWCOURSEPLAN',
      'EDITCOURSEPLAN'
    ];
    this.coursePermission = this.coursePermission.filter(
      value => -1 !== this.permissionType.indexOf(value)
    );
    console.log(this.coursePermission.includes('VIEWCOURSE'));

    this.courseDemo['addCourse'] = this.coursePermission.includes(
      'CREATECOURSE'
    )
      ? 'CREATECOURSE'
      : '';
    this.courseDemo['viewCourse'] = this.coursePermission.includes('VIEWCOURSE')
      ? 'VIEWCOURSE'
      : '';
    this.courseDemo['editCourse'] = this.coursePermission.includes('EDITCOURSE')
      ? 'EDITCOURSE'
      : '';
    this.courseDemo['deleteCourse'] = this.coursePermission.includes(
      'DELETECOURSE'
    )
      ? 'DELETECOURSE'
      : '';
    this.courseDemo['assignTeacher'] = this.coursePermission.includes(
      'ASSIGNTEACHER'
    )
      ? 'ASSIGNTEACHER'
      : '';
    this.courseDemo['assignStudent'] = this.coursePermission.includes(
      'ASSIGNSTUDENTS'
    )
      ? 'ASSIGNSTUDENTS'
      : '';
    this.courseDemo['createCP'] = this.coursePermission.includes(
      'CREATECOURSEPLAN'
    )
      ? 'CREATECOURSEPLAN'
      : '';
    this.courseDemo['viewCP'] = this.coursePermission.includes('VIEWCOURSEPLAN')
      ? 'VIEWCOURSEPLAN'
      : '';
    this.courseDemo['editCP'] = this.coursePermission.includes('EDITCOURSEPLAN')
      ? 'EDITCOURSEPLAN'
      : '';

    if (this.coursePermission.includes('VIEWCOURSE') != false) {
      this.locationName = localStorage.getItem('locationName');
      this.locationID = localStorage.getItem('locationId');
      this.gtxtColor = localStorage.getItem('txtColor');
      this.gbgColor = localStorage.getItem('backgroundColor');

      console.log('hi permission', this.locationName, this.locationID);
      // this.courseList = [];
      // this.getCourseLists(20, 0);
      this.coursePlanCollection = [];
      this.getAllCourseplan();
    } else {
      console.log('permission deny');
      // this.courseList = [];
      this.coursePlanCollection = [];
    }
  }

  getCourseLists(limit, skip) {
    this._service
      .getAllCourse(this.regionId, this.locationID, limit, skip)
      .subscribe((res: any) => {
        console.log('Course List', res);
        this.courseList = this.courseList.concat(res);
        console.log(this.courseList);
        console.log(this.courseList.length);
        if (this.courseList.length > 0) {
          // this.getCourseswithPlanId(0, '');
          this.emptyCourse = false;
          for (var i in this.courseList) {
            let duration = this.courseList[i].coursePlan.lesson.duration;
            for (var j in this.courseList[i].courses) {
              let date = this.courseList[i].courses[j].startDate;
              if (date) {
                let starttime = date.substring(
                  date.search('T') + 1,
                  date.search('Z') - 7
                );
                let piece = starttime.split(':');
                let mins = piece[0] * 60 + +piece[1] + +duration;
                let endtime =
                  this.D(((mins % (24 * 60)) / 60) | 0) +
                  ':' +
                  this.D(mins % 60);
                this.courseList[i].courses[j].courseDuration = {
                  starttime: starttime,
                  endtime: endtime
                };
              }
            }
          }
        } else {
          this.emptyCourse = true;
        }
      });
  }

  getAllCourseplan() {
    this.coursePlanLoading = true;
    this._service
      .getCourseplanCollection(this.regionId, this.locationID, null)
      .subscribe(
        (res: any) => {
          this.coursePlanLoading = false;
          this.coursePlanCollection = res;
          let autoSelectedPlanId;
          let autoSelectedPlanName;
          if (this.activePlanId == '' || this.activePlanId == null) {
            autoSelectedPlanId = this.coursePlanCollection[0]._id;
            autoSelectedPlanName = this.coursePlanCollection[0].name;
          } else {
            autoSelectedPlanId = this.activePlanId;
            autoSelectedPlanName = '';
          }
          this.getCourseswithPlanId(
            autoSelectedPlanId,
            autoSelectedPlanName,
            null
          );
          this.scrollToActiveElement(autoSelectedPlanId);
        },
        err => {
          console.log(err);
          this.coursePlanLoading = true;
          this.toastr.error('Get Course Plan Fail');
        }
      );
  }

  getCoursesPerPlan(courseplanId, limit, skip, page, from) {
    console.log('call getCoursesPerPlan from', from);
    console.log(limit, skip, page);
    this.courseLoading = true;
    this._service
      .getCoursesPerPlan(
        this.regionId,
        this.locationID,
        courseplanId,
        limit,
        skip,
        page,
        'down',
        null
      )
      .subscribe(
        (res: any) => {
          console.log(res);
          this.courseLoading = false;
          if (res != null) {
            this.courses = this.courses.concat(res.courses);
            this.coursesResLength = res.courses.length;
            this.courseCollection = res;
            this.courseCollection.courses = this.courses;
            console.log('courseCollection', this.courseCollection);
            this.checkCoursesLength();
          }
        },
        err => {
          this.courseLoading = true;
          console.log(err);
          this.toastr.error('Get Courses Fail');
        }
      );
  }

  checkCoursesLength() {
    //check courses length for content-wrapper height for background color
    if (this.courseCollection.courses.length > 2) {
      this.removeHeight = true;
    } else {
      this.removeHeight = false;
    }
  }

  D(data) {
    return (data < 10 ? '0' : '') + data;
  }

  getCourseswithPlanId(courseplanId, planName, keyword) {
    this.courseCollection = null;
    this.skip = 0;
    this.page = 1;
    this.courses = [];
    console.log('courseplanId:', courseplanId, '& planName:', planName);
    this.selectedPlan = courseplanId;
    if (keyword == null || keyword == undefined) {
      this.getCoursesPerPlan(
        this.selectedPlan,
        this.limit,
        this.skip,
        this.page,
        'autoCall'
      );
    } else {
      this.simpleCourseSearchPerPlan(
        this.selectedPlan,
        this.limit,
        this.skip,
        this.page,
        keyword
      );
    }
  }
  changeRoute() {
    this.goBackCat = false;
    this.isCategory = true;
    localStorage.removeItem('cpCategory');
    localStorage.removeItem('editCPId');
  }
  addNewCourse(plan) {
    localStorage.removeItem('courseID');
    localStorage.removeItem('tempObj');
    let planObj = {
      name: plan.name,
      id: plan.coursePlanId,
      duration: plan.lesson.duration,
      paymentPolicy: plan.paymentPolicy,
      from: 'courses',
      description: plan.description
    };

    localStorage.setItem('cPlan', JSON.stringify(planObj));
    localStorage.removeItem('courseID');
    // goBackCat & isCourseCreate are using for service which is no need to use if u redirect to course create
    // this.goBackCat = false;
    // this.isCourseCreate = true;
    //add this line to change route for course create and need to change in coursecreate.ts for redirect to course when click back button
    this.router.navigate(['/coursecreate']);
  }

  showCPDetail(planID) {
    console.log('cp');
    this.editplanId = planID;
    console.log('hi', planID);
    this.isCoursePlanDetail = false;
    this.getCoursePlanDetail(planID, 'edit');
  }

  getCoursePlanDetail(planID, type) {
    //this.blockUI.start('Loading...');
    this._service.getSinglePlan(planID, this.locationID).subscribe(
      (res: any) => {
        //this.blockUI.stop();
        this.singlePlanData = res;
        this.planCategory = res.category;
        if (type == 'edit') {
          this.goToCoursePlan(planID);
        }
      },
      err => {
        console.log(err);
      }
    );
  }
  goToCoursePlan(planId) {
    localStorage.setItem('editCPId', planId);
    localStorage.setItem('cpCategory', JSON.stringify(this.planCategory));
    this.isCoursePlanDetail = false;
    this.isCategory = true;
    this.goBackCat = false;
  }

  showCourseDetail(course) {
    if (course.draft == true) {
      this.goToCourseEditForm(course._id);
    } else {
      this.router.navigate(['/coursedetail', course._id]);
    }
  }

  goToCourseEditForm(courseId) {
    //both conflit and edit use this type 'edit' and localStorage.setItem("courseID") is also used in schedule
    let obj = {
      courseId: courseId,
      type: 'edit'
    };
    localStorage.setItem('courseID', JSON.stringify(obj));
    localStorage.removeItem('cPlan');
    localStorage.removeItem('tempObj');
    this.router.navigate(['/coursecreate']);
  }

  enrollCustomer(courseId) {
    localStorage.setItem('userType', 'customer');
    localStorage.setItem('COURSEID', courseId);
    localStorage.setItem('course_id', courseId);
    this.router.navigateByUrl(`/coursedetail/${courseId}/enroll`);
  }

  focusCourseSearch() {
    // console.log('focusing ...');
    this.iscourseSearch = true;
    this.isoutSideClick = false;
    console.log(this.recentLists);
  }

  clickoutSide() {
    this.iscourseSearch = false;
    this.isoutSideClick = true;
    console.log('click out side >>>>>>>>>>\n:::::::::::::\n::::::::::::::');
  }

  searchStart(e, limit, skip) {
    if (e.keyCode == 13) {
      this.courseList = [];
      this.recentLists.unshift(e.target.value);
      this.searchKeyword = e.target.value;
      this.simpleCoursePlanSearch(e.target.value);
      if (this.recentLists.length > 3) {
        console.log(this.recentLists);
        this.recentLists = this.recentLists.slice(0, 3);
      }
      localStorage.setItem(
        'recentSearchLists',
        JSON.stringify(this.recentLists)
      );
    }
  }

  simpleCoursePlanSearch(keyword) {
    console.log('keyword', keyword);
    this.coursePlanLoading = true;
    this._service
      .getCourseplanCollection(this.regionId, this.locationID, keyword)
      .subscribe(
        (res: any) => {
          this.coursePlanLoading = false;
          this.iscourseSearch = false;
          this.coursePlanCollection = res;
          if (this.coursePlanCollection.length > 0) {
            let autoSelectedPlanId = this.coursePlanCollection[0]._id;
            let autoSelectedPlanName = this.coursePlanCollection[0].name;
            this.getCourseswithPlanId(
              autoSelectedPlanId,
              autoSelectedPlanName,
              keyword
            );
          } else {
            //for no course plan
            this.courseCollection = null;
          }
        },
        err => {
          this.coursePlanLoading = true;
          console.log(err);
          this.toastr.error('Get Course Plan Fail');
        }
      );
  }

  simpleCourseSearchPerPlan(courseplanId, limit, skip, page, keyword) {
    this.courseLoading = true;
    this._service
      .getCoursesPerPlan(
        this.regionId,
        this.locationID,
        courseplanId,
        limit,
        skip,
        page,
        'down',
        keyword
      )
      .subscribe(
        (res: any) => {
          console.log(res);
          this.courseLoading = false;
          if (res != null) {
            this.courses = this.courses.concat(res.courses);
            this.courseCollection = res;
            this.courseCollection.courses = this.courses;
            console.log('courseCollection', this.courseCollection);
            this.checkCoursesLength();
          }
        },
        err => {
          console.log(err);
          this.courseLoading = true;
          this.toastr.error('Get Courses Fail');
        }
      );
  }

  clearSearch() {
    this.iswordcount = false;
    this.iscourseSearch = false;
    this.isoutSideClick = false;
    this.searchVal = '';
    this.searchKeyword = null;
    this.activePlanId = null;
    this.getAllCourseplan();
  }

  searchCourse(val) {
    if (val.length > 0) {
      console.log('search');
      this.iswordcount = true;
      this.iscourseSearch = true;
    } else {
      console.log('clear search');
      this.clearSearch();
    }
  }

  recentSearch(val, limit, skip) {
    this.courseList = [];
    this.searchVal = val;
    this.searchKeyword = val;
    this.iswordcount = true;
    this.simpleCoursePlanSearch(this.searchVal);
  }
}
