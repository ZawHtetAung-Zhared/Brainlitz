import { modelGroupProvider } from '@angular/forms/src/directives/ng_model_group';
import {
  Component,
  OnInit,
  ViewContainerRef,
  HostListener
} from '@angular/core';
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalRef
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
import { Router, ActivatedRoute } from '@angular/router';
import { appService } from '../../../../service/app.service';

@Component({
  selector: 'app-location-create',
  templateUrl: './location-create.component.html',
  styleUrls: ['./location-create.component.css']
})
export class LocationCreateComponent implements OnInit {
  public limitno: Location;
  public PHpattern: any;
  public result: any;
  public headerlocationLists: any;
  public location: Location;
  public regionID = localStorage.getItem('regionId');
  public locationID = localStorage.getItem('locationId');
  public currentLocation = localStorage.getItem('locationId');
  public locationLists: Array<any> = [];
  public isUpdate: boolean = false;
  public isempty: boolean = false;
  public isrequired: boolean = true;
  public isvalid: boolean = false;
  public isnumber: boolean = false;
  public isequal: boolean = true;
  public iscreate: boolean = false;
  public navIsFixed: boolean = false;
  public currentID: any;
  public locationName: any;
  public countrycode: any;
  public countryname: any;
  // model: Location = new Location();
  public model: any = {};
  private modalReference: NgbModalRef;
  closeResult: string;
  public wordLength: any = 0;
  public permissionType: any;
  public locPermission: any = [];
  public locationDemo: any = [];
  public setTrue: any = null;
  public isShowPicker: boolean = false;

  public selectedLocationColor = {
    text: '#544600',
    background: '#FFE04D'
  };
  public colorWrapper = {};
  public colorArrClasses = {};
  public colorPopUpX;
  public colorPopUpLeft;
  public arrClasses: any;

  @BlockUI() blockUI: NgBlockUI;

  // colour group
  public sepalColor = [
    {
      name: '2',
      color: {
        text: '#6E2D00',
        background: '#FFCBA6'
      }
    },
    {
      name: '1',
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
    },
    {
      name: '7',
      color: {
        text: '#005959',
        background: '#A6FFFF'
      }
    },
    {
      name: '8',
      color: {
        text: '#1E5900',
        background: '#C4FFA6'
      }
    },
    {
      name: '9',
      color: {
        text: '#001EB3',
        background: '#BFC9FF'
      }
    },
    {
      name: '10',
      color: {
        text: '#664400',
        background: '#FFE6B3'
      }
    },
    {
      name: '11',
      color: {
        text: '#64707D',
        background: '#F2F4F5'
      }
    },
    {
      name: '12',
      color: {
        text: '#FFFFFF',
        background: '#64707D'
      }
    }
  ];
  constructor(
    private modalService: NgbModal,
    private _service: appService,
    public toastr: ToastrService,
    vcr: ViewContainerRef,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    if (this.router.url === '/settings/locations/location-create') {
      this.isUpdate = false;
    } else {
      this.isUpdate = true;
      console.log(
        this.route.snapshot.paramMap.get('id'),
        'location is blah blah '
      );
      this.singleLocation(this.route.snapshot.paramMap.get('id'));
    }
  }

