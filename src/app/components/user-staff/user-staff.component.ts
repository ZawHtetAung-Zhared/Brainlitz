import { Component, OnInit, ViewChild } from '@angular/core';
import { appService } from '../../service/app.service';
import { ImageCropperComponent } from 'ng2-img-cropper/src/imageCropperComponent';
import { CropperSettings } from 'ng2-img-cropper/src/cropperSettings';
import { Bounds } from 'ng2-img-cropper/src/model/bounds';

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
	cropButton: boolean = true;

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
	}

	back(){
		console.log('back')
		this.showFormCreate = false;
	}

	getAllpermission(){
		this._service.getAllPermission(this.regionID)
		.subscribe((res:any) => {
			this.permissionLists = res;
			console.log('this.permissionLists', this.permissionLists)
		})
	}

}
