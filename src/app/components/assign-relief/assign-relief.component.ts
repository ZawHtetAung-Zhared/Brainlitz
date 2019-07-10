import {
  Component,
  OnInit,
  ViewContainerRef,
  HostListener,
  Inject,
  AfterViewInit,
  ViewChildren
} from '@angular/core';
import { appService } from '../../service/app.service';
import {
  NgbModal,
  ModalDismissReasons,
  NgbDatepickerConfig,
  NgbCalendar,
  NgbDateStruct
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-assign-relief',
  templateUrl: './assign-relief.component.html',
  styleUrls: ['./assign-relief.component.css']
})
export class AssignReliefComponent implements OnInit {
  public modalReference: any;

  constructor(private _service: appService, private modalService: NgbModal) {}

  ngOnInit() {
    this.callAssignModal();
  }

  callAssignModal() {
    this.modalReference = this.modalService.open('assignModal', {
      backdrop: 'static',
      windowClass:
        'modal-xl modal-inv d-flex justify-content-center align-items-center'
    });
  }
}
