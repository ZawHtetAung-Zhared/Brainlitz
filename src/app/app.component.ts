import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { Location } from '@angular/common';
import { Http, Response, RequestOptions, Headers,URLSearchParams } from '@angular/http';
import { appService } from './service/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  public showSidebar: boolean = true;
  public showHeader: boolean = true;

  constructor(private http: Http, private _router: Router, private _service: appService) { 
  	if (window.location.hash.indexOf("#") === 0) {
  		var data = {}, pairs, pair, separatorIndex, escapedKey, escapedValue;
        var queryString = window.location.search.substr(1);

        let pairs = queryString.split("&");
        for (var i = 0; i < pairs.length; i++) {
          pair = pairs[i];
          separatorIndex = pair.indexOf("=");
          if (separatorIndex === -1) {
              escapedKey = pair;
              escapedValue = null;
          }
          else {
              escapedKey = pair.substr(0, separatorIndex);
              escapedValue = pair.substr(separatorIndex + 1);
          }
          if(escapedKey == "code") {
          	localStorage.setItem("code", escapedValue);
          }
        }
    }

  	_router.events.forEach((event) => {
	    if(event instanceof NavigationStart) {
        this.showSidebar = (event.url == "/login" || event.url == "/region" || event.url == "/") ? this.showSidebar = false : this.showSidebar = true; 
        this.showHeader = (event.url == "/login" || event.url == "/" || event.url == "/region" ) ? this.showHeader = false : this.showHeader = true; 
	      this.showHeader = false;
        this.showSidebar = false;
        var slicePath = document.location.hash.substring(document.location.hash.indexOf("/#"), document.location.hash.indexOf("/login"));
        console.log(document.location.hash.indexOf("/#"))
        if((slicePath +'/login') == ('#'+event.url)){
          localStorage.setItem('slicePath', slicePath);
          this._service.getPathLocal();
          this.showHeader = false;
          this.showSidebar = false;
          this._router.navigateByUrl('/login', { skipLocationChange: true });
        }
     }
    })
	}

  ngOnInit() {
    //this._router.navigateByUrl('/login', { skipLocationChange: true });
  }

  logoff(){
    console.log('log out');
    localStorage.clear();
    this._router.navigateByUrl('/login');
  }
    
}
