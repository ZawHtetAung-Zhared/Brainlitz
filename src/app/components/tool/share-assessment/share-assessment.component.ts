import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { appService } from '../../../service/app.service';
import { Route } from '@angular/compiler/src/core';
@Component({
  selector: 'app-share-assessment',
  templateUrl: './share-assessment.component.html',
  styleUrls: ['./share-assessment.component.css']
})
export class ShareAssessmentComponent implements OnInit {
  public moduleId: any;
  public sharechecked: any;
  public isSearch: boolean = false;
  public keyword: any;

  public regionID = localStorage.getItem('regionId');
  public locationID = localStorage.getItem('locationId');
  public dataVal: any = {};

  templateList: Array<any> = [];
  result: any = [];
  apgList: Array<any> = [];

  public singleCheckedAPG: boolean = false;

  constructor(
    private _activeRoute: ActivatedRoute,
    private _service: appService,
    public toastr: ToastrService,
    public _router: Router
  ) {}

  ngOnInit() {
    this.moduleId = this._activeRoute.snapshot.paramMap.get('id');
    this.getAllTemplate(20, 0);
  }

  getAllTemplate(limit, skip) {
    console.log(this.moduleId);
    //this.blockUI.start('Loading');
    this._service
      .getAllTemplate(this.regionID, limit, skip, this.moduleId)
      .subscribe(
        (res: any) => {
          console.log('templateLists', res);
          this.result = res;
          this.templateList = this.templateList.concat(res);
          for (var i = 0; i < this.templateList.length; i++) {
            for (var j = 0; j < this.templateList[i].accessPoints.length; j++) {
              this.templateList[i].accessPoints[j].isExpand = false;
            }
          }
        },
        err => {
          console.log(err);
        }
      );
  }

  expandAccessPoint(i, ind, type) {
    if (type == 'apg') {
      this.apgList[i].accessPoints[ind].isExpand = !this.apgList[i]
        .accessPoints[ind].isExpand;
    } else {
      this.templateList[i].accessPoints[ind].isExpand = !this.templateList[i]
        .accessPoints[ind].isExpand;
      console.log(i, ind);
    }
  }

  public get half(): number {
    return Math.ceil(this.templateList.length / 2);
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
          this.backToList();
          //this.blockUI.stop();
        },
        err => {
          this.toastr.error(status + ' Fail.');
          //this.blockUI.stop();
          console.log(err);
        }
      );
  }

  backToList() {
    this._router.navigateByUrl(
      'tool-test/tracking-module/lists/3/' + this.moduleId
    );
  }

  goToback() {
    this._router.navigateByUrl('tool-test/tracking-module/selected-module');
  }
  showMoreShareApg(skip) {
    if (this.isSearch == true) {
      console.log('User Search');
      this.sharedApgSearch(this.keyword, 20, skip);
    } else {
      console.log('Not user search');
      this.getAllTemplate(20, skip);
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

  sharedApgSearch2(keyword, limit, skip) {
    this.keyword = keyword;
    if (keyword.length == 0) {
      this.sharedApgSearch(keyword, limit, skip);
    }
  }
}
