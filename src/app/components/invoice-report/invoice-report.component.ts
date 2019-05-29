import { Component, OnInit } from '@angular/core';
import { appService } from '../../service/app.service';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
@Component({
  selector: 'app-invoice-report',
  templateUrl: './invoice-report.component.html',
  styleUrls: ['./invoice-report.component.css']
})
export class InvoiceReportComponent implements OnInit {
  public regionID = localStorage.getItem('regionId');
  public invoiceList: any = [];
  constructor(
    private _service: appService,
    private router: Router,
    public modalService: NgbModal
  ) {}
  public custDetail: any = {};
  public selectedCourse: any = {};
  public modalReference: any;
  public locationId = localStorage.getItem('locationId');
  @BlockUI() blockUI: NgBlockUI;

  ngOnInit() {
    this.getInvoiceList(20, 0);
  }

  getInvoiceList(limit, skip) {
    this._service
      .getAllInvoices(this.regionID, limit, skip)
      // .getAllInvoices(this.regionID, limit, skip)
      .subscribe((res: any) => {
        console.log(res);
        this.invoiceList = this.invoiceList.concat(res);
        console.log(this.invoiceList);
      });
  }

  showMore(skip) {
    console.log('showmore');
    this.getInvoiceList(20, skip);
  }
  openModal(invoice, classEnrollModal) {
    this.blockUI.start('Loading');
    this.selectedCourse = invoice.courseDetails;
    this.selectedCourse.invoice = invoice;
    this.custDetail.user = invoice.userDetails;
    if (invoice.user !== null || invoice.user !== undefined)
      this.custDetail.user.email = invoice.user.email;
    this.modalReference = this.modalService.open(classEnrollModal, {
      backdrop: 'static',
      windowClass:
        'modal-xl modal-inv d-flex justify-content-center align-items-center'
    });
    this.blockUI.stop();
  }

  closeModal(type) {
    this.modalReference.close();
  }
}