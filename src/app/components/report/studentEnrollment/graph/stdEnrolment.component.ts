import {Component, OnInit,Input} from '@angular/core';
@Component({
  selector: 'std-enrolment-graph',
  templateUrl: './stdEnrolment.component.html',
  styles: ['.average-rating-font {color: #64707d;padding-left: 10px;font-size: 12px;font-family: Montserrat-Medium, Arial,sans-serif;line-height: 0.5;}']
})

export class StdEnrolmentReportGraph implements OnInit {
  @Input() reportItems: any;
  ngOnInit(){
    console.log(this.reportItems);
  }
  ngAfterViewInit(){

  }
}
