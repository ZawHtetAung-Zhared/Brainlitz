import {
  Component,
  OnInit,
  HostListener,
  EventEmitter,
  Output
} from '@angular/core';
import { Location } from '@angular/common';
import { appService } from '../../service/app.service';
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
  }

  @HostListener('window:scroll', ['$event']) onScroll($event) {
    var navbar = document.getElementById('navbar');
    var list = document.getElementById('message-list');
    var allfix = document.getElementById('all-fix');
    var sticky = navbar.offsetTop;
    if (navbar || list || allfix) {
      if (window.pageYOffset > 40) {
        navbar.classList.add('sticky');
        list.classList.add('addtop');
        allfix.classList.add('addtop');
      } else {
        allfix.classList.remove('addtop');
        list.classList.remove('addtop');
        navbar.classList.remove('sticky');
      }
    }
  }

  backToCourses() {
    this.backto.emit(false);
  }

  showMessageDetail(obj, index) {
    console.log('exit');

    this.activeObj = obj;
    this.activeIndex = index;
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
    let img = new Image();
    img.src = url;
    console.log(img, 'img');
    console.log(img.width, 'width');
    console.log(img.height, 'height');
    if (img.width < 640) {
      this.smallImg = true;
      this.autoSize = {
        width: img.width + 'px',
        height: img.height + 'px',
        'border-radius': '4px'
      };
    }
    console.log(this.autoSize);
  }

  getReviewList(status) {
    console.log(status, 'status');
    this._service.getNotiList(this.regionId, status).subscribe(
      (res: any) => {
        console.log(res.journlaList);
        this.reviewList = res.journalList;
        if (status == 'NEW') this.newLength = this.reviewList.length;

        console.log(status == 'NEW');
        if (this.reviewList.length > 0) {
          this.activeIndex = 0;
          this.activeObj = this.reviewList[0];
          setTimeout(() => {
            this.checkImgSize(this.activeObj.photo);
          }, 100);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  singleApprove() {
    console.log(this.activeObj, 'active Obj');
    this.activeObj.isApproved = true;
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
        }, 1000);
      }),
      err => {
        console.log(err);
      };
  }
}
