import { Component, OnInit, ViewChild, HostListener} from '@angular/core';
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
  public headerlocationLists: any;
  public accessToken: any;
  
  constructor(private _router: Router, private _service: appService) {
    this._service.sendData.subscribe((data) => {
        this.headerlocationLists = data; 
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
    this._service.getHeaderLocations(this.regionID, '', '', true)
    .subscribe((res:any) => {
      this.headerlocationLists = res; 
      console.log('header headerlocationLists',this.headerlocationLists)
      let locationId  = localStorage.getItem('locationId');
      if(locationId){
        for(var i = 0; i < this.headerlocationLists.length; i++){
          if(this.headerlocationLists[i]._id == locationId){
            this.headerlocationLists[i].selected = true;
            localStorage.setItem('locationId', this.headerlocationLists[i]._id);
          }
        }
      } 
      let regionId  = localStorage.getItem('regionId');
      if(!localStorage.getItem('locationId')){
        localStorage.setItem('locationId', this.headerlocationLists[0]._id);
      } 
      
    }, err => {
      console.log(err)
    })
  }

  selectLocation(e){
    let LocationId = e.target.value;
    localStorage.setItem('locationId', LocationId);
    this._service.setLocationId(LocationId);
  }

  dropMenuShow: boolean = false;

  @HostListener('document:click', ['$event'])
    public documentClick(event): void {
        if(this.dropMenuShow == false){
           $('.dropdown-box').css('display', 'none');
           // $('.bg-box').css('display', 'none');  
        }
        else {
            $('.dropdown-box').css('display', 'block');
            // $('.bg-box').css('display', 'block');
            this.dropMenuShow = false;

        }
    }
    
  dropDown(){
        var x = document.getElementsByClassName('dropdown-box');
        if( (x[0]as HTMLElement).style.display == 'block'){
          (x[0]as HTMLElement).style.display = 'none';
        }
        else {
           (x[0]as HTMLElement).style.display = 'block';
           this.dropMenuShow = true;
        }
  }

  
}


