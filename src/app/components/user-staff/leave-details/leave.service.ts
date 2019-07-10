import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {
  Http,
  Request,
  RequestMethod,
  Response,
  RequestOptions,
  Headers
} from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { environment } from '../../../../environments/environment';

import 'rxjs/add/operator/map';
@Injectable()
export class LeaveService {
  private baseUrl = environment.apiurl + '/api/v1/';
  private accessToken: string;
  private tokenType: string;
  constructor(private httpClient: HttpClient) {}

  getLocalstorage() {
    this.accessToken = localStorage.getItem('token');
    this.tokenType = localStorage.getItem('tokenType');
  }

  createLeave(regionid: string, body: object): Observable<any> {
    this.getLocalstorage();
    console.log(regionid);
    console.log(body);
    const apiUrl = this.baseUrl + regionid + '/leaves';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };

    console.log(httpOptions);

    return this.httpClient
      .post(apiUrl, body, httpOptions)
      .map((res: Response) => {
        console.log(res);
        return res;
      });
  }
}
