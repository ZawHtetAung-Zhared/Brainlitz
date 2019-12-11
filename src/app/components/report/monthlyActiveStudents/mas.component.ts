import { Component, OnInit } from '@angular/core';
import { DaterangepickerConfig } from 'ng2-daterangepicker';
import { NgbModal, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { appService } from '../../../service/app.service';
import masSampleData from './sampleData';
declare var $: any;
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'monthly-active-std-report',
  templateUrl: './mas.component.html',
  styleUrls: ['../report.component.css'] // we share same style url for all nested report component
})
export class MonthlyActiveStudentsReport implements OnInit {
  masGroupByList = ['Location', 'Category', 'Course Plan'];
  filterList = ['Category', 'Course Plan', 'Course Name', 'Location'];
  categoryList = [
    'Art & Science',
    'Dance',
    'Education',
    'Sports',
    'Technology'
  ];
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
  filter: any;
  modalReference: any;
  reportData: any;
  daterange: any = {};
  options: any;
  filterModel: any;
  startDate: any;
  endDate: any;
  initFilter = true;
  public regionID = localStorage.getItem('regionId');
  @BlockUI() blockUI: NgBlockUI;

  //for bug fixs by zzkz
  public fullCategoryList: any = [];
  public fullLocationList: any = [];
  public fullCoursePlanList: any = [];
  public fullCourseNameList: any = [];
  public selectFilterTemp: any = [];
  public removeFilterTemp: any = [];
  public updateFilterTemp: any = {};
  // public monthlyActiveData: any;

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
    this.filter = { type: 'category', value: [] };
    this.searchResult = {
      show: false,
      value: this.categoryList
    };
    this.locationList = [];
    this.categoryList = [];
    this.coursePlanList = [];
    this.courseNameList = [];
    this.startDate = new Date('2015-02-01').toISOString();
    this.endDate = new Date(
      new Date(moment().year(), moment().month() + 1).setUTCHours(
        23,
        59,
        59,
        999
      )
    ).toISOString();
    // this.endDate = moment().toISOString();
    this.options = {
      startDate: moment('28/02/2015').startOf('hour'),
      endDate: moment().startOf('hour'),
      locale: { format: 'MMM YYYY' },
      alwaysShowCalendars: true
    };
    this.reportData = [];
    this.showReport();
  }
  ngAfterViewInit() {
    let _self = this;
    var endMonth = moment().month() + 1;
    var endYear = moment().year();
    console.log(endMonth, endYear);
    $('#monthRangePicker')
      .rangePicker({
        setDate: [[2, 2015], [endMonth, endYear]],
        minDate: [2, 2015],
        maxDate: [endMonth, endYear],
        closeOnSelect: true,
        RTL: false
      })
      // subscribe to the "done" event after user had selected a date
      .on('datePicker.done', function(e, result) {
        if (result instanceof Array) {
          console.log(result);
          console.log(
            new Date(result[0][1], result[0][0] - 1),
            new Date(result[1][1], result[1][0] - 1)
          );
          _self.startDate = new Date(
            new Date(result[0][1], result[0][0] - 1).setUTCHours(24, 0, 0, 0)
          ).toISOString();
          _self.endDate = new Date(
            new Date(result[1][1], result[1][0]).setUTCHours(23, 59, 59, 999)
          ).toISOString();
          _self.showReport();
        } else {
          console.log(result);
        }
      });
  }
  showReport() {
    this.reportData = [];
    //this.blockUI.start('Loading...');
    this._service
      .getMASReport(this.regionID, this.startDate, this.endDate)
      .subscribe(
        (res: any) => {
          //this.blockUI.stop();
          if (res.length) {
            // this.monthlyActiveData = res;
            this.reportData = this.getfilteredData(res);
          } else {
            this.reportData = [];
          }
        },
        err => {
          this.reportData = [];
        }
      );
    // if (masSampleData) { //check if we have data to show report
    //   this.reportData = this.getfilteredData(masSampleData);
    // } else {
    //   //Not enough data to show report
    //   this.reportData = [];
    // }
  }
  getfilteredData(inputData) {
    let filter = this.filter;
    let _self = this;
    let res = [];

    _self.locationList = [];
    _self.categoryList = [];
    _self.coursePlanList = [];
    _self.courseNameList = [];

    inputData.forEach(function(data, i) {
      Object.keys(data).forEach(function(k, i) {
        data = data[k];
        let obj = {
          groupTypeValue: k,
          students: 0
        };
        if (filter.type == 'location' && filter.value.length) {
          data = data.filter(function(d) {
            return filter.value.indexOf(d.locationName) > -1;
          });
        }
        data.forEach(function(location) {
          _self.locationList.push(location.locationName);
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
              _self.coursePlanList.push(coursePlan.coursePlanName);
              let courses = coursePlan.courses || [];
              //iterate courses under coursePlans
              if (filter.type == 'course' && filter.value.length) {
                courses = courses.filter(function(d) {
                  return filter.value.indexOf(d.locationName) > -1;
                });
              }

              courses.forEach(function(course) {
                _self.courseNameList.push(course.courseName);
                obj.students += course.students;
              });
            });
          });
        });
        res.push(obj);
      });
    });

    _self.categoryList = Array.from(new Set(_self.categoryList));
    _self.locationList = Array.from(new Set(_self.locationList));
    _self.coursePlanList = Array.from(new Set(_self.coursePlanList));
    _self.courseNameList = Array.from(new Set(_self.courseNameList));
    if (_self.initFilter) {
      _self.searchResult.value = _self.categoryList;
      _self.initFilter = false;
    }
    if (filter.value.length == 0) {
      _self.fullCategoryList = _self.categoryList;
      _self.fullLocationList = _self.locationList;
      _self.fullCourseNameList = _self.courseNameList;
      _self.fullCoursePlanList = _self.coursePlanList;
    }
    // this.reportData = res;
    return res;
  }
  updateFilterType(value) {
    if (this.filter.value.length) {
      this.updateFilterTemp = {
        value: []
      };
      for (var i = 0; i < this.filter.value.length; i++) {
        this.updateFilterTemp.value.push(this.filter.value[i]);
      }
      this.updateFilterTemp.type = this.filter.type;

      this.filter = {
        value: []
      };
    }
    switch (true) {
      case value == 'Category' || value == 'category':
        this.filter.type = 'category';
        this.searchResult.value = this.fullCategoryList;
        break;
      case value == 'Course Plan' || value == 'coursePlan':
        this.filter.type = 'coursePlan';
        this.searchResult.value = this.fullCoursePlanList;
        break;
      case value == 'Course Name' || value == 'course':
        this.filter.type = 'course';
        this.searchResult.value = this.fullCourseNameList;
        break;
      case value == 'Location' || value == 'location':
        this.filter.type = 'location';
        this.searchResult.value = this.fullLocationList;
        break;
    }
    if (this.updateFilterTemp.type == this.filter.type) {
      this.filter.value = this.updateFilterTemp.value;
      for (var i = 0; i < this.filter.value.length; i++) {
        this.searchResult.value = this.searchResult.value.filter(
          e => e !== this.filter.value[i]
        );
      }
    }
  }
  showFilterModal(content) {
    if (this.filter.value.length == 0) {
      this.updateFilterType(this.filter.type);
    }
    this.searchResult.show = false;
    this.selectFilterTemp = [];
    this.removeFilterTemp = [];
    this.updateFilterTemp = { value: [] };
    this.modalReference = this.modalService.open(content, {
      backdrop: 'static',
      windowClass: 'animation-wrap',
      size: 'lg'
    });

    this.modalReference.result.then(
      result => {
        // console.log(result);
      },
      reason => {
        // console.log(reason);
      }
    );
  }

  removeCurrentFilterForModal(value) {
    this.removeFilterTemp.push(value);
    this.filter.value = this.filter.value.filter(e => e !== value);
    this.searchResult.value.push(value);
    // this.applyFilters();
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
      var temp = this.searchResult.value;
      var filteredLists;
      for (var i = 0; i < temp.length; i++) {
        // searching input value in search box
        if (temp[i].toLowerCase().includes(value.toLowerCase())) {
          filteredLists = this.searchResult.value.filter(
            item => item !== temp[i]
          );
          filteredLists.unshift(temp[i]);
          filteredLists = Array.from(new Set(filteredLists));
          this.searchResult.value = filteredLists;
        }
      }
      this.searchResult.show = true;
    } else {
      this.searchResult.show = false;
    }
  }

  selectFilter(value) {
    this.selectFilterTemp.push(value);
    this.filter.value.push(value);
    this.searchResult.show = false;
    this.searchResult.value = this.searchResult.value.filter(e => e !== value);
  }
  applyFilters() {
    this.showReport();
    // this.getfilteredData(this.monthlyActiveData);
    this.modalReference.close();
  }

  cancelModal() {
    for (var i = 0; i < this.selectFilterTemp.length; i++) {
      this.filter.value = this.filter.value.filter(
        e => e !== this.selectFilterTemp[i]
      );
      this.searchResult.value.push(this.selectFilterTemp[i]);
    }
    for (var i = 0; i < this.removeFilterTemp.length; i++) {
      this.filter.value.push(this.removeFilterTemp[i]);
      this.searchResult.value = this.searchResult.value.filter(
        e => e !== this.removeFilterTemp[i]
      );
    }
    if (this.updateFilterTemp.value.length) {
      this.filter.value = [];
      for (var i = 0; i < this.updateFilterTemp.value.length; i++) {
        this.filter.value.push(this.updateFilterTemp.value[i]);
      }
      this.filter.type = this.updateFilterTemp.type;
    }
    switch (this.filter.type) {
      case 'category':
        this.filterModel = 'Category';
        break;
      case 'coursePlan':
        this.filterModel = 'Course Plan';
        break;
      case 'course':
        this.filterModel = 'Course Name';
        break;
      case 'location':
        this.filterModel = 'Location';
        break;
    }
    this.modalReference.close();
  }
}
