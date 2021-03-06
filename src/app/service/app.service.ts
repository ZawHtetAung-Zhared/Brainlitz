import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Http, Request, RequestMethod } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Response, RequestOptions, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/Rx';
import 'rxjs/add/observable/fromEvent';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs';
import { unwatchFile } from 'fs';
import { start } from 'repl';
import { KeyedWrite } from '@angular/compiler';
import { map } from 'rxjs/operators/map';
declare var $: any;

@Injectable()
export class appService {
  private baseUrl = environment.apiurl + '/api/v1';
  private baseUrl1 = environment.apiurl;
  private redirect_uri = localStorage.getItem('redirectURL');
  private clientId = localStorage.getItem('clientId');
  private clientSecret = localStorage.getItem('clientSecret');
  public temp: any;
  public tempToken: any;
  public isback: boolean = false;
  public accessToken = localStorage.getItem('token');
  public tokenType = localStorage.getItem('tokenType');
  public defaultSkipValue = '0';
  public defaultLimit = '20';
  locationID: Observable<any>;
  private getLocationID = new Subject<any>();

  permissionList: Observable<any>;
  private getpermissionList = new Subject<any>();

  sendData: Observable<any>;
  private sendParentToChild = new Subject<any>();
  itemValue = new Subject();

  slicePath: Observable<any>;
  private sendLoginName = new Subject<any>();

  goback: Observable<any>;
  private previous = new Subject<any>();

  goplan: Observable<any>;
  private plan = new Subject<any>();

  goCat: Observable<any>;
  private preCat = new Subject<any>();

  goCourse: Observable<any>;
  private backCo = new Subject<any>();

  goCourseCreate: Observable<any>;
  private backCC = new Subject<any>();

  goCourseDetail: Observable<any>;
  private backCDetail = new Subject<any>();

  goCourseDetail1: Observable<any>;
  private backCDetail1 = new Subject<any>();

  goCourseDetail2: Observable<any>;
  private backCDetail2 = new Subject<any>();

  goPlanDetail: Observable<any>;
  private backCPdetail = new Subject<any>();

  lnameChanges: Observable<any>;
  private lnameUpdated = new Subject<any>();

  goSchedule: Observable<any>;
  private backSc = new Subject<any>();

  goUserCourseDetail: Observable<any>;
  private userCDetail = new Subject<any>();

  constructor(
    private httpClient: HttpClient,
    private _http: Http,
    private _router: Router
  ) {
    let isToken = localStorage.getItem('token');
    this.accessToken = localStorage.getItem('token');
    this.tokenType = localStorage.getItem('tokenType');
    this.sendData = this.sendParentToChild.asObservable();
    this.locationID = this.getLocationID.asObservable();
    this.permissionList = this.getpermissionList.asObservable();
    this.slicePath = this.sendLoginName.asObservable();
    this.goback = this.previous.asObservable();
    this.goplan = this.plan.asObservable();
    this.goCat = this.preCat.asObservable();
    this.goCourse = this.backCo.asObservable();
    this.goCourseCreate = this.backCC.asObservable();
    this.goCourseDetail = this.backCDetail.asObservable();
    this.goCourseDetail1 = this.backCDetail1.asObservable();
    this.goCourseDetail2 = this.backCDetail2.asObservable();
    this.goPlanDetail = this.backCPdetail.asObservable();
    this.lnameChanges = this.lnameUpdated.asObservable();
    this.goSchedule = this.backSc.asObservable();
    this.goUserCourseDetail = this.userCDetail.asObservable();
  }

  callnameUpdate() {
    this.lnameUpdated.next();
  }

  getPathLocal() {
    var datGet = localStorage.getItem('slicePath');
    this.sendLoginName.next(datGet);
  }

  backCat() {
    this.preCat.next(false);
  }

  backCourse() {
    this.backCo.next(false);
  }

  backCCreate() {
    this.backCC.next(false);
  }

  back() {
    this.previous.next(false);
  }

  back1() {
    this.previous.next(false);
  }

  backCourseDetail() {
    this.backCDetail.next(false);
  }

  backCourseDetail1() {
    this.backCDetail1.next(false);
  }

  backCourseDetail2() {
    this.backCDetail2.next(false);
  }

  backPlanDetail() {
    this.backCPdetail.next(false);
  }

  gotoplan() {
    var val = localStorage.getItem('categoryID');
    console.log('gotoplan ', val);
    this.plan.next(val);
  }

  backSchedule() {
    this.backSc.next(false);
  }

  backUserCDetail() {
    this.userCDetail.next(false);
  }

  isLoggedIn(): boolean {
    console.log('isloggedin');
    this.tempToken = localStorage.getItem('code');
    console.log(this.tempToken);
    if (this.tempToken != null) {
      return true;
    } else {
      localStorage.clear();
      this._router.navigateByUrl('/login');
      return false;
    }
  }

  logout() {
    localStorage.clear();
    this._router.navigateByUrl('/login');
  }

  setLocationId(value) {
    this.itemValue.next(value); // this will make sure to tell every subscriber about the change.
    this.getLocationID.next(value);
  }

  showPermission(data) {
    this.getpermissionList.next(data);
  }

  dataParsing(data) {
    this.sendParentToChild.next(data);
  }

  getToken() {
    console.log('start...');
    this.tempToken = localStorage.getItem('code');
    let url = environment.apiurl + '/oauth/token';
    let body = {
      grant_type: environment.grant_type,
      code: this.tempToken,
      redirect_uri: this.redirect_uri,
      // 'client_id': environment.client_id,
      client_id: this.clientId
    };
    console.log('~~~ ', body);
    let basicToken = window.btoa(this.clientId + ':' + this.clientSecret);
    const httpOptions = {
      headers: new HttpHeaders({ authorization: 'Basic ' + basicToken })
    };

    return this.httpClient.post(url, body, httpOptions).map((res: any) => {
      console.log(res);
      this.temp = res.access_token;
      localStorage.setItem('token', this.temp);
      localStorage.setItem('tokenType', res.token_type);
      localStorage.setItem('userId', res.userId);
      return res;
    });
  }

  getLocalstorage() {
    this.accessToken = localStorage.getItem('token');
    this.tokenType = localStorage.getItem('tokenType');
    // console.log(this.accessToken)
    // if(this.accessToken == undefined){
    //   this._router.navigateByUrl('/login');
    // }
  }

  logOff() {
    console.log('service logOFF');
    let url = this.baseUrl + '/logout';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.delete(url, httpOptions).map((res: Response) => {
      let result = res;
      console.log('result', result);
      return result;
    });
  }

