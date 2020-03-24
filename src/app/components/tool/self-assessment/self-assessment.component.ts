import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { appService } from '../../../service/app.service';
import { ToolCommunicationService } from '../tool-communication.service';

@Component({
  selector: 'app-self-assessment',
  templateUrl: './self-assessment.component.html',
  styleUrls: ['./self-assessment.component.css']
})
export class SelfAssessmentComponent implements OnInit {
  public regionID = localStorage.getItem('regionId');
  public locationID = localStorage.getItem('locationId');
  public permissionType: any;

  selectedApgId: any;
  apgList: Array<any> = [];
  result: any = [];

  public searchValue;

  constructor(
    private router: Router,
    private _service: appService,
    private _Activatedroute: ActivatedRoute,
    private _toolCommunication: ToolCommunicationService
  ) {
    _toolCommunication.searchEmitted$.subscribe(data => {
      console.log(data);
      this.searchData(data);
    });
    _toolCommunication.refreshList$.subscribe(data => {
      console.log('tool communication:::\n:::::\n::::', data);
      this.ngOnInit();
    });
  }

  ngOnInit() {
    // if (this.router.url.includes('/tool-test/tracking-module')) {
    //   this.permissionType = localStorage.getItem('permission');
    this.selectedApgId = this._Activatedroute.snapshot.paramMap.get('id');
    //   console.log(this.selectedApgId);
    //   console.log(this.data);
    this.apgList = [];
    this.searchValue = '';
    this.getAllAPG(20, 0, '');
    // }
  }
  getAllAPG(limit, skip, val) {
    console.log('search value::::"' + val + '"');
    this._service
      .getAllAPG(this.regionID, this.selectedApgId, limit, skip, val)
      .subscribe(
        (res: any) => {
          this.result = res;

          if (val == '' || this.clickmore == true) {
            console.log('if');
            this.apgList = this.apgList.concat(res);
          } else {
            console.log('reach else');
            this.apgList = res;
          }
          console.log(this.apgList.length);
        },
        err => {
          console.log(err);
        }
      );
  }

  clickmore: boolean = false;
  showmore(type, skip: any) {
    console.log(this.apgList.length);
    console.log('Not user search ' + type);
    this.clickmore = true;
    console.log(this.searchValue);
    this.getAllAPG(20, skip, this.searchValue);
    // if (this.isSearch == true) {
    //   console.log('User Search');
    //   this.apgListSearch(this.keyword, type, 20, skip);
    // } else {
    //   console.log('Not user search');
    //   this.getAllAPG(20, skip);
    // }
  }

  searchData(data) {
    if (data.type == '5') {
      if (data.searchData == '') this.ngOnInit();
      else {
        this.searchValue = data.searchData;
        this.getAllAPG(20, 0, this.searchValue);
        this.clickmore = false;
      }
    }
  }
}
