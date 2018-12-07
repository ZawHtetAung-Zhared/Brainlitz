import {Component, OnInit,Input} from '@angular/core';
@Component({
  selector: 'std-enrolment-graph',
  templateUrl: './stdEnrolment.component.html',
})

export class StdEnrolmentReportGraph implements OnInit {
  @Input() reportItems: any;
  plotOption:any;
  echarts:any;
  barColor:any;
  ngOnInit(){
    console.log("data inside graph component");
    console.log(this.reportItems);
    this.barColor = ['#EC407F','#FDEAC5','#C4FBEB','#C5EBFC','#EBC5FC'];
    let _self = this;
    this.echarts = require('echarts');
    this.plotOption = {
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },

      legend: {
        orient: 'vertical',
        axis:'right',
        right:50,
        top:10,
        data:[],
        textStyle:{
          fontFamily:'Montserrat-Medium',
          color:'#2e3d4d',
          fontSize: 16,
          fontWeight: 500
        }
      },
      series: [
        {
          name:'Student Enrolment',
          type:'pie',
          radius: ['50%', '95%'],
          avoidLabelOverlap: false,
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
          data:[]
        }
      ]
    };
    this.reportItems.forEach(function(item,i){
      if(_self.barColor[i]){
        _self.plotOption.series[0].data.push({value:item.students,name:item.groupTypeValue,itemStyle:{color:_self.barColor[i]}});
      }else{
        _self.plotOption.series[0].data.push({value:item.students,name:item.groupTypeValue});
      }
      _self.plotOption.legend.data.push(item.groupTypeValue);
    });

  }
  ngAfterViewInit(){
    var elem = document.getElementById('stdEnrolmentGraph');
    let graph = this.echarts.init(elem);
    graph.setOption(this.plotOption);
  }
}
