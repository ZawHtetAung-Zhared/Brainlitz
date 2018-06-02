import { NgModule, ModuleWithProviders } from '@angular/core';
import { Component } from '@angular/core'
import { Routes, RouterModule, Router } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LocationComponent } from './components/location/location.component';
import { UsersComponent } from './components/users/users.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { TestingComponent } from './components/testing/testing.component';
import { SampleComponent } from './components/sample/sample.component';
import { CourseComponent } from './components/course/course.component';
import { CategoryComponent } from './components/category/category.component';
import { CoursecreateComponent } from './components/coursecreate/coursecreate.component';
import { CourseplanComponent } from './components/courseplan/courseplan.component';
import { HolidaysComponent } from './components/holidays/holidays.component';
import { CalendarComponent } from './components/calendar/calendar.component';

export const routes: Routes = [
    
    {
        path: '',
        component: LocationComponent
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
        path: 'testing',
        component: TestingComponent
    },
    {
        path: 'sample',
        component: SampleComponent
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
      path:'**',
      component:  PagenotfoundComponent
    }
];

export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(routes,{ useHash: true });

