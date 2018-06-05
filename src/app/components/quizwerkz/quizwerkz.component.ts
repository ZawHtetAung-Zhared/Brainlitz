import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, FormGroup, FormControl } from '@angular/forms';
import { appService } from '../../service/app.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-quizwerkz',
  templateUrl: './quizwerkz.component.html',
  styleUrls: ['./quizwerkz.component.css']
})
export class QuizwerkzComponent implements OnInit {
	@ViewChild('pdfForm') form: any;
	public item:any = {};
	public regionID = localStorage.getItem('regionId');
	private modalReference: NgbModalRef;
	closeResult: string;
	public pdfList: any;
	public isEdit:boolean = false;
	public currentID:any;
  constructor(private modalService: NgbModal, private _service: appService) { }

  ngOnInit() {
  	this.getAllPdf();
  }

  open(content) {
    this.modalReference = this.modalService.open(content, { backdrop:'static', windowClass:'animation-wrap' });
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.item = {};
      this.isEdit = false;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.item = {};
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
  // 	this._service.getPdfs(this.regionID)
		// .subscribe((res:any) => {
  // 		this.locationLists = res;
  //   }, err => {
  //   	console.log(err)
  //   })
  }

  createPdf(obj, update){
  	let data={
  		"regionId": this.regionID,
  		"name": obj.name,
  		"url": obj.url
  	}
  	if(update == true){
			console.log('update', data)
		}else{
			console.log('create', data)
		}
  }

}
