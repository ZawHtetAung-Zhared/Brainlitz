import { Component, OnInit } from '@angular/core';

import { appService } from '../../../service/app.service';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-average-ratings',
  templateUrl: './average-ratings.component.html',
  styleUrls: ['../report.component.css']
})
export class AverageRatingsComponent implements OnInit {
  showDetail: boolean = false;
  public locationID = localStorage.getItem('locationId');
  public regionID = localStorage.getItem('regionId');
  ratingLists: Array<any> = [];
  feedbackLists: any;
  teacherProfile: any;
  teacherPreferredName: any;
  teacherRating: any;
  teacherVote: any;
  CreatedDate: any[] = [];

  constructor(private _service: appService) {}

  ngOnInit() {
    this.getStaffRating(20, 0);
  }

  getStaffRating(limit, skip) {
    this._service.getRatingList(this.locationID, limit, skip).subscribe(
      (res: any) => {
        this.ratingLists = res;
        console.log('this.ratingLists', this.ratingLists);
      },
      err => {
        console.log(err);
      }
    );
  }

  getFeedBack(teacherId, data) {
    console.log(data);
    this.teacherProfile = data.profilePic;
    this.teacherPreferredName = data.preferredName;
    this.teacherRating = data.rating;
    this.teacherVote = data.voter;
    this.showDetail = true;
    const zone = localStorage.getItem('timezone');
    console.log(zone);
    // const format = 'YYYY/MM/DD HH:mm:ss ZZ';
    const format = 'DD MMM YYYY';
    this._service.getFeedBackList(this.regionID, teacherId).subscribe(
      (res: any) => {
        this.feedbackLists = res;
        console.log('this.feedbackLists', this.feedbackLists);
        for (var i = 0; i < this.feedbackLists.length; i++) {
          for (var j = 0; j < this.feedbackLists[i].feedbacks.length; j++) {
            console.log(
              'update date',
              this.feedbackLists[i].feedbacks[j].updatedDate
            );
            var tempData = this.feedbackLists[i].feedbacks[j].updatedDate;
            var d = new Date(tempData);
            this.CreatedDate = moment(d, format)
              .tz(zone)
              .format(format);
            console.log('created date', this.CreatedDate);
            this.feedbackLists[i].feedbacks[j].updatedDate = this.CreatedDate;
          }
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  back() {
    this.showDetail = false;
    this.getStaffRating(20, 0);
  }

  showMore(skip: any) {
    this.getStaffRating(20, skip);
  }
}
