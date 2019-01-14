import { Component, OnInit } from '@angular/core';
import { appService } from '../../service/app.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
	message:string;
  constructor(private _service:appService) { }

  ngOnInit() {
  	// this._service.currentMessage.subscribe(message => this.message = message)
  }

}
