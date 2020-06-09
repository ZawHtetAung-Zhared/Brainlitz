import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'assessment-content',
  templateUrl: './assessment-content.component.html',
  styleUrls: ['./assessment-content.component.css']
})
export class AssessmentContentComponent implements OnInit {
  @Input() singleAssessment;
  @Input() viewFor;

  constructor() {}

  ngOnInit() {}

  expandAccessPoint(i, ind) {
    this.singleAssessment.accessPoints[ind].isExpand = !this.singleAssessment
      .accessPoints[ind].isExpand;
  }
}
