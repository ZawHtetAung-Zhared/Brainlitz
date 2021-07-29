import { Component, OnInit } from '@angular/core';
import { appService } from '../../service/app.service';

@Component({
  selector: 'app-makeup-pass',
  templateUrl: './makeup-pass.component.html',
  styleUrls: ['./makeup-pass.component.css']
})
export class MakeupPassComponent implements OnInit {
  constructor(private _service: appService) {}

  ngOnInit() {
    this.getAllMakeupList();
  }
  public cusName: any;
  public currentSwitch: any = 'available';
  public regionID = localStorage.getItem('regionId');
  public makeupList: any = [];
  searchCus() {}

  switchTab(obj) {
    this.currentSwitch = obj;
  }

  getAllMakeupList() {
    this._service
      .getMakeupList(this.currentSwitch, this.regionID)
      .subscribe((res: any) => {
        this.makeupList = res.makeupPassesOfRegion;
        console.log('makeup', this.makeupList);
      });
  }
}
