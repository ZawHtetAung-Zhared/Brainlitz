import {
  Component,
  OnInit,
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
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';
import { Subscription } from 'rxjs';

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
      color: '#FFEC8D'
    },
    {
      color: '#CCE5FF'
    },
    {
      color: '#F2E5FF'
    },
    {
      color: '#FFE9D9'
    },
    {
      color: '#CCFFEA'
    },
    {
      color: '#FFE5F6'
    }
  ];
  public selectedColor: String = '';
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
    private modalService: NgbModal,
    private element: ElementRef,
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

  createTerm() {
    let term = {
      startDate: this.fromDate,
      endDate: this.toDate,
      name: this.termLabel,
      color: this.selectedColor
    };
    console.log('createTerm', term);
  }
}
