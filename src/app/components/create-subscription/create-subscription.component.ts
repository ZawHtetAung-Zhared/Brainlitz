import { Component, OnInit } from '@angular/core';
import { appService } from '../../service/app.service';
import { ToastrService } from 'ngx-toastr';
import {
  NgbModal,
  ModalDismissReasons,
  NgbDateAdapter,
  NgbDatepickerConfig,
  NgbCalendar,
  NgbDateStruct
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-subscription',
  templateUrl: './create-subscription.component.html',
  styleUrls: ['./create-subscription.component.css']
})
export class CreateSubscriptionComponent implements OnInit {
  public createFlag: boolean = false;
  public subInfo: any = {
    name: '',
    description: '',
    lessonCount: '',
    duration: '',
    price: ''
  };
  public modalReference: any;
  public regionID = localStorage.getItem('regionId');
  public checkboxFlag: any = {};

  constructor(
    private _service: appService,
    public toastr: ToastrService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getSubs();
  }

  createToggle() {
    this.createFlag = !this.createFlag;
    if (!this.createFlag) {
      this.clearForm();
    }
  }

  createSub() {
    console.log('dan tan tan', this.subInfo);
    this._service.createSubscription(this.subInfo, this.regionID).subscribe(
      (res: any) => {
        console.log(res);
        this.toastr.success('Successfully created!');
        this.clearForm();
        this.getSubs();
      },
      err => {
        console.log(err);
        this.toastr.error(err.error.message);
      }
    );
  }
  public subscriptionList: any = [];
  getSubs() {
    this._service.getSubscriptionList(this.regionID).subscribe(
      (res: any) => {
        console.log('sub list', res);
        this.subscriptionList = res;
      },
      err => {
        console.log(err);
        this.toastr.error(err.error.message);
      }
    );
  }

  updateSub() {
    console.log('dan tan tan', this.subInfo);
    this._service
      .updateSubscription(this.subInfo, this.regionID, this.subId)
      .subscribe(
        (res: any) => {
          console.log(res);
          this.toastr.success('Successfully updated!');
          this.clearForm();
          this.getSubs();
        },
        err => {
          console.log(err);
          this.toastr.error(err.error.message);
        }
      );
  }
  public updateFlag: boolean = false;
  public subId: any = null;
  editSub(sub) {
    console.log('editing', sub);

    this.createFlag = true;
    this.subInfo = {
      name: sub.name,
      description: sub.description,
      lessonCount: sub.lessonCount,
      duration: sub.duration,
      price: sub.price
    };
    this.subId = sub._id;
    this.updateFlag = true;
  }

  clearForm() {
    this.subInfo = {
      name: '',
      description: '',
      lessonCount: '',
      duration: '',
      price: ''
    };
    this.createFlag = false;
    this.updateFlag = false;
  }
  public selectedSub: any = null;
  viewSubscribersModal(modal, sub) {
    console.log('new modal', sub);
    this.checkboxFlag = {};
    this.selectAllFlag = false;
    this.subscriberList = [];
    this.getSubscriberList(sub);
    this.selectedSub = sub;
    this.modalReference = this.modalService.open(modal, {
      backdrop: 'static',
      windowClass: 'modal-xl modal-inv'
    });
  }

  closeModal() {
    this.modalReference.close();
  }
  public subscriberList: any = [];
  getSubscriberList(sub) {
    this._service.getSubscriberList(this.regionID, sub._id).subscribe(
      (res: any) => {
        console.log('who sub??', res);
        this.subscriberList = res;
      },
      err => {
        console.log(err);
        this.toastr.error(err.error.message);
      }
    );
  }

  checkLesson(i) {
    console.log('~~~~~~', this.checkboxFlag);
    if (this.checkboxFlag[i] != true) {
      this.checkboxFlag[i] = true;
    } else this.checkboxFlag[i] = false;
  }
  public selectAllFlag: boolean = false;
  selectAll() {
    this.selectAllFlag = !this.selectAllFlag;
    for (var k = 0; k < this.subscriberList.length; k++) {
      this.checkboxFlag[k] = this.selectAllFlag ? true : false;
    }
  }

  resubscribe() {
    var subId = '';
    for (var k = 0; k < this.subscriberList.length; k++) {
      if (this.checkboxFlag[k] == true) {
        console.log('####', this.subscriberList[k]);
        subId += this.subscriberList[k].userDetails._id + ',';
      }
    }
    subId = subId.substring(0, subId.length - 1);
    console.log('re re re', subId);
    var body = {
      userId: subId
    };

    this._service
      .subscribeNewPlan(body, this.regionID, this.selectedSub._id)
      .subscribe(
        (res: any) => {
          console.log('subscribe', res);
          this.toastr.success('Successfully subscribed!');
          this.modalReference.close();
        },
        err => {
          console.log(err);
          this.toastr.error(err.error.message);
        }
      );
  }
}
