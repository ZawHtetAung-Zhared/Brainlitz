import { Component, OnInit, HostListener } from '@angular/core';
import { appService } from '../../service/app.service';
import { environment } from '../../../environments/environment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Router } from '@angular/router';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit {
	private orgID = localStorage.getItem('OrgId');
	public regionLists: any;
  public accessToken: any;
	public tokenType: any;
  public navIsFixed:boolean = false;
  @BlockUI() blockUI: NgBlockUI;

  constructor(private _service: appService, private router: Router) { }

  ngOnInit() {
    // localStorage.removeItem('locationId');
    localStorage.removeItem('previousLID');
    localStorage.removeItem('permission');
    // localStorage.removeItem('regionId');
    this.accessToken = localStorage.getItem('token');
    if(this.accessToken != undefined){
      console.log('!undefined')
      this.getAllRegion();
    }else{
      console.log('==undefined')
      this.getAccessToken();
    } 	
  }

  @HostListener('window:scroll', ['$event']) onScroll($event){   
    this.navIsFixed = (window.pageYOffset > 90) ? true : false;
  }

  getAccessToken(){
    console.log(this.orgID)
    this._service.getToken()
    .subscribe((res:any) => {
      console.log('ready to call next request')
      if(this.accessToken != undefined){
        console.log('access token genereated ~~~~', )
        this.blockUI.stop();
        this.getAllRegion();
      }else{
        console.log("dont't have token")
        this.getAllRegion();
      }
    }, err => {
      console.log(err)
    })
  }

  getAllRegion(){
    console.log('start request')
    this.blockUI.start('Loading...');
    this.accessToken = localStorage.getItem('token');
    this.tokenType = localStorage.getItem('tokenType'); 
    this._service.getAllRegion(this.tokenType, this.accessToken)
  	.subscribe((res:any) => {
      console.log(res)
      if(res.length != 1){
  		  this.regionLists = res;
      }else{
        localStorage.setItem("regionId", res[0]._id);
        this.router.navigate(['/dashboard']);
      }
      setTimeout(() => {
        this.blockUI.stop(); // Stop blocking
      }, 300);
    }, err => {
      console.log(err)
    })
  }

  setRegionID(id){
    console.log(id)
    if(localStorage.getItem("regionId") == id){
      console.log('same region id')
    }else{
      console.log('not same')
      localStorage.removeItem('locationId');
    }
    localStorage.setItem("regionId", id);
  }

}
