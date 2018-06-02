import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor() {}

  ngOnInit() {
  }

  public login() {
  	console.log('login start');

    window.location.href = "https://dev-brainlitz.pagewerkz.com/dialog/authorize/5b063e2636f2e0f83cdbac88/?client_id=weblocal&clientSecret=weblocal&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2F%23%2F";

  }
    

}
