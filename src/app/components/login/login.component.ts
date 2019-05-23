import { Component, OnInit, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
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
  private orgName:any;
  private clientId:any;
  private clientSecret:any;
  private redirectUri: any;  
  private responseType = environment.response_type;
  public slicePathName: any;
  public randomKey: any;
  public host: any;
  public islogin: boolean = true;
  public noOrginExit: boolean = false;
  public appName :any;
  public redirectOption= localStorage.getItem('redirect')

  constructor(private titleService: Title,private _service: appService, @Inject(DOCUMENT) private document: any) {
     //  this._service.slicePath.subscribe((nextValue) => {
     //    this.slicePathName = nextValue;
     // })

     //  if(localStorage.getItem('slicePath')){
     //    var data = localStorage.getItem('slicePath');
     //    this.slicePathName = data;
     //  }
  }

  ngOnInit() {
    if (this.redirectOption) {
      this.islogin = false;
      setTimeout(() => {
        this.getSubdomain();
      }, 30000);
    }else{
      this.getSubdomain();
    }
    // this.islogin = false;
    this.randomKey = localStorage.getItem('random');
    this.host = this.document.location.hostname;
    console.log(this.randomKey)
    if(this.randomKey != undefined){
      console.log('key exit')
    }else{
      console.log('key does not exit')
      this.generateRandom();
    }
    // setTimeout(() => {
    //   this.getSubdomain();
    //   if(!this.islogin){
    //     this.islogin = true;
    // }
    // }, 30000);
  }

  getSubdomain() {
    let str = document.location.href;
    var end_index = str.lastIndexOf('/');
    var redirectURL = str.substr(0,end_index) + '/';

    console.log(redirectURL)
    var start_pos = str.indexOf('//') + 2;
    var end_pos = str.indexOf('/#',start_pos);
    var storeLocal = str.substring(start_pos,end_pos)    
    console.log('~~~~~', storeLocal)
    var str_res;
    if(storeLocal.includes('/')){
      var str_temp = storeLocal.substr(storeLocal.lastIndexOf("/")+1);
      str_res = str_temp.substring(0,str_temp.indexOf('.'));
      this.appName = str_res;
      this.setTitle(this.appName);
      console.log(this.appName)
    }else{
      str_res = storeLocal.substring(0,storeLocal.indexOf('.'));
      this.appName = str_res;
      this.setTitle(this.appName);
      console.log(this.appName)
    }

    console.log('~~~~~', str_res)
    this.orgName = str_res
    // localStorage.setItem('slicePath', str_res);
    // this.appName = str_res;
    // this.setTitle(this.appName);
    localStorage.setItem('appname',str_res);
    if(str_res == ''){
      console.log('no subdomain')
      str_res = 'stgbl-cw1'
      localStorage.setItem('redirectURL', 'http://localhost:4200/stgbl-cw1.test.com/#/');
      this.getOrgKey(str_res)
    }else{
      localStorage.setItem('redirectURL', redirectURL);
      console.log('subdomain exit')
      // localStorage.removeItem('OrgId')
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
      this.noOrginExit = false;
    }, err => {
      console.log(err)
      console.log(err.error.message)
      this.noOrginExit = true;
    })
  }

  generateRandom(){    
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    let randomCode =  (S4()+S4()+S4()+S4()+S4()+S4());    
    localStorage.setItem('random', randomCode)
  }

  public login() {
    localStorage.removeItem('redirect')
    this.redirectUri = localStorage.getItem('redirectURL');
    this.redirectUri = encodeURIComponent(this.redirectUri);
    window.location.href = this.loginUrl + '/?client_id=' + this.clientId + '&clientSecret=' + this.clientSecret + '&response_type=' + this.responseType + '&redirect_uri=' + this.redirectUri
  }

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }
  
}
