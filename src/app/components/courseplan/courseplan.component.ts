import { Component, OnInit, ViewContainerRef, HostListener, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { appService } from '../../service/app.service';
import { Observable } from 'rxjs/Rx';
import { cPlanField } from './courseplan';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastsManager } from 'ng5-toastr/ng5-toastr';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-courseplan',
  templateUrl: './courseplan.component.html',
  styleUrls: ['./courseplan.component.css']
})
export class CourseplanComponent implements OnInit {

  constructor(private modalService: NgbModal, private _service: appService, public toastr: ToastsManager, public vcr: ViewContainerRef, private eRef: ElementRef, private _router: Router) { 
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    //this.getAllCoursePlan();

    this.showModal = true;
    this.showsubModal = false;
    this.showLoading = true;
    this.checked = false;
    this.updateButton = false;
    this.createButton = true;
    this.restrictFirstInput = false;
    this.restrictLastInput = false;
    this.getAllDeposit();
    this.getAllHolidaysCalendar();
    this.getAllPdf();
    this.getAllAPG();
    this.pdfId = [];
   // this.formField = new cPlanField();
    this.formField.holidayCalendarId = 'disabledHoliday';
    this.depositModel = 'disabledDeposit';
    this.rangeHr = '0';
    this.rangeMin = '0';
    this.readyOnlyRange = '0 min';

    window.addEventListener('scroll', this.scroll, true);

    setTimeout(function(){
      $('.drag-wrapper .drag-scroll-content').css({'display':'flex', 'width': '100%'})
    }, 200)

  }

	public showModal: boolean = false;
	public showsubModal: boolean = true;
	public checked: boolean = false;
	modalReference: any;
  modalReference1: any;
	closeResult: any;
  checkedName: any;
  courseCategories: any;
  categoryId: any;
  allowchecked: boolean = false;
  allowMakeup: boolean = false;
  checkedCatId: any;
  public courseplanLists: any;
  public showLoading: boolean = false;
  formField: cPlanField = new cPlanField();
  depositLists: any;
  @BlockUI() blockUI: NgBlockUI;
  holidayCalendarLists: any;
  public updateButton: boolean = false;
  public createButton: boolean = true;
  public regionID = localStorage.getItem('regionId');
  editId: any;
  selectcPlan: any;
  viewCplan: any;
  holidayCalendarName: any;
  depositName: any;
  pdfList: any[] = [];
  pdfName: any[] = [];
  apgName: any[] = [];
  public pdfId: any[] = [];
  public apgId: any[] = [];
  public responseChecked: any[] = [];
  restrictFirstInput: boolean = false;
  restrictLastInput: boolean = false;
  restrictFirstLessInput: boolean = false;
  restrictLastLessInput: boolean = false;
  apgList: any;
  progressSlider: boolean = false;
  rangeHr: any;
  rangeMin: any;
  public navIsFixed: boolean = false;
  public depositModel: any;

	//open(content){
   // this.formField = new cPlanField();
		//this.showModal = true;
	// 	this.showsubModal = false;
 //    this.showLoading = true;
	// 	this.checked = false;
 //    this.updateButton = false;
 //    this.createButton = true;
 //    this.restrictFirstInput = false;
 //    this.restrictLastInput = false;
 //    this.getAllDeposit();
 //    this.getAllHolidaysCalendar();
 //    this.getAllPdf();
 //    this.getAllAPG();
 //    this.pdfId = [];
 //    this.apgId = [];
	// 	this.modalReference = this.modalService.open(content, { backdrop:'static', windowClass: 'animation-wrap', size: 'lg'});
 //    this.modalReference.result.then((result) => {
 //    this.formField = new cPlanField();
	//   this.closeResult = `Closed with: ${result}`
 //  	}, (reason) => {
 //      this.formField = new cPlanField();
 //  	  this.closeResult = `Closed with: ${reason}`;
 //  	});
 //    this._service.getCategory(this.regionID)
 //    .subscribe((res:any) => {
 //      console.log('success',res)
 //      this.courseCategories = res;
 //      }, err => {
 //        console.log(err)
 //      });
	// }

	selectedRadioId(id){
    console.log(id)
		this.showModal = false;
		this.showsubModal = true;
    this.categoryId = id;
    this.allowchecked = false;
    this.allowMakeup = false;
    this.checkedName = this.checked;
	}

	back(){
		this.showModal = true;
		this.showsubModal = false;
	}

	checkedData(id){
      this.checkedCatId = id;
	}

