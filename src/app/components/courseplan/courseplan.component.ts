import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-courseplan',
  templateUrl: './courseplan.component.html',
  styleUrls: ['./courseplan.component.css']
})
export class CourseplanComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit() {

  }
  	courseCategories: any[] = [
	    {	
	     	"id": "1",	
	     	"name": "Category1"
	    },
	    {
	      	"id": "2",	
	     	"name": "Category2"
	    },
	    {
	      	"id": "3",	
	     	"name": "Category3"
	    },
	    {
	      	"id": "4",	
	     	"name": "Category4"
	    }
  	];

  	public showModal: boolean = false;
  	public showsubModal: boolean = true;
  	public checked: boolean = false;
  	public modalReference: any;
  	public closeResult: any;

  	open(content){
  		// this.modalService.open(content, { size: 'lg' });
  		this.showModal = true;
  		this.showsubModal = false;
  		this.checked = false;

  		this.modalReference = this.modalService.open(content, { size: 'lg' });
		  this.modalReference.result.then((result) => {
		  this.closeResult = `Closed with: ${result}`;
		}, (reason) => {
		  this.closeResult = `Closed with: ${reason}`;
		});
  	}

  	selectedRadioId(data, opensubModal){
  		this.showModal = false;
  		this.showsubModal = true;
  	}

  	back(){
  		this.showModal = true;
  		this.showsubModal = false;
  	}

  	checkedData(data, e){
  		if(e.target.checked == true){
  			this.checked = true;
  		}
  		else {
  			this.checked = false;
  		}
  		console.log(data)
  	}

  	createdPlan() {
  		console.log('created')
  		this.modalReference.close();
  	}

}
