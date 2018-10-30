import { Component, OnInit, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { Location } from '@angular/common';
import { Http, Response, RequestOptions, Headers,URLSearchParams } from '@angular/http';
import { appService } from './service/app.service';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  public showSidebar: boolean = true;
  public showHeader: boolean = false;
  public str_res: any;
  public favicon = localStorage.getItem("favicon");
  public appName = localStorage.getItem("appname");
  // public appName = "Hello";

  constructor(private titleService: Title,private http: Http, private _router: Router, private _service: appService, @Inject(DOCUMENT) private document: any) { 
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
        this.showSidebar = (event.url == "/login" || event.url == "/region" || event.url == "/" || event.url == "/category" || event.url == "/courseplan") ? this.showSidebar = false : this.showSidebar = true; 
        this.showHeader = (event.url == "/login" || event.url == "/" || event.url == "/category" || event.url == "/courseplan" ) ? this.showHeader = false : this.showHeader = true; 
     }
    })
    console.log(document.location.href)
    let str = document.location.href;
    var start_pos = str.indexOf('//') + 2;
    var end_pos = str.indexOf('/#',start_pos);
    var storeLocal = str.substring(start_pos,end_pos)    
    console.log('~~~~~', storeLocal)
    // var redirectURL = storeLocal.split("/").pop();
     
    if(storeLocal.includes('/')){
      var str_temp = storeLocal.substr(storeLocal.lastIndexOf("/")+1);
      this.str_res = str_temp.substring(0,str_temp.indexOf('.'));
    }else{
      this.str_res = storeLocal.substring(0,storeLocal.indexOf('.'));
    }

    console.log('~~~~~', this.str_res);
    localStorage.setItem('appname',this.str_res);

    // var storeLocal = document.location.href.substring(7, document.location.href.indexOf("."));
    if((document.location.href.slice(-5)) == "login"){
      localStorage.setItem('slicePath', this.str_res);      
      this._service.getPathLocal();
      this._router.navigateByUrl('/login', { skipLocationChange: true });
    }

    
	}

  ngOnInit() {
    console.log("favicon",this.favicon);
    this.document.getElementById('appFavicon').setAttribute('href',this.favicon);
    // this.document.getElementById('appname').innerHTML = this.appName;
    this.setTitle(this.appName);
  }

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }
    
}
