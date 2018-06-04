import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { Routes, RouterModule} from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule }    from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { OAuthModule } from 'angular-oauth2-oidc';
import { TimezonePickerModule } from 'ng2-timezone-selector';
// import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LocationComponent } from './components/location/location.component';
import { UsersComponent } from './components/users/users.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { appService } from './service/app.service';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CourseComponent } from './components/course/course.component';
import { CoursecreateComponent } from './components/coursecreate/coursecreate.component';
import { CategoryComponent } from './components/category/category.component';
import { CourseplanComponent } from './components/courseplan/courseplan.component';
import { HolidaysComponent } from './components/holidays/holidays.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { RegionComponent } from './components/region/region.component';
import { AssignuserComponent } from './components/assignuser/assignuser.component';
import { HeaderComponent } from './components/header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    LocationComponent,
    UsersComponent,
    PagenotfoundComponent,
    SidebarComponent,
    CourseComponent,
    CoursecreateComponent,
    CategoryComponent,
    CourseplanComponent,
    HolidaysComponent,
    CalendarComponent,
    RegionComponent,
    AssignuserComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    TimezonePickerModule,
    NgbModule.forRoot(),
    
  ],
  providers: [
    appService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
