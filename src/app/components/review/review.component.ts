import {
  Component,
  OnInit,
  HostListener,
  EventEmitter,
  Output
} from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  public activeType: any = 'New';
  public activeId: any;
  public activeObj: any;
  public reviewList = [
    {
      _id: '5df1ef3d31ce9f0014a15563',
      title: 'Attendance',
      type: 3,
      teacherOnly: false,
      isApproved: false,
      message:
        'Attendance confirmed for Yoga Beginner Class, December 12, 2019 8:00 PM;',
      type_detail: {
        attendance: true,
        date: '2019-12-12T09:41:49.000Z'
      },
      sender: {
        preferredName: 'Arron Walm TEST',
        profilePic:
          'https://brainlitz-dev.s3.amazonaws.com/profile/153024702410236101155153024710196819002479153024835851660964289153025062134548629028_original.jpg',
        senderId: '5b063ee136f2e0f83cdbac8c'
      },
      student: {
        preferredName: 'Rachel',
        profilePic:
          'https://brainlitz-dev.s3.amazonaws.com/development/stgbl-cw1/profile/15755371584864828423_original.jpg',
        studentId: '5de8ca0631f64d0013c2bd39'
      },
      course: {
        courseCode: 'Yogayago',
        name: 'Yoga Beginner Class',
        courseId: '5de8caad31f64d0013c2bd40'
      }
    },
    {
      _id: '5df1ef3d31ce9f0014a15565',
      title: 'Attendance',
      type: 3,
      teacherOnly: false,
      isApproved: false,
      message:
        'Attendance confirmed for Yoga Beginner Class, December 12, 2019 8:00 PM;',
      type_detail: {
        attendance: true,
        date: '2019-12-12T09:41:49.000Z'
      },
      sender: {
        preferredName: 'John',
        profilePic:
          'https://brainlitz-dev.s3.amazonaws.com/profile/153024702410236101155153024710196819002479153024835851660964289153025062134548629028_original.jpg',
        senderId: '5b063ee136f2e0f83cdbac8c'
      },
      student: {
        preferredName: 'June',
        profilePic:
          'https://brainlitz-dev.s3.amazonaws.com/development/stgbl-cw1/profile/15755371584864828423_original.jpg',
        studentId: '5de8ca0631f64d0013c2bd39'
      },
      course: {
        courseCode: 'Yogayago',
        name: 'Yoga Beginner Class',
        courseId: '5de8caad31f64d0013c2bd40'
      }
    }
  ];

  @Output() backto = new EventEmitter();

  constructor() {}

  ngOnInit() {
    if (this.reviewList.length > 0) {
      this.activeId = this.reviewList[0]._id;
      this.activeObj = this.reviewList[0];
    }
  }

  @HostListener('window:scroll', ['$event']) onScroll($event) {
    var navbar = document.getElementById('navbar');
    var list = document.getElementById('message-list');
    var allfix = document.getElementById('all-fix');
    var sticky = navbar.offsetTop;
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

  backToCourses() {
    this.backto.emit(false);
  }

  showMessageDetail(obj) {
    console.log('exit');
    this.activeId = obj._id;
    this.activeObj = obj;
    console.log(this.activeId);
  }
}
