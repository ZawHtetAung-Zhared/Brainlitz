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

export const routes: Routes = [
    
    {
        path: '',
        component: RegionComponent
    },
    {
       path: 'region',
       component: RegionComponent 
    },
    {
       path: 'dashboard',
       component: DashboardComponent
    },
    {
       path: 'category',
       component: CategoryComponent 
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'location',
        component: LocationComponent
    },
    {
        path: 'user',
        component: UsersComponent
    },
    {
       path: 'course',
       component: CourseComponent 
    },
    {
      path: 'courseCreate',
      component: CoursecreateComponent
    },
    {
       path: 'courseplan',
       component: CourseplanComponent
    },
    {
       path: 'holidays',
       component: HolidaysComponent
    },
    {
       path: 'calendar',
       component: CalendarComponent
    },
    {
      path: 'assign',
      component: AssignuserComponent
    },
    {
      path: 'quizwerkz',
      component: QuizwerkzComponent
    },
    {
      path: 'tools',
      component: ToolsComponent
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

