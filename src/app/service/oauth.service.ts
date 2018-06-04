import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()

export class OAuthService{
	constructor(private httpClient: HttpClient) {
		console.log('in the oauth')
	}


}