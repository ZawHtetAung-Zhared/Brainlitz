import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Http, Response, RequestOptions, Headers,URLSearchParams } from '@angular/http';
import { OAuthConfig } from './oauth.config';
@Injectable()

export class OAuthService{
	constructor(private httpClient: HttpClient) {}


}