import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import sampleData from './sampleData';
import { appService } from '../../../service/app.service';
import { DataService } from '../../../service/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-masteriesreport',
  templateUrl: './masteriesreport.component.html',
  styleUrls: ['./masteriesreport.component.css']
})
export class MasteriesreportComponent implements OnInit {
  plotOption: any;
  echarts: any;
  barColor: any;
  reportItems: any = sampleData;
  masteriesReports: any;
  public isExpand: boolean = false;
  public noData: boolean = true;
  // public

  constructor(
    private _service: appService,
    private _data: DataService,
    private toastr: ToastrService
  ) {}

  ngOnChanges() {}

  setupOption(idx) {
    // var yMax = 40;
    // var dataShadow = [];
    // for (var i = 0; i < this.reportItems.length; i++) {
    //   dataShadow.push(yMax);
    // }
    this.echarts = require('echarts');
    this.plotOption = {
      tooltip: {
        formatter: function(params) {
          let value =
            '<div style="padding:5px 10px;">' +
            params.seriesName +
            ' : ' +
            params.value +
            '% </div>';
          return value;
        }
      },
      grid: {
        top: 30,
        left: 50
      },
      textStyle: {
        fontFamily: "'Inter-UI-Medium',Arial,sans-serif",
        fontSize: 12,
        color: '#64707d'
      },
      title: {
        text: 'Mastery status progress (percentage of students)',
        left: 45,
        textStyle: {
          fontSize: 17,
          color: '#363F4D'
        }
      },
      yAxis: {
        data: [],
        type: 'category',
        inverse: true,
        color: '#64707d',
        axisTick: { show: false },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#edeff0'
          }
        },
        axisLabel: {
          show: true,
          margin: 20,
          textStyle: {
            fontSize: 12,
            lineHeight: 16,
            color: '#64707d'
          }
        },
        splitLine: { show: false }
      },
      xAxis: {
        position: 'top',
        axisLabel: {
          show: false
        },
        axisTick: { show: false },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#edeff0'
          }
        },
        splitLine: { show: false, lineStyle: { color: '#64707d' } }
      },
      barWidth: 20,
      legend: {
        show: false,
        bottom: 0,
        itemWidth: 16,
        itemHeight: 16,
        itemGap: 20,
        data: [
          { name: 'Struggling', textStyle: {} },
          'Not started',
          'Inconclusive',
          'Mastered w/ difficulties',
          'Mastered w/ ease'
        ]
      },
      series: [
        // {
        //   type: 'bar',
        //   itemStyle: {
        //     color: 'rgba(0,0,0,0.05)'
        //   },
        //   barGap: '-100%',
        //   barCategoryGap: '40%',
        //   data: dataShadow,
        //   animation: false
        // },
        {
          name: 'Struggling',
          type: 'bar',
          stack: 'energy',
          itemStyle: {
            normal: { color: '#BF2926' }
          },
          symbolSize: 3,
          data: []
        },
        {
          name: 'Not started',
          type: 'bar',
          stack: 'energy',
          itemStyle: {
            normal: { color: '#EDEEF0' }
          },
          data: []
        },
        {
          name: 'Inconclusive',
          type: 'bar',
          stack: 'energy',
          itemStyle: {
            normal: { color: '#D4D5D6' }
          },
          data: []
        },
        {
          name: 'Mastered w/ difficulties',
          type: 'bar',
          stack: 'energy',
          itemStyle: {
            normal: { color: '#6DC000' }
          },
          data: []
        },
        {
          name: 'Mastered w/ ease',
          type: 'bar',
          stack: 'energy',
          itemStyle: {
            normal: { color: '#4FDD00' }
          },
          data: []
        }
      ]
    };
    let yAxisData = [];
    let strugglingData = [];
    let inprogressData = [];
    let notTakenData = [];
    let easeData = [];
    let diffData = [];
    let index = 0;
    this.reportItems.forEach(function(item) {
      yAxisData.push(++index);
      strugglingData.push(item.userMasteries.STRUGGLE.percentage);
      easeData.push(item.userMasteries.MASTERED_WITH_EASE.percentage);
      diffData.push(item.userMasteries.MASTERED_WITH_DIFFICULT.percentage);
      inprogressData.push(item.userMasteries.INPROGRESS.percentage);
      notTakenData.push(item.userMasteries.NEW.percentage);
    });
    this.plotOption.yAxis.data = yAxisData;
    this.plotOption.series[0].data = strugglingData;
    this.plotOption.series[1].data = notTakenData;
    this.plotOption.series[2].data = inprogressData;
    this.plotOption.series[3].data = diffData;
    this.plotOption.series[4].data = easeData;
    this.plotGraph(idx);
  }

  plotGraph(index) {
    var elem = document.getElementById(this.masteriesReports[index]._id);
    elem.removeAttribute('_echarts_instance_');
    elem.innerHTML = '';
    if (this.reportItems.length > 10)
      elem.style.height = this.reportItems.length * 50 + 'px';
    else if (this.reportItems.length >= 5)
      elem.style.height = this.reportItems.length * 60 + 'px';
    else elem.style.height = this.reportItems.length * 70 + 'px';
    let graph = this.echarts.init(elem);
    graph.setOption(this.plotOption);
    $(window).on('resize', function() {
      if (graph != null && graph != undefined) {
        graph.resize();
      }
    });
  }

  ngOnInit() {
    this.getAllGraph();
  }

  ngAfterViewInit() {}

  expandGraph(id) {
    this.isExpand = true;
    localStorage.setItem('mastery_reportId', id);
  }

  getAllGraph() {
    this.isExpand = false;
    // setTimeout(() => {
    //   for (var i = 0; i < this.masteriesReports.length; i++) {
    //     this.reportItems = this.masteriesReports[i].data;
    //     this.setupOption(i);
    //   }
    // }, 200);

    this._service.getMasteryReports().subscribe(
      (res: any) => {
        console.log(res);
        this._data.setMasteryData(res);
        if (res.data.masteryReport) {
          this.noData = false;
          this.masteriesReports = res.data.masteryReport;
          console.log(this.masteriesReports);
          setTimeout(() => {
            for (var i = 0; i < this.masteriesReports.length; i++) {
              //calculate mastered percentage
              var mastered =
                this.masteriesReports[i].masteryCountInPercentage
                  .MASTERED_WITH_DIFFICULT +
                this.masteriesReports[i].masteryCountInPercentage
                  .MASTERED_WITH_EASE;
              this.masteriesReports[i].masteryCountInPercentage.MASTERED =
                Math.round((mastered + Number.EPSILON) * 100) / 100;
              // end calculation
              this.reportItems = this.masteriesReports[i].masteries;
              this.setupOption(i);
            }
          }, 200);
        } else {
          this.noData = false;
          // this.toastr.error('No masteries report for this course.');
        }
      },
      err => {
        this.toastr.error(err.error.message);
        console.log(err);
        this.noData = true;
      }
    );
  }
}
