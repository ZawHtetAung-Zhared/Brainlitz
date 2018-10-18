import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import { appService } from '../../service/app.service';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private loginUrl = environment.apiurl + '/dialog/authorize/';
  private clientId:any;
  private clientSecret:any;
  private redirectUri: any;  
  private responseType = environment.response_type;
  public slicePathName: any;
  public randomKey: any;
  public host: any;
  public islogin: boolean = false;

  constructor(private _service: appService, @Inject(DOCUMENT) private document: any) {
     //  this._service.slicePath.subscribe((nextValue) => {
     //    this.slicePathName = nextValue;
     // })

     //  if(localStorage.getItem('slicePath')){
     //    var data = localStorage.getItem('slicePath');
     //    this.slicePathName = data;
     //  }
  }

  ngOnInit() {
    this.randomKey = localStorage.getItem('random');
    console.log(this.document.location.hostname)
    this.host = this.document.location.hostname;
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


    var start_pos = str.indexOf('//') + 2;
    var end_pos = str.indexOf('/#',start_pos);
    var storeLocal = str.substring(start_pos,end_pos)    
    console.log('~~~~~', storeLocal)
    var str_res;
    if(storeLocal.includes('/')){
      var str_temp = storeLocal.substr(storeLocal.lastIndexOf("/")+1);
      str_res = str_temp.substring(0,str_temp.indexOf('.'));
    }else{
      str_res = storeLocal.substring(0,storeLocal.indexOf('.'));
    }

    console.log('~~~~~', str_res)
    localStorage.setItem('slicePath', str_res);
    if(str_res == ''){
      console.log('no slicePath')
      str_res = 'stgbl-cw1'
      localStorage.setItem('redirectURL', 'http://localhost:4200/stgbl-cw1.test.com/#/');
      this.getOrgKey(str_res)

    }else{
      localStorage.setItem('redirectURL', redirectURL);
      console.log('slicePath exit')
      localStorage.removeItem('OrgId')
      console.log(str_res);
      str_res = (str_res == 'staging-brainlitz-web') ? 'stgbl-cw1' : str_res;
      this.getOrgKey(str_res)
    }
  }

  getOrgKey(orgCode){
    this._service.getOrgCredentials(orgCode, this.host)
    .subscribe((res:any) => {
      console.log(res)
      this.islogin = true;
      localStorage.setItem('OrgId', res.orgId);      
      localStorage.setItem('OrgLogo', res.logo);    
      localStorage.setItem('clientId', res.clientId);    
      localStorage.setItem('clientSecret', res.clientSecret); 
      localStorage.setItem('favicon',res.favicon);
      var id = "appFavicon";
      var basepath = localStorage.getItem("redirectURL");
      this.document.getElementById('appFavicon').setAttribute('href', res.favicon);
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
    this.redirectUri = localStorage.getItem('redirectURL');
    this.redirectUri = encodeURIComponent(this.redirectUri);
    console.log(this.redirectUri)
    console.log(this.loginUrl)
    window.location.href = this.loginUrl + '/?client_id=' + this.clientId + '&clientSecret=' + this.clientSecret + '&response_type=' + this.responseType + '&redirect_uri=' + this.redirectUri
    console.log(this.loginUrl + '/?client_id=' + this.clientId + '&clientSecret=' + this.clientSecret + '&response_type=' + this.responseType + '&redirect_uri=' + this.redirectUri)
  }
  
}
