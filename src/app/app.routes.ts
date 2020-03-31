import { CustomFieldsListComponent } from './components/settings/custom-fields/custom-fields-list/custom-fields-list.component';
import { CustomFieldsComponent } from './components/settings/custom-fields/custom-fields.component';
import { LocationCreateComponent } from './components/settings/locations/location-create/location-create.component';
import { LocationListComponent } from './components/settings/locations/location-list/location-list.component';
import { LocationsComponent } from './components/settings/locations/locations.component';
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
  GradingComponent,
  AddTrackingModuleComponent,
  MainTrackingModuleComponent,
  ShareTrackingModuleComponent,
  SelectModuleComponent,
  CreateProgressComponent,
  CreateDataComponent
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
import { CustomFieldsCreateComponent } from './components/settings/custom-fields/custom-fields-create/custom-fields-create.component';
// imtport { LocationsComponent } from './components/settings/locations/locations.component';
// import { LocationsComponent } from './components/settings/locations/locations.component';
import { ResourceListComponent } from './components/tool/resource/resource-list/resource-list.component';
import { ResourceComponent } from './components/tool/resource/resource.component';
import { ResourceCreateComponent } from './components/tool/resource/resource-create/resource-create.component';
import { HolidayCalendarComponent } from './components/tool/holiday-calendar/holiday-calendar.component';
import { CalendarListComponent } from './components/tool/holiday-calendar/calendar-list/calendar-list.component';
import { CalendarCreateComponent } from './components/tool/holiday-calendar/calendar-create/calendar-create.component';
import { CalendarDetailComponent } from './components/tool/holiday-calendar/calendar-detail/calendar-detail.component';
import { TestWerkzToolsComponent } from './components/tool/test-werkz-tools/test-werkz-tools.component';
import { SharedProgressComponent } from './components/tool/shared-progress/shared-progress.component';
import { CreateAssessmentComponent } from './components/tool/create-assessment/create-assessment.component';
import { CreateSelfassessmentComponent } from './components/tool/create-selfassessment/create-selfassessment.component';
import { SharedSelfassessmentComponent } from './components/tool/shared-selfassessment/shared-selfassessment.component';
import { CreateUsergradingComponent } from './components/tool/create-usergrading/create-usergrading.component';
import { SharedUsergradingComponent } from './components/tool/shared-usergrading/shared-usergrading.component';

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
          { path: '', redirectTo: 'generaloverview', pathMatch: 'full' },
          {
            path: 'generaloverview',
            component: GeneralOverviewComponent
          },
          {
            path: 'invoicesetting-edit',
            component: InvoiceSettingEditComponent
          },
          {
            path: 'paymentsetting-edit',
            component: PaymentSettingEditComponent
          },
          {
            path: 'schedulesetting-edit',
            component: ScheduleSettingEditComponent
          }
        ]
      },
      {
        path: 'locations',
        component: LocationsComponent,
        children: [
          { path: '', redirectTo: 'location-list', pathMatch: 'full' },
          {
            path: 'location-list',
            component: LocationListComponent
          },
          {
            path: 'location-update/:id',
            component: LocationCreateComponent
          },
          {
            path: 'location-create',
            component: LocationCreateComponent
          }
        ]
      },
      {
        path: 'customfields',
        component: CustomFieldsComponent,
        children: [
          { path: '', redirectTo: 'customfields-list', pathMatch: 'full' },
          {
            path: 'customfields-list',
            component: CustomFieldsListComponent
          },
          {
            path: 'customfields-update/:id',
            component: CustomFieldsCreateComponent
          },
          {
            path: 'customfields-create',
            component: CustomFieldsCreateComponent
          }
        ]
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
        path: 'resource',
        component: ResourceComponent,
        children: [
          { path: '', redirectTo: 'resource-list', pathMatch: 'full' },
          {
            path: 'resource-list',
            component: ResourceListComponent
          },
          {
            path: 'resource-list/resource-create/:type/:id',
            component: ResourceCreateComponent
          }
        ]
      },
      {
        path: 'holiday-calendar',
        component: HolidayCalendarComponent,
        children: [
          { path: '', redirectTo: 'calendar-list', pathMatch: 'full' },
          {
            path: 'calendar-list',
            component: CalendarListComponent
          },
          {
            path: 'calendar-create',
            component: CalendarCreateComponent
          },
          {
            path: 'calendar-detail/:id',
            component: CalendarDetailComponent
          }
        ]
      },
      {
        path: 'testwerkztools',
        component: TestWerkzToolsComponent
      },
      {
        path: 'tracking-module',
        component: MainTrackingModuleComponent,
        // component: TrackingModuleComponent,
        children: [
          { path: '', redirectTo: 'lists', pathMatch: 'full' },
          {
            path: 'lists',
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
          },
          {
            path: 'selected-module',
            component: SelectModuleComponent
          },
          {
            path: 'create/1/:id',
            component: CreateProgressComponent
          },
          {
            path: 'edit/1/:mid/:id',
            component: CreateProgressComponent
          },
          {
            path: 'edit/4/:mid/:id',
            component: CreateDataComponent
          },
          {
            path: 'edit/5/:mid/:id',
            component: CreateSelfassessmentComponent
          },
          {
            path: 'edit/6/:mid/:id',
            component: CreateUsergradingComponent
          },
          {
            path: 'create/4/:id',
            component: CreateDataComponent
          },
          {
            path: 'share/1/:id',
            component: SharedProgressComponent
          },
          {
            path: 'create/3/:id',
            component: CreateAssessmentComponent
          },
          {
            path: 'create/5/:id',
            component: CreateSelfassessmentComponent
          },
          {
            path: 'share/5/:id',
            component: SharedSelfassessmentComponent
          },
          {
            path: 'create/6/:id',
            component: CreateUsergradingComponent
          },
          {
            path: 'share/6/:id',
            component: SharedUsergradingComponent
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
