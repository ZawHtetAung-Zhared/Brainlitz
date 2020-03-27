import { Component, OnInit, HostListener } from '@angular/core';

import { appService } from '../../../service/app.service';
import { DataService } from '../../../service/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment';
import { createIf } from 'typescript';

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
  private courseListLoading: boolean = false;
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
  private scrollType = 'auto-call';

  constructor(
    private _service: appService,
    public dataservice: DataService,
    private router: Router,
    private route: ActivatedRoute,
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

  scrollHandler(e) {
    console.log('scroll handler~~~~~~~~~~~~', e);
    // should log top or bottom
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
      var activeplanElement = document.getElementById(activePlan);
      if (
        activePlan != null ||
        activePlan != undefined ||
        activeplanElement != null ||
        activeplanElement != undefined
      ) {
        console.log(activeplanElement);
        var topPos = document.getElementById(activePlan).offsetTop;
        console.log(topPos);
        document.getElementById('sidenav-wrap').scrollTop = topPos - 155;
        console.log(
          '~~~~~~',
          (document.getElementById('sidenav-wrap').scrollTop = topPos - 155)
        );
      }
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
        //bottom of the page
        // console.log("bottom of the page")
        if (
          this.courseLoading == false &&
          this.courseCollection.current_page < this.courseCollection.totalPages
        ) {
          //for next page
          // console.log('call next page');
          this.page = this.page + 1;
          this.skip = this.courseCollection.courses.length;
          this.getCoursesPerPlan(
            this.selectedPlan,
            this.limit,
            this.skip,
            this.page,
            this.searchKeyword,
            'down'
          );
        } else {
          // console.log('call next plan');
          // this.getCoursesForNextPlan();
        }
      }
    } else if (this.oldValue - newValue > 0) {
      // console.log('Direction Up');
      if (window.scrollY == 0) {
        // console.log('scroll Type~~~~~~~~', this.scrollType);
        // console.log('top of the page');

        if (this.scrollType != 'next-plan') {
          console.log('~~~~~call previous plan');
          // this.getCoursesForPreviousPlan();
        }
      }
    }
    // Update the old value
    this.oldValue = newValue;
  }

  getCoursesForNextPlan() {
    for (var index in this.coursePlanCollection) {
      let item = this.coursePlanCollection[index];
      let nextIdx = Number(index) + 1;
      if (
        item._id == this.selectedPlan &&
        nextIdx < this.coursePlanCollection.length
      ) {
        let nextPlanId = this.coursePlanCollection[nextIdx]._id;
        let nextPlanName = this.coursePlanCollection[nextIdx].name;
        console.log('nextPlanId', nextPlanId, ',nextPlanName', nextPlanName);
        this.getCourseswithPlanId(
          nextPlanId,
          nextPlanName,
          this.searchKeyword,
          'down'
        );
        break;
      }
    }
  }

  getCoursesForPreviousPlan() {
    for (var index in this.coursePlanCollection) {
      let item = this.coursePlanCollection[index];
      let previousIdx = Number(index) - 1;
      if (item._id == this.selectedPlan && previousIdx >= 0) {
        let prevPlanId = this.coursePlanCollection[previousIdx]._id;
        let prevPlanName = this.coursePlanCollection[previousIdx].name;
        console.log(
          'previousPlanId',
          prevPlanId,
          ',previousPlanName',
          prevPlanName
        );
        this.getCourseswithPlanId(prevPlanId, prevPlanName, null, 'up');
        break;
      }
    }
  }

  ngOnInit() {
    this.dataservice.currentActivePlan.subscribe(
      planID => (this.activePlanId = planID)
    );
    console.log('currentActivePlan', this.activePlanId);
    this.searchKeyword = this.dataservice.getCourseSearchWord();
    // this.searchVal = this.searchKeyword == null ? '' : this.searchKeyword;
    if (this.searchKeyword == null) {
      this.searchVal = '';
      this.iswordcount = false;
    } else {
      this.searchVal = this.searchKeyword;
      this.iswordcount = true;
    }
    console.log('SearchWord~~~', this.searchKeyword);
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
    // console.log(this.coursePermission.includes('VIEWCOURSE'));

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
      this.getAllCourseplan(this.searchKeyword);
    } else {
      console.log('permission deny');
      // this.courseList = [];
      this.coursePlanCollection = [];
    }
  }

  getCourseswithPlanId(courseplanId, planName, keyword, scrollType) {
    this.courseCollection = null;
    this.skip = 0;
    this.page = 1;
    this.courses = [];
    console.log('courseplanId:', courseplanId, '& planName:', planName);
    this.selectedPlan = courseplanId;
    this.getCoursesPerPlan(
      this.selectedPlan,
      this.limit,
      this.skip,
      this.page,
      keyword,
      scrollType
    );
  }

  getAllCourseplan(keyword) {
    console.log(keyword);
    this.coursePlanLoading = true;

    if (keyword == undefined || keyword == null || keyword == '') {
      this.searchKeyword = null;
      this.searchVal = null;
      this.iswordcount = false;
    } else {
      keyword = keyword.match(/^\s*$/) != null ? '' : keyword;
      if (keyword.match(/^\s*$/) != null) {
        this.searchKeyword = null;
        this.searchVal = null;
        this.iswordcount = false;
      }
    }

    this._service
      .getCourseplanCollection(this.regionId, this.locationID, keyword)
      .subscribe(
        (res: any) => {
          this.coursePlanLoading = false;
          this.iscourseSearch = false;
          this.coursePlanCollection = res;
          let autoSelectedPlanId;
          let autoSelectedPlanName;
          if (this.coursePlanCollection.length > 0) {
            if (
              this.activePlanId == '' ||
              this.activePlanId == null ||
              this.activePlanId == undefined
            ) {
              autoSelectedPlanId = this.coursePlanCollection[0]._id;
              autoSelectedPlanName = this.coursePlanCollection[0].name;
            } else {
              autoSelectedPlanId = this.activePlanId;
              autoSelectedPlanName = '';
            }
            this.getCourseswithPlanId(
              autoSelectedPlanId,
              autoSelectedPlanName,
              keyword,
              'down'
            );
            this.scrollToActiveElement(autoSelectedPlanId);
          } else {
            //for no course plan
            this.courseCollection = null;
          }
        },
        err => {
          console.log(err);
          this.coursePlanLoading = true;
          this.toastr.error('Get Course Plan Fail');
        }
      );
  }

  private firstPageLoading: boolean = false;
  getCoursesPerPlan(courseplanId, limit, skip, page, keyword, scrollType) {
    // this.scrollType = scrollType;
    console.log('call getCoursesPerPlan from', scrollType);
    console.log(limit, skip, page);
    this.courseLoading = true;
    this.courseListLoading = true;
    // let scrollDirection = scrollType == 'prev-plan' ? 'up' : 'down';
    this._service
      .getCoursesPerPlan(
        this.regionId,
        this.locationID,
        courseplanId,
        limit,
        skip,
        page,
        scrollType,
        keyword
      )
      .subscribe(
        (res: any) => {
          this.courseLoading = false;
          this.courseListLoading = false;
          if (res != null) {
            this.courses = this.courses.concat(res.courses);
            this.coursesResLength = res.courses.length;
            this.courseCollection = res;
            this.courseCollection.courses = this.courses;
            console.log('courseCollection', this.courseCollection);
            this.checkCoursesLength();
            if (this.scrollType == 'next-plan') {
              this.scrollType = 'next-page';
            } else if (this.scrollType == 'prev-plan') {
              this.scrollType = 'prev-page';
            }
          }
        },
        err => {
          this.courseLoading = true;
          console.log(err);
          this.toastr.error('Get Courses Fail');
        }
      );
  }

  // setScrollPosition(scrollType){
  //   if(scrollType == 'next-plan'){
  //     // document.getElementById('courseWrapper').scrollTop = 155;
  //     window.scroll(0,150)
  //     console.log('scroll pos',scrollY)
  //   }
  // }

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
    // this.clearSearchHistory();
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
      this.activePlanId = '';
      this.courseList = [];
      this.recentLists.unshift(e.target.value);
      this.searchKeyword = e.target.value;
      this.dataservice.setCourseSearchWord(this.searchKeyword);
      if (this.recentLists.length > 3) {
        console.log(this.recentLists);
        this.recentLists = this.recentLists.slice(0, 3);
      }
      localStorage.setItem(
        'recentSearchLists',
        JSON.stringify(this.recentLists)
      );
      this.getAllCourseplan(this.searchKeyword);
    }
  }

  clearSearch() {
    this.iswordcount = false;
    this.iscourseSearch = false;
    this.isoutSideClick = false;
    this.searchVal = '';
    this.searchKeyword = null;
    this.activePlanId = '';
    this.clearSearchHistory();
    this.getAllCourseplan(this.searchKeyword);
  }

  clearSearchHistory() {
    this.dataservice.setCourseSearchWord(null);
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
    this.activePlanId = '';
    this.dataservice.setCourseSearchWord(this.searchVal);
    this.getAllCourseplan(this.searchVal);
  }
}
