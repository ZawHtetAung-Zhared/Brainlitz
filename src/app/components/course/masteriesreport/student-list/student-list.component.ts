import { Component, OnInit, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import sampleData from './../sampleData';
import student_Data from './studentData';

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
  public studentlist = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  public isItemSelect: boolean = false;
  public showStdList: boolean = true;

  constructor(private _location: Location) {}

  ngOnInit() {
    this.masteriesReports = this.masteriesReports.filter(function(res) {
      return res.id == localStorage.getItem('mastery_reportId');
    });
    this.selectedMastery = this.masteriesReports[0];
    this.selectedMastery.selectData = this.selectedMastery.data.filter(function(
      res
    ) {
      return res.id == localStorage.getItem('mastery_itemId');
    });
    this.selectedMastery.selectData[0].reportList = student_Data;
    this.selectedMastery.selectData[0].reportList.forEach(element => {
      element.showList = true;
    });
    console.log(this.selectedMastery, this.itemId, this.masteriesReports);
  }

  @HostListener('document:click', ['$event']) clickedOutside($event) {
    this.isItemSelect = false;
  }

  backTo() {
    this._location.back();
    localStorage.removeItem('mastery_itemId');
  }

  selectItem(ItemId) {
    this.selectedMastery.selectData = this.selectedMastery.data.filter(function(
      res
    ) {
      return res.id == ItemId;
    });
    this.selectedMastery.selectData[0].reportList = student_Data;
    this.itemId = ItemId;
    console.log(this.selectedMastery);
  }

  dropDown($event: Event, state, id) {
    $event.preventDefault();
    $event.stopPropagation();
    if (state == 'student') {
      this.showStdList = !this.showStdList;
      this.selectedMastery.selectData[0].reportList.forEach(element => {
        if (element.id == id) element.showList = !element.showList;
      });
    }
    this.isItemSelect = state == 'item' ? !this.isItemSelect : false;
  }
}
