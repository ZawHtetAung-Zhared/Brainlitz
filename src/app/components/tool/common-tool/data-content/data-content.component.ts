import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'data-content',
  templateUrl: './data-content.component.html',
  styleUrls: ['./data-content.component.css']
})
export class DataContentComponent implements OnInit {
  @Input() singleData;
  @Input() viewFor;
  constructor() {}

  ngOnInit() {
    console.log(this.singleData);
    console.log(this.viewFor);
  }
}
