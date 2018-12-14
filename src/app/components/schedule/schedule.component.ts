import { Component, OnInit } from '@angular/core';
import { appService } from '../../service/app.service';
import {NgbModal, ModalDismissReasons, NgbDatepickerConfig, NgbCalendar, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  public test:any=[];
  public selectedDay = [];
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
  public selectedTeacher:any = {};
  public selectedCategory:any = {};
  public selectedCat:boolean=true;
  // public toggleBool:boolean = true;
  // clickInit:boolean = false;
  model:any = {};
  public operationTime = [
    {'name': '8:00 AM'},
    {'name': '8:30 AM'},
    {'name': '9:00 AM'},
    {'name': '9:30 AM'},
    {'name': '10:00 AM'},
    {'name': '10:30 AM'},
    {'name': '11:00 AM'},
    {'name': '11:30 AM'},
    {'name': '12:00 AM'},
    {'name': '12:30 AM'},
    {'name': '1:00 PM'},
    {'name': '1:30 PM'},
    {'name': '2:30 PM'},
  ];
  public timetableLists = [
    {
      "date": {
        "day": 3,
        "month": 9,
        "year": 2018
      },
      "timetable": [
        {
          "coursecode": "BPC",
          "category": {
            "id": 0,
            "name": "name"
          },
          "special_case": null,
          "seat_left": 0,
          "available": false,
          "start": {
            "hr": 8,
            "min": 0,
            "meridian": "AM"
          },
          "end": {
            "hr": 8,
            "min": 45,
            "meridian": "AM"
          }
        },
        {
          "coursecode": "PG2",
          "category": {
            "id": 0,
            "name": "name"
          },
          "special_case": null,
          "seat_left": 0,
          "available": true,
          "start": {
            "hr": 0,
            "min": 0,
            "meridian": "AM"
          },
          "end": {
            "hr": 0,
            "min": 0,
            "meridian": "AM"
          }
        },
        {
          "coursecode": null,
          "category": {
            "id": null,
            "name": null
          },
          "seat_left": null,
          "available": false,
          "special_case": {
            "leave": true
          },
          "start": {
            "hr": 0,
            "min": 0,
            "meridian": "AM"
          },
          "end": {
            "hr": 0,
            "min": 0,
            "meridian": "AM"
          }
        }
      ]
    },
    {
      "date": {
        "day": 5,
        "month": 9,
        "year": 2018
      },
      "timetable": [
        {
          "coursecode": "PG1",
          "category": {
            "id": 0,
            "name": "name"
          },
          "special_case": null,
          "seat_left": 0,
          "available": false,
          "start": {
            "hr": 0,
            "min": 0,
            "meridian": "AM"
          },
          "end": {
            "hr": 0,
            "min": 0,
            "meridian": "AM"
          }
        },
        {
          "coursecode": "PG3",
          "category": {
            "id": 0,
            "name": "name"
          },
          "special_case": null,
          "seat_left": 0,
          "available": true,
          "start": {
            "hr": 0,
            "min": 0,
            "meridian": "AM"
          },
          "end": {
            "hr": 0,
            "min": 0,
            "meridian": "AM"
          }
        },
        {
          "coursecode": 'PG4',
          "category": {
            "id": null,
            "name": null
          },
          "seat_left": null,
          "available": false,
          "special_case": {
            "leave": true
          },
          "start": {
            "hr": 0,
            "min": 0,
            "meridian": "AM"
          },
          "end": {
            "hr": 0,
            "min": 0,
            "meridian": "AM"
          }
        }
      ]
    },
    {
      "date": {
        "day": 5,
        "month": 11,
        "year": 2018
      },
      "timetable": [
        {
          "coursecode": "PG2",
          "category": {
            "id": 0,
            "name": "name"
          },
          "special_case": null,
          "seat_left": 0,
          "available": false,
          "start": {
            "hr": 0,
            "min": 0,
            "meridian": "AM"
          },
          "end": {
            "hr": 0,
            "min": 0,
            "meridian": "AM"
          }
        },
        {
          "coursecode": "PG3",
          "category": {
            "id": 0,
            "name": "name"
          },
          "special_case": null,
          "seat_left": 0,
          "available": true,
          "start": {
            "hr": 0,
            "min": 0,
            "meridian": "AM"
          },
          "end": {
            "hr": 0,
            "min": 0,
            "meridian": "AM"
          }
        },
        {
          "coursecode": null,
          "category": {
            "id": null,
            "name": null
          },
          "seat_left": null,
          "available": false,
          "special_case": {
            "leave": true
          },
          "start": {
            "hr": 0,
            "min": 0,
            "meridian": "AM"
          },
          "end": {
            "hr": 0,
            "min": 0,
            "meridian": "AM"
          }
        }
      ]
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

  gotoScheduleList(){
    this.scheduleList=false;
  }
  backtoSchedule(){
    this.scheduleList=true;
  }
  // Selected Day //
  selectDay(data,event): void {
    // this.clickInit = true;
    console.log(this.selectDay);
    console.log("Day",data,event);
    var dayIdx = this.selectedDay.indexOf(data);
    console.log(dayIdx);
    if (event.target.checked) {
        if(dayIdx < 0 )
          this.selectedDay.push(data);
         
          // this.toggleBool= false;
    } else {
        if(dayIdx >= 0 )
        this.selectedDay.splice(dayIdx,1);
        if(this.selectedDay.length>0){
          // this.toggleBool= false;
        }else{
          // this.toggleBool= true;
        }
    }
    this.selectedDay.sort();
    console.log(this.selectedDay);
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
  

  constructor(private _service:appService, private modalService: NgbModal) { }

  ngOnInit() {
    this.selectedTeacher = this.teachers[0];
  }

  openTeacherList(content){
  this.modalReference = this.modalService.open(content, { backdrop:'static', windowClass: 'modal-xl modal-inv d-flex justify-content-center align-items-center'});
  this.selectedTeacher = this.teachers[0];
  console.log(this.selectedTeacher);
  }
  cancelModal(){
    this.modalReference.close();
  }
  activeTeacher(teacher){
   this.selectedTeacher=teacher
   console.log(this.selectedTeacher)
  }
}
