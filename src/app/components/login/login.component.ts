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

  constructor( private oAuthService: OAuthService,private _service : appService) { }

  ngOnInit() {
  }

  public login() {
  	console.log('hello redirection...')
		this.oAuthService.initImplicitFlow();
	}

	public logoff() {
    this.oAuthService.logOut();
  }

}
