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
  public templength: any = 0;
  public invoices: any;
  public unpaid: any = 0;
  public scheduled: any = 0;
  public custom: any = 0;
  public lessonList: any;
  public tempDate: Array<any> = [];
  public index: any;
  public indexDay: any = {
    attendance: '',
    lessonDate: ''
  };
  public attendance: any;
  public present: any = 0;
  public absent: any = 0;

  // toggle() {
  //   this.on = !this.on;
  // }

  enrollCustomer(CID) {
    this.router.navigateByUrl(`/coursedetail/${this.courseId}/enroll`);
  }

  getOverviewList(courseId) {
    this._service.getOverviewList().subscribe(
      (res: any) => {
        console.log('OOL', res);
        this.pplLists = res.courseInfo.students;
        this.invoices = res.courseInfo.invoices;
        this.unpaid = this.invoices[1].count;
        this.scheduled = res.tasks[0].count;
        this.customerlist = res.tasks[1].count;
        this.lessonList = res.courseInfo.lessons;
        this.lessonList.sort(function(a, b) {
          return (
            new Date(a.lessonDate).getTime() - new Date(b.lessonDate).getTime()
          );
        });
        console.log(this.lessonList, ' gggg n');

        this.addlesson(this.lessonList);

        console.log('Invoice', this.invoices);
        this.customerlist = this.pplLists.slice(0, 8);
        this.templength = this.pplLists.length;
        console.log('UO', this.pplLists);
        if (this.pplLists.length > 0) {
          this.on = false;
          console.log('On', this.on);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  public addlesson(lessonlist) {
    for (var i = 0; i < lessonlist.length; i++) {
      // console.log("LList", lessonlist[i].lessonDate);
      this.tempDate.push(lessonlist[i].lessonDate.slice(0, 10));
    }
    this.tempDate.sort();
    var Today = new Date().toISOString();
    // console.log("LLsort", this.tempDate);
    console.log('TD', Today.slice(0, 10));
    if (this.tempDate.includes(Today)) {
      console.log('Has Today');
      this.index = this.tempDate.indexOf(Today.slice(0, 10));
    } else {
      console.log("Hasn't Today");
      this.tempDate.push(Today.slice(0, 10));
      this.tempDate.sort();
      // console.log("Today added",this.tempDate);
      this.index = this.tempDate.indexOf(Today.slice(0, 10)) - 1;
      console.log('Today index', this.index);
      this.tempDate.splice(this.index + 1, 1);
      console.log('Today removed', this.tempDate);
      this.indexDay = this.lessonList[this.index];
      console.log(this.indexDay, 'IDex');
      this.attendance = this.indexDay.attendance;
      this.absent = this.attendance[0].count;
      // this.present = this.attendance[1].count?this.attendance[1].count:0;
      if (this.attendance.length > 1) {
        this.present = this.attendance[1].count;
      } else {
        this.present = 0;
      }
    }
  }

  nextDate() {
    this.index++;
    if (this.index > this.indexDay.length) {
      console.log('Over');
    } else {
      this.indexDay = this.lessonList[this.index];
      console.log('nextDate', this.indexDay);
      this.attendance = this.indexDay.attendance;
      this.absent = this.attendance[0].count;
      // this.present = this.attendance[1].count?this.attendance[1].count:0;
      if (this.attendance.length > 1) {
        this.present = this.attendance[1].count;
      } else {
        this.present = 0;
      }
    }
  }

  previousDate() {
    this.index--;
    if (this.index < 0) {
      console.log('Under');
    } else {
      this.indexDay = this.lessonList[this.index];
      console.log('previousDate', this.indexDay);
      this.attendance = this.indexDay.attendance;
      this.absent = this.attendance[0].count;
      // this.present = this.attendance[1].count?this.attendance[1].count:0;
      if (this.attendance.length > 1) {
        this.present = this.attendance[1].count;
      } else {
        this.present = 0;
      }
    }
  }
}
