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
  constructor(private _service: appService, public toastr: ToastsManager, vcr: ViewContainerRef) {
  	this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
  	this.getModuleList();
  }

  getModuleList(){
    this._service.getAllModule(this.regionId)
    .subscribe((res:any) => {
      console.log(res);
      this.moduleList = res;
    })
  }

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
      }else if(item.visible == true){
        console.log("IIII",item.visible);
        setTimeout(() => {
          this.toastr.success("Invisible in App");
        }, 300); 
      }
    })
  }
}
