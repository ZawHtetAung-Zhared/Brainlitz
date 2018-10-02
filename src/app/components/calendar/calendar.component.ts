import { Component, OnInit, ViewContainerRef, HostListener, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbDatepickerConfig, NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { appService } from '../../service/app.service';
import { Observable } from 'rxjs/Rx';
import { calendarField } from './calendar';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastsManager } from 'ng5-toastr/ng5-toastr';
import * as moment from 'moment-timezone';

declare var $:any;

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [NgbDatepickerConfig] 
})
export class CalendarComponent implements OnInit {  
  public value = 'none';
  modalReference: any;
	closeResult: any;
	public regionID = localStorage.getItem('regionId');
	chosenHoliday: any;
  arrayHoliday: Array<any> = [];
	holidayLists: any;
  calendarLists: Array<any> = [];
  public calendarName: any;
  public calendarId: any;
  formField: calendarField = new calendarField();
  @BlockUI() blockUI: NgBlockUI;
  editId: any;
  public updateButton: boolean = false;
  public createButton: boolean = true;
  public responseChecked: Array<any> = [];
  @Output() dateSelect = new EventEmitter<NgbDateStruct>();
  @Output() monthSelect = new EventEmitter<NgbDateStruct>();
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
  public utcStartDate;
  public utcEndDate;
  public testDate = {year: 2019, month: 1, day: 1};
  public navigation = 'Without select boxes';
  public sameDate:boolean = false;

  constructor(private modalService: NgbModal, private _service: appService, public toastr: ToastsManager, vcr: ViewContainerRef,config: NgbDatepickerConfig, calendar: NgbCalendar) { 
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.getAllHolidaysCalendar(20, 0);
    this.currentYear = (new Date()).getFullYear();
    console.log(this.currentYear)    
  }

  onDateSelect(e){
    console.log(e)
  }

  onMonthSelect(e){
    console.log(e)
  }

  editOn(){
    this.isNameEdit = true;
    this.isfocus = true;
  }

  editOff(){
    this.isNameEdit = false
    this.isfocus = false;
    this.formField.name = this.calendarName;
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
    this.getAllHolidaysCalendar(20, 0);
    this.formField = new calendarField();
  }

  focusMethod(e, word){
    this.wordLength = word.length;
    $('.limit-wordcount').show('slow'); 
  }
    
  blurMethod(e){
    $('.limit-wordcount').hide('slow'); 
    this.wordLength = 0;
  }

  changeMethod(val : string){
    console.log(val)
    this.getEditedName = val;
    this.wordLength = val.length;
  }

