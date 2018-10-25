/**
 * Created By Ahtisham
 */
import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {appService} from '../../../service/app.service';
import staffData from './sampleData';


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
  groupBy = "location";
  selectedFilter:any;
  filterValues:any;
  modalReference:any;
  reportData:any;

  /**
   * Initialize the StaffPerformanceReport
   */
  constructor(private modalService:NgbModal, private _service:appService) {
    window.scroll(0, 0);
  }

  ngOnInit() {
    this.selectedFilter = "";
    this.filterValues = [];
    console.log(staffData);
    this.showReportByLocation();

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
    if (staffData) { //check if we have data to show report
      if (this.selectedFilter) {

      } else { //No filter is selected,get only location and their respective rating
        let data = staffData.location;
        //[TODO:Update better way to iterate data]
        this.reportData = this.getFinalData(data);
        console.log("result after final step");
        console.log(this.reportData);

      }
    } else {
      //Not enough data to show report
    }

  }

  getFinalData(data) {
    let result = [];
    for (var i = 0; i < data.length; i++) {
      let obj = {
        location: "",
        rating: {
          "5": 0,
          "4": 0,
          "3": 0,
          "2": 0,
          "1": 0
        },
        totalRating:0,
        ratingWeightage:0,
        averageRating:0
      };
      obj.location = data[i].locationName;
      let categories = data[i].categories || [];
      if (!categories.length) continue;
      //iterate through all categories

      for (var j = 0; j < categories.length; j++) {
        let coursePlans = categories[j].coursePlans || [];
        //iterate coursePlans under categories

        for (var k = 0; k < coursePlans.length; k++) {
          let courses = coursePlans[k].courses || [];
          //iterate courses under coursePlans
          courses.forEach(function (course) {
            let rating = course.rating || [];
            rating.forEach(function (value) {
              obj.rating[value.type] += value.count;
            });
          });
        }
      }
      obj.totalRating = Object.keys(obj.rating).reduce(function (sum, key) {
        return sum + obj.rating[key];
      }, 0);
      obj.ratingWeightage = Object.keys(obj.rating).reduce(function (sum, key) {
        return sum+ obj.rating[key]*parseInt(key);
      }, 0);
      obj.averageRating = (obj.ratingWeightage/obj.totalRating).toFixed(2);
      result.push(obj);
    }
    return result;
  }

  /**
   * showReportByCategory :[fetch and create report groupBy Category]
   */
  showReportByCategory() {

  }

  /**
   * showReportByCoursePlan :[fetch and create report groupBy CoursePlan]
   */
  showReportByCoursePlan() {

  }

  findByKey(data, key) {
    if (data.hasOwnProperty('key') && data['key'] === key) {
      return data;
    }

    for (let i = 0; i < Object.keys(data).length; i++) {
      if (typeof data[Object.keys(data)[i]] === 'object') {
        let obj = this.findByKey(data[Object.keys(data)[i]], key);
        if (obj != null) {
          return obj;
        }
      }
    }

    return null;
  }

  /**
   * updateGraphUsingGroupBy:[handle change event in groupBy filter]
   * @param event
   */
  updateGraphUsingGroupBy(event) {
    console.log(event);
  }

  /**
   * showFilterModal:[Open modal with filter fields]
   * @param content
   */
  showFilterModal(content) {
    console.log("i will show you filter modal");
    this.modalReference = this.modalService.open(content, {backdrop: 'static', windowClass: 'animation-wrap'});
    this.modalReference.result.then((result) => {
      console.log(result);
      // this.formField = new calendarField();
      // this.closeResult = `Closed with: ${result}`
    }, (reason) => {
      console.log(reason);
      // this.formField = new calendarField();
      // this.closeResult = `Closed with: ${reason}`;
    });
  }

  /**
   * updateFilterType :[called when filter input changes]
   * @param event
   */
  updateFilterType(event) {
    console.log(event);
  }

  clearSearch() {

  }

  filterSearch() {

  }
}
