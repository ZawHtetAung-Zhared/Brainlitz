import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { appService } from '../../../service/app.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  public chart: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _service: appService
  ) {}

  ngOnInit() {
    this.chart = new Chart('canvas', {
      type: 'doughnut',
      data: {
        labels: ['Data1', 'Data2', 'Data3', 'Data4'],
        datasets: [
          {
            data: [25, 50, 20, 5],
            backgroundColor: ['#2D5E9E', '#46AACE', '#DCECC9', '#f7f9fa']
          }
        ]
      },
      options: {
        responsive: true,
        tooltips: {
          enabled: false
        },
        cutoutPercentage: 75,
        title: {
          display: false,
          position: 'top',
          fontStyle: 'bold',
          fontSize: 0,
          fullWidth: false,
          padding: 0
        },
        legend: {
          display: false,
          position: 'top',
          fullWidth: false,
          labels: {
            display: false,
            usePointStyle: true,
            fontSize: 15,
            fontStyle: 'bold'
          }
        }
      }
    });

    this.chart = new Chart('canvas2', {
      type: 'doughnut',
      data: {
        labels: ['Data1', 'Data2', 'Data3', 'Data4'],
        datasets: [
          {
            data: [55, 45, 60, 90],
            backgroundColor: ['#f7f9fa', '#DCECC9', '#2D5E9E', '#46AACE']
          }
        ]
      },
      options: {
        responsive: true,
        tooltips: {
          enabled: false
        },
        cutoutPercentage: 75,
        title: {
          display: false,
          position: 'top',
          fontStyle: 'bold',
          fontSize: 0,
          fullWidth: false,
          padding: 0
        },
        legend: {
          display: false,
          position: 'top',
          fullWidth: false,
          labels: {
            display: false,
            usePointStyle: true,
            fontSize: 15,
            fontStyle: 'bold'
          }
        }
      }
    });

    this.courseId = localStorage.getItem('COURSEID');
    console.log('CIDO', this.courseId);
    this.getOverviewList(this.courseId);
  }

  ngAfterViewInit() {
    console.log('AfterViewInit');
  }
  public on: boolean = true;
  public courseId: any;
  public pplLists: any;
  public customerlist: any;
  public regionId = localStorage.getItem('regionId');
  public enrolledcount: any = 0;
  public invoices: any;
  public unpaid: any = 0;
  public scheduled: any = 0;
  public custom: any = 0;

  public lessonList: any = {
    attendance: '',
    lessonStartDate: ''
  };
  public tempDate: Array<any> = [];
  public index: any;
  public indexDay: any = {
    attendance: '',
    lessonStartDate: ''
  };
  public attendance: any = {
    attendance: ''
  };
  public present: any = 0;
  public absent: any = 0;
  public total: any = 0;
  public prevflag: boolean = true;
  public nextflag: boolean = true;
  public sparkwerkz: boolean = false;
  public seat_left: any;
  public seat_taken: any;
  // toggle() {
  //   this.on = !this.on;
  // }

  enrollCustomer(CID) {
    localStorage.setItem('userType', 'customer');
    this.router.navigateByUrl(`/coursedetail/${this.courseId}/enroll`);
  }

  getOverviewList(courseId) {
    this._service.getOverviewList().subscribe(
      (res: any) => {
        console.log('OOL', res);
        this.pplLists = res.courseInfo.students;
        this.invoices = res.courseInfo.invoices;
        if (this.invoices.length > 0) {
          for (var k = 0; k < this.invoices.length; k++) {
            if (this.invoices[k]._id == 'UNPAID') {
              this.unpaid = this.invoices[k].count;
            }
          }
        }
        this.enrolledcount = res.courseInfo.enrolledStudentCount;
        this.seat_left = res.courseInfo.seat_left;
        this.seat_taken = res.courseInfo.seat_taken;
        if (localStorage.getItem('SPC') == 'true') {
          console.log('Sparkwerkz Course', localStorage.getItem('SPC'));
          this.scheduled = res.tasks[0] ? res.tasks[0].count : 0;
          this.custom = res.tasks[1] ? res.tasks[1].count : 0;
          this.sparkwerkz = true;
        } else {
          console.log('Not a Sparkwerkz Course', localStorage.getItem('SPC'));
          this.sparkwerkz = false;
        }
        if (res.courseInfo.lessons.length > 0) {
          this.lessonList = res.courseInfo.lessons;
          this.lessonList.sort(function(a, b) {
            return (
              new Date(a.lessonStartDate).getTime() -
              new Date(b.lessonStartDate).getTime()
            );
          });
          console.log(this.lessonList, ' sorted lessonlist');

          this.addlesson(this.lessonList);

          console.log('Invoice', this.invoices);
          this.customerlist = this.pplLists.slice(0, 8);
          console.log('UO', this.pplLists);
          if (this.pplLists.length > 0) {
            this.on = false;
            console.log('On', this.on);
          }
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  goToAttendance() {
    this.router.navigateByUrl(`/coursedetail/${this.courseId}/attendance`);
  }
  public addlesson(lessonlist) {
    for (var i = 0; i < lessonlist.length; i++) {
      // console.log("LList", lessonlist[i].lessonStartDate);
      this.tempDate.push(lessonlist[i].lessonStartDate.slice(0, 10));
    }
    this.tempDate.sort();
    var Today = new Date().toISOString().slice(0, 10);
    // console.log("LLsort", this.tempDate);
    console.log(this.tempDate.indexOf(Today), 'TD', Today);
    if (this.tempDate.includes(Today)) {
      console.log('Has Today', this.tempDate);
      this.index = this.tempDate.indexOf(Today.slice(0, 10));
      this.indexDay = this.lessonList[this.index];
      console.log(this.indexDay, 'IDex');
      this.attendance = this.indexDay.attendance;
      this.total = this.lessonList[this.index].total;
      console.log('total', this.total);

      for (var j = 0; j < this.attendance.length; j++) {
        if (this.attendance[j].attendance == null) {
          this.present = 0;
          this.absent = 0;
          console.log('null attendance');
        }
        if (this.attendance[j].attendance == 'absent') {
          this.absent = this.attendance[j].count;
          console.log('absent', this.absent);
        }
        if (this.attendance[j].attendance == 'present') {
          this.present = this.attendance[j].count;
          console.log('present', this.present);
        }
      }
    } else {
      console.log("Hasn't Today");
      this.tempDate.push(Today.slice(0, 10));
      this.tempDate.sort();
      console.log('Today added', this.tempDate); //Today date added to the lesson list
      this.index = this.tempDate.indexOf(Today.slice(0, 10)) - 1; //index is set to today date in lesson list
      console.log('index', this.index);
      console.log('Today index', this.tempDate.indexOf(Today.slice(0, 10)));
      this.tempDate.splice(this.index + 1, 1); //added today date is removed from lesson list
      console.log('Today removed', this.tempDate);
      if (this.index < 0) {
        this.index = 0;
        this.prevflag = false;
      }
      this.indexDay = this.lessonList[this.index];
      console.log(this.indexDay, 'IDex');
      this.attendance = this.indexDay.attendance;
      this.total = this.lessonList[this.index].total;
      console.log('total', this.total);

      for (var j = 0; j < this.attendance.length; j++) {
        if (this.attendance[j].attendance == null) {
          this.present = 0;
          this.absent = 0;
          console.log('null attendance');
        }
        if (this.attendance[j].attendance == 'absent') {
          this.absent = this.attendance[j].count;
          console.log('absent', this.absent);
        }
        if (this.attendance[j].attendance == 'present') {
          this.present = this.attendance[j].count;
          console.log('present', this.present);
        }
      }
    }
  }

  nextDate() {
    this.absent = 0;
    this.present = 0;
    this.index++;
    this.prevflag = true;
    if (this.index == this.lessonList.length - 1) {
      console.log('Over', this.index);
      this.nextflag = false;
    }
    this.indexDay = this.lessonList[this.index];
    console.log('nextDate', this.indexDay);
    this.attendance = this.indexDay.attendance;
    this.total = this.lessonList[this.index].total;
    console.log('total', this.total);

    for (var j = 0; j < this.attendance.length; j++) {
      if (this.attendance[j].attendance == null) {
        this.present = 0;
        this.absent = 0;
        console.log('null attendance');
      }
      if (this.attendance[j].attendance == 'absent') {
        this.absent = this.attendance[j].count;
        console.log('absent', this.absent);
      }
      if (this.attendance[j].attendance == 'present') {
        this.present = this.attendance[j].count;
        console.log('present', this.present);
      }
    }
  }

  previousDate() {
    this.absent = 0;
    this.present = 0;
    this.index--;
    this.nextflag = true;
    if (this.index == 0) {
      console.log('Under', this.index);
      this.prevflag = false;
    }
    this.indexDay = this.lessonList[this.index];
    console.log('previousDate', this.indexDay);
    this.attendance = this.indexDay.attendance;
    this.absent = this.attendance[0].count;

    this.total = this.lessonList[this.index].total;
    console.log('total', this.total);

    for (var j = 0; j < this.attendance.length; j++) {
      if (this.attendance[j].attendance == null) {
        this.present = 0;
        this.absent = 0;
        console.log('null attendance');
      }
      if (this.attendance[j].attendance == 'absent') {
        this.absent = this.attendance[j].count;
        console.log('absent', this.absent);
      }
      if (this.attendance[j].attendance == 'present') {
        this.present = this.attendance[j].count;
        console.log('present', this.present);
      }
    }
  }

  goToAssignTask() {
    this.router.navigateByUrl('assignTask/' + this.courseId);
  }
}
