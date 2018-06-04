import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  logoff(){
  	console.log('log out');
  	localStorage.clear();
  	// this.createCookie(name, "", -1, '/', 'dev-brainlitz.pagewerkz.com');
  	// delete this.createCookie;
  	// $.removeCookie('filter', { path: '/' });
	  this._router.navigateByUrl('/login');
	}

	// createCookie(name, value, expires, path, domain) {
 //    var cookie = name + "=" + escape(value) + ";";

 //    if (expires) {
 //      // If it's a date
 //      if(expires instanceof Date) {
 //        // If it isn't a valid date
 //        if (isNaN(expires.getTime()))
 //         expires = new Date();
 //      }
 //      else
 //        expires = new Date(new Date().getTime() + parseInt(expires) * 1000 * 60 * 60 * 24);

 //      cookie += "expires=" + expires.toGMTString() + ";";
 //    }

 //    if (path)
 //      cookie += "path=" + path + ";";
 //    if (domain)
 //      cookie += "domain=" + domain + ";";

 //    console.log(cookie)
 //    document.cookie = cookie;
	// }
}
