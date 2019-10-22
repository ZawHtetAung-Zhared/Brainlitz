import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  Input,
  ElementRef,
  OnChanges,
  HostListener,
  AfterViewInit
} from '@angular/core';
import { DatePipe } from '@angular/common';
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalRef
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, FormGroup, FormControl } from '@angular/forms';
import { appService } from '../../service/app.service';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  merge
} from 'rxjs/operators';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastsManager } from 'ng5-toastr/ng5-toastr';
import * as moment from 'moment-timezone';

import { Router } from '@angular/router';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css'],
  providers: [DatePipe]
})
export class ToolsComponent implements OnInit {
  @ViewChild('instance') instance: NgbTypeahead;
  @BlockUI() blockUI: NgBlockUI;
  @ViewChild('mainScreen') elementView: ElementRef;
  @ViewChild('notiForm') notiform;

  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  public checkActive = true;
  public isMidStick: boolean = false;
  public isSticky: boolean = false;
  public isFixed: boolean = true;
  public item: any = {};
  public regionID = localStorage.getItem('regionId');
  public locationId: any;
  public isChecked: any;
  public categoryLists: any;
  public userLists: any;
  public courseLists: any;
  public dataLists: any;
  public locationName: any;
  public gtxtColor: any;
  public gbgColor: any;
  public userCount: any;
  public notiType: any;
  public notiLists: Array<any> = [];
  public utcDate: any;
  public selectedID: any;
  public isdropdown: boolean = false;
  public isFous: boolean = false;
  public isSelected: boolean = false;
  public isFousCourse: boolean = false;
  public isFousCategory: boolean = false;
  public wordLength: number = 0;
  public notiTypes: any = [
    { name: 'Email', type: 'email', checked: false },
    { name: 'App notification', type: 'noti', checked: false }
  ];
  public checkedType: any = [];
  public today;
  public yesterday;
  public tempList = [];
  public active = [];
  public apgH: any;
  public calH: any;
  public windowH: any;
  public qwH: any;
  public scrollVal: any;
  public totalHeight: any;
  public yOffset: any;
  public todayDate: any;

  public permissionType: Array<any> = [];
  public notiSidebar: any = [];
  public notiSidebarDemo: any = [];
  public apgSidebar: any = [];
  public testWerkz: any = [];
  public quizwerkzSidebar: any = [];
  public calendarSidebar: any = [];

  constructor(
    private _service: appService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    private elementRef: ElementRef,
    private datePipe: DatePipe,
    private router: Router
  ) {
    this.toastr.setRootViewContainerRef(vcr);
    this._service.locationID.subscribe(data => {
      if (this.router.url === '/tools') {
        console.log('~~~~', this.router.url);
        console.log(this.locationId);
        this.locationId = data;
        this.setDefaultSelected();
      } else {
        console.log('====', this.router.url);
      }
    });

    window.scroll(0, 0);
  }

  ngOnInit() {
    console.log();
    this.locationId = localStorage.getItem('locationId');
    this.setDefaultSelected();
    this.item.sendType = 'app';

    this._service.permissionList.subscribe(data => {
      if (this.router.url === '/tools') {
        this.permissionType = data;
        console.log(this.permissionType);
        this.checkPermission();
        localStorage.setItem('permission', JSON.stringify(data));
      }
    });
  }

