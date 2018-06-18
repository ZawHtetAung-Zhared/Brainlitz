import { Component, OnInit, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
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
	modalReference: any;
	closeResult: any;
	imageUrl: any;
	public showLoading: boolean = false;
	@BlockUI() blockUI: NgBlockUI;

	constructor(private modalService: NgbModal, private _service: appService, public toastr: ToastsManager, vcr: ViewContainerRef) { 
	    this.cropperSettings1 = new CropperSettings();
	    this.cropperSettings1.rounded = true;
	    this.cropperSettings1.noFileInput = true;
	    this.cropperSettings1.cropperDrawSettings.strokeColor = "rgba(255,0,0,1)";
	    this.cropperSettings1.cropperDrawSettings.strokeWidth = 2;
	    this.toastr.setRootViewContainerRef(vcr);
	}


	ngOnInit() {
		this.getAllUsers();
	}

	open1(staffModal){
		this.blankCrop = false; 
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

	createUser(obj, type){
		console.log(obj);
		console.log(type);
		this.imageUrl = document.getElementById("blobUrl").getAttribute("src");
		this.img = this.dataURItoBlob(this.imageUrl);
		console.log(this.img);

		let dataObj = new FormData();
		dataObj.append('orgId', this.orgID);
		dataObj.append('firstName', obj.fname);
		dataObj.append('lastName', obj.lname);
		dataObj.append('preferredName', obj.dname);
		dataObj.append('email', obj.mail);
		dataObj.append('regionId', this.regionID);
		dataObj.append('password', obj.pwd);
		dataObj.append('gender', obj.gender);
		dataObj.append('type', obj.type);
		dataObj.append('guardianEmail', obj.guardianmail);
		dataObj.append('profilePic', this.img);

		console.log(dataObj)

		//let Obj = {
		//	"orgId": this.orgID,
		//	"firstName": obj.fname,
		//	"lastName": obj.lname,
		//	"preferredName": obj.dname,
		//	"email": obj.mail,
		//	"regionId": this.regionID,
		//	"password": obj.pwd,
		//	"gender": obj.gender,
		//	"type": obj.type,
		//	"guardianEmail": obj.guardianmail,
		//	"profilePic": this.img
		//}
		this.blockUI.start('Loading...');
		this.modalReference.close();
		this._service.createUser(dataObj)
    	.subscribe((res:any) => {
  			console.log(res)
  			this.toastr.success('Successfully Created.');
	  		this.blockUI.stop();
	  		this.getAllUsers();
	  		console.log(this.userLists)
	    }, err => {
	    	this.toastr.error('Create Fail');
	    	this.blockUI.stop();
	    	console.log(err)
	    })
    		
	}

	getAllUsers(){
		console.log('get all')
		this.blockUI.start('Loading...');
		this._service.getAllUsers(this.regionID)
		.subscribe((res:any) => {
			this.userLists = res;
			setTimeout(() => {
		        this.blockUI.stop(); // Stop blocking
		    }, 300);
			console.log(this.userLists)
	    }, err => {
	    	console.log(err)
	    })
	}

	copyText(id){
		 const inputElement = document.getElementById(id);
		  (<any>inputElement).select();
		  document.execCommand('copy');
		  inputElement.blur();
	}

}

