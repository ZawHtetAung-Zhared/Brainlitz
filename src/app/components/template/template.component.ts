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

	public isUpdate: boolean = false;
	private modalReference: NgbModalRef;
	closeResult: string;
  public item:any = {};
	public apLists:any = [
      {'name': 'AP1', checked: false},
      {'name': 'AP2', checked: false},
      {'name': 'AP3', checked: false}
    ];

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  open(locationModal) {
  	this.item = {};
    this.apLists = [
      {'name': 'AP1', checked: false},
      {'name': 'AP2', checked: false},
      {'name': 'AP3', checked: false}
    ];
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
      .map(opt => opt.name)
  }

  createTemplate(data, update, id){    
    const apArr = this.selectedOptions();
    let obj={
      "name": data.name,
      "description": data.desc,
      "ap": apArr
    }
    console.log(obj)
    if(update == true){
      this.isUpdate = true;
      this.modalReference.close();
    }else{
      this.modalReference.close();
    }
  }

  deleteModal(deletemodal, id){
    this.modalReference = this.modalService.open(deletemodal, {backdrop:'static', windowClass:'animation-wrap'});
  }

}
