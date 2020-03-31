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
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

declare var $: any;

@Component({
  selector: 'app-create-usergrading',
  templateUrl: './create-usergrading.component.html',
  styleUrls: ['./create-usergrading.component.css']
})
export class CreateUsergradingComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  @Output() cancelGrade = new EventEmitter();
  @Output() createGrade = new EventEmitter();
  @Input() UserGradeObj;
  @Input() isCreateStatus;
  public isUpdate: boolean = false;
  public apgobj: any;
  public userGradeData;
  public gradeName;
  public selectedIndex;
  public showPopUp = false;
  public id: any;
  public accesspoint: any;
  public model: any;
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
  public moduleID: any;
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
        text: '#7A0052',
        background: '#FFBFE9'
      }
    }
  ];

  constructor(
    private _service: appService,
    public toastr: ToastrService,
    private router: Router,
    private _location: Location,
    private _Activatedroute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.moduleID = this._Activatedroute.snapshot.paramMap.get('mid');
    console.log('module id', this.moduleID);
    this.id = this._Activatedroute.snapshot.paramMap.get('id');
    this.apgobj = this._service.GetApgObj();
    console.log('passed apbobj', this.apgobj);

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
    if (this._Activatedroute.snapshot.url[0].path == 'edit') {
      this.isUpdate = true;
      console.log('2', this._Activatedroute.snapshot.url[0].path);
      this.onclickUpdate(this.id, this.apgobj);
      setTimeout(() => {
        //this.blockUI.stop();
      }, 300);
    }
    console.log('usergradedata', this.userGradeData);
  }

  ngAfterViewInit() {}

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
    console.log('index', index, 'e', e, 'data', data);

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
    //this.blockUI.start('Loading');
    this.createAp(data);
    setTimeout(() => {
      //this.blockUI.stop();
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
          this.toastr.success('APG successfully created.');
          this.cancelGrade.emit(true);
          this.createGrade.emit(true);
        },
        err => {
          this.toastr.error('Create Fail');
          console.error(err);
        }
      );
    this.cancelapg();
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
    console.error(YPosition);

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
    console.log('check1', editAP, this.accesspoint);
    this._service.updateAP(this.regionID, this.accesspoint, editAP).subscribe(
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
    console.log('check2', this.userGradeData._id, this.userGradeData);
    this._service
      .updateAPG(
        this.regionID,
        this.userGradeData._id,
        this.userGradeData,
        null
      )
      .subscribe(
        (res: any) => {
          this.toastr.success('Successfully updated');
          console.log(res);
        },
        err => {
          this.toastr.error(' Update Fail');
          console.log(err);
        }
      );
    this.cancelapg();
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
    console.log('validating');

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
  cancelapg() {
    this.router.navigateByUrl(`tool-test/tracking-module/lists/all`);
  }
  goToBack() {
    this._location.back();
  }

  singleAPG() {
    //this.blockUI.start('Loading...');

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this._service.getSingleAPG(this.regionID, this.id).subscribe(
          (res: any) => {
            //this.blockUI.stop();
            console.log('editapg', res);
            this.model = res;
            console.log('resolve res.accessPoints', res.accessPoints);
            resolve(res.accessPoints);
          },
          err => {
            //this.blockUI.stop();
            console.log(err);
          }
        );
      }, 300);
    });
  }

  onclickUpdate(id, apgName) {
    console.log('zhapg', id, apgName);
    return new Promise((resolve, reject) => {
      this.singleAPG()
        .then(apId => {
          console.log('apid===>', apId);
          this.moduleID = this.model.moduleId;
          resolve(apId);
        })
        .catch(err => {
          console.log(err); // never called1
        });
    })
      .then(accespointId => {
        console.log('accespointId===>', accespointId);
        this.getEditAccessPoint(
          this.regionID,
          accespointId,
          apgName.module.name
        )
          .then(dataCollection => {
            if (apgName.module.name == 'User Grading') {
              console.log('successs', dataCollection);
              this.model.data = (dataCollection[0] as any).data;
              this.userGradeData = this.model;
              console.log('userGradeData', this.userGradeData);

              this.accesspoint = this.userGradeData.accessPoints[0];
              this.checkValidation();
            }
          })
          .catch(err => {
            console.log(err); // never called
          });

        // this.templateAccessPointGroup.push(res)
        // this.accessPointArrayString.push(JSON.stringify(res));
      })
      .catch(err => {
        console.log(err); // never called
      });
  }

  getEditAccessPoint(reginId, accesPointId, apgName) {
    console.log(apgName, '<<<<<<<<<========');

    console.log('asss ==========>>>');
    // this.templateAccessPointGroup = [];
    // this.checkProperties(this.formObj);
    return Promise.all(
      accesPointId.map(accesPoint => {
        return new Promise((resolve, reject) => {
          this._service.getAccessPoint(reginId, accesPoint).subscribe(
            (res: any) => {
              console.log(res);
              resolve(res);
              // this.templateAccessPointGroup.push(res)
              // this.accessPointArrayString.push(JSON.stringify(res));
            },
            err => {
              console.log(err);
              reject(err);
            }
          );
        });
      })
    );
  }
}
