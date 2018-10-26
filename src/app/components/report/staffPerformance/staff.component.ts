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
        setTimeout(() => {


        if (this.reportData.length) {
          let echarts = require('echarts');
          let barColor=[0,'#ffb6b3','#ffd2b3','#ffea80','#c3e6a1','#aaf2c8'];
          let option = {

            tooltip: {
              backgroundColor:'#3d454d',
              formatter: function (params) {
                let value = '<div style="padding:5px 10px;">'+params.data.value+(params.data.value <= 1  ? ' rating':' ratings');
                value += '<br/>';
                value += (params.dataIndex+1) + ' ';
                for (let i = 0; i <= params.dataIndex;i++){
                  value+='<span class="fa fa-star"></span>';
                }
                value += '</div>';

                return value ;
              }
            },
            textStyle:{
              fontFamily:'Montserrat-Medium'
            },
            grid: {
              top: 30,
              bottom:10,
              left:30
            },

            yAxis: {
              data: ["1", "2", "3", "4", "5"],
              axisTick: {show: false},
              axisLine: {show: false,lineStyle:{
                color:"#64707d"
              }},
              axisLabel: {margin:8},

            },
            xAxis: {
              position: 'top',
              axisTick: {show: false},
              axisLine: {show: false,lineStyle:{
                color:"#64707d"
              }},
              splitLine: {lineStyle:{color:'#edeff0'}},
            },
            barWidth:16,
            bargap:'10%',
            series: [{
              name: 'Rating',
              type: 'bar',
              data: []
            }]
          };
          this.reportData.forEach(function (report, index) {
            console.log(report, index);
            option.series[0].data=[];
             let elem = document.getElementById(report.id);
            console.log(elem);
             let graph = echarts.init(elem);
            for (var key in report.rating) {
              let obj = {
                value:report.rating[key],
                name:'Hola',
                itemStyle: {
                  color: barColor[key],

                }
              };
              option.series[0].data.push(obj);
              graph.setOption(option);
            }
            // report.rating.forEach(function(value,index){
            //   console.log(value);
            // });

            option.series[0].data.push(report.rating);

          });
        }
         },2000);
        //

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
        totalRating: 0,
        ratingWeightage: 0,
        averageRating: 0,
        id: "graph" + i
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
        return sum + obj.rating[key] * parseInt(key);
      }, 0);
      obj.averageRating = (obj.ratingWeightage / obj.totalRating).toFixed(2);
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
