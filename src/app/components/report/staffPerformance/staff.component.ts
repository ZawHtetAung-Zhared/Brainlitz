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
  _self:this;
  /**
   * Initialize the StaffPerformanceReport
   */
  constructor(private modalService:NgbModal, private _service:appService) {
    window.scroll(0, 0);
  }

  ngOnInit() {
    this.selectedFilter = "";
    this.filter = {type: "course", value: ["courseName1"]};
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
      if (this.filter.value.length) {
        //yes we have filter
        this.reportData = this.getFilteredDataOfTypeLocation(staffData.location);
        console.log("data after filter");
        console.log(this.reportData);
       
      } else { //No filter is selected,get only location and their respective rating
        this.reportData = this.getFinalData(staffData.location);
      }
    } else {
      //Not enough data to show report
    }

  }

  getFinalData(data) {
    let result = [];
    for (let i = 0; i < data.length; i++) {
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
        id: "graph" + i
      };

      obj.location = data[i].locationName;
      let categories = data[i].categories || [];
      if (!categories.length) continue;
      //iterate through all categories

      for (let j = 0; j < categories.length; j++) {
        let coursePlans = categories[j].coursePlans || [];
        //iterate coursePlans under categories

        for (let k = 0; k < coursePlans.length; k++) {
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
        return sum + obj.rating[key] * parseInt(key);
      }, 0);
      obj.averageRating = parseFloat((obj.ratingWeightage / obj.totalRating).toFixed(2));
      result.push(obj);
    }
    return result;
  }

  /**
   * getFilteredDataOfTypeLocation:[filter data based on user selected values (groupBy location type)]
   * @param data
   */
  getFilteredDataOfTypeLocation(data) {
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
        res = filterDataByCoursePlan(data);
        break;
      case "course":
        res = filterDataByCourse(data);
        break;
      default:
        res = this.getFinalData(data);

    }
    return res;
    function filterDataByLocation(data) {
      let result = [];
      data = data.filter(function (d) {
        return filter.value.indexOf(d.locationName) > -1;
      });
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
