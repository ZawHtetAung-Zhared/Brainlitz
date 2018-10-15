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
	formValue: any;
	public holidayLists: any;
	public isUpdate: boolean = false;
	public currentID: any;
	public holidayName: any;
	modalReference: any;
	closeResult: any;
	public regionID = localStorage.getItem('regionId');
	formField: holidays = new holidays();
	test = {
		"1": "hello"
	};
	sample =
	{
	    "_id": "5b8cdd64d75475317f99006d",
	    "holidays": {
	        "y2018": [
	            {
	                "_id": "5b0bd17ab389691e0a19aedd",
	                "name": "amk1",
	                "start": "2018-05-20T09:00:26.344Z",
	                "end": "2018-05-20T15:30:26.344Z"
	            }
	        ],
	        "2019": [
	            {
	                "_id": "5b0bd197b389691e0a19aede",
	                "name": "amk2",
	                "start": "2019-05-21T09:00:26.344Z",
	                "end": "2019-05-21T09:00:26.344Z"
	            }
	        ]
	    },
	    "name": "Myanmar Calendar"
	};
	@BlockUI() blockUI: NgBlockUI;

  	constructor(private modalService: NgbModal, private _service: appService, public toastr: ToastsManager, vcr: ViewContainerRef) { 
  		this.toastr.setRootViewContainerRef(vcr);
  	}

  	ngOnInit() {
  		this.getAllHolidays();
  	}

  	onSubmit(form: NgForm) {
	    this.formValue = form.value;
	    console.log(this.formValue);
	    // Do whatever you want with form value
	    // Could be a POST request or else
  	}

  	open(content){
  		this.isUpdate = false;
  		this.formField = new holidays();
		this.modalReference = this.modalService.open(content, { backdrop:'static', windowClass:'animation-wrap'});
	    this.modalReference.result.then((result) => {	    	
		  	this.closeResult = `Closed with: ${result}`;
		  	this.isUpdate = false;
	  	}, (reason) => {	  		
	  	  	this.closeResult = `Closed with: ${reason}`;
	  	  	this.isUpdate = false;
	  	});
	}

	createHolidays(formData, update, id){
		console.log(formData)
		console.log(formData.createdDate);	
		var day = formData.createdDate.day;
		var month = formData.createdDate.month;
		var year = formData.createdDate.year;
		var date = year+ '-' + month+ '-' + day;

		let dataObj = {
			'regionId': this.regionID,
			'name': formData.name,
			'date': date	
		}
		console.log(dataObj);
		this.blockUI.start('Loading...');
		this.modalReference.close();
		if(update == false){
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
		}else{
			this._service.updateHoliday(id,dataObj)
		   	.subscribe((res:any) => {
		     	this.toastr.success('Successfully Updated.');
		       	this.blockUI.stop();
		   		this.getAllHolidays();
		   		this.isUpdate = false;
		    	}, err => {
		    		this.toastr.error('Updat Fail');
		    		this.blockUI.stop();
		    		console.log(err)
		    	})
		}
	}

	getAllHolidays(){
		this.blockUI.start('Loading...');
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

  	getSingleHoliday(id, content){
  		this.isUpdate = true;
		this.modalReference = this.modalService.open(content, { backdrop:'static', windowClass:'animation-wrap' });
  		this._service.getSingleHoliday(id)
		.subscribe((res:any) => {
			console.log(res);
			this.currentID = res._id;
			this.formField = res;
			this.formField.createdDate = this.changeDateStrtoObj(res.date);
		},err => {
			console.log(err);
		})
  	}

  	changeDateStrtoObj(datestr){
  	  console.log(datestr)
  	  let test = datestr.substring(0, datestr.search("T"));
  	  let testSplit = test.split("-");
  	  let format = {year: Number(testSplit[0]), month: Number(testSplit[1]), day: Number(testSplit[2])};
  	  return format;
  	}

  	deleteModal(deletemodal, id){
  		this.modalReference = this.modalService.open(deletemodal, { backdrop:'static', windowClass:'animation-wrap' });
  		this._service.getSingleHoliday(id)
  		.subscribe((res:any) => {
			console.log(res);
			this.currentID = res._id;
			this.holidayName = res.name;
		},err => {
			console.log(err);
		})
  	}

  	deleteHoldiay(id){
  		this._service.deleteHoliday(id)
  		.subscribe((res:any) => {
			console.log(res);
			this.modalReference.close();
			this.getAllHolidays();
			this.toastr.success('Successfully deleted.');
		},err => {
			this.toastr.error('Delete Fail');
			this.modalReference.close();
			console.log(err);
		})
  	}

}
