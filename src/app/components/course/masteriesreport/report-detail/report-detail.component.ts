import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { filter, pairwise } from 'rxjs/operators';
import { Location } from '@angular/common';
import sampleData from './../sampleData';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { appService } from '../../../../service/app.service';
import { DataService } from '../../../../service/data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  public challengeData: any;
  public modalReference: any;
  public samplexml: any;
  public qtextList: any;
  public qhtml: any = [];
  public qimgList: any;
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
    private _service: appService,
    private _data: DataService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.dType = 'XLS';
    if (this._data.getMasteryData() == undefined) {
      this._service.getMasteryReports().subscribe(
        (res: any) => {
          this._data.setMasteryData(res);
          this.challengeData = res.data.challengingMasteries;
          this.masteriesReports = res.data.masteryReport;
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
    } else {
      this.challengeData = this._data.getMasteryData().data.challengingMasteries;
      this.masteriesReports = this._data.getMasteryData().data.masteryReport;
      this.masteriesReports = this.masteriesReports.filter(function(res) {
        return res.id == localStorage.getItem('mastery_reportId');
      });
      this.reportItems = this.masteriesReports[0].masteries;
      if (this.isAdvance) this.seriesData = this.advanceSeries;
      else this.seriesData = this.normalSeries;
      this.setupOption(this.isExpand, this.isAdvance);
    }

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
      strugglingData.push(item.userMasteries.STRUGGLE.percentage);
      diffData.push(item.userMasteries.MASTERED_WITH_DIFFICULT.percentage);
      easeData.push(item.userMasteries.MASTERED_WITH_EASE.percentage);
      inprogressData.push(item.userMasteries.INPROGRESS.percentage);
      notTakenData.push(item.userMasteries.NEW.percentage);
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
      // console.log(params);
      if (params.componentType === 'yAxis') {
        // console.log(_self.plotOption.yAxis.data.indexOf(params.value));
        _self.samplexml =
          _self.masteriesReports[0].masteries[
            _self.plotOption.yAxis.data.indexOf(params.value)
          ].question;
        _self.openModal(_self.questionModal);
        // _self.router.navigate(['../studentlist'], { relativeTo: _self.route });
        // localStorage.setItem(
        //   'mastery_itemId',
        //   _self.masteriesReports[0].masteries[_self.plotOption.yAxis.data.indexOf(params.value)].masteryId
        //   // _self.masteriesReports[0].data[params.dataIndex].id
        // );
      } else if (params.componentType === 'series') {
        console.log(params.dataIndex);
        console.log(
          _self.masteriesReports[0].masteries[params.dataIndex].question
        );
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

  cancelModal() {
    console.log('....');
    this.modalReference.close();
  }

  @ViewChild('questionModal') questionModal: any;
  openModal(modal) {
    this.modalReference = this.modalService.open(modal, {
      backdrop: 'static',
      windowClass:
        'modal-xl modal-inv d-flex justify-content-center align-items-center'
    });
    this.setupQuiz();
    // this.setupQuestion();
  }

  setupQuiz() {
    var ques =
      "<text index=0 value='Which of the following gives off its own light?\nA. test \n></text>";
    $('#testQuestion').html(this.samplexml);
    var textElems = $('text');
    console.log('textElems', textElems);
    for (var j = 0; j < textElems.length; j++) {
      var currElem = textElems[j];
      $(textElems[j]).html(
        '<div class="pt-4">' + $(textElems[j]).attr('value') + '</div>'
      );
    }

    var imgElems = $('img');
    for (var i = 0; i < imgElems.length; i++) {
      $(imgElems[i]).attr('class', 'pt-4');
      // $(imgElems[i]).html('<div class="pt-4">'+$(imgElems[i]).attr('value')+'</div>');
    }
  }

  setupQuestion() {
    this.samplexml =
      "<text index=0 value='A student took a slice of bread and cut it into two. He toasted one of the pieces until it was dry. He placed the two pieces of bread on a plate and left it in the kitchen. After a week, the student noticed fungi growing on the piece of bread that was not toasted and no fungi on the toasted bread.' ></text><image index=1 src='https://brainlitz-dev.s3.amazonaws.com/SparkWerkz-API/PD/LTN-01-01/Assets/questionsAssets/ltn-01-01-01.jpg' ><text index=2 value='From this experiment, the student can conclude that fungus ____________.\nChoose one \nA. test 1\nB. test2\nC. test3' ></text>";
    var new_str_arr = this.samplexml.match(/[^\r\n]+/g);
    this.samplexml = '';
    new_str_arr.forEach(element => {
      this.samplexml += element;
    });
    console.log(this.samplexml);
    this.qtextList = this.samplexml.match(/<text.[\s\S]*?>.*?<\/text>/g);
    this.qimgList = this.samplexml.match(/<image.*?>/g);
    console.log(this.qimgList, this.qtextList);
    this.qhtml = [];
    if (this.qtextList) {
      for (var i = 0; i < this.qtextList.length; i++) {
        var index = this.qtextList[i].match(/index=\d*/g);
        index = index[0].substring(6, index[0].length);
        var text = this.qtextList[i].match(/value='.[\s\S]*?'/g)[0];

        this.qhtml.splice(
          index,
          0,
          '<pre>' + text.substring(7, text.length - 1) + '</pre>'
        );
      }
    }

    if (this.qimgList) {
      for (var i = 0; i < this.qimgList.length; i++) {
        var index = this.qimgList[i].match(/index=\d*/g);
        index = index[0].substring(6, index[0].length);
        this.qhtml.splice(index, 0, this.qimgList[i]);
      }
    }
  }
}
