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
    this._service
      .getMasteryDetailReport(localStorage.getItem('mastery_reportId'))
      .subscribe(
        (res: any) => {
          console.log(res);
          this.challengeData = res.data.masteryReport;
          // this.challengeData = Data.data;
          setTimeout(() => {
            for (var i = 0; i < this.challengeData.masteries.length; i++) {
              this.setupOption(this.challengeData.masteries[i]);
            }
          }, 200);
        },
        err => {
          console.log(err);
        }
      );
  }

  ngAfterViewInit() {}

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
        right: '50%'
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
    // if(mastery.masteryId == 'LTN-01-01') {
    //   strugglingData = [25];
    //   notTakenData = [25];
    //   inprogressData = [10];
    //   diffData = [18];
    //   easeData= [22];
    // }
    this.plotOption.series[0].data = strugglingData;
    this.plotOption.series[1].data = notTakenData;
    this.plotOption.series[2].data = inprogressData;
    this.plotOption.series[3].data = diffData;
    this.plotOption.series[4].data = easeData;
    this.plotGraph(mastery.masteryId);
  }

  plotGraph(masteryId) {
    var elem = document.getElementById(masteryId);
    elem.removeAttribute('_echarts_instance_');
    elem.innerHTML = '';
    let graph = this.echarts.init(elem);
    graph.setOption(this.plotOption);
  }

  getQuestion(masteryId) {
    this._service.getMasteryQuestion(masteryId).subscribe(
      (res: any) => {
        console.log(res);
        this.samplexml = res;
        this.openModal(this.questionModal);
      },
      err => {
        console.log(err);
      }
    );
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
  }

  setupQuiz() {
    $('#Question').html(this.samplexml.data.quiz.question);
    var textElems = $('text');
    for (var j = 0; j < textElems.length; j++) {
      var currElem = textElems[j];
      $(textElems[j]).html(
        '<div class="pt-4">' + $(textElems[j]).attr('value') + '</div>'
      );
    }
  }

  setupAnswer() {
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
