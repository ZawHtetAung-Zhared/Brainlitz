import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  Renderer2,
  HostListener
} from '@angular/core';
import { NgModel } from '@angular/forms';
import {
  NgbModal,
  NgbDatepickerConfig,
  NgbCalendar,
  NgbDateAdapter,
  NgbDateParserFormatter,
  NgbInputDatepicker,
  NgbDateStruct
} from '@ng-bootstrap/ng-bootstrap';
import { appService } from '../../../service/app.service';

const now = new Date();
const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
  one &&
  two &&
  two.year === one.year &&
  two.month === one.month &&
  two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two
    ? false
    : one.year === two.year
    ? one.month === two.month
      ? one.day === two.day
        ? false
        : one.day < two.day
      : one.month < two.month
    : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two
    ? false
    : one.year === two.year
    ? one.month === two.month
      ? one.day === two.day
        ? false
        : one.day > two.day
      : one.month > two.month
    : one.year > two.year;

@Component({
  selector: 'app-create-term',
  templateUrl: './create-term.component.html',
  styleUrls: ['./create-term.component.css']
})
export class CreateTermComponent implements OnInit {
  @Input() courseId: String;
  @Output() closeModal = new EventEmitter<any>();

  public modalReference: any;
  public startDate: NgbDateStruct;
  public maxDate: NgbDateStruct;
  public minDate: NgbDateStruct;
  public hoveredDate: NgbDateStruct;
  public fromDate: any;
  public toDate: any;
  public dateFormat: any = {
    fromDate: null,
    toDate: null
  };
  public termLabel: any = '';
  public colorPaletteArr: Array<any> = [
    {
      background: '#FFF4BF',
      text: '#594A00'
    },
    {
      background: '#CCE5FF',
      text: '#004080'
    },
    {
      background: '#F2E6FF',
      text: '#6600CC'
    },
    {
      background: '#FFE9D9',
      text: '#803500'
    },
    {
      background: '#CCFFEA',
      text: '#005934'
    },
    {
      background: '#FFE6F7',
      text: '#990066'
    }
  ];
  public selectedColor: any = null;
  public listDate: Array<any> = [];

  @ViewChild('d') input: NgbInputDatepicker;
  @ViewChild(NgModel) datePick: NgModel;
  @ViewChild('myRangeInput') myRangeInput: ElementRef;

  isHovered = date =>
    this.fromDate &&
    !this.toDate &&
    this.hoveredDate &&
    after(date, this.fromDate) &&
    before(date, this.hoveredDate);
  isInside = date => after(date, this.fromDate) && before(date, this.toDate);
  isFrom = date => equals(date, this.fromDate);
  isTo = date => equals(date, this.toDate);

  constructor(
    private _service: appService,
    private renderer: Renderer2,
    private _parserFormatter: NgbDateParserFormatter
  ) {}

  ngOnInit() {
    this.startDate = {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate()
    };
    this.maxDate = {
      year: now.getFullYear() + 1,
      month: now.getMonth() + 1,
      day: now.getDate()
    };
    this.minDate = {
      year: now.getFullYear() - 1,
      month: now.getMonth() + 1,
      day: now.getDate()
    };
  }

  onClickCancel() {
    console.log('onClickCancel');
    this.closeModal.emit();
  }

  onDateSelection(date: NgbDateStruct) {
    console.log('date', date);
    let parsed = '';
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && after(date, this.fromDate)) {
      this.toDate = date;
      this.input.close();
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    if (this.fromDate) {
      this.dateFormat.fromDate = this.formatDate(this.fromDate);
      parsed += this._parserFormatter.format(this.fromDate);
    }
    if (this.toDate) {
      this.dateFormat.toDate = this.formatDate(this.toDate);
      parsed += ' - ' + this._parserFormatter.format(this.toDate);
    }

    if (this.formatDate && this.toDate) {
      this.createDateArray();
    }

    this.renderer.setProperty(this.myRangeInput.nativeElement, 'value', parsed);
  }

  formatDate(dateObj) {
    let date =
      dateObj.day + '' + this.getMonthName(dateObj.month) + '' + dateObj.year;
    return date;
  }

  getMonthName(monthIdx) {
    const month = [
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
    let name = month[monthIdx - 1];
    return name;
  }

  closeDatepicker(datePicker, event) {
    if (event.target.offsetParent == null) datePicker.close();
    else if (event.target.offsetParent.nodeName != 'NGB-DATEPICKER')
      datePicker.close();
  }

  createDateArray() {
    this.listDate = [];
    var startDate = this.formatDateString(this.fromDate).slice(0, 10);
    var endDate = this.formatDateString(this.toDate).slice(0, 10);
    var dateMove = new Date(startDate);
    var strDate = startDate;
    console.log('startDate & endDate', startDate, endDate);

    while (strDate < endDate) {
      console.log('strDate~~~', strDate, 'endDate~~~', endDate);
      var strDate = dateMove.toISOString().slice(0, 10);
      this.listDate.push(strDate);
      dateMove.setDate(dateMove.getDate() + 1);
    }
    console.log('date array', this.listDate);
  }

  formatYearMonthDay(dateObj) {
    const d = dateObj.day < 10 ? '0' + dateObj.day : dateObj.day;
    const m = dateObj.month < 10 ? '0' + dateObj.month : dateObj.month;
    let date = dateObj.year + '/' + m + '/' + d;
    return date;
  }

  formatDateString(dateObj) {
    let sdate = dateObj.year + '-' + dateObj.month + '-' + dateObj.day;
    console.log(sdate);
    let dateParts = sdate.split('-');
    console.log('dateParts', dateParts);
    if (dateParts[1]) {
      console.log(Number(dateParts[1]) - 1);
      let newParts = Number(dateParts[1]) - 1;
      dateParts[1] = newParts.toString();
    }
    if (dateParts) {
      // let testDate = new Date(Date.UTC.apply(undefined,dateParts.concat(timeParts)));
      // console.log("UTC",testDate)
      let fullDate = new Date(
        Date.UTC.apply(undefined, dateParts.concat())
      ).toISOString();
      console.log('ISO', fullDate);
      return fullDate;
    }
  }

  createTerm() {
    let term = {
      name: this.termLabel,
      termStartDate: this.fromDate,
      termEndDate: this.toDate,
      color: this.selectedColor
    };
    console.log('createTerm', term);
    this._service.createTerm(term, this.courseId).subscribe(res => {
      console.log('res', res);
    });
  }
}
