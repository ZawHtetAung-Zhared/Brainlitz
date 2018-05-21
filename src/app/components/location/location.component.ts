import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from './location';
import { FormsModule,FormGroup,FormControl } from '@angular/forms';
import { appService } from '../../service/app.service';
import { Observable } from 'rxjs/Rx';
declare var $: any;

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
  
})

export class LocationComponent implements OnInit {
	@ViewChild('f') form: any;
  	@ViewChild('closeBtn') closeBtn: ElementRef;
	public location: Location;
	public regionID = '5af915541de9052c869687a3';
	public locationLists: any;
	public formID: any;
	public hideModal: boolean = false;
	public isUpdate: boolean = false;
	model: Location = new Location();

	constructor(private _service: appService) { }

	ngOnInit() {
		this.getAllLocation();
	}
	
	getAllLocation(){
		let header = {
			'authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.M2RRNklOYllNdXlDcHZ6SmJHbE5PNnJnZlNGV21hajM.kgjNrlDmqQDnawrIo-ShBOJdtkknPtxgyzk92Ukdl-4'
		}
		this._service.getLocations(this.regionID)
		.subscribe((res:any) => {
    		this.locationLists = res;
	    }, err => {
	    	console.log(err)
	    })
	}

	createLocation(f, val, update, id) {
		console.log('hi', val)
		console.log(status)
		console.log(id)
		let data = {
			"regionId": this.regionID,
			"name": val.name,
			"address": val.address,
			"phoneNumber": val.phoneNumber
		}
		console.log(data)
		if(update == true){
			this._service.updateLocation(id, data)
			.subscribe((res:any) => {
	    		console.log(res)
	    		this.getAllLocation();
		    	f.reset();
		    	this.closeModal();
		    }, err => {
		    	console.log(err)
		    })
		}else{
			if (this.form.valid) {
		      	console.log("Form Submitted!");
		      	this._service.createLocation(this.regionID, data)
		      	.subscribe((res:any) => {
		    		console.log(res)
		    		this.getAllLocation();
		    		f.reset();
			    	this.closeModal();
			    }, err => {
			    	console.log(err)
			    })
		    }else{
		    	console.log('form is not valid')
		    }
		}
	}

	deleteLocation(id){
		console.log(id)
		this._service.deleteLocation(id)
		.subscribe((res:any) => {
			console.log(res);
			this.getAllLocation();
		},err => {
			console.log(err);
		})
	}

	editLocationInfo(id){
		console.log(this.model)
		this.isUpdate = true;
		this.formID = id;
		this._service.getSingleLocation(id)
		.subscribe((res:any) => {
			console.log(res);
			this.model = res;
		},err => {
			console.log(err);
		})
	}

	private closeModal(): void {
		$('#locationModal').removeClass('show');
		$('body').removeClass('modal-open');
    	$('.modal-backdrop').remove();
    }

    cancel(f){
    	console.log(this.model)
    	f.reset();
    	$('#locationModal').removeClass('show');
    	$('#locationModal').css("display", "none");
		$('body').removeClass('modal-open');
    	$('.modal-backdrop').remove();
    }
}