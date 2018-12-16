import { Component, OnInit } from '@angular/core';
import { appService } from '../../service/app.service';
import {NgbModal, ModalDismissReasons, NgbDatepickerConfig, NgbCalendar, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  public test:any=[];
  public selectedDay =[];
  public SelectedDate = [];

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

  // public toggleBool:boolean = true;
  // clickInit:boolean = false;
  model:any = {};
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
      "date": {
        "year": 2019,
        "month": 1
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
    {"day":"Sat", "val": 6},
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

  //https://brainlitz.s3.amazonaws.com/development/stgbl-cw1/profile/154088885512582284596_original.jpg

  // gotoScheduleList(){
  //   this.scheduleList=false;
  // }

  constructor(private _service:appService, private modalService: NgbModal) { }

  ngOnInit() {
    this.selectedTeacher = this.teachers[0];
    this.activeTab = 'enroll';
  }

  backtoSchedule(){
    this.scheduleList=true;
  }

  // Selected Day //
  selectDay(data,event,day): void {
    // this.clickInit = true;
    console.log(this.selectDay);
    console.log("Day",data,event);
    var dayIdx = this.selectedDay.indexOf(data);
    console.log(dayIdx);
    if (event.target.checked) {
        if(dayIdx < 0 )
          this.selectedDay.push(data);
         this.SelectedDate.push(day);
        
          // this.toggleBool= false;
    } else {
        if(dayIdx >= 0 )
        this.selectedDay.splice(dayIdx,1);
        this.SelectedDate.splice(day,1);
      
        if(this.selectedDay.length>0){
          // this.toggleBool= false;
        }else{
          // this.toggleBool= true;
        }
    }
    this.selectedDay.sort();
    // this.SelectedDate.sort();
    console.log(this.selectedDay);
    console.log(this.SelectedDate);
  }
  

  // Search Category

  searchCategoryList(val,type){
    console.log(val,type);
      if(val.length >0){
        this._service.getSearchCategory(this.regionId, val, this.locationID,)
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
  // single Select Data
  selectData(id, name){
   
    console.log(id)
    this.isSelected = true;
    this.selectedID = id;
    this.item.itemID = name;
    this.test.push(name)
    this.selectedCategory=name;
    this.selectedCat=false;
    console.log(id, name)
    console.log
  }


  openTeacherList(content){
    this.modalReference = this.modalService.open(content, { backdrop:'static', windowClass: 'modal-xl modal-inv d-flex justify-content-center align-items-center'});
    this.selectedTeacher = this.staffList[0];
    console.log(this.selectedTeacher);
    console.log(this.selectedDay)
    
  }


  getscheulestaff(regionId,daysOfWeek,categoryId){
    console.log(this.selectedDay);
    this.scheduleList=false;
    this._service.getscheduleStaffList(regionId,this.selectedDay.toString(),categoryId)
    .subscribe((res:any) => {
      setTimeout(() => {
        
      },300)
      console.warn(res,'sdajdhgashgd');
      this.staffList=res;
      console.log(regionId)
      console.log(daysOfWeek)
      console.log(categoryId)
    })
  }

  
 

  cancelModal(){
    this.modalReference.close();
  }

  activeTeacher(teacher){
   this.selectedTeacher=teacher
   console.log(this.selectedTeacher);
  }

  addEnrollModal(modal){
      this.modalReference = this.modalService.open(modal, { backdrop:'static', windowClass: 'modal-xl d-flex justify-content-center align-items-center'})
  }

  onClickModalTab(type){
    this.activeTab = type;
    if(type == 'enroll'){
      
    }else if(type == 'view'){
      this.getUserInCourse();
    }
  }

  getUserInCourse(){
    //temp api for testing UI
    let courseId = "5beb8c7d1f893164fff2c31d";
    this.blockUI.start('Loading...');
    this._service.getAssignUser(this.regionId,courseId,null,null,null)
    .subscribe((res:any)=>{
      this.blockUI.stop();
      console.log(res)
      this.studentLists = res.CUSTOMER;
    },err =>{
      console.log(err);
    });
  }

  focusMethod(e, userType){
    console.log(e)
    console.log(userType)
    this.isFous = true;
    this.userLists = [];
    // this.getAllUsers(userType);
  }

  hideFocus(e){
    // setTimeout(() => {
    //   this.isFous = false;
    //   this.showList = false;
    // }, 300);
    this.formData = {}
  }

  changeMethod(searchWord, userType){
    let courseId = "5beb8c7d1f893164fff2c31d";
    userType = (userType == 'teacher') ? 'staff' : userType;
    console.log(userType)
    if(searchWord.length != 0){
      this.showList = true;
      this._service.getSearchUser(this.regionId, searchWord, userType, 20, 0, courseId)
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

  getSlotNumber(hr, min){
    console.log(hr , ':', min);
  }

}
