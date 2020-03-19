import {
  Component,
  OnInit,
  ViewContainerRef,
  HostListener,
  DoCheck,
  OnDestroy
} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { appService } from '../../../service/app.service';
import { ToastrService } from 'ngx-toastr';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import 'rxjs/add/operator/takeUntil';
declare var $: any;

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {
  private regionID = localStorage.getItem('regionId');
  private locationID = localStorage.getItem('locationId');
  private progressModuleId;
  private limit;
  private skip;

  constructor(
    private _service: appService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params);
      this.progressModuleId = params.id;
    });
  }

  getAllProgressAPG() {
    this._service
      .getAllAPG(this.regionID, this.progressModuleId, this.limit, this.skip)
      .subscribe((res: any) => {
        console.log('pregress apg list', res);
      });
  }
}
