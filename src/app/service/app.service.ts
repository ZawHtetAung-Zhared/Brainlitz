import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { environment } from '../../environments/environment';

// const httpOptions = {
//     headers: new HttpHeaders({ 'authorization':'Bearer eyJhbGciOiJIUzI1NiJ9.M2RRNklOYllNdXlDcHZ6SmJHbE5PNnJnZlNGV21hajM.kgjNrlDmqQDnawrIo-ShBOJdtkknPtxgyzk92Ukdl-4'})
// };
 
@Injectable()
export class appService{
    constructor(private httpClient: HttpClient) {}
    private baseUrl = environment.apiurl;

    public reqHeader = new Headers({
	    'Content-Type': 'application/json',
	    'authorization':'Bearer eyJhbGciOiJIUzI1NiJ9.M2RRNklOYllNdXlDcHZ6SmJHbE5PNnJnZlNGV21hajM.kgjNrlDmqQDnawrIo-ShBOJdtkknPtxgyzk92Ukdl-4'
	});

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

}