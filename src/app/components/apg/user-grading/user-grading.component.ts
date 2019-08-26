import {
  Component,
  OnInit,
  HostListener,
  EventEmitter,
  Output,
  Input
} from '@angular/core';
import { appService } from '../../../service/app.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
declare var $: any;
@Component({
  selector: 'app-user-grading',
  templateUrl: './user-grading.component.html',
  styleUrls: ['./user-grading.component.css']
})
export class UserGradingComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  @Output() cancelGrade = new EventEmitter();
  @Input() UserGradeObj;
  @Input() isCreateStatus;
  public userGradeData;
  public gradeName;
  public selectedIndex;
  public showPopUp = false;
  public selectedColor = {
    name: '1',
    color: {
      text: '#544600',
      background: '#FFE04D'
    }
  };
  public isFocus;
  public regionID = localStorage.getItem('regionId');
  public locationID = localStorage.getItem('locationId');
  public moduleID = localStorage.getItem('moduleID');
  public blockColors = [
    {
      name: '1',
      color: {
        text: '#544600',
        background: '#FFE04D'
      }
    },
    {
      name: '2',
      color: {
        text: '#6E2D00',
        background: '#FFCBA6'
      }
    },
    {
      name: '3',
      color: {
        text: '#005733',
        background: '#80FFCA'
      }
    },
    {
      name: '4',
      color: {
        text: '#003E7D',
        background: '#B3D8FF'
      }
    },
    {
      name: '5',
      color: {
        text: '#5000A1',
        background: '#DFBFFF'
      }
    },
    {
      name: '6',
      color: {
        text: '#7A0052',
        background: '#FFCBA6'
      }
    }
  ];
  public sepalColor = [
    {
      name: '1',
      color: {
        text: '#6E2D00',
        background: '#FFCBA6'
      }
    },
    {
      name: '2',
      color: {
        text: '#544600',
        background: '#FFE04D'
      }
    },
    {
      name: '3',
      color: {
        text: '#005733',
        background: '#80FFCA'
      }
    },
    {
      name: '4',
      color: {
        text: '#003E7D',
        background: '#B3D8FF'
      }
    },
    {
      name: '5',
      color: {
        text: '#5000A1',
        background: '#DFBFFF'
      }
    },
    {
      name: '6',
      color: {
        text: '#7A0052',
        background: '#FFBFE9'
      }
    }
  ];

  constructor(private _service: appService) {}

  ngOnInit() {
    this.userGradeData = {
      name: '',
      description: '',
      moduleId: this.moduleID,
      data: {
        color: {
          text: '#005934',
          background: '#ccffea'
        },
        sepalColor: {
          text: '#005934',
          background: '#ccffea'
        },
        grades: [
          {
            name: 'level 1',
            point: '1'
          }
        ]
      }
    };
    if (!this.isCreateStatus) {
      this.blockUI.start('Loading');
      this.userGradeData = this.UserGradeObj[0];
      setTimeout(() => {
        this.blockUI.stop();
      }, 300);
    }
  }

  addLevel() {
    const tempObj = {
      name: '',
      point: '1'
    };
    this.userGradeData.data.grades.push(tempObj);
  }

  removeLevel(index) {
    this.userGradeData.data.grades.splice(index, 1);
  }

  colorpalettePopUp(index, e) {
    e.preventDefault();
    e.stopPropagation();
    this.showPopUp = true;
    this.selectedIndex = index;
    this.caculatePosition(e);
  }
  closePopUp(e) {
    this.showPopUp = false;
  }
  applyGradeName() {
    this.showPopUp = false;
    this.userGradeData.data.grades[this.selectedIndex].point = this.gradeName;
    this.userGradeData.data.color.text = this.selectedColor.color.text;
    this.userGradeData.data.color.background = this.selectedColor.color.background;
    this.gradeName = '';
  }
  onFocus() {
    this.isFocus = true;
  }

  onFocusOut() {
    this.isFocus = false;
  }
  createAp(data) {
    this._service.createAP(this.regionID, this.locationID, data).subscribe(
      res => {
        if (res._id != null) this.apgCreate(res._id);
      },
      err => {}
    );
  }
  createUserGradeApg(data) {
    console.log(data);
    this.blockUI.start('Loading');
    this.createAp(data);
    setTimeout(() => {
      this.blockUI.stop();
    }, 300);
  }
  apgCreate(id) {
    let temData = {
      name: this.userGradeData.name,
      description: '',
      moduleId: this.moduleID,
      accessPoints: [id]
    };
    this._service
      .createAPG(
        this.regionID,
        this.locationID,
        temData,
        undefined,
        this.moduleID
      )
      .subscribe(
        res => {
          this.cancelGrade.emit(true);
        },
        err => {
          console.error(err);
        }
      );
  }

  public colorWrapper = {};
  public colorArrClasses = {};
  public colorPopUpX;
  public colorPopUpLeft;
  public arrClasses: any;
  caculatePosition(e) {
    e.preventDefault();
    e.stopPropagation();
    let YPosition = e.clientY;
    let XPosition = e.clientX;
    if (e.target.className == '') {
      this.colorArrClasses = {
        top: YPosition + 'px',
        left: XPosition - 34 + 'px' //11
      };
      this.colorPopUpX = YPosition + 20 + 'px';
      this.colorPopUpLeft = XPosition - 51 + 'px'; //21
    } else {
      this.colorArrClasses = {
        top: YPosition + 'px',
        left: XPosition - 10 + 'px' //11
      };
      this.colorPopUpX = YPosition + 20 + 'px';
      this.colorPopUpLeft = XPosition - 40 + 'px'; //21
    }

    this.arrClasses = {
      'arr-box': true,
      'arr-down': false,
      'arr-up': true
    };

    // if ($(document).height() - (YPosition + 472) < 236) {
    //   this.colorPopUpX = YPosition - 56 + 'px';
    //   this.colorWrapper = {
    //     top: YPosition - 236 + 'px',
    //     left: XPosition + 'px'
    //   };
    //   this.arrClasses = {
    //     'arr-box': true,
    //     'arr-down': true
    //   };
    //   this.colorArrClasses = {
    //     top: YPosition + 'px',
    //     left: XPosition + 'px'
    //   };
    //   this.arrClasses = {
    //     'arr-box': true,
    //     'arr-down': true,
    //     'arr-up': false
    //   };
    // }
  }
}