  checkPermission() {
    console.log(this.permissionType);
    this.notiSidebar = ['SENDNOTIFICATION', 'VIEWSENDHISTORY'];
    this.apgSidebar = ['CREATEAPG'];
    this.quizwerkzSidebar = [
      'VIEWQUIZWERKZ',
      'CREATEQUIZWERKZ',
      'EDITQUIZWERKZ',
      'DELETEQUIZWERKZ'
    ];
    this.calendarSidebar = [
      'CREATECALENDAR',
      'ADDHOLIDAY',
      'EDITHOLIDAY',
      'DELETEHOLIDAY'
    ];
    this.testWerkz = ['TestWerkz'];
    this.notiSidebar = this.notiSidebar.filter(
      value => -1 !== this.permissionType.indexOf(value)
    );
    this.apgSidebar = this.apgSidebar.filter(
      value => -1 !== this.permissionType.indexOf(value)
    );
    this.quizwerkzSidebar = this.quizwerkzSidebar.filter(
      value => -1 !== this.permissionType.indexOf(value)
    );
    this.calendarSidebar = this.calendarSidebar.filter(
      value => -1 !== this.permissionType.indexOf(value)
    );

    this.notiSidebarDemo['send'] = this.notiSidebar.includes('SENDNOTIFICATION')
      ? 'SENDNOTIFICATION'
      : '';
    this.notiSidebarDemo['view'] = this.notiSidebar.includes('VIEWSENDHISTORY')
      ? 'SENDNOTIFICATION'
      : '';

    if (this.notiSidebar.length > 0) {
      console.log('noti');
      this.locationName = localStorage.getItem('locationName');
      // this.gtxtColor = localStorage.getItem('txtColor');
      // this.gbgColor = localStorage.getItem('backgroundColor');
      this.notiType = this.notiSidebar.includes('SENDNOTIFICATION')
        ? 'send'
        : 'view';
      if (this.notiType == 'view') {
        this.notiLists = [];
        this.viewNoti(20, 0);
      }
    } else {
      console.log('permission deny');
    }
  }

  @HostListener('window:scroll', ['$event']) onScroll($event) {
    this.windowH = window.innerHeight;
    this.isFixed = true;
    if (window.pageYOffset > 81) {
      this.isSticky = true;
      this.isMidStick = false;
    } else if (window.pageYOffset < 0) {
      this.isFixed = false;
    } else {
      this.isSticky = false;
    }

    this.isMidStick = window.pageYOffset > 45 ? true : false;
  }

  clickTab(type) {
    this.isSticky = false;
    console.log('clik', type);
    this.notiType = type;
    if (type == 'view') {
      this.notiLists = [];
      this.viewNoti(20, 0);
      // var date = new Date();
      // var dFormat = this.datePipe.transform(date,"yyyy-MM-dd");
      // this.today = dFormat.replace(/-/g, "/");
      // var ydate = new Date(date.setDate(date.getDate() - 1));
      // var yFormat = this.datePipe.transform(ydate,"yyyy-MM-dd");
      // this.yesterday = yFormat.replace(/-/g, "/");
      // console.log("Yesterday",this.yesterday);

      // const zone = localStorage.getItem('timezone');
      // const dFormat = 'YYYY/MM/DD';
      // var todayD = new Date();
      // console.log("new Date",todayD);
      // this.today = moment(todayD, dFormat).tz(zone).format(dFormat);
      // console.log("Today",this.today);

      // var yesterdayD = new Date(todayD.setDate(todayD.getDate() - 1));
      // this.yesterday = moment(yesterdayD, dFormat).tz(zone).format(dFormat);
      // console.log("Yesterday",this.yesterday)
    } else if (type == 'dropdown') {
      this.isdropdown = !this.isdropdown;
      this.notiType = this.notiSidebar.includes('SENDNOTIFICATION')
        ? 'send'
        : 'view';
      // this.notiType = 'send'
    } else if (type == 'apg') {
      console.log('apg ~~~');
      this.isdropdown = false;
    } else if (type == 'quizwerkz') {
      console.log(type);
      this.isdropdown = false;
    } else {
      this.setDefaultSelected();
    }
  }

  focusSearch(e, type) {
    if (type == 'course') {
      this.isFousCourse = true;
      this.userLists = [];
    } else if (type == 'user') {
      this.isFous = true;
      this.courseLists = [];
    } else if (type == 'category') {
      this.isFousCategory = true;
    }
  }

  hideSearch(e) {
    setTimeout(() => {
      this.isFous = false;
      this.isFousCourse = false;
      this.isFousCategory = false;
    }, 300);
  }

