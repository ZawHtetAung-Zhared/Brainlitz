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

      this.getAllAPG(20, 0, data.searchData);
    });
  }

  ngOnInit() {
    this.getAllAPG(20, 0, null);
  }

  getAllAPG(limit, skip, val) {
    this._service.getAllAPG(this.regionID, '', limit, skip, val).subscribe(
      (res: any) => {
        this.allList = res;
        console.log(this.allList);
        if (val) {
          this.isSearch = true;
          console.log('reach');
        }
        console.log(this.isSearch);
      },
      err => {
        console.log(err);
      }
    );
  }
}
