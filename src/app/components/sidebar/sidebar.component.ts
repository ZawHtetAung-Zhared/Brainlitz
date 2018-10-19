import { Component, OnInit } from '@angular/core';
import { appService } from '../../service/app.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

	public customerMenu:Array<any> = [];
  public staffMenu:Array<any> = [];
  public courseMenu:Array<any> = [];
  public reportMenu:Array<any> = [];
  public toolsMenu:Array<any> = [];
  public currentLocation:any = '';
  public previousLocation:any = '';

  constructor(private _service: appService) {}

  ngOnInit() {
  	this._service.permissionList.subscribe((data) => {
  		this.currentLocation = localStorage.getItem('locationId'); 
  		this.previousLocation = localStorage.getItem('previousLID');	  	    
  	});
  }

  


}
