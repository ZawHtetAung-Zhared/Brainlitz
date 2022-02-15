import {
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { appService } from '../../../service/app.service';

@Component({
  selector: 'app-term-list',
  templateUrl: './term-list.component.html',
  styleUrls: ['./term-list.component.css']
})
export class TermListComponent implements OnChanges {
  @Input() loading: boolean;
  @Input() todayDate: any;
  @Input() courseId: String;
  @Input() courseType: String;
  @Input() LASD: any;
  @Input() lastSelectedObj: any;
  @Input() lessonList: any;
  @Input() isRescheduleLesson: boolean;
  @Input() isNewLesson: boolean;
  @Output() clickLesson = new EventEmitter<any>();
  @Output() clickEditBatch = new EventEmitter<any>();
  @Output() clickCreateTerm = new EventEmitter<any>();
  @Output() clickAddNewLesson = new EventEmitter<any>();
  public subscription: ISubscription;
  public termList: Array<any> = [];
  public termLessons: Array<any> = [];

  constructor(private _service: appService) {}

  // ngOnInit() {
  //   console.log("lessonList------",this.lessonList);
  //   console.log("termList------",this.termList);
  //   this.getAllTerms();
  // }

  ngOnChanges() {
    console.log('todayDate------', this.todayDate);
    console.log('lessonList------', this.lessonList);
    console.log('termList------', this.termList);
    this.getAllTerms();
  }

  ngOnDestory() {
    this.subscription.unsubscribe();
  }

  getAllTerms() {
    this.subscription = this._service
      .getTermList(this.courseId)
      .subscribe((res: any) => {
        console.log('res-----', res);
        this.termList = res.data;
        this.mapTermWithAttendance();
      });
  }

  mapTermWithAttendance() {
    if (
      this.lessonList != null &&
      this.lessonList != undefined &&
      this.lessonList.length > 0
    ) {
      this.lessonList.map(data => {
        let lessonDate = new Date(data.startDate.slice(0, 10));
        this.termList.map(item => {
          const termStartDate = new Date(item.termStartDate.slice(0, 10));
          const termEndDate = new Date(item.termEndDate.slice(0, 10));
          if (lessonDate >= termStartDate && lessonDate <= termEndDate) {
            data['color'] = item.color;
            data['termId'] = item._id;
            data['termName'] = item.name;
            console.log('lesson in term', data);
          }
        });
      });
      console.log('lessonList---------', this.lessonList);
      this.setTermLessons(this.lessonList);
    }
  }

  setTermLessons(lessons) {
    this.termLessons = [];
    lessons.map(lesson => {
      if (
        lesson.termId != undefined &&
        lesson.termName != undefined &&
        lesson.color != undefined
      ) {
        let termIdx = this.termLessons.findIndex(
          data => data._id == lesson.termId
        );
        if (termIdx == -1) {
          console.log('termIdx == -1');
          const term_idx = this.termList.findIndex(
            data => data._id == lesson.termId
          );
          const term = this.termList[term_idx];
          term['lessons'] = [];
          term.lessons.push(lesson);
          this.termLessons.push(term);
        } else {
          console.log('term != -1', termIdx);
          let term = this.termLessons[termIdx];
          if (term._id == lesson.termId) {
            this.termLessons[termIdx].lessons.push(lesson);
          }
        }
      } else {
        const idx = this.termLessons.findIndex(data => data._id == lesson._id);
        console.log('lesson idx------', idx);
        if (idx == -1) {
          this.termLessons.push(lesson);
        }
      }
    });
    console.log('termLessons------', this.termLessons);
  }

  onClickEditBatch(termId) {
    this.clickEditBatch.emit(termId);
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
