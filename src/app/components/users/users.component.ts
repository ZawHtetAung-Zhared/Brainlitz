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
import * as moment from 'moment-timezone';
import { Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

	@ViewChild('stuffPic') stuffPic: ElementRef;	
	userid:any;
	acResult:any;
	public activePass: any = '';	
	public currentPassObj: any;
	public makeupLists: any;
	public passForm: any = {};
	public isChecked: any = '';
	public checkCourse: any = '';
	public lessonData: any;
	public activeTab: any;
	public hideMenu: boolean = false;
	public img: any;
	public ulFile: any;
	public defaultSlice: number = 2;
	public orgID = localStorage.getItem('OrgId');
	public regionID = localStorage.getItem('regionId');	
	public locationID = localStorage.getItem('locationId');	
	public locationName :any;	
	// formFieldc: customer = new customer();
	claimCourses:any = {};	
	formFieldc:any = {};	
	xxxx:any = {};	
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
	emailAlert: boolean = false;
	guardianAlert : boolean = false;
	notShowEdit: boolean = true;
	permissionId: any[] = [];
	editId: any;
	public personalMail: boolean = false;
	public updateButton: boolean = false;
  	public createButton: boolean = true;
  	showFormCreate: boolean = false;
  	addNewCustomer: boolean = false;
  	public navIsFixed: boolean = false;
  	public isCreateFix: boolean = false;
  	public atLeastOneMail: boolean = false;
  	public atLeastGurMail:boolean = false;
  	validProfile: boolean = false;  	
  	imgDemoSlider: boolean = false;
  	public showCustDetail:boolean = false;
  	public isFous:boolean = false;
  	public custDetail:any = {};
  	public wordLength:number = 0;
  	divHeight:any;
  	public customFields:any = [];
  	public customerPermission:any = [];
  	public customerDemo:any = [];

  	// enroll class
  	searchData: any={};
  	public courseLists: any={};
  	isSearch:boolean = false;
	searchword:any;
	usertype:any;
	result:any;
	isACSearch:boolean = false;
	acWord:any;
	public permissionType: any;

	/*for invoice*/
	public showInvoice:boolean = false;
	public currency = JSON.parse(localStorage.getItem('currency'));
	public logo:any = localStorage.getItem("OrgLogo");
	public showBox:boolean = false;
	public discount:number = 0;
	public value:any = {};
	public showMailPopup:boolean = false;
	public invoiceInfo:any;
	public invoice:any;
	public updatedDate;
	public dueDate;
	public invoiceID;
	public showPayment:boolean = false;
	public selectedPayment:any;
	public paymentItem:any = {};
	public invoiceCourse:any = {};
	public feesBox:boolean = false;
	public depositBox:boolean = false;
	public regBox:boolean = false;
	public prefixInvId:any;
	public token:any;
	public type:any;
	public paymentProviders:any;
	public refInvID:any;
	public invTaxName:any;
	public hideReg:boolean = false;
  	public hideDeposit:boolean = false;
  	public total:any;
  	public singleInv:any = [];
	public isEditInv:any = false;
	public updateInvData:any = {};
	public hideMisc:boolean = false; 
	public paymentId:any;

	constructor(private modalService: NgbModal, private _service: appService, public toastr: ToastsManager, vcr: ViewContainerRef, private router: Router) { 	
		this.toastr.setRootViewContainerRef(vcr);
	}


	ngOnInit() {
		setTimeout(() => {
			console.log('~~~', this.locationName)	
			this.locationName = localStorage.getItem('locationName');
	    }, 300);
		this.blankCrop = false; 
		this._service.permissionList.subscribe((data) => {
		  if(this.router.url === '/customer'){
		    this.permissionType = data;
		    this.checkPermission();
		  }
		});
		// this.selectedPayment = 'Cash';
	}

	ngAfterViewInit() {
		this.custDetail = {
			'user': {
				'about': ''
			},
			'courses': [
				{
					'name': '',
					'location':{
						'name': ''
					},
					'startDate': '',
					'duration':{
						'startDate': ''
					}
				}
			]
		}


		this.invoiceInfo = {
	      'companyName': '',
	      'tax':{
	        'name': ''
	      }
	    }
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

	checkPermission(){
		console.log(this.permissionType)
		this.customerPermission = ['CREATECUSTOMERS','VIEWCUSTOMERS','EDITCUSTOMERS','DELETECUSTOMERS','ENROLLCOURSE'];		
		this.customerPermission = this.customerPermission.filter(value => -1 !== this.permissionType.indexOf(value));
		
		
		this.customerDemo['createCustomer'] = (this.customerPermission.includes("CREATECUSTOMERS")) ? 'CREATECUSTOMERS' : '';
		this.customerDemo['viewCustomer'] = (this.customerPermission.includes("VIEWCUSTOMERS")) ? 'VIEWCUSTOMERS' : '';
		this.customerDemo['editCustomer'] = (this.customerPermission.includes("EDITCUSTOMERS")) ? 'EDITCUSTOMERS' : '';
		this.customerDemo['deleteCustomer'] = (this.customerPermission.includes("DELETECUSTOMERS")) ? 'DELETECUSTOMERS' : '';
		this.customerDemo['enrollStudent'] = (this.customerPermission.includes("ENROLLCOURSE")) ? 'ENROLLCOURSE' : '';
		

		if(this.customerPermission.includes('VIEWCUSTOMERS') != false){			
			this.getAllUsers('customer', 20, 0);
			this.locationName = localStorage.getItem('locationName');
		}else{
	      console.log('permission deny')
	      this.customerLists = [];
	    }
	}

	getSingleInfo(ID){
		console.log(ID);
		console.log(this.isCrop);
		this.isCrop = false;
		this.customerLists = [];
		// this.formFieldc.details = [];
		this.getSingleUser(ID);
	}

	getSingleUser(ID){
		console.log(this.formFieldc.details)
		this._service.editProfile(this.regionID, ID)
    	.subscribe((res:any) => {
  			console.log("SingleUser",res);
  			this.formFieldc = res;
  			this.isupdate = true;
  			this.returnProfile = res.profilePic;
  			console.log('~~~', this.returnProfile)
  			this.showCustDetail = false;
			this.goCreateForm('edit');
	    }, err => {	
	    	console.log(err);
	    });
	}

	getCustomFields(type){
		console.log('call getcustom fields')
		this._service.getAllFields(this.regionID)
		.subscribe((res:any) => {
			console.log("Custom Field",res);
			this.customFields = res.userInfoPermitted;
			for (var i = 0; i < this.customFields.length; i++) {
				console.log("^^i",this.customFields[i]);
				var fieldName = this.customFields[i].name.toLowerCase();
				console.log("^^Test^^",fieldName);
				if(type == 'create'){
					console.log("No detail fields in Res")
					this.customFields[i]["value"] = null;
					console.log("name----",this.customFields);
				}else{
					console.log("EDIT RES",this.customFields[i]._id);
					var findId = this.customFields[i]._id;
					var test = this.formFieldc.details.filter(item=> item.permittedUserInfoId == findId);
					console.log("Test",test);
					if(test.length>0){
						console.log("value",test[0].value);
						this.customFields[i]["value"] = test[0].value;
					}
					console.log(this.formFieldc.details);
					
				}
			}
		})
	}

	focusMethod(e, status, word){
	    if(status == 'name'){
	      this.wordLength = word.length;
	      $('.limit-wordcount').show('slow'); 
	    }else{
	      this.wordLength = word.length;
	      $('.limit-wordcount1').show('slow'); 
	    }
	}
	  
	blurMethod(e, status){
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

	createUser(obj, apiState){
		console.log(obj);
		this.formFieldc.details = [];
		//for custom fields
		for(var i=0; i<this.customFields.length; i++){
			console.log('field value',this.customFields[i].value);
			if(this.customFields[i].value){
				var fieldObj:any = {};
				fieldObj = {
					"permittedUserInfoId": this.customFields[i]._id,
					"value": this.customFields[i].value
				}
				console.log("fieldObj",fieldObj);
				this.formFieldc.details.push(fieldObj);
				// if(this.customFields[i].value.trim().length){
				// 	var fieldObj:any = {};
				// 	fieldObj = {
				// 		"permittedUserInfoId": this.customFields[i]._id,
				// 		"value": this.customFields[i].value
				// 	}
				// 	console.log("fieldObj",fieldObj);
				// 	this.formFieldc.details.push(fieldObj);
				// }
			}
		}	
		console.log("formFieldc details",this.formFieldc.details);
		
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
		objData.append('fullName', obj.fullName);
		objData.append('preferredName', obj.preferredName);
		objData.append('email', obj.email);	

		obj.about = (obj.about == undefined) ? '' : obj.about;
		objData.append('about', obj.about);	

		// if(detailsArr.length > 0){
		// 	console.log("Has Details",detailsArr);
		// 	objData.append('details', JSON.stringify(detailsArr));
		// }

		// objData
		if(this.formFieldc.details.length>0){
			console.log("Has Details",this.formFieldc.details)
			objData.append('details', JSON.stringify(obj.details));
		}	

		this.customerLists = [];

		console.log("Latest",objData)

		if(apiState == 'create'){
			let getImg = document.getElementById("blobUrl");
			this.img = (getImg != undefined) ? document.getElementById("blobUrl").getAttribute("src") : this.img = obj.profilePic;
			if(this.img != undefined){
				this.ulFile = this.dataURItoBlob(this.img)
				objData.append('profilePic', this.ulFile);
				console.log('profile pic',this.ulFile)
			}

			guardianArray = (obj.guardianEmail) ? obj.guardianEmail.split(',') : [] ;
			console.log('guardianArray',guardianArray);
			objData.append('guardianEmail', JSON.stringify(guardianArray));	
			objData.append('password', obj.password);
			objData.append('location', JSON.stringify([]));

			
			console.log("Data",objData)
			this.blockUI.start('Loading...');
			this._service.createUser(objData, this.locationID)
	    	.subscribe((res:any) => {
	  			console.log(res);
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
		    	console.log(err);
		    	console.log(err.status)
		    	if(err.status == 400){
		    		this.toastr.error('Email already exist');
		    	}else{
		    		this.toastr.error('Create Fail');
		    	}
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
			this._service.updateUser(this.regionID, this.locationID, obj.userId, objData)
	    	.subscribe((res:any) => {
	  			console.log(res);
	  			this.backToDetails();
	  			this.toastr.success('Successfully updated.');
		  		this.blockUI.stop();
		  		this.back();
		    }, err => {
		    	// this.toastr.error('Update Fail');
		    	this.blockUI.stop();
		    	console.log(err);
		    	if(err.status == 400){
		    		this.toastr.error('Email already exist');
		    	}else{
		    		this.toastr.error('Create Fail');
		    	}
		    })
		}
	}

	edit(id, type, modal){
		console.log(id);
		// this.getAllpermission();
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
		console.log(skip);
		if(this.isSearch == true){
			console.log("User Search");
			this.userSearch(this.searchword, this.usertype, 20, skip)
		}else{
			console.log("Not user search")
			this.getAllUsers(type, 20, skip);
		}
	}

	getAllUsers(type, limit, skip){
		console.log('calling all users ....')
		console.log('....', this.customerLists)
		this.blockUI.start('Loading...');		
		this._service.getAllUsers(this.regionID, type, limit, skip)
		.subscribe((res:any) => {	
			console.log(res);
			this.result = res;
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

	// getAllpermission(){
	// 	this._service.getAllPermission(this.regionID)
	// 	.subscribe((res:any) => {
	// 		this.permissionLists = res;
	// 		console.log('this.permissionLists', this.permissionLists);
	// 	})
	// }

	// getAllLocation(){
	// 	this._service.getLocations(this.regionID, 20, 0, false)
	// 	.subscribe((res:any) =>{
	// 		this.locationLists = res;
	// 		console.log('this.locationLists', this.locationLists);
	// 	})
	// }

	whateverEventHandler(e){
		console.log(e)
		this.validateEmail(e.target.value)
	}

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

	cancel(){
		this.addNewCustomer = false;
	}

	createNew(type){
		this.addNewCustomer = true;
	}

	goCreateForm(type){
		this.hideMenu = true;
		console.log("TYPE",type);
		this.isCrop = false;
		this.customerLists = [];
		this.showFormCreate = true;
		
		console.log('create');
		setTimeout(function() {
	      $(".frame-upload").css('display', 'none');
	    }, 10);

	    if(type == 'create' || !this.formFieldc.details){
	    	console.log("CREATE")
	    	this.getCustomFields('create');
	    }else{
	    	this.getCustomFields('update');
	    }
	}

	back(){
		this.hideMenu = false;
		this.formFieldc = new customer();
		this.isupdate = false;
		console.log('back');
		this.showFormCreate = false;	
		this.blankCrop = false;
		this.imgDemoSlider = false;
		$(".frame-upload").css('display', 'none');
		this.customerLists = [];
		if(this.customerPermission.includes('VIEWCUSTOMERS') != false){			
			this.getAllUsers('customer', 20, 0);
		}
	}

	backToDetails(){
		this.hideMenu = true;
		this.formFieldc = new customer();
		this.showFormCreate = false;
		this.blankCrop = false;
		this.imgDemoSlider = false;
		$(".frame-upload").css('display', 'none');
		this.customerLists = [];
		this.showDetails(this.custDetail.user.userId);
	}

	uploadCropImg($event: any) {
		console.log('hihi');
		var image:any = new Image();
	    this.blankCrop = true; 
	    $(".frame-upload").css('display', 'block');
	    this.imgDemoSlider = true;
	    $("#upload-demo img:first").remove();
	    this.input = $event.target.files[0];
	    console.log(this.input.size)
	    if (this.input.size <= 477732 && this.input) {
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
		console.log('menu should be hidden')
		this.hideMenu = true;
		this.validProfile = false;
		this.imgDemoSlider = false;
		$(".frame-upload").css('display', 'none');
	}


	showDetails(ID){
		this.activeTab = 'class';
		this.hideMenu = false;
		this.customerLists = [];
		console.log(ID);
		this.editId = ID;
		console.log("show details");
		const format = 'DD MMM YYYY';
		const zone = localStorage.getItem('timezone');
		// this.showCustDetail = true;
		this.showCustDetail = true;
		this._service.getUserDetail(this.regionID,ID, this.locationID)
		.subscribe((res:any) => {
			this.custDetail = res;
			console.log("CustDetail",res);
			for(var i = 0; i < this.custDetail.ratings.length; i++){
				var tempData = this.custDetail.ratings[i].updatedDate;
				var d = new Date(tempData);
				console.log(this.custDetail.ratings[i].updatedDate)
				this.custDetail.ratings[i].updatedDate = moment(d, format).tz(zone).format(format);
			}
		})
	}	

	backToCustomer(){
		this.hideMenu = false;
		console.log('back')
		this.formFieldc = new customer();
		this.showCustDetail = false;
		this.isupdate = false;
		this.showFormCreate = false;
		this.blankCrop = false;
		this.imgDemoSlider = false;
		this.selectedId =[];
		this.isSearch = false;
		
		$(".frame-upload").css('display', 'none');
		this.customerLists = [];
		console.log(this.customerLists)
		if(this.customerPermission.includes('VIEWCUSTOMERS') != false){			
			this.getAllUsers('customer', 20, 0);
		}
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
		// this.isSearch = false;
	}
	
	userSearch(searchWord, userType, limit, skip){
		this.searchword = searchWord;
		this.usertype = userType;
		console.log('hi hello');
		if(skip == '' && limit == ''){
			var isFirst = true;
			limit = 20;
			skip = 0;
		}
		this.customerLists = [];
		if(searchWord.length != 0){
			this.isSearch = true;
			console.log(userType)
			console.log(searchWord)
			this._service.getSearchUser(this.regionID, searchWord, userType, limit, skip, '')
		    .subscribe((res:any) => {
				console.log(res);
				this.result = res;
				if(isFirst == true){
					console.log("First time searching");
					this.customerLists = [];
					this.customerLists = res;
				}else{
					console.log("Not First time searching")
					this.customerLists = this.customerLists.concat(res);
				}	      
	      	}, err => {  
				console.log(err);
	      	});
	  	}else{
	    	console.log('zero', searchWord.length)
	    	setTimeout(() => {
	    		console.log('wait')
	    		this.customerLists = [];
	    		this.getAllUsers('customer',20,0);
	    		this.isSearch = false;
	    	}, 300);
	  	}
	}
	
	changeSearch(searchWord, userId, limit, skip){
		this.acWord = searchWord;
		this.userid = userId;	
		console.log(searchWord);
		console.log('userid',userId)
		if(skip == '' && limit == ''){
			console.log("First time search")
			var isFirst = true;
			limit = 20;
			skip = 0;
		}
		if(searchWord.length != 0){
			this.isACSearch = true
			this._service.getSearchAvailableCourse(this.regionID, searchWord, userId, limit, skip)
	      .subscribe((res:any) => {
	        console.log(res);
	        this.acResult = res;
	        // this.availableCourses = res;
	        if(isFirst == true){
					console.log("First time searching");
					this.availableCourses = [];
					this.availableCourses = res;
				}else{
					console.log("Not First time searching")
					this.availableCourses = this.availableCourses.concat(res);
				}
	      }, err => {  
	        console.log(err);
	      });
	  }else{
	    	console.log('zero', searchWord.length)
	    	this.availableCourses = [];
	    	this.getAC(20, 0, userId);
	    	this.isACSearch = false;
	  }
	}

	showMoreAC(skip, userId){
		console.log(skip)
		// this.getAC(20, skip, userId);
		if(this.isACSearch == true){
			console.log("AC Search");
			this.changeSearch(this.acWord, this.userid, 20, skip)
		}else{
			console.log("Not AC search")
			this.getAC(20, skip, userId);
		}
	}

	callEnrollModal(enrollModal, userId){
		console.log(userId)
		this.modalReference = this.modalService.open(enrollModal, { backdrop:'static', windowClass: 'modal-xl modal-inv d-flex justify-content-center align-items-center'});		
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

	enrollUser(course){
		console.log(this.custDetail);
		let courseId = course._id;
		let body = {
		   'courseId': course._id,
		   'userId': this.custDetail.user.userId,
		   'userType': 'customer'
		}
		this._service.assignUser(this.regionID,body,this.locationID)
		  	.subscribe((res:any) => {
		     	console.log(res);
		     	this.toastr.success('Successfully Enrolled.');
		     	// this.showDetails(this.custDetail.user.userId);
		     	// this.closeModel();
		     	/* for invoice*/
		     	this.showInvoice = true;
		     	this.invoiceInfo = res.invoiceSettings;
				this.invoice = res.invoice;
				this.showInvoice = true; 
				this.showOneInvoice(course,this.invoice)
				// for(var i in this.invoice){
				//  this.updatedDate = this.dateFormat(this.invoice[i].updatedDate);
				//  this.dueDate = this.dateFormat(this.invoice[i].dueDate);
				//  this.invoiceID = this.invoice[i]._id;
				//  this.refInvID = this.invoice[i].refInvoiceId;
				//  this.invTaxName = this.invoice[i].tax.name;
				//  var n = this.invoice[i].total;
				//  this.total = n.toFixed(2);
				//  this.invoice[i].subtotal = Number(Number(this.invoice[i].subtotal).toFixed(2));
				//  console.log('n and total',n,this.total);
				//  this.invoiceCourse["fees"] = this.invoice[i].courseFee.fee;
				//  if(this.invoice[i].courseId == course._id){
				//    this.invoiceCourse["name"] = course.name;
		  //          this.invoiceCourse["startDate"] = course.startDate;
		  //          this.invoiceCourse["endDate"] = course.endDate;
		  //          this.invoiceCourse["lessonCount"] = course.lessonCount;
				//  }
				// }
		  	}, err => {  
		    	console.log(err);
		  	});
	}

	dateFormat(dateStr){
	    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
	      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
	    ]; 
	     var d = new Date(dateStr);
	     var month = monthNames[d.getUTCMonth()];
	     var year = d.getUTCFullYear();
	     var date = d.getUTCDate();
	     console.log(date,month,year)
	     var dFormat = date + ' ' + month + ' ' + year;
	     console.log("DD MM YYYY",dFormat);
	     return dFormat;
	  }

	showPopup(type,value){
		console.log("show popup");
		this.isEditInv = true;
		if(type == 'courseFee'){
		  this.feesBox = true;
		  this.value.courseFee = value;
		}
	}

	cancelPopup(type){
		if((this.hideReg == true && this.hideDeposit == true && this.hideMisc == true) || this.hideReg == true || this.hideDeposit == true || this.hideMisc == true){
	      this.isEditInv = true;
	    }else{
	      this.isEditInv = false;
	    }
		console.log("hide popup")
		if(type == 'courseFee'){
		  this.feesBox = false;
		  this.value.courseFee = '';
		}
	}

	updateCfee(data){
		console.log("updateCfee",data);
		this.feesBox = false;
		for(var i in this.invoice){
		  if(this.invoice[i].courseFee.fee != data){
		    console.log("===not same");
		    this.updateInvData["courseFee"] = data;
		    this.invoice[i].courseFee.fee = Number(data);
	        console.log(this.invoice[i].courseFee.fee)
	        // formula for calculating the inclusive tax
	        // Product price x RATE OF TAX/ (100+RATE OF TAX);
	        if(this.invoice[i].courseFee.taxInclusive == true){
	          var taxRate = this.invoice[i].tax.rate;
	          var taxAmount = (this.invoice[i].courseFee.fee * taxRate / (100 + taxRate)).toFixed(2);
	          this.invoice[i].courseFee.tax =Number(taxAmount);
	          console.log("inclusiveTax for CFee",this.invoice[i].courseFee.tax);
	          var cFee = (this.invoice[i].courseFee.fee - this.invoice[i].courseFee.tax).toFixed(2);
	          this.invoice[i].courseFee.fee = Number(cFee);
	          console.log("CFee without inclusive tax",this.invoice[i].courseFee.fee)
	        }else if(this.invoice[i].courseFee.taxInclusive == false){
	          var taxRate = this.invoice[i].tax.rate;
	          var taxAmount = (this.invoice[i].courseFee.fee * taxRate / (100 + taxRate)).toFixed(2);
	          this.invoice[i].courseFee.tax =Number(taxAmount);
	          console.log("inclusiveTax for CFee",this.invoice[i].courseFee.tax);
	          // var cFee = (this.invoice[i].courseFee.fee - this.invoice[i].courseFee.tax).toFixed(2);
	          // this.invoice[i].courseFee.fee = Number(cFee);
	          console.log("CFee with exclusive tax",this.invoice[i].courseFee.fee)
	        }
	        
	        this.calculateHideFees('cFees')
		  }else{
		    console.log("===same");
		  } 
		}
	}

	calculateHideFees(type){
	    console.log("calculateHideFees");
	    for (var i in this.invoice) {
	      var regFees:number;
	      var regTax:number;
	      var miscFees:number;
	      var miscTax:number;
	      var deposit:number;
	      var totalTaxes:number;

	      if(this.hideReg == true){
	        regFees = 0;
	        regTax = 0;
	      }else{
	        regFees = this.invoice[i].registrationFee.fee;
	        regTax = this.invoice[i].registrationFee.tax;
	      }

	      if(this.hideMisc == true){
	        miscFees = 0;
	        miscTax = 0;
	      }else{
	        miscFees = this.invoice[i].miscFee.fee;
	        miscTax = this.invoice[i].miscFee.tax;
	      }

	      if(this.hideDeposit == true){
	        deposit = 0;
	      }else{
	        deposit = this.invoice[i].deposit;
	      }

	      totalTaxes = regTax + miscTax + Number(this.invoice[i].courseFee.tax);
	      console.log("Total taxes and deposit",totalTaxes,deposit)
	      this.invoice[i].subtotal = (regFees + miscFees + deposit + this.invoice[i].courseFee.fee).toFixed(2);
	      this.total = Number((Number(this.invoice[i].subtotal)+ totalTaxes).toFixed(2));
	      console.log("Subtotal",this.invoice[i].subtotal);
	      console.log("Total",this.total);
	    }
    }

	sendInvoice(){
	    console.log("send Invoice",this.invoiceID);
	    var mailArr = [];
	    mailArr.push(this.custDetail.user.email);
	    for(var i in this.custDetail.user.guardians){
	      mailArr.push(this.custDetail.user.guardians[i].email);
	    }
	    console.log("mailArr",mailArr);
	    let body = {
	      "associatedMails": mailArr
	    }
	    console.log("body",body);
	    this._service.invoiceOption(this.regionID, this.invoiceID, body, 'send')
	    .subscribe((res:any) => {
	      console.log(res);
	      this.toastr.success("Successfully sent the Invoice.");
	      this.closeModal('closeInv');
	    }, err => {  
	      console.log(err);
	      this.toastr.error('Fail to sent the Invoice.');
	    })
	}

	// cancelInvoiceModal(){
	//     this.modalReference.close();
	//     this.availableCourses = [];
	//     this.showInvoice = false;
	//     this.showPayment = false;
	//     this.paymentItem = {};
	//     this.showDetails(this.custDetail.user.userId);
	//   }

	closeModal(type){
		this.isChecked = ''
		this.modalReference.close();
		this.availableCourses = [];
		this.showInvoice = false;
		this.showPayment = false;
		this.paymentItem = {};
		this.hideReg = false;
    	this.hideDeposit = false;
    	this.hideMisc = false;
		this.isEditInv = false;
		this.singleInv = [];
		this.updateInvData = {};
		if(type == 'closeInv'){
			this.showDetails(this.custDetail.user.userId);
		}
	}

	showPayOption(){
		console.log("pay option");
		this.showPayment = true;
		this.showInvoice = false;
		this._service.getPaymentMethod()
		.subscribe((res:any) => {
			console.log(res);
			this.paymentProviders = res;
			this.selectedPayment = this.paymentProviders[0].name;
	    	this.paymentId = this.paymentProviders[0].id;
		})
	}

	getRegionInfo(){
		this.token = localStorage.getItem('token');
    	this.type = localStorage.getItem('tokenType');
		this._service.getRegionalAdministrator(this.regionID, this.token, this.type)
		.subscribe((res:any) => {
			console.log("regional info",res);
			// this.paymentProviders = res.invoiceSettings.paymentProviders;
			// console.log(this.paymentProviders);
			this.invoiceInfo = res.invoiceSettings;
			console.log(this.getRegionInfo);
		})
	}

	choosePayment(type){
	    console.log("choosePayment",type);
	    this.selectedPayment = type.name;
	    this.paymentId = type.id;
	    // console.log('pItem',this.paymentItem);
	}

	payNow(type){
		console.log("Pay Now",this.paymentItem,this.paymentId);
		let body = {
			'regionId': this.regionID,
			'refInvoiceId': this.refInvID,
			'amount': this.paymentItem.amount.toString(),
			'paymentMethod': this.paymentId.toString()
		}
		// if(this.paymentItem.refNumber){
		// 	body["refNumber"] = this.paymentItem.refNumber;
		// }
		// console.log("data",body);
		this._service.makePayment(this.regionID,body)
		.subscribe((res:any) => {
			console.log(res);
			this.showDetails(this.custDetail.user.userId);
	  		this.closeModal('closeInv');
	  		this.toastr.success(res.message);
		},err => {
			if(err.message == "Amount is overpaid."){
				this.toastr.success("Amount is overpaid.")
			}
			this.toastr.error("Payment Fail");
		})
	}

	hideInvoiceRow(type){
		this.isEditInv = true;
		if(type == 'reg'){
		  this.hideReg = true;
		  this.updateInvData["registrationFee"] = null;
		  this.calculateHideFees(type);
		}else if(type == 'deposit'){
		  this.hideDeposit = true;
		  this.updateInvData["deposit"] = null;
		  this.calculateHideFees(type);
		}else if(type == 'misc'){
		  this.hideMisc = true;
		  this.updateInvData["miscFee"] = null;
		  this.calculateHideFees(type);
		}
	}

	printInvoice(){
		window.print();
	}

	updateInvoice(){
		console.log("Inv Update Data",this.updateInvData);
		this._service.updateInvoiceInfo(this.invoiceID,this.updateInvData)
		.subscribe((res:any) => {
		  console.log(res);
		  this.isEditInv = false;
		  //for updating invoice ui
		  this.singleInv = [];
		  this.singleInv.push(res);
		  this.invoice = this.singleInv;
		  console.log("invoice",this.invoice);
		  for(var i in this.invoice){
			var n = this.invoice[i].total;
			this.total = n.toFixed(2);
			this.invoice[i].subtotal = Number(Number(this.invoice[i].subtotal).toFixed(2));
			if(this.invoice[i].registrationFee.fee == null){
				this.hideReg = true;
			}

			if(this.invoice[i].miscFee.fee == null){
				this.hideMisc = true;
			}

			if(this.invoice[i].deposit == null){
				this.hideDeposit = true;
			}
		  }
		},err => {
		  console.log(err);
		})
	}

	allCourseLists(){
		this._service.getAllCourse(this.regionID,this.locationID, 20, 0)
	    .subscribe((res:any)=>{
	    	this.courseLists = res;
	      console.log(res)
	    },err =>{
	      console.log(err);
	    });
	}

	clickTab(val){
		this.activeTab = val;
		this.activePass = 'available';
		if(val == 'makeup'){
			this.callMakeupLists();
		}
	}

	callMakeupLists(){
		this.blockUI.start('Loading...');
		this._service.getMakeupLists(this.custDetail.user.userId, this.activePass, this.regionID)
		.subscribe((res:any)=>{
			this.blockUI.stop();
	      	console.log(res)
	      	this.makeupLists = res;
	    },err =>{
	      	console.log(err);
	    });
	}

	openClaimModal(claimModal, passObj){
		this.currentPassObj = passObj;
		this._service.getClaimPassCourses(passObj.course.courseId)
		.subscribe((res:any)=>{
	    	this.modalReference = this.modalService.open(claimModal, { backdrop:'static', windowClass: 'modal-xl d-flex justify-content-center align-items-center'});
	      	console.log(res)
	      	this.claimCourses = res;
	    },err =>{
	      	console.log(err);
	    });
	}

	enrollPass(data, courseid){
		console.log(data)
		console.log(this.lessonData)
		let body = {
			"_id": this.lessonData._id,
		  	"startDate": this.lessonData.startDate,
		  	"endDate": this.lessonData.endDate,
		  	"teacherId": this.lessonData.teacherId,
		  	"courseId": data.courseId,
		  	"passId": this.currentPassObj.passId
		}
		console.log(body)
		this.blockUI.start('Loading...');
		this._service.enrollPass(body, this.custDetail.user.userId)
		.subscribe((res:any)=>{
	      	console.log(res)
	      	this.modalReference.close();
	      	this.blockUI.stop();
	      	this.toastr.success('Successfully passed.');
	    },err =>{
	      	console.log(err);
	      	this.toastr.error('Claim pass failed.');
	      	this.blockUI.stop();
	      	this.modalReference.close();
	    });
	}

	chooseDate(obj, courseId){
		console.log(obj)
		this.lessonData = obj;
		this.isChecked = obj.startDate;
		this.checkCourse = courseId;
	}

	viewInvoice(enrollModal,course){
		console.log("View Invoice",course);
		console.log(this.custDetail);
		this.showInvoice = true;
		this.modalReference = this.modalService.open(enrollModal, { backdrop:'static', windowClass: 'modal-xl modal-inv d-flex justify-content-center align-items-center'});
		this.getRegionInfo();
	    console.log(this.invoiceInfo);
	    if(course.invoice != null){
	    	var invoiceId = course.invoice._id;
	    	console.log("has invoice ID",invoiceId)
	    }else{
	    	console.log("no invoice id")
	    }
	    // var invoiceId = '5c08bf20ac9b4c4bfdf6dc62';//moana, View Invoice Course 001,GGWP00100032
	    this._service.getSingleInvoice(invoiceId)
	    .subscribe((res:any) => {
	      console.log('invoice detail',res);
	      this.singleInv.push(res);
	      this.invoice = this.singleInv;
	      console.log("invoice",this.invoice);
	      this.showOneInvoice(course,this.invoice);
	    }, err => {
	      console.log(err);
	    })
	}

	showOneInvoice(course,invoice){
		console.log('showOneInvoice',course);
		for(var i in this.invoice){
			this.updatedDate = this.dateFormat(invoice[i].updatedDate);
			this.dueDate = this.dateFormat(invoice[i].dueDate);
			this.invoiceID = invoice[i]._id;
			this.refInvID = invoice[i].refInvoiceId;
			this.invTaxName = invoice[i].tax.name;
			var n = invoice[i].total;
			this.total = n.toFixed(2);
			this.invoice[i].subtotal = Number(Number(invoice[i].subtotal).toFixed(2));
			console.log('n and total',n,this.total);
			this.invoiceCourse["fees"] = this.invoice[i].courseFee.fee;
			if(invoice[i].courseId == course._id){
				this.invoiceCourse["name"] = course.name;
				this.invoiceCourse["startDate"] = course.startDate;
				this.invoiceCourse["endDate"] = course.endDate;
				this.invoiceCourse["lessonCount"] = course.lessonCount;
			}
		}
	}

	backToInvoice(){
		console.log("Back To Invoice")
		this.showPayment = false;
		this.showInvoice = true;
	}


	clickPass(type){
		this.activePass = type;
		this.callMakeupLists();
	}

	forward(target){
		console.log('----',target)		
		event.preventDefault();		
		$('#'+target).animate({
	    	scrollLeft: "+=150px"
	  	}, "slow");
	}

	backward(target){
		console.log('----',target)		
		event.preventDefault();		
		$('#'+target).animate({
	    	scrollLeft: "-=200px"
	  	}, "slow");
	}

}

