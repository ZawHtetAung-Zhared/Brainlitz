import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { termList } from './terms';

@Component({
  selector: 'app-term-list',
  templateUrl: './term-list.component.html',
  styleUrls: ['./term-list.component.css']
})
export class TermListComponent implements OnInit {
  @Output() clickEditBatch = new EventEmitter<any>();
  public todayDate: any;

  constructor() {}

  ngOnInit() {
    console.log('termList', termList);
    this.todayDate = new Date().toISOString();
  }

  onClickEditBatch() {
    this.clickEditBatch.emit();
  }
}
