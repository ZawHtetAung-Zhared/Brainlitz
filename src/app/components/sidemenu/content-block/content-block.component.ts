import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'side-block',
  templateUrl: './content-block.component.html',
  styleUrls: ['./content-block.component.css']
})
export class ContentBlockComponent implements OnInit {
  @Input() linkName;

  constructor() {}

  ngOnInit() {
    console.log(this.linkName);
  }
}
