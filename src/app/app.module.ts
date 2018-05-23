import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule }    from '@angular/forms';
import { BsModalModule } from 'ng2-bs3-modal';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LocationComponent } from './components/location/location.component';
import { UsersComponent } from './components/users/users.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { AppRoutingModule } from './app.routes';
import { TestingComponent } from './components/testing/testing.component';
import { appService } from './service/app.service';
import { SampleComponent } from './components/sample/sample.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CourseComponent } from './components/course/course.component';
import { CoursecreateComponent } from './components/coursecreate/coursecreate.component';
import { CategoryComponent } from './components/category/category.component';
import { CourseplanComponent } from './components/courseplan/courseplan.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    LocationComponent,
    UsersComponent,
    PagenotfoundComponent,
    TestingComponent,
    SampleComponent,
    SidebarComponent,
    CourseComponent,
    CoursecreateComponent,
    CategoryComponent,
    CourseplanComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    BsModalModule,
    NgbModule.forRoot()
  ],
  providers: [
    appService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
