import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Http, Response, RequestOptions, Headers,URLSearchParams } from '@angular/http';
import { environment } from '../../environments/environment';

// const httpOptions = {
//     headers: new HttpHeaders({ 'authorization':'Bearer eyJhbGciOiJIUzI1NiJ9.MmpNT0JsRXE0c0lDN3VqRWRqMEZ0Z01YcFhsWWpGdEc.82xgonmzzknNruGVax04d3khcJt06h4VCZIY8PAzgzA'})
// };
 
@Injectable()
export class appService{
    constructor( private httpClient: HttpClient) {      
      this.getToken();
    }   
    
    private baseUrl = environment.apiurl;
    public accessToken: any;

    // public headers = new HttpHeaders({
    //     "Authorization": "Bearer " + this.oauthService.getAccessToken()
    // });  

    getToken(){
      let session = localStorage.getItem('code');
      let temptoken = session;
      console.log(temptoken);
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
      .subscribe((res:any) => {
        console.log(res)
        this.accessToken = res.access_token;
      });
    }

    getAllRegion(id: string): Observable<any>{
      console.log(id);
      let url = this.baseUrl + '/' + id + '/regions';
      const httpOptions = {
          headers: new HttpHeaders({ 
            'Content-Type': 'application/json', 
            'authorization':'Bearer ' })
      };
      return this.httpClient.get(url, httpOptions)
        .map((res:Response) => {
          let result = res;
          console.log(result);        
          return result;
      }) 
    }

    getLocations(id: string): Observable<any>{
    	let url = this.baseUrl + '/' + id + '/locations';
  		const httpOptions = {
  	        headers: new HttpHeaders({ 'Content-Type': 'application/json', 'authorization':'Bearer eyJhbGciOiJIUzI1NiJ9.MmpNT0JsRXE0c0lDN3VqRWRqMEZ0Z01YcFhsWWpGdEc.82xgonmzzknNruGVax04d3khcJt06h4VCZIY8PAzgzA' })
  	    };
         	return this.httpClient.get(url, httpOptions)
        	.map((res:Response) => {
  	        let result = res;
  	        console.log(result);        
  	        return result;
  	    }) 
      }

    getAllUsers(id: string): Observable<any>{
      console.log(id)
      let url = this.baseUrl+ '/' + id + '/user';
      const httpOptions = {
        headers: new HttpHeaders({ 'authorization':'Bearer eyJhbGciOiJIUzI1NiJ9.MmpNT0JsRXE0c0lDN3VqRWRqMEZ0Z01YcFhsWWpGdEc.82xgonmzzknNruGVax04d3khcJt06h4VCZIY8PAzgzA' })
      };
      return this.httpClient.get(url, httpOptions)
      .map((res:Response) => {
        let result = res;
        console.log(result);        
        return result;
    }) 
    }

    createLocation(id: string, body: object): Observable<any>{
    	console.log(id)
    	console.log(body)
    	let apiUrl = this.baseUrl + '/' + id + '/locations';

    	const httpOptions = {
	        headers: new HttpHeaders({ 'Content-Type': 'application/json', 'authorization':'Bearer eyJhbGciOiJIUzI1NiJ9.MmpNT0JsRXE0c0lDN3VqRWRqMEZ0Z01YcFhsWWpGdEc.82xgonmzzknNruGVax04d3khcJt06h4VCZIY8PAzgzA' })
	    };

	    console.log(httpOptions)

    	return this.httpClient.post(apiUrl, body, httpOptions)
      	.map((res:Response) => {
      	  let result = res; 
      	  console.log(result)
      	  return result;
      	})
      	// catchError(this.handleError('addProduct'))
    }

