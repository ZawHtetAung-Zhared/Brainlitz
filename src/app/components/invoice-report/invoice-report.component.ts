import { Component, OnInit, HostListener } from '@angular/core';
import { appService } from '../../service/app.service';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastsManager } from 'ng5-toastr/ng5-toastr';
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
    public modalService: NgbModal,
    public toastr: ToastsManager
  ) {}
  public custDetail: any = {};
  public selectedCourse: any = {};
  public modalReference: any;
  public locationId = localStorage.getItem('locationId');
  public invlistsResult = [];
  public showDp = false;
  public invoiceID2: any;
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
    console.error(invoice);
    this.invoiceID2 = invoice._id;
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
        this.downloadFile(res, status);
      });
  }
  public csvData;
  downloadFile(res, type) {
    this.csvData = this.convertToCSV(res, type);
    var a = document.createElement('a');
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    var blob = new Blob([this.csvData], { type: 'text/csv' });
    var url = window.URL.createObjectURL(blob);
    a.href = url;
    var filename = new Date().toISOString();
    a.download = type + 'invoices' + filename + '.csv';
    a.click();
  }

  convertToCSV(objArray, type) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';
    var row = '';
    row =
      type == 'UNPAID'
        ? 'Invoice Due date,Invoice#,Name,Amount'
        : 'Payment date,Invoice#,Name,Method,Amount';
    str += row + '\r\n';
    // var invObj = {
    //   paymentDate: '',
    //   invoiceId: '',
    //   name: '',
    //   method: null,
    //   amount: null
    // };
    var invObj = {};
    var objArr = [];

    for (var i = 0; i < array.length; i++) {
      if (type == 'UNPAID') {
        invObj['dueDate'] = this.dateFormat(array[i].dueDate);
        invObj['invoiceId'] = array[i].refInvoiceId;
        invObj['name'] = array[i].userDetails.preferredName;
        invObj['amount'] = array[i].total;
        console.log(invObj);
        var line = '';
        for (var index in invObj) {
          if (line != '') line += ',';
          line += invObj[index];
        }
        str += line + '\r\n';
      } else {
        for (var idx = 0; idx < array[i].payments.length; idx++) {
          var payment = array[i].payments[idx];
          invObj['paymentDate'] = this.dateFormat(payment.updatedDate);
          invObj['invoiceId'] = array[i].refInvoiceId;
          invObj['name'] = array[i].userDetails.preferredName;
          if (payment.paymentMethodDetails == undefined) {
            invObj['method'] = '-';
          } else {
            invObj['method'] = payment.paymentMethodDetails.name;
          }
          invObj['amount'] = array[i].payments[idx].amount;
          console.log(invObj);
          var line = '';
          for (var index in invObj) {
            if (line != '') line += ',';
            line += invObj[index];
          }
          str += line + '\r\n';
        }
      }
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
