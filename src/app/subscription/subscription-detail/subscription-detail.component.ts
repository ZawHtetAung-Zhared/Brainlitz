import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  NgbModal,
  ModalDismissReasons,
  NgbDateAdapter,
  NgbDatepickerConfig,
  NgbCalendar,
  NgbDateStruct
} from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { appService } from '../../service/app.service';

@Component({
  selector: 'app-subscription-detail',
  templateUrl: './subscription-detail.component.html',
  styleUrls: ['./subscription-detail.component.css']
})
export class SubscriptionDetailComponent implements OnInit {
  @Output() flag = new EventEmitter<any>();
  @Input() planInfo;

  public modalReference: any;
  public lessonFlag: boolean = false;
  public todayCourse: any = [];
  public regionID = localStorage.getItem('regionId');
  public locationID = localStorage.getItem('locationId');
  public todayDate: any;

  public mock: any = {
    date: {
      startDate: '2021-01-29T00:00:00.000Z',
      endDate: '2021-01-29T23:59:59.000Z'
    },
    courses: [
      {
        _id: '5e5892abe180ad00124bb1fd',
        type: 'FLEXY',
        repeatDays: [0, 1, 4, 5, 6],
        assistants: [],
        courseCode: '234',
        name: 'Dance Class',
        startDate: '2020-02-26T01:59:00.000Z',
        todayLesson: {
          cancel: false,
          _id: '5f4397edde4b6c0217e52fb2',
          startDate: '2021-01-29T01:59:00.000Z',
          endDate: '2021-01-29T03:29:00.000Z',
          teacherId: '5e2ab3ebf2e1cc02042326d0'
        },
        teacher: {
          _id: '5e2ab3ebf2e1cc02042326d0',
          fullName: 'Thiri T2',
          preferredName: 'Caroline',
          position: '',
          profilePic:
            'https://brainlitz.s3.amazonaws.com/production/classwerkz/profile/157985687481353575188_original.jpg'
        },
        location: {
          _id: '5e2ab399f2e1cc02042326a4',
          textColorHex: '#1E5900',
          backgroundColorHex: '#C4FFA6',
          regionId: '5bb43a50e007941066a9cf8f',
          name: 'Marvel Universe',
          phoneNumber: {
            countryCode: 65,
            number: null,
            countryName: 'sg'
          },
          createdDate: '2020-01-24T09:06:33.302Z',
          updatedDate: '2020-03-05T09:53:38.012Z',
          __v: 0
        },
        students: [
          {
            _id: '5f4397ecde4b6c0217e52e30',
            userType: 'CUSTOMER',
            userDetails: {
              _id: '5d845e5e12ec4656ee7e3e47',
              position: '',
              profilePic:
                'https://brainlitz.s3.amazonaws.com/production/classwerkz/profile/156896441873192583677_original.jpg',
              fullName: 'Sophia Apollo',
              preferredName: 'Sophia Apollo'
            },
            todayLesson: {
              assistants: [],
              cancel: false,
              attendance: true,
              autoEnrolledLesson: false,
              _id: '5f4397ecde4b6c0217e52e9e',
              startDate: '2021-01-29T01:59:00.000Z',
              endDate: '2021-01-29T03:29:00.000Z',
              teacherId: '5e2ab3ebf2e1cc02042326d0',
              makeup: false,
              rescheduledLesson: false
            }
          },
          {
            _id: '5e589393e180ad00124bb223',
            userType: 'CUSTOMER',
            userDetails: {
              _id: '5e2ab006f2e1cc02042324d7',
              position: '',
              profilePic:
                'https://brainlitz.s3.amazonaws.com/production/classwerkz/profile/157985591446041334058_original.jpg',
              fullName: 'Hazel',
              preferredName: 'Hazel'
            },
            todayLesson: {
              assistants: [],
              cancel: false,
              attendance: null,
              autoEnrolledLesson: true,
              _id: '5fdc1b3ac1f7ac0281c02de9',
              startDate: '2021-01-29T01:59:00.000Z',
              endDate: '2021-01-29T03:29:00.000Z',
              teacherId: '5e2ab3ebf2e1cc02042326d0'
            }
          }
        ],
        attendance: {
          present: 1,
          noData: 1,
          absent: 0,
          total: 2
        },
        lessonDuration: {
          startDate: '2021-01-29T01:59:00.000Z',
          endDate: '2021-01-29T03:29:00.000Z'
        }
      },
      {
        _id: '5e2ab44ff2e1cc02042326ea',
        type: 'FLEXY',
        repeatDays: [1, 2, 3, 4, 5],
        assistants: [],
        courseCode: 'a1',
        name: 'Know Your Power',
        startDate: '2020-01-24T08:30:00.000Z',
        todayLesson: {
          cancel: false,
          _id: '5fea9bbff7b9c145dd20a1e3',
          startDate: '2021-01-29T08:30:00.000Z',
          endDate: '2021-01-29T09:30:00.000Z',
          teacherId: '5e2aab14f2e1cc0204232055'
        },
        teacher: {
          _id: '5e2aab14f2e1cc0204232055',
          fullName: 'Charles Professor',
          preferredName: 'Charles',
          position: '',
          profilePic:
            'https://brainlitz.s3.amazonaws.com/production/classwerkz/profile/157985475129392745130_original.jpg'
        },
        location: {
          _id: '5e2ab399f2e1cc02042326a4',
          textColorHex: '#1E5900',
          backgroundColorHex: '#C4FFA6',
          regionId: '5bb43a50e007941066a9cf8f',
          name: 'Marvel Universe',
          phoneNumber: {
            countryCode: 65,
            number: null,
            countryName: 'sg'
          },
          createdDate: '2020-01-24T09:06:33.302Z',
          updatedDate: '2020-03-05T09:53:38.012Z',
          __v: 0
        },
        students: [
          {
            _id: '5e2ab6a8f2e1cc0204232981',
            userType: 'CUSTOMER',
            userDetails: {
              _id: '5e2ab1dcf2e1cc02042325a5',
              position: '',
              profilePic:
                'https://brainlitz.s3.amazonaws.com/production/classwerkz/profile/157985634781589436395_original.jpg',
              fullName: 'Dead Pool',
              preferredName: 'Dead Pool'
            },
            todayLesson: {
              assistants: [],
              cancel: false,
              attendance: null,
              autoEnrolledLesson: true,
              _id: '5fea9bc2f7b9c145dd20a1f7',
              startDate: '2021-01-29T08:30:00.000Z',
              endDate: '2021-01-29T09:30:00.000Z',
              teacherId: '5e2aab14f2e1cc0204232055'
            }
          },
          {
            _id: '5e2ab700f2e1cc02042329d7',
            userType: 'CUSTOMER',
            userDetails: {
              _id: '5e2ab26ef2e1cc0204232601',
              position: '',
              profilePic:
                'https://brainlitz.s3.amazonaws.com/production/classwerkz/profile/157985649443634114644_original.jpg',
              fullName: 'Loki',
              preferredName: 'Loki'
            },
            todayLesson: {
              assistants: [],
              cancel: false,
              attendance: null,
              autoEnrolledLesson: true,
              _id: '5fea9bc4f7b9c145dd20a1ff',
              startDate: '2021-01-29T08:30:00.000Z',
              endDate: '2021-01-29T09:30:00.000Z',
              teacherId: '5e2aab14f2e1cc0204232055'
            }
          },
          {
            _id: '5e2ab498f2e1cc0204232717',
            userType: 'CUSTOMER',
            userDetails: {
              _id: '5e2ab33bf2e1cc0204232687',
              position: '',
              profilePic:
                'https://brainlitz.s3.amazonaws.com/production/classwerkz/profile/157985669878853870785_original.jpg',
              fullName: 'Storm',
              preferredName: 'Storm'
            },
            todayLesson: {
              assistants: [],
              cancel: false,
              attendance: null,
              autoEnrolledLesson: true,
              _id: '5fea9bbff7b9c145dd20a1de',
              startDate: '2021-01-29T08:30:00.000Z',
              endDate: '2021-01-29T09:30:00.000Z',
              teacherId: '5e2aab14f2e1cc0204232055'
            }
          },
          {
            _id: '5e2ab685f2e1cc020423296c',
            userType: 'CUSTOMER',
            userDetails: {
              _id: '5e2ab147f2e1cc020423254b',
              position: '',
              profilePic:
                'https://brainlitz.s3.amazonaws.com/production/classwerkz/profile/157985619947081356620_original.jpg',
              fullName: 'Spider',
              preferredName: 'Spidy'
            },
            todayLesson: {
              assistants: [],
              cancel: false,
              attendance: null,
              autoEnrolledLesson: true,
              _id: '5fea9bc1f7b9c145dd20a1ef',
              startDate: '2021-01-29T08:30:00.000Z',
              endDate: '2021-01-29T09:30:00.000Z',
              teacherId: '5e2aab14f2e1cc0204232055'
            }
          }
        ],
        attendance: {
          present: 0,
          noData: 4,
          absent: 0,
          total: 4
        },
        lessonDuration: {
          startDate: '2021-01-29T08:30:00.000Z',
          endDate: '2021-01-29T09:30:00.000Z'
        }
      },
      {
        _id: '5e2abdd5f2e1cc0204232d26',
        type: 'FLEXY',
        repeatDays: [1, 2, 3, 4, 5],
        assistants: [],
        courseCode: 'a2',
        name: 'Using Power Level - 1',
        startDate: '2020-01-01T10:00:00.000Z',
        todayLesson: {
          cancel: false,
          _id: '5fb48e96af4b04362ea4e2d0',
          startDate: '2021-01-29T10:00:00.000Z',
          endDate: '2021-01-29T12:00:00.000Z',
          teacherId: '5e2aac30f2e1cc02042322aa'
        },
        teacher: {
          _id: '5e2aac30f2e1cc02042322aa',
          fullName: 'Magneto Professor',
          preferredName: 'Magneto',
          position: '',
          profilePic:
            'https://brainlitz.s3.amazonaws.com/production/classwerkz/profile/157985489633440330804_original.jpg'
        },
        location: {
          _id: '5e2ab399f2e1cc02042326a4',
          textColorHex: '#1E5900',
          backgroundColorHex: '#C4FFA6',
          regionId: '5bb43a50e007941066a9cf8f',
          name: 'Marvel Universe',
          phoneNumber: {
            countryCode: 65,
            number: null,
            countryName: 'sg'
          },
          createdDate: '2020-01-24T09:06:33.302Z',
          updatedDate: '2020-03-05T09:53:38.012Z',
          __v: 0
        },
        students: [
          {
            _id: '5e2abe34f2e1cc0204232daf',
            userType: 'CUSTOMER',
            userDetails: {
              _id: '5e2aba5cf2e1cc0204232c37',
              position: '',
              profilePic:
                'https://brainlitz.s3.amazonaws.com/production/classwerkz/profile/157985852404032740580_original.jpg',
              fullName: 'Black Widow',
              preferredName: 'Black Widow'
            },
            todayLesson: {
              assistants: [],
              cancel: false,
              attendance: null,
              autoEnrolledLesson: true,
              _id: '5fb48e95af4b04362ea4e2a8',
              startDate: '2021-01-29T10:00:00.000Z',
              endDate: '2021-01-29T12:00:00.000Z',
              teacherId: '5e2aac30f2e1cc02042322aa'
            }
          }
        ],
        attendance: {
          present: 0,
          noData: 1,
          absent: 0,
          total: 1
        },
        lessonDuration: {
          startDate: '2021-01-29T10:00:00.000Z',
          endDate: '2021-01-29T12:00:00.000Z'
        }
      }
    ]
  };
  public selectedCourse: any = null;

