import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Http ,Request, RequestMethod} from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Response, RequestOptions, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/Rx';
import {Subject} from 'rxjs/Subject';
declare var $: any;

@Injectable()
export class appService{
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
    locationID: Observable<any>;
    private getLocationID = new Subject<any>();

    permissionList: Observable<any>;
    private getpermissionList = new Subject<any>();

    sendData: Observable<any>;
    private sendParentToChild = new Subject<any>();
    itemValue =  new Subject();

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

    constructor( private httpClient: HttpClient, private _http: Http, private _router: Router) {
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
    }

    getPathLocal(){
      var datGet = localStorage.getItem('slicePath')
      this.sendLoginName.next(datGet);
    }

    backCat(){
      this.preCat.next(false)
    }

    backCourse(){
      this.backCo.next(false)
    }

    backCCreate(){
      this.backCC.next(false)
    }

    back(){
      this.previous.next(false)
    }

    back1(){
      this.previous.next(false)
    }

    gotoplan(){
      var val = localStorage.getItem('categoryID')
      console.log('gotoplan ',val)
      this.plan.next(val)
    }

    isLoggedIn(): boolean {
      console.log('isloggedin')
      this.tempToken = localStorage.getItem('code');
      console.log(this.tempToken)
      if(this.tempToken != null ){
        return true;
      }else{
        localStorage.clear();
        this._router.navigateByUrl('/login');
        return false;
      }
    }

    logout(){
      localStorage.clear();
      this._router.navigateByUrl('/login');
    }

    setLocationId(value) {
      this.itemValue.next(value); // this will make sure to tell every subscriber about the change.
       localStorage.setItem('theItem', value);
      let locationTemp = localStorage.getItem('theItem');
      this.getLocationID.next(locationTemp)
    }

    showPermission(data){
      this.getpermissionList.next(data)
    }

    getToken(){
      console.log('start...')
      this.tempToken = localStorage.getItem('code');
      let url = environment.apiurl + '/oauth/token' ;
      let body = {
        'grant_type': environment.grant_type,
        'code': this.tempToken,
        'redirect_uri': this.redirect_uri,
        // 'client_id': environment.client_id,
        'client_id': this.clientId,
      }
      console.log('~~~ ',body)
      let basicToken = window.btoa(this.clientId + ":" + this.clientSecret)
      const httpOptions = {
          headers: new HttpHeaders({ 'authorization': 'Basic ' + basicToken })
      };


      return this.httpClient.post(url, body, httpOptions)
      .map((res:any) => {
        console.log(res)
        this.temp = res.access_token;
        localStorage.setItem("token", this.temp);
        localStorage.setItem("tokenType", res.token_type);
      })
    }

    getLocalstorage(){
      this.accessToken = localStorage.getItem('token');
      this.tokenType = localStorage.getItem('tokenType');
      // console.log(this.accessToken)
      // if(this.accessToken == undefined){
      //   this._router.navigateByUrl('/login');
      // }
    }

    getOrgCredentials(orgCode, hostName){
      let url = this.baseUrl1 + '/organization-credentials/' + orgCode;
      const httpOptions = {
          headers: new HttpHeaders({
            'secretkey': 'PAK2jf8WrS', 'local': '1'})
      };
      const httpOptions2 = {
          headers: new HttpHeaders({
            'secretkey': 'PAK2jf8WrS'})
      };

      if(hostName == 'localhost'){
        return this.httpClient.get(url, httpOptions)
          .map((res:Response) => {
            let result = res;
            console.log(result);
            return result;
        })
      }else{
        return this.httpClient.get(url, httpOptions2)
          .map((res:Response) => {
            let result = res;
            console.log(result);
            return result;
        })
      }

    }