    getSingleLocation(id:string){
      let apiUrl = this.baseUrl  + '/locations/' + id;
      const httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json', 'authorization':'Bearer eyJhbGciOiJIUzI1NiJ9.MmpNT0JsRXE0c0lDN3VqRWRqMEZ0Z01YcFhsWWpGdEc.82xgonmzzknNruGVax04d3khcJt06h4VCZIY8PAzgzA' })
      };
      return this.httpClient.get(apiUrl, httpOptions)
      .map((res:Response) => {
        let result = res; 
        console.log(result)
        return result;
      })
    }

    updateLocation(id:string, body: object){
      console.log(id)
      console.log(body)
      let apiUrl = this.baseUrl  + '/locations/' + id;
      const httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json', 'authorization':'Bearer eyJhbGciOiJIUzI1NiJ9.MmpNT0JsRXE0c0lDN3VqRWRqMEZ0Z01YcFhsWWpGdEc.82xgonmzzknNruGVax04d3khcJt06h4VCZIY8PAzgzA' })
      };
      return this.httpClient.put(apiUrl,body, httpOptions)
      .map((res:Response) => {
        let result = res; 
        console.log(result)
        return result;
      })
    }

    deleteLocation(id){
      console.log(id)
      let apiUrl = this.baseUrl  + '/locations/' + id;
      const httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json', 'authorization':'Bearer eyJhbGciOiJIUzI1NiJ9.MmpNT0JsRXE0c0lDN3VqRWRqMEZ0Z01YcFhsWWpGdEc.82xgonmzzknNruGVax04d3khcJt06h4VCZIY8PAzgzA' })
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
	        headers: new HttpHeaders({ 'authorization':'Bearer eyJhbGciOiJIUzI1NiJ9.MmpNT0JsRXE0c0lDN3VqRWRqMEZ0Z01YcFhsWWpGdEc.82xgonmzzknNruGVax04d3khcJt06h4VCZIY8PAzgzA' })
	    };
	    return this.httpClient.post(apiUrl, data, opt)
      	.map((res:Response) => {
      	  let result = res; 
      	  console.log(result)
      	  return result;
      	})
    }

    getCategory(id: string): Observable<any>{
      console.log(id)
      let url = this.baseUrl + '/' + id + '/category';
      const httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json', 'authorization':'Bearer eyJhbGciOiJIUzI1NiJ9.MmpNT0JsRXE0c0lDN3VqRWRqMEZ0Z01YcFhsWWpGdEc.82xgonmzzknNruGVax04d3khcJt06h4VCZIY8PAzgzA' })
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
          headers: new HttpHeaders({ 'Content-Type': 'application/json', 'authorization':'Bearer eyJhbGciOiJIUzI1NiJ9.MmpNT0JsRXE0c0lDN3VqRWRqMEZ0Z01YcFhsWWpGdEc.82xgonmzzknNruGVax04d3khcJt06h4VCZIY8PAzgzA' })
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
          headers: new HttpHeaders({ 'Content-Type': 'application/json', 'authorization':'Bearer eyJhbGciOiJIUzI1NiJ9.MmpNT0JsRXE0c0lDN3VqRWRqMEZ0Z01YcFhsWWpGdEc.82xgonmzzknNruGVax04d3khcJt06h4VCZIY8PAzgzA' })
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
          headers: new HttpHeaders({ 'Content-Type': 'application/json', 'authorization':'Bearer eyJhbGciOiJIUzI1NiJ9.MmpNT0JsRXE0c0lDN3VqRWRqMEZ0Z01YcFhsWWpGdEc.82xgonmzzknNruGVax04d3khcJt06h4VCZIY8PAzgzA' })
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
          headers: new HttpHeaders({ 'authorization':'Bearer eyJhbGciOiJIUzI1NiJ9.MmpNT0JsRXE0c0lDN3VqRWRqMEZ0Z01YcFhsWWpGdEc.82xgonmzzknNruGVax04d3khcJt06h4VCZIY8PAzgzA' })
      };

      return this.httpClient.post(apiUrl, data, opt)
      .map((res:Response) => {
        let result = res; 
        console.log(result)
        return result;
      })
    }

    getAllCoursePlan(id: string): Observable<any>{
      console.log(id)
      let url = this.baseUrl+ '/' + id + '/courseplan';
      const httpOptions = {
        headers: new HttpHeaders({ 'authorization':'Bearer eyJhbGciOiJIUzI1NiJ9.MmpNT0JsRXE0c0lDN3VqRWRqMEZ0Z01YcFhsWWpGdEc.82xgonmzzknNruGVax04d3khcJt06h4VCZIY8PAzgzA' })
      };
      return this.httpClient.get(url, httpOptions)
      .map((res:Response) => {
        let result = res;
        console.log(result);        
        return result;
    }) 
    }

    getAllCourse(id: string): Observable<any>{
      let url = this.baseUrl+ '/' + id + '/course';
      const httpOptions = {
        headers: new HttpHeaders({ 'authorization':'Bearer eyJhbGciOiJIUzI1NiJ9.MmpNT0JsRXE0c0lDN3VqRWRqMEZ0Z01YcFhsWWpGdEc.82xgonmzzknNruGVax04d3khcJt06h4VCZIY8PAzgzA' })
      };
      return this.httpClient.get(url, httpOptions)
      .map((res:Response) => {
        let result = res;
        console.log(result);        
        return result;
      }) 
    }
}
