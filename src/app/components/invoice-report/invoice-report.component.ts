import { Component, OnInit, HostListener } from '@angular/core';
import { appService } from '../../service/app.service';
import { Router } from '@angular/router';
import {
  NgbModal,
  ModalDismissReasons,
  NgbCalendar
} from '@ng-bootstrap/ng-bootstrap';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { DaterangepickerConfig } from 'ng2-daterangepicker';
import * as moment from 'moment';
declare var $: any;

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
    public toastr: ToastrService,
    private daterangepickerOptions: DaterangepickerConfig,
    calendar: NgbCalendar
  ) {
    this.daterangepickerOptions.settings = {
      locale: { format: 'd m YYYY' },
      alwaysShowCalendars: true,
      ranges: {
        Today: [moment()],
        Yesterday: [moment().subtract(1, 'days'), moment()],
        'Last Month': [moment().subtract(1, 'month'), moment()],
        'Last 3 Months': [moment().subtract(3, 'month'), moment()],
        'Last 6 Months': [moment().subtract(6, 'month'), moment()],
        'Last 12 Months': [moment().subtract(12, 'month'), moment()],
        'Last 18 Months': [moment().subtract(18, 'month'), moment()]
      }
    };
  }
  public custDetail: any = {};
  public selectedCourse: any = {};
  public modalReference: any;
  public locationId = localStorage.getItem('locationId');
  public invlistsResult = [];
  public showDp = false;
  public invoiceID2: any;
  public makeupForm: any = {};
  public startDate: any;
  public endDate: any;
  public startDateDue: any;
  public endDateDue: any;
  public options: any;

  @BlockUI() blockUI: NgBlockUI;

  ngOnInit() {
    +-this.getInvoiceList(20, 0);
    this.options = {
      startDate: moment().startOf('hour'),
      endDate: moment().startOf('hour'),
      locale: { format: 'ddd, DD MMM YYYY' },
      alwaysShowCalendars: true
    };
  }

  getInvoiceList(limit, skip) {
    //this.blockUI.start('Loading');
    this._service
      .getAllInvoices(this.regionID, limit, skip)
      // .getAllInvoices(this.regionID, limit, skip)
      .subscribe((res: any) => {
        console.log(res);
        this.invlistsResult = res;
        this.invoiceList = this.invoiceList.concat(res);
        console.log(this.invoiceList);
        //this.blockUI.stop();
      });
  }

  showMore(skip) {
    console.log('showmore');
    this.getInvoiceList(20, skip);
  }
  openModal(invoice, classEnrollModal) {
    //this.blockUI.start('Loading');
    this.selectedCourse = invoice.courseDetails;
    this.selectedCourse.invoice = invoice;
    console.log(invoice);
    this.invoiceID2 = invoice._id;
    this.custDetail.user = invoice.userDetails;
    if (invoice.user !== null || invoice.user !== undefined)
      this.custDetail.user.email = invoice.user.email;
    this.modalReference = this.modalService.open(classEnrollModal, {
      backdrop: 'static',
      windowClass:
        'modal-xl borderless modal-inv d-flex justify-content-center align-items-center'
    });
    setTimeout(() => {
      //this.blockUI.stop();
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
        ? 'Invoice Due date,Invoice#,Name,Amount,Discount,Course Fee,Others'
        : 'Payment date,Invoice#,Name,Method,Amount,Discount,Course Fee,Others';
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
      console.log(i);
      if (type == 'UNPAID') {
        invObj['dueDate'] = this.dateFormat(array[i].dueDate);
        invObj['invoiceId'] = array[i].refInvoiceId;
        if (
          array[i].userDetails == null ||
          array[i].userDetails.preferredName == null
        ) {
          invObj['name'] = array[i].user.email;
        } else invObj['name'] = array[i].userDetails.preferredName;
        invObj['amount'] = array[i].total;
        if (
          array[i].totalDiscount == undefined ||
          array[i].totalDiscount != undefined ||
          array[i].totalDiscount.amount == undefined ||
          array[i].totalDiscount.amount == undefined
        ) {
          invObj['discount'] = '';
        } else {
          invObj['discount'] = array[i].totalDiscount.amount;
        }

        invObj['courseFee'] = array[i].courseFee.fee;
        // invObj['registrationFee'] = array[i].registrationFee.fee;
        invObj['Others'] = ''; //clear first
        if (array[i].additionalFees) {
          //check if exists or not
          if (array[i].additionalFees.length > 0) {
            //if exists check array
            invObj['Others'] += '"'; // next line format start
            for (var j = 0; j < array[i].additionalFees.length; j++) {
              //loop the array
              invObj['Others'] +=
                array[i].additionalFees[j].name +
                ' => ' +
                array[i].additionalFees[j].amount; //all data
              if (j != array[i].additionalFees.length - 1) {
                //check if last
                invObj['Others'] += '\n'; //next line if last
              }
            }
            invObj['Others'] += '"'; //next line format end
          } else {
            //if length zero
            invObj['Others'] = '-';
          }
        } else {
          //if doesn't exist at all
          invObj['Others'] = '-';
        }
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
          if (
            array[i].userDetails == null ||
            array[i].userDetails.preferredName == null
          )
            invObj['name'] = array[i].user.email;
          else invObj['name'] = array[i].userDetails.preferredName;
          if (payment.paymentMethodDetails == undefined) {
            invObj['method'] = '-';
          } else {
            invObj['method'] = payment.paymentMethodDetails.name;
          }
          invObj['amount'] = array[i].payments[idx].amount;
          if (
            array[i].totalDiscount == undefined ||
            array[i].totalDiscount != undefined ||
            array[i].totalDiscount.amount == undefined ||
            array[i].totalDiscount.amount == undefined
          ) {
            invObj['discount'] = '';
          } else {
            invObj['discount'] = array[i].totalDiscount.amount;
          }
          invObj['courseFee'] = array[i].courseFee.fee;
          // invObj['registrationFee'] = array[i].registrationFee.fee;
          invObj['Others'] = ''; //clear first
          if (array[i].additionalFees) {
            //check if exists or not
            if (array[i].additionalFees.length > 0) {
              //if exists check array
              invObj['Others'] += '"'; // next line format start
              for (var j = 0; j < array[i].additionalFees.length; j++) {
                //loop the array
                invObj['Others'] +=
                  array[i].additionalFees[j].name +
                  ' => ' +
                  array[i].additionalFees[j].amount; //all data
                if (j != array[i].additionalFees.length - 1) {
                  //check if last
                  invObj['Others'] += '\n'; //next line if last
                }
              }
              invObj['Others'] += '"'; //next line format end
            } else {
              //if length zero
              invObj['Others'] = '-';
            }
          } else {
            //if doesn't exist at all
            invObj['Others'] = '-';
          }
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
  filterField(modal) {
    this.modalReference = this.modalService.open(modal, {
      backdrop: 'static',
      windowClass: 'modal-xl d-flex justify-content-center align-items-center'
    });
    setTimeout(() => {
      $('.daterangepicker').addClass('center-datepicker');
    }, 500);
  }
  setExpirationDate(event) {
    this.makeupForm.expirationDate = event;
    console.log(' exp date test', event);
    console.log(' expirationDate', this.makeupForm.expirationDate);
  }
  closeCalendar(datePicker, event) {
    if (event.target.offsetParent == null) datePicker.close();
    else if (event.target.offsetParent.nodeName != 'NGB-DATEPICKER')
      datePicker.close();
  }

  applyDateRange(evt) {
    // this.startDate = new Date(evt.picker.startDate).toISOString();
    // this.endDate = new Date(evt.picker.endDate).toISOString();
    this.startDate = new Date(
      evt.picker.startDate.format('YYYY-MM-DD')
    ).toISOString();
    this.endDate = new Date(
      new Date(evt.picker.endDate.format('YYYY-MM-DD')).setUTCHours(
        23,
        59,
        59,
        999
      )
    ).toISOString();
    console.log('#########', this.startDate, '~~', this.endDate);
  }
  applyDateRangeDue(evt) {
    // this.startDate = new Date(evt.picker.startDate).toISOString();
    // this.endDate = new Date(evt.picker.endDate).toISOString();
    this.startDateDue = new Date(
      evt.picker.startDate.format('YYYY-MM-DD')
    ).toISOString();
    this.endDateDue = new Date(
      new Date(evt.picker.endDate.format('YYYY-MM-DD')).setUTCHours(
        23,
        59,
        59,
        999
      )
    ).toISOString();
    console.log('#########', this.startDate, '~~', this.endDate);
  }
  calendarCanceled(e: any) {
    console.log(e);
    // e.event
    // e.picker
  }
  togglePicker(e: any) {
    console.log(e.event.type);
  }
}
