import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-tool',
  templateUrl: './main-tool.component.html',
  styleUrls: ['./main-tool.component.css']
})
export class MainToolComponent implements OnInit {
  public isDisplay: boolean = false;
  public type: any = 'send-notification';
  constructor() {}

  ngOnInit() {}
}
