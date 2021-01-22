import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import sampleData from './../sampleData';
import student_Data from './studentData';
import { appService } from '../../../../service/app.service';
import { DataService } from '../../../../service/data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { shallowEqual } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  private regionId = localStorage.getItem('regionId');
  private courseId = localStorage.getItem('course_id');
  public selectedMastery: any; //= this.masteriesReports[localStorage.getItem('mastery_reportId')];
  private studentlist = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  private isItemSelect: boolean = false;
  public userList = {};
  private showUserTypeArr = [];
  private modalReference;
  private loadingQuestion: boolean = false;
  private samplexml: any;

  objectKeys = Object.keys;

  constructor(
    private _location: Location,
    private _service: appService,
    private dataservice: DataService,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.selectedMastery = this.dataservice.getMasteryData();
    if (this.selectedMastery != null || this.selectedMastery != undefined) {
      console.log('get mastery data from dataservice', this.selectedMastery);
      this.getUsersForMastery(this.selectedMastery);
    } else {
      console.log('get mastery data from api');
      this.getMasteryGroupDetail();
    }
  }

  @HostListener('document:click', ['$event']) clickedOutsisde($event) {
    this.isItemSelect = false;
  }

  getMasteryGroupDetail() {
    var firstIdx =
      Number(this.router.url.indexOf('masteriesdetail')) +
      'masteriesdetail'.length;
    let masteryGroupId = this.router.url.substring(
      firstIdx + 1,
      this.router.url.indexOf('studentlist') - 1
    );
    console.log(masteryGroupId);
    var lastIdx = this.router.url.indexOf('studentlist') + 'studentlist'.length;
    let masteryId = this.router.url.substring(
      lastIdx + 1,
      this.router.url.length
    );
    console.log(masteryId);
    this._service
      .getMasteryDetailReport(masteryGroupId)
      .subscribe((res: any) => {
        let masteryGroup = res.data.masteryReport.masteries;
        for (var i in masteryGroup) {
          if (masteryGroup[i]._id == masteryId) {
            this.selectedMastery = masteryGroup[i];
            console.log(this.selectedMastery);
            this.getUsersForMastery(this.selectedMastery);
            break;
          }
        }
      });
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
    this.dataservice.setMasteryData(null);
  }

  dropDown($event: Event, userType) {
    $event.preventDefault();
    $event.stopPropagation();
    const index = this.showUserTypeArr.indexOf(userType);
    console.log('~~~', index);
    if (index > -1) {
      console.log('splice');
      this.showUserTypeArr.splice(index, 1);
    } else {
      console.log('push');
      this.showUserTypeArr.push(userType);
    }

    console.log(this.showUserTypeArr);
  }

  @ViewChild('questionModal') questionModal: any;
  openModal(masteryId) {
    this.modalReference = this.modalService.open(this.questionModal, {
      backdrop: 'static',
      windowClass:
        'jouranlModal d-flex justify-content-center align-items-center'
    });
    // this.getQuestion(masteryId);
  }

  closedQuestionModal() {
    this.modalReference.close();
  }
}