  getOrgCredentials(orgCode, hostName, envName) {
    console.log(hostName);
    let url =
      this.baseUrl1 +
      '/organization-credentials/' +
      orgCode +
      '?env=' +
      envName;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        secretkey: 'PAK2jf8WrS',
        local: '1'
      })
    };
    const httpOptions2 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        secretkey: 'PAK2jf8WrS'
      })
    };

    if (hostName == 'localhost') {
      console.log('localhost 13123');
      return this.httpClient.get(url, httpOptions).map((res: Response) => {
        let result = res;
        console.log(result);
        return result;
      });
    } else {
      console.log('localhost nope');
      return this.httpClient.get(url, httpOptions2).map((res: Response) => {
        let result = res;
        console.log(result);
        return result;
      });
    }
  }

  userInfo(type: any, token: any): Observable<any> {
    this.getLocalstorage();
    let url = this.baseUrl + '/userinfo';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: type + ' ' + token
      })
    };
    return this.httpClient.get(url, httpOptions).map((res: Response) => {
      let result = res;
      console.log(result);
      return result;
    });
  }

  getAllRegion(type: any, token: any): Observable<any> {
    this.getLocalstorage();
    let url = this.baseUrl + '/organization/user/regions';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: type + ' ' + token
      })
    };
    return this.httpClient.get(url, httpOptions).map((res: Response) => {
      let result = res;
      console.log(result);
      return result;
    });
  }

  getAllUsersForExport(regionId) {
    let url = this.baseUrl + '/' + regionId + '/download-students';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(url, httpOptions).map((res: Response) => {
      let result = res;
      console.log(result, 'AnoNyMous');
      return result;
    });
  }
  getAllEnroledUsersForExport(regionId) {
    let url = this.baseUrl + '/regions/' + regionId + '/user-enroled-class-csv';
    const httpoptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    const httpOptions: any = {
      ...httpoptions,
      responseType: 'text',
      observe: 'response'
    };
    return this.httpClient.get(url, httpOptions);
  }

  getPermission(locationId: string) {
    let url = this.baseUrl + '/user-location-permission/' + locationId;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(url, httpOptions).map((res: Response) => {
      let result = res;
      return result;
    });
  }

  getRegionalAdministrator(
    regionId: any,
    token: any,
    type: any
  ): Observable<any> {
    console.log(token);
    this.getLocalstorage();
    let url = this.baseUrl + '/regions/' + regionId;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: type + ' ' + token
      })
    };
    return this.httpClient.get(url, httpOptions).map((res: Response) => {
      let result = res;
      console.log(result);
      return result;
    });
  }

  paymentProvider(): Observable<any> {
    this.getLocalstorage();
    let url = this.baseUrl + '/payment-providers';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(url, httpOptions).map((res: Response) => {
      return res;
    });
  }

  invoiceSetting(regionId: any, type): Observable<any> {
    this.getLocalstorage();
    let url =
      this.baseUrl + '/' + regionId + '/setting/payment-invoice?option=' + type;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(url, httpOptions).map((res: Response) => {
      return res;
    });
  }

  updateInvoiceSetting(regionId: string, body: object) {
    let apiUrl = this.baseUrl + '/' + regionId + '/setting/payment-invoice';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient
      .put(apiUrl, body, httpOptions)
      .map((res: Response) => {
        return res;
      });
  }

  updateRegionalInfo(regionId: string, body: object, token: any, type: any) {
    let apiUrl = this.baseUrl + '/regions/' + regionId;
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type': 'multipart/form-data',
        authorization: type + ' ' + token
      })
    };
    return this.httpClient
      .put(apiUrl, body, httpOptions)
      .map((res: Response) => {
        let result = res;
        console.log(result);
        return result;
      });
  }

  updatePayNowPayment(regionId: string, body: object) {
    let apiUrl = this.baseUrl + '/' + regionId + '/payNow-invoice';
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient
      .put(apiUrl, body, httpOptions)
      .map((res: Response) => {
        let result = res;
        return result;
      });
  }

  createTemplate(id, body) {
    this.getLocalstorage();
    let url = this.baseUrl + '/' + id + '/access-point-template';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.post(url, body, httpOptions).map((res: Response) => {
      return res;
    });
  }

  getAllTemplate(id, limit: number, skip: number, moduleId: string) {
    this.getLocalstorage();
    let url =
      this.baseUrl +
      '/' +
      id +
      '/access-point-template?all=1&limit=' +
      limit +
      '&moduleId=' +
      moduleId +
      '&skip=' +
      skip;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(url, httpOptions).map((res: Response) => {
      return res;
    });
  }

  getSearchTemplate(
    id,
    limit: number,
    skip: number,
    moduleId: string,
    keyword: string
  ) {
    this.getLocalstorage();
    let url =
      this.baseUrl +
      '/' +
      id +
      '/access-point-template?all=1&limit=' +
      limit +
      '&moduleId=' +
      moduleId +
      '&skip=' +
      skip +
      '&keyword=' +
      encodeURIComponent(keyword);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(url, httpOptions).map((res: Response) => {
      return res;
    });
  }

  deleteTemplate(regionid, tempid) {
    console.log(regionid);
    console.log(tempid);
    let apiUrl =
      this.baseUrl + '/' + regionid + '/access-point-template/' + tempid;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.delete(apiUrl, httpOptions).map((res: Response) => {
      return res;
    });
  }

  getSingleTemplate(regionId, tempId) {
    this.getLocalstorage();
    let url =
      this.baseUrl + '/' + regionId + '/access-point-template/' + tempId;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(url, httpOptions).map((res: Response) => {
      return res;
    });
  }

  updateSingleTemplate(regionId, body) {
    console.log(body._id);
    let apiUrl =
      this.baseUrl + '/' + regionId + '/access-point-template/' + body._id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient
      .put(apiUrl, body, httpOptions)
      .map((res: Response) => {
        let result = res;
        return result;
      });
  }

  createNoti(obj, body): Observable<any> {
    console.log('object testing', obj);
    console.log(obj.id);
    console.log(obj.active);
    console.log(obj.sendType.length);
    console.log(obj.sendType);
    console.log(obj.sendType[0]);
    this.getLocalstorage();

    if (obj.sendType.length == 2) {
      var url =
        this.baseUrl +
        '/noti' +
        '?regionId=' +
        obj.regionId +
        '&locationId=' +
        obj.locationId +
        '&option=' +
        obj.option +
        '&sendType=noti,email';
    } else {
      var url =
        this.baseUrl +
        '/noti' +
        '?regionId=' +
        obj.regionId +
        '&locationId=' +
        obj.locationId +
        '&option=' +
        obj.option +
        '&sendType=' +
        obj.sendType[0];
    }
    url = obj.id != undefined ? url + '&id=' + obj.id : url;
    url = obj.active == true ? url + '&active=1' : url;

    console.log(url);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.post(url, body, httpOptions).map((res: Response) => {
      let result = res;
      console.log('service ~~ ', result);
      return result;
    });
  }

  userCount(obj): Observable<any> {
    this.getLocalstorage();
    console.log(obj);
    this.getLocalstorage();
    if (obj.id != undefined) {
      var url =
        this.baseUrl +
        '/' +
        obj.regionId +
        '/' +
        obj.locationId +
        '/user/count' +
        '?option=' +
        obj.option +
        '&id=' +
        obj.id;
    } else {
      var url =
        this.baseUrl +
        '/' +
        obj.regionId +
        '/' +
        obj.locationId +
        '/user/count' +
        '?option=' +
        obj.option;
    }

    url = obj.active == true ? url + '&active=1' : url;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(url, httpOptions).map((res: Response) => {
      let result = res;
      return result;
    });
  }

  viewNoti(limit: number, skip: number, locationid: string): Observable<any> {
    this.getLocalstorage();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    var url =
      this.baseUrl +
      '/noti/logs?locationId=' +
      locationid +
      '&limit=' +
      limit +
      '&skip=' +
      skip;
    return this.httpClient.get(url, httpOptions).map((res: Response) => {
      let result = res;
      return result;
    });
  }

  getLocations(id: string, limit, skip, all): Observable<any> {
    this.getLocalstorage();
    let url;
    if (all != false) {
      url = this.baseUrl + '/' + id + '/locations?all=' + all;
    } else {
      url =
        this.baseUrl + '/' + id + '/locations?limit=' + limit + '&skip=' + skip;
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(url, httpOptions).map((res: Response) => {
      let result = res;
      console.log(result);
      // this.sendParentToChild.next(result);
      return result;
    });
  }

  getLocationswithCourse(id: string): Observable<any> {
    this.getLocalstorage();
    let url;

    url = this.baseUrl + '/regions/' + id + '/locations';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(url, httpOptions).map((res: Response) => {
      let result = res;
      console.log(result);
      // this.sendParentToChild.next(result);
      return result;
    });
  }

  checkLocationForDelete(id: string): Observable<any> {
    this.getLocalstorage();
    let url;

    url = this.baseUrl + '/locations/' + id + '/check-for-delete';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(url, httpOptions).map((res: Response) => {
      let result = res;
      console.log(result);
      return result;
    });
  }

  getUserGrade(userIds: any): Observable<any> {
    this.getLocalstorage();
    let url = this.baseUrl + '/get-user-grades';
    let idObj = {
      userIds: userIds
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.post(url, idObj, httpOptions).map(res => {
      console.log(res);
      return res;
    });
  }
  getHeaderLocations(id: string, limit, skip, all): Observable<any> {
    this.getLocalstorage();
    let url;
    if (all != false) {
      url = this.baseUrl + '/' + id + '/locations?user=true&all=' + all;
    } else {
      url =
        this.baseUrl + '/' + id + '/locations?limit=' + limit + '&skip=' + skip;
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(url, httpOptions).map((res: Response) => {
      let result = res;
      console.log(result);
      this.sendParentToChild.next(result);
      return result;
    });
  }

  getAllUsers(
    id: string,
    type: any,
    limit: number,
    skip: number
  ): Observable<any> {
    console.log(id, type, limit, skip);
    this.getLocalstorage();
    let url;
    if (type == 'customer') {
      url =
        this.baseUrl +
        '/' +
        id +
        '/users?type=customer&limit=' +
        limit +
        '&skip=' +
        skip;
    } else if (type == 'staff') {
      url =
        this.baseUrl +
        '/' +
        id +
        '/users?type=staff&limit=' +
        limit +
        '&skip=' +
        skip;
    } else {
      url = this.baseUrl + '/' + id + '/users';
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };

    return this.httpClient.get(url, httpOptions).pipe(
      map((res: Response) => {
        // let result = res;
        let data = [];
        data.push(this.mapper(res));
        console.log('data', data);

        return data[0];
      })
    );
  }

  mapper(res) {
    var data = res;
    let re = /original/gi;

    for (let i = 0; i < data.length; i++) {
      if (
        data[i].profilePic !=
        'https://brainlitz.s3.amazonaws.com/default/default_profile_pic.png'
      )
        data[i].profilePic = data[i].profilePic.replace(re, 'l');
      console.log('modify data', data[i].profilePic.replace(re, 'l'));
    }
    return data;
  }

  getSearchUser(
    regionID: string,
    val: string,
    userType,
    limit: number,
    skip: number,
    classid: any
  ) {
    // console.log('selected',selected);
    // if(selected != ""){
    //   let apiUrl = this.baseUrl + '/' + regionID + '/user?type='+ userType  + '&keyword=' + val + '&nin=' + selected + '&limit=' + limit + '&skip=' + skip;
    // }else{
    //   let apiUrl = this.baseUrl + '/' + regionID + '/user?type='+ userType  + '&keyword=' + val + '&limit=' + limit + '&skip=' + skip;
    // }
    let apiUrl =
      this.baseUrl +
      '/' +
      regionID +
      '/user?type=' +
      userType +
      '&keyword=' +
      encodeURIComponent(val) +
      '&classId=' +
      classid +
      '&limit=' +
      limit +
      '&skip=' +
      skip +
      '&disableUserGrade=1';
    // let apiUrl = this.baseUrl + '/' + regionID + '/user?type='+ userType  + '&keyword=' + val;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(apiUrl, httpOptions).pipe(
      map((res: Response) => {
        // let result = res;
        // console.log(result);
        // return result;
        let data = [];
        data.push(this.mapper(res));
        console.log('data', data);

        return data[0];
      })
    );
  }

  getSearchCourse(regionID: string, val: string, location: string) {
    let apiUrl =
      this.baseUrl +
      '/' +
      regionID +
      '/course/search?keyword=' +
      encodeURIComponent(val);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      let result = res;
      return result;
    });
  }

  getSearchCategory(regionID: string, val: string, location: string) {
    let apiUrl =
      this.baseUrl +
      '/' +
      regionID +
      '/category?keyword=' +
      encodeURIComponent(val);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      let result = res;
      return result;
    });
  }

  getUserDetail(id: string, userId: string, locationid: string, requestedData) {
    console.log('RD', requestedData);
    let apiUrl =
      this.baseUrl +
      '/user/' +
      userId +
      '?profileType=details&regionId=' +
      id +
      '&locationId=' +
      locationid;
    if (requestedData != null) {
      apiUrl += '&requestedData=' + requestedData;
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(apiUrl, httpOptions).pipe(
      map((res: Response) => {
        let data = [];
        data.push(this.courseMapper(res));
        console.log('data', data);

        return data[0];
      })
    );
  }

  courseMapper(res) {
    var data = res;
    let re = /original/gi;

    for (let i = 0; i < data.courses.length; i++) {
      if (data.courses[i].teacher == null) {
        console.log('null teacher obj');
      } else if (
        data.courses[i].teacher.profilePic !=
        'https://brainlitz.s3.amazonaws.com/default/default_profile_pic.png'
      )
        data.courses[i].teacher.profilePic = data.courses[
          i
        ].teacher.profilePic.replace(re, 'l');
      // console.log('modify data', data.courses[i].teacher.profilePic.replace(re, 'l'));
    }
    return data;
  }

  editProfile(regionId: string, id: string) {
    let apiUrl = this.baseUrl + '/' + regionId + '/user/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      let result = res;
      return result;
    });
  }

  getCurrentUser(id: string) {
    let apiUrl = this.baseUrl + '/user/' + id;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      let result = res;
      return result;
    });
  }
  getNotiList(id: string, status: string, count) {
    let apiUrl = this.baseUrl + '/regions/' + id + '/journals?status=' + status;
    if (count) {
      apiUrl += '&count=true';
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(apiUrl, httpOptions).pipe(
      map((res: Response) => {
        let data = [];
        data.push(this.journalMapper(res));
        console.log('data', data);

        return data[0];
      })
    );
  }

  journalMapper(res) {
    var data = res;
    let re = /original/gi;

    for (let i = 0; i < data.journalList.length; i++) {
      if (data.journalList[i].sender.profilePic == undefined) {
        data.journalList[i].sender.profilePic =
          'https://brainlitz.s3.amazonaws.com/default/default_profile_pic.png';
      } else if (
        data.journalList[i].sender.profilePic !=
        'https://brainlitz.s3.amazonaws.com/default/default_profile_pic.png'
      )
        data.journalList[i].sender.profilePic = data.journalList[
          i
        ].sender.profilePic.replace(re, 'l');
      console.log(
        'modify data',
        data.journalList[i].sender.profilePic.replace(re, 'l')
      );

      if (data.journalList[i].student.profilePic == undefined) {
        data.journalList[i].student.profilePic =
          'https://brainlitz.s3.amazonaws.com/default/default_profile_pic.png';
      } else if (
        data.journalList[i].student.profilePic !=
        'https://brainlitz.s3.amazonaws.com/default/default_profile_pic.png'
      )
        data.journalList[i].student.profilePic = data.journalList[
          i
        ].student.profilePic.replace(re, 'l');
      console.log(
        'modify data',
        data.journalList[i].student.profilePic.replace(re, 'l')
      );
    }
    return data;
  }

  createLocation(
    id: string,
    body: object,
    locationid: string
  ): Observable<any> {
    this.getLocalstorage();
    console.log(id);
    console.log(body);
    let apiUrl =
      this.baseUrl + '/' + id + '/locations?locationId=' + locationid;
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
        let result = res;
        return result;
      });
    // catchError(this.handleError('addProduct'))
  }

  getSingleLocation(id: string) {
    let apiUrl = this.baseUrl + '/locations/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      let result = res;
      return result;
    });
  }

  updateLocation(id: string, body: object, locationid: string) {
    console.log(id);
    console.log(body);
    let apiUrl =
      this.baseUrl + '/locations/' + id + '?locationId=' + locationid;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient
      .put(apiUrl, body, httpOptions)
      .map((res: Response) => {
        let result = res;
        // this.sendParentToChild.next(result);
        return result;
      });
  }

  deleteLocation(id: string) {
    console.log(id);
    let apiUrl = this.baseUrl + '/locations/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.delete(apiUrl, httpOptions).map((res: Response) => {
      let result = res;
      console.log(result);
      return result;
    });
  }

  createUser(data: object, locationid): Observable<any> {
    console.log(data);
    let apiUrl = this.baseUrl + '/signup?locationId=' + locationid;
    // let body = JSON.stringify(data);
    const opt = {
      headers: new HttpHeaders({
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.post(apiUrl, data, opt).map((res: Response) => {
      let result = res;
      console.log(result);
      return result;
    });
  }

  getCategory(regionid: string, limit: number, skip: number): Observable<any> {
    this.getLocalstorage();
    let url =
      this.baseUrl +
      '/' +
      regionid +
      '/category?limit=' +
      limit +
      '&skip=' +
      skip;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };

    return this.httpClient.get(url, httpOptions).map((res: Response) => {
      let result = res;
      console.log(result);
      return result;
    });
  }
  // getscheduleStaffList(params:any): Observable<any>{
  //   this.getLocalstorage()
  //   // let url = this.baseUrl + '/' + regionid + '/schedule/stafflist?daysOfWeek=' + daysOfWeek + '&categoryId=' +  categoryId + '&keyword=' + keyword + '&limit=' + limit + '&skip=' + skip;
  //  let url = this.baseUrl + '/' + params.regionId + '/schedule/stafflist?daysOfWeek=' + params.daysOfWeek.toString() + '&categoryId=' +  params.categoryId;
  //  if (params.keyword) {
  //    url += '&keyword=' + params.keyword
  //  }
  //  if (params.limit) {
  //   url += '&limit=' + params.limit
  //  }
  //  if (params.skip) {
  //   url += '&skip=' + params.skip
  //  }
  //  console.log(url, ' Url', params)
  //  console.warn(this.tokenType + ' ' + this.accessToken)
  //   const httpOptions = {
  //       headers: new HttpHeaders({
  //         'Content-Type': 'application/json',
  //         'authorization': this.tokenType + ' ' + this.accessToken})
  //   };

  //     return this.httpClient.get(url, httpOptions)
  //     .map((res:Response) => {
  //       let result = res;
  //       console.warn(res, 'Res APi')
  //       return result;
  //   })
  // }
  getscheduleStaffList(
    regionid: string,
    daysOfWeek: string,
    categoryId: string,
    limit: string,
    skip: string
  ): Observable<any> {
    let url;
    this.getLocalstorage();
    if (limit == undefined && skip == undefined) {
      url =
        this.baseUrl +
        '/' +
        regionid +
        '/schedule/stafflist?daysOfWeek=' +
        daysOfWeek +
        '&categoryId=' +
        categoryId;
    } else {
      url =
        this.baseUrl +
        '/' +
        regionid +
        '/schedule/stafflist?daysOfWeek=' +
        daysOfWeek +
        '&categoryId=' +
        categoryId +
        '&limit=' +
        limit +
        '&skip=' +
        skip;
    }

    //  console.log(url, ' Url')
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(url, httpOptions).map((res: Response) => {
      let result = res;
      return result;
    });
  }
  getSearchJournal(
    courseId: string,
    studentId: string,
    skip: string,
    limit: string,
    lastjournalId: String,
    keyword: string,
    viewAs: string
  ) {
    this.getLocalstorage();
    if (lastjournalId == null || lastjournalId == undefined) {
      var url =
        this.baseUrl +
        '/' +
        'journal?' +
        'courseId=' +
        courseId +
        '&studentId=' +
        studentId +
        '&skip=' +
        skip +
        '&limit=' +
        limit +
        '&keyword=' +
        encodeURIComponent(keyword) +
        '&viewas=' +
        viewAs;
    } else {
      var url =
        this.baseUrl +
        '/' +
        'journal?' +
        'courseId=' +
        courseId +
        '&studentId=' +
        studentId +
        '&skip=' +
        skip +
        '&limit=' +
        limit +
        '&lastjournalId=' +
        lastjournalId +
        '&keyword=' +
        encodeURIComponent(keyword) +
        '&viewas=' +
        viewAs;
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(url, httpOptions).map((res: Response) => {
      let result = res;
      return result;
    });
  }
  getJournal(
    courseId: string,
    studentId: string,
    skip: any,
    limit: any,
    lastjournalId: String
  ) {
    this.getLocalstorage();
    if (lastjournalId == null || lastjournalId == undefined) {
      var url =
        this.baseUrl +
        '/' +
        'journal?' +
        'courseId=' +
        courseId +
        '&studentId=' +
        studentId +
        '&skip=' +
        skip +
        '&limit=' +
        limit;
    } else {
      var url =
        this.baseUrl +
        '/' +
        'journal?' +
        'courseId=' +
        courseId +
        '&studentId=' +
        studentId +
        '&skip=' +
        skip +
        '&limit=' +
        limit +
        '&lastjournalId=' +
        lastjournalId;
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(url, httpOptions).map((res: Response) => {
      let result = res;
      return result;
    });
  }
  getscheduleSearchStaffList(
    regionid: string,
    daysOfWeek: string,
    categoryId: string,
    keyword: string,
    skip: number,
    limit: number
  ): Observable<any> {
    this.getLocalstorage();
    let url =
      this.baseUrl +
      '/' +
      regionid +
      '/schedule/stafflist?daysOfWeek=' +
      daysOfWeek.toString() +
      '&categoryId=' +
      categoryId +
      '&keyword=' +
      encodeURIComponent(keyword) +
      '&limit=' +
      limit +
      '&skip=' +
      skip;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };

    return this.httpClient.get(url, httpOptions).map((res: Response) => {
      let result = res;
      return result;
    });
  }

  createCoursePlan(
    id: string,
    locationid: string,
    data: object
  ): Observable<any> {
    let url = this.baseUrl + '/' + id + '/courseplan?locationId=' + locationid;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.post(url, data, httpOptions).map((res: Response) => {
      let result = res;
      console.log(result);
      return result;
    });
  }

  getSinglePlan(planID: string, locationId: string) {
    this.getLocalstorage();
    let url =
      this.baseUrl + '/courseplan/' + planID + '?locationId=' + locationId;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };

    return this.httpClient.get(url, httpOptions).map((res: Response) => {
      return res;
    });
  }

  deleteCoursePlan(id) {
    console.log(id);
    let apiUrl = this.baseUrl + '/courseplan/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.delete(apiUrl, httpOptions).map((res: Response) => {
      let result = res;
      console.log(result);
      return result;
    });
  }

  // getSignlecPlan(id:string){
  //   let apiUrl = this.baseUrl + '/courseplan/' + id;
  //   const httpOptions = {
  //       headers: new HttpHeaders({
  //         'Content-Type': 'application/json',
  //         'authorization': this.tokenType + ' ' + this.accessToken})
  //   };
  //   return this.httpClient.get(apiUrl, httpOptions)
  //   .map((res:Response) => {
  //     let result = res;
  //     return result;
  //   })
  // }

  updateSignlecPlan(id: string, data: object, locationId: string) {
    let apiUrl =
      this.baseUrl + '/courseplan/' + id + '?locationId=' + locationId;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient
      .put(apiUrl, data, httpOptions)
      .map((res: Response) => {
        let result = res;
        return result;
      });
  }

  createCategory(data: object, id: string): Observable<any> {
    console.log(data);
    let apiUrl = this.baseUrl + '/' + id + '/category';
    const opt = {
      headers: new HttpHeaders({
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };

    return this.httpClient.post(apiUrl, data, opt).map((res: Response) => {
      let result = res;
      console.log(result);
      return result;
    });
  }
  updateCategory(id: string, body: any) {
    let apiUrl = this.baseUrl + '/category/' + id;
    const options = {
      headers: new HttpHeaders({
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.put(apiUrl, body, options).map((res: Response) => {
      let result = res;
      console.log(result);
      return result;
    });
  }

  getSingleCategory(id: string, regionid: string): Observable<any> {
    console.log(id);
    this.getLocalstorage();
    let apiUrl = this.baseUrl + '/category/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      let result = res;
      console.log(result);
      return result;
    });
  }

  getSearchAvailableCourse(
    regionID: string,
    val: string,
    userId: string,
    limit: number,
    skip: number,
    courseplanid: string
  ) {
    let apiUrl =
      this.baseUrl +
      '/' +
      regionID +
      '/available-course/' +
      userId +
      '/search?keyword=' +
      encodeURIComponent(val) +
      '&limit=' +
      limit +
      '&skip=' +
      skip;
    if (courseplanid != null) {
      apiUrl += '&coursePlanId=' + courseplanid;
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      let result = res;
      return result;
    });
  }

  getAvailabelCourse(
    regionId: string,
    userId: string,
    limit: number,
    skip: number,
    courseplanid: string
  ) {
    this.getLocalstorage();
    let url =
      this.baseUrl +
      '/' +
      regionId +
      '/available-course/' +
      userId +
      '?limit=' +
      limit +
      '&skip=' +
      skip;
    if (courseplanid != null) {
      url += '&coursePlanId=' + courseplanid;
    }
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(url, httpOptions).map((res: Response) => {
      let result = res;
      return result;
    });
  }

  // getAllCoursePlan(id: string, location: string): Observable<any> {
  //   this.getLocalstorage();
  //   console.log(location);
  //   console.log(this.baseUrl + '/' + id + '/courseplan?locationId=' + location);
  //   let url = this.baseUrl + '/' + id + '/courseplan?locationId=' + location;
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       authorization: this.tokenType + ' ' + this.accessToken
  //     })
  //   };
  //   return this.httpClient.get(url, httpOptions).map((res: Response) => {
  //     let result = res;
  //     return result;
  //   });
  // }
  getAllCourseplan(
    id: string,
    location: string,
    categoryId: string,
    skip: string,
    limit: string,
    keyword: string
  ): Observable<any> {
    this.getLocalstorage();
    let url;
    if (keyword == undefined || keyword == '') {
      url =
        this.baseUrl +
        '/' +
        id +
        '/courseplan?locationId=' +
        location +
        '&skip=' +
        skip +
        '&limit=' +
        limit;
    } else if (keyword != undefined || keyword != '') {
      url =
        this.baseUrl +
        '/' +
        id +
        '/courseplan?locationId=' +
        location +
        '&keyword=' +
        encodeURIComponent(keyword);
    }

    const httpOptions = {
      headers: new HttpHeaders({
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(url, httpOptions).map((res: Response) => {
      let result = res;
      return result;
    });
  }

  getCourseplanCollection(regionId, locationId, keyword) {
    let url;
    console.log('keyword', keyword, ',', keyword == '');
    if (keyword == null || keyword == undefined || keyword == '') {
      url =
        this.baseUrl +
        '/regions/' +
        regionId +
        '/course_plans?locationId=' +
        locationId;
    } else {
      url =
        this.baseUrl +
        '/regions/' +
        regionId +
        '/course_plans?locationId=' +
        locationId +
        '&keyword=' +
        encodeURIComponent(keyword);
    }

    const httpOptions = {
      headers: new HttpHeaders({
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };

    return this.httpClient.get(url, httpOptions).map((res: Response) => {
      let result = res;
      return result;
    });
  }

  getSearchCoursePlan(
    id: string,
    location: string,
    categoryId: string,
    skip: string = this.defaultSkipValue,
    limit: string = this.defaultLimit,
    keyword: string
  ): Observable<any> {
    this.getLocalstorage();
    console.log(location);
    console.log(this.baseUrl + '/' + id + '/courseplan?locationId=' + location);
    let url;
    if (categoryId == undefined) {
      url =
        this.baseUrl +
        '/' +
        id +
        '/courseplan?locationId=' +
        location +
        '&skip=' +
        skip +
        '&limit=' +
        limit +
        '&keyword=' +
        encodeURIComponent(keyword);
    } else {
      url =
        this.baseUrl +
        '/' +
        id +
        '/courseplan?locationId=' +
        location +
        '&categoryId=' +
        categoryId +
        '&skip=' +
        skip +
        '&limit=' +
        limit +
        '&keyword=' +
        encodeURIComponent(keyword);
    }

    const httpOptions = {
      headers: new HttpHeaders({
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(url, httpOptions).map((res: Response) => {
      let result = res;
      console.log(result);
      return result;
    });
  }

  createHolidays(
    regionid: string,
    locationid: string,
    data: object
  ): Observable<any> {
    let url =
      this.baseUrl + '/' + regionid + '/holidays?locationId=' + locationid;
    const opt = {
      headers: new HttpHeaders({
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };

    return this.httpClient.post(url, data, opt).map((res: Response) => {
      let result = res;
      console.log(result);
      return result;
    });
  }

  updateHoliday(holidayId: string, locationid: string, data: object) {
    console.log(holidayId);
    let apiUrl =
      this.baseUrl + '/holidays/' + holidayId + '?locationId=' + locationid;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient
      .put(apiUrl, data, httpOptions)
      .map((res: Response) => {
        let result = res;
        return result;
      });
  }

  getAllHolidays(id: string): Observable<any> {
    this.getLocalstorage();
    let url = this.baseUrl + '/' + id + '/holidays';
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(url, httpOptions).map((res: Response) => {
      let result = res;
      console.log(result);
      return result;
    });
  }
  getAllHolidaysByYear(id: string, year): Observable<any> {
    this.getLocalstorage();
    let url = this.baseUrl + '/' + id + '/holidays?year=' + year;
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(url, httpOptions).map((res: Response) => {
      let result = res;
      console.log(result);
      return result;
    });
  }

  getSingleHoliday(holidayId: string) {
    let apiUrl = this.baseUrl + '/holidays/' + holidayId;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      let result = res;
      return result;
    });
  }

  deleteHoliday(holidayId: string, locationid: string): Observable<any> {
    let apiUrl =
      this.baseUrl + '/holidays/' + holidayId + '?locationId=' + locationid;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.delete(apiUrl, httpOptions).map((res: Response) => {
      let result = res;
      console.log(result);
      return result;
    });
  }

  createHolidaysCalendar(
    id: string,
    locationid: string,
    data: object
  ): Observable<any> {
    let url =
      this.baseUrl + '/' + id + '/holidaysCalendar?locationId=' + locationid;
    const opt = {
      headers: new HttpHeaders({
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };

    return this.httpClient.post(url, data, opt).map((res: Response) => {
      let result = res;
      console.log(result);
      return result;
    });
  }

  getAllHolidaysCalendar(
    id: string,
    limit: number,
    skip: number
  ): Observable<any> {
    this.getLocalstorage();
    let url =
      this.baseUrl +
      '/' +
      id +
      '/holidaysCalendar?limit=' +
      limit +
      '&skip=' +
      skip;
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(url, httpOptions).map((res: Response) => {
      let result = res;
      console.log(result);
      return result;
    });
  }

  getSingleCalendar(calendarId: string): Observable<any> {
    let apiUrl = this.baseUrl + '/holidaysCalendar/' + calendarId;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      let result = res;
      return result;
    });
  }

  deleteCalendar(id: string): Observable<any> {
    console.log(id);
    let apiUrl = this.baseUrl + '/holidaysCalendar/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.delete(apiUrl, httpOptions).map((res: Response) => {
      let result = res;
      console.log(result);
      return result;
    });
  }

  updateCalendar(id: string, data: object) {
    console.log(data);
    let apiUrl = this.baseUrl + '/holidays-calendar/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient
      .put(apiUrl, data, httpOptions)
      .map((res: Response) => {
        let result = res;
        return result;
      });
  }

  // updateCalendar(id:string,data:object){
  //   let apiUrl = this.baseUrl  + '/holidays-calendar/' + id;
  //   const httpOptions = {
  //       headers: new HttpHeaders({
  //         'Content-Type': 'application/json',
  //         'authorization': this.tokenType + ' ' + this.accessToken})
  //   };
  //   return this.httpClient.put(apiUrl, httpOptions, data)
  //   .map((res:Response) => {
  //     let result = res;
  //     console.log(result)
  //     return result;
  //   })
  // }

  createCourse(
    id: string,
    data: object,
    save: boolean,
    courseID: string,
    isCheck: boolean,
    locationid: string,
    flexy: boolean
  ): Observable<any> {
    console.log('APP Service', flexy);
    console.log(courseID);
    if (courseID == '') {
      console.log('tttt');
      var url =
        this.baseUrl +
        '/' +
        id +
        '/course?locationId=' +
        locationid +
        '&draft=' +
        save;
      url = flexy == true ? url + '&flexy=' + flexy : url;
      // if(flexy == true){
      //   var url = this.baseUrl + '/' + id + '/course?locationId='+ locationid +'&draft=' + save + 'flexy=' + flexy;
      // }else{
      //   var url = this.baseUrl + '/' + id + '/course?locationId='+ locationid +'&draft=' + save;
      // }
    } else {
      var url =
        this.baseUrl +
        '/' +
        id +
        '/course?locationId=' +
        locationid +
        '&courseId=' +
        courseID +
        '&draft=' +
        save;
      url = isCheck == true ? url + '&check=' + isCheck : url;
      url = flexy == true ? url + '&flexy=' + flexy : url;
    }

    const httpOptions: any = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      }),
      observe: 'response',
      responseType: 'json'
    };
    return this.httpClient.post(url, data, httpOptions).map(res => {
      console.log(res);
      return res;
    });
  }

  simpleCourseSearch(
    regionID: string,
    keyword: string,
    locationID: string,
    limit,
    skip
  ) {
    this.getLocalstorage();
    let url =
      this.baseUrl +
      '/' +
      regionID +
      '/course?locationId=' +
      locationID +
      '&keyword=' +
      encodeURIComponent(keyword) +
      '&limit=' +
      limit +
      '&skip=' +
      skip;
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };

    return this.httpClient.get(url, httpOptions).map((res: Response) => {
      let result = res;
      console.log(result);
      return result;
    });
  }

  advanceCourseSearch(
    regionID: string,
    locationID: string,
    keyword: string,
    repeatedDays,
    eventStart,
    eventEnd,
    planIDArray,
    categoryIDArray,
    limit,
    skip
  ) {
    this.getLocalstorage();

    console.log(keyword);
    console.log(categoryIDArray);
    let url =
      this.baseUrl + '/' + regionID + '/course?locationId=' + locationID;
    console.error(repeatedDays, 'repeated days');
    console.error(repeatedDays != '' || repeatedDays != undefined);
    url =
      keyword != undefined
        ? url + '&keyword=' + encodeURIComponent(keyword)
        : url;
    url =
      repeatedDays != '' && repeatedDays != undefined
        ? url + '&repeatedDays=' + repeatedDays
        : url;
    url = eventStart != null ? url + '&startDate=' + eventStart : url;
    url = eventEnd != null ? url + '&endDate=' + eventEnd : url;
    url =
      categoryIDArray != null ? url + '&categoryId=' + categoryIDArray : url;
    url = planIDArray != null ? url + '&coursePlanId=' + planIDArray : url;

    url = url + '&limit=' + limit + '&skip=' + skip;

    console.log(url);
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(url, httpOptions).map((res: Response) => {
      let result = res;
      console.log(result);
      return result;
    });
  }

  getAllCourse(
    id: string,
    locationid: string,
    limit: number,
    skip: number
  ): Observable<any> {
    this.getLocalstorage();
    let url =
      this.baseUrl +
      '/' +
      id +
      '/course?locationId=' +
      locationid +
      '&limit=' +
      limit +
      '&skip=' +
      skip;
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(url, httpOptions).map((res: Response) => {
      let result = res;
      console.log(result);
      return result;
    });
  }

  getCoursesPerPlan(
    regionId,
    locationId,
    courseplanId,
    limit,
    skip,
    page,
    direction,
    keyword
  ): Observable<any> {
    let url;
    if (keyword == null || keyword == undefined || keyword == '') {
      url =
        this.baseUrl +
        '/regions/' +
        regionId +
        '/course_plans/' +
        courseplanId +
        '/courses?locationId=' +
        locationId +
        '&limit=' +
        limit +
        '&skip=' +
        skip +
        '&page=' +
        page +
        '&direction=' +
        direction;
    } else {
      url =
        this.baseUrl +
        '/regions/' +
        regionId +
        '/course_plans/' +
        courseplanId +
        '/courses?locationId=' +
        locationId +
        '&limit=' +
        limit +
        '&skip=' +
        skip +
        '&page=' +
        page +
        '&direction=' +
        direction +
        '&keyword=' +
        encodeURIComponent(keyword);
    }

    const httpOptions = {
      headers: new HttpHeaders({
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };

    return this.httpClient.get(url, httpOptions).map((res: Response) => {
      let result = res;
      console.log(result);
      return result;
    });
  }

  getSingleCourse(id: string, locationid: string): Observable<any> {
    this.getLocalstorage();
    let apiUrl = this.baseUrl + '/course/' + id + '?locationId=' + locationid;
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(apiUrl, httpOptions).pipe(
      map((res: Response) => {
        let data = [];
        data.push(this.singleCourseMapper(res));
        console.log('data', data);

        return data[0];
      })
    );
  }

  singleCourseMapper(data) {
    let re = /original/gi;
    if (
      data.teacher.profilePic !=
      'https://brainlitz.s3.amazonaws.com/default/default_profile_pic.png'
    )
      data.teacher.profilePic = data.teacher.profilePic.replace(re, 'l');
    console.log('###', data);

    return data;
  }

  updateCourse(id, body, locationid) {
    console.log('body obj', body);
    let apiUrl = this.baseUrl + '/course/' + id + '?locationId=' + locationid;
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient
      .put(apiUrl, body, httpOptions)
      .map((res: Response) => {
        let result = res;
        console.log(result);
        return result;
      });
  }

  deleteCourse(id) {
    console.log(id);
    let apiUrl = this.baseUrl + '/course/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.delete(apiUrl, httpOptions).map((res: Response) => {
      let result = res;
      console.log(result);
      return result;
    });
  }
  deleteCourseDetail(courseId, locationID) {
    console.log(courseId);
    console.log(locationID);
    let apiUrl =
      this.baseUrl + '/course/' + courseId + '?locationId=' + locationID;
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.delete(apiUrl, httpOptions).map((res: Response) => {
      let result = res;
      console.log(result);
      return result;
    });
  }

  getQuizwerkzForCourse(courseid) {
    this.getLocalstorage();
    console.log('QuizwerkzForCourse', courseid);
    let apiUrl = this.baseUrl + '/course/' + courseid + '/quizwerkz';
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      let result = res;
      console.log(result);
      return result;
    });
  }

  swapTeacher(courseId: string, body) {
    console.log(body);
    let apiUrl = this.baseUrl + '/' + courseId + '/swap/teacher';

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
        let result = res;
        console.log(result);
        return result;
      });
  }

  assignUser(regionid, body, locationid) {
    console.log(regionid);
    console.log(body);
    let apiUrl =
      this.baseUrl + '/' + regionid + '/timetable?locationId=' + locationid;

    const httpOptions: any = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      }),
      observe: 'response',
      responseType: 'json'
    };
    console.log(httpOptions);
    return this.httpClient.post(apiUrl, body, httpOptions).map(res => {
      console.log(res);
      return res;
    });
  }

  getAttendance(courseid) {
    let url;
    url = this.baseUrl + '/courses/' + courseid + '/attendances';
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    console.log('getAttendance works');
    return this.httpClient.get(url, httpOptions).map(res => {
      console.log(res);
      return res;
    });
  }

  getAssignUser(regionid, courseid, date, month, year) {
    let url;
    if (date == null && month == null && year == null) {
      url =
        this.baseUrl +
        '/' +
        regionid +
        '/course/user/' +
        courseid +
        '?usergrade=1' +
        '&attendanceMode=true';
    } else {
      url =
        this.baseUrl +
        '/' +
        regionid +
        '/course/user/' +
        courseid +
        '?date=' +
        date +
        '&month=' +
        month +
        '&year=' +
        year +
        '&usergrade=1&attendanceMode=true';
    }

    const httpOptions = {
      headers: new HttpHeaders({
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(url, httpOptions).pipe(
      map((res: Response) => {
        let data = [];
        data.push(this.assignMapper(res));
        console.log('data', data);

        return data[0];
      })
    );
  }

  assignMapper(res) {
    var data = res;
    let re = /original/gi;

    for (let i = 0; i < data.CURRENT_DATE_LESSON_STAFF.length; i++) {
      if (
        data.CURRENT_DATE_LESSON_STAFF[i].profilePic !=
        'https://brainlitz.s3.amazonaws.com/default/default_profile_pic.png'
      )
        data.CURRENT_DATE_LESSON_STAFF[
          i
        ].profilePic = data.CURRENT_DATE_LESSON_STAFF[i].profilePic.replace(
          re,
          'l'
        );
      console.log(
        'modify data',
        data.CURRENT_DATE_LESSON_STAFF[i].profilePic.replace(re, 'l')
      );
    }
    for (let i = 0; i < data.CUSTOMER.length; i++) {
      if (
        data.CUSTOMER[i].profilePic !=
        'https://brainlitz.s3.amazonaws.com/default/default_profile_pic.png'
      )
        data.CUSTOMER[i].profilePic = data.CUSTOMER[i].profilePic.replace(
          re,
          'l'
        );
      console.log('modify data', data.CUSTOMER[i].profilePic.replace(re, 'l'));
    }
    for (let i = 0; i < data.STAFF.length; i++) {
      if (
        data.STAFF[i].profilePic !=
        'https://brainlitz.s3.amazonaws.com/default/default_profile_pic.png'
      )
        data.STAFF[i].profilePic = data.STAFF[i].profilePic.replace(re, 'l');
      console.log('modify data', data.STAFF[i].profilePic.replace(re, 'l'));
    }
    for (let i = 0; i < data.TEACHER.length; i++) {
      if (
        data.TEACHER[i].profilePic !=
        'https://brainlitz.s3.amazonaws.com/default/default_profile_pic.png'
      )
        data.TEACHER[i].profilePic = data.TEACHER[i].profilePic.replace(
          re,
          'l'
        );
      console.log('modify data', data.TEACHER[i].profilePic.replace(re, 'l'));
    }
    return data;
  }

  getAssessment(regionid, courseid, assessment) {
    let url = this.baseUrl + '/' + regionid + '/course/assessment/' + courseid;
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(url, httpOptions).map((res: Response) => {
      return res;
    });
  }

  withdrawAssignUser(regionid, obj: any, locationid) {
    console.log(regionid, obj);
    let apiUrl =
      this.baseUrl + '/' + regionid + '/timetable?locationId=' + locationid;
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: this.tokenType + ' ' + this.accessToken
      }),
      body: obj
    };
    return this.httpClient.delete(apiUrl, httpOptions).map((res: Response) => {
      let result = res;
      console.log(result);
      return result;
    });
  }

  getAllDeposit(id: string): Observable<any> {
    let url = this.baseUrl + '/' + id + '/deposits';
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(url, httpOptions).map((res: Response) => {
      let result = res;
      console.log(result);
      return result;
    });
  }

  getSignlecPlan(id: string) {
    let apiUrl = this.baseUrl + '/courseplan/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      let result = res;
      return result;
    });
  }

  // updateSignlecPlan(id:string, data: object){
  //   let apiUrl = this.baseUrl + '/courseplan/' + id;
  //   const httpOptions = {
  //       headers: new HttpHeaders({
  //         'Content-Type': 'application/json',
  //         'authorization': this.tokenType + ' ' + this.accessToken})
  //   };
  //   return this.httpClient.put(apiUrl, data, httpOptions)
  //   .map((res:Response) => {
  //     let result = res;
  //     return result;
  //   })
  // }

  getAllPdf(regionId, locationid: string, limit: number, skip: number) {
    console.log(skip);
    this.getLocalstorage();
    let apiUrl =
      this.baseUrl +
      '/' +
      regionId +
      '/quizwerkzs?locationId=' +
      locationid +
      '&limit=' +
      limit +
      '&skip=' +
      skip;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(apiUrl, httpOptions).map(
      (res: Response) => {
        let result = res;
        return result;
      },
      err => {
        return err;
      }
    );
  }

  createPdf(obj, locationid) {
    console.log(obj);
    let apiUrl =
      this.baseUrl +
      '/' +
      obj.regionId +
      '/quizwerkzs?locationId=' +
      locationid;
    const opt = {
      headers: new HttpHeaders({
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };

    return this.httpClient.post(apiUrl, obj, opt).map((res: Response) => {
      let result = res;
      console.log(result);
      return result;
    });
  }

  deleteQuizwerkz(qwid: string, locationid: string) {
    console.log(qwid);
    let apiUrl =
      this.baseUrl + '/quizwerkzs/' + qwid + '?locationId=' + locationid;
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.delete(apiUrl, httpOptions).map((res: Response) => {
      let result = res;
      console.log(result);
      return result;
    });
  }

  getSingleQuizwerkz(id: string, locationid: string) {
    console.log(id);
    let apiUrl =
      this.baseUrl + '/quizwerkzs/' + id + '?locationId=' + locationid;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      let result = res;
      return result;
    });
  }

  updateSignleQuizwerkz(id: string, data: object, locationid: string) {
    let apiUrl =
      this.baseUrl + '/quizwerkzs/' + id + '?locationId=' + locationid;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient
      .put(apiUrl, data, httpOptions)
      .map((res: Response) => {
        let result = res;
        return result;
      });
  }

  updateSignleCalendar(id: string, data: object) {
    let apiUrl = this.baseUrl + '/holidaysCalendar/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient
      .put(apiUrl, data, httpOptions)
      .map((res: Response) => {
        let result = res;
        return result;
      });
  }

  getFeedBackList(regionId, teacherId) {
    let apiUrl = this.baseUrl + '/' + regionId + '/feedback/' + teacherId;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      let result = res;
      return result;
    });
  }

  getRatingList(locationId: string, limit: number, skip: number) {
    let apiUrl =
      this.baseUrl +
      '/' +
      locationId +
      '/rating/staff?limit=' +
      limit +
      '&skip=' +
      skip;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(apiUrl, httpOptions).pipe(
      map((res: Response) => {
        let data = [];
        data.push(this.mapper(res));
        console.log('data', data);

        return data[0];
      })
    );
  }

  getAllPermission(id: string) {
    let apiUrl = this.baseUrl + '/' + id + '/permissions';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      let result = res;
      return result;
    });
  }

  userDetail(regionId: string, userId: string) {
    let apiUrl = this.baseUrl + '/' + regionId + '/user/' + userId;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      let result = res;
      return result;
    });
  }

  updateUser(regionId, locationid, userId: string, data: object) {
    let apiUrl = this.baseUrl + '/user/' + userId + '?locationId=' + locationid;
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient
      .put(apiUrl, data, httpOptions)
      .map((res: Response) => {
        let result = res;
        return result;
      });
  }

  getAllAP(id: string) {
    let apiUrl = this.baseUrl + '/' + id + '/access-point';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      let result = res;
      return result;
    });
  }

  getAllAPmodule(id: string, moduleId: string) {
    let apiUrl = this.baseUrl + '/' + id + '/access-point?moduleId=' + moduleId;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      let result = res;
      return result;
    });
  }

  getAllModule(id: string) {
    let apiUrl = this.baseUrl + '/' + id + '/region/module';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      let result = res;
      return result;
    });
  }

  visibleModule(moduleid: string, data: object) {
    // console.log('token type',this.tokenType);
    // console.log('accessToken',this.accessToken);
    console.log('data', data);
    let apiUrl = this.baseUrl + '/toggle/visibility/' + moduleid;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient
      .put(apiUrl, data, httpOptions)
      .map((res: Response) => {
        let result = res;
        return result;
      });
  }

  getSearchApg(
    regionID: string,
    keyword: string,
    type: string,
    moduleId: string,
    selectedStr: string,
    limit: number,
    skip: number
  ) {
    let apiUrl;
    console.log('keyword', keyword);
    console.log('selected str', selectedStr);
    if (selectedStr != '') {
      apiUrl =
        this.baseUrl +
        '/' +
        regionID +
        '/access-point-group/search?keyword=' +
        encodeURIComponent(keyword) +
        '&nin=' +
        selectedStr +
        '&type=' +
        type +
        '&limit=' +
        limit +
        '&skip=' +
        skip;
      console.log('apiUrl', apiUrl);
    } else {
      if (moduleId != '') {
        apiUrl =
          this.baseUrl +
          '/' +
          regionID +
          '/access-point-group/search?keyword=' +
          encodeURIComponent(keyword) +
          '&type=' +
          type +
          '&moduleId=' +
          moduleId +
          '&limit=' +
          limit +
          '&skip=' +
          skip;
      } else {
        apiUrl =
          this.baseUrl +
          '/' +
          regionID +
          '/access-point-group/search?keyword=' +
          encodeURIComponent(keyword) +
          '&type=' +
          type +
          '&limit=' +
          limit +
          '&skip=' +
          skip;
      }
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      let result = res;
      return result;
    });
  }

  getAllAPG(id: string, moduleId: string, limit: number, skip: number) {
    // url = this.baseUrl+ '/' + id + '/user?type=customer&limit=' + limit + '&skip=' + skip;
    console.log('APG limit skip', limit, skip);
    if (moduleId == '') {
      console.log('no moduleID');
      var apiUrl =
        this.baseUrl +
        '/' +
        id +
        '/access-point-group?limit=' +
        limit +
        '&skip=' +
        skip;
    } else {
      console.log('has moduleID');
      var apiUrl =
        this.baseUrl +
        '/' +
        id +
        '/access-point-group?moduleId=' +
        moduleId +
        '&limit=' +
        limit +
        '&skip=' +
        skip;
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      let result = res;
      return result;
    });
  }
  deleteAp(regionId: string, AP_ID: string) {
    let apiUrl = this.baseUrl + '/' + regionId + '/access-point/' + AP_ID;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    console.log(httpOptions);
    return this.httpClient.delete(apiUrl, httpOptions).map((res: Response) => {
      let result = res;
      console.log(result);
      return result;
    });
  }

  updateAP(regionId: string, AP_ID: string, body: any) {
    let apiUrl = this.baseUrl + '/' + regionId + '/access-point/' + AP_ID;
    const options = {
      headers: new HttpHeaders({
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.put(apiUrl, body, options).map((res: Response) => {
      let result = res;
      console.log(result);
      return result;
    });
  }

  createAP(id: string, locationid: string, data: object): Observable<any> {
    this.getLocalstorage();
    let apiUrl =
      this.baseUrl + '/' + id + '/access-point?locationId=' + locationid;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient
      .post(apiUrl, data, httpOptions)
      .map((res: Response) => {
        let result = res;
        console.log(result);
        return result;
      });
  }

  getAccessPoint(regionId: string, AP_ID: Array<any>) {
    this.getLocalstorage();
    let apiUrl = this.baseUrl + '/' + regionId + '/access-point/' + AP_ID;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      let result = res;
      return result;
    });
  }

  createAPG2(
    id: string,
    locationid: string,
    data: Object,
    moduleId: string
  ): Observable<any> {
    console.log(data);
    this.getLocalstorage();
    let apiUrl;
    apiUrl =
      this.baseUrl +
      '/' +
      id +
      '/access-point-group?moduleId=' +
      moduleId +
      '&locationId=' +
      locationid;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient
      .post(apiUrl, data, httpOptions)
      .map((res: Response) => {
        let result = res;
        console.log(result);
        return result;
      });
  }

  createAPG(
    id: string,
    locationid: string,
    data: object,
    templateId: string,
    moduleId: string
  ): Observable<any> {
    console.log(data, templateId);
    this.getLocalstorage();
    let apiUrl;
    if (templateId != undefined) {
      apiUrl =
        this.baseUrl +
        '/' +
        id +
        '/access-point-group?templateId=' +
        templateId +
        '&locationId=' +
        locationid;
    } else {
      apiUrl =
        this.baseUrl +
        '/' +
        id +
        '/access-point-group?moduleId=' +
        moduleId +
        '&locationId=' +
        locationid;
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient
      .post(apiUrl, data, httpOptions)
      .map((res: Response) => {
        let result = res;
        console.log(result);
        return result;
      });
  }

  deleteAPG(id, apgID) {
    this.getLocalstorage();
    let apiUrl = this.baseUrl + '/' + id + '/access-point-group/' + apgID;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    console.log(httpOptions);
    return this.httpClient.delete(apiUrl, httpOptions).map((res: Response) => {
      let result = res;
      console.log(result);
      return result;
    });
  }

  convertApgTemplate(apgID: string, data): Observable<any> {
    this.getLocalstorage();
    let apiUrl = this.baseUrl + '/apg-to-template/' + apgID;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('authorization', this.tokenType + ' ' + this.accessToken);
    let options = new RequestOptions({ headers: headers });
    return this._http.post(apiUrl, data, options).map((res: Response) => {
      let result = res;
      return result;
    });
  }

  getSingleAPG(id: string, apgID: string): Observable<any> {
    console.log(id);
    this.getLocalstorage();
    let apiUrl = this.baseUrl + '/' + id + '/access-point-group/' + apgID;
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    console.log(httpOptions);
    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      let result = res;
      return result;
    });
  }

  updateAPG(regionid: string, apgID: string, body: any, templateId: string) {
    console.log('apgID ~ ', apgID);
    console.log('body ~ ', body);
    console.log('templateId ~ ', templateId);
    let apiUrl = this.baseUrl + '/' + regionid + '/access-point-group/' + apgID;
    const options = {
      headers: new HttpHeaders({
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.put(apiUrl, body, options).map((res: Response) => {
      let result = res;
      console.log(result);
      return result;
    });
  }

  getAllFields(regionid: string) {
    let apiUrl = this.baseUrl + '/' + regionid + '/setting/user-info';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      let result = res;
      return result;
    });
  }

  createCustomField(regionid: string, data: object): Observable<any> {
    console.log(data);
    let apiUrl = this.baseUrl + '/' + regionid + '/setting/user-info';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient
      .post(apiUrl, data, httpOptions)
      .map((res: Response) => {
        console.log(res);
        let result = res;
        return result;
      });
  }

  updateCustomField(
    regionid: string,
    data: object,
    fieldId: string
  ): Observable<any> {
    console.log('fieldId', fieldId);
    let apiUrl =
      this.baseUrl + '/' + regionid + '/setting/user-info/' + fieldId;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient
      .put(apiUrl, data, httpOptions)
      .map((res: Response) => {
        let result = res;
        console.log(result);
        return result;
      });
  }

  deleteCustomField(regionid: string, id: string): Observable<any> {
    // http://dev-app.brainlitz.com/api/v1/5af915541de9052c869687a3/setting/user-info/:user_info_id
    let apiUrl = this.baseUrl + '/' + regionid + '/setting/user-info/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.delete(apiUrl, httpOptions).map((res: Response) => {
      let result = res;
      console.log(result);
      return result;
    });
  }

  invoiceOption(regionid, invoiceId, body, option) {
    console.log(regionid);
    this.getLocalstorage();
    let apiUrl = this.baseUrl + '/invoices' + '/' + invoiceId + '/' + option;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };

    console.log(httpOptions);
    console.log('authorization', this.tokenType + ' ' + this.accessToken);

    return this.httpClient
      .post(apiUrl, body, httpOptions)
      .map((res: Response) => {
        let result = res;
        console.log(result);
        return result;
      });
  }

  getCourseReport(
    regionid: string,
    type: string,
    start: string,
    end: string
  ): Observable<any> {
    let apiUrl =
      this.baseUrl +
      '/regions/' +
      regionid +
      '/report/courses/activities/' +
      type +
      '?start=' +
      start +
      '&end=' +
      end;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      let result = res;
      return result;
    });
  }
  getMASReport(regionid: string, start: string, end: string): Observable<any> {
    let apiUrl =
      this.baseUrl +
      '/regions/' +
      regionid +
      '/report/students/activities?start=' +
      start +
      '&end=' +
      end;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      let result = res;
      return result;
    });
  }
  getStaffPerformanceReport(
    regionid: string,
    type: string,
    start: string,
    end: string
  ): Observable<any> {
    let apiUrl =
      this.baseUrl +
      '/regions/' +
      regionid +
      '/report/staff/performance/' +
      type +
      '?start=' +
      start +
      '&end=' +
      end;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      let result = res;
      return result;
    });
  }
  getStaffTeachingReport(
    regionid: string,
    type: string,
    start: string,
    end: string
  ): Observable<any> {
    let apiUrl =
      this.baseUrl +
      '/regions/' +
      regionid +
      '/report/staff/schedule/' +
      type +
      '?start=' +
      start +
      '&end=' +
      end;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      let result = res;
      return result;
    });
  }
  getStudentReport(
    regionid: string,
    type: string,
    start: string,
    end: string
  ): Observable<any> {
    let apiUrl =
      this.baseUrl +
      '/regions/' +
      regionid +
      '/report/students/enrollment/' +
      type +
      '?start=' +
      start +
      '&end=' +
      end;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      let result = res;
      return result;
    });
  }

  getPaymentMethod() {
    let apiUrl = this.baseUrl + '/payment-methods';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };

    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      let result = res;
      console.log(result);
      return result;
    });
  }

  makePayment(regionId: string, body: any) {
    console.log(regionId, body);
    let apiUrl = this.baseUrl + '/' + regionId + '/payments';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };

    return this.httpClient
      .post(apiUrl, body, httpOptions)
      .map((res: Response) => {
        let result = res;
        console.log(result);
        return result;
      });
  }

  getSingleInvoice(invoiceId: string) {
    console.log('invID', invoiceId);
    let apiUrl = this.baseUrl + '/invoices/' + invoiceId;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };

    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      let result = res;
      return result;
    });
  }

  updateInvoiceInfo(invoiceId: string, body: any) {
    console.log(body);
    let apiUrl = this.baseUrl + '/invoices/' + invoiceId;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };

    return this.httpClient
      .put(apiUrl, body, httpOptions)
      .map((res: Response) => {
        let result = res;
        return result;
      });
  }

  getAllInvoices(
    regionId: string,
    limit: number,
    skip: number,
    status,
    start,
    end,
    startDue,
    endDue,
    cusList,
    sortcol,
    sortdir
  ) {
    let apiUrl =
      this.baseUrl +
      '/' +
      regionId +
      '/invoices?limit=' +
      limit +
      '&skip=' +
      skip;
    var Status = '';
    Status += status.paid ? '-PAID' : '';
    Status += status.unpaid ? '-UNPAID' : '';
    Status += status.partial ? '-PAID[PARTIAL]' : '';
    Status = Status.slice(1, Status.length);

    if (Status != '') {
      apiUrl += '&status=' + Status;
    }
    if (start != null && end != null) {
      apiUrl += '&startDate=' + start + '&endDate=' + end;
    }
    if (startDue != null && endDue != null) {
      apiUrl += '&dueDateStart=' + startDue + '&dueDateEnd=' + endDue;
    }
    if (cusList.length > 0) {
      apiUrl += '&users=';
      for (var i = 0; i < cusList.length; i++) {
        apiUrl += cusList[i].userId;
        if (i != cusList.length - 1) {
          apiUrl += ',';
        }
      }
    }
    apiUrl += '&sortDirection=' + sortdir + '&sortColumn=' + sortcol;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };

    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      let result = res;
      return result;
    });
  }

  invoicesExport(regionId: string, status: string) {
    let apiUrl =
      this.baseUrl +
      '/' +
      regionId +
      '/invoices?status=' +
      status +
      '&all=true&exportinvoices=true&getCSV=true';

    const httpoptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };

    const httpOptions: any = {
      ...httpoptions,
      responseType: 'blob',
      observe: 'response'
    };
    return this.httpClient.get(apiUrl, httpOptions);
  }

  cancelUsersFromClass(classId: string, data, global): Observable<any> {
    console.error(global);
    this.getLocalstorage();
    let apiUrl = `${this.baseUrl}/${classId}/cancel/class?passes=${global}`;
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('authorization', this.tokenType + ' ' + this.accessToken);
    let options = new RequestOptions({ headers: headers });
    return this._http.post(apiUrl, data, options).map((res: Response) => {
      let result = res;
      return result;
    });
  }

  extraLessonForCancelClass(regionId, courseId, data) {
    let apiUrl =
      this.baseUrl +
      '/regions/' +
      regionId +
      '/' +
      courseId +
      '/add-extra-lesson';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient
      .post(apiUrl, data, httpOptions)
      .map((res: Response) => {
        return res;
      });
  }

  transferClass(body: object) {
    console.log('body', body);
    let apiUrl = this.baseUrl + '/class/actions/transfer';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };

    return this.httpClient
      .post(apiUrl, body, httpOptions)
      .map((res: Response) => {
        let result = res;
        return result;
      });
  }

  makeupPassIssue(body, courseId, userId) {
    this.getLocalstorage();
    let url = this.baseUrl + '/' + courseId + '/makeup-pass/user/' + userId;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.post(url, body, httpOptions).map((res: Response) => {
      return res;
    });
  }

  getClaimPassCourses(courseid: string, limit, skip) {
    let apiUrl =
      this.baseUrl +
      '/' +
      courseid +
      '/makeup/lessons' +
      '?limit=' +
      limit +
      '&skip=' +
      skip;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      let result = res;
      return result;
    });
  }
  // http://dev-app.brainlitz.com/api/v1/5af915541de9052c869687a3/user/makeup-pass/5c3d4b9fe720c4316ec2ef3a?filter=course/5ce4d739d0747d6499c49de8

  getMakeupLists(userid, type, regionid, courseId) {
    console.log(
      '---------------------------------------------------------------'
    );
    console.log({ userid, type, regionid, courseId });
    console.log(
      '---------------------------------------------------------------'
    );
    if (type === 'course') {
      var apiUrl =
        this.baseUrl +
        '/' +
        regionid +
        '/user/makeup-pass/' +
        userid +
        '?filter=' +
        type +
        '&id=' +
        courseId;
    } else if (type === 'all') {
      var apiUrl =
        this.baseUrl + '/' + regionid + '/user/makeup-pass/' + userid;
    } else {
      var apiUrl =
        this.baseUrl +
        '/' +
        regionid +
        '/' +
        'user/makeup-pass/' +
        userid +
        '?filter=' +
        type;
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      let result = res;
      return result;
    });
  }

  enrollPass(body, userid, courseid) {
    this.getLocalstorage();
    let url = this.baseUrl + '/' + courseid + '/makeup/user/' + userid;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.post(url, body, httpOptions).map((res: Response) => {
      return res;
    });
  }

  searchMakeupCourse(keyword, courseid, limit, skip) {
    let apiUrl =
      this.baseUrl +
      '/' +
      courseid +
      '/makeup/lessons?keyword=' +
      encodeURIComponent(keyword) +
      '&limit=' +
      limit +
      '&skip=' +
      skip;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      let result = res;
      return result;
    });
  }

  getStaffSchedule(
    regionId: string,
    staffId: string,
    daysOfweek: string,
    categoryId: string
  ) {
    console.log('categoryID', categoryId);
    let apiUrl =
      this.baseUrl +
      '/' +
      regionId +
      '/staff/' +
      staffId +
      '/schedule?daysOfWeek=' +
      daysOfweek +
      '&categoryId=' +
      categoryId;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      let result = res;
      return result;
    });
  }

  markAttendance(courseId: string, body, d, m, y) {
    let apiUrl =
      this.baseUrl +
      '/' +
      courseId +
      '/attendance?date=' +
      d +
      '&month=' +
      m +
      '&year=' +
      y;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient
      .post(apiUrl, body, httpOptions)
      .map((res: Response) => {
        let result = res;
        return result;
      });
  }

  // get contents for modal gallary show
  getContent(
    regionId: string,
    p: number,
    size: number,
    keyword: string,
    type?: string
  ): Observable<any> {
    console.log(keyword, keyword.length);
    console.log(p, size);
    console.log(type);
    let url;

    if (
      (type == '' || type == undefined) &&
      (keyword == '' || keyword == undefined)
    ) {
      console.log('here');
      url =
        this.baseUrl +
        '/' +
        regionId +
        '/contents/?&page=' +
        p +
        '&size=' +
        size;
    } else {
      console.log('else');
      if (keyword && keyword.length >= 1) {
        url =
          this.baseUrl +
          '/' +
          regionId +
          '/contents/?type=' +
          type +
          '&keyword=' +
          encodeURIComponent(keyword) +
          '&page=' +
          p +
          '&size=' +
          size;
      } else {
        url =
          this.baseUrl +
          '/' +
          regionId +
          '/contents/?type=' +
          type +
          '&page=' +
          p +
          '&size=' +
          size;
      }
    }
    // http://dev-app.brainlitz.com/api/v1/5af915541de9052c869687a3/contents/?type=video&keyword=w&page=1&size=20
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(url, httpOptions).map((res: Response) => {
      let result = res;
      // console.log(result);
      return result;
    });
  }

  loadImage(regionId: string, fileArr: any): Observable<any> {
    let url = this.baseUrl + '/' + regionId + '/contents';
    let form = new FormData();
    for (var i = 0; i < fileArr.length; i++) {
      form.append('file', fileArr[i]);
    }

    const httpOptions = {
      headers: new HttpHeaders({
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.post(url, form, httpOptions).map((res: Response) => {
      let result = res;
      console.log(result);
      return result;
    });
  }
  createTagWerkz(regionId: string, data: object): Observable<any> {
    let url = this.baseUrl + '/' + regionId + '/tags';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.post(url, data, httpOptions).map((res: Response) => {
      let result = res;
      console.log(result);
      return result;
    });
  }
  getAllTags(regionID: string) {
    let apiUrl = this.baseUrl + '/' + regionID + '/tags';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      let result = res;
      return result;
    });
  }
  updateTagsWerkz(regionID: string, tagsID: string, body) {
    let apiUrl = this.baseUrl + '/' + regionID + '/tags/' + tagsID;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient
      .put(apiUrl, body, httpOptions)
      .map((res: Response) => {
        let result = res;
        return result;
      });
  }

  onDeleteContent(regionid, contentId) {
    console.log(regionid);
    let apiUrl = this.baseUrl + '/' + regionid + '/contents/' + contentId;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.delete(apiUrl, httpOptions).map((res: Response) => {
      return res;
    });
  }
  // "http://dev-app.brainlitz.com/api/v1/5af915541de9052c869687a3/tags/5c80a8b42996a1201d10c8d0"
  createPDQuestion(regionId: string, data: any) {
    let url = this.baseUrl + '/' + regionId + '/questions';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.post(url, data, httpOptions).map((res: Response) => {
      let result = res;
      console.log(result);
      return result;
    });
  }

  updatePDQuestion(regionId: string, data: any, id: string) {
    let url = this.baseUrl + '/' + regionId + '/questions/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.put(url, data, httpOptions).map((res: Response) => {
      let result = res;
      console.log(result);
      return result;
    });
  }

  createPD(regionId: string, data: any) {
    let url = this.baseUrl + '/' + regionId + '/performance-demands';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.post(url, data, httpOptions).map((res: Response) => {
      let result = res;
      console.log(result);
      return result;
    });
  }

  updatePD(regionId: string, data: any, id: any) {
    let url = this.baseUrl + '/' + regionId + '/performance-demands/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.put(url, data, httpOptions).map((res: Response) => {
      let result = res;
      console.log(result);
      return result;
    });
  }

  createConcept(regionId: string, data: any) {
    let url = this.baseUrl + '/' + regionId + '/concepts';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.post(url, data, httpOptions).map((res: Response) => {
      let result = res;
      console.log(result);
      return result;
    });
  }

  updateConcept(regionId: string, data: any, id: string) {
    let url = this.baseUrl + '/' + regionId + '/concepts/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.put(url, data, httpOptions).map((res: Response) => {
      let result = res;
      console.log(result);
      return result;
    });
  }

  getConceptById(regionId: string, id: string) {
    let apiUrl = this.baseUrl + '/' + regionId + '/concepts/' + id;
    // console.log(apiUrl)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    console.log(this.tokenType + ' ' + this.accessToken);
    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      let result = res;
      return result;
    });
  }

  getPDById(regionId: string, id: string) {
    let apiUrl = this.baseUrl + '/' + regionId + '/performance-demands/' + id;
    // console.log(apiUrl)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    // console.log(this.tokenType+' '+this.accessToken)
    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      let result = res;
      return result;
    });
  }

  getQuesById(regionId: string, id: string) {
    let apiUrl = this.baseUrl + '/' + regionId + '/questions/' + id;
    // console.log(apiUrl)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    // console.log(this.tokenType+' '+this.accessToken)
    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      let result = res;
      return result;
    });
  }

  getAllConcept(regionId: string, page, size) {
    let url =
      this.baseUrl +
      '/' +
      regionId +
      '/concepts?&page=' +
      page +
      '&size=' +
      size;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(url, httpOptions).map((res: Response) => {
      let result = res;
      console.log(result);
      return result;
    });
  }

  getAllConceptBySearch(regionId: string, keyword: string) {
    let url =
      this.baseUrl +
      '/' +
      regionId +
      '/concepts?keyword=' +
      encodeURIComponent(keyword);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(url, httpOptions).map((res: Response) => {
      let result = res;
      console.log(result);
      return result;
    });
  }

  getCollectionBySearch(regionId: string, keyword: string) {
    let url =
      this.baseUrl +
      '/' +
      regionId +
      '/assessment-plans?keyword=' +
      encodeURIComponent(keyword);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(url, httpOptions).map((res: Response) => {
      let result = res;
      console.log(result);
      return result;
    });
  }

  deleteConcept(regionId: string, conceptId: string) {
    let url = this.baseUrl + '/' + regionId + '/concepts/' + conceptId;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.delete(url, httpOptions).map((res: Response) => {
      let result = res;
      console.log(result);
      return result;
    });
  }

  getAllCollection(regionId: string, page, size) {
    let url =
      this.baseUrl +
      '/' +
      regionId +
      '/assessment-plans?&page=' +
      page +
      '&size=' +
      size;
    // let url = this.baseUrl + '/' + regionId + '/assessment-plans';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(url, httpOptions).map((res: Response) => {
      let result = res;
      console.log(result);
      return result;
    });
  }

  createCollection(regionId: string, data: any) {
    let url = this.baseUrl + '/' + regionId + '/assessment-plans';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.post(url, data, httpOptions).map((res: Response) => {
      let result = res;
      console.log(result);
      return result;
    });
  }

  getCollectionById(regionId: string, id: string) {
    let apiUrl = this.baseUrl + '/' + regionId + '/assessment-plans/' + id;
    // console.log(apiUrl)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    console.log(this.tokenType + ' ' + this.accessToken);
    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      let result = res;
      return result;
    });
  }
  // http://dev-app.brainlitz.com/api/v1/5af915541de9052c869687a3/users/5d11a61348602209d75f8c45/leaves
  getUserLeaveDetails(regionId, userId) {
    let apiUrl = this.baseUrl + '/' + regionId + '/users/' + userId + '/leaves';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      let result = res;
      return result;
    });
  }
  updateCollection(regionId: string, data: any, id: string) {
    let url = this.baseUrl + '/' + regionId + '/assessment-plans/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.put(url, data, httpOptions).map((res: Response) => {
      let result = res;
      console.log(result);
      return result;
    });
  }

  deleteCollection(regionId: string, planId: string) {
    let url = this.baseUrl + '/' + regionId + '/assessment-plans/' + planId;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.delete(url, httpOptions).map((res: Response) => {
      let result = res;
      console.log(result);
      return result;
    });
  }

  getFlexi(courseId: string, userid: string, startDate, endDate) {
    console.log(startDate, endDate);
    let apiUrl;
    if (startDate == undefined && endDate == undefined) {
      apiUrl =
        this.baseUrl +
        '/courses/' +
        courseId +
        '/users/' +
        userid +
        '/flexy-lessons';
    } else if (startDate == undefined) {
      apiUrl =
        this.baseUrl +
        '/courses/' +
        courseId +
        '/users/' +
        userid +
        '/flexy-lessons' +
        '?endAt=' +
        endDate;
    } else {
      apiUrl =
        this.baseUrl +
        '/courses/' +
        courseId +
        '/users/' +
        userid +
        '/flexy-lessons' +
        '?startFrom=' +
        startDate;
    }
    console.log(apiUrl);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      let result = res;
      console.log(res);
      return res;
    });
  }
  getEvaluationExport(apg: any, regionId: string) {
    if (apg == 'all') {
      var url =
        this.baseUrl + '/regions/' + regionId + '/apg/evaluation:export';
    } else {
      url = this.baseUrl + '/apg/' + apg._id + '/evaluation:export';
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(url, httpOptions).map((res: Response) => {
      let result = res;
      console.log(result);
      return result;
    });
  }

  getleaveCheckAvaiable(regionId: string, userid, leaveDay, meri) {
    let apiUrl =
      this.baseUrl +
      '/' +
      regionId +
      '/users/' +
      userid +
      '/leaves:check-availability' +
      '?leaveDay=' +
      leaveDay +
      '&meridian=' +
      meri;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };

    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      let result = res;
      return result;
    });
  }

  updateGrading(userId, data, regionId, courseId) {
    let apiUrl =
      this.baseUrl + '/users/' + userId + '/grading?courseId=' + courseId;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.post(apiUrl, data, httpOptions).map((res: any) => {
      console.log(res);
      return res;
    });
  }

  getAllTasksInfo(regionId, courseId) {
    let apiUrl =
      this.baseUrl + '/regions/' + regionId + '/courses/' + courseId + '/tasks';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };

    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      let result = res;
      console.log('Here All Tasks');
      console.log(result);
      return result;
    });
  }

  getClassCheckAvailable(regionId: string, userId: string, leaveDay, meridian) {
    let apiUrl =
      this.baseUrl +
      '/' +
      regionId +
      '/users/' +
      userId +
      '/class:check-availability?leaveDay=' +
      leaveDay +
      '&meridian=' +
      meridian;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };

    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      let result = res;
      return result;
    });
  }

  getleaveofuser(regionId: string, userid, start, end) {
    let apiUrl =
      this.baseUrl +
      '/' +
      regionId +
      '/users/' +
      userid +
      '/leaves' +
      '?start=' +
      start +
      '&end=' +
      end;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };

    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      let result = res;
      return result;
    });
  }
  // http://dev-app.brainlitz.com/api/v1/users/5c78a11a2aa75e0ef5ca525e/courses/5d22ebe3b731620d34b5e72b/lessons
  getRescheduleList(courseId: string, userId: string, startDate, endDate) {
    console.log(startDate, endDate, userId);
    let apiUrl;
    if (startDate === undefined && endDate === undefined) {
      apiUrl =
        this.baseUrl + '/users/' + userId + '/courses/' + courseId + '/lessons';
    } else if (startDate === undefined) {
      apiUrl =
        this.baseUrl +
        '/users/' +
        userId +
        '/courses/' +
        courseId +
        '/lessons' +
        '?endAt=' +
        endDate;
    } else {
      apiUrl =
        this.baseUrl +
        '/users/' +
        userId +
        '/courses/' +
        courseId +
        '/lessons' +
        '?startFrom=' +
        startDate;
    }
    console.log(apiUrl);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      let result = res;
      return result;
    });
  }

  createStudentReschedule(userId, courseId, lessons) {
    let url =
      this.baseUrl +
      '/users/' +
      userId +
      '/courses/' +
      courseId +
      '/timetable:reschedule';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient
      .post(url, lessons, httpOptions)
      .map((res: Response) => {
        let result = res;
        console.log(result);
        return result;
      });
  }

  assignRelief(courseId: string, lessonId: string, reliefTeacher) {
    console.log(reliefTeacher);
    let url =
      this.baseUrl +
      '/courses/' +
      courseId +
      '/lessons/' +
      lessonId +
      ':swap-teacher';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient
      .post(url, reliefTeacher, httpOptions)
      .map((res: Response) => {
        let result = res;
        console.log(result);
        return result;
      });
  }

  withdrawReliefTeacher(regionId, courseId, staffId, dateObj) {
    let url =
      this.baseUrl +
      '/regions/' +
      regionId +
      '/courses/' +
      courseId +
      '/' +
      staffId +
      '/remove-relief-teacher?day=' +
      dateObj.day +
      '&month=' +
      dateObj.month +
      '&year=' +
      dateObj.year;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };

    return this.httpClient.delete(url, httpOptions).map((res: Response) => {
      let result = res;
      return result;
    });
  }

  getAchievementsByType(userId, type) {
    let apiUrl =
      this.baseUrl +
      '/users/' +
      userId +
      '/module-types/' +
      type +
      '/achievements?includeEmptyApg=true';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };

    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      let result = res;
      return result;
    });
  }
  deleteLesson(courseID, lessonId) {
    let url = this.baseUrl + `/courses/${courseID}/lessons/${lessonId}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.delete(url, httpOptions).map((res: Response) => {
      let result = res;
      console.log('result', result);
      return result;
    });
  }

  createNewLesson(id, obj) {
    let url = this.baseUrl + `/courses/${id}/lessons/`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };

    return this.httpClient.post(url, obj, httpOptions).map((res: Response) => {
      let result = res;
      console.log('result', result);
      return result;
    });
  }

  // reschedule lesson
  updateLesson(courseId, lessonId, body) {
    let url = this.baseUrl + '/courses/' + courseId + '/lessons/' + lessonId;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.put(url, body, httpOptions).map((res: Response) => {
      console.log(res);
      return res;
    });
  }

  // today lesson
  gettodayLesson(regionId, locationid, date, word, cid) {
    var test = new Date(date);
    console.log('testing date', test);
    var day = ('0' + test.getDate()).slice(-2);
    var month = ('0' + (test.getMonth() + 1)).slice(-2);
    var year = test.getFullYear();
    let url = '';
    if (locationid == null) {
      url =
        this.baseUrl +
        '/regions/' +
        regionId +
        '/courses/today-lessons' +
        '?dd=' +
        day +
        '&mm=' +
        month +
        '&yyyy=' +
        year;
    } else {
      url =
        this.baseUrl +
        '/regions/' +
        regionId +
        '/courses/today-lessons?locationId=' +
        locationid +
        '&dd=' +
        day +
        '&mm=' +
        month +
        '&yyyy=' +
        year;
    }
    // '&date=' +
    // date.toISOString();
    if (word != null) {
      url += '&courseName=' + word;
    }
    if (cid != null) {
      url += '&coursePlanId=' + cid;
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };

    return this.httpClient.get(url, httpOptions).pipe(
      map((res: Response) => {
        let data = [];
        data.push(this.todayMapper(res));
        console.log('data', data);

        return data[0];
      })
    );
  }

  gettodayDatedLesson(regionId, locationid) {
    let url =
      this.baseUrl +
      '/regions/' +
      regionId +
      '/courses/today-lessons?locationId=' +
      locationid;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };

    return this.httpClient.get(url, httpOptions).pipe(
      map((res: Response) => {
        let data = [];
        data.push(this.todayMapper(res));
        console.log('data', data);

        return data[0];
      })
    );
  }

  todayMapper(res) {
    var data = res;
    let re = /original/gi;

    for (let i = 0; i < data.courses.length; i++) {
      if (
        data.courses[i].teacher.profilePic !=
        'https://brainlitz.s3.amazonaws.com/default/default_profile_pic.png'
      )
        data.courses[i].teacher.profilePic = data.courses[
          i
        ].teacher.profilePic.replace(re, 'l');
      // console.log(
      //   'modify data',
      //   data.courses[i].teacher.profilePic.replace(re, 'l')
      // );
      for (let j = 0; j < data.courses[i].students.length; j++) {
        if (
          data.courses[i].students[j].userDetails.profilePic !=
          'https://brainlitz.s3.amazonaws.com/default/default_profile_pic.png'
        )
          data.courses[i].students[j].userDetails.profilePic = data.courses[i]
            .students[j].userDetails.profilePic
            ? data.courses[i].students[j].userDetails.profilePic.replace(
                re,
                'l'
              )
            : 'https://brainlitz.s3.amazonaws.com/default/default_profile_pic.png';
        // console.log(
        //   'modify data2',
        //   data.courses[i].students[j].userDetails.profilePic
        // );
      }
    }
    return data;
  }

  getTeachingHours(regionId, startDate, endDate) {
    let url =
      this.baseUrl +
      '/regions/' +
      regionId +
      '/staff/teachinghours?startDate=' +
      startDate +
      '&endDate=' +
      endDate;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };

    return this.httpClient.get(url, httpOptions).map((res: Response) => {
      return res;
    });
  }
  autoEnroll(regionId, obj) {
    let url =
      this.baseUrl + '/' + regionId + '/course/user/user-autoenrollment';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };

    return this.httpClient.post(url, obj, httpOptions).map((res: Response) => {
      let result = res;
      console.log('result', result);
      return result;
    });
  }

  journalDelete(regionId, journalId, coruseId, customerId) {
    let url =
      this.baseUrl +
      `/regions/${regionId}/courses/${coruseId}/journals/${journalId}/delete-journal`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      }),
      body: { customerId }
    };
    return this.httpClient.delete(url, httpOptions).map((res: Response) => {
      let result = res;
      console.log('result', result);
      return result;
    });
  }

  setRandomPassword(regionId, data) {
    let url = this.baseUrl + '/regions/' + regionId + '/user-random-password';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.post(url, data, httpOptions).map((res: Response) => {
      return res;
    });
  }

  //for auto enrollment setting
  setAutoEnrol(regionId, data) {
    let url = this.baseUrl + '/' + regionId + '/setting/autoEnrol';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.put(url, data, httpOptions).map((res: Response) => {
      return res;
    });
  }
  userArchive(data) {
    let url =
      this.baseUrl +
      '/users/' +
      `${localStorage.getItem('userId')}` +
      '/archive-user';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.post(url, data, httpOptions).map((res: Response) => {
      return res;
    });
  }

  journalApprove(data) {
    console.log('reached service jourapp');
    let url =
      this.baseUrl +
      '/users/' +
      `${localStorage.getItem('userId')}` +
      '/journal-approve';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.post(url, data, httpOptions).map((res: Response) => {
      console.log('test100', res);
      return res;
    });
  }

  singleApprove(regionId, cId, jId, body) {
    let apiUrl =
      this.baseUrl +
      '/regions/' +
      regionId +
      '/courses/' +
      cId +
      '/journals/' +
      jId +
      '/approve-pending-journals';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };

    return this.httpClient
      .post(apiUrl, body, httpOptions)
      .map((res: Response) => {
        let result = res;
        return result;
      });
  }
  HEAD;
  singleReject(regionId, cId, jId, body) {
    let apiUrl =
      this.baseUrl +
      '/regions/' +
      regionId +
      '/courses/' +
      cId +
      '/journals/' +
      jId +
      '/reject-journals';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };

    return this.httpClient
      .post(apiUrl, body, httpOptions)
      .map((res: Response) => {
        let result = res;
        return result;
      });
  }

  rejectAllMessage(regionId, body) {
    let apiUrl = this.baseUrl + '/regions/' + regionId + '/reject-all-journals';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };

    return this.httpClient
      .post(apiUrl, body, httpOptions)
      .map((res: Response) => {
        let result = res;
        return result;
      });
  }

  aproveAllMessage(regionId, body) {
    let apiUrl =
      this.baseUrl + '/regions/' + regionId + '/approve-all-pending-journals';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };

    return this.httpClient
      .post(apiUrl, body, httpOptions)
      .map((res: Response) => {
        let result = res;
        return result;
      });
  }

  getNotificationHistory(regionId, userId) {
    let url =
      this.baseUrl +
      '/regions/' +
      regionId +
      '/users/' +
      userId +
      '/notification-history';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(url, httpOptions).map((res: Response) => {
      return res;
    });
  }

  deleteGrade(userId, gradeId) {
    let url =
      this.baseUrl +
      '/users/' +
      userId +
      '/grades/' +
      gradeId +
      '/delete-grade';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.delete(url, httpOptions).map((res: Response) => {
      return res;
    });
  }

  getStandardClass() {
    let apiUrl =
      this.baseUrl +
      '/' +
      localStorage.getItem('regionId') +
      '/standard-class-level';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      let result = res;
      return result;
    });
  }

  getassignTasks() {
    let apiUrl =
      this.baseUrl + '/' + localStorage.getItem('regionId') + '/assign-tasks';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      let result = res;
      return result;
    });
  }

  getTemplateLists(standardId, courseId, searchData) {
    let apiUrl;
    console.log(searchData);
    if (searchData) {
      console.log('here');
      apiUrl =
        this.baseUrl +
        '/regions/' +
        localStorage.getItem('regionId') +
        '/' +
        standardId +
        '/' +
        courseId +
        '/templates?search=' +
        searchData;
    } else {
      apiUrl =
        this.baseUrl +
        '/regions/' +
        localStorage.getItem('regionId') +
        '/' +
        standardId +
        '/' +
        courseId +
        '/templates';
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      let result = res;
      return result;
    });
  }

  getsingleTemplate(templateId) {
    let apiUrl =
      this.baseUrl +
      '/regions/' +
      localStorage.getItem('regionId') +
      '/' +
      templateId +
      '/template';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      let result = res;
      return result;
    });
  }

  getTaskBytemplate(templateId, startDate) {
    let apiUrl =
      this.baseUrl +
      '/regions/' +
      localStorage.getItem('regionId') +
      '/templates/' +
      templateId +
      '/tasks?startDate=' +
      startDate;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      let result = res;
      return result;
    });
  }

  getsingletaskBytemplate(templateId, taskId) {
    let apiUrl =
      this.baseUrl +
      '/regions/' +
      localStorage.getItem('regionId') +
      '/templates/' +
      templateId +
      '/tasks/' +
      taskId;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      let result = res;
      return result;
    });
  }

  getassignMode(id) {
    let apiUrl =
      this.baseUrl +
      '/' +
      localStorage.getItem('regionId') +
      '/assign-modes/' +
      id;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      let result = res;
      return result;
    });
  }

  createAssigntask(courseId, data): Observable<any> {
    let url = this.baseUrl + '/courses/' + courseId + '/assign-course-task';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.post(url, data, httpOptions).map((res: Response) => {
      let result = res;
      console.log(result);
      return result;
    });
  }

  getOverviewList() {
    let apiUrl =
      this.baseUrl +
      '/regions/' +
      localStorage.getItem('regionId') +
      '/courses/' +
      localStorage.getItem('COURSEID') +
      '/overview';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      let result = res;
      console.log('Overview data');
      return result;
    });
  }

  getOverviewMasteryList() {
    let apiUrl =
      this.baseUrl +
      '/regions/' +
      localStorage.getItem('regionId') +
      '/courses/' +
      localStorage.getItem('COURSEID') +
      '/overview/mastery-reports';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      let result = res;
      console.log('Overview Mastery data');
      return result;
    });
  }

  getMasteryReports() {
    let apiUrl =
      this.baseUrl +
      '/regions/' +
      localStorage.getItem('regionId') +
      '/courses/' +
      // '5dc292803161140e23b4de2d' +
      localStorage.getItem('COURSEID') +
      '/mastery-reports';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      return res;
    });
  }
  getMasteryQuestion(masteryId) {
    let apiUrl =
      this.baseUrl +
      '/courses/' +
      // '5dc292803161140e23b4de2d' +
      localStorage.getItem('COURSEID') +
      '/masteries/' +
      masteryId +
      '/sample-quiz';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      return res;
    });
  }

  getQuestionbymastery(courseId, masteryId) {
    let apiUrl =
      this.baseUrl +
      '/courses/' +
      courseId +
      '/masteries/' +
      masteryId +
      '/sample-quiz';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      return res;
    });
  }

  getMasteryDetailReport(masteryGroupId) {
    let apiUrl =
      this.baseUrl +
      '/regions/' +
      localStorage.getItem('regionId') +
      '/courses/' +
      localStorage.getItem('COURSEID') +
      '/mastery-reports/mastery-groups/' +
      masteryGroupId;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      return res;
    });
  }
  //https://dev-brainlitz.pagewerkz.com/api/v1/regions/5af915541de9052c869687a3/schedules/staff?categoryId=all&start=23-02-2020&end=29-02-2020&skip=0&limit=20
  getStaffList(start, end, skip, limit, id) {
    let apiUrl =
      this.baseUrl +
      '/regions/' +
      localStorage.getItem('regionId') +
      '/schedules/staff?categoryId=' +
      id +
      '&start=' +
      start +
      '&end=' +
      end +
      '&skip=' +
      skip +
      '&limit=' +
      limit;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      return res;
    });
  }
  //https://dev-brainlitz.pagewerkz.com/api/v1/regions/5af915541de9052c869687a3/schedule?staffList=5de9c8fd31f64d0013c47199,5de9c8fd31f64d0013c47199&categoryId=all&start=23-02-2020&end=29-02-2020&skip=0&limit=20
  getTimetableList(list, start, end, id) {
    console.log('stafflist in service', list);
    console.log('got id from app service', id);
    if (id == '') {
      id = 'all';
    }
    let apiUrl =
      this.baseUrl +
      '/regions/' +
      localStorage.getItem('regionId') +
      '/schedule?staffList=' +
      list +
      '&categoryId=' +
      id +
      '&start=' +
      start +
      '&end=' +
      end;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(apiUrl, httpOptions).pipe(
      map((res: Response) => {
        let data = [];
        data.push(this.mapper(res));
        console.log('data', data);

        return data[0];
      })
    );
  }

  getUsersForMastery(regionId, courseId, userMasteriesObj) {
    let apiUrl =
      this.baseUrl +
      '/regions/' +
      regionId +
      '/courses/' +
      courseId +
      '/apls-mastery-users';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };

    return this.httpClient
      .post(apiUrl, userMasteriesObj, httpOptions)
      .map((res: Response) => {
        return res;
      });
  }

  editMakeupDate(date, id, regionId) {
    let apiUrl = this.baseUrl + '/' + regionId + '/makeup-pass/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient
      .post(apiUrl, date, httpOptions)
      .map((res: Response) => {
        return res;
      });
  }

  deleteMakeup(regionid, tempid) {
    console.log(regionid);
    console.log(tempid);
    let apiUrl = this.baseUrl + '/' + regionid + '/makeup-pass/' + tempid;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.delete(apiUrl, httpOptions).map((res: Response) => {
      return res;
    });
  }

  deleteCustomer(regionid, customerid) {
    console.log(regionid);
    console.log(customerid);
    let apiUrl = this.baseUrl + '/' + regionid + '/users/' + customerid;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.delete(apiUrl, httpOptions).map((res: Response) => {
      return res;
    });
  }

  deleteStaff(regionid, staffid) {
    console.log(regionid);
    console.log(staffid);
    let apiUrl = this.baseUrl + '/' + regionid + '/users/' + staffid;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.delete(apiUrl, httpOptions).map((res: Response) => {
      return res;
    });
  }

  getAPGList(regionId, idStr) {
    let apiUrl =
      this.baseUrl + '/' + regionId + '/access-point-group-list?id=' + idStr;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      return res;
    });
  }

  deleteInvoice(id) {
    console.log(id);
    let apiUrl = this.baseUrl + '/' + 'invoices/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.delete(apiUrl, httpOptions).map((res: Response) => {
      return res;
    });
  }

  cancelLesson(body) {
    let apiUrl = this.baseUrl + '/lessons/cancel';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient
      .post(apiUrl, body, httpOptions)
      .map((res: Response) => {
        return res;
      });
  }
  private locationCache: any = null;
  setLocationCache(loc) {
    this.locationCache = loc;
  }
  getLocationCache() {
    return this.locationCache;
  }

  getSubscriptionList(regionId) {
    let apiUrl = this.baseUrl + '/' + regionId + '/subscriptions';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      return res;
    });
  }

  subscribeNewPlan(body, regionId, subId) {
    let apiUrl =
      this.baseUrl + '/' + regionId + '/subscriptions/' + subId + '/subscribe';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient
      .post(apiUrl, body, httpOptions)
      .map((res: Response) => {
        return res;
      });
  }

  getSubscribedPlans(regionId, userId) {
    let apiUrl =
      this.baseUrl +
      '/' +
      regionId +
      '/users/' +
      userId +
      '/subscriptions?skip=0&limit=30';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      return res;
    });
  }

  getLessonList(regionId, userId, subId) {
    let apiUrl =
      this.baseUrl +
      '/' +
      regionId +
      '/users/' +
      userId +
      '/subscriptions/' +
      subId +
      '/lessons';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      return res;
    });
  }

  enrollSubLesson(body, regionId, locID) {
    let apiUrl =
      this.baseUrl + '/' + regionId + '/timetable?locationId=/' + locID;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient
      .post(apiUrl, body, httpOptions)
      .map((res: Response) => {
        return res;
      });
  }

  createSubscription(body, regionId) {
    let apiUrl = this.baseUrl + '/' + regionId + '/subscriptions';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient
      .post(apiUrl, body, httpOptions)
      .map((res: Response) => {
        return res;
      });
  }

  updateSubscription(body, regionId, subId) {
    let apiUrl = this.baseUrl + '/' + regionId + '/subscriptions/' + subId;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient
      .patch(apiUrl, body, httpOptions)
      .map((res: Response) => {
        return res;
      });
  }

  getSubscriberList(regionId, subId) {
    let apiUrl =
      this.baseUrl +
      '/' +
      regionId +
      '/subscriptions/' +
      subId +
      '/subscribers';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      return res;
    });
  }

  getNotyetLoginuser(regionId) {
    let apiUrl = this.baseUrl + '/regions/' + regionId + '/not-yet-login-user';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      return res;
    });
  }

  getAlreadyLoginuser(regionId) {
    let apiUrl =
      this.baseUrl + '/regions/' + regionId + '/already-logged-in-user';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      return res;
    });
  }

  sendPasswordReset(body, regionId) {
    let apiUrl =
      this.baseUrl + '/regions/' + regionId + '/user-random-password';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient
      .post(apiUrl, body, httpOptions)
      .map((res: Response) => {
        return res;
      });
  }

  getMakeupList(filter, regionId, locationID) {
    let apiUrl =
      this.baseUrl +
      '/regions/' +
      regionId +
      '/makeup-pass?filter=' +
      filter +
      '&groupby=location';
    if (locationID != null) {
      apiUrl += '&locationId=' + locationID;
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient.get(apiUrl, httpOptions).map((res: Response) => {
      return res;
    });
  }

  undoCancelCourse(body) {
    let apiUrl = this.baseUrl + '/lessons/cancel:undo';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient
      .post(apiUrl, body, httpOptions)
      .map((res: Response) => {
        return res;
      });
  }

  migrateLocation(body) {
    let apiUrl = this.baseUrl + '/locations:migrate-to-new-location';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient
      .post(apiUrl, body, httpOptions)
      .map((res: Response) => {
        return res;
      });
  }

  resetEvaluation(userId, apgId) {
    let apiUrl = this.baseUrl + '/users/' + userId + '/evaluation:reset';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      }),
      body: {
        apgId: apgId
      }
    };
    return this.httpClient.delete(apiUrl, httpOptions).map((res: Response) => {
      return res;
    });
  }

  approveMakeupPass(courseId, userId, body) {
    let apiUrl =
      this.baseUrl +
      '/' +
      courseId +
      '/makeup/user/' +
      userId +
      '/action-approvepass';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient
      .post(apiUrl, body, httpOptions)
      .map((res: Response) => {
        return res;
      });
  }

  rejectMakeupPass(courseId, userId, body) {
    let apiUrl =
      this.baseUrl +
      '/' +
      courseId +
      '/makeup/user/' +
      userId +
      '/action-rejectpass';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: this.tokenType + ' ' + this.accessToken
      })
    };
    return this.httpClient
      .post(apiUrl, body, httpOptions)
      .map((res: Response) => {
        return res;
      });
  }
}
