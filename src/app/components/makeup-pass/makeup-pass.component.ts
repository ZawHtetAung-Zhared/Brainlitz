import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-makeup-pass',
  templateUrl: './makeup-pass.component.html',
  styleUrls: ['./makeup-pass.component.css']
})
export class MakeupPassComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
  public cusName: any;
  public currentSwitch: any = 'Available';
  searchCus() {}

  switchTab(obj) {
    this.currentSwitch = obj;
  }
}
