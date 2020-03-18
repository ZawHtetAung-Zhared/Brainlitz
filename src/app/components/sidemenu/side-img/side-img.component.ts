import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'side-img',
  templateUrl: './side-img.component.html',
  styleUrls: ['./side-img.component.css']
})
export class SideImgComponent implements OnInit {
  @Input() imgLink;

  constructor() {}

  ngOnInit() {
    console.log(this.imgLink);
  }
}
