import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CalendarModule } from 'angular-calendar';
import { ContentLoaderModule } from '@netbasal/ngx-content-loader';
import { OAuthModule } from 'angular-oauth2-oidc';
import { TimezonePickerModule } from 'ng2-timezone-selector';
import { DragulaModule } from 'ng2-dragula';
import { NgDragDropModule } from 'ng-drag-drop';
// import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Daterangepicker } from 'ng2-daterangepicker';
import { Ng2TelInputModule } from 'ng2-tel-input';
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
import { CalendarComponent } from './components/calendar/calendar.component';
import { RegionComponent } from './components/region/region.component';
import { AssignuserComponent } from './components/assignuser/assignuser.component';
import { HeaderComponent } from './components/header/header.component';
import { BlockUIModule } from 'ng-block-ui';
import { QuizwerkzComponent } from './components/quizwerkz/quizwerkz.component';
import { ToolsComponent } from './components/tools/tools.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule, ToastsManager } from 'ng5-toastr/ng5-toastr';
//import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { ToastOptions } from 'ng5-toastr';
import { ClickOutsideModule } from 'ng-click-outside';
import { TimepickerModule, SortableModule } from 'ngx-bootstrap';
import { ReportComponent } from './components/report/report.component';
import { StaffPerformanceReport } from './components/report/staffPerformance/staff.component';
import { StaffReportGraph } from './components/report/staffPerformance/graph/staffGraph.component';
import { CourseActivitiesReportGraph } from './components/report/courseActivities/graph/courseGraph.component';
import { StdEnrolmentReportGraph } from './components/report/studentEnrollment/graph/stdEnrolment.component';
import { MonthlyActiveStdReportGraph } from './components/report/monthlyActiveStudents/graph/masGraph.component';
import { StaffTeachingReportGraph } from './components/report/staffTeachingSchedule/graph/staffTeachingGraph.component';

import { CourseActivitiesReport } from './components/report/courseActivities/course.component';
import { StudentEnrollmentReport } from './components/report/studentEnrollment/enrollment.component';
import { MonthlyActiveStudentsReport } from './components/report/monthlyActiveStudents/mas.component';
import { StaffTeachingScheduleReport } from './components/report/staffTeachingSchedule/staffTeaching.component';

import { ApgComponent } from './components/apg/apg.component';
import { TemplateComponent } from './components/template/template.component';
import { ModuleComponent } from './components/module/module.component';
import { MinuteSecondsPipe } from './service/pipe/time.pipe';
import { DragScrollModule } from 'ngx-drag-scroll';
import { WeekDaysPipe } from './service/pipe/weekday.pipe';
import { ScheduleWeekDaysPipe } from './service/pipe/scheduleWeekDays.pipe';
import { GroupByPipe } from './service/pipe/groupby.pipe';
import { ConvertTimeFormatPipe } from './service/pipe/convertTimeFormat.pipe';
import { GetDayPipe } from './service/pipe/day.pipe';
import { GetFormatData } from './service/pipe/timeformat.pipe';
import { GetUtcTimePipe } from './service/pipe/utcTime.pipe';
import { GetUtcDatePipe } from './service/pipe/utcDate.pipe';
import { GetTimelineDatePipe } from './service/pipe/timelineDate.pipe';
import { GetTimelineDayPipe } from './service/pipe/timelineDay.pipe';
import { attandanceDayPipe } from './service/pipe/attendanceDate.pipe';
import { ttDayPipe } from './service/pipe/timetableday.pipe';
import { yearPipe } from './service/pipe/utcYear.pipe';
import { ttMonthPipe } from './service/pipe/timetablemonth.pipe';
import { ttTimePipe } from './service/pipe/timetabletime.pipe';
import { AmPmPipe } from './service/pipe/timetablename.pipe';
import { MapToIterable } from './service/pipe/map-to-iterable.pipe';
import { FilterPipe } from './service/pipe/filter.pipe';
import { StarRatingModule } from 'angular-star-rating';
import { ReadmoreComponent } from './components/readmore/readmore.component';
import { UserStaffComponent } from './components/user-staff/user-staff.component';
import { HomeComponent } from './components/home/home.component';
import { CustomfieldComponent } from './components/customfield/customfield.component';
import { EmailtemplateComponent } from './components/emailtemplate/emailtemplate.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { DateFormatPipe } from './service/pipe/dateformat.pipe';
import { HourMinsPipe } from './service/pipe/hourToMins.pipe';
import { calculatePMPipe } from './service/pipe/calculatePm.pipe';
import { TZDatePipe } from './service/pipe/tzdate.pipe';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { TestwerkzComponent } from './components/testwerkz/testwerkz.component';
import { MediumEditorModule } from 'angular2-medium-editor';
import { DndDirective } from './components/testwerkz/dnd.directive';
import { VideoTrimmerComponent } from './components/video-trimmer/video-trimmer.component';
import { SliderRangeComponent } from './components/video-trimmer/slider-range/slider-range.component';
import { FlexiComponent } from './components/flexi/flexi.component';
import { InterceptService } from './service/intercept.service';
import { InvoiceReportComponent } from './components/invoice-report/invoice-report.component';
import { UtcShortDatePipe } from './service/pipe/utc-short-date.pipe';
import { UtcFullDayPipe } from './service/pipe/utc-full-day.pipe';
import { ClassTabComponent } from './components/user-staff/class-tab/class-tab.component';

