import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { terms } from './terms';
import { appService } from '../../../service/app.service';

@Component({
  selector: 'app-term-list',
  templateUrl: './term-list.component.html',
  styleUrls: ['./term-list.component.css']
})
export class TermListComponent implements OnInit {
  @Input() loading: boolean;
  @Input() todayDate: any;
  @Input() courseId: String;
  @Input() courseType: String;
  @Input() LASD: any;
  @Input() lastSelectedObj: any;
  @Input() attendanceList: any;
  @Output() clickLesson = new EventEmitter<any>();
  @Output() clickEditBatch = new EventEmitter<any>();
  @Output() clickCreateTerm = new EventEmitter<any>();
  @Output() clickAddNewLesson = new EventEmitter<any>();
  public termList: Array<any> = [];

  constructor(private _service: appService) {}

  ngOnInit() {
    this.getAllTerms();
  }

  getAllTerms() {
    this._service.getTermList(this.courseId).subscribe((res: any) => {
      console.log('res', res);
      this.termList = res.data;
    });
  }

  onClickEditBatch() {
    this.clickEditBatch.emit();
  }

  onClickCreateTerm() {
    this.clickCreateTerm.emit();
  }

  onClickLesson(startDate, timeline, cancelUi, i) {
    let data = {
      startDate: startDate,
      timeline: timeline,
      cancelUi: cancelUi,
      i: i
    };
    this.clickLesson.emit(data);
  }

  onClickAddNewLesson() {
    this.clickAddNewLesson.emit();
  }
}
