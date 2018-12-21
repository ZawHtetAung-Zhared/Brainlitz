import { Component, OnInit, ViewContainerRef, EventEmitter,AfterViewInit } from '@angular/core';

import { appService } from '../../service/app.service';
import {NgbModal, ModalDismissReasons, NgbDatepickerConfig, NgbCalendar, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastsManager } from 'ng5-toastr/ng5-toastr';
import * as moment from 'moment';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  public logo:any = localStorage.getItem("OrgLogo");
  public currency = JSON.parse(localStorage.getItem('currency'));
  public test:any=[];
  public selectedDay =[];
  public lessonId :any;
  public keyword:any = {};
  public limit:number = 0;
  public skip:number = 0;
  public teacherListSearchResult:any = {staff: []}
  // public SelectedDate = [];
  public isGlobal:boolean = false;
  public showSelectedDays = '~'
  public showSelectedDays1 = [0,1,2,3,4,5,6]
  public categoryList:any;
  public planList:any;
  public courseVal:any = {};
  public selectedID:any;
  public item:any ={};
  public modalReference: any;
  public isFousCategory: boolean = false;
  public isSelected:boolean = false;
  public scheduleList:boolean=true;
  public regionId = localStorage.getItem('regionId');
  
  public locationID = localStorage.getItem('locationId');
  // public daysOfWeek = localStorage.getItem('daysofWeek');
  // public categoryId = localStorage.getItem('categoryId');
  public selectedTeacher:any = {};
  public selectedCategory:any = {};
  public selectedCat:boolean=true;
  public activeTab:any;
  public studentLists:any =[];
  public showList:boolean = false;
  public userLists:any = [];
  public isFous:boolean = false;
  public formData:any = {};
  public staffList:any;
  public selectedCustomer:any = {};
  public stdLists:Array<any> = [];
  public courseId:any;
  // for invoice
  public invoiceInfo:any = {};
  public invoice:any;
  public showInvoice:boolean = false;
  public invoiceID:any;
  public refInvID:any;
  public invTaxName:any;
  public invCurrency:any = {};
  public invPayment = [];
  public total:number;
  public hideMisc:boolean = false;
  public hideReg:boolean = false;
  public hideDeposit:boolean = false;
  public invoiceCourse:any = {};
  public feesBox:boolean = false;
  public courseDetail:any = {};
  public isEditInv:boolean = false;
  public value:any = {};
  public updateInvData:any = {};
  public singleInv = [];
  public showPayment = false;
  public invStatus:any;
  public paymentItem:any = {};
  public paymentProviders:any;
  public selectedPayment:any;
  public paymentId:any;
  public operatingHours:any = [];


  // public toggleBool:boolean = true;
  // clickInit:boolean = false;
  model:any = {};
  public listings = [
    {
      'name' : 'Dec'
    },
    {
      'name' : 'Dec'
    },
    {
      'name' : 'JAN'
    },
    {
      'name' : 'JAN'
    },
    {
      'name' : 'Feb'
    }
  ]
  public operationTime = [
    {
      "start": {
        "hr": 8,
        "min": 0,
        "meridian": "AM"
      }
    },
    {
      "start": {
        "hr": 8,
        "min": 30,
        "meridian": "AM"
      }
    },
    {
      "start": {
        "hr": 9,
        "min": 0,
        "meridian": "AM"
      }
    },
    {
      "start": {
        "hr": 9,
        "min": 30,
        "meridian": "AM"
      }
    },
    {
      "start": {
        "hr": 10,
        "min": 0,
        "meridian": "AM"
      }
    },
    {
      "start": {
        "hr": 10,
        "min": 30,
        "meridian": "AM"
      }
    },
    {
      "start": {
        "hr": 11,
        "min": 0,
        "meridian": "AM"
      }
    },
  ];
  public timetableLists = [
    {
      "month": [
        {
          "timetable": [
            {
              "course": null,
              "seat": null,
              "category": null,
              "special_case": null,
              "available": true,
              "dayOfWeek": null,
              "start": {
                "hr": 8,
                "min": 0,
                "meridiem": "AM"
              },
              "end": {
                "hr": 9,
                "min": 0,
                "meridiem": "PM"
              }
            },
            {
              "course": {
                "coursePlanId": "5bebc2b65dccdb75024bf65f",
                "courseCode": "inv-003",
                "name": "Testing For Invoice 001",
                "courseId": "5bfcb0357ef97856510d5a61"
              },
              "seat": {
                "taken": 21,
                "total": 30,
                "left": 9
              },
              "category": {
                "name": "   test category A-001",
                "categoryId": "5be9586d8c6e2975b6b6359e"
              },
              "special_case": null,
              "available": false,
              "dayOfWeek": 4,
              "start": {
                "hr": 8,
                "min": 0,
                "meridiem": "PM"
              },
              "end": {
                "hr": 9,
                "min": 0,
                "meridiem": "PM"
              }
            },
            {
              "course": {
                "coursePlanId": "5bebc2b65dccdb75024bf65f",
                "courseCode": "inv-004",
                "name": "Testing For Invoice 001",
                "courseId": "5bfcb0357ef97856510d5a61"
              },
              "seat": {
                "taken": 21,
                "total": 30,
                "left": 9
              },
              "category": {
                "name": "   test category A-001",
                "categoryId": "5be9586d8c6e2975b6b6359e"
              },
              "special_case": null,
              "available": false,
              "dayOfWeek": 4,
              "start": {
                "hr": 9,
                "min": 0,
                "meridiem": "PM"
              },
              "end": {
                "hr": 10,
                "min": 0,
                "meridiem": "PM"
              }
            },
            {
              "course": null,
              "seat": null,
              "category": null,
              "special_case": null,
              "available": true,
              "dayOfWeek": null,
              "start": {
                "hr": 5,
                "min": 0,
                "meridiem": "PM"
              },
              "end": {
                "hr": 11,
                "min": 59,
                "meridiem": "PM"
              }
            }
          ],
          "date": {
            "year": 2018,
            "month": 12,
            "day": 19,
            "dayOfWeek": "Wed"
          }
        },
        {
          "timetable": [
            {
              "course": null,
              "seat": null,
              "category": null,
              "special_case": null,
              "available": true,
              "dayOfWeek": null,
              "start": {
                "hr": 8,
                "min": 0,
                "meridiem": "AM"
              },
              "end": {
                "hr": 4,
                "min": 0,
                "meridiem": "PM"
              }
            },
            {
              "course": {
                "coursePlanId": "5bebc2b65dccdb75024bf65f",
                "courseCode": "inv-003",
                "name": "Testing For Invoice 001",
                "courseId": "5bfcb0357ef97856510d5a61"
              },
              "seat": {
                "taken": 21,
                "total": 30,
                "left": 9
              },
              "category": {
                "name": "   test category A-001",
                "categoryId": "5be9586d8c6e2975b6b6359e"
              },
              "special_case": null,
              "available": false,
              "dayOfWeek": 4,
              "start": {
                "hr": 8,
                "min": 0,
                "meridiem": "PM"
              },
              "end": {
                "hr": 9,
                "min": 0,
                "meridiem": "PM"
              }
            },
            {
              "course": {
                "coursePlanId": "5bebc2b65dccdb75024bf65f",
                "courseCode": "inv-003",
                "name": "Testing For Invoice 001",
                "courseId": "5bfcb0357ef97856510d5a61"
              },
              "seat": {
                "taken": 21,
                "total": 30,
                "left": 9
              },
              "category": {
                "name": "   test category A-001",
                "categoryId": "5be9586d8c6e2975b6b6359e"
              },
              "special_case": null,
              "available": false,
              "dayOfWeek": 4,
              "start": {
                "hr": 8,
                "min": 0,
                "meridiem": "PM"
              },
              "end": {
                "hr": 9,
                "min": 0,
                "meridiem": "PM"
              }
            },
            {
              "course": null,
              "seat": null,
              "category": null,
              "special_case": null,
              "available": true,
              "dayOfWeek": null,
              "start": {
                "hr": 8,
                "min": 0,
                "meridiem": "PM"
              },
              "end": {
                "hr": 9,
                "min": 59,
                "meridiem": "PM"
              }
            }
          ],
          "date": {
            "year": 2018,
            "month": 12,
            "day": 26,
            "dayOfWeek": "Wed"
          }
        }
      ],
      "count": '2',
      "date": {
        "year": 2018,
        "month": 12
      }
    },
    {
      "month": [
        {
          "timetable": [
            {
              "course": {
                "coursePlanId": "5bebc2b65dccdb75024bf65f",
                "courseCode": "JAN-2",
                "name": "Testing For Invoice 001",
                "courseId": "5bfcb0357ef97856510d5a61"
              },
              "seat": null,
              "category": null,
              "special_case": null,
              "available": true,
              "dayOfWeek": null,
              "start": {
                "hr": 9,
                "min": 0,
                "meridiem": "AM"
              },
              "end": {
                "hr": 10,
                "min": 0,
                "meridiem": "PM"
              }
            },
            {
              "course": {
                "coursePlanId": "5bebc2b65dccdb75024bf65f",
                "courseCode": "JAN-2-1",
                "name": "Testing For Invoice 001",
                "courseId": "5bfcb0357ef97856510d5a61"
              },
              "seat": null,
              "category": null,
              "special_case": null,
              "available": true,
              "dayOfWeek": null,
              "start": {
                "hr": 10,
                "min": 0,
                "meridiem": "AM"
              },
              "end": {
                "hr": 10,
                "min": 0,
                "meridiem": "PM"
              }
            },
          ],
          "date": {
            "year": 2019,
            "month": 1,
            "day": 2,
            "dayOfWeek": "Wed"
          }
        }
      ],
      "count": '1',
      "date": {
        "year": 2019,
        "month": 1
      }
    }
  ]

  public finalLists = [
    {
      "timetable": [
        {
          "course": null,
          "seat": null,
          "category": null,
          "special_case": null,
          "available": true,
          "dayOfWeek": null,
          "start": {
            "hr": 8,
            "min": 0,
            "meridiem": "AM"
          },
          "end": {
            "hr": 9,
            "min": 0,
            "meridiem": "PM"
          }
        },
        {
          "course": {
            "coursePlanId": "5bebc2b65dccdb75024bf65f",
            "courseCode": "inv-003KKK",
            "name": "Testing For Invoice 001",
            "courseId": "5bfcb0357ef97856510d5a61"
          },
          "seat": {
            "taken": 21,
            "total": 30,
            "left": 9
          },
          "category": {
            "name": "   test category A-001",
            "categoryId": "5be9586d8c6e2975b6b6359e"
          },
          "special_case": null,
          "available": false,
          "dayOfWeek": 4,
          "start": {
            "hr": 8,
            "min": 0,
            "meridiem": "PM"
          },
          "end": {
            "hr": 9,
            "min": 45,
            "meridiem": "PM"
          }
        },
        {
          "course": {
            "coursePlanId": "5bebc2b65dccdb75024bf65f",
            "courseCode": "inv-004",
            "name": "Testing For Invoice 001",
            "courseId": "5bfcb0357ef97856510d5a61"
          },
          "seat": {
            "taken": 21,
            "total": 30,
            "left": 9
          },
          "category": {
            "name": "   test category A-001",
            "categoryId": "5be9586d8c6e2975b6b6359e"
          },
          "special_case": null,
          "available": false,
          "dayOfWeek": 4,
          "start": {
            "hr": 10,
            "min": 0,
            "meridiem": "PM"
          },
          "end": {
            "hr": 10,
            "min": 45,
            "meridiem": "PM"
          }
        },
        {
          "course": null,
          "seat": null,
          "category": null,
          "special_case": null,
          "available": true,
          "dayOfWeek": null,
          "start": {
            "hr": 5,
            "min": 0,
            "meridiem": "PM"
          },
          "end": {
            "hr": 11,
            "min": 59,
            "meridiem": "PM"
          }
        },
      ],
      "date": {
        "year": 2018,
        "month": 12,
        "day": 19,
        "dayOfWeek": "Wed"
      }
    },
    {
      "timetable": [
        {
          "course": null,
          "seat": null,
          "category": null,
          "special_case": null,
          "available": true,
          "dayOfWeek": null,
          "start": {
            "hr": 8,
            "min": 0,
            "meridiem": "AM"
          },
          "end": {
            "hr": 4,
            "min": 0,
            "meridiem": "PM"
          }
        },
        {
          "course": {
            "coursePlanId": "5bebc2b65dccdb75024bf65f",
            "courseCode": "inv-003",
            "name": "Testing For Invoice 001",
            "courseId": "5bfcb0357ef97856510d5a61"
          },
          "seat": {
            "taken": 21,
            "total": 30,
            "left": 9
          },
          "category": {
            "name": "   test category A-001",
            "categoryId": "5be9586d8c6e2975b6b6359e"
          },
          "special_case": null,
          "available": false,
          "dayOfWeek": 4,
          "start": {
            "hr": 8,
            "min": 0,
            "meridiem": "PM"
          },
          "end": {
            "hr": 9,
            "min": 0,
            "meridiem": "PM"
          }
        },
        {
          "course": {
            "coursePlanId": "5bebc2b65dccdb75024bf65f",
            "courseCode": "inv-003",
            "name": "Testing For Invoice 001",
            "courseId": "5bfcb0357ef97856510d5a61"
          },
          "seat": {
            "taken": 21,
            "total": 30,
            "left": 9
          },
          "category": {
            "name": "   test category A-001",
            "categoryId": "5be9586d8c6e2975b6b6359e"
          },
          "special_case": null,
          "available": false,
          "dayOfWeek": 4,
          "start": {
            "hr": 8,
            "min": 0,
            "meridiem": "PM"
          },
          "end": {
            "hr": 9,
            "min": 0,
            "meridiem": "PM"
          }
        },
        {
          "course": null,
          "seat": null,
          "category": null,
          "special_case": null,
          "available": true,
          "dayOfWeek": null,
          "start": {
            "hr": 8,
            "min": 0,
            "meridiem": "PM"
          },
          "end": {
            "hr": 9,
            "min": 59,
            "meridiem": "PM"
          }
        }
      ],
      "date": {
        "year": 2018,
        "month": 12,
        "day": 26,
        "dayOfWeek": "Wed"
      }
    },
    {
      "timetable": [
        {
          "course": {
            "coursePlanId": "5bebc2b65dccdb75024bf65f",
            "courseCode": "Row-3-1",
            "name": "Testing For Invoice 001",
            "courseId": "5bfcb0357ef97856510d5a61"
          },
          "seat": null,
          "category": null,
          "special_case": null,
          "available": true,
          "dayOfWeek": null,
          "start": {
            "hr": 9,
            "min": 0,
            "meridiem": "AM"
          },
          "end": {
            "hr": 10,
            "min": 0,
            "meridiem": "PM"
          }
        },
        {
          "course": {
            "coursePlanId": "5bebc2b65dccdb75024bf65f",
            "courseCode": "Row-3-2",
            "name": "Testing For Invoice 001",
            "courseId": "5bfcb0357ef97856510d5a61"
          },
          "seat": null,
          "category": null,
          "special_case": null,
          "available": true,
          "dayOfWeek": null,
          "start": {
            "hr": 10,
            "min": 0,
            "meridiem": "AM"
          },
          "end": {
            "hr": 10,
            "min": 30,
            "meridiem": "PM"
          }
        },
      ],
      "date": {
        "year": 2019,
        "month": 1,
        "day": 2,
        "dayOfWeek": "Wed"
      }
    },
    {
      "timetable": [
        {
          "course": {
            "coursePlanId": "5bebc2b65dccdb75024bf65f",
            "courseCode": "Feb-2-1",
            "name": "Testing For Invoice 001",
            "courseId": "5bfcb0357ef97856510d5a61"
          },
          "seat": null,
          "category": null,
          "special_case": null,
          "available": true,
          "dayOfWeek": null,
          "start": {
            "hr": 9,
            "min": 0,
            "meridiem": "AM"
          },
          "end": {
            "hr": 10,
            "min": 0,
            "meridiem": "PM"
          }
        },
        {
          "course": {
            "coursePlanId": "5bebc2b65dccdb75024bf65f",
            "courseCode": "Feb-2-2",
            "name": "Testing For Invoice 001",
            "courseId": "5bfcb0357ef97856510d5a61"
          },
          "seat": null,
          "category": null,
          "special_case": null,
          "available": true,
          "dayOfWeek": null,
          "start": {
            "hr": 10,
            "min": 30,
            "meridiem": "AM"
          },
          "end": {
            "hr": 11,
            "min": 0,
            "meridiem": "PM"
          }
        },
      ],
      "date": {
        "year": 2019,
        "month": 2,
        "day": 2,
        "dayOfWeek": "Wed"
      }
    },
    {
      "timetable": [
        {
          "course": {
            "coursePlanId": "5bebc2b65dccdb75024bf65f",
            "courseCode": "Feb-3-1",
            "name": "Testing For Invoice 001",
            "courseId": "5bfcb0357ef97856510d5a61"
          },
          "seat": null,
          "category": null,
          "special_case": null,
          "available": true,
          "dayOfWeek": null,
          "start": {
            "hr": 8,
            "min": 0,
            "meridiem": "AM"
          },
          "end": {
            "hr": 9,
            "min": 0,
            "meridiem": "PM"
          }
        },
        {
          "course": {
            "coursePlanId": "5bebc2b65dccdb75024bf65f",
            "courseCode": "Feb-3-2",
            "name": "Testing For Invoice 001",
            "courseId": "5bfcb0357ef97856510d5a61"
          },
          "seat": null,
          "category": null,
          "special_case": null,
          "available": true,
          "dayOfWeek": null,
          "start": {
            "hr": 10,
            "min": 0,
            "meridiem": "AM"
          },
          "end": {
            "hr": 10,
            "min": 40,
            "meridiem": "PM"
          }
        },
      ],
      "date": {
        "year": 2019,
        "month": 2,
        "day": 3,
        "dayOfWeek": "Wed"
      }
    },
    {
      "timetable": [
        {
          "course": {
            "coursePlanId": "5bebc2b65dccdb75024bf65f",
            "courseCode": "JAN-2",
            "name": "Testing For Invoice 001",
            "courseId": "5bfcb0357ef97856510d5a61"
          },
          "seat": null,
          "category": null,
          "special_case": null,
          "available": true,
          "dayOfWeek": null,
          "start": {
            "hr": 9,
            "min": 0,
            "meridiem": "AM"
          },
          "end": {
            "hr": 10,
            "min": 0,
            "meridiem": "PM"
          }
        },
        {
          "course": {
            "coursePlanId": "5bebc2b65dccdb75024bf65f",
            "courseCode": "JAN-2-1",
            "name": "Testing For Invoice 001",
            "courseId": "5bfcb0357ef97856510d5a61"
          },
          "seat": null,
          "category": null,
          "special_case": null,
          "available": true,
          "dayOfWeek": null,
          "start": {
            "hr": 10,
            "min": 0,
            "meridiem": "AM"
          },
          "end": {
            "hr": 11,
            "min": 30,
            "meridiem": "PM"
          }
        },
      ],
      "date": {
        "year": 2019,
        "month": 2,
        "day": 3,
        "dayOfWeek": "Wed"
      }
    }
  ]



  public days = [
    {"day":"Sun", "val": 0},
    {"day":"Mon", "val": 1},
    {"day":"Tue", "val": 2},
    {"day":"Wed", "val": 3},
    {"day":"Thu", "val": 4},
    {"day":"Fri ", "val": 5},
    {"day":"Sat", "val": 6}
  ];

  

  public teachers = [
    {"name":'Aldous',"id":0},
    {"name":'Harry ',"id":2},
    {"name":'Lunox',"id":3},
    {"name":'Leomord',"id":4},
    {"name":'Hayabusa',"id":5},
    {"name":'Leomord',"id":4},
    {"name":'Hayabusa',"id":5},
    {"name":'Leomord',"id":4},
    {"name":'Hayabusa',"id":5},
    {"name":'Leomord',"id":4},
    {"name":'Hayabusa',"id":5},
    {"name":'Leomord',"id":4},
    {"name":'Hayabusa',"id":5},
    {"name":'Leomord',"id":4},
    {"name":'Hayabusa',"id":5},
    {"name":'Leomord',"id":4},
    {"name":'Hayabusa',"id":5},
    {"name":'Leomord',"id":4},
    {"name":'Hayabusa',"id":5},
    {"name":'Leomord',"id":4},
    {"name":'Hayabusa',"id":5},
    {"name":'Leomord',"id":4},
    {"name":'Hayabusa',"id":5},
    {"name":'Leomord',"id":4},
    {"name":'Hayabusa',"id":5},
    {"name":'Leomord',"id":4},
    {"name":'Hayabusa',"id":5},
    {"name":'Kagura',"id":6}
  ]
  // public testTime = '13:00';

  //https://brainlitz.s3.amazonaws.com/development/stgbl-cw1/profile/154088885512582284596_original.jpg

  // gotoScheduleList(){
  //   this.scheduleList=false;
  // }

  constructor(private _service:appService, private modalService: NgbModal, public toastr: ToastsManager,public vcr: ViewContainerRef) {
      this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
    this.activeTab = 'enroll';
    this.getAutoSelectDate();
    console.log("undefined currency",this.currency);
    if(this.currency == undefined || this.currency == null){
      this.currency ={
        'invCurrencySign': '$'
      }
      console.log("undefined currency",this.currency);
    }else{
      if(this.currency.invCurrencySign == ""){
        console.log("has currency but sign null",this.currency);
        this.currency.invCurrencySign = '$';
      }
    } 
    this.getRegionalInfo();
  }

  ngAfterViewInit() {
    this.staffList = [
      {
        'staff': [{}],
      }
    ]
  }

  getRegionalInfo(){
    let token = localStorage.getItem('token');
    let tokenType = localStorage.getItem('tokenType')
    this._service.getRegionalAdministrator(this.regionId,token,tokenType)
    .subscribe((res:any) => {
      console.log("Operation Hours",res.operatingHour);
      // this.calculateOperationTime(res.operatingHour.start,res.operatingHour.end);
      // this.calculateOperationTime();
    })
  }

  isEven(n) {
    return n % 2 == 0;
  }
   
  getAutoSelectDate(){
    const todayDay = new Date().getDay();
    this.selectedDay.push(todayDay);
    // this.SelectedDate.push(this.days[todayDay].day); 
  }

  backtoSchedule(){
    // reset the initial values  
    this.scheduleList = true;
    this.item.itemID = '';
    this.selectedDay = [];
    this.getAutoSelectDate();
  }
  
  // Selected Day //
  selectDay(data,event,day): void {
    // this.clickInit = true;
      var dayIdx = this.selectedDay.indexOf(data);
      
      if (event.target.checked) {
          if(dayIdx < 0 )
           this.selectedDay.push(data);
          //  this.SelectedDate.push(day);
          
            // this.toggleBool= false;
      } else {
          if(dayIdx >= 0 ){
          this.selectedDay.splice(dayIdx,1);
          // this.SelectedDate.splice(day,1);
        }
    }    
    this.selectedDay.sort();
  }
  

  // Search Category

  searchCategoryList(val,type){
    console.log(val,type);
      if(val.length >0){
        this._service.getSearchCategory(this.regionId, val, this.locationID)
        .subscribe((res:any) => {
          console.log(res);
          console.log(this.categoryList.name)
          this.categoryList = res;
        }, err => {  
          console.log(err);
        });
      }  
      else if(val.length <= 0){
        this._service.getCategory(this.regionId, 20,0)
        .subscribe((res:any) => {
          console.log(res);
          console.log(this.categoryList.name)
          this.categoryList = res;
        }, err => {  
          console.log(err);
        });
      }
  }
  // Focus Search
  focusSearch(val, type){
      this._service.getCategory(this.regionId, 20,0)
      .subscribe((res:any) => {
        console.log(res);
        this.categoryList = res;
        console.log(val,'OK');
      }, err => {  
        console.log(err);
      });

    val.preventDefault();
    val.stopPropagation();
     this.isFousCategory=true;
  }
  //  Hide Search
  hideSearch(){
    setTimeout(() => {
      this.isFousCategory = false;
    }, 300);
  }
  selectDataApiCall(id, name){
    this.selectData(id,name);
    this.getscheulestaff(this.regionId,this.selectedDay.toString(),this.selectedID)
  }

  // single Select Data
  selectData(id, name){
    console.log(id)
    this.isSelected = true;
    this.selectedID = id;
    this.item.itemID = name;
    this.selectedCategory=name;
    this.selectedCat=false;
  }

  openTeacherList(content){
    this.skip += this.limit;
    this.modalReference = this.modalService.open(content, { backdrop:'static', windowClass: 'modal-xl modal-inv d-flex justify-content-center align-items-center'});
    this.getscheulestaff(this.regionId,this.selectedDay,this.selectedID.toString());
    this.selectedTeacher = this.staffList.staff[0];
    this.teacherListSearchResult = this.staffList;
    this.selectedTeacher = this.teacherListSearchResult.staff[0];
  }

  teacherListTypeAhead(keyword){
    this.limit = 1;
    this.skip = 0;
    this.keyword = keyword;
    // this.getscheulestaff(this.regionId,this.selectedDay,this.selectedID, keyword, this.limit, this.skip, false);
  }

  teacherListTypeAheadLoadMore(){
    this.skip += this.limit;
    // this.getscheulestaff(this.regionId,this.selectedDay,this.selectedID, this.keyword, this.limit, this.skip,true);
  }

  getscheulestaff(regionId,daysOfWeek,categoryId){
    // Declare _this variable which represents the current component not to conflict with setTimeOut this keyword
    const _this = this;
    // Api calling should after checking the date 
    // need to wait a bit delay 
    _this.blockUI.start('Loading...');
    setTimeout(() => {
        // _this.selectedDayy();
        if(this.selectedDay.length == 0) {
          _this.scheduleList=false;
        _this._service.getscheduleStaffList(this.regionId,'0,1,2,3,4,5,6'.toString(),this.selectedID)
        .subscribe((res:any) => {
              _this.staffList=res;
              console.warn(res, 'subscribe')
              console.warn(_this.staffList, _this.selectedTeacher)
              _this.selectedTeacher = _this.staffList.staff[0];
            _this.blockUI.stop(); 
          }, (err:any) => {
            // catch the error response from api         
            _this.staffList=[];
          })
        }
        _this.scheduleList=false;
        _this._service.getscheduleStaffList(this.regionId,this.selectedDay.toString(),this.selectedID)
        .subscribe((res:any) => {
              _this.staffList=res;
              console.warn(res, 'subscribe')
              console.warn(_this.staffList, _this.selectedTeacher)
              _this.selectedTeacher = _this.staffList.staff[0];
            _this.blockUI.stop(); 
          }, (err:any) => {
            // catch the error response from api         
            _this.staffList=[];
          })
      }, 0);
    return;
  }

  getSearchscheulestaff(regionId,daysOfWeek,selectedID,keyword,limit,skip){
    const _this =this;
    this.limit = 20;
    this.skip = 0;
    setTimeout(() => {
      // _this.selectedDayy();
      _this.scheduleList=false;
      _this._service.getscheduleSearchStaffList(this.regionId,this.selectedDay.toString(),this.selectedID,keyword,this.limit,this.skip)
      .subscribe((res:any) => {
            _this.staffList=res;
            console.warn(res, 'subscribe')
            console.warn(_this.staffList, _this.selectedTeacher)
            _this.selectedTeacher = _this.staffList.staff[0];
          _this.blockUI.stop(); 
        }, (err:any) => {
          // catch the error response from api         
          _this.staffList=[];
        })
    }, 0);
  return;
  }

  getStaffTimetable(staffId){
    this._service.getStaffSchedule(this.regionId,staffId,this.selectedDay.toString(),this.selectedID)
    .subscribe((res:any)=> {
      console.log("staff timetable",res);
    })
  }

  cancelModal(type){
    this.modalReference.close();
    if(type == 'enrollModal'){
      this.selectedCustomer = {};
      this.stdLists = [];
      this.showList = false;
      this.showInvoice = false;
      this.showPayment = false;
      // this.showPaidInvoice = false;
      this.paymentItem = {};
      this.hideReg = false;
      this.hideDeposit = false;
      this.hideMisc = false;
      this.isEditInv = false;
      this.singleInv = [];
      this.updateInvData = {};

    }
  }

  activeTeacher(teacher){
   this.selectedTeacher=teacher
   console.log(this.selectedTeacher);
   // this.getStaffTimetable(this.selectedTeacher.userId)
  }

  addEnrollModal(modal){
      this.modalReference = this.modalService.open(modal, { backdrop:'static', windowClass: 'modal-xl d-flex justify-content-center align-items-center'});
      this.courseId = "5beb8c7d1f893164fff2c31d";
      this.lessonId = "5beb8c7d1f893164fff2c32b";
      this.getCourseDetail(this.courseId);
  }

  getCourseDetail(id){
    this._service.getSingleCourse(id,this.locationID)
    .subscribe((res:any)=>{
      console.log(res)
      this.courseDetail = res;
    },err =>{
      console.log(err);
    });
  }

  onClickModalTab(type){
    this.activeTab = type;
    if(type == 'enroll'){
      
    }else if(type == 'view'){
      this.getUserInCourse();
    }
    else{
      this.getUserInCourse();
    }
  }

  getUserInCourse(){
    //temp api for testing UI
    this.blockUI.start('Loading...');
    this._service.getAssignUser(this.regionId,this.courseId,null,null,null)
    .subscribe((res:any)=>{
      this.blockUI.stop();
      console.log(res)
      this.studentLists = res.CUSTOMER;
    },err =>{
      console.log(err);
    });
  }

  focusMethod(e, userType){
    // console.log(e)
    console.log(userType)
    this.isFous = true;
    this.userLists = [];
    // this.getAllUsers(userType);
  }

  hideFocus(e){
    setTimeout(() => {
      this.isFous = false;
      this.showList = false;
    }, 300);
    this.formData = {}
  }

  changeMethod(searchWord, userType){
    // let courseId = "5beb8c7d1f893164fff2c31d";
    userType = (userType == 'teacher') ? 'staff' : userType;
    console.log(userType)
    if(searchWord.length != 0){
      this.showList = true;
      this._service.getSearchUser(this.regionId, searchWord, userType, 20, 0, this.courseId)
      .subscribe((res:any) => {
        console.log(res);
        this.userLists = res;
      }, err => {
        console.log(err);
      });
    }else if(searchWord.length == 0){
      this.userLists = [];
      this.showList = false;
    }
  }

  selectCustomer(state, id, type){
    this.getSingleCustomer(id);
    this.formData = {};
  }

  getSingleCustomer(ID){
    this.blockUI.start('Loading...');
    console.log("this.selectedCustomer",this.selectedCustomer)
    this._service.editProfile(this.regionId, ID)
    .subscribe((res:any) => {
      this.blockUI.stop();
      console.log('selected Customer',res);
      this.selectedCustomer = res;
      this.stdLists = this.selectedCustomer.userId;
      console.log(this.stdLists)
      this.showList = false;
    })
  }

  closeDropdown(event,type){
    console.log('close dropdown',type)
    if(type == 'search'){
      var parentWrap = event.path.filter(function(res){
        return res.className == "search-wrap"
      })
      if(parentWrap.length == 0){
        this.showList = false;
      }
    }
  }

  addCustomer(courseId, userType){
    this.stdLists = [];
    console.log("call from addCustomer",this.selectedCustomer);
    let body = {
       'courseId': courseId,
       'userId': this.selectedCustomer.userId,
       'userType': userType
     }
     console.log("body",body);
     this.blockUI.start('Loading...');
     this._service.assignUser(this.regionId,body, this.locationID)
     .subscribe((res:any) => {
       this.blockUI.stop();
       console.log("res Assign customer",res);
       if(res.invoiceSettings == {} || res.invoiceSettings == undefined){
          console.log("no invoice setting");
          this.invoiceInfo = {
            'address': "",
            'city': "",
            'companyName': "",
            'email': "",
            'prefix': "",
            'registration': ""
          }
       }else{
         console.log("has invoice setting");
         this.invoiceInfo = res.invoiceSettings;
       }
       this.invoice = res.invoice;
       this.showInvoice = true;
       this.showOneInvoice(this.invoice);
     }, err => {
        console.log(err);
      })
    // this.showInvoice = true;

  }

  showOneInvoice(invoice){
    for(var i in invoice){
       // this.updatedDate = invoice[i].updatedDate;
       // this.dueDate = invoice[i].dueDate;
       this.invoiceID = invoice[i]._id;
       this.refInvID = invoice[i].refInvoiceId;
       this.invTaxName = invoice[i].tax.name;
       this.invCurrency = invoice[i].currency;
       this.invPayment = invoice[i].payments;
       var n = invoice[i].total;
       this.total = n.toFixed(2);
       this.invoice[i].subtotal = Number(Number(this.invoice[i].subtotal).toFixed(2));
       console.log('n and total',n,this.total);
       if(this.invoice[i].registrationFee.fee == null){
         this.hideReg = true;
       }
       if(this.invoice[i].miscFee.fee == null){
         this.hideMisc = true;
       }
       if(this.invoice[i].deposit == null){
         this.hideDeposit = true;
       }

       this.invoiceCourse["fees"] = invoice[i].courseFee.fee;
       if(invoice[i].courseId == this.courseDetail._id){
         this.invoiceCourse["name"] = this.courseDetail.name;
         this.invoiceCourse["startDate"] = this.courseDetail.startDate;
         this.invoiceCourse["endDate"] = this.courseDetail.endDate;
         this.invoiceCourse["lessonCount"] = this.courseDetail.lessonCount;
       }
     }
  }

  showPopup(type,value){
    this.isEditInv = true;
    if(type == 'courseFee'){
      this.feesBox = true;
      this.value.courseFee = value;
    }
  }

  cancelPopup(type){
    if((this.hideReg == true && this.hideDeposit == true && this.hideMisc == true) || this.hideReg == true || this.hideDeposit == true || this.hideMisc == true){
      this.isEditInv = true;
    }else{
      this.isEditInv = false;
    }
    console.log("hide popup")
    // this.showBox = false;
    if(type == 'courseFee'){
      this.feesBox = false;
      this.value.courseFee = '';
    }
  }

  updateCfee(data){
    console.log("updateCfee",data);
    this.feesBox = false;
    for(var i in this.invoice){
      if(this.invoice[i].courseFee.fee != data){
        console.log("===not same");
        this.updateInvData["courseFee"] = data
        // this.updateInvData["courseFee"] = {
        //   'fee': Number(data)
        // };
        this.invoice[i].courseFee.fee = Number(data);
        console.log(this.invoice[i].courseFee.fee)
        // formula for calculating the inclusive tax
        // Product price x RATE OF TAX/ (100+RATE OF TAX);
        if(this.invoice[i].courseFee.taxInclusive == true){
          var taxRate = this.invoice[i].tax.rate;
          var taxAmount = (this.invoice[i].courseFee.fee * taxRate / (100 + taxRate)).toFixed(2);
          this.invoice[i].courseFee.tax =Number(taxAmount);
          console.log("inclusiveTax for CFee",this.invoice[i].courseFee.tax);
          var cFee = (this.invoice[i].courseFee.fee - this.invoice[i].courseFee.tax).toFixed(2);
          this.invoice[i].courseFee.fee = Number(cFee);
          this.invoice[i].courseFee.amount = this.invoice[i].courseFee.fee + this.invoice[i].courseFee.tax;
          console.log("CFee without inclusive tax",this.invoice[i].courseFee.fee);
          console.log("Amount without inclusive tax",this.invoice[i].courseFee.amount);
        }else if(this.invoice[i].courseFee.taxInclusive == false){
          var taxRate = this.invoice[i].tax.rate;
          var taxAmount = (this.invoice[i].courseFee.fee * taxRate / 100).toFixed(2);
          this.invoice[i].courseFee.tax =Number(taxAmount);
          console.log("inclusiveTax for CFee",this.invoice[i].courseFee.tax);
          this.invoice[i].courseFee.amount = this.invoice[i].courseFee.fee + this.invoice[i].courseFee.tax;
          console.log("CFee with exclusive tax",this.invoice[i].courseFee.fee);
          console.log("Fee amount with exclusive tax",this.invoice[i].courseFee.amount);
        }

        this.calculateHideFees('cFees')
      }else{
        console.log("===same");
      }
    }
    // this.discount = data;
    // this.showBox = false;
  }

  hideInvoiceRow(type){
    this.isEditInv = true;
    if(type == 'reg'){
      this.hideReg = true;
      this.updateInvData["registrationFee"] = null;
      // this.updateInvData["registrationFee"] = {
      //   'fee': null
      // };
      this.calculateHideFees(type);
    }else if(type == 'deposit'){
      this.hideDeposit = true;
      this.updateInvData["deposit"] = null;
      this.calculateHideFees(type);
    }else if(type == 'misc'){
      this.hideMisc = true;
      this.updateInvData["miscFee"] = null;
      // this.updateInvData["miscFee"] = {
      //   'fee': null
      // };
      this.calculateHideFees(type);
    }
  }

  calculateHideFees(type){
    console.log("calculateHideFees");
    for (var i in this.invoice) {
      var regFees:number;
      var regTax:number;
      var miscFees:number;
      var miscTax:number;
      var deposit:number;
      var totalTaxes:number;

      if(this.hideReg == true){
        regFees = 0;
        regTax = 0;
      }else{
        regFees = this.invoice[i].registrationFee.fee;
        regTax = this.invoice[i].registrationFee.tax;
      }

      if(this.hideMisc == true){
        miscFees = 0;
        miscTax = 0;
      }else{
        miscFees = this.invoice[i].miscFee.fee;
        miscTax = this.invoice[i].miscFee.tax;
      }

      if(this.hideDeposit == true){
        deposit = 0;
      }else{
        deposit = this.invoice[i].deposit;
      }

      totalTaxes = regTax + miscTax + Number(this.invoice[i].courseFee.tax);
      console.log("Total taxes and deposit",totalTaxes,deposit)
      this.invoice[i].subtotal = (regFees + miscFees + deposit + this.invoice[i].courseFee.fee).toFixed(2);
      this.total = Number((Number(this.invoice[i].subtotal)+ totalTaxes).toFixed(2));
      // this.invoice[i].total = Number(totalPrice).toFixed(2);
      // this.total = Number(this.invoice[i].total).toFixed(2);
      console.log("Subtotal",this.invoice[i].subtotal);
      console.log("Total",this.total);
      // console.log("TTT",this.invoice[i].subtotal+totalTaxes)
    }
  }

  printInvoice(){
    window.print();
  }

   updateInvoice(){
    // let data = {};
    // if(this.hideReg == true){
    //   data["registrationFee"] = null;
    // }else if(this.hideDeposit == true){
    //   data["deposit"] = null;
    // }else if(this.invoiceCourse.fees != this.value.courseFee){
    //   data["courseFee"] = this.value.courseFee;
    // }
    this.blockUI.start('Loading...');
    console.log("Inv Update Data",this.updateInvData);
    this._service.updateInvoiceInfo(this.invoiceID,this.updateInvData)
    .subscribe((res:any) => {
      this.blockUI.stop();
      console.log(res);
      this.isEditInv = false;
      //for updating invoice ui
      this.singleInv = [];
      this.singleInv.push(res);
      this.invoice = this.singleInv;
      console.log("invoice",this.invoice);
      this.showOneInvoice(this.invoice);
    },err => {
      console.log(err);
    })
  }

  sendInvoice(){
    // this.showStudentOption = '';
    // this.xxxhello = '';
    console.log("send Invoice",this.invoiceID);
    var mailArr = [];
    mailArr.push(this.selectedCustomer.email);
    for(var i in this.selectedCustomer.guardianEmail){
      mailArr.push(this.selectedCustomer.guardianEmail[i]);
    }
    console.log("mailArr",mailArr);
    let body = {
      "associatedMails": mailArr
    }
    console.log("body",body);
    this._service.invoiceOption(this.regionId, this.invoiceID, body, 'send')
    .subscribe((res:any) => {
      console.log(res);
      this.toastr.success("Successfully sent the Invoice.");
      this.cancelModal('enrollModal');
    }, err => {
      console.log(err);
      this.toastr.error('Fail to sent the Invoice.');
    })
  }

  showPayOption(){
    console.log("pay option");
    this.showPayment = true;
    this.showInvoice = false;
    if(this.invStatus == 'PAID[PARTIAL]'){
      var totalPaid = 0;
      for(var i in this.invPayment){
        console.log("each payment",this.invPayment[i]);
        totalPaid = totalPaid + this.invPayment[i].amount;
      }
      console.log("total paid",totalPaid);
      this.paymentItem.amount = Number((this.total - totalPaid).toFixed(2));
      console.log("Total Amount for Pay",this.paymentItem.amount)
    }else{
      this.paymentItem.amount = this.total;
    }

    this._service.getPaymentMethod()
    .subscribe((res:any) => {
      console.log(res);
      this.paymentProviders = res;
      this.selectedPayment = this.paymentProviders[0].name;
        this.paymentId = this.paymentProviders[0].id;
    })
  }

  choosePayment(type){
      console.log("choosePayment",type);
      this.selectedPayment = type.name;
      this.paymentId = type.id;
  }

  payNow(type){
    // this.showStudentOption = '';
    // this.xxxhello = '';
    console.log("Pay Now",this.paymentItem,this.paymentId);
    let body = {
      'regionId': this.regionId,
      'refInvoiceId': this.refInvID,
      'amount': this.paymentItem.amount.toString(),
      'paymentMethod': this.paymentId.toString()
    }
    if(this.paymentItem.refNumber){
      body["refNo"] = this.paymentItem.refNumber;
    }
    // console.log("data",body);
    this._service.makePayment(this.regionId,body)
    .subscribe((res:any) => {
      console.log(res);
      this.toastr.success(res.message);
      this.cancelModal('enrollModal');
    },err => {
      if(err.message == "Amount is overpaid."){
        this.toastr.success("Amount is overpaid.")
      }
      this.toastr.error("Payment Fail");
    })
  }

  backToInvoice(){
    console.log("Back To Invoice")
    this.showPayment = false;
    this.showInvoice = true;
    this.paymentItem = {};
  }

  getSlotNumber(hr, min){
    console.log(hr , ':', min);
  }



  cancelClassFun( lessonId){
    let data = {
      "lessonId": lessonId
    }
    console.log(lessonId)
    // console.log(this.isGlobal)
    // Call cancel class api service
    this.blockUI.start('Loading...');
    // this.isGlobal
    this._service.cancelUsersFromClass(this.courseId, data,this.isGlobal)
    .subscribe((res:any) => {
      // Success function
      this.blockUI.stop();
      // this.cancelUI=false;
      // this.cancelUi=false;
      console.info("cancle user from class api calling is done");
      console.log(res)
      this.isGlobal = false;
      // this.disableCancel = true;
      this.getCourseDetail(this.courseId);
      // Close Dialog box
      // Show the canceled users
    },err => {
      // Error function  
      this.isGlobal = false;
      console.error('cancle user from class has got error',  err);
      // Do something
    })
    this.modalReference.close();
    // this.cancelUItext= false;
  }



}
