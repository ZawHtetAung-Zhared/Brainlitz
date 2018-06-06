import { Component, OnInit } from '@angular/core';
import { appService } from '../../service/app.service';
import { environment } from '../../../environments/environment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit {
	private orgID = environment.orgID;
	public regionLists: any;
  public accessToken: any;
	public tokenType: any;
  @BlockUI() blockUI: NgBlockUI;

  constructor(private _service: appService) { }

  ngOnInit() {
    this.accessToken = localStorage.getItem('token');
    if(this.accessToken != undefined){
      console.log('!undefined')
      this.getAllRegion();
    }else{
      console.log('==undefined')
      this.getAccessToken();
    } 	
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
      console.log('show the region lists')
  		this.regionLists = res;
      this.blockUI.stop();
  		console.log(this.regionLists);
    }, err => {
    	console.log(err)
    })
  }

  setRegionID(id){
  	console.log(id)
    localStorage.setItem("regionId", id);
  }
}
