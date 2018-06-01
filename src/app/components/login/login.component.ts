import { Component, OnInit } from '@angular/core';
import { FormsModule,FormGroup,FormControl } from '@angular/forms';
import { appService } from '../../service/app.service';
import { Observable } from 'rxjs/Rx';
import { OAuthService } from 'angular2-oauth2/oauth-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private oAuthService: OAuthService) {}

  ngOnInit() {
  }

  public login() {
  	console.log('login start');
  	//this.oAuthService.initImplicitFlow();
    window.location.href = "https://dev-brainlitz.pagewerkz.com/dialog/authorize/5b063e2636f2e0f83cdbac88/?client_id=weblocal&clientSecret=weblocal&response_type=code"
  }
    

}
