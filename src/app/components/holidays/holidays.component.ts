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

  	constructor(private modalService: NgbModal, private _service: appService) { }

  	ngOnInit() {
  	}

  	modalReference: any;
	closeResult: any;

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
		var date = JSON.stringify(formData.dp);
		console.log(date);
		this.modalReference.close();
	}

}
