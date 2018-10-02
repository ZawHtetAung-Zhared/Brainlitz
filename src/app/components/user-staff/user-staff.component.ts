import { Component, OnInit, ViewChild, HostListener,ViewContainerRef, Pipe, PipeTransform } from '@angular/core';
import { appService } from '../../service/app.service';
import { ImageCropperComponent } from 'ng2-img-cropper/src/imageCropperComponent';
import { CropperSettings } from 'ng2-img-cropper/src/cropperSettings';
import { Croppie } from 'croppie';
import { Bounds } from 'ng2-img-cropper/src/model/bounds';
import { Staff } from './staff';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastsManager } from 'ng5-toastr/ng5-toastr';
import { environment } from '../../../environments/environment';
declare var $: any;

@Component({
  selector: 'app-user-staff',
  templateUrl: './user-staff.component.html',
  styleUrls: ['./user-staff.component.css']
})
export class UserStaffComponent implements OnInit {
	public orgID = environment.orgID;
  	public regionID = localStorage.getItem('regionId');
  	public staffLists: Array<any> = [];
  	showFormCreate: boolean = false;
  	emailAlert: boolean = false;
  	public permissionCount: boolean = false;
  	public img: any;
  	public ulFile: any;
  	permissionLists: any;
  	formFields: Staff = new Staff();
  	@BlockUI() blockUI: NgBlockUI;
  	@ViewChild("cropper", undefined)
	cropper: ImageCropperComponent;
	resetCroppers: Function;
	cropperSettings1: CropperSettings;
	input: any;
	uploadCrop: any;
	blankCrop: boolean = false;
	validProfile: boolean = false;  	
	isupdate: boolean = false;  	
	imgDemoSlider: boolean = false;
	isSticky: boolean = false;
	public navIsFixed: boolean = false;
	public isCreateFix: boolean = false;
	// public atLeastOneMail: boolean = false;
	permissionId: any;
	editId: any;
	public locationID = localStorage.getItem('locationId');
	public wordLength:any = 0;
	public aboutTest = "Owns Guitar & PianoOwns Guitar & PianoOwnsijii";
	public aboutTest1 = " How your call you or like your preferred name kuiui";

	constructor(private _service: appService, public toastr: ToastsManager, vcr: ViewContainerRef) {
		this.toastr.setRootViewContainerRef(vcr);  		
   	}

  	ngOnInit() {
  		this.getAllUsers('staff', 20, 0);
  		this.blankCrop = false; 
		this.getAllpermission();
  	}

  	showMore(type: any, skip: any){
  		console.log(skip)
  		this.getAllUsers(type, 20, skip)
  	}

	userSearch(searchWord, userType){
		if(searchWord.length != 0){
			this._service.getSearchUser(this.regionID, searchWord, userType)
        .subscribe((res:any) => {
          console.log(res);
          this.staffLists = res;
        }, err => {  
          console.log(err);
        });
	    }else{
	    	this.staffLists = [];
	    	this.getAllUsers('staff',20,0);
	    }
	}

  	getAllUsers(type, limit, skip){
  		this.blockUI.start('Loading...');		
		this._service.getAllUsers(this.regionID, type, limit, skip)
		.subscribe((res:any) => {
			this.blockUI.stop();
			this.staffLists = this.staffLists.concat(res);
			// this.staffLists = res;
			console.log('this.staffLists', this.staffLists)
	    }, err => {
	    	this.blockUI.stop();
	    	console.log(err)
	    })
	}

	goCreateForm(){
		this.staffLists = [];
		this.showFormCreate = true;
		console.log('create')
		setTimeout(function() {
	      $(".frame-upload").css('display', 'none');
	    }, 10);
	    this.getAllpermission();
	}

	focusMethod(e, word){
		this.wordLength = word.length;
		$('.limit-wordcount').show('slow'); 
	}
	  
	blurMethod(e){
		  $('.limit-wordcount').hide('slow'); 
		  this.wordLength = 0;
	}

	changeMethod(val : string){
	    this.wordLength = val.length;
	  }

