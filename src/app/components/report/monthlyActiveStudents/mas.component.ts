import {Component, OnInit} from '@angular/core';
import {DaterangepickerConfig} from 'ng2-daterangepicker';
import {NgbModal, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import {appService} from '../../../service/app.service';
import masSampleData from './sampleData';

@Component({
  selector: 'monthly-active-std-report',
  templateUrl: './mas.component.html',
  styleUrls: ['../report.component.css'] // we share same style url for all nested report component
})
export class MonthlyActiveStudentsReport implements OnInit {
  masGroupByList = ['Location', 'Category', 'Course Plan'];
  filterList = ['Category', 'Course Plan', 'Course Name', 'Location'];
  categoryList = ['Art & Science', 'Dance', 'Education', 'Sports', 'Technology'];
  locationList = ['Woodland', 'Yishun', 'Admiralty', 'Bedok', 'Sembawang'];
  coursePlanList = ['Advanced', 'Beginner', 'Individual', 'Weekend'];
  courseNameList = ['Business Administration', 'Management Studies', '3D Animation', 'Facebook Marketing', 'Cyber Security', 'Math Classes', 'Orchestra', 'Guitar', 'Hip Hop', 'Piano', 'Meditation & Yoga', 'Health & Fitness', 'Sports Science'];
  searchResult:any;
  groupBy = "location";
  selectedFilter:any;
  filter:any;
  modalReference:any;
  reportData:any;
  selectedFilterType:any;
  daterange:any = {};
  options:any;

  constructor(private daterangepickerOptions:DaterangepickerConfig, private modalService:NgbModal, private _service:appService) {
    window.scroll(0, 0);
    this.daterangepickerOptions.settings = {
      locale: {format: 'd m YYYY'},
      alwaysShowCalendars: true,
      ranges: {
        'Today': [moment()],
        'Yesteday': [moment().subtract(1, 'days'), moment()],
        'Last Month': [moment().subtract(1, 'month'), moment()],
        'Last 3 Months': [moment().subtract(4, 'month'), moment()],
        'Last 6 Months': [moment().subtract(6, 'month'), moment()],
        'Last 12 Months': [moment().subtract(12, 'month'), moment()],
        'Last 18 Months': [moment().subtract(18, 'month'), moment()],
      }
    };
  }

  ngOnInit() {
    this.selectedFilter = "";
    this.selectedFilterType = '0';
    this.filter = {type: "", 'value': []};
    this.searchResult = {
      show: false,
      value: []
    };
    this.options = {
      startDate: moment().startOf('hour'),
      endDate: moment().startOf('hour').add(32, 'hour'),
      locale: {format: 'ddd, DD MMM YYYY'},
      alwaysShowCalendars: true,
    };
    this.reportData = [];
    this.showReport();
  }
  showReport(){
    if (masSampleData) { //check if we have data to show report
      this.reportData = this.getfilteredData(masSampleData);
    } else {
      //Not enough data to show report
      this.reportData = [];
    }
  }
  getfilteredData(inputData){
    let filter = this.filter;
    let _self = this;
    let res = [];
    inputData.forEach(function(data, i) {
      Object.keys(data).forEach(function(k,i){
        data = data[k];
        let obj = {
          groupTypeValue: k,
          students: 0
        };
        if(filter.type == "location"){
          data = data.filter(function (d) {
            return filter.value.indexOf(d.locationName) > -1;
          });
        }
        data.forEach(function (location) {
          let categories = location.categories || [];
          if(filter.type == "category"){
            categories = categories.filter(function (d) {
              return filter.value.indexOf(d.catName) > -1;
            });
          }
          categories.forEach(function (category) {
            let coursePlans = category.coursePlans || [];

            if(filter.type == "coursePlan"){
              coursePlans = coursePlans.filter(function (d) {
                return filter.value.indexOf(d.coursePlanName) > -1;
              });
            }

            //iterate coursePlans under categories
            coursePlans.forEach(function (coursePlan) {
              let courses = coursePlan.courses || [];
              //iterate courses under coursePlans
              if(filter.type == "course"){
                courses = courses.filter(function (d) {
                  return filter.value.indexOf(d.locationName) > -1;
                });
              }

              courses.forEach(function (course) {
                obj.students += course.students;
              });
            });
          });
        });
        res.push(obj);
      });
    });
    return res;
  }
  updateFilterType(value) {
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
  showFilterModal(content) {
    this.searchResult.show = false;
    this.searchResult.value = this.categoryList;
    this.filter = {
      type: "category",
      value: []
    };
    this.modalReference = this.modalService.open(content, {
      backdrop: 'static',
      windowClass: 'animation-wrap',
      size: 'lg'
    });

    this.modalReference.result.then((result) => {
      console.log(result);
    }, (reason) => {
      console.log(reason);
    });
  }

  removeCurrentFilter(value) {
    this.filter.value = this.filter.value.filter(e => e !== value);
    this.searchResult.value.push(value);
    if (!this.filter.value.length) {
      this.filter.type = ""
    }
    ;
    this.applyFilters();
  }

  removeAllFilters() {
    this.filter = {
      type: "",
      value: []
    };
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
    switch (this.groupBy) {
      case "location":
        //this.showReportByLocation();
        break;
      case "category":
        //this.showReportByCategory();
        break;
      case "coursePlan":
        //this.showReportByCoursePlan();
        break;
    }

    this.modalReference.close();
  }
}
