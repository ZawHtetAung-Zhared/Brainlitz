import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { appService } from '../../service/app.service';
import { Observable } from 'rxjs/Rx';
import { holidays } from './holidays';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastsManager } from 'ng5-toastr/ng5-toastr';

declare var $: any;

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.css']
})

export class HolidaysComponent implements OnInit {

	public holidayLists: any;
  	constructor(private modalService: NgbModal, private _service: appService, public toastr: ToastsManager, vcr: ViewContainerRef) { 
  		this.toastr.setRootViewContainerRef(vcr);
  	}

  	ngOnInit() {
  		this.getAllHolidays();
  	}

  	modalReference: any;
	closeResult: any;
	regionID: any;
	formField: holidays = new holidays();
	@BlockUI() blockUI: NgBlockUI;

  	open(content){
		this.modalReference = this.modalService.open(content, { backdrop:'static', windowClass:'animation-wrap'});
	    this.modalReference.result.then((result) => {
	    	this.formField = new holidays();
		  	this.closeResult = `Closed with: ${result}`
	  	}, (reason) => {
	  		this.formField = new holidays();
	  	  	this.closeResult = `Closed with: ${reason}`;
	  	});
	}

	createHolidays(formData){
		console.log(formData.dp);	
		var day = formData.dp.day;
		var month = formData.dp.month;
		var year = formData.dp.year;
		var date = year+ '-' + month+ '-' + day;

		this.regionID = localStorage.getItem('regionId');

		let dataObj = {
			'regionId': this.regionID,
			'name': formData.name,
			'date': date	
		}
		console.log(dataObj);
		this.blockUI.start('Loading...');
		this.modalReference.close();
		this._service.createHolidays(this.regionID,dataObj)
	   	.subscribe((res:any) => {
	     	console.log('success holidays post',res)
	     	this.toastr.success('Successfully Created.');
	       	this.blockUI.stop();
	   		this.getAllHolidays();
	    	}, err => {
	    		this.toastr.error('Create Fail');
	    		this.blockUI.stop();
	    		console.log(err)
	    	})
		
	}

	getAllHolidays(){
		this.blockUI.start('Loading...');
		this.regionID = localStorage.getItem('regionId');
	    this._service.getAllHolidays(this.regionID)
	    .subscribe((res:any) => {
	      this.holidayLists = res;
	      setTimeout(() => {
	        this.blockUI.stop(); // Stop blocking
	      }, 300);
	      console.log(this.holidayLists)
	    }, err => {
	        console.log(err)
	    })
  	}

}
