import { Component, OnInit, ViewContainerRef, HostListener, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { appService } from '../../service/app.service';
import { Observable, Subject } from 'rxjs';
import { cPlanField } from './courseplan';
import { apgForm } from './courseplan';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastsManager } from 'ng5-toastr/ng5-toastr';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

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
  formAPG: apgForm = new apgForm();
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
  public selectedHrRange: any;
  public selectedMinRange: any;
  public overDurationHr: boolean = false;
  public readyOnlyRange: any;
  public timeInminutes: any;
  public goBackCat: boolean = false;
  public focusCfee: boolean = false;
  public focusMisfee: boolean = false;
  step1FormaData: any;
  step2FormaData: any;
  step3FormaData: any;
  step4FormaData: any;
  step5FormaData: any;
  step6FormaData: any;
  selectedSearchLists: any[] = [];
  step1: boolean = false;
  step2: boolean = false;
  step3: boolean = false;
  step4: boolean = false;
  step5: boolean = false;
  step6: boolean = false;
  step7: boolean = false;
  moduleList: any [] = [];
  showSearchAPG: boolean = true;
  createAPGform: boolean = false;
  showModule: boolean = false;
  selectedAPGlists: boolean = false;
  ischecked: any;
  model: any;
  createdAPGstore: any [] = [];
  clickedItem: any;
  selectedAPGidArray: any[] = [];
  showNewAPGbox: boolean = false;

  ngOnInit() {
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
    this.formField.holidayCalendarId = 'disabledHoliday';
    this.depositModel = 'deposit';
    this.rangeHr = '0';
    this.rangeMin = '0';
    this.readyOnlyRange = '0  min';
    this.categoryId  = localStorage.getItem('categoryID');
    this.checkedName = localStorage.getItem('categoryName');
    this.goBackCat = true;
    window.addEventListener('scroll', this.scroll, true);

    setTimeout(function(){
      $("#step1").addClass('active');
    }, 200)

    this.step1 = true;
    this.getAllModule();
    this.showSearchAPG = true;
  }

  @ViewChild('parentForm') mainForm;

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => term === '' ? []
        : this.apgList.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );

  formatter = (x: {name: string}) => x.name;

  SearchBoxEmpty(): String {
    var name;
    return name
  }

  selectedItem(item){
    this.clickedItem = item.item;
    const i = this.createdAPGstore.findIndex(_item => _item._id === this.clickedItem._id);
    if (i > -1) this.createdAPGstore[i] = this.clickedItem; 
    else this.createdAPGstore.push(this.clickedItem);
    console.log(this.createdAPGstore)
    this.selectedAPGlists = true;
    this.showSearchAPG = true;
    this.showModule = false;
    this.createAPGform = false;
  }

  removeSelectedAPG(data){
    var index = this.createdAPGstore.findIndex(function(element){
       return element._id===data._id;
    })
    if(index!==-1){
      this.createdAPGstore.splice(index, 1)
    }
    console.log(this.createdAPGstore)
  }


	back(){
    this.goBackCat = false;
    var data = localStorage.removeItem("categoryName");
    this._service.backCat();
	}

  cancel(){
    this.goBackCat = false;
    var data = localStorage.removeItem("categoryName");
    this._service.backCourse();
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
    if(formData.deposit == 'deposit'){
      console.log(formData.deposit)
      formData.deposit = '';
    }
    let data = {
      "regionId": this.regionID,
      "categoryId": this.categoryId,
      "name": this.step1FormaData.coursename,
      "description": this.step1FormaData.description,
      "seats": this.step1FormaData.seats,
      "makeupPolicy": {
        "allowMakeupPass": this.step2FormaData.allowmakeup,
        "maxPassPerUser":  this.step2FormaData.makeupuser,
        "maxDayPerPass": this.step2FormaData.makeuppass
      },
      "paymentPolicy": {
        "deposit": formData.deposit,
        "courseFee": this.step3FormaData.courseFee,
        "proratedLessonFee": formData.allowProrated,
        "miscFee": formData.miscFee
      },
      "lesson": {
        "min": formData.minDuration,
        "max": formData.maxDuration,
        "duration": this.timeInminutes
      },
      "allowPagewerkz": this.step5FormaData.allowpagewerkz,
      "age": {
        "min": formData.minage,
        "max": formData.maxage,
      },
      "quizwerkz": this.pdfId,
      "holidayCalendarId": this.step4FormaData.holidayCalendar,
      "accessPointGroup": this.selectedAPGidArray
    }
    console.log(data)
    this.blockUI.start('Loading...');
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
      this.mainForm.reset();
      this.formField = new cPlanField();
      this.pdfId = [];
      this.timeInminutes = "";
      this.selectedAPGidArray = [];
      this.createdAPGstore = [];
      this.model = '';
      this.selectedAPGlists = false;
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
      "allowPagewerkz": formData.allowpagewerkz,
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

        if(this.focusCfee == true){
          $('.cfee-bg').addClass("focus-bg");
        }
        else {
          $('.cfee-bg').removeClass("focus-bg");
        }
        this.focusCfee = false;

        if(this.focusMisfee == true){
          $('.misfee-bg').addClass("focus-bg");
        }
        else {
          $('.misfee-bg').removeClass("focus-bg");
        }
        this.focusMisfee = false;
  }

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
      this.readyOnlyRange = (parseInt(this.selectedHrRange)) + ' ' + 'hr' + ' ' +  parseInt(this.selectedMinRange) + ' ' + 'min';
    }
    else if(this.selectedHrRange){
      this.timeInminutes = (parseInt(this.selectedHrRange) * 60);
      this.readyOnlyRange = (parseInt(this.selectedHrRange)) + ' ' + 'hr';
    }
    else if(this.selectedMinRange){
      this.timeInminutes = parseInt(this.selectedMinRange);
      this.readyOnlyRange = parseInt(this.selectedMinRange) + ' ' + 'min';
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
    if(window.pageYOffset > 40){
      this.navIsFixed = true;
    }else{
      this.navIsFixed = false;
    }
  } 

  ngOnDestroy() {
      window.removeEventListener('scroll', this.scroll, true);
  }

  toKnowFocus(type){
    if(type == 'cFee'){
      this.focusCfee = true;
      $('.cfee-bg').addClass("focus-bg");
    }
    if(type == 'misFee'){
      this.focusMisfee = true;
      $('.misfee-bg').addClass("focus-bg");
    }
  }

  enterHover(e){
    console.log('mouse enter')
    $('.input-group-text').css('background', '#f7f9fa');
    $('.input[type="number"]').css('background', '#f7f9fa');
  }

  leaveHover(e){
    console.log('mouse out')
    $('.input-group-text').css('background', '#fff');
  }

  backStep(type){
    if(type == 'step2'){
      this.step2 = false;
      this.step1 = true;
      if(this.step1 == true){
        $("#step2").removeClass('active');
        $("#step1").removeClass('done');
        $("#step1").addClass('active');
      }
    }
    if(type == 'step3'){
      this.step1 = false;
      this.step2 = true;
      this.step3 = false;
      if(this.step2 == true){
        $("#step3").removeClass('active');
        $("#step2").removeClass('done');
        $("#step1").addClass('done');
        $("#step2").addClass('active');
      }
    }
    if(type == 'step4'){
      this.step1 = false;
      this.step2 = false;
      this.step3 = true;
      this.step4 = false;
      if(this.step3 == true){
        $("#step4").removeClass('active');
        $("#step3").removeClass('done');
        $("#step1, #step2").addClass('done');
        $("#step3").addClass('active');
      }
    }
    if(type == 'step5'){
      this.step1 = false;
      this.step2 = false;
      this.step3 = false;
      this.step4 = true;
      this.step5 = false;
      if(this.step4 == true){
        $("#step5").removeClass('active');
        $("#step4").removeClass('done');
        $("#step1, #step2, #step3").addClass('done');
        $("#step4").addClass('active');
      }
    }
    if(type == 'step6'){
      this.step1 = false;
      this.step2 = false;
      this.step3 = false;
      this.step4 = false;
      this.step5 = true;
      this.step6 = false;
      if(this.step5 == true){
        $("#step6").removeClass('active');
        $("#step5").removeClass('done');
        $("#step1, #step2, #step3, #step4").addClass('done');
        $("#step5").addClass('active');
      }
    }
    if(type == 'step7'){
      this.step1 = false;
      this.step2 = false;
      this.step3 = false;
      this.step4 = false;
      this.step5 = false;
      this.step6 = true;
      this.step7 = false;
      if(this.step6 == true){
        $("#step7").removeClass('active');
        $("#step6").removeClass('done');
        $("#step1, #step2, #step3, #step4, #step5").addClass('done');
        $("#step6").addClass('active');
      }
    }
  }

  continueStep(type, data){
    if(type == 'step1'){
      this.step1FormaData = data;
      console.log(this.step1FormaData)
      this.step1 = false;
      if(this.step1 == false){
        $("#step1").removeClass('active');
        $("#step1").addClass('done');
        $("#step2").addClass('active');
        this.step2 = true;
      }
    }
    if(type == 'step2'){
      this.step2FormaData = data;
      console.log(this.step2FormaData)
      this.step1 = false;
      this.step2 = false;
      if(this.step2 == false){
        $("#step2").removeClass('active');
        $("#step1").addClass('done');
        $("#step2").addClass('done');
        $("#step3").addClass('active');
        this.step3 = true;
      }
    }
    if(type == 'step3'){
      this.step3FormaData = data;
      console.log(this.step3FormaData)
      this.step1 = false;
      this.step2 = false;
      this.step3 = false;
      if(this.step3 == false){
        $("#step3").removeClass('active');
        $("#step1").addClass('done');
        $("#step2").addClass('done');
        $("#step3").addClass('done');
        $("#step4").addClass('active');
        this.step4 = true;
      }
    }
    if(type == 'step4'){
      this.step4FormaData = data;
      console.log(this.step4FormaData)
      this.step1 = false;
      this.step2 = false;
      this.step3 = false;
      this.step4 = false;
      if(this.step4 == false){
        $("#step4").removeClass('active');
        $("#step1").addClass('done');
        $("#step2").addClass('done');
        $("#step3").addClass('done');
        $("#step4").addClass('done');
        $("#step5").addClass('active');
        this.step5 = true;
      }
    }
    if(type == 'step5'){
      this.step5FormaData = data;
      console.log(this.step5FormaData)
      this.step1 = false;
      this.step2 = false;
      this.step3 = false;
      this.step4 = false;
      this.step5 = false;
      if(this.step5 == false){
        $("#step5").removeClass('active');
        $("#step1").addClass('done');
        $("#step2").addClass('done');
        $("#step3").addClass('done');
        $("#step4").addClass('done');
        $("#step5").addClass('done');
        $("#step7").addClass('active');
        this.step6 = true;
      }
    }
    if(type == 'step6'){
      console.log(data)
      this.selectedAPGidArray = [];
      for(var i in data){
        this.selectedAPGidArray.push(data[i]._id);
      }
      console.log(this.selectedAPGidArray)
      this.step1 = false;
      this.step2 = false;
      this.step3 = false;
      this.step4 = false;
      this.step5 = false;
      this.step6 = false;
      if(this.step6 == false){
        $("#step5").removeClass('active');
        $("#step1").addClass('done');
        $("#step2").addClass('done');
        $("#step3").addClass('done');
        $("#step4").addClass('done');
        $("#step5").addClass('done');
        $("#step6").addClass('active');
        this.step7 = true;
      }
    }
    if(type == 'step7'){
      this.step1 = false;
      this.step2 = false;
      this.step3 = false;
      this.step4 = false;
      this.step5 = false;
      this.step7 = false;
      if(this.step7 == false){
        $("#step5").removeClass('active');
        $("#step1").addClass('done');
        $("#step2").addClass('done');
        $("#step3").addClass('done');
        $("#step4").addClass('done');
        $("#step5").addClass('done');
        $("#step6").addClass('done');
        $("#step7").addClass('active');
      }
    }
  }

  getAllModule(){
      this._service.getAllModule(this.regionID)
      .subscribe((res:any) => {
        console.log('moduleLists' ,res)
        for(var i in res){
          if(res[i]._id != null){
            this.moduleList.push(res[i]);
          }
        }

        }, err => {
          console.log(err)
        })
    }

    chooseModuleType(id, name){
      console.log(id, name)
      this.ischecked = id;
      setTimeout(() => {
        this.createAPGform = true;
        this.showModule = false;
        this.showSearchAPG = false;
        this.selectedAPGlists = false;
      }, 300);
    }

    backModule(){
      this.showModule = true;
      this.showSearchAPG = false;
      this.createAPGform = false;
      this.formAPG = new apgForm();
      this.selectedAPGlists = false;
    }

    backSearhAPG(type){
      this.showSearchAPG = true;
      this.showModule = false;
      this.createAPGform = false;      
      this.formAPG = new apgForm();
      this.selectedAPGlists = true;
    }

    goToModule(){
      this.showSearchAPG = false;
      this.showModule = true;
      this.selectedAPGlists = false;
      this.ischecked = '';
    }

    createAPGs(data){
      console.log(data);
      var templateID;
      var moduleId = localStorage.getItem('moduleID')
        data["moduleId"] = moduleId;
         this._service.createAP(this.regionID, data)
         .subscribe((res:any) => {
           this.toastr.success('Successfully AP Created.');
           data["accessPoints"] = [res._id]
           console.log(data)
           this._service.createAPG(this.regionID,data, templateID, moduleId)
          .subscribe((response:any) => {
            this.toastr.success('Successfully APG Created.');
            console.log(response)
            this.formAPG = new apgForm();
            this.createdAPGstore.push(response);
            this.showSearchAPG = true;
            this.selectedAPGlists = true;
            this.showModule = false;
            this.createAPGform = false;
            this.getAllAPG();
          }, err => {
            this.toastr.error('Created APG Fail');
            console.log(err)
          });
         }, err => {
           this.toastr.error('Created AP Fail');
           console.log(err)
         });
    }

}
