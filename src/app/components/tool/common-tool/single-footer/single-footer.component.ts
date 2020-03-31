import { Component, OnInit, Input } from '@angular/core';

import { appService } from '../../../../service/app.service';
import { ToastrService } from 'ngx-toastr';
import { Router, NavigationEnd } from '@angular/router';
import { DeleteApgModalComponent } from '../delete-apg-modal/delete-apg-modal.component';
import { ToolCommunicationService } from '../../tool-communication.service';

@Component({
  selector: 'single-footer',
  templateUrl: './single-footer.component.html',
  styleUrls: ['./single-footer.component.css']
})
export class SingleFooterComponent implements OnInit {
  @Input() singleData;

  public regionID = localStorage.getItem('regionId');
  public model: any = {};

  constructor(
    private _service: appService,
    public toastr: ToastrService,
    private router: Router,
    private _toolCommunication: ToolCommunicationService
  ) {}

  ngOnInit() {}

  apgPublicShare(apgID) {
    console.log(apgID);
    this.singleAPG(apgID, 'share');
  }
  singleAPG(id, state) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this._service.getSingleAPG(this.regionID, id).subscribe(
          (res: any) => {
            console.log('editapg', res);
            this.model = res;
            console.log('resolve res.accessPoints', res.accessPoints);
            resolve(res.accessPoints);
            if (state == 'share') {
              console.log(res);
              this.convertTemplate(res, res._id, res.name);
            }
            if (state == 'public') {
              console.log('public ok');
              this.publicAPG(res);
            }
          },
          err => {
            //this.blockUI.stop();
            console.log(err);
          }
        );
      }, 300);
    });
  }
  convertTemplate(apgObj, id, apgName) {
    console.log(apgObj);
    let data = {
      name: apgName
    };
    // this.tempSharedApgId = id;
    console.log(data, id);
    this._service.convertApgTemplate(id, data).subscribe(
      (res: any) => {
        console.log(res);
        let returnData = JSON.parse(res._body);
        this.singleAPG(returnData._id, 'public');
      },
      err => {
        console.log(err);
      }
    );
  }

  publicAPG(data) {
    data.public = true;

    this._service.updateSingleTemplate(this.regionID, data).subscribe(
      (res: any) => {
        console.log(res);
        this._toolCommunication.refreshApgList();
        this.toastr.success('Successfully shared to public.');
      },
      err => {
        this.toastr.success(status + ' Fail.');
        console.log(err);
      }
    );
  }

  onclickDelete() {
    this._service.openDeleteApgModal(DeleteApgModalComponent, this.singleData);
  }
  onclickUpdate(singleData) {
    console.log('data', singleData);
    this._service.SetApgObj(singleData);
    this.router.navigateByUrl(
      `tools/tracking-module/edit/` +
        singleData.module.type +
        `/` +
        singleData.module._id +
        `/` +
        singleData._id
    );
  }
}
