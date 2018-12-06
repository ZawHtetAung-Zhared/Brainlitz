import {Component, OnInit,Input} from '@angular/core';
@Component({
  selector: 'std-enrolment-graph',
  templateUrl: './stdEnrolment.component.html',
})

export class StdEnrolmentReportGraph implements OnInit {
  @Input() reportItems: any;
  ngOnInit(){
    console.log("data inside graph component");
    console.log(this.reportItems);
  }
  ngAfterViewInit(){

  }
}
