import {Component, OnInit,Input} from '@angular/core';
@Component({
  selector: 'staff-graph',
  templateUrl: './staffGraph.component.html',
  styles: ['.average-rating-font {color: #64707d;padding-left: 10px;font-size: 12px;font-family: Montserrat-Medium, Arial,sans-serif;line-height: 0.5;}']
})

export class StaffReportGraph implements OnInit {
  @Input() reportItem: any;
  plotOption:any;
  echarts:any;
  barColor:any;

  ngOnInit(){
    this.echarts = require('echarts');
    this.barColor = [0,'#ffb6b3','#ffd2b3','#ffea80','#c3e6a1','#aaf2c8'];
    this.plotOption = {
      tooltip: {
        backgroundColor:'#3d454d',
        formatter: function (params) {
          let value = '<div style="padding:5px 10px;">'+params.data.value+(params.data.value <= 1  ? ' rating':' ratings');
          value += '<br/>';
          value += (params.dataIndex+1) + ' ';
          for (let i = 0; i <= params.dataIndex;i++){
            value+='<span class="fa fa-star"></span>';
          }
          value += '</div>';

          return value ;
        }
      },
      textStyle:{
        fontFamily:'Montserrat-Medium'
      },
      grid: {
        top: 30,
        bottom:10,
        left:30
      },

      yAxis: {
        data: ["1", "2", "3", "4", "5"],
        axisTick: {show: false},
        axisLine: {show: false,lineStyle:{
          color:"#64707d"
        }},
        axisLabel: {margin:8},

      },
      xAxis: {
        position: 'top',
        axisTick: {show: false},
        axisLine: {show: false,lineStyle:{
          color:"#64707d"
        }},
        splitLine: {lineStyle:{color:'#edeff0'}},
      },
      barWidth:16,
      bargap:'10%',
      series: [{
        name: 'Rating',
        type: 'bar',
        data: []
      }]
    };
    for (var key in this.reportItem.rating) {
      let obj = {
        value: this.reportItem.rating[key],
        name: 'Hola',
        itemStyle: {
          color: this.barColor[key],

        }
      };
      this.plotOption.series[0].data.push(obj);

    }
  }

  ngAfterViewInit(){
      var elem = document.getElementById(this.reportItem.id);
      let graph = this.echarts.init(elem);
      graph.setOption(this.plotOption);
  }

}
