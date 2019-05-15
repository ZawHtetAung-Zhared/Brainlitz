/**
 * Created By Ahtisham
 */


import {Component, OnInit} from '@angular/core';
import {NgbModal, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {appService} from '../../../service/app.service';
import staffData from './sampleData';
import { DaterangepickerConfig } from 'ng2-daterangepicker';
import * as moment from 'moment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';


@Component({
  selector: 'staff-performance-report',
  templateUrl: './staff.component.html',
  styleUrls: ['../report.component.css'] // we share same style url for all nested report component
})

/**
 * StaffPerformanceReport : Handle Staff Performance Report [Part of Report Component]
 */
export class StaffPerformanceReport implements OnInit {
  staffGroupByList = ['Location', 'Category', 'Course Plan'];
  filterList = ['Category', 'Course Plan', 'Course Name', 'Location'];
  categoryList = ['Art & Science', 'Dance', 'Education', 'Sports', 'Technology'];
  locationList = ['Woodland', 'Yishun', 'Admiralty', 'Bedok', 'Sembawang'];
  coursePlanList = ['Advanced', 'Beginner', 'Individual', 'Weekend'];
  courseNameList = ['Business Administration', 'Management Studies', '3D Animation', 'Facebook Marketing', 'Cyber Security', 'Math Classes', 'Orchestra', 'Guitar', 'Hip Hop', 'Piano', 'Meditation & Yoga', 'Health & Fitness', 'Sports Science'];
  searchResult:any;
  groupBy = "location";
  filter:any;
  modalReference:any;
  reportData:any;
  daterange: any = {};
  filterModel:any;
  // see original project for full list of options
  // can also be setup using the config service to apply to multiple pickers
  options: any;
  startDate:any;
  endDate:any;
  initFilter = true;
  public regionID = localStorage.getItem('regionId');
  @BlockUI() blockUI: NgBlockUI;

  /**
   * Initialize the StaffPerformanceReport
   */
  constructor(private modalService:NgbModal,private daterangepickerOptions: DaterangepickerConfig, private _service:appService,calendar: NgbCalendar) {
    window.scroll(0, 0);
    this.daterangepickerOptions.settings = {
      locale: { format: 'd m YYYY' },
      alwaysShowCalendars: true,
      ranges: {
        'Today':[moment()],
        'Yesteday':[moment().subtract(1, 'days'), moment()],
        'Last Month': [moment().subtract(1, 'month'), moment()],
        'Last 3 Months': [moment().subtract(4, 'month'), moment()],
        'Last 6 Months': [moment().subtract(6, 'month'), moment()],
        'Last 12 Months': [moment().subtract(12, 'month'), moment()],
        'Last 18 Months': [moment().subtract(18, 'month'), moment()],
      }
    };
  }

  calendarCanceled(e:any) {
    console.log(e);
    // e.event
    // e.picker
  }

  calendarApplied(e:any) {
    console.log(e);
    // e.event
    // e.picker
  }
  togglePicker(e:any){
    console.log(e.event.type);
    if(e.event.type =="show"){


    }
  }
  calendarEventsHandler(e:any) {
    console.log(e);
    //this.eventLog += '\nEvent Fired: ' + e.event.type;
  }
  ngOnInit() {
    this.filterModel = 'Category';
    this.filter = {type: "category", 'value': []};
    this.searchResult = {
      show: false,
      value: this.categoryList
    };
    this.locationList = [];
    this.categoryList = [];
    this.coursePlanList = [];
    this.courseNameList = [];
    this.startDate = (new Date('04-01-2018')).toISOString();
    this.endDate = (new Date()).toISOString();
    this.options= {
      startDate: moment('04-01-2018').startOf('hour'),
      endDate: moment().startOf('hour'),
      locale: { format: 'ddd, DD MMM YYYY' },
      alwaysShowCalendars: true,
    };
    console.log(staffData);
    this.showReportByLocation();

  }

  selectedDate(value: any, datepicker?: any) {
    // this is the date the iser selected
    console.log(value);

    // any object can be passed to the selected event and it will be passed back here
    datepicker.start = value.start;
    datepicker.end = value.end;

    // or manupulat your own internal property
    this.daterange.start = value.start;
    this.daterange.end = value.end;
    this.daterange.label = value.label;
  }

  //We have different data structure for each groupBy type - location, category and coursePlan
  //See sampleData.ts
  //We will create different functions for each groupBy type [showReportByLocation,showReportByCategory,showReportByCoursePlan].

  /**
   * showReportByLocation :[fetch and create report groupBy location]
   * See location object in sampleData.ts to understand the data structure
   */
  showReportByLocation() {
    // this._service.getStaffPerformanceReport('location', 'time-range')
    //   .subscribe((res:any) => {
    //     this.reportData = res;
    //     console.log(this.reportData);
    //   }, err => {
    //     console.log(err)
    //   })

    //[TODO:Update better way to iterate data]
    this.reportData = [];
    this.blockUI.start('Loading...');
    this._service.getStaffPerformanceReport(this.regionID,"location",this.startDate,this.endDate)
      .subscribe((res:any) => {
        this.blockUI.stop();
        if(res.length){
          this.reportData = this.getFilteredDataGroupByLocation(res);
        }else{
          this.reportData = [];
        }
      },err => {
        this.reportData = [];
      });
    // if (staffData) { //check if we have data to show report
    //   this.reportData = this.getFilteredDataGroupByLocation(staffData.location);
    //   // if (result.length && this.filter.type && this.filter.type != 'location') {
    //   //   this.reportData = this.mergeDuplicateObject(result);
    //   // } else {
    //   //   this.reportData = result;
    //   // }
    // } else {
    //   //Not enough data to show report
    //   this.reportData = [];
    // }

  }

  /**
   * showReportByCategory :[fetch and create report groupBy Category]
   */
  showReportByCategory() {
    this.reportData = [];
    this.blockUI.start('Loading...');
    this._service.getStaffPerformanceReport(this.regionID,"category",this.startDate,this.endDate)
      .subscribe((res:any) => {
        this.blockUI.stop();
        if(res.length){
          this.reportData = this.getFilteredDataGroupByCategory(res);
        }else{
          this.reportData = [];
        }
      },err => {
        this.reportData = [];
      });
    // if (staffData) { //check if we have data to show report
    //   this.reportData = this.getFilteredDataGroupByCategory(staffData.category);
    //   console.log("result after filter");
    //   //console.log(result);
    //   // if (result.length && this.filter.type && this.filter.type != 'category') {
    //   //   this.reportData = this.mergeDuplicateObject(result);
    //   // } else {
    //   //   this.reportData = result;
    //   // }
    // } else {
    //   //Not enough data to show report
    //   this.reportData = [];
    // }
  }

  /**
   * showReportByCoursePlan :[fetch and create report groupBy CoursePlan]
   */
  showReportByCoursePlan() {
    this.reportData = [];
    this.blockUI.start('Loading...');
    this._service.getStaffPerformanceReport(this.regionID,"courseplan",this.startDate,this.endDate)
      .subscribe((res:any) => {
        this.blockUI.stop();
        if(res.length){
          this.reportData = this.getFilteredDataGroupByCoursePlan(res);
        }else{
          this.reportData = [];
        }
      },err => {
        this.reportData = [];
      });
    // if (staffData) { //check if we have data to show report
    //   this.reportData = this.getFilteredDataGroupByCoursePlan(staffData.coursePlan);
    //   console.log("result after filter");
    //   //console.log(result);
    //   // if (result.length && this.filter.value && this.filter.value.length && this.filter.type != 'coursePlan') {
    //   //   this.reportData = this.mergeDuplicateObject(result);
    //   // } else {
    //   //   this.reportData = result;
    //   // }
    // } else {
    //   //Not enough data to show report
    //   this.reportData = [];
    // }
  }

  /**
   * getFilteredDataGroupByLocation:[get and filter data based on user selected values (groupBy location type)]
   * @param data
   * @returns {Array}
   */
  getFilteredDataGroupByLocation(data) {
    let filter = this.filter;
    let _self = this;
    let res = [];



    switch (filter.type) {
      case "location":
        if(filter.value.length){
          data = data.filter(function (d) {
            return filter.value.indexOf(d.locationName) > -1;
          });
        }
        res = getLocationData(data);
        break;
      case "category":
        res = filterDataByCategory(data);
        break;
      case "coursePlan":
        res = filterDataByCoursePlan(data);
        break;
      case "course":
        res = filterDataByCourse(data);
        break;
      default:
        res = getLocationData(data);

    }
    return res;
    function getLocationData(data) {
      _self.locationList = [];
      _self.categoryList = [];
      _self.coursePlanList = [];
      _self.courseNameList = [];
      console.log(data);
      let result = [];
      data.forEach(function (location) {
        let obj = {
          groupTypeValue: "",
          rating: {
            "5": 0,
            "4": 0,
            "3": 0,
            "2": 0,
            "1": 0
          },
          totalRating: 0,
          ratingWeightage: 0,
          averageRating: 0,
          filterValue: "",
          id: "graph" + Math.floor(Math.random() * 10000)
        };
        _self.locationList.push(location.locationName);
        //if filter type is location, we will push to end of this loop
        let categories = location.categories || [];
        categories.forEach(function (category) {
          _self.categoryList.push(category.catName);
          let coursePlans = category.coursePlans || [];
          //iterate coursePlans under categories
          coursePlans.forEach(function (coursePlan) {
            _self.coursePlanList.push(coursePlan.coursePlanName);
            let courses = coursePlan.courses || [];
            //iterate courses under coursePlans
            courses.forEach(function (course) {
              _self.courseNameList.push(course.courseName);
              let rating = course.rating || [];
              rating.forEach(function (value) {
                obj.rating[value.type] += value.count;
              });
            });
          });
        });
        obj.totalRating = _self.getTotalRating(obj.rating);
        obj.ratingWeightage = _self.getRatingWeightage(obj.rating);
        obj.averageRating = parseFloat((obj.ratingWeightage / obj.totalRating).toFixed(2)) || 0;
        obj.groupTypeValue = location.locationName;
        if(obj.totalRating>0){
          result.push(obj);
        }
      });

      _self.categoryList =  Array.from(new Set(_self.categoryList));
      _self.locationList = Array.from(new Set(_self.locationList));
      _self.coursePlanList = Array.from(new Set(_self.coursePlanList));
      _self.courseNameList = Array.from(new Set(_self.courseNameList));

      return result;
    }

    function filterDataByCategory(data) {

      _self.locationList = [];
      _self.categoryList = [];
      _self.coursePlanList = [];
      _self.courseNameList = [];

      let result = [];
      data.forEach(function (location) {
        let obj = {
          groupTypeValue: location.locationName,
          rating: {
            "5": 0,
            "4": 0,
            "3": 0,
            "2": 0,
            "1": 0
          },
          totalRating: 0,
          ratingWeightage: 0,
          averageRating: 0,
          filterValue: "",
          id: "graph" + Math.floor(Math.random() * 10000)
        };
        _self.locationList.push(location.locationName);
        let categories = location.categories || [];
        if(filter.value.length){
          categories = categories.filter(function (d) {
            return filter.value.indexOf(d.catName) > -1;
          });
        }

        categories.forEach(function (category) {
          _self.categoryList.push(category.catName);
          let coursePlans = category.coursePlans || [];
          //iterate coursePlans under categories
          coursePlans.forEach(function (coursePlan) {
            let courses = coursePlan.courses || [];
            _self.coursePlanList.push(coursePlan.coursePlanName);
            //iterate courses under coursePlans
            courses.forEach(function (course) {
              _self.courseNameList.push(course.courseName);
              let rating = course.rating || [];
              rating.forEach(function (value) {
                obj.rating[value.type] += value.count;
              });
            });
          });
        });
        obj.totalRating = _self.getTotalRating(obj.rating);
        obj.ratingWeightage = _self.getRatingWeightage(obj.rating);
        obj.averageRating = parseFloat((obj.ratingWeightage / obj.totalRating).toFixed(2)) || 0;
        if(obj.totalRating>0){
          result.push(obj);
        }
      });
      _self.categoryList =  Array.from(new Set(_self.categoryList));
      _self.locationList = Array.from(new Set(_self.locationList));
      _self.coursePlanList = Array.from(new Set(_self.coursePlanList));
      _self.courseNameList = Array.from(new Set(_self.courseNameList));
      if(_self.initFilter){
        _self.searchResult.value = _self.categoryList;
        _self.initFilter = false;
      }
      return result;
    }

    function filterDataByCoursePlan(data) {
      _self.locationList = [];
      _self.categoryList = [];
      _self.coursePlanList = [];
      _self.courseNameList = [];
      let result = [];
      data.forEach(function (location) {
        let obj = {
          groupTypeValue: location.locationName,
          rating: {
            "5": 0,
            "4": 0,
            "3": 0,
            "2": 0,
            "1": 0
          },
          totalRating: 0,
          ratingWeightage: 0,
          averageRating: 0,
          filterValue: '',
          id: "graph" + Math.floor(Math.random() * 10000)
        };
        _self.locationList.push(location.locationName);
        let categories = location.categories || [];
        categories.forEach(function (category) {
          _self.categoryList.push(category.catName);
          let coursePlans = category.coursePlans || [];
          //iterate coursePlans under categories
          if(filter.value.length) {
            coursePlans = coursePlans.filter(function (d) {
              return filter.value.indexOf(d.coursePlanName) > -1;
            });
          }
          coursePlans.forEach(function (coursePlan) {
            _self.coursePlanList.push(coursePlan.coursePlanName);
            let courses = coursePlan.courses || [];
            //iterate courses under coursePlans
            courses.forEach(function (course) {
              _self.courseNameList.push(course.courseName);
              let rating = course.rating || [];
              rating.forEach(function (value) {
                obj.rating[value.type] += value.count;
              });
            });

          });
        });
        obj.totalRating = _self.getTotalRating(obj.rating);
        obj.ratingWeightage = _self.getRatingWeightage(obj.rating);
        obj.averageRating = parseFloat((obj.ratingWeightage / obj.totalRating).toFixed(2)) || 0;
        if(obj.totalRating>0){
          result.push(obj);
        }
      });
      _self.categoryList =  Array.from(new Set(_self.categoryList));
      _self.locationList = Array.from(new Set(_self.locationList));
      _self.coursePlanList = Array.from(new Set(_self.coursePlanList));
      _self.courseNameList = Array.from(new Set(_self.courseNameList));
      return result;
    }

    function filterDataByCourse(data) {
      let result = [];
      data.forEach(function (location) {
        let obj = {
          groupTypeValue: location.locationName,
          rating: {
            "5": 0,
            "4": 0,
            "3": 0,
            "2": 0,
            "1": 0
          },
          totalRating: 0,
          ratingWeightage: 0,
          averageRating: 0,
          filterValue: "",
          id: "graph" + Math.floor(Math.random() * 10000)
        };
        _self.locationList.push(location.locationName);
        let categories = location.categories || [];
        categories.forEach(function (category) {
          _self.categoryList.push(category.catName);
          let coursePlans = category.coursePlans || [];
          //iterate coursePlans under categories
          coursePlans.forEach(function (coursePlan) {
            _self.coursePlanList.push(coursePlan.coursePlanName);
            let courses = coursePlan.courses || [];
            //iterate courses under coursePlans
            if(filter.value.length) {
              courses = courses.filter(function (d) {
                return filter.value.indexOf(d.courseName) > -1;
              });
            }
            courses.forEach(function (course) {
              _self.courseNameList.push(course.courseName);
              let rating = course.rating || [];
              rating.forEach(function (value) {
                obj.rating[value.type] += value.count;
              });

            });

          });
        });
        obj.totalRating = _self.getTotalRating(obj.rating);
        obj.ratingWeightage = _self.getRatingWeightage(obj.rating);
        obj.averageRating = parseFloat((obj.ratingWeightage / obj.totalRating).toFixed(2)) || 0;
        if(obj.totalRating>0){
          result.push(obj);
        }
      });

      _self.categoryList =  Array.from(new Set(_self.categoryList));
      _self.locationList = Array.from(new Set(_self.locationList));
      _self.coursePlanList = Array.from(new Set(_self.coursePlanList));
      _self.courseNameList = Array.from(new Set(_self.courseNameList));

      return result;
    }
  }

  /**
   * getFilteredDataGroupByCategory:[get and filter data based on user selected values (groupBy category type)]
   * @param data
   * @returns {Array}
   */
  getFilteredDataGroupByCategory(data) {
    let filter = this.filter;
    let _self = this;
    let res = [];
    switch (filter.type) {
      case "location":
        res = filterDataByLocation(data);
        break;
      case "category":
        if(filter.value.length) {
          data = data.filter(function (d) {
            return filter.value.indexOf(d.catName) > -1;
          });
        }
        res = getCategoryData(data);
        break;
      case "coursePlan":
        res = filterDataByCoursePlan(data);
        break;
      case "course":
        res = filterDataByCourse(data);
        break;
      default:
        res = getCategoryData(data);

    }
    return res;

    function getCategoryData(data) {
      _self.locationList = [];
      _self.categoryList = [];
      _self.coursePlanList = [];
      _self.courseNameList = [];
      let result = [];
      data.forEach(function (category) {
        let obj = {
          groupTypeValue: category.catName,
          rating: {
            "5": 0,
            "4": 0,
            "3": 0,
            "2": 0,
            "1": 0
          },
          totalRating: 0,
          ratingWeightage: 0,
          averageRating: 0,
          filterValue: "",
          id: "graph" + Math.floor(Math.random() * 10000)
        };
        _self.categoryList.push(category.catName);
        let coursePlans = category.coursePlans || [];
        //iterate coursePlans under categories
        coursePlans.forEach(function (coursePlan) {
          _self.coursePlanList.push(coursePlan.coursePlanName);
          let courses = coursePlan.courses || [];
          //iterate courses under coursePlans
          courses.forEach(function (course) {
            _self.courseNameList.push(course.courseName);
            _self.locationList.push(course.location);
            let rating = course.rating || [];
            rating.forEach(function (value) {
              obj.rating[value.type] += value.count;
            });
          });
        });

        obj.totalRating = _self.getTotalRating(obj.rating);
        obj.ratingWeightage = _self.getRatingWeightage(obj.rating);
        obj.averageRating = parseFloat((obj.ratingWeightage / obj.totalRating).toFixed(2));
        if(obj.totalRating>0){
          result.push(obj);
        }
      });
      _self.categoryList =  Array.from(new Set(_self.categoryList));
      _self.locationList = Array.from(new Set(_self.locationList));
      _self.coursePlanList = Array.from(new Set(_self.coursePlanList));
      _self.courseNameList = Array.from(new Set(_self.courseNameList));
      return result;
    }


    function filterDataByLocation(data) {
      _self.locationList = [];
      _self.categoryList = [];
      _self.coursePlanList = [];
      _self.courseNameList = [];
      let result = [];
      data.forEach(function (category) {
        let obj = {
          groupTypeValue: category.catName,
          rating: {
            "5": 0,
            "4": 0,
            "3": 0,
            "2": 0,
            "1": 0
          },
          totalRating: 0,
          ratingWeightage: 0,
          averageRating: 0,
          filterValue: "",
          id: "graph" + Math.floor(Math.random() * 10000)
        };
        _self.categoryList.push(category.catName);
        let coursePlans = category.coursePlans || [];
        //iterate coursePlans under categories
        coursePlans.forEach(function (coursePlan) {
          _self.coursePlanList.push(coursePlan.coursePlanName);
          let courses = coursePlan.courses || [];
          //iterate courses under coursePlans
          if(filter.value.length) {
            courses = courses.filter(function (d) {
              return filter.value.indexOf(d.location) > -1;
            });
          }
          courses.forEach(function (course) {
            _self.courseNameList.push(course.courseName);
            _self.locationList.push(course.location);
            let rating = course.rating || [];
            rating.forEach(function (value) {
              obj.rating[value.type] += value.count;
            });
          });

        });
        obj.totalRating = _self.getTotalRating(obj.rating);
        obj.ratingWeightage = _self.getRatingWeightage(obj.rating);
        obj.averageRating = parseFloat((obj.ratingWeightage / obj.totalRating).toFixed(2));
        if(obj.totalRating>0){
          result.push(obj);
        }
      });
      _self.categoryList =  Array.from(new Set(_self.categoryList));
      _self.locationList = Array.from(new Set(_self.locationList));
      _self.coursePlanList = Array.from(new Set(_self.coursePlanList));
      _self.courseNameList = Array.from(new Set(_self.courseNameList));
      return result;
    }

    function filterDataByCoursePlan(data) {
      _self.locationList = [];
      _self.categoryList = [];
      _self.coursePlanList = [];
      _self.courseNameList = [];
      let result = [];
      data.forEach(function (category) {
        let obj = {
          groupTypeValue: category.catName,
          rating: {
            "5": 0,
            "4": 0,
            "3": 0,
            "2": 0,
            "1": 0
          },
          totalRating: 0,
          ratingWeightage: 0,
          averageRating: 0,
          filterValue: '',
          id: "graph" + Math.floor(Math.random() * 10000)
        };
        _self.categoryList.push(category.catName);
        let coursePlans = category.coursePlans || [];
        //iterate coursePlans under categories
        if(filter.value.length) {
          coursePlans = coursePlans.filter(function (d) {
            return filter.value.indexOf(d.coursePlanName) > -1;
          });
        }
        coursePlans.forEach(function (coursePlan) {
          _self.coursePlanList.push(coursePlan.coursePlanName);
          let courses = coursePlan.courses || [];
          //iterate courses under coursePlans
          courses.forEach(function (course) {
            _self.courseNameList.push(course.courseName);
            _self.locationList.push(course.location);
            let rating = course.rating || [];
            rating.forEach(function (value) {
              obj.rating[value.type] += value.count;
            });
          });
        });
        obj.totalRating = _self.getTotalRating(obj.rating);
        obj.ratingWeightage = _self.getRatingWeightage(obj.rating);
        obj.averageRating = parseFloat((obj.ratingWeightage / obj.totalRating).toFixed(2));
        if(obj.totalRating>0){
          result.push(obj);
        }
      });
      _self.categoryList =  Array.from(new Set(_self.categoryList));
      _self.locationList = Array.from(new Set(_self.locationList));
      _self.coursePlanList = Array.from(new Set(_self.coursePlanList));
      _self.courseNameList = Array.from(new Set(_self.courseNameList));
      return result;
    }

    function filterDataByCourse(data) {
      let result = [];
      _self.locationList = [];
      _self.categoryList = [];
      _self.coursePlanList = [];
      _self.courseNameList = [];
      data.forEach(function (category) {
        let obj = {
          groupTypeValue: category.catName,
          rating: {
            "5": 0,
            "4": 0,
            "3": 0,
            "2": 0,
            "1": 0
          },
          totalRating: 0,
          ratingWeightage: 0,
          averageRating: 0,
          filterValue: "",
          id: "graph" + Math.floor(Math.random() * 10000)
        };
        _self.categoryList.push(category.catName);
        let coursePlans = category.coursePlans || [];
        //iterate coursePlans under categories
        coursePlans.forEach(function (coursePlan) {
          _self.coursePlanList.push(coursePlan.coursePlanName);
          let courses = coursePlan.courses || [];
          //iterate courses under coursePlans
          if(filter.value.length) {
            courses = courses.filter(function (d) {
              return filter.value.indexOf(d.courseName) > -1;
            });
          }
          courses.forEach(function (course) {
            _self.courseNameList.push(course.courseName);
            _self.locationList.push(course.location);
            let rating = course.rating || [];
            rating.forEach(function (value) {
              obj.rating[value.type] += value.count;
            });

          });

        });
        obj.totalRating = _self.getTotalRating(obj.rating);
        obj.ratingWeightage = _self.getRatingWeightage(obj.rating);
        obj.averageRating = parseFloat((obj.ratingWeightage / obj.totalRating).toFixed(2));
        if(obj.totalRating>0){
          result.push(obj);
        }
      });
      _self.categoryList =  Array.from(new Set(_self.categoryList));
      _self.locationList = Array.from(new Set(_self.locationList));
      _self.coursePlanList = Array.from(new Set(_self.coursePlanList));
      _self.courseNameList = Array.from(new Set(_self.courseNameList));
      return result;
    }
  }

  /**
   * getFilteredDataGroupByCoursePlan:[get and filter data based on user selected values (groupBy coursePlan type)]
   * @param data
   * @returns {Array}
   */
  getFilteredDataGroupByCoursePlan(data) {
    let filter = this.filter;
    let _self = this;
    let res = [];
    switch (filter.type) {
      case "location":
        res = filterDataByLocation(data);
        break;
      case "category":
        res = filterDataByCategory(data);
        break;
      case "coursePlan":
        if(filter.value.length) {
          data = data.filter(function (d) {
            return filter.value.indexOf(d.coursePlanName) > -1;
          });
        }
        res = getCoursePlanData(data);
        break;
      case "course":
        res = filterDataByCourse(data);
        break;
      default:
        res = getCoursePlanData(data);

    }
    return res;

    function getCoursePlanData(data) {
      console.log(data);
      let result = [];
      _self.locationList = [];
      _self.categoryList = [];
      _self.coursePlanList = [];
      _self.courseNameList = [];
      data.forEach(function (coursePlan) {
        let obj = {
          groupTypeValue: coursePlan.coursePlanName,
          rating: {
            "5": 0,
            "4": 0,
            "3": 0,
            "2": 0,
            "1": 0
          },
          totalRating: 0,
          ratingWeightage: 0,
          averageRating: 0,
          filterValue: "",
          id: "graph" + Math.floor(Math.random() * 10000)
        };
        _self.coursePlanList.push(coursePlan.coursePlanName);
        let categories = coursePlan.categories || [];
        //iterate coursePlans under categories
        categories.forEach(function (category) {
          _self.categoryList.push(category.catName);
          let courses = category.courses || [];
          //iterate courses under coursePlans
          courses.forEach(function (course) {
            _self.courseNameList.push(course.courseName);
            _self.locationList.push(course.location);
            let rating = course.rating || [];
            rating.forEach(function (value) {
              obj.rating[value.type] += value.count;
            });
          });
        });

        obj.totalRating = _self.getTotalRating(obj.rating);
        obj.ratingWeightage = _self.getRatingWeightage(obj.rating);
        obj.averageRating = parseFloat((obj.ratingWeightage / obj.totalRating).toFixed(2));
        if(obj.totalRating>0){
          result.push(obj);
        }
      });

      _self.categoryList =  Array.from(new Set(_self.categoryList));
      _self.locationList = Array.from(new Set(_self.locationList));
      _self.coursePlanList = Array.from(new Set(_self.coursePlanList));
      _self.courseNameList = Array.from(new Set(_self.courseNameList));

      return result;
    }

    function filterDataByCategory(data) {
      _self.locationList = [];
      _self.categoryList = [];
      _self.coursePlanList = [];
      _self.courseNameList = [];
      let result = [];
      data.forEach(function (coursePlan) {
        let obj = {
          groupTypeValue: coursePlan.coursePlanName,
          rating: {
            "5": 0,
            "4": 0,
            "3": 0,
            "2": 0,
            "1": 0
          },
          totalRating: 0,
          ratingWeightage: 0,
          averageRating: 0,
          filterValue: "",
          id: "graph" + Math.floor(Math.random() * 10000)
        };
        _self.coursePlanList.push(coursePlan.coursePlanName);
        let categories = coursePlan.categories || [];
        if(filter.value.length) {
          categories = categories.filter(function (d) {
            return filter.value.indexOf(d.catName) > -1;
          });
        }
        categories.forEach(function (category) {
          _self.categoryList.push(category.catName);
          let courses = category.courses || [];
          //iterate courses under coursePlans
          courses.forEach(function (course) {
            _self.courseNameList.push(course.courseName);
            _self.locationList.push(course.location);
            let rating = course.rating || [];
            rating.forEach(function (value) {
              obj.rating[value.type] += value.count;
            });
          });

        });
        obj.totalRating = _self.getTotalRating(obj.rating);
        obj.ratingWeightage = _self.getRatingWeightage(obj.rating);
        obj.averageRating = parseFloat((obj.ratingWeightage / obj.totalRating).toFixed(2));
        if(obj.totalRating>0){
          result.push(obj);
        }
      });

      _self.categoryList =  Array.from(new Set(_self.categoryList));
      _self.locationList = Array.from(new Set(_self.locationList));
      _self.coursePlanList = Array.from(new Set(_self.coursePlanList));
      _self.courseNameList = Array.from(new Set(_self.courseNameList));

      return result;
    }

    function filterDataByLocation(data) {
      console.log("going to filte data by location");
      let result = [];
      _self.locationList = [];
      _self.categoryList = [];
      _self.coursePlanList = [];
      _self.courseNameList = [];
      data.forEach(function (coursePlan) {
        let obj = {
          groupTypeValue: coursePlan.coursePlanName,
          rating: {
            "5": 0,
            "4": 0,
            "3": 0,
            "2": 0,
            "1": 0
          },
          totalRating: 0,
          ratingWeightage: 0,
          averageRating: 0,
          filterValue: "",
          id: "graph" + Math.floor(Math.random() * 10000)
        };
        _self.coursePlanList.push(coursePlan.coursePlanName);
        let categories = coursePlan.categories || [];
        //iterate coursePlans under categories
        categories.forEach(function (category) {
          _self.categoryList.push(category.catName);
          let courses = category.courses || [];
          //iterate courses under coursePlans
          if(filter.value.length) {
            courses = courses.filter(function (d) {
              return filter.value.indexOf(d.location) > -1;
            });
          }
          courses.forEach(function (course) {
            _self.courseNameList.push(course.courseName);
            _self.locationList.push(course.location);
            let rating = course.rating || [];
            rating.forEach(function (value) {
              obj.rating[value.type] += value.count;
            });
          });

        });
        obj.totalRating = _self.getTotalRating(obj.rating);
        obj.ratingWeightage = _self.getRatingWeightage(obj.rating);
        obj.averageRating = parseFloat((obj.ratingWeightage / obj.totalRating).toFixed(2));
        if(obj.totalRating>0){
          result.push(obj);
        }
      });
      _self.categoryList =  Array.from(new Set(_self.categoryList));
      _self.locationList = Array.from(new Set(_self.locationList));
      _self.coursePlanList = Array.from(new Set(_self.coursePlanList));
      _self.courseNameList = Array.from(new Set(_self.courseNameList));
      return result;
    }


    function filterDataByCourse(data) {
      let result = [];
      _self.locationList = [];
      _self.categoryList = [];
      _self.coursePlanList = [];
      _self.courseNameList = [];
      data.forEach(function (coursePlan) {
        let obj = {
          groupTypeValue: coursePlan.coursePlanName,
          rating: {
            "5": 0,
            "4": 0,
            "3": 0,
            "2": 0,
            "1": 0
          },
          totalRating: 0,
          ratingWeightage: 0,
          averageRating: 0,
          filterValue: "",
          id: "graph" + Math.floor(Math.random() * 10000)
        };
        _self.coursePlanList.push(coursePlan.coursePlanName);
        let categories = coursePlan.categories || [];
        //iterate coursePlans under categories
        categories.forEach(function (category) {
          _self.categoryList.push(category.catName);
          let courses = category.courses || [];
          //iterate courses under coursePlans
          if(filter.value.length) {
            courses = courses.filter(function (d) {
              return filter.value.indexOf(d.courseName) > -1;
            });
          }
          courses.forEach(function (course) {
            _self.courseNameList.push(course.courseName);
            _self.locationList.push(course.location);
            let rating = course.rating || [];
            rating.forEach(function (value) {
              obj.rating[value.type] += value.count;
            });
          });

        });
        obj.totalRating = _self.getTotalRating(obj.rating);
        obj.ratingWeightage = _self.getRatingWeightage(obj.rating);
        obj.averageRating = parseFloat((obj.ratingWeightage / obj.totalRating).toFixed(2));
        if(obj.totalRating>0){
          result.push(obj);
        }
      });
      _self.categoryList =  Array.from(new Set(_self.categoryList));
      _self.locationList = Array.from(new Set(_self.locationList));
      _self.coursePlanList = Array.from(new Set(_self.coursePlanList));
      _self.courseNameList = Array.from(new Set(_self.courseNameList));
      return result;
    }
  }

  /**
   * updateGraphUsingGroupBy:[handle change event in groupBy filter]
   * @param event
   */
  updateGraphUsingGroupBy(event) {
    this.filter.value = [];
    switch (event.target.value) {
      case "Location":
        this.groupBy = "location";
        this.showReportByLocation();
        break;
      case "Category":
        this.groupBy = "category";
        this.showReportByCategory();
        break;
      case "Course Plan":
        this.groupBy = "coursePlan";
        this.showReportByCoursePlan();
        break;
      default:
        this.groupBy = "location";
        this.showReportByLocation();


    }
  }

  /**
   * showFilterModal:[Open modal with filter fields]
   * @param content
   */
  showFilterModal(content) {
    this.searchResult.show = false;
    // this.searchResult.value = this.categoryList;
    // this.filter = {
    //   type: "category",
    //   value: []
    // };
    this.modalReference = this.modalService.open(content, {
      backdrop: 'static',
      windowClass: 'animation-wrap',
      size: 'lg'
    });
    this.modalReference.result.then((result) => {
      //console.log(result);
    }, (reason) => {
      //console.log(reason);
    });
  }

  /**
   * updateFilterType :[called when filter input changes]
   * @param event
   */
  updateFilterType(value) {
    this.filterModel = value;
    this.filter = {
      value: []
    };
    switch (value) {
      case "Category":
        this.filter.type = "category";
        this.searchResult.value = this.categoryList;
        break;
      case "Course Plan":
        this.filter.type = "coursePlan";
        this.searchResult.value = this.coursePlanList;
        break;
      case "Course Name":
        this.filter.type = "course";
        this.searchResult.value = this.courseNameList;
        break;
      case "Location":
        this.filter.type = "location";
        this.searchResult.value = this.locationList;
        break;
    }
  }

  /**
   * mergeDuplicateObject : [Merge Duplicate Object (same filter type and groupBy)]
   * @param data
   */
  mergeDuplicateObject(data) {
    let _self = this, result = [];
    data.forEach(function (value) {
      var existing = result.filter(function (v, i) {
        return v.groupTypeValue == value.groupTypeValue && v.filterValue == value.filterValue;
      });

      if (existing.length) {
        var existingIndex = result.indexOf(existing[0]);
        Object.keys(value.rating).forEach(function (key) {
          result[existingIndex].rating[key] += value.rating[key];
        });
        result[existingIndex].totalRating = _self.getTotalRating(result[existingIndex].rating);
        result[existingIndex].ratingWeightage = _self.getRatingWeightage(result[existingIndex].rating);
        result[existingIndex].averageRating = parseFloat((result[existingIndex].ratingWeightage / result[existingIndex].totalRating).toFixed(2));
      } else {
        result.push(value);
      }
    });
    return result;
  }

  /**
   * getTotalRating:[get total rating from rating array]
   * @param arr
   * @returns {number}
   */
  getTotalRating(arr) {
    return Object.keys(arr).reduce(function (sum, key) {
      return sum + arr[key];
    }, 0);
  }

  /**
   * getRatingWeightage:[get rating weightage from rating array]
   * @param arr
   * @returns {number}
   */
  getRatingWeightage(arr) {
    return Object.keys(arr).reduce(function (sum, key) {
      return sum + arr[key] * parseInt(key);
    }, 0);
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

  clearSearch() {

  }

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
    console.log("inside applyFilters");
    console.log(this.filter);
    switch (this.groupBy) {
      case "location":
        console.log("calling showReportByLocation");
        this.showReportByLocation();
        break;
      case "category":
        this.showReportByCategory();
        break;
      case "coursePlan":
        this.showReportByCoursePlan();
        break;
    }

    this.modalReference.close();
  }
  applyDateRange(evt){
    this.startDate = (new Date(evt.picker.startDate)).toISOString();
    this.endDate = (new Date(evt.picker.endDate)).toISOString();
    switch (this.groupBy) {
      case "location":
        this.showReportByLocation();
        break;
      case "category":
        this.showReportByCategory();
        break;
      case "coursePlan":
        this.showReportByCoursePlan();
        break;
    }

  }
}
