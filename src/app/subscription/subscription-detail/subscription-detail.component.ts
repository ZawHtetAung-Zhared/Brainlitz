import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  NgbModal,
  ModalDismissReasons,
  NgbDateAdapter,
  NgbDatepickerConfig,
  NgbCalendar,
  NgbDateStruct
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-subscription-detail',
  templateUrl: './subscription-detail.component.html',
  styleUrls: ['./subscription-detail.component.css']
})
export class SubscriptionDetailComponent implements OnInit {
  @Output() flag = new EventEmitter<any>();

  public modalReference: any;

  constructor(private modalService: NgbModal) {}

  ngOnInit() {}

  backClicked() {
    this.flag.emit();
  }

  enrollLesson(modal) {
    this.modalReference = this.modalService.open(modal, {
      backdrop: 'static',
      windowClass:
        'modal-xl modal-inv d-flex justify-content-center align-items-center'
    });
  }
}
