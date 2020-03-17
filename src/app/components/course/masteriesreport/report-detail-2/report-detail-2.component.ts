import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { filter, pairwise } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { appService } from '../../../../service/app.service';
import { DataService } from '../../../../service/data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Data from './sampleData';
import { Subscription, ISubscription } from 'rxjs/Subscription';

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
  public loadingDetail: boolean = true;
  public loadingQuestion: boolean = true;
  public plotDetailOption: any;
  public seriesData: any = [
    {
      type: 'bar',
      itemStyle: {
        color: '#fff'
      },
      barGap: '-100%',
      barCategoryGap: '40%',
      data: [100],
      animation: false
    },
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
      name: 'Inconclusive',
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
    private dataservice: DataService,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this._service
      .getMasteryDetailReport(localStorage.getItem('mastery_reportId'))
      .subscribe(
        (res: any) => {
          console.log(res);
          this.challengeData = res.data.masteryReport;
          this.reportItems = this.challengeData.masteries;
          // this.setupDetailOption(this.isExpand, this.isAdvance);
          // this.challengeData = Data.data.masteryReport;
          setTimeout(() => {
            this.loadingDetail = false;
            setTimeout(() => {
              for (
                var i = 0;
                i < this.challengeData.challengingMasteries.length;
                i++
              ) {
                this.setupOption(this.challengeData.challengingMasteries[i]);
              }
            }, 100);
            setTimeout(() => {
              this.setupDetailOption();
            }, 200);
          }, 1000);
        },
        err => {
          console.log(err);
        }
      );
    document.addEventListener('click', function(event) {
      console.log(event);
    });
  }

  ngAfterViewInit() {}

  @HostListener('window:scroll', ['$event']) onScroll($event) {
    $('#mastery_hover').html('');
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
        right: 0
      },
      textStyle: {
        fontFamily: "'Inter-UI-Medium',Arial,sans-serif",
        fontSize: 12,
        color: '#64707d'
      },
      yAxis: {
        type: 'category'
      },
      xAxis: {},
      barWidth: 20,
      legend: {
        show: false
      },
      series: this.seriesData
    };

    this.plotOption.series[1].data = [
      mastery.userMasteries.STRUGGLE.percentage
    ];
    this.plotOption.series[2].data = [mastery.userMasteries.NEW.percentage];
    this.plotOption.series[3].data = [
      mastery.userMasteries.INPROGRESS.percentage
    ];
    this.plotOption.series[4].data = [
      mastery.userMasteries.MASTERED_WITH_DIFFICULT.percentage
    ];
    this.plotOption.series[5].data = [
      mastery.userMasteries.MASTERED_WITH_EASE.percentage
    ];
    this.plotGraph(mastery.masteryId);
  }

  plotGraph(masteryId) {
    var elem = document.getElementById(masteryId);
    elem.removeAttribute('_echarts_instance_');
    elem.innerHTML = '';
    let graph = this.echarts.init(elem);
    graph.setOption(this.plotOption);
    $(window).on('resize', function() {
      if (graph != null && graph != undefined) {
        graph.resize();
      }
    });
  }

  getQuestion(masteryId) {
    this._service.getMasteryQuestion(masteryId).subscribe(
      (res: any) => {
        console.log(res);
        this.samplexml = res;
        setTimeout(() => {
          this.loadingQuestion = false;
        }, 1000);

        setTimeout(() => {
          this.setupQuiz();
          this.setupAnswer();
        }, 100);
      },
      err => {
        console.log(err);
      }
    );
  }

  cancelModal() {
    this.modalReference.close();
  }

  @ViewChild('questionModal') questionModal: any;
  openModal(masteryId) {
    this.loadingQuestion = true;
    this.modalReference = this.modalService.open(this.questionModal, {
      backdrop: 'static',
      windowClass:
        'jouranlModal d-flex justify-content-center align-items-center'
    });
    this.getQuestion(masteryId);
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
    console.log('>>>>>>>>>>>>>>>setup Quiz<<<<<<<<<<<<<<<<');
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

  setupDetailOption() {
    this.echarts = require('echarts');
    this.plotDetailOption = {
      tooltip: {
        formatter: function(params) {
          let value =
            '<div style="padding:5px 10px;">' +
            params.seriesName +
            ' : ' +
            params.value +
            '</div>';
          return value;
        }
      },
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

      // if (expandOn == true)
      yAxisData.push(++index + ' ' + item.shortMasteryName);
      // else yAxisData.push(++index);
      strugglingData.push(item.userMasteries.STRUGGLE.percentage);
      diffData.push(item.userMasteries.MASTERED_WITH_DIFFICULT.percentage);
      easeData.push(item.userMasteries.MASTERED_WITH_EASE.percentage);
      inprogressData.push(item.userMasteries.INPROGRESS.percentage);
      notTakenData.push(item.userMasteries.NEW.percentage);
    });
    this.plotDetailOption.yAxis.data = yAxisData;
    this.plotDetailOption.series[1].data = strugglingData;
    this.plotDetailOption.series[2].data = notTakenData;
    this.plotDetailOption.series[3].data = inprogressData;
    this.plotDetailOption.series[4].data = diffData;
    this.plotDetailOption.series[5].data = easeData;

    this.plotDetailOption.yAxis.axisLabel.rich.f1.width = 260;
    this.plotDetailOption.yAxis.axisLabel.rich.f2.backgroundColor.image =
      './assets/icons/mastery-question.svg';

    this.plotDetailGraph();
  }

  plotDetailGraph() {
    var _self = this;
    var detailElem = document.getElementById('mastery_detail');
    detailElem.removeAttribute('_echarts_instance_');
    detailElem.innerHTML = '';
    if (this.reportItems.length > 10)
      detailElem.style.height = this.reportItems.length * 40 + 'px';
    else if (this.reportItems.length > 5)
      detailElem.style.height = this.reportItems.length * 60 + 'px';
    else detailElem.style.height = this.reportItems.length * 80 + 'px';
    // if (expandOn) {
    //   if (this.reportItems.length > 10)
    //     detailElem.style.height = this.reportItems.length * 70 + 'px';
    //   else if (this.reportItems.length > 5)
    //     detailElem.style.height = this.reportItems.length * 80 + 'px';
    //   else detailElem.style.height = this.reportItems.length * 90 + 'px';
    // } else {
    //   if (this.reportItems.length > 10)
    //     detailElem.style.height = this.reportItems.length * 40 + 'px';
    //   else if (this.reportItems.length > 5)
    //     detailElem.style.height = this.reportItems.length * 60 + 'px';
    //   else detailElem.style.height = this.reportItems.length * 80 + 'px';
    // }
    let graph = this.echarts.init(detailElem);
    graph.setOption(this.plotDetailOption);
    graph.on('click', function(params) {
      // console.log(params);
      if (params.componentType === 'yAxis') {
        console.log(
          'on click mastery',
          _self.reportItems[
            _self.plotDetailOption.yAxis.data.indexOf(params.value)
          ]
        );
        var id =
          _self.reportItems[
            _self.plotDetailOption.yAxis.data.indexOf(params.value)
          ].masteryId;
        console.log('onClickmasteryId', id);
        _self.openModal(id);
      } else if (params.componentType === 'series') {
        let selectedMastery =
          _self.reportItems[
            _self.plotDetailOption.yAxis.data.indexOf(params.name)
          ];
        console.log('on click series', selectedMastery);
        var id = selectedMastery._id;
        _self.router.navigate([`../studentlist/${id}`], {
          relativeTo: _self.route
        });
        _self.dataservice.setMasteryData(selectedMastery);
        // console.log(params.dataIndex);
        // console.log(
        //   _self.masteriesReports[0].masteries[params.dataIndex].question
        // );
        // _self.router.navigate(['../studentlist'], { relativeTo: _self.route });
        // localStorage.setItem(
        //   'mastery_itemId',
        //   _self.masteriesReports[0].masteries[params.dataIndex].masteryId
        //   // _self.masteriesReports[0].data[params.dataIndex].id
        // );
      }
    });

    // graph.on('mouseover', function (params) {
    //   console.log('hi')
    //   if(params.componentType =='yAxis'){
    //     console.log(params);
    //     var offsetX =params.event.offsetX;
    //     var offsetY =params.event.offsetY+20;
    //     graph.dispatchAction({
    //       type: 'showTip',
    //       seriesIndex: 0,
    //       dataIndex: 0,
    //       position:[offsetX,offsetY]
    //     });
    //   }
    // });

    graph.on('mousemove', function(params) {
      if (params.componentType == 'yAxis') {
        let hoverItem =
          _self.reportItems[
            _self.plotDetailOption.yAxis.data.indexOf(params.value)
          ];

        // $('#mastery_hover')
        // this.d1.nativeElement.insertAdjacentHTML('beforeend', '<div class="two">two</div>');
        let hover_html =
          '<div class="tooltip-wrap bg-c100" style="left:' +
          params.event.event.clientX +
          'px; top: ' +
          (params.event.event.clientY + 25) +
          'px;"><div class="h5-strong text-s10">' +
          hoverItem.shortMasteryName +
          '</div>' +
          '<div class="small text-s0">' +
          hoverItem.descriptionStudent +
          '</div>';
        '</div>';
        $('#mastery_hover').html(hover_html);
      }
    });

    graph.on('mouseout', function(params) {
      if (params.componentType == 'yAxis') {
        $('#mastery_hover').html('');
      }
    });
  }
}
