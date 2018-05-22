import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coursecreate',
  templateUrl: './coursecreate.component.html',
  styleUrls: ['./coursecreate.component.css']
})
export class CoursecreateComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  createCourse(){
  	console.log("createCourse works");
  }

}
