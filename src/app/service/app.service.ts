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

    createUser(data: object): Observable<any>{
    	console.log(data)
    	let apiUrl = this.baseUrl + '/signup';
    	let body = JSON.stringify(data);
    	const opt = {
	        headers: new HttpHeaders({ 'authorization':'Bearer eyJhbGciOiJIUzI1NiJ9.M2RRNklOYllNdXlDcHZ6SmJHbE5PNnJnZlNGV21hajM.kgjNrlDmqQDnawrIo-ShBOJdtkknPtxgyzk92Ukdl-4' })
	    };
	    return this.httpClient.post(apiUrl, body, opt)
      	.map((res:Response) => {
      	  let result = res; 
      	  console.log(result)
      	  return result;
      	})
    }

}