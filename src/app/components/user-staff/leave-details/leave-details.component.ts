import { Component, OnInit, Input } from '@angular/core';
import {
  NgbModalRef,
  NgbModal,
  NgbDateStruct,
  ModalDismissReasons,
  NgbDatepickerConfig
} from '@ng-bootstrap/ng-bootstrap';
import { appService } from '../../../service/app.service';
@Component({
  selector: 'app-leave-details',
  templateUrl: './leave-details.component.html',
  styleUrls: ['./leave-details.component.css']
})
export class LeaveDetailsComponent implements OnInit {
  @Input() userId: any;
  public userLeave = [];
  public leaveLogs = [];
  public giveMakeUp = false;
  public modalReference: any;
  public regionID = localStorage.getItem('regionId');
  constructor(
    private _service: appService,
    private cancelClassModalService: NgbModal
  ) {}

  ngOnInit() {
    this.getUserLeaves(this.userId);
  }

  getUserLeaves(userId) {
    this._service.getUserLeaveDetails(this.regionID, userId).subscribe(
      (res: any) => {
        res.leaves.map(leave => {
          leave.percentLeave = leave.takenDays * 5 + 40;
          leave.maxPercentLeave = leave.leaveDays * 5 + 40;
        });
        this.userLeave = res.leaves;

        this.leaveLogs = res.logs;
      },
      err => {}
    );
  }
  autoResize(e) {
    console.log(e.target.style);
    console.log(e.target.scrollHeight);
    e.target.style.cssText = 'height:auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  }
  closeCancelClassModal() {
    this.modalReference.close();
  }

  cancelClassModal(cancelClass) {
    this.giveMakeUp = false;
    this.modalReference = this.cancelClassModalService.open(cancelClass, {
      backdrop: 'static',
      windowClass:
        'modal-xl modal-inv d-flex justify-content-center align-items-center'
    });
  }
}
