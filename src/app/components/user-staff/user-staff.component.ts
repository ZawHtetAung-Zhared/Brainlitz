import { Component, OnInit, ViewChild, HostListener,ViewContainerRef, Pipe, PipeTransform, AfterViewInit } from '@angular/core';
import { appService } from '../../service/app.service';
import { ImageCropperComponent } from 'ng2-img-cropper/src/imageCropperComponent';
import { CropperSettings } from 'ng2-img-cropper/src/cropperSettings';
import { Croppie } from 'croppie';
import { Bounds } from 'ng2-img-cropper/src/model/bounds';
import { Staff } from './staff';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastsManager } from 'ng5-toastr/ng5-toastr';
declare var $: any;
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-staff',
  templateUrl: './user-staff.component.html',
  styleUrls: ['./user-staff.component.css']
})
export class UserStaffComponent implements OnInit {
	public returnProfile: boolean = false;
	public isCrop: boolean = false;
	public locationName: any;
	public permissionType: any;
	public staffPermission:any = [];
	public staffDemo:any = [];
	public orgID = localStorage.getItem('OrgId');
  	public regionID = localStorage.getItem('regionId');
  	public staffLists: Array<any> = [];
  	showFormCreate: boolean = false;
  	isPasswordChange: boolean = false;
  	emailAlert: boolean = false;
  	public permissionCount: boolean = false;
  	public hideMenu: boolean = false;
  	public img: any;
  	public ulFile: any;
  	permissionLists: any;
  	// formFields: Staff = new Staff();
  	formFields:any = {};
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
	public showStaffDetail:boolean = false;
	public staffDetail:any ={};
	isSearch:boolean = false;
	searchword:any;
	usertype:any;
	result:any;
	public customFields:any = [];

	constructor(private _service: appService, public toastr: ToastsManager, vcr: ViewContainerRef,  private router: Router) {
		this.toastr.setRootViewContainerRef(vcr);  		
   	}

  	ngOnInit() {
  		this.blankCrop = false; 
		this.locationName = localStorage.getItem('locationName');
  		this._service.permissionList.subscribe((data) => {
		  if(this.router.url === '/staff'){
		    this.permissionType = data;
		    this.checkPermission();
		  }
		});
  	}

  	ngAfterViewInit() {
		this.staffDetail = {
			'user': {
				'about': ''
			}
		}
	}

	checkPermission(){
		console.log(this.permissionType)
		this.staffPermission = ['CREATESTAFFS','EDITSTAFFS','VIEWSTAFFS','DELETESTAFFS'];
		this.staffPermission = this.staffPermission.filter(value => -1 !== this.permissionType.indexOf(value));
		
		this.staffDemo['addStaff'] = (this.staffPermission.includes("CREATESTAFFS")) ? 'CREATESTAFFS' : '';
		this.staffDemo['editStaff'] = (this.staffPermission.includes("EDITSTAFFS")) ? 'EDITSTAFFS' : '';
		this.staffDemo['viewStaff'] = (this.staffPermission.includes("VIEWSTAFFS")) ? 'VIEWSTAFFS' : '';
		this.staffDemo['deleteStaff'] = (this.staffPermission.includes("DELETESTAFFS")) ? 'DELETESTAFFS' : '';

		if(this.staffPermission.includes('VIEWSTAFFS') != false){			
			this.locationName = localStorage.getItem('locationName');
			this.getAllUsers('staff', 20, 0);
			this.getAllpermission();
		}else{
	      console.log('permission deny')
	      this.staffLists = [];
	    }
	}

	getSingleInfo(ID){
		console.log(ID);
		console.log(this.isCrop);
		this.isCrop = false;
		this.staffLists = [];
		this.getSingleUser(ID);
	}

	getSingleUser(ID){
		console.log(this.formFields.details)
		this._service.editProfile(this.regionID, ID)
    	.subscribe((res:any) => {
  			console.log("SingleUser",res);
  			this.formFields = res;
  			this.isupdate = true;
  			this.returnProfile = res.profilePic;
  			// console.log('~~~', this.returnProfile)
  			this.showStaffDetail = false;
			this.goCreateForm('edit');
	    }, err => {	
	    	console.log(err);
	    });
	}

	changePassword(state){
		this.isPasswordChange = !state;
	}

  	showMore(type: any, skip: any){
  		console.log(skip)
  		// this.getAllUsers(type, 20, skip);
  		if(this.isSearch == true){
			console.log("User Search");
			this.userSearch(this.searchword, this.usertype, 20, skip)
		}else{
			console.log("Not user search")
			this.getAllUsers(type, 20, skip);
		}
  	}

