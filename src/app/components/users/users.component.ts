import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  ViewContainerRef,
  HostListener,
  AfterViewInit,
  ViewChildren,
  QueryList
} from '@angular/core';
import {
  NgbModalRef,
  NgbDateStruct,
  NgbDatepickerConfig
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, FormControl } from '@angular/forms';
import { appService } from '../../service/app.service';
import { NgForm } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { ImageCropperComponent } from 'ng2-img-cropper/src/imageCropperComponent';
import { CropperSettings } from 'ng2-img-cropper/src/cropperSettings';
import { Bounds } from 'ng2-img-cropper/src/model/bounds';
import { CropPosition } from 'ng2-img-cropper/src/model/cropPosition';
import { Croppie } from 'croppie';
import Cropper from 'cropperjs';
import { environment } from '../../../environments/environment';
import { customer } from './user';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastsManager } from 'ng5-toastr/ng5-toastr';
import * as moment from 'moment-timezone';
import { Router } from '@angular/router';
import { DataService } from '../../service/data.service';
import { equalSegments } from '@angular/router/src/url_tree';
import { InvoiceComponent } from '../invoice/invoice.component';
import { FlexiComponent } from '../flexi/flexi.component';
declare var $: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  @ViewChild('stuffPic') stuffPic: ElementRef;
  userid: any;
  acResult: any;
  public isGuardian = false;
  public selectedCourse: any;
  public activePass: any = '';
  public currentPassObj: any;
  public makeupLists: any;
  public passForm: any = {};
  public isChecked: any = '';
  public checkCourse: any = '';
  public lessonData: any;
  public activeTab: any;
  public hideMenu: boolean = false;
  public img: any;
  public ulFile: any;
  public journals: any = [];
  public defaultSlice: number = 2;
  public orgID = localStorage.getItem('OrgId');
  public regionID = localStorage.getItem('regionId');
  public locationID = localStorage.getItem('locationId');
  public locationName: any;
  public className: any;
  public showflexyCourse: boolean = false;
  public isGlobal: boolean = false;
  // formFieldc: customer = new customer();
  claimCourses: any;
  formFieldc: any = {};
  xxxx: any = {};
  @ViewChild('cropper', undefined)
  cropper: ImageCropperComponent;
  resetCroppers: Function;
  public isupdate: boolean = false;
  public isCrop: boolean = false;
  public returnProfile: boolean = false;
  input: any;
  uploadCrop: any;
  blankCrop: boolean = false;
  isSticky: boolean = false;
  modalReference: any;
  closeResult: any;

  public showLoading: boolean = false;
  @BlockUI() blockUI: NgBlockUI;
  @ViewChildren(FlexiComponent) private FlexiComponent: QueryList<
    FlexiComponent
  >;
  customerLists: Array<any> = [];
  availableCourses: Array<any> = [];
  userType: any;
  permissionLists: any;
  locationLists: any;
  emailAlert: boolean = false;
  guardianAlert: boolean = false;
  notShowEdit: boolean = true;
  permissionId: any[] = [];
  editId: any;
  public customerEmail = false;
  public guardianEmail = false;
  public personalMail: boolean = false;
  public updateButton: boolean = false;
  public createButton: boolean = true;
  showFormCreate: boolean = false;
  addNewCustomer: boolean = false;
  public navIsFixed: boolean = false;
  public isCreateFix: boolean = false;
  public atLeastOneMail: boolean = false;
  public atLeastGurMail: boolean = false;
  validProfile: boolean = false;
  imgDemoSlider: boolean = false;
  public showCustDetail: boolean = false;
  public isFous: boolean = false;
  public journalDetail: any = {};
  public custDetail: any = {};
  public wordLength: number = 0;
  public wordLength1: number = 0;
  divHeight: any;
  public customFields: any = [];
  public customerPermission: any = [];
  public customerDemo: any = [];
  //journal
  public jSkip: number = 0;
  public jLimit: number = 20;
  public jSlectedCourse: string;
  public toShowLoadMore: boolean;
  public toShowNoJournl: boolean;
  // enroll class
  searchData: any = {};
  public courseLists: any = {};
  isSearch: boolean = false;
  searchword: any;
  usertype: any;
  result: any;
  isACSearch: boolean = false;
  acWord: any;
  public permissionType: any;

  /*for invoice*/
  public showInvoice: boolean = false;
  public currency = JSON.parse(localStorage.getItem('currency'));
  public logo: any = localStorage.getItem('OrgLogo');
  public showBox: boolean = false;
  public discount: number = 0;
  public value: any = {};
  public showMailPopup: boolean = false;
  public invoiceInfo: any;
  public invoice: any;
  public updatedDate;
  public dueDate;
  public invoiceID;
  public showPayment: boolean = false;
  public selectedPayment: any;
  public paymentItem: any = {};
  public invoiceCourse: any = {};
  public feesBox: boolean = false;
  public depositBox: boolean = false;
  public regBox: boolean = false;
  public prefixInvId: any;
  public token: any;
  public type: any;
  public paymentProviders: any;
  public refInvID: any;
  public invTaxName: any;
  public hideReg: boolean = false;
  public hideDeposit: boolean = false;
  public total: any;
  public singleInv: any = [];
  public isEditInv: any = false;
  public updateInvData: any = {};
  public hideMisc: boolean = false;
  public paymentId: any;
  public showPaidInvoice: boolean = false;
  public invStatus: any;
  public invCurrency: any = {};
  public invPayment: any = [];
  public noSetting: boolean = false;
  //flexy
  public flexyarr = [];
  idarr: any = [];
  conflictObj: any = [];
  tempObj: any = [];
  dataObj: any = [];
  flexiTemp: any = [];
  checkobjArr: any = [];

  constructor(
    private config: NgbDatepickerConfig,
    private modalService: NgbModal,
    private _service: appService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    private router: Router,
    private dataService: DataService
  ) {
    this.toastr.setRootViewContainerRef(vcr);
    // customize default values of datepickers used by this component tree
    config.minDate = { year: 1950, month: 1, day: 1 };
    // this._service.goUserCourseDetail.subscribe(() => {
    //      console.log('go User CourseDetail');
    //      this.isCourse = true;
    //      this.showCustDetail = false;
    //      this.showFormCreate = false;
    //    });
  }

  ngOnInit() {
    setTimeout(() => {
      console.log('~~~', this.locationName);
      this.locationName = localStorage.getItem('locationName');
      var userId;
      this.dataService.currentCustomer.subscribe(uId => (userId = uId));
      if (userId != '') {
        console.log('!!!!!!UID');
        this.showDetails(userId);
      }
    }, 300);
    this.blankCrop = false;
    this._service.permissionList.subscribe(data => {
      if (this.router.url === '/customer') {
        this.permissionType = data;
        this.checkPermission();
      }
    });
    // this.selectedPayment = 'Cash';
  }

  ngAfterViewInit() {
    this.custDetail = {
      user: {
        about: ''
      },
      courses: [
        {
          name: '',
          location: {
            name: ''
          },
          startDate: '',
          duration: {
            startDate: ''
          }
        }
      ]
    };

    this.invoiceInfo = {
      companyName: '',
      tax: {
        name: ''
      }
    };

    this.invCurrency = {
      sign: ''
    };
  }

  @HostListener('window:scroll', ['$event']) onScroll($event) {
    if (window.pageYOffset > 81) {
      this.isSticky = true;
    } else {
      this.isSticky = false;
    }
    if (window.pageYOffset > 40) {
      this.navIsFixed = true;
      this.isCreateFix = true;
    } else {
      this.navIsFixed = false;
      this.isCreateFix = false;
    }
  }

  checkPermission() {
    console.log(this.permissionType);
    this.customerPermission = [
      'CREATECUSTOMERS',
      'VIEWCUSTOMERS',
      'EDITCUSTOMERS',
      'DELETECUSTOMERS',
      'ENROLLCOURSE'
    ];
    this.customerPermission = this.customerPermission.filter(
      value => -1 !== this.permissionType.indexOf(value)
    );

    this.customerDemo['createCustomer'] = this.customerPermission.includes(
      'CREATECUSTOMERS'
    )
      ? 'CREATECUSTOMERS'
      : '';
    this.customerDemo['viewCustomer'] = this.customerPermission.includes(
      'VIEWCUSTOMERS'
    )
      ? 'VIEWCUSTOMERS'
      : '';
    this.customerDemo['editCustomer'] = this.customerPermission.includes(
      'EDITCUSTOMERS'
    )
      ? 'EDITCUSTOMERS'
      : '';
    this.customerDemo['deleteCustomer'] = this.customerPermission.includes(
      'DELETECUSTOMERS'
    )
      ? 'DELETECUSTOMERS'
      : '';
    this.customerDemo['enrollStudent'] = this.customerPermission.includes(
      'ENROLLCOURSE'
    )
      ? 'ENROLLCOURSE'
      : '';

    if (this.customerPermission.includes('VIEWCUSTOMERS') != false) {
      this.getAllUsers('customer', 20, 0);
      this.locationName = localStorage.getItem('locationName');
    } else {
      console.log('permission deny');
      this.customerLists = [];
    }
  }

  getSingleInfo(ID) {
    // this.customerEmail = false;
    // this.guardianEmail = false;
    console.log(ID);
    console.log(this.isCrop);
    this.isCrop = false;
    this.customerLists = [];
    // this.formFieldc.details = [];
    this.getSingleUser(ID);
  }

  getSingleUser(ID) {
    console.log(this.formFieldc.details);
    this._service.editProfile(this.regionID, ID).subscribe(
      (res: any) => {
        console.log('SingleUser', res);
        this.formFieldc = res;
        this.isupdate = true;
        this.returnProfile = res.profilePic;
        console.log('~~~', this.returnProfile);
        this.showCustDetail = false;
        this.goCreateForm('edit');
        if (res.email && res.email.length > 0) {
          this.customerEmail = true;
        } else {
          this.customerEmail = false;
        }

        if (res.guardianEmail && res.guardianEmail.length > 0) {
          this.guardianEmail = true;
        } else {
          this.guardianEmail = false;
        }
      },
      err => {
        console.log(err);
      }
    );
  }
  date;
  getCustomFields(type) {
    console.log('call getcustom fields');
    this._service.getAllFields(this.regionID).subscribe((res: any) => {
      console.log('Custom Field', res);
      let testArray = [];
      res.userInfoPermitted.map((item, index) => {
        for (let i = 0; i < item.inputValues.length; i++) {
          const tempObj = {
            name: '',
            isCheck: false
          };
          tempObj.name = item.inputValues[i];
          testArray.push(tempObj);
        }
        item.inputValues = testArray;
        testArray = [];
      });
      this.customFields = res.userInfoPermitted;

      for (var i = 0; i < this.customFields.length; i++) {
        console.log('^^i', this.customFields[i]);
        var fieldName = this.customFields[i].name.toLowerCase();
        console.log('^^Test^^', fieldName);
        if (type == 'create') {
          console.log('No detail fields in Res');
          this.customFields[i]['value'] = null;
          console.log('name----', this.customFields);
        } else {
          console.log('EDIT RES', this.customFields[i]._id);
          var findId = this.customFields[i]._id;
          var test = this.formFieldc.details.filter(
            item => item.permittedUserInfoId == findId
          );
          console.log('Test', test);
          if (test.length > 0) {
            console.log('value', test[0].value);
            // var dateTime = test[0].value;
            // console.log('date time~~~',dateTime)
            for (
              let value = 0;
              value < this.customFields[i].inputValues.length;
              value++
            ) {
              const element = this.customFields[i].inputValues;
              for (let item = 0; item < test[0].value.length; item++) {
                const checkValue = test[0].value[item];
                if (element[value].name === checkValue) {
                  element[value].isCheck = true;
                }
              }
            }
            this.customFields[i]['value'] = test[0].value;
            if (this.customFields[i].controlType === 'Datepicker') {
              var dateTime = test[0].value;
              var ok = dateTime.substring(0, dateTime.search('T'));
              var testSplit = ok.split('-');
              var format = {
                year: Number(testSplit[0]),
                month: Number(testSplit[1]),
                day: Number(testSplit[2])
              };
              this.date = format;
              this.customFields[i]['value'] = this.date;
              this.date = '';
            }
          }
          console.log(this.formFieldc.details);
        }
      }
    });
  }

  focusMethod(e, status, word) {
    if (status == 'name') {
      this.wordLength = word.length;
      $('.limit-wordcount').show('slow');
    } else if (status == 'fullname') {
      this.wordLength = word.length;
      $('.limit-wordcount2').show('slow');
    } else {
      this.wordLength = word.length;

      $('.limit-wordcount1').show('slow');
    }
  }

  blurMethod(e, status) {
    if (status == 'name') {
      $('.limit-wordcount').hide('slow');
    } else if (status == 'fullname') {
      $('.limit-wordcount2').hide('slow');
    } else {
      $('.limit-wordcount1').hide('slow');
    }
    this.wordLength = 0;
  }

  changeMethod(val: string) {
    this.wordLength = val.length;
  }

  createUser(obj, apiState) {
    console.log(obj);
    this.formFieldc.details = [];
    let testArray = [];
    this.customFields.map((item, index) => {
      if (item.controlType === 'Datepicker') {
        if (item.value != null) {
          if (item.value.day < 10) {
            var day = '0' + `${item.value.day}`;
          } else {
            var day = `${item.value.day}`;
          }

          if (item.value.month < 10) {
            var month = '0' + `${item.value.month}`;
          } else {
            var month = `${item.value.month}`;
          }
          var testing =
            `${item.value.year}` + '-' + `${month}` + '-' + `${day}`;
          //  const zz=  moment(new Date(testing)).format();
          var date = new Date(testing).toISOString();
          item.value = date;
        }
      }

      if (item.controlType === 'Checkbox' || item.controlType === 'Radio') {
        for (let i = 0; i < item.inputValues.length; i++) {
          if (item.inputValues[i].isCheck) {
            testArray.push(item.inputValues[i].name);
          }
        }
        item.value = testArray;
        testArray = [];
      }
    });
    //for custom fields
    for (var i = 0; i < this.customFields.length; i++) {
      console.log('field value', this.customFields[i].value);
      if (this.customFields[i].value) {
        var fieldObj: any = {};
        fieldObj = {
          permittedUserInfoId: this.customFields[i]._id,
          value: this.customFields[i].value
        };
        console.log('fieldObj', fieldObj);
        this.formFieldc.details.push(fieldObj);
        // if(this.customFields[i].value.trim().length){
        // 	var fieldObj:any = {};
        // 	fieldObj = {
        // 		"permittedUserInfoId": this.customFields[i]._id,
        // 		"value": this.customFields[i].value
        // 	}
        // 	console.log("fieldObj",fieldObj);
        // 	this.formFieldc.details.push(fieldObj);
        // }
      }
    }
    console.log('formFieldc details', this.formFieldc.details);

    let objData = new FormData();
    let guardianArray;
    console.log('~~~ ', obj.guardianEmail);
    console.log(typeof obj.guardianEmail);
    // if(typeof obj.guardianEmail == 'object'){
    // 	console.log(typeof obj.guardianEmail)
    // 	obj.guardianEmail = JSON.stringify(obj.guardianEmail);
    // }

    // this.atLeastOneMail = (!obj.guardianEmail && !obj.email) ? true : false;
    // console.log("TTT",this.atLeastOneMail)
    obj.email = obj.email == undefined ? [] : obj.email;
    objData.append('regionId', this.regionID);
    objData.append('orgId', this.orgID);
    objData.append('fullName', obj.fullName);
    objData.append('preferredName', obj.preferredName);
    objData.append('email', obj.email);
    obj.about = obj.about == undefined ? '' : obj.about;
    objData.append('about', obj.about);

    // if(detailsArr.length > 0){
    // 	console.log("Has Details",detailsArr);
    // 	objData.append('details', JSON.stringify(detailsArr));
    // }

    // objData
    if (this.formFieldc.details.length > 0) {
      console.log('Has Details', this.formFieldc.details);
      objData.append('details', JSON.stringify(obj.details));
    } else {
      obj.details = [];
      objData.append('details', JSON.stringify(obj.details));
    }

    this.customerLists = [];

    console.log('Latest', objData);

    if (apiState == 'create') {
      let getImg = document.getElementById('blobUrl');
      this.img =
        getImg != undefined
          ? document.getElementById('blobUrl').getAttribute('src')
          : (this.img = obj.profilePic);
      if (this.img != undefined) {
        this.ulFile = this.dataURItoBlob(this.img);
        objData.append('profilePic', this.ulFile);
        console.log('profile pic', this.ulFile);
      }

      guardianArray = obj.guardianEmail ? obj.guardianEmail.split(',') : [];
      console.log('guardianArray', guardianArray);
      objData.append('guardianEmail', JSON.stringify(guardianArray));
      objData.append('password', obj.password);
      objData.append('location', JSON.stringify([]));

      console.log('Data', objData);
      this.blockUI.start('Loading...');
      this._service.createUser(objData, this.locationID).subscribe(
        (res: any) => {
          console.log(res);
          this.toastr.success('Successfully Created.');
          this.blockUI.stop();
          this.back();
        },
        err => {
          this.blockUI.stop();
          // if(err.message == 'Http failure response for http://dev-app.brainlitz.com/api/v1/signup: 400 Bad Request'){
          // 	this.toastr.error('Email already exist');
          // }
          // else {
          // 	this.toastr.error('Create Fail');
          // }
          console.log(err);
          console.log(err.status);
          if (err.status == 400) {
            this.toastr.error('Email already exist');
          } else {
            this.toastr.error('Create Fail');
          }
        }
      );
    } else {
      console.log('update');
      let getImg = document.getElementsByClassName('circular-profile');
      if (getImg != undefined) {
        $('.circular-profile img:last-child').attr('id', 'blobUrl');
      }
      this.img =
        getImg != undefined
          ? document.getElementById('blobUrl').getAttribute('src')
          : obj.profilePic;
      console.log('~~~> ', this.img);
      console.log('==== ', this.isCrop);

      this.ulFile =
        this.isCrop == true ? this.dataURItoBlob(this.img) : this.img;

      if (this.ulFile != undefined) {
        objData.append('profilePic', this.ulFile);
      }

      if (typeof obj.guardianEmail == 'object') {
        guardianArray = obj.guardianEmail;
      } else {
        guardianArray = obj.guardianEmail.split(',');
      }

      console.log(obj.password);
      if (obj.password != undefined) {
        console.log('hi');
        objData.append('password', obj.password);
      }

      guardianArray = obj.guardianEmail ? guardianArray : [];
      objData.append('guardianEmail', JSON.stringify(guardianArray));

      this.blockUI.start('Loading...');
      this._service
        .updateUser(this.regionID, this.locationID, obj.userId, objData)
        .subscribe(
          (res: any) => {
            console.log(res);
            this.backToDetails();
            this.toastr.success('Successfully updated.');
            this.blockUI.stop();
            this.back();
          },
          err => {
            // this.toastr.error('Update Fail');
            this.blockUI.stop();
            console.log(err);
            if (err.status == 400) {
              this.toastr.error('Email already exist');
            } else {
              this.toastr.error('Create Fail');
            }
          }
        );
    }
  }

  edit(id, type, modal) {
    console.log(id);
    // this.getAllpermission();
    this.blankCrop = true;
    this.notShowEdit = false;
    this.updateButton = true;
    this.createButton = false;

    this._service.userDetail(this.regionID, id).subscribe((res: any) => {
      console.log('customer', res);
      this.formFieldc = res;
      //$("#upload-demo").append('<img src="' + res.profilePic + '" />');
      //$("#upload-demo img").css("width", "100%");
    });
  }

  showMore(type: any, skip: any) {
    console.log(skip);
    if (this.isSearch == true) {
      console.log('User Search', skip);
      this.userSearch(this.searchword, this.usertype, 20, skip);
    } else {
      console.log('Not user search');
      this.getAllUsers(type, 20, skip);
    }
  }

  getAllUsers(type, limit, skip) {
    console.log('calling all users ....');
    console.log('....', this.customerLists);
    this.blockUI.start('Loading...');
    this._service.getAllUsers(this.regionID, type, limit, skip).subscribe(
      (res: any) => {
        console.log(res);
        this.result = res;
        this.customerLists = this.customerLists.concat(res);
        // this.customerLists = res;
        console.log('this.customerLists', this.customerLists);
        setTimeout(() => {
          this.blockUI.stop(); // Stop blocking
        }, 300);
      },
      err => {
        this.blockUI.stop();
        console.log(err);
      }
    );
  }

  // getAllpermission(){
  // 	this._service.getAllPermission(this.regionID)
  // 	.subscribe((res:any) => {
  // 		this.permissionLists = res;
  // 		console.log('this.permissionLists', this.permissionLists);
  // 	})
  // }

  // getAllLocation(){
  // 	this._service.getLocations(this.regionID, 20, 0, false)
  // 	.subscribe((res:any) =>{
  // 		this.locationLists = res;
  // 		console.log('this.locationLists', this.locationLists);
  // 	})
  // }

  whateverEventHandler(e) {
    console.log(e);
    this.validateEmail(e.target.value);
  }

  sameMail;
  validateEmail(data) {
    console.log(data);
    if (data === this.formFieldc.guardianEmail) {
      this.sameMail = true;
    } else {
      this.sameMail = false;
    }
    // this.atLeastOneMail = false;
    this.emailAlert = !this.isValidateEmail(data) ? true : false;
    this.personalMail = this.isValidateEmail(data) ? true : false;
    console.log(this.personalMail);
    this.atLeastOneMail =
      this.emailAlert != true && data.length > 0 ? true : false;
    console.log('Email~~~ ', this.atLeastOneMail);
  }

  validateGuarmail(gData) {
    if (gData === this.formFieldc.email) {
      this.sameMail = true;
    } else {
      this.sameMail = false;
    }
    console.log(gData);
    // this.atLeastOneMail = false;
    this.guardianAlert = !this.isValidateEmail(gData) ? true : false;
    this.atLeastGurMail =
      this.guardianAlert != true && gData.length > 0 ? true : false;
    console.log('GurMail~~~ ', this.atLeastGurMail);
  }

  isValidateEmail($email) {
    var emailReg = /^([A-Za-z0-9\.\+\_\-])+\@([A-Za-z0-9\.])+\.([A-Za-z]{2,4})$/;
    if ($email != '') {
      return emailReg.test($email);
    } else {
      return true;
    }
  }

  cancel() {
    this.addNewCustomer = false;
  }

  createNew(type) {
    this.addNewCustomer = true;
  }

  goCreateForm(type) {
    this.customerEmail = false;
    this.guardianEmail = false;
    this.hideMenu = true;
    console.log('TYPE', type);
    this.isCrop = false;
    this.customerLists = [];
    this.showFormCreate = true;

    console.log('create');
    setTimeout(function() {
      $('.frame-upload').css('display', 'none');
    }, 10);

    if (type == 'create' || !this.formFieldc.details) {
      console.log('CREATE');
      this.getCustomFields('create');
    } else {
      this.getCustomFields('update');
    }
  }

  back() {
    this.hideMenu = false;
    this.formFieldc = new customer();
    this.isupdate = false;
    console.log('back');
    this.showFormCreate = false;
    this.blankCrop = false;
    this.imgDemoSlider = false;
    $('.frame-upload').css('display', 'none');
    this.customerLists = [];
    if (this.customerPermission.includes('VIEWCUSTOMERS') != false) {
      this.getAllUsers('customer', 20, 0);
    }
  }

  backToDetails() {
    this.hideMenu = true;
    this.formFieldc = new customer();
    this.showFormCreate = false;
    this.blankCrop = false;
    this.imgDemoSlider = false;
    $('.frame-upload').css('display', 'none');
    this.customerLists = [];
    this.showDetails(this.custDetail.user.userId);
  }

  uploadCropImg($event: any) {
    console.log('hihi');
    var image: any = new Image();
    this.blankCrop = true;
    $('.frame-upload').css('display', 'block');
    this.imgDemoSlider = true;
    $('#upload-demo img:first').remove();
    this.input = $event.target.files[0];
    console.log(this.input.size);
    if (this.input.size <= 477732 && this.input) {
      if (this.input && this.uploadCrop) {
        this.uploadCrop.destroy();
      }
      var reader: FileReader = new FileReader();
      this.uploadCrop = new Croppie(document.getElementById('upload-demo'), {
        viewport: {
          width: 150,
          height: 150,
          type: 'circle'
        },
        boundary: {
          width: 300,
          height: 300
        },
        enableExif: true
      });

      var $uploadCrop = this.uploadCrop;
      console.log('$uploadCrop', $uploadCrop);
      reader.onload = function(e: any) {
        $('.upload-demo').addClass('ready');
        $uploadCrop
          .bind({
            url: e.target.result
          })
          .then(function(e: any) {});
      };
      reader.readAsDataURL($event.target.files[0]);
    } else {
      console.log('file size is too large');
      this.toastr.error('file size is too large');
      this.validProfile = false;
      this.imgDemoSlider = false;
      $('.frame-upload').css('display', 'none');
    }
  }

  cropResult(modal) {
    this.validProfile = true;
    this.isCrop = true;
    let self = this;
    console.log(self.input);

    this.imgDemoSlider = false;
    setTimeout(function() {
      $('.circular-profile img:last-child').attr('id', 'blobUrl');
      $('.frame-upload').css('display', 'none');
      this.blankCrop = false;
    }, 200);
    console.log(this.uploadCrop);
    var cropper = this.uploadCrop;
    var BlobUrl = this.dataURItoBlob;
    this.uploadCrop
      .result({
        circle: false,
        type: 'canvas',
        size: {
          width: 800,
          height: 800
        },
        quality: 1
      })
      .then(function(resp: any) {
        //   	console.log(resp)
        //   	const blob = BlobUrl(resp);
        // const blobUrl = URL.createObjectURL(blob);
        // console.log(blobUrl)
        if (resp) {
          setTimeout(function() {
            $('.circular-profile img').remove();
            $('.circular-profile').append(
              '<img src="' + resp + '" width="100%" />'
            );
          }, 100);
        }
      });
  }

  dataURItoBlob(dataURI: any) {
    var byteString = atob(dataURI.split(',')[1]);
    var mimeString = dataURI
      .split(',')[0]
      .split(':')[1]
      .split(';')[0];
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }

  backToUpload() {
    console.log('menu should be hidden');
    this.hideMenu = true;
    this.validProfile = false;
    this.imgDemoSlider = false;
    $('.frame-upload').css('display', 'none');
  }

  showDetails(ID) {
    this.activeTab = 'class';
    this.hideMenu = false;
    this.customerLists = [];
    console.log(ID);
    this.editId = ID;
    console.log('show details');
    const format = 'DD MMM YYYY';
    const zone = localStorage.getItem('timezone');
    // this.showCustDetail = true;
    this.getRegionInfo();
    this.showCustDetail = true;
    if (this.currency == undefined || this.currency == null) {
      this.currency = {
        invCurrencySign: '$'
      };
      console.log('undefined currency', this.currency);
    } else {
      if (this.currency.invCurrencySign == '') {
        console.log('has currency but sign null', this.currency);
        this.currency.invCurrencySign = '$';
      }
    }

    this.blockUI.start('Loading...');
    this._service.getUserDetail(this.regionID, ID, this.locationID).subscribe(
      (res: any) => {
        this.custDetail = res;
        res.user.details.map(info => {
          if (info.controlType === 'Datepicker')
            info.value = moment(info.value).format('YYYY-MM-DD');
        });
        console.log('CustDetail', res);
        for (var i = 0; i < this.custDetail.ratings.length; i++) {
          var tempData = this.custDetail.ratings[i].updatedDate;
          var d = new Date(tempData);
          console.log(this.custDetail.ratings[i].updatedDate);
          this.custDetail.ratings[i].updatedDate = moment(d, format)
            .tz(zone)
            .format(format);
        }
        setTimeout(() => {
          this.blockUI.stop();
        }, 300);
      },
      err => {
        console.log(err);
        this.blockUI.stop();
      }
    );
  }

  backToCustomer() {
    this.hideMenu = false;
    console.log('back');
    this.formFieldc = new customer();
    this.showCustDetail = false;
    this.isupdate = false;
    this.showFormCreate = false;
    this.blankCrop = false;
    this.imgDemoSlider = false;
    this.selectedId = [];
    this.isSearch = false;

    $('.frame-upload').css('display', 'none');
    this.customerLists = [];
    console.log(this.customerLists);
    if (this.customerPermission.includes('VIEWCUSTOMERS') != false) {
      this.getAllUsers('customer', 20, 0);
    }
    this.dataService.nevigateCustomer('');
  }

  selectedId: any = [];
  sliceCount: any;
  showMoreItem(itemid) {
    console.log(itemid);
    this.selectedId.push(itemid);
    console.log('selectedId Arr', this.selectedId);
    // if(itemid != 'activity'){
    // 	this.divHeight = $( ".firstCol" ).height();
    // 	console.log("divHeight",this.divHeight);
    // }
    this.divHeight = $('.firstCol').height();
    console.log('divHeight', this.divHeight);
    // $(".journals-wrapper").css("height", this.divHeight + "px");
  }

  // enroll class

  clearSearch() {
    // this.isSearch = false;
  }

  userSearch(searchWord, userType, limit, skip) {
    this.searchword = searchWord;
    this.usertype = userType;
    console.log('hi hello');
    if (skip == '' && limit == '') {
      var isFirst = true;
      limit = 20;
      skip = 0;
    }

    if (searchWord.length != 0) {
      this.isSearch = true;
      console.log(userType);
      console.log(searchWord);
      this._service
        .getSearchUser(this.regionID, searchWord, userType, limit, skip, '')
        .subscribe(
          (res: any) => {
            console.log(res);
            this.result = res;
            if (isFirst == true) {
              console.log('First time searching');
              this.customerLists = [];
              this.customerLists = res;
            } else {
              console.log('Not First time searching');
              this.customerLists = this.customerLists.concat(this.result);
            }
          },
          err => {
            console.log(err);
          }
        );
    } else {
      console.log('zero', searchWord.length);
      setTimeout(() => {
        console.log('wait');
        this.customerLists = [];
        this.getAllUsers('customer', 20, 0);
        this.isSearch = false;
      }, 300);
    }
  }

  changeSearch(searchWord, userId, limit, skip) {
    this.acWord = searchWord;
    this.userid = userId;
    console.log(searchWord);
    console.log('userid', userId);
    if (skip == '' && limit == '') {
      console.log('First time search');
      var isFirst = true;
      limit = 20;
      skip = 0;
    }
    if (searchWord.length != 0) {
      this.isACSearch = true;
      this._service
        .getSearchAvailableCourse(
          this.regionID,
          searchWord,
          userId,
          limit,
          skip
        )
        .subscribe(
          (res: any) => {
            console.log(res);
            this.acResult = res;
            // this.availableCourses = res;
            if (isFirst == true) {
              console.log('First time searching');
              this.availableCourses = [];
              this.availableCourses = res;
              this.checkedDisabled(this.availableCourses);
            } else {
              console.log('Not First time searching');
              this.availableCourses = this.availableCourses.concat(res);
              this.checkedDisabled(this.availableCourses);
            }
          },
          err => {
            console.log(err);
          }
        );
    } else {
      console.log('zero', searchWord.length);
      this.availableCourses = [];
      this.getAC(20, 0, userId);
      this.isACSearch = false;
    }
  }

  showMoreAC(skip, userId) {
    console.log(skip);
    // this.getAC(20, skip, userId);
    if (this.isACSearch == true) {
      console.log('AC Search');
      this.changeSearch(this.acWord, this.userid, 20, skip);
    } else {
      console.log('Not AC search');
      this.getAC(20, skip, userId);
    }
  }

  callEnrollModal(enrollModal, userId) {
    console.log(userId);
    console.log(enrollModal);
    this.blockUI.start('Loading...');
    this.showInvoice = false;
    this.showPaidInvoice = false;
    console.log(this.showInvoice, this.showPaidInvoice);
    this.modalReference = this.modalService.open(enrollModal, {
      backdrop: 'static',
      windowClass:
        'modal-xl modal-inv d-flex justify-content-center align-items-center'
    });
    this.getAC(20, 0, userId);
  }

  getAC(limit, skip, userId) {
    console.log('limit,skip,userId', limit, skip, userId);
    this._service
      .getAvailabelCourse(this.regionID, userId, limit, skip)
      .subscribe(
        (res: any) => {
          console.log(res);
          this.acResult = res;
          this.availableCourses = this.availableCourses.concat(res);
          console.log('Available C', this.availableCourses);
          this.checkedDisabled(this.availableCourses);
          this.blockUI.stop();
        },
        err => {
          console.log(err);
        }
      );
  }

  checkedDisabled(ac) {
    for (var i in ac) {
      if (ac[i].type == 'FLEXY') {
        if (ac[i].isEnrolled == false && ac[i].seat_left == 0) {
          ac[i]['isDisabled'] = true;
        } else {
          ac[i]['isDisabled'] = false;
        }
      } else {
        if (ac[i].seat_left == 0) {
          ac[i]['isDisabled'] = true;
        } else {
          ac[i]['isDisabled'] = false;
        }
      }
    }
  }
  selectedCustomer: any = {};
  enrollUser(course, type) {
    this.selectedCourse = course;
    console.log(course, type);
    if (type == 'FLEXY') {
      this.blockUI.start('Loading...');
      this.selectedCourse = course;
      this.selectedCustomer = this.custDetail.user;
      console.log('is flexy');
      let startDate;
      let endDate;
      this._service
        .getFlexi(course._id, this.custDetail.user.userId, startDate, endDate)
        .subscribe(
          (res: any) => {
            console.log(res);
            this.flexyarr = res;
            this.showInvoice = false;
            this.showflexyCourse = true;
            this.blockUI.stop();
          },
          err => {
            console.log(err);
          }
        );
    } else {
      this.blockUI.start('Loading...');
      console.log(this.custDetail);
      let courseId = course._id;
      let body = {
        courseId: course._id,
        userId: this.custDetail.user.userId,
        userType: 'customer'
      };
      this._service.assignUser(this.regionID, body, this.locationID).subscribe(
        (res: any) => {
          console.log(res);
          console.log(this.custDetail);
          if (res.status == 200) {
            this.toastr.success('Successfully Enrolled.');
            Object.assign(this.selectedCourse, res.body);
            // this.showDetails(this.custDetail.user.userId);
            // this.closeModel();
            /* for invoice*/
            this.showInvoice = true;
            if (res.invoiceSettings == {} || res.invoiceSettings == undefined) {
              console.log('no invoice setting');
              this.invoiceInfo = {
                address: '',
                city: '',
                companyName: '',
                email: '',
                prefix: '',
                registration: ''
              };
            } else {
              console.log('has invoice setting');
              this.invoiceInfo = res.invoiceSettings;
            }
            this.invoice = res.invoice;
            this.showInvoice = true;
            this.blockUI.stop();
            this.showOneInvoice(course, this.invoice);
          } else {
            this.toastr.success('TIMETABLE IS ALREADY EXISTED');
            this.blockUI.stop();
            this.showInvoice = false;
          }
          // for(var i in this.invoice){
          //  this.updatedDate = this.dateFormat(this.invoice[i].updatedDate);
          //  this.dueDate = this.dateFormat(this.invoice[i].dueDate);
          //  this.invoiceID = this.invoice[i]._id;
          //  this.refInvID = this.invoice[i].refInvoiceId;
          //  this.invTaxName = this.invoice[i].tax.name;
          //  var n = this.invoice[i].total;
          //  this.total = n.toFixed(2);
          //  this.invoice[i].subtotal = Number(Number(this.invoice[i].subtotal).toFixed(2));
          //  console.log('n and total',n,this.total);
          //  this.invoiceCourse["fees"] = this.invoice[i].courseFee.fee;
          //  if(this.invoice[i].courseId == course._id){
          //    this.invoiceCourse["name"] = course.name;
          //          this.invoiceCourse["startDate"] = course.startDate;
          //          this.invoiceCourse["endDate"] = course.endDate;
          //          this.invoiceCourse["lessonCount"] = course.lessonCount;
          //  }
          // }
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  dateFormat(dateStr) {
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];
    var d = new Date(dateStr);
    var month = monthNames[d.getUTCMonth()];
    var year = d.getUTCFullYear();
    var date = d.getUTCDate();
    console.log(date, month, year);
    var dFormat = date + ' ' + month + ' ' + year;
    console.log('DD MM YYYY', dFormat);
    return dFormat;
  }

  showPopup(type, value) {
    console.log('show popup');
    this.isEditInv = true;
    if (type == 'courseFee') {
      this.feesBox = true;
      this.value.courseFee = value;
    }
  }

  cancelPopup(type) {
    if (
      (this.hideReg == true &&
        this.hideDeposit == true &&
        this.hideMisc == true) ||
      this.hideReg == true ||
      this.hideDeposit == true ||
      this.hideMisc == true
    ) {
      this.isEditInv = true;
    } else {
      this.isEditInv = false;
    }
    console.log('hide popup');
    if (type == 'courseFee') {
      this.feesBox = false;
      this.value.courseFee = '';
    }
  }

  updateCfee(data) {
    console.log('updateCfee', data);
    this.feesBox = false;
    for (var i in this.invoice) {
      if (this.invoice[i].courseFee.fee != data) {
        console.log('===not same');
        this.updateInvData['courseFee'] = data;
        this.invoice[i].courseFee.fee = Number(data);
        console.log(this.invoice[i].courseFee.fee);
        // formula for calculating the inclusive tax
        // Product price x RATE OF TAX/ (100+RATE OF TAX);
        if (this.invoice[i].courseFee.taxInclusive == true) {
          var taxRate = this.invoice[i].tax.rate;
          var taxAmount = (
            (this.invoice[i].courseFee.fee * taxRate) /
            (100 + taxRate)
          ).toFixed(2);
          this.invoice[i].courseFee.tax = Number(taxAmount);
          console.log('inclusiveTax for CFee', this.invoice[i].courseFee.tax);
          var cFee = (
            this.invoice[i].courseFee.fee - this.invoice[i].courseFee.tax
          ).toFixed(2);
          this.invoice[i].courseFee.fee = Number(cFee);
          this.invoice[i].courseFee.amount = (
            this.invoice[i].courseFee.fee + this.invoice[i].courseFee.tax
          ).toFixed(2);
          console.log(
            'CFee without inclusive tax',
            this.invoice[i].courseFee.fee
          );
          console.log(
            'Amount without inclusive tax',
            this.invoice[i].courseFee.amount
          );
        } else if (this.invoice[i].courseFee.taxInclusive == false) {
          var taxRate = this.invoice[i].tax.rate;
          var taxAmount = (
            (this.invoice[i].courseFee.fee * taxRate) /
            100
          ).toFixed(2);
          this.invoice[i].courseFee.tax = Number(taxAmount);
          console.log('inclusiveTax for CFee', this.invoice[i].courseFee.tax);
          this.invoice[i].courseFee.amount =
            this.invoice[i].courseFee.fee + this.invoice[i].courseFee.tax;
          console.log('CFee with exclusive tax', this.invoice[i].courseFee.fee);
          console.log(
            'Fee amount with exclusive tax',
            this.invoice[i].courseFee.amount
          );
        }

        this.calculateHideFees('cFees');
      } else {
        console.log('===same');
      }
    }
  }

  calculateHideFees(type) {
    console.log('calculateHideFees');
    for (var i in this.invoice) {
      var regFees: number;
      var regTax: number;
      var miscFees: number;
      var miscTax: number;
      var deposit: number;
      var totalTaxes: number;

      if (this.hideReg == true) {
        regFees = 0;
        regTax = 0;
      } else {
        regFees = this.invoice[i].registrationFee.fee;
        regTax = this.invoice[i].registrationFee.tax;
      }

      if (this.hideMisc == true) {
        miscFees = 0;
        miscTax = 0;
      } else {
        miscFees = this.invoice[i].miscFee.fee;
        miscTax = this.invoice[i].miscFee.tax;
      }

      if (this.hideDeposit == true) {
        deposit = 0;
      } else {
        deposit = this.invoice[i].deposit;
      }

      totalTaxes = regTax + miscTax + Number(this.invoice[i].courseFee.tax);
      console.log('Total taxes and deposit', totalTaxes, deposit);
      this.invoice[i].subtotal = (
        regFees +
        miscFees +
        deposit +
        this.invoice[i].courseFee.fee
      ).toFixed(2);
      this.total = Number(
        (Number(this.invoice[i].subtotal) + totalTaxes).toFixed(2)
      );
      console.log('Subtotal', this.invoice[i].subtotal);
      console.log('Total', this.total);
    }
  }

  sendInvoice() {
    console.log('send Invoice', this.invoiceID);
    var mailArr = [];
    mailArr.push(this.custDetail.user.email);
    for (var i in this.custDetail.user.guardians) {
      mailArr.push(this.custDetail.user.guardians[i].email);
    }
    console.log('mailArr', mailArr);
    let body = {
      associatedMails: mailArr
    };
    console.log('body', body);
    this._service
      .invoiceOption(this.regionID, this.invoiceID, body, 'send')
      .subscribe(
        (res: any) => {
          console.log(res);
          this.toastr.success('Successfully sent the Invoice.');
          this.closeModal('closeInv');
        },
        err => {
          console.log(err);
          this.toastr.error('Fail to sent the Invoice.');
        }
      );
  }

  // cancelInvoiceModal(){
  //     this.modalReference.close();
  //     this.availableCourses = [];
  //     this.showInvoice = false;
  //     this.showPayment = false;
  //     this.paymentItem = {};
  //     this.showDetails(this.custDetail.user.userId);
  //   }

  closeModal(type) {
    console.log(type);
    this.jSkip = 0;
    this.journals = [];
    this.isChecked = '';
    this.checkCourse = '';
    this.modalReference.close();
    this.availableCourses = [];
    this.showInvoice = false;
    this.showPayment = false;
    this.paymentItem = {};
    this.hideReg = false;
    this.hideDeposit = false;
    this.hideMisc = false;
    this.isEditInv = false;
    this.singleInv = [];
    this.updateInvData = {};
    this.invStatus = '';
    this.showPaidInvoice = false;
    this.invPayment = [];
    this.searchData.searchText = '';
    this.showflexyCourse = false;

    if (type == 'closeInv') {
      this.showDetails(this.custDetail.user.userId);
    }
    this.showflexyCourse = false;
  }

  showPayOption() {
    console.log('pay option');
    this.showPayment = true;
    this.showInvoice = false;
    if (this.invStatus == 'PAID[PARTIAL]') {
      var totalPaid = 0;
      for (var i in this.invPayment) {
        console.log('each payment', this.invPayment[i]);
        totalPaid = totalPaid + this.invPayment[i].amount;
      }
      console.log('total paid', totalPaid);
      this.paymentItem.amount = Number((this.total - totalPaid).toFixed(2));
      console.log('Total Amount for Pay', this.paymentItem.amount);
    } else {
      this.paymentItem.amount = this.total;
    }

    this._service.getPaymentMethod().subscribe((res: any) => {
      console.log(res);
      this.paymentProviders = res;
      this.selectedPayment = this.paymentProviders[0].name;
      this.paymentId = this.paymentProviders[0].id;
    });
  }

  getRegionInfo() {
    this.token = localStorage.getItem('token');
    this.type = localStorage.getItem('tokenType');
    this._service
      .getRegionalAdministrator(this.regionID, this.token, this.type)
      .subscribe((res: any) => {
        console.log('regional info', res);
        // this.paymentProviders = res.invoiceSettings.paymentProviders;
        // console.log(this.paymentProviders);
        if (
          res.invoiceSettings == {} ||
          res.invoiceSettings == undefined ||
          res.paymentSettings == {} ||
          res.paymentSettings == undefined
        ) {
          console.log('no invoice setting');
          this.invoiceInfo = {
            address: '',
            city: '',
            companyName: '',
            email: '',
            prefix: '',
            registration: ''
          };
          this.noSetting = true;
        } else {
          console.log('has invoice setting');
          this.invoiceInfo = res.invoiceSettings;
          this.noSetting = false;
        }
        console.log(this.getRegionInfo);
      });
  }

  choosePayment(type) {
    console.log('choosePayment', type);
    this.selectedPayment = type.name;
    this.paymentId = type.id;
    // console.log('pItem',this.paymentItem);
  }

  payNow(type) {
    console.log('Pay Now', this.paymentItem, this.paymentId);
    let body = {
      regionId: this.regionID,
      refInvoiceId: this.refInvID,
      amount: this.paymentItem.amount.toString(),
      paymentMethod: this.paymentId.toString()
    };
    if (this.paymentItem.refNumber) {
      body['refNo'] = this.paymentItem.refNumber;
    }
    // console.log("data",body);
    this._service.makePayment(this.regionID, body).subscribe(
      (res: any) => {
        console.log(res);
        this.showDetails(this.custDetail.user.userId);
        this.closeModal('closeInv');
        this.toastr.success(res.message);
      },
      err => {
        if (err.message == 'Amount is overpaid.') {
          this.toastr.success('Amount is overpaid.');
        }
        this.toastr.error('Payment Fail');
      }
    );
  }

  hideInvoiceRow(type) {
    this.isEditInv = true;
    if (type == 'reg') {
      this.hideReg = true;
      this.updateInvData['registrationFee'] = null;
      this.calculateHideFees(type);
    } else if (type == 'deposit') {
      this.hideDeposit = true;
      this.updateInvData['deposit'] = null;
      this.calculateHideFees(type);
    } else if (type == 'misc') {
      this.hideMisc = true;
      this.updateInvData['miscFee'] = null;
      this.calculateHideFees(type);
    }
  }

  printInvoice() {
    window.print();
  }

  updateInvoice() {
    console.log('Inv Update Data', this.updateInvData);
    this._service
      .updateInvoiceInfo(this.invoiceID, this.updateInvData)
      .subscribe(
        (res: any) => {
          console.log(res);
          this.isEditInv = false;
          //for updating invoice ui
          this.singleInv = [];
          this.singleInv.push(res);
          this.invoice = this.singleInv;
          console.log('invoice', this.invoice);
          for (var i in this.invoice) {
            var n = this.invoice[i].total;
            this.total = n.toFixed(2);
            this.invoice[i].subtotal = Number(
              Number(this.invoice[i].subtotal).toFixed(2)
            );
            if (this.invoice[i].registrationFee.fee == null) {
              this.hideReg = true;
            }

            if (this.invoice[i].miscFee.fee == null) {
              this.hideMisc = true;
            }

            if (this.invoice[i].deposit == null) {
              this.hideDeposit = true;
            }
          }
        },
        err => {
          console.log(err);
        }
      );
  }

  allCourseLists() {
    this._service.getAllCourse(this.regionID, this.locationID, 20, 0).subscribe(
      (res: any) => {
        this.courseLists = res;
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  clickTab(val) {
    this.activeTab = val;
    this.activePass = 'available';
    if (val == 'makeup') {
      this.callMakeupLists();
    } else if (val == 'class') {
      this.showDetails(this.custDetail.user.userId);
    }
  }

  callMakeupLists() {
    this.blockUI.start('Loading...');
    this._service
      .getMakeupLists(
        this.custDetail.user.userId,
        this.activePass,
        this.regionID,
        undefined
      )
      .subscribe(
        (res: any) => {
          this.blockUI.stop();
          console.log(res);
          this.makeupLists = res;
        },
        err => {
          console.log(err);
        }
      );
  }

  openClaimModal(claimModal, passObj) {
    this.currentPassObj = passObj;
    this.modalReference = this.modalService.open(claimModal, {
      backdrop: 'static',
      windowClass: 'modal-xl d-flex justify-content-center align-items-center'
    });
    this.getClaimCourses(this.currentPassObj.course.courseId);
  }

  getClaimCourses(id) {
    this.blockUI.start('Loading...');
    this._service.getClaimPassCourses(id).subscribe(
      (res: any) => {
        this.blockUI.stop();
        console.log(res);
        this.claimCourses = res;
      },
      err => {
        this.blockUI.stop();
        console.log(err);
      }
    );
  }

  enrollPass(data, courseid) {
    console.log(data);
    console.log(this.lessonData);
    let body = {
      _id: this.lessonData._id,
      startDate: this.lessonData.startDate,
      endDate: this.lessonData.endDate,
      teacherId: this.lessonData.teacherId,
      makeupCourseId: data.courseId,
      passId: this.currentPassObj.passId
    };
    console.log(body);
    this.blockUI.start('Loading...');
    this._service
      .enrollPass(
        body,
        this.custDetail.user.userId,
        this.currentPassObj.course.courseId
      )
      .subscribe(
        (res: any) => {
          console.log(res);
          this.modalReference.close();
          this.blockUI.stop();
          this.isChecked = '';
          this.checkCourse = '';
          this.toastr.success('Successfully passed.');
          this.callMakeupLists();
        },
        err => {
          console.log(err);
          // this.toastr.error('Claim pass failed.');
          this.toastr.error(err.error.message);
          this.blockUI.stop();
          this.isChecked = '';
          this.checkCourse = '';
          this.modalReference.close();
        }
      );
  }

  chooseDate(obj, data) {
    console.log(obj);
    console.log(data);
    this.lessonData = obj;
    this.isChecked = obj._id;
    this.checkCourse = data.courseId;
    // console.log(this.checkCourse)
  }
  jLoadMore() {
    this.jSkip += this.jLimit;
    console.log(this.jSkip);
    this._service
      .getJournal(
        this.jSlectedCourse,
        this.custDetail.user.userId,
        String(this.jSkip),
        String(this.jLimit),
        null
      )
      .subscribe((res: any) => {
        if (res.length > 0) {
          this.journals = this.journals.concat(res);
          if (res.length >= 20) {
            this.toShowLoadMore = true;
          } else this.toShowLoadMore = false;
        } else {
          this.toShowLoadMore = false;
        }
        console.log(this.journals);
        console.log(res);
        this.blockUI.stop();
      });
  }
  trackByFn(index, item) {
    return index;
  }
  viewJournal(journalModal, course, name) {
    this.jSkip = 0;
    this.journals = [];
    console.log(this.custDetail);
    console.log(course);
    console.log(name);
    this.className = course.name;
    console.log(this.className, course.name);
    this._service
      .getJournal(
        course._id,
        this.custDetail.user.userId,
        String(this.jSkip),
        String(this.jLimit),
        null
      )
      .subscribe((res: any) => {
        console.log(res.length);
        if (res.length >= 20) this.toShowLoadMore = true;
        else this.toShowLoadMore = false;
        this.jSlectedCourse = course._id;
        this.journals = res;
        console.log(this.journals.length);
        if (this.journals.length == 0) this.toShowNoJournl = true;
        else this.toShowNoJournl = false;
        console.log(res);
        this.modalReference = this.modalService.open(journalModal, {
          backdrop: 'static',
          windowClass:
            'jouranlModal d-flex justify-content-center align-items-center'
        });
        this.blockUI.stop();
      });
  }
  viewInvoice(enrollModal, course) {
    this.selectedCourse = course;
    console.log(enrollModal, course);
    this.singleInv = [];
    console.log('zzz', course.invoice.status);
    if (course.invoice.status == 'PAID') {
      this.showPaidInvoice = true;
    } else if (
      course.invoice.status == 'UNPAID' ||
      course.invoice.status == 'PAID[PARTIAL]'
    ) {
      this.showInvoice = true;
    }

    this.invStatus = course.invoice.status;
    console.log('View Invoice', course);
    console.log(this.custDetail);
    // this.showInvoice = true;
    this.modalReference = this.modalService.open(enrollModal, {
      backdrop: 'static',
      windowClass:
        'modal-xl modal-inv d-flex justify-content-center align-items-center'
    });
    this.getRegionInfo();
    console.log(this.invoiceInfo);
    if (course.invoice != null) {
      var invoiceId = course.invoice._id;
      console.log('has invoice ID', invoiceId);
    } else {
      console.log('no invoice id');
    }
    this.blockUI.start('Loading...');
    this._service.getSingleInvoice(invoiceId).subscribe(
      (res: any) => {
        this.blockUI.stop();
        console.log('invoice detail', res);
        this.singleInv.push(res);
        this.invoice = this.singleInv;
        console.log('invoice', this.invoice);
        this.showOneInvoice(course, this.invoice);
      },
      err => {
        console.log(err);
      }
    );
  }

  showOneInvoice(course, invoice) {
    console.log('showOneInvoice', course);
    for (var i in this.invoice) {
      this.updatedDate = this.dateFormat(invoice[i].updatedDate);
      this.dueDate = this.dateFormat(invoice[i].dueDate);
      this.invoiceID = invoice[i]._id;
      this.refInvID = invoice[i].refInvoiceId;
      this.invTaxName = invoice[i].tax.name;
      // this.invStatus = invoice[i].status;
      this.invCurrency = invoice[i].currency;
      this.invPayment = invoice[i].payments;
      var n = invoice[i].total;
      this.total = n.toFixed(2);
      this.invoice[i].subtotal = Number(Number(invoice[i].subtotal).toFixed(2));
      console.log('n and total', n, this.total);
      if (this.invoice[i].registrationFee.fee == null) {
        this.hideReg = true;
      }
      if (this.invoice[i].miscFee.fee == null) {
        this.hideMisc = true;
      }
      if (this.invoice[i].deposit == null) {
        this.hideDeposit = true;
      }

      this.invoiceCourse['fees'] = this.invoice[i].courseFee.fee;
      if (invoice[i].courseId == course._id) {
        this.invoiceCourse['name'] = course.name;
        this.invoiceCourse['startDate'] = course.startDate;
        this.invoiceCourse['endDate'] = course.endDate;
        this.invoiceCourse['lessonCount'] = course.lessonCount;
      }
    }
  }

  backToInvoice() {
    console.log('Back To Invoice');
    this.showPayment = false;
    this.showInvoice = true;
    this.paymentItem = {};
  }

  clickPass(type) {
    this.activePass = type;
    this.callMakeupLists();
  }

  forward(target) {
    console.log('----', target);
    event.preventDefault();
    $('#' + target).animate(
      {
        scrollLeft: '+=150px'
      },
      'slow'
    );
  }

  backward(target) {
    console.log('----', target);
    event.preventDefault();
    $('#' + target).animate(
      {
        scrollLeft: '-=200px'
      },
      'slow'
    );
  }

  searchMakeup(keyword) {
    if (keyword.length > 0) {
      this.blockUI.start('Loading...');
      this._service
        .searchMakeupCourse(keyword, this.currentPassObj.course.courseId, 20, 0)
        .subscribe(
          (res: any) => {
            console.log(res);
            this.blockUI.stop();
            this.claimCourses = res;
          },
          err => {
            this.blockUI.stop();
            console.log(err);
          }
        );
    } else {
      this.claimCourses = '';
      this.getClaimCourses(this.currentPassObj.course.courseId);
    }
  }
  isCourse: boolean = false;
  onClickCourse(course) {
    // this.isCourse = true;
    console.log('clicking course', course);
    // localStorage.setItem('userCourse',course._id);
    this.router.navigate(['/course']);
    this.dataService.nevigateCourse(course._id);
  }

  rolloverCourse(id, course) {
    console.log('rolloverCourse works', id, course);
    var obj = {
      courseId: id,
      userId: this.custDetail.user.userId,
      category: {
        id: course.category._id,
        name: course.category.name
      },
      coursePlan: {
        id: course.coursePlan._id,
        name: course.coursePlan.name
      }
    };
    this.router.navigate(['/schedule']);
    this.dataService.nevigateSchedule(obj);
  }

  //start flexy
  showcb: boolean = false;
  isConflictAll: boolean = false;
  conflictBoxShow(e) {
    this.showcb = e;
    console.log($('.conflictPopUp'));
    this.FlexiComponent.changes.subscribe(e => {
      if (document.getElementById('flexiMid') != null) {
        let hideoverlay: HTMLElement = document.getElementById('flexiMid');
        hideoverlay.setAttribute('style', 'overflow: hidden;');
      }
    });
    // $('.conflictPopUp').show();
  }

  clickOverlay() {
    console.log(this.flexyarr);
    this.showcb = false;
    this.FlexiComponent.changes.subscribe(e => {
      $('.conflictPopUp').hide();
      if (document.getElementById('flexiMid') != null) {
        let hideoverlay: HTMLElement = document.getElementById('flexiMid');
        hideoverlay.setAttribute('style', 'overflow: overlay;');
      }
    });
  }

  backtoCustomer() {
    this.showflexyCourse = false;
    this.showInvoice = false;
    this.showPayment = false;
  }

  lessionObjArr(e) {
    console.log(e);
    this.checkobjArr = e;
  }
  flexicomfirm() {
    //add cutomer
    let courseId = this.selectedCourse._id;
    let body = {
      courseId: this.selectedCourse._id,
      userId: this.custDetail.user.userId,
      userType: 'customer',
      lessons: this.checkobjArr
    };
    this._service.assignUser(this.regionID, body, this.locationID).subscribe(
      (res: any) => {
        console.log(res);
        console.log(this.custDetail);
        this.toastr.success('Successfully Enrolled.');
        Object.assign(this.selectedCourse, res.body);
        // this.showDetails(this.custDetail.user.userId);
        // this.closeModel();
        /* for invoice*/
        this.showInvoice = true;
        if (res.invoiceSettings == {} || res.invoiceSettings == undefined) {
          console.log('no invoice setting');
          this.invoiceInfo = {
            address: '',
            city: '',
            companyName: '',
            email: '',
            prefix: '',
            registration: ''
          };
        } else {
          console.log('has invoice setting');
          this.invoiceInfo = res.invoiceSettings;
        }
        this.invoice = res.invoice;
        this.showInvoice = true;
        this.showflexyCourse = false;
        this.showPayment = false;
        this.blockUI.stop();
        this.showOneInvoice(this.selectedCourse, this.invoice);
      },
      err => {
        console.log(err);
      }
    );
  }

  closeDropdown(event, type, datePicker?) {
    if (event.target.className.includes('dropD')) {
    } else {
      // console.log("##########",event.target.className)
      // if (type == "start")
      //   datePicker.close();
      // else if (type== 'end')
      //   datePicker.close();
      if (type == 'start' || type == 'end') {
        if (event.target.offsetParent == null) {
          datePicker.close();
        } else if (event.target.offsetParent.nodeName != 'NGB-DATEPICKER') {
          datePicker.close();
        }
      }
    }
  }

  checkBoxCheck(item) {
    item.isCheck = !item.isCheck;
  }
  radioCheck(item, fields) {
    fields.map(field => {
      field.isCheck = false;
    });
    item.isCheck = !item.isCheck;
  }
}
