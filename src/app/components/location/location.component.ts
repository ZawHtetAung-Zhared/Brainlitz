import { Component, OnInit, EventEmitter, Input, Output, ViewChild, ElementRef, ViewContainerRef, HostListener,AfterViewInit } from '@angular/core';
import { Location } from './location';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule,FormGroup,FormControl } from '@angular/forms';
import { appService } from '../../service/app.service';
import { Observable } from 'rxjs/Rx';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastsManager } from 'ng5-toastr/ng5-toastr';
declare var $: any;
import { Router } from '@angular/router';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
  
})

export class LocationComponent implements OnInit {	
	// @ViewChild('categoryForm') form: any;
	@Input() fullValue: string;
  @Output() fullValueChange = new EventEmitter<string>();
	@Input() value: string;
	@Output() valueChange = new EventEmitter<string>();
  @ViewChild('intlInput') intlInput: ElementRef;
	public limitno: Location;
	public PHpattern: any;
	public result: any;
	public location: Location;
	public regionID = localStorage.getItem('regionId');
	public locationID = localStorage.getItem('locationId');
	public currentLocation = localStorage.getItem('locationId');
	public locationLists: Array<any> = [];
	public isUpdate: boolean = false;
	public isempty: boolean = false;
	public isrequired: boolean = true;
	public isvalid: boolean = false;
	public isnumber: boolean = false;
	public isequal: boolean = true;
	public iscreate: boolean = false;
	public navIsFixed: boolean = false;
	public currentID: any;
	public locationName: any;
	public countrycode: any;
	public countryname:any;
	// model: Location = new Location();
	public model:any = {};
	private modalReference: NgbModalRef;
	closeResult: string;
	public wordLength:any = 0;
	public permissionType:any;
	public locPermission:any = [];
	
	@BlockUI() blockUI: NgBlockUI;

	constructor(private modalService: NgbModal, private _service: appService, public toastr: ToastsManager, vcr: ViewContainerRef, private router: Router) {
		this.toastr.setRootViewContainerRef(vcr);
		this._service.getLocations(this.regionID, 20, 0, false);
		if(this.router.url === '/dashboard'){
			console.log('in the dashboard')		
	    this._service.permissionList.subscribe((data) => {  
	    	if(this.router.url === '/dashboard'){
	    		console.log('-----')      	  
	        this.permissionType = data;
	        this.checkPermission();    
	      }    	  
	    });
		}
	}

	ngOnInit() {		
	  if(this.router.url === '/dashboard'){
	    this.permissionType = localStorage.getItem('permission');
	    this.checkPermission();
	  }		
		
	}

	checkPermission(){
	  console.log(this.permissionType)
	  this.locPermission = ['ADDNEWLOCATION','EDITLOCATION','DELETELOCATION'];
	  this.locPermission = this.locPermission.filter(value => -1 !== this.permissionType.indexOf(value));
	  if(this.locPermission.length > 0){
		  this.getAllLocation(20,0);
	  }else{
	  	this.locationLists = [];
	  }
	}

    

  focusMethod(e, word){
  	this.wordLength = word.length;
  	$('.limit-wordcount').show('slow'); 
  }

  blurMethod(e){
  	this.wordLength = 0;
    $('.limit-wordcount').hide('slow'); 
  }

  changeMethod(val : string){
    console.log(val)
    this.wordLength = val.length;
  }

  charCheck(val){
  	console.log(val)
  	console.log(isNaN(val))
  	if(isNaN(val) == true){
  		this.isnumber = true;
  	}else{
  		this.isnumber = false;
  	}
  	// this.isnumber = true;
  }

	telInputObject(obj) {
	    console.log(obj);
	    if(this.isUpdate != true){
	    	console.log('create')
	    	obj.intlTelInput('setCountry', 'sg');
	    }else{
	    	console.log('update', this.countryname)
	    	setTimeout(() => {
	    		obj.intlTelInput('setCountry', this.countryname);
	    	}, 300);
	    }
  	}

  	onCountryChange(e){
  		console.log(e)
  		this.countryname = e.iso2;
  		this.countrycode = e.dialCode;
  		console.log(this.countrycode,this.countryname)
  	}
  	getNumber(obj){
  		console.log('hi getnumber')
  		console.log(obj)
  	}
  	