  changeSearch(searchWord, type) {
    console.log(searchWord);
    console.log(this.active);
    this.checkActive = true;
    this.isSelected = false;
    this.selectedID = this.isSelected == false ? undefined : this.selectedID;
    // this.active = (searchWord.length == 0 ) ? [] : this.active;
    this.selectedID = searchWord.length == 0 ? undefined : this.selectedID;
    this.userCount = searchWord.length == 0 ? 0 : 0;
    if (type == 'user') {
      if (searchWord.length != 0) {
        this._service
          .getSearchUser(this.regionID, searchWord, 'all', 20, 0, '')
          .subscribe(
            (res: any) => {
              console.log(res);
              this.userLists = res;
            },
            err => {
              console.log(err);
            }
          );
      } else {
        this._service.getAllUsers(this.regionID, 'all', 20, 0).subscribe(
          (res: any) => {
            this.userLists = res;
          },
          err => {
            console.log(err);
          }
        );
      }
    } else if (type == 'course') {
      if (searchWord.length != 0) {
        this._service
          .getSearchCourse(this.regionID, searchWord, this.locationId)
          .subscribe(
            (res: any) => {
              console.log(res);
              this.courseLists = res;
            },
            err => {
              console.log(err);
            }
          );
      } else {
        console.log('zero keyword');
        this._service
          .getAllCourse(this.regionID, this.locationId, 20, 0)
          .subscribe(
            (res: any) => {
              this.courseLists = res;
              for (var key in this.courseLists) {
                for (var i in this.courseLists[key].courses) {
                  this.tempList.push(this.courseLists[key].courses[i]);
                }
              }
              console.log('templist', this.tempList);
              this.courseLists = this.tempList;
            },
            err => {
              console.log(err);
            }
          );
      }
    } else if (type == 'category') {
      // <<<<<<< HEAD
      //       this._service.getSearchCategory(this.regionID, searchWord, this.locationId)
      //       // this._service.getSearchCategory(this.regionID, searchWord, 'all', 20, 0, '')
      //       .subscribe((res:any) => {
      //         console.log(res);
      //         this.categoryLists = res;
      // =======
      if (searchWord.length != 0) {
        this._service
          .getSearchCategory(this.regionID, searchWord, this.locationId)
          .subscribe(
            (res: any) => {
              console.log(res);
              this.categoryLists = res;
              // >>>>>>> 7f7d5ab9199d560503b054b5130f4612d80b725d
            },
            err => {
              console.log(err);
            }
          );
      } else {
        console.log('zero');
        this._service.getCategory(this.regionID, 20, 0).subscribe(
          (res: any) => {
            this.categoryLists = res;
          },
          err => {
            console.log(err);
          }
        );
      }
    }
  }

  selectData(id, name, type) {
    console.log(id, name, type);
    this.checkActive = true;
    console.log('~~~~~', this.active.length);
    this.isSelected = true;
    this.selectedID = id;
    this.item.itemID = name;
    if (type == 'user') {
      this.userCount = 1;
    } else {
      this.getUserCount(type);
    }
  }

  getUserCount(type) {
    console.log(type);
    console.log('...', this.active.length);
    let dataObj = {
      regionId: this.regionID,
      locationId: this.locationId,
      option: type,
      active: this.checkActive
    };
    dataObj['id'] = this.selectedID;
    // if(this.active.length != 0){
    //   dataObj["active"] = true;
    //   console.log('active true')
    // }else{
    //   console.log('[]')
    // }

    console.log('=====', dataObj);
    this._service.userCount(dataObj).subscribe(
      (res: any) => {
        console.log(res);
        console.log(res.count);
        this.userCount = res.count;
        console.log(this.userCount);
      },
      err => {
        console.log(err);
        this.userCount = 0;
      }
    );
  }

  focusMethod(e, status, word) {
    console.log('hi', e);
    this.wordLength = word.length;
    if (status == 'subject') {
      $('.limit-word').show('slow');
    } else {
      $('.limit-word1').show('slow');
    }
  }

  blurMethod(e, status) {
    console.log('blur', e);
    if (status == 'subject') {
      $('.limit-word').hide('slow');
    } else {
      $('.limit-word1').hide('slow');
    }
    this.wordLength = 0;
  }

  changeMethod(val: string) {
    console.log(val);
    this.wordLength = val.length;
  }

