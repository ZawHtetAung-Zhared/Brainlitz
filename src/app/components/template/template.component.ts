import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, FormGroup, FormControl } from '@angular/forms';
import { appService } from '../../service/app.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  public regionID = localStorage.getItem('regionId')
	public isUpdate: boolean = false;
	private modalReference: NgbModalRef;
	closeResult: string;
  public item:any = {};
  public moduleLists:any;
  public apLists:any;
	public tempLists:any;

  constructor(private modalService: NgbModal, private _service: appService) { }

  ngOnInit() {
    this.getAllTemplate();
    this.getAllModule();
    this.getAllAp();
  }

  getAllAp(){
    this._service.appoint(this.regionID)
    .subscribe((res:any) => {
       console.log(res)
       this.apLists = res;
       for(let i = 0; i < this.apLists.length; i++){
         this.apLists[i]["checked"] = false
       }
       console.log(this.apLists)
    }, err => {
       console.log(err)
    })
  }

  getAllModule(){
    this._service.mmodule(this.regionID)
    .subscribe((res:any) => {
       console.log(res)
       this.moduleLists = res;
    }, err => {
       console.log(err)
    })
  }

  open(locationModal) {
  	this.item = {};
    this.modalReference = this.modalService.open(locationModal, {backdrop:'static', windowClass:'animation-wrap'});
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

  selectedOptions() { // right now: ['1','3']
    return this.apLists
      .filter(opt => opt.checked)
      .map(opt => opt._id)
  }

  createTemplate(data, update, id){
    console.log(data)    
    let obj={
      "name": data.name,
      "description": data.desc,
      "moduleId": data.moduleId,
      "accessPoints": this.selectedOptions()
    }
    console.log(obj)
    if(update == true){
      this.isUpdate = true;
      this.modalReference.close();
    }else{
      this._service.createTemplate(this.regionID, obj)
      .subscribe((res:any) => {
         console.log(res)
         this.moduleLists = res;
      }, err => {
         console.log(err)
      })
      this.modalReference.close();
    }
  }

  getAllTemplate(){
    this._service.getAllTemplate(this.regionID)
    .subscribe((res:any) => {
       console.log(res)
       this.tempLists = res;
    }, err => {
       console.log(err)
    })
  }

  deleteModal(deletemodal, id){
    this.modalReference = this.modalService.open(deletemodal, {backdrop:'static', windowClass:'animation-wrap'});
  }

}
