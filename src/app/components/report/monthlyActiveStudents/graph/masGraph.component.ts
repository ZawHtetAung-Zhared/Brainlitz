import {Component, OnInit,Input} from '@angular/core';
@Component({
  selector: 'mas-graph',
  templateUrl: './masGraph.component.html',
})

export class MonthlyActiveStdReportGraph implements OnInit {
  @Input() reportItems: any;
  ngOnInit(){
    console.log(this.reportItems);
  }
  ngAfterViewInit(){

  }

}
