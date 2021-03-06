import { Component, OnInit, Input, OnChanges } from '@angular/core';
@Component({
  selector: 'std-enrolment-graph',
  templateUrl: './stdEnrolment.component.html'
})
export class StdEnrolmentReportGraph implements OnInit {
  @Input() reportItems: any;
  plotOption: any;
  echarts: any;
  barColor: any;
  ngOnChanges() {
    this.setupOption();
  }
  setupOption() {
    this.barColor = ['#EC407F', '#FDEAC5', '#C4FBEB', '#C5EBFC', '#EBC5FC'];
    let _self = this;
    this.echarts = require('echarts');
    this.plotOption = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      grid: {
        right: 100
      },
      legend: {
        orient: 'horizontal',
        type: 'scroll',
        axis: 'right',
        top: 10,
        right: 30,
        avoidLabelOverlap: true,
        data: [],
        textStyle: {
          fontFamily: 'Inter-UI-Medium',
          color: '#2e3d4d',
          fontSize: 16,
          fontWeight: 500
        }
      },
      series: [
        {
          name: 'Student Enrolment',
          type: 'pie',
          radius: ['30%', '75%'],
          avoidLabelOverlap: true,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: false,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: []
        }
      ]
    };
    this.reportItems.forEach(function(item, i) {
      if (item.groupTypeValue.length > 25) {
        item.groupTypeValue = item.groupTypeValue.substring(0, 24) + '...';
      }
      if (_self.barColor[i]) {
        _self.plotOption.series[0].data.push({
          value: item.students,
          name: item.groupTypeValue,
          itemStyle: { color: _self.barColor[i] }
        });
      } else {
        _self.plotOption.series[0].data.push({
          value: item.students,
          name: item.groupTypeValue
        });
      }
      _self.plotOption.legend.data.push(item.groupTypeValue);
    });
    this.plotGraph();
  }
  plotGraph() {
    var elem = document.getElementById('stdEnrolmentGraph');
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
