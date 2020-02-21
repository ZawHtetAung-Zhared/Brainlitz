import { Component, OnInit, HostListener } from '@angular/core';
import { filter, pairwise } from 'rxjs/operators';
import { Location } from '@angular/common';
import sampleData from './../sampleData';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { appService } from '../../../../service/app.service';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.css']
})
export class ReportDetailComponent implements OnInit {
  isSticky: boolean = false;
  isStickyInnerHeader: boolean = false;
  public active = 'courses';
  public dType: any;
  public isdType: boolean = false;
  plotOption: any;
  echarts: any;
  reportItems: any;
  masteriesReports: any = [
    { id: 1, name: 'Light Energy', data: sampleData },
    { id: 2, name: 'Heat Energy', data: sampleData }
  ];
  public isExpand: boolean = true;
  public isAdvance: boolean = true;
  public seriesData: any;
  advanceSeries: any = [
    {
      name: 'Struggling',
      type: 'bar',
      stack: 'energy',
      barWidth: '50%',
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
      barWidth: '50%',
      itemStyle: {
        normal: { color: '#EDEEF0' }
      },
      data: []
    },
    {
      name: 'In conslusive',
      type: 'bar',
      stack: 'energy',
      barWidth: '50%',
      itemStyle: {
        normal: { color: '#D4D5D6' }
      },
      data: []
    },
    {
      name: 'Mastered w/ difficulties',
      type: 'bar',
      stack: 'energy',
      barWidth: '50%',
      itemStyle: {
        normal: { color: '#6DC000' }
      },
      data: []
    },
    {
      name: 'Mastered w/ ease',
      type: 'bar',
      stack: 'energy',
      barWidth: '50%',
      itemStyle: {
        normal: { color: '#4FDD00' }
      },
      data: []
    }
  ];
  normalSeries: any = [
    {
      name: 'Struggling',
      type: 'bar',
      stack: 'energy',
      barWidth: '50%',
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
      barWidth: '50%',
      itemStyle: {
        normal: { color: '#EDEEF0' }
      },
      data: []
    },
    {
      name: 'In conslusive',
      type: 'bar',
      stack: 'energy',
      barWidth: '50%',
      itemStyle: {
        normal: { color: '#D4D5D6' }
      },
      data: []
    },
    {
      name: 'Mastered w/ ease',
      type: 'bar',
      stack: 'energy',
      barWidth: '50%',
      itemStyle: {
        normal: { color: '#4FDD00' }
      },
      data: []
    }
  ];

  constructor(
    private _location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private _service: appService
  ) {}

  ngOnInit() {
    this.dType = 'XLS';
    this._service.getMasteryReports().subscribe(
      (res: any) => {
        this.masteriesReports = res.data;
        this.masteriesReports = this.masteriesReports.filter(function(res) {
          return res.id == localStorage.getItem('mastery_reportId');
        });
        this.reportItems = this.masteriesReports[0].masteries;
        if (this.isAdvance) this.seriesData = this.advanceSeries;
        else this.seriesData = this.normalSeries;
        this.setupOption(this.isExpand, this.isAdvance);
      },
      err => {
        console.log(err);
      }
    );

    // for sample data
    // this.masteriesReports = this.masteriesReports.filter(function(res) {
    //   return res.id == '1'//localStorage.getItem('mastery_reportId');
    // });
    // this.reportItems = this.masteriesReports[0].data;
    // if (this.isAdvance) this.seriesData = this.advanceSeries;
    // else this.seriesData = this.normalSeries;
    // this.setupOption(this.isExpand, this.isAdvance);
  }