  showMore(skip) {
    console.log('~~~', this.notiLists);
    this.viewNoti(20, skip);
  }

  showDayType() {
    const zone = localStorage.getItem('timezone');
    const dFormat = 'YYYY/MM/DD';
    console.log(zone);
    var todayD = new Date();
    console.log('new Date', todayD);
    console.log(moment(todayD, dFormat).tz(zone));
    this.today = moment(todayD, dFormat)
      .tz(zone)
      .format(dFormat);
    console.log('Today', this.today);

    var yesterdayD = new Date(todayD.setDate(todayD.getDate() - 1));
    this.yesterday = moment(yesterdayD, dFormat)
      .tz(zone)
      .format(dFormat);
    console.log('Yesterday', this.yesterday);
  }

  viewNoti(limit, skip) {
    console.log('~~~', this.notiLists);
    // console.log(this.regionID)
    const zone = localStorage.getItem('timezone');
    const format = 'YYYY/MM/DD HH:mm:ss ZZ';

    this.showDayType();

    //this.blockUI.start('Loading...');
    this._service.viewNoti(limit, skip, this.locationId).subscribe(
      (res: any) => {
        console.log('~~~', this.notiLists);
        console.log(res);
        //this.blockUI.stop();

        // this.notiLists = res;
        this.notiLists = this.notiLists.concat(res);
        console.log(this.notiLists);
        for (var i in this.notiLists) {
          let year = this.notiLists[i].utc.year;
          let month = this.notiLists[i].utc.month - 1;
          let day = this.notiLists[i].utc.day;
          let hour = this.notiLists[i].utc.hour;
          let minutes = this.notiLists[i].utc.minutes;

          var utcTemp = new Date(Date.UTC(year, month, day, hour, minutes));
          const utcToString = utcTemp.toUTCString();
          const time = new Date(utcToString);
          this.utcDate = moment(time, format)
            .tz(zone)
            .format(format);
          // console.log(this.utcDate)
          this.utcDate = this.utcDate.slice(0, -5);
          /*===for testing Confirm UI===*/
          let utcDate = this.utcDate;
          let onlyDate = utcDate.substring(0, 10);
          let onlyTime = utcDate.substring(11, 19);
          // console.log(onlyDate)
          /*===end Testing===*/
          if (this.notiLists[i].utc) {
            this.notiLists[i].utcDate = this.utcDate;
            this.notiLists[i].sentdate = onlyDate;
            this.notiLists[i].senttime = onlyTime;
          }
        }

        console.log('Noti List', this.notiLists);
      },
      err => {
        //this.blockUI.stop();
        this.toastr.error('View sent history fail');
        console.log(err);
      }
    );
  }

  setDefaultSelected() {
    let dataObj = {
      regionId: this.regionID,
      locationId: this.locationId,
      option: 'allcustomer',
      active: this.checkActive
    };
    console.log(dataObj);
    setTimeout(() => {
      this.isChecked = 'allcustomer';
    }, 10);

    this._service.userCount(dataObj).subscribe(
      (res: any) => {
        console.log(res.count);
        this.userCount = res.count;
        // if(this.userCount == 0){
        //   this.toastr.error("You have no user to send notification.");
        // }
      },
      err => {
        console.log(err);
        this.toastr.error('Error in calling API.');
      }
    );
  }

  checkedOptions(option, e) {
    console.log(option);
    var val = option.type;
    if (this.checkedType.includes(val) == false) {
      this.checkedType.push(val);
    } else {
      val = [val];
      this.checkedType = this.checkedType.filter(f => !val.includes(f));
    }
    console.log(this.checkedType);
    console.log(this.checkedType.length);
  }

