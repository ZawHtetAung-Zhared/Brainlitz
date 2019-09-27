import { Component, OnInit } from '@angular/core';
import { DaterangepickerConfig } from 'ng2-daterangepicker';
import * as moment from 'moment';
import { NgbModal, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { appService } from '../../../service/app.service';
import courseSampleData from './sampleData';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'course-activities-report',
  templateUrl: './course.component.html',
  styleUrls: ['../report.component.css'] // we share same style url for all nested report component
})
export class CourseActivitiesReport implements OnInit {
  courseGroupByList = ['Location', 'Category', 'Course Plan'];
  filterList = ['Category', 'Course Plan', 'Course Name', 'Location'];
  categoryList = [];
  locationList = ['Woodland', 'Yishun', 'Admiralty', 'Bedok', 'Sembawang'];
  coursePlanList = ['Advanced', 'Beginner', 'Individual', 'Weekend'];
  courseNameList = [
    'Business Administration',
    'Management Studies',
    '3D Animation',
    'Facebook Marketing',
    'Cyber Security',
    'Math Classes',
    'Orchestra',
    'Guitar',
    'Hip Hop',
    'Piano',
    'Meditation & Yoga',
    'Health & Fitness',
    'Sports Science'
  ];
  searchResult: any;
  groupBy = 'location';
  selectedFilter: any;
  filter: any;
  modalReference: any;
  reportData: any;
  selectedFilterType: any;
  daterange: any = {};
  options: any;
  filterModel: any;
  startDate: any;
  endDate: any;
  initFilter = true;
  public regionID = localStorage.getItem('regionId');
  @BlockUI() blockUI: NgBlockUI;

  constructor(
    private daterangepickerOptions: DaterangepickerConfig,
    private modalService: NgbModal,
    private _service: appService
  ) {
    window.scroll(0, 0);
    this.daterangepickerOptions.settings = {
      locale: { format: 'd m YYYY' },
      alwaysShowCalendars: true,
      ranges: {
        Today: [moment()],
        Yesteday: [moment().subtract(1, 'days'), moment()],
        'Last Month': [moment().subtract(1, 'month'), moment()],
        'Last 3 Months': [moment().subtract(4, 'month'), moment()],
        'Last 6 Months': [moment().subtract(6, 'month'), moment()],
        'Last 12 Months': [moment().subtract(12, 'month'), moment()],
        'Last 18 Months': [moment().subtract(18, 'month'), moment()]
      }
    };
  }
  ngOnInit() {
    this.filterModel = 'Category';
    this.selectedFilter = '';
    this.selectedFilterType = '0';
    this.filter = { type: 'category', value: [] };
    this.searchResult = {
      show: false,
      value: this.categoryList
    };
    this.locationList = [];
    this.categoryList = [];
    this.coursePlanList = [];
    this.courseNameList = [];
    this.startDate = moment('04/01/2018').toISOString();
    this.endDate = moment().toISOString();
    this.options = {
      startDate: moment('04/01/2018').startOf('hour'),
      endDate: moment().startOf('hour'),
      locale: { format: 'ddd, DD MMM YYYY' },
      alwaysShowCalendars: true
    };
    console.log(courseSampleData);
    this.showReportByLocation();
    this.updateFilterType('Category');
  }
  showReportByLocation() {
    this.reportData = [];
    //this.blockUI.start('Loading...');
    this._service
      .getCourseReport(this.regionID, 'location', this.startDate, this.endDate)
      .subscribe(
        (res: any) => {
          //this.blockUI.stop();
          if (res.length) {
            this.reportData = this.getFilteredDataGroupByLocation(res);
            //this.searchResult.value = this.categoryList;
          } else {
            this.reportData = [];
          }
        },
        err => {
          this.reportData = [];
        }
      );
    // if (courseSampleData) { //check if we have data to show report
    //   this.reportData = this.getFilteredDataGroupByLocation(courseSampleData.location);
    // } else {
    //   //Not enough data to show report
    //   this.reportData = [];
    // }
  }
  showReportByCategory() {
    this.reportData = [];
    //this.blockUI.start('Loading...');
    this._service
      .getCourseReport(this.regionID, 'category', this.startDate, this.endDate)
      .subscribe(
        (res: any) => {
          //this.blockUI.stop();
          if (res.length) {
            this.reportData = this.getFilteredDataGroupByCategory(res);
          } else {
            this.reportData = [];
          }
        },
        err => {
          this.reportData = [];
        }
      );
    // if (courseSampleData) { //check if we have data to show report
    //   console.log("show Report by category");
    //   console.log(courseSampleData.category);
    //   this.reportData = [];
    //   this.reportData = this.getFilteredDataGroupByCategory(courseSampleData.category);
    //   console.log(this.reportData);
    // } else {
    //   //Not enough data to show report
    //   this.reportData = [];
    // }
  }
  showReportByCoursePlan() {
    this.reportData = [];
    //this.blockUI.start('Loading...');
    this._service
      .getCourseReport(
        this.regionID,
        'courseplan',
        this.startDate,
        this.endDate
      )
      .subscribe(
        (res: any) => {
          //this.blockUI.stop();
          if (res.length) {
            this.reportData = this.getFilteredDataGroupByCoursePlan(res);
          } else {
            this.reportData = [];
          }
        },
        err => {
          this.reportData = [];
        }
      );
    // if (courseSampleData) { //check if we have data to show report
    //   this.reportData = this.getFilteredDataGroupByCoursePlan(courseSampleData.coursePlan);
    // } else {
    //   //Not enough data to show report
    //   this.reportData = [];
    // }
  }
  getFilteredDataGroupByLocation(data) {
    let filter = this.filter;
    let _self = this;
    let res = [];

    this.locationList = [];
    this.categoryList = [];
    this.coursePlanList = [];
    this.courseNameList = [];

    if (filter.type == 'location' && filter.value.length) {
      data = data.filter(function(d) {
        return filter.value.indexOf(d.locationName) > -1;
      });
    }
    data.forEach(function(location) {
      let obj = {
        groupTypeValue: '',
        lessons: {
          absent: 0,
          present: 0,
          notTaken: 0,
          count: 0
        }
      };
      _self.locationList.push(location.locationName);
      //if filter type is location, we will push to end of this loop
      let categories = location.categories || [];

      if (filter.type == 'category' && filter.value.length) {
        categories = categories.filter(function(d) {
          return filter.value.indexOf(d.catName) > -1;
        });
      }
      categories.forEach(function(category) {
        _self.categoryList.push(category.catName);
        let coursePlans = category.coursePlans || [];
        if (filter.type == 'coursePlan' && filter.value.length) {
          coursePlans = coursePlans.filter(function(d) {
            return filter.value.indexOf(d.coursePlanName) > -1;
          });
        }

        //iterate coursePlans under categories
        coursePlans.forEach(function(coursePlan) {
          let courses = coursePlan.courses || [];
          _self.coursePlanList.push(coursePlan.coursePlanName);
          if (filter.type == 'course' && filter.value.length) {
            courses = courses.filter(function(d) {
              return filter.value.indexOf(d.courseName) > -1;
            });
          }
          //iterate courses under coursePlans
          courses.forEach(function(course) {
            _self.courseNameList.push(course.courseName);
            let lessons = course.lessons || [];
            Object.keys(lessons).forEach(function(key, index) {
              obj.lessons[key] += lessons[key];
            });
          });
        });
      });
      obj.groupTypeValue = location.locationName;
      if (obj.lessons.count > 0) {
        res.push(obj);
      }
    });

    _self.categoryList = Array.from(new Set(_self.categoryList));
    _self.locationList = Array.from(new Set(_self.locationList));
    _self.coursePlanList = Array.from(new Set(_self.coursePlanList));
    _self.courseNameList = Array.from(new Set(_self.courseNameList));
    if (_self.initFilter) {
      _self.searchResult.value = _self.categoryList;
      _self.initFilter = false;
    }
    return res;
  }

