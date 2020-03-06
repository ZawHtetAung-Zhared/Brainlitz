import {
  Component,
  OnInit,
  HostListener,
  EventEmitter,
  Output
} from '@angular/core';
import { Location } from '@angular/common';
import { appService } from '../../service/app.service';
declare var $: any;

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  public activeType: any = 'NEW';
  public activeIndex: any;
  public activeObj: any;
  public regionId: any = localStorage.getItem('regionId');
  public reviewList = [];
  public newLength: any;
  @Output() backto = new EventEmitter();

  constructor(private _location: Location, private _service: appService) {}

  ngOnInit() {
    this.getReviewList(this.activeType);
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    console.log(this.screenHeight, 'screen height');
  }

  public dyanmicTop: any = {};
  public dyanmicTop2: any = {};

  @HostListener('window:scroll', ['$event']) onScroll($event) {
    var navbar = document.getElementById('navbar');
    console.log('page offset', window.pageYOffset);
    this.dyanmicTop = {
      top: 184 - window.pageYOffset + 'px'
    };

    if (navbar) {
      if (window.pageYOffset > 120) {
        navbar.classList.add('sticky');
        // list.classList.add('addtop');
        // allfix.classList.add('addtop');
        this.dyanmicTop2 = {
          top: 224 - window.pageYOffset + 'px'
        };
      } else {
        // allfix.classList.remove('addtop');
        // list.classList.remove('addtop');
        navbar.classList.remove('sticky');
        this.dyanmicTop2 = {};
      }
    }
  }

  backToCourses() {
    this.backto.emit(false);
  }

  showMessageDetail(obj, index) {
    this.onScroll(undefined);
    console.log('exit');

    this.activeObj = obj;
    this.activeIndex = index;

    if (this.activeObj.photo) this.checkImgSize(obj.photo);
    console.log(this.activeObj);
  }
  backClicked() {
    this._location.back();
  }

  goToPrev() {
    console.log(this.activeIndex, 'active id');
    console.log(this.reviewList.length - 1);
    if (this.activeIndex == 0) {
      this.activeObj = this.reviewList[this.activeIndex];
    } else {
      this.activeIndex = this.activeIndex - 1;
      this.activeObj = this.reviewList[this.activeIndex];
    }
    console.log(this.activeIndex);
  }

  goToNex() {
    console.log(this.activeIndex, 'active id');
    if (this.reviewList.length - 1 != this.activeIndex) {
      this.activeIndex = this.activeIndex + 1;
      this.activeObj = this.reviewList[this.activeIndex];
    }
    console.log(this.activeIndex);
  }

  clickMsgType() {
    console.log(this.activeType);
    if (this.activeType == 'APPROVED') {
      this.getReviewList(this.activeType);
    } else if (this.activeType == 'NEW') {
      this.getReviewList(this.activeType);
    } else {
      this.getReviewList(this.activeType);
    }
  }

  public smallImg: boolean = false;
  public autoSize: any = {};
  checkImgSize(url) {
    console.log(url, 'img url');
    let img = new Image();
    img.src = url;
    console.log(img, 'img');

    $(img).one('load', function() {
      if (img.width < 640) {
        this.smallImg = true;
        this.autoSize = {
          width: img.width + 'px',
          height: img.height + 'px',
          'border-radius': '4px'
        };
      }
    });
    console.log(this.autoSize);
  }

  getReviewList(status) {
    console.log(status, 'status');
    console.log(this.activeType);
    new Promise((resolve, reject) => {
      this._service.getNotiList(this.regionId, status).subscribe(
        (res: any) => {
          console.log(res.journlaList);

          if (this.activeType == 'APPROVED' || this.activeType == 'REJECT') {
            if (status == 'NEW') this.newLength = res.journalList.length;
            else this.reviewList = res.journalList;
          } else {
            this.reviewList = res.journalList;
            this.newLength = this.reviewList.length;
          }

          console.log(status == 'NEW');
          if (this.reviewList.length > 0) {
            this.activeIndex = 0;
            this.activeObj = this.reviewList[0];
            setTimeout(() => {
              if (this.activeObj.photo) this.checkImgSize(this.activeObj.photo);
            }, 100);
          }
          resolve(true);
        },
        err => {
          console.log(err);
          reject(err);
        }
      );
    });
  }
  public isDisable: boolean = false;
  singleApprove() {
    console.log(this.activeObj, 'active Obj');
    this.activeObj.isApproved = true;
    this.activeObj.approvedAgo = '1m ago';
    this.isDisable = true;
    this._service
      .singleApprove(
        this.regionId,
        this.activeObj.course.courseId,
        this.activeObj._id,
        this.activeObj
      )
      .subscribe((res: any) => {
        console.log(res);
        setTimeout(() => {
          this.getReviewList(this.activeType);
          this.isDisable = false;
        }, 1000);
      }),
      err => {
        console.log(err);
      };
  }

  undoReview() {
    console.log(this.activeType, 'active Obj');
    this.isDisable = true;
    if (this.activeType == 'APPROVED') {
      this.activeObj.isApproved = false;
      this._service
        .singleApprove(
          this.regionId,
          this.activeObj.course.courseId,
          this.activeObj._id,
          this.activeObj
        )
        .subscribe((res: any) => {
          console.log(res);
          setTimeout(async () => {
            await this.getReviewList(this.activeType);
            await this.getReviewList('NEW');
            this.isDisable = false;
          }, 1000);
        }),
        err => {
          console.log(err);
        };
    } else {
      this.activeObj.isReject = false;
      this._service
        .singleReject(
          this.regionId,
          this.activeObj.course.courseId,
          this.activeObj._id,
          this.activeObj
        )
        .subscribe((res: any) => {
          console.log(res);
          setTimeout(() => {
            this.getReviewList(this.activeType);
            this.getReviewList('NEW');
            this.isDisable = false;
          }, 1000);
        }),
        err => {
          console.log(err);
        };
    }
  }

  singleReject() {
    this.activeObj.isReject = true;
    this.activeObj.rejectedAgo = '1m ago';
    this.isDisable = true;
    this._service
      .singleReject(
        this.regionId,
        this.activeObj.course.courseId,
        this.activeObj._id,
        this.activeObj
      )
      .subscribe((res: any) => {
        console.log(res);
        setTimeout(() => {
          this.getReviewList(this.activeType);
          this.isDisable = false;
        }, 1000);
      }),
      err => {
        console.log(err);
      };
  }

  rejectAll() {
    let temp = { isReject: true };
    this._service
      .rejectAllMessage(this.regionId, temp)
      .subscribe((res: any) => {
        console.log(res);
        setTimeout(() => {
          this.getReviewList(this.activeType);
        }, 1000);
      }),
      err => {
        console.log(err);
      };
  }

  approveAll() {
    let temp = { isApproved: true };
    this._service
      .aproveAllMessage(this.regionId, temp)
      .subscribe((res: any) => {
        console.log(res);
        setTimeout(() => {
          this.getReviewList(this.activeType);
        }, 1000);
      }),
      err => {
        console.log(err);
      };
  }

  public screenHeight: any;
  public screenWidth: any;
  @HostListener('window:resize', ['$event'])
  onScreenSize() {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    console.log(this.screenHeight, 'screen height');
  }
}
