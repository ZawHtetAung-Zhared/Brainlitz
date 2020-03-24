import { Component, OnInit } from '@angular/core';

import { appService } from '../../../service/app.service';
import { Router, ActivatedRoute } from '@angular/router';

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
  constructor(
    public _service: appService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
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
    setTimeout(() => {
      this.isCreateShareOpt = true;
    }, 300);

    // console.log('ModuleId --->', val);
    // this.isCreateStatus = true;
    // this.apgType = name;
    // console.log('ModuleName --->', name);
    // this.ischecked = val;
    // this.addTrackingModule = false;
    // this.trackingModuleType = true;
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

  goToAll() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  createNewAPG(type) {
    if (type == 'create') {
      console.log('link to create', this.selectedModule);
      this.router.navigate(['../create'], { relativeTo: this.route });
    } else console.log('link to share', this.selectedModule);
  }

  goToAddTrackingModule() {
    this.isCreateShareOpt = false;
  }
}