  getInteger(int){
    var regx = /^[-+]?[\d.]+$/g;
    return regx.test(int);
  }

  categoryName: any;

	createdPlan(formData) {
		console.log('form', formData)
    var day = formData.lesson_duration;
    console.log('this.timeInminutes', this.timeInminutes)
    let data = {
      "regionId": this.regionID,
      "categoryId": this.categoryId,
      "name": formData.coursename,
      "description": formData.description,
      "makeupPolicy": {
        "allowMakeupPass": formData.allowmakeup,
        "maxPassPerUser":  formData.makeupuser,
        "maxDayPerPass": formData.makeuppass
      },
      "allowPagewerkzBooks": formData.allowpagewerkz,
      "paymentPolicy": {
        "deposit": formData.deposit,
        "courseFee": formData.courseFee,
        "allowProrated": formData.allowProrated,
        "proratedLessonFee": formData.proratedLessonFee,
        "miscFee": formData.miscFee
      },
      "lesson": {
        "min": formData.minDuration,
        "max": formData.maxDuration,
        "duration": this.timeInminutes
      },
      "seats": formData.seats,
      "age": {
        "min": formData.minage,
        "max": formData.maxage,
      },
      "quizwerkz": this.pdfId,
      "holidayCalendarId": formData.holidayCalendar,
      "accessPointGroup": this.apgId
    }

    //this.blockUI.start('Loading...');
    //this.modalReference.close();
    //this._service.createCoursePlan(this.regionID,data)
    //.subscribe((res:any) => {
    //  console.log('success post',res);
   //   this.toastr.success('Successfully Created.');
   //   this.blockUI.stop();
      // this.getAllCoursePlan();
      // }, err => {
      //   this.toastr.error('Create Fail');
      //   this.blockUI.stop();
      //   console.log(err)
      // })
      // this.pdfName = [];
      // this.pdfId = [];
  }

