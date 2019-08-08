import { BlockUI, NgBlockUI } from 'ng-block-ui';
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
  public invoiceID: any;
  public invTaxName: any;
  public invCurrency: any;
  public invPayment: any;
  public total: any;
  public subTotal: any;
  public totalTax: any;
  public hideMenu: boolean = false;
  public showStudentOption: any = '';
  public xxxhello: any = '';
  public showPayment: boolean = false;
  public paymentItem: any = {};
  public paymentId: any;
  public paymentProviders: any;
  public selectedPayment: any;
  public unitPrice: any = 0;
  public hideReg: boolean = false;
  public hideMisc: boolean = false;
  public hideDeposit: boolean = false;
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
  @Output() closed = new EventEmitter<boolean>();
  public default_total: any;
  public default_subTotal: any;
  public defult_totalTax: any;

  ngOnInit() {
    console.log(this.custDetail);
    console.log(this.course.invoice.status);

    // this.taxRate = this.course.invoice.tax.rate;
    this.singleInv = [];

    if (Array.isArray(this.course.invoice)) {
      if (this.course.invoice[0].status == 'PAID') {
        this.showPaidInvoice = true;
      } else if (
        this.course.invoice[0].status == 'UNPAID' ||
        this.course.invoice[0].status == 'PAID[PARTIAL]'
      ) {
        this.showInvoice = true;
      }
    } else {
      if (this.course.invoice.status == 'PAID') {
        this.showPaidInvoice = true;
      } else if (
        this.course.invoice.status == 'UNPAID' ||
        this.course.invoice.status == 'PAID[PARTIAL]'
      ) {
        this.showInvoice = true;
      }
    }

    this.getRegionInfo();

    if (this.course.invoice != null) {
      console.log();
      if (Array.isArray(this.course.invoice))
        var invoiceId = this.course.invoice[0]._id;
      else var invoiceId = this.course.invoice._id;
      console.log('has invoice ID', invoiceId);
    } else {
      console.log('no invoice id');
    }
    console.log(this.invoiceInfo);
    this._service.getSingleInvoice(invoiceId).subscribe(
      (res: any) => {
        this.singleInv.push(res);
        this.invoice = this.singleInv;
        this.showOneInvoice(this.course, this.invoice);
        // this.feesBox = true

        this.default_subTotal = Number(this.invoice[0].courseFee.fee).toFixed(
          2
        );
        this.defult_totalTax = Number(this.invoice[0].courseFee.tax).toFixed(2);
        // this.defa = Number(this.default_subTotal) + Number(this.defult_totalTax);
        // if(this.invoice[0].additionalFees.length >0){
        // }
        if (res.additionalFees != undefined || res.additionalFees != null) {
          this.changeTempObj(res.additionalFees);
        }

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
    console.error(this.isEditInv);
  }
  updateInvoice() {
    console.log('Inv Update Data', this.updateInvData);
    console.log(this.newItemArr);
    let arr = [];
    for (let i = 0; i < this.newItemArr.length; i++) {
      let type: boolean;
      if (this.newItemArr[i].taxtype == 'inclusive') {
        type = true;
      } else {
        type = false;
      }
      let obj = {
        name: this.newItemArr[i].name,
        fee: this.newItemArr[i].dfee,
        taxInclusive: type,
        noTax: false,
        discount: {
          amount: 0
        }
      };

      arr.push(obj);
    }
    let finalObj = {
      courseFee: this.updateInvData,
      additionalFees: arr
    };
    console.log('f obj', finalObj);

    this._service.updateInvoiceInfo(this.invoiceID, finalObj).subscribe(
      (res: any) => {
        console.log(res);
        this.isEditInv = false;
        //for updating invoice ui
        this.singleInv = [];
        this.singleInv.push(res);
        this.invoice = this.singleInv;
        this.changeTempObj(res.additionalFees);

        console.log('invoice', this.invoice);
        for (var i in this.invoice) {
          var n = this.invoice[i].total;
          // this.def = n.toFixed(2);
          this.default_subTotal = Number(this.invoice[i].courseFee.fee).toFixed(
            2
          );
          this.defult_totalTax = Number(this.invoice[i].courseFee.tax).toFixed(
            2
          );
          // if (this.invoice[i].registrationFee.fee == null) {
          //   this.hideReg = true;
          // }

          // if (this.invoice[i].miscFee.fee == null) {
          //   this.hideMisc = true;
          // }

          // if (this.invoice[i].deposit == null) {
          //   this.hideDeposit = true;
          // }
        }
        this.calculationTotal();
      },
      err => {
        console.log(err);
      }
    );
  }
  showOneInvoice(course, invoice) {
    console.log('showOneInvoice', course);
    for (var i in this.invoice) {
      this.invStatus = this.invoice[i].status;
      this.taxRate = this.invoice[i].tax.rate;
      this.updatedDate = this.dateFormat(invoice[i].updatedDate);
      this.dueDate = this.dateFormat(invoice[i].dueDate);
      this.invoiceID = invoice[i]._id;
      this.refInvID = invoice[i].refInvoiceId;
      this.invTaxName = invoice[i].tax.name;
      // this.invStatus = invoice[i].status;
      this.invCurrency = invoice[i].currency;
      this.invPayment = invoice[i].payments;
      var n = invoice[i].total;
      this.total = n.toFixed(2);
      this.invoice[i].subtotal = Number(Number(invoice[i].subtotal).toFixed(2));
      console.log('n and total', n, this.total);
      if (this.invoice[i].registrationFee.fee == null) {
        this.hideReg = true;
      }
      if (this.invoice[i].miscFee.fee == null) {
        this.hideMisc = true;
      }
      if (this.invoice[i].deposit == null) {
        this.hideDeposit = true;
      }

      this.invoiceCourse['fees'] = this.invoice[i].courseFee.fee;
      if (invoice[i].courseId == course._id) {
        this.invoiceCourse['name'] = course.name;
        this.invoiceCourse['startDate'] = course.startDate;
        this.invoiceCourse['endDate'] = course.endDate;
        this.invoiceCourse['lessonCount'] = course.lessonCount;
      }
    }
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
    for (var i in this.invoice) {
      if (this.invoice[i].courseFee.fee != data) {
        console.log('===not same');
        this.updateInvData = data;
        this.invoice[i].courseFee.fee = Number(data);
        console.log(this.invoice[i].courseFee.fee);
        console.log(this.invoice[i].courseFee.tax);

        // formula for calculating the inclusive tax
        // Product price x RATE OF TAX/ (100+RATE OF TAX);
        if (this.invoice[i].courseFee.taxInclusive == true) {
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
          var cFee =
            this.invoice[i].courseFee.fee /
            (1 + this.invoice[i].tax.rate / 100);
          console.log(cFee);
          this.invoice[i].courseFee.fee = cFee.toFixed(2);

          var tax = cFee * (this.invoice[i].tax.rate / 100);
          this.invoice[i].courseFee.tax = tax.toFixed(2);
          console.log(tax);

          this.invoice[i].courseFee.amount = cFee.toFixed(2);
          this.invoice[i].tax.taxTotal = tax.toFixed(2);
          this.defult_totalTax = tax.toFixed(2);
          this.default_subTotal = cFee.toFixed(2);
          this.default_total =
            Number(this.default_subTotal) + Number(this.defult_totalTax);
          console.log(this.invoice);
        } else if (this.invoice[i].courseFee.taxInclusive == false) {
          var taxRate = this.invoice[i].tax.rate;
          var taxAmount = (
            (this.invoice[i].courseFee.fee * taxRate) /
            100
          ).toFixed(2);
          this.invoice[i].courseFee.tax = Number(taxAmount);
          console.log('inclusiveTax for CFee', this.invoice[i].courseFee.tax);
          // this.invoice[i].courseFee.amount =
          //   this.invoice[i].courseFee.fee + this.invoice[i].courseFee.tax;
          this.invoice[i].courseFee.amount = this.invoice[
            i
          ].courseFee.fee.toFixed(2);
          // this.invoice[i].tax.taxTotal = (
          //   this.invoice[i].courseFee.tax +
          //   this.invoice[i].registrationFee.tax +
          //   this.invoice[i].miscFee.tax
          // ).toFixed(2);
          this.invoice[i].tax.taxTotal = this.invoice[i].courseFee.tax.toFixed(
            2
          );
          // this.totalTax = this.invoice[i].courseFee.tax.toFixed(2);
          this.defult_totalTax = this.invoice[i].courseFee.tax.toFixed(2);
          this.default_subTotal = this.invoice[i].courseFee.fee.toFixed(2);
          this.default_total =
            Number(this.default_subTotal) + Number(this.defult_totalTax);
        }

        // this.calculateHideFees('cFees');
      } else {
        console.log('===same');
      }
    }
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
    console.log('send Invoice', this.invoiceID);
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
      .invoiceOption(this.regionId, this.invoiceID, body, 'send')
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

  chooseTax: any = 'inclusive';
  chooseTaxOption(type, i) {
    this.isEditInv = true;
    this.newItemArr[i].taxtype = type;
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
      taxtype: 'exclusive',
      tax: this.invoice[0].tax.rate,
      taxRes: 0.0,
      amount: 0.0,
      isDefault: false
    };

    this.newItemArr.push(newItemObj);
    this.isEditInv = true;
  }

  changeTempObj(obj) {
    this.newItemArr = [];
    let tempArr: any = [];
    for (let i = 0; i < obj.length; i++) {
      console.log(obj[i]);
      let tempObj: any = {};

      tempObj.name = obj[i].name;
      tempObj.fee = obj[i].fee;

      if (obj[i].taxInclusive == true) {
        tempObj.taxtype = 'inclusive';
        tempObj.dfee = Number(obj[i].fee) + Number(obj[i].tax);
      } else {
        tempObj.taxtype = 'exclusive';
        tempObj.dfee = Number(obj[i].fee);
      }
      tempObj.tax = this.invoice[0].tax.rate;
      let taxAmount = (obj[i].fee * this.invoice[0].tax.rate) / 100;
      tempObj.taxRes = taxAmount;
      tempObj.isDefault = true;
      tempObj.amount = obj[i].amount;
      tempArr.push(tempObj);
    }
    this.newItemArr = tempArr;
    console.log(this.newItemArr);
  }
  isnewItemsValid: boolean = false;
  validateForm() {
    console.log('exit', this.newItemArr);

    if (this.newItemArr.length != 0) {
      for (let i = 0; i < this.newItemArr.length; i++) {
        if (
          this.newItemArr[i].name != '' &&
          this.newItemArr[i].amount != '' &&
          this.newItemArr[i].quantity != '' &&
          this.newItemArr[i].price != ''
        ) {
          this.isnewItemsValid = true;
        } else {
          this.isnewItemsValid = false;
        }
      }
    } else {
      console.error('here me', this.isDefaultUpdate);
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

  addCurseFee(id) {
    console.log(this.newItemArr);

    let taxRate = this.newItemArr[id].tax;
    this.newItemArr[id].fee = this.newItemArr[id].dfee;
    let taxAmount = (this.newItemArr[id].fee * taxRate) / 100;
    this.newItemArr[id].taxRes = Number(taxAmount);
    console.log('taxAmount', taxAmount);

    if (this.newItemArr[id].taxtype == 'inclusive') {
      var cFee = this.newItemArr[id].dfee / (1 + this.newItemArr[id].tax / 100);
      console.log(cFee);
      this.newItemArr[id].fee = cFee.toFixed(2);

      var tax = cFee * (this.newItemArr[id].tax / 100);
      this.newItemArr[id].taxRes = tax.toFixed(2);
      console.log(tax);

      this.newItemArr[id].amount = cFee.toFixed(2);
    } else if (this.newItemArr[id].taxtype == 'exclusive') {
      console.log('ex', this.newItemArr[id].dfee);

      this.newItemArr[id].taxRes = Number(taxAmount);
      this.newItemArr[id].fee = this.newItemArr[id].dfee;
      // this.newItemArr[id].amount = (
      //   Number(this.newItemArr[id].dfee) + Number(this.newItemArr[id].taxRes)
      // ).toFixed(2);
      this.newItemArr[id].amount = Number(this.newItemArr[id].dfee).toFixed(2);
    }
    this.calculationTotal();
  }

  calculationTotal() {
    console.log(this.totalTax);
    console.log(this.subTotal);
    console.log(this.newItemArr);
    this.totalTax = 0;
    this.subTotal = 0;
    this.total = 0;

    this.totalTax = this.defult_totalTax;
    this.subTotal = this.default_subTotal;

    for (let i = 0; i < this.newItemArr.length; i++) {
      this.subTotal = (
        Number(this.subTotal) + Number(this.newItemArr[i].fee)
      ).toFixed(2);
      this.totalTax = (
        Number(this.totalTax) + Number(this.newItemArr[i].taxRes)
      ).toFixed(2);
      console.log('res', this.newItemArr[i].taxRes);
    }

    console.error(this.totalTax);
    console.error(this.subTotal);

    this.total = (Number(this.totalTax) + Number(this.subTotal)).toFixed(2);
    console.log(this.total);
    console.log(this.subTotal);
    console.log(this.totalTax);

    this.feesBox1 = false;
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
}
