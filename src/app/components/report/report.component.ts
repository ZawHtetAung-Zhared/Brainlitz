import { Component, OnInit, HostListener } from '@angular/core';
import { appService } from '../../service/app.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import * as moment from 'moment'; //

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  constructor( private _service: appService) { 
    this._service.itemValue.subscribe((nextValue) => {
         this.locationID = nextValue;
         this.getStaffRating();
         this.showDetail = false;
      })
  }
  	public regionID = localStorage.getItem('regionId');
  	feedbackLists: any;
	ratingLists: any;
	showFeedback: any;
	showDetail: boolean = false;
	isSticky: boolean = false;
	locationID: any;
	@BlockUI() blockUI: NgBlockUI;
	noData: boolean = true;
	CreatedDate: any;
  	teacherProfile: any;
  	teacherPreferredName: any;
  	teacherRating: any;
  	teacherVote: any;
  	feedBackUserGroup: any[] = [];

  	ngOnInit() {
  		this.getStaffRating();
  	}

  	@HostListener('window:scroll', ['$event']) onScroll($event){    
	    console.log(window.pageYOffset)
	    if(window.pageYOffset >= 40){
	      this.isSticky = true;
	    }else{
	      this.isSticky = false;
	    }
	  }

  	getFeedBack(teacherId, data){
  		console.log(data)
  		this.teacherProfile = data.profilePic;
  		this.teacherPreferredName = data.preferredName;
  		this.teacherRating = data.rating;
  		this.teacherVote = data.voter;
  		this.showDetail = true;
		this._service.getFeedBackList(this.regionID, teacherId)
		.subscribe((res:any) => {
			this.feedbackLists = res;
			console.log('this.feedbackLists', this.feedbackLists)
			for (var i = 0; i < this.feedbackLists.length; i++) {				
				for (var j = 0; j < this.feedbackLists[i].feedbacks.length; j++) {
					console.log(this.feedbackLists[i].feedbacks[j])
					var tempData = this.feedbackLists[i].feedbacks[j].createdDate;
					var date = new Date(tempData);
					var tempDay = date.getUTCDate() ;
					var tempMonth = moment().month(date.getUTCMonth()).format("MMM");
					var tempYear = date.getUTCFullYear();
					this.CreatedDate = tempDay + ' ' + tempMonth + ' ' + tempYear;
					console.log(this.CreatedDate)
				}
			}


	    }, err => {
	    	console.log(err)
	    })
	}
	
	getStaffRating(){
		this.showFeedback = false;
		this.blockUI.start('Loading...');
		this.locationID = localStorage.getItem('locationId');
		this._service.getRatingList(this.locationID)
		.subscribe((res:any) => {
			this.ratingLists = res;
			setTimeout(() => {
		        this.blockUI.stop(); // Stop blocking
		      }, 300);
			if(this.ratingLists == ''){
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

	back(){
		this.showDetail = false;
	}
}
