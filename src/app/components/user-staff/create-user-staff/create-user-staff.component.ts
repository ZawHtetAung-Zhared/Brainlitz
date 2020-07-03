import { Component, OnInit, HostListener } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { appService } from '../../../service/app.service';
import { ISubscription } from 'rxjs/Subscription';
import { ToastrService } from 'ngx-toastr';
import { Croppie } from 'croppie';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-user-staff',
  templateUrl: './create-user-staff.component.html',
  styleUrls: ['./create-user-staff.component.css']
})
export class CreateUserStaffComponent implements OnInit {
  public type: any;
  public isupdate: boolean = false;
  public userId: any;
  formFields: any = {};
  public permissionCount = false;
  public orgID = localStorage.getItem('OrgId');
  public regionID = localStorage.getItem('regionId');
  public locationID = localStorage.getItem('locationId');
  permissionLists: any;
  public permissionType: any;
  private permissionSubscription: ISubscription;
  public staffPermission: any = [];
  public staffDemo: any = [];

  public customFields: any = [];
  public date: any;
  public isCreateFix = false;
  public wordLength: any = 0;
  emailAlert = false;
  isPasswordChange = false;

  //profile upload
  public isCrop = false;
  uploadCrop: any;
  blankCrop = false;
  validProfile = false;
  imgDemoSlider = false;
  public img: any;
  public ulFile: any;
  input: any;
  public returnProfile = false;
  public isStaff_delete = false;
  public autoEnrollModal;

  constructor(
    private _service: appService,
    private router: Router,
    private _Activatedroute: ActivatedRoute,
    private modalService: NgbModal,
    public toastr: ToastrService
  ) {}

  staffDeleteModal(modal) {
    this.isStaff_delete = true;
    this.autoEnrollModal = this.modalService.open(modal, {
      backdrop: 'static',
      windowClass:
        'deleteModal customer-delete-modal d-flex justify-content-center align-items-center'
    });
  }

  cancelAutoEnroll() {
    console.error('object');
    this.autoEnrollModal.close();
    this.isStaff_delete = false;
  }

  ngOnInit() {
    this.permissionSubscription = this._service.permissionList.subscribe(
      data => {
        this.permissionType = data;
        this.checkPermission();
      }
    );

    this.type = this._Activatedroute.snapshot.paramMap.get('type');
    this.isupdate = this.type === 'edit';
    this.userId = this._Activatedroute.snapshot.paramMap.get('staffid');
    if (!this.isupdate) this.goCreateForm();
    else this.getSingleUser();
    console.log(this.type, this.userId);
  }

  ngOnDestroy() {
    this.permissionSubscription.unsubscribe();
  }

  @HostListener('window:scroll', ['$event']) onScroll($event) {
    if (window.pageYOffset > 40) {
      this.isCreateFix = true;
    } else {
      this.isCreateFix = false;
    }
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
      this.getAllpermission();
    } else {
      console.log('permission deny');
    }
  }

  getAllpermission() {
    console.log('hi permission');
    this._service.getAllPermission(this.regionID).subscribe((res: any) => {
      this.permissionLists = res;
      console.log('this.permissionLists', this.permissionLists);
    });
  }

  goCreateForm() {
    console.log('create');
    setTimeout(function() {
      $('.frame-upload').css('display', 'none');
    }, 10);
    if (this.type == 'create' || !this.formFields.details) {
      console.log('CREATE');
      this.type = 'create';
      this.getCustomFields();
    } else {
      this.getCustomFields();
    }
  }

  checkUser(id, e) {
    console.log(e.target.checked);
    this.permissionCount = e.target.checked;
    console.log(this.permissionCount);
  }

  backToUpload() {
    this.validProfile = false;
    this.imgDemoSlider = false;
    $('.frame-upload').css('display', 'none');
  }

  getCustomFields() {
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
        if (this.type == 'create') {
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

  back() {
    this.router.navigate(['/staff']);
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

  numberOnly(event, type) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    if (event.target.value.search(/^0/) != -1) {
      event.target.value = '';
    }
  }

  changePassword(state) {
    this.isPasswordChange = !state;
  }

  setRandomPwd() {
    // console.log(this.userid, this.custDetail.user.userId);
    const data = {
      customerId: this.userId
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
        .updateUser(this.regionID, this.locationID, this.userId, objData)
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

  backToDetails() {
    this.router.navigate(['/staff/staffdetail', this.userId]);
  }

  getSingleUser() {
    console.log(this.formFields.details);
    this._service.editProfile(this.regionID, this.userId).subscribe(
      (res: any) => {
        console.log('SingleUser', res);
        this.formFields = res;
        this.formFields.permission = res.location[0].permissionId;
        this.isupdate = true;
        this.returnProfile = res.profilePic;
        // console.log('~~~', this.returnProfile)
        this.goCreateForm();
      },
      err => {
        console.log(err);
      }
    );
  }
}