  onclickDelete(cplan, confirmDelete1){
    this.selectcPlan = cplan;
    this.modalReference = this.modalService.open(confirmDelete1, { backdrop:'static', windowClass: 'animation-wrap'});
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Closed with: ${reason}`;
    });
  }

  confirmDelete(selectcPlan ,confirmDelete2){
    this.selectcPlan = selectcPlan;
    this.modalReference.close();
    this.modalReference1 = this.modalService.open(confirmDelete2, { backdrop:'static', windowClass: 'animation-wrap'});
    this.modalReference1.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Closed with: ${reason}`;
    });
  }

  deleteCoursePlan(id) {
		console.log(id)
    this.blockUI.start('Loading...');
    this.modalReference1.close();
		this._service.deleteCoursePlan(id)
		.subscribe((res:any) => {
			console.log(res);
      setTimeout(() => {
        this.blockUI.stop(); // Stop blocking
      }, 300);
      this.toastr.success('Successfully Deleted.');
			this.getAllCoursePlan();
		},err => {
     this.toastr.error('Delete Fail');
			console.log(err);
		})
	}
  
  ChangeValue(data, e, type){
    if(type == "pdf"){
      var cbIdx = this.pdfId.indexOf(data);
      if(e.target.checked == true){
        console.log('true')
        if(cbIdx < 0 )
          this.pdfId.push(data);
          console.log(this.pdfId)
      }
      else {
        console.log('false')
        if(cbIdx >= 0 ){
          this.pdfId.splice(cbIdx, 1);
          console.log(this.pdfId)
        }
      }
    }
    else {
      var cbIdx = this.apgId.indexOf(data);
      if(e.target.checked == true){
        console.log('true')
        if(cbIdx < 0 )
          this.apgId.push(data);
          console.log(this.apgId)
      }
      else {
        console.log('false')
        if(cbIdx >= 0 ){
          this.apgId.splice(cbIdx, 1);
          console.log(this.apgId)
        }
      }
    }
  }

  viewPlan(view, id){
    this.getAllAPG();
    this.getAllHolidaysCalendar();
    this.getAllDeposit();
    this.getAllPdf();
    this.modalReference = this.modalService.open(view, { backdrop:'static', windowClass: 'animation-wrap'});
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Closed with: ${reason}`;
    });
    this._service.getSignlecPlan(id)
    .subscribe((res:any) => {
      console.log(res);
      this.viewCplan = res;
      if(!this.viewCplan.holidayCalendarId){
        this.holidayCalendarName = "";
      }
      else {
        for( var i = 0; i < this.holidayCalendarLists.length; i++){
          if(this.viewCplan.holidayCalendarId == this.holidayCalendarLists[i]._id){
            this.holidayCalendarName = this.holidayCalendarLists[i].name;
          }
        }
      }
      if(this.depositLists){
        for( var j = 0; j < this.depositLists.length; j++){
          if(this.viewCplan.paymentPolicy.deposit == this.depositLists[j]._id){
            this.depositName = this.depositLists[j].amount;
          }
        }
      }
      if(this.pdfList){
        this.pdfName = [];
        for(var i= 0; i < this.viewCplan.quizwerkz.length; i++){
          for(var j= 0; j < this.pdfList.length; j++){
            if(this.viewCplan.quizwerkz[i] == this.pdfList[j]._id){
              this.pdfName.push(this.pdfList[j].name);
            }
          }
        }
      }
      if(this.apgList){
        this.apgName = [];
        for(var i= 0; i < this.viewCplan.accessPointGroup.length; i++){
          for(var j= 0; j < this.apgList.length; j++){
            if(this.viewCplan.accessPointGroup[i] == this.apgList[j]._id){
              this.apgName.push(this.apgList[j].name);
            }
          }
        }
      }
      this._service.getCategory(this.regionID)
      .subscribe((res:any) => {
        this.courseCategories = res;
          for(var i=0; i < this.courseCategories.length; i++){
            if(this.viewCplan.categoryId == this.courseCategories[i]._id){
              this.checkedName = this.courseCategories[i].name;
            }
          }
        }, err => {
          console.log(err)
        });
    },err => {
      console.log(err);
    })
  }

  getAllCoursePlan(){
    this.blockUI.start('Loading...');
    this._service.getAllCoursePlan(this.regionID)
    .subscribe((res:any) => {
      this.courseplanLists = res;
      setTimeout(() => {
        this.blockUI.stop(); // Stop blocking
      }, 300);
      console.log(this.courseplanLists)
      }, err => {
        console.log(err)
      })
  }

  getAllDeposit(){
    this._service.getAllDeposit(this.regionID)
    .subscribe((res:any) => {
      this.depositLists = res;
      console.log(this.depositLists)
      }, err => {
        console.log(err)
      })
  }

  getAllAPG(){
    this.blockUI.start('Loading...');
    this._service.getAllAPG(this.regionID)
    .subscribe((res:any) => {
      console.log('apgLists' ,res)
      this.apgList = res;
      setTimeout(() => {
        this.blockUI.stop(); // Stop blocking
      }, 300);
      }, err => {
        console.log(err)
      })
  }

  getAllHolidaysCalendar(){
      this._service.getAllHolidaysCalendar(this.regionID)
      .subscribe((res:any) => {
        this.holidayCalendarLists = res;
        console.log(this.holidayCalendarLists)
        }, err => {
          console.log(err)
        })
  }

  getAllPdf(){
    this._service.getAllPdf(this.regionID)
    .subscribe((res:any) => {
      console.log('pdflists',res)
      this.pdfList = res;
    }, err => {
      console.log(err)
    })
  }

  editcPlan(content, id){
    console.log(id)
    this.getAllPdf();
    this.getAllAPG();
    this.responseChecked = [];
    this.pdfId = [];
    this.apgId = [];
    this.updateButton = true;
    this.createButton = false;
    this.getAllDeposit();
    this.getAllHolidaysCalendar();
    this.showModal = false;
    this.showsubModal = true;
    this.modalReference = this.modalService.open(content,{ backdrop:'static', windowClass:'animation-wrap', size: 'lg'});
    this._service.getSignlecPlan(id)
    .subscribe((res:any) => {
      console.log(res);
      this.formField = res;
      if(!this.formField.holidayCalendarId){
        this.formField.holidayCalendarId = '';
      }
      this.pdfId = this.formField.quizwerkz; 
      this.apgId =  this.formField.accessPointGroup;   
      this.editId = res._id;
    },err => {
      console.log(err);
    })
  }

  updatedPlan(formData){
    console.log('updated', formData, this.pdfId)
    if(formData.holidayCalendar == ''){
      formData.holidayCalendar = undefined;
    }
    let data = {
      "regionId": this.regionID,
      "categoryId": this.categoryId,
      "name": formData.coursename,
      "description": formData.description,
      "makeupPolicy": {
        "allowMakeupPass": formData.allowmakeup,
        "maxPassPerUser":  formData.makeupuser,
        "maxDayPerPass": formData.makeuppass
      },
      "allowPagewerkzBooks": formData.allowpagewerkz,
      "paymentPolicy": {
        "deposit": formData.deposit,
        "courseFee": formData.courseFee,
        "allowProrated": formData.allowProrated,
        "proratedLessonFee": formData.proratedLessonFee,
        "miscFee": formData.miscFee
      },
      "lesson": {
        "min": formData.minDuration,
        "max": formData.maxDuration,
        "duration": formData.lesson_duration
      },
      "seats": formData.seats,
      "age": {
        "min": formData.minage,
        "max": formData.maxage,
      },
      "quizwerkz": this.pdfId,
      "holidayCalendarId": formData.holidayCalendar,
      "accessPointGroup": this.apgId
    }
    this.blockUI.start('Loading...');
    this.modalReference.close();
    console.log('this.editId', this.editId)
    this._service.updateSignlecPlan(this.editId, data)
    .subscribe((res:any) => {
      console.log(res);
      this.toastr.success('Successfully Updated.');
      this.blockUI.stop();
      this.getAllCoursePlan();
    },err => {
      console.log(err);
    })
    this.formField = new cPlanField();
  }

  restrictMinNumberInput(e, minValue, type){
    if(type == 'age'){
      if(e.target.value <= minValue.model){
        this.restrictLastInput = true;
      }
      else {
        this.restrictLastInput = false;
        this.restrictFirstInput = false;
      }
    }
    else if(type == 'lesson'){
      if(e.target.value <= minValue.model){
        this.restrictLastLessInput = true;
      }
      else {
        this.restrictLastLessInput = false;
        this.restrictFirstLessInput = false;
      }

    }
    else {
      console.log('error no type');
    }
  }

  restrictMaxNumberInput(e, maxValue, type){
    if(type == 'age'){
      if(e.target.value >= maxValue.model){
          this.restrictFirstInput = true;
        }
        else {
          this.restrictFirstInput = false;
          this.restrictLastInput = false;
        }
    }
    else if(type == 'lesson'){
      if(e.target.value >= maxValue.model){
        this.restrictFirstLessInput = true;
      }
      else {
        this.restrictFirstLessInput = false;
        this.restrictLastLessInput = false;
      }
    }
    else {
      console.log('error no type');
    }

  }

  durationProgress($event){
    this.progressSlider = true;
  }

  @HostListener('document:click', ['$event'])
    public documentClick(event): void {
        if(this.progressSlider != true){
           $('.bg-box').css({ 'display': "none" });   
        }
        else {
            $('.bg-box').css({ 'display': "block" }); 
            $('.bg-box').click(function(event){
                event.stopPropagation();
            });
            this.progressSlider = false;

        }
  }

  public selectedHrRange: any;
  public selectedMinRange: any;
  public overDurationHr: boolean = false;
  public readyOnlyRange: any;
  public timeInminutes: any;

  ChangedRangeValue(e, type) {
    if(type == 'hr'){
      this.selectedHrRange = e;
      this.overDurationHr = false;
      if(this.selectedHrRange == 24){
        this.overDurationHr = true;
        this.rangeMin = 0;
        this.selectedMinRange = 0;
      }
    }
    if(type == 'min'){
      this.selectedMinRange = e;
    }

    if(this.selectedHrRange && this.selectedMinRange){
      this.timeInminutes = (parseInt(this.selectedHrRange) * 60) +  parseInt(this.selectedMinRange);
      this.readyOnlyRange = (parseInt(this.selectedHrRange)) +'hr'+ +  parseInt(this.selectedMinRange) +'min';
    }
    else if(this.selectedHrRange){
      this.timeInminutes = (parseInt(this.selectedHrRange) * 60);
      this.readyOnlyRange = (parseInt(this.selectedHrRange)) + 'hr';
    }
    else if(this.selectedMinRange){
      this.timeInminutes = parseInt(this.selectedMinRange);
      this.readyOnlyRange = parseInt(this.selectedMinRange) + 'min';
    }
    else {
      console.log('error')
    }
    console.log('durationMinutes',this.timeInminutes)
      
  }

  numberOnly(event, type){
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    if(event.target.value.search(/^0/) != -1){
        event.target.value = '';  
    }
  }

  cplan() {
    this.showModal = false;
    this.showsubModal = true;
  }

  scroll = (e): void => {
  };

  @HostListener('window:scroll', ['$event']) onScroll($event){
    if(window.pageYOffset > 90){
      this.navIsFixed = true;
    }else{
      this.navIsFixed = false;
    }
  } 

  ngOnDestroy() {
      window.removeEventListener('scroll', this.scroll, true);
  }

  cancel(){
    this._router.navigate(['/course']);
  }


}
