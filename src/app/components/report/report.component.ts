import { LoggedInGuard } from './../../service/loggedIn.guard';
import { Component, OnInit, HostListener } from '@angular/core';
import { appService } from '../../service/app.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
// import * as moment from 'moment';
declare var $: any;
import * as moment from 'moment-timezone';
import { Router } from '@angular/router';
import { Subscription, ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  //report permission
  private permissionSubscription: ISubscription;
  public reportPermission: any = [];
  public reportDemo: any = [];
  public permissionType: any;
  public hasReport: boolean = false;

  constructor(private _service: appService, private router: Router) {
    this._service.itemValue.subscribe(nextValue => {
      this.locationID = nextValue;
    });
    window.scroll(0, 0);
  }
  locationID: any;
  locationName: any;
  public isMidStick: boolean = false;
  public navIsFixed: boolean = false;

  ngOnInit() {
    setTimeout(() => {
      console.log('~~~', this.locationName);
      this.locationName = localStorage.getItem('locationName');
    }, 300);
    window.addEventListener('scroll', this.scroll, true);

    this.permissionSubscription = this._service.permissionList.subscribe(
      data => {
        if (this.router.url.includes('/report')) {
          this.permissionType = data;
          this.checkPermission();
        }
      }
    );
  }

  ngOnDestroy() {
    this.permissionSubscription.unsubscribe();
  }

  checkPermission() {
    console.log(this.permissionType);
    this.reportPermission = ['VIEWREPORT', 'EXPORTREPORT'];
    this.reportPermission = this.reportPermission.filter(
      value => -1 !== this.permissionType.indexOf(value)
    );

    this.reportDemo['viewReport'] = this.reportPermission.includes('VIEWREPORT')
      ? 'VIEWREPORT'
      : '';
    this.reportDemo['exportReport'] = this.reportPermission.includes(
      'EXPORTREPORT'
    )
      ? 'EXPORTREPORT'
      : '';

    if (this.reportPermission.includes('VIEWREPORT') != false) {
      this.locationName = localStorage.getItem('locationName');
      this.hasReport = false;
    } else {
      console.log('permission deny');
      this.hasReport = true;
    }
  }

  scroll = (e): void => {};

  @HostListener('window:scroll', ['$event']) onScroll($event) {
    if (window.pageYOffset > 81) {
      this.navIsFixed = true;
      this.isMidStick = false;
      var element = document.getElementById('notibar2');
      if (typeof element == 'undefined' || element == null) {
        $('.p-top').css({ 'padding-top': '0px' });
      }
    } else {
      this.navIsFixed = false;
    }

    if (window.pageYOffset > 45) {
      this.isMidStick = true;
    } else {
      this.isMidStick = false;
    }
  }
}
