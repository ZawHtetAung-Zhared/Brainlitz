import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from './location';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule,FormGroup,FormControl } from '@angular/forms';
import { appService } from '../../service/app.service';
import { Observable } from 'rxjs/Rx';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

declare var $: any;

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
  
})

export class LocationComponent implements OnInit {	
	@ViewChild('categoryForm') form: any;
	public location: Location;
	public regionID = localStorage.getItem('regionId');
	public locationLists: any;
	public isUpdate: boolean = false;
	public currentID: any;
	model: Location = new Location();
	private modalReference: NgbModalRef;
	closeResult: string;
	@BlockUI() blockUI: NgBlockUI;

	constructor(private modalService: NgbModal, private _service: appService) { }

	ngOnInit() {
		this.getAllLocation();
	}

	open(locationModal) {
	  this.modalReference = this.modalService.open(locationModal, {backdrop:'static', windowClass:'animation-wrap'});
	  this.modalReference.result.then((result) => {
	    this.closeResult = `Closed with: ${result}`;
	    this.model = new Location();
	  }, (reason) => {
	    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
	    this.model = new Location();
	  });
	}

	private getDismissReason(reason: any): string {
	  if (reason === ModalDismissReasons.ESC) {
	    return 'by pressing ESC';
	  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
	    return 'by clicking on a backdrop';
	  } else {
	    return `with: ${reason}`;
	  }
	}

	
	getAllLocation(){
		this.blockUI.start('Loading...');
		this._service.getLocations(this.regionID)
		.subscribe((res:any) => {
			this.blockUI.stop();
    		this.locationLists = res;
	    }, err => {
	    	console.log(err)
	    })
	}

	createLocation(obj, update, locationID) {
		let data = {
			"regionId": this.regionID,
			"name": obj.name,
			"address": obj.address,
			"phoneNumber": obj.phoneNumber
		}
		if(update == true){
			console.log(update)
			this.blockUI.start('Loading...');
    		this.modalReference.close();
			this._service.updateLocation(locationID, data)
			 .subscribe((res:any) => {
	     		console.log(res)
	     		this.model = new Location();
	     		this.blockUI.stop();
	     		this.getAllLocation();
	     	}, err => {
	     		console.log(err)
	    })
		}else{
    	console.log("Form Submitted!", this.regionID);
    	this.blockUI.start('Loading...');
    	this.modalReference.close();
    	this._service.createLocation(this.regionID, obj)
      	.subscribe((res:any) => {
    		console.log(res);
    		this.model = new Location();
    		this.blockUI.stop();
    		this.getAllLocation();
	    }, err => {
	    	console.log(err)
	    })
		  
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

	getSingleLocation(id,locationModal){
		console.log(this.model)
		this.isUpdate = true;
		this.modalReference = this.modalService.open(locationModal);
		this._service.getSingleLocation(id)
		.subscribe((res:any) => {
			console.log(res);
			this.currentID = res._id;
			this.model = res;
		},err => {
			console.log(err);
		})
	}
}