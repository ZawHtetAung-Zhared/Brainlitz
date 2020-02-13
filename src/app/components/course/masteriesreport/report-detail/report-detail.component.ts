import { Component, OnInit, HostListener } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.css']
})
export class ReportDetailComponent implements OnInit {
  isSticky: boolean = false;
  previousUrl: string;
  public active = 'courses';

  constructor(private _location: Location, private router: Router) {}

  ngOnInit() {}

  @HostListener('window:scroll', ['$event']) onScroll($event) {
    if (window.pageYOffset > 81) {
      this.isSticky = true;
    } else {
      this.isSticky = false;
    }
  }

  backTo() {
    this._location.back();
  }
}
