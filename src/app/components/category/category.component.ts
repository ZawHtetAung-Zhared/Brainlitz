import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, FormGroup, FormControl } from '@angular/forms';
import { appService } from '../../service/app.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
	@ViewChild('categoryForm') form: any;
	public item:any = {name: ''};
	public regionID = '5af915541de9052c869687a3';
  private modalReference: NgbModalRef;
  closeResult: string;

  constructor(private modalService: NgbModal, private _service: appService) { }

  ngOnInit() {
  }

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  createCategory(Formobj, item) {
  	console.log(item)
  	console.log(Formobj)
  	if(Formobj.submitted == true){
  		this._service.createCategory(item, this.regionID)
  		.subscribe((res:any) => {
				console.log(res);
        this.modalReference.close();
			},err => {
				console.log(err);
			})
  		this.item = {};
  	}
	}


  open(content) {
    this.modalReference = this.modalService.open(content);
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

}
