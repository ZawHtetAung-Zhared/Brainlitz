import { Component, OnInit, HostListener } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
import { Location } from '@angular/common';
import sampleData from './../sampleData';

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.css']
})
export class ReportDetailComponent implements OnInit {
  isSticky: boolean = false;
  isStickyInnerHeader: boolean = false;
  previousUrl: string;
  public active = 'courses';
  plotOption: any;
  echarts: any;
  reportItems: any;
  masteriesReports: any = [
    { id: 1, name: 'Light Energy', data: sampleData },
    { id: 2, name: 'Heat Energy', data: sampleData }
  ];
  public isExpand: boolean = true;
  public isAdvance: boolean = false;
  public seriesData: any;
  advanceSeries: any = [
    {
      name: 'Struggling',
      type: 'bar',
      stack: 'energy',
      itemStyle: {
        normal: { color: '#2D5E9E' }
      },
      symbolSize: 3,
      data: []
    },
    {
      name: 'In progress',
      type: 'bar',
      stack: 'energy',
      itemStyle: {
        normal: { color: '#46AACE' }
      },
      data: []
    },
    {
      name: 'Need revision',
      type: 'bar',
      stack: 'energy',
      itemStyle: {
        normal: { color: '#8ACDCE' }
      },
      data: []
    },
    {
      name: 'Mastered w/ difficulties',
      type: 'bar',
      stack: 'energy',
      itemStyle: {
        normal: { color: '#B7DFCB' }
      },
      data: []
    },
    {
      name: 'Mastered w/ ease',
      type: 'bar',
      stack: 'energy',
      itemStyle: {
        normal: { color: '#DCECC9' }
      },
      data: []
    },
    {
      name: 'Not started',
      type: 'bar',
      stack: 'energy',
      itemStyle: {
        normal: { color: '#E3E4E5' }
      },
      data: []
    }
  ];
  normalSeries: any = [
    {
      name: 'Struggling',
      type: 'bar',
      stack: 'energy',
      itemStyle: {
        normal: { color: '#2D5E9E' }
      },
      symbolSize: 3,
      data: []
    },
    {
      name: 'In progress',
      type: 'bar',
      stack: 'energy',
      itemStyle: {
        normal: { color: '#46AACE' }
      },
      data: []
    },
    {
      name: 'Mastered',
      type: 'bar',
      stack: 'energy',
      itemStyle: {
        normal: { color: '#DCECC9' }
      },
      data: []
    },
    {
      name: 'Not started',
      type: 'bar',
      stack: 'energy',
      itemStyle: {
        normal: { color: '#E3E4E5' }
      },
      data: []
    }
  ];

  constructor(private _location: Location, private router: Router) {}

  ngOnInit() {
    this.masteriesReports = this.masteriesReports.filter(function(res) {
      return res.id == localStorage.getItem('mastery_reportId');
    });
    this.reportItems = this.masteriesReports[0].data;
    if (this.isAdvance) this.seriesData = this.advanceSeries;
    else this.seriesData = this.normalSeries;
    this.setupOption(this.isExpand, this.isAdvance);
  }

  @HostListener('window:scroll', ['$event']) onScroll($event) {
    if (window.pageYOffset > 81) {
      this.isSticky = true;
    } else {
      this.isSticky = false;
    }
    if (window.pageYOffset > 138) {
      this.isStickyInnerHeader = true;
    } else {
      this.isStickyInnerHeader = false;
    }
  }

  backTo() {
    this._location.back();
    localStorage.removeItem('mastery_reportId');
  }

  setupOption(expandOn, advanceOn) {
    this.echarts = require('echarts');
    this.plotOption = {
      tooltip: {},
      grid: {
        left: 250
      },
      textStyle: {
        fontFamily: "'Inter-UI-Medium',Arial,sans-serif",
        fontSize: 12,
        color: '#64707d'
      },
      title: {
        text: 'Mastery status progress (percentage of students)',
        left: 'center',
        textStyle: {
          fontSize: 17,
          color: '#5C6773'
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
          textStyle: {
            fontSize: 12,
            lineHeight: 16,
            color: '#64707d',
            align: 'right'
          },
          formatter: function(value) {
            // value=value+'';
            if (value.length > 40) {
              return value.substring(0, 40) + '...';
            } else {
              return value;
            }
          }
        },
        splitLine: { show: false },
        left: 'left'
      },
      xAxis: {
        position: 'top',
        axisLabel: {
          show: true,
          formatter: '{value} %'
        },
        axisTick: { show: false },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#edeff0'
          }
        },
        splitLine: { show: true, lineStyle: { color: '#E8E9EB' } }
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
          'In progress',
          'Need revision',
          'Mastered w/ difficulties',
          'Mastered w/ ease',
          'Not started'
        ],
        formatter: function(value) {
          return value;
        },
        rich: {
          fregment2: {
            borderRadius: 16
          }
        }
      },
      series: this.seriesData
    };
    let yAxisData = [];
    let strugglingData = [];
    let inprogressData = [];
    let notTakenData = [];
    let easeData = [];
    let diffData = [];
    let index = 0;
    this.reportItems.forEach(function(item) {
      if (expandOn == true) yAxisData.push(++index + ' ' + item.groupTypeValue);
      else yAxisData.push(++index);
      strugglingData.push(item.lessons.present);
      diffData.push(item.lessons.diff);
      easeData.push(item.lessons.ease);
      inprogressData.push(item.lessons.absent);
      notTakenData.push(item.lessons.notTaken);
    });
    this.plotOption.yAxis.data = yAxisData;
    if (advanceOn) {
      this.plotOption.series[0].data = strugglingData;
      this.plotOption.series[1].data = inprogressData;
      this.plotOption.series[3].data = diffData;
      this.plotOption.series[4].data = easeData;
      this.plotOption.series[5].data = notTakenData;
    } else {
      this.plotOption.series[0].data = strugglingData;
      this.plotOption.series[1].data = inprogressData;
      this.plotOption.series[2].data = easeData;
      this.plotOption.series[3].data = notTakenData;
    }
    if (!expandOn) {
      this.plotOption.xAxis.axisLabel.show = false;
      this.plotOption.xAxis.splitLine.show = false;
    }
    this.plotGraph(expandOn);
  }

  plotGraph(expandOn) {
    var elem = document.getElementById('mastery_detail');
    elem.removeAttribute('_echarts_instance_');
    elem.innerHTML = '';
    if (expandOn) {
      if (this.reportItems.length > 10)
        elem.style.height = this.reportItems.length * 70 + 'px';
      else elem.style.height = this.reportItems.length * 80 + 'px';
    } else {
      if (this.reportItems.length > 10)
        elem.style.height = this.reportItems.length * 40 + 'px';
      else elem.style.height = this.reportItems.length * 50 + 'px';
    }
    let graph = this.echarts.init(elem);
    graph.setOption(this.plotOption);
  }

  changeGraph(value) {
    if (value == 'expand') this.isExpand = !this.isExpand;
    else if (value == 'advance') this.isAdvance = !this.isAdvance;
    if (this.isAdvance) {
      this.seriesData = this.advanceSeries;
    } else {
      this.seriesData = this.normalSeries;
    }
    this.setupOption(this.isExpand, this.isAdvance);
  }
}
