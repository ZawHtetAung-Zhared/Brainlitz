import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { appService } from '../../service/app.service';
import { TimezonePickerService, Timezone } from 'ng2-timezone-selector/timezone-picker.service';
import { TimezonePickerModule } from 'ng2-timezone-selector';
import { ToastsManager } from 'ng5-toastr/ng5-toastr';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
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
  // public sampleModules = [ 
  // { "_id": "5b3ca2e944bccf35c86706b0", "public": true, "visible": false, "name": "Progress", "type": 1, "updatedDate": "2018-07-04T10:35:21.222Z", "__v": 0 },
  // { "_id": "5b3defd0851bb5c3e3f4b8c9", "public": true, "visible": false, "name": "Badge", "type": 2, "updatedDate": "2018-07-05T10:15:44.613Z", "__v": 0 } ]
  public moduleList:any;

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

  visible:any;
  selectModule(item,event){
    console.log("selectModule",item);
    if(item.visible == true){
      this.visible = true;
      console.log("this.visible",this.visible)
    }else{
      this.visible = false;
      console.log("this.visible",this.visible)
    }
    this._service.visibleModule(item._id,item)
    .subscribe((res:any) => {
      console.log(res);
      // this.toastr.success(res.message);
      console.log("Visible",item.visible)
      // if(item.visible == true){
      //   this.toastr.success("Visible in App");
      // }else{
      //   this.toastr.success("Invisible in App");
      // }
    })
  }

  clickTab(type){
    this.menuType = type;
  }
}
