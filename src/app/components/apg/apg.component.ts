import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-apg',
  templateUrl: './apg.component.html',
  styleUrls: ['./apg.component.css']
})
export class ApgComponent implements OnInit {

  constructor(private modalService: NgbModal,) { }

  public modalReference: any;
  public closeResult: any;

  ngOnInit() {
  }

  open(content){
  	this.modalReference = this.modalService.open(content, { backdrop:'static', windowClass: 'animation-wrap', size: 'lg'});
    this.modalReference.result.then((result) => {
	  this.closeResult = `Closed with: ${result}`
  	}, (reason) => {
  	  this.closeResult = `Closed with: ${reason}`;
  	});
  }

}
