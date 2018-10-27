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
  filter:any;
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
    this.filter = {type: "location", value: ["location2","location1"]};
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

    //[TODO:Update better way to iterate data]

    if (staffData) { //check if we have data to show report
      let result = this.getFilteredDataGroupByLocation(staffData.location);
      if(result.length && this.filter && this.filter.type !='location'){
        let _self = this;
        result.forEach(function(item, index) {
          if (index < result.length - 1) {
            let next = result[index + 1];
            if(item.location == next.location && item.filterValue == next.filterValue ){
              //Match found , merge two object
              Object.keys(item.rating).forEach(function(key) {
                console.log(key,item.rating[key]);
                item.rating[key]+=next.rating[key];
              });
              item.totalRating = _self.getTotalRating(item.rating);
              item.ratingWeightage = _self.getRatingWeightage(item.rating);
              item.averageRating = parseFloat((item.ratingWeightage / item.totalRating).toFixed(2));
              result.splice(index+1, 1);
            }

          }
        });
        this.reportData = result;
      }else{
        this.reportData = result;
      }
    } else {
      //Not enough data to show report
      this.reportData =[];
    }

  }
  /**
   * getFilteredDataOfTypeLocation:[filter data based on user selected values (groupBy location type)]
   * @param data
   */
  getFilteredDataGroupByLocation(data) {
    let filter = this.filter;
    let _self = this;
    let res = [];
    switch (filter.type) {
      case "location":
        data = data.filter(function (d) {
          return filter.value.indexOf(d.locationName) > -1;
        });
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
      console.log(data);
      let result = [];
      let obj = {
        location: "",
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
        filterValue:"",
        id: "graph" + Math.floor(Math.random() * 100)
      };
      data.forEach(function (location) {
        //if filter type is location, we will push to end of this loop
        let categories = location.categories || [];
        categories.forEach(function (category) {
          let coursePlans = category.coursePlans || [];
          //iterate coursePlans under categories
          coursePlans.forEach(function (coursePlan) {
            let courses = coursePlan.courses || [];
            //iterate courses under coursePlans
            courses.forEach(function (course) {
              let rating = course.rating || [];
              rating.forEach(function (value) {
                obj.rating[value.type] += value.count;
              });
            });
          });
        });
        obj.totalRating = _self.getTotalRating(obj.rating);
        obj.ratingWeightage = _self.getRatingWeightage(obj.rating);
        obj.averageRating = parseFloat((obj.ratingWeightage / obj.totalRating).toFixed(2));
        obj.location = location.locationName;
        result.push(obj);
      });
      return result;
    }

    function filterDataByCategory(data) {
      let result = [];
      data.forEach(function (location) {
        let categories = location.categories || [];
        let obj = {
          location: location.locationName,
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
          filterValue:"",
          id: "graph" + Math.floor(Math.random() * 100)
        };
        categories = categories.filter(function (d) {
          return filter.value.indexOf(d.catName) > -1;
        });
        categories.forEach(function (category) {
          let coursePlans = category.coursePlans || [];
          //iterate coursePlans under categories
          coursePlans.forEach(function (coursePlan) {
            let courses = coursePlan.courses || [];
            //iterate courses under coursePlans
            courses.forEach(function (course) {
              let rating = course.rating || [];
              rating.forEach(function (value) {
                obj.rating[value.type] += value.count;
              });
            });
          });
          obj.totalRating = _self.getTotalRating(obj.rating);
          obj.ratingWeightage = _self.getRatingWeightage(obj.rating);
          obj.averageRating = parseFloat((obj.ratingWeightage / obj.totalRating).toFixed(2));
          obj.filterValue = category.catName;
          result.push(obj);
        });
      });
      return result;
    }

    function filterDataByCoursePlan(data) {
      console.log("filterDataByCoursePlan");
      let result = [];
      data.forEach(function (location) {
        let categories = location.categories || [];
        categories.forEach(function (category) {
          let obj = {
            location: location.locationName,
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
            filterValue:'',
            id: "graph" + Math.floor(Math.random() * 100)
          };
          let coursePlans = category.coursePlans || [];
          //iterate coursePlans under categories
          coursePlans = coursePlans.filter(function (d) {
            return filter.value.indexOf(d.coursePlanName) > -1;
          });
          coursePlans.forEach(function (coursePlan) {
            let courses = coursePlan.courses || [];
            //iterate courses under coursePlans
            courses.forEach(function (course) {
              let rating = course.rating || [];
              rating.forEach(function (value) {
                obj.rating[value.type] += value.count;
              });
            });
            obj.totalRating = _self.getTotalRating(obj.rating);
            obj.ratingWeightage = _self.getRatingWeightage(obj.rating);
            obj.averageRating = parseFloat((obj.ratingWeightage / obj.totalRating).toFixed(2));
            obj.filterValue = coursePlan.coursePlanName;
            result.push(obj);
          });
        });
      });
      return result;
    }

    function filterDataByCourse(data) {
      let result = [];
      data.forEach(function (location) {
        let categories = location.categories || [];
        categories.forEach(function (category) {
          let coursePlans = category.coursePlans || [];
          //iterate coursePlans under categories
          coursePlans.forEach(function (coursePlan) {
            let obj = {
              location: location.locationName,
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
              filterValue:"",
              id: "graph" + Math.floor(Math.random() * 100)
            };
            let courses = coursePlan.courses || [];
            //iterate courses under coursePlans
            courses = courses.filter(function (d) {
              return filter.value.indexOf(d.courseName) > -1;
            });
            courses.forEach(function (course) {
              let rating = course.rating || [];
              rating.forEach(function (value) {
                obj.rating[value.type] += value.count;
              });
              obj.totalRating = _self.getTotalRating(obj.rating);
              obj.ratingWeightage = _self.getRatingWeightage(obj.rating);
              obj.averageRating = parseFloat((obj.ratingWeightage / obj.totalRating).toFixed(2));
              obj.filterValue = course.courseName;
              result.push(obj);
            });

          });
        });
      });
      return result;
    }
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

    }, (reason) => {
      console.log(reason);
    });
  }

  /**
   * updateFilterType :[called when filter input changes]
   * @param event
   */
  updateFilterType(event) {
    console.log(event);
  }

  getObject(location, arr) {
    let obj = {
      location: location,
      totalRating: this.getTotalRating(arr),
      ratingWeightage: this.getRatingWeightage(arr),
      averageRating: 0,
      filterValue: "",
      id: "graph" + Math.floor(Math.random() * 100)
    };
    obj.averageRating = parseFloat((obj.ratingWeightage / obj.totalRating).toFixed(2));
    return obj;
  }

  getTotalRating(arr) {
    return Object.keys(arr).reduce(function (sum, key) {
      return sum + arr[key];
    }, 0);
  }

  getRatingWeightage(arr) {
    return Object.keys(arr).reduce(function (sum, key) {
      return sum + arr[key] * parseInt(key);
    }, 0);
  }

  clearSearch() {

  }

  filterSearch() {

  }
}
