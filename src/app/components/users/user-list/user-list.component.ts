import { Component, OnInit, HostListener } from '@angular/core';

import { appService } from '../../../service/app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  private permissionSubscription: ISubscription;
  isSticky: boolean = false;
  public customerPermission: any = [];
  public customerDemo: any = [];
  customerLists: Array<any> = [];
  public gtxtColor: any;
  public gbgColor: any;
  public regionID = localStorage.getItem('regionId');
  public locationID = localStorage.getItem('locationId');
  public locationName: any;
  public permissionType: any;
  public result: any;
  private isSearch: boolean = false;
  private searchword: any;
  public customerLoading: boolean = true;
  public customerListLoading: boolean = false;
  public searchKeyword: any;

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
        if (this.router.url === '/customer/customerlist') {
          this.permissionType = data;
          this.customerLists = [];
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
    this.customerPermission = [
      'CREATECUSTOMERS',
      'VIEWCUSTOMERS',
      'EDITCUSTOMERS',
      'DELETECUSTOMERS',
      'ENROLLCOURSE'
    ];
    this.customerPermission = this.customerPermission.filter(
      value => -1 !== this.permissionType.indexOf(value)
    );

    this.customerDemo['createCustomer'] = this.customerPermission.includes(
      'CREATECUSTOMERS'
    )
      ? 'CREATECUSTOMERS'
      : '';
    this.customerDemo['viewCustomer'] = this.customerPermission.includes(
      'VIEWCUSTOMERS'
    )
      ? 'VIEWCUSTOMERS'
      : '';
    this.customerDemo['editCustomer'] = this.customerPermission.includes(
      'EDITCUSTOMERS'
    )
      ? 'EDITCUSTOMERS'
      : '';
    this.customerDemo['deleteCustomer'] = this.customerPermission.includes(
      'DELETECUSTOMERS'
    )
      ? 'DELETECUSTOMERS'
      : '';
    this.customerDemo['enrollStudent'] = this.customerPermission.includes(
      'ENROLLCOURSE'
    )
      ? 'ENROLLCOURSE'
      : '';

    if (this.customerPermission.includes('VIEWCUSTOMERS') != false) {
      this.getAllUsers('customer', 20, 0);
      this.locationName = localStorage.getItem('locationName');
      this.gtxtColor = localStorage.getItem('txtColor');
      this.gbgColor = localStorage.getItem('backgroundColor');
    } else {
      console.log('permission deny');
      this.customerLists = [];
    }
  }

  getAllUsers(type, limit, skip) {
    // this.customerLoading = true;
    console.log('calling all users ....');
    console.log('....', this.customerLists);
    this._service.getAllUsers(this.regionID, type, limit, skip).subscribe(
      (res: any) => {
        console.log(res);
        this.result = res;
        this.customerLists = this.customerLists.concat(res);
        // this.customerLists = res;
        console.log('this.customerLists', this.customerLists);
        this.customerLoading = false;
        this.customerListLoading = false;
      },
      err => {
        console.log(err);
      }
    );
  }

  showMore(type: any, skip: any) {
    this.customerListLoading = true;
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 100);
    console.log(skip);
    if (this.isSearch == true) {
      console.log('User Search', skip);
      this.userSearch(this.searchword, type, 20, skip);
    } else {
      console.log('Not user search');
      this.getAllUsers(type, 20, skip);
    }
  }

  userSearch_input(keyword) {
    this.searchKeyword = keyword;
    if (keyword.length == 0) {
      this.userSearch(keyword, 'customer', '', '');
    }
  }

  userSearch(searchWord, userType, limit, skip) {
    this.searchKeyword = searchWord;
    this.customerListLoading = true;
    this.searchword = searchWord;
    console.log('hi hello');
    if (skip == '' && limit == '') {
      var isFirst = true;
      limit = 20;
      skip = 0;
    }
    if (isFirst == true) {
      this.customerLists = [];
    }

    if (searchWord.length != 0) {
      this.isSearch = true;
      this._service
        .getSearchUser(this.regionID, searchWord, userType, limit, skip, '')
        .subscribe(
          (res: any) => {
            console.log(res);
            setTimeout(() => {
              this.customerListLoading = false;
              this.result = res;
              if (isFirst == true) {
                console.log('First time searching');
                this.customerLists = res;
              } else {
                console.log('Not First time searching');
                this.customerLists = this.customerLists.concat(this.result);
              }
            }, 2000);
          },
          err => {
            console.log(err);
          }
        );
    } else {
      console.log('zero', searchWord.length);
      setTimeout(() => {
        this.customerLists = [];
        this.getAllUsers('customer', 20, 0);
        this.isSearch = false;
        this.searchKeyword = '';
      }, 300);
    }
  }

  showDetails(ID, val) {
    this.router.navigate(['../customerdetail', ID], { relativeTo: this.route });
  }
}
