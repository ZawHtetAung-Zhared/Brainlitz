import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  Input,
  HostListener,
  ViewChild
} from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { appService } from '../../service/app.service';
import { DataService } from '../../service/data.service';
import { Observable } from 'rxjs/Rx';
import { LocationComponent } from '../location/location.component';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges {
  @ViewChild(LocationComponent) lnameChanges: LocationComponent;
  @Input() orgLogo: string;
  public userName: any;
  public status: string = 'NEW';
  public regionID = localStorage.getItem('regionId');
  public token = localStorage.getItem('token');
  public type = localStorage.getItem('tokenType');
  public OrgLogo = '';
  public headerlocationLists: any;
  public accessToken: any;
  public currentLocationID: any;
  public customerMenu: any = [];
  public staffMenu: any = [];
  public courseMenu: any = [];
  public reportMenu: any = [];
  public toolsMenu: any = [];
  public settingMenu: any = [];
  public previousLocation: any = '';
  public dropMenuShow: boolean = false;
  public locationDpShow: boolean = false;
  public selectedLocation: any = {};
  public stuNames: Array<any>;
  public notis: Array<any>;
  // public notis: Array<any> = [
  //   {
  //     _id: '5df1ef3d31ce9f0014a15563',
  //     title: 'Attendance',
  //     type: 3,
  //     isApproved: false,
  //     teacherOnly: false,
  //     message:
  //       'Attendance confirmed for Yoga Beginner Class, December 12, 2019 8:00 PM;',
  //     type_detail: {
  //       attendance: true,
  //       date: '2019-12-12T09:41:49.000Z'
  //     },
  //     sender: {
  //       preferredName: 'Arron Walm TEST',
  //       profilePic:
  //         'https://brainlitz-dev.s3.amazonaws.com/profile/153024702410236101155153024710196819002479153024835851660964289153025062134548629028_original.jpg',
  //       senderId: '5b063ee136f2e0f83cdbac8c'
  //     },
  //     student: {
  //       preferredName: 'Rachel',
  //       profilePic:
  //         'https://brainlitz-dev.s3.amazonaws.com/development/stgbl-cw1/profile/15755371584864828423_original.jpg',
  //       studentId: '5de8ca0631f64d0013c2bd39'
  //     },
  //     course: {
  //       courseCode: 'Yogayago',
  //       name: 'Yoga Beginner Class',
  //       courseId: '5de8caad31f64d0013c2bd40'
  //     }
  //   },
  //   {
  //     _id: '5df1ef3d31ce9f0014a15563',
  //     title: 'Attendance',
  //     type: 3,
  //     isApproved: false,
  //     teacherOnly: false,
  //     message:
  //       'Attendance confirmed for Yoga Beginner Class, December 12, 2019 8:00 PM;',
  //     type_detail: {
  //       attendance: true,
  //       date: '2019-12-12T09:41:49.000Z'
  //     },
  //     sender: {
  //       preferredName: 'Arron Walm TEST',
  //       profilePic:
  //         'https://brainlitz-dev.s3.amazonaws.com/profile/153024702410236101155153024710196819002479153024835851660964289153025062134548629028_original.jpg',
  //       senderId: '5b063ee136f2e0f83cdbac8c'
  //     },
  //     student: {
  //       preferredName: 'Branda',
  //       profilePic:
  //         'https://brainlitz-dev.s3.amazonaws.com/development/stgbl-cw1/profile/15755371584864828423_original.jpg',
  //       studentId: '5de8ca0631f64d0013c2bd39'
  //     },
  //     course: {
  //       courseCode: 'Yogayago',
  //       name: 'Yoga Beginner Class',
  //       courseId: '5de8caad31f64d0013c2bd40'
  //     }
  //   },
  //   {
  //     _id: '5df1ef3d31ce9f0014a15563',
  //     title: 'Attendance',
  //     type: 3,
  //     isApproved: false,
  //     teacherOnly: false,
  //     message:
  //       'Attendance confirmed for Yoga Beginner Class, December 12, 2019 8:00 PM;',
  //     type_detail: {
  //       attendance: true,
  //       date: '2019-12-12T09:41:49.000Z'
  //     },
  //     sender: {
  //       preferredName: 'Arron Walm TEST',
  //       profilePic:
  //         'https://brainlitz-dev.s3.amazonaws.com/profile/153024702410236101155153024710196819002479153024835851660964289153025062134548629028_original.jpg',
  //       senderId: '5b063ee136f2e0f83cdbac8c'
  //     },
  //     student: {
  //       preferredName: 'Branda',
  //       profilePic:
  //         'https://brainlitz-dev.s3.amazonaws.com/development/stgbl-cw1/profile/15755371584864828423_original.jpg',
  //       studentId: '5de8ca0631f64d0013c2bd39'
  //     },
  //     course: {
  //       courseCode: 'Yogayago',
  //       name: 'Yoga Beginner Class',
  //       courseId: '5de8caad31f64d0013c2bd40'
  //     }
  //   },
  //   {
  //     _id: '5df1ef3d31ce9f0014a15563',
  //     title: 'Attendance',
  //     type: 3,
  //     isApproved: false,
  //     teacherOnly: false,
  //     message:
  //       'Attendance confirmed for Yoga Beginner Class, December 12, 2019 8:00 PM;',
  //     type_detail: {
  //       attendance: true,
  //       date: '2019-12-12T09:41:49.000Z'
  //     },
  //     sender: {
  //       preferredName: 'Arron Walm TEST',
  //       profilePic:
  //         'https://brainlitz-dev.s3.amazonaws.com/profile/153024702410236101155153024710196819002479153024835851660964289153025062134548629028_original.jpg',
  //       senderId: '5b063ee136f2e0f83cdbac8c'
  //     },
  //     student: {
  //       preferredName: 'Branda',
  //       profilePic:
  //         'https://brainlitz-dev.s3.amazonaws.com/development/stgbl-cw1/profile/15755371584864828423_original.jpg',
  //       studentId: '5de8ca0631f64d0013c2bd39'
  //     },
  //     course: {
  //       courseCode: 'Yogayago',
  //       name: 'Yoga Beginner Class',
  //       courseId: '5de8caad31f64d0013c2bd40'
  //     }
  //   },
  //   {
  //     _id: '5df1ef3d31ce9f0014a15563',
  //     title: 'Attendance',
  //     type: 3,
  //     isApproved: false,
  //     teacherOnly: false,
  //     message:
  //       'Attendance confirmed for Yoga Beginner Class, December 12, 2019 8:00 PM;',
  //     type_detail: {
  //       attendance: true,
  //       date: '2019-12-12T09:41:49.000Z'
  //     },
  //     sender: {
  //       preferredName: 'Arron Walm TEST',
  //       profilePic:
  //         'https://brainlitz-dev.s3.amazonaws.com/profile/153024702410236101155153024710196819002479153024835851660964289153025062134548629028_original.jpg',
  //       senderId: '5b063ee136f2e0f83cdbac8c'
  //     },
  //     student: {
  //       preferredName: 'Susan',
  //       profilePic:
  //         'https://brainlitz-dev.s3.amazonaws.com/development/stgbl-cw1/profile/15755371584864828423_original.jpg',
  //       studentId: '5de8ca0631f64d0013c2bd39'
  //     },
  //     course: {
  //       courseCode: 'Yogayago',
  //       name: 'Yoga Beginner Class',
  //       courseId: '5de8caad31f64d0013c2bd40'
  //     }
  //   },
  //   {
  //     _id: '5df1ef3d31ce9f0014a15563',
  //     title: 'Attendance',
  //     type: 3,
  //     isApproved: false,
  //     teacherOnly: false,
  //     message:
  //       'Attendance confirmed for Yoga Beginner Class, December 12, 2019 8:00 PM;',
  //     type_detail: {
  //       attendance: true,
  //       date: '2019-12-12T09:41:49.000Z'
  //     },
  //     sender: {
  //       preferredName: 'Arron Walm TEST',
  //       profilePic:
  //         'https://brainlitz-dev.s3.amazonaws.com/profile/153024702410236101155153024710196819002479153024835851660964289153025062134548629028_original.jpg',
  //       senderId: '5b063ee136f2e0f83cdbac8c'
  //     },
  //     student: {
  //       preferredName: 'Susan',
  //       profilePic:
  //         'https://brainlitz-dev.s3.amazonaws.com/development/stgbl-cw1/profile/15755371584864828423_original.jpg',
  //       studentId: '5de8ca0631f64d0013c2bd39'
  //     },
  //     course: {
  //       courseCode: 'Yogayago',
  //       name: 'Yoga Beginner Class',
  //       courseId: '5de8caad31f64d0013c2bd40'
  //     }
  //   },
  //   {
  //     _id: '5df1ef3d31ce9f0014a15563',
  //     title: 'Attendance',
  //     type: 3,
  //     isApproved: false,
  //     teacherOnly: false,
  //     message:
  //       'Attendance confirmed for Yoga Beginner Class, December 12, 2019 8:00 PM;',
  //     type_detail: {
  //       attendance: true,
  //       date: '2019-12-12T09:41:49.000Z'
  //     },
  //     sender: {
  //       preferredName: 'Arron Walm TEST',
  //       profilePic:
  //         'https://brainlitz-dev.s3.amazonaws.com/profile/153024702410236101155153024710196819002479153024835851660964289153025062134548629028_original.jpg',
  //       senderId: '5b063ee136f2e0f83cdbac8c'
  //     },
  //     student: {
  //       preferredName: 'Sunny',
  //       profilePic:
  //         'https://brainlitz-dev.s3.amazonaws.com/development/stgbl-cw1/profile/15755371584864828423_original.jpg',
  //       studentId: '5de8ca0631f64d0013c2bd39'
  //     },
  //     course: {
  //       courseCode: 'Yogayago',
  //       name: 'Yoga Beginner Class',
  //       courseId: '5de8caad31f64d0013c2bd40'
  //     }
  //   },
  //   {
  //     _id: '5df1ef3d31ce9f0014a15563',
  //     title: 'Attendance',
  //     type: 3,
  //     isApproved: false,
  //     teacherOnly: false,
  //     message:
  //       'Attendance confirmed for Yoga Beginner Class, December 12, 2019 8:00 PM;',
  //     type_detail: {
  //       attendance: true,
  //       date: '2019-12-12T09:41:49.000Z'
  //     },
  //     sender: {
  //       preferredName: 'Arron Walm TEST',
  //       profilePic:
  //         'https://brainlitz-dev.s3.amazonaws.com/profile/153024702410236101155153024710196819002479153024835851660964289153025062134548629028_original.jpg',
  //       senderId: '5b063ee136f2e0f83cdbac8c'
  //     },
  //     student: {
  //       preferredName: 'Sunny',
  //       profilePic:
  //         'https://brainlitz-dev.s3.amazonaws.com/development/stgbl-cw1/profile/15755371584864828423_original.jpg',
  //       studentId: '5de8ca0631f64d0013c2bd39'
  //     },
  //     course: {
  //       courseCode: 'Yogayago',
  //       name: 'Yoga Beginner Class',
  //       courseId: '5de8caad31f64d0013c2bd40'
  //     }
  //   }
  // ];
  public count: any;

  public notizha: any = {
    _id: '5df1ef3d31ce9f0014a15563',
    title: 'Attendance',
    type: 3,
    isApproved: false,
    teacherOnly: false,
    message:
      'Attendance confirmed for Yoga Beginner Class, December 12, 2019 8:00 PM;',
    type_detail: {
      attendance: true,
      date: '2019-12-12T09:41:49.000Z'
    },
    sender: {
      preferredName: 'Arron Walm TEST',
      profilePic:
        'https://brainlitz-dev.s3.amazonaws.com/profile/153024702410236101155153024710196819002479153024835851660964289153025062134548629028_original.jpg',
      senderId: '5b063ee136f2e0f83cdbac8c'
    },
    student: {
      preferredName: 'Rachel',
      profilePic:
        'https://brainlitz-dev.s3.amazonaws.com/development/stgbl-cw1/profile/15755371584864828423_original.jpg',
      studentId: '5de8ca0631f64d0013c2bd39'
    },
    course: {
      courseCode: 'Yogayago',
      name: 'Yoga Beginner Class',
      courseId: '5de8caad31f64d0013c2bd40'
    }
  };

  constructor(
    private _router: Router,
    private _service: appService,
    private _dataservice: DataService
  ) {
    console.log('hi construc');
    this._service.sendData.subscribe(data => {
      this.headerlocationLists = data;
    });
  }

  ngOnChanges(value: SimpleChanges) {
    console.log(value.orgLogo.currentValue);
    if (value.orgLogo.currentValue !== undefined) {
      this.OrgLogo = value.orgLogo.currentValue;
    }
  }

  ngOnInit() {
    console.log('headerLocation work');
    console.log('Org Log', this.orgLogo);
    this.getAdministrator();
    this.getNotiList();

    setTimeout(() => {
      this.userName = localStorage.getItem('userName');
    }, 400);
    this.accessToken = localStorage.getItem('token');
    if (this.accessToken != undefined) {
      console.log('!undefined');
      this.getAllLocation();
    }

    if (this._router.url != '/dashboard') {
      console.log(this._router.url);
      localStorage.removeItem('permission');
      localStorage.removeItem('locationUpdate');
    } else {
      console.log(this._router.url);
    }
  }
  notiFrom() {
    let temp = [];
    let temp2 = [];
    for (var i = 0; i < this.notis.length; i++) {
      temp.push(this.notis[i].student.preferredName);
    }
    // console.log("name test",temp.includes(this.notis[1].student.preferredName));
    for (var j = 0; j < this.notis.length; j++) {
      if (!temp2.includes(this.notis[j].student.preferredName)) {
        temp2.push(this.notis[j].student.preferredName);
      }
    }
    this.stuNames = temp2;
    console.log('log test', this.notis);
  }

  getAdministrator() {
    console.log('getAdministrator works');
    this.token = localStorage.getItem('token');
    this.type = localStorage.getItem('tokenType');
    this._service
      .getRegionalAdministrator(this.regionID, this.token, this.type)
      .subscribe(
        (res: any) => {
          console.log('res admin', res);
          this.OrgLogo = res.logo;
          localStorage.setItem('OrgLogo', this.OrgLogo);
        },
        err => {
          console.log(err);
        }
      );
  }

  logoff() {
    console.log('log out');
    localStorage.clear();
    localStorage.setItem('redirect', 'true');
    this._service.logOff().subscribe(
      (res: any) => {
        console.log('logout');
        this._router.navigateByUrl('/login');
      },
      err => {
        console.log(err);
        this._router.navigateByUrl('/login');
      }
    );
  }

  getAllLocation() {
    this._service.getHeaderLocations(this.regionID, '', '', true).subscribe(
      (res: any) => {
        this.headerlocationLists = res;
        console.log(this.headerlocationLists.length);

        this.currentLocationID = localStorage.getItem('locationId');
        console.log(this.currentLocationID);
        localStorage.setItem('previousLID', this.currentLocationID);

        if (this.headerlocationLists.length != 0) {
          if (this.currentLocationID != null) {
            console.log('current location is not null');
            for (var i = 0; i < this.headerlocationLists.length; i++) {
              if (this.headerlocationLists[i]._id == this.currentLocationID) {
                this.headerlocationLists[i].selected = true;
                localStorage.setItem(
                  'locationId',
                  this.headerlocationLists[i]._id
                );
                localStorage.setItem(
                  'locationName',
                  this.headerlocationLists[i].name
                );
                localStorage.setItem(
                  'txtColor',
                  this.headerlocationLists[i].textColorHex
                );
                localStorage.setItem(
                  'backgroundColor',
                  this.headerlocationLists[i].backgroundColorHex
                );
                this.selectedLocation['id'] = this.headerlocationLists[i]._id;
                this.selectedLocation['name'] = this.headerlocationLists[
                  i
                ].name;
              }
            }
            this.setPermission(this.currentLocationID);
          } else {
            console.log('no location has choosen');
            this.setLocation();
          }
        } else {
          console.log('no location in this region');
        }
      },
      err => {
        console.log(err);
      }
    );
    localStorage.removeItem('locationUpdate');
  }

  setLocation() {
    console.log('... callback');
    let regionId = localStorage.getItem('regionId');
    console.log(localStorage.getItem('locationId'));
    if (!localStorage.getItem('locationId')) {
      console.log('~~~~~~');
      localStorage.setItem('locationId', this.headerlocationLists[0]._id);
      localStorage.setItem('locationName', this.headerlocationLists[0].name);
      localStorage.setItem('previousLID', this.headerlocationLists[0]._id);
      this.setPermission(this.headerlocationLists[0]._id);

      this.selectedLocation['id'] = this.headerlocationLists[0]._id;
      this.selectedLocation['name'] = this.headerlocationLists[0].name;
    } else if (localStorage.getItem('locationId') == null) {
      console.log('no location has counter');
    } else {
      console.log('no location has counter');
    }
  }

  setPermission(id) {
    this._service.getPermission(id).subscribe(
      (res: any) => {
        console.log(res);
        this.showMenuPerPermission(res);
        this._service.showPermission(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  selectLocation(data) {
    console.log('location select', data);
    // let LocationId = e.target.value;
    let LocationId = data._id;
    this.selectedLocation['id'] = data._id;
    this.selectedLocation['name'] = data.name;

    for (var i in this.headerlocationLists) {
      if (this.headerlocationLists[i]._id == LocationId) {
        console.error('same', this.headerlocationLists[i]);
        localStorage.setItem('locationName', this.headerlocationLists[i].name);
        localStorage.setItem(
          'txtColor',
          this.headerlocationLists[i].textColorHex
        );
        localStorage.setItem(
          'backgroundColor',
          this.headerlocationLists[i].backgroundColorHex
        );
      }
    }
    // let Locationname = e.target.value.name;

    localStorage.setItem('locationId', LocationId);
    // localStorage.setItem('locationName', Locationname);
    if (this.currentLocationID != LocationId) {
      console.log('different location');
      this.currentLocationID = LocationId;
      this.setPermission(LocationId);
    } else {
      console.log('same location');
    }
    this._service.setLocationId(LocationId);
  }

  showMenuPerPermission(data) {
    this.customerMenu = [
      'CREATECUSTOMERS',
      'VIEWCUSTOMERS',
      'EDITCUSTOMERS',
      'DELETECUSTOMERS',
      'ENROLLCOURSE'
    ];
    this.staffMenu = [
      'CREATESTAFFS',
      'EDITSTAFFS',
      'VIEWSTAFFS',
      'DELETESTAFFS'
    ];
    this.courseMenu = [
      'CREATECOURSE',
      'VIEWCOURSE',
      'EDITCOURSE',
      'DELETECOURSE',
      'ASSIGNTEACHER',
      'ASSIGNSTUDENTS'
    ];
    this.reportMenu = ['VIEWREPORT', 'EXPORTREPORT'];
    this.toolsMenu = ['SENDNOTIFICATION', 'VIEWSENDHISTORY'];
    this.settingMenu = [
      'UPDATEREGIONALSETTINGS',
      'UPDATEAPPSETTINGS',
      'ADDNEWLOCATION',
      'EDITLOCATION',
      'DELETELOCATION',
      'CREATECUSTOMFIELD',
      'VIEWCUSTOMFIELD',
      'EDITCUSTOMFIELD',
      'DELETECUSTOMFIELD'
    ];

    this.customerMenu = this.customerMenu.filter(
      value => -1 !== data.indexOf(value)
    );
    this.staffMenu = this.staffMenu.filter(value => -1 !== data.indexOf(value));
    this.courseMenu = this.courseMenu.filter(
      value => -1 !== data.indexOf(value)
    );
    this.reportMenu = this.reportMenu.filter(
      value => -1 !== data.indexOf(value)
    );
    this.toolsMenu = this.toolsMenu.filter(value => -1 !== data.indexOf(value));
    this.settingMenu = this.settingMenu.filter(
      value => -1 !== data.indexOf(value)
    );
  }

  // @HostListener('document:click', ['$event'])
  //   public documentClick(event): void {
  //     console.log('~~~~ hi ~~~~')
  // }

  @HostListener('document:click', ['$event']) clickedOutside($event) {
    // console.log("CLICKED OUTSIDE");
    this.dropMenuShow = false;
    this.locationDpShow = false;

    if (this._router.url === '/dashboard') {
      setTimeout(() => {
        console.log(localStorage.getItem('locationUpdate'));
        if (localStorage.getItem('locationUpdate')) {
          this.getAllLocation();
        }
      }, 300);
    }
  }

  dropDown($event: Event, state) {
    $event.preventDefault();
    $event.stopPropagation();
    console.log('000');
    this.dropMenuShow = state == 'profile' ? !this.dropMenuShow : false;
    this.locationDpShow = state == 'loc' ? !this.locationDpShow : false;
  }
  removeBar() {
    console.log('clicked clicked');
    var sc = document.getElementById('sc');
    var noti = document.getElementById('noti');
    sc.classList.add('remove');
    noti.classList.add('remove');
  }

  onClickHeaderTab(type) {
    // let str = '/'+type
    // this._router.navigate(['/course'])
    console.log('===>ClickHeaderTab', type);
    this._dataservice.nevigateCourse('');
    this._dataservice.nevigateCustomer('');
    this._dataservice.nevigateCDetail('');
    this._dataservice.nevigateSchedule('');
    // this._dataservice.defineCurrentTab(type);
  }
  switchRegion() {
    this._router.navigateByUrl('/region', { skipLocationChange: true });
  }
  getNotiList() {
    console.log('HERE HERE');
    this._service.getNotiList(this.regionID, this.status).subscribe(
      (res: any) => {
        console.log('noti reciever', res.journlaList);
        this.notis = res.journlaList;
        this.count = this.notis.length;
        this.notiFrom();
      },
      err => {
        console.log(err);
      }
    );
  }
}
