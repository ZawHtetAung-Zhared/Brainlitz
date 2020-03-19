import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'badge-content',
  templateUrl: './badge-content.component.html',
  styleUrls: ['./badge-content.component.css']
})
export class BadgeContentComponent implements OnInit {
  @Input() singleBadge;
  constructor() {}

  ngOnInit() {
    console.log(this.singleBadge);
  }
}
