import { Component, OnInit } from '@angular/core';
import { appService } from '../../service/app.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

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
	locationID: any;
	@BlockUI() blockUI: NgBlockUI;

  	ngOnInit() {
  		this.getStaffRating();
  	}

  	getFeedBack(teacherId){
  		this.showDetail = true;
		this._service.getFeedBackList(this.regionID, teacherId)
		.subscribe((res:any) => {
			this.feedbackLists = res;
			console.log('this.feedbackLists', this.feedbackLists)
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
			this.blockUI.stop();
			console.log('this.ratingLists', this.ratingLists)
	    }, err => {
	    	console.log(err)
	    })
	}

	back(){
		this.showDetail = false;
	}
}
