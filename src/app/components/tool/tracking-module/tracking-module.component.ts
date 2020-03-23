import {
  Component,
  OnInit,
  ViewChild,
  ViewChildren,
  ContentChild
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { appService } from '../../../service/app.service';
import { ToastrService } from 'ngx-toastr';

import { ToolCommunicationService } from '../tool-communication.service';
import { AllTrackingModuleComponent } from '../all-tracking-module/all-tracking-module.component';
import { ProgressComponent } from '../progress/progress.component';
@Component({
  selector: 'app-tracking-module',
  templateUrl: './tracking-module.component.html',
  styleUrls: ['./tracking-module.component.css'],
  providers: [AllTrackingModuleComponent, ProgressComponent]
})
export class TrackingModuleComponent implements OnInit {
  @ContentChild(AllTrackingModuleComponent)
  private allModule: AllTrackingModuleComponent;

  @ContentChild(ProgressComponent) private progressModule: ProgressComponent;

  // arrary
  public apgPermission: any = [];
  public apgDemo: any = [];
  moduleList: any[] = [];
  apgList: Array<any> = [];
  // string or any
  public permissionType: any;
  public tempRoute: any;
  // boolean
  showDp: boolean = false;

  public regionID = localStorage.getItem('regionId');

  constructor(
    private _service: appService,
    public toastr: ToastrService,
    private _route: Router,
    private _toolCommunication: ToolCommunicationService
  ) {}

  ngOnInit() {
    this.permissionType = localStorage.getItem('permission');
    this.checkPermission();
  }

  checkPermission() {
    console.log(this.permissionType);
    this.apgPermission = ['CREATEAPG', 'CREATEAP'];
    if (this.permissionType != null) {
      this.apgPermission = this.apgPermission.filter(
        value => -1 !== this.permissionType.indexOf(value)
      );
      this.apgDemo['addAPG'] = this.apgPermission.includes('CREATEAPG')
        ? 'CREATEAPG'
        : '';
      this.apgDemo['addAP'] = this.apgPermission.includes('CREATEAP')
        ? 'CREATEAP'
        : '';
      this.apgDemo['viewAPG'] = this.apgPermission.includes('VIEWAPG')
        ? 'VIEWAPG'
        : '';

      console.log(this.apgDemo);
    }
    console.log(this.apgPermission.length);
    if (this.apgPermission.length > 0) {
      this.getAllModule();
      this.getAllAPG(20, 0, null);
    } else {
      this.apgList = [];
    }
  }

  showExportOption($event: Event, state) {
    $event.preventDefault();
    $event.stopPropagation();
    this.showDp = state == 'exportOpt' ? !this.showDp : false;
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

  // export csv for evaluation apg
  exportCSV(data) {
    console.log('apg~~~', data);
    var apg: any;
    var apgName: any;
    if (data == 'all') {
      apg = 'all';
      apgName = 'all assessment';
    } else {
      apg = data;
      apgName = apg.name;
    }

    this._service
      .getEvaluationExport(apg, this.regionID)
      .subscribe((res: any) => {
        console.log('report json', res);
        if (res.length > 0) {
          this.downloadFile(res, apgName);
        } else {
          console.log('no report');
          this.toastr.error('There is no report for csv export');
        }
      });
  }

  downloadFile(res, name) {
    var csvData = this.ConvertToCSV(res);
    console.log(csvData);
    var a = document.createElement('a');
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    var blob = new Blob([csvData], { type: 'text/csv' });
    var url = window.URL.createObjectURL(blob);
    a.href = url;
    var filename = new Date().toISOString();
    console.log('~~~', name + filename);
    a.download = name + filename + '.csv';
    a.click();
  }

  ConvertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    // console.log(array);
    var str = '';
    var row = '';

    // for (var index in objArray[0]) {
    //   //Now convert each value to string and comma-separated
    //   row += index + ',';
    //   // console.log(row);
    // }
    // row = row.slice(0, -1);
    row =
      'Student Name,Teacher Name,Course Name,Course Plan Name,Class Start Time,Location,APG Name,Result,Submitted Date,Previous Grade,Current Grade,Grade Result';
    //append Label row with line break
    str += row + '\r\n';
    // console.log(str);

    for (var i = 0; i < array.length; i++) {
      var line = '';
      var apgObject = {};
      apgObject['studentName'] = array[i].student.preferredName || ' ';
      apgObject['teacherName'] = array[i].teacher.preferredName || ' ';
      apgObject['courseName'] = array[i].courseName.replace(/,/g, ' ');
      apgObject['cPlanName'] = array[i].coursePlanName.replace(/,/g, ' ');
      apgObject['classStartTime'] = array[i].classStartTime.replace(/,/g, ' ');
      apgObject['location'] = array[i].locationName.replace(/,/g, ' ');
      apgObject['apgName'] = array[i].apgName.replace(/,/g, ' ');
      apgObject['result'] = array[i].results || ' ';
      apgObject['submittedDate'] = array[i].submittedDate.replace(/,/g, ' ');
      apgObject['previousGrade'] = array[i].previousGrade.replace(/,/g, ' ');
      apgObject['currentGrade'] = array[i].currentGrade.replace(/,/g, ' ');
      apgObject['gradeResult'] = array[i].gradeResult.replace(/,/g, ' ');
      for (var index in apgObject) {
        if (line != '') line += ',';
        line += apgObject[index];
      }
      // for (var index in array[i]) {
      //   if (line != '') line += ',';
      //   if (typeof array[i][index] == 'object') {
      //     line += array[i][index].preferredName;
      //   } else {
      //     // console.log('array idx', array[i][index]);
      //     var val = array[i][index].replace(/,/g, ' ');
      //     line += val;
      //   }
      //   // console.log('line~~~', line);
      // }
      str += line + '\r\n';
      // console.log("str~~~",str);
    }
    return str;
  }

  getAllAPG(limit, skip, value) {
    //this.blockUI.start('Loading...');
    this._service.getAllAPG(this.regionID, null, limit, skip, value).subscribe(
      (res: any) => {
        this.apgList = [];

        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  onClickApgTab(type, id) {
    this._route.navigateByUrl('tool-test/tracking-module/' + type + '/' + id);
  }

  apgListSearch(value) {
    console.log(this.allModule, 'sad');
    console.log(value);
    this._toolCommunication.searchDataInput({ searchData: value });
  }
}
