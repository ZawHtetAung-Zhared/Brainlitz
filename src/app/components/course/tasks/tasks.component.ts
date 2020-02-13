import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  goToAssignTask() {
    this.router.navigateByUrl('assignTask');
  }
}
