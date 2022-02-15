import { Component, OnInit, HostListener } from '@angular/core';
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
    this.getAllLocations();
  }
  ngAfterViewInit() {}
  public cusName: any = '';
  public currentSwitch: any = 'available';
  public regionID = localStorage.getItem('regionId');
  public makeupList: any = [];
  public currentPassObj: any;
  public currentMakeupPayload: any;
  public currentPayload: any;
  public modalReference: any;
  public claimModalReference: any;
  public approveModalReference: any;
  public claimCourses: Array<any> = [];
  public passForm: any = {};
  public lessonData: any;
  public isChecked: any = '';
  public checkCourse: any = '';
  public sortFlag: boolean = false;
  public locFlag: boolean = false;
  public locationID: any = null;
  public loader: boolean = true;
  public isReadMore: boolean = false;
  public showReadmoreBtn: boolean = false;

  @HostListener('document:click', ['$event']) clickout($event) {
    if (!$event.target.classList.contains('option')) {
      for (var j = 0; j < this.makeupList.length; j++) {
        this.popupOpts[j] = false;
      }
    }
    if (!$event.target.classList.contains('makeup-loc')) {
      this.locFlag = false;
    }
    console.log('clicked', $event.target.className);
  }
  searchCus() {}

  switchTab(obj) {
    this.currentSwitch = obj;
    this.getAllMakeupList();
  }
  public emptyList: boolean = false;
  getAllMakeupList() {
    this._service
      .getMakeupList(this.currentSwitch, this.regionID, this.locationID)
      .subscribe((res: any) => {
        this.loader = false;
        this.makeupList = res.makeupPassesOfRegion;
        if (this.makeupList.length == 0) this.emptyList = true;
        else this.emptyList = false;
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
    console.log('openClaimModal------');
    // this.closeModal('close');
    console.log('current obj', passObj);
    this.currentPassObj = passObj;
    this.claimModalReference = this.modalService.open(claimModal, {
      backdrop: 'static',
      windowClass: 'modal-xl d-flex justify-content-center align-items-center'
    });
    this.getClaimCourses(this.currentPassObj.courseId, 0);
  }
  public mkResult: any;
  getClaimCourses(id, skip) {
    //this.blockUI.start('Loading...');
    this.claimCourses = [];
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
    if (type == 'claim') {
      this.claimModalReference.close();
      this.modalReference.close();
    } else if (type == 'approve') this.approveModalReference.close();
    else this.modalReference.close();
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
          this.claimModalReference.close();
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
    for (var i = 0; i < this.makeupList.length; i++) {
      if (this.sortFlag) {
        this.makeupList[i].makeuppasses.sort(this.compareZA);
      }
      if (!this.sortFlag) {
        this.makeupList[i].makeuppasses.sort(this.compareAZ);
      }
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
    for (var i = 0; i < this.makeupList.length; i++) {
      if (this.sortFlag) {
        this.makeupList[i].makeuppasses.sort(this.compareDateZA);
      }
      if (!this.sortFlag) {
        this.makeupList[i].makeuppasses.sort(this.compareDateAZ);
      }
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
  public editMakeUpDate: any;
  public makeupId: any;
  oneditMakeup(editMakeup, list) {
    this.closeModal('close');
    console.log('makeup list', list);
    var dateFormat = {
      year: new Date(list.expirationDate).getFullYear(),
      month: new Date(list.expirationDate).getMonth() + 1,
      day: new Date(list.expirationDate).getDate()
    };
    console.log('date format', dateFormat);

    this.editMakeUpDate = dateFormat;
    console.log('edit makeup date', this.editMakeUpDate);

    this.makeupId = list.id;
    this.modalReference = this.modalService.open(editMakeup, {
      backdrop: 'static',
      windowClass: 'w360-modal'
    });
  }
  deleteMakeUp() {
    this._service.deleteMakeup(this.regionID, this.makeupId).subscribe(res => {
      console.log(res);
      this.makeupModalClose();
      this.getAllMakeupList();
    });
  }
  makeupModalClose() {
    this.modalReference.close();
    this.editMakeUpDate = undefined;
    this.makeupId = undefined;
  }

  editMakeupDate() {
    console.log(this.editMakeUpDate);
    let temp = {
      expiredDate: this.editMakeUpDate
    };
    this._service
      .editMakeupDate(temp, this.makeupId, this.regionID)
      .subscribe(res => {
        console.log(res);
        this.makeupModalClose();
        this.getAllMakeupList();
      });
  }
  closeDropdown(event, type, datePicker?) {
    console.log('close');
  }
  openDeleteConfirm(modal, makeup) {
    this.closeModal('close');
    this.makeupId = makeup.id;
    this.modalReference = this.modalService.open(modal, {
      backdrop: 'static',
      windowClass: 'w360-modal'
    });
  }
  delete() {
    this.deleteMakeUp();
    this.closeModal('delete');
  }
  public popupOpts: any = [];
  detailPopup(i) {
    if (this.popupOpts[i] == true) {
      this.popupOpts[i] = false;
    } else {
      for (var j = 0; j < this.makeupList.length; j++) {
        this.popupOpts[j] = false;
      }
      this.popupOpts[i] = true;
    }
    console.log('popup', this.popupOpts);
  }
  public currentMakeup: any;
  openDetailPopup(modal, makeup) {
    this.isReadMore = false;
    this.currentMakeup = makeup;
    this.modalReference = this.modalService.open(modal, {
      backdrop: 'static',
      windowClass: 'makeup-modal'
    });
    setTimeout(() => {
      let reasonHeight = document.getElementById('makeuppass-reason')
        .offsetHeight;
      console.log('reasonHeight', reasonHeight);
      if (reasonHeight > 48) this.showReadmoreBtn = true;
      else this.showReadmoreBtn = false;
    }, 200);
  }
  openLoc() {
    this.locFlag = !this.locFlag;
  }
  public locationList: any;
  public currentLoc: any = ' All locations';
  getAllLocations() {
    this._service
      .getLocations(this.regionID, 20, 0, true)
      .subscribe((res: any) => {
        console.log('Locations', res);
        this.locationList = res;
      });
  }
  selectLoc(obj) {
    console.log('selected loc', obj);
    this.locationID = obj._id;
    this.currentLoc = obj.name;
    this.getAllMakeupList();
  }
  locAllSelected() {
    this.currentLoc = ' All locations';
    this.locationID = null;
    this.getAllMakeupList();
  }
  openRejectModal(rejectModal, makeupPass) {
    this.currentPassObj = makeupPass;
    this.currentMakeupPayload = makeupPass.meta.makeupPayLoad;
    // if (this.currentMakeupPayload != undefined) {
    //   this.currentMakeupPayload['passId'] = makeupPass._id;
    // }
    this.modalReference = this.modalService.open(rejectModal, {
      backdrop: 'static',
      windowClass: 'w360-modal'
    });
  }
  rejectMakeupPass(makeupPass, makeupPayLoad) {
    console.log('rejectMakeupPass', makeupPass, makeupPayLoad);
    this.makeupId = makeupPass.id;
    this.closeModal('reject');
    this._service
      .rejectMakeupPass(
        makeupPass.courseId,
        makeupPass.studentId,
        makeupPayLoad
      )
      .subscribe(
        (res: any) => {
          console.log('res', res);
          this.getAllMakeupList();
        },
        err => {
          console.log('err', err);
          this.getAllMakeupList();
        }
      );
  }
  openApproveModal(approveModal, makeup) {
    this.currentMakeup = makeup;
    this.currentPayload = makeup.meta.makeupPayLoad;
    this.isReadMore = false;
    // if (this.currentPayload != undefined) {
    //   this.currentPayload['passId'] = makeup._id;
    // }
    this.approveModalReference = this.modalService.open(approveModal, {
      backdrop: 'static',
      windowClass: 'makeup-modal'
    });
    setTimeout(() => {
      let reasonHeight = document.getElementById('makeuppass-reason')
        .offsetHeight;
      console.log('reasonHeight', reasonHeight);
      if (reasonHeight > 48) this.showReadmoreBtn = true;
      else this.showReadmoreBtn = false;
    }, 200);
  }
  approveMakeupPass(makeupPass, makeupPayLoad) {
    console.log('approveMakeupPass', makeupPass);
    this.approveModalReference.close();
    this._service
      .approveMakeupPass(
        makeupPass.courseId,
        makeupPass.studentId,
        makeupPayLoad
      )
      .subscribe(
        (res: any) => {
          console.log('res', res);
          this.getAllMakeupList();
        },
        err => {
          console.log('err', err);
          this.getAllMakeupList();
        }
      );
  }

  readMore() {
    this.isReadMore = this.isReadMore == true ? false : true;
  }
}
