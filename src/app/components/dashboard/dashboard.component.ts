import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { appService } from '../../service/app.service';
import { TimezonePickerService, Timezone } from 'ng2-timezone-selector/timezone-picker.service';
import { TimezonePickerModule } from 'ng2-timezone-selector';
import { ToastsManager } from 'ng5-toastr/ng5-toastr';

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

  constructor(private _service: appService, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
  	console.log('hello');
    this.getAdministrator();
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
    }, err => {
      console.log(err)
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
    }, err => {
      console.log(err)
    })
  }
}
