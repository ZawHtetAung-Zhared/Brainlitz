import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'progress-content',
  templateUrl: './progress-content.component.html',
  styleUrls: ['./progress-content.component.css']
})
export class ProgressContentComponent implements OnInit {
  @Input() singleProgress;
  @Input() viewFor;
  constructor() {}

  ngOnInit() {
    console.log(this.singleProgress);
    console.log(this.viewFor);
  }
}