    getAllRegion(type: any, token: any): Observable<any>{
      this.getLocalstorage();
      let url = this.baseUrl + '/organization/user/regions';
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': type + ' ' + token})
      };
      return this.httpClient.get(url, httpOptions)
        .map((res:Response) => {
          let result = res;
          console.log(result);
          return result;
      })
    }

    getPermission(locationId: string){
      let url= this.baseUrl + '/user-location-permission/' + locationId;
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'authorization': this.tokenType + ' ' + this.accessToken})
      };
      return this.httpClient.get(url, httpOptions)
      .map((res:Response) => {
        let result = res;
        return result;
      })
    }

    getRegionalAdministrator(regionId: any, token: any, type: any): Observable<any>{
      console.log(token)
      this.getLocalstorage();
      let url = this.baseUrl + '/regions/' + regionId;
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': type + ' ' + token})
      };
      return this.httpClient.get(url, httpOptions)
        .map((res:Response) => {
          let result = res;
          console.log(result);
          return result;
      })
    }

    updateRegionalInfo(regionId:string, body: object, token: any, type: any){
      let apiUrl = this.baseUrl  + '/regions/' + regionId;
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': type + ' ' + token})
      };
      return this.httpClient.put(apiUrl,body, httpOptions)
      .map((res:Response) => {
        let result = res;
        console.log(result)
        return result;
      })
    }

    createTemplate(id, body){
      this.getLocalstorage();
      let url = this.baseUrl + '/' + id + '/access-point-template';
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': this.tokenType + ' ' + this.accessToken})
      };
      return this.httpClient.post(url, body, httpOptions)
        .map((res:Response) => {
          return res;
      })
    }

    getAllTemplate(id, limit: number, skip: number){
      this.getLocalstorage();
      let url = this.baseUrl + '/' + id + '/access-point-template?all=1&limit=' + limit + '&skip=' + skip;
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': this.tokenType + ' ' + this.accessToken})
      };
      return this.httpClient.get(url, httpOptions)
        .map((res:Response) => {
          return res;
      })
    }

    deleteTemplate(regionid, tempid){
      console.log(regionid)
      console.log(tempid)
      let apiUrl = this.baseUrl + '/' + regionid  + '/access-point-template/' + tempid;
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': this.tokenType + ' ' + this.accessToken})
      };
      return this.httpClient.delete(apiUrl, httpOptions)
      .map((res:Response) => {
        return res;
      })
    }

    getSingleTemplate(regionId, tempId){
      this.getLocalstorage();
      let url = this.baseUrl + '/' + regionId + '/access-point-template/' + tempId;
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': this.tokenType + ' ' + this.accessToken})
      };
      return this.httpClient.get(url, httpOptions)
        .map((res:Response) => {
          return res;
      })
    }

    updateSingleTemplate(regionId, body){
      console.log(body._id)
      let apiUrl = this.baseUrl + '/' + regionId + '/access-point-template/' + body._id;
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': this.tokenType + ' ' + this.accessToken})
      };
      return this.httpClient.put(apiUrl,body, httpOptions)
      .map((res:Response) => {
        let result = res;
        return result;
      })
    }

    createNoti(obj, body): Observable<any>{
      console.log(obj)
      console.log(obj.id)
      console.log(obj.active)
      console.log(obj.sendType.length)
      console.log(obj.sendType)
      console.log(obj.sendType[0])
      this.getLocalstorage();

      if(obj.sendType.length == 2){
        var url = this.baseUrl + '/noti' + '?regionId=' + obj.regionId +  '&locationId=' + obj.locationId + '&option=' + obj.option + '&sendType=noti,email' ;
      }else{
        var url = this.baseUrl + '/noti' + '?regionId=' + obj.regionId +  '&locationId=' + obj.locationId + '&option=' + obj.option + '&sendType=' + obj.sendType[0] ;
      }
      url = (obj.id != undefined) ? url + '&id=' + obj.id : url
      url = (obj.active != undefined) ? url + '&active=1' : url;



      console.log(url)
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'authorization': this.tokenType + ' ' + this.accessToken})
      };
      return this.httpClient.post(url, body, httpOptions)
      .map((res:Response) => {
        let result = res;
        console.log('service ~~ ', result);
        return result;
      })
    }

    userCount(obj): Observable<any>{
      this.getLocalstorage();
      console.log(obj)
      this.getLocalstorage();
      if(obj.id != undefined){
        var url = this.baseUrl + '/' + obj.regionId + '/' + obj.locationId + '/user/count' + '?option=' + obj.option + '&id=' + obj.id ;
      }else{
        var url = this.baseUrl + '/' + obj.regionId + '/' + obj.locationId + '/user/count' + '?option=' + obj.option ;
      }

      url = (obj.active == true) ? url + '&active=1' : url;
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'authorization': this.tokenType + ' ' + this.accessToken})
      };
      return this.httpClient.get(url, httpOptions)
      .map((res:Response) => {
        let result = res;
        return result;
      })
    }

    viewNoti(limit: number, skip: number, locationid: string): Observable<any>{
      this.getLocalstorage();
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'authorization': this.tokenType + ' ' + this.accessToken})
      };
      var url = this.baseUrl + '/noti/logs?locationId='+ locationid + '&limit=' + limit + '&skip=' + skip;
      return this.httpClient.get(url, httpOptions)
      .map((res:Response) => {
        let result = res;
        return result;
      })
    }

    getLocations(id: string, limit, skip, all): Observable<any>{
      this.getLocalstorage();
      let url;
      if(all != false){
        url = this.baseUrl + '/' + id + '/locations?all=' + all;
      }else{
        url = this.baseUrl + '/' + id + '/locations?limit=' + limit + '&skip=' + skip;
      }
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': this.tokenType + ' ' + this.accessToken})
      };
         return this.httpClient.get( url, httpOptions)
        .map((res:Response) => {
          let result = res;
          console.log(result);
          // this.sendParentToChild.next(result);
          return result;
        })
    }

    getHeaderLocations(id: string, limit, skip, all): Observable<any>{
      this.getLocalstorage();
      let url;
      if(all != false){
        url = this.baseUrl + '/' + id + '/locations?all=' + all;
      }else{
        url = this.baseUrl + '/' + id + '/locations?limit=' + limit + '&skip=' + skip;
      }
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': this.tokenType + ' ' + this.accessToken})
      };
         return this.httpClient.get( url, httpOptions)
        .map((res:Response) => {
          let result = res;
          console.log(result);
          this.sendParentToChild.next(result);
          return result;
        })
    }

    getAllUsers(id: string, type: any, limit: number, skip: number): Observable<any>{
      console.log(id, type,limit,skip)
      this.getLocalstorage();
      let url;
      if(type == 'customer'){
        url = this.baseUrl+ '/' + id + '/user?type=customer&limit=' + limit + '&skip=' + skip;
      }
      else if(type == 'staff'){
        url = this.baseUrl+ '/' + id + '/user?type=staff&limit=' + limit + '&skip=' + skip;
      }
      else {
        url = this.baseUrl+ '/' + id + '/user';
      }
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': this.tokenType + ' ' + this.accessToken})
      };
      return this.httpClient.get(url, httpOptions)
      .map((res:Response) => {
        let result = res;
        return result;
      })
    }

    getSearchUser(regionID: string, val: string,userType, limit: number, skip: number){
      let apiUrl = this.baseUrl + '/' + regionID + '/user?type='+ userType  + '&keyword=' + val + '&limit=' + limit + '&skip=' + skip;
      // let apiUrl = this.baseUrl + '/' + regionID + '/user?type='+ userType  + '&keyword=' + val;
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': this.tokenType + ' ' + this.accessToken})
      };
      return this.httpClient.get(apiUrl, httpOptions)
      .map((res:Response) => {
        let result = res;
        return result;
      })
    }

    getSearchCourse(regionID: string, val: string, location: string){
      let apiUrl = this.baseUrl + '/' + regionID + '/course/search?keyword=' + val;
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': this.tokenType + ' ' + this.accessToken})
      };
      return this.httpClient.get(apiUrl, httpOptions)
      .map((res:Response) => {
        let result = res;
        return result;
      })
    }

    getSearchCategory(regionID: string, val: string, location: string){
      let apiUrl = this.baseUrl + '/' + regionID + '/category?keyword=' + val;
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': this.tokenType + ' ' + this.accessToken})
      };
      return this.httpClient.get(apiUrl, httpOptions)
      .map((res:Response) => {
        let result = res;
        return result;
      })
    }


    getUserDetail(id:string, userId:string, locationid:string){
      console.log(id)
      console.log(userId)
      let apiUrl = this.baseUrl + '/user/' + userId + '?profileType=details&regionId=' + id + '&locationId=' + locationid;
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': this.tokenType + ' ' + this.accessToken})
      };
      return this.httpClient.get(apiUrl, httpOptions)
      .map((res:Response) => {
        let result = res;
        console.log(result)
        return result;
      })
    }

    editProfile(regionId:string, id: string){
      let apiUrl = this.baseUrl  + '/' + regionId + '/user/' + id;
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': this.tokenType + ' ' + this.accessToken})
      };
      return this.httpClient.get(apiUrl, httpOptions)
      .map((res:Response) => {
        let result = res;
        return result;
      })
    }

    getCurrentUser(id: string){
      let apiUrl = this.baseUrl  + '/user/' + id;

      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': this.tokenType + ' ' + this.accessToken})
      };
      return this.httpClient.get(apiUrl, httpOptions)
      .map((res:Response) => {
        let result = res;
        return result;
      })
    }

    createLocation(id: string, body: object, locationid: string): Observable<any>{
      this.getLocalstorage();
      console.log(id)
      console.log(body)
      let apiUrl = this.baseUrl + '/' + id + '/locations?locationId=' + locationid;
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': this.tokenType + ' ' + this.accessToken})
      };

      console.log(httpOptions)

      return this.httpClient.post(apiUrl, body, httpOptions)
        .map((res:Response) => {
          let result = res;
          return result;
        })
        // catchError(this.handleError('addProduct'))
    }

    getSingleLocation(id:string){
      let apiUrl = this.baseUrl  + '/locations/' + id;
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': this.tokenType + ' ' + this.accessToken})
      };
      return this.httpClient.get(apiUrl, httpOptions)
      .map((res:Response) => {
        let result = res;
        return result;
      })
    }

    updateLocation(id:string, body: object, locationid:string){
      console.log(id)
      console.log(body)
      let apiUrl = this.baseUrl  + '/locations/' + id + '?locationId=' + locationid;
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': this.tokenType + ' ' + this.accessToken})
      };
      return this.httpClient.put(apiUrl,body, httpOptions)
      .map((res:Response) => {
        let result = res;
        return result;
      })
    }

    deleteLocation(id:string, locationid:string){
      console.log(id)
      let apiUrl = this.baseUrl  + '/locations/' + id + '?locationId=' + locationid;
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': this.tokenType + ' ' + this.accessToken})
      };
      return this.httpClient.delete(apiUrl, httpOptions)
      .map((res:Response) => {
        let result = res;
        console.log(result)
        return result;
      })
    }

    createUser(data: object, locationid): Observable<any>{
      console.log(data)
      let apiUrl = this.baseUrl + '/signup?locationId='+ locationid;
      // let body = JSON.stringify(data);
      const opt = {
          headers: new HttpHeaders({
            'authorization': this.tokenType + ' ' + this.accessToken})
      };
      return this.httpClient.post(apiUrl, data, opt)
        .map((res:Response) => {
          let result = res;
          console.log(result)
          return result;
        })
    }

    getCategory(regionid: string, limit: number, skip: number): Observable<any>{
      this.getLocalstorage();
      console.log(regionid)
      let url = this.baseUrl + '/' + regionid + '/category?limit=' + limit + '&skip=' + skip;
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': this.tokenType + ' ' + this.accessToken})
      };

        return this.httpClient.get(url, httpOptions)
        .map((res:Response) => {
          let result = res;
          console.log(result);
          return result;
      })
    }

    createCoursePlan(id: string, locationid: string, data: object): Observable<any>{
      let url = this.baseUrl + '/' + id + '/courseplan?locationId=' + locationid;
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': this.tokenType + ' ' + this.accessToken})
      };
      return this.httpClient.post(url, data, httpOptions)
      .map((res:Response) => {
        let result = res;
        console.log(result)
        return result;
      })
    }

    deleteCoursePlan(id){
      console.log(id)
      let apiUrl = this.baseUrl  + '/courseplan/' + id;
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': this.tokenType + ' ' + this.accessToken})
      };
      return this.httpClient.delete(apiUrl, httpOptions)
      .map((res:Response) => {
        let result = res;
        console.log(result)
        return result;
      })
    }

    createCategory(data: object, id: string): Observable<any>{
      console.log(data);
      let apiUrl = this.baseUrl + '/' + id + '/category';
      const opt = {
          headers: new HttpHeaders({
            'authorization': this.tokenType + ' ' + this.accessToken})
      };

      return this.httpClient.post(apiUrl, data, opt)
      .map((res:Response) => {
        let result = res;
        console.log(result)
        return result;
      })
    }

    updateCategory(id:string, body:any){
      let apiUrl = this.baseUrl + '/category/' + id;
      const options = {
          headers: new HttpHeaders({
            'authorization': this.tokenType + ' ' + this.accessToken})
      };
      return this.httpClient.put(apiUrl,body, options)
      .map((res:Response) => {
        let result = res;
        console.log(result)
        return result;
      })
    }

    getSingleCategory(id:string,regionid:string): Observable<any>{
      console.log(id);
      this.getLocalstorage();
      let apiUrl = this.baseUrl + '/category/' + id;
      const httpOptions = {
          headers: new HttpHeaders({
            'authorization': this.tokenType + ' ' + this.accessToken})
      };
      return this.httpClient.get(apiUrl, httpOptions)
      .map((res:Response) => {
        let result = res;
        console.log(result)
        return result;
      })
    }

    getSearchAvailableCourse(regionID: string, val: string, userId:string , limit:number , skip: number){
      let apiUrl = this.baseUrl + '/' + regionID + '/available-course/' + userId + '/search?keyword=' + val + '&limit=' + limit + '&skip=' + skip;
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': this.tokenType + ' ' + this.accessToken})
      };
      return this.httpClient.get(apiUrl, httpOptions)
      .map((res:Response) => {
        let result = res;
        return result;
      })
    }

    getAvailabelCourse(regionId:string, userId:string, limit: number, skip: number){
      this.getLocalstorage();
      let url = this.baseUrl+ '/' + regionId + '/available-course/' + userId + '?limit=' + limit + '&skip=' + skip;
      const httpOptions = {
          headers: new HttpHeaders({
            'authorization': this.tokenType + ' ' + this.accessToken})
      };
      return this.httpClient.get(url, httpOptions)
      .map((res:Response) => {
        let result = res;
        return result;
      })
    }

    getAllCoursePlan(id: string,locationid: string): Observable<any>{
      this.getLocalstorage();
      console.log(id)
      let url = this.baseUrl+ '/' + id + '/courseplan?locationId='+ locationid;
      const httpOptions = {
          headers: new HttpHeaders({
            'authorization': this.tokenType + ' ' + this.accessToken})
      };
      return this.httpClient.get(url, httpOptions)
      .map((res:Response) => {
        let result = res;
        return result;
      })
    }

    createHolidays(regionid: string, locationid: string, data: object): Observable<any>{
      let url = this.baseUrl+ '/' + regionid + '/holidays?locationId=' + locationid;
      const opt = {
          headers: new HttpHeaders({
            'authorization': this.tokenType + ' ' + this.accessToken})
      };

      return this.httpClient.post(url, data, opt)
      .map((res:Response) => {
        let result = res;
        console.log(result)
        return result;
      })
    }

    updateHoliday(holidayId: string, locationid: string, data: object){
      console.log(holidayId)
      let apiUrl = this.baseUrl  + '/holidays/' + holidayId + '?locationId=' + locationid;
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': this.tokenType + ' ' + this.accessToken})
      };
      return this.httpClient.put(apiUrl,data, httpOptions)
      .map((res:Response) => {
        let result = res;
        return result;
      })
    }

    getAllHolidays(id: string): Observable<any>{
      this.getLocalstorage();
      let url = this.baseUrl+ '/' + id + '/holidays';
      const httpOptions = {
          headers: new HttpHeaders({
            'authorization': this.tokenType + ' ' + this.accessToken})
      };
      return this.httpClient.get(url, httpOptions)
      .map((res:Response) => {
        let result = res;
        console.log(result);
        return result;
      })
    }

    getSingleHoliday(holidayId:string){
      let apiUrl = this.baseUrl  + '/holidays/' + holidayId;
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': this.tokenType + ' ' + this.accessToken})
      };
      return this.httpClient.get(apiUrl, httpOptions)
      .map((res:Response) => {
        let result = res;
        return result;
      })
    }

    deleteHoliday(holidayId:string, locationid: string): Observable<any>{
      let apiUrl = this.baseUrl  + '/holidays/' + holidayId + '?locationId' + locationid;
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': this.tokenType + ' ' + this.accessToken})
      };
      return this.httpClient.delete(apiUrl, httpOptions)
      .map((res:Response) => {
        let result = res;
        console.log(result)
        return result;
      })
    }

    createHolidaysCalendar(id: string, locationid: string, data: object): Observable<any>{
      let url = this.baseUrl+ '/' + id + '/holidaysCalendar?locationId=' + locationid;
      const opt = {
          headers: new HttpHeaders({
            'authorization': this.tokenType + ' ' + this.accessToken})
      };

      return this.httpClient.post(url, data, opt)
      .map((res:Response) => {
        let result = res;
        console.log(result)
        return result;
      })
    }

    getAllHolidaysCalendar(id: string, limit: number, skip: number): Observable<any>{
      this.getLocalstorage();
      let url = this.baseUrl+ '/' + id + '/holidaysCalendar?limit=' + limit + '&skip=' + skip;
      const httpOptions = {
          headers: new HttpHeaders({
            'authorization': this.tokenType + ' ' + this.accessToken})
      };
      return this.httpClient.get(url, httpOptions)
      .map((res:Response) => {
        let result = res;
        console.log(result);
        return result;
      })
    }

    getSingleCalendar(calendarId:string): Observable<any>{
      let apiUrl = this.baseUrl  + '/holidaysCalendar/' + calendarId;
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': this.tokenType + ' ' + this.accessToken})
      };
      return this.httpClient.get(apiUrl, httpOptions)
      .map((res:Response) => {
        let result = res;
        return result;
      })
    }

    deleteCalendar(id:string): Observable<any>{
      console.log(id)
      let apiUrl = this.baseUrl  + '/holidaysCalendar/' + id;
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': this.tokenType + ' ' + this.accessToken})
      };
      return this.httpClient.delete(apiUrl, httpOptions)
      .map((res:Response) => {
        let result = res;
        console.log(result)
        return result;
      })
    }

    updateCalendar(id:string, data: object){
      console.log(data)
      let apiUrl = this.baseUrl + '/holidays-calendar/' + id;
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': this.tokenType + ' ' + this.accessToken})
      };
      return this.httpClient.put(apiUrl, data, httpOptions)
      .map((res:Response) => {
        let result = res;
        return result;
      })
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


    createCourse(id: string, data: object, save: boolean,courseID:string, isCheck: boolean, locationid:string): Observable<any>{
      console.log("APP Service");
      console.log(courseID);
      if(courseID == ""){
        console.log("tttt");
        var url = this.baseUrl + '/' + id + '/course?locationId='+ locationid +'&draft=' + save;
      }else{
        var url = this.baseUrl + '/' + id + '/course?locationId='+ locationid +'&courseId=' + courseID + '&draft=' + save;
        url = (isCheck == true) ? url + '&check=' + isCheck : url;
      }

      const httpOptions: any = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': this.tokenType + ' ' + this.accessToken
          }),
          observe: "response",
          responseType: "json"
      };
      return this.httpClient
      .post(url, data, httpOptions)
      .map((res) => {
          console.log(res)
          return res;
      })


    }

    getAllCourse(id: string, locationid:string, limit: number, skip: number): Observable<any>{
      this.getLocalstorage();
      let url = this.baseUrl+ '/' + id + '/course?locationId=' + locationid +'&limit=' + limit + '&skip=' + skip;
      const httpOptions = {
          headers: new HttpHeaders({
            'authorization': this.tokenType + ' ' + this.accessToken})
      };
      return this.httpClient.get(url, httpOptions)
      .map((res:Response) => {
        let result = res;
        console.log(result);
        return result;
      })
    }

    getSingleCourse(id:string, locationid:string): Observable<any>{
      this.getLocalstorage();
      console.log(id);
      let apiUrl = this.baseUrl + '/course/' + id + '?locationId=' + locationid;
      const httpOptions = {
          headers: new HttpHeaders({
            'authorization': this.tokenType + ' ' + this.accessToken})
      };
      return this.httpClient.get(apiUrl, httpOptions)
      .map((res:Response) => {
        let result = res;
        console.log(result)
        return result;
      })
    }

    updateCourse(id, body,locationid){
      let apiUrl = this.baseUrl + '/course/' + id + '?locationId=' + locationid;
      const httpOptions = {
          headers: new HttpHeaders({
            'authorization': this.tokenType + ' ' + this.accessToken})
      };
      return this.httpClient.put(apiUrl, body, httpOptions)
      .map((res:Response) => {
        let result = res;
        console.log(result)
        return result;
      })
    }

    deleteCourse(id){
      console.log(id);
      let apiUrl = this.baseUrl+ '/course/' +  id;
      const httpOptions = {
          headers: new HttpHeaders({
            'authorization': this.tokenType + ' ' + this.accessToken})
      };
      return this.httpClient.delete(apiUrl, httpOptions)
      .map((res:Response) => {
        let result = res;
        console.log(result)
        return result;
      })
    }

    getQuizwerkzForCourse(courseid){
      this.getLocalstorage();
      console.log('QuizwerkzForCourse',courseid);
      let apiUrl = this.baseUrl + '/course/' + courseid + '/quizwerkz';
      const httpOptions = {
          headers: new HttpHeaders({
            'authorization': this.tokenType + ' ' + this.accessToken})
      };
      return this.httpClient.get(apiUrl, httpOptions)
      .map((res:Response) => {
        let result = res;
        console.log(result)
        return result;
      })
    }

    assignUser(regionid,body,locationid){
      console.log(regionid)
      console.log(body)
      let apiUrl = this.baseUrl + '/' + regionid + '/timetable?locationId=' + locationid;

      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': this.tokenType + ' ' + this.accessToken})
      };

      console.log(httpOptions)

      return this.httpClient.post(apiUrl, body, httpOptions)
        .map((res:Response) => {
          let result = res;
          console.log(result)
          return result;
        })
    }

    getAssignUser(regionid, courseid, date, month, year){
      console.log('app service', regionid)
      console.log('app service', courseid)
      let url;
      if(date == null && month == null && year == null){
        url = this.baseUrl+ '/' + regionid + '/course/user/' + courseid;
      }else{
        url = this.baseUrl+ '/' + regionid + '/course/user/' + courseid + '?date=' + date + '&month=' + month + '&year=' + year;
      }

      const httpOptions = {
          headers: new HttpHeaders({
          'authorization': this.tokenType + ' ' + this.accessToken})
      };
      return this.httpClient.get(url, httpOptions)
      .map((res:Response) => {
        let result = res;
        console.log(result);
        return result;
      })
    }

    withdrawAssignUser(regionid,obj:any, locationid){
      console.log(regionid,obj);
      let apiUrl = this.baseUrl+ '/' + regionid + '/timetable?locationId=' + locationid;
      const httpOptions = {
          headers: new HttpHeaders({
            'authorization': this.tokenType + ' ' + this.accessToken}),
          body: obj
      };
      return this.httpClient.delete(apiUrl, httpOptions)
      .map((res:Response) => {
        let result = res;
        console.log(result)
        return result;
      })
    }

    getAllDeposit(id: string): Observable<any>{
      let url = this.baseUrl+ '/' + id + '/deposits';
      const httpOptions = {
          headers: new HttpHeaders({
            'authorization': this.tokenType + ' ' + this.accessToken})
      };
      return this.httpClient.get(url, httpOptions)
      .map((res:Response) => {
        let result = res;
        console.log(result);
        return result;
      })
    }

    getSignlecPlan(id:string){
      let apiUrl = this.baseUrl + '/courseplan/' + id;
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': this.tokenType + ' ' + this.accessToken})
      };
      return this.httpClient.get(apiUrl, httpOptions)
      .map((res:Response) => {
        let result = res;
        return result;
      })
    }

    updateSignlecPlan(id:string, data: object){
      let apiUrl = this.baseUrl + '/courseplan/' + id;
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': this.tokenType + ' ' + this.accessToken})
      };
      return this.httpClient.put(apiUrl, data, httpOptions)
      .map((res:Response) => {
        let result = res;
        return result;
      })
    }

    getAllPdf(regionId, locationid:string, limit: number, skip: number){
      console.log(skip)
      this.getLocalstorage();
      let apiUrl = this.baseUrl + '/' + regionId + '/quizwerkzs?locationId='+ locationid + '&limit=' + limit + '&skip=' + skip;
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': this.tokenType + ' ' + this.accessToken})
      };
      return this.httpClient.get(apiUrl, httpOptions)
      .map((res:Response) => {
        let result = res;
        return result;
      })
    }

    createPdf(obj, locationid){
      console.log(obj);
      let apiUrl = this.baseUrl + '/' + obj.regionId + '/quizwerkzs?locationId=' + locationid;
      const opt = {
          headers: new HttpHeaders({
            'authorization': this.tokenType + ' ' + this.accessToken})
      };

      return this.httpClient.post(apiUrl, obj, opt)
      .map((res:Response) => {
        let result = res;
        console.log(result)
        return result;
      })
    }

    deleteQuizwerkz(qwid:string, locationid:string){
      console.log(qwid);
      let apiUrl = this.baseUrl+ '/quizwerkzs/' +  qwid + '?locationId=' + locationid;
      const httpOptions = {
          headers: new HttpHeaders({
            'authorization': this.tokenType + ' ' + this.accessToken})
      };
      return this.httpClient.delete(apiUrl, httpOptions)
      .map((res:Response) => {
        let result = res;
        console.log(result)
        return result;
      })
    }

    getSingleQuizwerkz(id:string,locationid:string){
      console.log(id)
      let apiUrl = this.baseUrl + '/quizwerkzs/' + id + '?locationId=' + locationid;
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': this.tokenType + ' ' + this.accessToken})
      };
      return this.httpClient.get(apiUrl, httpOptions)
      .map((res:Response) => {
        let result = res;
        return result;
      })
    }

    updateSignleQuizwerkz(id:string, data: object, locationid:string){
      let apiUrl = this.baseUrl + '/quizwerkzs/' + id + '?locationId=' + locationid;
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': this.tokenType + ' ' + this.accessToken})
      };
      return this.httpClient.put(apiUrl, data, httpOptions)
      .map((res:Response) => {
        let result = res;
        return result;
      })
    }

    updateSignleCalendar(id:string, data: object){
      let apiUrl = this.baseUrl + '/holidaysCalendar/' + id;
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': this.tokenType + ' ' + this.accessToken})
      };
      return this.httpClient.put(apiUrl, data, httpOptions)
      .map((res:Response) => {
        let result = res;
        return result;
      })
    }

    getFeedBackList(regionId, teacherId){
      let apiUrl = this.baseUrl +'/'+ regionId + '/feedback/' + teacherId;
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': this.tokenType + ' ' + this.accessToken})
      };
      return this.httpClient.get(apiUrl, httpOptions)
      .map((res:Response) => {
        let result = res;
        return result;
      })
    }

    getRatingList(locationId: string, limit: number, skip: number){
      let apiUrl = this.baseUrl +'/'+ locationId + '/rating/staff?limit=' + limit + '&skip=' + skip;
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': this.tokenType + ' ' + this.accessToken})
      };
      return this.httpClient.get(apiUrl, httpOptions)
      .map((res:Response) => {
        let result = res;
        return result;
      })
    }

    getAllPermission(id: string){
      let apiUrl = this.baseUrl +'/'+ id + '/permissions';
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': this.tokenType + ' ' + this.accessToken})
      };
      return this.httpClient.get(apiUrl, httpOptions)
      .map((res:Response) => {
        let result = res;
        return result;
      })
    }

    userDetail(regionId: string, userId: string){
      let apiUrl = this.baseUrl +'/'+ regionId + '/user/' + userId;
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': this.tokenType + ' ' + this.accessToken})
      };
      return this.httpClient.get(apiUrl, httpOptions)
      .map((res:Response) => {
        let result = res;
        return result;
      })
    }

    updateUser(regionId, locationid, userId:string, data: object){
      let apiUrl = this.baseUrl + '/user/' + userId + '?locationId=' + locationid;
      const httpOptions = {
          headers: new HttpHeaders({

            'authorization': this.tokenType + ' ' + this.accessToken})
      };
      return this.httpClient.put(apiUrl, data, httpOptions)
      .map((res:Response) => {
        let result = res;
        return result;
      })
    }

    getAllAP(id: string){
      let apiUrl = this.baseUrl +'/'+ id + '/access-point';
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': this.tokenType + ' ' + this.accessToken})
      };
      return this.httpClient.get(apiUrl, httpOptions)
      .map((res:Response) => {
        let result = res;
        return result;
      });
    }

    getAllAPmodule(id: string, moduleId: string){
      let apiUrl = this.baseUrl +'/'+ id + '/access-point?moduleId=' + moduleId;
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': this.tokenType + ' ' + this.accessToken})
      };
      return this.httpClient.get(apiUrl, httpOptions)
      .map((res:Response) => {
        let result = res;
        return result;
      })
    }

    getAllModule(id: string){
      let apiUrl = this.baseUrl +'/'+ id + '/region/module';
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': this.tokenType + ' ' + this.accessToken})
      };
      return this.httpClient.get(apiUrl, httpOptions)
      .map((res:Response) => {
        let result = res;
        return result;
      })
    }

    visibleModule(moduleid: string, data: object){
      // console.log('token type',this.tokenType);
      // console.log('accessToken',this.accessToken);
      console.log("data",data);
      let apiUrl = this.baseUrl + '/toggle/visibility/' + moduleid;
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': this.tokenType + ' ' + this.accessToken})
      };
      return this.httpClient.put(apiUrl, data, httpOptions)
      .map((res:Response) => {
        let result = res;
        return result;
      })
    }

    getSearchApg(regionID: string, keyword: string, type: string, nin, limit:number,skip:number){
      let apiUrl;
      if(nin == ''){
        apiUrl = this.baseUrl + '/' + regionID + '/access-point-group/search?keyword=' + keyword + '&type=' + type + '&limit=' + limit + '&skip=' + skip;
      }
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': this.tokenType + ' ' + this.accessToken})
      };
      return this.httpClient.get(apiUrl, httpOptions)
      .map((res:Response) => {
        let result = res;
        return result;
      })
    }

    getAllAPG(id: string,limit:number,skip:number){
      // url = this.baseUrl+ '/' + id + '/user?type=customer&limit=' + limit + '&skip=' + skip;
      console.log("APG limit skip",limit,skip);
      let apiUrl = this.baseUrl +'/'+ id + '/access-point-group?limit=' + limit + '&skip=' + skip;
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': this.tokenType + ' ' + this.accessToken})
      };
      return this.httpClient.get(apiUrl, httpOptions)
      .map((res:Response) => {
        let result = res;
        return result;
      })
    }

    createAP(id: string, locationid:string, data: object): Observable<any>{
      this.getLocalstorage();
      let apiUrl = this.baseUrl + '/' + id + '/access-point?locationId=' + locationid;
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': this.tokenType + ' ' + this.accessToken})
      };
      return this.httpClient.post(apiUrl, data, httpOptions)
      .map((res:Response) => {
        let result = res;
        console.log(result)
        return result;
      })
    }

    createAPG(id: string, locationid:string, data: object, templateId: string, moduleId: string): Observable<any>{
      console.log(data, templateId)
      this.getLocalstorage();
      let apiUrl;
      if(templateId != undefined){
        apiUrl = this.baseUrl + '/' + id + '/access-point-group?templateId=' + templateId+ '?locationId=' + locationid;
      }
      else {
        apiUrl = this.baseUrl + '/' + id + '/access-point-group?moduleId=' + moduleId + '?locationId=' + locationid;
      }
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': this.tokenType + ' ' + this.accessToken})
      };
      return this.httpClient.post(apiUrl, data, httpOptions)
      .map((res:Response) => {
        let result = res;
        console.log(result)
        return result;
      })
    }

    deleteAPG(id, apgID){
      this.getLocalstorage();
      let apiUrl = this.baseUrl + '/' + id  + '/access-point-group/' + apgID;
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': this.tokenType + ' ' + this.accessToken})
      };
      console.log(httpOptions)
      return this.httpClient.delete(apiUrl, httpOptions)
      .map((res:Response) => {
        let result = res;
        console.log(result)
        return result;
      })
    }

    convertApgTemplate(apgID:string, data): Observable<any>{
      this.getLocalstorage();
      let apiUrl = this.baseUrl + '/apg-to-template/' + apgID;
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('authorization', this.tokenType + ' ' + this.accessToken);
      let options = new RequestOptions({ headers: headers });
      return this._http.post(apiUrl,data,options)
      .map((res:Response) => {
        let result = res;
        return result;
      })
    }

    getSingleAPG(id:string, apgID:string): Observable<any>{
      console.log(id);
      this.getLocalstorage();
      let apiUrl = this.baseUrl + '/' + id + '/access-point-group/' + apgID;
      const httpOptions = {
          headers: new HttpHeaders({
            'authorization': this.tokenType + ' ' + this.accessToken})
      };
      console.log(httpOptions)
      return this.httpClient.get(apiUrl, httpOptions)
      .map((res:Response) => {
        let result = res;
        return result;
      })
    }

    updateAPG(regionid:string, apgID:string, body:any, templateId: string){
      console.log('apgID ~ ', apgID);
      console.log('body ~ ', body);
      console.log('templateId ~ ', templateId);
      let apiUrl = this.baseUrl + '/' + regionid + '/access-point-group/' + apgID;
      const options = {
          headers: new HttpHeaders({
            'authorization': this.tokenType + ' ' + this.accessToken})
      };
      return this.httpClient.put(apiUrl,body, options)
      .map((res:Response) => {
        let result = res;
        console.log(result)
        return result;
      })
    }

    getAllFields(regionid:string){
      let apiUrl = this.baseUrl +'/'+ regionid + '/setting/user-info';
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': this.tokenType + ' ' + this.accessToken})
      };
      return this.httpClient.get(apiUrl, httpOptions)
      .map((res:Response) => {
        let result = res;
        return result;
      })
    }

    createCustomField(regionid:string, data:object): Observable<any>{
      console.log(data);
      let apiUrl = this.baseUrl +'/'+ regionid + '/setting/user-info';
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': this.tokenType + ' ' + this.accessToken})
      };
      return this.httpClient.post(apiUrl, data, httpOptions)
      .map((res:Response) => {
        console.log(res);
        let result = res;
        return result;
      })
    }

    updateCustomField(regionid:string, data:object, fieldId:string): Observable<any>{
      console.log("fieldId",fieldId);
      let apiUrl = this.baseUrl +'/'+ regionid + '/setting/user-info/' + fieldId;
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': this.tokenType + ' ' + this.accessToken})
      };
      return this.httpClient.put(apiUrl,data, httpOptions)
      .map((res:Response) => {
        let result = res;
        console.log(result)
        return result;
      })
    }

    deleteCustomField(regionid:string,id:string): Observable<any>{
      // http://dev-app.brainlitz.com/api/v1/5af915541de9052c869687a3/setting/user-info/:user_info_id
      let apiUrl = this.baseUrl +'/'+ regionid + '/setting/user-info/' + id;
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': this.tokenType + ' ' + this.accessToken})
      };
      return this.httpClient.delete(apiUrl, httpOptions)
      .map((res:Response) => {
        let result = res;
        console.log(result)
        return result;
      })
    }

    getCourseReport(regionid:string,type:string,start:string,end:string):Observable<any>{
      let apiUrl = this.baseUrl +'/regions/'+ regionid + '/report/courses/activities/' + type+"?start="+start+"&end="+end;
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'authorization': this.tokenType + ' ' + this.accessToken})
      };
      return this.httpClient.get(apiUrl, httpOptions)
        .map((res:Response) => {
          let result = res;
          console.log(result)
          return result;
        })
    }

}


