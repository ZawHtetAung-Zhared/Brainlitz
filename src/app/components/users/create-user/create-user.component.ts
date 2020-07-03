import { Component, OnInit, HostListener } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { appService } from '../../../service/app.service';
import { Croppie } from 'croppie';
import { ToastrService } from 'ngx-toastr';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  public orgID = localStorage.getItem('OrgId');
  public regionID = localStorage.getItem('regionId');
  public locationID = localStorage.getItem('locationId');
  public isupdate: boolean;
  public customerEmail = false;
  public guardianEmail = false;
  public formFieldc: any = {};
  public customFields: any = [];
  public type: any;
  public isCreateFix: boolean = false;
  public wordLength: number = 0;
  emailAlert: boolean = false;
  guardianAlert: boolean = false;
  public personalMail: boolean = false;
  public atLeastOneMail: boolean = false;
  public atLeastGurMail: boolean = false;
  public isCrop: boolean = false;
  uploadCrop: any;
  blankCrop: boolean = false;
  input: any;
  validProfile: boolean = false;
  imgDemoSlider: boolean = false;
  public updateUserId: any;
  public img: any;
  public ulFile: any;
  public returnProfile: boolean = false;
  public isCustomer_delete = false;
  public autoEnrollModal;

  constructor(
    private router: Router,
    private _service: appService,
    private _Activatedroute: ActivatedRoute,
    private modalService: NgbModal,
    public toastr: ToastrService
  ) {}

  @HostListener('window:scroll', ['$event']) onScroll($event) {
    if (window.pageYOffset > 40) {
      this.isCreateFix = true;
    } else {
      this.isCreateFix = false;
    }
  }

  customerDeleteModal(modal) {
    this.isCustomer_delete = true;
    this.autoEnrollModal = this.modalService.open(modal, {
      backdrop: 'static',
      windowClass:
        'deleteModal customer-delete-modal d-flex justify-content-center align-items-center'
    });
  }

  cancelAutoEnroll() {
    console.error('object');
    this.autoEnrollModal.close();
    this.isCustomer_delete = false;
  }

  ngOnInit() {
    this.type = this._Activatedroute.snapshot.paramMap.get('type');
    this.isupdate = this.type === 'edit';
    this.updateUserId = this._Activatedroute.snapshot.paramMap.get('userid');
    if (!this.isupdate) this.goCreateForm();
    else this.getSingleUser(this.updateUserId);
  }

  backToCustomer() {
    this.router.navigate(['/customer']);
  }

  goCreateForm() {
    this.customerEmail = false;
    this.guardianEmail = false;
    console.log('TYPE', this.type);
    this.isCrop = false;

    console.log('create');
    setTimeout(function() {
      $('.frame-upload').css('display', 'none');
    }, 10);

    if (this.type == 'create' || !this.formFieldc.details) {
      console.log('CREATE');
      this.getCustomFields('create');
    } else {
      this.getCustomFields('update');
    }
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
      console.error(this.customFields, 'custom fields');
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
          console.error('Test', test);
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

  getSingleInfo(ID) {
    // this.customerEmail = false;
    // this.guardianEmail = false;
    console.log(ID);
    console.log(this.isCrop);
    this.isCrop = false;
    // this.formFieldc.details = [];
    this.getSingleUser(ID);
  }

  getSingleUser(ID) {
    console.log(this.formFieldc.details);
    this._service.editProfile(this.regionID, ID).subscribe(
      (res: any) => {
        console.log('SingleUser', res);
        this.formFieldc = res;
        this.returnProfile = res.profilePic;
        this.goCreateForm();
        if (res.email && res.email.length > 0) {
          this.customerEmail = true;
          this.personalMail = true;
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

  sameMail;
  validateEmail(data) {
    console.log(data);
    if (data != '') {
      if (data === this.formFieldc.guardianEmail) {
        this.sameMail = true;
      } else {
        this.sameMail = false;
      }
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
    // console.error(gData=='','gdata')
    if (gData != '') {
      if (gData === this.formFieldc.email) {
        this.sameMail = true;
      } else {
        this.sameMail = false;
      }
    }

    console.log(gData);
    // this.atLeastOneMail = false;
    this.guardianAlert = !this.isValidateEmail(gData) ? true : false;
    this.atLeastGurMail =
      this.guardianAlert != true && gData.length > 0 ? true : false;
    console.log('GurMail~~~ ', this.atLeastGurMail);
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

  whateverEventHandler(e) {
    console.log(e);
    this.validateEmail(e.target.value);
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

  numberOnly(event) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
  }

  closeDropdown(event, type, datePicker?) {
    if (event.target.className.includes('dropD')) {
    } else {
      if (type == 'start' || type == 'end') {
        if (event.target.offsetParent == null) {
          datePicker.close();
        } else if (event.target.offsetParent.nodeName != 'NGB-DATEPICKER') {
          datePicker.close();
        }
      }
    }
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

  backToUpload() {
    console.log('menu should be hidden');
    this.validProfile = false;
    this.imgDemoSlider = false;
    $('.frame-upload').css('display', 'none');
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
      let getImg = document.getElementById('blobUrl');
      console.log('getImg>>>>>', getImg);
    }, 700);
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

  setRandomPwd() {
    // console.log(this.userid, this.custDetail.user.userId);
    let data = {
      customerId: this.updateUserId
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

  createUser(obj, apiState) {
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
        this.formFieldc.details.push(fieldObj);
      }
    }
    console.log('formFieldc details', this.formFieldc.details);

    let objData = new FormData();
    let guardianArray;
    console.log('~~~ ', obj.guardianEmail);
    console.log(typeof obj.guardianEmail);
    obj.email = obj.email == undefined ? [] : obj.email;
    objData.append('regionId', this.regionID);
    objData.append('orgId', this.orgID);
    objData.append('fullName', obj.fullName);
    objData.append('preferredName', obj.preferredName);
    objData.append('email', obj.email);
    obj.about = obj.about == undefined ? '' : obj.about;
    objData.append('about', obj.about);

    // objData
    if (this.formFieldc.details.length > 0) {
      console.log('Has Details', this.formFieldc.details);
      objData.append('details', JSON.stringify(obj.details));
    } else {
      obj.details = [];
      objData.append('details', JSON.stringify(obj.details));
    }

    console.log('Latest', objData);

    if (apiState == 'create') {
      let getImg = document.getElementById('blobUrl');
      console.log('getImg>>>>>', getImg);
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
      console.log('this.ulFile>>', this.ulFile);
      this._service.createUser(objData, this.locationID).subscribe(
        (res: any) => {
          console.log(res);
          this.toastr.success('Successfully Created.');
          this.backToCustomer();
        },
        err => {
          console.log(err);
          for (var i = 0; i < this.customFields.length; i++) {
            if (
              this.customFields[i].controlType === 'Datepicker' &&
              this.customFields[i].value
            ) {
              var dateTime = this.customFields[i].value;
              if (dateTime != undefined || dateTime != null) {
                var ok = dateTime.substring(0, dateTime.search('T'));
                var testSplit = ok.split('-');
                var format = {
                  year: Number(testSplit[0]),
                  month: Number(testSplit[1]),
                  day: Number(testSplit[2])
                };
                this.customFields[i]['value'] = format;
              }
            }
          }
          console.log(this.customFields);
          if (err.status == 400) {
            this.toastr.error('Email already exist');
          } else {
            if (
              err.error != undefined &&
              (err.error.message != undefined ||
                err.error.message != null ||
                err.error.message != '')
            ) {
              if (err.error.message) {
                this.toastr.error(err.error.message);
              } else this.toastr.error('Network Error');
            } else {
              this.toastr.error('Create Fail');
            }
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

      //this.blockUI.start('Loading...');
      this._service
        .updateUser(this.regionID, this.locationID, obj.userId, objData)
        .subscribe(
          (res: any) => {
            console.log(res);
            this.backToDetails();
            this.toastr.success('Successfully updated.');
          },
          err => {
            console.log(err);
            this.getCustomFields('edit');
            if (err.status == 400) {
              this.toastr.error('Email already exist');
            } else {
              this.toastr.error('Create Fail');
            }
          }
        );
    }
  }
  backToDetails() {
    console.log('Back to Details');
    this.router.navigate(['/customer/customerdetail', this.updateUserId], {
      relativeTo: this._Activatedroute
    });
  }
}
