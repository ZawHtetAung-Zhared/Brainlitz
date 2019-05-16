import {Component, OnInit,Input,OnChanges} from '@angular/core';
@Component({
  selector: 'mas-graph',
  templateUrl: './masGraph.component.html',
})

export class MonthlyActiveStdReportGraph implements OnInit {
  @Input() reportItems: any;
  plotOption:any;
  echarts:any;
  barColor:any;

  ngOnChanges() {
    this.setupOption();
  }
  setupOption(){
    console.log("inside graph component");
    console.log(this.reportItems);
    this.echarts = require('echarts');
    let _self = this;
    this.plotOption = {
      tooltip: {
        backgroundColor:'#3d454d',
      },
      textStyle:{
        fontFamily:'Montserrat-Medium'
      },
      grid: {
        top: 30,
        bottom:10,
        left:150
      },

      yAxis: {
        data: [],
        axisTick: {show: false},
        axisLine: {show: false,lineStyle:{
          color:"#64707d"
        }},
        axisLabel: {
          fontSize:16,
          fontWeight:600,
          color:'#2e3d4d',
          margin:8
        },

      },
      xAxis: {
        position: 'top',
        axisTick: {show: true,lineStyle:{
          color:'#edeff0'
        }},
        axisLabel:{
          color:'#64707d'
        },
        axisLine: {show: true,lineStyle:{
          color:"#edeff0"
        }},
        splitLine: {lineStyle:{color:'#edeff0'}},
      },
      barWidth:40,
      itemStyle:{
        color:'#80bfff'
      },
      bargap:'10%',
      series: [{
        name: 'Monthly Active Students',
        type: 'bar',
        data: []
      }]
    };
    var height = 50;
    this.reportItems.forEach(function(item){
      height +=50;
      _self.plotOption.yAxis.data.push(item.groupTypeValue);
      _self.plotOption.series[0].data.push(item.students);
    });
    this.plotGraph(height);
  }
  ngOnInit(){


  }
  plotGraph(h){
    var elem = document.getElementById('masGraph');
    elem.setAttribute('style','height:'+h+'px');
    let graph = this.echarts.init(elem);
    graph.setOption(this.plotOption);
  }

}
