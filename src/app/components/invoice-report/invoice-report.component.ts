import { Component, OnInit, HostListener } from '@angular/core';
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
  public invlistsResult = [];
  public showDp = false;

  @BlockUI() blockUI: NgBlockUI;

  ngOnInit() {
    this.getInvoiceList(20, 0);
  }

  getInvoiceList(limit, skip) {
    this.blockUI.start('Loading');
    this._service
      .getAllInvoices(this.regionID, limit, skip)
      // .getAllInvoices(this.regionID, limit, skip)
      .subscribe((res: any) => {
        console.log(res);
        this.invlistsResult = res;
        this.invoiceList = this.invoiceList.concat(res);
        console.log(this.invoiceList);
        this.blockUI.stop();
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
    setTimeout(() => {
      this.blockUI.stop();
    }, 1000);
  }

  closeModal(type) {
    this.modalReference.close();
    this.invoiceList = [];
    this.invlistsResult = [];
    this.getInvoiceList(20, 0);
  }

  @HostListener('document:click', ['$event']) clickout($event) {
    this.showDp = false;
  }

  showExportOption($event: Event, state) {
    $event.preventDefault();
    $event.stopPropagation();
    this.showDp = state == 'paid' ? !this.showDp : false;
  }

  exportInvoiceLists(status) {
    this._service
      .invoicesExport(this.regionID, status)
      .subscribe((res: any) => {
        console.log(res);
        this.downloadFile(res);
      });
  }
  public csvData;
  downloadFile(res) {
    this.csvData = this.convertToCSV(res);
    var a = document.createElement('a');
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    var blob = new Blob([this.csvData], { type: 'text/csv' });
    var url = window.URL.createObjectURL(blob);
    a.href = url;
    var filename = new Date().toISOString();
    a.download = 'invoiceReport' + filename + '.csv';
    a.click();
  }

  convertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';
    var row = '';
    row = 'Payment date,Invoice#,Name,Method,Amount';
    str += row + '\r\n';
    var invObj = {
      paymentDate: '',
      invoiceId: '',
      name: '',
      method: null,
      amount: null
    };
    var objArr = [];

    for (var i = 0; i < array.length; i++) {
      if (array[i].payments.length == 1) {
        var payment = array[i].payments[0];
      } else if (array[i].payments.length > 1) {
        let idx = array[i].payments.length - 1;
        var payment = array[i].payments[idx];
      }
      invObj.paymentDate = this.dateFormat(payment.updatedDate);
      if (payment.paymentMethodDetails == undefined) {
        invObj.method = '-';
      } else {
        invObj.method = payment.paymentMethodDetails.name;
      }
      invObj.amount = array[i].total;
      invObj.invoiceId = array[i].refInvoiceId;
      invObj.name = array[i].userDetails.preferredName;
      // console.log(invObj);
      var line = '';
      for (var index in invObj) {
        if (line != '') line += ',';
        line += invObj[index];
      }
      str += line + '\r\n';
      // console.log(str)
    }
    return str;
  }

  dateFormat(date) {
    var d = new Date(date);
    var dFormat =
      d.getUTCMonth() + 1 + '/' + d.getUTCDate() + '/' + d.getUTCFullYear();
    // console.log("~~~",date,dFormat)
    return dFormat;
  }
}
