import { Component, OnInit,ViewContainerRef, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng5-toastr/ng5-toastr';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { appService } from '../../service/app.service';
declare var $: any;

@Component({
  selector: 'app-customfield',
  templateUrl: './customfield.component.html',
  styleUrls: ['./customfield.component.css']
})
export class CustomfieldComponent implements OnInit {

  public regionID = localStorage.getItem('regionId');
  public fieldLists:any = [];
  public showForm:boolean = false;
  public isUpdate:boolean = false;
  public testLists = ['String', 'Date', 'Number'];
  public isChecked:any;
  public model:any = {};
  public wordLength:any;
  public modalReference: any;
  public deleteObj:any = {}
  @BlockUI() blockUI: NgBlockUI;
  
  constructor(private modalService: NgbModal,private _service: appService, public toastr: ToastsManager, public vcr: ViewContainerRef) { 
  		this.toastr.setRootViewContainerRef(vcr);
  	}

  ngOnInit() {
  	this.getAllCustomfields();
  	this.defineType(this.isChecked);
  }

  focusMethod(e, status, word){
    console.log('hi', e)
    if(status == 'name'){
      this.wordLength = word.length;
      $('.limit-wordcount').show('slow'); 
    }else{
      this.wordLength = word.length;
      $('.limit-wordcount1').show('slow'); 
    }
  }
    
  blurMethod(e, status){
    console.log('blur', e);
    if(status == 'name'){
      $('.limit-wordcount').hide('slow'); 
    }else{
      $('.limit-wordcount1').hide('slow'); 
    }
    this.wordLength = 0;
  }

  changeMethod(val : string){
    console.log(val)
    this.wordLength = val.length;
  }

  getAllCustomfields(){
  	this._service.getAllFields(this.regionID)
  	.subscribe((res:any) => {
  		console.log(res);
  		this.fieldLists = res.userInfoPermitted;
  		console.log(this.fieldLists);
  	})
  }

  showCreateForm(){
  	this.showForm = true;
  	this.model = {};
  	this.isChecked = this.testLists[0];
  	this.defineType(this.isChecked);
  	this.isUpdate = false;
  }

  cancel(){
  	this.showForm = false;
  	this.model = {};
  	this.isUpdate = false;
  	this.isChecked = false;
  }

  chooseType(item){
  	console.log("Choose",item);
  	this.isChecked = item;
  	this.defineType(this.isChecked);
  }

  defineType(type){
  	console.log(type);
  	// if(type == 'Text'){
  	// 	this.model.datatype = 'String';
  	// 	this.model.controltype = 'Textarea';
  	// }else{

  	// }
  	switch (type) {
  		case "String":
  			this.model.dataType = 'String';
  			this.model.controlType = 'Textarea';
  			break;

  		case "Text":
  			this.model.dataType = 'String';
  			this.model.controlType = 'Textarea';
  			break;
  		
  		case "Number":
  			this.model.dataType = 'Number';
  			this.model.controlType = 'Textarea';
  			break;

		case "Date":
  			this.model.dataType = 'Date';
  			this.model.controlType = 'Textarea';
  	}
  	console.log('type',this.model.dataType,this.model.controlType);
  }

  createField(data,id){
  	console.log("type",id);
  	console.log("datatype and controltype",this.model.dataType,this.model.controlType);
  	let fieldObj = {
  		"userInfoPermitted":{
	  		"name": this.model.name,
	  		"description": this.model.description,
	  		"dataType": this.model.dataType,
	  		"controlType": this.model.controlType
  		}
  	};
  	console.log("Field Obj",fieldObj);
  	this.blockUI.start('Loading...');
  	if(id == ''){
  		console.log("CREATE");
  		this._service.createCustomField(this.regionID,fieldObj)
	  	.subscribe((res:any) => {
	  		console.log(res);
	  		this.model = {};
	  		this.showForm = false;
	  		this.toastr.success('Successfully Created.');
	  		this.blockUI.stop();
	  		this.getAllCustomfields();
	  	}, err => {
	  		console.log(err);
	  		this.toastr.success('Create Fail');
	  		this.blockUI.stop();
	  	})
  	}else{
  		console.log("UPDATE",id);
  		this._service.updateCustomField(this.regionID,fieldObj,id)
  		.subscribe((res:any) => {
  			console.log(res);
  			this.model = {};
  			this.toastr.success('Successfully Updated.');
  			this.blockUI.stop();
  			this.getAllCustomfields();
  			this.showForm = false;
  		}, err => {
  			console.log(err);
	  		this.toastr.success('Update Fail');
	  		this.blockUI.stop();
  		})
  	}
  }

  editField(field){
  	console.log("edit field",field);
  	this.showForm = true;
  	this.isUpdate = true;
  	this.model = field;
  	this.model.type = this.model.dataType;
  	console.log("model type",this.model.type);
  	this.defineType(this.isChecked);
  	this.isChecked = this.model.dataType;
  	console.log("model type",this.isChecked)
  	// if(this.model.type == 'String'){
  	// 	console.log("String")
  	// 	this.isChecked = 'Text';
  	// }else{
  	// 	console.log("Other")
  	// 	this.isChecked = this.model.type;
  	// }
  }

  deleteModal(data,alertDelete){
  	console.log(data)
  	this.deleteObj["id"] = data._id;
  	this.deleteObj["name"] = data.name;

  	console.log('delete data',this.deleteObj);
    this.modalReference = this.modalService.open(alertDelete, { backdrop:'static', windowClass: 'deleteModal d-flex justify-content-center align-items-center'});
  }

  deleteField(id){
  	console.log("delete",id)
  	this._service.deleteCustomField(this.regionID,id)
  	.subscribe((res:any) => {
  		console.log(res);
  	},err => {
  		console.log(err);
  	})
  }

}
