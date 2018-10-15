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
  public isedit: boolean = false;
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

  insertVariable(val, state){
    this.concatValue = "[[" + val + "]]";
    var cursorPos = $('.input-msg')[0].selectionStart;
    $('.input-msg').val(this.textareaTxt.substring(0, cursorPos) + this.concatValue + this.textareaTxt.substring(cursorPos) );
    
    if(state == 'popup'){
      let input_val = $('.input-msg').val()
      var end_index = input_val.lastIndexOf("[[" + val + "]]")         
      input_val = input_val.substr(0, (end_index - 2)) + input_val.substr(end_index);
      console.log(input_val);
      $('.input-msg').val(input_val);
      this.textareaTxt = input_val;
    }else{
      this.textareaTxt = $('.input-msg').val();
    }
    $('.input-msg').focus();

    this.showBox = false;
    this.leftPos = 0;
    this.topPos = 0;
  }

  changeMethod(word){
    // console.log(document.getElementById("txt-body").scrollHeight)
    // this.textareaHeight = document.getElementById("txt-body").scrollHeight;
    this.textareaTxt = word;
    var str_sub,str_res,index,cursorPos,text,lines,linecount;
    if (word.includes('[[')) {
      str_sub = word.substr(word.lastIndexOf(" ")+1)      
      str_res = str_sub.split("[[");
      index = str_res.length - 1;
      cursorPos = $('.input-msg')[0].selectionStart;
      console.log('~~~~',cursorPos)
      text = $('.input-msg').val();   
      lines = text.split(/\r|\r\n|\n/);
      linecount = lines.length;
      console.log(linecount);
      var arrayOfLines = this.textareaTxt.split("\n");
      for(var i = 0;i < linecount;i++){
        this.leftPos = (arrayOfLines[i].length * 8) - 130;
        this.topPos = (linecount<= 5) ? linecount*24 : 130;
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

  auto_grow(element){
    // console.log(element.keyCode)
    // let  textArea = document.getElementById("txt-body")       
    // textArea.style.overflow = 'hidden';
    // textArea.style.height = '0px';
    // textArea.style.height = textArea.scrollHeight + 'px';
  }

  updateEmail(){
    
  }

}
