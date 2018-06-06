import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { appService } from '../../service/app.service';
import { Observable } from 'rxjs/Rx';
import { cPlanField } from './courseplan';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

declare var $: any;

@Component({
  selector: 'app-courseplan',
  templateUrl: './courseplan.component.html',
  styleUrls: ['./courseplan.component.css']
})
export class CourseplanComponent implements OnInit {

  constructor(private modalService: NgbModal, private _service: appService) { }

  ngOnInit() {
    this.getAllCoursePlan();
  }

  public regionID = localStorage.getItem('regionId');;
	showModal: boolean = false;
	showsubModal: boolean = true;
	checked: boolean = false;
	modalReference: any;
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
  holidayLists: any;

	open(content){
		this.showModal = true;
		this.showsubModal = false;
    this.showLoading = true;
		this.checked = false;
    this.getAllDeposit();
    this.getAllHolidays();
		this.modalReference = this.modalService.open(content, { backdrop:'static', windowClass:'animation-wrap', size: 'lg'});
    this.modalReference.result.then((result) => {
    this.formField = new cPlanField();
    //this.showLoading = false;  
	  this.closeResult = `Closed with: ${result}`
  	}, (reason) => {
      this.formField = new cPlanField();
      //this.showLoading = false;
  	  this.closeResult = `Closed with: ${reason}`;
  	});
    this._service.getCategory(this.regionID)
    .subscribe((res:any) => {
      console.log('success',res)
      this.courseCategories = res;
      //this.showLoading = false;
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


	createdPlan(formData) {
		console.log('created', formData)
    let data = {
      "regionId": this.regionID,
      "categoryId": this.categoryId,
      "name": formData.coursename,
      "description": formData.description,
      "makeupPolicy": {
        "allowMakeupPass": formData.allowMakeup,
        "maxPassPerUser":  formData.makeupUser,
        "maxDayPerPass": formData.makeupPass
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
      "quizwerkz": 'dummystring'

    }
    this.blockUI.start('Loading...');
    this.modalReference.close();
    this._service.createCoursePlan(this.regionID,data)
    .subscribe((res:any) => {
      console.log('success post',res);
      this.blockUI.stop();
      this.getAllCoursePlan();
      }, err => {
        console.log(err)
      })
  }

  deleteCoursePlan(id){
		console.log(id)
		this._service.deleteCoursePlan(id)
		.subscribe((res:any) => {
			console.log(res);
			this.getAllCoursePlan();
		},err => {
			console.log(err);
		})
	}

  getAllCoursePlan(){
    this.blockUI.start('Loading...');
    this._service.getAllCoursePlan(this.regionID)
    .subscribe((res:any) => {
      this.courseplanLists = res;
      this.blockUI.stop();
      console.log(this.courseplanLists)
      }, err => {
        console.log(err)
      })
  }

  getAllDeposit(){
    this._service.getAllDeposit(this.regionID)
    .subscribe((res:any) => {
      this.depositLists = res;
      console.log(this.courseplanLists)
      }, err => {
        console.log(err)
      })
  }

  getAllHolidays(){
      this._service.getAllHolidays(this.regionID)
      .subscribe((res:any) => {
        this.holidayLists = res;
        }, err => {
          console.log(err)
        })
  }

}
