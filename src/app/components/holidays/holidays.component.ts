import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { appService } from '../../service/app.service';
import { Observable } from 'rxjs/Rx';

declare var $: any;

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.css']
})

export class HolidaysComponent implements OnInit {

	public holidayLists: any;
  	constructor(private modalService: NgbModal, private _service: appService) { }

  	ngOnInit() {
  		this.getAllHolidays();
  	}

  	modalReference: any;
	closeResult: any;
	regionID: any;


  	open(content){
		this.modalReference = this.modalService.open(content, { backdrop:'static', windowClass:'animation-wrap'});
	    this.modalReference.result.then((result) => {
		  this.closeResult = `Closed with: ${result}`
	  	}, (reason) => {
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

		this._service.createHolidays(this.regionID,dataObj)
	    .subscribe((res:any) => {
	      console.log('success holidays post',res)
	      this.getAllHolidays();
	      }, err => {
	        console.log(err)
	      })
		this.modalReference.close();
	}

	getAllHolidays(){
		this.regionID = localStorage.getItem('regionId');
	    this._service.getAllHolidays(this.regionID)
	    .subscribe((res:any) => {
	      this.holidayLists = res;
	      console.log(this.holidayLists)
	    }, err => {
	        console.log(err)
	    })
  	}

}
