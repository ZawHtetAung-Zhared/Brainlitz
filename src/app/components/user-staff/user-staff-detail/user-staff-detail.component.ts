import { Component, OnInit, HostListener } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { appService } from '../../../service/app.service';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-user-staff-detail',
  templateUrl: './user-staff-detail.component.html',
  styleUrls: ['./user-staff-detail.component.css']
})
export class UserStaffDetailComponent implements OnInit {
  isSticky = false;
  public userId: any;
  public showloading: boolean = true;
  public userArchive = false;
  public activeTab = 'Classes';
  staffObj: any = {};
  public staffDetail: any = {};
  public orgID = localStorage.getItem('OrgId');
  public regionID = localStorage.getItem('regionId');
  public locationID = localStorage.getItem('locationId');

  //for loading
  public detailLoading: boolean = true;

  constructor(
    private _service: appService,
    private _Activatedroute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.userId = this._Activatedroute.snapshot.paramMap.get('staffid');
    console.log(this.userId);
    this._Activatedroute.queryParams.subscribe(params => {
      console.log(params);
      this.staffObj = params;
      this.showDetails();
    });
  }

  @HostListener('window:scroll', ['$event']) onScroll($event) {
    if (window.pageYOffset > 81) {
      this.isSticky = true;
    } else {
      this.isSticky = false;
    }
  }

  clickTab(type) {
    console.log('click tab', type);
    this.showloading = false;
    this.activeTab = type;
    // setTimeout(() => {
    //   this.showloading = true;
    // }, 4000);
  }

  showLoadingFun(e) {
    this.showloading = e;
  }

  showDetails() {
    this.showloading = false;
    this.userArchive = this.staffObj.isArchive === 'true';
    this.activeTab = 'Classes';
    console.log('userArchive', this.userArchive);
    console.log('show Staff details', this.staffObj);
    this._service
      .getUserDetail(this.regionID, this.userId, this.locationID, 'user')
      .subscribe(
        (res: any) => {
          this.staffDetail = res;
          res.user.details.map(info => {
            if (info.controlType === 'Datepicker') {
              info.value = moment(info.value).format('YYYY-MM-DD');

              const birthday = moment(info.value);
              info.year = moment().diff(birthday, 'years');
              // var month = moment().diff(birthday, 'months') - info.year * 12;
              // birthday.add(info.year, 'years').add(month, 'months'); for years months and days calculation
              birthday.add(info.year, 'years'); // for years and days calculation
              info.day = moment().diff(birthday, 'days');
            }
          });

          console.log('StaffDetail', res);
          console.log('Staff App test', this.staffDetail.user.journalApprove);
          this.showloading = true;
          setTimeout(() => {
            this.detailLoading = false;
          }, 2000);
        },
        err => {
          console.log(err);
        }
      );
  }

  backToStaff() {
    this.router.navigate(['/staff']);
  }

  staffArchive(archive) {
    this.userArchive = archive;
    let customerId = this.staffDetail.user.userId;
    let isArchive = archive;
    isArchive = this.userArchive;
    let regionId = this.regionID;
    const tempData = {
      customerId,
      isArchive,
      regionId
    };
    this._service.userArchive(tempData).subscribe(
      res => {
        console.error(res);
      },
      err => {
        console.error(err);
      }
    );
  }

  getSingleInfo() {
    console.log('edit profile', this.userId);
    this.router.navigate(['/staff/staffcreate', 'edit', this.userId]);
  }
}
