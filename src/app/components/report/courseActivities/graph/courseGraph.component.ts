import {Component, OnInit,Input} from '@angular/core';
@Component({
  selector: 'course-graph',
  templateUrl: './courseGraph.component.html',
  styles: ['.average-rating-font {color: #64707d;padding-left: 10px;font-size: 12px;font-family: Montserrat-Medium, Arial,sans-serif;line-height: 0.5;}']
})

export class CourseActivitiesReportGraph implements OnInit {
  @Input() reportItems: any;
  plotOption:any;
  echarts:any;
  barColor:any;

  ngOnInit(){
    console.log("ngonInit");
    console.log(this.reportItems);

  }

  ngAfterViewInit(){
    // var elem = document.getElementById();
    // let graph = this.echarts.init(elem);
    // graph.setOption(this.plotOption);
  }

}
