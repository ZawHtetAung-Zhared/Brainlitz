import {
  Component,
  OnInit,
  ViewChild,
  HostListener,
  ViewContainerRef,
  Pipe,
  PipeTransform,
  AfterViewInit
} from '@angular/core';
import { appService } from '../../service/app.service';
import { ImageCropperComponent } from 'ng2-img-cropper/src/imageCropperComponent';
import { CropperSettings } from 'ng2-img-cropper/src/cropperSettings';
import { Croppie } from 'croppie';
import { Bounds } from 'ng2-img-cropper/src/model/bounds';
import { Staff } from './staff';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import {
  NgbModalRef,
  NgbModal,
  NgbDateStruct,
  ModalDismissReasons,
  NgbDatepickerConfig
} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
import { Router } from '@angular/router';
import { Subscription, ISubscription } from 'rxjs/Subscription';
import * as moment from 'moment-timezone';
@Component({
  selector: 'app-user-staff',
  templateUrl: './user-staff.component.html',
  styleUrls: ['./user-staff.component.css']
})
export class UserStaffComponent implements OnInit {
  private permissionSubscription: ISubscription;
  public returnProfile = false;
  public isCrop = false;
  public locationName: any;
  public permissionType: any;
  public staffPermission: any = [];
  public modalReference: any;
  public staffDemo: any = [];
  public orgID = localStorage.getItem('OrgId');
  public regionID = localStorage.getItem('regionId');
  public staffLists: Array<any> = [];
  showFormCreate = false;
  isPasswordChange = false;
  emailAlert = false;
  public permissionCount = false;
  public hideMenu = false;
  public img: any;
  public ulFile: any;
  public activeTab = 'Classes';
  permissionLists: any;
  // formFields: Staff = new Staff();
  formFields: any = {};
  @BlockUI() blockUI: NgBlockUI;
  @ViewChild('cropper', undefined)
  cropper: ImageCropperComponent;
  resetCroppers: Function;
  cropperSettings1: CropperSettings;
  input: any;
  uploadCrop: any;
  blankCrop = false;
  validProfile = false;
  isupdate = false;
  imgDemoSlider = false;
  isSticky = false;
  public navIsFixed = false;
  public isCreateFix = false;
  // public atLeastOneMail: boolean = false;
  permissionId: any;
  editId: any;
  public locationID = localStorage.getItem('locationId');
  public wordLength: any = 0;
  public aboutTest = 'Owns Guitar & PianoOwns Guitar & PianoOwnsijii';
  public aboutTest1 = ' How your call you or like your preferred name kuiui';
  public showStaffDetail = false;
  public staffDetail: any = {};
  isSearch = false;
  searchword: any;
  usertype: any;
  result: any;
  public customFields: any = [];
  courseList: any = [];
  userId: string;
  visited = false;
  staffObj: any = {};
  public gtxtColor: any;
  public gbgColor: any;

  constructor(
    private _service: appService,
    private cancelClassModalService: NgbModal,
    public toastr: ToastrService,
    vcr: ViewContainerRef,
    private router: Router,
    private config: NgbDatepickerConfig
  ) {
    // customize default values of datepickers used by this component tree
    config.minDate = { year: 1950, month: 1, day: 1 };
  }

  ngOnInit() {
    // this.blankCrop = false;
    // setTimeout(() => {
    //   console.log('~~~', this.locationName);
    //   this.locationName = localStorage.getItem('locationName');
    //   this.gtxtColor = localStorage.getItem('txtColor');
    //   this.gbgColor = localStorage.getItem('backgroundColor');
    // }, 300);
    // this.permissionSubscription = this._service.permissionList.subscribe(
    //   data => {
    //     if (this.router.url === '/staff') {
    //       this.permissionType = data;
    //       this.staffLists = [];
    //       this.checkPermission();
    //     }
    //   }
    // );
  }

