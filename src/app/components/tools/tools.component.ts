import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, FormGroup, FormControl } from '@angular/forms';
import { appService } from '../../service/app.service';
import { Observable } from 'rxjs/Rx';

declare var $:any;

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent implements OnInit {
	public item:any = {};
  public regionID = localStorage.getItem('regionId');
	public locationId = '5b13c2bd693dfb588d34f9de';
  public isChecked: boolean = false;
  constructor(private _service: appService) { }

  ngOnInit() {
  }

  sendNoti(data){
    console.log(data)
  	console.log(data.type)



    let dataObj = {
      "regionId": this.regionID,
      "locationId": this.locationId,
      "type": data.type
    }

    let body = {
      "title": data.subject,
      "message": data.message
    }

    // if(data.type == 'customers'){
    //   dataObj["allCustomer"] = 1
    // }else if(data.type == 'staffs'){
    //   dataObj["allStaff"] = 1
    // }else{

    // }

    console.log(dataObj)
    this._service.createNoti(dataObj, body)
    .subscribe((res:any) => {
      console.log('~~~', res)
      this.item = {};
    }, err => {
      console.log(err)
    })
  	
  }

  somethingChanged(){
    console.log('what')
    var $radioButtons = $('input[type="radio"]');    
    $radioButtons.each(function() {
        $(this).parent().toggleClass('radio-selected', this.checked);
    });
    
  }


  
}
