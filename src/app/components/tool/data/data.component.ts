import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { appService } from '../../../service/app.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {
  public regionID = localStorage.getItem('regionId');
  public locationID = localStorage.getItem('locationId');

  selectedApgId: any;
  apgList: Array<any> = [];
  result: any = [];

  constructor(
    private router: Router,
    private _service: appService,
    private _Activatedroute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.selectedApgId = this._Activatedroute.snapshot.paramMap.get('id');
    this.getAllAPG(20, 0);
  }

  getAllAPG(limit, skip) {
    this._service
      .getAllAPG(this.regionID, this.selectedApgId, limit, skip, null)
      .subscribe(
        (res: any) => {
          this.result = res;
          this.apgList = this.apgList.concat(res);
          for (var i = 0; i < this.apgList.length; i++) {
            for (var j = 0; j < this.apgList[i].accessPoints.length; j++) {
              this.apgList[i].accessPoints[j].isExpand = false;
            }
          }
          console.log('APG lists', this.apgList);
        },
        err => {
          console.log(err);
        }
      );
  }

  showmore(type, skip: any) {
    console.log('Not user search');
    this.getAllAPG(20, skip);
    // if (this.isSearch == true) {
    //   console.log('User Search');
    //   this.apgListSearch(this.keyword, type, 20, skip);
    // } else {
    //   console.log('Not user search');
    //   this.getAllAPG(20, skip);
    // }
  }
}
