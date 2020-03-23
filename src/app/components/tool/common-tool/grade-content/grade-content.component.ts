import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'grade-content',
  templateUrl: './grade-content.component.html',
  styleUrls: ['./grade-content.component.css']
})
export class GradeContentComponent implements OnInit {
  @Input() singleGrade;
  @Input() viewFor;
  constructor() {}

  ngOnInit() {}
}
