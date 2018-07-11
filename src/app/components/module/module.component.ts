import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { appService } from '../../service/app.service';
import { ToastsManager } from 'ng5-toastr/ng5-toastr';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { FormsModule, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css']
})
export class ModuleComponent implements OnInit {
  public regionId = localStorage.getItem('regionId');
  public moduleList:any;
  public noModule:boolean =false;
  @BlockUI() blockUI: NgBlockUI;

  constructor(private _service: appService, public toastr: ToastsManager, vcr: ViewContainerRef) {
  	this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
  	this.getModuleList();
  }

  getModuleList(){
  	this.blockUI.start('Loading...');
    this._service.getAllModule(this.regionId)
    .subscribe((res:any) => {
      console.log(res);
      this.moduleList = res;
      if(this.moduleList.length > 0){
        this.noModule = false;
      }else{
        this.noModule = true;
      }
      setTimeout(() => {
      	this.blockUI.stop();
      },300);
      // this.blockUI.stop();
    })
  }

  // moduleList

  selectModule(item,event){
    console.log("selectModule",item);
    this._service.visibleModule(item._id,item)
    .subscribe((res:any) => {
      console.log(item.id,item.name,item.visible,res);
      this.getModuleList();
      if(item.visible == false){
        console.log("VVVV",item.visible);
        setTimeout(() => {
          this.toastr.success("Visible in App");
        }, 300); 
      }else{
        console.log("IIII",item.visible);
        setTimeout(() => {
          this.toastr.success("Invisible in App");
        }, 300); 
      }
    })
  }
}
