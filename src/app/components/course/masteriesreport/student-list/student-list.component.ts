import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import sampleData from './../sampleData';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  masteriesReports: any = [
    { id: 1, name: 'Light Energy', data: sampleData },
    { id: 2, name: 'Heat Energy', data: sampleData }
  ];
  public selectedMastery: any; //= this.masteriesReports[localStorage.getItem('mastery_reportId')];
  public itemId = localStorage.getItem('mastery_itemId');

  constructor(private _location: Location) {}

  ngOnInit() {
    this.masteriesReports = this.masteriesReports.filter(function(res) {
      return res.id == localStorage.getItem('mastery_reportId');
    });
    this.selectedMastery = this.masteriesReports[0];
    this.selectedMastery.data = this.masteriesReports[0].data.filter(function(
      res
    ) {
      return res.id == localStorage.getItem('mastery_itemId');
    });
    console.log(this.selectedMastery, this.itemId);
  }

  backTo() {
    this._location.back();
    localStorage.removeItem('mastery_itemId');
  }
}
