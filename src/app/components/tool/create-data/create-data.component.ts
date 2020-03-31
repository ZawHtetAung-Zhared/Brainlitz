import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { appService } from '../../../service/app.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-data',
  templateUrl: './create-data.component.html',
  styleUrls: ['./create-data.component.css']
})
export class CreateDataComponent implements OnInit {
  wordLength: any = 0;
  public model: any = {};

  public selectedRadio = '';
  public colorArrClasses = {};
  public colorPopUpX;
  public colorPopUpLeft;

  public templateAccessPointGroup: any = [];

  public valueArray: any = [];

  // any
  exitValue: any;
  public isUpdate: boolean = false;
  public unit: any;
  public arrClasses: any;
  public modelId: any;
  public tempDataValue: any;
  public accessPointArrayString: any = [];

  public regionID = localStorage.getItem('regionId');
  public locationID = localStorage.getItem('locationId');
  public moduleID: any;

  // boolean
  maxExit: boolean = false;
  emptymin: boolean = true;
  emptymax: boolean = true;
  overmin: boolean = true;
  showDp: boolean = false;
  public isShowPicker: boolean = false;
  public valid: boolean;
  public stillDrag: boolean = false;

  public selectedDataColor = {
    text: '#544600',
    background: '#FFE04D'
  };
  public selectedDataPattel = {
    text: '#594a00',
    background: '#fff4bf'
  };

  public colorPalette = [
    {
      name: '1',
      color: {
        text: '#803500',
        background: '#ffe9d9'
      }
    },
    {
      name: '2',
      color: {
        text: '#594a00',
        background: '#fff4bf'
      }
    },
    {
      name: '3',
      color: {
        text: '#005934',
        background: '#ccffea'
      }
    },
    {
      name: '4',
      color: {
        text: '#004080',
        background: '#cce6ff'
      }
    },
    {
      name: '5',
      color: {
        text: '#6600cc',
        background: '#f2e6ff'
      }
    },
    {
      name: '6',
      color: {
        text: '#990066',
        background: '#ffe6f6'
      }
    }
  ];

  // colour group
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
  public apgobj: any;

  constructor(
    private _service: appService,
    private _activeRoute: ActivatedRoute,
    public toastr: ToastrService,
    private _router: Router,
    private _location: Location
  ) {}

