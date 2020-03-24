import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { appService } from '../../../service/app.service';
import { ToolCommunicationService } from '../tool-communication.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {
  public regionID = localStorage.getItem('regionId');
  public locationID = localStorage.getItem('locationId');
  public permissionType: any;

  selectedApgId: any;
  apgList: Array<any> = [];
  result: any = [];

  constructor(
    private router: Router,
    private _service: appService,
    private _Activatedroute: ActivatedRoute,
    private _toolCommunication: ToolCommunicationService
  ) {
    _toolCommunication.searchEmitted$.subscribe(data => {
      console.log(data);
      if (data.type == '3') this.getAllAPG(20, 0, data.searchData);
    });
  }

  ngOnInit() {
    if (this.router.url.includes('/tool-test/tracking-module')) {
      this.permissionType = localStorage.getItem('permission');
      this.selectedApgId = this._Activatedroute.snapshot.paramMap.get('id');
      console.log(this.selectedApgId);
      this.getAllAPG(20, 0, '');
    }
  }

  searchValue = '';
  getAllAPG(limit, skip, val) {
    this.searchValue = val;
    this._service
      .getAllAPG(this.regionID, this.selectedApgId, limit, skip, val)
      .subscribe(
        (res: any) => {
          console.error('result :::::::: ', res);
          this.result = res;
          if (val == '' || this.clickmore == true) {
            this.apgList = this.apgList.concat(res);
          } else {
            this.apgList = res;
          }

          console.log('APG lists', this.apgList);
        },
        err => {
          console.log(err);
        }
      );
  }

  clickmore: boolean = false;

  showmore(type, skip: any) {
    console.log('Not user search ' + type);
    this.clickmore = true;
    this.getAllAPG(20, skip, this.searchValue);
    // if (this.isSearch == true) {
    //   console.log('User Search');
    //   this.apgListSearch(this.keyword, type, 20, skip);
    // } else {
    //   console.log('Not user search');
    //   this.getAllAPG(20, skip);
    // }
  }
}
