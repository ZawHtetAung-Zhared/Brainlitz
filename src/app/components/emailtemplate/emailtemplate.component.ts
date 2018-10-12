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
  public topPos: any = 0;
  public isedit: boolean = true;
  public textareaTxt: string = '';
  public textareaHeight: any;
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
    var cursorPos = $('.input-msg')[0].selectionStart;
    $('.input-msg').val(this.textareaTxt.substring(0, cursorPos) + this.concatValue + this.textareaTxt.substring(cursorPos) );
    console.log($('.input-msg').val())

    this.textareaTxt = $('.input-msg').val();
    $('.input-msg').focus();
    this.showBox = false;
    this.leftPos = 0;
    this.topPos = 0;
  }

  changeMethod(word){
    // console.log(word)
    this.textareaTxt = word;
    if (word.includes('[[')) {
      var str_sub = word.substr(word.lastIndexOf(" ")+1)      
      var str_res = str_sub.split("[[");
      var index = str_res.length - 1;
      var cursorPos = $('.input-msg')[0].selectionStart;
      console.log('~~~~',cursorPos)
      var text = $('.input-msg').val();   
      var lines = text.split(/\r|\r\n|\n/);
      var linecount = lines.length;
      console.log(linecount);
      var arrayOfLines = this.textareaTxt.split("\n");
      for(var i = 0;i < linecount;i++){
        this.leftPos = (arrayOfLines[i].length * 8) - 112;  
        if(linecount<= 5){
          this.topPos = linecount*24;
        }else{
          this.topPos = 130;
        }
      }

      if(str_res[index] == '' && str_res != ""){
        this.showBox = true;
      }else{
        this.showBox = false;
        this.leftPos = 0;
        this.topPos = 0;
      }
    }else{
      this.showBox = false;
      this.leftPos = 0;
      this.topPos = 0;
    }
  } 

  updateEmail(){
    
  }

}
