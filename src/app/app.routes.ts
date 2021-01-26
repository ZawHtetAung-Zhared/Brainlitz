import { TimetableComponent } from './components/timetable/timetable.component';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { Component } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegionComponent } from './components/region/region.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { ToolsComponent } from './components/tools/tools.component';
import { ReportComponent } from './components/report/report.component';
import { UserStaffComponent } from './components/user-staff/user-staff.component';
import { HomeComponent } from './components/home/home.component';
import { InvoiceComponent } from './components/invoice/invoice.component';

import { LoggedInGuard } from './service/loggedIn.guard';
import { ReviewComponent } from './components/review/review.component';
import { CoursecreateComponent } from './components/coursecreate/coursecreate.component';
import { TodayLessonsComponent } from './components/today-lessons/today-lessons.component';
import { CourseSearchComponent } from './components/course/course-search/course-search.component';

import {
  CourseComponent,
  AssignTaskComponent,
  CoursedetailComponent,
  OverviewComponent,
  CustomerComponent,
  AttendanceComponent,
  TasksComponent,
  LeaderboardComponent,
  MasteriesreportComponent,
  CourseListComponent,
  ReportDetailComponent,
  StudentListComponent,
  MasteryReportComponent,
  ReportDetail2Component
} from './components/course/index';
import { EnrollUserComponent } from './components/course/customer/enroll-user/enroll-user.component';
import {
  UserListComponent,
  CreateUserComponent,
  UserDetailComponent
} from './components/users/index';
import {
  UserStaffListComponent,
  UserStaffDetailComponent,
  CreateUserStaffComponent
} from './components/user-staff/index';

export const routes: Routes = [
  { path: '', redirectTo: '/region', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'region',
    component: RegionComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'customer',
    component: UsersComponent,
    // component: UserListComponent,
    canActivate: [LoggedInGuard],
    children: [
      { path: '', redirectTo: 'customerlist', pathMatch: 'full' },
      {
        path: 'customerlist',
        component: UserListComponent
      },
      {
        path: 'customercreate/:type/:userid',
        component: CreateUserComponent
      },
      {
        path: 'customerdetail/:userid',
        component: UserDetailComponent
      }
    ]
  },
  {
    path: 'schedule',
    component: ScheduleComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'staff',
    component: UserStaffComponent,
    canActivate: [LoggedInGuard],
    children: [
      { path: '', redirectTo: 'stafflist', pathMatch: 'full' },
      {
        path: 'stafflist',
        component: UserStaffListComponent
      },
      {
        path: 'staffdetail/:staffid',
        component: UserStaffDetailComponent
      },
      {
        path: 'staffcreate/:type/:staffid',
        component: CreateUserStaffComponent
      }
    ]
  },
  {
    path: 'course',
    // component: CourseComponent,
    component: CourseListComponent,
    canActivate: [LoggedInGuard]
    // children: [
    //   { path: '', redirectTo: 'overview', pathMatch: 'full' },
    //   {
    //     path: 'keyword',
    //     component: CourseSearchComponent
    //   }
    // ]
  },
  {
    path: 'coursedetail/:id/enroll',
    component: EnrollUserComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'coursecreate',
    component: CoursecreateComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'coursedetail/:id',
    component: CoursedetailComponent,
    canActivate: [LoggedInGuard],
    children: [
      { path: '', redirectTo: 'customers', pathMatch: 'full' },
      {
        path: 'overview',
        component: OverviewComponent
      },
      {
        path: 'customers',
        component: CustomerComponent
      },
      {
        path: 'tasks',
        component: TasksComponent
      },
      {
        path: 'attendance',
        component: AttendanceComponent
      },
      {
        path: 'leaderboard',
        component: LeaderboardComponent
      },
      {
        path: 'masteries-report',
        component: MasteriesreportComponent
      }
    ]
  },
  {
    path: 'masteriesdetail/:id',
    component: MasteryReportComponent,
    children: [
      { path: '', redirectTo: 'reportdetail', pathMatch: 'full' },
      {
        path: 'reportdetail',
        // component: ReportDetailComponent
        component: ReportDetail2Component
      },
      {
        path: 'studentlist/:id',
        component: StudentListComponent
      }
    ]
  },
  {
    path: 'tools',
    component: ToolsComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'report',
    component: ReportComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'review',
    component: ReviewComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'assignTask/:id',
    component: AssignTaskComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'today-lesson',
    component: TodayLessonsComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'timetable',
    component: TimetableComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: '**',
    component: PagenotfoundComponent
  }
];

export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(
  routes,
  { useHash: true }
);
