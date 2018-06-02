import { Component, OnInit } from '@angular/core';
import { appService } from '../../service/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  constructor(private router: Router, private _service: appService) { }

  ngOnInit() {
  	this.getCourseLists();
  }

  courseList: any;
  getCourseLists(){
    this._service.getAllCourse('id')
    .subscribe((res:any) => {
      console.log(res);
      this.courseList = res;
    })
  }
  view(){
  	console.log("View");
  }

}
