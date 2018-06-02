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

}
