import {Component, OnInit,Input,OnChanges} from '@angular/core';
@Component({
  selector: 'staff-teaching-graph',
  templateUrl: './staffTeachingGraph.component.html',
})

export class StaffTeachingReportGraph implements OnInit {
  @Input() reportItems: any;
  plotOption:any;
  echarts:any;
  barColor:any;
  ngOnChanges() {
    this.setupOption();
  }
  setupOption(){
    this.barColor = ['#EC407F','#F8BF45','#70F7BF','#4BBEF8','#C052F8','#2C32B7'];

    let _self = this;
    this.echarts = require('echarts');
    this.plotOption = {
      tooltip : {
        trigger: 'item',
        padding:8,
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      textStyle:{
        fontFamily:'Montserrat-Medium',
        fontSize:16
      },
      calculable : true,
      name:'Test',
      legend:{
        show:false,
      },
      label: {
        normal: {
          position: 'center',
          formatter:"Testing"
        },

      },
      series : [
        {
          name:'Staff Teaching Schedule',
          type:'pie',
          radius : ['30%', '95%'],
          roseType : 'area',
          label: {
            normal: {
              position: 'outside',
            },
          },
          data:[]
        }
      ]
    };
    let totalStaff = 0;
    let totalHours = 0;
    this.reportItems.forEach(function(item,i){
      totalStaff += item.staffCount;
      totalHours += item.staffHours;
      if(_self.barColor[i]){
        _self.plotOption.series[0].data.push({value:item.staffHours,name:item.groupTypeValue,itemStyle:{color:_self.barColor[i]}});
      }else{
        _self.plotOption.series[0].data.push({value:item.staffHours,name:item.groupTypeValue});
      }
      //_self.plotOption.legend.data.push(item.groupTypeValue);
    });
    let obj = {
      type:"pie",
      radius : ['30%', '30%'],
      label: {
        normal: {
          position: 'center',
          formatter:function(params){
            let value = '{a|'+totalHours+' Hours}\n \n';
            value += '{b|'+totalStaff+' teachers}';
            return value;
          },
          rich:{
            a:{
              fontFamily:'Montserrat-SemiBold',
              color:'#2e3d4d',
              fontSize:16
            },
            b:{
              fontFamily:'Montserrat-medium',
              color:'#64707d',
              fontSize:12
            }
          },

        }
      },
      tooltip:{
        show:false
      },
      data:[{value:0}]
    };
    _self.plotOption.series.push(obj);
    this.plotGraph();

  }
  ngOnInit(){

  }
  plotGraph(){
    var elem = document.getElementById('staffTeachingGraph');
    let graph = this.echarts.init(elem);
    graph.setOption(this.plotOption);
  }

}
