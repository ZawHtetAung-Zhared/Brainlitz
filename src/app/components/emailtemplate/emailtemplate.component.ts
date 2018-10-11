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
  public leftPos: any = 0;
  public topPos: any = -110;
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
    this.concatValue = "[[" + val + "]]";
    console.log(this.textareaTxt)
    $('.input-msg').val( this.textareaTxt + this.concatValue);
    $('.input-msg').focus();
    console.log(this.textareaTxt + this.concatValue)
    var all_txt = this.textareaTxt + this.concatValue;
    
    this.textareaTxt = all_txt;
    this.showBox = false;
  }

  changeMethod(word){
    console.log(word)
    this.textareaTxt = word;
    if (word.includes('[[')) {
      var str_sub = word.substr(word.lastIndexOf(" ")+1)      
      var str_res = str_sub.split("[[");
      var index = str_res.length - 1;
      console.log(word.length)
      this.leftPos = (word.length * 8) - 112;

      var text = $('.input-msg').val();   
      var lines = text.split(/\r|\r\n|\n/);
      var count = lines.length;
      console.log(count);
      // this.topPos += 45

      this.showBox = (str_res[index] == '' && str_res != "") ? true : false;
    }else{
      this.showBox = false;
    }
  } 

  updateEmail(){
    
  }

}
