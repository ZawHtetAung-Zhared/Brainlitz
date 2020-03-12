import { Component, OnInit, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import sampleData from './../sampleData';
import student_Data from './studentData';
import { appService } from '../../../../service/app.service';
import { DataService } from '../../../../service/data.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  private regionId = localStorage.getItem('regionId');
  private courseId = localStorage.getItem('course_id');
  private selectedMastery: any; //= this.masteriesReports[localStorage.getItem('mastery_reportId')];
  private itemId = localStorage.getItem('mastery_itemId');
  private studentlist = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  private isItemSelect: boolean = false;
  private userList = {};
  private showUserTypeArr = [];
  objectKeys = Object.keys;

  constructor(
    private _location: Location,
    private _service: appService,
    private dataservice: DataService
  ) {}

  ngOnInit() {
    // this.selectedMastery = this.dataservice.getMasteryData();
    this.selectedMastery = JSON.parse(localStorage.getItem('userMastery'));
    console.log(this.selectedMastery);
    this.getUsersForMastery(this.selectedMastery);
  }

  @HostListener('document:click', ['$event']) clickedOutsisde($event) {
    this.isItemSelect = false;
  }

  getUsersForMastery(mastery) {
    let userMasteriesObj = {
      struggling: mastery.userMasteries.STRUGGLE.users,
      notStarted: mastery.userMasteries.NEW.users,
      inconslusive: mastery.userMasteries.INPROGRESS.users,
      masteredWithdifficult:
        mastery.userMasteries.MASTERED_WITH_DIFFICULT.users,
      masteredWithEase: mastery.userMasteries.MASTERED_WITH_EASE.users
    };
    console.log('userMasteriesObj', userMasteriesObj);
    this._service
      .getUsersForMastery(this.regionId, this.courseId, userMasteriesObj)
      .subscribe((res: any) => {
        this.userList = res;
        console.log('user list for mastery', res);
      });
  }

  backTo() {
    this._location.back();
    // this.dataservice.setMasteryData(null);
    localStorage.removeItem('mastery_itemId');
  }

  dropDown($event: Event, userType) {
    $event.preventDefault();
    $event.stopPropagation();
    const index = this.showUserTypeArr.indexOf(userType);
    if (index > -1) {
      console.log('splice');
      this.showUserTypeArr.splice(index, 1);
    } else {
      console.log('push');
      this.showUserTypeArr.push(userType);
    }

    console.log(this.showUserTypeArr);
  }
}
