import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-emailtemplate',
  templateUrl: './emailtemplate.component.html',
  styleUrls: ['./emailtemplate.component.css']
})
export class EmailtemplateComponent implements OnInit {

  public selectedType: any = null;
  public concatValue: any;
  public isedit: boolean = true;
  public textareaTxt: string = '';
	public showBox: boolean = false;
  public variables = [
    {name: 'displayName'},
    {name: 'courseName'},
    {name: 'date'},
    {name: 'className'}
  ];
  constructor() { }

  ngOnInit() {
  }

  clickTab(type){
  	this.selectedType = type;
  	console.log(this.selectedType)
  }

  cancel(){
  	this.selectedType = null
    this.isedit = false;
  }

  editOn(){
    this.isedit = true;
  }

  insertVariable(val){
    this.concatValue = val;
    $('.input-msg').val( this.textareaTxt +' '+ this.concatValue);
    $('.input-msg').focus();
  }

  changeMethod(word){
    console.log(word)
    this.textareaTxt = word;
    if (word.includes('[[')) {
      console.log('hi')
      var str_sub = word.substr(word.lastIndexOf(" ")+1)
      console.log(str_sub)
      this.showBox = (str_sub.length == 2) ? true : false;
    }else{
      // this.showBox = false;
    }
  } 

  updateEmail(){
    
  }

}
