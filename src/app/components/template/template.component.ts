import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, FormGroup, FormControl } from '@angular/forms';
import { appService } from '../../service/app.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastsManager } from 'ng5-toastr/ng5-toastr';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  public regionID = localStorage.getItem('regionId')
  public isUpdate: boolean = false;
  public isempty: boolean = false;
	public ispublic: boolean = false;
	private modalReference: NgbModalRef;
	closeResult: string;
  public item:any = {};
  public moduleLists:any;
  public apLists:any;
	public tempLists:any;
  public currentId: any;
  public templateName: any;
  public singleTemplate: any;
  public singleTemplateName: any;
  public singleTemplateDesc: any;
  public checkedAP: any = [];
  @BlockUI() blockUI: NgBlockUI;

  constructor(private modalService: NgbModal, private _service: appService, public toastr: ToastsManager, vcr: ViewContainerRef) { 
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.getAllTemplate();
    this.getAllModule();
    this.getAllAp();
  }

  getAllAp(){
    this._service.getAllAP(this.regionID)
    .subscribe((res:any) => {
      console.log(res)
      this.apLists = res;
      for(let i = 0; i < this.apLists.length; i++){
        this.apLists[i]["checked"] = (this.apLists[i].checked == undefined) ? false : true; 
      }
       console.log(this.apLists)
    }, err => {
       console.log(err)
    })
  }

  getAllModule(){
    this._service.getAllModule(this.regionID)
    .subscribe((res:any) => {
       console.log(res)
       this.moduleLists = res;
    }, err => {
       console.log(err)
    })
  }

  open(content) {
    console.log('open create modal')
    this.getAllAp();
    console.log(this.apLists)
  	this.item = {};
    this.modalReference = this.modalService.open(content, {backdrop:'static', windowClass:'animation-wrap'});
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;	    
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;	    
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  checkedOptions(option, e){
    var val = option._id;
    if(this.checkedAP.includes(val) == false){
      this.checkedAP.push(val)
    }else{
      val = [val]
      this.checkedAP =this.checkedAP.filter(f => !val.includes(f));
    }
    console.log(this.checkedAP)
    console.log(this.checkedAP.length)
  }

  // selectedOptions() { // right now: ['1','3']
  //   return this.apLists
  //     .filter(opt => opt.checked)
  //     .map(opt => opt._id)
  // }

  createTemplate(data, update, id){
    console.log(data)    
    let obj={
      "name": data.name,
      "description": data.description,
      "moduleId": data.moduleId,
      "accessPoints": this.checkedAP
    }
    console.log(obj)
    if(update == true){
      this.modalReference.close();
      obj["_id"] = id;
      console.log(obj)
      this.callUpdate(obj, 'updated')
    }else{
      this.modalReference.close();
      this.blockUI.start('Loading...');
      this._service.createTemplate(this.regionID, obj)
      .subscribe((res:any) => {
         console.log(res)
         this.toastr.success('Successfully Created.');
         this.blockUI.stop();
         this.getAllTemplate();
      }, err => {
          this.toastr.error('Create Fail.');
          this.blockUI.stop();
          console.log(err)
      })
    }
  }

  getAllTemplate(){
    this.blockUI.start('Loading...');
    this._service.getAllTemplate(this.regionID)
    .subscribe((res:any) => {
       console.log(res.length)
       console.log(res)
       this.blockUI.stop();
       this.tempLists = res;
       this.isempty = (res.length === 0) ? true : false;       
    }, err => {
        this.blockUI.stop();
        console.log(err)
    })
  }

  deleteModal(deletemodal, id, tempName){
    console.log(id, tempName)
    this.templateName = tempName;
    this.currentId = id;
    this.modalReference = this.modalService.open(deletemodal, {backdrop:'static', windowClass:'animation-wrap'});
  }

  deleteTemplate(tempid){
    this.blockUI.start('Loading...');
    this.modalReference.close();
    this._service.deleteTemplate(this.regionID, this.currentId)
    .subscribe((res:any) => {
        this.blockUI.stop();
        this.toastr.success('Successfully Deleted.');
        console.log(res)
        this.getAllTemplate();
    }, err => {
        this.blockUI.stop();
        this.toastr.error('Delete Fail.');
        console.log(err)
    })
  }

  getsingleTemplate(id){
    this.blockUI.start('Loading...');
    // this.getAllAp();
    for(let i = 0; i < this.apLists.length; i++){
      this.apLists[i].checked = false ; 
    }
    console.log(this.apLists)
    this._service.getSingleTemplate(this.regionID, id)
    .subscribe((res:any) => {
        this.item = res;
        console.log(this.singleTemplate)
        const accessPoints = res.accessPoints;
        this.checkedAP = res.accessPoints;
        console.log(accessPoints)
        console.log(this.apLists)
        for(let i = 0; i < accessPoints.length; i++){
          var hello = this.apLists.filter(function(ap){
            return ap._id == accessPoints[i]
          })
          // this.isAvailable = true;
          hello[0].checked = true;
          console.log(hello)
        }

        this.blockUI.stop();
    }, err => {
        console.log(err)
    })
  }

  shareModal(sharemodal, id){
    console.log(id)
    this.modalReference = this.modalService.open(sharemodal, {backdrop:'static', windowClass:'animation-wrap'});
    // this.getsingleTemplate(id);
    this.blockUI.start('Loading...');   
    this._service.getSingleTemplate(this.regionID, id)
    .subscribe((res:any) => {
        // this.item = res;
        console.log(res);
        this.item = res;
        this.ispublic = res.public;
        console.log(this.ispublic)
        this.singleTemplate = res;
        this.singleTemplateName = res.name;
        this.singleTemplateDesc = res.description;
        this.blockUI.stop();
    }, err => {
        console.log(err)
        this.blockUI.stop();
    })
  }

  shareTemplate(data, state){
    console.log(data)
    data.public = state;
    this.singleTemplate['public'] = data.public
    console.log(this.singleTemplate)   
    this.modalReference.close(); 
    if(state == true){
      this.callUpdate(this.singleTemplate, 'shared');
    }else{
      this.callUpdate(this.singleTemplate, 'unshared');
    }
  }

  callUpdate(obj, status){
    this.blockUI.start('Loading...');
    this._service.updateSingleTemplate(this.regionID, obj)
    .subscribe((res:any) => {
        console.log(res)
        this.getAllTemplate();
        this.toastr.success('Successfully '+ status + '.');
        this.blockUI.stop();
    }, err => {
        this.toastr.success(status + ' Fail.');
        this.blockUI.stop();
        console.log(err)
    })
  }

  editTemplate(id, content){
    console.log('edit template')
    this.isUpdate = true;
    this.currentId = id;
    // console.log(this.apLists)
    this.modalReference = this.modalService.open(content, {backdrop:'static', windowClass:'animation-wrap'});
    this.getsingleTemplate(id); 
  }
}
