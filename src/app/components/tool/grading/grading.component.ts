import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { appService } from '../../../service/app.service';
import { ISubscription } from 'rxjs/Subscription';
import { ToolCommunicationService } from '../tool-communication.service';

@Component({
  selector: 'app-grading',
  templateUrl: './grading.component.html',
  styleUrls: ['./grading.component.css']
})
export class GradingComponent implements OnInit {
  //check permission
  public permissionType: any;
  public apgPermission: any = [];
  public apgDemo: any = [];
  private permissionSubscription: ISubscription;

  public regionID = localStorage.getItem('regionId');
  public locationID = localStorage.getItem('locationId');

  selectedApgId: any;
  apgList: Array<any> = [];
  result: any = [];

  constructor(
    private router: Router,
    private _service: appService,
    private _Activatedroute: ActivatedRoute,
    private _toolCommunication: ToolCommunicationService
  ) {
    _toolCommunication.refreshList$.subscribe(data => {
      console.log(data);
    });
  }

  ngOnInit() {
    if (this.router.url.includes('/tool-test/tracking-module')) {
      this.permissionType = localStorage.getItem('permission');
      this.selectedApgId = this._Activatedroute.snapshot.paramMap.get('id');
      console.log(this.selectedApgId);
      this.getAllAPG(20, 0, null);
      // this.permissionSubscription = this._service.permissionList.subscribe(
      //   data => {
      //     console.log('work');
      //     this.permissionType = data;
      //     this.checkPermission();
      //   }
      // );
    }
  }

  ngOnDestroy() {
    // this.permissionSubscription.unsubscribe();
  }

  checkPermission() {
    console.log(this.permissionType);
    this.apgPermission = ['CREATEAPG', 'CREATEAP'];
    if (this.permissionType != null) {
      this.apgPermission = this.apgPermission.filter(
        value => -1 !== this.permissionType.indexOf(value)
      );
      this.apgDemo['addAPG'] = this.apgPermission.includes('CREATEAPG')
        ? 'CREATEAPG'
        : '';
      this.apgDemo['addAP'] = this.apgPermission.includes('CREATEAP')
        ? 'CREATEAP'
        : '';
      this.apgDemo['viewAPG'] = this.apgPermission.includes('VIEWAPG')
        ? 'VIEWAPG'
        : '';

      console.log(this.apgDemo);
    }

    // console.log(this.apgDemo)
    if (this.apgPermission.length > 0) {
      console.log('permission allow!!!');
      // this.getAllModule();
      this.getAllAPG(20, 0, null);
    } else {
      this.apgList = [];
    }
  }

  getAllAPG(limit, skip, val) {
    this._service
      .getAllAPG(this.regionID, this.selectedApgId, limit, skip, val)
      .subscribe(
        (res: any) => {
          console.error('result :::::::: ', res);
          this.result = res;
          this.apgList = this.apgList.concat(res);
          // if (this.selectedAPGTab.name.toLowerCase() == 'user grading') {
          //   this.usergradingAPG = this.usergradingAPG.concat(res);
          //   this.apgList = this.usergradingAPG;
          // }
          console.log('APG lists', this.apgList);
        },
        err => {
          console.log(err);
        }
      );
  }
  showmore(type, skip: any) {
    console.log('Not user search ' + type);
    this.getAllAPG(20, skip, null);
    // if (this.isSearch == true) {
    //   console.log('User Search');
    //   this.apgListSearch(this.keyword, type, 20, skip);
    // } else {
    //   console.log('Not user search');
    //   this.getAllAPG(20, skip);
    // }
  }
}
