import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {
  constructor(private modalService: NgbModal, private router: Router) {}

  ngOnInit() {}

  public showPopUp = false;
  public modalReference: any;

  courseCreate = true;
  isCategory = false;
  isPlan = false;
  isCourseCreate = false;

  showPopUpFunc(modal) {
    this.showPopUp = true;
  }

  clickOverlay() {
    this.showPopUp = false;
  }

  cancelModal() {
    console.log('....');
    this.showPopUp = false;
  }

  goCourseDetails(id) {
    var courseId = '5e4cb79ed0019f00125bf69a'; //testing
    this.router.navigate(['/coursedetail', courseId]);
  }

  addNewCourse() {}
}
