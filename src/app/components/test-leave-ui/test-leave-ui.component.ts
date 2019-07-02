import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  ViewContainerRef,
  HostListener,
  AfterViewInit,
  ViewChildren,
  QueryList
} from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-test-leave-ui',
  templateUrl: './test-leave-ui.component.html',
  styleUrls: ['./test-leave-ui.component.css']
})
export class TestLeaveUiComponent implements OnInit {
  modalReference: any;
  skipLessonArr: any = [
    {
      isAvailable: false,
      date: 'Wed,3 July 2019',
      courses: [
        {
          _id: '5d0b436a4ab685413ee1bb7f',
          courseCode: 'c-1',
          name: 'Regular Test One',
          type: 'REGULAR',
          lessons: [
            {
              cancel: false,
              attendance: null,
              _id: '5d0b436a4ab685413ee1bb84',
              startDate: '2019-07-03T15:00:00.000Z',
              endDate: '2019-07-03T15:30:00.000Z',
              teacherId: '5d09d057fadae03db5381616'
            }
          ],
          enrolledStudentCount: 0
        },
        {
          _id: '5d158c5423878e16597a6e0f',
          courseCode: 'tc-28',
          name: 'Test Course Create',
          type: 'REGULAR',
          lessons: [
            {
              cancel: false,
              attendance: null,
              _id: '5d158c5423878e16597a6e14',
              startDate: '2019-07-03T16:00:00.000Z',
              endDate: '2019-07-03T16:45:00.000Z',
              teacherId: '5d09d057fadae03db5381616'
            }
          ],
          enrolledStudentCount: 0
        }
      ]
    },
    {
      isAvailable: false,
      date: 'Wed,4 July 2019',
      courses: [
        {
          _id: '5d0b158587b0b6241ce5b596',
          courseCode: 'nc1',
          name: 'New Course for Yoga Plan 1',
          type: 'REGULAR',
          lessons: [
            {
              cancel: false,
              attendance: null,
              _id: '5d0b158587b0b6241ce5b599',
              startDate: '2019-07-04T14:00:00.000Z',
              endDate: '2019-07-04T14:30:00.000Z',
              teacherId: '5d09d057fadae03db5381616'
            }
          ],
          enrolledStudentCount: 1
        },
        {
          _id: '5d0b43bd4ab685413ee1bb93',
          courseCode: 's-1',
          name: 'Test From Schedule',
          type: 'REGULAR',
          lessons: [
            {
              cancel: false,
              attendance: null,
              _id: '5d0b43bd4ab685413ee1bb96',
              startDate: '2019-07-04T03:00:00.000Z',
              endDate: '2019-07-04T03:35:00.000Z',
              teacherId: '5d09d057fadae03db5381616'
            }
          ],
          enrolledStudentCount: 1
        },
        {
          _id: '5d0b57914ab685413ee1bbd3',
          courseCode: 'tc20',
          name: 'Test course for Testing Plan from schedule',
          type: 'REGULAR',
          lessons: [
            {
              cancel: false,
              attendance: null,
              _id: '5d0b57914ab685413ee1bbd7',
              startDate: '2019-07-04T14:00:00.000Z',
              endDate: '2019-07-04T14:45:00.000Z',
              teacherId: '5d09d057fadae03db5381616'
            }
          ],
          enrolledStudentCount: 2
        }
      ]
    }
  ];

  constructor(private modalService: NgbModal) {}

  ngOnInit() {}

  callModal(testModal) {
    console.log(testModal);
    this.modalReference = this.modalService.open(testModal, {
      backdrop: 'static',
      windowClass:
        'modal-xl modal-inv d-flex justify-content-center align-items-center'
    });
  }

  assignRelifeTeacher(modalName, type) {
    this.modalReference = this.modalService.open(modalName, {
      backdrop: 'static',
      windowClass:
        'modal-xl modal-inv d-flex justify-content-center align-items-center'
    });
  }

  cancelModal() {
    this.modalReference.close();
  }
}
