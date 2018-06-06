import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, FormGroup, FormControl } from '@angular/forms';
import { appService } from '../../service/app.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent implements OnInit {
	public item:any = {};
	public regionID = localStorage.getItem('regionId');
  constructor() { }

  ngOnInit() {
  }

  sendNoti(data){
  	console.log(data)
  	this.item = {};
  }

}
