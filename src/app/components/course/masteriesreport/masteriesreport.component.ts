import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import sampleData from './sampleData';
import { appService } from '../../../service/app.service';

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
  masteriesReports: any = [
    { id: 1, name: 'Light Energy', data: sampleData },
    { id: 2, name: 'Heat Energy', data: sampleData }
  ];
  public isExpand: boolean = false;
  // public

  constructor(private _service: appService) {}

  ngOnChanges() {
    this.setupOption(1);
  }

  setupOption(idx) {
    // var yMax = 40;
    // var dataShadow = [];
    // for (var i = 0; i < this.reportItems.length; i++) {
    //   dataShadow.push(yMax);
    // }
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
          'In conslusive',
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
          name: 'In conslusive',
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
    let index = 0;
    this.reportItems.forEach(function(item) {
      yAxisData.push(++index);

      // strugglingData.push(item.lessons.present);
      // easeData.push(item.lessons.ease);
      // inprogressData.push(item.lessons.absent);
      // notTakenData.push(item.lessons.notTaken);

      strugglingData.push(item.userMasteries.STRUGGLE.percentage + 1);
      easeData.push(item.userMasteries.MASTERED.percentage + 1);
      inprogressData.push(item.userMasteries.INPROGRESS.percentage + 1);
      notTakenData.push(item.userMasteries.NEW.percentage + 1);
    });
    this.plotOption.yAxis.data = yAxisData;
    this.plotOption.series[0].data = strugglingData;
    this.plotOption.series[1].data = notTakenData;
    this.plotOption.series[2].data = inprogressData;
    this.plotOption.series[3].data = easeData;
    this.plotOption.series[4].data = easeData;
    this.plotGraph(idx);
  }

  plotGraph(index) {
    var elem = document.getElementById(this.masteriesReports[index].id);
    elem.removeAttribute('_echarts_instance_');
    elem.innerHTML = '';
    if (this.reportItems.length > 10)
      elem.style.height = this.reportItems.length * 40 + 'px';
    else if (this.reportItems.length > 5)
      elem.style.height = this.reportItems.length * 50 + 'px';
    else elem.style.height = this.reportItems.length * 70 + 'px';
    let graph = this.echarts.init(elem);
    graph.setOption(this.plotOption);
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
        this.masteriesReports = res.data;
        setTimeout(() => {
          for (var i = 0; i < this.masteriesReports.length; i++) {
            this.reportItems = this.masteriesReports[i].masteries;
            this.setupOption(i);
          }
        }, 200);
      },
      err => {
        console.log(err);
      }
    );
  }
}
