import { Component, OnInit } from '@angular/core';
import { appService } from '../../service/app.service';
import { ToastrService } from 'ngx-toastr';

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
  public regionID = localStorage.getItem('regionId');

  constructor(private _service: appService, public toastr: ToastrService) {}

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
}