import { NgCircleProgressModule } from 'ng-circle-progress';
import { LeaveDetailsComponent } from './components/user-staff/leave-details/leave-details.component';
import { UtcDateAndDayPipe } from './service/pipe/utc-date-and-day.pipe';
// import { CalendarModule, DateAdapter } from 'angular-calendar';
// import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { TestLeaveUiComponent } from './components/test-leave-ui/test-leave-ui.component';

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
    CalendarComponent,
    RegionComponent,
    AssignuserComponent,
    HeaderComponent,
    QuizwerkzComponent,
    ToolsComponent,
    ReportComponent,
    StaffPerformanceReport,
    StaffReportGraph,
    CourseActivitiesReportGraph,
    StdEnrolmentReportGraph,
    MonthlyActiveStdReportGraph,
    StaffTeachingReportGraph,
    CourseActivitiesReport,
    StudentEnrollmentReport,
    MonthlyActiveStudentsReport,
    StaffTeachingScheduleReport,
    ApgComponent,
    TemplateComponent,
    ModuleComponent,
    MinuteSecondsPipe,
    WeekDaysPipe,
    ScheduleWeekDaysPipe,
    GroupByPipe,
    ConvertTimeFormatPipe,
    TestwerkzComponent,
    GetDayPipe,
    GetUtcTimePipe,
    GetFormatData,
    GetUtcDatePipe,
    GetTimelineDatePipe,
    GetTimelineDayPipe,
    attandanceDayPipe,
    yearPipe,
    ttDayPipe,
    ttMonthPipe,
    ttTimePipe,
    AmPmPipe,
    ReadmoreComponent,
    UserStaffComponent,
    HomeComponent,
    MapToIterable,
    FilterPipe,
    CustomfieldComponent,
    EmailtemplateComponent,
    ScheduleComponent,
    DateFormatPipe,
    HourMinsPipe,
    calculatePMPipe,
    TZDatePipe,
    InvoiceComponent,
    DndDirective,
    VideoTrimmerComponent,
    SliderRangeComponent,
    FlexiComponent,
    InvoiceReportComponent,
    UtcShortDatePipe,
    UtcFullDayPipe,
    ClassTabComponent,
    LeaveDetailsComponent,
    UtcDateAndDayPipe,
    TestLeaveUiComponent
  ],
  imports: [
    ContentLoaderModule,
    BrowserModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: '#78C000',
      innerStrokeColor: '#C7E596',
      animationDuration: 300
    }),
    HttpClientModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    TimezonePickerModule,
    NgbModule.forRoot(),
    Daterangepicker,
    BlockUIModule.forRoot(),
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    ClickOutsideModule,
    TimepickerModule.forRoot(),
    //ConfirmationPopoverModule.forRoot({
    // confirmButtonType: 'danger' // set defaults here
    //}),
    DragScrollModule,
    DragulaModule.forRoot(),
    SortableModule.forRoot(),
    NgDragDropModule.forRoot(),
    StarRatingModule,
    Ng2TelInputModule,
    MediumEditorModule,
    CalendarModule.forRoot()
  ],
  providers: [
    appService,
    DataService,
    LoggedInGuard,
    Title,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
