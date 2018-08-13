import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef, HostListener } from '@angular/core';
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
	// @ViewChild('categoryForm') form: any;
	public location: Location;
	public regionID = localStorage.getItem('regionId');
	public locationLists: any;
	public isUpdate: boolean = false;
	public isempty: boolean = false;
	public isrequired: boolean = true;
	public iscreate: boolean = false;
	public navIsFixed: boolean = false;
	public currentID: any;
	public locationName: any;
	public countrycode: any;
	model: Location = new Location();
	private modalReference: NgbModalRef;
	closeResult: string;
	@BlockUI() blockUI: NgBlockUI;

	constructor(private modalService: NgbModal, private _service: appService, public toastr: ToastsManager, vcr: ViewContainerRef) {
		this.toastr.setRootViewContainerRef(vcr);
		this._service.getLocations(this.regionID);
	}

	ngOnInit() {
		window.addEventListener('scroll', this.scroll, true);
		this.getAllLocation();
	}

	ngOnDestroy() {
        window.removeEventListener('scroll', this.scroll, true);
    }

    scroll = (): void => {
    	// var el = document.getElementsByClassName("content-wrapper");
    	// console.log(el)
    	// console.log('..', window)
    	// console.log('..', window.pageYOffset)
      //handle your scroll here
      //notice the 'odd' function assignment to a class field
      //this is used to be able to remove the event listener
    };

    @HostListener('window:scroll', ['$event']) onScroll($event){
	    // console.log($event);
	    // console.log("scrolling");
	    // console.log(window.pageYOffset)
	    if(window.pageYOffset > 40){
	      console.log('greater than 100')
	      this.navIsFixed = true;
	    }else{
	      console.log('less than 100')
	      this.navIsFixed = false;
	    }
	  } 

	telInputObject(obj) {
	    console.log(obj);
	    console.log(obj[0].placeholder);
	    console.log(obj[0].placeholder.length);
	    if(this.isUpdate != true){
	    	console.log('create')
	    	obj.intlTelInput('setCountry', 'in');
	    }else{
	    	console.log('update')
	    	obj.intlTelInput('setCountry', 'mm');
	    }
  	}

  	onCountryChange(e){
  		console.log(e)
  		this.countrycode = e.dialCode;
  	}
  	getNumber(e){
  		console.log('hi')
  		console.log(e)
  	}
  	hasError(e){
  		console.log(e)
  		this.isrequired = e;
  	}
  	creatnew(){
  		this.iscreate = true;
  		this.isUpdate = false;
  		this.isrequired = true;
  		this.model = new Location();
  	}
  	back(){
	    this.iscreate = false
	    this.isUpdate = false 	
  	}
  	keyDownFunction(e){
  		if(e.keyCode == 13) {
  		    console.log('you just clicked enter');
  		    // rest of your code
  		  }
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
    		this.isempty = (res.length === 0) ? true : false;       
	    }, err => {
	    	console.log(err)
	    })
	}

	create(){
		console.log('i')
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
			this._service.updateLocation(locationID, data)
			 .subscribe((res:any) => {
	     		console.log(res)
	     		this.model = new Location();
	     		this.toastr.success('Successfully Updated.');
	     		this.blockUI.stop();
	     		this.iscreate = false;
	     		this.getAllLocation();
	     	}, err => {
	     		this.toastr.error('Update fail');
	     		console.log(err)
	    	})
		}else{
    	console.log("Form Submitted!", this.regionID);
    	this.blockUI.start('Loading...');
    	// this.modalReference.close();
    	this._service.createLocation(this.regionID, obj)
      	.subscribe((res:any) => {
    		console.log(res);
    		this.model = new Location();
    		this.toastr.success('Successfully Created.');
    		this.blockUI.stop();
    		this.iscreate = false;
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

	getSingleLocation(id){
		this.iscreate = true;
		console.log(this.model)
		this.isUpdate = true;		
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
		this.modalReference = this.modalService.open(deletemodal, {backdrop:'static', windowClass:'animation-wrap'});
		this.singleLocation(id);
	}
}