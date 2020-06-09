import { Component, OnInit } from '@angular/core';
import { appService } from '../../../service/app.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shared-usergrading',
  templateUrl: './shared-usergrading.component.html',
  styleUrls: ['./shared-usergrading.component.css']
})
export class SharedUsergradingComponent implements OnInit {
  public templateList: Array<any> = [];
  public module_id: any;
  public regionID = localStorage.getItem('regionId');
  public locationID = localStorage.getItem('locationId');
  public result: any = [];
  public isSearch: boolean = false;
  public sharechecked: any;
  public singleCheckedAPG: boolean = false;
  public dataVal: any = {};
  public keyword: any;

  constructor(
    private _service: appService,
    private _Activatedroute: ActivatedRoute,
    public toastr: ToastrService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit() {
    this.module_id = this._Activatedroute.snapshot.paramMap.get('id');
    this.getAllTemplate(20, 0);
  }

  getAllTemplate(limit, skip) {
    // console.log(this.apgType);
    var moduleId = this.module_id;
    console.log(moduleId);
    //this.blockUI.start('Loading');
    this._service
      .getAllTemplate(this.regionID, limit, skip, moduleId)
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

  showMoreShareApg(skip) {
    if (this.isSearch == true) {
      console.log('User Search');
      // this.sharedApgSearch(this.keyword, 20, skip);
    } else {
      console.log('Not user search');
      this.getAllTemplate(20, skip);
    }
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
          //this.blockUI.stop();
          setTimeout(() => {
            this.cancelapg();
          }, 200);
          // this.setSelectedTab(this.pickedMType);
        },
        err => {
          this.toastr.error(status + ' Fail.');
          //this.blockUI.stop();
          console.log(err);
        }
      );
  }

  cancelapg() {
    window.history.go(-2);
  }
  goToBack() {
    this.router.navigateByUrl(`tools/tracking-module/selected-module`);
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
        .getSearchTemplate(this.regionID, limit, skip, this.module_id, keyword)
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
