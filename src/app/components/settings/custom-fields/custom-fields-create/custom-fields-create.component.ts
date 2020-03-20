import { ActivatedRoute, Router } from '@angular/router';
import {
  Component,
  OnInit,
  ViewContainerRef,
  HostListener
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng5-toastr';
import { ToastrService } from 'ngx-toastr';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { DragulaService, DragulaModule } from 'ng2-dragula';
import { Subscription } from 'rxjs';
import { appService } from '../../../../service/app.service';
declare var $: any;
@Component({
  selector: 'app-custom-fields-create',
  templateUrl: './custom-fields-create.component.html',
  styleUrls: ['./custom-fields-create.component.css']
})
export class CustomFieldsCreateComponent implements OnInit {
  public regionID = localStorage.getItem('regionId');
  public fieldLists: any = [];
  public showForm: boolean = false;
  public isUpdate: boolean = false;
  public testLists = ['String', 'Number', 'Date', 'Selection'];
  public isChecked: any;
  public model: any = {};
  public wordLength: any;
  public modalReference: any;
  public deleteObj: any = {};
  public isMultiple: boolean = false;
  public isMultipleSelection: boolean = false;
  subs = new Subscription();
  HANDLES = 'HANDLES';
  @BlockUI() blockUI: NgBlockUI;

  constructor(
    private modalService: NgbModal,
    private _service: appService,
    // public toastr: ToastsManager,
    private toastr: ToastrService,
    public vcr: ViewContainerRef,
    private dragulaService: DragulaService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    dragulaService.createGroup('HANDLES', {
      moves: (el, container, handle) => {
        return handle.className === 'handle';
      }
    });

    this.subs.add(
      dragulaService
        .dropModel(this.HANDLES)
        .subscribe(({ el, target, source, sourceModel, targetModel, item }) => {
          console.log('dropModel:');
          console.log(el);
          console.log(source);
          console.log(target);
          console.log(sourceModel);
          console.log(targetModel);
          console.log(item);
        })
    );
    this.subs.add(
      dragulaService
        .removeModel(this.HANDLES)
        .subscribe(({ el, source, item, sourceModel }) => {
          console.log('removeModel:');
          console.log(el);
          console.log(source);
          console.log(sourceModel);
          console.log(item);
        })
    );
  }

  ngOnInit() {
    if (this.router.url === '/settings/customfields/customfields-create') {
      this.isUpdate = false;
      this.isChecked = this.testLists[0];
    } else {
      console.log('id is ', this.route.snapshot.params.id);
      this.editField(this.route.snapshot.params.id);
      this.isUpdate = true;
      // this.singleLocation(this.route.snapshot.paramMap.get('id'));
    }
    //this.getAllCustomfields();
    this.defineType(this.isChecked);
  }

  goToCustomFields() {
    this.router.navigateByUrl('/settings/customfields');
  }

  focusMethod(e, status, word) {
    console.log('hi', e, status);
    if (status == 'name') {
      this.wordLength = word.length;
      $('.limit-wordcount').show('slow');
    } else if (status == 'sub') {
      this.wordLength = word.length;
      $('.limit-wordcount1').show('slow');
    } else {
      this.wordLength = word.length;
      // $('.limit-wordcount2').show('slow');
      $('.' + status).show('slow');
    }
  }

  blurMethod(e, status) {
    console.log('blur', status);
    if (status == 'name') {
      $('.limit-wordcount').hide('slow');
    } else if (status == 'sub') {
      $('.limit-wordcount1').hide('slow');
    } else {
      // $('.limit-wordcount2').hide('slow');
      $('.' + status).hide('slow');
    }
    this.wordLength = 0;
  }

  changeMethod(val: string) {
    this.wordLength = val.length;
  }

  chooseType(item) {
    if (item == 'Selection') {
      // if(this.isMultipleSelection){
      //   this.isChecked = 'Checkbox';
      //   this.defineType(this.isChecked);
      // }else{
      this.isChecked = item;
      this.defineType('Radio');
      // }
    } else {
      this.isChecked = item;
      this.defineType(this.isChecked);
    }
  }

  choiceMultiple() {
    console.log(this.isMultipleSelection);
    this.isChecked = 'Selection';
    if (this.isMultipleSelection) {
      this.defineType('Radio');
      this.isMultipleSelection = false;
    } else {
      this.defineType('Checkbox');
      this.isMultipleSelection = true;
    }
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
    //this.blockUI.start('Loading...');
    if (id == '') {
      console.log('CREATE');
      this._service.createCustomField(this.regionID, fieldObj).subscribe(
        (res: any) => {
          console.log(res);
          this.model = {};
          this.showForm = false;
          this.toastr.success('Successfully Created.');
          //this.blockUI.stop();
          //this.getAllCustomfields();
          this.router.navigateByUrl('/settings/customfields/customfields-list');
        },
        err => {
          console.log(err);
          this.toastr.success('Create Fail');
          //this.blockUI.stop();
        }
      );
    } else {
      console.log('UPDATE', id);
      this._service.updateCustomField(this.regionID, fieldObj, id).subscribe(
        (res: any) => {
          console.log(res);
          this.model = {};
          this.toastr.success('Successfully Updated.');
          //this.blockUI.stop();
          //this.getAllCustomfields();
          this.router.navigateByUrl('/settings/customfields/customfields-list');
          //this.showForm = false;
        },
        err => {
          console.log(err);
          this.toastr.success('Update Fail');
          //this.blockUI.stop();
        }
      );
    }
  }

  editField(id) {
    this.checkFieldArr = [];
    this._service.getSingleField(this.regionID, id).subscribe((data: any) => {
      console.log(data);
      this.showForm = true;
      this.isUpdate = true;
      this.model = data.userInfoPermitted;
      console.log(this.model.name, 'this.model');
      this.model.type = this.model.dataType;
      console.log('model type', this.model.type);
      console.log('length', this.model.inputValues.length);
      this.isChecked = this.model.controlType;
      // this.defineType(this.isChecked);
      console.log(this.model.controlType);
      if (this.model.inputValues.length != 0) {
        if (this.model.controlType == 'Radio') {
          this.isChecked = 'Selection';
          this.isMultipleSelection = false;
        } else {
          this.isChecked = 'Selection';
          this.isMultipleSelection = true;
        }

        for (let i = 0; i < this.model.inputValues.length; i++) {
          let obj = {
            name: this.model.inputValues[i]
          };
          this.checkFieldArr.push(obj);
        }
      } else {
        this.isChecked = this.model.dataType;
        this.defineType(this.isChecked);
      }
      console.log(this.model.inputValues);
      console.log('model type', this.isChecked);
    });
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

  addNewItem() {
    const obj = {
      name: ''
    };
    this.checkFieldArr.push(obj);
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

  getSingleField(field) {
    console.log(field._id, 'field id');
    this._service
      .getSingleField(this.regionID, field._id)
      .subscribe((res: any) => {
        console.log(res);
      });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
    this.dragulaService.destroy('HANDLES');
    // this.dragulaService.destroy('COLUMNS');
  }
}
