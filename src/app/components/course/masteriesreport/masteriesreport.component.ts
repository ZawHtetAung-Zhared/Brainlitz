import { Component, OnInit } from '@angular/core';
import sampleData from './sampleData';

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

  constructor() {}

  ngOnChanges() {
    this.setupOption();
  }

  setupOption() {
    var yMax = 40;
    var dataShadow = [];
    for (var i = 0; i < sampleData.length; i++) {
      dataShadow.push(yMax);
    }
    this.echarts = require('echarts');
    this.plotOption = {
      tooltip: {},
      grid: {
        left: 50
      },
      textStyle: {
        fontFamily: "'Inter-UI-Medium',Arial,sans-serif",
        fontSize: 12,
        color: '#64707d'
      },
      title: {
        text: 'Mastery status progress (percentage of students)',
        left: 45
      },
      yAxis: {
        data: [],
        type: 'category',
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
          formatter: function(value) {
            return value;
          },
          textStyle: {
            fontSize: 12,
            lineHeight: 16,
            color: '#64707d',
            padding: 10
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
        show: true,
        bottom: 0,
        itemWidth: 16,
        itemHeight: 16,
        itemGap: 20,
        data: [
          { name: 'Struggling', textStyle: {} },
          'In progress',
          'Mastered w/ ease'
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
      series: [
        {
          // For shadow
          type: 'bar',
          itemStyle: {
            color: 'rgba(0,0,0,0.05)'
          },
          barGap: '-100%',
          barCategoryGap: '40%',
          data: dataShadow,
          animation: false
        },
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
          name: 'Mastered w/ ease',
          type: 'bar',
          stack: 'energy',
          itemStyle: {
            normal: { color: '#DCECC9' }
          },
          data: []
        }
      ]
    };
    let yAxisData = [];
    let presentData = [];
    let absentData = [];
    let notTakenData = [];
    let index = 0;
    this.reportItems.forEach(function(item) {
      yAxisData.push(++index);
      presentData.push(item.lessons.present);
      absentData.push(item.lessons.absent);
      notTakenData.push(item.lessons.notTaken);
    });
    this.plotOption.yAxis.data = yAxisData.reverse();
    this.plotOption.series[1].data = presentData.reverse();
    this.plotOption.series[2].data = absentData.reverse();
    this.plotOption.series[3].data = notTakenData.reverse();
    this.plotGraph();
  }

  plotGraph() {
    var elem = document.getElementById('masteryHeatGrap');
    elem.removeAttribute('_echarts_instance_');
    elem.innerHTML = '';
    elem.style.height = this.reportItems.length * 40 + 'px';
    let graph = this.echarts.init(elem);
    graph.setOption(this.plotOption);
  }

  ngOnInit() {
    this.setupOption();
  }
}
