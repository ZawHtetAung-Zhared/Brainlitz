import { Component, OnInit, AfterViewInit,  ViewChild, ViewContainerRef, ElementRef, Renderer, HostListener,  Directive } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, FormGroup, FormControl } from '@angular/forms';
import { appService } from '../../service/app.service';
import { Observable } from 'rxjs/Rx';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastsManager } from 'ng5-toastr/ng5-toastr';
declare var $: any;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
	@ViewChild('categoryForm') form: any;
  @BlockUI() blockUI: NgBlockUI;
  @BlockUI('contact-list') blockUIList: NgBlockUI;
	
  public item:any = {};
	public regionID = localStorage.getItem('regionId');
  public categoryList: any;
  public isEditComplete:boolean = false;
  public editValue:any;
  public isempty:boolean = false;
  public isfocus:boolean = false;
  public iseditfocus:boolean = false;
  public ischecked:any;
  public navIsFixed: boolean = false;

  constructor( 
    private _service: appService, 
    public toastr: ToastsManager, 
    vcr: ViewContainerRef, 
    private el: ElementRef,
    private renderer: Renderer) { 
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.getAllCategories();
    window.addEventListener('scroll', this.scroll, true);
  }

  ngOnDestroy() {
      window.removeEventListener('scroll', this.scroll, true);
  }

  scroll = (e): void => {
    // console.log(e)
    // console.log(e.target)
    // console.log(e.pageYOffset)
  };

  @HostListener('window:scroll', ['$event']) onScroll($event){
    // console.log($event);
    // console.log("scrolling");
    // console.log(window.pageYOffset)
    if(window.pageYOffset > 90){
      console.log('greater than 100')
      this.navIsFixed = true;
    }else{
      console.log('less than 100')
      this.navIsFixed = false;
    }
  } 

  createCategory(item) {
    this.isfocus = !this.isfocus;
  	console.log(item);
      this.blockUI.start('Loading...');
      // this.modalReference.close();
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

  edit(){
    this.isEditComplete = true;
  }
  editComplete(){
    this.isEditComplete = !this.isEditComplete;
  }

  somethingChanged(val){
    console.log('hi', val)
    this.ischecked = val;
  }

  focusFunction(status, val){
    if(status == 'create'){
      this.isfocus = true;
    }else{
      this.iseditfocus = true;
      this.editValue = val;
      this._service.getSingleCategory(val, this.regionID)
      .subscribe((res:any) => {
        console.log(res);
        this.item = res;
      })
    }
  }

  close(status){
    if(status == 'create'){
      this.isfocus = !this.isfocus;
    }else{
      this.iseditfocus = !this.iseditfocus;
      this.editValue = ''
    }
    this.item = {}
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
      this.isempty = (res.length === 0) ? true : false;       
    })
  }

  updateCategory(data, name){
    console.log("Update Category",data, name);
    let obj = {
      'name': name,
      'regionId': data.regionId,
      '_id': data._id
    }
    console.log(obj)
    this._service.updateCategory(obj._id,obj)
    .subscribe((res:any) => {
      console.log(res);
      this.toastr.success('Successfully Updated.');
      this.getAllCategories();
      this.iseditfocus = false;
      this.isEditComplete = false;
      this.item = {}
      this.editValue = ''
    })
  }
}
