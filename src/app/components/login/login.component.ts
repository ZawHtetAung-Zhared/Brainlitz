import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private loginUrl = environment.apiurl + '/dialog/authorize/5b063e2636f2e0f83cdbac88';
  private clientId = environment.client_id;
  private clientSecret = environment.clientSecret;
  private redirectUri = environment.redirect_uri;
  private responseType = environment.response_type;
  constructor() {}

  ngOnInit() {
  }

  public login() {
  	console.log('login start');
    localStorage.removeItem("locationId");
    this.redirectUri = encodeURIComponent(this.redirectUri);
    window.location.href = this.loginUrl + '/?client_id=' + this.clientId + '&clientSecret=' + this.clientSecret + '&response_type=' + this.responseType + '&redirect_uri=' + this.redirectUri
  }
  
}
