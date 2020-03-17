import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'side-block',
  templateUrl: './content-block.component.html',
  styleUrls: ['./content-block.component.css']
})
export class ContentBlockComponent implements OnInit {
  @Input() linkName;
  @Input() isdropDown;

  public isDisplay: boolean = false;

  constructor() {}

  ngOnInit() {
    console.log(this.linkName);
    console.log(this.isdropDown);
  }
}