  somethingChanged(type) {
    this.checkActive = true;
    this.tempList = [];
    this.active = [];
    this.selectedID = undefined;
    console.log('what', type);
    this.isChecked = type;
    this.locationId = localStorage.getItem('locationId');
    // console.error(this.checkActive);
    let dataObj = {
      regionId: this.regionID,
      locationId: this.locationId,
      option: type,
      active: this.checkActive
    };

    console.log(dataObj);
    this.userCountCalc(dataObj);

    this.item.itemID = '';
    if (type == 'category') {
      this._service.getCategory(this.regionID, 20, 0).subscribe(
        (res: any) => {
          let temp_category = res;
          this.categoryLists = res;
          console.log(this.categoryLists);
          this.dataLists = this.categoryLists.map(a => a.name);
        },
        err => {
          console.log(err);
        }
      );
    } else if (type == 'course') {
      console.log('hi course', this.locationId);
      this._service
        .getAllCourse(this.regionID, this.locationId, 20, 0)
        .subscribe(
          (res: any) => {
            console.log('~~~', res);
            this.courseLists = res;
            for (var key in this.courseLists) {
              for (var i in this.courseLists[key].courses) {
                this.tempList.push(this.courseLists[key].courses[i]);
              }
            }
            console.log('templist', this.tempList);
            this.courseLists = this.tempList;
            this.dataLists = this.tempList.map(a => a.name);
            console.log('Length', this.dataLists.length);
          },
          err => {
            console.log(err);
          }
        );
    } else if (type == 'user') {
      console.log(this.userLists);
      this._service.getAllUsers(this.regionID, 'all', 20, 0).subscribe(
        (res: any) => {
          console.log('~~~', res);
          this.userLists = res;
          // for (var i in this.userLists) {
          //   this.userLists[i].preferredName = this.userLists[i].preferredName + " - (" + this.userLists[i].email + ")";
          // }

          // this.dataLists = this.userLists.map(a => a.preferredName);
        },
        err => {
          console.log(err);
        }
      );
    } else {
      console.log('=)');
    }

    // var $radioButtons = $('input[type="radio"]');
    // $radioButtons.each(function() {
    //     $(this).parent().toggleClass('radio-selected', this.checked);
    // });
  }

  checkedActive(e, type) {
    console.log(e);
    console.log('~~~', this.isChecked);
    console.log('~~~', this.selectedID);
    this.checkActive = !this.checkActive;
    this.locationId = localStorage.getItem('locationId');
    let dataObj = {
      regionId: this.regionID,
      locationId: this.locationId,
      option: this.isChecked,
      active: this.checkActive
    };

    if (this.selectedID != undefined) {
      dataObj['id'] = this.selectedID;
    }
    this.userCountCalc(dataObj);
    var val = type;
    // if(this.active.includes(val) == false){
    //   this.active.push(val)
    // }else{
    //   val = [val]
    //   this.active =this.active.filter(f => !val.includes(f));
    //   console.error(val);
    //   console.warn(this.active);
    // }
    // if(this.active.length != 0){
    //   console.log('no zero')
    //   dataObj["active"] = true;
    //   console.log(dataObj)
    //   this.userCountCalc(dataObj);
    // }else{
    //   console.log('length is zero')
    //   console.log(dataObj)
    //   this.userCountCalc(dataObj);
    // }
  }

  userCountCalc(obj) {
    console.log(obj);
    this._service.userCount(obj).subscribe(
      (res: any) => {
        console.log(res.count);
        this.userCount = res.count;
      },
      err => {
        console.log(err);
      }
    );
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      merge(this.focus$),
      merge(this.click$.pipe(filter(() => !this.instance.isPopupOpen()))),
      map(term =>
        (term === ''
          ? this.dataLists
          : this.dataLists.filter(
              v => v.toLowerCase().indexOf(term.toLowerCase()) > -1
            )
        ).slice(0, 10)
      )
    );

