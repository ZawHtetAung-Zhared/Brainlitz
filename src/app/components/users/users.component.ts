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
  	public navIsFixed: boolean = false;
  	public isCreateFix: boolean = false;
  	atLeastOneMail: boolean = false;
  	imgDemoSlider: boolean = false;
  	public showCustDetail:boolean = false;
  	public custDetail:any;
  	public testGurdian=[
	  	{
	  		"name": "Garry Nixon",
	  		"profilePic": "https://brainlitz-dev.s3.amazonaws.com/profile/153260270582761976369_original.jpg"
	  	},
	  	{
	  		"name": "Massie William",
	  		"profilePic": "https://brainlitz-dev.s3.amazonaws.com/profile/153260270582761976369_original.jpg"
	  	}
  	];
  	public testClasses = [
  		{
  			"name": "Beginner Piano Course",
  			"location": "Bedok Centre",
  			"time": {
  				"repeatDay": "Sunday",
  				"start": "10:00AM",
  				"end": "11:00AM"
  			},
  			"startDate": "12 Jul 18",
  			"endDate": "22 Sept 18"
  		},
  		{
  			"name": "Beginner Piano Course2",
  			"location": "Bedok Centre",
  			"time": {
  				"repeatDay": "Sunday",
  				"start": "10:00AM",
  				"end": "11:00AM"
  			},
  			"startDate": "12 Jul 18",
  			"endDate": "22 Sept 18"
  		},
  		{
  			"name": "Beginner Piano Course3",
  			"location": "Bedok Centre",
  			"time": {
  				"repeatDay": "Sunday",
  				"start": "10:00AM",
  				"end": "11:00AM"
  			},
  			"startDate": "12 Jul 18",
  			"endDate": "22 Sept 18"
  		}
  	];
  	public testActivities = [
  		{
  			"activity": "Emma Watson fully payed for Piano Grade 1",
  			"time": "7 jun 18, 1:30 PM",
  		},
  		{
  			"activity": "Arron Wamsley enrolled Piano Grade 1 class",
  			"time": "7 jun 18, 1:30 PM"
  		},
  		{
  			"activity": "Your mailing list lets you contact customers or visitors who have …",
  			"time": "7 jun 18, 1:30 PM"
  		},
  		{
  			"activity": "Arron Wamsley enrolled Piano Grade 1 class",
  			"time": "7 jun 18, 1:30 PM"
  		},
  		{
  			"activity": "Emma Watson fully payed for Piano Grade 1",
  			"time": "7 jun 18, 1:30 PM",
  		},
  		{
  			"activity": "Arron Wamsley enrolled Piano Grade 1 class",
  			"time": "7 jun 18, 1:30 PM"
  		},
  		{
  			"activity": "Your mailing list lets you contact customers or visitors who have …",
  			"time": "7 jun 18, 1:30 PM"
  		},
  		{
  			"activity": "Arron Wamsley enrolled Piano Grade 1 class",
  			"time": "7 jun 18, 1:30 PM"
  		}
  	];
  	public testParagraph = "Make it easier for recruiters and hiring managers to quickly understand your skills and experience. skil test test test";
  	public showMore = false;
  	public seeAll = false;
  	public wordLength:any;

	constructor(private modalService: NgbModal, private _service: appService, public toastr: ToastsManager, vcr: ViewContainerRef) { 	
	}


	ngOnInit() {
		this.blankCrop = false; 
		this.getAllUsers('customer');
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

	focusMethod(e){
		console.log('hi', e)
		$('.limit-wordcount').show('slow'); 
	}
	  
	blurMethod(e){
		console.log('blur', e);
		$('.limit-wordcount').hide('slow'); 
	}

	changeMethod(val : string){
		console.log(val)
		this.wordLength = val.length;
	}

	createUser(obj, apiState){
		console.log(obj)		
		this.atLeastOneMail = false;		
		let objData = new FormData();
		let getImg = document.getElementById("blobUrl");		
		let guardianArray;
		this.img = (getImg != undefined) ? document.getElementById("blobUrl").getAttribute("src") : this.img = '';
		guardianArray = (obj.guardianmail) ? obj.guardianmail.split(',') : '' ;
		this.atLeastOneMail = (!obj.guardianmail && !obj.emailaddress) ? true : false;
		obj.emailaddress = (obj.emailaddress == undefined) ? '' : obj.emailaddress;

		objData.append('regionId', this.regionID);
		objData.append('orgId', this.orgID);
		objData.append('firstName', obj.firstname);
		objData.append('lastName', obj.lastname);
		objData.append('preferredName', obj.preferredname);
		objData.append('email', obj.emailaddress)		
		objData.append('password', obj.password);
		objData.append('gender', obj.gender);
		objData.append('guardianEmail', JSON.stringify(guardianArray));
		objData.append('location', JSON.stringify([]));
		objData.append('profilePic', this.img)
		console.log(objData)

		if(apiState == 'create'){
			console.log('create')
			this.blockUI.start('Loading...');
			this._service.createUser(objData)
	    	.subscribe((res:any) => {
	  			console.log(res)
	  			this.toastr.success('Successfully Created.');
		  		this.blockUI.stop();
		  		this.back();
		  		this.getAllUsers('customer');
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
			this._service.updateUser(this.regionID,this.editId, objData)
	    	.subscribe((res:any) => {
	  			console.log(res)
	  			this.toastr.success('Successfully Created.');
		  		this.blockUI.stop();
		  		this.getAllUsers('customer');
		    }, err => {
		    	this.toastr.error('Create Fail');
		    	this.blockUI.stop();
		    	console.log(err)
		    })
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

	getAllUsers(type){
		this.blockUI.start('Loading...');		
		this._service.getAllUsers(this.regionID, type)
		.subscribe((res:any) => {			
			this.customerLists = res;
			console.log('this.customerLists', this.customerLists)			
			setTimeout(() => {
		        this.blockUI.stop(); // Stop blocking
		    }, 300);
	    }, err => {
	    	console.log(err)
	    })
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
		setTimeout(function() {
	      $(".frame-upload").css('display', 'none');
	    }, 10);
	}

	back(){
		this.formFieldc = new customer();
		console.log('back')
		this.showFormCreate = false;
		this.blankCrop = false;
		this.imgDemoSlider = false;
		$(".frame-upload").css('display', 'none');
	}

	uploadCropImg($event: any) {
		console.log('hihi')
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
  		console.log(self.input);

	    this.imgDemoSlider = false;
	    setTimeout(function() {
	      $(".circular-profile img:last-child").attr("id", "blobUrl");
	      $(".frame-upload").css('display', 'none');
	      this.blankCrop = false;
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
		this.imgDemoSlider = false;
		$(".frame-upload").css('display', 'none');
	}

	showDetails(data){
		console.log("show details",data)
		this.showCustDetail = true;
		this.custDetail = data;
		this._service.getUserDetail(this.regionID,data.userId)
		.subscribe((res:any) => {
			console.log("result",res)	
		})
	}

	backToCustomer(){
		this.formFieldc = new customer();
		this.showCustDetail = false;
		this.showFormCreate = false;
		this.blankCrop = false;
		this.imgDemoSlider = false;
		$(".frame-upload").css('display', 'none');
	}
	showMoreClasses(){
		console.log("show More")
		this.showMore = true;
	}
	showAll(){
		this.seeAll = true;
	}

}

