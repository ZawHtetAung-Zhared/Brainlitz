import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
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
  public showHeader: any;
  
  constructor(private _router: Router, private _service: appService) {
    _router.events.forEach((event) => {
    console.log(event)
      if(event instanceof NavigationStart) {
        this.showHeader = (event.url == "/login" || event.url == "/" ) ? this.showHeader = false : this.showHeader = true; 
      }
    });
   }
  
  ngOnInit() {
    this.getAllLocation();
  }

  logoff(){
  	console.log('log out');
  	localStorage.clear();
	  this._router.navigateByUrl('/login');
	}

  getAllLocation(){
    this._service.getLocations(this.regionID)
    .subscribe((res:any) => {
      this.locationLists = res; 
      let locationId  = localStorage.getItem('locationId');
      if(locationId){
        for(var i = 0; i < this.locationLists.length; i++){
          if(this.locationLists[i]._id == locationId){
            this.locationLists[i].selected = true;
          }
        }
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