  valuechange(newValue, type) {
    console.log('<3 <3 ', newValue);
    let dataObj = {
      regionId: this.regionID,
      locationId: this.locationId,
      option: type
    };

    if (type == 'course') {
      // for (var i in this.courseLists) {
      //   if (this.courseLists[i].name == newValue) {
      //     console.log('....', this.courseLists[i]);
      //     let temp = this.courseLists[i];
      //     dataObj["id"] = temp._id
      //   }
      // }
      for (var i in this.tempList) {
        if (this.tempList[i].name == newValue) {
          console.log('....', this.tempList[i]);
          let temp = this.tempList[i];
          dataObj['id'] = temp._id;
        }
      }
    } else if (type == 'category') {
      for (var i in this.categoryLists) {
        if (this.categoryLists[i].name == newValue) {
          console.log('....', this.categoryLists[i]);
          let temp = this.categoryLists[i];
          dataObj['id'] = temp._id;
        }
      }
    } else {
      this.userCount = 1;
    }

    console.log(dataObj);

    if (type != 'user') {
      this._service.userCount(dataObj).subscribe(
        (res: any) => {
          console.log(res);
          console.log(res.count);
          this.userCount = res.count;
          console.log(this.userCount);

          // if(this.userCount == 0){
          //   this.toastr.error("You have no user to send notification.");
          // }
        },
        err => {
          console.log(err);
        }
      );
    } else {
    }
  }

  sendNoti(data) {
    console.log(data);
    console.log(this.isChecked);

    let dataObj = {
      regionId: this.regionID,
      locationId: this.locationId,
      option: this.isChecked,
      sendType: this.checkedType
    };

    if (data.active == 1) {
      dataObj['active'] = 1;
    }

    // if(data.appType == true && data.emailType == true){
    //   dataObj["sendType"] = 'both'
    // }else if(data.appType != true){
    //   dataObj["sendType"] = 'email'
    // }else{
    //   dataObj["sendType"] = 'noti'
    // }

    let body = {
      title: data.subject,
      message: data.message
    };

    // if(this.isChecked == 'category'){
    //   for (var i in this.categoryLists) {
    //     if (this.categoryLists[i].name == data.itemID) {
    //       console.log('....', this.categoryLists[i]);
    //       let temp = this.categoryLists[i];
    //       dataObj["id"] = temp._id
    //     }
    //   }
    // }else if(this.isChecked == 'course'){
    //   // for (var i in this.courseLists) {
    //   //   if (this.courseLists[i].name == data.itemID) {
    //   //     console.log('....', this.courseLists[i]);
    //   //     let temp = this.courseLists[i];
    //   //     dataObj["id"] = temp._id
    //   //   }
    //   // }
    //   for (var i in this.tempList) {
    //     if (this.tempList[i].name == data.itemID) {
    //       console.log('....', this.tempList[i]);
    //       let temp = this.tempList[i];
    //       dataObj["id"] = temp._id
    //       console.log("dataObj",dataObj["id"]);
    //     }
    //   }
    // }else if(this.isChecked == 'user'){
    //   for (var i in this.userLists) {
    //     if (this.userLists[i].preferredName == data.itemID) {
    //       console.log('....', this.userLists[i]);
    //       let temp = this.userLists[i];
    //       dataObj["id"] = temp.userId
    //     }
    //   }
    // }else{
    //   console.log(':)')
    // }
    dataObj['id'] = this.selectedID;
    console.log(dataObj);

    //this.blockUI.start('Loading...');
    this._service.createNoti(dataObj, body).subscribe(
      (res: any) => {
        console.log('~~~', res);
        console.log('~~~', this.isChecked);
        setTimeout(() => {
          this.toastr.success('Successfully notified.');
        }, 100);
        //this.blockUI.stop();
        this.item = {};
        this.item.sendType = 'app';
        this.checkedType = [];
        this.notiTypes = [
          { name: 'Email', type: 'email', checked: false },
          { name: 'App notification', type: 'noti', checked: false }
        ];
        if (
          this.isChecked == 'user' ||
          this.isChecked == 'category' ||
          this.isChecked == 'course'
        ) {
          this.userCount = 0;
        }
        this.notiform.resetForm();
        // location.reload();
      },
      err => {
        this.toastr.error('Notify fail');
        console.log(err);
      }
    );
  }

  resetForm() {
    this.item = {};
    this.item.sendType = 'app';
    this.isChecked = 'allcustomer';
  }
  viewHeight: any;
  clickMe() {
    this.viewHeight = this.elementView.nativeElement.offsetHeight;
    console.log('Height', this.viewHeight);
  }

  // testing
  // isCollapsed:boolean = true;
  toggleView() {
    // this.isCollapsed = false;
  }
  // testing
}
