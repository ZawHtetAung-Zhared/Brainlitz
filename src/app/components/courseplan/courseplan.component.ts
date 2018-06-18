import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { appService } from '../../service/app.service';
import { Observable } from 'rxjs/Rx';
import { cPlanField } from './courseplan';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastsManager } from 'ng5-toastr/ng5-toastr';

declare var $: any;

@Component({
  selector: 'app-courseplan',
  templateUrl: './courseplan.component.html',
  styleUrls: ['./courseplan.component.css']
})
export class CourseplanComponent implements OnInit {

  constructor(private modalService: NgbModal, private _service: appService, public toastr: ToastsManager, public vcr: ViewContainerRef) { 
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.getAllCoursePlan();
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
  pdfId: any[] = [];
  public responseChecked: any[] = [];

	open(content){
    this.formField = new cPlanField();
		this.showModal = true;
		this.showsubModal = false;
    this.showLoading = true;
		this.checked = false;
    this.updateButton = false;
    this.createButton = true;
    this.getAllDeposit();
    this.getAllHolidaysCalendar();
    this.getAllPdf();
    this.responseChecked = [];
    this.pdfId = [];
		this.modalReference = this.modalService.open(content, { backdrop:'static', windowClass: 'animation-wrap', size: 'lg'});
    this.modalReference.result.then((result) => {
    this.formField = new cPlanField();
	  this.closeResult = `Closed with: ${result}`
  	}, (reason) => {
      this.formField = new cPlanField();
  	  this.closeResult = `Closed with: ${reason}`;
  	});
    this._service.getCategory(this.regionID)
    .subscribe((res:any) => {
      console.log('success',res)
      this.courseCategories = res;
      }, err => {
        console.log(err)
      });
	}

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
		console.log('created', formData)
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
      "holidayCalendarId": formData.holidayCalendar
    }

    this.blockUI.start('Loading...');
    this.modalReference.close();
    this._service.createCoursePlan(this.regionID,data)
    .subscribe((res:any) => {
      console.log('success post',res);
      this.toastr.success('Successfully Created.');
      this.blockUI.stop();
      this.getAllCoursePlan();
      }, err => {
        this.toastr.error('Create Fail');
        this.blockUI.stop();
        console.log(err)
      })
      this.pdfName = [];
      this.pdfId = [];
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
  
  ChangeValue(e){
    if(e.target.checked == true){
      this.pdfId.push(e.target.value); 
      console.log(this.pdfId)
    }
    else {
      var index = this.pdfList.indexOf(e.target.value);
      this.pdfId.splice(index, 1);
      console.log(this.pdfId)
    }
  }

  viewPlan(view, id){
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
      if(this.holidayCalendarLists){
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

  getAllHolidaysCalendar(){
      this._service.getAllHolidaysCalendar(this.regionID)
      .subscribe((res:any) => {
        this.holidayCalendarLists = res;
        }, err => {
          console.log(err)
        })
  }

  getAllPdf(){
    this._service.getAllPdf(this.regionID)
    .subscribe((res:any) => {
      this.pdfList = res;
    }, err => {
      console.log(err)
    })
  }

  editcPlan(content, id){
    console.log(id)
    this.getAllPdf();
    this.responseChecked = [];
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
      this.responseChecked = this.formField.quizwerkz;
      this.pdfId = this.responseChecked;
       console.log( this.pdfId);
      this.editId = res._id;
    },err => {
      console.log(err);
    })
  }

  updatedPlan(formData){
    console.log('updated', formData, this.pdfId)
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
      "holidayCalendarId": formData.holidayCalendar
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

}
