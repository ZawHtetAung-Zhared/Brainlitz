import { Component, OnInit, HostListener } from '@angular/core';

import { ISubscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { appService } from '../../../service/app.service';

@Component({
  selector: 'app-user-staff-list',
  templateUrl: './user-staff-list.component.html',
  styleUrls: ['./user-staff-list.component.css']
})
export class UserStaffListComponent implements OnInit {
  private permissionSubscription: ISubscription;
  isSticky = false;
  public locationName: any;
  public permissionType: any;
  public staffPermission: any = [];
  public gtxtColor: any;
  public gbgColor: any;
  public orgID = localStorage.getItem('OrgId');
  public regionID = localStorage.getItem('regionId');
  public staffLists: Array<any> = [];
  public staffDemo: any = [];
  permissionLists: any;
  usertype: any;
  result: any;
  isSearch = false;
  searchword: any;

  constructor(
    private _service: appService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    setTimeout(() => {
      console.log('~~~', this.locationName);
      this.locationName = localStorage.getItem('locationName');
      this.gtxtColor = localStorage.getItem('txtColor');
      this.gbgColor = localStorage.getItem('backgroundColor');
    }, 300);
    this.permissionSubscription = this._service.permissionList.subscribe(
      data => {
        if (this.router.url === '/staff/stafflist') {
          this.permissionType = data;
          this.staffLists = [];
          this.checkPermission();
        }
      }
    );
  }

  ngOnDestroy() {
    this.permissionSubscription.unsubscribe();
  }

  @HostListener('window:scroll', ['$event']) onScroll($event) {
    if (window.pageYOffset > 81) {
      this.isSticky = true;
    } else {
      this.isSticky = false;
    }
  }

  checkPermission() {
    console.log(this.permissionType);
    this.staffPermission = [
      'CREATESTAFFS',
      'EDITSTAFFS',
      'VIEWSTAFFS',
      'DELETESTAFFS'
    ];
    this.staffPermission = this.staffPermission.filter(
      value => -1 !== this.permissionType.indexOf(value)
    );

    this.staffDemo['addStaff'] = this.staffPermission.includes('CREATESTAFFS')
      ? 'CREATESTAFFS'
      : '';
    this.staffDemo['editStaff'] = this.staffPermission.includes('EDITSTAFFS')
      ? 'EDITSTAFFS'
      : '';
    this.staffDemo['viewStaff'] = this.staffPermission.includes('VIEWSTAFFS')
      ? 'VIEWSTAFFS'
      : '';
    this.staffDemo['deleteStaff'] = this.staffPermission.includes(
      'DELETESTAFFS'
    )
      ? 'DELETESTAFFS'
      : '';

    if (this.staffPermission.includes('VIEWSTAFFS') != false) {
      this.locationName = localStorage.getItem('locationName');
      this.gtxtColor = localStorage.getItem('txtColor');
      this.gbgColor = localStorage.getItem('backgroundColor');
      this.getAllUsers('staff', 20, 0);
      this.getAllpermission();
    } else {
      console.log('permission deny');
      this.staffLists = [];
    }
  }

  getAllpermission() {
    console.log('hi permission');
    this._service.getAllPermission(this.regionID).subscribe((res: any) => {
      this.permissionLists = res;
      console.log('this.permissionLists', this.permissionLists);
    });
  }

  getAllUsers(type, limit, skip) {
    //this.blockUI.start('Loading...');
    this._service.getAllUsers(this.regionID, type, limit, skip).subscribe(
      (res: any) => {
        //this.blockUI.stop();
        this.result = res;
        this.staffLists = this.staffLists.concat(res);
        // this.staffLists = res;
        console.log('this.staffLists', this.staffLists);
      },
      err => {
        //this.blockUI.stop();
        console.log(err);
      }
    );
  }

  userSearch2(searchWord, userType, limit, skip) {
    console.log('I am in 2');
    if (searchWord.length == 0) {
      this.userSearch(searchWord, userType, limit, skip);
    }
  }

  userSearch(searchWord, userType, limit, skip) {
    this.searchword = searchWord;
    this.usertype = userType;
    console.log('hi hello');
    if (skip == '' && limit == '') {
      console.log('First time search');
      var isFirst = true;
      limit = 20;
      skip = 0;
    }

    if (searchWord.length != 0) {
      console.log(limit, skip);
      this.isSearch = true;
      this._service
        .getSearchUser(this.regionID, searchWord, userType, limit, skip, '')
        .subscribe(
          (res: any) => {
            console.log(res);
            // this.staffLists = res;
            this.result = res;
            if (isFirst == true) {
              console.log('First time searching');
              this.staffLists = [];
              this.staffLists = res;
            } else {
              console.log('Not First time searching');
              this.staffLists = this.staffLists.concat(res);
            }
          },
          err => {
            console.log(err);
          }
        );
    } else {
      setTimeout(() => {
        this.staffLists = [];
        this.getAllUsers('staff', 20, 0);
        this.isSearch = false;
      }, 300);
    }
  }

  showMore(type: any, skip: any) {
    console.log(skip, this.usertype);
    // this.getAllUsers(type, 20, skip);
    if (this.isSearch == true) {
      console.log('User Search');
      this.userSearch(this.searchword, this.usertype, 20, skip);
    } else {
      console.log('Not user search');
      this.getAllUsers(type, 20, skip);
    }
  }

  showDetails(staff, staffId) {
    let navigationExtras: NavigationExtras = {
      queryParams: staff
    };
    this.router.navigate(['/staff/staffdetail', staffId], navigationExtras);
  }

  goCreateForm(type) {
    this.router.navigate(['../staffcreate/', type, 0], {
      relativeTo: this.route
    });
  }
}
