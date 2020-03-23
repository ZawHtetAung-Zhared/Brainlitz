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
import { Router } from '@angular/router';
import { appService } from '../../../../service/app.service';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit {
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
    private router: Router
  ) {
    // this._service.getLocations(this.regionID, 20, 0, false);
    // if (this.router.url === '/settings/locations/location-list') {
    //   console.log('in the locations');
    //   this._service.permissionList.subscribe(data => {
    //     if (this.router.url === '/settings/locations/location-list') {
    //       console.log('-----');
    //       this.permissionType = data;
    //       this.checkPermission();
    //     }
    //   });
    // }
  }

  ngOnInit() {
    this._service
      .getPermission(localStorage.getItem('locationId'))
      .subscribe(data => {
        console.log(data, 'permission list from location-list');
        this.permissionType = data;
        this.checkPermission();
      });
  }

  checkPermission() {
    this.locationLists = [];
    console.log(this.permissionType, 'permission');
    console.log(this.locPermission);
    this.locPermission = ['ADDNEWLOCATION', 'EDITLOCATION', 'DELETELOCATION'];
    this.locPermission = this.locPermission.filter(
      value => -1 !== this.permissionType.indexOf(value)
    );

    this.locationDemo['addLocation'] = this.locPermission.includes(
      'ADDNEWLOCATION'
    )
      ? 'ADDNEWLOCATION'
      : '';
    this.locationDemo['editLocation'] = this.locPermission.includes(
      'EDITLOCATION'
    )
      ? 'EDITLOCATION'
      : '';
    this.locationDemo['deleteLocation'] = this.locPermission.includes(
      'DELETELOCATION'
    )
      ? 'DELETELOCATION'
      : '';

    if (this.locPermission.length > 0) {
      this.getAllLocation(20, 0);
      this.getHeaderLoc();
    } else {
      this.locationLists = [];
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

  updateHeaderLocation(id, data) {
    console.log(id, data);
    console.log(this.headerlocationLists);
    for (var i in this.headerlocationLists) {
      if (this.headerlocationLists[i]._id == id) {
        console.log('same', this.headerlocationLists[i]._id, id);
        this.headerlocationLists[i].name = data.name;
        this.setTrue = 'true';
        localStorage.setItem('locationUpdate', this.setTrue);
      } else {
        this.setTrue = 'true';
        localStorage.setItem('locationUpdate', this.setTrue);
      }
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  showMore(skip: any) {
    this.getAllLocation(20, skip);
  }

  getAllLocation(limit, skip) {
    //this.blockUI.start('Loading...');
    this._service.getLocations(this.regionID, limit, skip, false).subscribe(
      (res: any) => {
        this.result = res;
        setTimeout(() => {
          //this.blockUI.stop(); // Stop blocking
        }, 300);
        this.locationLists = this.locationLists.concat(res);
        console.log(this.locationLists);
        this.isempty = res.length === 0 ? true : false;
        if (this.locationID) {
          for (var i in this.locationLists) {
            if (this.locationID == this.locationLists[i]._id) {
              console.log('same');
              this.locationLists[i].selected = true;
            }
          }
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  deleteLocation(id) {
    console.log(id);
    this._service.deleteLocation(id, this.locationID).subscribe(
      (res: any) => {
        console.log(res);
        this.modalReference.close();
        this.toastr.success('Successfully Deleted.');
        this.locationLists = [];
        this.getAllLocation(20, 0);
      },
      err => {
        this.modalReference.close();
        this.toastr.error('Delete Fail.');
        console.log(err);
      }
    );
  }

  getSingleLocation(id) {
    this.router.navigate(['/settings/locations/location-update', id]);
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
