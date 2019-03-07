import {
  Component,
  OnInit,
  HostListener
} from '@angular/core';
import { TargetLocator } from 'selenium-webdriver';
declare var $:any;
@Component({
  selector: 'app-testwerkz',
  templateUrl: './testwerkz.component.html',
  styleUrls: ['./testwerkz.component.css']
})
export class TestwerkzComponent implements OnInit {
  public testWerkzCategory = false;
  public conceptCreate = false;
  public isUpdate = false;
  public conceptList = true;
  public isfocus = false;
  public item :any ={}
  public editValue:any;
  public ischecked:any;
  public goBackCat= false;
  public wordLength :any ;
  public navIsFixed: boolean = false;
  public iseditfocus = false;
  public otherfocus = false;
  public isEditComplete :boolean = false;
  public classCreate= false;
  public concept = {
  }
  public translateToMarkDown: string;
  public testVar = "";
  public placeholderVar = "Enter Questions";
  public test = [
    {
      createdDate: "2019-02-27T06:36:13.902Z",
      name: "Data Testing",
      regionId: "5af915541de9052c869687a3",
      updatedDate: "2019-02-27T06:36:13.902Z",
      __v: 0,
      _id: "5c762fdd4c95553a8670d66"
    },
    {
      createdDate: "2019-02-27T06:36:13.902Z",
      name: "Data Testing1",
      regionId: "5af915541de9052c869687a3",
      updatedDate: "2019-02-27T06:36:13.902Z",
      __v: 0,
      _id: "5c762fdd4c95553a8670666"
    },
    {
      createdDate: "2019-02-27T06:36:13.902Z",
      name: "Data Testing2",
      regionId: "5af915541de9052c869687a3",
      updatedDate: "2019-02-27T06:36:13.902Z",
      __v: 0,
      _id: "5c762fdd4c9553a8670d666"
    },
    {
      createdDate: "2019-02-27T06:36:13.902Z",
      name: "Data Testing3",
      regionId: "5af915541de9052c869687a3",
      updatedDate: "2019-02-27T06:36:13.902Z",
      __v: 0,
      _id: "5c762fdd495553a8670d666"
    },
    {
      createdDate: "2019-02-27T06:36:13.902Z",
      name: "Data Testing4",
      regionId: "5af915541de9052c869687a3",
      updatedDate: "2019-02-27T06:36:13.902Z",
      __v: 0,
      _id: "5c762fddc95553a8670d666"
    }
  ]
  constructor() {}

  ngOnInit() {
    if(window.innerWidth > 1366){
      this.classCreate = true;
    }
    if(window.innerWidth <= 1366){
      this.classCreate = false;
    }
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if(window.innerWidth > 1366){
      this.classCreate = true;
    }
    if(window.innerWidth <= 1366){
      this.classCreate = false;
    }
  }

  @HostListener('window:scroll', ['$event']) onScroll($event) {
    // console.log($event);
    // console.log("scrolling");
    // console.log(window.pageYOffset)
    if (window.pageYOffset > 90) {
      console.log('greater than 100')
      this.navIsFixed = true;
    } else {
      console.log('less than 100')
      this.navIsFixed = false;
    }
    if (window.pageYOffset > 81) {      
      $('.setting-sidebar').css({top: 65}) 
    }
    else if(window.pageYOffset < 0){
      $('.setting-sidebar').css({top: 165}) 
    } else {   
      $('.setting-sidebar').css({top: 165}) 
    }
  }

  goToTestWerkz() {
    this.testWerkzCategory = true
    this.conceptList = false;
  }
  focusMethod(e, status, word) {
    this.wordLength = word.length;
    if (status == 'name') {
      $('.limit-wordcount').show('slow');
    } else if (status = "input_method") {
      $('.limit-type-wordcount').show('slow');
    } else {
      $('.limit-wordcount1').show('slow');
    }
  }
  

  focusFunction(status, val, word){
    console.log(word)
    if(status == 'create'){
      this.isfocus = true;
      this.wordLength = word.length;
      $('.limit-word').show('slow');
    }else{
      this.wordLength = word.length;
      $('.limit-'+val).show('slow');
      this.iseditfocus = true;
      this.otherfocus = true;
      this.editValue = val;
    }
  }
  blurMethod(e, status){
    console.log('blur', e);
    let wp = this.wordLength;
    $('.limit-word').hide('slow');
    this.wordLength = 0;
  }
  changeMethod(val : string){
    console.log(val)
    this.wordLength = val.length;
  }
  close(status, id){
    if(status == 'create'){
    this.isfocus = !this.isfocus;
    }else{
      console.log('edit', id)
      this.iseditfocus = !this.iseditfocus;
      this.editValue = ''
    }
    this.item = {};
  }
  createCategory(item) {
    this.isfocus = !this.isfocus;
  	console.log(item);
    this.item = {};
  }
  somethingChanged(val, name){
    console.log('hi', val)
    this.conceptCreate = true;
    this.testWerkzCategory = false;
    this.ischecked = val;
    localStorage.setItem('categoryID', val);
    localStorage.setItem('categoryName', name);
    // setTimeout(() => {
    //   console.log("--waiting--")
    //   this.goBackCat = true;
    // }, 300);
  }
  updateCategory(data, name){
    console.log("Update Category",data, name);
    let obj = {
      'name': name,
      'regionId': data.regionId,
      '_id': data._id
    }
    console.log(obj)
      this.iseditfocus = false;
      // this.isEditComplete = false;
      this.item = {};
      this.editValue = ''
  }
  backToList(){
    this.conceptList = true;
    this.conceptCreate =  false;
    this.testWerkzCategory = false;
  }
  backToTestWerkz(){
    this.conceptList = false;
    this.conceptCreate =  false;
    this.testWerkzCategory = true;
  }
  edit(){
    this.isEditComplete = true;
    this.isfocus = false;
    this.iseditfocus = false;
  }
  editComplete(){
    this.isEditComplete = !this.isEditComplete;
  }
  translate(t){
    var str ="";
    console.log(t)
    console.log($(t))
    console.log($(t).children(".medium-editor-element"))
    var tempEle = $(t).children(".medium-editor-element");
    tempEle.children().each(function() {
      console.log($(this))
      var $temp = $(this)
      var $target = $(this).children();
      console.log($target)
      if($target.children().length == 0){
        console.log($temp)
        console.log($temp.text())
        str = $temp.text();
      }else{
        while($target.children().length > 0){
          console.log($target.prop("tagName"))
          if($target.prop("tagName") == "B"){
            console.log("bb")
            str += "**";
          }else if($target.prop("tagName") == "U"){
            console.log("__")
            str += "__";
  
          }
          else if($target.prop("tagName") == "I"){
            console.log("*")
            str += "*";
          }
          $target = $target.children();
        }
      }
     
      if($target.prop("tagName") == "B"){
        console.log("bb")
        str += "**";
      }else if($target.prop("tagName") == "U"){
        console.log("__")
        str += "__";

      }
      else if($target.prop("tagName") == "I"){
        console.log("*")
        str += "*";
      }
      // console.log($target.end())
      // if($(this).hasClass("medium-editor-element")){
      //   console.log("only")
      //   console.log($(this))
      //   str = str + ($(this).text())
      // }
   })
   console.log(str)
  }
}