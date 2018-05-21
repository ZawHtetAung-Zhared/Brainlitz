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
	public hideModal: boolean = false;
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

	createLocation(val) {
		console.log('hi', val)
		let data = {
			"regionId": this.regionID,
			"name": val.name,
			"address": val.address,
			"phoneNumber": val.phoneNumber
		}
		console.log(data)
		if (this.form.valid) {
	      	console.log("Form Submitted!");
	      	this._service.createLocation(this.regionID, data)
	      	.subscribe((res:any) => {
	    		console.log(res)
	    		this.getAllLocation();
		    	this.closeModal();
		    }, err => {
		    	console.log(err)
		    })
	    }else{
	    	console.log('form is not valid')
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
		this._service.getSingleLocation(id)
		.subscribe((res:any) => {
			console.log(res);
			this.model = res;
			// this.getAllLocation();
		},err => {
			console.log(err);
		})
	}

	private closeModal(): void {
		$('.modal-backdrop, #locationModal').removeClass('show');
    }

    cancel(){
    	// this.form : Location;
    	$('.modal-backdrop, #locationModal').removeClass('show');
    }
}