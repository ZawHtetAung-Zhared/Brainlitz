import {
  Component,
  OnInit,
  ViewContainerRef,
  HostListener
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng5-toastr/ng5-toastr';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { appService } from '../../service/app.service';
declare var $: any;

@Component({
  selector: 'app-customfield',
  templateUrl: './customfield.component.html',
  styleUrls: ['./customfield.component.css']
})
export class CustomfieldComponent implements OnInit {
  public regionID = localStorage.getItem('regionId');
  public fieldLists: any = [];
  public showForm: boolean = false;
  public isUpdate: boolean = false;
  public testLists = ['String', 'Number', 'Date', 'Radio', 'Checkbox'];
  public isChecked: any;
  public model: any = {};
  public wordLength: any;
  public modalReference: any;
  public deleteObj: any = {};
  @BlockUI() blockUI: NgBlockUI;

  constructor(
    private modalService: NgbModal,
    private _service: appService,
    public toastr: ToastsManager,
    public vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.getAllCustomfields();
    this.defineType(this.isChecked);
  }

  focusMethod(e, status, word) {
    console.log('hi', e);
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
    this.wordLength = val.length;
  }

  getAllCustomfields() {
    this.checkFieldArr = [];
    this.blockUI.start('Loading...');
    this._service.getAllFields(this.regionID).subscribe((res: any) => {
      console.log(res);
      this.fieldLists = res.userInfoPermitted;
      console.log(this.fieldLists);
      this.blockUI.stop();
    });
  }

  showCreateForm() {
    this.showForm = true;
    this.model = {};
    this.isChecked = this.testLists[0];
    this.defineType(this.isChecked);
    this.isUpdate = false;
  }

  cancel() {
    this.showForm = false;
    this.model = {};
    this.isUpdate = false;
    this.isChecked = false;
    this.getAllCustomfields();
  }

  chooseType(item) {
    console.log('Choose', item);
    this.isChecked = item;
    this.defineType(this.isChecked);
  }

  defineType(type) {
    console.log(type);
    this.checkFieldArr = [];
    // if(type == 'Text'){
    // 	this.model.datatype = 'String';
    // 	this.model.controltype = 'Textarea';
    // }else{

    // }
    switch (type) {
      case 'String':
        this.model.dataType = 'String';
        this.model.controlType = 'Textarea';
        break;

      case 'Text':
        this.model.dataType = 'String';
        this.model.controlType = 'Textarea';
        break;

      case 'Number':
        this.model.dataType = 'Number';
        this.model.controlType = 'Textarea';
        break;

      case 'Date':
        this.model.dataType = 'Date';
        this.model.controlType = 'Datepicker';
        break;

      case 'Radio':
        this.model.dataType = 'String';
        this.model.controlType = 'Radio';
        let obj1 = {
          name: ''
        };
        this.checkFieldArr.push(obj1);
        break;

      case 'Checkbox':
        this.model.dataType = 'String';
        this.model.controlType = 'Checkbox';
        let obj = {
          name: ''
        };
        this.checkFieldArr.push(obj);
        break;
    }
    console.log('type', this.model.dataType, this.model.controlType);
  }

  createField(data, id) {
    console.log('type', id);
    console.log(this.checkFieldArr);
    console.log(
      'datatype and controltype',
      this.model.dataType,
      this.model.controlType
    );
    let fieldObj;
    if (this.checkFieldArr.length == 0) {
      console.log('else');
      fieldObj = {
        userInfoPermitted: {
          name: this.model.name,
          description: this.model.description,
          dataType: this.model.dataType,
          controlType: this.model.controlType
        }
      };
    } else {
      console.log('else');
      let temp = [];
      for (let i = 0; i < this.checkFieldArr.length; i++) {
        temp.push(this.checkFieldArr[i].name);
      }
      console.log(temp);
      fieldObj = {
        userInfoPermitted: {
          name: this.model.name,
          description: this.model.description,
          dataType: this.model.dataType,
          controlType: this.model.controlType,
          inputValues: temp
        }
      };
    }

    console.log('Field Obj', fieldObj);
    this.blockUI.start('Loading...');
    if (id == '') {
      console.log('CREATE');
      this._service.createCustomField(this.regionID, fieldObj).subscribe(
        (res: any) => {
          console.log(res);
          this.model = {};
          this.showForm = false;
          this.toastr.success('Successfully Created.');
          this.blockUI.stop();
          this.getAllCustomfields();
        },
        err => {
          console.log(err);
          this.toastr.success('Create Fail');
          this.blockUI.stop();
        }
      );
    } else {
      console.log('UPDATE', id);
      this._service.updateCustomField(this.regionID, fieldObj, id).subscribe(
        (res: any) => {
          console.log(res);
          this.model = {};
          this.toastr.success('Successfully Updated.');
          this.blockUI.stop();
          this.getAllCustomfields();
          this.showForm = false;
        },
        err => {
          console.log(err);
          this.toastr.success('Update Fail');
          this.blockUI.stop();
        }
      );
    }
  }

  editField(field) {
    this.checkFieldArr = [];
    console.log('edit field', field);
    this.showForm = true;
    this.isUpdate = true;
    this.model = field;
    this.model.type = this.model.dataType;
    console.log('model type', this.model.type);

    this.isChecked = this.model.contr;
    // this.defineType(this.isChecked);
    console.log(field.controlType);
    if (field.inputValues.length != 0) {
      this.isChecked = field.controlType;
      for (let i = 0; i < field.inputValues.length; i++) {
        let obj = {
          name: field.inputValues[i]
        };
        this.checkFieldArr.push(obj);
      }
    } else {
      this.isChecked = field.dataType;
      this.defineType(this.isChecked);
    }
    console.log(field.inputValues);
    console.log('model type', this.isChecked);
    // if(this.model.type == 'String'){
    // 	console.log("String")
    // 	this.isChecked = 'Text';
    // }else{
    // 	console.log("Other")
    // 	this.isChecked = this.model.type;
    // }
  }

  deleteModal(data, alertDelete) {
    console.log(data);
    this.deleteObj['id'] = data._id;
    this.deleteObj['name'] = data.name;

    console.log('delete data', this.deleteObj);
    this.modalReference = this.modalService.open(alertDelete, {
      backdrop: 'static',
      windowClass:
        'deleteModal d-flex justify-content-center align-items-center'
    });
  }

  deleteField(id) {
    this.blockUI.start('Loading...');
    this._service.deleteCustomField(this.regionID, id).subscribe(
      (res: any) => {
        console.log(res);
        this.modalReference.close();
        this.toastr.success('Successfully Deleted.');
        this.getAllCustomfields();
      },
      err => {
        console.log(err);
      }
    );
  }

  checkFieldArr: any = [];
  addcheckboxField(e, idx) {
    console.log(e);

    const obj = {
      name: ''
    };
    if (e.keyCode == 13 || e.code == 'Enter') {
      console.log('here');
      this.checkFieldArr.push(obj);
    }
    console.log('addcheckboxField', this.checkFieldArr[0]);
    console.log(this.checkFieldArr);
  }

  removeFeeOption(id) {
    this.checkFieldArr.splice(id, 1);
  }
  isCustomeValid: boolean = false;
  validateForm() {
    if (this.checkFieldArr.length != 0) {
      for (let i = 0; i < this.checkFieldArr.length; i++) {
        if (
          (this.checkFieldArr[i].name == undefined ||
            this.checkFieldArr[i].name == '') &&
          (this.model.name != undefined || this.model.name != '')
        ) {
          this.isCustomeValid = false;
        } else {
          this.isCustomeValid = true;
        }
      }
    } else {
      this.isCustomeValid = true;
    }
  }
}
