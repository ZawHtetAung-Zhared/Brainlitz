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
  public searchword: any;
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
  public startDate: any = null;
  public endDate: any = null;
  public startDateDue: any = null;
  public endDateDue: any = null;
  public options: any;
  public filterOn: boolean = false;
  public status: any = {
    unpaid: false,
    paid: false,
    partial: false
  };
  public searchKeyword: any;
  public sortColumn: any = 'createdDate';
  public sortDirection: any = 'desc';

  @BlockUI() blockUI: NgBlockUI;

  ngOnInit() {
    this.getInvoiceList(
      20,
      0,
      this.status,
      this.startDate,
      this.endDate,
      this.startDateDue,
      this.endDateDue,
      this.selectedCustomerList,
      this.sortColumn,
      this.sortDirection
    );
    this.options = {
      startDate: moment().startOf('hour'),
      endDate: moment().startOf('hour'),
      locale: { format: 'ddd, DD MMM YYYY' },
      alwaysShowCalendars: true
    };
  }

  getInvoiceList(
    limit,
    skip,
    status,
    start,
    end,
    startDue,
    endDue,
    cusList,
    sortcol,
    sortdir
  ) {
    //this.blockUI.start('Loading');
    this._service
      .getAllInvoices(
        this.regionID,
        limit,
        skip,
        status,
        start,
        end,
        startDue,
        endDue,
        cusList,
        sortcol,
        sortdir
      )
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
    this.getInvoiceList(
      20,
      skip,
      this.status,
      this.startDate,
      this.endDate,
      this.startDateDue,
      this.endDateDue,
      this.selectedCustomerList,
      this.sortColumn,
      this.sortDirection
    );
  }
  openModal(invoice, classEnrollModal) {
    //this.blockUI.start('Loading');
    this.selectedCourse = invoice.courseDetails
      ? invoice.courseDetails
      : invoice.subscription;
    this.selectedCourse.invoice = invoice;
    console.log(invoice);
    this.invoiceID2 = invoice._id;
    let dummy = {
      email: '-',
      fullName: '-',
      guardianEmail: ['-'],
      preferredName: '-',
      profilePic: '-',
      _id: '-'
    };
    this.custDetail.user = invoice.userDetails ? invoice.userDetails : dummy;
    if (invoice.user !== null || invoice.user !== undefined)
      this.custDetail.user.email = invoice.user ? invoice.user.email : '-';
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
    this.getInvoiceList(
      20,
      0,
      this.status,
      this.startDate,
      this.endDate,
      this.startDateDue,
      this.endDateDue,
      this.selectedCustomerList,
      this.sortColumn,
      this.sortDirection
    );
  }

  @HostListener('document:click', ['$event']) clickout($event) {
    this.showDp = false;
    this.searchFlag = false;
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
          invObj['name'] = array[i].user ? array[i].user.email : '-';
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
            invObj['name'] = array[i].user ? array[i].user.email : '-';
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
  closeFModal() {
    this.modalReference.close();
  }
  public searchResult: any;
  public searchFlag: boolean = false;
  userSearch(searchWord, userType, limit, skip) {
    this.searchKeyword = searchWord;
    this.searchword = searchWord;

    if (searchWord.length != 0) {
      this.searchFlag = true;
      this._service
        .getSearchUser(this.regionID, searchWord, userType, limit, skip, '')
        .subscribe(
          (res: any) => {
            console.log('search test', res);
            this.searchResult = res;
          },
          err => {
            console.log(err);
          }
        );
    } else {
      console.log('zero', searchWord.length);
    }
  }
  userSearch_input(keyword) {
    this.searchKeyword = keyword;
    if (keyword.length == 0) {
      this.searchFlag = false;
    }
  }
  confirmFilter() {
    console.log('checkbox', this.status);
    console.log('customer', this.selectedCustomerList);
    console.log('invoice date', this.startDate, this.endDate);
    console.log('Due date', this.startDateDue, this.endDateDue);
    this.filterOn = true;
    this.refreshInvoiceList();
    this.closeFModal();
  }
  public selectedCustomerList: any = [];
  selectCustomer(customer, $event) {
    for (var i = 0; i < this.selectedCustomerList.length; i++) {
      if (this.selectedCustomerList[i].userId == customer.userId) {
        this.selectedCustomerList.splice(i, 1);
      }
    }
    this.selectedCustomerList.push(customer);
    console.log('sElEcTeD', this.selectedCustomerList);
    // $event.stopPropagation();
  }
  removeFilter() {
    this.filterOn = false;
    this.status = {
      unpaid: false,
      paid: false,
      partial: false
    };
    this.selectedCustomerList = [];
    this.startDate = null;
    this.endDate = null;
    this.startDateDue = null;
    this.endDateDue = null;
    this.checkFilter();
  }
  removeCustomer(customer) {
    this.selectedCustomerList.splice(
      this.selectedCustomerList.findIndex(x => x == customer),
      1
    );
    console.log('@@@@', this.selectedCustomerList);
    this.checkFilter();
  }
  checkFilter() {
    if (
      this.status.paid == false &&
      this.status.unpaid == false &&
      this.status.partial == false &&
      this.startDate == null &&
      this.endDate == null &&
      this.startDateDue == null &&
      this.endDateDue == null &&
      this.selectedCustomerList.length == 0
    ) {
      this.filterOn = false;
    }
    this.refreshInvoiceList();
  }
  refreshInvoiceList() {
    this._service
      .getAllInvoices(
        this.regionID,
        20,
        0,
        this.status,
        this.startDate,
        this.endDate,
        this.startDateDue,
        this.endDateDue,
        this.selectedCustomerList,
        this.sortColumn,
        this.sortDirection
      )
      // .getAllInvoices(this.regionID, limit, skip)
      .subscribe((res: any) => {
        console.log(res);
        this.invlistsResult = res;
        this.invoiceList = res;
        console.log(this.invoiceList);
        //this.blockUI.stop();
      });
  }
  sortBy(obj) {
    this.sortDirection = this.sortDirection == 'desc' ? 'asc' : 'desc';
    this.sortColumn = obj;
    this.refreshInvoiceList();
  }
  filterToggle(cb) {
    if (cb == 'paid') {
      this.status.paid = !this.status.paid;
    }
    if (cb == 'unpaid') {
      this.status.unpaid = !this.status.unpaid;
    }
    if (cb == 'partial') {
      this.status.partial = !this.status.partial;
    }
  }
  removeSelectedCustomer(customer) {
    console.log('zha testing', this.selectedCustomerList);
    console.log('~~~', customer);
    this.selectedCustomerList = this.selectedCustomerList.filter(
      ({ userId }) => userId !== customer.userId
    );
    console.log('after', this.selectedCustomerList);
  }
}
