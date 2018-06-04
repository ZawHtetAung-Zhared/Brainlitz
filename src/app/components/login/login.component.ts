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

    window.location.href = "https://staging-brainlitz.pagewerkz.com/dialog/authorize/5b063e2636f2e0f83cdbac88/?client_id=webstg&clientSecret=webstg&response_type=code";

  }
    

}
