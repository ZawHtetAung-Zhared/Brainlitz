import { Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { appService } from '../../service/app.service';
import { Observable } from 'rxjs/Rx';
import { LocationComponent } from '../location/location.component';

declare var $:any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public regionID = localStorage.getItem('regionId');
  public locationLists: any;
  public accessToken: any;
  
  constructor(private _router: Router, private _service: appService) {
    this._service.sendData.subscribe((data) => {
        console.log('work', data)
        this.locationLists = data; 
    })
  }
  
  ngOnInit() {
    console.log('headerLocation work')
    this.accessToken = localStorage.getItem('token');
    if(this.accessToken != undefined){
        console.log('!undefined')
        this.getAllLocation();
      }
  }

  logoff(){
  	console.log('log out');
  	localStorage.clear();
	  this._router.navigateByUrl('/login');
	}

  getAllLocation(){
    console.log('afterclick region', this.regionID)
    this._service.getLocations(this.regionID)
    .subscribe((res:any) => {
      this.locationLists = res; 
      console.log('header locationlists',this.locationLists)
      let locationId  = localStorage.getItem('locationId');
      if(locationId){
        for(var i = 0; i < this.locationLists.length; i++){
          if(this.locationLists[i]._id == locationId){
            this.locationLists[i].selected = true;
          }
        }
      } 
      let regionId  = localStorage.getItem('regionId');
      if(regionId){
        localStorage.setItem('locationId', this.locationLists[0]._id);
      } 
    }, err => {
      console.log(err)
    })
  }

  selectLocation(e){
    let locationId = e.target.value;
    localStorage.setItem('locationId', locationId)
    console.log(e)
  }



}


