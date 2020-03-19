import { Component, OnInit } from '@angular/core';
import { appService } from '../../../service/app.service';
@Component({
  selector: 'app-all-tracking-module',
  templateUrl: './all-tracking-module.component.html',
  styleUrls: ['./all-tracking-module.component.css']
})
export class AllTrackingModuleComponent implements OnInit {
  public regionID = localStorage.getItem('regionId');
  public allList: any = [];
  constructor(private _service: appService) {}

  ngOnInit() {
    this.getAllAPG(20, 0);
  }

  getAllAPG(limit, skip) {
    this._service.getAllAPG(this.regionID, '', limit, skip).subscribe(
      (res: any) => {
        console.log(res);
        this.allList = res;
      },
      err => {
        console.log(err);
      }
    );
  }
}
