import { type } from 'os';
import { CourseComponent } from './../course.component';
import { appService } from './../../../service/app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  constructor(
    private router: Router,
    private _service: appService,
    public toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  public allTasks = {
    tasks: []
  };

  public regionId = localStorage.getItem('regionId');
  public courseId = '';
  public count: number;
  public tasks = [];
  public loading;

  ngOnInit() {
    this.loading = true;

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
  }

  goToAssignTask() {
    this.router.navigateByUrl('assignTask/' + this.courseId);
  }

  getAllTasksInfo() {
    this._service.getAllTasksInfo(this.regionId, this.courseId).subscribe(
      (res: any) => {
        this.allTasks = res;
        this.tasks = this.allTasks.tasks;
        console.log(this.tasks.length);
        setTimeout(() => {
          this.loading = false;
        }, 500);
      },
      err => {
        console.log(err);
        this.toastr.error('task error');
        //this.loading = false;
      }
    );
  }
}
