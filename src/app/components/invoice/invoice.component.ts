import { BlockUI, NgBlockUI, BlockUIModule } from 'ng-block-ui';
import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  AfterViewInit
} from '@angular/core';
import { appService } from '../../service/app.service';
import { DataService } from '../../service/data.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng5-toastr/ng5-toastr';
import { FormStyle } from '@angular/common';
import { isBoolean } from 'util';
import { tryParse } from 'selenium-webdriver/http';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  public token: string;
  public isEditInv: boolean = false;
  public type: string;
  public orgID = localStorage.getItem('OrgId');
  public invoiceInfo = {};
  public feesBox: boolean = false;
  public feesBox1: boolean = false;
  public feesBox2: boolean = false;
  public feesBox3: boolean = false;
  public activeFeeBoxId: any;
  public noSetting: boolean;
  public invStatus: string;
  public logo: any = localStorage.getItem('OrgLogo');
  public refInvID: any;
  public singleInv = [];
  public showPaidInvoice: boolean;
  public showInvoice: boolean;
  public invoice: any;
  public updatedDate: any;
  public dueDate: any;
  // public invoiceID: any;
  public invTaxName: any;
  public invCurrency: any;
  public invPayment: any;
  public total: any;
  public subTotal: any;
  public totalTax: any;
  public totalDiscount: any;
  public totalDiscounTax: any;
  public hideMenu: boolean = false;
  public showStudentOption: any = '';
  public xxxhello: any = '';
  public showPayment: boolean = false;
  public paymentItem: any = {};
  public paymentId: any;
  public paymentProviders: any;
  public selectedPayment: any;
  public unitPrice: any;
  public hideReg: boolean = false;
  public hideMisc: boolean = false;
  public hideDeposit: boolean = false;
  public iscDiscount: boolean = false;
  public isNewItemDiscount: boolean = false;
  public invoiceCourse: any = {};
  public value: any = {};
  public taxRate: any;
  public updateInvData: any;
  public showLoading: boolean = false;
  public regionId = localStorage.getItem('regionId');
  public locationID = localStorage.getItem('locationId');
  public paymentSettings: any = {};
  public registration: any;
  public min: any = 0;
  public cDiscount = {
    value: 0,
    tax: 0,
    taxRes: 0,
    type: '',
    dValue: 0.0,
    amount: 0.0,
    isDefault: false
  };

  // public total:any;
  @BlockUI() blockUI: NgBlockUI;
  constructor(
    private _service: appService,
    public toastr: ToastsManager,
    private router: Router,
    private dataService: DataService
  ) {}
  @Input() custDetail;
  @Input() course;
  @Input() invoiceId;
  @Output() closed = new EventEmitter<boolean>();
  public default_total: any;
  public default_subTotal: any;
  public defult_totalTax: any;
  public default_disTotal: any;
  public defult_disTotalTax: any;

  ngOnInit() {
    // this.taxRate = this.course.invoice.tax.rate;
    this.singleInv = [];
    this.getSingleinvoice();
    this.getRegionInfo();
    // if (Array.isArray(this.course.invoice)) {
    //   if (this.course.invoice[0].status == 'PAID') {
    //     this.showPaidInvoice = true;
    //   } else if (
    //     this.course.invoice[0].status == 'UNPAID' ||
    //     this.course.invoice[0].status == 'PAID[PARTIAL]'
    //   ) {
    //     this.showInvoice = true;
    //   }
    // } else {
    //   if (this.course.invoice[0].status == 'PAID') {
    //     this.showPaidInvoice = true;
    //   } else if (
    //     this.course.invoice[0].status == 'UNPAID' ||
    //     this.course.invoice[0].status == 'PAID[PARTIAL]'
    //   ) {
    //     this.showInvoice = true;
    //   }
    // }

    // if (this.course.invoice != null) {
    //   console.log();
    //   if (Array.isArray(this.course.invoice))
    //     var invoiceId = this.course.invoice[0]._id;
    //   else var invoiceId = this.course.invoice._id;
    //   console.log('has invoice ID', invoiceId);
    // } else {
    //   console.log('no invoice id');
    // }
    console.log(this.invoiceInfo);
  }

  getSingleinvoice() {
    this._service.getSingleInvoice(this.invoiceId).subscribe(
      (res: any) => {
        console.log('single invoice>>', res);
        // this.singleInv.push(res);
        // this.invoice = this.singleInv;

        // this.feesBox = true
        this.invoice = res;
        this.showOneInvoice(this.course, this.invoice);

        if (this.invoice.status == 'PAID') {
          this.showPaidInvoice = true;
        } else if (
          this.invoice.status == 'UNPAID' ||
          this.invoice.status == 'PAID[PARTIAL]'
        ) {
          this.showInvoice = true;
        }

        if (this.invoice.courseFee.discount != undefined) {
          if (this.invoice.courseFee.discount.amount != 0) {
            if (
              this.invoice.courseFee.taxInclusive == true &&
              this.invoice.courseFee.noTax == false
            ) {
              this.cDiscount.type = 'Inclusive';
              this.cDiscount.dValue =
                this.invoice.courseFee.discount.amount +
                this.invoice.courseFee.discount.tax;
            } else if (
              this.invoice.courseFee.taxInclusive == false &&
              this.invoice.courseFee.noTax == false
            ) {
              this.cDiscount.type = 'Exclusive';
              this.cDiscount.dValue = this.invoice.courseFee.discount.amount;
            } else if (this.invoice.courseFee.noTax == true) {
              this.cDiscount.type = 'No Tax';
              this.cDiscount.dValue = this.invoice.courseFee.discount.amount;
            }

            this.cDiscount.value = this.invoice.courseFee.discount.amount;
            this.cDiscount.amount = this.invoice.courseFee.discount.amount;
            this.cDiscount.tax = this.invoice.tax.rate;
            this.iscDiscount = true;
            this.cDiscount.isDefault = true;
            // this.addnewDiscount('courseFee-dis', null);
          }
          this.default_disTotal = Number(
            this.invoice.courseFee.discount.amount
          );
          this.defult_disTotalTax = Number(this.invoice.courseFee.discount.tax);
        } else {
          this.default_disTotal = 0;
          this.defult_disTotalTax = 0;
        }

        this.default_subTotal = Number(this.invoice.courseFee.fee).toFixed(2);
        this.defult_totalTax = Number(this.invoice.courseFee.tax).toFixed(2);

        if (res.additionalFees != undefined || res.additionalFees != null) {
          this.changeTempObj(res.additionalFees);
        }

        console.log('c Discount', this.cDiscount);

        setTimeout(() => {
          this.calculationTotal();
        }, 200);
        console.log('total', this.total);
      },
      err => {
        console.log(err);
      }
    );
  }
  // hideInvoiceRow(type) {
  //   this.isEditInv = true;
  //   if (type == 'reg') {
  //     this.hideReg = true;
  //     this.updateInvData['registrationFee'] = null;
  //     this.calculateHideFees(type);
  //   } else if (type == 'deposit') {
  //     this.hideDeposit = true;
  //     this.updateInvData['deposit'] = null;
  //     this.calculateHideFees(type);
  //   } else if (type == 'misc') {
  //     this.hideMisc = true;
  //     this.updateInvData['miscFee'] = null;
  //     this.calculateHideFees(type);
  //   }
  // }

  hideInvoiceRow(obj) {
    console.log(this.cDiscount);
    console.log('remove', this.newItemArr);
    this.newItemArr.splice(
      // this.lessonObjArr.map(x => x._id).indexOf(id),
      this.newItemArr.indexOf(obj),
      1
    );
    console.log(this.newItemArr.length);

    this.isEditInv = true;
    this.validateForm();
    this.calculationTotal();
    // console.log(this.isEditInv);
  }
  updateInvoice() {
    console.log('id', this.invoiceId);
    console.log('c Discount', this.cDiscount);
    console.log('new itemarr ', this.newItemArr);
    let arr = [];

    for (let i = 0; i < this.newItemArr.length; i++) {
      let type: boolean = true;
      let notax: boolean;
      if (this.newItemArr[i].taxtype == 'Inclusive') {
        type = true;
      } else if (this.newItemArr[i].taxtype == 'Exclusive') {
        type = false;
      } else if (this.newItemArr[i].taxtype == 'No Tax') {
        notax = true;
      }

      let obj = {
        name: this.newItemArr[i].name,
        fee: this.newItemArr[i].dfee,
        taxInclusive: type,
        noTax: notax,
        discount: {
          amount: Number(this.newItemArr[i].discount.dValue)
        }
      };

      arr.push(obj);
    }
    let finalObj = {
      courseFee: this.updateInvData,
      courseFeeDiscount: this.cDiscount.dValue,
      additionalFees: arr
    };
    console.log('f obj', finalObj);

    this._service.updateInvoiceInfo(this.invoiceId, finalObj).subscribe(
      (res: any) => {
        console.log('res update', res);
        this.isEditInv = false;
        //for updating invoice ui
        // this.singleInv = [];
        // this.singleInv.push(res);
        // this.invoice = this.singleInv;
        this.invoice = res;
        this.changeTempObj(res.additionalFees);

        console.log('invoice', this.invoice);
        // for (var i in this.invoice) {
        var n = this.invoice.total;
        // this.def = n.toFixed(2);
        this.default_subTotal = Number(this.invoice.courseFee.fee).toFixed(2);
        this.defult_totalTax = Number(this.invoice.courseFee.tax).toFixed(2);
        // if (this.invoice[i].registrationFee.fee == null) {
        //   this.hideReg = true;
        // }

        // if (this.invoice[i].miscFee.fee == null) {
        //   this.hideMisc = true;
        // }

        // if (this.invoice[i].deposit == null) {
        //   this.hideDeposit = true;
        // }
        // }
        this.calculationTotal();
      },
      err => {
        console.log(err);
      }
    );
  }
  showOneInvoice(course, invoice) {
    // for (var i in this.invoice) {
    this.invStatus = this.invoice.status;
    this.taxRate = this.invoice.tax.rate;
    this.updatedDate = this.dateFormat(invoice.updatedDate);
    this.dueDate = this.dateFormat(invoice.dueDate);
    // this.invoiceID = invoice._id;
    this.refInvID = invoice.refInvoiceId;
    this.invTaxName = invoice.tax.name;
    // this.invStatus = invoice[i].status;
    this.invCurrency = invoice.currency;
    this.invPayment = invoice.payments;
    var n = invoice.total;
    this.total = n.toFixed(2);
    this.invoice.subtotal = Number(Number(invoice.subtotal).toFixed(2));
    console.log('n and total', n, this.total);
    if (this.invoice.registrationFee.fee == null) {
      this.hideReg = true;
    }
    if (this.invoice.miscFee.fee == null) {
      this.hideMisc = true;
    }
    if (this.invoice.deposit == null) {
      this.hideDeposit = true;
    }

    this.invoiceCourse['fees'] = this.invoice.courseFee.fee;
    // if (invoice.courseId == course._id) {

    this.invoiceCourse['name'] = this.invoice.courseDetails.name;
    this.invoiceCourse['startDate'] = this.invoice.courseDetails.startDate;
    this.invoiceCourse['endDate'] = this.invoice.courseDetails.endDate;
    if (this.invoice.studentLessons != undefined) {
      this.invoiceCourse['lessonCount'] = this.invoice.studentLessons.length;
    }

    // }
    // }
  }

  getRegionInfo() {
    console.log('here me');

    this.token = localStorage.getItem('token');
    this.type = localStorage.getItem('tokenType');
    this._service
      .getRegionalAdministrator(this.regionId, this.token, this.type)
      .subscribe((res: any) => {
        console.log('regional info', res);
        // this.paymentProviders = res.invoiceSettings.paymentProviders;
        // console.log(this.paymentProviders);
        if (
          res.invoiceSettings == {} ||
          res.invoiceSettings == undefined ||
          res.paymentSettings == {} ||
          res.paymentSettings == undefined
        ) {
          console.log('no invoice setting');
          this.invoiceInfo = {
            address: '',
            city: '',
            companyName: '',
            email: '',
            prefix: '',
            registration: '',
            invoiceNote: ''
          };
          this.noSetting = true;
        } else {
          console.log(res);
          console.log('has invoice setting', res.invoiceSettings.invoiceNote);
          this.invoiceInfo = res.invoiceSettings;
          this.paymentSettings = res.paymentSettings;
          this.registration = res.invoiceSettings.registration;
          console.log(this.registration);

          this.noSetting = false;
        }
      });
  }
  dateFormat(dateStr) {
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];
    var d = new Date(dateStr);
    var month = monthNames[d.getUTCMonth()];
    var year = d.getUTCFullYear();
    var date = d.getUTCDate();
    console.log(date, month, year);
    var dFormat = date + ' ' + month + ' ' + year;
    console.log('DD MM YYYY', dFormat);
    return dFormat;
  }
  showPopup(type, value) {
    console.log('show popup');
    console.log(this.invStatus);
    if (this.invStatus == 'UNPAID') {
      this.isEditInv = true;
      if (type == 'courseFee') {
        this.feesBox = true;
        this.value.courseFee = value;
      }
    }
  }
  cancelPopup(type) {
    if (
      (this.hideReg == true &&
        this.hideDeposit == true &&
        this.hideMisc == true) ||
      this.hideReg == true ||
      this.hideDeposit == true ||
      this.hideMisc == true
    ) {
      this.isEditInv = true;
    } else {
      this.isEditInv = false;
    }
    console.log('hide popup');
    if (type == 'courseFee') {
      this.feesBox = false;
      this.value.courseFee = '';
    }
  }

  isDefaultUpdate: boolean = false;
  updateCfee(data) {
    console.log('updateCfee', data);
    console.log(this.invoice);
    this.isnewItemsValid = true;
    this.isDefaultUpdate = true;
    this.feesBox = false;
    if (this.invoice.courseFee.fee != data) {
      console.log('===not same');
      this.updateInvData = data;
      this.invoice.courseFee.fee = Number(data);
      console.log(this.invoice.courseFee.fee);
      console.log(this.invoice.courseFee.tax);

      // formula for calculating the Inclusive tax
      // Product price x RATE OF TAX/ (100+RATE OF TAX);
      if (this.invoice.courseFee.taxInclusive == true) {
        // var taxRate = this.invoice[i].tax.rate;
        // var taxAmount = (
        //   (this.invoice[i].courseFee.fee * taxRate) /
        //   100
        // ).toFixed(2);
        // this.invoice[i].courseFee.tax = Number(taxAmount);
        // console.log('inclusiveTax for CFee', this.invoice[i].courseFee.tax);
        // var cFee = (
        //   this.invoice[i].courseFee.fee - this.invoice[i].courseFee.tax
        // ).toFixed(2);

        // this.invoice[i].courseFee.amount = (
        //   this.invoice[i].courseFee.fee + this.invoice[i].courseFee.tax
        // ).toFixed(2);
        // this.invoice[i].courseFee.amount = this.invoice[
        //   i
        // ].courseFee.fee.toFixed(2);
        // this.invoice[i].tax.taxTotal = (
        //   this.invoice[i].courseFee.tax +
        //   this.invoice[i].registrationFee.tax +
        //   this.invoice[i].miscFee.tax
        // ).toFixed(2);
        var cFee = Number(
          this.invoice.courseFee.fee / (1 + this.invoice.tax.rate / 100)
        );
        console.log(cFee);
        this.invoice.courseFee.fee = cFee.toFixed(2);

        var tax = cFee * (this.invoice.tax.rate / 100);
        this.invoice.courseFee.tax = tax.toFixed(2);
        console.log(tax);

        this.invoice.courseFee.amount = cFee.toFixed(2);
        this.invoice.tax.taxTotal = tax.toFixed(2);
        this.defult_totalTax = tax.toFixed(2);
        this.default_subTotal = cFee.toFixed(2);
        this.default_total =
          Number(this.default_subTotal) + Number(this.defult_totalTax);
        console.log(this.invoice);
      } else if (this.invoice.courseFee.taxInclusive == false) {
        var taxRate = this.invoice.tax.rate;
        var taxAmount = ((this.invoice.courseFee.fee * taxRate) / 100).toFixed(
          2
        );
        this.invoice.courseFee.tax = Number(taxAmount);
        console.log('inclusiveTax for CFee', this.invoice.courseFee.tax);
        // this.invoice[i].courseFee.amount =
        //   this.invoice[i].courseFee.fee + this.invoice[i].courseFee.tax;
        this.invoice.courseFee.amount = this.invoice.courseFee.fee.toFixed(2);
        // this.invoice[i].tax.taxTotal = (
        //   this.invoice[i].courseFee.tax +
        //   this.invoice[i].registrationFee.tax +
        //   this.invoice[i].miscFee.tax
        // ).toFixed(2);
        this.invoice.tax.taxTotal = this.invoice.courseFee.tax.toFixed(2);
        // this.totalTax = this.invoice[i].courseFee.tax.toFixed(2);
        this.defult_totalTax = this.invoice.courseFee.tax.toFixed(2);
        this.default_subTotal = this.invoice.courseFee.fee.toFixed(2);
        this.default_total =
          Number(this.default_subTotal) + Number(this.defult_totalTax);
      }

      // this.calculateHideFees('cFees');
    } else {
      console.log('===same');
    }
    // }
    this.calculationTotal();
  }
  calculateHideFees(type) {
    console.log('calculateHideFees');
    for (var i in this.invoice) {
      var regFees: number;
      var regTax: number;
      var miscFees: number;
      var miscTax: number;
      var deposit: number;
      var totalTaxes: number;

      if (this.hideReg == true) {
        regFees = 0;
        regTax = 0;
      } else {
        regFees = this.invoice[i].registrationFee.fee;
        regTax = this.invoice[i].registrationFee.tax;
      }

      if (this.hideMisc == true) {
        miscFees = 0;
        miscTax = 0;
      } else {
        miscFees = this.invoice[i].miscFee.fee;
        miscTax = this.invoice[i].miscFee.tax;
      }

      if (this.hideDeposit == true) {
        deposit = 0;
      } else {
        deposit = this.invoice[i].deposit;
      }

      totalTaxes = regTax + miscTax + Number(this.invoice[i].courseFee.tax);
      console.log('Total taxes and deposit', totalTaxes, deposit);
      this.invoice[i].subtotal = (
        regFees +
        miscFees +
        deposit +
        this.invoice[i].courseFee.fee
      ).toFixed(2);
      this.total = Number(
        (Number(this.invoice[i].subtotal) + totalTaxes).toFixed(2)
      );
      this.invoice[i].tax.taxTotal = (
        this.invoice[i].courseFee.tax +
        regTax +
        miscTax
      ).toFixed(2);
      console.log('Subtotal', this.invoice[i].subtotal);
      console.log('Total', this.total);
    }
  }
  closeModal(type) {
    console.log(type);
    this.showInvoice = false;

    this.hideReg = false;
    this.hideDeposit = false;
    this.hideMisc = false;
    this.isEditInv = false;
    this.singleInv = [];
    this.updateInvData = {};
    this.invStatus = '';
    this.showPaidInvoice = false;
    this.invPayment = [];
    this.cancelInvoiceModal();
    this.closed.emit(true);
    console.log(this.closed.emit);
    // this.modalReference.close();
  }
  sendInvoice() {
    console.log('send Invoice', this.invoiceId);
    var mailArr = [];
    mailArr.push(this.custDetail.user.email);
    for (var i in this.custDetail.user.guardians) {
      mailArr.push(this.custDetail.user.guardians[i].email);
    }
    console.log('mailArr', mailArr);
    let body = {
      associatedMails: mailArr
    };
    console.log('body', body);
    this._service
      .invoiceOption(this.regionId, this.invoiceId, body, 'send')
      .subscribe(
        (res: any) => {
          console.log(res);
          this.toastr.success('Successfully sent the Invoice.');
          this.closeModal('closeInv');
        },
        err => {
          console.log(err);
          this.toastr.error('Fail to sent the Invoice.');
        }
      );
  }
  printInvoice() {
    window.print();
  }
  payNow(type) {
    this.showStudentOption = '';
    this.xxxhello = '';
    console.log('Pay Now', this.paymentItem, this.paymentId);
    let body = {
      regionId: this.regionId,
      refInvoiceId: this.refInvID,
      amount: this.paymentItem.amount.toString(),
      paymentMethod: this.paymentId.toString(),
      refNo: this.paymentItem.refNumber
    };
    // if (this.paymentItem.refNumber) {
    //   body['refNo'] = this.paymentItem.refNumber;
    // }
    // console.log("data",body);
    this._service.makePayment(this.regionId, body).subscribe(
      (res: any) => {
        console.log(res.message);
        // this.toastr.success(res.message);
        this.cancelInvoiceModal();
        this.closeModal('inv');
      },
      err => {
        console.log(err);
        if (err.message == 'Amount is overpaid.') {
          this.toastr.success('Amount is overpaid.');
        }
        this.toastr.error('Payment Fail');
      }
    );
  }
  showPayOption() {
    console.log('pay option', this.invoiceInfo);
    this.showPayment = true;
    this.showInvoice = false;
    if (this.invStatus == 'PAID[PARTIAL]') {
      var totalPaid = 0;
      for (var i in this.invPayment) {
        console.log('each payment', this.invPayment[i]);
        totalPaid = totalPaid + this.invPayment[i].amount;
      }
      console.log('total paid', totalPaid);
      this.paymentItem.amount = Number((this.total - totalPaid).toFixed(2));
      console.log('Total Amount for Pay', this.paymentItem.amount);
    } else {
      this.paymentItem.amount = this.total;
    }

    this._service.getPaymentMethod().subscribe((res: any) => {
      console.log(res);
      this.paymentProviders = res;
      this.selectedPayment = this.paymentProviders[0].name;
      this.paymentId = this.paymentProviders[0].id;
    });
  }
  cancelInvoiceModal() {
    this.showStudentOption = '';
    this.xxxhello = '';
    this.custDetail = {};
    this.showInvoice = false;
    this.showPayment = false;
    this.showPaidInvoice = false;
    this.paymentItem = {};
    this.hideReg = false;
    this.hideDeposit = false;
    this.hideMisc = false;
    this.isEditInv = false;
    this.singleInv = [];
    this.updateInvData = {};
    this.invPayment = [];
    console.log('hideMisc', this.hideMisc);

    // this.getCourseDetail(this.detailLists._id);
    // this.getUsersInCourse(this.detailLists._id);

    // this.courseList = [];
    // this.getCourseLists(20,0);
  }
  choosePayment(type) {
    console.log('choosePayment', type);
    this.selectedPayment = type.name;
    this.paymentId = type.id;
  }
  backToInvoice() {
    console.log('Back To Invoice', this.invoiceInfo);
    this.showPayment = false;
    this.showInvoice = true;
    this.paymentItem = {};
  }
  // autogrow() {
  //   setTimeout(() => {
  //     let textArea = document.getElementById('invNote');
  //     console.log(textArea);
  //     textArea.style.overflow = 'hidden';
  //     textArea.style.height = 'auto';
  //     textArea.style.height = textArea.scrollHeight + 'px';
  //     console.log('textArea', textArea.style.height);
  //   }, 1000);
  // }

  newItemArr: any = [];

  isShowDown: boolean = false;
  activeId: any;
  showDropdown(i) {
    this.activeId = i;
    if (this.isShowDown) {
      this.isShowDown = false;
    } else {
      this.isShowDown = true;
    }
  }

  chooseTax: any = 'Inclusive';
  chooseTaxOption(type, i) {
    this.isEditInv = true;
    this.newItemArr[i].taxtype = type;
    this.newItemArr[i].discount.type = type;
    this.chooseTax = type;
    this.isShowDown = false;
    this.addCurseFee(i);
  }

  addnewItem() {
    console.log(this.newItemArr);

    let newItemObj = {
      name: '',
      fee: 0.0,
      dfee: 0.0,
      taxtype: 'Exclusive',
      tax: this.invoice.tax.rate,
      taxRes: 0.0,
      amount: 0.0,
      isDefault: false,
      isDiscount: false,
      discount: {
        value: 0,
        tax: this.invoice.tax.rate,
        taxRes: 0,
        type: 'Exclusive',
        dValue: 0.0,
        amount: 0.0
      }
    };

    this.newItemArr.push(newItemObj);

    this.isEditInv = true;
  }

  //this function is work for to change and calcution api response value in show ui

  changeTempObj(obj) {
    console.log(obj);

    this.newItemArr = [];
    let tempArr: any = [];
    for (let i = 0; i < obj.length; i++) {
      console.log(obj[i]);
      let tempObj: any = {
        name: '',
        fee: 0.0,
        dfee: 0.0,
        taxtype: 'Exclusive',
        tax: this.invoice.tax.rate,
        taxRes: 0.0,
        amount: 0.0,
        isDefault: false,
        isDiscount: false,
        discount: {
          value: 0,
          tax: this.invoice.tax.rate,
          taxRes: 0,
          type: 'Exclusive',
          dValue: 0.0,
          amount: 0.0
        }
      };

      tempObj.name = obj[i].name;
      tempObj.fee = obj[i].fee;
      tempObj.tax = this.invoice.tax.rate;
      console.log(obj[i].discount.amount);

      let taxAmount = (obj[i].fee * this.invoice.tax.rate) / 100;

      if (obj[i].taxInclusive == true && obj[i].noTax == false) {
        tempObj.taxtype = 'Inclusive';
        tempObj.dfee = Number(obj[i].fee) + Number(obj[i].tax);
        tempObj.taxRes = obj[i].tax;
        tempObj.discount.type = 'Inclusive';
      } else if (obj[i].taxInclusive == false && obj[i].noTax == false) {
        tempObj.taxtype = 'Exclusive';
        tempObj.dfee = Number(obj[i].fee);
        tempObj.taxRes = obj[i].tax;
        tempObj.taxRes = taxAmount;
        tempObj.discount.type = 'Exclusive';
      } else {
        tempObj.taxtype = 'No Tax';
        tempObj.dfee = Number(obj[i].fee);
        tempObj.taxRes = 0;
        tempObj.discount.type = 'No Tax';
      }

      tempObj.isDefault = true;
      tempObj.amount = obj[i].amount;
      tempObj.discount.amount = obj[i].discount.amount;
      console.log(obj[i].discount);

      //for discount
      if (obj[i].discount.amount != 0) {
        tempObj.isDiscount = true;
        tempObj.discount.tax = this.invoice.tax.rate;
        tempObj.discount.taxRes = obj[i].discount.tax;
        tempObj.discount.value = obj[i].discount.amount;
        if (obj[i].taxInclusive == true && obj[i].noTax == false) {
          tempObj.discount.dValue =
            obj[i].discount.amount + obj[i].discount.tax;
        } else if (obj[i].taxInclusive == false && obj[i].noTax == false) {
          tempObj.discount.dValue = obj[i].discount.amount;
        } else {
          tempObj.discount.dValue = obj[i].discount.amount;
        }

        // let resTemp= this.calculationDiscount(tempObj.discount);

        // tempObj.discount.value=resTemp.value;
        // tempObj.discount.taxRes=resTemp.taxRes;
        // tempObj.discount.amount=resTemp.amount;
      }
      tempArr.push(tempObj);
    }

    this.newItemArr = tempArr;

    console.log('new item arr', this.newItemArr);
  }
  isnewItemsValid: boolean = false;
  validateForm() {
    // console.log('exit', this.newItemArr);

    if (this.newItemArr.length != 0) {
      for (let i = 0; i < this.newItemArr.length; i++) {
        if (
          this.newItemArr[i].name != '' &&
          this.newItemArr[i].fee != '' &&
          this.newItemArr[i].fee != 0 &&
          this.newItemArr[i].dfee != '' &&
          this.newItemArr[i].dfee != 0
        ) {
          this.isnewItemsValid = true;
        } else {
          this.isnewItemsValid = false;
        }
      }
    } else {
      // console.log('here me', this.isDefaultUpdate);
      this.isnewItemsValid = true;
      // if (this.isDefaultUpdate) {
      //   this.isnewItemsValid = true;
      // } else {
      //   // this.isnewItemsValid = false;
      //   // this.isEditInv = false;
      // }
    }
  }
  inputUnitPrice(value, id) {
    this.newItemArr[id].dfee = value;
  }

  inputDiscount(value, id) {
    this.newItemArr[id].discount.dValue = value;
  }
  addCurseFee(id) {
    console.log('cDiscount', this.cDiscount);

    console.log(this.newItemArr);
    this.feesBox1 = false;
    let taxRate = this.newItemArr[id].tax;
    // let taxRate = this.newItemArr[id].taxtype == 'No Tax' ? this.newItemArr[id].tax = 0 : this.newItemArr[id].tax
    this.newItemArr[id].fee = this.newItemArr[id].dfee;
    let taxAmount = (this.newItemArr[id].fee * taxRate) / 100;

    console.log('taxAmount', taxAmount);
    if (this.newItemArr[id].taxtype == 'Inclusive') {
      this.newItemArr[id].taxRes = Number(taxAmount);
      var cFee = this.newItemArr[id].dfee / (1 + this.newItemArr[id].tax / 100);
      console.log(cFee);
      this.newItemArr[id].fee = cFee.toFixed(2);

      var tax = cFee * (this.newItemArr[id].tax / 100);
      this.newItemArr[id].taxRes = tax.toFixed(2);
      console.log(tax);

      this.newItemArr[id].amount = cFee.toFixed(2);
    } else if (this.newItemArr[id].taxtype == 'Exclusive') {
      console.log('ex', this.newItemArr[id].dfee);
      this.newItemArr[id].taxRes = Number(taxAmount);
      this.newItemArr[id].fee = this.newItemArr[id].dfee;
      // this.newItemArr[id].amount = (
      //   Number(this.newItemArr[id].dfee) + Number(this.newItemArr[id].taxRes)
      // ).toFixed(2);
      this.newItemArr[id].amount = Number(this.newItemArr[id].dfee).toFixed(2);
    } else {
      this.newItemArr[id].taxRes = 0;
      this.newItemArr[id].fee = this.newItemArr[id].dfee;
      this.newItemArr[id].amount = Number(this.newItemArr[id].dfee).toFixed(2);
      console.log('exit no tax');
    }
    console.log(this.newItemArr[id].isDiscount);
    if (this.newItemArr[id].isDiscount) {
      this.addnewDiscount('newitem-dis', id);
    } else {
      this.calculationTotal();
    }
  }

  calculationTotal() {
    console.log(this.totalTax);
    console.log(this.subTotal);
    console.log(this.newItemArr);
    this.totalTax = 0;
    this.subTotal = 0;
    this.total = 0;
    this.totalDiscount = 0;
    this.totalDiscounTax = 0;

    console.log('dis total', this.default_disTotal);
    console.log('dis total tax', this.defult_disTotalTax);

    this.totalTax = this.defult_totalTax;
    this.subTotal = this.default_subTotal;
    this.totalDiscount = this.default_disTotal;
    this.totalDiscounTax = Number(this.defult_disTotalTax).toFixed(2);

    for (let i = 0; i < this.newItemArr.length; i++) {
      this.subTotal = (
        Number(this.subTotal) + Number(this.newItemArr[i].fee)
      ).toFixed(2);
      this.totalTax = (
        Number(this.totalTax) + Number(this.newItemArr[i].taxRes)
      ).toFixed(2);
      console.log('res', this.newItemArr[i].taxRes);
      this.totalDiscount = (
        Number(this.totalDiscount) + Number(this.newItemArr[i].discount.value)
      ).toFixed(2);
      this.totalDiscounTax = (
        Number(this.totalDiscounTax) +
        Number(this.newItemArr[i].discount.taxRes)
      ).toFixed(2);
    }

    // console.log(this.totalTax);
    // console.log(this.subTotal);
    let tempTotal = (Number(this.totalTax) + Number(this.subTotal)).toFixed(2);
    let tempDistotal = (
      Number(this.totalDiscount) + Number(this.totalDiscounTax)
    ).toFixed(2);
    console.log(tempTotal);
    console.log(tempDistotal);

    this.total = (Number(tempTotal) - Number(tempDistotal)).toFixed(2);

    console.log(this.total);
    console.log(this.subTotal);
    console.log(this.totalTax);
  }
  showPopup1(id) {
    if (this.invStatus == 'UNPAID') {
      this.feesBox1 = true;
      this.activeFeeBoxId = id;
      console.log('exit');
    }
  }
  cancelPopup2(id) {
    this.feesBox1 = false;
  }
  cancelPopup3() {
    this.feesBox2 = false;
  }

  cancelPopup4() {
    this.feesBox3 = false;
  }
  addnewDiscount(type, id) {
    if (type == 'courseFee-dis') {
      this.feesBox2 = false;
      this.cDiscount.tax = this.invoice.tax.rate;
      if (this.invoice.courseFee.taxInclusive == true) {
        this.cDiscount.type = 'Inclusive';
      } else {
        this.cDiscount.type = 'Exclusive';
      }
      let resTemp = this.calculationDiscount(this.cDiscount);
      this.iscDiscount = true;
      this.cDiscount.value = resTemp.value;
      this.cDiscount.taxRes = resTemp.taxRes;
      this.cDiscount.amount = resTemp.amount;
      this.default_disTotal = Number(resTemp.value);
      this.defult_disTotalTax = Number(resTemp.taxRes);
      console.log(this.cDiscount);
      console.log(resTemp);
    } else {
      this.feesBox3 = false;
      this.isNewItemDiscount = true;
      console.log('exit');
      this.newItemArr[id].isDiscount = true;

      let resTemp = this.calculationDiscount(this.newItemArr[id].discount);
      this.newItemArr[id].discount.value = resTemp.value;
      this.newItemArr[id].discount.taxRes = resTemp.taxRes;
      this.newItemArr[id].discount.amount = resTemp.amount;
      console.log(id);
      console.log(resTemp);

      console.log(this.newItemArr);
    }
    this.calculationTotal();
  }

  //this calculation discount fee
  calculationDiscount(obj) {
    this.isEditInv = true;
    this.isnewItemsValid = true;
    console.log(obj);
    let tempObj = {
      value: 0,
      taxRes: 0,
      amount: 0
    };
    let taxRate = obj.tax;
    let taxAmount = (obj.dValue * taxRate) / 100;
    console.log(taxAmount);

    if (obj.type == 'Inclusive') {
      var cDis = Number(obj.dValue / (1 + obj.tax / 100));
      console.log(cDis);
      tempObj.value = Number(cDis.toFixed(2));

      var tax = Number(cDis) * (obj.tax / 100);
      tempObj.taxRes = Number(tax.toFixed(2));

      tempObj.amount = Number(cDis.toFixed(2));
    } else if (obj.type == 'Exclusive') {
      tempObj.taxRes = Number(taxAmount);
      tempObj.value = obj.dValue;
      console.log(obj.dValue);
      tempObj.amount = obj.dValue;
    } else {
      tempObj.value = obj.dValue;
      tempObj.taxRes = 0;
      tempObj.amount = obj.dValue;
    }
    console.log(tempObj);
    return tempObj;
  }
  showDiscountPopup(type, id) {
    console.log(type);
    if (type == 'courseFee-dis') {
      this.feesBox2 = true;
    } else {
      this.feesBox3 = true;
      this.activeFeeBoxId = id;
    }
  }

  removeDiscount(type, obj, id) {
    console.log('type', type, this.cDiscount.isDefault);
    this.isEditInv = true;
    if (type == 'courseFee') {
      this.iscDiscount = false;
      // if (this.cDiscount.isDefault) {
      this.cDiscount = {
        value: 0,
        tax: 0,
        taxRes: 0,
        type: '',
        dValue: 0.0,
        amount: 0.0,
        isDefault: this.cDiscount.isDefault
      };

      // }

      this.default_disTotal = 0;
      this.defult_disTotalTax = 0;
    } else {
      this.newItemArr[id].discount = {
        value: 0,
        tax: this.invoice.tax.rate,
        taxRes: 0,
        type: 'Exclusive',
        dValue: 0.0,
        amount: 0.0
      };
      this.newItemArr[id].isDiscount = false;

      console.log(this.newItemArr);
    }
    this.validateForm();
    this.calculationTotal();
  }

  keyPress(event: any) {
    //  /[0-9\+\-\ ]/;
    // /[0-9]{1,4}(\.[0-9][0-9])/
    const pattern = /[0-9\.\ ]/;
    const pp = /^[.\d]+$/;
    let inputChar = String.fromCharCode(event.charCode);
    let inputChar2 = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar) && event.charCode != '0') {
      event.preventDefault();
    }
  }

  isDecimalValue(event) {
    const charCode = event.which ? event.which : event.keyCode;
    const dot1 = event.target.value.indexOf('.');
    const dot2 = event.target.value.lastIndexOf('.');
    console.log('charCode', charCode, 'dot1', dot1, 'dot2', dot2);
    console.log(event.key.indexOf('.'));
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
      console.log('~~~~~~~');
      return false;
    } else if (charCode == 46 && dot1 == dot2 && dot1 != -1 && dot2 != -1) {
      console.log('########');
      return false;
    }
    console.log(event.target.value.search(/^0/));
    if (event.target.value.search(/^0/) != -1) {
      event.target.value = '';
    }

    return true;
  }
}