	userSearch(searchWord, userType, limit, skip){
		this.searchword = searchWord;
		this.usertype = userType;
		console.log('hi hello');
		if(skip == '' && limit == ''){
			console.log("First time search")
			var isFirst = true;
			limit = 20;
			skip = 0;
		}

		if(searchWord.length != 0){
			this.isSearch = true;
			this._service.getSearchUser(this.regionID, searchWord, userType, limit, skip)
	        .subscribe((res:any) => {
	          console.log(res);
	          // this.staffLists = res;
	          this.result = res;
				if(isFirst == true){
					console.log("First time searching");
					this.staffLists = [];
					this.staffLists = res;
				}else{
					console.log("Not First time searching")
					this.staffLists = this.staffLists.concat(res);
				}	
	        }, err => {  
	          console.log(err);
	        });
	    }else{
	    	this.staffLists = [];
	    	this.getAllUsers('staff',20,0);
	    	this.isSearch = false;
	    }
	}

  	getAllUsers(type, limit, skip){
  		this.blockUI.start('Loading...');		
		this._service.getAllUsers(this.regionID, type, limit, skip)
		.subscribe((res:any) => {
			this.blockUI.stop();
			this.result = res;
			this.staffLists = this.staffLists.concat(res);
			// this.staffLists = res;
			console.log('this.staffLists', this.staffLists)
	    }, err => {
	    	this.blockUI.stop();
	    	console.log(err)
	    })
	}

	goCreateForm(type){
		this.staffLists = [];
		this.showFormCreate = true;
		this.permissionCount = false;
		this.hideMenu = true;
		this.isCrop = false;
		console.log('create')
		setTimeout(function() {
	      $(".frame-upload").css('display', 'none');
	    }, 10);
	    if(type == 'create' || !this.formFields.details){
	    	console.log("CREATE")
	    	this.getCustomFields('create');
	    }else{
	    	this.getCustomFields('update');
	    }
	}

	getCustomFields(type){
		console.log('call getcustom fields')
		this._service.getAllFields(this.regionID)
		.subscribe((res:any) => {
			console.log("Custom Field",res);
			this.customFields = res.userInfoPermitted;
			for (var i = 0; i < this.customFields.length; i++) {
				console.log("^^i",this.customFields[i]);
				// var fieldName = this.customFields[i].name.toLowerCase();
				// console.log("^^Test^^",fieldName);
				this.customFields[i]["value"] = null;
				console.log("test--",this.customFields);
				if(type == 'create'){
					console.log("No detail fields in Res")
					this.customFields[i]["value"] = null;
					console.log("name----",this.customFields);
				}else{
					console.log("EDIT RES",this.customFields[i]._id);
					var findId = this.customFields[i]._id;
					var test = this.formFields.details.filter(item=> item.permittedUserInfoId == findId);
					console.log("Test",test);
					if(test.length>0){
						console.log("value",test[0].value);
						this.customFields[i]["value"] = test[0].value;
					}
					console.log(this.formFields.details);
				}
			}
		})
	}

