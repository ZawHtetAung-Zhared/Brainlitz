import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormsModule,FormGroup,FormControl } from '@angular/forms';
import { Staff } from './staff';
import { Customer } from './customer';
import { appService } from '../../service/app.service';
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
	public orgID = '5b023d39c41a330f1cf7572f';
	public regionID = '5b023ecbc41a330f1cf75730';
	public userLists: any;

	constructor(private _service: appService) { }

	ngOnInit() {
	}

	onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      console.log(file)
      this.img = file;
      // reader.readAsDataURL(file);
      // reader.onload = () => {
      //   this.form.get('stuff--img').setValue({
      //     filename: file.name,
      //     filetype: file.type,
      //     value: reader.result.split(',')[1]
      //   })
      // };
    }
	}

	createUser(obj, type, f){
		console.log(obj)
		console.log(type)
		let dataObj = new FormData();
		dataObj.append('orgId', this.orgID);
		dataObj.append('firstName', obj.fname);
		dataObj.append('lastName', obj.lname);
		dataObj.append('preferredName', obj.dname);
		dataObj.append('email', obj.mail);
		dataObj.append('regionId', this.regionID);
		dataObj.append('password', obj.pwd);

		console.log(dataObj)

		let Obj = {
			"orgId": this.orgID,
			"firstName": obj.fname,
			"lastName": obj.lname,
			"preferredName": obj.dname,
			"email": obj.mail,
			"regionId": this.regionID,
			"password": obj.pwd,
			"profilePic": this.img
		}

		this._service.createUser(dataObj)
	    	.subscribe((res:any) => {
	  		console.log(res)
	  		this.userLists = res;
	  		console.log(this.userLists)
	  		f.reset();
	    	this.closeModal();
	    }, err => {
	    	console.log(err)
	    })
	}

	private closeModal(): void {
		$('#staffModal, #customerModal').removeClass('show');
		$('#staffModal, #customerModal').css("display", "none");
		$('body').removeClass('modal-open');
    	$('.modal-backdrop').remove();
    }

    cancel(f){
    	f.reset();
    	$('#staffModal, #customerModal').removeClass('show');
    	$('#staffModal, #customerModal').css("display", "none");
		$('body').removeClass('modal-open');
    	$('.modal-backdrop').remove();
    }

}
