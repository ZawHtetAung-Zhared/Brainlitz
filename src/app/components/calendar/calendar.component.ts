import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { appService } from '../../service/app.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  constructor(private modalService: NgbModal, private _service: appService) { }

  ngOnInit() {
  	this.getAllHolidays();
  }

  	modalReference: any;
	closeResult: any;
	regionID: any;
	chosenHoliday: any;
	arrayHoliday: Array<any> = [];
	holidayLists: any;

  	open(content){
		this.modalReference = this.modalService.open(content, { backdrop:'static', windowClass:'animation-wrap'});
	    this.modalReference.result.then((result) => {
		  this.closeResult = `Closed with: ${result}`
	  	}, (reason) => {
	  	  this.closeResult = `Closed with: ${reason}`;
	  	});
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

  	ChangeValue(e){
  		if(e.target.checked == true){
  			this.arrayHoliday.push(e.target.value);	
  			console.log(this.arrayHoliday)
  		}
  		else {
  			var index = this.arrayHoliday.indexOf(e.target.value);
  			this.arrayHoliday.splice(index, 1);
  			console.log(this.arrayHoliday)
  		}
  	}

  	createCalendar(formData){
  		this.regionID = localStorage.getItem('regionId');
  		let dataObj = {
  			"name": formData.name,
  			"holidays": this.arrayHoliday
  		}
  		console.log(dataObj);
 		this._service.createHolidaysCalendar(this.regionID,dataObj)
	    .subscribe((res:any) => {
	      console.log('success holidayCalendar post',res)
	      }, err => {
	        console.log(err)
	      })
  		this.arrayHoliday = [];
  		this.modalReference.close();
  	}

}
