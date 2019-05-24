import { Component, OnInit } from '@angular/core';
import { appService } from '../../service/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice-report',
  templateUrl: './invoice-report.component.html',
  styleUrls: ['./invoice-report.component.css']
})
export class InvoiceReportComponent implements OnInit {
  public regionID = localStorage.getItem('regionId');
  constructor(private _service: appService, private router: Router) {}

  ngOnInit() {
    this.getInvoiceList();
  }

  getInvoiceList() {
    this._service.getAllInvoices(this.regionID).subscribe((res: any) => {
      console.log(res);
    });
  }
}
