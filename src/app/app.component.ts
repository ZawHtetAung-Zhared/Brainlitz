import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { Location } from '@angular/common';
import { OAuthService } from 'angular2-oauth2/oauth-service';
import { Cookie } from 'ng2-cookies';
import { Http, Response, RequestOptions, Headers,URLSearchParams } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  route: string;
  public showSidebar: any;
  

  constructor(public router:Router, private http: Http, private oauthService: OAuthService, private _router: Router) {
          
	  this.oauthService.loginUrl = "https://dev-brainlitz.pagewerkz.com/dialog/authorize/5b063e2636f2e0f83cdbac88/"; //Id-Provider?
	  this.oauthService.redirectUri = "http://localhost:4200/#/";
	  this.oauthService.clientId = "weblocal";
	  this.oauthService.clientSecret = "weblocal";
	  this.oauthService.issuer = "https://dev-brainlitz.pagewerkz.com/";
	  this.oauthService.scope = "openid profile email voucher";
	  this.oauthService.setStorage(sessionStorage);
	  this.oauthService.logoutUrl = "http://localhost:4200/#/login";
	  this.oauthService.tryLogin({
	  	onTokenReceived: context => {
	        //
	        // Output just for purpose of demonstration
	        // Don't try this at home ... ;-)
	        // 
	        console.debug("logged in");
	        console.debug(context);
	    },
	    validationHandler: context => {
	        var search = new URLSearchParams();
	        search.set('token', context.idToken); 
	        search.set('client_id', oauthService.clientId);
	        // return http.get(validationUrl, { search}).toPromise();
	    }
	  });
  		
  	router.events.forEach((event) => {
  	    if(event instanceof NavigationStart) {
  	        // this.showSidebar = event.url !== "/pagenotfound";
  	        this.showSidebar = event.url !== "/login";
  	    }
  	  });
	}

	delete_cookie( name ) {
	  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	}


	public logoff() {
        this.oauthService.logOut();
        Cookie.deleteAll();
        this._router.navigateByUrl('/login')
    }	

    
}
