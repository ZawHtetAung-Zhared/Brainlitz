import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { formField } from './apg';

@Component({
  selector: 'app-apg',
  templateUrl: './apg.component.html',
  styleUrls: ['./apg.component.css']
})
export class ApgComponent implements OnInit {

  constructor(private modalService: NgbModal,) { }

  public modalReference: any;
  public closeResult: any;
  formField: formField = new formField();
  customAP: boolean = false;
  newAP: boolean = false;
  existAP: boolean = false;
  templateAPG: boolean = false;

  ngOnInit() {
  }

  	public moduleList = [
	   { 
	   	'name': 'HP',
	   	'_id': 'module1'
	    },
	   { 
	   	'name': 'IBM',
	   	'_id': 'module2'
	    },
	   { 
	   	'name': 'Lenovo',
	   	'_id': 'module3'
	   	 }
 	];

 	public apList = [
	   { 
	   	'name': 'AP1',
	   	'_id': 'ap1'
	    },
	   { 
	   	'name': 'AP2',
	   	'_id': 'ap2'
	    },
	   { 
	   	'name': 'AP3',
	   	'_id': 'ap3'
	   	 }
 	];

 	public templateList = [
	   { 
	   	'name': 'template1',
	   	'_id': 'temp1'
	    },
	   { 
	   	'name': 'template2',
	   	'_id': 'temp2'
	    },
	   { 
	   	'name': 'template3',
	   	'_id': 'temp3'
	   	 }
 	];

  	open(content){
  		this.customAP = false;
  		this.templateAPG = false;
	  	this.modalReference = this.modalService.open(content, { backdrop:'static', windowClass: 'animation-wrap'});
	    this.modalReference.result.then((result) => {
	    	this.formField = new formField();
		  this.closeResult = `Closed with: ${result}`
	  	}, (reason) => {
	  		this.formField = new formField();
	  	  this.closeResult = `Closed with: ${reason}`;
	  	});
  	}

  	radioEvent(e, type){
	  	if(type == 'custom'){
	  		this.customAP = true;
	  		this.newAP = false;
	  		this.templateAPG = false;
	  		this.existAP = false;
	  	}
	  	else if(type == 'template'){
	  		this.customAP = false;
	  		this.templateAPG = true;
	  	}
	  	else if(type == 'newap'){
	  		this.newAP = true;
	  		this.existAP = false;
	  	}
	  	else if(type == 'existap'){
	  		this.newAP = false;
	  		this.existAP = true;
	  	}
	  	else {
	  		console.log('error')
	  	}
	}

}
