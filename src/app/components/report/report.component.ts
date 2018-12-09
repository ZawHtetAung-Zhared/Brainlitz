import {Component, OnInit, HostListener} from '@angular/core';
import {appService} from '../../service/app.service';
import {BlockUI, NgBlockUI} from 'ng-block-ui';
// import * as moment from 'moment';
declare var $:any;
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  constructor(private _service:appService) {
    this._service.itemValue.subscribe((nextValue) => {
      this.locationID = nextValue;
      this.getStaffRating(20, 0);
      this.showDetail = false;
    })
    window.scroll(0, 0);
  }

  public regionID = localStorage.getItem('regionId');
  feedbackLists:any;
  ratingLists:Array<any> = [];
  showFeedback:any;
  showDetail:boolean = false;
  isSticky:boolean = false;
  isdropdown:boolean = false;
  locationID:any;
  @BlockUI() blockUI:NgBlockUI;
  noData:boolean = true;
  public isMidStick:boolean = false;
  public navIsFixed:boolean = false;
  CreatedDate:any[] = [];
  teacherProfile:any;
  teacherPreferredName:any;
  teacherRating:any;
  teacherVote:any;
  feedBackUserGroup:any[] = [];
  reportType:any;

  ngOnInit() {
    this.reportType = 'averageRating';
    this.getStaffRating(20, 0);
    window.addEventListener('scroll', this.scroll, true);
    this.dropDownShow = false;
  }

  scroll = (e):void => {
  };

  @HostListener('window:scroll', ['$event']) onScroll($event) {
    if (window.pageYOffset > 81) {
      this.navIsFixed = true;
      this.isMidStick = false
    } else {
      this.navIsFixed = false;
    }

    if (window.pageYOffset > 45) {
      this.isMidStick = true;
    } else {
      this.isMidStick = false;
    }
  }

  getFeedBack(teacherId, data) {
    console.log(data)
    this.teacherProfile = data.profilePic;
    this.teacherPreferredName = data.preferredName;
    this.teacherRating = data.rating;
    this.teacherVote = data.voter;
    this.showDetail = true;
    this.dropDownShow = false;
    const zone = localStorage.getItem('timezone');
    console.log(zone)
    // const format = 'YYYY/MM/DD HH:mm:ss ZZ';
    const format = 'DD MMM YYYY';
    this._service.getFeedBackList(this.regionID, teacherId)
      .subscribe((res:any) => {
        this.feedbackLists = res;
        console.log('this.feedbackLists', this.feedbackLists)
        for (var i = 0; i < this.feedbackLists.length; i++) {
          for (var j = 0; j < this.feedbackLists[i].feedbacks.length; j++) {
            console.log("update date", this.feedbackLists[i].feedbacks[j].updatedDate);
            var tempData = this.feedbackLists[i].feedbacks[j].updatedDate;
            var d = new Date(tempData);
            this.CreatedDate = moment(d, format).tz(zone).format(format);
            console.log("created date", this.CreatedDate)
            this.feedbackLists[i].feedbacks[j].updatedDate = this.CreatedDate;
          }
        }
        // for (var i = 0; i < this.feedbackLists.length; i++) {
        // 	for (var j = 0; j < this.feedbackLists[i].feedbacks.length; j++) {
        // 		console.log(this.feedbackLists[i].feedbacks[j])
        // 		var tempData = this.feedbackLists[i].feedbacks[j].updatedDate;
        // 		var date = new Date(tempData);
        // 		var tempDay = date.getUTCDate() ;
        // 		var tempMonth = moment().month(date.getUTCMonth()).format("MMM");
        // 		var tempYear = date.getUTCFullYear();
        // 		this.CreatedDate = tempDay + ' ' + tempMonth + ' ' + tempYear;
        // 		console.log(this.CreatedDate);
        // 		// var testDate = tempDay + ' ' + tempMonth + ' ' + tempYear;
        // 		// var d = new Date(tempData);
        // 		// console.log("Date",d);
        // 		// var utcDate = moment(d, format).tz(zone).format(format);
        // 		// console.log("UTC zone",utcDate);
        // 		// this.CreatedDate = moment(d, format).tz(zone).format(format);
        // 		// console.log("created date",this.CreatedDate)

        // 	}
        // }


      }, err => {
        console.log(err)
      })
  }

  showMore(skip:any) {
    this.getStaffRating(20, skip)
  }

  getStaffRating(limit, skip) {
    this.showFeedback = false;
    this.blockUI.start('Loading...');
    this.locationID = localStorage.getItem('locationId');
    this._service.getRatingList(this.locationID, limit, skip)
      .subscribe((res:any) => {
        this.ratingLists = res;
        setTimeout(() => {
          this.blockUI.stop(); // Stop blocking
        }, 300);
        if (this.ratingLists == []) {
          this.noData = true;
        }
        else {
          this.noData = false;
        }
        console.log('this.ratingLists', this.ratingLists)
      }, err => {
        console.log(err)
      })
  }

  back() {
    this.showDetail = false;
    this.getStaffRating(20, 0);
  }

  dropDownShow:boolean = false;

  @HostListener('document:click', ['$event'])
  public documentClick(event):void {
    if (this.dropDownShow == false) {
      $('.dropdown-menu').css('display', 'none');
      $('.bg-box').css('display', 'none');
    }
    else {
      $('.dropdown-menu').css('display', 'block');
      $('.bg-box').css('display', 'block');
      this.dropDownShow = false;

    }
  }

  dropDown() {
    var x = document.getElementsByClassName('dropdown-menu');
    if ((x[0]as HTMLElement).style.display == 'block') {
      (x[0]as HTMLElement).style.display = 'none';
    }
    else {
      (x[0]as HTMLElement).style.display = 'block';
      this.dropDownShow = true;
    }
  }

}
