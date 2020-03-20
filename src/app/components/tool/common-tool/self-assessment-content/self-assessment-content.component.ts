import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'self-assessment-content',
  templateUrl: './self-assessment-content.component.html',
  styleUrls: ['./self-assessment-content.component.css']
})
export class SelfAssessmentContentComponent implements OnInit {
  @Input() singleSelfAssessment;
  @Input() viewFor;
  constructor() {}

  ngOnInit() {
    console.log(this.singleSelfAssessment);
    console.log(this.viewFor);
  }
}
