import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {
  constructor(private modalService: NgbModal) {}

  ngOnInit() {}

  public showPopUp = false;
  public modalReference: any;

  showPopUpFunc(modal) {
    this.showPopUp = true;
    this.modalReference = this.modalService.open(modal, {
      backdrop: 'static',
      windowClass:
        'modal-xl modal-inv d-flex justify-content-center align-items-center my-radius'
    });
  }

  clickOverlay() {
    this.showPopUp = false;
  }

  cancelModal() {
    console.log('....');
    this.modalReference.close();
    this.showPopUp = false;
  }
}
