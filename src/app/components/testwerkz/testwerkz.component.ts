
import { Component, OnInit, HostListener } from "@angular/core";
import { TargetLocator } from "selenium-webdriver";
import { pd } from "./apg";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DragulaService, DragulaModule } from 'ng2-dragula';
import { appService } from '../../service/app.service';
import { FileUploader } from 'ng2-file-upload';
// declare var upndown:any;
var upndown = require("upndown");



declare var $:any;
@Component({
  selector: "app-testwerkz",
  templateUrl: "./testwerkz.component.html",
  styleUrls: ["./testwerkz.component.css"]
})
export class TestwerkzComponent implements OnInit {
  public showSettingSidebar = true;
  public isGlobal = false;
  public modelType:any;
  public testWerkzCategory = false;
  public conceptCreate = false;
  public isUpdate = false;
  public conceptList = true;
  public isfocus = false;
  public item: any = {};
  public editValue: any;
  public ischecked: any;
  public goBackCat = false;
  public wordLength: any;
  public navIsFixed: boolean = false;
  public iseditfocus = false;
  public otherfocus = false;
  public isEditComplete: boolean = false;
  
  public translateToMarkDown: string;
  public testVar = "";
  public placeholderVar = "Enter Questions";
  public pd: pd = new pd();

  public concepts: any[];
  public toolBarOptions = {
    toolbar: { buttons: ["bold", "italic", "underline", "image"] },
    static: true,
    relativeContainer: "app-testwerkz",
    align: "center",
    sticky: false,
    updateOnEmptySelection: false
  };

  public tagWerkz = {
    "name":''
  }
  public modalReference: any;
  public contentArr: any=[];
  public classCreate= false;
  public regionID = localStorage.getItem('regionId');
  public concept = {
  }
  public tagsWerkzList = []
  public tempContentArr:any =[];
  public selectedImgArr:any =[];
  public clickType: boolean=false;
  public editableId:any = "";
  public focusType = "";
  constructor(private _service: appService,private modalService: NgbModal,private dragulaService: DragulaService) {}

