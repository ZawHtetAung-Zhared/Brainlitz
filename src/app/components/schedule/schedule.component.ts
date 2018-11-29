import { Component, OnInit } from '@angular/core';
import { appService } from '../../service/app.service';
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  public selectedDay = [];
  public categoryList:any;
  public planList:any;
  public courseVal:any = {};
  public selectedID:any;
  public item:any;
  public isFousCategory: boolean = false;
  public isSelected:any = false;
  public regionId = localStorage.getItem('regionId');
  public locationID = localStorage.getItem('locationId');
  // public toggleBool:boolean = true;
  // clickInit:boolean = false;
  model:any = {};
  public days = [
    {"day":"Sun", "val": 0},
    {"day":"Mon", "val": 1},
    {"day":"Tue", "val": 2},
    {"day":"Wed", "val": 3},
    {"day":"Thu", "val": 4},
    {"day":"Fri ", "val": 5},
    {"day":"Sat", "val": 6},
  ];


// Selected Day //
  selectDay(data, event): void {
    // this.clickInit = true;
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
    if(type == 'category'){
      if(val.length > 0){
        this._service.getSearchCategory(this.regionId, val, this.locationID)
        .subscribe((res:any) => {
          console.log(res);
          this.categoryList = res;
        }, err => {  
          console.log(err);
        });
      }
    }
  }

  focusSearch(val, type){
    this._service.getSearchCategory(this.regionId, val, this.locationID)
    .subscribe((res:any) => {
      console.log(res);
      this.categoryList = res;
    }, err => {  
      console.log(err);
    });
   this.isFousCategory=true;
  }

  hideSearch(){
      this.isFousCategory = false;
  }


  getCPlanList(){
    console.log(this.locationID)
    console.log('----', localStorage.getItem('locationId'))
    this._service.getAllCoursePlan(this.regionId,localStorage.getItem('locationId'))
    .subscribe((res:any) => {
      this.planList = res;
      console.log("course plan list",res)
    })
  }
  // selectData(id, name, type){
  //   this.isSelected = true;
  //   this.selectedID = id;
  //   this.item.itemID = name;
  // }


  constructor(private _service:appService) { }

  ngOnInit() {
  }

}
