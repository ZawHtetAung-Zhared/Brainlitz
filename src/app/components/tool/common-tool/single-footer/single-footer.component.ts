import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'single-footer',
  templateUrl: './single-footer.component.html',
  styleUrls: ['./single-footer.component.css']
})
export class SingleFooterComponent implements OnInit {
  @Input() singleData;
  constructor() {}

  ngOnInit() {
    console.log(this.singleData);
  }
}
