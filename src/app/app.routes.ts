import { NgModule, ModuleWithProviders } from '@angular/core';
import { Component } from '@angular/core'
import { Routes, RouterModule, Router } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegionComponent } from './components/region/region.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LocationComponent } from './components/location/location.component';
import { UsersComponent } from './components/users/users.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { CourseComponent } from './components/course/course.component';
import { CategoryComponent } from './components/category/category.component';
import { CoursecreateComponent } from './components/coursecreate/coursecreate.component';
import { CourseplanComponent } from './components/courseplan/courseplan.component';
import { HolidaysComponent } from './components/holidays/holidays.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { AssignuserComponent } from './components/assignuser/assignuser.component';
import { QuizwerkzComponent } from './components/quizwerkz/quizwerkz.component';
import { ToolsComponent } from './components/tools/tools.component';
import { ReportComponent } from './components/report/report.component';
import { UserStaffComponent } from './components/user-staff/user-staff.component';
import { HomeComponent } from './components/home/home.component';

import { LoggedInGuard } from './service/loggedIn.guard';

export const routes: Routes = [
    
    { path: '',   
      redirectTo: '/region', 
      pathMatch: 'full' 
    },
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
       path: 'category',
       component: CategoryComponent,
       canActivate: [LoggedInGuard]
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'location',
        component: LocationComponent,
        canActivate: [LoggedInGuard]
    },
    {
        path: 'customer',
        component: UsersComponent,
        canActivate: [LoggedInGuard]
    },
    {
        path: 'staff',
        component: UserStaffComponent,
        canActivate: [LoggedInGuard]
    },
    {
       path: 'course',
       component: CourseComponent,
       canActivate: [LoggedInGuard] 
    },
    {
      path: 'courseCreate',
      component: CoursecreateComponent,
      canActivate: [LoggedInGuard]
    },
    {
       path: 'courseplan',
       component: CourseplanComponent,
       canActivate: [LoggedInGuard]
    },
    {
       path: 'holidays',
       component: HolidaysComponent,
       canActivate: [LoggedInGuard]
    },
    {
       path: 'calendar',
       component: CalendarComponent,
       canActivate: [LoggedInGuard]
    },
    {
      path: 'assign',
      component: AssignuserComponent,
      canActivate: [LoggedInGuard]
    },
    {
      path: 'quizwerkz',
      component: QuizwerkzComponent,
      canActivate: [LoggedInGuard]
    },
    {
      path: 'tools',
      component: ToolsComponent,
      canActivate: [LoggedInGuard]
    },
    {
      path: 'report',
      component: ReportComponent
    },
    {
      path:'**',
      component:  PagenotfoundComponent
    }
];

export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(routes,{ useHash: true });

