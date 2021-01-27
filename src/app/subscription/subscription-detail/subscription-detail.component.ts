import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-subscription-detail',
  templateUrl: './subscription-detail.component.html',
  styleUrls: ['./subscription-detail.component.css']
})
export class SubscriptionDetailComponent implements OnInit {
  @Output() flag = new EventEmitter<any>();
  constructor() {}

  ngOnInit() {}

  backClicked() {
    this.flag.emit();
  }
}