	validateEmail(data){
		console.log(data);		
		this.emailAlert = ( !this.isValidateEmail(data)) ? true : false;
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

	createUser(obj, state){
		console.log(obj)	
		let objData = new FormData();
		let locationObj = [{'locationId': this.locationID,'permissionId': obj.permission}];
		
		objData.append('orgId', this.orgID),
		objData.append('regionId', this.regionID),
		objData.append('firstName', obj.firstname),
		objData.append('lastName', obj.lastname),
		objData.append('preferredName', obj.preferredname),
		objData.append('email', obj.email),
		objData.append('password', obj.password),
		objData.append('location', JSON.stringify(locationObj)),
		obj.about = (obj.about == undefined) ? '' : obj.about;
		objData.append('about', obj.about)

		if(state == 'create'){
			let getImg = document.getElementById("blobUrl");
			this.img = (getImg != undefined) ? document.getElementById("blobUrl").getAttribute("src") : obj.profilePic;			
			if(this.img != undefined){
				this.ulFile = this.dataURItoBlob(this.img)
				objData.append('profilePic', this.ulFile)
			}
			console.log('create')
			this.blockUI.start('Loading...');
			this._service.createUser(objData)
	    	.subscribe((res:any) => {
	  			console.log(res)
	  			this.toastr.success('Successfully Created.');
		  		this.blockUI.stop();
		  		this.back();
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
		}else{
			console.log('update')
			this._service.updateUser(this.regionID, this.editId, objData)
	    	.subscribe((res:any) => {
	  			console.log(res)
	  			this.toastr.success('Successfully Created.');
		  		this.blockUI.stop();
		  		this.back();
		    }, err => {
		    	this.toastr.error('Create Fail');
		    	this.blockUI.stop();
		    	console.log(err)
		    })
		}
	}

	back(){
		this.formFields = new Staff();
		console.log('back')
		this.showFormCreate = false;
		this.blankCrop = false;
		this.imgDemoSlider = false;
		this.isupdate = false;
		$(".frame-upload").css('display', 'none');
		this.staffLists = [];
		this.getAllUsers('staff', 20, 0);
	}

	getAllpermission(){
		console.log('hi permission')
		this._service.getAllPermission(this.regionID)
		.subscribe((res:any) => {
			this.permissionLists = res;
			console.log('this.permissionLists', this.permissionLists)
		})
	}

	checkUser(id, e){
		console.log(e.target.checked)
		this.permissionCount = e.target.checked;
		console.log(this.permissionCount)
	    $("label").on("click",function() {
   			if($(this).find('input[type="radio"]').is(':checked')) { 
          	$('label').removeClass('radio-bg-active');
          	$(this).addClass('radio-bg-active');
        }
    });
	}

	@HostListener('window:scroll', ['$event']) onScroll($event){    
	    if(window.pageYOffset > 10){
	      this.isSticky = true;
	    }else{
	      this.isSticky = false;
	    }

	    if(window.pageYOffset > 40){
	      this.navIsFixed = true;
	      this.isCreateFix = true;

	    }else{
	      this.navIsFixed = false;
	      this.isCreateFix = false;
	    }
	}

	uploadCropImg($event: any) {
	    this.blankCrop = true; 
	    $(".frame-upload").css('display', 'block');
	    this.imgDemoSlider = true;
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
	      		$('.upload-demo').addClass('ready');
		        $uploadCrop.bind({
		            url: e.target.result
		        })
		          .then(function(e: any) {
		        });
	      	};
	      reader.readAsDataURL($event.target.files[0]);
	    }
  	}

  	cropResult(modal) {
  		this.validProfile = true;
	    let self = this;
	    this.imgDemoSlider = false;
	    setTimeout(function() {
	      $(".circular-profile img:last-child").attr("id", "blobUrl");
	      $(".frame-upload").css('display', 'none');
	      this.blankCrop = false;
	    }, 200);
	    var cropper = this.uploadCrop;
	    var BlobUrl = this.dataURItoBlob;
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
	        if (resp) {
	          	setTimeout(function() {
	        		$(".circular-profile img").remove();
	        		$(".circular-profile").append('<img src="' + resp + '" width="100%" />');
	           	}, 100);
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

	backToUpload(){
		this.validProfile = false;
		this.imgDemoSlider = false;
		$(".frame-upload").css('display', 'none');
	}

}
