import { Component, OnInit, ViewContainerRef, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { appService } from '../../service/app.service';
import { Observable } from 'rxjs/Rx';
import { calendarField } from './calendar';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastsManager } from 'ng5-toastr/ng5-toastr';

declare var $:any;

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {  

  modalReference: any;
	closeResult: any;
	public regionID = localStorage.getItem('regionId');
	chosenHoliday: any;
	arrayHoliday: Array<any> = [];
	holidayLists: any;
  calendarLists: any;
  public calendarName: any;
  public calendarId: any;
  formField: calendarField = new calendarField();
  @BlockUI() blockUI: NgBlockUI;
  editId: any;
  public updateButton: boolean = false;
  public createButton: boolean = true;
  public responseChecked: Array<any> = [];

  //10.9.2018
  public isNameEdit: boolean = false;
  public iscreate: boolean = false;
  public wordLength:number = 0;
  public currentYear:any;
  public yearLists: Array<any> = [];
  public isChecked: any;
  public isHoliday: boolean = false;

  constructor(private modalService: NgbModal, private _service: appService, public toastr: ToastsManager, vcr: ViewContainerRef) { 
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.getAllHolidaysCalendar();
    this.currentYear = (new Date()).getFullYear();
    console.log(this.currentYear)    
  }

  yearCalc(x){
    for(let i = 0; i < 3; i++){
      let temp = x + i;
      this.yearLists.push(temp);
    }    
    console.log(this.yearLists)
  }

  chooseYear(val){
    this.isChecked = val;
  }

  creatnew(){
    this.iscreate = true;
    this.yearCalc(this.currentYear);
    this.isChecked = this.yearLists[0];
  }

  cancel(){
    this.iscreate = false;
    this.isHoliday = false;
    this.isChecked = '';
    this.yearLists = [];
  }

  focusMethod(e){
    $('.limit-wordcount').show('slow'); 
  }
    
  blurMethod(e){
    $('.limit-wordcount').hide('slow'); 
  }

  changeMethod(val : string){
    console.log(val)
    this.wordLength = val.length;
  }

  open(content){
    this.getAllHolidays();
    this.formField = new calendarField();
    this.responseChecked = [];
    this.arrayHoliday = [];
    this.updateButton = false;
    this.createButton = true;
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
		let dataObj = {
			"name": formData.name,
			"holidays": this.arrayHoliday
		}
		console.log(dataObj);
    this.blockUI.start('Loading...');
    
		this._service.createHolidaysCalendar(this.regionID,dataObj)
    .subscribe((res:any) => {
      console.log('success holidayCalendar post',res)
      this.toastr.success('Successfully Created.');
      this.blockUI.stop();
      // this.getAllHolidaysCalendar();
      this.cancel();
    }, err => {
      this.toastr.error('Create Fail');
      this.blockUI.stop();
      console.log(err)

    })
		this.arrayHoliday = [];
	}

  editName(){
    this.isNameEdit = true;
  }

  singleCalendarInfo(id){
    console.log(id)
    this.iscreate = false;
    this.isHoliday = true;
    this.getSingleCalendar(id);
    this.yearCalc(this.currentYear);
    this.isChecked = this.yearLists[0];
  }

  getAllHolidaysCalendar(){
    this.blockUI.start('Loading...');
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
     this.blockUI.start('Loading...');
     this.modalReference.close();
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
    this.blockUI.start('Loading...');
    this._service.getSingleCalendar(calendarId)
      .subscribe((res:any) => {
        this.blockUI.stop();
        this.calendarName = res.name;
        this.formField = res;
        console.log(res);
      },err => {
        console.log(err);
    })
  }

  getAllHolidays(){
    this._service.getAllHolidays(this.regionID)
    .subscribe((res:any) => {
      this.holidayLists = res;
      console.log(this.holidayLists)
      }, err => {
        console.log(err)
      })
  }

  editCalendar(content,id){
    this.getAllHolidays();
    this.responseChecked = [];
    this.updateButton = true;
    this.createButton = false;
    this.modalReference = this.modalService.open(content, { backdrop:'static', windowClass:'animation-wrap'});
    this._service.getSingleCalendar(id)
      .subscribe((res:any) => {
        this.responseChecked = res.holidays;
        this.formField = res;
        this.arrayHoliday = this.responseChecked;
        this.editId = res._id;
    })
  }


  updateCalendar(formData){
    console.log('updated', formData, this.arrayHoliday)
    let dataObj = {
      "name": formData.name,
      "holidays": this.arrayHoliday
    }
    this.blockUI.start('Loading...');
    this.modalReference.close();
    this._service.updateSignleCalendar(this.editId, dataObj)
    .subscribe((res:any) => {
        console.log(res);
        this.blockUI.stop();
        this.toastr.success('Successfully Updated.');
        this.getAllHolidaysCalendar();
      },err => {
        console.log(err);
      })
      this.formField = new calendarField();

  }

  openModal(name){
    this.modalReference = this.modalService.open(name, { backdrop:'static', windowClass: 'holidayModal'});
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

  yearMenuShow: boolean = false;

  @HostListener('document:click', ['$event'])
    public documentClick(event): void {
        if(this.yearMenuShow == false){
           $('.year-dropdown').css('display', 'none');
           // $('.bg-box').css('display', 'none');  
        }
        else {
            $('.year-dropdown').css('display', 'block');
            // $('.bg-box').css('display', 'block');
            this.yearMenuShow = false;

        }
    }
    
  dropDown(){
        var x = document.getElementsByClassName('year-dropdown');
        if( (x[0]as HTMLElement).style.display == 'block'){
          (x[0]as HTMLElement).style.display = 'none';
        }
        else {
           (x[0]as HTMLElement).style.display = 'block';
           this.yearMenuShow = true;
        }
  }

    
}

