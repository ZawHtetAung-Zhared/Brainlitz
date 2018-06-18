import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, FormGroup, FormControl } from '@angular/forms';
import { appService } from '../../service/app.service';
import { Observable } from 'rxjs/Rx';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastsManager } from 'ng5-toastr/ng5-toastr';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
	@ViewChild('categoryForm') form: any;
  @BlockUI() blockUI: NgBlockUI;
   @BlockUI('contact-list') blockUIList: NgBlockUI;
	// public item:any = {name: ''};
  public item:any = {};
	public regionID = localStorage.getItem('regionId');
  private modalReference: NgbModalRef;
  closeResult: string;
  public categoryList: any;
  public isEdit:boolean = false;

  constructor(private modalService: NgbModal, private _service: appService, public toastr: ToastsManager, vcr: ViewContainerRef) { 
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.getAllCategories();
  }

  createCategory(item) {
  	console.log(item);
      this.blockUI.start('Loading...');
      this.modalReference.close();
      this._service.createCategory(item, this.regionID)
      .subscribe((res:any) => {
        console.log(res);
        this.toastr.success('Successfully Created.');
        this.blockUI.stop();
        this.getAllCategories();
      },err => {
        this.toastr.error('Create Fail');
        this.blockUI.stop();
        console.log(err);
      })
      this.item = {};
	}

  getAllCategories(){
    this.blockUI.start('Loading...');
    this._service.getCategory(this.regionID)
    .subscribe((res:any) => {
      setTimeout(() => {
        this.blockUI.stop(); // Stop blocking
      }, 300);
      console.log(res);
      this.categoryList = res;
    })
  }

  open(content,edit) {
    if(edit == false){
      this.item = {};
    }
    console.log(edit)
    this.modalReference = this.modalService.open(content, { backdrop:'static', windowClass:'animation-wrap' });
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(result)
      this.item = {};
      this.isEdit = false;
    }, (reason) => {
      console.log(reason)
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

  editCategory(id,content){
    this.isEdit = true; 
    console.log("Edit Category", id)
    this.modalReference = this.modalService.open(content, { backdrop:'static', windowClass:'animation-wrap' });
    this._service.getSingleCategory(id, this.regionID)
    .subscribe((res:any) => {
      console.log(res);
      this.item = res;
    })
  }

  updateCategory(data){
    console.log("Update Category",data);
    this._service.updateCategory(data._id,data)
    .subscribe((res:any) => {
      console.log(res);
      this.toastr.success('Successfully Updated.');
      this.modalReference.close();
      this.getAllCategories();
      this.isEdit = false;
    })
  }
}
