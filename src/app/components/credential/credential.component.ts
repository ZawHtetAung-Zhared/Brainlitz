import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private _service: appService,
    public toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getCredentials();
  }

  getCredentials() {
    this._service.getNotyetLoginuser(this.regionID).subscribe((res: any) => {
      console.log('customer', res);
      this.userList = res.notYetLoginUsers;
    });
  }
  sendReset(obj) {
    this._service
      .sendPasswordReset(obj, this.regionID)
      .subscribe((res: any) => {
        console.log('customer', res);
      });
  }
  checkLesson(i) {
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

  resend() {
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
    this.sendReset(body);
  }
}
