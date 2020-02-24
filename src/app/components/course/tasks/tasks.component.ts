import { type } from 'os';
import { CourseComponent } from './../course.component';
import { appService } from './../../../service/app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  constructor(
    private router: Router,
    private _service: appService,
    private route: ActivatedRoute
  ) {}

  // tasks: [
  //   {
  //     templateId: '5e3e67d81742aa002c196b1a',
  //     taskType: 'SCHEDULED',
  //     name: 'template 1',
  //     distributionMode: 'MICROLEARNING',
  //     overview: {
  //       type: 'tasks',
  //       count: 1
  //     },
  //     taskStartDate: '2020-02-07T00:00:00.000Z',
  //     taskEndDate: '2020-02-14T00:00:00.000Z'
  //   }
  // ]

  public allTasks = {
    tasks: [
      // {
      //   templateId: '',
      //   taskType: '',
      //   name: '',
      //   distributionMode: '',
      //   overview: {
      //     type: '',
      //     count: 0
      //   },
      //   taskStartDate: '',
      //   taskEndDate: ''
      // }
    ]
  };

  public regionId = localStorage.getItem('regionId');
  public courseId = '';
  public count: number;
  public tasks = [];

  ngOnInit() {
    //this.courseId = '5df8813bd0f06a163d832f1c';//for testing
    // this.route.params.subscribe(params => {
    //   this.courseId = params.id;
    //   localStorage.setItem('COURSEID', this.courseId);
    //   console.log('CourseID', this.courseId);
    //   localStorage.setItem('course_id', this.courseId);
    // });
    this.courseId = localStorage.getItem('COURSEID');
    console.log('this.courseId');
    console.log(this.courseId);
    this.getAllTasksInfo();
    this.tasks = this.allTasks.tasks;
    console.log(this.tasks.length);
  }

  goToAssignTask() {
    this.router.navigateByUrl('assignTask/' + this.courseId);
  }

  getAllTasksInfo() {
    this._service
      .getAllTasksInfo(this.regionId, this.courseId)
      .subscribe((res: any) => {
        this.allTasks = res;
        console.log(typeof this.allTasks);
        console.log(this.allTasks);
      });
  }
}
