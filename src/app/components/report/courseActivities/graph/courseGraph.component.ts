import { Component, OnInit, Input, OnChanges } from '@angular/core';
@Component({
  selector: 'course-graph',
  templateUrl: './courseGraph.component.html'
})
export class CourseActivitiesReportGraph implements OnInit {
  @Input() reportItems: any;
  private _name: string;
  plotOption: any;
  echarts: any;
  barColor: any;

  ngOnChanges() {
    this.setupOption();
  }
  setupOption() {
    let _self = this;
    this.echarts = require('echarts');
    this.plotOption = {
      tooltip: {},
      grid: {
        left: 150
      },
      textStyle: {
        fontFamily: "'Inter-UI-Medium',Arial,sans-serif",
        fontSize: 12,
        color: '#64707d'
      },
      yAxis: {
        data: [],
        type: 'category',
        color: '#64707d',
        axisTick: { show: false },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#edeff0'
          }
        },
        axisLabel: {
          show: true,
          formatter: function(value) {
            var val = value.split(',');
            var text = val[0];
            var count = 10;
            return (
              '{fregment1|' +
              text.slice(0, count) +
              (text.length > count ? '...' : '') +
              '}' +
              '\n' +
              '{fregment2|' +
              val[1] +
              ' lessons}'
            );
          },
          textStyle: {
            fontSize: 12,
            lineHeight: 16,
            color: '#64707d'
          },
          rich: {
            fregment1: {
              fontSize: 16,
              lineHeight: 20,
              color: '#2e3d4d',
              fontWeight: 600
            }
          }
        },
        splitLine: { show: false }
      },
      xAxis: {
        position: 'top',
        axisTick: { show: true },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#edeff0'
          }
        },
        splitLine: { show: false, lineStyle: { color: '#64707d' } }
      },
      barWidth: 56,
      legend: {
        show: false,
        itemWidth: 16,
        itemHeight: 16,
        itemGap: 30,
        data: [{ name: 'Present', textStyle: {} }, 'Absent', 'Not taken'],
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
          name: 'Present',
          type: 'bar',
          stack: 'courseActivities',
          itemStyle: {
            normal: { color: '#91F2BA' }
          },
          symbolSize: 5,
          data: []
        },
        {
          name: 'Absent',
          type: 'bar',
          stack: 'courseActivities',
          itemStyle: {
            normal: { color: '#FF9E99' }
          },
          data: []
        },
        {
          name: 'Not taken',
          type: 'bar',
          stack: 'courseActivities',
          itemStyle: {
            normal: { color: '#EDEEF0' }
          },
          emphasis: {
            itemStyle: {
              color: '#DFE3E4'
            }
          },
          data: []
        }
      ]
    };
    let presentData = [];
    let absentData = [];
    let notTakenData = [];
    this.reportItems.forEach(function(item) {
      _self.plotOption.yAxis.data.push(
        item.groupTypeValue + ',' + item.lessons.count
      );
      presentData.push(item.lessons.present);
      absentData.push(item.lessons.absent);
      notTakenData.push(item.lessons.notTaken);
    });
    this.plotOption.series[0].data = presentData;
    this.plotOption.series[1].data = absentData;
    this.plotOption.series[2].data = notTakenData;
    this.plotGraph();
  }
  plotGraph() {
    var elem = document.getElementById('courseActiviesGraph');
    elem.removeAttribute('_echarts_instance_');
    elem.innerHTML = '';
    elem.style.height = this.reportItems.length * 125 + 'px';
    let graph = this.echarts.init(elem);
    graph.setOption(this.plotOption);
    $(window).on('resize', function() {
      if (graph != null && graph != undefined) {
        graph.resize();
      }
    });
  }
  ngOnInit() {}
}
