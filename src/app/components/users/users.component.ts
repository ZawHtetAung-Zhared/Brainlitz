import { Component, OnInit, ElementRef, ViewChild, ViewContainerRef, HostListener } from '@angular/core';
import { FormsModule,FormGroup,FormControl } from '@angular/forms';
import { Staff } from './staff';
import { Customer } from './customer';
import { appService } from '../../service/app.service';
import { NgForm } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { ImageCropperComponent } from 'ng2-img-cropper/src/imageCropperComponent';
import { CropperSettings } from 'ng2-img-cropper/src/cropperSettings';
import { Bounds } from 'ng2-img-cropper/src/model/bounds';
import { CropPosition } from 'ng2-img-cropper/src/model/cropPosition';
import { Croppie } from 'croppie';
import Cropper from 'cropperjs';
import { environment } from '../../../environments/environment';
import { staff } from './user';
import { customer } from './user';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastsManager } from 'ng5-toastr/ng5-toastr';

declare var $:any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

	@ViewChild('stuffPic') stuffPic: ElementRef;
	form: FormGroup;
	stuffs: Staff = new Staff();
	customers: Customer = new Customer();
	public img: any;
	public orgID = environment.orgID;
	public regionID = localStorage.getItem('regionId');
	public userLists: any;
	test:any;
	formFields: staff = new staff();
	formFieldc: customer = new customer();

	@ViewChild("cropper", undefined)
	cropper: ImageCropperComponent;
	resetCroppers: Function;
	cropperSettings1: CropperSettings;
	input: any;
	uploadCrop: any;
	blankCrop: boolean = false;
	cropButton: boolean = true;
	isSticky: boolean = false;
	modalReference: any;
	closeResult: any;
	imageUrl: any;
	public showLoading: boolean = false;
	@BlockUI() blockUI: NgBlockUI;
	staffLists: any;
	customerLists: any;
	userType: any;
	permissionLists: any;
	locationLists: any;
	public locationID = localStorage.getItem('locationId');
	emailAlert: boolean = false;
	guardianAlert : boolean = false;
	notShowEdit: boolean = true;
	permissionId: any[] = [];
	editId: any;
	public updateButton: boolean = false;
  	public createButton: boolean = true;
  	showFormCreate: boolean = false;

	constructor(private modalService: NgbModal, private _service: appService, public toastr: ToastsManager, vcr: ViewContainerRef) { 
	    this.cropperSettings1 = new CropperSettings();
	    this.cropperSettings1.rounded = true;
	    this.cropperSettings1.noFileInput = true;
	    this.cropperSettings1.cropperDrawSettings.strokeColor = "rgba(255,0,0,1)";
	    this.cropperSettings1.cropperDrawSettings.strokeWidth = 2;
	    this.toastr.setRootViewContainerRef(vcr);
	}


	ngOnInit() {
		this.getAllUsers('customer');
	}

	@HostListener('window:scroll', ['$event']) onScroll($event){    
	    if(window.pageYOffset > 10){
	      console.log('greater than 30')
	      this.isSticky = true;
	    }else{
	      console.log('less than 30')
	      this.isSticky = false;
	    }
	  }

	open1(staffModal){
		this.blankCrop = false; 
		this.notShowEdit = true;
		this.getAllpermission();
		this.getAllLocation();
		this.formFields = new staff();
		this.updateButton = false;
    	this.createButton = true;
    	this.emailAlert = false;
    	this.guardianAlert = false;
		this.modalReference = this.modalService.open(staffModal, { backdrop:'static', windowClass:'animation-wrap'});
	    this.modalReference.result.then((result) => {
	    	this.formFields = new staff();	
		  	this.closeResult = `Closed with: ${result}`
	  	}, (reason) => {
	  		this.formFields = new staff();	
	  	    this.closeResult = `Closed with: ${reason}`;
	  	});
	}

	open2(customerModal){
		this.blankCrop = false;
		this.notShowEdit = true;
		this.formFieldc = new customer();
		this.updateButton = false;
    	this.createButton = true;
    	this.emailAlert = false;
    	this.guardianAlert = false;
		this.modalReference = this.modalService.open(customerModal, { backdrop:'static', windowClass:'animation-wrap'});
	    this.modalReference.result.then((result) => {
	    	this.formFieldc = new customer();	
		  	this.closeResult = `Closed with: ${result}`
	  	}, (reason) => {
	  		this.formFieldc = new customer();
	  	  	this.closeResult = `Closed with: ${reason}`;
	  	});
	}

  	uploadCropImg($event: any) {
	    this.blankCrop = true; 
	    this.cropButton = false;
	    $("#upload-demo img:first").remove();
	    this.input = $event.target.files[0];
	    if (this.input) {
	      	if (this.input && this.uploadCrop) {
	        	this.uploadCrop.destroy();
	      	}
      	var reader = new FileReader();
        this.uploadCrop = new Croppie(document.getElementById("upload-demo"),{
	        viewport: {
	            width: 150,
	            height: 150,
	            type: 'circle'
	          },
	        boundary: {
	            width: 300,
	            height: 300
	        },
          	enableExif: true
        });
	      	var $uploadCrop = this.uploadCrop;
	      	reader.onload = function(e: any) {
	        $uploadCrop.bind({
	            url: e.target.result
	          })
	          .then(function(e: any) {});
	      };
	      reader.readAsDataURL($event.target.files[0]);
	    }
  	}

  	cropResult(modal) {
	    let self = this;
	    this.blankCrop = true;
	    setTimeout(function() {
	      $("#upload-demo img:last-child").attr("id", "blobUrl");
	    }, 200);
	    this.uploadCrop
	      .result({
	      	circle: false,
	        type: "canvas",
	        size: {
				width: 800,
				height: 800
			},
			quality:1 
	      })
	      .then(function(resp: any) {
	      	$("#upload-demo img:last-child").remove();
	        if (resp) {
	          $("#upload-demo").append('<img src="' + resp + '" width="100%" />');
	          $(".modal-backdrop.fade").css('opacity', '0.5');
	        }
	    });
  	}

  	dataURItoBlob(dataURI: any) {
	    var byteString = atob(dataURI.split(",")[1]);
	    var mimeString = dataURI
	      .split(",")[0]
	      .split(":")[1]
	      .split(";")[0];
	    var ab = new ArrayBuffer(byteString.length);
	    var ia = new Uint8Array(ab);
	    for (var i = 0; i < byteString.length; i++) {
	      ia[i] = byteString.charCodeAt(i);
	    }
	    return new Blob([ab], { type: mimeString });
	}

	atLeastOneMail: boolean = false;

	createUser(obj, type, apiState){
		console.log(obj);
		console.log(type);
		this.atLeastOneMail = false;
		let getImg = document.getElementById("blobUrl");
		if(getImg != undefined){
			this.imageUrl = document.getElementById("blobUrl").getAttribute("src");
			this.img = this.dataURItoBlob(this.imageUrl);
		}else{
			this.img = '';
		}
		let objData = new FormData();
		if(type == 'staff'){
			let locationObj = [{'locationId': this.locationID,'permissionId': obj.role}];
			console.log('locationObj', locationObj)
			objData.append('orgId', this.orgID),
			objData.append('firstName', obj.fname),
			objData.append('lastName', obj.lname),
			objData.append('preferredName', obj.preferredName),
			objData.append('email', obj.mail),
			objData.append('regionId', this.regionID),
			objData.append('password', obj.pwd),
			objData.append('location', JSON.stringify(locationObj)),
			objData.append('profilePic', this.img)
			console.log(objData)
			this.blockUI.start('Loading...');
			this.modalReference.close();

		}
		else if(type == 'customer'){
			let guardianArray;
			if(obj.guardianmail){
				guardianArray = obj.guardianmail.split(',')
			}
			if(!obj.guardianmail && !obj.mail){
				this.atLeastOneMail = true;
			}
			else {
				this.blockUI.start('Loading...');
				this.modalReference.close();
			}
			objData.append('orgId', this.orgID);
			objData.append('firstName', obj.fname);
			objData.append('lastName', obj.lname);
			objData.append('preferredName', obj.preferredName);
			if(obj.mail == undefined){
				objData.append('email', '')
			}
			else{
				objData.append('email', obj.mail);
			}
			objData.append('regionId', this.regionID);
			objData.append('password', obj.pwd);
			objData.append('gender', obj.gender);
			objData.append('guardianEmail', JSON.stringify(guardianArray));
			objData.append('location', JSON.stringify([]));
			objData.append('profilePic', this.img)
			console.log(objData)
		}
		else {
			console.log('error')
		}
		if(apiState == 'create'){
			console.log('create')
			if(this.atLeastOneMail == false){
				this._service.createUser(objData)
		    	.subscribe((res:any) => {
		  			console.log(res)
		  			this.toastr.success('Successfully Created.');
			  		this.blockUI.stop();
			  		this.getAllUsers('all');
			    }, err => {		    	
			    	this.blockUI.stop();
			    	if(err.message == 'Http failure response for http://dev-app.brainlitz.com/api/v1/signup: 400 Bad Request'){
			    		this.toastr.error('Email already exist');
			    	}
			    	else {
			    		this.toastr.error('Create Fail');
			    	}
			    	
			    	console.log(err)
			    })
			}
		}
		else if (apiState == 'update'){
			console.log('update')
			this._service.updateUser(this.regionID,this.editId, objData)
	    	.subscribe((res:any) => {
	  			console.log(res)
	  			this.toastr.success('Successfully Created.');
		  		this.blockUI.stop();
		  		this.getAllUsers('all');
		    }, err => {
		    	this.toastr.error('Create Fail');
		    	this.blockUI.stop();
		    	console.log(err)
		    })
		}
		else {
			console.log('error')
		}
		
    		
	}

	edit(id, type, modal){
		console.log(id)
		this.getAllpermission();
		this.blankCrop= true;
		this.notShowEdit = false;
		this.updateButton = true;
		this.createButton = false;
		if(type == "customer"){
			console.log('hello customer')
			this.modalReference = this.modalService.open(modal, { backdrop:'static', windowClass:'animation-wrap'});
			this._service.userDetail(this.regionID, id)
			.subscribe((res:any) => {
				console.log('customer', res);
				this.formFieldc = res;
				//$("#upload-demo").append('<img src="' + res.profilePic + '" />');
				//$("#upload-demo img").css("width", "100%");
			})
		}
		else if (type == "staff"){
			console.log('hello staff')
			this.modalReference = this.modalService.open(modal, { backdrop:'static', windowClass:'animation-wrap'});
			this._service.userDetail(this.regionID, id)
			.subscribe((res:any) => {
				console.log('staff', res);
				this.formFields = res;
				//$("#upload-demo").append('<img src="' + res.profilePic + '" />');
				//$("#upload-demo img").css("width", "100%");
				//this.permissionId = this.formFields.location[0].permissionId;
				this.editId = id;
			})
		}
		else {
			console.log('all user')
			this._service.getAllUsers(this.regionID, type)
			.subscribe((res:any) => {
				for(var i = 0; i < res.length; i++){
					if(res[i].userId == id && res[i].permissionCount == 0){
						modal = customer
						this.modalReference = this.modalService.open(modal, { backdrop:'static', windowClass:'animation-wrap'});
					}
					else if(res[i].userId == id && res[i].permissionCount == 1){
						this.modalReference = this.modalService.open('staffModal', { backdrop:'static', windowClass:'animation-wrap'});
					}
					else {
						console.log('error')
					}
				}
			})
		}
	}

	updateUser(obj, type){
		if(type == "customer"){
			console.log('update customer')
		}else if(type == "staff"){
			console.log('update staff')
		}else{
			console.log('update all')
		}
	}

	getAllUsers(type){
		this.blockUI.start('Loading...');		
		this._service.getAllUsers(this.regionID, type)
		.subscribe((res:any) => {
			if(type == 'customer'){
				this.customerLists = res;
				console.log('this.customerLists', this.customerLists)
			}
			else if(type == 'staff'){
				this.staffLists = res;
				console.log('this.staffLists', this.staffLists)
			}
			else {
				this.userType = 'all';
				this.userLists = res;
				console.log('this.userLists', this.userLists)
			}
			setTimeout(() => {
		        this.blockUI.stop(); // Stop blocking
		    }, 300);
	    }, err => {
	    	console.log(err)
	    })
	}

	clickTab(type){
	    if(type == 'customer'){
	    	this.userType = 'customer';
	        this.getAllUsers('customer');
	    }else if(type == 'staff'){
	    	this.userType = 'staff';
	        this.getAllUsers('staff');
	    }else{
	    	this.userType = 'all';
	    	this.getAllUsers('');
	    }
	  }

	copyText(id){
		console.log(id)
		const inputElement = document.getElementById(id);
		(<any>inputElement).select();
		document.execCommand('copy');
		inputElement.blur();
	}

	getAllpermission(){
		this._service.getAllPermission(this.regionID)
		.subscribe((res:any) => {
			this.permissionLists = res;
			console.log('this.permissionLists', this.permissionLists)
		})
	}

	getAllLocation(){
		this._service.getLocations(this.regionID)
		.subscribe((res:any) =>{
			this.locationLists = res;
			console.log('this.locationLists', this.locationLists)
		})
	}

	validateEmail(data){
		console.log(data)
		this.atLeastOneMail = false;
		if( !this.isValidateEmail(data)) { 
			this.emailAlert = true;
		}
		else {
			this.emailAlert = false;
		}
		
	}

	validateGuarmail(gData){
		console.log(gData)
		this.atLeastOneMail = false;
		if(!this.isValidateEmail(gData)) { 
			this.guardianAlert = true;
		}
		else {
			this.guardianAlert = false;
		}	
	}

	isValidateEmail($email) {
	  var emailReg = /^([A-Za-z0-9\.\+])+\@([A-Za-z0-9\.])+\.([A-Za-z]{2,4})$/;
	  if($email != ''){
	  	return emailReg.test( $email );
	  }
	  else {
	  	return true;
	  }	
	}

	goCreateForm(){
		this.showFormCreate = true;
		console.log('create')
	}

	back(){
		console.log('back')
		this.showFormCreate = false;
	}


}

