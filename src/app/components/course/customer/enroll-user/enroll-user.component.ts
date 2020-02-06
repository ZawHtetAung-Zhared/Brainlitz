import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-enroll-user',
  templateUrl: './enroll-user.component.html',
  styleUrls: ['./enroll-user.component.css']
})
export class EnrollUserComponent implements OnInit {
  constructor() {}

  isCourseCreate: boolean = false;
  isCategory: boolean = false;
  isPlan: boolean = false;
  public isTodayLesson: boolean = false;

  public showInvoice: boolean = false;
  public showPayment: boolean = false;
  public showflexyCourse: boolean = false;

  ngOnInit() {}
}
