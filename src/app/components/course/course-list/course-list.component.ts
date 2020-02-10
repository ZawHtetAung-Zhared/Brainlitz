import { Component, OnInit, HostListener } from '@angular/core';

import { appService } from '../../../service/app.service';
import { DataService } from '../../../service/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  private regionId = localStorage.getItem('regionId');
  private locationID = localStorage.getItem('locationId');
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
  private selectedCourseList: any;
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
  private loading: boolean;
  private iscourseSearch: boolean = false;
  private searchVal = '';
  public isoutSideClick: boolean = false;
  public iswordcount: boolean = false;

  constructor(
    private _service: appService,
    public dataservice: DataService,
    private router: Router
  ) {
    this._service.goCourseCreate.subscribe(() => {
      this.courseList = [];
      console.log('go to cc');
      this.courseList = [];
      this.isCategory = false;
      this.isPlan = false;
      this.goBackCat = false;
      this.isCourseCreate = true;
      window.scroll(0, 0);
    });

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

    this._service.goCourseDetail.subscribe(() => {
      // console.log('go back CDetail', this.courseId);
      this.isCategory = false;
      this.isPlan = false;
      this.goBackCat = false;
      this.isCourseCreate = false;
      // this.isCourseDetail = true;
      // this.showCourseDetail(this.courseId);
      this.courseList = [];
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
  private oldValue = 0;
  @HostListener('window:scroll', ['$event']) onScroll($event) {
    if (window.pageYOffset > 81) {
      this.isSticky = true;
    } else {
      this.isSticky = false;
    }

    // if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    //   console.log("On Scroll Down");
    //   //Write logic here for loading new content.
    //   if(this.courseCollection.totalPages - this.courseCollection.current_page > 0){
    //     console.log("~~~~~~~~")
    //     // this.page = this.page + 1;
    //     // this.skip = this.courseCollection.courses.length;
    //     // this.getCoursesPerPlan(this.selectedPlan,this.limit,this.skip,this.page)
    //   }
    // }

    // infinite scroll
    // Get the new Value
    let newValue = window.pageYOffset;

    //Subtract the two and conclude
    if (this.oldValue - newValue < 0) {
      console.log('Direction Down');
      if (this.courseCollection != null) {
        if (
          this.loading == false &&
          this.courseCollection.courses.length == this.limit
        ) {
          console.log('call next page');
          this.page = this.page + 1;
          this.skip = this.courseCollection.courses.length;
          this.getCoursesPerPlan(
            this.selectedPlan,
            this.limit,
            this.skip,
            this.page
          );
        }
      }
    } else if (this.oldValue - newValue > 0) {
      console.log('Direction Up');
    }
    // Update the old value
    this.oldValue = newValue;
  }

  ngOnInit() {
    // this.dataservice.currentCourse.subscribe(cID => (this.cID = cID));
    // if (this.cID != '') {
    //   setTimeout(() => {
    //     this.showCourseDetail(this.cID);
    //   }, 300);
    // }

    // this.dataservice.cId.subscribe(cid => (this.courseId = cid));
    // if (this.courseId != '') {
    //   setTimeout(() => {
    //     this.showCourseDetail(this.courseId);
    //   }, 300);
    // }

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

    this._service.permissionList.subscribe(data => {
      if (this.router.url === '/course') {
        this.permissionType = data;
        this.checkPermission();
      }
    });

    this.getRegionInfo();
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

  getRegionInfo() {
    this.token = localStorage.getItem('token');
    this.type = localStorage.getItem('tokenType');
    this._service
      .getRegionalAdministrator(this.regionId, this.token, this.type)
      .subscribe((res: any) => {
        console.log('regional info', res);
        // if (
        //   res.invoiceSettings == {} ||
        //   res.invoiceSettings == undefined ||
        //   res.paymentSettings == {} ||
        //   res.paymentSettings == undefined
        // ) {
        //   console.log('no invoice setting', res.invoiceSettings);
        //   console.log('no invoice setting', res.paymentSettings);
        //   this.invoiceInfo = {
        //     address: '',
        //     city: '',
        //     companyName: '',
        //     email: '',
        //     prefix: '',
        //     registration: ''
        //   };
        //   this.noSetting = true;
        // } else {
        //   console.log('has invoice setting');
        //   this.invoiceInfo = res.invoiceSettings;
        //   this.noSetting = false;
        // }
        // console.log(this.invoiceInfo);
      });
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
          this.getCourseswithPlanId(0, '');
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
    this._service
      .getCourseplanCollection(this.regionId, this.locationID)
      .subscribe((res: any) => {
        this.coursePlanCollection = res;
        let autoSelectedPlanId = this.coursePlanCollection[0]._id;
        let autoSelectedPlanName = this.coursePlanCollection[0].name;
        this.getCourseswithPlanId(autoSelectedPlanId, autoSelectedPlanName);
      });
  }

  getCoursesPerPlan(courseplanId, limit, skip, page) {
    console.log(limit, skip, page);
    this.loading = true;
    this._service
      .getCoursesPerPlan(
        this.regionId,
        this.locationID,
        courseplanId,
        limit,
        skip,
        page,
        'down'
      )
      .subscribe(
        (res: any) => {
          console.log(res);
          this.loading = false;
          if (res != null) {
            this.courses = this.courses.concat(res.courses);
            this.courseCollection = res;
            this.courseCollection.courses = this.courses;
            console.log('courseCollection', this.courseCollection);
          }
        },
        err => {
          console.log(err);
        }
      );
  }

  D(data) {
    return (data < 10 ? '0' : '') + data;
  }

  getCourseswithPlanId(courseplanId, planName) {
    this.courseCollection = null;
    this.skip = 0;
    this.page = 1;
    this.courses = [];
    console.log('courseplanId:', courseplanId, '& planName:', planName);
    this.selectedPlan = courseplanId;
    this.getCoursesPerPlan(this.selectedPlan, this.limit, this.skip, this.page);
    // this.selectedCourseList = this.courseList[index];
    // console.log(this.selectedCourseList);
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
    this.goBackCat = false;
    this.isCourseCreate = true;
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
    //add this line to change route for course create and need to change in coursecreate.ts for redirect to course when click back button
    // this.router.navigate(['/coursecreate']);
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

  showCourseDetail(courseId) {
    this.router.navigate(['/coursedetail', courseId]);
  }

  focusCourseSearch() {
    // console.log('focusing ...');
    this.iscourseSearch = true;
    this.isoutSideClick = false;
    console.log(this.recentLists);
  }

  clickoutSide() {
    this.isoutSideClick = true;
    this.iscourseSearch = false;
    console.log('click out side >>>>>>>>>>\n:::::::::::::\n::::::::::::::');
  }

  searchStart(e, limit, skip) {
    if (e.keyCode == 13) {
      this.courseList = [];
      this.recentLists.unshift(e.target.value);
      //this.blockUI.start('Loading...');
      this._service
        .simpleCourseSearch(
          this.regionId,
          e.target.value,
          this.locationID,
          limit,
          skip
        )
        .subscribe(
          (res: any) => {
            console.log('course search', res);
            if (res.length != 0) {
              this.courses = [];
              this.selectedPlan = res[0].coursePlan.coursePlanId;
              this.getCoursesPerPlan(
                this.selectedPlan,
                this.limit,
                this.skip,
                this.page
              );
            }
          },
          err => {
            console.log(err);
          }
        );
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

  clearSearch() {
    this.iswordcount = false;
    this.iscourseSearch = false;
    this.searchVal = '';
    this.getAllCourseplan();
  }

  searchCourse(val) {
    if (val.length > 0) {
      console.log('search');
      this.iswordcount = true;
      this.iscourseSearch = true;
    } else {
      console.log('clear search');
      this.iswordcount = false;
      this.iscourseSearch = false;
    }
  }

  recentSearch(val, limit, skip) {
    this.courseList = [];
    this.searchVal = val;
    this._service
      .simpleCourseSearch(this.regionId, val, this.locationID, limit, skip)
      .subscribe(
        (res: any) => {
          console.log(res);
          this.iswordcount = false;
          this.iscourseSearch = false;
        },
        err => {
          console.log(err);
        }
      );
  }
}
