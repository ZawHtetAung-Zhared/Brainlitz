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
	public orgID = '5af9130791b3b22c22ae0cb8';
	public regionID = '5af915541de9052c869687a3';
	public userLists: any;

	constructor(private _service: appService) { }

	ngOnInit() {
		this.getAllUsers()
		
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

	createUser(obj, type){
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
    	this.closeModal();
    }, err => {
    	console.log(err)
    })
	}

	getAllUsers(){
		this._service.getAllUsers(this.regionID)
		.subscribe((res:any) => {
			this.userLists = res;
			console.log(this.userLists)
	    }, err => {
	    	console.log(err)
	    })
	}

	

	private closeModal(): void {
		$('.modal-backdrop, #staffModal, #customerModal').removeClass('show');
	}

}

