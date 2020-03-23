import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { appService } from '../../../service/app.service';
import { ISubscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.css']
})
export class BadgeComponent implements OnInit {
  public permissionType: any;
  selectedApgId: any;
  result: any = [];
  apgList: Array<any> = [];
  public regionID = localStorage.getItem('regionId');
  public locationID = localStorage.getItem('locationId');

  constructor(
    private router: Router,
    private _service: appService,
    private _Activatedroute: ActivatedRoute
  ) {}

  ngOnInit() {
    if (this.router.url.includes('/tool-test/tracking-module')) {
      this.permissionType = localStorage.getItem('permission');
      this.selectedApgId = this._Activatedroute.snapshot.paramMap.get('id');
      console.log(this.selectedApgId);
      this.getAllAPG(20, 0);
    }
  }

  getAllAPG(limit, skip) {
    this._service
      .getAllAPG(this.regionID, this.selectedApgId, limit, skip, null)
      .subscribe(
        (res: any) => {
          console.error('result :::::::: ', res);
          this.result = res;
          this.apgList = this.apgList.concat(res);
          console.log('APG lists', this.apgList);
        },
        err => {
          console.log(err);
        }
      );
  }

  showmore(type, skip: any) {
    console.log('Not user search ' + type);
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
