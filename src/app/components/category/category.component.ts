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
	// public item:any = {name: ''};
  public item:any = {};
	public regionID = '5af915541de9052c869687a3';
  private modalReference: NgbModalRef;
  closeResult: string;
  public categoryList: any;
  public isEdit:boolean = false;

  constructor(private modalService: NgbModal, private _service: appService) { }

  ngOnInit() {
    this.getAllCategories();
  }

  openLg(content) {
    this.modalService.open(content, { size: 'lg'});
  }

  createCategory(item) {
  	console.log(item)
      this._service.createCategory(item, this.regionID)
      .subscribe((res:any) => {
        console.log(res);
        this.modalReference.close();
        this.getAllCategories();
      },err => {
        console.log(err);
      })
      this.item = {};
  	// console.log(Formobj)
  	// if(Formobj.submitted == true){
  	// 	this._service.createCategory(item, this.regionID)
  	// 	.subscribe((res:any) => {
			// 	console.log(res);
   //      this.modalReference.close();
   //      this.getAllCategories();
			// },err => {
			// 	console.log(err);
			// })
  	// 	this.item = {};
  	// }
	}

  getAllCategories(){
    this._service.getCategory(this.regionID)
    .subscribe((res:any) => {
      console.log(res);
      this.categoryList = res;
    })
  }

  open(content) {
    this.modalReference = this.modalService.open(content, { backdrop:'static', windowClass:'animation-wrap' });
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.item = {};
      this.isEdit = false;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.item = {};
      this.isEdit = false;
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

  deleteCategory(id,regionid){
    console.log("Delete Category Works",id,regionid);
    this._service.deleteCategory(id,regionid)
    .subscribe((res:any) => {
      console.log(res);
      this.getAllCategories();
    })
  }

  editCategory(id,regionid,content){
    this.isEdit = true; 
    console.log("Edit Category")
    this._service.getSingleCategory(id,regionid)
    .subscribe((res:any) => {
      console.log(res);
      this.item = res;
      this.open(content);
    })
  }

  updateCategory(data){
    console.log("Update Category",data);
    this._service.updateCategory(data._id,data)
    .subscribe((res:any) => {
      console.log(res);
      this.modalReference.close();
      this.getAllCategories();
      this.isEdit = false;
    })
  }
}
