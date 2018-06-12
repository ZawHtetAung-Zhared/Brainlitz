import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { appService } from '../../service/app.service';
import { Observable } from 'rxjs/Rx';
declare var $:any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public regionID = localStorage.getItem('regionId');
  public locationLists: any;
  
  constructor(private _router: Router, private _service: appService) { }
  
  ngOnInit() {
  }

  logoff(){
  	console.log('log out');
  	localStorage.clear();
	  this._router.navigateByUrl('/login');
	}

  getAllLocation(){
    console.log(this.regionID)
    this._service.getLocations(this.regionID)
    .subscribe((res:any) => {
      this.locationLists = res;      
    }, err => {
      console.log(err)
    })
  }

}
