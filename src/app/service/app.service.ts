import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Http, Response, RequestOptions, Headers,URLSearchParams } from '@angular/http';
import { environment } from '../../environments/environment';
import { OAuthService } from 'angular-oauth2-oidc';

// const httpOptions = {
//     headers: new HttpHeaders({ 'authorization':'Bearer eyJhbGciOiJIUzI1NiJ9.M2RRNklOYllNdXlDcHZ6SmJHbE5PNnJnZlNGV21hajM.kgjNrlDmqQDnawrIo-ShBOJdtkknPtxgyzk92Ukdl-4'})
// };
 
@Injectable()
export class appService{
    constructor(private oauthService: OAuthService, private httpClient: HttpClient) {}
    private baseUrl = environment.apiurl;

    public headers = new HttpHeaders({
        "Authorization": "Bearer " + this.oauthService.getAccessToken()
    });


    private handleData(res: Response) {
      let body = res.json();
      console.log(body)
      return body;
    }

    private handleError (error: any) {
      // In a real world app, we might use a remote logging infrastructure
      // We'd also dig deeper into the error to get a better message
      let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
      return Observable.throw(errMsg);
    }

    getLocations(id: string): Observable<any>{
    	let url = this.baseUrl + '/' + id + '/locations';
  		const httpOptions = {
  	        headers: new HttpHeaders({ 'Content-Type': 'application/json', 'authorization':'Bearer eyJhbGciOiJIUzI1NiJ9.M2RRNklOYllNdXlDcHZ6SmJHbE5PNnJnZlNGV21hajM.kgjNrlDmqQDnawrIo-ShBOJdtkknPtxgyzk92Ukdl-4' })
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
        headers: new HttpHeaders({ 'authorization':'Bearer eyJhbGciOiJIUzI1NiJ9.M2RRNklOYllNdXlDcHZ6SmJHbE5PNnJnZlNGV21hajM.kgjNrlDmqQDnawrIo-ShBOJdtkknPtxgyzk92Ukdl-4' })
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
	        headers: new HttpHeaders({ 'Content-Type': 'application/json', 'authorization':'Bearer eyJhbGciOiJIUzI1NiJ9.M2RRNklOYllNdXlDcHZ6SmJHbE5PNnJnZlNGV21hajM.kgjNrlDmqQDnawrIo-ShBOJdtkknPtxgyzk92Ukdl-4' })
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
          headers: new HttpHeaders({ 'Content-Type': 'application/json', 'authorization':'Bearer eyJhbGciOiJIUzI1NiJ9.M2RRNklOYllNdXlDcHZ6SmJHbE5PNnJnZlNGV21hajM.kgjNrlDmqQDnawrIo-ShBOJdtkknPtxgyzk92Ukdl-4' })
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
          headers: new HttpHeaders({ 'Content-Type': 'application/json', 'authorization':'Bearer eyJhbGciOiJIUzI1NiJ9.M2RRNklOYllNdXlDcHZ6SmJHbE5PNnJnZlNGV21hajM.kgjNrlDmqQDnawrIo-ShBOJdtkknPtxgyzk92Ukdl-4' })
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
          headers: new HttpHeaders({ 'Content-Type': 'application/json', 'authorization':'Bearer eyJhbGciOiJIUzI1NiJ9.M2RRNklOYllNdXlDcHZ6SmJHbE5PNnJnZlNGV21hajM.kgjNrlDmqQDnawrIo-ShBOJdtkknPtxgyzk92Ukdl-4' })
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
	        headers: new HttpHeaders({ 'authorization':'Bearer eyJhbGciOiJIUzI1NiJ9.M2RRNklOYllNdXlDcHZ6SmJHbE5PNnJnZlNGV21hajM.kgjNrlDmqQDnawrIo-ShBOJdtkknPtxgyzk92Ukdl-4' })
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
          headers: new HttpHeaders({ 'Content-Type': 'application/json', 'authorization':'Bearer eyJhbGciOiJIUzI1NiJ9.M2RRNklOYllNdXlDcHZ6SmJHbE5PNnJnZlNGV21hajM.kgjNrlDmqQDnawrIo-ShBOJdtkknPtxgyzk92Ukdl-4' })
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
          headers: new HttpHeaders({ 'Content-Type': 'application/json', 'authorization':'Bearer eyJhbGciOiJIUzI1NiJ9.M2RRNklOYllNdXlDcHZ6SmJHbE5PNnJnZlNGV21hajM.kgjNrlDmqQDnawrIo-ShBOJdtkknPtxgyzk92Ukdl-4' })
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
          headers: new HttpHeaders({ 'Content-Type': 'application/json', 'authorization':'Bearer eyJhbGciOiJIUzI1NiJ9.M2RRNklOYllNdXlDcHZ6SmJHbE5PNnJnZlNGV21hajM.kgjNrlDmqQDnawrIo-ShBOJdtkknPtxgyzk92Ukdl-4' })
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
          headers: new HttpHeaders({ 'Content-Type': 'application/json', 'authorization':'Bearer eyJhbGciOiJIUzI1NiJ9.M2RRNklOYllNdXlDcHZ6SmJHbE5PNnJnZlNGV21hajM.kgjNrlDmqQDnawrIo-ShBOJdtkknPtxgyzk92Ukdl-4' })
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
          headers: new HttpHeaders({ 'authorization':'Bearer eyJhbGciOiJIUzI1NiJ9.M2RRNklOYllNdXlDcHZ6SmJHbE5PNnJnZlNGV21hajM.kgjNrlDmqQDnawrIo-ShBOJdtkknPtxgyzk92Ukdl-4' })
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
        headers: new HttpHeaders({ 'authorization':'Bearer eyJhbGciOiJIUzI1NiJ9.M2RRNklOYllNdXlDcHZ6SmJHbE5PNnJnZlNGV21hajM.kgjNrlDmqQDnawrIo-ShBOJdtkknPtxgyzk92Ukdl-4' })
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
        headers: new HttpHeaders({ 'authorization':'Bearer eyJhbGciOiJIUzI1NiJ9.M2RRNklOYllNdXlDcHZ6SmJHbE5PNnJnZlNGV21hajM.kgjNrlDmqQDnawrIo-ShBOJdtkknPtxgyzk92Ukdl-4' })
      };
      return this.httpClient.get(url, httpOptions)
      .map((res:Response) => {
        let result = res;
        console.log(result);        
        return result;
      }) 
    }
}
