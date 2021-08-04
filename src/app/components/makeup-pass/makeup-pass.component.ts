import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { appService } from '../../service/app.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-makeup-pass',
  templateUrl: './makeup-pass.component.html',
  styleUrls: ['./makeup-pass.component.css']
})
export class MakeupPassComponent implements OnInit {
  constructor(
    private _service: appService,
    private modalService: NgbModal,
    public toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getAllMakeupList();
  }
  public cusName: any = '';
  public currentSwitch: any = 'available';
  public regionID = localStorage.getItem('regionId');
  public makeupList: any = [];
  public currentPassObj: any;
  public modalReference: any;
  public claimCourses: Array<any> = [];
  public passForm: any = {};
  public lessonData: any;
  public isChecked: any = '';
  public checkCourse: any = '';
  public sortFlag: boolean = false;

  searchCus() {}

  switchTab(obj) {
    this.currentSwitch = obj;
    this.getAllMakeupList();
  }

  getAllMakeupList() {
    this._service
      .getMakeupList(this.currentSwitch, this.regionID)
      .subscribe((res: any) => {
        this.makeupList = res.makeupPassesOfRegion;
        console.log('makeup', this.makeupList);
      });
  }

  calculateDiff(dateSent) {
    let currentDate = new Date();
    dateSent = new Date(dateSent);

    return Math.floor(
      (Date.UTC(
        dateSent.getFullYear(),
        dateSent.getMonth(),
        dateSent.getDate()
      ) -
        Date.UTC(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate()
        )) /
        (1000 * 60 * 60 * 24)
    );
  }
  openClaimModal(claimModal, passObj) {
    console.log('current obj', passObj);
    this.currentPassObj = passObj;
    this.modalReference = this.modalService.open(claimModal, {
      backdrop: 'static',
      windowClass: 'modal-xl d-flex justify-content-center align-items-center'
    });
    this.getClaimCourses(this.currentPassObj.courseId, 0);
  }
  public mkResult: any;
  getClaimCourses(id, skip) {
    //this.blockUI.start('Loading...');
    this._service.getClaimPassCourses(id, 20, skip).subscribe(
      (res: any) => {
        //this.blockUI.stop();
        console.log(res);
        this.mkResult = res;
        this.claimCourses = this.claimCourses.concat(res);
        console.log('claim course', this.claimCourses);
        setTimeout(() => {
          this.scrollToLine();
        }, 1000);
      },
      err => {
        //this.blockUI.stop();
        console.log(err);
      }
    );
  }
  showMoreMakeup(skip) {
    console.log('Makeup skip', skip);
    this.getClaimCourses(this.currentPassObj.courseId, skip);
  }
  closeModal(type) {
    console.log(type);
    this.modalReference.close();
  }
  chooseDate(obj, data) {
    console.log(obj);
    console.log(data);
    this.lessonData = obj;
    this.isChecked = obj._id;
    this.checkCourse = data.courseId;
    // console.log(this.checkCourse)
  }
  enrollPass(data, courseid) {
    console.log(data);
    console.log(this.lessonData);
    let body = {
      _id: this.lessonData._id,
      startDate: this.lessonData.startDate,
      endDate: this.lessonData.endDate,
      teacherId: this.lessonData.teacherId,
      makeupCourseId: data.courseId,
      passId: this.currentPassObj._id
    };
    console.log(body);
    //this.blockUI.start('Loading...');
    this._service
      .enrollPass(
        body,
        this.currentPassObj.studentId,
        this.currentPassObj.courseId
      )
      .subscribe(
        (res: any) => {
          console.log(res);
          this.modalReference.close();
          //this.blockUI.stop();
          this.isChecked = '';
          this.checkCourse = '';
          this.toastr.success('Successfully passed.');
          this.getAllMakeupList();
        },
        err => {
          console.log(err);
          // this.toastr.error('Claim pass failed.');
          this.toastr.error(err.error.message);
          //this.blockUI.stop();
          this.isChecked = '';
          this.checkCourse = '';
          this.modalReference.close();
        }
      );
  }
  sortByCus() {
    this.sortFlag = !this.sortFlag;
    if (this.sortFlag) {
      this.makeupList.sort(this.compareZA);
    }
    if (!this.sortFlag) {
      this.makeupList.sort(this.compareAZ);
    }
  }
  compareAZ(a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }
  compareZA(a, b) {
    if (a.name < b.name) {
      return 1;
    }
    if (a.name > b.name) {
      return -1;
    }
    return 0;
  }
  sortByDate() {
    this.sortFlag = !this.sortFlag;
    if (this.sortFlag) {
      this.makeupList.sort(this.compareDateZA);
    }
    if (!this.sortFlag) {
      this.makeupList.sort(this.compareDateAZ);
    }
  }

  compareDateAZ(a, b) {
    if (a.expirationDate < b.expirationDate) {
      return -1;
    }
    if (a.expirationDate > b.expirationDate) {
      return 1;
    }
    return 0;
  }
  compareDateZA(a, b) {
    if (a.expirationDate < b.expirationDate) {
      return 1;
    }
    if (a.expirationDate > b.expirationDate) {
      return -1;
    }
    return 0;
  }
  scrollToLine() {
    for (var i = 0; i < this.claimCourses.length; i++) {
      console.log(
        'position from left',
        document.getElementById('line-' + i).offsetLeft
      );
      document.getElementById('timeline-' + i).scrollLeft =
        document.getElementById('line-' + i).offsetLeft - 80;
    }
  }
  forward(target) {
    console.log('----', target);
    event.preventDefault();
    $('#' + target).animate(
      {
        scrollLeft: '+=150px'
      },
      'slow'
    );
  }

  backward(target) {
    console.log('----', target);
    event.preventDefault();
    $('#' + target).animate(
      {
        scrollLeft: '-=200px'
      },
      'slow'
    );
  }
  searchMakeup_input(keyword) {
    if (keyword.length == 0) {
      this.searchMakeup(keyword);
    }
  }
  public mkSearchFlag: boolean = false;
  searchMakeup(keyword) {
    if (keyword.length > 0) {
      this.mkSearchFlag = true;
      //this.blockUI.start('Loading...');
      this._service
        .searchMakeupCourse(keyword, this.currentPassObj.courseId, 20, 0)
        .subscribe(
          (res: any) => {
            console.log(res);
            //this.blockUI.stop();
            this.claimCourses = res;
          },
          err => {
            //this.blockUI.stop();
            console.log(err);
          }
        );
    } else {
      this.claimCourses = [];
      this.mkSearchFlag = false;
      this.getClaimCourses(this.currentPassObj.courseId, 0);
    }
  }
}
