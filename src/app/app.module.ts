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
import {Ng2TelInputModule} from 'ng2-tel-input';
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LocationComponent } from './components/location/location.component';
import { UsersComponent } from './components/users/users.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { appService } from './service/app.service';
import { LoggedInGuard } from './service/loggedIn.guard';
import { DataService } from './service/data.service';
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
import { BlockUIModule } from 'ng-block-ui';
import { QuizwerkzComponent } from './components/quizwerkz/quizwerkz.component';
import { ToolsComponent } from './components/tools/tools.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastModule} from 'ng5-toastr/ng5-toastr';
//import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import {ToastOptions} from 'ng5-toastr';
import { ClickOutsideModule } from 'ng-click-outside';
import { TimepickerModule } from 'ngx-bootstrap';
import { ReportComponent } from './components/report/report.component';
import { ApgComponent } from './components/apg/apg.component';
import { TemplateComponent } from './components/template/template.component';
import { ModuleComponent } from './components/module/module.component';
import { MinuteSecondsPipe } from './service/pipe/time.pipe';
import { DragScrollModule } from 'ngx-drag-scroll';
import { WeekDaysPipe } from './service/pipe/weekday.pipe';
import { GroupByPipe } from './service/pipe/groupby.pipe';
import { ConvertTimeFormatPipe } from './service/pipe/convertTimeFormat.pipe';
import { GetDayPipe } from './service/pipe/day.pipe';
import { MapToIterable } from './service/pipe/map-to-iterable.pipe';
import { FilterPipe } from './service/pipe/filter.pipe';
import { StarRatingModule } from 'angular-star-rating';
import { ReadmoreComponent } from './components/readmore/readmore.component';
import { UserStaffComponent } from './components/user-staff/user-staff.component';
import { HomeComponent } from './components/home/home.component';

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
    HeaderComponent,
    QuizwerkzComponent,
    ToolsComponent,
    ReportComponent,
    ApgComponent,
    TemplateComponent,
    ModuleComponent,
    MinuteSecondsPipe,
    WeekDaysPipe,
    GroupByPipe,
    ConvertTimeFormatPipe,
    GetDayPipe,
    ReadmoreComponent,
    UserStaffComponent,
    HomeComponent,
    MapToIterable,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    TimezonePickerModule,
    NgbModule.forRoot(),
    BlockUIModule.forRoot(),
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    ClickOutsideModule,
    TimepickerModule.forRoot(),
    //ConfirmationPopoverModule.forRoot({
     // confirmButtonType: 'danger' // set defaults here
    //}),
    DragScrollModule,
    StarRatingModule,
    Ng2TelInputModule
  ],
  providers: [
    appService,
    DataService,
    LoggedInGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
