import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  NgbModal,
  ModalDismissReasons,
  NgbCalendar
} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { appService } from '../../service/app.service';

@Component({
  selector: 'app-credential',
  templateUrl: './credential.component.html',
  styleUrls: ['./credential.component.css']
})
export class CredentialComponent implements OnInit {
  public regionID = localStorage.getItem('regionId');
  public userList: any;
  public checkboxFlag: any = {};
  public selectAllFlag: boolean;
  public sortFlag: boolean = false;
  public cusName: any = '';
  public loader: boolean = true;
  public resendLoading: boolean = false;
  public sentDone: boolean = false;
  public currentId: any;
  public currentSwitch: any = 'new';
  public modalReference: any;

  constructor(
    private _service: appService,
    public toastr: ToastrService,
    private router: Router,
    public modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getCredentials();
  }

  getCredentials() {
    if (this.currentSwitch == 'new') {
      this._service.getNotyetLoginuser(this.regionID).subscribe((res: any) => {
        console.log('customer', res);
        this.userList = res.notYetLoginUsers;
        this.loader = false;
        this.sentDone = false;
        // this.userList.sort(this.compareAZ);
      });
    } else if (this.currentSwitch == 'old') {
      this._service.getAlreadyLoginuser(this.regionID).subscribe((res: any) => {
        console.log('customer', res);
        this.userList = res.notYetLoginUsers;
        this.loader = false;
        this.sentDone = false;
        // this.userList.sort(this.compareAZ);
      });
    }
  }
  sendReset(obj) {
    this.resendLoading = true;
    this._service
      .sendPasswordReset(obj, this.regionID)
      .subscribe((res: any) => {
        console.log('customer', res);
        this.getCredentials();
        this.resendLoading = false;
        this.sentDone = true;
      });
    this.closeModal();
  }
  checkLesson(i) {
    console.log('user', this.userList[i]);

    if (this.checkboxFlag[i] != true) {
      this.checkboxFlag[i] = true;
    } else this.checkboxFlag[i] = false;
  }

  selectAll() {
    this.selectAllFlag = !this.selectAllFlag;
    for (var k = 0; k < this.userList.length; k++) {
      this.checkboxFlag[k] = this.selectAllFlag ? true : false;
    }
  }

  resend(modal) {
    var cusId = [];
    for (var k = 0; k < this.userList.length; k++) {
      if (this.checkboxFlag[k] == true) {
        cusId.push(this.userList[k].customerId);
      }
    }
    var body = {
      customerIdList: cusId
    };
    console.log('list of ids', body);
    if (this.currentSwitch == 'new') {
      this.sendReset(body);
    } else {
      this.modalReference = this.modalService.open(modal, {
        backdrop: 'static',
        windowClass: 'modal d-flex justify-content-center align-items-center'
      });
    }
  }
  closeModal() {
    this.modalReference.close();
  }
  confirmResend() {
    var cusId = [];
    for (var k = 0; k < this.userList.length; k++) {
      if (this.checkboxFlag[k] == true) {
        cusId.push(this.userList[k].customerId);
      }
    }
    if (cusId.length == 0) {
      var body = {
        customerIdList: [this.currentId]
      };
    } else {
      var body = {
        customerIdList: cusId
      };
    }
    this.sendReset(body);
  }
  sortByCus() {
    this.sortFlag = !this.sortFlag;
    if (this.sortFlag) {
      this.userList.sort(this.compareZA);
    }
    if (!this.sortFlag) {
      this.userList.sort(this.compareAZ);
    }
  }
  sortByDate() {
    this.sortFlag = !this.sortFlag;
    if (this.sortFlag) {
      this.userList.sort(this.compareDateZA);
    }
    if (!this.sortFlag) {
      this.userList.sort(this.compareDateAZ);
    }
  }

  compareAZ(a, b) {
    if (a.preferredName < b.preferredName) {
      return -1;
    }
    if (a.preferredName > b.preferredName) {
      return 1;
    }
    return 0;
  }
  compareZA(a, b) {
    if (a.preferredName < b.preferredName) {
      return 1;
    }
    if (a.preferredName > b.preferredName) {
      return -1;
    }
    return 0;
  }

  compareDateAZ(a, b) {
    if (a.sendRandomPasswordAt < b.sendRandomPasswordAt) {
      return -1;
    }
    if (a.sendRandomPasswordAt > b.sendRandomPasswordAt) {
      return 1;
    }
    return 0;
  }
  compareDateZA(a, b) {
    if (a.sendRandomPasswordAt < b.sendRandomPasswordAt) {
      return 1;
    }
    if (a.sendRandomPasswordAt > b.sendRandomPasswordAt) {
      return -1;
    }
    return 0;
  }
  searchCus() {
    var index = this.userList.filter(obj => obj.preferredName === this.cusName);
    console.log(index, this.cusName);
  }
  singleResend(id, event, modal) {
    this.currentId = id;
    event.stopPropagation();
    console.log('resend');
    var body = {
      customerIdList: [id]
    };
    if (this.currentSwitch == 'new') {
      this.sendReset(body);
    } else {
      this.modalReference = this.modalService.open(modal, {
        backdrop: 'static',
        windowClass: 'modal d-flex justify-content-center align-items-center'
      });
    }
  }

  switchLogin(obj) {
    this.currentSwitch = obj;
    this.getCredentials();
    console.log('enter switch func', this.currentSwitch);
  }
}
