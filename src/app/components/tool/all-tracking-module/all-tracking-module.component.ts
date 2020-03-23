import {
  Component,
  OnInit,
  ContentChild,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { appService } from '../../../service/app.service';
import { ToolCommunicationService } from '../tool-communication.service';
@Component({
  selector: 'app-all-tracking-module',
  templateUrl: './all-tracking-module.component.html',
  styleUrls: ['./all-tracking-module.component.css']
})
export class AllTrackingModuleComponent implements OnInit {
  public regionID = localStorage.getItem('regionId');
  public allList: any = [];

  public isSearch: boolean = false;
  public searchValue;

  constructor(
    private _service: appService,
    private _toolCommunication: ToolCommunicationService
  ) {
    _toolCommunication.searchEmitted$.subscribe(data => {
      console.log(data);
      if (data.type == 'all') this.getAllAPG(20, 0, data.searchData);
    });
  }

  ngOnInit() {
    this.getAllAPG(20, 0, null);
  }
  result: any = [];

  getAllAPG(limit, skip, val) {
    this.searchValue = val;
    this._service.getAllAPG(this.regionID, '', limit, skip, val).subscribe(
      (res: any) => {
        this.result = res;

        if (val == '' || this.clickmore == true) {
          console.log('if');
          this.allList = this.allList.concat(res);
        } else {
          console.log('reach else');
          this.allList = res;
        }
        console.log(this.allList.length);
      },
      err => {
        console.log(err);
      }
    );
  }

  clickmore: boolean = false;
  showmore(type, skip: any) {
    console.log(this.allList.length);
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
}
