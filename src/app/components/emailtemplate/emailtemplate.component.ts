import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-emailtemplate',
  templateUrl: './emailtemplate.component.html',
  styleUrls: ['./emailtemplate.component.css']
})
export class EmailtemplateComponent implements OnInit {

	public selectedType: any = null;
  constructor() { }

  ngOnInit() {
  }

  clickTab(type){
  	this.selectedType = type;
  	console.log(this.selectedType)
  }

  cancel(){
  	this.selectedType = null
  }

}
