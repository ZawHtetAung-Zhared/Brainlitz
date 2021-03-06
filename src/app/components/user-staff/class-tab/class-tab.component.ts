import {
  Component,
  OnInit,
  OnChanges,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef
} from '@angular/core';
import { Router } from '@angular/router';
import {
  NgbModalRef,
  NgbModal,
  NgbDateStruct,
  ModalDismissReasons,
  NgbDatepickerConfig
} from '@ng-bootstrap/ng-bootstrap';

import { DataService } from '../../../service/data.service';
import { appService } from '../../../service/app.service';
import { Course } from './course';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-class-tab',
  templateUrl: './class-tab.component.html',
  styleUrls: ['./class-tab.component.css']
})
export class ClassTabComponent implements OnInit, OnDestroy {
  @Input() regionId: string;
  @Input() userId: string;
  @Input() locationId: string;
  @Output() showLoading = new EventEmitter();

  courses: Course[] = [];
  loading = true;
  nocourse = false;
  private subscription: ISubscription;
  public gtxtColor: any;
  public gbgColor: any;

  constructor(
    private _service: appService,
    private router: Router,
    private dataService: DataService,
    private cd: ChangeDetectorRef,
    private finalModal: NgbModal
  ) {}

  ngOnInit() {
    console.log(this.regionId);
    console.log(this.userId);
    console.log(this.locationId);
    this.loading = true;
    // this.showLoading.emit(false);
    this.gtxtColor = localStorage.getItem('txtColor');
    this.gbgColor = localStorage.getItem('backgroundColor');
    this.subscription = this._service
      .getUserDetail(
        this.regionId,
        this.userId,
        this.locationId,
        'courses,journals'
      )
      .subscribe(
        (res: any) => {
          this.loading = false;
          this.courses = res.courses;
          console.log(res);
          if (this.courses.length === 0) {
            console.log('nocourse');
            this.nocourse = true;
          }

          // this.showLoading.emit(true);
        },
        err => {
          this.loading = false;
          console.log(err);
        }
      );
  }

  navigateToCourseDetail(courseid: string) {
    console.log(courseid);
    // this.router.navigate(['/course']);
    // this.dataService.nevigateCourse(courseid);
    this.router.navigate(['/coursedetail', courseid]);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    console.log(this.courses);
  }
}
