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
  public categoryList: Array<any> = [];
  public isEditComplete:boolean = false;
  public editValue:any;
  public isCategory:boolean = false;
  public isempty:boolean = false;
  public isfocus:boolean = false;
  public iseditfocus:boolean = false;
  public otherfocus:boolean = false;
  public ischecked:any;
  public navIsFixed: boolean = false;
  public goBackCat: boolean = false;
  public wordLength : number = 0;

  constructor( 
    private _service: appService, 
    public toastr: ToastsManager, 
    vcr: ViewContainerRef, 
    private el: ElementRef,
    private renderer: Renderer) { 
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.getAllCategories(20, 0);
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

  backtoCourses(){
    console.log('hi')
    this.isCategory = false;
    var data = localStorage.removeItem("categoryID");
    this._service.back();
  }

  createCategory(item) {
    this.categoryList = [];
    this.isfocus = !this.isfocus;
  	console.log(item);
      this.blockUI.start('Loading...');
      // this.modalReference.close();
      this._service.createCategory(item, this.regionID)
      .subscribe((res:any) => {
        console.log(res);
        this.toastr.success('Successfully Created.');
        this.blockUI.stop();
        this.getAllCategories(20, 0);
      },err => {
        this.toastr.error('Create Fail');
        this.blockUI.stop();
        console.log(err);
      })
      this.item = {};
	}

  edit(){
    this.isEditComplete = true;
    this.isfocus = false;
    this.iseditfocus = false;
  }
  editComplete(){
    this.isEditComplete = !this.isEditComplete;
  }

  somethingChanged(val, name){
    console.log('hi', val)
    this.ischecked = val;
    localStorage.setItem('categoryID', val);
    localStorage.setItem('categoryName', name);
    setTimeout(() => {
      console.log("--waiting--")
      this._service.gotoplan();
      this.goBackCat = true;
    }, 300);
  }

  focusFunction(status, val, word){
    console.log(word)
    if(status == 'create'){
      this.isfocus = true;
      this.wordLength = word.length;
      $('.limit-word').show('slow');
    }else{
      this.wordLength = word.length;
      $('.limit-'+val).show('slow');
      this.iseditfocus = true;
      this.otherfocus = true;
      this.editValue = val;
      this._service.getSingleCategory(val, this.regionID)
      .subscribe((res:any) => {
        console.log(res);
        this.item = res;
      })
    }
  }

  blurMethod(e, status){
    console.log('blur', e);
    let wp = this.wordLength;
    $('.limit-word').hide('slow');
    this.wordLength = 0;
  }

  changeMethod(val : string){
    console.log(val)
    this.wordLength = val.length;
  }

  close(status, id){
    if(status == 'create'){
      this.isfocus = !this.isfocus;
      
    }else{
      console.log('edit', id)
      this.iseditfocus = !this.iseditfocus;
      this.editValue = ''
      this.getAllCategories(20, 0);
    }
    this.item = {}
  }

  showMore(skip: any){
    console.log('hi')
    this.getAllCategories(20, skip)
  }

  getAllCategories(limit, skip){
    this.blockUI.start('Loading...');
    this._service.getCategory(this.regionID, limit, skip)
    .subscribe((res:any) => {
      setTimeout(() => {
        this.blockUI.stop(); // Stop blocking
      }, 300);
      console.log(res);
      this.categoryList = this.categoryList.concat(res);
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
      this.getAllCategories(20, 0);
      this.iseditfocus = false;
      // this.isEditComplete = false;
      this.item = {}
      this.editValue = ''
    })
  }
}
