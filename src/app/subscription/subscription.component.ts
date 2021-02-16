import { Component, OnInit } from '@angular/core';
import { appService } from '../service/app.service';
import {
  NgbModal,
  ModalDismissReasons,
  NgbDateAdapter,
  NgbDatepickerConfig,
  NgbCalendar,
  NgbDateStruct
} from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {
  public modalReference: any;
  public subDetail: boolean = false;
  public regionID = localStorage.getItem('regionId');
  public subscriptionList = [];
  public planFlag: boolean = false;
  public subPlanList = [];

  constructor(
    private modalService: NgbModal,
    private _service: appService,
    private _Activatedroute: ActivatedRoute,
    public toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getSubPlans();
  }

  newSubModal(modal) {
    this.modalReference = this.modalService.open(modal, {
      backdrop: 'static',
      windowClass:
        'modal-xl modal-inv d-flex justify-content-center align-items-center'
    });
    this._service.getSubscriptionList(this.regionID).subscribe((res: any) => {
      console.log('sub list', res);
      this.subscriptionList = res;
    });
  }
  public subInfo: any;
  gotoDetail(sub) {
    this.subDetail = true;
    this.subInfo = sub;
  }
  backClicked() {
    this.subDetail = false;
  }

  subscribeNewPlan(id) {
    var body = {
      userId: this._Activatedroute.snapshot.paramMap.get('userid')
    };

    this._service.subscribeNewPlan(body, this.regionID, id).subscribe(
      (res: any) => {
        console.log('subscribe', res);
        this.getSubPlans();
        this.toastr.success('Successfully subscribed!');
      },
      err => {
        console.log(err);
        this.toastr.error(err.error.message);
      }
    );
  }

  getSubPlans() {
    this._service
      .getSubscribedPlans(
        this.regionID,
        this._Activatedroute.snapshot.paramMap.get('userid')
      )
      .subscribe(
        (res: any) => {
          console.log('plans', res);
          this.subPlanList = res;
          if (this.subPlanList.length > 0) {
            this.planFlag = true;
          }
        },
        err => {
          console.log(err);
          this.toastr.error(err.error.message);
        }
      );
  }
}
