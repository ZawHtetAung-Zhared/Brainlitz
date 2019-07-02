import {
  Component,
  OnInit,
  OnChanges,
  OnDestroy,
  Input,
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
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-class-tab',
  templateUrl: './class-tab.component.html',
  styleUrls: ['./class-tab.component.css']
})
export class ClassTabComponent implements OnInit, OnDestroy {
  @Input() regionId: string;
  @Input() userId: string;
  @Input() locationId: string;

  courses: Course[] = [];
  loading = true;
  nocourse = false;
  modalReference: NgbModalRef;
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
    this._service
      .getUserDetail(this.regionId, this.userId, this.locationId)
      .pipe(take(1))
      .subscribe(
        (res: any) => {
          this.loading = false;
          this.courses = res.courses;
          console.log(res);
          if (this.courses.length === 0) {
            console.log('nocourse');
            this.nocourse = true;
          }
        },
        err => {
          this.loading = false;
          console.log(err);
        }
      );
  }

  ngOnDestroy() {
    this._service.getUserDetail(this.regionId, this.userId, this.locationId);
  }

  navigateToCourseDetail(courseid: string) {
    console.log(courseid);
    this.router.navigate(['/course']);
    this.dataService.nevigateCourse(courseid);
  }

  closeModal() {
    this.modalReference.close();
  }

  finalClassModal(finalmodal) {
    this.modalReference = this.finalModal.open(finalmodal, {
      backdrop: 'static',
      centered: true,
      windowClass:
        'modal-xl modal-inv d-flex justify-content-center align-items-center'
    });
  }
}