  getFilteredDataGroupByCategory(data) {
    let filter = this.filter;
    let _self = this;
    let result = [];

    this.locationList = [];
    this.categoryList = [];
    this.coursePlanList = [];
    this.courseNameList = [];

    if (filter.type == 'category' && filter.value.length) {
      data = data.filter(function(d) {
        return filter.value.indexOf(d.catName) > -1;
      });
    }
    data.forEach(function(category) {
      let obj = {
        groupTypeValue: category.catName,
        lessons: {
          absent: 0,
          present: 0,
          notTaken: 0,
          count: 0
        }
      };
      _self.categoryList.push(category.catName);
      let coursePlans = category.coursePlans || [];
      if (filter.type == 'coursePlan' && filter.value.length) {
        coursePlans = coursePlans.filter(function(d) {
          return filter.value.indexOf(d.coursePlanName) > -1;
        });
      }

      //iterate coursePlans under categories
      coursePlans.forEach(function(coursePlan) {
        _self.coursePlanList.push(coursePlan.coursePlanName);
        let courses = coursePlan.courses || [];
        if (filter.type == 'course' && filter.value.length) {
          courses = courses.filter(function(d) {
            return filter.value.indexOf(d.courseName) > -1;
          });
        }
        if (filter.type == 'location' && filter.value.length) {
          courses = courses.filter(function(d) {
            return filter.value.indexOf(d.location) > -1;
          });
        }

        //iterate courses under coursePlans
        courses.forEach(function(course) {
          _self.courseNameList.push(course.courseName);
          _self.locationList.push(course.location);
          let lessons = course.lessons || [];
          Object.keys(lessons).forEach(function(key) {
            obj.lessons[key] += lessons[key];
          });
        });
      });
      if (obj.lessons.count > 0) {
        result.push(obj);
      }
    });

    _self.categoryList = Array.from(new Set(_self.categoryList));
    _self.locationList = Array.from(new Set(_self.locationList));
    _self.coursePlanList = Array.from(new Set(_self.coursePlanList));
    _self.courseNameList = Array.from(new Set(_self.courseNameList));

    return result;
  }

