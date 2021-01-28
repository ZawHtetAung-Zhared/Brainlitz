import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-lesson-picker',
  templateUrl: './lesson-picker.component.html',
  styleUrls: ['./lesson-picker.component.css']
})
export class LessonPickerComponent implements OnInit {
  @Output() flag = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  backClicked() {
    this.flag.emit();
  }
}
