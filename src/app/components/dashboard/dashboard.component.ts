import { Component, OnInit } from '@angular/core';
import { appService } from '../../service/app.service';
import { TimezonePickerService, Timezone } from 'ng2-timezone-selector/timezone-picker.service';
import { TimezonePickerModule } from 'ng2-timezone-selector';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public regionId = localStorage.getItem('regionId');
  public admin: any;
  public item:any = {
    name: '',
    timezone: '',
    orgUrl: ''
  };

  constructor(private _service: appService) { }



  ngOnInit() {
  	console.log('hello');
    this.getAdministrator();
  }

  getAdministrator(){
	  this._service.getRegionalAdministrator(this.regionId)
    .subscribe((res:any) => {
      this.admin = res;
      this.item.name = res.name
    }, err => {
      console.log(err)
    })
  }

  updateRegionalInfo(data){
    console.log(data)
    this._service.updateRegionalInfo(this.regionId, data)
    .subscribe((res:any) => {
      this.admin = res;
      this.item.name = res.name
    }, err => {
      console.log(err)
    })
  }
}