  getFilteredDataGroupByCoursePlan(data) {
    let result = [];
    let filter = this.filter;
    let _self = this;

    this.locationList = [];
    this.categoryList = [];
    this.coursePlanList = [];
    this.courseNameList = [];

    if (filter.type == 'coursePlan' && filter.value.length) {
      data = data.filter(function(d) {
        return filter.value.indexOf(d.coursePlanName) > -1;
      });
    }
    data.forEach(function(coursePlan) {
      let obj = {
        groupTypeValue: coursePlan.coursePlanName,
        lessons: {
          absent: 0,
          present: 0,
          notTaken: 0,
          count: 0
        }
      };
      _self.coursePlanList.push(coursePlan.coursePlanName);
      let categories = coursePlan.categories || [];

      if (filter.type == 'category' && filter.value.length) {
        categories = categories.filter(function(d) {
          return filter.value.indexOf(d.catName) > -1;
        });
      }
      //iterate coursePlans under categories
      categories.forEach(function(category) {
        let courses = category.courses || [];
        _self.categoryList.push(category.catName);
        //iterate courses under coursePlans
        if (filter.type == 'course' && filter.value.length) {
          courses = courses.filter(function(d) {
            return filter.value.indexOf(d.courseName) > -1;
          });
        }
        if (filter.type == 'location' && filter.value.length) {
          courses = courses.filter(function(d) {
            return filter.value.indexOf(d.location) > -1;
          });
        }

        courses.forEach(function(course) {
          _self.courseNameList.push(course.courseName);
          _self.locationList.push(course.location);
          let lessons = course.lessons || [];
          Object.keys(lessons).forEach(function(key) {
            obj.lessons[key] += lessons[key];
          });
        });
      });
      if (obj.lessons.count > 0) {
        result.push(obj);
      }
    });
    _self.categoryList = Array.from(new Set(_self.categoryList));
    _self.locationList = Array.from(new Set(_self.locationList));
    _self.coursePlanList = Array.from(new Set(_self.coursePlanList));
    _self.courseNameList = Array.from(new Set(_self.courseNameList));
    return result;
  }
  updateGraphUsingGroupBy(event) {
    this.filter.value = [];
    switch (event.target.value) {
      case 'Location':
        this.groupBy = 'location';
        this.showReportByLocation();
        break;
      case 'Category':
        this.groupBy = 'category';
        this.showReportByCategory();
        break;
      case 'Course Plan':
        this.groupBy = 'coursePlan';
        this.showReportByCoursePlan();
        break;
      default:
        this.groupBy = 'location';
        this.showReportByLocation();
    }
  }
  updateFilterType(value) {
    this.filterModel = value;
    this.filter = {
      value: []
    };
    switch (value) {
      case 'Category':
        this.filter.type = 'category';
        this.searchResult.value = this.categoryList;
        break;
      case 'Course Plan':
        this.filter.type = 'coursePlan';
        this.searchResult.value = this.coursePlanList;
        break;
      case 'Course Name':
        this.filter.type = 'course';
        this.searchResult.value = this.courseNameList;
        break;
      case 'Location':
        this.filter.type = 'location';
        this.searchResult.value = this.locationList;
        break;
    }
  }
  showFilterModal(content) {
    this.searchResult.show = false;
    this.modalReference = this.modalService.open(content, {
      backdrop: 'static',
      windowClass: 'animation-wrap',
      size: 'lg'
    });

    this.modalReference.result.then(
      result => {
        //console.log(result);
      },
      reason => {
        //console.log(reason);
      }
    );
  }

  removeCurrentFilter(value) {
    this.filter.value = this.filter.value.filter(e => e !== value);
    this.searchResult.value.push(value);
    this.applyFilters();
  }

  removeAllFilters() {
    this.filter.value = [];
    this.searchResult.value = this.categoryList;
    this.applyFilters();
  }

  clearSearch() {}

  filterSearch(value) {
    if (value) {
      this.searchResult.show = true;
    } else {
      this.searchResult.show = false;
    }
  }

  selectFilter(value) {
    this.filter.value.push(value);
    this.searchResult.show = false;
    this.searchResult.value = this.searchResult.value.filter(e => e !== value);
  }
  applyFilters() {
    switch (this.groupBy) {
      case 'location':
        this.showReportByLocation();
        break;
      case 'category':
        this.showReportByCategory();
        break;
      case 'coursePlan':
        this.showReportByCoursePlan();
        break;
    }

    this.modalReference.close();
  }
  applyDateRange(evt) {
    this.startDate = moment(evt.picker.startDate).toISOString();
    this.endDate = moment(evt.picker.endDate).toISOString();
    switch (this.groupBy) {
      case 'location':
        this.showReportByLocation();
        break;
      case 'category':
        this.showReportByCategory();
        break;
      case 'coursePlan':
        this.showReportByCoursePlan();
        break;
    }
  }
}