  constructor(
    private modalService: NgbModal,
    private _service: appService,
    private _Activatedroute: ActivatedRoute,
    public toastr: ToastrService
  ) {}

  ngOnInit() {
    this.todayDate = new Date();
    this.getLessons();
  }

  backClicked() {
    this.flag.emit();
  }

  enrollLesson(modal) {
    this.getTodayLesson();
    this.modalReference = this.modalService.open(modal, {
      backdrop: 'static',
      windowClass:
        'modal-xl modal-inv d-flex justify-content-center align-items-center'
    });
  }

  continue() {
    this.lessonFlag = true;
    console.log('zha testing', this.lessonFlag);
  }

  lessonbackClicked() {
    this.lessonFlag = false;
    console.log('zha testing', this.lessonFlag);
  }

  selectCourse(obj) {
    this.selectedCourse = obj;
    console.log('selected', obj);
  }

  getTodayLesson() {
    this._service
      .gettodayLesson(this.regionID, this.locationID, this.todayDate)
      .subscribe(
        (res: any) => {
          console.log(this.todayCourse);

          this.todayCourse = res;
          console.log('tday lessons', this.todayCourse);
        },
        err => {
          console.log(err);
        }
      );
  }
  public lessonList: any = [];
  getLessons() {
    this._service
      .getLessonList(
        this.regionID,
        this._Activatedroute.snapshot.paramMap.get('userid'),
        this.planInfo._id
      )
      .subscribe(
        (res: any) => {
          console.log(res);
          this.lessonList = res;
          console.log('subbed lessons', this.lessonList);
        },
        err => {
          console.log(err);
        }
      );
  }
}
