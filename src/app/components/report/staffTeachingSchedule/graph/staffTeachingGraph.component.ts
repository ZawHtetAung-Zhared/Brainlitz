import {Component, OnInit,Input} from '@angular/core';
@Component({
  selector: 'staff-teaching-graph',
  templateUrl: './staffTeachingGraph.component.html',
})

export class StaffTeachingReportGraph implements OnInit {
  @Input() reportItems: any;
  ngOnInit(){
    console.log(this.reportItems);
  }
  ngAfterViewInit(){

  }

}