  getHeaderLoc() {
    this._service.getHeaderLocations(this.regionID, '', '', true).subscribe(
      (res: any) => {
        this.headerlocationLists = res;
        for (var i = 0; i < this.headerlocationLists.length; i++) {
          if (this.headerlocationLists[i]._id == this.locationID) {
            this.headerlocationLists[i].selected = true;
          }
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  focusMethod(e, word) {
    this.wordLength = word.length;
    $('.limit-wordcount').show('slow');
  }

  blurMethod(e) {
    this.wordLength = 0;
    $('.limit-wordcount').hide('slow');
  }

  changeMethod(val: string) {
    console.log(val);
    this.wordLength = val.length;
  }

  charCheck(val) {
    this.isnumber = isNaN(val) == true ? true : false;
  }

  telInputObject(obj) {
    console.log(obj);
    if (this.isUpdate != true) {
      console.log('create');
      obj.intlTelInput('setCountry', 'sg');
    } else {
      setTimeout(() => {
        console.log('update', this.countryname);
        obj.intlTelInput('setCountry', this.countryname);
      }, 300);
    }
  }

  onCountryChange(e) {
    console.log(e);
    this.countryname = e.iso2;
    this.countrycode = e.dialCode;
    console.log(this.countrycode, this.countryname);
  }
  getNumber(obj) {
    console.log('hi getnumber');
    console.log(obj);
  }

  onSearchChange(searchValue: string, e) {
    this.getNumber(e);
  }

  hasError(e) {
    this.isvalid = e;
    this.isrequired = e;
    console.log(this.isrequired);
  }
  creatnew() {
    this.locationLists = [];
    this.iscreate = true;
    this.isUpdate = false;
    this.isvalid = false;
    this.isrequired = true;
    this.model = {};
    $('#placeholder_color').append(
      "<style id='feedback'>input[type='text']::-webkit-input-placeholder{color:" +
        this.selectedLocationColor.text +
        ' !important;} input[type="text"]::-moz-placeholder{color: ' +
        this.selectedLocationColor.text +
        ' !important; opacity:1;} input[type="text"]:-moz-placeholder{color: ' +
        this.selectedLocationColor.text +
        ' !important; opacity:1;}</style>'
    );
  }

  createLocation(obj, update, locationID) {
    console.log('Location Obj', obj);
    console.log(obj.phonenumber);
    var phNum;

    phNum =
      obj.phonenumber == undefined || obj.phonenumber.length == 0
        ? null
        : parseInt(obj.phonenumber);
    console.log('PhNum', phNum);
    let data = {
      regionId: this.regionID,
      name: obj.name,
      address: obj.address,
      phoneNumber: {
        countryCode: this.countrycode,
        number: phNum,
        countryName: this.countryname
      },
      backgroundColorHex: this.selectedLocationColor.background,
      textColorHex: this.selectedLocationColor.text
    };
    console.log('location Data', data);
    if (update == true) {
      console.log(update);

      //this.blockUI.start('Loading...');
      this._service.updateLocation(locationID, data, this.locationID).subscribe(
        (res: any) => {
          console.log(res);
          this.model = {};
          this.toastr.success('Successfully Updated.');
          //this.blockUI.stop();
          // this.updateHeaderLocation(locationID, data);
          this.setTrue = 'true';
          localStorage.setItem('locationUpdate', this.setTrue);
          this.router.navigateByUrl('/settings/locations');
        },
        err => {
          if (err.error == 'Location name already exists.') {
            this.toastr.error(err.error);
          } else {
            this.toastr.error('Update fail');
            console.log(err);
          }
        }
      );
    } else {
      console.log('Form Submitted!', this.regionID);
      //this.blockUI.start('Loading...');
      // this.modalReference.close();
      this._service
        .createLocation(this.regionID, data, this.locationID)
        .subscribe(
          (res: any) => {
            console.log(res);
            this.model = {};
            this.toastr.success('Successfully Created.');
            //this.blockUI.stop();
            // this.updateHeaderLocation(locationID, data);
            this.setTrue = 'true';
            localStorage.setItem('locationUpdate', this.setTrue);
            this.router.navigateByUrl('/settings/locations');
          },
          err => {
            console.log(err);
            if (err.error == 'Location name already exists.') {
              this.toastr.error(err.error);
            } else {
              this.toastr.error('Create Fail.');
            }
            //this.blockUI.stop();
          }
        );
    }
  }

  getSingleLocation(id) {
    this.iscreate = true;
    this.isUpdate = true;
    this.isvalid = true;
    this.isnumber = false;
    this.singleLocation(id);
  }

  singleLocation(id) {
    this._service.getSingleLocation(id).subscribe(
      (res: any) => {
        console.log('single location', res);
        this.currentID = res._id;
        this.locationName = res.name;
        this.model = res;
        // this.txt_code = res.textColorHex;
        // this.bg_code = res.backgroundColorHex;
        this.model.phonenumber = res.phoneNumber.number;
        this.countrycode = res.phoneNumber.countryCode;
        this.countryname = res.phoneNumber.countryName;
        if (
          res.backgroundColorHex != undefined ||
          res.textColorHex != undefined
        ) {
          this.selectedLocationColor.background = res.backgroundColorHex;
          this.selectedLocationColor.text = res.textColorHex;
          $('#feedback').remove();
          $('#placeholder_color').append(
            "<style id='feedback'>input[type='text']::-webkit-input-placeholder{color:" +
              this.selectedLocationColor.text +
              ' !important;} input[type="text"]::-moz-placeholder{color: ' +
              this.selectedLocationColor.text +
              ' !important; opacity:1;} input[type="text"]:-moz-placeholder{color: ' +
              this.selectedLocationColor.text +
              ' !important; opacity:1;}</style>'
          );
        } else {
          this.selectedLocationColor = {
            text: '#544600',
            background: '#FFE04D'
          };
        }

        console.log('this.model', this.model);
      },
      err => {
        console.log(err);
      }
    );
  }

  deleteModal(deletemodal, id, name) {
    this.modalReference = this.modalService.open(deletemodal, {
      backdrop: 'static',
      windowClass:
        'deleteModal d-flex justify-content-center align-items-center'
    });
    this.locationName = name;
    this.currentID = id;
  }
  removeHtml(e) {
    // console.warn(e);
    setTimeout(() => {
      // console.error($('.right'));
      $('.box')[7].children[0].style.background = '#F2F4FA';
      $('.box')[7].children[0].style.color = '#495057';
      $('.box')[7].children[0].style.padding = '16px';
      $('.box')[7].children[0].style.border = 'none';
      $('.color-picker')[0].style.boxShadow = '0px 2px 8px rgba(0, 0, 0, 0.08)';
      $('.color-picker')[0].style.width = '250px';
      $('.color-picker')[0].style.border = 'none';
      $('.color-picker')[0].style.padding = '9px';
      $('.color-picker')[0].style.paddingBottom = '0px';
      $('.arrow-bottom')[0].style.borderWidth = '10px 10px';
      $('.arrow-bottom')[0].style.borderColor =
        'rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) #fff rgba(0, 0, 0, 0)';
      $('.arrow-bottom')[0].style.filter =
        'drop-shadow(0px -2px 1px rgba(0, 0, 0, 0.1))';
      $('.button-area')[0].style.paddingBottom = '7px';
      $('.hue')[0].style.borderRadius = '7px';
      $('.hue-alpha')[0].style.marginBottom = '0px';
      $('.hue-alpha')[0].style.paddingBottom = '0px';
      $('.selected-color-background')[0].style.width = '30px';
      $('.selected-color-background')[0].style.height = '30px';
      $('.selected-color')[0].style.width = '30px';
      $('.selected-color')[0].style.height = '30px';
      $('.box')[$('.box').length - 1].style.display = 'none';
      $('.type-policy')[0].style.display = 'none';
    }, 100);
  }

  showColorPicker(e) {
    this.isShowPicker = true;
    console.log('open', this.isShowPicker);
    $('body').css('overflow', 'hidden');
    this.caculatePosition(e);
  }
  closePopUp(e) {
    this.isShowPicker = false;
    $('body').css('overflow', 'overlay');
  }

  selectColor(i, item) {
    console.log(i, '<i>');
    console.log(item, 'item');
    this.selectedLocationColor.background = item.color.background;
    this.selectedLocationColor.text = item.color.text;
    $('#feedback').remove();

    $('#placeholder_color').append(
      "<style id='feedback'>input[type='text']::-webkit-input-placeholder{color:" +
        this.selectedLocationColor.text +
        ' !important;} input[type="text"]::-moz-placeholder{color: ' +
        this.selectedLocationColor.text +
        ' !important; opacity:1;} input[type="text"]:-moz-placeholder{color: ' +
        this.selectedLocationColor.text +
        ' !important; opacity:1;}</style>'
    );
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
      'arr-down': false,
      'arr-up': true
    };
    //      'arr-box': true,
  }
  @HostListener('document:click', ['$event']) clickout($event) {}
  public scrollHeight = 0;
  @HostListener('window:scroll', ['$event']) onScroll($event) {
    this.scrollHeight = $event.target.scrollingElement.scrollTop;
  }
}