  ngOnInit() {
    if(window.innerWidth > 1366){
      this.classCreate = true;
    }
    if(window.innerWidth <= 1366){
      this.classCreate = false;
    }
    this.concepts = [
      {
        pdName: "",
        question: [
          {
            questionName: "",
            answers: [
              {
                answer: ""
              }
            ],
            rightAnswer: 0
          }
        ]
      }
    ];
    for (var i = 0; i < this.concepts.length; i++) {
      console.log(this.concepts[i]);
    }
    // console.log(this.concepts[0].pdName="pdName")
    // this.concepts[0].question[0].questionName = "answerName";
    // this.concepts[0].question[0].answers[0].answer = "answer1";
    // this.concepts[0].question[0].answers[1].answer = "answer1";
    // this.concepts[0].question[0].answers[2].answer = "answer4";
    // this.concepts[0].question[0].rightAnswer = 0;
    console.log(this.concepts);
  }
  @HostListener("click", ["$event.target"]) onClick($event) {
    console.log("click");
    console.log($event);
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
      console.log("greater than 100");
      this.navIsFixed = true;
    } else {
      console.log("less than 100");
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

  //get html tag in div
  turn(){
    var myDiv = document.getElementById('pd-0');
    console.log("myD",myDiv.innerHTML)
  }
  
  createTagWerkz(item) {
    this.isfocus = !this.isfocus;
    console.log(item);
    console.warn(this.tagWerkz);
    this._service.createTagWerkz(this.regionID,item)
    .subscribe((res:any) => {    
      console.log(res);
      this.tagWerkz = {
        "name" : ''
      };
      this.getAllTag();
  }, err => {
    console.log(err)
  })
  }

  goToTestWerkz() {
      this.testWerkzCategory = true
      this.conceptList = false;
      this.getAllTag();
  }

  getAllTag(){
    this._service.getAllTags(this.regionID)
    .subscribe((res:any) => {    
      console.log(res);
      this.tagsWerkzList = res;
  }, err => {
    console.log(err)
  })
  }
  updateTagWerkz(data){
    console.log("Update Category",data, data._id);
      this.iseditfocus = false;
      // this.isEditComplete = false;
      let obj = {
        "name":data.name
      }
      this.editValue = ''
      this._service.updateTagsWerkz(this.regionID,data._id,obj)
      .subscribe((res:any) => {    
        console.log(res);
        this.getAllTag();
        this.tagWerkz = {
          "name" :''
        };
    }, err => {
      console.log(err)
    })
  }
  focusMethod(e, status, word) {
    this.wordLength = word.length;
    if (status == 'name') {
      $('.limit-type-wordcount').show('slow');
    } 
  }

  focusFunction(status, val, word) {
    console.log(word);
    if (status == "create") {
      this.isfocus = true;
      this.wordLength = word.length;
      $(".limit-word").show("slow");
    } else {
      this.wordLength = word.length;
      $(".limit-" + val).show("slow");
      this.iseditfocus = true;
      this.otherfocus = true;
      this.editValue = val;
    }
  }
  blurMethod(e, status) {
    console.log("blur", e);
    let wp = this.wordLength;
    $('.limit-type-wordcount').hide('slow');
    this.wordLength = 0;
  }
  changeMethod(val: string) {
    console.log(val);
    this.wordLength = val.length;
  }
  close(status, id) {
    if (status == "create") {
      this.isfocus = !this.isfocus;
    } else {
      console.log("edit", id);
      this.iseditfocus = !this.iseditfocus;
      this.editValue = "";
    }
    this.tagWerkz = {
      "name" : ''
    };
    this.getAllTag();
  }
 
  somethingChanged(val, name){
    console.log('hi', val)
    this.conceptCreate = true;
    this.testWerkzCategory = false;
    this.ischecked = val;
    localStorage.setItem("categoryID", val);
    localStorage.setItem("categoryName", name);
    // setTimeout(() => {
    //   console.log("--waiting--")
    //   this.goBackCat = true;
    // }, 300);
  }
 
  backToList(){
    this.conceptList = true;
    this.conceptCreate = false;
    this.testWerkzCategory = false;
  }
  backToTestWerkz() {
    this.conceptList = false;
    this.conceptCreate = false;
    this.testWerkzCategory = true;
  }
  edit() {
    this.isEditComplete = true;
    this.isfocus = false;
    this.iseditfocus = false;
  }
  editComplete() {
    this.isEditComplete = !this.isEditComplete;
  }
  translate(e, t, i?, j?) {
    console.log(e);
    console.log(window.getSelection());
    // console.log(t.children('medium-editor-element'))
    if (e.inputType == "insertParagraph") {
      console.log("ddfdfdfdfdfdfdf");
      this.concepts[i].question[j].answers.push({ answer: "" });
    } else {
      var toChild = $(t).children();
      var res = "";
      var str = "";
      toChild.children().each(function() {
        str += $(this)[0].outerHTML;
      });
      var und = new upndown();
      // console.log(und)
      und.convert(str, function(err, markdown) {
        if (err) {
          console.log(err);
        } else {
          res += markdown;
        }
      });
    }

    // und.convert('<h1>Hello, World !</h1>', function(err, markdown) {
    //     if(err) { console.err(err);
    //     else { console.log(markdown); } // Outputs: # Hello, World !
    // });
    // var toHtml = $(t).children('medium-editor-element')[0].innerHTML;
    // console.log(toHtml)
  }

  addQuestion(j) {
    console.log("add querstion");
    console.log(this.concepts[j].question);
    this.concepts[j].question.push({
      questionName: "",
      answers: [
        {
          answer: ""
        }
      ],
      rightAnswer: 0
    });
    console.log(this.concepts[j]);
  }
  addPd() {
    this.concepts.push({
      pdName: "",
      question: [
        {
          questionName: "",
          answers: [
            {
              answer: ""
            }
          ],
          rightAnswer: 0
        }
      ]
    });
    console.log(this.concepts);
  }

  onClickEditor(t) {}
  onInput(content, event, ele, type, i?, j?) {
    console.log(ele);
    console.log(type);
    console.log(window.getSelection().getRangeAt(0))
    console.log(event)
    console.log($(window.getSelection().focusNode).children("img"));
    if ($(window.getSelection().focusNode).children("img").length > 0) {

    if(event.type != "deleteContentBackward"){
      // this.modalService.open(content, { backdropClass: "light-blue-backdrop" });
      // imgTag.attr('src','second.jpg');
      this.modalReference = this.modalService.open(content, { backdrop: 'static', keyboard: false, windowClass: 'modal-xl modal-inv d-flex justify-content-center align-items-center' });
      this.getAllContent();

    }
  }
    // if ($(window.getSelection().focusNode).children("img").length > 0) {
    //   if(event.type != "deleteContentBackward"){
    //     var imgTag = $(window.getSelection().focusNode).children("img").first();
    //     this.modalService.open(content, { backdropClass: "light-blue-backdrop" });
    //     // imgTag.attr('src','second.jpg');
    //     imgTag.show();
    //     console.log(imgTag)
    //     var imgWidth = Number(imgTag.css('width').replace("px",""));
    //     var imgHeight = Number(imgTag.css('height').replace("px",""));
    //     console.log(imgWidth)
    //     console.log(imgHeight)
    //     if(imgWidth<120){
  
    //       imgTag.css('padding-left',(120-imgWidth)/2)
    //       imgTag.css('padding-right',(120-imgWidth)/2)
    //     }
    //     if(imgHeight<120){
    //       imgTag.css('padding-top',(120-imgHeight)/2)
    //       imgTag.css('padding-bottom',(120-imgHeight)/2)
    //     }
    //     var div = document.createElement("div")
    //     this.resizeImage(imgTag);
    //   }
      
    // }
    if (event.inputType == "insertParagraph") {
      if (type == "answer") {
        this.concepts[i].question[j].answers.push({ answer: "" });
      }

    }
    //Conflit fixed for Thiha soe
//     else if($target.prop("tagName") == "I"){
//       console.log("*")
//       str += "*";
//     }
//     // console.log($target.end())
//     // if($(this).hasClass("medium-editor-element")){
//     //   console.log("only")
//     //   console.log($(this))
//     //   str = str + ($(this).text())
//     // }
//  })
//  console.log(str)
// }

  }
  
  resizeImage(ele) {
    console.log(ele)
    var maxWidth = 120; // Max width for the image
    var maxHeight = 120; // Max height for the image
    var ratio = 0; // Used for aspect ratio
    var width = ele.width(); // Current image width
    var height = ele.height(); // Current image height

    // Check if the current width is larger than the max
    if (width > maxWidth) {
      ratio = maxWidth / width; // get ratio for scaling image
      ele.css("width", maxWidth); // Set new width
      ele.css("height", height * ratio); // Scale height based on ratio
      height = height * ratio; // Reset height to match scaled image
      width = width * ratio; // Reset width to match scaled image
    }

    // Check if current height is larger than max
    if (height > maxHeight) {
      ratio = maxHeight / height; // get ratio for scaling image
      ele.css("height", maxHeight); // Set new height
      ele.css("width", width * ratio); // Scale width based on ratio
      width = width * ratio; // Reset width to match scaled image
      height = height * ratio; // Reset height to match scaled image
    }
  }

  //open image modal
  openImgModal(content,type) {
    console.log("open modal")
    this.modelType = type;
    this.modalReference = this.modalService.open(content, { backdrop: 'static', keyboard: false, windowClass: 'modal-xl modal-inv d-flex justify-content-center align-items-center' });
    this.getAllContent();
  }

  //get all content
 getAllContent(){
  this._service.getContent(this.regionID)
    .subscribe((res: any) => {
      this.contentArr=res;
      this.tempContentArr=res;
      console.log(res)
    }, err => {
      console.log(err)
    });
 }
  cancelModal() {
    this.modalReference.close();
    this.selectedImgArr = [];
  }
  
  //image upload
  onloadImg(event){
    const file = event.target.files[0]
    console.log(file)
    this._service.loadImage(this.regionID, file)
      .subscribe((res: any) => {
        // this.contentArr=res.meta;
        this.getAllContent();
        setTimeout(() => {
          this.autoSelectedImg(res.meta);
          console.log(res.meta)
        },300);
      }, err => {
        console.log(err);
      });
    }
    autoResize(e){
      e.target.style.cssText = 'height:auto';
      e.target.style.height = e.target.scrollHeight + "px";
  }

  //autoselected img after img load
  autoSelectedImg(resturnobj){
    
    for(var i=0;i<resturnobj.length;i++){
      for(var j=0;j<this.tempContentArr.length;j++){
        console.error(resturnobj[i]._id );
        console.error(this.tempContentArr[j]._id);
        console.log(resturnobj[i]._id == this.tempContentArr[j]._id);
        if(resturnobj[i]._id == this.tempContentArr[j]._id){
          this.onslectedImgDiv(j,this.tempContentArr[j]);
          // break;
        }
      }
    }
  
  }
  //mutiselect img
  onslectedImgDiv(i,img){
    const imgDiv: HTMLElement = document.getElementById('img-'+i);
    const circle: HTMLElement = document.getElementById('cricle'+i);
    const check: HTMLElement = document.getElementById('check'+i);
    const trash: HTMLElement = document.getElementById('trash'+i);
    console.log(trash.style.cssText)
    console.log(imgDiv.style.border)
    if(trash.style.opacity == '1'){

    }
    if(imgDiv.style.border == "" || imgDiv.style.border=="none"){
      this.selectedImgArr.push(img);
      console.log(this.selectedImgArr);
      imgDiv.setAttribute("style","border:solid;color:#007fff;");
      circle.setAttribute("style","border: solid #007fff; border-radius: 50%;width: 16px; height: 16px;position: absolute;background: #007fff;margin-top: 8px;margin-left: 8px;z-index: 2;");
      check.setAttribute("style","color:white;");
    }else{
      imgDiv.setAttribute("style","border:none;");
      circle.setAttribute("style","border: none; border-radius: 50%;width: 16px; height: 16px;position: absolute;background: none;margin-top: 8px;margin-left: 8px;z-index: 2;");
      check.setAttribute("style","color:#ffffff00;");
      this.selectedImgArr.splice(this.selectedImgArr.indexOf(i),1)
      console.log(this.selectedImgArr);
    }
    
  }

  onImgMouseEvent(e,i){
    const imgDiv: HTMLElement = document.getElementById('img-'+i);
    const trash: HTMLElement = document.getElementById('trash'+i);
    const overlay: HTMLElement = document.getElementById('Imgoverlay'+i);
    console.log(imgDiv.style.border)
    if(e.type == "mouseenter" && (imgDiv.style.border=="solid")){
      this.clickType=true;
      trash.setAttribute("style","opacity: 1;");
      overlay.setAttribute("style","display:block;  background: rgba(0, 0, 0, .3);")
    }else{
      this.clickType=false;
      trash.setAttribute("style","opacity: 0;")
      overlay.setAttribute("style"," background: rgba(0, 0, 0, 0);")
    }
    console.log(e.type)
  }

  showSetting(){
    this.showSettingSidebar = true;
  }
  closeSetting(){
    console.log('object');
    this.showSettingSidebar = false;
  }
  // caretPosition:any;
  // caretPos(){
  //   this.caretPosition = window.getSelection().anchorOffset;
  //   console.log("caretPosition",this.caretPosition);
  // }
//   insertImg(){
//     console.log(this.selectedImgArr);
//     console.log(this.caretPosition)
//     // document.execCommand("InsertImage", false, "http://placekitten.com/200/300");
//     document.getElementById("editor1").focus();
//     setTimeout(()=>{
// //       var as = document.getElementById("editable");
// //    var el=as.childNodes[1].childNodes[0];//goal is to get ('we') id to write (object Text)
// //   var range = document.createRange();
// //      var sel = window.getSelection();
// // range.setStart(el, 1);
// // range.collapse(true);
// // sel.removeAllRanges();
// // sel.addRange(range);
//       for(var i in this.selectedImgArr){
//         console.log(this.selectedImgArr[i].url,'img');
//         document.execCommand("InsertImage", false, this.selectedImgArr[i].url);
//       }
//     },100)
//     this.cancelModal();
//     // this.selectedImgArr=[];
//   }

  insertImg(){
     console.log(this.selectedImgArr);
     console.log("editableID",this.editableId)
     var e = document.getElementById(this.editableId);
     e.innerHTML += ('<div id="img'+ this.editableId +'" class="row"></div>');
     var k = document.getElementById("img"+this.editableId);
     for(var i in this.selectedImgArr){
       console.log(this.selectedImgArr[i].url,'img');
       var url = this.selectedImgArr[i].url;
       console.log(url)
       // k.innerHTML += ('<div style="width: 120px;height: 120px;float:left;position:relative;background: #f2f4f5"><img style="width:100%;position:absolute;margin: auto;top:0;left:0;right:0;bottom:0;" src="'+url+'"></img><div>');
       k.innerHTML += ('<div class="col-md-4"><div class="innerD p-0"><img style="width:100%" src="'+url+'"></img></div></div>');
     }
     // e.innerHTML += ('<span class="tag">{'+field+'}<span onclick=removePlaceholder(this) class="remove">x</span></span>&nbsp;')
     // e.innerHTML += ('<div><img src="http://placekitten.com/200/300"></img><div>');
     this.cancelModal();
  }

  onremoveClick(id){
    this._service.onDeleteContent(this.regionID,id)
    .subscribe((res: any) => {
      console.log(res)
      // this.contentArr=res.meta;
      this.getAllContent();
      setTimeout(() => {
        this.autoSelectedImg(res.meta);
        console.log(res.meta)
      },300);
    }, err => {
      console.log(err);
    });
    // this.onslectedImgDiv(i,img,"exitBorder");
  }

  onFocus(type,idx1,idx2){
    this.editableId = "";
    this.focusType = type;
    if(type == 'question'){
      this.editableId = 'q'+'-'+idx1+idx2;
      console.log(this.editableId)
    }
    
  }
  
}
