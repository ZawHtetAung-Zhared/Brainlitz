import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { Location } from '@angular/common';
import { Http, Response, RequestOptions, Headers,URLSearchParams } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  public showSidebar: boolean = true;
  public showHeader: boolean = true;
  

  constructor(public router:Router, private http: Http, private _router: Router) {      
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

  	router.events.forEach((event) => {
	    if(event instanceof NavigationStart) {
        this.showSidebar = (event.url == "/login" || event.url == "/region" || event.url == "/") ? this.showSidebar = false : this.showSidebar = true; 
        this.showHeader = (event.url == "/login" ) ? this.showHeader = false : this.showHeader = true; 
	    }
	  });
	}
    
}
