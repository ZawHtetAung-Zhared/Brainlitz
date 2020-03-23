import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { appService } from '../../../service/app.service';
import { ToolCommunicationService } from '../tool-communication.service';
@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {
  public permissionType: any;
  selectedApgId: any;
  result: any = [];
  apgList: Array<any> = [];
  public regionID = localStorage.getItem('regionId');
  public locationID = localStorage.getItem('locationId');

  constructor(
    private router: Router,
    private _service: appService,
    private _Activatedroute: ActivatedRoute,
    private _toolCommunication: ToolCommunicationService
  ) {
    _toolCommunication.searchEmitted$.subscribe(data => {
      console.log(data);
      if (data.type == '1') this.getAllAPG(20, 0, data.searchData);
    });
    _toolCommunication.refreshList$.subscribe(data => {
      console.log(data);
      this.getAllAPG(20, 0, '');
    });
  }

  private data: any;
  ngOnInit() {
    if (this.router.url.includes('/tool-test/tracking-module')) {
      this.permissionType = localStorage.getItem('permission');
      this.selectedApgId = this._Activatedroute.snapshot.paramMap.get('id');
      console.log(this.selectedApgId);
      console.log(this.data);

      this.getAllAPG(20, 0, '');
    }
  }

  getAllAPG(limit, skip, val) {
    this._service
      .getAllAPG(this.regionID, this.selectedApgId, limit, skip, val)
      .subscribe(
        (res: any) => {
          console.error('result :::::::: ', res);
          this.result = res;
          this.apgList = res;
          console.log('APG lists', this.apgList);
        },
        err => {
          console.log(err);
        }
      );
  }

  showmore(type, skip: any) {
    console.log('Not user search ' + type);
    this.getAllAPG(20, skip, '');
    // if (this.isSearch == true) {
    //   console.log('User Search');
    //   this.apgListSearch(this.keyword, type, 20, skip);
    // } else {
    //   console.log('Not user search');
    //   this.getAllAPG(20, skip);
    // }
  }

  searchData(value) {
    console.log(value);
  }
}
