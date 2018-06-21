import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Http ,Request, RequestMethod} from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Response, RequestOptions, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/Rx';
import {Subject} from 'rxjs/Subject';
 
@Injectable()
export class appService{
    private baseUrl = environment.apiurl + '/api/v1';
    public temp: any;    
    public tempToken: any;    
    public accessToken = localStorage.getItem('token');
    public tokenType = localStorage.getItem('tokenType');


    sendData: Observable<any>;
    private sendParentToChild = new Subject<any>();
    itemValue = new Subject();

    constructor( private httpClient: HttpClient, private _router: Router) { 
      let isToken = localStorage.getItem('token');     
      this.accessToken = localStorage.getItem('token');  
      this.tokenType = localStorage.getItem('tokenType');  
      this.sendData = this.sendParentToChild.asObservable();
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
    }

    getToken(){
      console.log('start...')
      this.tempToken = localStorage.getItem('code');
      let url = environment.apiurl + '/oauth/token' ;      
      let body = {
        'grant_type': environment.grant_type,
        'code': this.tempToken,
        'redirect_uri': environment.redirect_uri,
        'client_id': environment.client_id,
      }
      console.log('~~~ ',body)
      let basicToken = window.btoa(environment.client_id + ":" + environment.client_id)
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
      console.log(this.accessToken) 
      // if(this.accessToken == undefined){
      //   this._router.navigateByUrl('/login');
      // }
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

    createNoti(obj, body): Observable<any>{ 
      console.log(obj)     
      console.log(obj.id)     
      this.getLocalstorage();
      if(obj.id != undefined){
        var url = this.baseUrl + '/noti' + '?regionId=' + obj.regionId +  '&locationId=' + obj.locationId + '&option=' + obj.option + '&id=' + obj.id  ;
      }else{
        var url = this.baseUrl + '/noti' + '?regionId=' + obj.regionId +  '&locationId=' + obj.locationId + '&option=' + obj.option   ;
      }

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

    viewNoti(regionID:string): Observable<any>{
      console.log(regionID)
      this.getLocalstorage();
      const httpOptions = {
        headers: new HttpHeaders({  
          'Content-Type': 'application/json',
          'authorization': this.tokenType + ' ' + this.accessToken})
      };
      var url = this.baseUrl + '/noti?regionId=' + regionID;
      return this.httpClient.get(url, httpOptions)
      .map((res:Response) => {
        let result = res; 
        return result;
      })
    }

    getLocations(id: string): Observable<any>{
      this.getLocalstorage();
      let url = this.baseUrl + '/' + id + '/locations';
      const httpOptions = {
          headers: new HttpHeaders({ 
            'Content-Type': 'application/json', 
            'authorization': this.tokenType + ' ' + this.accessToken})
      };
         return this.httpClient.get(url, httpOptions)
        .map((res:Response) => {
          let result = res;
          console.log(result);  
          this.sendParentToChild.next(result);  
          return result;
        }) 
      }

    getAllUsers(id: string): Observable<any>{
      this.getLocalstorage();
      console.log(id)
      let url = this.baseUrl+ '/' + id + '/user';
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

    createLocation(id: string, body: object): Observable<any>{
      this.getLocalstorage();
      console.log(id)
      console.log(body)
      let apiUrl = this.baseUrl + '/' + id + '/locations';
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

    updateLocation(id:string, body: object){
      console.log(id)
      console.log(body)
      let apiUrl = this.baseUrl  + '/locations/' + id;
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

    deleteLocation(id){
      console.log(id)
      let apiUrl = this.baseUrl  + '/locations/' + id;
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

    createUser(data: object): Observable<any>{
      console.log(data)
      let apiUrl = this.baseUrl + '/signup';
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

    getCategory(regionid: string): Observable<any>{
      this.getLocalstorage();
      console.log(regionid)
      let url = this.baseUrl + '/' + regionid + '/category';
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
    
    createCoursePlan(id: string, data: object): Observable<any>{
      let url = this.baseUrl + '/' + id + '/courseplan';
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

    getAllCoursePlan(id: string): Observable<any>{
      this.getLocalstorage();
      console.log(id)
      let url = this.baseUrl+ '/' + id + '/courseplan';
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

    createHolidays(id: string, data: object): Observable<any>{
      let url = this.baseUrl+ '/' + id + '/holidays';
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

    updateHoliday(holidayId: string, data: object){
      let apiUrl = this.baseUrl  + '/holidays/' + holidayId;
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

    deleteHoliday(holidayId:string): Observable<any>{
      let apiUrl = this.baseUrl  + '/holidays/' + holidayId;
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

    createHolidaysCalendar(id: string, data: object): Observable<any>{
      let url = this.baseUrl+ '/' + id + '/holidaysCalendar';
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

    getAllHolidaysCalendar(id: string): Observable<any>{
      this.getLocalstorage();
      let url = this.baseUrl+ '/' + id + '/holidaysCalendar';
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

    createCourse(id: string, data: object): Observable<any>{
      console.log("APP Service")
      let url = this.baseUrl + '/' + id + '/course';
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

    getAllCourse(id: string): Observable<any>{
      this.getLocalstorage();
      let url = this.baseUrl+ '/' + id + '/course';
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

    getSingleCourse(id:string): Observable<any>{
      this.getLocalstorage();
      console.log(id);
      let apiUrl = this.baseUrl + '/course/' + id;
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

    updateCourse(id, body){
      let apiUrl = this.baseUrl + '/course/' + id;
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

    assignUser(regionid,body){
      console.log(regionid)
      console.log(body)
      let apiUrl = this.baseUrl + '/' + regionid + '/timetable';

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

    getAssignUser(regionid,courseid){
      let url = this.baseUrl+ '/' + regionid + '/course/user/' + courseid;
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

    withdrawAssignUser(regionid,obj:any){
      console.log(regionid,obj);
      let apiUrl = this.baseUrl+ '/' + regionid + '/timetable';
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

    getAllPdf(regionId){
      console.log(regionId)
      this.getLocalstorage();
      let apiUrl = this.baseUrl + '/' + regionId + '/quizwerkzs';
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

    createPdf(obj){
      console.log(obj);
      let apiUrl = this.baseUrl + '/' + obj.regionId + '/quizwerkzs';
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

    deleteQuizwerkz(qwid){
      console.log(qwid);
      let apiUrl = this.baseUrl+ '/quizwerkzs/' +  qwid;
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

    getSingleQuizwerkz(id:string){
      console.log(id)
      let apiUrl = this.baseUrl + '/quizwerkzs/' + id;
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

    updateSignleQuizwerkz(id:string, data: object){
      let apiUrl = this.baseUrl + '/quizwerkzs/' + id;
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

    getRatingList(locationId: string){
      let apiUrl = this.baseUrl +'/'+ locationId + '/rating/staff';
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

}


