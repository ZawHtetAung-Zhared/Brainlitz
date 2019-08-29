import {
  Component,
  OnInit,
  HostListener,
  EventEmitter,
  Output,
  Input,
  OnDestroy
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
  public selectedSepalColor = {
    text: '#6E2D00',
    background: '#FFCBA6'
  };
  public selectedBlockColor = {
    text: '#594A00',
    background: '#FFF4BF'
  };
  public isFocus;
  public regionID = localStorage.getItem('regionId');
  public locationID = localStorage.getItem('locationId');
  public moduleID = localStorage.getItem('moduleID');
  public blockColors = [
    {
      name: '1',
      color: {
        text: '#594A00',
        background: '#FFF4BF'
      }
    },
    {
      name: '2',
      color: {
        text: '#803500',
        background: '#FFE9D9'
      }
    },
    {
      name: '3',
      color: {
        text: '#005934',
        background: '#CCFFEA'
      }
    },
    {
      name: '4',
      color: {
        text: '#004080',
        background: '#CCE6FF'
      }
    },
    {
      name: '5',
      color: {
        text: '#6600CC',
        background: '#F2E6FF'
      }
    },
    {
      name: '6',
      color: {
        text: '#990066',
        background: '#FFE6F7'
      }
    }
  ];
  public sepalColor = [
    {
      name: '2',
      color: {
        text: '#544600',
        background: '#FFE04D'
      }
    },
    {
      name: '1',
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
        text: ' #7A0052',
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
          text: '#594A00',
          background: '#FFF4BF'
        },
        sepalColor: {
          text: '#6E2D00',
          background: '#FFCBA6'
        },
        grades: [
          {
            name: '',
            point: '1'
          }
        ]
      }
    };
    if (!this.isCreateStatus) {
      this.blockUI.start('Loading');
      this.userGradeData = this.UserGradeObj;
      setTimeout(() => {
        this.blockUI.stop();
      }, 300);
    }
    this.checkValidation();
  }

  addLevel(i) {
    const tempObj = {
      name: '',
      point: this.userGradeData.data.grades.length + 1
    };
    this.userGradeData.data.grades.push(tempObj);
    setTimeout(() => {
      var a = this.userGradeData.data.grades.length - 1;
      console.log(a);
      document.getElementById('level-input' + a).focus();
    }, 300);
    this.checkValidation();
  }

  removeLevel(index) {
    this.userGradeData.data.grades.splice(index, 1);
    setTimeout(() => {
      var a = this.userGradeData.data.grades.length - 1;
      console.log(a);
      document.getElementById('level-input' + a).focus();
    }, 300);
    this.checkValidation();
  }

  colorpalettePopUp(index, e, data) {
    e.preventDefault();
    e.stopPropagation();
    let tempData = data;
    this.showPopUp = true;
    this.selectedIndex = index;
    this.gradeName = this.userGradeData.data.grades[index].point;
    this.selectedSepalColor = JSON.parse(JSON.stringify(tempData.sepalColor));
    this.selectedBlockColor = JSON.parse(JSON.stringify(tempData.color));
    $('body').css('overflow', 'hidden');
    this.caculatePosition(e);
  }
  closePopUp(e) {
    this.showPopUp = false;
    $('body').css('overflow', 'overlay');
  }
  applyGradeName() {
    this.showPopUp = false;
    this.userGradeData.data.grades[this.selectedIndex].point = this.gradeName;
    this.gradeName = '';
    $('body').css('overflow', 'overlay');
    this.checkValidation();
  }
  onFocus() {
    this.isFocus = true;
  }
  public wordLength;
  focusMethod(e, status, word) {
    this.wordLength = word.length;
    if (status == 'name') {
      $('.limit-wordcount').show('slow');
    } else if ((status = 'input_method')) {
      $('.limit-type-wordcount').show('slow');
    } else {
      $('.limit-wordcount1').show('slow');
    }
  }
  blurMethod(e, status) {
    this.wordLength = 0;
    if (status == 'name') {
      $('.limit-wordcount').hide('slow');
    } else if ((status = 'input_method')) {
      $('.limit-type-wordcount').hide('slow');
    } else {
      $('.limit-wordcount1').hide('slow');
    }
  }
  changeMethod(val: string) {
    console.log(val);
    this.wordLength = val.length;
    this.checkValidation();
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
      this.colorPopUpX = YPosition + 20 + this.scrollHeight + 'px';
      this.colorPopUpLeft = XPosition - 51 + 'px'; //21
    } else {
      this.colorArrClasses = {
        top: YPosition + 'px',
        left: XPosition - 10 + 'px' //11
      };
      this.colorPopUpX = YPosition + 20 + this.scrollHeight + 'px';
      this.colorPopUpLeft = XPosition - 40 + 'px'; //21
    }

    this.arrClasses = {
      'arr-box': true,
      'arr-down': false,
      'arr-up': true
    };
    if ($(document)[0].children[0].clientHeight - e.clientY < 236) {
      this.colorPopUpX = e.clientY - 236 + this.scrollHeight + 'px';
      this.colorWrapper = {
        top: YPosition - 236 + 'px',
        left: XPosition + 'px'
      };
      this.arrClasses = {
        'arr-box': true,
        'arr-down': true
      };
      if (e.target.className == '') {
        this.colorArrClasses = {
          top: YPosition + 'px',
          left: XPosition - 34 + 'px' //11
        };
        this.colorPopUpLeft = XPosition - 51 + 'px'; //21
      } else {
        this.colorArrClasses = {
          top: YPosition + 'px',
          left: XPosition - 10 + 'px' //11
        };
        this.colorPopUpLeft = XPosition - 40 + 'px'; //21
      }
      this.arrClasses = {
        'arr-box': true,
        'arr-down': true,
        'arr-up': false
      };
    }
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.userGradeData = {};
  }
  updateAP() {
    var editAP = {};
    editAP['name'] = this.userGradeData.name;
    editAP['description'] = this.userGradeData.description;
    editAP['moduleId'] = this.userGradeData.moduleId;
    editAP['data'] = this.userGradeData.data;
    this._service
      .updateAP(this.regionID, this.userGradeData.accessPoints[0], editAP)
      .subscribe(
        (res: any) => {
          console.log(res);
          this.updateApg();
          this.cancelGrade.emit(true);
        },
        err => {
          console.log(err);
        }
      );
  }
  updateApg() {
    this._service
      .updateAPG(
        this.regionID,
        this.userGradeData._id,
        this.userGradeData,
        null
      )
      .subscribe(
        (res: any) => {
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
  }
  cancelUserGrade() {
    this.cancelGrade.emit(true);
  }
  selectColor(i, item) {
    this.selectedSepalColor.background = item.color.background;
    this.selectedSepalColor.text = item.color.text;
    this.selectedBlockColor.text = this.blockColors[i].color.text;
    this.selectedBlockColor.background = this.blockColors[i].color.background;

    this.userGradeData.data.color.text = this.blockColors[i].color.text;
    this.userGradeData.data.color.background = this.blockColors[
      i
    ].color.background;
    this.userGradeData.data.sepalColor.background = item.color.background;
    this.userGradeData.data.sepalColor.text = item.color.text;
  }
  public isValid = false;
  checkValidation() {
    let tempNameArr = [];
    let tempPointArr = [];
    this.userGradeData.data.grades.map(grade => {
      tempNameArr.push(grade.name);
      tempPointArr.push(grade.point);
      if (tempNameArr.includes('') || tempPointArr.includes('')) {
        this.isValid = false;
      } else {
        this.isValid = true;
      }
      if (this.userGradeData.name === '') {
        this.isValid = false;
      }
    });
  }
  @HostListener('document:click', ['$event']) clickout($event) {}
  public scrollHeight = 0;
  @HostListener('window:scroll', ['$event']) onScroll($event) {
    this.scrollHeight = $event.target.scrollingElement.scrollTop;
  }
}
