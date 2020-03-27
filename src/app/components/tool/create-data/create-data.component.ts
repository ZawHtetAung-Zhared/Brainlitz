import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { appService } from '../../../service/app.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-create-data',
  templateUrl: './create-data.component.html',
  styleUrls: ['./create-data.component.css']
})
export class CreateDataComponent implements OnInit {
  wordLength: any = 0;
  public model: any = {};
  public isShowPicker: boolean = false;
  public selectedRadio = '';
  public colorArrClasses = {};
  public colorPopUpX;
  public colorPopUpLeft;
  public arrClasses: any;
  public templateAccessPointGroup: any = {};
  public unit: any;
  public valueArray: any = [];
  emptymin: boolean = true;
  emptymax: boolean = true;
  overmin: boolean = true;
  showDp: boolean = false;
  public valid: boolean;
  public regionID = localStorage.getItem('regionId');
  public locationID = localStorage.getItem('locationId');
  public modelId: any;
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

  constructor(
    private _service: appService,
    private _activeRoute: ActivatedRoute,
    public toastr: ToastrService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.selectedRadio = 'NUMBER';
    this.modelId = this._activeRoute.snapshot.paramMap.get('id');
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
      if (this.model.unit == '') {
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
    console.log(this.model);
    var apg: any = {
      name: this.model.name,
      description: '',
      moduleId: this.modelId
    };
    apg.data = {
      selectionType: 'DATA',
      unit: this.model.unit,
      inputType: this.selectedRadio,
      color: this.selectedDataPattel,
      sepalColor: this.selectedDataColor
    };
    console.log(apg);
    this._service
      .createAPG(this.regionID, this.locationID, apg, null, this.model)
      .subscribe(
        (res: any) => {
          console.log(res);
          // setTimeout(() => {
          // this.cancelapg();
          // }, 200);
          this.toastr.success('APG successfully Created.');
          // this.setSelectedTab(this.pickedMType);
          // this.optionsArray = [];
        },
        err => {
          this.toastr.error('Created APG Fail');
        }
      );
  }

  goToAll() {
    this._router.navigateByUrl(
      'tool-test/tracking-module/lists/4/' + this.modelId
    );
  }

  backtoselected() {
    this._router.navigateByUrl('tool-test/tracking-module/selected-module');
  }
}