  ngOnDestroy() {
    // this.permissionSubscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.staffDetail = {
      user: {
        about: '',
        journalApprove: ''
      }
    };
  }

  checkPermission() {
    console.log(this.permissionType);
    this.staffPermission = [
      'CREATESTAFFS',
      'EDITSTAFFS',
      'VIEWSTAFFS',
      'DELETESTAFFS'
    ];
    this.staffPermission = this.staffPermission.filter(
      value => -1 !== this.permissionType.indexOf(value)
    );

    this.staffDemo['addStaff'] = this.staffPermission.includes('CREATESTAFFS')
      ? 'CREATESTAFFS'
      : '';
    this.staffDemo['editStaff'] = this.staffPermission.includes('EDITSTAFFS')
      ? 'EDITSTAFFS'
      : '';
    this.staffDemo['viewStaff'] = this.staffPermission.includes('VIEWSTAFFS')
      ? 'VIEWSTAFFS'
      : '';
    this.staffDemo['deleteStaff'] = this.staffPermission.includes(
      'DELETESTAFFS'
    )
      ? 'DELETESTAFFS'
      : '';

    if (this.staffPermission.includes('VIEWSTAFFS') != false) {
      this.locationName = localStorage.getItem('locationName');
      this.gtxtColor = localStorage.getItem('txtColor');
      this.gbgColor = localStorage.getItem('backgroundColor');
      this.getAllUsers('staff', 20, 0);
      this.getAllpermission();
    } else {
      console.log('permission deny');
      this.staffLists = [];
    }
  }

  getSingleInfo(ID) {
    console.log(ID);
    console.log(this.isCrop);
    this.isCrop = false;
    this.staffLists = [];
    this.getSingleUser(ID);
  }

  getSingleUser(ID) {
    console.log(this.formFields.details);
    this._service.editProfile(this.regionID, ID).subscribe(
      (res: any) => {
        console.log('SingleUser', res);
        this.formFields = res;
        this.formFields.permission = res.location[0].permissionId;
        this.isupdate = true;
        this.returnProfile = res.profilePic;
        // console.log('~~~', this.returnProfile)
        this.showStaffDetail = false;
        this.goCreateForm('edit');
      },
      err => {
        console.log(err);
      }
    );
  }

  changePassword(state) {
    this.isPasswordChange = !state;
  }

  showMore(type: any, skip: any) {
    console.log(skip);
    // this.getAllUsers(type, 20, skip);
    if (this.isSearch == true) {
      console.log('User Search');
      this.userSearch(this.searchword, this.usertype, 20, skip);
    } else {
      console.log('Not user search');
      this.getAllUsers(type, 20, skip);
    }
  }

  userSearch2(searchWord, userType, limit, skip) {
    this.searchword = searchWord;
    console.log('I am in 2');
    if (searchWord.length == 0) {
      this.userSearch(searchWord, userType, limit, skip);
    }
  }

  userSearch(searchWord, userType, limit, skip) {
    this.searchword = searchWord;
    this.usertype = userType;
    console.log('hi hello');
    if (skip == '' && limit == '') {
      console.log('First time search');
      var isFirst = true;
      limit = 20;
      skip = 0;
    }

    if (searchWord.length != 0) {
      console.log(limit, skip);
      this.isSearch = true;
      this._service
        .getSearchUser(this.regionID, searchWord, userType, limit, skip, '')
        .subscribe(
          (res: any) => {
            console.log(res);
            // this.staffLists = res;
            this.result = res;
            if (isFirst == true) {
              console.log('First time searching');
              this.staffLists = [];
              this.staffLists = res;
            } else {
              console.log('Not First time searching');
              this.staffLists = this.staffLists.concat(res);
            }
          },
          err => {
            console.log(err);
          }
        );
    } else {
      setTimeout(() => {
        this.staffLists = [];
        this.getAllUsers('staff', 20, 0);
        this.isSearch = false;
        this.searchword = '';
      }, 300);
    }
  }

  getAllUsers(type, limit, skip) {
    //this.blockUI.start('Loading...');
    this._service.getAllUsers(this.regionID, type, limit, skip).subscribe(
      (res: any) => {
        //this.blockUI.stop();
        this.result = res;
        this.staffLists = this.staffLists.concat(res);
        // this.staffLists = res;
        console.log('this.staffLists', this.staffLists);
      },
      err => {
        //this.blockUI.stop();
        console.log(err);
      }
    );
  }

  goCreateForm(type) {
    this.staffLists = [];
    this.showFormCreate = true;
    this.permissionCount = false;
    this.hideMenu = true;
    this.isCrop = false;
    console.log('create');
    setTimeout(function() {
      $('.frame-upload').css('display', 'none');
    }, 10);
    if (type == 'create' || !this.formFields.details) {
      console.log('CREATE');
      this.getCustomFields('create');
    } else {
      this.getCustomFields('update');
    }
  }
  date: any;
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
        // var fieldName = this.customFields[i].name.toLowerCase();
        // console.log("^^Test^^",fieldName);
        this.customFields[i]['value'] = null;
        console.log('test--', this.customFields);
        if (type == 'create') {
          console.log('No detail fields in Res');
          this.customFields[i]['value'] = null;
          console.log('name----', this.customFields);
        } else {
          console.log('EDIT RES', this.customFields[i]._id);
          var findId = this.customFields[i]._id;
          var test = this.formFields.details.filter(
            item => item.permittedUserInfoId == findId
          );
          console.log('Test', test);
          if (test.length > 0) {
            console.log('value', test[0].value);
            var dateTime = test[0].value;
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
          console.log(
            this.formFields.details,
            this.customFields,
            this.formFields.permission
          );
        }
      }
    });
  }

  focusMethod(e, status, word) {
    // this.wordLength = word.length;
    // $('.limit-wordcount').show('slow');
    console.log('hi', e);
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
    // $('.limit-wordcount').hide('slow');
    // this.wordLength = 0;
    console.log('blur', e);
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

  validateEmail(data) {
    console.log(data);
    this.emailAlert = !this.isValidateEmail(data) ? true : false;
  }

  isValidateEmail($email) {
    var emailReg = /^([A-Za-z0-9\.\+\_\-])+\@([A-Za-z0-9\.])+\.([A-Za-z]{2,4})$/; //for test@amdon.com format
    var emailReg1 = /^([A-Za-z0-9\.\+\_\-])+\@([A-Za-z0-9]{1,})$/; //for test@amdon format
    if ($email != '') {
      if (emailReg1.test($email)) return true;
      else return emailReg.test($email);
    } else {
      return true;
    }
  }

  createUser(obj, state) {
    console.log(obj);
    console.log(this.customFields);

    this.formFields.details = [];
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
    for (var i = 0; i < this.customFields.length; i++) {
      console.log('field value', this.customFields[i].value);
      if (this.customFields[i].value) {
        var fieldObj: any = {};
        fieldObj = {
          permittedUserInfoId: this.customFields[i]._id,
          value: this.customFields[i].value
        };
        console.log('fieldObj', fieldObj);
        this.formFields.details.push(fieldObj);
      }
    }
    console.log('formFields details', this.formFields.details);

    const objData = new FormData();
    const locationObj = [
      { locationId: this.locationID, permissionId: obj.permission }
    ];

    objData.append('orgId', this.orgID),
      objData.append('regionId', this.regionID),
      objData.append('fullName', obj.fullName);
    objData.append('preferredName', obj.preferredName),
      objData.append('email', obj.email),
      // objData.append('password', obj.password),
      (obj.about = obj.about == undefined ? '' : obj.about);
    objData.append('about', obj.about);

    console.log(this.formFields.details);
    // objData
    if (this.formFields.details.length > 0) {
      console.log('Has Details', this.formFields.details);
      objData.append('details', JSON.stringify(obj.details));
    } else {
      obj.details = [];
      objData.append('details', JSON.stringify(obj.details));
    }

    if (state == 'create' || this.isPasswordChange == true) {
      objData.append('password', obj.password);
    }
    objData.append('location', JSON.stringify(locationObj));
    if (state == 'create') {
      const getImg = document.getElementById('blobUrl');
      this.img =
        getImg != undefined
          ? document.getElementById('blobUrl').getAttribute('src')
          : obj.profilePic;
      if (this.img != undefined) {
        this.ulFile = this.dataURItoBlob(this.img);
        objData.append('profilePic', this.ulFile);
      }
      console.log('create');
      //this.blockUI.start('Loading...');
      this._service.createUser(objData, this.locationID).subscribe(
        (res: any) => {
          console.log(res);
          this.toastr.success('Successfully Created.');
          //this.blockUI.stop();
          this.back();
        },
        err => {
          //this.blockUI.stop();
          // if(err.message == 'Http failure response for http://dev-app.brainlitz.com/api/v1/signup: 400 Bad Request'){
          // 	this.toastr.error('Email already exist');
          // }
          // else {
          // 	this.toastr.error('Create Fail');
          // }
          // console.log(err)
          console.log(err.status);
          if (err.status == 400) {
            this.toastr.error('Email already exist');
          } else {
            this.toastr.error('Create Fail');
          }
        }
      );
    } else {
      //this.blockUI.start('Loading...');
      const getImg = document.getElementsByClassName('circular-profile');
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
      console.log('update');
      console.log('locationobj permission>>>>>>', locationObj);
      console.log(objData);
      this._service
        .updateUser(this.regionID, this.locationID, this.editId, objData)
        .subscribe(
          (res: any) => {
            console.log(res);
            this.toastr.success('Successfully Updated.');
            //this.blockUI.stop();
            this.backToDetails();
          },
          err => {
            // this.toastr.error('Update Fail');
            //this.blockUI.stop();
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

  back() {
    this.isPasswordChange = false;
    this.hideMenu = false;
    this.formFields = new Staff();
    this.isupdate = false;
    console.log('back');
    this.showFormCreate = false;
    this.blankCrop = false;
    this.imgDemoSlider = false;
    this.isSearch = false;
    $('.frame-upload').css('display', 'none');
    this.staffLists = [];
    if (this.staffPermission.includes('VIEWSTAFFS') != false) {
      this.getAllUsers('staff', 20, 0);
    }
  }

  backToDetails() {
    this.isPasswordChange = false;
    this.hideMenu = false;
    this.formFields = new Staff();
    this.showFormCreate = false;
    this.blankCrop = false;
    this.imgDemoSlider = false;
    $('.frame-upload').css('display', 'none');
    this.staffLists = [];
    this.showDetails(this.staffDetail.user, this.staffDetail.user.userId);
  }

  getAllpermission() {
    console.log('hi permission');
    this._service.getAllPermission(this.regionID).subscribe((res: any) => {
      this.permissionLists = res;
      console.log('this.permissionLists', this.permissionLists);
    });
  }

  checkUser(id, e) {
    console.log(e.target.checked);
    this.permissionCount = e.target.checked;
    console.log(this.permissionCount);
    // $('label').on('click', function() {
    //   if (
    //     $(this)
    //       .find('input[type="radio"]')
    //       .is(':checked')
    //   ) {
    //     $('label').removeClass('radio-bg-active');
    //     $(this).addClass('radio-bg-active');
    //   }
    // });
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

  uploadCropImg($event: any) {
    this.blankCrop = true;
    $('.frame-upload').css('display', 'block');
    this.imgDemoSlider = true;
    $('#upload-demo img:first').remove();
    this.input = $event.target.files[0];
    if (this.input.size <= 477732 && this.input) {
      if (this.input && this.uploadCrop) {
        this.uploadCrop.destroy();
      }
      var reader = new FileReader();
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
    const self = this;
    this.imgDemoSlider = false;
    setTimeout(function() {
      $('.circular-profile img:last-child').attr('id', 'blobUrl');
      $('.frame-upload').css('display', 'none');
      this.blankCrop = false;
    }, 700);
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
    let byteString = atob(dataURI.split(',')[1]);
    let mimeString = dataURI
      .split(',')[0]
      .split(':')[1]
      .split(';')[0];
    let ab = new ArrayBuffer(byteString.length);
    let ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }

  backToUpload() {
    this.validProfile = false;
    this.imgDemoSlider = false;
    this.hideMenu = true;
    $('.frame-upload').css('display', 'none');
  }

  showDetails(data, ID) {
    this.showloading = false;
    this.userArchive = data.isArchive;
    this.userId = data.userId;
    this.isPasswordChange = false;
    this.activeTab = 'Classes';
    this.staffLists = [];
    this.editId = ID;
    this.staffObj = data;
    console.log('show Staff details', this.staffObj);
    console.log(ID);
    // //this.blockUI.start('Loading...');
    this.showStaffDetail = true;
    this._service
      .getUserDetail(this.regionID, data.userId, this.locationID, 'user')
      .subscribe(
        (res: any) => {
          this.staffDetail = res;
          res.user.details.map(info => {
            if (info.controlType === 'Datepicker') {
              info.value = moment(info.value).format('YYYY-MM-DD');

              const birthday = moment(info.value);
              info.year = moment().diff(birthday, 'years');
              // var month = moment().diff(birthday, 'months') - info.year * 12;
              // birthday.add(info.year, 'years').add(month, 'months'); for years months and days calculation
              birthday.add(info.year, 'years'); // for years and days calculation
              info.day = moment().diff(birthday, 'days');
            }
          });

          console.log('StaffDetail', res);
          console.log('Staff App test', this.staffDetail.user.journalApprove);
          // setTimeout(() => {
          //   //this.blockUI.stop();
          // }, 100);
          this.showloading = true;
        },
        err => {
          // //this.blockUI.stop();
          console.log(err);
        }
      );
  }

  backToStaff() {
    this.staffDetail = {
      user: {}
    };
    this.hideMenu = false;
    // this.formFieldc = new customer();
    this.showStaffDetail = false;
    this.isupdate = false;
    this.showFormCreate = false;
    this.blankCrop = false;
    this.imgDemoSlider = false;
    this.isSearch = false;
    // this.selectedId =[];

    $('.frame-upload').css('display', 'none');
    this.staffLists = [];
    console.log(this.staffLists);
    this.getAllUsers('staff', 20, 0);
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

  radioCheck(item, fields, idx1, idx2) {
    let id = idx1 + idx2;
    console.log('id', id);

    fields.map(field => {
      field.isCheck = false;
    });
    item.isCheck = !item.isCheck;
  }

  clickTab(type) {
    this.showloading = false;
    this.activeTab = type;
    // setTimeout(() => {
    //   this.showloading = true;
    // }, 4000);
  }

  numberOnly(event, type) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    if (event.target.value.search(/^0/) != -1) {
      event.target.value = '';
    }
  }
  showloading = true;
  showLoadingFun(e) {
    // console.warn(e)
    this.showloading = e;
  }

  setRandomPwd() {
    // console.log(this.userid, this.custDetail.user.userId);
    const data = {
      customerId: this.staffDetail.user.userId
    };
    this._service.setRandomPassword(this.regionID, data).subscribe(
      res => {
        console.log(res);
        this.toastr.success('New password has been sent successfully.');
      },
      err => {
        console.error(err);
        this.toastr.error('Fail to set new password.');
      }
    );
  }
  userArchive = false;

  staffArchive(archive) {
    this.userArchive = archive;
    let customerId = this.staffDetail.user.userId;
    let isArchive = archive;
    isArchive = this.userArchive;
    let regionId = this.regionID;
    const tempData = {
      customerId,
      isArchive,
      regionId
    };
    this._service.userArchive(tempData).subscribe(
      res => {
        console.error(res);
      },
      err => {
        console.error(err);
      }
    );
  }
  JourApprov() {
    this.staffDetail.user.journalApprove = !this.staffDetail.user
      .journalApprove;
    let app = this.staffDetail.user.journalApprove;
    let customerId = this.staffDetail.user.userId;
    let regionId = this.regionID;
    const tempData = {
      staffId: customerId,
      journalApprove: app,
      regionId: regionId
    };
    this._service.journalApprove(tempData).subscribe(res => {
      console.log('jourtest', res);
    });
    console.log('Staff Jour App Test', this.staffDetail.user);
  }
}
