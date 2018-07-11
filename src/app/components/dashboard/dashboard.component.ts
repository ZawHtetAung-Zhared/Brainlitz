import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { appService } from '../../service/app.service';
import { TimezonePickerService, Timezone } from 'ng2-timezone-selector/timezone-picker.service';
import { TimezonePickerModule } from 'ng2-timezone-selector';
import { ToastsManager } from 'ng5-toastr/ng5-toastr';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { FormsModule, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public regionId = localStorage.getItem('regionId');
  public token: any;
  public type: any;
  public admin: any;
  public item:any = {
    name: '',
    timezone: '',
    url: ''
  };
  public menuType:any = "admin";
  public checkedModule =[];
  public moduleList:any;
  public visible:any;
  @BlockUI() blockUI: NgBlockUI;

  constructor(private _service: appService, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.getAdministrator();
    this.getModuleList();
  }

  getAdministrator(){
    this.token = localStorage.getItem('token');
    this.type = localStorage.getItem('tokenType');
	  this._service.getRegionalAdministrator(this.regionId, this.token, this.type)
    .subscribe((res:any) => {
      this.admin = res;
      this.item.name = res.name;
      this.item.timezone = res.timezone;
      this.item.url = res.url
      console.log('~~~', this.item)
      localStorage.setItem('timezone', this.item.timezone)
    }, err => {
      console.log(err)
    })
  }

  getModuleList(){
    this._service.getAllModule(this.regionId)
    .subscribe((res:any) => {
      console.log(res);
      this.moduleList = res;
    })
  }

  updateRegionalInfo(data){
    this.token = localStorage.getItem('token');
    this.type = localStorage.getItem('tokenType');
    console.log(data)
    this._service.updateRegionalInfo(this.regionId, data, this.token, this.type)
    .subscribe((res:any) => {
      this.toastr.success('Successfully Updated.');
      console.log('~~~', res)
      localStorage.setItem('timezone', this.item.timezone)
    }, err => {
      console.log(err)
    })
  }

  selectModule(item,event){
    console.log("selectModule",item);
    this._service.visibleModule(item._id,item)
    .subscribe((res:any) => {
      console.log(res);
      this.getModuleList();
      if(item.visible == false){
        console.log("VVVV");
        setTimeout(() => {
          this.toastr.success("Visible in App");
        }, 300); 
      }else if(item.visible == true){
        console.log("IIII");
        setTimeout(() => {
          this.toastr.success("Invisible in App");
        }, 300); 
      }
    })
  }

  clickTab(type){
    this.menuType = type;
  }
}
