import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { appService } from '../../service/app.service';
import { Observable } from 'rxjs/Rx';
declare var $: any;

@Component({
  selector: 'app-courseplan',
  templateUrl: './courseplan.component.html',
  styleUrls: ['./courseplan.component.css']
})
export class CourseplanComponent implements OnInit {

  constructor(private modalService: NgbModal, private _service: appService) { }

  ngOnInit() {
    this.getAllCoursePlan()
  }
  depostiId: any[] = [
    { 
      "id": "5af915541de9052c869687a3" 
    },
    { 
      "id": "4cf915541de9052c869687a3" 
    }
  ];

  public regionID = '5af915541de9052c869687a3';
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

	open(content){
		this.showModal = true;
		this.showsubModal = false;
    this.showLoading = true;
		this.checked = false;
		this.modalReference = this.modalService.open(content, { size: 'lg', backdrop:'static', windowClass:'animation-wrap'});
    this.modalReference.result.then((result) => {
    this.showLoading = false;  
	  this.closeResult = `Closed with: ${result}`
  	}, (reason) => {
  	  this.closeResult = `Closed with: ${reason}`;
  	});
    this._service.getCategory(this.regionID)
    .subscribe((res:any) => {
      console.log('success',res)
      this.courseCategories = res;
      this.showLoading = false;
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
    this._service.createCoursePlan(this.regionID,data)
    .subscribe((res:any) => {
      console.log('success post',res)
      }, err => {
        console.log(err)
      })
		this.modalReference.close();
  }
  getAllCoursePlan(){
    this._service.getAllCoursePlan(this.regionID)
    .subscribe((res:any) => {
      this.courseplanLists = res;
      console.log(this.courseplanLists)
      }, err => {
        console.log(err)
      })
  }

}
