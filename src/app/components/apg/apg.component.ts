import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { apgField } from './apg';
import { apField } from './apg';
import { appService } from '../../service/app.service';
import { ToastsManager } from 'ng5-toastr/ng5-toastr';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

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
  moduleList: any[] = [];
  templateList: any;
  apgList: any;
  apArray: any[] = [];
  @BlockUI() blockUI: NgBlockUI;

  ngOnInit() {
  	this.getAllAP();
  	this.getAllTemplate();
  	this.getAllModule();
  	this.getAllAPG();
  }

  	open(content){
  		this.customAP = false;
  		this.templateAPG = false;
  		this.getAllAP();
  		this.apArray = [];
  		this.newAPList = [];
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
  	newAPListId: any[] = [];
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
		      	res.checked = true;
		      	this.newAPList.push(res);
		      	this.newAPListId.push(res._id);
		      	this.newAPshow = true;
		      	this.apField = new apField();
		      	;
		    }, err => {
		        this.toastr.error('Created AP Fail');
		        console.log(err)
		    })	
  	}

  	checkedAP( id, e, type){
  		if(type == 'existap'){
  			var cbIdx = this.apArray.indexOf(id);
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
  		else {
  			console.log(e)
  			console.log(this.newAPListId)
  			var cbIdx = this.newAPListId.indexOf(id);
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
  		
  	}

  	createAPG(formData){
  		console.log(formData)
  		if(this.newAPshow == true){
  			for(var i in this.newAPList){
  				this.apArray.push(this.newAPList[i]._id);
  			}
  		}
  		let data = {
  			'name': formData.name,
  			'description': formData.desc,
  			'moduleId': formData.moduleId,
  			'accessPoints': this.apArray	  		
  		}
  		console.log(data)
  		this.modalReference.close();
  		this.blockUI.start('Loading...');
  		this._service.createAPG(this.regionID, data, formData.templateId)
		    .subscribe((res:any) => {
		      	console.log('success post',res);
		      	this.toastr.success('Successfully APG Created.');
		      	this.getAllAPG();
		      	this.blockUI.stop();
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
	    	for(var i in res){
	    		if(res[i]._id != null){
	    			this.moduleList.push(res[i]);
	    		}
	    	}

	      }, err => {
	        console.log(err)
	      })
  	}

  	getAllAPG(){
  		this._service.getAllAPG(this.regionID)
	    .subscribe((res:any) => {
	    	console.log('apgLists' ,res)
	    	this.apgList = res;
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
