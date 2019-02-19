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
import { feeOption } from './courseplan';

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
  public optionFee: boolean = false;
  public showModal: boolean = false;
  public showsubModal: boolean = true;
  public checked: boolean = false;
  public isfocus: boolean = false;
  modalReference: any;
  modalReference1: any;
  closeResult: any;
  checkedName: any;
  courseCategories: any;
  categoryId: any;
  allowchecked: boolean = false;
  allowMakeup: boolean = false;
  checkedCatId: any;
  public courseplanLists: any =  [];
  public showLoading: boolean = false;
  // formField = {};
  formField: cPlanField = new cPlanField();
  formAPG: apgForm = new apgForm();
  depositLists: any;
  @BlockUI() blockUI: NgBlockUI;
  holidayCalendarLists: any;
  public updateButton: boolean = false;
  public createButton: boolean = true;
  public regionID = localStorage.getItem('regionId');
  public locationID = localStorage.getItem('locationId');
  public currency = JSON.parse(localStorage.getItem('currency'));
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
  public focusProFee: boolean = false;
  public focusOptionfee: boolean = false;
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
  moduleList: Array<any> = [];
  showSearchAPG: boolean = true;
  createAPGform: boolean = false;
  showModule: boolean = false;
  selectedAPGlists: boolean = false;
  ischecked: any;
  model: any;
  createdAPGstore: Array<any> = [];
  clickedItem: any;
  selectedAPGidArray: any[] = [];
  showNewAPGbox: boolean = false;
  showfixedcreate: boolean = false;
  createdAPGstoreLength: any;
  wordLength: any;
  public depositMenuShow: boolean = false;
  public holidayMenuShow: boolean = false;
  public depositId: any;
  public holidayId: any;
  public depositAmount: any = "";
  public holidayName: any = "";
  public testObj: any = {};
  public optArr = [];
  public editPlanId = localStorage.getItem("editCPId");
  public isEditCP: boolean = false;
  public taxOptShow: boolean = false;
  public chooseTax;
  public clickableSteps: Array<any> = ['step1'];
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
    this.getAllAPG(20, 0);
    this.pdfId = [];
    // this.formField.holidayCalendarId = 'disabledHoliday';
    this.formField.holidayCalendarId = null;
    this.depositModel = 'deposit';
    this.rangeHr = '0';
    this.rangeMin = '0';
    this.readyOnlyRange = '0  min';
    this.categoryId = localStorage.getItem('categoryID');
    this.checkedName = localStorage.getItem('categoryName');
    this.goBackCat = true;
    window.addEventListener('scroll', this.scroll, true);

    setTimeout(function () {
      $("#step1").addClass('active');
    }, 200)

    this.step1 = true;
    // this.step7 = true;
    this.getAllModule();
    this.showSearchAPG = true;
    if (this.editPlanId) {
      this.isEditCP = true;
      console.log("editPlan", this.editPlanId);

      this.editCPlan(this.editPlanId);
    }

    if (this.currency == undefined || this.currency == null) {
      this.currency = {
        'invCurrencySign': '$'
      }
      console.log("undefined currency", this.currency);
    } else {
      if (this.currency.invCurrencySign == "") {
        console.log("has currency but sign null", this.currency);
        this.currency.invCurrencySign = '$';
      }
    }

  }

  editCPlan(planId) {
    this._service.getSinglePlan(planId, this.locationID)
      .subscribe((res: any) => {
        console.log("single plan", res);
        this.formField = res;
        if(!this.formField.paymentPolicy.taxInclusive ){
          this.chooseTax = 'exclusive';
        }else{
          this.chooseTax = 'inclusive';
        }
        if(this.formField.paymentPolicy.taxInclusive == null ){
          this.chooseTax = 'none';
        }
        console.log(this.formField.lesson.duration)
        this.convertMinsToHrsMins(this.formField.lesson.duration);
        let optObj = this.formField.paymentPolicy.courseFeeOptions;
        if (optObj) {
          this.setFeeOptionArray(optObj);
        }
        // this.getAllHolidaysCalendar();
        console.log("calendar", this.holidayCalendarLists);
        setTimeout(() => {
          if (this.holidayCalendarLists != undefined) {
            for (var i = 0; i < this.holidayCalendarLists.length; i++) {
              if (this.formField.holidayCalendarId == this.holidayCalendarLists[i]._id) {
                this.formField.holidayCalendarName = this.holidayCalendarLists[i].name;
                console.log("~~~calendarName", this.formField.holidayCalendarName)
              }
            }
          }
        }, 300);
        console.log("Quizwerkz", this.pdfList);
        if (this.formField.quizwerkz.length > 0) {
          this.formField.allowPagewerkz = true;
          this.pdfName = [];
          setTimeout(() => {
            for (var i = 0; i < this.formField.quizwerkz.length; i++) {
              for (var j = 0; j < this.pdfList.length; j++) {
                if (this.formField.quizwerkz[i] == this.pdfList[j]._id) {
                  this.pdfId.push(this.pdfList[j]._id);
                }
              }
            }
          }, 300);
        }

        if (this.formField.accessPointGroup.length > 0) {
          this.selectedAPGlists = true;
          for (var i = 0; i < this.formField.accessPointGroup.length; i++) {
            console.log("selectedAPG", this.formField.accessPointGroup[i]);
            this.singleAPG(this.formField.accessPointGroup[i]);
          }
        }

        if (this.formField.paymentPolicy.deposit) {
          setTimeout(() => {
            if (this.depositLists.length > 0) {
              for (var i = 0; i < this.depositLists.length; i++) {
                if (this.depositLists[i]._id == this.formField.paymentPolicy.deposit) {
                  console.log("selectedDeposit", this.depositLists[i]);
                  this.formField.depositAmount = this.depositLists[i].amount;
                }
              }
            }
          }, 300)
        }

      })
  }

  setFeeOptionArray(obj) {
    console.log("~~~obj", obj)
    for (var key in obj) {
      console.log(key, obj[key]);
      let data = {
        "name": key,
        "fees": obj[key]
      }
      this.optArr.push(data);
    }
    console.log("optArr", this.optArr);
  }

  convertMinsToHrsMins(mins) {
    console.log("duration", mins)
    let h = Math.floor(mins / 60);
    let m = mins % 60;
    console.log("hour", h);
    console.log("min", m);
    this.rangeHr = h;
    this.rangeMin = m;
    if (h > 0) {
      this.selectedHrRange = h;
    }
    if (m > 0) {
      this.selectedMinRange = m;
    }
  }

  @ViewChild('parentForm') mainForm;


  focusMethod(e, status, word) {
    console.log('hi', e)
    if (status == 'name') {
      this.wordLength = word.length;
      $('.limit-wordcount').show('slow');
    } else {
      this.wordLength = word.length;
      $('.limit-wordcount1').show('slow');
    }
  }

  blurMethod(e, status) {
    console.log('blur', e);
    if (status == 'name') {
      $('.limit-wordcount').hide('slow');
    } else {
      $('.limit-wordcount1').hide('slow');
    }
    this.wordLength = 0;
  }

  changeMethod(val: string) {
    console.log(val)
    this.wordLength = val.length;
  }

  valuechange(val) {
    console.log(val)
    console.log(typeof val)
    if (val.length != 0 && typeof val == 'string') {
      this.showfixedcreate = true;
    } else {
      this.showfixedcreate = false;
    }
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => term === '' ? []
        : this.apgList.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );

  formatter = (x: { name: string }) => x.name;

  SearchBoxEmpty(): String {
    var name;
    return name
  }

  selectedItem(item) {
    this.clickedItem = item.item;
    const i = this.createdAPGstore.findIndex(_item => _item._id === this.clickedItem._id);
    if (i > -1) this.createdAPGstore[i] = this.clickedItem;
    else this.createdAPGstore.push(this.clickedItem);
    console.log(this.createdAPGstore)
    this.showfixedcreate = false;
    this.selectedAPGlists = true;
    this.showSearchAPG = true;
    this.showModule = false;
    this.createAPGform = false;
  }

  removeSelectedAPG(data) {
    this.model = '';
    var index = this.createdAPGstore.findIndex(function (element) {
      return element._id === data._id;
    })
    if (index !== -1) {
      this.createdAPGstore.splice(index, 1)
    }
    console.log(this.createdAPGstore)
  }


  back() {
    this.goBackCat = false;
    var data = localStorage.removeItem("categoryName");
    localStorage.removeItem("cpCategory");
    this._service.backCat();
  }

  cancel() {
    this.goBackCat = false;
    var data = localStorage.removeItem("categoryName");
    localStorage.removeItem("categoryID");
    localStorage.removeItem("cpCategory");
    localStorage.removeItem("editCPId");
    if (this.isEditCP == true) {
      this._service.backPlanDetail();
    } else {
      this._service.backCourse();
    }
  }

  checkedData(id) {
    this.checkedCatId = id;
  }

  getInteger(int) {
    var regx = /^[-+]?[\d.]+$/g;
    return regx.test(int);
  }

  categoryName: any;

  createdPlan(formData, type) {
    // if(formData.deposit == 'deposit'){
    //   console.log(formData.deposit)
    //   formData.deposit = '';
    // }
    console.log(formData)
    console.log(this.step2FormaData)
    let obj: any = {};
    for (var i = 0; i < this.optArr.length; i++) {
      obj[this.optArr[i].name] = this.optArr[i].fees;
    }
    console.log("Obj", obj);
    console.log('allow por', this.formField.paymentPolicy.allowProrated)
    let data = {
      "regionId": this.regionID,
      "categoryId": this.categoryId,
      "name": this.step1FormaData.coursename,
      "description": this.step1FormaData.description,
      "seats": this.step1FormaData.seats,
      "makeupPolicy": {
        "allowMakeupPass": this.step2FormaData.allowmakeup,
        "maxPassPerUser": this.step2FormaData.makeupuser,
        "maxDayPerPass": this.step2FormaData.makeuppass
      },
      "paymentPolicy": {
        "deposit": this.depositId,
        "courseFee": this.step3FormaData.courseFee,
        "proratedLessonFee": formData.proratedLessonFee,
        "miscFee": formData.miscFee,
        "allowProrated": formData.allowProrated
      },
      "lesson": {
        "min": formData.minDuration,
        "max": formData.maxDuration,
        "duration": this.formField.lesson.duration
      },
      "allowPagewerkz": this.step5FormaData.allowpagewerkz,
      "age": {
        "min": formData.minage,
        "max": formData.maxage,
      },
      "quizwerkz": this.pdfId,
      "holidayCalendarId": this.formField.holidayCalendarId,
      "accessPointGroup": this.selectedAPGidArray
    }

    if (Object.keys(obj).length != 0) {
      console.log("lll");
      data.paymentPolicy["courseFeeOptions"] = obj;
    }

    if (this.chooseTax != '') {
      console.log("TTT", this.chooseTax);
      if (this.chooseTax == 'inclusive') {
        data.paymentPolicy["taxInclusive"] = true;
      } 
      if(this.chooseTax == 'exclusive') {
        data.paymentPolicy["taxInclusive"] = false;
      }

      // if(this.chooseTax == undefined || this.chooseTax == null || this.chooseTax == 'none'){
      //   data.paymentPolicy["taxInclusive"] = null;
      // }
    }

    console.log( data.paymentPolicy.deposit)

    if (type == 'create') {
      console.log("CreatePlan")
      this.blockUI.start('Loading...');
      this._service.createCoursePlan(this.regionID, this.locationID, data)
        .subscribe((res: any) => {
          console.log('success post', res);
          this.toastr.success('Successfully Created.');
          this.blockUI.stop();
          this.getAllCoursePlan();
          this.cancel();
          this.mainForm.reset();
          this.formField = new cPlanField();
          this.pdfId = [];
          this.timeInminutes = "";
          this.selectedAPGidArray = [];
          this.createdAPGstore = [];
          this.model = '';
          this.selectedAPGlists = false;
        }, err => {
          this.toastr.error('Create Fail');
          this.blockUI.stop();
          console.log(err)
        })
    } else {
      console.log("editPlan");
      if( data.paymentPolicy.deposit== undefined) {
        console.log(this.formField.paymentPolicy.deposit);
        data.paymentPolicy.deposit = this.formField.paymentPolicy.deposit
      }
      console.warn(data.paymentPolicy.deposit);
      this.blockUI.start('Loading...');
      this._service.updateSignlecPlan(this.editPlanId, data, this.locationID)
        .subscribe((res: any) => {
          console.log(res);
          setTimeout(() => {
            this.toastr.success('Successfully Updated.');
          }, 300)
          this.blockUI.stop();
          this.cancel();
          this.mainForm.reset();
          this.formField = new cPlanField();
          this.pdfId = [];
          this.timeInminutes = "";
          this.selectedAPGidArray = [];
          this.createdAPGstore = [];
          this.model = '';
          this.selectedAPGlists = false;
        }, err => {
          console.log(err);
          this.toastr.error('Update Fail');
          this.blockUI.stop();
        })
    }


  }

  //  onclickDelete(cplan, confirmDelete1){
  //    this.selectcPlan = cplan;
  //    this.modalReference = this.modalService.open(confirmDelete1, { backdrop:'static', windowClass: 'animation-wrap'});
  //    this.modalReference.result.then((result) => {
  //      this.closeResult = `Closed with: ${result}`;
  //    }, (reason) => {
  //      this.closeResult = `Closed with: ${reason}`;
  //    });
  //  }

  //  confirmDelete(selectcPlan ,confirmDelete2){
  //    this.selectcPlan = selectcPlan;
  //    this.modalReference.close();
  //    this.modalReference1 = this.modalService.open(confirmDelete2, { backdrop:'static', windowClass: 'animation-wrap'});
  //    this.modalReference1.result.then((result) => {
  //      this.closeResult = `Closed with: ${result}`;
  //    }, (reason) => {
  //      this.closeResult = `Closed with: ${reason}`;
  //    });
  //  }

  //  deleteCoursePlan(id) {
  // 	console.log(id)
  //    this.blockUI.start('Loading...');
  //    this.modalReference1.close();
  // 	this._service.deleteCoursePlan(id)
  // 	.subscribe((res:any) => {
  // 		console.log(res);
  //      setTimeout(() => {
  //        this.blockUI.stop(); // Stop blocking
  //      }, 300);
  //      this.toastr.success('Successfully Deleted.');
  // 		this.getAllCoursePlan();
  // 	},err => {
  //     this.toastr.error('Delete Fail');
  // 		console.log(err);
  // 	})
  // }

  ChangeValue(data, e, type) {
    if (type == "pdf") {
      var cbIdx = this.pdfId.indexOf(data);
      if (e.target.checked == true) {
        console.log('true')
        if (cbIdx < 0)
          this.pdfId.push(data);
        console.log(this.pdfId)
      }
      else {
        console.log('false')
        if (cbIdx >= 0) {
          this.pdfId.splice(cbIdx, 1);
          console.log(this.pdfId)
        }
      }
    }
    else {
      var cbIdx = this.apgId.indexOf(data);
      if (e.target.checked == true) {
        console.log('true')
        if (cbIdx < 0)
          this.apgId.push(data);
        console.log(this.apgId)
      }
      else {
        console.log('false')
        if (cbIdx >= 0) {
          this.apgId.splice(cbIdx, 1);
          console.log(this.apgId)
        }
      }
    }
  }

  // viewPlan(view, id){
  //   this.getAllAPG(20,0);
  //   this.getAllHolidaysCalendar();
  //   this.getAllDeposit();
  //   this.getAllPdf();
  //   this.modalReference = this.modalService.open(view, { backdrop:'static', windowClass: 'animation-wrap'});
  //   this.modalReference.result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Closed with: ${reason}`;
  //   });
  //   this._service.getSignlecPlan(id)
  //   .subscribe((res:any) => {
  //     console.log(res);
  //     this.viewCplan = res;
  //     if(!this.viewCplan.holidayCalendarId){
  //       this.holidayCalendarName = "";
  //     }
  //     else {
  //       for( var i = 0; i < this.holidayCalendarLists.length; i++){
  //         if(this.viewCplan.holidayCalendarId == this.holidayCalendarLists[i]._id){
  //           this.holidayCalendarName = this.holidayCalendarLists[i].name;
  //         }
  //       }
  //     }
  //     if(this.depositLists){
  //       for( var j = 0; j < this.depositLists.length; j++){
  //         if(this.viewCplan.paymentPolicy.deposit == this.depositLists[j]._id){
  //           this.depositName = this.depositLists[j].amount;
  //         }
  //       }
  //     }
  //     if(this.pdfList){
  //       this.pdfName = [];
  //       for(var i= 0; i < this.viewCplan.quizwerkz.length; i++){
  //         for(var j= 0; j < this.pdfList.length; j++){
  //           if(this.viewCplan.quizwerkz[i] == this.pdfList[j]._id){
  //             this.pdfName.push(this.pdfList[j].name);
  //           }
  //         }
  //       }
  //     }
  //     if(this.apgList){
  //       this.apgName = [];
  //       for(var i= 0; i < this.viewCplan.accessPointGroup.length; i++){
  //         for(var j= 0; j < this.apgList.length; j++){
  //           if(this.viewCplan.accessPointGroup[i] == this.apgList[j]._id){
  //             this.apgName.push(this.apgList[j].name);
  //           }
  //         }
  //       }
  //     }
  //     this._service.getCategory(this.regionID, 20, 0)
  //     .subscribe((res:any) => {
  //       this.courseCategories = res;
  //         for(var i=0; i < this.courseCategories.length; i++){
  //           if(this.viewCplan.categoryId == this.courseCategories[i]._id){
  //             this.checkedName = this.courseCategories[i].name;
  //           }
  //         }
  //       }, err => {
  //         console.log(err)
  //       });
  //   },err => {
  //     console.log(err);
  //   })
  // }

  getAllCoursePlan() {
    this.blockUI.start('Loading...');
    this._service.getAllCoursePlan(this.regionID, this.locationID)
      .subscribe((res: any) => {
        this.courseplanLists = res;
        setTimeout(() => {
          this.blockUI.stop(); // Stop blocking
        }, 300);
        console.log(this.courseplanLists)
      }, err => {
        console.log(err)
      })
  }

  getAllDeposit() {
    this._service.getAllDeposit(this.regionID)
      .subscribe((res: any) => {
        this.depositLists = res;
        console.log(this.depositLists)
      }, err => {
        console.log(err)
      })
  }

  focusSearch(e) {
    console.log(e)
  
    this.isfocus = true;
    this.showfixedcreate = true;
    this.apgList = [];
  }

  hideSearch(e) {
    setTimeout(() => {
      this.isfocus = false;
      this.showfixedcreate = false;
    }, 300);
  }

  changeSearch(keyword, type) {
    console.log(keyword)
    if (keyword == 0) {
      this.apgList = [];
      // this.getAllAPG(20, 0)
    } else {
      this.getApgSearch(keyword, 'apg');
    }
  }

  selectData(id, name) {
    console.log(id)
    console.log(name)
    this.singleAPG(id);
    this.selectedAPGlists = true;
    this.isfocus = false;
    this.showfixedcreate = false;
    // const i = this.createdAPGstore.findIndex(_item => _item._id === this.clickedItem._id);
    // if (i > -1) this.createdAPGstore[i] = this.clickedItem; 
    // else this.createdAPGstore.push(this.clickedItem);
    // console.log(this.createdAPGstore)
    // this.showfixedcreate = false;
    // this.selectedAPGlists = true;
    // this.showSearchAPG = true;
    // this.showModule = false;
    // this.createAPGform = false;
    // this.createdAPGstore.push(this.clickedItem)
  }

  singleAPG(id) {
    this.blockUI.start('Loading...');
    this._service.getSingleAPG(this.regionID, id)
      .subscribe((res: any) => {
        this.blockUI.stop();
        console.log('editapg', res)
        this.clickedItem = res;
        this.createdAPGstore.push(this.clickedItem);
        console.log("selectedAPGList", this.createdAPGstore);
        this.formField.searchText = "";
      }, err => {
        this.blockUI.stop();
        console.log(err)
      })
  }
  // templateList:any;
  getApgSearch(keyword, type) {
    // this._service.getSearchApg(this.regionID, keyword, type, '')
    // .subscribe((res:any) => {
    //   console.log(res);
    //   this.apgList = res;
    // }, err => {  
    //   console.log(err);
    // });
    console.log("search APG", this.regionID, keyword, type);
    if (this.createdAPGstore.length > 0) {
      var selectedIdArr = [];
      var selectedIdStr;
      for (var i in this.createdAPGstore) {
        var id = this.createdAPGstore[i]._id;
        selectedIdArr.push(id);
      }
      console.log("selectedId Array", selectedIdArr);
      selectedIdStr = selectedIdArr.toString();
      console.log('selectedIdStr', selectedIdStr);

      this._service.getSearchApg(this.regionID, keyword, type, '', selectedIdStr, 20, 0)
        .subscribe((res: any) => {
          console.log("apg result", res);
          this.apgList = res;
          console.log("APG List", this.apgList);
        }, err => {
          console.log(err);
        });
    } else {
      this._service.getSearchApg(this.regionID, keyword, type, '', '', 20, 0)
        .subscribe((res: any) => {
          console.log("apg result", res);
          this.apgList = res;
          console.log("APG List", this.apgList);
          // if(type == 'apg'){
          //   this.apgList = res;
          //   console.log("APG list",this.apgList)
          // }else{
          //   this.templateList = res;
          // }
        }, err => {
          console.log(err);
        });
    }
  }

  getAllAPG(skip, limit) {
    this.blockUI.start('Loading...');
    this._service.getAllAPG(this.regionID, '', skip, limit)
      .subscribe((res: any) => {
        console.log('apgLists', res)
        this.apgList = res;
        setTimeout(() => {
          this.blockUI.stop(); // Stop blocking
        }, 300);
      }, err => {
        console.log(err)
      })
  }

  getAllHolidaysCalendar() {
    this._service.getAllHolidaysCalendar(this.regionID, 20, 0)
      .subscribe((res: any) => {
        this.holidayCalendarLists = res;
        console.log(this.holidayCalendarLists)
      }, err => {
        console.log(err)
      })
  }

  getAllPdf() {
    this._service.getAllPdf(this.regionID, this.locationID, 20, 0)
      .subscribe((res: any) => {
        console.log('pdflists', res)
        this.pdfList = res;
      }, err => {
        console.log(err)
      })
  }

  restrictMinNumberInput(e, minValue, type) {
    if (type == 'age') {
      if (e.target.value <= minValue.model) {
        this.restrictLastInput = true;
      }
      else {
        this.restrictLastInput = false;
        this.restrictFirstInput = false;
      }
    }
    else if (type == 'lesson') {
      if (e.target.value <= minValue.model) {
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

  restrictMaxNumberInput(e, maxValue, type) {
    if (type == 'age') {
      if (e.target.value >= maxValue.model) {
        this.restrictFirstInput = true;
      }
      else {
        this.restrictFirstInput = false;
        this.restrictLastInput = false;
      }
    }
    else if (type == 'lesson') {
      if (e.target.value >= maxValue.model) {
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

  durationProgress($event) {
    this.progressSlider = true;
  }

  @HostListener('document:click', ['$event'])
  public documentClick(event): void {

    if (this.progressSlider != true) {
      $('.bg-box').css({ 'display': "none" });
    }
    else {
      $('.bg-box').css({ 'display': "block" });
      $('.bg-box').click(function (event) {
        event.stopPropagation();
      });
      this.progressSlider = false;

    }

    if (this.focusCfee == true) {
      $('.cfee-bg').addClass("focus-bg");
    }
    else {
      $('.cfee-bg').removeClass("focus-bg");
    }
    this.focusCfee = false;

    if (this.focusMisfee == true) {
      $('.misfee-bg').addClass("focus-bg");
    }
    else {
      $('.misfee-bg').removeClass("focus-bg");
    }
    this.focusMisfee = false;

    if (this.focusProFee == true) {
      $('.profee-bg').addClass("focus-bg");
    }
    else {
      $('.profee-bg').removeClass("focus-bg");
    }
    this.focusProFee = false;

    // for deposit dropdown
    if (this.depositMenuShow == false) {
      $('.new-dropdown').css('display', 'none');
    }
    else {
      $('.new-dropdown').css('display', 'block');
      this.depositMenuShow = false;
    }

    // for holiday dropdown
    if (this.holidayMenuShow == false) {
      $('.holiday-dropdown').css('display', 'none');
    }
    else {
      $('.holiday-dropdown').css('display', 'block');
      this.holidayMenuShow = false;
    }

  }

  showDropdown(type, state) {
    console.log(type, state)
    if (type == 'taxOpt') {
      this.taxOptShow = true;
    }
  }
  closeDropdown(event, type) {
    // if (type == 'taxOpt') {
    //   var parentWrap = event.path.filter(function (res) {
    //     return res.className == "form-group has-feedback taxOpt-wrap"
    //   })
    //   if (parentWrap.length == 0) {
    //     this.taxOptShow = false;
    //   }
    // }
    this.taxOptShow = false;
  }

  depositDropdown() {
    var y = document.getElementsByClassName('new-dropdown');
    if ((y[0] as HTMLElement).style.display == 'block') {
      (y[0] as HTMLElement).style.display = 'none';
    }
    else {
      (y[0] as HTMLElement).style.display = 'block';
      this.depositMenuShow = true;
    }
  }

  chooseDeposit(item) {
    console.log("Deposit", item);
    // this.depositAmount = item.amount;
    // this.depositId = item._id;
    this.formField.depositAmount = item.amount;
    this.depositId = item._id;
  }

  chooseTaxOption(type) {
    this.chooseTax = type;
    console.log("choose Tax", type);
  }

  holidayDropdown() {
    console.log("holiday dropdown")
    var z = document.getElementsByClassName('holiday-dropdown');
    if ((z[0] as HTMLElement).style.display == 'block') {
      (z[0] as HTMLElement).style.display = 'none';
    }
    else {
      (z[0] as HTMLElement).style.display = 'block';
      this.holidayMenuShow = true;
    }
  }

  chooseHoliday(holidayCalendar) {
    console.log("holiday", holidayCalendar);
    // this.holidayId = holidayCalendar._id;
    // this.holidayName = holidayCalendar.name;
    this.formField.holidayCalendarName = holidayCalendar.name;
    this.formField.holidayCalendarId = holidayCalendar._id;
  }

  ChangedRangeValue(e, type) {
    if (type == 'hr') {
      this.selectedHrRange = e;
      this.overDurationHr = false;
      if (this.selectedHrRange == 24) {
        this.overDurationHr = true;
        this.rangeMin = 0;
        this.selectedMinRange = 0;
      }
    }
    if (type == 'min') {
      this.selectedMinRange = e;
    }

    if (this.selectedHrRange && this.selectedMinRange) {
      console.log("selected Hr and Min");
      this.timeInminutes = (parseInt(this.selectedHrRange) * 60) + parseInt(this.selectedMinRange);
      this.readyOnlyRange = (parseInt(this.selectedHrRange)) + ' ' + 'hr' + ' ' + parseInt(this.selectedMinRange) + ' ' + 'min';
    }
    else if (this.selectedHrRange) {
      console.log("selected only Hr");
      this.timeInminutes = (parseInt(this.selectedHrRange) * 60);
      this.readyOnlyRange = (parseInt(this.selectedHrRange)) + ' ' + 'hr';
    }
    else if (this.selectedMinRange) {
      console.log("selected only Min");
      this.timeInminutes = parseInt(this.selectedMinRange);
      this.readyOnlyRange = parseInt(this.selectedMinRange) + ' ' + 'min';
    }
    else {
      console.log('error')
    }
    this.formField.lesson.duration = this.timeInminutes;
    console.log('durationMinutes', this.timeInminutes)

  }

  numberOnly(event, type) {
    console.log('hhh')
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    if (event.target.value.search(/^0/) != -1) {
      event.target.value = '';
    }
  }

  cplan() {
    this.showModal = false;
    this.showsubModal = true;
  }

  scroll = (e): void => {
  };

  @HostListener('window:scroll', ['$event']) onScroll($event) {
    if (window.pageYOffset > 40) {
      this.navIsFixed = true;
    } else {
      this.navIsFixed = false;
    }
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
  }

  toKnowFocus(type) {
    if (type == 'cFee') {
      this.focusCfee = true;
      $('.cfee-bg').addClass("focus-bg");
    } else if (type == 'misFee') {
      this.focusMisfee = true;
      $('.misfee-bg').addClass("focus-bg");
    } else if (type == 'prorateFee') {
      this.focusProFee = true;
      $('.profee-bg').addClass("focus-bg");
    }
  }

  showFocus(e, type) {
    console.log(type)
    // if (type == 'optionFee'){
    //   this.optionFee = true;
    // }
  }

  hideFocus(e, type) {
    console.log(type)
    if (type == 'optionFee') {
      this.optionFee = false;
    }
  }


  enterHover(e) {
    console.log('mouse enter')
    $('.input-group-text').css('background', '#f7f9fa');
    $('.input[type="number"]').css('background', '#f7f9fa');
  }

  leaveHover(e) {
    console.log('mouse out')
    $('.input-group-text').css('background', '#fff');
  }

  backStep(type) {

    if (type == 'step2') {
      console.log(this.formField)
      this.step2 = false;
      this.step1 = true;
      if (this.step1 == true) {
        $("#step2").removeClass('active');
        $("#step1").removeClass('done');
        $("#step1").addClass('active');
      }
    }
    if (type == 'step3') {
      this.step1 = false;
      this.step2 = true;
      this.step3 = false;
      this.testObj.name = null;
      this.testObj.fees = null;
      if (this.step2 == true) {
        $("#step3").removeClass('active');
        $("#step2").removeClass('done');
        $("#step1").addClass('done');
        $("#step2").addClass('active');
      }
    }
    if (type == 'step4') {
      this.step1 = false;
      this.step2 = false;
      this.step3 = true;
      this.step4 = false;
      if (this.step3 == true) {
        $("#step4").removeClass('active');
        $("#step3").removeClass('done');
        $("#step1, #step2").addClass('done');
        $("#step3").addClass('active');
      }
    }
    if (type == 'step5') {
      this.step1 = false;
      this.step2 = false;
      this.step3 = false;
      this.step4 = true;
      this.step5 = false;
      if (this.step4 == true) {
        $("#step5").removeClass('active');
        $("#step4").removeClass('done');
        $("#step1, #step2, #step3").addClass('done');
        $("#step4").addClass('active');
      }
    }
    if (type == 'step6') {
      this.step1 = false;
      this.step2 = false;
      this.step3 = false;
      this.step4 = false;
      this.step5 = true;
      this.step6 = false;
      if (this.step5 == true) {
        $("#step6").removeClass('active');
        $("#step5").removeClass('done');
        $("#step1, #step2, #step3, #step4").addClass('done');
        $("#step5").addClass('active');
      }
    }
    if (type == 'step7') {
      this.step1 = false;
      this.step2 = false;
      this.step3 = false;
      this.step4 = false;
      this.step5 = false;
      this.step6 = true;
      this.step7 = false;
      if (this.step6 == true) {
        $("#step7").removeClass('active');
        $("#step6").removeClass('done');
        $("#step1, #step2, #step3, #step4, #step5").addClass('done');
        $("#step6").addClass('active');
      }
    }
  }
  addStep(str) {
    var res = str.substring(str.length - 1, str.length);

    return str.slice(0, 4) + (Number(++res))
  }
  continueStep(type, data) {
    this.clickableSteps.push(type)
    this.clickableSteps.push(this.addStep(type))
    if (type == 'step1') {
      this.step1FormaData = data;
      console.log(this.step1FormaData)
      this.step1 = false;
      let nextKey = 'makeupPolicy'
      if (this.step1 == false) {
        $("#step1").removeClass('active');
        $("#step1").addClass('done');
        $("#step2").addClass('active');
        this.step2 = true;
        console.log(this.formField.makeupPolicy)
        if (this.formField.makeupPolicy == undefined) {
          this.formField["makeupPolicy"] = {
            allowMakeupPass: false,
            maxDayPerPass: '',
            maxPassPerUser: ''
          };
        }

      }
    }
    if (type == 'step2') {
      this.step2FormaData = data;
      console.log(this.step2FormaData)
      this.step1 = false;
      this.step2 = false;
      if (this.step2 == false) {
        $("#step2").removeClass('active');
        $("#step1").addClass('done');
        $("#step2").addClass('done');
        $("#step3").addClass('active');
        this.step3 = true;
      }
    }
    if (type == 'step3') {
      this.step3FormaData = data;
      console.log(this.step3FormaData)
      this.step1 = false;
      this.step2 = false;
      this.step3 = false;
      this.testObj.name = null;
      this.testObj.fees = null;
      if (this.step3 == false) {
        $("#step3").removeClass('active');
        $("#step1").addClass('done');
        $("#step2").addClass('done');
        $("#step3").addClass('done');
        $("#step4").addClass('active');
        this.step4 = true;
      }
    }
    if (type == 'step4') {
      this.step4FormaData = data;
      console.log(this.step4FormaData)
      this.step1 = false;
      this.step2 = false;
      this.step3 = false;
      this.step4 = false;
      if (this.step4 == false) {
        $("#step4").removeClass('active');
        $("#step1").addClass('done');
        $("#step2").addClass('done');
        $("#step3").addClass('done');
        $("#step4").addClass('done');
        $("#step5").addClass('active');
        this.step5 = true;
      }
    }
    if (type == 'step5') {
      this.step5FormaData = data;
      console.log(this.step5FormaData)
      this.step1 = false;
      this.step2 = false;
      this.step3 = false;
      this.step4 = false;
      this.step5 = false;
      if (this.step5 == false) {
        $("#step5").removeClass('active');
        $("#step1").addClass('done');
        $("#step2").addClass('done');
        $("#step3").addClass('done');
        $("#step4").addClass('done');
        $("#step5").addClass('done');
        $("#step6").addClass('active');
        this.step6 = true;
      }
    }
    if (type == 'step6') {
      console.log(data)
      this.selectedAPGidArray = [];
      for (var i in data) {
        this.selectedAPGidArray.push(data[i]._id);
      }
      console.log(this.selectedAPGidArray)
      this.step1 = false;
      this.step2 = false;
      this.step3 = false;
      this.step4 = false;
      this.step5 = false;
      this.step6 = false;
      if (this.step6 == false) {
        $("#step6").removeClass('active');
        $("#step1").addClass('done');
        $("#step2").addClass('done');
        $("#step3").addClass('done');
        $("#step4").addClass('done');
        $("#step5").addClass('done');
        $("#step6").addClass('done');
        $("#step7").addClass('active');
        this.step7 = true;
        if (this.formField.age == undefined) {
          console.log("age is undefined");
          this.formField["age"] = {
            "min": '',
            "max": ''
          }
        }
      }
    }
    if (type == 'step7') {
      this.step1 = false;
      this.step2 = false;
      this.step3 = false;
      this.step4 = false;
      this.step5 = false;
      this.step7 = false;
      if (this.step7 == false) {
        $("#step6").removeClass('active');
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

  getAllModule() {
    this._service.getAllModule(this.regionID)
      .subscribe((res: any) => {
        console.log('moduleLists', res)
        for (var i in res) {
          if (res[i]._id != null) {
            this.moduleList.push(res[i]);
          }
        }

      }, err => {
        console.log(err)
      })
  }

  chooseModuleType(id, name) {
    console.log(id, name)
    this.ischecked = id;
    localStorage.setItem("moduleID", id)
    setTimeout(() => {
      this.createAPGform = true;
      this.showModule = false;
      this.showSearchAPG = false;
      this.selectedAPGlists = false;
    }, 300);
  }

  backModule() {
    this.showModule = true;
    this.showSearchAPG = false;
    this.createAPGform = false;
    this.formAPG = new apgForm();
    this.selectedAPGlists = false;
  }

  backSearhAPG(type) {
    if (this.createdAPGstore.length <= 0) {
      this.model = '';
    }
    this.showfixedcreate = false;
    this.showSearchAPG = true;
    this.showModule = false;
    this.createAPGform = false;
    this.formAPG = new apgForm();
    this.selectedAPGlists = true;
  }

  goToModule() {
    console.log("goooooo to module")
    this.showSearchAPG = false;
    this.showModule = true;
    this.selectedAPGlists = false;
    this.ischecked = '';
    console.log(this.showModule)
    console.log(this.step6)
    console.log(this.moduleList)
  }

  createAPGs(data) {
    console.log(data);
    var templateID;
    var moduleId = localStorage.getItem('moduleID')
    data["moduleId"] = moduleId;
    this._service.createAP(this.regionID, this.locationID, data)
      .subscribe((res: any) => {
        // this.toastr.success('Successfully AP Created.');
        data["accessPoints"] = [res._id]
        console.log(data)
        this._service.createAPG(this.regionID, this.locationID, data, templateID, moduleId)
          .subscribe((response: any) => {
            this.toastr.success('Successfully APG Created.');
            console.log(response)
            this.formAPG = new apgForm();
            this.createdAPGstore.push(response);
            this.showSearchAPG = true;
            this.selectedAPGlists = true;
            this.showModule = false;
            this.createAPGform = false;
            this.showfixedcreate = false;
            this.getAllAPG(20, 0);
          }, err => {
            this.toastr.error('Created APG Fail');
            console.log(err)
          });
      }, err => {
        this.toastr.error('Created AP Fail');
        console.log(err)
      });
  }

  addOption() {
    console.log("option", this.testObj)
    let data = {
      "name": this.testObj.name,
      "fees": this.testObj.fees
    }
    console.log(data);
    if (data.name != undefined && data.fees != undefined && data.name != '' && data.fees != '') {
      this.optArr.push(data);
      console.log(this.optArr)
      this.testObj.name = "";
      this.testObj.fees = "";
    }

    if (data.name == undefined || data.name == '') {
      this.toastr.error('Course fee option name is empty');
    } else if (data.fees == undefined || data.fees == '') {
      this.toastr.error('Course fee option value is empty');
    } else if (data.name == undefined && data.fees == undefined) {
      this.toastr.error('Please insert data to create course fee option');
    }
  }

  removeOpt(opt) {
    var index;
    console.log("remove", opt)
    for (let x in this.optArr) {
      if (this.optArr[x].name == opt.name && this.optArr[x].fees == opt.fees) {
        index = x;
      }
    }
    this.optArr.splice(index, 1);
    console.log("arr", this.optArr);
  }
  addOrRemoveClassOfStep(ele){
    var max=this.clickableSteps[this.clickableSteps.length -1];
    ele.parents("li").removeClass("done");
    ele.parents("li").prevAll("li").addClass('done')
    ele.parents("li").prevAll("li").removeClass('active');
    ele.parents("li").nextAll("li").removeClass('active');
    for(var i=0; i<this.clickableSteps.length ; i++){
      $("#" + this.clickableSteps[i]).children("a").css('background-color', '#0080ff');
    }
    if(max != ele.parents("li").attr('id'))
      ele.parents("li").addClass("done")
  }
  stepClick(event, step) {
    if (this.clickableSteps.includes(step)) {

      this.step1 = false;
      this.step2 = false;
      this.step3 = false;
      this.step4 = false;
      this.step5 = false;
      this.step6 = false;
      this.step7 = false;

      switch (step) {
        case ('step1'):
          this.step1 = true;
          break;
        case ('step2'):
          this.step2 = true;
          break;
        case ('step3'):
          this.step3 = true;
          break;
        case ('step4'):
          this.step4 = true;
          break;
        case ('step5'):
          this.step5 = true;
          break;
        case ('step6'):
          this.step6 = true;
          break;
        case ('step7'):
          this.step7 = true;
          break;
      }
      $("#" + step).addClass('active');
      this.addOrRemoveClassOfStep($(event.target))
    }

  }
}
