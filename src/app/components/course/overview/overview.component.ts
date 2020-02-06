import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
  public on: boolean = true;
  public propics: any = ['1', '2', '3', '4', '5'];

  toggle() {
    this.on = !this.on;
  }
}
