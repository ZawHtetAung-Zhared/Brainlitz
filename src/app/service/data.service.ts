import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

  private dataSource = new BehaviorSubject('');
  currentCourse = this.dataSource.asObservable();

  private customerId = new BehaviorSubject('');
  currentCustomer = this.customerId.asObservable();

  //data sharing
    private courseId = new BehaviorSubject('');
    cId = this.courseId.asObservable();

  constructor() { }

  nevigateCourse(message: string) {
    this.dataSource.next(message)
  }

  nevigateCustomer(id:string){
  	this.customerId.next(id);
  }

  nevigateCDetail(id:string){
      this.courseId.next(id);
    }

}