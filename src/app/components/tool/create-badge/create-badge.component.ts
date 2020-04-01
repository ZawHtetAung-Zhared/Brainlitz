import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { appService } from '../../../service/app.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-badge',
  templateUrl: './create-badge.component.html',
  styleUrls: ['./create-badge.component.css']
})
export class CreateBadgeComponent implements OnInit {
  public wordLength: any = 0;
  public regionID = localStorage.getItem('regionId');
  public locationID = localStorage.getItem('locationId');
  public module_id: any;
  public model: any = {};
  public isUpdate: boolean = false;
  public id: any;

  constructor(
    private modalService: NgbModal,
    private _Activatedroute: ActivatedRoute,
    private _service: appService,
    public toastr: ToastrService,
    private router: Router,
    private _location: Location
  ) {}

  ngOnInit() {
    this.module_id = this._Activatedroute.snapshot.paramMap.get('id');
    console.log('module id', this.module_id);
    if (this._Activatedroute.snapshot.url[0].path == 'edit') {
      this.module_id = this._Activatedroute.snapshot.paramMap.get('mid');
      console.log('module id', this.module_id);
      this.id = this._Activatedroute.snapshot.paramMap.get('id');
      this.isUpdate = true;
      console.log('2', this._Activatedroute.snapshot.url[0].path);
      this.singleAPG();
    }
  }

  focusMethod(e, status, word) {
    this.wordLength = word.length;
    if (status == 'name') {
      $('.limit-wordcount').show('slow');
    } else if ((status = 'input_method')) {
      $('.limit-type-wordcount').show('slow');
    } else {
      $('.limit-wordcount1').show('slow');
    }
  }

  blurMethod(e, status) {
    this.wordLength = 0;
    if (status == 'name') {
      $('.limit-wordcount').hide('slow');
    } else if ((status = 'input_method')) {
      $('.limit-type-wordcount').hide('slow');
    } else {
      $('.limit-wordcount1').hide('slow');
    }
  }

  changeMethod(val: string) {
    console.log(val);
    this.wordLength = val.length;
  }

  goToBack() {
    this._location.back();
  }
  cancelapg() {
    this.router.navigateByUrl(`tools/tracking-module/lists/all`);
  }
  createapgs(data, update) {
    console.log(update);
    var templateID;
    console.log(data);
    if (update == false) {
      console.log('create');
      var moduleId = this.module_id;
      data['moduleId'] = moduleId;
      this._service.createAP(this.regionID, this.locationID, data).subscribe(
        (res: any) => {
          // this.toastr.success('Successfully AP Created.');
          data['accessPoints'] = [res._id];
          console.log(data);
          this._service
            .createAPG(
              this.regionID,
              this.locationID,
              data,
              templateID,
              moduleId
            )
            .subscribe(
              (res: any) => {
                setTimeout(() => {
                  this.cancelapg();
                }, 200);
                this.toastr.success('APG successfully Created.');
                console.log(res);
                // console.warn(this.pickedMType, 'pick m type');
                // this.setSelectedTab(this.pickedMType);
                // this.cancelapg();
              },
              err => {
                this.toastr.error('Created APG Fail');
                console.log(err);
              }
            );
        },
        err => {
          this.toastr.error('Created AP Fail');
          console.log(err);
        }
      );
    } else {
      console.log('update');
      console.log(data);
      //this.blockUI.start('Loading...');
      this._service
        .updateAPG(this.regionID, data._id, data, templateID)
        .subscribe(
          (res: any) => {
            console.log('success update', res);
            this.toastr.success('Successfully APG Updated.');
            this.cancelapg();
            //this.blockUI.stop();
          },
          err => {
            this.toastr.error('Updated APG Fail');
            console.log(err);
          }
        );
    }
  }
  singleAPG() {
    this._service.getSingleAPG(this.regionID, this.id).subscribe(
      (res: any) => {
        //this.blockUI.stop();
        console.log('editapg', res);
        this.model = res;
        console.log('resolve res.accessPoints', res.accessPoints);
      },
      err => {
        //this.blockUI.stop();
        console.log(err);
      }
    );
  }
}
