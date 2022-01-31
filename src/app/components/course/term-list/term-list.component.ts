import {
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
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
  @Input() attendanceList: any;
  @Output() clickLesson = new EventEmitter<any>();
  @Output() clickEditBatch = new EventEmitter<any>();
  @Output() clickCreateTerm = new EventEmitter<any>();
  @Output() clickAddNewLesson = new EventEmitter<any>();
  public termList: Array<any> = [];

  constructor(private _service: appService) {}

  // ngOnInit() {
  //   console.log("attendanceList------",this.attendanceList.lessons);
  //   console.log("termList------",this.termList);
  //   this.getAllTerms();
  // }

  ngOnChanges() {
    console.log('attendanceList------', this.attendanceList.lessons);
    console.log('termList------', this.termList);
    this.getAllTerms();
  }

  getAllTerms() {
    this._service.getTermList(this.courseId).subscribe((res: any) => {
      console.log('res', res);
      this.termList = res.data;
      this.mapTermWithAttendance();
      // this.getTermLessons();
    });
  }

  // getTermLessons() {
  //   this.termList.map(term => {
  //     console.log("term",term);
  //     const termStartDate = new Date(term.termStartDate.slice(0,10));
  //     const termEndDate = new Date(term.termEndDate.slice(0,10));
  //     term['lessons'] = [];
  //     if(this.attendanceList.lessons != null && this.attendanceList.lessons != undefined && this.attendanceList.lessons.length > 0) {
  //       let lessonList = this.attendanceList.lessons;
  //       lessonList.map(lesson => {
  //         let lessonDate = new Date(lesson.startDate.slice(0, 10));
  //         console.log("attendance lesson",lesson);
  //         console.log(lessonDate,termStartDate,termEndDate);
  //         if(lessonDate >= termStartDate && lessonDate <= termEndDate) {
  //           term.lessons.push(lesson);
  //         }
  //       })
  //     }
  //   })
  //   console.log("termList",this.termList);
  // }

  mapTermWithAttendance() {
    if (
      this.attendanceList.lessons != null &&
      this.attendanceList.lessons != undefined &&
      this.attendanceList.lessons.length > 0
    ) {
      console.log('map with term~~~~~~');
      let lessonList = this.attendanceList.lessons;
      lessonList.map(data => {
        let lessonDate = new Date(data.startDate.slice(0, 10));
        this.termList.map(item => {
          const termStartDate = new Date(item.termStartDate.slice(0, 10));
          const termEndDate = new Date(item.termEndDate.slice(0, 10));
          console.log('~~~~~~~', lessonDate, termStartDate, termEndDate);
          if (lessonDate >= termStartDate && lessonDate <= termEndDate) {
            data['color'] = item.color;
            console.log('lesson in term', data);
          }
        });
      });
      console.log(
        'attendanceList.lessons---------',
        this.attendanceList.lessons
      );
    }
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
