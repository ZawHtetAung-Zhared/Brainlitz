import { Component, OnInit, ViewChild, HostListener, Pipe, PipeTransform } from '@angular/core';
import { appService } from '../../service/app.service';
import { ImageCropperComponent } from 'ng2-img-cropper/src/imageCropperComponent';
import { CropperSettings } from 'ng2-img-cropper/src/cropperSettings';
import { Croppie } from 'croppie';
import { Bounds } from 'ng2-img-cropper/src/model/bounds';
declare var $: any;

@Component({
  selector: 'app-user-staff',
  templateUrl: './user-staff.component.html',
  styleUrls: ['./user-staff.component.css']
})
export class UserStaffComponent implements OnInit {

  	public regionID = localStorage.getItem('regionId');
  	public staffLists: any;
  	showFormCreate: boolean = false;
  	permissionLists: any;
  	@ViewChild("cropper", undefined)
	cropper: ImageCropperComponent;
	resetCroppers: Function;
	cropperSettings1: CropperSettings;
	input: any;
	uploadCrop: any;
	blankCrop: boolean = false;
	imgDemoSlider: boolean = false;
	isSticky: boolean = false;
	public navIsFixed: boolean = false;
	public isCreateFix: boolean = false;
	permissionId: any;

	constructor(private _service: appService) {
  		this.cropperSettings1 = new CropperSettings();
	    this.cropperSettings1.rounded = true;
	    this.cropperSettings1.noFileInput = true;
	    this.cropperSettings1.cropperDrawSettings.strokeColor = "rgba(255,0,0,1)";
	    this.cropperSettings1.cropperDrawSettings.strokeWidth = 2;
   	}

  	ngOnInit() {
  		this.getAllUsers('staff');
  		this.blankCrop = false; 
		this.getAllpermission();
  	}


  	getAllUsers(type){
		this._service.getAllUsers(this.regionID, type)
		.subscribe((res:any) => {
			this.staffLists = res;
			console.log('this.staffLists', this.staffLists)
	    }, err => {
	    	console.log(err)
	    })
	}

	goCreateForm(){
		this.showFormCreate = true;
		console.log('create')
		setTimeout(function() {
	      $(".frame-upload").css('display', 'none');
	    }, 10);
	}

	back(){
		console.log('back')
		this.showFormCreate = false;
		this.blankCrop = false;
	}

	getAllpermission(){
		this._service.getAllPermission(this.regionID)
		.subscribe((res:any) => {
			this.permissionLists = res;
			console.log('this.permissionLists', this.permissionLists)
		})
	}

	checkUser(id, e){
		console.log(e.target.checked)
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
	    this.imgDemoSlider = false;
	    setTimeout(function() {
	      $("#upload-demo img:last-child").attr("id", "blobUrl");
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
	      	$("#upload-demo img:last-child").remove();
	        if (resp) {
	          	setTimeout(function() {
	        		$(".circular-profile img").remove();
	        		$(".circular-profile").append('<img src="' + resp + '" width="100%" />');
	           	}, 200);
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

}
