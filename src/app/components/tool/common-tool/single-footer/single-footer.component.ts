import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { appService } from '../../../../service/app.service';
import { ToastrService } from 'ngx-toastr';
import { Router, NavigationEnd } from '@angular/router';
import { DeleteApgModalComponent } from '../delete-apg-modal/delete-apg-modal.component';

@Component({
  selector: 'single-footer',
  templateUrl: './single-footer.component.html',
  styleUrls: ['./single-footer.component.css']
})
export class SingleFooterComponent implements OnInit {
  @Input() singleData;
  @Output() callParentComp = new EventEmitter<any>();

  public regionID = localStorage.getItem('regionId');
  public model: any = {};

  constructor(
    private _service: appService,
    public toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log(this.singleData);
  }

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
    console.log('public share', data);
    data.public = true;
    this.callParent();

    // this._service.updateSingleTemplate(this.regionID, data).subscribe(
    //   (res: any) => {
    //     console.log(res);
    //     // this.clearAPGTypeArr();
    //     // this.getAllAPG(20, 0);
    //     this.toastr.success('Successfully shared to public.');
    //   },
    //   err => {
    //     this.toastr.success(status + ' Fail.');
    //     console.log(err);
    //   }
    // );
  }

  callParent() {
    this.callParentComp.emit(true);
  }

  onclickDelete(id, alertDelete) {
    // this._service.openDeleteModal(DeleteApgModalComponent);
    this._service.openDeleteModal(alertDelete);
    // console.log(alertDelete);
    // this.deleteId = id;
    // for (var i in this.apgList) {
    //   if (this.apgList[i]._id == id) {
    //     this.deleteAPG = this.apgList[i].name;
    //   }
    // }
    // this.modalReference = this.modalService.open(alertDelete, {
    //   backdrop: 'static',
    //   windowClass:
    //     'deleteModal d-flex justify-content-center align-items-center'
    // });
  }
}
