import { Component, OnInit } from '@angular/core';

import { appService } from '../../service/app.service';
import { DataService } from '../../service/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  public regionId = localStorage.getItem('regionId');
  public locationID = localStorage.getItem('locationId');
  public courseList: Array<any> = [];
  public emptyCourse: boolean;
  public gtxtColor: any;
  public gbgColor: any;
  public locationName: any;
  public permissionType: any;
  public coursePermission: any = [];
  public courseDemo: any = [];
  public token: any;
  public type: any;
  public recentLists: Array<any> = [];
  public selectedCourseList: any;
  public selectedPlan: any;

  constructor(
    private _service: appService,
    public dataservice: DataService,
    private router: Router
  ) {}

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
      this.courseList = [];
      this.getCourseLists(20, 0);
    } else {
      console.log('permission deny');
      this.courseList = [];
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
          this.getCourseswithPlanId(0);
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

  D(data) {
    return (data < 10 ? '0' : '') + data;
  }

  getCourseswithPlanId(index) {
    this.selectedPlan = this.courseList[index].coursePlan.coursePlanId;
    this.selectedCourseList = this.courseList[index];
    console.log(this.selectedCourseList);
  }
}
