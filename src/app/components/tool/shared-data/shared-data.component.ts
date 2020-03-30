import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { appService } from '../../../service/app.service';

@Component({
  selector: 'app-shared-data',
  templateUrl: './shared-data.component.html',
  styleUrls: ['./shared-data.component.css']
})
export class SharedDataComponent implements OnInit {
  public regionID = localStorage.getItem('regionId');
  public locationID = localStorage.getItem('locationId');
  public sharechecked: any;
  public moduleId: any;
  public singleCheckedAPG: boolean = false;
  public isSearch: boolean = false;
  public dataVal: any = {};
  public keyword: any;
  // array
  result: any = [];
  templateList: Array<any> = [];
  constructor(
    private _service: appService,
    private _activeRoute: ActivatedRoute,
    public toastr: ToastrService,
    public _router: Router
  ) {}

  ngOnInit() {
    this.moduleId = this._activeRoute.snapshot.paramMap.get('id');
    this.getAllTemplate(20, 0);
  }

  getAllTemplate(limit, skip) {
    this._service
      .getAllTemplate(this.regionID, limit, skip, this.moduleId)
      .subscribe(
        (res: any) => {
          console.log('templateLists', res);
          this.result = res;
          this.templateList = this.templateList.concat(res);

          console.log(this.templateList);
          // setTimeout(() => {
          //this.blockUI.stop();
          // }, 300);
        },
        err => {
          console.log(err);
        }
      );
  }

  chooseShareAPG(val, name) {
    console.log(val);
    this.sharechecked = val;
    this.getsingleTemplate(this.sharechecked);
  }

  getsingleTemplate(id) {
    this._service.getSingleTemplate(this.regionID, id).subscribe(
      (res: any) => {
        this.singleCheckedAPG = res;
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  public get half(): number {
    return Math.ceil(this.templateList.length / 2);
  }

  setShareAPG(obj) {
    // console.log('set share',this.singleCheckedAPG)

    let data = this.singleCheckedAPG;
    console.log(obj);
    let emptyObj = {};
    this.dataVal = this.singleCheckedAPG;

    console.log('~~~~', this.dataVal);
    this._service
      .createAPG(
        this.regionID,
        this.locationID,
        emptyObj,
        this.dataVal._id,
        this.dataVal.moduleId
      )
      .subscribe(
        (res: any) => {
          console.log(res);
          this.toastr.success('APG successfully created.');
          this._router.navigateByUrl(
            'tool-test/tracking-module/lists/4/' + this.moduleId
          );
        },
        err => {
          this.toastr.error(status + ' Fail.');
          //this.blockUI.stop();
          console.log(err);
        }
      );
  }

  goToBack() {
    this._router.navigateByUrl('tool-test/tracking-module/selected-module');
  }

  sharedApgSearch2(keyword, limit, skip) {
    this.keyword = keyword;
    if (keyword.length == 0) {
      this.sharedApgSearch(keyword, limit, skip);
    }
  }

  sharedApgSearch(keyword, limit, skip) {
    this.keyword = keyword;
    if (skip == '' && limit == '') {
      console.log('First time search');
      var isFirst = true;
      limit = 20;
      skip = 0;
    }
    if (keyword.length != 0) {
      this._service
        .getSearchTemplate(this.regionID, limit, skip, this.moduleId, keyword)
        .subscribe(
          (res: any) => {
            console.log('templateLists', res);
            if (isFirst == true) {
              console.log('First time searching');
              this.templateList = [];
              this.templateList = res;
            } else {
              console.log('Not First time searching');
              // this.apgList = res;
              this.templateList = this.templateList.concat(res);
            }
            this.result = res;
          },
          err => {
            console.log(err);
          }
        );
    } else {
      // setTimeout(() => {
      this.templateList = [];
      this.getAllTemplate(20, 0);
      this.isSearch = false;
      this.keyword = '';
      // }, 100);
    }
  }
}
