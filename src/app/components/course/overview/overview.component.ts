import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { appService } from '../../../service/app.service';
import { DataService } from '../../../service/data.service';
import { Chart } from 'chart.js';
import { DatePipe, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
  providers: [DatePipe]
})
export class OverviewComponent implements OnInit {
  public chart: any;
  public Nomasteryflag: boolean = true;
  public total_no_of_seats: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _service: appService,
    private _data: DataService,
    private datePipe: DatePipe
  ) {}
  testing: any = [1, 2];
  testingli: any = [1, 2];
  public loading = true;
  public loadingMastery = true;
  public attandanceIndex: any;
  public selectedAttandance: any = {};
  ngOnInit() {
    this.courseId = localStorage.getItem('COURSEID');
    console.log('CIDO', this.courseId);
    this.getOverviewList(this.courseId);
    // this.getMastery();
    this.getOverviewMastery();
    if (localStorage.getItem('SPC') == 'true') this.sparkwerkz = true;
    else this.sparkwerkz = false;
  }
  public cc = 1;
  ngAfterViewInit() {}
  public todayflag: boolean = false;
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
  public outerArray: any;
  public coursetype: any;

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
  public masteryStudentCount: any;
  mastery: any = [
    {
      id: '5dda85cfb1c96001c43267bc',
      name: 'Light Energy',
      masteries: [
        {
          masteryId: 'ley-01-01',
          shortMasteryName: 'Natural sources of light 1',
          question:
            "<text index=0 value='Which of the following gives off its own light?' ></text>",
          userMasteries: {
            NEW: {
              users: [],
              count: 0,
              percentage: 0
            },
            INPROGRESS: {
              users: [],
              count: 0,
              percentage: 0
            },
            STRUGGLE: {
              users: [],
              count: 0,
              percentage: 0
            },
            MASTERED: {
              users: [],
              count: 0,
              percentage: 0
            }
          },
          totalUserCount: 0
        },
        {
          masteryId: 'ley-01-02',
          shortMasteryName: 'Natural sources of light 2',
          question:
            "<text index=0 value='Which of the following gives off its own light?' ></text>",
          userMasteries: {
            NEW: {
              users: [],
              count: 0,
              percentage: 0
            },
            INPROGRESS: {
              users: [],
              count: 0,
              percentage: 0
            },
            STRUGGLE: {
              users: [],
              count: 0,
              percentage: 0
            },
            MASTERED: {
              users: [],
              count: 0,
              percentage: 0
            }
          },
          totalUserCount: 0
        },
        {
          masteryId: 'ley-01-03',
          shortMasteryName: 'Natural sources of light 3',
          question:
            "<text index=0 value='Which of the following gives off its own light?' ></text>",
          userMasteries: {
            NEW: {
              users: [],
              count: 0,
              percentage: 0
            },
            INPROGRESS: {
              users: [],
              count: 0,
              percentage: 0
            },
            STRUGGLE: {
              users: [],
              count: 0,
              percentage: 0
            },
            MASTERED: {
              users: [],
              count: 0,
              percentage: 0
            }
          },
          totalUserCount: 0
        }
      ],
      totalMasteryCount: 3,
      totalUserMasteryCount: 15,
      masteryCountInNumber: {
        NEW: 0,
        INPROGRESS: 0,
        STRUGGLE: 0,
        MASTERED: 0
      },
      masteryCountInPercentage: {
        NEW: '5',
        INPROGRESS: '10',
        STRUGGLE: '25',
        MASTERED: '50'
      }
    },
    {
      id: '6dda85cfb1c96001c43267bc',
      name: 'Heat Energy',
      masteries: [
        {
          masteryId: 'ley-01-01',
          shortMasteryName: 'Natural sources of light 1',
          question:
            "<text index=0 value='Which of the following gives off its own light?' ></text>",
          userMasteries: {
            NEW: {
              users: [],
              count: 0,
              percentage: 0
            },
            INPROGRESS: {
              users: [],
              count: 0,
              percentage: 0
            },
            STRUGGLE: {
              users: [],
              count: 0,
              percentage: 0
            },
            MASTERED: {
              users: [],
              count: 0,
              percentage: 0
            }
          },
          totalUserCount: 0
        },
        {
          masteryId: 'ley-01-02',
          shortMasteryName: 'Natural sources of light 2',
          question:
            "<text index=0 value='Which of the following gives off its own light?' ></text>",
          userMasteries: {
            NEW: {
              users: [],
              count: 0,
              percentage: 0
            },
            INPROGRESS: {
              users: [],
              count: 0,
              percentage: 0
            },
            STRUGGLE: {
              users: [],
              count: 0,
              percentage: 0
            },
            MASTERED: {
              users: [],
              count: 0,
              percentage: 0
            }
          },
          totalUserCount: 0
        },
        {
          masteryId: 'ley-01-03',
          shortMasteryName: 'Natural sources of light 3',
          question:
            "<text index=0 value='Which of the following gives off its own light?' ></text>",
          userMasteries: {
            NEW: {
              users: [],
              count: 0,
              percentage: 0
            },
            INPROGRESS: {
              users: [],
              count: 0,
              percentage: 0
            },
            STRUGGLE: {
              users: [],
              count: 0,
              percentage: 0
            },
            MASTERED: {
              users: [],
              count: 0,
              percentage: 0
            }
          },
          totalUserCount: 0
        }
      ],
      totalMasteryCount: 11,
      totalUserMasteryCount: 87,
      masteryCountInNumber: {
        NEW: 0,
        INPROGRESS: 0,
        STRUGGLE: 0,
        MASTERED: 0
      },
      masteryCountInPercentage: {
        NEW: '15',
        INPROGRESS: '35',
        STRUGGLE: '5',
        MASTERED: '40'
      }
    },
    {
      id: '5dda85cfb1c96001c43267bc',
      name: 'Lightning Energy',
      masteries: [
        {
          masteryId: 'ley-01-01',
          shortMasteryName: 'Natural sources of light 1',
          question:
            "<text index=0 value='Which of the following gives off its own light?' ></text>",
          userMasteries: {
            NEW: {
              users: [],
              count: 0,
              percentage: 0
            },
            INPROGRESS: {
              users: [],
              count: 0,
              percentage: 0
            },
            STRUGGLE: {
              users: [],
              count: 0,
              percentage: 0
            },
            MASTERED: {
              users: [],
              count: 0,
              percentage: 0
            }
          },
          totalUserCount: 0
        },
        {
          masteryId: 'ley-01-02',
          shortMasteryName: 'Natural sources of light 2',
          question:
            "<text index=0 value='Which of the following gives off its own light?' ></text>",
          userMasteries: {
            NEW: {
              users: [],
              count: 0,
              percentage: 0
            },
            INPROGRESS: {
              users: [],
              count: 0,
              percentage: 0
            },
            STRUGGLE: {
              users: [],
              count: 0,
              percentage: 0
            },
            MASTERED: {
              users: [],
              count: 0,
              percentage: 0
            }
          },
          totalUserCount: 0
        },
        {
          masteryId: 'ley-01-03',
          shortMasteryName: 'Natural sources of light 3',
          question:
            "<text index=0 value='Which of the following gives off its own light?' ></text>",
          userMasteries: {
            NEW: {
              users: [],
              count: 0,
              percentage: 0
            },
            INPROGRESS: {
              users: [],
              count: 0,
              percentage: 0
            },
            STRUGGLE: {
              users: [],
              count: 0,
              percentage: 0
            },
            MASTERED: {
              users: [],
              count: 0,
              percentage: 0
            }
          },
          totalUserCount: 0
        }
      ],
      totalMasteryCount: 7,
      totalUserMasteryCount: 67,
      masteryCountInNumber: {
        NEW: 0,
        INPROGRESS: 0,
        STRUGGLE: 0,
        MASTERED: 0
      },
      masteryCountInPercentage: {
        NEW: '20',
        INPROGRESS: '10',
        STRUGGLE: '60',
        MASTERED: '45'
      }
    },
    {
      id: '5dda85cfb1c96001c43267bc',
      name: 'Water Energy',
      masteries: [
        {
          masteryId: 'ley-01-01',
          shortMasteryName: 'Natural sources of light 1',
          question:
            "<text index=0 value='Which of the following gives off its own light?' ></text>",
          userMasteries: {
            NEW: {
              users: [],
              count: 0,
              percentage: 0
            },
            INPROGRESS: {
              users: [],
              count: 0,
              percentage: 0
            },
            STRUGGLE: {
              users: [],
              count: 0,
              percentage: 0
            },
            MASTERED: {
              users: [],
              count: 0,
              percentage: 0
            }
          },
          totalUserCount: 0
        },
        {
          masteryId: 'ley-01-02',
          shortMasteryName: 'Natural sources of light 2',
          question:
            "<text index=0 value='Which of the following gives off its own light?' ></text>",
          userMasteries: {
            NEW: {
              users: [],
              count: 0,
              percentage: 0
            },
            INPROGRESS: {
              users: [],
              count: 0,
              percentage: 0
            },
            STRUGGLE: {
              users: [],
              count: 0,
              percentage: 0
            },
            MASTERED: {
              users: [],
              count: 0,
              percentage: 0
            }
          },
          totalUserCount: 0
        },
        {
          masteryId: 'ley-01-03',
          shortMasteryName: 'Natural sources of light 3',
          question:
            "<text index=0 value='Which of the following gives off its own light?' ></text>",
          userMasteries: {
            NEW: {
              users: [],
              count: 0,
              percentage: 0
            },
            INPROGRESS: {
              users: [],
              count: 0,
              percentage: 0
            },
            STRUGGLE: {
              users: [],
              count: 0,
              percentage: 0
            },
            MASTERED: {
              users: [],
              count: 0,
              percentage: 0
            }
          },
          totalUserCount: 0
        }
      ],
      totalMasteryCount: 6,
      totalUserMasteryCount: 34,
      masteryCountInNumber: {
        NEW: 0,
        INPROGRESS: 0,
        STRUGGLE: 0,
        MASTERED: 0
      },
      masteryCountInPercentage: {
        NEW: '5',
        INPROGRESS: '55',
        STRUGGLE: '30',
        MASTERED: '24'
      }
    },
    {
      id: '5dda85cfb1c96001c43267bc',
      name: 'Grass Energy',
      masteries: [
        {
          masteryId: 'ley-01-01',
          shortMasteryName: 'Natural sources of light 1',
          question:
            "<text index=0 value='Which of the following gives off its own light?' ></text>",
          userMasteries: {
            NEW: {
              users: [],
              count: 0,
              percentage: 0
            },
            INPROGRESS: {
              users: [],
              count: 0,
              percentage: 0
            },
            STRUGGLE: {
              users: [],
              count: 0,
              percentage: 0
            },
            MASTERED: {
              users: [],
              count: 0,
              percentage: 0
            }
          },
          totalUserCount: 0
        },
        {
          masteryId: 'ley-01-02',
          shortMasteryName: 'Natural sources of light 2',
          question:
            "<text index=0 value='Which of the following gives off its own light?' ></text>",
          userMasteries: {
            NEW: {
              users: [],
              count: 0,
              percentage: 0
            },
            INPROGRESS: {
              users: [],
              count: 0,
              percentage: 0
            },
            STRUGGLE: {
              users: [],
              count: 0,
              percentage: 0
            },
            MASTERED: {
              users: [],
              count: 0,
              percentage: 0
            }
          },
          totalUserCount: 0
        },
        {
          masteryId: 'ley-01-03',
          shortMasteryName: 'Natural sources of light 3',
          question:
            "<text index=0 value='Which of the following gives off its own light?' ></text>",
          userMasteries: {
            NEW: {
              users: [],
              count: 0,
              percentage: 0
            },
            INPROGRESS: {
              users: [],
              count: 0,
              percentage: 0
            },
            STRUGGLE: {
              users: [],
              count: 0,
              percentage: 0
            },
            MASTERED: {
              users: [],
              count: 0,
              percentage: 0
            }
          },
          totalUserCount: 0
        }
      ],
      totalMasteryCount: 13,
      totalUserMasteryCount: 20,
      masteryCountInNumber: {
        NEW: 0,
        INPROGRESS: 0,
        STRUGGLE: 0,
        MASTERED: 0
      },
      masteryCountInPercentage: {
        NEW: '16',
        INPROGRESS: '45',
        STRUGGLE: '67',
        MASTERED: '34'
      }
    }
  ];
  enrollCustomer(CID) {
    localStorage.setItem('userType', 'customer');
    this.router.navigateByUrl(`/coursedetail/${this.courseId}/enroll`);
  }
  goToMasteryReport() {
    this.router.navigateByUrl(
      `/coursedetail/${this.courseId}/masteries-report`
    );
  }
  private swipeCoord?: [number, number];
  private swipeTime?: number;
  swipe(e: TouchEvent, when: string): void {
    // console.log("touched");
    const coord: [number, number] = [
      e.changedTouches[0].clientX,
      e.changedTouches[0].clientY
    ];
    const time = new Date().getTime();

    if (when === 'start') {
      this.swipeCoord = coord;
      this.swipeTime = time;
    } else if (when === 'end') {
      const direction = [
        coord[0] - this.swipeCoord[0],
        coord[1] - this.swipeCoord[1]
      ];
      const duration = time - this.swipeTime;

      if (
        duration < 1000 && //
        Math.abs(direction[0]) > 30 && // Long enough
        Math.abs(direction[0]) > Math.abs(direction[1] * 3)
      ) {
        // Horizontal enough
        // const swipe = direction[0] < 0 ? 'previous' : 'next';
        const swipe = direction[0];
        if (swipe < 0) {
          console.log(
            'next',
            document.getElementsByClassName('carousel-control-next')
          );
          document.getElementById('next').click();
        } else {
          console.log(
            'previous',
            document.getElementsByClassName('carousel-control-prev')
          );
          document.getElementById('prev').click();
        }
      }
    }
  }
  Dx: any;
  Ux: any;
  Dt: any;
  Ut: any;
  test(e: MouseEvent, w: string) {
    if (w == 'down') {
      this.Dx = e.screenX;
      console.log('Mouse Down', this.Dx);
      this.Dt = e.timeStamp.toString().slice(0, 3);
      console.log('DT', this.Dt);
    } else {
      this.Ux = e.screenX;
      console.log('Mouse UP', this.Ux);
      this.Ut = e.timeStamp.toString().slice(0, 3);
      console.log('UT', this.Ut);
    }
    if (w == 'up') {
      console.log('UP UP', this.Dx, this.Ux, typeof this.Dx, typeof this.Dx);
      if (
        this.Dx > this.Ux &&
        this.Dx - this.Ux > 30 &&
        this.Dx != this.Ux &&
        this.Ut - this.Dt < 1.5
      ) {
        console.log(
          'next',
          document.getElementsByClassName('carousel-control-next')
        );
        document.getElementById('next').click();
      } else if (
        this.Dx < this.Ux &&
        this.Ux - this.Dx > 30 &&
        this.Dx != this.Ux &&
        this.Ut - this.Dt < 1.5
      ) {
        console.log(
          'previous',
          document.getElementsByClassName('carousel-control-prev')
        );
        document.getElementById('prev').click();
      }
    }
  }
  getOverviewList(courseId) {
    this._service.getOverviewList().subscribe(
      (res: any) => {
        console.log('OOL', res);
        this.pplLists = res.courseInfo.students;
        this.customerlist = this.pplLists.slice(0, 8);
        this.invoices = res.courseInfo.invoices;
        this.coursetype = res.courseInfo.type;

        console.log('Invoice', this.invoices);
        console.log('UO', this.pplLists, 'CL', this.customerlist);
        if (this.pplLists.length > 0) {
          this.on = false;
          console.log('On', this.on);
        }

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
        this.total_no_of_seats = res.courseInfo.total_no_of_seats;
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
          console.log(this.datePipe.transform(new Date(), 'dd-MMMM-yyyy'));
          this.HasToday(this.lessonList);
          if (this.todayflag == false) {
            this.attandanceIndex = this.checkIndexforAttandance(
              this.lessonList
            );
          }
          this.selectedAttandance = this.lessonList[this.attandanceIndex];
          console.log(this.lessonList);
          console.log(this.attandanceIndex, 'dateindex');
          // console.log(this.checkIndexforAttandance(this.lessonList));

          // this.lessonList.sort(function(a, b) {
          //   return (
          //     new Date(a.lessonStartDate).getTime() -
          //     new Date(b.lessonStartDate).getTime()
          //   );
          // });
          // console.log(this.lessonList, ' sorted lessonlist');

          // this.addlesson(this.lessonList);
        }
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      },
      err => {
        console.log(err);
      }
    );
  }

  checkIndexforAttandance(arr) {
    var nearest = Infinity;
    var winner = -1;
    var negatives = [];
    var positives = [];
    arr.forEach(function(date, index) {
      let checkDate = date.lessonStartDate;
      if (new Date(checkDate) instanceof Date)
        checkDate = new Date(checkDate).getTime();

      var distance = Math.abs(checkDate - new Date().getTime());
      console.log('Today', new Date().toISOString());
      console.log(
        'No abs',
        date.lessonStartDate,
        ' $$$ ',
        checkDate - new Date().getTime()
      );
      if (checkDate - new Date().getTime() < 0) {
        negatives.push(checkDate - new Date().getTime());
      }
      if (checkDate - new Date().getTime() > 0) {
        positives.push(checkDate - new Date().getTime());
      }
      // if (distance < nearest) {
      //   nearest = distance;
      //   winner = index;
      // }
      if (negatives.length != 0) {
        winner = negatives.length - 1;
      } else {
        winner = 0;
      }

      console.log(winner);
    });
    console.log('negatives', negatives, 'positives', positives);
    return winner;
  }

  goToAttendance() {
    this.router.navigateByUrl(`/coursedetail/${this.courseId}/attendance`);
  }
  goToLeaderBoard() {
    this.router.navigateByUrl(`/coursedetail/${this.courseId}/leaderboard`);
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

    // Has Today Case
    if (this.tempDate.includes(Today)) {
      console.log('Has Today', this.tempDate);
      this.index = this.tempDate.indexOf(Today.slice(0, 10));
      this.indexDay = this.lessonList[this.index];
      console.log(this.indexDay, 'IDex');
      this.attendance = this.indexDay.attendance;
      this.total = this.lessonList[this.index].total;
      console.log('total', this.total);
      if (this.index == this.lessonList.length - 1) {
        console.log('Already At the end', this.index);
        this.nextflag = false;
      }
      if (this.index == 0) {
        console.log('Already At the start', this.index);
        this.prevflag = false;
      }
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
    //Has not Today Case
    else {
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
      if (this.index == this.lessonList.length - 1) {
        console.log('Already At the end', this.index);
        this.nextflag = false;
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
    this.attandanceIndex =
      this.lessonList.length - 1 != this.attandanceIndex
        ? this.attandanceIndex + 1
        : this.attandanceIndex;

    // this.absent = 0;
    // this.present = 0;
    // this.index++;
    // this.prevflag = true;
    // if (this.index == this.lessonList.length - 1) {
    //   console.log('Over', this.index);
    //   this.nextflag = false;
    // }
    // this.indexDay = this.lessonList[this.index];
    // console.log('nextDate', this.indexDay);
    // this.attendance = this.indexDay.attendance;
    // this.total = this.lessonList[this.index].total;
    // console.log('total', this.total);

    // for (var j = 0; j < this.attendance.length; j++) {
    //   if (this.attendance[j].attendance == null) {
    //     this.present = 0;
    //     this.absent = 0;
    //     console.log('null attendance');
    //   }
    //   if (this.attendance[j].attendance == 'absent') {
    //     this.absent = this.attendance[j].count;
    //     console.log('absent', this.absent);
    //   }
    //   if (this.attendance[j].attendance == 'present') {
    //     this.present = this.attendance[j].count;
    //     console.log('present', this.present);
    //   }
    // }
  }

  previousDate() {
    console.log(this.attandanceIndex);
    this.attandanceIndex =
      this.attandanceIndex == 0
        ? this.attandanceIndex
        : this.attandanceIndex - 1;

    // this.absent = 0;
    // this.present = 0;
    // this.index--;
    // this.nextflag = true;
    // if (this.index == 0) {
    //   console.log('Under', this.index);
    //   this.prevflag = false;
    // }
    // this.indexDay = this.lessonList[this.index];
    // console.log('previousDate', this.indexDay);
    // this.attendance = this.indexDay.attendance;
    // this.absent = this.attendance[0].count;

    // this.total = this.lessonList[this.index].total;
    // console.log('total', this.total);

    // for (var j = 0; j < this.attendance.length; j++) {
    //   if (this.attendance[j].attendance == null) {
    //     this.present = 0;
    //     this.absent = 0;
    //     console.log('null attendance');
    //   }
    //   if (this.attendance[j].attendance == 'absent') {
    //     this.absent = this.attendance[j].count;
    //     console.log('absent', this.absent);
    //   }
    //   if (this.attendance[j].attendance == 'present') {
    //     this.present = this.attendance[j].count;
    //     console.log('present', this.present);
    //   }
    // }
  }

  goToAssignTask() {
    this.router.navigateByUrl('assignTask/' + this.courseId);
  }

  TwoDimensional(arr, size) {
    var res = [];
    for (var i = 0; i < arr.length; i = i + size)
      res.push(arr.slice(i, i + size));
    return res;
  }

  drawChart(arr) {
    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < arr[i].length; j++) {
        var mastered =
          arr[i][j].masteryCountInPercentage.MASTERED_WITH_DIFFICULT +
          arr[i][j].masteryCountInPercentage.MASTERED_WITH_EASE;
        arr[i][j].masteryCountInPercentage.MASTERED =
          Math.round((mastered + Number.EPSILON) * 100) / 100;
        this.chart = new Chart('canvas' + i + j, {
          type: 'doughnut',
          data: {
            labels: ['Struggling', 'Doing fine', 'Mastered', 'Not started'],
            datasets: [
              {
                data: [
                  arr[i][j].masteryCountInPercentage.STRUGGLE,
                  arr[i][j].masteryCountInPercentage.INPROGRESS,
                  arr[i][j].masteryCountInPercentage.MASTERED,
                  arr[i][j].masteryCountInPercentage.NEW
                ],
                backgroundColor: ['#2D5E9E', '#46AACE', '#DCECC9', '#f7f9fa']
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            tooltips: {
              enabled: true
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
      }
    }
  }

  // getMastery() {
  //   this._service.getMasteryReports().subscribe(
  //     (res: any) => {
  //       this.loadingMastery = false;
  //       this._data.setMasteryData(res);
  //       if (res.data.masteryReport) {
  //         this.Nomasteryflag = false;
  //         this.mastery = res.data.masteryReport;
  //         this.masteryStudentCount = res.data.enrolledStudentCount;
  //         console.log(this.mastery);
  //         console.log('2D', this.TwoDimensional(this.mastery, 2));
  //         this.outerArray = this.TwoDimensional(this.mastery, 2);
  //         console.log(this.outerArray);
  //         setTimeout(() => {
  //           this.drawChart(this.outerArray);
  //         }, 200);
  //       } else {
  //         console.log('Null Mastery report');
  //       }
  //     },
  //     err => {
  //       console.log(err);
  //     }
  //   );
  // }

  getOverviewMastery() {
    this._service.getOverviewMasteryList().subscribe(
      (res: any) => {
        this.loadingMastery = false;
        // this._data.setMasteryData(res);
        if (res.data.masteryReport) {
          this.Nomasteryflag = false;
          this.mastery = res.data.masteryReport;
          this.masteryStudentCount = res.data.enrolledStudentCount;
          console.log(this.mastery);
          console.log('2D', this.TwoDimensional(this.mastery, 2));
          this.outerArray = this.TwoDimensional(this.mastery, 2);
          console.log(this.outerArray);
          setTimeout(() => {
            this.drawChart(this.outerArray);
          }, 200);
        } else {
          console.log('Null Mastery report');
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  HasToday(list) {
    for (var i = 0; i < list.length; i++) {
      let checkDate = list[i].lessonStartDate;
      var Today = new Date().toISOString().slice(0, 10);
      if (checkDate.slice(0, 10) == Today) {
        console.log(
          'Today checked',
          checkDate.slice(0, 10),
          '%%%%',
          Today,
          'index',
          i
        );
        this.attandanceIndex = i;
        this.todayflag = true;
      }
    }
  }
}
