import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { appService } from '../../../service/app.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _service: appService
  ) {}

  ngOnInit() {
    this.courseId = localStorage.getItem('COURSEID');
    console.log('CIDO', this.courseId);
    this.getUsersInCourse(this.courseId);
  }

  ngAfterViewInit() {
    console.log('AfterViewInit');
  }

  public on: boolean = true;
  public courseId: any;
  public propics: any = ['1', '2', '3', '4', '5'];
  public pplLists: any;
  public customerlist: any;
  public regionId = localStorage.getItem('regionId');
  public templength: any;
  // toggle() {
  //   this.on = !this.on;
  // }

  enrollCustomer(CID) {
    this.router.navigateByUrl(`/coursedetail/${this.courseId}/enroll`);
  }

  getUsersInCourse(courseId) {
    this._service
      .getAssignUser(this.regionId, courseId, null, null, null)
      .subscribe(
        (res: any) => {
          //this.blockUI.stop();

          this.pplLists = res.CUSTOMER;
          this.customerlist = this.pplLists.slice(0, 8);
          this.templength = res.CUSTOMER.length;
          console.log('UO', this.pplLists);
          if (this.pplLists.length > 0) {
            this.on = false;
            console.log('On', this.on);
          }
        },
        err => {
          console.log(err);
        }
      );
  }
}
