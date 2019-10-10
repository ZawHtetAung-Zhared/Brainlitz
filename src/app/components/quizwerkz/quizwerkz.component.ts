import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  HostListener
} from '@angular/core';
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalRef
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, FormGroup, FormControl } from '@angular/forms';
import { appService } from '../../service/app.service';
import { Observable } from 'rxjs/Rx';
import { quizWerkzForm } from './quizwerkz';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastsManager } from 'ng5-toastr/ng5-toastr';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;
import { Router } from '@angular/router';

@Component({
  selector: 'app-quizwerkz',
  templateUrl: './quizwerkz.component.html',
  styleUrls: ['./quizwerkz.component.css']
})
export class QuizwerkzComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  @ViewChild('pdfForm') form: any;
  formField: quizWerkzForm = new quizWerkzForm();
  public regionID = localStorage.getItem('regionId');
  public locationID = localStorage.getItem('locationId');
  private modalReference: NgbModalRef;
  closeResult: string;
  public pdfList: Array<any> = [];
  public isEdit: boolean = false;
  public iscreate: boolean = false;
  public navIsFixed: boolean = false;
  public currentID: any;
  public selectQw: any;
  public deleteQw: any;
  public modalReference1: any;
  public editId: any;
  public result: any;
  public wordLength: number = 0;
  viewQuiz: any;
  public permissionType: any;
  public pdfPermission: any = [];
  public pdfDemo: any = [];

  constructor(
    private modalService: NgbModal,
    private _service: appService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    private router: Router
  ) {
    this.toastr.setRootViewContainerRef(vcr);
    this._service.locationID.subscribe(data => {
      if (this.router.url === '/tools') {
        this._service.permissionList.subscribe(data => {
          console.log('from quizwerkz');
          this.permissionType = data;
          this.checkPermission();
        });
      } else {
        console.log('====', this.router.url);
      }
    });
  }

  ngOnInit() {
    if (this.router.url === '/tools') {
      this.permissionType = localStorage.getItem('permission');
      this.checkPermission();
    }
  }

  checkPermission() {
    console.log(this.permissionType);
    this.pdfPermission = [
      'VIEWQUIZWERKZ',
      'CREATEQUIZWERKZ',
      'EDITQUIZWERKZ',
      'DELETEQUIZWERKZ'
    ];
    if (this.permissionType && this.permissionType.length > 0) {
      this.pdfPermission = this.pdfPermission.filter(
        value => -1 !== this.permissionType.indexOf(value)
      );

      this.pdfDemo['viewPdf'] = this.pdfPermission.includes('VIEWQUIZWERKZ')
        ? 'VIEWQUIZWERKZ'
        : '';
      this.pdfDemo['addPdf'] = this.pdfPermission.includes('CREATEQUIZWERKZ')
        ? 'CREATEQUIZWERKZ'
        : '';
      this.pdfDemo['editPdf'] = this.pdfPermission.includes('EDITQUIZWERKZ')
        ? 'EDITQUIZWERKZ'
        : '';
      this.pdfDemo['deletePdf'] = this.pdfPermission.includes('DELETEQUIZWERKZ')
        ? 'DELETEQUIZWERKZ'
        : '';
    }

    if (this.pdfPermission.length > 0) {
      this.getAllPdf(20, 0);
    } else {
      this.pdfList = [];
    }
  }

  cancel() {
    this.pdfList = [];
    this.iscreate = false;
    this.formField = new quizWerkzForm();
    this.getAllPdf(20, 0);
  }

  creatnew() {
    this.isEdit = false;
    this.iscreate = true;
    this.formField = new quizWerkzForm();
  }

  focusMethod(e) {
    $('.limit-wordcount').show('slow');
  }

  blurMethod(e) {
    $('.limit-wordcount').hide('slow');
  }

  changeMethod(val: string) {
    console.log(val);
    this.wordLength = val.length;
  }

  open(content) {
    this.isEdit = false;
    this.formField = new quizWerkzForm();
    this.modalReference = this.modalService.open(content, {
      backdrop: 'static',
      windowClass: 'animation-wrap'
    });
    this.modalReference.result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
        this.isEdit = false;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        this.isEdit = false;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  showMore(skip: any) {
    this.getAllPdf(20, skip);
  }

  getAllPdf(limit, skip) {
    //this.blockUI.start('Loading...');
    this._service
      .getAllPdf(this.regionID, this.locationID, limit, skip)
      .subscribe(
        (res: any) => {
          //this.blockUI.stop();
          this.result = res;
          this.pdfList = this.pdfList.concat(res);
          console.log('pdflist', this.pdfList);
        },
        err => {
          //this.blockUI.stop();
          console.log(err);
        }
      );
  }

  createQuizWerkz(obj, update) {
    let data = {
      regionId: this.regionID,
      name: obj.name,
      url: obj.url,
      cover: obj.cover
    };
    //this.blockUI.start('Loading...');
    this._service.createPdf(data, this.locationID).subscribe(
      (res: any) => {
        console.log(res);
        //this.blockUI.stop();
        this.toastr.success('Quizwerkz successfully created.');
        this.cancel();
      },
      err => {
        this.toastr.error('Create quizwerkz failed.');
        console.log(err);
      }
    );
  }

  onClickDelete(id, confirm) {
    // this.selectQw = id;
    console.log('onclickDelete', id);
    this.getSingleQuizwerkz(id);
    this.modalReference = this.modalService.open(confirm, {
      backdrop: 'static',
      windowClass:
        'deleteModal d-flex justify-content-center align-items-center'
    });
    this.modalReference.result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  confirmDelete(qw, content1) {
    console.log(qw);
    this.deleteQw = qw;
    this.modalReference.close();
    this.modalReference1 = this.modalService.open(content1, {
      backdrop: 'static',
      windowClass: 'animation-wrap'
    });
    this.modalReference1.result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  quizwerkzDelete(qwId) {
    console.log('quizwerkz delete', qwId);
    this._service.deleteQuizwerkz(qwId, this.locationID).subscribe(
      (res: any) => {
        this.modalReference.close();
        this.toastr.error('Successfully deleted');
        console.log('Res', res);
        this.pdfList = [];
        this.getAllPdf(20, 0);
      },
      err => {
        this.toastr.error('Delete QuizWerkz Fail');
        console.log(err);
      }
    );
  }

  onclickUpdate(id) {
    this.pdfList = [];
    this.iscreate = true;
    this.isEdit = true;
    this.getSingleQuizwerkz(id);
  }

  getSingleQuizwerkz(id) {
    //this.blockUI.start('Loading...');
    this._service.getSingleQuizwerkz(id, this.locationID).subscribe(
      (res: any) => {
        //this.blockUI.stop();
        console.log(res);
        this.formField = res;
        this.selectQw = res.name;
        this.currentID = res._id;
      },
      err => {
        //this.blockUI.stop();
        console.log(err);
      }
    );
  }

  updateQuizWerkz(obj) {
    console.log(obj);
    let data = {
      regionId: this.regionID,
      name: obj.name,
      url: obj.url,
      cover: obj.cover
    };
    //this.blockUI.start('Loading...');
    this._service
      .updateSignleQuizwerkz(obj._id, data, this.locationID)
      .subscribe(
        (res: any) => {
          console.log(res);
          this.toastr.success('Successfully edited.');
          //this.blockUI.stop();
          this.getAllPdf(20, 0);
          this.iscreate = false;
        },
        err => {
          this.toastr.error('Edit fail');
          console.log(err);
        }
      );
  }
}
