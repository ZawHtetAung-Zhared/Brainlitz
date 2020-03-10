import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {
  private currentTab = new BehaviorSubject('');
  currentActiveTab = this.currentTab.asObservable();

  private dataSource = new BehaviorSubject('');
  currentCourse = this.dataSource.asObservable();

  private customerId = new BehaviorSubject('');
  currentCustomer = this.customerId.asObservable();

  //data sharing
  private courseId = new BehaviorSubject('');
  cId = this.courseId.asObservable();

  private rolloverCourse = new BehaviorSubject('');
  rolloverCId = this.rolloverCourse.asObservable();

  private backtoSchedule = new BehaviorSubject('');
  categoryId = this.backtoSchedule;

  private activePlan = new BehaviorSubject('');
  currentActivePlan = this.activePlan.asObservable();

  // private courseSearchWord = new BehaviorSubject('');
  // currentCourseSearch = this.courseSearchWord.asObservable();

  private masteryData: any;

  private courseSearchWord: any;

  constructor() {}

  nevigateCourse(message: string) {
    this.dataSource.next(message);
  }

  nevigateCustomer(id: string) {
    this.customerId.next(id);
  }

  nevigateCDetail(id: string) {
    this.courseId.next(id);
  }

  nevigateSchedule(id: any) {
    this.rolloverCourse.next(id);
  }

  defineCurrentTab(tab: string) {
    this.currentTab.next(tab);
  }

  backToScheduleTable(id: any) {
    this.backtoSchedule.next(id);
  }

  navagateActivePlan(id: any) {
    this.activePlan.next(id);
  }

  setMasteryData(data) {
    this.masteryData = data;
  }

  getMasteryData() {
    return this.masteryData;
  }

  setCourseSearchWord(keyword) {
    this.courseSearchWord = keyword;
  }

  getCourseSearchWord() {
    return this.courseSearchWord;
  }
}
