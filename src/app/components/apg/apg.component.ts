import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { apgField } from './apg';
import { apField } from './apg';
import { appService } from '../../service/app.service';
import { ToastsManager } from 'ng5-toastr/ng5-toastr';

@Component({
  selector: 'app-apg',
  templateUrl: './apg.component.html',
  styleUrls: ['./apg.component.css']
})
export class ApgComponent implements OnInit {

  constructor(private modalService: NgbModal,private _service: appService, public toastr: ToastsManager, public vcr: ViewContainerRef) { 
  	this.toastr.setRootViewContainerRef(vcr);
  }

  public modalReference: any;
  public closeResult: any;
  apgField: apgField = new apgField();
  apField: apField = new apField();
  customAP: boolean = false;
  newAP: boolean = false;
  existAP: boolean = false;
  templateAPG: boolean = false;
  viewType:any = 'apg';
  public regionID = localStorage.getItem('regionId');
  apList: any;
  moduleList: any;
  templateList: any;

  ngOnInit() {
  	this.getAllAP();
  	this.getAllTemplate();
  	this.getAllModule();
  }

  	open(content){
  		this.customAP = false;
  		this.templateAPG = false;
  		this.getAllAP();
  		this.apArray = [];
	  	this.modalReference = this.modalService.open(content, { backdrop:'static', windowClass: 'animation-wrap'});
	    this.modalReference.result.then((result) => {
	    	this.apgField = new apgField();
	    	this.apField = new apField();
		  this.closeResult = `Closed with: ${result}`
	  	}, (reason) => {
	  		this.apgField = new apgField();
	  		this.apField = new apField();
	  	  this.closeResult = `Closed with: ${reason}`;
	  	});
  	}

  	radioEvent(e, type){
	  	if(type == 'custom'){
	  		this.customAP = true;
	  		this.newAP = false;
	  		this.templateAPG = false;
	  		this.existAP = false;
	  		this.newAPshow = false;
	  	}
	  	else if(type == 'template'){
	  		this.customAP = false;
	  		this.templateAPG = true;
	  	}
	  	else if(type == 'newap'){
	  		this.newAP = true;
	  		this.existAP = false;
	  		this.newAPshow = false;
	  	}
	  	else if(type == 'existap'){
	  		this.newAP = false;
	  		this.existAP = true;
	  		this.newAPshow = false;
	  	}
	  	else {
	  		console.log('error')
	  	}
	}

	clickTab(type){
    	this.viewType = type;
  	}

  	newAPList: any[] = [];
  	newAPshow: boolean = false;
  	
  	createAP(formData){
  		console.log(formData);
  		let data = {
      		"name": formData.name,
      		"description": formData.desc,
      	}
      	this._service.createAP(this.regionID,data)
		    .subscribe((res:any) => {
		      	console.log('success post',res);
		      	this.toastr.success('Successfully AP Created.');
		      	this.getAllAP();
		      	this.apList.filter(item => item._id == res._id)
		      	this.newAPList.push(res)
		      	this.newAPshow = true;
		      	this.apField = new apField();
		      	console.log(this.newAPList)
		      	;
		    }, err => {
		        this.toastr.error('Created AP Fail');
		        console.log(err)
		    })	
  	}

  	apArray: any[] = [];

  	checkedAP( id, e){
  		var cbIdx = this.apArray.indexOf(id);
  		console.log(e.target.checked)
  		if(e.target.checked == true){
  			if(cbIdx < 0 )
	        this.apArray.push(id);
	        console.log(this.apArray)
  		}
  		else {
  			if(cbIdx >= 0 ){
	         	this.apArray.splice(cbIdx, 1);
	         	console.log(this.apArray)
	      	}
  		}
  		
  	}

  	createAPG(formData){
  		console.log(formData)
  		let data = {
  			'name': formData.name,
  			'description': formData.desc,
  			'moduleId': formData.moduleId,
  			'accessPoints': this.apArray
  		}

  		this._service.createAPG(this.regionID,data)
		    .subscribe((res:any) => {
		      	console.log('success post',res);
		      	this.toastr.success('Successfully APG Created.');
		    }, err => {
		        this.toastr.error('Created APG Fail');
		        console.log(err)
		    })	
	
  	}

  	getAllAP(){
  		this._service.getAllAP(this.regionID)
	    .subscribe((res:any) => {
	    	console.log('APLists' ,res)
	    	this.apList = res;
	      }, err => {
	        console.log(err)
	      })
  	}

  	getAllTemplate(){
  		this._service.getAllTemplate(this.regionID)
	    .subscribe((res:any) => {
	    	console.log('templateLists' ,res)
	    	this.templateList = res;
	      }, err => {
	        console.log(err)
	      })
  	}

  	getAllModule(){
  		this._service.getAllModule(this.regionID)
	    .subscribe((res:any) => {
	    	console.log('moduleLists' ,res)
	    	this.moduleList = res;
	      }, err => {
	        console.log(err)
	      })
  	}

  	onclickDelete(id){

  	}

  	editAPG(content, id){
  		this.modalReference = this.modalService.open(content,{ backdrop:'static', windowClass:'animation-wrap'});
  	}

  	viewAPG(id){
  		
  	}

  	convertTemplate(){

  	}

}
