import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { appService } from '../../../service/app.service';

@Component({
  selector: 'app-select-module',
  templateUrl: './select-module.component.html',
  styleUrls: ['./select-module.component.css']
})
export class SelectModuleComponent implements OnInit {
  moduleList: any = [];
  public selectedModule: any = {};
  public isCreateShareOpt: boolean = false;
  public regionID = localStorage.getItem('regionId');
  public addTrackingModule: boolean = false;
  public trackingModuleType: boolean = false;

  constructor(public _service: appService, private _router: Router) {}

  ngOnInit() {
    this.trackingModuleType = true;
    this.getAllModule();
  }

  getAllModule() {
    this._service.getAllModule(this.regionID).subscribe(
      (res: any) => {
        console.warn('moduleLists', res);
        for (var i in res) {
          if (res[i]._id != null) {
            this.moduleList.push(res[i]);
          }
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  chooseModuleType(module) {
    console.log(module);
    this.selectedModule = module;
    this.trackingModuleType = false;
    this.isCreateShareOpt = true;
    // console.log('ModuleId --->', val);
    // this.isCreateStatus = true;
    // this.apgType = name;
    // console.log('ModuleName --->', name);
    // this.ischecked = val;

    // this.moduleID = val;
    // this.pickedMType.name = name;
    // this.pickedMType.id = val;
    // localStorage.setItem('moduleID', val);
    // setTimeout(() => {
    //   this.ismodule = false;
    //   this.isshare = true;
    //   if (name == 'Assessment') {
    //     this.apCreate = true;
    //   }
    //   console.log('...');
    // }, 300);
  }

  createNewAPG() {
    console.log(this.selectedModule);
    this._router.navigateByUrl(
      'tool-test/tracking-module/create/' +
        this.selectedModule.type +
        '/' +
        this.selectedModule._id
    );
  }
  // goToAll() {
  //   this.router.navigate(['../'], { relativeTo: this.route });
  // }

  // createNewAPG(type) {
  //   if (type == 'create') {
  //     console.log('link to create', this.selectedModule);
  //     this.router.navigate(['../create'], { relativeTo: this.route });
  //   } else console.log('link to share', this.selectedModule);
  // }

  goToAddTrackingModule() {
    this.isCreateShareOpt = false;
  }
}
