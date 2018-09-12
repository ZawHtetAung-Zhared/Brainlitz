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

  public currentID: any;
  public getEditedName: any;
  public isfocus: boolean = false;
  public isNameEdit: boolean = false;
  public iscreate: boolean = false;
  public wordLength:number = 0;
  public currentYear:any;
  public yearLists: Array<any> = [];
  public isChecked: any;
  public isHoliday: boolean = false;
  public minDate:any;
  public maxDate:any;
  public model: any = {};
  public holidayTemp =[];
  public selectedYear:any;
  public showYear = {};
  public calendarHolidays:any;
  objectKeys = Object.keys;
  public holidaysArr: Array<any> = [];
  public isEdit:boolean = false;


  constructor(private modalService: NgbModal, private _service: appService, public toastr: ToastsManager, vcr: ViewContainerRef) { 
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.getAllHolidaysCalendar();
    this.currentYear = (new Date()).getFullYear();
    console.log(this.currentYear)    
  }

  editOn(){
    this.isNameEdit = true;
    this.isfocus = true;
  }

  editOff(){
    this.isNameEdit = false
    this.isfocus = false;
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
    this.getAllHolidaysCalendar();
  }

  focusMethod(e){
    $('.limit-wordcount').show('slow'); 
  }
    
  blurMethod(e){
    $('.limit-wordcount').hide('slow'); 
  }

  changeMethod(val : string){
    console.log(val)
    this.getEditedName = val;
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

  // editName(){
  //   this.isNameEdit = true;
  // }

  editSingleCalendar(id){
    this.editOff();
    console.log(this.holidaysArr)
    let calendarObj = {
      "-id": id,
      "name": this.getEditedName,
      "holidays": this.holidaysArr
    }
    console.log('~~~ ',calendarObj)
    this.blockUI.start('Loading...');
    this._service.updateCalendar(this.calendarid,calendarObj)
    .subscribe((res:any)=>{
        this.blockUI.stop();
        this.toastr.success('Successfully edited the calendar name.');
        console.log("res",res);
        this.getSingleCalendar(id);
      },err =>{
        console.log(err);
        // this.holidayTemp = [];
      });
  }

  singleCalendarInfo(id){
    console.log(id)
    this.currentID = id;
    this.iscreate = false;
    this.isHoliday = true;
    this.getSingleCalendar(id);
    this.yearCalc(this.currentYear);
    this.isChecked = this.yearLists[0];
    this.selectedYear = this.yearLists[0];
    console.log("selectedYear",this.selectedYear);
    // let list = Object.keys(this.calendarHolidays);
    // console.log(list)
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
  calendarid:any;
  getSingleCalendar(calendarId){
    this.blockUI.start('Loading...');
    this._service.getSingleCalendar(calendarId)
      .subscribe((res:any) => {
        this.blockUI.stop();
        console.log("getSingleCalendar",res)
        this.calendarName = res.name;

        this.calendarid = res._id; 
        this.calendarHolidays = res.holidays;

        console.log(this.selectedYear);
        console.log(this.calendarHolidays );
        let selectedYear = this.selectedYear;
        let holidayObj = this.calendarHolidays;
        this.getSelectedHolidayByYear(selectedYear, holidayObj);

        this.formField = res;
        console.log(res);

      },err => {
        console.log(err);
    })
  }

  getSelectedHolidayByYear(x, obj){
    console.log(x)
    console.log(obj)
    for(var i in obj){
      let i = x;
      console.log(obj[i]);
      this.holidaysArr = obj[i];
    }
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

  createHoliday(){
    console.log("this.holidaysArr",this.holidaysArr)
    console.log("~this.holidayTemp~",this.holidayTemp)
    console.log("create holiday works",this.model);
    for(var key in this.holidaysArr){
      // console.log("key",this.holidaysArr[key]._id);
      this.holidayTemp.push(this.holidaysArr[key]._id);
      console.log(this.holidayTemp)
    }
    let object= {
      "name": this.model.name,
      "start": this.changeDateFormat(this.model.start,"00:01:00.000"),
      "end": this.changeDateFormat(this.model.end,"23:59:59:999")
    };
    console.log("create holiday works",object);
    this.modalReference.close();
    console.log("~calendarid~",this.calendarid)
    this._service.createHolidays(this.regionID,object)
    .subscribe((res:any) => {
      console.log(res);
      this.holidayTemp.push(res.id);
      console.log('~Holiday~',this.holidayTemp);
      let calendarObj = {
        "-id": this.calendarid,
        "holidays": this.holidayTemp
      }
      console.log(calendarObj)
      this._service.updateCalendar(this.currentID,calendarObj)
      .subscribe((res:any)=>{
          console.log("res",res);
          this.model ={};
          this.getSingleCalendar(this.currentID);
          this.holidayTemp = [];
        },err =>{
          console.log(err);
        });
    },err =>{
      console.log(err);
    })
  }

  changeDateFormat(date,time){
      if (date == null) {
        console.log('null',date)
        return ""
      }else{
        console.log("Time",time)
        let sdate = date.year+ '-' +date.month+ '-' +date.day;
        let dateParts = sdate.split('-');
        console.log("dateParts",dateParts)
        if(dateParts[1]){
          console.log(Number(dateParts[1])-1);
          let newParts = Number(dateParts[1])-1;
          dateParts[1] = newParts.toString();
        }
        let timeParts = time.split(':');
        if(dateParts && timeParts) {
            let testDate = new Date(Date.UTC.apply(undefined,dateParts.concat(timeParts)));
            console.log("UTC",testDate)
            let fullDate = new Date(Date.UTC.apply(undefined,dateParts.concat(timeParts))).toISOString();
            console.log("ISO",fullDate)
            return fullDate;
        }
    }
  }

  changeDateStrtoObj(datestr,type){
    if(type == "start"){
      console.log(datestr)
      let test = datestr.substring(0, datestr.search("T"));
      let testSplit = test.split("-");
      let format = {year: Number(testSplit[0]), month: Number(testSplit[1]), day: Number(testSplit[2])};
      return format;
    }else if(type == "end"){ 
      if(datestr){
        console.log(datestr)
        let test = datestr.substring(0, datestr.search("T"));
        let testSplit = test.split("-");
        let format = {year: Number(testSplit[0]), month: Number(testSplit[1]), day: Number(testSplit[2])};
        return format;
      }else if(datestr == null){
        return null;
      }
    }
    
  }

  editHolidays(item,content){
    this.holidayTemp = [];
    this.isEdit = true;
    console.log(content)
    console.log(item);
    this.model = item;
    this.modalReference = this.modalService.open(content, { backdrop:'static', windowClass:'holidayModal'});
    this.model.start = this.changeDateStrtoObj(item.start,"start");
    console.log(this.model.start);
    this.model.end = this.changeDateStrtoObj(item.end,"end");
    console.log(this.model.end);
  }

  updateHolidays(){
    for(var key in this.holidaysArr){
      // console.log("key",this.holidaysArr[key]._id);
      this.holidayTemp.push(this.holidaysArr[key]._id);
      console.log(this.holidayTemp)
    }
    console.log(this.model);
    let object= {
      "-id": this.model._id,
      "name": this.model.name,
      "start": this.changeDateFormat(this.model.start,"00:01:00.000"),
      "end": this.changeDateFormat(this.model.end,"23:59:59:999")
    };
    console.log("create holiday works",object);
    this.modalReference.close();
    console.log("~calendarid~",this.calendarid)
    this._service.updateHoliday(this.model._id,object)
    .subscribe((res:any) => {
      console.log(res);
      // this.holidayTemp.push(res.id);
      // console.log('~Holiday~',this.holidayTemp);
      let calendarObj = {
        "-id": this.calendarid,
        "holidays": this.holidayTemp
      }
      console.log(calendarObj)
      this._service.updateCalendar(this.calendarid,calendarObj)
      .subscribe((res:any)=>{
          console.log("res",res);
          this.model ={};
          this.holidayTemp = [];
          this.getSingleCalendar(this.currentID);
          this.isEdit = false;
        },err =>{
          console.log(err);
          // this.holidayTemp = [];
        });
    },err =>{
      console.log(err);
    })
  }

  deleteHoliday(id){
    console.log("id",id);
    for(var key in this.holidaysArr){
      // console.log("key",this.holidaysArr[key]._id);
      this.holidayTemp.push(this.holidaysArr[key]._id);
      console.log(this.holidayTemp)
    }
    this.modalReference.close();
    console.log("~calendarid~",this.calendarid)
    this._service.deleteHoliday(this.model._id)
    .subscribe((res:any) => {
      console.log(res);
      this.getSingleCalendar(this.currentID);
      for(var key in this.holidaysArr){
        // console.log("key",this.holidaysArr[key]._id);
        this.holidayTemp.push(this.holidaysArr[key]._id);
        console.log("~~After Delete~~",this.holidayTemp)
      }
      let calendarObj = {
        "-id": this.calendarid,
        "holidays": this.holidayTemp
      }
      console.log(calendarObj)
      this._service.updateCalendar(this.calendarid,calendarObj)
      .subscribe((res:any)=>{
          console.log("res",res);
          this.model ={};
          this.holidayTemp = [];
          this.getSingleCalendar(this.currentID);
          this.isEdit = false;
        },err =>{
          console.log(err);
          // this.holidayTemp = [];
        });
    },err =>{
      console.log(err);
    })

  }

  onClickYear(year,content1,content2){
    console.log("this.calendarId",)
    this.selectedYear = year;
    console.log("~year~",year);
    console.log(this.calendarHolidays);
    // content1.navigateTo({year: 2019, month: 2});
    // content2.navigateTo({year: 2019, month: 2});

    this.getSelectedHolidayByYear(this.selectedYear,this.calendarHolidays);
    // this.getSingleCalendar(this.calendarId)
    // for(let item in this.calendarHolidays){
    //   console.log("Item",item);
    //   if(item == this.selectedYear){
    //     console.log("find",item)

    //   }
    // }
    // Object.keys(this.calendarHolidays).forEach(key => {
    //     console.log("KEY",key)
    //     if(key == this.selectedYear){
    //       this.showYear = this.calendarHolidays[key];
    //       console.log("find",this.showYear);
    //     }else{
    //       this.showYear = {};
    //     }
    // });
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

  onClickCreate(content){
    this.modalReference = this.modalService.open(content, { backdrop:'static', windowClass: 'holidayModal'});
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

  setMinDate(event){
    console.log("setMinDate",event);
    this.minDate = event;
  }
  setMaxDate(date){
    console.log("setMaxDate",date);
    this.maxDate =  date;
  }
  cancelModal(){
    this.modalReference.close();
    this.model = {};
    this.getSingleCalendar(this.currentID);
    this.isEdit = false;
  }
    
}

