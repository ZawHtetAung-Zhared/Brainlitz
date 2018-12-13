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
    localStorage.removeItem('previousLID');
    localStorage.removeItem('permission');
    this.accessToken = localStorage.getItem('token');
    console.log(this.accessToken)
    if(this.accessToken != undefined){
      console.log('!undefined')
      this.getAllRegion();
      this.getUserInfo();
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
      console.log('ready to call next request', res)
      if(this.accessToken != undefined || localStorage.getItem('token')){
        console.log('access token genereated ~~~~', )
        this.blockUI.stop();
        this.getAllRegion();
        this.getUserInfo();
      }else{
        console.log("dont't have token")
        this.getAllRegion();
      }
    }, err => {
      console.log(err)
    })
  }

  getUserInfo(){
    console.log('~~~~')
    this._service.userInfo(this.tokenType, this.accessToken)
    .subscribe((res:any) => {
      console.log(res)
      localStorage.setItem('userName', res.email)
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
        console.log("more than 1")
  		  this.regionLists = res;
      }else{
        console.log("only 1")
        localStorage.setItem("regionId", res[0]._id);
        this.router.navigate(['/customer']);
        console.log(res[0].invoiceSetings);
        this.setCurrencySign(res[0])
      }
      setTimeout(() => {
        this.blockUI.stop(); // Stop blocking
      }, 300);
    }, err => {
      console.log(err)
    })
  }

  setRegionID(data){
    let id = data._id;
    console.log(id)
    if(localStorage.getItem("regionId") == id){
      console.log('same region id')
    }else{
      console.log('not same')
      localStorage.removeItem('locationId');
    }
    localStorage.setItem("regionId", id);
    this.setCurrencySign(data);
  }

  setCurrencySign(data){
    console.log(data);
    if(data.invoiceSettings){
      if(data.invoiceSettings.currencyCode == ""){
        data.invoiceSettings.currencyCode = "$"
      }
      if(data.invoiceSettings.currencySign == ""){
        data.invoiceSettings.currencySign = "$"
      }
      let currency = {
        'invCurrencyCode': data.invoiceSettings.currencyCode,
        'invCurrencySign': data.invoiceSettings.currencySign
      };
      console.log(currency);
      localStorage.setItem('currency',JSON.stringify(currency))
    }
  }

}
