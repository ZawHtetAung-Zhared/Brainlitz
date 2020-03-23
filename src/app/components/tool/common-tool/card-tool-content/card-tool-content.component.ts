import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'card-tool-content',
  templateUrl: './card-tool-content.component.html',
  styleUrls: ['./card-tool-content.component.css']
})
export class CardToolContentComponent implements OnInit {
  @Input() dataList;
  @Input() viewFor;
  constructor() {}

  ngOnInit() {
    console.log(this.dataList);
    console.log(this.viewFor);
  }
  searchData(lst) {
    console.log(lst);
    this.dataList = lst;
  }
}
