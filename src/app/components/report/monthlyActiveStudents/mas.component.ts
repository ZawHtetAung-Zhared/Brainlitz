import {Component, OnInit} from '@angular/core';
import {DaterangepickerConfig} from 'ng2-daterangepicker';
import {NgbModal, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import {appService} from '../../../service/app.service';
import masSampleData from './sampleData';
declare var $:any;
import { BlockUI, NgBlockUI } from 'ng-block-ui';

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
  filter:any;
  modalReference:any;
  reportData:any;
  daterange:any = {};
  options:any;
  filterModel:any;
  startDate:any;
  endDate:any;
  public regionID = localStorage.getItem('regionId');
  @BlockUI() blockUI: NgBlockUI;
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
    this.options = {
      startDate: moment('04-01-2018').startOf('hour'),
      endDate: moment().startOf('hour'),
      locale: {format: 'MMM YYYY'},
      alwaysShowCalendars: true,
    };
    this.reportData = [];
    this.showReport();
  }
  ngAfterViewInit(){
    let _self = this;
    var endMonth = moment().month();
    var endYear = moment().year();
    console.log(endMonth,endYear);
    $('#monthRangePicker')
      .rangePicker({  setDate:[[2,2015],[endMonth,endYear]],minDate:[2,2015], maxDate:[endMonth,endYear],closeOnSelect:true, RTL:false })
      // subscribe to the "done" event after user had selected a date
      .on('datePicker.done', function(e, result){
        if( result instanceof Array ){
          console.log(new Date(result[0][1], result[0][0] - 1), new Date(result[1][1], result[1][0] - 1));
          _self.startDate = (new Date(result[0][1], result[0][0] - 1)).toISOString();
          _self.endDate = (new Date(result[1][1], result[1][0] - 1)).toISOString();
          _self.showReport();
        }
        else{
          console.log(result);
        }
      });
  }
  showReport(){
    this.reportData = [];
    this.blockUI.start('Loading...');
    this._service.getMASReport(this.regionID,this.startDate,this.endDate)
      .subscribe((res:any) => {
        this.blockUI.stop();
        if(res.length){
          this.reportData = this.getfilteredData(res);
        }else{
          this.reportData = [];
        }
      },err => {
        this.reportData = [];
      });
    // if (masSampleData) { //check if we have data to show report
    //   this.reportData = this.getfilteredData(masSampleData);
    // } else {
    //   //Not enough data to show report
    //   this.reportData = [];
    // }
  }
  getfilteredData(inputData){
    let filter = this.filter;
    let _self = this;
    let res = [];

    _self.locationList = [];
    _self.categoryList = [];
    _self.coursePlanList = [];
    _self.courseNameList = [];

    inputData.forEach(function(data, i) {
      Object.keys(data).forEach(function(k,i){
        data = data[k];
        let obj = {
          groupTypeValue: k,
          students: 0
        };
        if(filter.type == "location" && filter.value.length){
          data = data.filter(function (d) {
            return filter.value.indexOf(d.locationName) > -1;
          });
        }
        data.forEach(function (location) {
          _self.locationList.push(location.locationName);
          let categories = location.categories || [];
          if(filter.type == "category" && filter.value.length){
            categories = categories.filter(function (d) {
              return filter.value.indexOf(d.catName) > -1;
            });
          }
          categories.forEach(function (category) {
            _self.categoryList.push(category.catName);
            let coursePlans = category.coursePlans || [];

            if(filter.type == "coursePlan" && filter.value.length){
              coursePlans = coursePlans.filter(function (d) {
                return filter.value.indexOf(d.coursePlanName) > -1;
              });
            }

            //iterate coursePlans under categories
            coursePlans.forEach(function (coursePlan) {
              _self.coursePlanList.push(coursePlan.coursePlanName);
              let courses = coursePlan.courses || [];
              //iterate courses under coursePlans
              if(filter.type == "course" && filter.value.length){
                courses = courses.filter(function (d) {
                  return filter.value.indexOf(d.locationName) > -1;
                });
              }

              courses.forEach(function (course) {
                _self.courseNameList.push(course.courseName);
                obj.students += course.students;
              });
            });
          });
        });
        res.push(obj);
      });
    });

    _self.categoryList =  Array.from(new Set(_self.categoryList));
    _self.locationList = Array.from(new Set(_self.locationList));
    _self.coursePlanList = Array.from(new Set(_self.coursePlanList));
    _self.courseNameList = Array.from(new Set(_self.courseNameList));

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
    this.modalReference = this.modalService.open(content, {
      backdrop: 'static',
      windowClass: 'animation-wrap',
      size: 'lg'
    });

    this.modalReference.result.then((result) => {
     // console.log(result);
    }, (reason) => {
     // console.log(reason);
    });
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
    this.showReport();
    this.modalReference.close();
  }
}