  open(content){
    $('.input-daterange input').each(function() {
        $(this).datepicker('clearDates');
    });
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
      // this.cancel();
      this.singleCalendarInfo(res.id)
    }, err => {
      this.toastr.error('Create Fail');
      this.blockUI.stop();
      console.log(err)

    })
		this.arrayHoliday = [];
    this.yearLists = [];
	}

  // editName(){
  //   this.isNameEdit = true;
  // }

  editSingleCalendar(id){
    this.editOff();
    console.log(this.holidaysArr)
    console.log(this.calendarHolidays)
    let calendarObj = {
      "-id": id,
      "name": this.getEditedName
    }
    console.log('~~~ ',calendarObj)
    this.blockUI.start('Loading...');
    this._service.updateCalendar(this.calendarid,calendarObj)
    .subscribe((res:any)=>{
        this.blockUI.stop();
        this.toastr.success('Successfully edited the calendar name.');
        console.log("res",res);
        this.formField = new calendarField();
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
    // var start = moment().startOf('day'); // set to 12:00 am today
    // var end = moment().endOf('day'); // set to 23:59 pm today
    // console.log("local start & end",start,end);
    // console.log('locaL to iso',end.toISOString());
    // var utcstart = moment.utc().startOf('day'); 
    // var utcend = moment.utc().endOf('day'); 
    // console.log("utc end",utcend);
    // console.log('utc to iso',utcend.toISOString());
    // var startT=new Date(new Date().setHours(0, 0, 0, 0)).toISOString();
    // var nowT =  new Date().toISOString();
    // var endT = new Date(new Date().setHours(23, 59, 59, 999)).toISOString();
    // console.log('startT', startT);
    // console.log('nowT', nowT);
    // console.log('endT', nowT);

  }

  showMore(skip: any){
    this.getAllHolidaysCalendar(20, skip)
  }

  getAllHolidaysCalendar(limit, skip){
    this.blockUI.start('Loading...');
      this._service.getAllHolidaysCalendar(this.regionID, limit, skip)
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
       this.getAllHolidaysCalendar(20, 0);
     },err => {
       this.toastr.error('Delete Fail.');
       console.log(err);
     })
  } 
  calendarid:any;
  getSingleCalendar(calendarId){
  let zone = localStorage.getItem('timezone');
  let format = 'YYYY/MM/DD HH:mm:ss ZZ';
    console.log('~~~ :B ', calendarId)
    this.blockUI.start('Loading...');
    this._service.getSingleCalendar(calendarId)
      .subscribe((res:any) => {
        this.blockUI.stop();
        console.log("getSingleCalendar",res)
        this.calendarName = res.name;
        this.calendarid = res._id; 
        this.calendarHolidays = res.holidays; 
        let selectedYear = this.selectedYear;
        let holidayObj = this.calendarHolidays;
        // console.log('~~~ ', res.holidays)
        console.log(this.calendarHolidays);      
        for(var i in this.calendarHolidays){
          console.log('obj key',this.calendarHolidays[i]);
          for(var key in this.calendarHolidays[i]){
            let start = this.calendarHolidays[i][key].start;
            let end = this.calendarHolidays[i][key].end;
            // var testStart = moment.tz(this.calendarHolidays[i][key].start,zone).format(format) // 2018-03-22T05:30:00+05:30
            // console.log('Change Start As TZ',testStart);
            // var test = moment.tz(this.calendarHolidays[i][key].end,zone).format(format) // 2018-03-22T05:30:00+05:30
            // console.log('Change End As TZ',test);
            if(start && end){
              let startDate = start.substring(0, start.search("T"));
              let endDate = end.substring(0, end.search("T"));
              if(startDate === endDate){
                this.sameDate = true;
                this.calendarHolidays[i][key].sameDate = true;
                console.log("~~SAME~~",startDate,endDate);
              }else{
                this.sameDate =false;
                this.calendarHolidays[i][key].sameDate = false;
                console.log("NOt Equal")
              }
            }
          }
        }
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
      // console.log()
      if(Object.keys(obj).length === 0){
         this.holidaysArr = [];
      }else{
        for(var i in obj){
          let i = x;
          console.log(obj[i]);
          this.holidaysArr = (obj[i] != undefined) ? obj[i] : [];
        }
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
        this.getAllHolidaysCalendar(20, 0);
      },err => {
        console.log(err);
      })
      this.formField = new calendarField();

  }

  createHoliday(){
    console.log("create Holidays",this.calendarHolidays);
    console.log("this.holidaysArr",this.holidaysArr)
    console.log("~this.holidayTemp~",this.holidayTemp)
    console.log("create holiday works",this.model);
    for(var i in this.calendarHolidays){
      console.log(this.calendarHolidays[i]);
      for(var key in this.calendarHolidays[i]){
        console.log("~KEY item~",this.calendarHolidays[i][key]);
        this.holidayTemp.push(this.calendarHolidays[i][key]._id);
        console.log("~Array~",this.holidayTemp);
      }
    }
    let object= {
      "name": this.model.name,
      "start": this.changeDateFormat(this.model.start,"00:00"),
      "end": this.changeDateFormat(this.model.end,"23:59")
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
          this.maxDate ="";
          this.minDate = "";
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

  editHolidays(id,content){
    this.holidayTemp = [];
    this.isEdit = true;
    console.log(content)
    console.log(id);
    this._service.getSingleHoliday(id)
    .subscribe((res:any) => {
      console.log('single Holiday',res);
      this.model = res;
      this.modalReference = this.modalService.open(content, { backdrop:'static', windowClass:'holidayModal'});
      this.model.start = this.changeDateStrtoObj(res.start,"start");
      console.log(this.model.start);
      this.model.end = this.changeDateStrtoObj(res.end,"end");
      console.log(this.model.end);
    })
  }

  updateHolidays(){
    for(var i in this.calendarHolidays){
      console.log(this.calendarHolidays[i]);
      for(var key in this.calendarHolidays[i]){
        console.log("~KEY item~",this.calendarHolidays[i][key]);
        this.holidayTemp.push(this.calendarHolidays[i][key]._id);
        console.log("~Array~",this.holidayTemp);
      }
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
          this.maxDate ="";
          this.minDate = "";
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
      this.model = {};
      this.isEdit = false;
      // for(var key in this.holidaysArr){
      //   // console.log("key",this.holidaysArr[key]._id);
      //   this.holidayTemp.push(this.holidaysArr[key]._id);
      //   console.log("~~After Delete~~",this.holidayTemp)
      // }
      // let calendarObj = {
      //   "-id": this.calendarid,
      //   "holidays": this.holidayTemp
      // }
      // console.log(calendarObj)
      // this._service.updateCalendar(this.calendarid,calendarObj)
      // .subscribe((res:any)=>{
      //     console.log("res",res);
      //     this.model ={};
      //     this.holidayTemp = [];
      //     this.getSingleCalendar(this.currentID);
      //     this.isEdit = false;
      //   },err =>{
      //     console.log(err);
      //     // this.holidayTemp = [];
      //   });
    },err =>{
      console.log(err);
    })

  }

  onClickYear(year,content1,content2){
    console.log("this.calendarId",)
    this.selectedYear = year;
    console.log("~year~",year);
    console.log(this.calendarHolidays);
    this.getSelectedHolidayByYear(this.selectedYear,this.calendarHolidays);
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
    const now = new Date();
    // if(this.selectedYear)
    // this.showText = true;
    if(this.selectedYear == this.currentYear){
      console.log("True");
      this.model.start = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
      this.model.end = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
    }else{
      this.model.start = {year: this.selectedYear, month: 1, day: 1};
      this.model.end = {year: this.selectedYear, month: 1, day: 1};
    }
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
  showText:boolean = true;
  xxx(event){
    console.log('hi')
  }
  setMinDate(event){
    console.log("setMinDate",event);
    this.minDate = event;
    this.showText = false;
  }
  setMaxDate(date){
    console.log("setMaxDate",date);
    this.maxDate =  date;
  }

  closeFix(event, datePicker) {
    var parentWrap = event.path.filter(function(res){
      return res.className == "xxx-start"
    })
    console.log('~~~ ', parentWrap.length)
    if(parentWrap.length == 0){
      console.log('blank')
      datePicker.close();
    }
    
    // if(event.target.id == "dpStart" || event.target.nodeName == 'SELECT' || event.target.className =='ngb-dp-navigation-chevron' || event.target.nodeName == 'ngb-datepicker-navigation'){
    //       console.log('in the if')
    //       datePicker.open();
    // }else if(event.target.id != "dpStart"){
    //   console.log('in the else if')
    //   datePicker.close();
    // }
  }

  closeFixEnd(event, endPicker){
    var parentWrap = event.path.filter(function(res){
      return res.className == "xxx-end"
    })
    console.log('~~~ ', parentWrap.length)
    if(parentWrap.length == 0){
      console.log('blank')
      endPicker.close();
    }
  }

  currentMonth(event){
    console.log(event.next.month) 
    let vim = event;
    if(vim.next.month == 12){
      console.log(vim.next.month)
      $('.datepicker-wrap').addClass('hideRight');
    }else{
      $('.datepicker-wrap').removeClass('hideRight');
    }
    if(vim.next.month == 1){
      console.log(vim.next.month)
      $('.datepicker-wrap').addClass('hideLeft');
    }else{
      $('.datepicker-wrap').removeClass('hideLeft');
    }
  }

  cancelModal(){
    this.modalReference.close();
    this.model = {};
    // this.getSingleCalendar(this.currentID);
    this.isEdit = false;
    this.maxDate ="";
    this.minDate = "";
  }
    
}

