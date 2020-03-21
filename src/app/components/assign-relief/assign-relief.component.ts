import { KeyedWrite } from '@angular/compiler';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { appService } from '../../service/app.service';
import {
  NgbModal,
  ModalDismissReasons,
  NgbDatepickerConfig,
  NgbCalendar,
  NgbDateStruct
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-assign-relief',
  templateUrl: './assign-relief.component.html',
  styleUrls: ['./assign-relief.component.css']
})
export class AssignReliefComponent implements OnInit {
  public regionID = localStorage.getItem('regionId');
  public modalReference: any;
  public searchTeacherLists: any = [];
  public isFocusSearch: boolean = false;
  public searchKeyword: any = '';
  public selectedTeacher: any = null;
  public conflictLessonArr = [];
  public assistantArr: any = [];

  @Input() courseInfo;
  @Input() lessonInfo;
  @Input() scheduleRelief;
  @Output() closed = new EventEmitter<boolean>();

  constructor(private _service: appService, private modalService: NgbModal) {}

  ngOnInit() {
    console.log(this.courseInfo);
    console.log(this.lessonInfo);
    console.log(this.scheduleRelief);

    this.courseInfo.assistants.map(assistant => {
      this.assistantArr.push(assistant.userId);
    });
    this.lessonInfo['lessonDate'] = this.lessonInfo.startDate.substr(
      0,
      this.lessonInfo.startDate.search('T')
    );
  }

  searchMethod2(keyword, usertype) {
    if (keyword.length == 0) {
      this.searchMethod(keyword, usertype);
    }
  }

  searchMethod(keyword, usertype) {
    if (keyword == 0) {
      this.searchTeacherLists = [];
    } else {
      this._service
        .getSearchUser(
          this.regionID,
          keyword,
          usertype,
          20,
          0,
          this.courseInfo._id
        )
        .subscribe((res: any) => {
          console.log(res);
          this.searchTeacherLists = res;
        });
    }
  }

  focusSearch(e, type) {
    if (type == 'focusOn') {
      this.isFocusSearch = true;
      this.searchTeacherLists = [];
    } else {
      setTimeout(() => {
        this.isFocusSearch = false;
        this.searchKeyword = '';
      }, 300);
    }
  }

  cancelModal() {
    console.log('cancel modal');
    this.selectedTeacher = null;
    this.conflictLessonArr = [];
    this.isFocusSearch = false;
    this.closed.emit(true);
    this.assistantArr = [];
  }

  onSelectTeacher(data) {
    console.log('lessonInfo~~~~~~~~~', this.lessonInfo);
    this.selectedTeacher = data;
    this.conflictLessonArr = [];
    console.log('selected Teacher', data);
    let lessonDate = this.lessonInfo.startDate.substr(
      0,
      this.lessonInfo.startDate.search('T')
    );
    console.log('lesson date~~~~', lessonDate);
    this._service
      .getClassCheckAvailable(
        this.regionID,
        this.selectedTeacher.userId,
        lessonDate,
        'DAY'
      )
      .subscribe(
        (res: any) => {
          this.conflictLessonArr = res.courses;
          console.log('conflictLessonArr', this.conflictLessonArr);
        },
        err => {
          console.log(err);
        }
      );
  }

  confirmRelief(selectedTeacher) {
    var obj = {};
    obj['newTeacherId'] = selectedTeacher.userId;
    console.log(obj);
    this._service
      .assignRelief(this.courseInfo._id, this.lessonInfo._id, obj)
      .subscribe((res: any) => {
        this.cancelModal();
        console.log(res);
      });
  }
}
