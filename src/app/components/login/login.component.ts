import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import { appService } from '../../service/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private loginUrl = environment.apiurl + '/dialog/authorize/';
  // private clientId = environment.client_id;
  private clientId:any;
  // private clientSecret = environment.clientSecret;
  private clientSecret:any;
  // private redirectUri = environment.redirect_uri;
  private redirectUri = localStorage.getItem('redirectURL');
  private responseType = environment.response_type;
  public slicePathName: any;
  public randomKey: any;
  constructor(private _service: appService) {
      this._service.slicePath.subscribe((nextValue) => {
        this.slicePathName = nextValue;
     })

      if(localStorage.getItem('slicePath')){
        var data = localStorage.getItem('slicePath');
        this.slicePathName = data;
      }
  }

  ngOnInit() {
    this.randomKey = localStorage.getItem('random');
    if(this.randomKey != undefined){
      console.log('key exit')
    }else{
      console.log('no key')
      this.generateRandom();
    }
    console.log(this.slicePathName)
    let str = document.location.href;
    var end_index = str.lastIndexOf('/');
    var redirectURL = str.substr(0,end_index) + '/'
    console.log(redirectURL)
    localStorage.setItem('redirectURL', redirectURL);
    if(this.slicePathName == undefined){
      console.log('no slicePath')
      localStorage.setItem('OrgId', '5b063e2636f2e0f83cdbac88'); 
    }else{
      console.log('slicePath exit')
      localStorage.removeItem('OrgId')
      this.getOrgKey(this.slicePathName)
    }
  }

  getOrgKey(orgCode){
    this._service.getOrgCredentials(orgCode)
    .subscribe((res:any) => {
      console.log(res)
      localStorage.setItem('OrgId', res.orgId);      
      localStorage.setItem('OrgLogo', res.logo);    
      localStorage.setItem('clientId', res.clientId);    
      localStorage.setItem('clientSecret', res.clientSecret);    
      console.log(res.logo)
      this.clientId = res.clientId
      this.clientSecret = res.clientSecret
      this.loginUrl = this.loginUrl + res.orgId;
    }, err => {
      console.log(err)
    })
  }

  generateRandom(){
    console.log('random')
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    let bb =  (S4()+S4()+S4()+S4()+S4()+S4());
    console.log(bb);
    localStorage.setItem('random', bb)
  }

  public login() {
    console.log('login start', this.redirectUri);
    console.log(this.clientId);
  	console.log(this.clientSecret);
    this.redirectUri = encodeURIComponent(this.redirectUri);
    console.log(this.redirectUri)
    console.log(this.loginUrl)
    window.location.href = this.loginUrl + '/?client_id=' + this.clientId + '&clientSecret=' + this.clientSecret + '&response_type=' + this.responseType + '&redirect_uri=' + this.redirectUri
    console.log(this.loginUrl + '/?client_id=' + this.clientId + '&clientSecret=' + this.clientSecret + '&response_type=' + this.responseType + '&redirect_uri=' + this.redirectUri)
  }
  
}
