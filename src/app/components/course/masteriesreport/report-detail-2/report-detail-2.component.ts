import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { filter, pairwise } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { appService } from '../../../../service/app.service';
import { DataService } from '../../../../service/data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Data from './sampleData';

@Component({
  selector: 'app-report-detail-2',
  templateUrl: './report-detail-2.component.html',
  styleUrls: ['./report-detail-2.component.css']
})
export class ReportDetail2Component implements OnInit {
  isSticky: boolean = false;
  public active = 'courses';
  public challengeData: any;
  public modalReference: any;
  public samplexml: any;
  plotOption: any;
  echarts: any;
  reportItems: any;
  masteriesReports: any;
  public seriesData: any = [
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

  constructor(
    private _location: Location,
    private _service: appService,
    private _data: DataService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    console.log(Data);
    this.challengeData = Data.data;

    // this.challengeData = this._data.getMasteryData().data.challengingMasteries;
    //   this.masteriesReports = this._data.getMasteryData().data.masteryReport;
    //   this.masteriesReports = this.masteriesReports.filter(function(res) {
    //     return res.id == localStorage.getItem('mastery_reportId');
    //   });
    //   this.reportItems = this.masteriesReports[0].masteries;
    //   this.setupOption();
  }

  ngAfterViewInit() {
    console.log('finish view');
    for (var i = 0; i < this.challengeData.masteries.length; i++) {
      this.setupOption(this.challengeData.masteries[i]);
    }
  }

  @HostListener('window:scroll', ['$event']) onScroll($event) {
    if (window.pageYOffset > 81) {
      this.isSticky = true;
    } else {
      this.isSticky = false;
    }
  }

  backTo() {
    this._location.back();
    localStorage.removeItem('mastery_reportId');
  }

  setupOption(mastery) {
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
        left: 0,
        right: 20
      },
      textStyle: {
        fontFamily: "'Inter-UI-Medium',Arial,sans-serif",
        fontSize: 12,
        color: '#64707d'
      },
      yAxis: {
        type: 'category',
        axisTick: { show: false },
        axisLine: {
          show: false
        },
        axisLabel: {
          show: false
        },
        splitLine: { show: false }
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
        show: false
      },
      series: this.seriesData
    };
    let strugglingData = [];
    let inprogressData = [];
    let notTakenData = [];
    let easeData = [];
    let diffData = [];

    strugglingData.push(mastery.userMasteries.STRUGGLE.percentage);
    diffData.push(mastery.userMasteries.MASTERED_WITH_DIFFICULT.percentage);
    easeData.push(mastery.userMasteries.MASTERED_WITH_EASE.percentage);
    inprogressData.push(mastery.userMasteries.INPROGRESS.percentage);
    notTakenData.push(mastery.userMasteries.NEW.percentage);

    // this.plotOption.yAxis.data = yAxisData;
    this.plotOption.series[0].data = strugglingData;
    this.plotOption.series[1].data = notTakenData;
    this.plotOption.series[2].data = inprogressData;
    this.plotOption.series[3].data = diffData;
    this.plotOption.series[4].data = easeData;
    this.plotGraph(mastery.masteryId);
  }

  plotGraph(masteryId) {
    var _self = this;
    var elem = document.getElementById(masteryId);
    elem.removeAttribute('_echarts_instance_');
    elem.innerHTML = '';
    // if (this.reportItems.length > 10)
    //   elem.style.height = this.reportItems.length * 70 + 'px';
    // else if (this.reportItems.length > 5)
    //   elem.style.height = this.reportItems.length * 80 + 'px';
    // else elem.style.height = this.reportItems.length * 90 + 'px';
    let graph = this.echarts.init(elem);
    graph.setOption(this.plotOption);
    graph.on('click', function(params) {
      // console.log(params);
      if (params.componentType === 'yAxis') {
        var id =
          _self.masteriesReports[0].masteries[
            _self.plotOption.yAxis.data.indexOf(params.value)
          ].masteryId;
        _self._service.getMasteryQuestion(id).subscribe(
          (res: any) => {
            console.log(res);
            _self.samplexml = res;
            _self.openModal(_self.questionModal);
          },
          err => {
            console.log(err);
          }
        );
      }
    });
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
    setTimeout(() => {
      this.setupAnswer();
    }, 200);
    // this.setupQuestion();
  }

  setupQuiz() {
    var ques =
      "<text index=0 value='Which of the following gives off its own light?\nA. test \n></text>";
    $('#testQuestion').html(this.samplexml.data.quiz.question);
    var textElems = $('text');
    for (var j = 0; j < textElems.length; j++) {
      var currElem = textElems[j];
      $(textElems[j]).html(
        '<div class="pt-4">' + $(textElems[j]).attr('value') + '</div>'
      );
    }

    var imgElems = $('img');
    for (var i = 0; i < imgElems.length; i++) {
      $(imgElems[i]).attr('class', 'pt-4');
    }
  }

  setupAnswer() {
    var ans = "<text index=0 value='cannot grow without food' ></text>";
    this.samplexml.data.quiz.answers.forEach(function(element) {
      $('#' + element._id).html(element.answer);
      var textElems = $('text');
      for (var j = 0; j < textElems.length; j++) {
        $(textElems[j]).html(
          '<div>' + $(textElems[j]).attr('value') + '</div>'
        );
      }
    });
  }
}
