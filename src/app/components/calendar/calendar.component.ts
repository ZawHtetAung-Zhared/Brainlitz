import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { appService } from '../../service/app.service';
import { Observable } from 'rxjs/Rx';
import { calendarField } from './calendar';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastsManager } from 'ng5-toastr/ng5-toastr';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  constructor(private modalService: NgbModal, private _service: appService, public toastr: ToastsManager, vcr: ViewContainerRef) { 
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.getAllHolidaysCalendar();
  }

  modalReference: any;
	closeResult: any;
	regionID: any;
	chosenHoliday: any;
	arrayHoliday: Array<any> = [];
	holidayLists: any;
  calendarLists: any;
  public calendarName: any;
  public calendarId: any;
  formField: calendarField = new calendarField();
  @BlockUI() blockUI: NgBlockUI;

  open(content){
    this.getAllHolidays();
		this.modalReference = this.modalService.open(content, { backdrop:'static', windowClass:'animation-wrap'});
	    this.modalReference.result.then((result) => {
        this.formField = new calendarField();
		    this.closeResult = `Closed with: ${result}`
	  	}, (reason) => {
        this.formField = new calendarField();
	  	  this.closeResult = `Closed with: ${reason}`;
	  	});
	}

  openDeleteModal(deletemodal, id){
    console.log('hi', id)  
    this.getSingleCalendar(id);
    this.calendarId = id; 
    console.log(this.calendarId);
    this.modalReference = this.modalService.open(deletemodal, { backdrop:'static', windowClass:'animation-wrap'});
      this.modalReference.result.then((result) => {        
        this.closeResult = `Closed with: ${result}`
      }, (reason) => {        
        this.closeResult = `Closed with: ${reason}`;
      });
  }

	getAllHolidays(){
    this.blockUI.start('Loading...');
  	this.regionID = localStorage.getItem('regionId');
    this._service.getAllHolidays(this.regionID)
    .subscribe((res:any) => {
      setTimeout(() => {
        this.blockUI.stop(); // Stop blocking
      }, 300);
      this.holidayLists = res;
      console.log(this.holidayLists)
      }, err => {
        console.log(err)
      })
	}

  	ChangeValue(e){
  		if(e.target.checked == true){
  			this.arrayHoliday.push(e.target.value);	
  			console.log(this.arrayHoliday)
  		}
  		else {
  			var index = this.arrayHoliday.indexOf(e.target.value);
  			this.arrayHoliday.splice(index, 1);
  			console.log(this.arrayHoliday)
  		}
  	}

  	createCalendar(formData){
  		this.regionID = localStorage.getItem('regionId');
  		let dataObj = {
  			"name": formData.name,
  			"holidays": this.arrayHoliday
  		}
  		console.log(dataObj);
      this.blockUI.start('Loading...');
      this.modalReference.close();
 		  this._service.createHolidaysCalendar(this.regionID,dataObj)
	    .subscribe((res:any) => {
	      console.log('success holidayCalendar post',res)
        this.toastr.success('Successfully Created.');
        this.blockUI.stop();
        this.getAllHolidaysCalendar();
	      }, err => {
          this.toastr.error('Create Fail');
          this.blockUI.stop();
	        console.log(err)
	      })
  		this.arrayHoliday = [];
  	}

    getAllHolidaysCalendar(){
      this.blockUI.start('Loading...');
      this.regionID = localStorage.getItem('regionId');
        this._service.getAllHolidaysCalendar(this.regionID)
        .subscribe((res:any) => {
          setTimeout(() => {
            this.blockUI.stop(); // Stop blocking
          }, 300);
          this.calendarLists = res;
          console.log(this.calendarLists)
        }, err => {
            console.log(err)
        })
      }

    deleteCalendar(id){
       console.log(id)
       this._service.deleteCalendar(id)
       .subscribe((res:any) => {
         console.log(res);
         this.toastr.success('Successfully Deleted.');
         this.blockUI.stop();
         this.getAllHolidaysCalendar();
       },err => {
         this.toastr.error('Delete Fail.');
         console.log(err);
       })
    } 

    getSingleCalendar(calendarId){
      this._service.getSingleCalendar(calendarId)
        .subscribe((res:any) => {
          this.calendarName = res.name;
          console.log(res);
        },err => {
          console.log(err);
      })
    }

}
