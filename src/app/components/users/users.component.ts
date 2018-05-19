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
	public regionID = '5af915541de9052c869687a3';
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

	createUser(obj, type){
		console.log(obj)
		console.log(type)
		let dataObj = {
			"orgId": this.regionID,
			"email": obj.mail,
			"password": obj.pwd,
			"profilePic": this.img
		}
		this._service.createUser(dataObj)
    	.subscribe((res:any) => {
  		console.log(res)
  		this.userLists = res;
    	this.closeModal();
    }, err => {
    	console.log(err)
    })
	}

	private closeModal(): void {
		$('.modal-backdrop, #staffModal').removeClass('show');
	}

}