  	onSearchChange(searchValue : string, e ) {  
	  	// console.log(searchValue);
	  	// let intel = $('.intl-tel-input input');
		// var str = intel[0].placeholder;
		// var str = str.replace(/\s/g, '');
		
		// this.isrequired = true;
		// this.isequal = (searchValue.length < str.length) ? false : true;
		// console.log(this.isequal)
		this.getNumber(e)
		// this.hasError(e)
	}
	hasError(e){
		// console.log(e)
		// let intel = $('.intl-tel-input input');
		// console.log(intel[0].placeholder)
		// var str = intel[0].placeholder;
		// console.log( str.replace(/\s/g, '') );
		// var str = str.replace(/\s/g, '');
		// console.log( str.length );
		this.isvalid = e;
		this.isrequired = e;
		console.log(this.isrequired)
		// this.isequal = (this.isrequired == false) ? true : false;
	}
	creatnew(){
		this.locationLists = [];
		this.iscreate = true;
		this.isUpdate = false;
		this.isvalid = false;
		this.isrequired = true;
		this.model = {};
	}
	back(){
		this.locationLists = [];
    this.iscreate = false
    this.isUpdate = false 
    this.getAllLocation(20,0)	
	}
	keyDownFunction(e){
		if(e.keyCode == 13) {
		    console.log('you just clicked enter');
		    // rest of your code
		  }
	}

	private getDismissReason(reason: any): string {
	  if (reason === ModalDismissReasons.ESC) {
	    return 'by pressing ESC';
	  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
	    return 'by clicking on a backdrop';
	  } else {
	    return `with: ${reason}`;
	  }
	}

	showMore(skip: any){
	    console.log(skip)
	    this.getAllLocation(20, skip);
	  }
	
	getAllLocation(limit, skip){
		this.blockUI.start('Loading...');
		this._service.getLocations(this.regionID, limit, skip, false)
		.subscribe((res:any) => {
			console.log(res)
			this.result = res;
			setTimeout(() => {
		        this.blockUI.stop(); // Stop blocking
		      }, 300);
    		this.locationLists = this.locationLists.concat(res);
    		console.log(this.locationLists)
    		this.isempty = (res.length === 0) ? true : false;       
	    	
    		console.log(this.locationID)
    		if(this.locationID){
    			for(var i in  this.locationLists){
    				if(this.locationID == this.locationLists[i]._id){
    					console.log('same')
    					this.locationLists[i].selected = true;
    				}
    			}
    		}
	    }, err => {
	    	console.log(err)
	    })
	}

	create(){
		console.log('i')
	}

	createLocation(obj, update, locationID) {
		console.log("Location Obj",obj)
		console.log(obj.phonenumber)
		var phNum;

		phNum = (obj.phonenumber == undefined || obj.phonenumber.length ==  0) ? null: parseInt(obj.phonenumber);
		console.log("PhNum",phNum)
		let data = {
			"regionId": this.regionID,
			"name": obj.name,
			"address": obj.address,
			"phoneNumber": {
				"countryCode": this.countrycode,
				"number" : phNum,
				"countryName": this.countryname
			}
		}
		console.log("location Data",data)
		if(update == true){
			console.log(update)
			this.blockUI.start('Loading...');
			this._service.updateLocation(locationID, data, this.locationID)
			 .subscribe((res:any) => {
	     		console.log(res)
	     		this.model = {};
	     		this.toastr.success('Successfully Updated.');
	     		this.blockUI.stop();
	     		this.back();
	     	}, err => {
	     		this.toastr.error('Update fail');
	     		console.log(err)
	    	})
		}else{
	    	console.log("Form Submitted!", this.regionID);
	    	this.blockUI.start('Loading...');
	    	// this.modalReference.close();
	    	this._service.createLocation(this.regionID, data, this.locationID)
	      	.subscribe((res:any) => {
	    		console.log(res);
	    		this.model = {};
	    		this.toastr.success('Successfully Created.');
	    		this.blockUI.stop();
	    		this.back();
		    }, err => {
		    	
		    	console.log(err)
		    	if(err.error == "Location name already exists."){
		    		this.toastr.error(err.error);
		    	}else{
		    		this.toastr.error('Create Fail.');
		    	}
		    	this.blockUI.stop();
		    })
		  
		}
	}

	deleteLocation(id){
		console.log(id)
		this._service.deleteLocation(id, this.locationID)
		.subscribe((res:any) => {
			console.log(res);
			this.modalReference.close();
			this.toastr.success('Successfully Deleted.');
			this.locationLists = [];
			this.getAllLocation(20,0);
		},err => {
			this.modalReference.close();
			this.toastr.error('Delete Fail.');
			console.log(err);
		})
	}

	getSingleLocation(id){
		this.iscreate = true;
		// console.log(this.model)
		this.isUpdate = true;		
		this.isvalid = true;
		this.isnumber = false;		
		this.singleLocation(id);
	}

	singleLocation(id){
		this._service.getSingleLocation(id)
		.subscribe((res:any) => {
			console.log('single location',res);
			this.currentID = res._id;
			this.locationName = res.name;
			this.model = res;
			this.model.phonenumber = res.phoneNumber.number;
			this.countrycode = res.phoneNumber.countryCode;
			this.countryname = res.phoneNumber.countryName;
			console.log("this.model",this.model)
		},err => {
			console.log(err);
		})
	}


	deleteModal(deletemodal, id){
		this.modalReference = this.modalService.open(deletemodal, {backdrop:'static', windowClass:'deleteModal d-flex justify-content-center align-items-center' });
		this.singleLocation(id);
	}
}