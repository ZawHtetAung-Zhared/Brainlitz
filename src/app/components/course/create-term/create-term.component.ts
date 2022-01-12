import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  NgbModal,
  NgbDatepickerConfig,
  NgbCalendar
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-term',
  templateUrl: './create-term.component.html',
  styleUrls: ['./create-term.component.css']
})
export class CreateTermComponent implements OnInit {
  @Output() closeModal = new EventEmitter<any>();
  public modalReference: any;

  constructor(private modalService: NgbModal) {}

  ngOnInit() {}

  onClickCancel() {
    console.log('onClickCancel');
    this.closeModal.emit();
  }
}
