import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, FormGroup, FormControl } from '@angular/forms';
import { appService } from '../../service/app.service';
import { Observable } from 'rxjs/Rx';
import { quizWerkzForm } from './quizWerkz';

@Component({
  selector: 'app-quizwerkz',
  templateUrl: './quizwerkz.component.html',
  styleUrls: ['./quizwerkz.component.css']
})
export class QuizwerkzComponent implements OnInit {
	@ViewChild('pdfForm') form: any;
	formField: quizWerkzForm = new quizWerkzForm();
	public regionID = localStorage.getItem('regionId');
	private modalReference: NgbModalRef;
	closeResult: string;
	public pdfList: any;
	public isEdit:boolean = false;
	public currentID:any;
  public selectQw:any;
  public deleteQw:any;
  public modalReference1:any;
  public editId: any;
  viewQuiz: any;

  constructor(private modalService: NgbModal, private _service: appService) { }

  ngOnInit() {
  	this.getAllPdf();
  }

  open(content) {
    this.isEdit = false;
    this.formField = new quizWerkzForm();
    this.modalReference = this.modalService.open(content, { backdrop:'static', windowClass:'animation-wrap' });
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.isEdit = false;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.isEdit = false;
    });
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

  getAllPdf(){
  	this._service.getAllPdf(this.regionID)
		.subscribe((res:any) => {
      this.pdfList = res;
      console.log("pdflist",this.pdfList);
    }, err => {
    	console.log(err)
    })
  }

  createQuizWerkz(obj, update){
  	let data={
  		"regionId": this.regionID,
  		"name": obj.name,
  		"url": obj.url,
      "cover": obj.cover
  	}
    this.modalReference.close();
    this._service.createPdf(data)
    .subscribe((res:any) => {
      console.log(res);
      this.getAllPdf();
    })
  }

  onClickDelete(data,confirm){
    this.selectQw = data;
    console.log("onclickDelete",data);
    this.modalReference = this.modalService.open(confirm, { backdrop:'static', windowClass:'animation-wrap' });
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  confirmDelete(qw,content1){
    console.log(qw);
    this.deleteQw = qw;
    this.modalReference.close();
    this.modalReference1 = this.modalService.open(content1,{ backdrop:'static', windowClass:'animation-wrap' });
    this.modalReference1.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  quizwerkzDelete(qwId){
    console.log("quizwerkz delete",qwId);
    this._service.deleteQuizwerkz(qwId)
    .subscribe((res:any) => {
      this.modalReference1.close();
      console.log("Res",res);
      this.getAllPdf();
    })
  }

  editQuizWerkz(id, content){
    this.isEdit = true;
    this.editId = id;
    this.modalReference = this.modalService.open(content, { backdrop:'static', windowClass:'animation-wrap' });
    this._service.getSingleQuizwerkz(id)
    .subscribe((res:any) => {
      console.log(res)
      this.formField = res;
    })
  }

  updateQuizWerkz(obj){
    console.log(obj)
    let data={
      "regionId": this.regionID,
      "name": obj.name,
      "url": obj.url,
      "cover": obj.cover
    }
    this.modalReference.close();
    this._service.updateSignleQuizwerkz(this.editId, data)
    .subscribe((res:any) => {
      console.log(res);
      this.getAllPdf();
    })
  }
  
  viewQuizWerkz(id,view){
    console.log(this.editId)
    this.modalReference = this.modalService.open(view, { backdrop:'static', windowClass: 'animation-wrap',  size: 'lg' });
    this._service.getSingleQuizwerkz(id)
    .subscribe((res:any) => {
      console.log(res)
      this.viewQuiz = res;
    })
  }

}
