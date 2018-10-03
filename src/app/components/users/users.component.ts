import { Component, OnInit, ElementRef, ViewChild, ViewContainerRef, HostListener, AfterViewInit } from '@angular/core';
import { FormsModule ,FormControl } from '@angular/forms';
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
	public img: any;
	public ulFile: any;
	public defaultSlice: number = 2;
	public orgID = environment.orgID;
	public regionID = localStorage.getItem('regionId');		
	formFieldc: customer = new customer();	
	@ViewChild("cropper", undefined)
	cropper: ImageCropperComponent;
	resetCroppers: Function;
	public isupdate: boolean = false;
	public isCrop: boolean = false;
	public returnProfile: boolean = false;
	input: any;
	uploadCrop: any;
	blankCrop: boolean = false;
	isSticky: boolean = false;
	modalReference: any;
	closeResult: any;
	
	public showLoading: boolean = false;
	@BlockUI() blockUI: NgBlockUI;
		
	customerLists: Array<any> = [];
	availableCourses: Array<any> = [];
	userType: any;
	permissionLists: any;
	locationLists: any;
	public locationID = localStorage.getItem('locationId');
	emailAlert: boolean = false;
	guardianAlert : boolean = false;
	notShowEdit: boolean = true;
	permissionId: any[] = [];
	editId: any;
	public personalMail: boolean = false;
	public updateButton: boolean = false;
  	public createButton: boolean = true;
  	showFormCreate: boolean = false;
  	public navIsFixed: boolean = false;
  	public isCreateFix: boolean = false;
  	public atLeastOneMail: boolean = false;
  	public atLeastGurMail:boolean = false;
  	validProfile: boolean = false;  	
  	imgDemoSlider: boolean = false;
  	public showCustDetail:boolean = false;
  	public isFous:boolean = false;
  	public custDetail:any = {};
  	public testParagraph = "Make it easier for recruiters and hiring managers to quickly understand your skills and experience. skil test test test";
  	public seeAll = false;
  	public wordLength:number = 0;
  	divHeight:any;

  	// enroll class
  	searchData: any={};
  	public courseLists: any={};

	constructor(private modalService: NgbModal, private _service: appService, public toastr: ToastsManager, vcr: ViewContainerRef) { 	
		this.toastr.setRootViewContainerRef(vcr);
	}


	ngOnInit() {
		this.blankCrop = false; 
		this.getAllUsers('customer', 20, 0);
	}

	ngAfterViewInit() {
		// this.custDetail = {
		// 	'user': 
		// }
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


	getSingleInfo(ID){
		console.log(ID);
		console.log(this.isCrop);
		this.isCrop = false;
		this.customerLists = [];
		this.getSingleUser(ID);
	}

	getSingleUser(ID){
		this._service.editProfile(this.regionID, ID)
    	.subscribe((res:any) => {
  			console.log(res);
  			this.formFieldc = res;
  			this.isupdate = true;
  			this.returnProfile = res.profilePic;
  			console.log('~~~', this.returnProfile)
  			this.showCustDetail = false;
			this.goCreateForm();
	    }, err => {	
	    	console.log(err);
	    });
	}

	focusMethod(e, word){
		console.log('hi', e);
		this.wordLength = word.length;
		$('.limit-wordcount').show('slow'); 
	}
	  
	blurMethod(e){
		console.log('blur', e);
		$('.limit-wordcount').hide('slow'); 
		this.wordLength = 0;
	}

	changeMethod(val : string){
		console.log(val);
		this.wordLength = val.length;
	}

	createUser(obj, apiState){
		console.log(obj);				
		let objData = new FormData();						
		let guardianArray;		
		console.log('~~~ ', obj.guardianEmail)
		console.log(typeof obj.guardianEmail)
		// if(typeof obj.guardianEmail == 'object'){
		// 	console.log(typeof obj.guardianEmail)
		// 	obj.guardianEmail = JSON.stringify(obj.guardianEmail);
		// }
		
		// this.atLeastOneMail = (!obj.guardianEmail && !obj.email) ? true : false;
		// console.log("TTT",this.atLeastOneMail)
		obj.email = (obj.email == undefined) ? [] : obj.email;
		objData.append('regionId', this.regionID);
		objData.append('orgId', this.orgID);
		objData.append('firstName', obj.firstName);
		objData.append('lastName', obj.lastName);
		objData.append('preferredName', obj.preferredName);
		objData.append('email', obj.email);

		obj.about = (obj.about == undefined) ? '' : obj.about;
		objData.append('about', obj.about);	

		this.customerLists = [];
		if(apiState == 'create'){
			let getImg = document.getElementById("blobUrl");
			this.img = (getImg != undefined) ? document.getElementById("blobUrl").getAttribute("src") : this.img = obj.profilePic;
			if(this.img != undefined){
				this.ulFile = this.dataURItoBlob(this.img)
				objData.append('profilePic', this.ulFile)
			}

			guardianArray = (obj.guardianEmail) ? obj.guardianEmail.split(',') : [] ;
			objData.append('guardianEmail', JSON.stringify(guardianArray));	
			objData.append('password', obj.password);
			objData.append('location', JSON.stringify([]));

			this.blockUI.start('Loading...');
			this._service.createUser(objData)
	    	.subscribe((res:any) => {
	  			console.log(res);
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
		    	console.log(err);
		    })
		}else{
			console.log('update');
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

			if(typeof obj.guardianEmail == 'object'){
				guardianArray = obj.guardianEmail
			}else{
				guardianArray = obj.guardianEmail.split(',')
			}

			console.log(obj.password)
			if(obj.password != undefined){
				console.log('hi')
				objData.append('password', obj.password);
			}

			guardianArray = (obj.guardianEmail) ? guardianArray : [] ;
			objData.append('guardianEmail', JSON.stringify(guardianArray));
			this.blockUI.start('Loading...');
			this._service.updateUser(this.regionID, obj.userId, objData)
	    	.subscribe((res:any) => {
	  			console.log(res);
	  			this.toastr.success('Successfully updated.');
		  		this.blockUI.stop();
		  		this.back();
		    }, err => {
		    	this.toastr.error('Update Fail');
		    	this.blockUI.stop();
		    	console.log(err);
		    })
		}
	}

	edit(id, type, modal){
		console.log(id);
		this.getAllpermission();
		this.blankCrop= true;
		this.notShowEdit = false;
		this.updateButton = true;
		this.createButton = false;
		this._service.userDetail(this.regionID, id)
		.subscribe((res:any) => {
			console.log('customer', res);
			this.formFieldc = res;
			//$("#upload-demo").append('<img src="' + res.profilePic + '" />');
			//$("#upload-demo img").css("width", "100%");
		})
		
	}

	showMore(type: any, skip: any){
		console.log(skip)
		this.getAllUsers(type, 20, skip)
	}

	getAllUsers(type, limit, skip){
		console.log('hihihihi')
		console.log('....', this.customerLists)
		this.blockUI.start('Loading...');		
		this._service.getAllUsers(this.regionID, type, limit, skip)
		.subscribe((res:any) => {	
			console.log(res)
			this.customerLists = this.customerLists.concat(res);		
			// this.customerLists = res;
			console.log('this.customerLists', this.customerLists);			
			setTimeout(() => {
		        this.blockUI.stop(); // Stop blocking
		    }, 300);
	    }, err => {
	    	this.blockUI.stop();
	    	console.log(err);
	    })
	}

	getAllpermission(){
		this._service.getAllPermission(this.regionID)
		.subscribe((res:any) => {
			this.permissionLists = res;
			console.log('this.permissionLists', this.permissionLists);
		})
	}

	// getAllLocation(){
	// 	this._service.getLocations(this.regionID, 20, 0, false)
	// 	.subscribe((res:any) =>{
	// 		this.locationLists = res;
	// 		console.log('this.locationLists', this.locationLists);
	// 	})
	// }

	validateEmail(data){
		
		console.log(data);
		// this.atLeastOneMail = false;		
		this.emailAlert = ( !this.isValidateEmail(data)) ? true : false;
		this.personalMail = ( this.isValidateEmail(data)) ? true : false;
		console.log(this.personalMail)
		this.atLeastOneMail = (this.emailAlert != true && data.length > 0) ? true : false;
		console.log('Email~~~ ', this.atLeastOneMail)
		
	}

	validateGuarmail(gData){		
		console.log(gData);
		// this.atLeastOneMail = false;	
		this.guardianAlert = (!this.isValidateEmail(gData)) ? true: false;
		this.atLeastGurMail = (this.guardianAlert != true && gData.length > 0) ? true : false;
		console.log('GurMail~~~ ', this.atLeastGurMail)
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
		this.isCrop = false;
		this.customerLists = [];
		this.showFormCreate = true;
		console.log('create');
		setTimeout(function() {
	      $(".frame-upload").css('display', 'none');
	    }, 10);
	}

	back(){
		this.formFieldc = new customer();
		this.isupdate = false;
		console.log('back');
		this.showFormCreate = false;
		this.blankCrop = false;
		this.imgDemoSlider = false;
		$(".frame-upload").css('display', 'none');
		this.customerLists = [];
		this.getAllUsers('customer', 20, 0);
	}

	uploadCropImg($event: any) {
		console.log('hihi');
		var image:any = new Image();
	    this.blankCrop = true; 
	    $(".frame-upload").css('display', 'block');
	    this.imgDemoSlider = true;
	    $("#upload-demo img:first").remove();
	    this.input = $event.target.files[0];
	    if (this.input) {
	      	if (this.input && this.uploadCrop) {
	        	this.uploadCrop.destroy();
	      	}
	      	var reader:FileReader = new FileReader();
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
          console.log('$uploadCrop', $uploadCrop)
          reader.onload = function (e: any) {
              $('.upload-demo').addClass('ready');
              $uploadCrop.bind({
                  url: e.target.result
              }).then(function(e:any){
              })
          }
	    	reader.readAsDataURL($event.target.files[0]);
	    }
  	}

  	cropResult(modal) {
  		this.validProfile = true;
  		this.isCrop = true;
	    let self = this;
  		console.log(self.input);

	    this.imgDemoSlider = false;
	    setTimeout(function() {
	      $(".circular-profile img:last-child").attr("id", "blobUrl");
	      $(".frame-upload").css('display', 'none');
	      this.blankCrop = false;
	    }, 200);
	    console.log(this.uploadCrop);
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
	    //   	console.log(resp)
	    //   	const blob = BlobUrl(resp);
					// const blobUrl = URL.createObjectURL(blob);
					// console.log(blobUrl)
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


	showDetails(data, ID){
		this.customerLists = [];
		console.log(ID);
		this.editId = ID;
		console.log("show details");
		// this.showCustDetail = true;
		this.showCustDetail = true;
		this._service.getUserDetail(this.regionID,data.userId)
		.subscribe((res:any) => {
			this.custDetail = res;
			console.log("CustDetail",res);
		})
	}

	backToCustomer(){
		this.formFieldc = new customer();
		this.showCustDetail = false;
		this.isupdate = false;
		this.showFormCreate = false;
		this.blankCrop = false;
		this.imgDemoSlider = false;
		this.selectedId =[];
		
		$(".frame-upload").css('display', 'none');
		this.customerLists = [];
		console.log(this.customerLists)
		this.getAllUsers('customer', 20, 0);
	}
	
	selectedId:any=[];
	sliceCount:any;
	showMoreItem(itemid){
		console.log(itemid);
		this.selectedId.push(itemid);
		console.log('selectedId Arr',this.selectedId);
		// if(itemid != 'activity'){
		// 	this.divHeight = $( ".firstCol" ).height();
		// 	console.log("divHeight",this.divHeight);
		// }
			this.divHeight = $( ".firstCol" ).height();
			console.log("divHeight",this.divHeight);
			// $(".journals-wrapper").css("height", this.divHeight + "px");
	}

	// enroll class

	clearSearch(){
		
	}

	userSearch(searchWord, userType){
		console.log('hi hello')
		if(searchWord.length != 0){
			this._service.getSearchUser(this.regionID, searchWord, userType)
        .subscribe((res:any) => {
          console.log(res);
          this.customerLists = res;
        }, err => {  
          console.log(err);
        });
    }else if(searchWord.length == 0){
    	console.log('zero', searchWord.length)
    	this.customerLists = [];
    	this.getAllUsers('customer',20,0);
    }
	}

	changeSearch(searchWord, userId){
		console.log(searchWord)
		if(searchWord.length != 0){
			this._service.getSearchAvailableCourse(this.regionID, searchWord, userId)
	      .subscribe((res:any) => {
	        console.log(res);
	        this.availableCourses = res;
	      }, err => {  
	        console.log(err);
	      });
	  }else if(searchWord.length == 0){
    	console.log('zero', searchWord.length)
    	this.availableCourses = [];
    	this.getAC(20, 0, userId)
    }
	}

	showMoreAC(skip, userId){
		console.log(skip)
		this.getAC(20, skip, userId);
	}

	callEnrollModal(enrollModal, userId){
		console.log(userId)
		this.modalReference = this.modalService.open(enrollModal, { backdrop:'static', windowClass: 'modal-xl d-flex justify-content-center align-items-center'});		
		this.getAC(20, 0, userId)
	}

	getAC(limit, skip, userId){
		this._service.getAvailabelCourse(this.regionID, userId, 20, 0)
	    .subscribe((res:any)=>{
	      console.log(res)
	      this.availableCourses = this.availableCourses.concat(res);
	    },err =>{
	      console.log(err);
	    });
	}

	enrollUser(courseId){
		console.log(this.custDetail);
		let body = {
		   'courseId': courseId,
		   'userId': this.custDetail.user.userId,
		   'userType': 'customer'
		}
		this._service.assignUser(this.regionID,body)
		  	.subscribe((res:any) => {
		     	console.log(res);
		     	this.toastr.success('Successfully Enrolled.');
		     	this.showDetails(this.custDetail.user, this.custDetail.user.userId);
		     	this.closeModel();
		     	// this.modalReference.close();
		     	// this.availableCourses = [];
		  	}, err => {  
		    	console.log(err);
		  	});
	}

	closeModel(){
		this.modalReference.close();
		this.availableCourses = [];
	}

	allCourseLists(){
		this._service.getAllCourse(this.regionID, 20, 0)
	    .subscribe((res:any)=>{
	    	this.courseLists = res;
	      console.log(res)
	    },err =>{
	      console.log(err);
	    });
	}

}

