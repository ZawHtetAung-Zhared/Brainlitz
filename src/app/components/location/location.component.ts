import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { Location } from './location';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule,FormGroup,FormControl } from '@angular/forms';
import { appService } from '../../service/app.service';
import { Observable } from 'rxjs/Rx';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastsManager } from 'ng5-toastr/ng5-toastr';

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
	public locationName: any;
	model: Location = new Location();
	private modalReference: NgbModalRef;
	closeResult: string;
	@BlockUI() blockUI: NgBlockUI;

	constructor(private modalService: NgbModal, private _service: appService, public toastr: ToastsManager, vcr: ViewContainerRef) {
		this.toastr.setRootViewContainerRef(vcr);
		this._service.getLocations(this.regionID);
	}

	ngOnInit() {
		this.getAllLocation();
	}

	open(locationModal) {
		this.model = new Location();
	  this.modalReference = this.modalService.open(locationModal, {backdrop:'static', windowClass:'animation-wrap'});
	  this.modalReference.result.then((result) => {
	    this.closeResult = `Closed with: ${result}`;	    
	  }, (reason) => {
	    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;	    
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
			setTimeout(() => {
		        this.blockUI.stop(); // Stop blocking
		      }, 300);
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
	     		this.toastr.success('Successfully Updated.');
	     		this.blockUI.stop();
	     		this.getAllLocation();
	     	}, err => {
	     		this.toastr.error('Update fail');
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
    		this.toastr.success('Successfully Created.');
    		this.blockUI.stop();
    		this.getAllLocation();
	    }, err => {
	    	this.toastr.error('Create Fail.');
	    	this.blockUI.stop();
	    	console.log(err)
	    })
		  
		}
	}

	deleteLocation(id){
		console.log(id)
		this._service.deleteLocation(id)
		.subscribe((res:any) => {
			console.log(res);
			this.modalReference.close();
			this.toastr.success('Successfully Deleted.');
			this.getAllLocation();
		},err => {
			this.modalReference.close();
			this.toastr.error('Delete Fail.');
			console.log(err);
		})
	}

	getSingleLocation(id,locationModal){
		console.log(this.model)
		this.isUpdate = true;
		this.modalReference = this.modalService.open(locationModal);
		this.singleLocation(id);
	}

	singleLocation(id){
		this._service.getSingleLocation(id)
		.subscribe((res:any) => {
			console.log(res);
			this.currentID = res._id;
			this.locationName = res.name;
			this.model = res;
		},err => {
			console.log(err);
		})
	}


	deleteModal(deletemodal, id){
		this.modalReference = this.modalService.open(deletemodal);
		this.singleLocation(id);
	}
}