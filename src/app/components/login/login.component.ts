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
  private loginUrl = environment.apiurl + '/dialog/authorize/5b063e2636f2e0f83cdbac88';
  private clientId = environment.client_id;
  private clientSecret = environment.clientSecret;
  private redirectUri = environment.redirect_uri;
  private responseType = environment.response_type;
  public slicePathName; any;
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

  }

  public login() {
  	console.log('login start');
    this.redirectUri = encodeURIComponent(this.redirectUri);
    window.location.href = this.loginUrl + '/?client_id=' + this.clientId + '&clientSecret=' + this.clientSecret + '&response_type=' + this.responseType + '&redirect_uri=' + this.redirectUri
  }
  
}