  ngOnInit() {
    this.selectedRadio = 'NUMBER';
    this.modelId = this._activeRoute.snapshot.paramMap.get('id');
    this.moduleID = this._activeRoute.snapshot.paramMap.get('mid');

    this.apgobj = this._service.GetApgObj();
    console.log('passed apbobj', this.apgobj);

    $('#placeholder_color').append(
      "<style id='feedback'>.data-name::-webkit-input-placeholder{color:" +
        this.selectedDataColor.text +
        ' !important;} .data-name::-moz-placeholder{color: ' +
        this.selectedDataColor.text +
        ' !important; opacity:1;} .data-name:-moz-placeholder{color: ' +
        this.selectedDataColor.text +
        ' !important; opacity:1;}</style>'
    );

    const templateAccessPoint = {
      name: '',
      description: '',
      moduleId: this.modelId,
      data: {
        sectionType: 'DATA',
        unit: '',
        inputType: this.selectedRadio,
        inputTypeProperties: {
          name: '',
          min: '0',
          max: '',
          options: []
        }
      }
    };

    this.templateAccessPointGroup = templateAccessPoint;
    // this.dataApCreate = true;
    // this.ismodule = false;
    // this.apCreate = false;
    this.emptymax = true;
    this.emptymin = true;
    this.overmin = true;

    if (this._activeRoute.snapshot.url[0].path == 'edit') {
      this.isUpdate = true;
      console.log('2', this._activeRoute.snapshot.url[0].path);
      this.onclickUpdate(this.modelId, this.apgobj);
      setTimeout(() => {
        //this.blockUI.stop();
      }, 300);
    }
  }

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
  }

  showColorPicker(e) {
    this.isShowPicker = true;
    console.log('open', this.isShowPicker);
    $('body').css('overflow', 'hidden');
    this.caculatePosition(e);
  }

  caculatePosition(e) {
    e.preventDefault();
    e.stopPropagation();
    let YPosition = e.clientY;
    let XPosition = e.clientX;
    console.log(YPosition, 'ypostion');
    console.log(XPosition, 'XPosition');

    if (e.target.className == '') {
      this.colorArrClasses = {
        // top: YPosition + 'px',
        left: XPosition - 34 + 'px' //11
      };
      this.colorPopUpX = YPosition + 20 + this.scrollHeight + 'px';
      this.colorPopUpLeft = XPosition - 149 + 'px'; //21
      console.log('here mee>if');
    } else {
      this.colorArrClasses = {
        // top: YPosition + 'px',
        left: XPosition - 10 + 'px' //11
      };
      this.colorPopUpX = YPosition + 20 + this.scrollHeight + 'px';
      this.colorPopUpLeft = XPosition - 160 + 'px'; //21
      console.log('here mee>else');
    }

    this.arrClasses = {
      // 'arr-box': true,
      'arr-down': false,
      'arr-up': true
    };
  }

  public scrollHeight = 0;
  @HostListener('window:scroll', ['$event']) onScroll($event) {
    this.scrollHeight = $event.target.scrollingElement.scrollTop;
  }

  closePopUp(e) {
    this.isShowPicker = false;
    $('body').css('overflow', 'overlay');
  }

  selectColor(i, item) {
    console.log(i, '<i>');
    console.log(item, 'item');
    this.selectedDataColor.background = item.color.background;
    this.selectedDataColor.text = item.color.text;
    this.selectedDataPattel.background = this.colorPalette[i].color.background;
    this.selectedDataPattel.text = this.colorPalette[i].color.text;

    this.isShowPicker = false;

    $('#feedback').remove();
    $('#placeholder_color').append(
      "<style id='feedback'>.data-name::-webkit-input-placeholder{color:" +
        this.selectedDataColor.text +
        ' !important;} .data-name::-moz-placeholder{color: ' +
        this.selectedDataColor.text +
        ' !important; opacity:1;} .data-name:-moz-placeholder{color: ' +
        this.selectedDataColor.text +
        ' !important; opacity:1;}</style>'
    );
  }

  radioSelect(type) {
    console.log('radio selected');
    this.selectedRadio = type;
    this.templateAccessPointGroup.data.inputType = type;
    if (type == 'RADIO') {
      // this.optionsArray = ['']
      this.valueArray = [{ name: '' }];
      console.log(this.valueArray);
      this.templateAccessPointGroup.data.unit = '';
      this.templateAccessPointGroup.data.inputTypeProperties.min = '0';
      this.templateAccessPointGroup.data.inputTypeProperties.max = '';
    } else if (type == 'NUMBER') {
      // console.log(this.optionsArray)
      // this.templateAccessPointGroup.data.inputTypeProperties.options = [""];
      // this.templateAccessPointGroup.data.inputTypeProperties.options[0] = [''];
      // this.optionsArray = ['']
      this.templateAccessPointGroup.data.unit = '';
      this.templateAccessPointGroup.data.inputTypeProperties.min = '0';
      this.templateAccessPointGroup.data.inputTypeProperties.max = '';
    } else {
      // this.optionsArray = ['']
      this.templateAccessPointGroup.data.unit = '';
    }

    this.chkValue('val', 'type');
  }

  chkValue(v, type) {
    console.log(this.templateAccessPointGroup.data.inputTypeProperties.min);
    // if (type == 'min') {
    if (
      this.templateAccessPointGroup.data.inputTypeProperties.min === '' ||
      this.templateAccessPointGroup.data.inputTypeProperties.min === null
    ) {
      this.emptymin = true;
    } else {
      this.emptymin = false;
    }
    // }
    // if(type == 'max') {
    if (
      this.templateAccessPointGroup.data.inputTypeProperties.max === '' ||
      this.templateAccessPointGroup.data.inputTypeProperties.max === null
    ) {
      this.emptymax = true;
    } else {
      this.emptymax = false;
    }
    // }
    if (
      this.templateAccessPointGroup.data.inputTypeProperties.max <=
      this.templateAccessPointGroup.data.inputTypeProperties.min
    ) {
      this.overmin = true;
    } else {
      this.overmin = false;
    }
  }

  checkValidation(arr) {
    var apgName = this.model.name;
    // console.log(apgName)
    var tempArr = [];
    // console.log(this.selectedRadio);
    if (this.selectedRadio == 'RADIO' || apgName.length == 0) {
      for (var i = 0; i < arr.length; i++) {
        tempArr.push(arr[i].name);
      }
      if (tempArr.includes('')) {
        this.valid = false;
      } else {
        this.valid = true;
      }
    } else if (this.selectedRadio == 'NUMBER' || apgName.length == 0) {
      if (this.templateAccessPointGroup.data.unit == '') {
        this.valid = false;
      } else {
        this.valid = true;
      }
    } else {
      var min = this.templateAccessPointGroup.data.inputTypeProperties.min;
      var max = this.templateAccessPointGroup.data.inputTypeProperties.max;

      if (
        min === '' ||
        max === '' ||
        min >= max ||
        apgName.length == 0 ||
        this.templateAccessPointGroup.data.unit == ''
      ) {
        this.valid = false;
      } else {
        this.valid = true;
      }
    }
  }

  createDataApg() {
    this.createDataAccessPoint()
      .then(apId => {
        console.error(apId);
        var apg = {
          name: this.model.name,
          description: '',
          moduleId: this.modelId,
          accessPoints: [apId],
          color: this.selectedDataPattel,
          sepalColor: this.selectedDataColor
        };
        console.log(apId);
        console.log(apg);
        this._service
          .createAPG(this.regionID, this.locationID, apg, null, this.modelId)
          .subscribe(
            (res: any) => {
              console.log(res);
              // setTimeout(() => {
              // }, 200);
              this.goToAll();
              this.toastr.success('APG successfully Created.');

              // this.setSelectedTab(this.pickedMType);
              // this.optionsArray = [];
            },
            err => {
              this.toastr.error('Created APG Fail');
            }
          );
      })
      .catch(err => {
        console.log(err); // never called
      });
  }

  goToAll() {
    this._router.navigateByUrl('tools/tracking-module/lists/4/' + this.modelId);
  }

  backtoselected() {
    this._router.navigateByUrl('tools/tracking-module/selected-module');
  }
  cancelapg() {
    this._router.navigateByUrl(`tool-test/tracking-module/lists/all`);
  }
  goToBack() {
    this._location.back();
  }

  createDataAccessPoint() {
    return new Promise((resolve, reject) => {
      if (this.selectedRadio == 'RADIO') {
        this.convertObjToArray();
      }
      console.log(this);
      this._service
        .createAP(this.regionID, this.locationID, this.templateAccessPointGroup)
        .subscribe(
          (res: any) => {
            //  resolve(this.AccessPoint = res._id )
            resolve(res._id);
            console.log(res._id);
          },
          err => {
            this.toastr.error('Created AP Fail');
            reject(err);
            console.log(err);
          }
        );
    });
  }

  convertObjToArray() {
    console.log(this.valueArray);
    console.log(this.templateAccessPointGroup);
    this.templateAccessPointGroup.data.inputTypeProperties.options = [];
    for (var i = 0; i < this.valueArray.length; i++) {
      var item = this.valueArray[i].name;
      this.templateAccessPointGroup.data.inputTypeProperties.options.push(item);
    }
    console.log(this.templateAccessPointGroup.data.inputTypeProperties.options);
  }

  maxFocus(e) {
    console.log('here max focus');
    this.maxExit = true;
  }
  maxFocusout(e) {
    console.log('here max focus out');
    this.maxExit = false;
  }

  numberOnly(event, type) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    if (event.target.value.search(/^0/) != -1) {
      event.target.value = '';
    }
  }

  ChangedTimeValue(obj) {
    console.log(obj);
    // var range = this.maxValue - this.minValue;
    var range =
      this.templateAccessPointGroup.data.inputTypeProperties.max -
      this.templateAccessPointGroup.data.inputTypeProperties.min;
    // var position = ((obj - this.minValue) / range) * 100;
    var position =
      ((obj - this.templateAccessPointGroup.data.inputTypeProperties.min) /
        range) *
      100;
    var positionOffset = Math.round((20 * position) / 100) - 20 / 2;
    this.exitValue = obj;
    const box: HTMLElement = document.getElementById('arrowBox');

    if (
      this.templateAccessPointGroup.data.inputTypeProperties.max <
      this.templateAccessPointGroup.data.inputTypeProperties.min
    ) {
      box.setAttribute('style', 'display:none');
    } else {
      box.setAttribute(
        'style',
        'margin-left:calc(' + position + '% - ' + positionOffset + 'px)'
      );
    }
    console.log(this.templateAccessPointGroup);
  }

  addDataValue(data, i) {
    this.tempDataValue = data;
    const newValue = '';
    const newObj = { name: '' };
    this.valueArray.push(newObj);
    // this.convertObjToArray()
    // this.templateAccessPointGroup.data.inputTypeProperties.options.push(newValue)
    // this.optionsArray.push(newValue)
    document.addEventListener(
      'click',
      (this.testFunct = () => {
        if (this.tempDataValue == 'newData') {
          var windowHeight = $(document).height();
          window.scrollBy({
            top: window.innerHeight,
            left: 0,
            behavior: 'smooth'
          });
          console.log(windowHeight);
        }
      }),
      false
    );
    setTimeout(() => {
      var a = this.valueArray.length - 1;
      console.log(a);
      document.getElementById('valueInput' + a).focus();
      this.tempDataValue = '';
    }, 300);
  }

  testFunct() {
    var stillDragInTestFunc = this.stillDrag;
    var templategroug = this.templateAccessPointGroup;
    // return this.stillDrag;
    // return this.stillDrag;
  }

  testArr: any = [];
  onclickUpdate(id, apgName) {
    console.log('testapg', apgName, 'id', id);

    if (apgName.module.name == 'Data') {
      // this.iscreate = true;
      var moduleId = localStorage.getItem('moduleID');
      const templateAccessPoint = {
        name: '',
        description: '',
        moduleId: moduleId,
        data: {
          sectionType: 'DATA',
          unit: ' ',
          inputType: this.selectedRadio,
          inputTypeProperties: {
            name: '',
            min: '',
            max: '',
            options: ['']
          }
        }
      };
      this.templateAccessPointGroup = templateAccessPoint;

      // this.dataApCreate = true;
      // this.ismodule = false;
      // this.userGradingAp = false;
      // this.apCreate = false;
    }
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
            console.log('successs', dataCollection);
            let tempArr = [];
            this.templateAccessPointGroup = dataCollection;

            this.accessPointArrayString = JSON.stringify(dataCollection);
            this.testArr = dataCollection;
            console.log(apgName.module.name);

            if (apgName.module.name.toLowerCase() == 'data') {
              this.sliderMinMax(dataCollection);
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

  singleAPG() {
    //this.blockUI.start('Loading...');

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this._service.getSingleAPG(this.regionID, this.modelId).subscribe(
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

  sliderMinMax(obj) {
    console.log('here input focus>>', obj.data.inputTypeProperties.min);
    this.chkValue(String(obj.data.inputTypeProperties.min), 'min');
    this.chkValue(String(obj.data.inputTypeProperties.max), 'max');
  }

  getEditAccessPoint(reginId, accesPointId, apgName) {
    console.log(apgName, '<<<<<<<<<========');
    if (apgName == 'Data') {
      return new Promise((resolve, reject) => {
        this._service.getAccessPoint(reginId, accesPointId).subscribe(
          (res: any) => {
            console.log(res);
            this.templateAccessPointGroup = res;
            // this.optionsArray = this.templateAccessPointGroup.data.inputTypeProperties.options;
            this.selectedRadio = this.templateAccessPointGroup.data.inputType;
            // this.tempRadioType = this.templateAccessPointGroup.data.inputType;
            this.convertArrayToObj();
            this.chkValue('val', 'type');
            // console.log(this.optionsArray)
            resolve(res);
            // this.setInputValueFromObject(this.optionsArray)
          },
          err => {
            console.log(err);
          }
        );
      });
    }
  }

  convertArrayToObj() {
    for (
      var i = 0;
      i < this.templateAccessPointGroup.data.inputTypeProperties.options.length;
      i++
    ) {
      var item = { name: '' };
      item.name = this.templateAccessPointGroup.data.inputTypeProperties.options[
        i
      ];
      this.valueArray.push(item);
    }
    console.log(this.templateAccessPointGroup.data.inputTypeProperties.options);
    console.log(this.valueArray);
  }

  updateAp(apId, ap, apgId) {
    console.log('For data', apId, ' ### ', ap, ' ### ', apgId);
    if (this.selectedRadio == 'RADIO') {
      this.convertObjToArray();
    } else {
      console.log('not data apg');
    }
    console.log('model', this.model);
    // ap.data.inputTypeProperties.options = this.optionsArray;
    return new Promise((resolve, reject) => {
      this._service.updateAP(this.regionID, apId, ap).subscribe((res: any) => {
        console.log(res);
        resolve(res._id);
      }),
        err => {
          console.log(err);
        };
    })
      .then(accespointId => {
        this._service
          .updateAPG(this.regionID, apgId, this.model, null)
          .subscribe((res: any) => {
            this.toastr.success('APG successfully updated');
            console.log(res);
            this.cancelapg();
          }),
          err => {
            console.log(err);
            this.toastr.success('APG update fail');
          };
      })
      .catch(err => {
        console.log(err); // never called
      });
  }
}
