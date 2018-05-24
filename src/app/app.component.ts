import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { OAuthService } from 'angular2-oauth2/oauth-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  route: string;
  public isLogin: boolean = false;

  constructor(private oauthService: OAuthService,location: Location, router: Router) {
    router.events.subscribe((val) => {
      if(location.path() != ''){
        this.route = location.path();
        if(this.route == '/login'){
        	this.isLogin = true;
        }else{
        	this.isLogin = false
        }
      } else {
        this.route = 'Home'
      }
    });

    this.oauthService.loginUrl = "https://dev-brainlitz.pagewerkz.com/login/5b063e2636f2e0f83cdbac88"; //Id-Provider?
    this.oauthService.redirectUri = 'http://localhost:4200/#/';
    this.oauthService.clientId = "postman";
    this.oauthService.scope = "openid profile email voucher";
    this.oauthService.oidc = true;
    this.oauthService.setStorage(sessionStorage);
    this.oauthService.tryLogin({});
    
  }


}
