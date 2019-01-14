import { Component, OnInit, HostListener, ViewChild} from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { appService } from '../../service/app.service';
import { DataService } from '../../service/data.service';
import { Observable } from 'rxjs/Rx';
import { LocationComponent } from '../location/location.component';

declare var $:any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @ViewChild(LocationComponent) lnameChanges: LocationComponent;

  public userName:any;
  public regionID = localStorage.getItem('regionId');
  public OrgLogo = localStorage.getItem('OrgLogo');
  public headerlocationLists: any;
  public accessToken: any;
  public currentLocationID: any;
  public customerMenu: any = [];
  public staffMenu: any = [];
  public courseMenu: any = [];
  public reportMenu: any = [];
  public toolsMenu: any = [];
  public settingMenu: any = [];
  public previousLocation:any = '';
  public dropMenuShow: boolean = false;
  public locationDpShow: boolean = false;
  public selectedLocation:any = {};
  
  constructor(private _router: Router, private _service: appService, private _dataservice: DataService) {
    console.log('hi construc')
    this._service.sendData.subscribe((data) => {
        this.headerlocationLists = data; 
    })
  }
  
  ngOnInit() {
    console.log('headerLocation work')
    setTimeout(() => {  
      this.userName = localStorage.getItem('userName')
      }, 400);
    this.accessToken = localStorage.getItem('token');
    if(this.accessToken != undefined){
      console.log('!undefined')
      this.getAllLocation();
    }

    if(this._router.url != '/dashboard'){
      console.log(this._router.url)
      localStorage.removeItem('permission');
      localStorage.removeItem('locationUpdate');
    }else{
      console.log(this._router.url)
    }
  }

  logoff(){
  	console.log('log out');
  	localStorage.clear();
	  this._router.navigateByUrl('/login');
	}

  getAllLocation(){
    this._service.getHeaderLocations(this.regionID, '', '', true)
    .subscribe((res:any) => {
      this.headerlocationLists = res;
      console.log(this.headerlocationLists.length) 
      
      this.currentLocationID  = localStorage.getItem('locationId');
      console.log(this.currentLocationID)
      localStorage.setItem('previousLID', this.currentLocationID);

      if(this.headerlocationLists.length != 0){
        if(this.currentLocationID != null){
          console.log('current location is not null')
          for(var i = 0; i < this.headerlocationLists.length; i++){
            if(this.headerlocationLists[i]._id == this.currentLocationID){
              this.headerlocationLists[i].selected = true;
              localStorage.setItem('locationId', this.headerlocationLists[i]._id);
              localStorage.setItem('locationName', this.headerlocationLists[i].name);
              this.selectedLocation["id"] = this.headerlocationLists[i]._id;
              this.selectedLocation["name"] = this.headerlocationLists[i].name;
            }
          }
          this.setPermission(this.currentLocationID);
        }else{
          console.log('no location has choosen')
          this.setLocation();
        } 
      }else{
        console.log('no location in this region')
      };
            
    }, err => {
      console.log(err)
    });
    localStorage.removeItem('locationUpdate');
  }

  setLocation(){
    console.log('... callback')
    let regionId  = localStorage.getItem('regionId');
    console.log(localStorage.getItem('locationId'))
    if(!localStorage.getItem('locationId')){
      console.log('~~~~~~')
      localStorage.setItem('locationId', this.headerlocationLists[0]._id);
      localStorage.setItem('locationName', this.headerlocationLists[0].name);
      localStorage.setItem('previousLID', this.headerlocationLists[0]._id);
      this.setPermission(this.headerlocationLists[0]._id);  

      this.selectedLocation["id"] = this.headerlocationLists[0]._id;
      this.selectedLocation["name"] = this.headerlocationLists[0].name;      
    }else if(localStorage.getItem('locationId') == null){
      console.log('no location has counter')
    }else{
      console.log('no location has counter')
    }
  }

  setPermission(id){
    this._service.getPermission(id)
    .subscribe((res:any) => {
      console.log(res)
      this.showMenuPerPermission(res)
      this._service.showPermission(res);
    }, err => {
      console.log(err)
    })
  }

  selectLocation(data){
    console.log('location select', data)
    // let LocationId = e.target.value;
    let LocationId = data._id;
    this.selectedLocation["id"] = data._id;
    this.selectedLocation["name"] = data.name;

    for(var i in this.headerlocationLists){
      if(this.headerlocationLists[i]._id == LocationId){
        console.log('same')
        localStorage.setItem('locationName', this.headerlocationLists[i].name);
      }
    }
    // let Locationname = e.target.value.name;

    localStorage.setItem('locationId', LocationId);
    // localStorage.setItem('locationName', Locationname);
    if(this.currentLocationID != LocationId){
      console.log('different location')
      this.currentLocationID = LocationId
      this.setPermission(LocationId)
    }else{
      console.log('same location')
    }
    this._service.setLocationId(LocationId);
  }

  showMenuPerPermission(data){
    this.customerMenu = ['CREATECUSTOMERS','VIEWCUSTOMERS','EDITCUSTOMERS','DELETECUSTOMERS','ENROLLCOURSE'];
    this.staffMenu = ['CREATESTAFFS','EDITSTAFFS','VIEWSTAFFS','DELETESTAFFS'];
    this.courseMenu = ['CREATECOURSE','VIEWCOURSE','EDITCOURSE','DELETECOURSE','ASSIGNTEACHER','ASSIGNSTUDENTS'];
    this.reportMenu = ['VIEWREPORT','EXPORTREPORT'];
    this.toolsMenu = ['SENDNOTIFICATION','VIEWSENDHISTORY'];
    this.settingMenu = ['UPDATEREGIONALSETTINGS', 'UPDATEAPPSETTINGS', 'ADDNEWLOCATION', 'EDITLOCATION', 'DELETELOCATION',"CREATECUSTOMFIELD","VIEWCUSTOMFIELD","EDITCUSTOMFIELD","DELETECUSTOMFIELD"];

    this.customerMenu = this.customerMenu.filter(value => -1 !== data.indexOf(value));
    this.staffMenu = this.staffMenu.filter(value => -1 !== data.indexOf(value));
    this.courseMenu = this.courseMenu.filter(value => -1 !== data.indexOf(value));
    this.reportMenu = this.reportMenu.filter(value => -1 !== data.indexOf(value));
    this.toolsMenu = this.toolsMenu.filter(value => -1 !== data.indexOf(value));
    this.settingMenu = this.settingMenu.filter(value => -1 !== data.indexOf(value));
  }

  // @HostListener('document:click', ['$event'])
  //   public documentClick(event): void {
  //     console.log('~~~~ hi ~~~~')
  // }

  @HostListener('document:click', ['$event']) clickedOutside($event){      
    // console.log("CLICKED OUTSIDE");
    this.dropMenuShow =  false;
    this.locationDpShow = false;

    if(this._router.url === '/dashboard'){
      setTimeout(() => {
        console.log(localStorage.getItem('locationUpdate')) 
        if(localStorage.getItem('locationUpdate')){
          this.getAllLocation();
        }     
      }, 300);
    }
  }
    
  dropDown($event: Event, state){
    $event.preventDefault();
    $event.stopPropagation();
    console.log('000')
    this.dropMenuShow = (state == 'profile') ? !this.dropMenuShow : false;
    this.locationDpShow = (state == 'loc') ? !this.locationDpShow : false;
  }

  onClickHeaderTab(){
    console.log("ClickHeaderTab")
    this._dataservice.changeMessage('')
  }

}


