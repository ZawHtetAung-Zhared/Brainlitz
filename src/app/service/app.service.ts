import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Http, Response, RequestOptions, Headers,URLSearchParams } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/Rx';
 
@Injectable()
export class appService{
    private baseUrl = environment.apiurl;
    public temp: any;    
    public accessToken = localStorage.getItem('token');
    public tokenType = localStorage.getItem('tokenType');

    constructor( private httpClient: HttpClient) { 
      let isToken = localStorage.getItem('token');     
      this.accessToken = localStorage.getItem('token');  
      this.tokenType = localStorage.getItem('tokenType');  
    }         

    getToken(){
      let session = localStorage.getItem('code');
      let temptoken = session;
      let url = 'https://dev-brainlitz.pagewerkz.com/oauth/token' ;      
      let body = {
        'grant_type': 'authorization_code',
        'code': session,
        'redirect_uri': 'http://localhost:4200/#/',
        'client_id': 'weblocal',
      }

      const httpOptions = {
          headers: new HttpHeaders({ 'authorization': 'Basic d2VibG9jYWw6d2VibG9jYWw=' })
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
    }

    getAllRegion(type: any, token: any): Observable<any>{
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

    createCourse(id: string, data: object): Observable<any>{
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
      let apiUrl = this.baseUrl + '/' + regionid + '/category/' + id;
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

    deleteCategory(id,regionid){
      console.log(id,regionid)
      let apiUrl = this.baseUrl + '/category/' +  id;
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

    getSingleCourse(id:string,regionid:string): Observable<any>{
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

    updateCourse(id,regionid,body){
      let apiUrl = this.baseUrl + '/' + regionid + '/course' + id;
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

    deleteCourse(id, regionid){
      console.log(id,regionid);
      let apiUrl = this.baseUrl+ '/'+ regionid + '/course/' +  id;
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

}


