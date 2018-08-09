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
	utcStartDate: any;
  	utcEndDate: any;
  	teacherName: any;

  	ngOnInit() {
  		this.getStaffRating();
  	}

  	@HostListener('window:scroll', ['$event']) onScroll($event){    
	    if(window.pageYOffset > 10){
	      console.log('greater than 30')
	      this.isSticky = true;
	    }else{
	      console.log('less than 30')
	      this.isSticky = false;
	    }
	  }

  	getFeedBack(teacherId, tName){
  		this.teacherName = tName;
  		this.showDetail = true;
		this._service.getFeedBackList(this.regionID, teacherId)
		.subscribe((res:any) => {
			this.feedbackLists = res;
			console.log('this.feedbackLists', this.feedbackLists)
			for (var i in this.feedbackLists) {
			    if(this.feedbackLists[i].course.startDate){
			    	let startDateGet = this.feedbackLists[i].course.startDate;
		       		this.utcStartDate = moment.utc(startDateGet).toDate().toUTCString();
		          	this.feedbackLists[i].course.startDate = this.utcStartDate;
		        }
		        if(this.feedbackLists[i].course.endDate){
		        	let endDateGet = this.feedbackLists[i].course.endDate;
		        	this.utcEndDate = moment.utc(endDateGet).toDate().toUTCString();
		        	this.feedbackLists[i].course.endDate = this.utcEndDate;
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