	focusMethod(e, status, word){
		// this.wordLength = word.length;
		// $('.limit-wordcount').show('slow'); 
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
		  // $('.limit-wordcount').hide('slow'); 
		  // this.wordLength = 0;
		  console.log('blur', e);
		    if(status == 'name'){
		      $('.limit-wordcount').hide('slow'); 
		    }else{
		      $('.limit-wordcount1').hide('slow'); 
		    }
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
		console.log(obj);

		this.formFields.details = [];
		for(var i=0; i<this.customFields.length; i++){
			console.log('field value',this.customFields[i].value);
			if(this.customFields[i].value){
				var fieldObj:any = {};
				fieldObj = {
					"permittedUserInfoId": this.customFields[i]._id,
					"value": this.customFields[i].value
				}
				console.log("fieldObj",fieldObj);
				this.formFields.details.push(fieldObj);
			}
		}	
		console.log("formFields details",this.formFields.details);

		let objData = new FormData();
		let locationObj = [{'locationId': this.locationID,'permissionId': obj.permission}];
		
		objData.append('orgId', this.orgID),
		objData.append('regionId', this.regionID),
		objData.append('fullName', obj.fullName)
		objData.append('preferredName', obj.preferredName),
		objData.append('email', obj.email),
		objData.append('password', obj.password),
		obj.about = (obj.about == undefined) ? '' : obj.about;
		objData.append('about', obj.about);

		// objData
		if(this.formFields.details.length>0){
			console.log("Has Details",this.formFields.details)
			objData.append('details', JSON.stringify(obj.details));
		}

		if(state == 'create'){
			objData.append('location', JSON.stringify(locationObj))
			let getImg = document.getElementById("blobUrl");
			this.img = (getImg != undefined) ? document.getElementById("blobUrl").getAttribute("src") : obj.profilePic;			
			if(this.img != undefined){
				this.ulFile = this.dataURItoBlob(this.img)
				objData.append('profilePic', this.ulFile)
			}
			console.log('create')
			this.blockUI.start('Loading...');
			this._service.createUser(objData,this.locationID)
	    	.subscribe((res:any) => {
	  			console.log(res)
	  			this.toastr.success('Successfully Created.');
		  		this.blockUI.stop();
		  		this.back();
		    }, err => {		    	
		    	this.blockUI.stop();
		    	// if(err.message == 'Http failure response for http://dev-app.brainlitz.com/api/v1/signup: 400 Bad Request'){
		    	// 	this.toastr.error('Email already exist');
		    	// }
		    	// else {
		    	// 	this.toastr.error('Create Fail');
		    	// }
		    	// console.log(err)
		    	console.log(err.status)
		    	if(err.status == 400){
		    		this.toastr.error('Email already exist');
		    	}else{
		    		this.toastr.error('Create Fail');
		    	}
		    })
		}else{
			this.blockUI.start('Loading...');
			let getImg = document.getElementsByClassName("circular-profile");			
			if(getImg != undefined){
				$(".circular-profile img:last-child").attr("id", "blobUrl");
			}
			this.img = (getImg != undefined) ? document.getElementById("blobUrl").getAttribute("src") : obj.profilePic;			
			console.log('~~~> ',this.img)
			console.log('==== ',this.isCrop)

			this.ulFile = (this.isCrop == true) ? this.dataURItoBlob(this.img) : this.img;
			
			if(this.ulFile != undefined){
				objData.append('profilePic', this.ulFile)
			}
			console.log('update')
			this._service.updateUser(this.regionID, this.locationID, this.editId, objData)
	    	.subscribe((res:any) => {
	  			console.log(res)
	  			this.toastr.success('Successfully Updated.');
		  		this.blockUI.stop();
		  		this.backToDetails();
		    }, err => {
		    	this.toastr.error('Update Fail');
		    	this.blockUI.stop();
		    	console.log(err);
		    })
		}
	}

	back(){
		this.isPasswordChange = false;
		this.hideMenu = false;
		this.formFields = new Staff();
		this.isupdate = false;
		console.log('back')
		this.showFormCreate = false;
		this.blankCrop = false;
		this.imgDemoSlider = false;
		this.isSearch = false;
		$(".frame-upload").css('display', 'none');
		this.staffLists = [];
		if(this.staffPermission.includes('VIEWSTAFFS') != false){					
			this.getAllUsers('staff', 20, 0);
		}
	}	

	backToDetails(){
		this.isPasswordChange = false;
		this.hideMenu = false;
		this.formFields = new Staff();
		this.showFormCreate = false;
		this.blankCrop = false;
		this.imgDemoSlider = false;
		$(".frame-upload").css('display', 'none');
		this.staffLists = [];
		this.showDetails(this.staffDetail.user, this.staffDetail.user.userId);
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
	    if(window.pageYOffset > 81){
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
	    if (this.input.size <= 477732 && this.input) {
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
	    }else{
	    	console.log('file size is too large')
	    	this.toastr.error('file size is too large');
	      	this.validProfile = false;
			this.imgDemoSlider = false;
			$(".frame-upload").css('display', 'none');
	    }
  	}

  	cropResult(modal) {
  		this.validProfile = true;
  		this.isCrop = true;
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
		this.hideMenu = true;
		$(".frame-upload").css('display', 'none');
	}

	showDetails(data,ID){
		this.isPasswordChange = false;
		this.staffLists = [];
		this.editId = ID;
		console.log("show Staff details", data);
		console.log(ID);
		this.blockUI.start('Loading...');
		this.showStaffDetail = true;
		this._service.getUserDetail(this.regionID,data.userId,this.locationID)
		.subscribe((res:any) => {
			this.staffDetail = res;
			console.log("StaffDetail",res);
			setTimeout(() => {
				this.blockUI.stop();
			}, 100);
		}, err => {
	        this.blockUI.stop();
	        console.log(err)
      	})
	}

	backToStaff(){
		this.hideMenu = false;
		// this.formFieldc = new customer();
		this.showStaffDetail = false;
		this.isupdate = false;
		this.showFormCreate = false;
		this.blankCrop = false;
		this.imgDemoSlider = false;
		this.isSearch = false;
		// this.selectedId =[];
		
		$(".frame-upload").css('display', 'none');
		this.staffLists = [];
		console.log(this.staffLists)
		this.getAllUsers('staff', 20, 0);
	}

}
