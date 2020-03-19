import { CustomfieldComponent } from './components/customfield/customfield.component';
import { GeneralOverviewComponent } from './components/settings/general/general-overview/general-overview.component';
import { PaymentSettingEditComponent } from './components/settings/general/payment-setting-edit/payment-setting-edit.component';
import { InvoiceSettingEditComponent } from './components/settings/general/invoice-setting-edit/invoice-setting-edit.component';
import { GeneralComponent } from './components/settings/general/general.component';

import { SettingsComponent } from './components/settings/settings.component';
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
  MainToolComponent,
  NotificationComponent,
  TrackingModuleComponent,
  SendHistoryComponent,
  SendNotificationComponent,
  AllTrackingModuleComponent,
  ProgressComponent,
  BadgeComponent,
  AssessmentComponent,
  DataComponent,
  SelfAssessmentComponent,
  GradingComponent
} from './components/tool/index';
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
import {
  AverageRatingsComponent,
  CourseActivitiesReport,
  StaffPerformanceReport,
  StudentEnrollmentReport,
  MonthlyActiveStudentsReport,
  StaffTeachingScheduleReport
} from './components/report/index';
import { InvoiceReportComponent } from './components/invoice-report/invoice-report.component';
import { ScheduleSettingEditComponent } from './components/settings/general/schedule-setting-edit/schedule-setting-edit.component';
import { LocationsComponent } from './components/settings/locations/locations.component';

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
    path: 'settings',
    component: SettingsComponent,
    children: [
      { path: '', redirectTo: 'general', pathMatch: 'full' },
      {
        path: 'general',
        component: GeneralComponent,
        children: [
          { path: '', redirectTo: 'general-overview', pathMatch: 'full' },
          {
            path: 'general-overview',
            component: GeneralOverviewComponent
          },
          {
            path: 'invoice-setting-edit',
            component: InvoiceSettingEditComponent
          },
          {
            path: 'payment-setting-edit',
            component: PaymentSettingEditComponent
          },
          {
            path: 'schedule-setting-edit',
            component: ScheduleSettingEditComponent
          }
        ]
      },
      {
        path: 'locations',
        component: LocationsComponent
      },
      {
        path: 'customfields',
        component: CustomfieldComponent
      }
    ]
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
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
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
    canActivate: [LoggedInGuard],
    children: [
      { path: '', redirectTo: 'invoice-report', pathMatch: 'full' },
      {
        path: 'invoice-report',
        component: InvoiceReportComponent
      },
      {
        path: 'average-rating',
        component: AverageRatingsComponent
      },
      {
        path: 'staff-performance',
        component: StaffPerformanceReport
      },
      {
        path: 'course-activities',
        component: CourseActivitiesReport
      },
      {
        path: 'student-enrollment',
        component: StudentEnrollmentReport
      },
      {
        path: 'monthly-active',
        component: MonthlyActiveStudentsReport
      },
      {
        path: 'teaching-schedule',
        component: StaffTeachingScheduleReport
      }
    ]
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
    path: 'tool-test',
    component: MainToolComponent,
    children: [
      { path: '', redirectTo: 'notification', pathMatch: 'full' },
      {
        path: 'notification',
        component: NotificationComponent,
        children: [
          { path: '', redirectTo: 'send-notification', pathMatch: 'full' },
          {
            path: 'send-notification',
            component: SendNotificationComponent
          },
          {
            path: 'send-history',
            component: SendHistoryComponent
          }
        ]
      },
      {
        path: 'tracking-module',
        component: TrackingModuleComponent,
        children: [
          { path: '', redirectTo: 'all', pathMatch: 'full' },
          {
            path: 'all',
            component: AllTrackingModuleComponent
          },
          {
            path: '1/:id',
            component: ProgressComponent
          },
          {
            path: '2/:id',
            component: BadgeComponent
          },
          {
            path: '3/:id',
            component: AssessmentComponent
          },

          {
            path: '4/:id',
            component: DataComponent
          },
          {
            path: '5/:id',
            component: SelfAssessmentComponent
          },
          {
            path: '6/:id',
            component: GradingComponent
          }
        ]
      }
    ]
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