  @HostListener('window:scroll', ['$event']) onScroll($event) {
    if (window.pageYOffset > 81) {
      this.isSticky = true;
    } else {
      this.isSticky = false;
    }
    if (window.pageYOffset > 720) {
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
        left: 300,
        right: 1
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
        silent: false,
        triggerEvent: true,
        color: '#64707d',
        axisTick: { show: false },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#edeff0'
          },
          align: 'center'
        },
        axisLabel: {
          show: true,
          textStyle: {
            fontSize: 12,
            lineHeight: 16,
            color: '#64707d'
          },
          margin: 10,
          formatter: function(value) {
            var count = 40;
            return (
              '{f1|' +
              value.slice(0, count) +
              (value.length > count ? '...' : '') +
              '}\t{f2|}'
            );
          },
          rich: {
            f1: {
              color: '#363F4D',
              fontWeight: 600,
              align: 'left',
              width: 10
            },
            f2: {
              height: 20,
              backgroundColor: {
                image: ''
              }
            }
          }
        },
        splitLine: { show: false },
        left: 'left'
      },
      xAxis: {
        silent: false,
        position: 'top',
        axisLabel: {
          show: true,
          formatter: '{value} % ',
          align: 'right'
        },
        axisTick: {
          show: true,
          length: 30,
          lineStyle: {
            color: '#E8E9EB'
          }
        },
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
          'Not started',
          'In conslusive',
          'Mastered w/ difficulties',
          'Mastered w/ ease'
        ]
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
      // if (expandOn == true) yAxisData.push(++index + ' ' + item.groupTypeValue);
      // else yAxisData.push(++index);
      // strugglingData.push(item.lessons.present);
      // diffData.push(item.lessons.diff);
      // easeData.push(item.lessons.ease);
      // inprogressData.push(item.lessons.absent);
      // notTakenData.push(item.lessons.notTaken);

      if (expandOn == true)
        yAxisData.push(++index + ' ' + item.shortMasteryName);
      else yAxisData.push(++index);
      strugglingData.push(item.userMasteries.STRUGGLE.percentage + 1);
      diffData.push(item.userMasteries.MASTERED.percentage + 1);
      easeData.push(item.userMasteries.MASTERED.percentage + 1);
      inprogressData.push(item.userMasteries.INPROGRESS.percentage + 1);
      notTakenData.push(item.userMasteries.NEW.percentage + 1);
    });
    this.plotOption.yAxis.data = yAxisData;
    if (advanceOn) {
      this.plotOption.series[0].data = strugglingData;
      this.plotOption.series[1].data = notTakenData;
      this.plotOption.series[2].data = inprogressData;
      this.plotOption.series[3].data = diffData;
      this.plotOption.series[4].data = easeData;
    } else {
      // not use in this version
      this.plotOption.series[0].data = strugglingData;
      this.plotOption.series[1].data = notTakenData;
      this.plotOption.series[2].data = inprogressData;
      this.plotOption.series[3].data = easeData;
    }
    if (!expandOn) {
      this.plotOption.xAxis.axisLabel.show = false;
      this.plotOption.xAxis.splitLine.show = false;
      this.plotOption.xAxis.axisTick.show = false;
    } else {
      // this.plotOption.yAxis.axisLabel.margin = 255;
      // this.plotOption.yAxis.axisLabel.align = 'left';
      this.plotOption.yAxis.axisLabel.rich.f1.width = 260;
      this.plotOption.yAxis.axisLabel.rich.f2.backgroundColor.image =
        './assets/icons/mastery-question.svg';
    }
    this.plotGraph(expandOn);
  }

  plotGraph(expandOn) {
    var _self = this;
    var elem = document.getElementById('mastery_detail');
    elem.removeAttribute('_echarts_instance_');
    elem.innerHTML = '';
    if (expandOn) {
      if (this.reportItems.length > 10)
        elem.style.height = this.reportItems.length * 70 + 'px';
      else if (this.reportItems.length > 5)
        elem.style.height = this.reportItems.length * 80 + 'px';
      else elem.style.height = this.reportItems.length * 90 + 'px';
    } else {
      if (this.reportItems.length > 10)
        elem.style.height = this.reportItems.length * 40 + 'px';
      else if (this.reportItems.length > 5)
        elem.style.height = this.reportItems.length * 60 + 'px';
      else elem.style.height = this.reportItems.length * 80 + 'px';
    }
    let graph = this.echarts.init(elem);
    graph.setOption(this.plotOption);
    graph.on('click', function(params) {
      console.log(params);
      if (params.componentType === 'yAxis') {
        console.log(_self.plotOption.yAxis.data.indexOf(params.value));
        // _self.router.navigate(['../studentlist'], { relativeTo: _self.route });
        // localStorage.setItem(
        //   'mastery_itemId',
        //   _self.masteriesReports[0].masteries[_self.plotOption.yAxis.data.indexOf(params.value)].masteryId
        //   // _self.masteriesReports[0].data[params.dataIndex].id
        // );
      } else if (params.componentType === 'series') {
        console.log(params.dataIndex);
        // _self.router.navigate(['../studentlist'], { relativeTo: _self.route });
        // localStorage.setItem(
        //   'mastery_itemId',
        //   _self.masteriesReports[0].masteries[params.dataIndex].masteryId
        //   // _self.masteriesReports[0].data[params.dataIndex].id
        // );
      }
    });
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

  downloadType(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    this.isdType = !this.isdType;
  }
  @HostListener('document:click', ['$event']) clickedOutside($event) {
    this.isdType = false;
  }
  downloadReport(type) {
    this.dType = type;
    var data: any = [
      {
        eid: 'e101',
        ename: 'ravi',
        esal: 1000
      },
      {
        eid: 'e102',
        ename: 'ram',
        esal: 2000
      },
      {
        eid: 'e103',
        ename: 'rajesh',
        esal: 3000
      }
    ];
    var secondData: any = [
      {
        tid: 't101',
        tname: 'ravi',
        tsal: 1000
      },
      {
        tid: 't102',
        tname: 'ram',
        tsal: 2000
      },
      {
        tid: 't103',
        tname: 'rajesh',
        tsal: 3000
      }
    ];
    if (type == 'XLS') {
      console.log('masteriesReports~~~', this.masteriesReports);
      this.downloadAsExcelFile(data, secondData, 'sampleExcel');
    }
  }

  downloadAsExcelFile(json: any[], seconddata: any[], excelFileName: string) {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const secondWorksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      seconddata
    );
    console.log('worksheet', worksheet);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet, test: secondWorksheet },
      SheetNames: ['data', 'test']
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(
      data,
      fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
    );
  }
}
