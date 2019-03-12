
import { Component, OnInit, HostListener } from "@angular/core";
import { TargetLocator } from "selenium-webdriver";
import { pd } from "./apg";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DragulaService, DragulaModule } from 'ng2-dragula';
import { appService } from '../../service/app.service';
import { FileUploader } from 'ng2-file-upload';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastsManager } from 'ng5-toastr/ng5-toastr';
import { c } from "@angular/core/src/render3";
import { type } from "os";
// declare var upndown:any;
var upndown = require("upndown");
var TurndownService = require('turndown').default;



declare var $:any;
@Component({
  selector: "app-testwerkz",
  templateUrl: "./testwerkz.component.html",
  styleUrls: ["./testwerkz.component.css"]
})
export class TestwerkzComponent implements OnInit {
  public answerTootips:any;
  public answerTootipsOptions=false;
  public pdIndex :any;
  public questionIndex:any;
  public answerIndex:any;
  public greterThan = false;
  public lessThan = false;
  public forElse = false;
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
  public pdLists: any[];
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
  public concept = {};
  public tagsWerkzList = []
  public tempContentArr:any =[];
  public selectedImgArr:any =[];
  public ImgArr:any =[];
  public imgId:any;
  public clickType: boolean=false;
  public editableId:any = "";
  public focusType = {
    'type': "",
    'no': "",
    'parentIdx': ""
  };
  public focusPlace:any;
  @BlockUI() blockUI: NgBlockUI;

  constructor(private _service: appService,private modalService: NgbModal,private dragulaService: DragulaService,public toastr: ToastsManager) {}



// waiyan's code start

public performanceDemands = [];
// waiyan's code end


  ngOnInit() {
    var turndownService = new TurndownService();
    // for div
    turndownService.addRule('Tada', {
      filter:'div',
      replacement: function (content) {
        return  content + ''
      }
    })
    var a = turndownService.turndown('Which process used by plants and other organisms to convert light energy into chemical energy<div id="d-0" class="row"><div class="col-md-4"><div class="innerD p-0"><img style="width:100%" src="https://brainlitz-dev.s3.ap-southeast-1.amazonaws.com/development/stgbl-cw1/contents/image/155195152918736333332r5CAq.jpg"></div></div><div class="col-md-4"><div class="innerD p-0"><img style="width:100%" src="https://brainlitz-dev.s3.ap-southeast-1.amazonaws.com/development/stgbl-cw1/contents/image/15519542038359737506babe-2972220_960_720.jpg"></div></div><div class="col-md-4"><div class="innerD p-0"><img style="width:100%" src="https://brainlitz-dev.s3.ap-southeast-1.amazonaws.com/development/stgbl-cw1/contents/image/155201857345666107561download.png"></div></div><div class="col-md-4"><div class="innerD p-0"><img style="width:100%" src="https://brainlitz-dev.s3.ap-southeast-1.amazonaws.com/development/stgbl-cw1/contents/image/155202109769328281321download%20%281%29.jpeg"></div></div></div>')
    // console.error(typeof a)
    // var a = turndownService.turndown('![](https://brainlitz-dev.s3.amazonaws.com/orgLogo/ClassWerkz.png)')
    // console.log('a',a);
    if(window.innerWidth > 1366){
      this.classCreate = true;
    }
    if(window.innerWidth <= 1366){
      this.classCreate = false;
    }
    // this.pdLists = [
    //   {
    //     pdName: "",
    //     question: [
    //       {
    //         questionName: "",
    //         answers: [
    //           {
    //             answer: "",
    //             rightAnswer:false
    //           }
    //         ],
    //         rightAnswer: 0
    //       }
    //     ]
    //   }
    // ];
    // for (var i = 0; i < this.pdLists.length; i++) {
    //   console.log(this.pdLists[i]);
    // }
    // console.log(this.concepts[0].pdName="pdName")
    // this.concepts[0].question[0].questionName = "answerName";
    // this.concepts[0].question[0].answers[0].answer = "answer1";
    // this.concepts[0].question[0].answers[1].answer = "answer1";
    // this.concepts[0].question[0].answers[2].answer = "answer4";
    // this.concepts[0].question[0].rightAnswer = 0;

    console.log(this.pdLists);

    // waiyan's code start
    this.performanceDemands = [
      {
        pdName: "",
        question: [
          {
            "name": "string",
            "description": "string",
            "question": "string",
            "allowedAttempts": 0,
            "questionType": "MCQ-OPTION",
            "pickMultiple": false,
            "viewType": "LIST",
            "contents": [
              {
                "contentId": "string",
                "sequence": 0,
                "start": 0,
                "end": 0,
                "playAt": "BEFORE"
              }
            ],
            "answers": [
              {
                "name": "string",
                "answer": "string",
                "imgUrl": "string",
                "correctness": 0,
                "contents": [
                  {
                    "contentId": "string",
                    "sequence": 0,
                    "start": 0,
                    "end": 0,
                    "playAt": "BEFORE"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
    // waiyan's code end

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
       this.greterThan = true;
       this.lessThan = false;
       this.forElse = false;
    }
    else if(window.pageYOffset < 0){
      this.greterThan = false;
      this.lessThan = true;
      this.forElse = false;
      $('.setting-sidebar').css({top: 165}) 
    } else {   
      this.greterThan = false;
      this.lessThan = false;
      this.forElse = true;
      $('.setting-sidebar').css({top: 165}) 
    }
  }

  //get html tag in div
  turn(){
    var myDiv = document.getElementById('q-00');
    console.log("myD",myDiv.innerHTML)
    setTimeout(()=>{
      var turndownService = new TurndownService();
      turndownService.addRule('Tada', {
        filter:'div',
        replacement: function (content) {
          return  content + ''
        }
      })
      var a = turndownService.turndown(myDiv);
      console.log("turn to markdown",a)
    },200)
    
  }
  
  createTagWerkz(item) {
    this.isfocus = !this.isfocus;
    console.log(item);
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
    $('.limit-word').hide('slow');
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
      this.pdLists[i].question[j].answers.push({ answer: "" });
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
  onKeydown(e,i ,j){

    if(e.key === 'Enter'){
      if(this.performanceDemands[i].question[j].answers.length < 8 ){
        // this.pdLists[i].question[j].answers.push({
        //   answer: "",
        //   rightAnswer:false
        // })

        this.performanceDemands[i].question[j].answers.push(
          {
            "name": "string",
            "answer": "string",
            "imgUrl": "string",
            "correctness": 0,
            "contents": [
              {
                "contentId": "string",
                "sequence": 0,
                "start": 0,
                "end": 0,
                "playAt": "BEFORE"
              }
            ]
          }
        )
      }
    }
  }
  trueAnswer(i,j,index){
    if(this.performanceDemands[i].question[j].answers[index].correctness === 0){
      this.performanceDemands[i].question[j].answers[index].correctness  = 100;
    }else{
      this.performanceDemands[i].question[j].answers[index].correctness = 0;
    }
  }
  addQuestion(j) {
    console.log("add querstion");
    // console.log(this.pdLists[j].question);
    // this.pdLists[j].question.push({
    //   questionName: "",
    //   answers: [
    //     {
    //       answer: ""
    //     }
    //   ],
    //   rightAnswer: 0
    // });

    // console.log(this.pdLists[j]);

    // waiyan's code start
    this.performanceDemands[j].question.push(
      {
        "name": "string",
        "description": "string",
        "question": "string",
        "allowedAttempts": 0,
        "questionType": "MCQ-OPTION",
        "pickMultiple": false,
        "viewType": "LIST",
        "contents": [
          {
            "contentId": "string",
            "sequence": 0,
            "start": 0,
            "end": 0,
            "playAt": "BEFORE"
          }
        ],
        "answers": [
          {
            "name": "string",
            "answer": "string",
            "imgUrl": "string",
            "correctness": 0,
            "contents": [
              {
                "contentId": "string",
                "sequence": 0,
                "start": 0,
                "end": 0,
                "playAt": "BEFORE"
              }
            ]
          }
        ]
      }
    )
    // waiyan's code end
  }
  addPd() {
    // this.pdLists.push({
    //   pdName: "",
    //   question: [
    //     {
    //       questionName: "",
    //       answers: [
    //         {
    //           answer: ""
    //         }
    //       ],
    //       rightAnswer: 0
    //     }
    //   ]
    // });
    // console.log(this.pdLists);
    this.performanceDemands.push(
      {

        pdName: "",
        question: [
          {
            "name": "string",
            "description": "string",
            "question": "string",
            "allowedAttempts": 0,
            "questionType": "MCQ-OPTION",
            "pickMultiple": false,
            "viewType": "LIST",
            "contents": [
              {
                "contentId": "string",
                "sequence": 0,
                "start": 0,
                "end": 0,
                "playAt": "BEFORE"
              }
            ],
            "answers": [
              {
                "name": "string",
                "answer": "string",
                "imgUrl": "string",
                "correctness": 0,
                "contents": [
                  {
                    "contentId": "string",
                    "sequence": 0,
                    "start": 0,
                    "end": 0,
                    "playAt": "BEFORE"
                  }
                ]
              }
            ]
          }
        ]
      }
    )
    console.log(this.performanceDemands);
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
        this.pdLists[i].question[j].answers.push({ answer: "" });
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
    console.log("open modal>",type)
    this.modelType = type;
    this.modalReference = this.modalService.open(content, { backdrop: 'static', keyboard: false, windowClass: 'modal-xl modal-inv d-flex justify-content-center align-items-center' });
    this.getAllContent();
  }
  answerOpenImgModal(content,type,i,j,index) {
    console.log("open modal>",type)
     this.pdIndex = i;
     this.questionIndex= j;
     this.answerIndex = index;
     console.warn(this.pdIndex, this.questionIndex, this.answerIndex);
    this.modelType = type;
    this.modalReference = this.modalService.open(content, { backdrop: 'static', keyboard: false, windowClass: 'modal-xl modal-inv d-flex justify-content-center align-items-center' });
    this.getAllContent();
  }

  //get all content
 getAllContent(){
   this.ImgArr=[];
   this.blockUI.start('Loading...');
   this._service.getContent(this.regionID)
    .subscribe((res: any) => {
      this.contentArr=res;
      
      for(var i=0;i<res.length;i++){
        if(res[i].type =='image/gif' || res[i].type=='image/png' || res[i].type=='image/jpeg'){
          this.ImgArr.push(res[i]);
        }
      }
      console.log(this.ImgArr)
      this.tempContentArr=this.ImgArr;
      this.blockUI.stop();
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
    console.log("dar")
    const file = event.target.files;
    this.blockUI.start('Loading...');
    this._service.loadImage(this.regionID, file)
      .subscribe((res: any) => {
        // this.contentArr=res.meta;
        // this.toastr.success('Successfully Content Upload.');
        this.getAllContent();
        console.log(res)
        setTimeout(() => {
          this.autoSelectedImg(res.meta);
        },300);
        this.blockUI.stop();
      }, err => {
        console.log(err);
        // this.toastr.error('Fail Content Upload.');
      });
    }
    
  autoResize(e){
      e.target.style.cssText = 'height:auto';
      e.target.style.height = e.target.scrollHeight + "px";
  }

  //autoselected img after img load
  autoSelectedImg(resturnobj){
    console.log(this.selectedImgArr)
    console.log(resturnobj)
    console.log(this.tempContentArr)
    for(var i=0;i<resturnobj.length;i++){
      for(var j=0;j<this.tempContentArr.length;j++){
        console.log(resturnobj[i]._id == this.tempContentArr[j]._id)
        console.log(resturnobj[i]._id)
        console.log(this.tempContentArr[j]._id)
        if(resturnobj[i]._id == this.tempContentArr[j]._id){
          this.onslectedImgDiv(j,this.tempContentArr[j]);
          // break;
        }
      }
    }
  }

  //mutiselect img
  onslectedImgDiv(i,img){
    console.log(i,img);
    console.log(this.modelType)
    const imgDiv: HTMLElement = document.getElementById('img-'+i);
    const circle: HTMLElement = document.getElementById('cricle'+i);
    const check: HTMLElement = document.getElementById('check'+i);
    const trash: HTMLElement = document.getElementById('trash'+i);
    const overlay: HTMLElement = document.getElementById('Imgoverlay'+i);
    if(this.modelType=="single"){
       //add selected 
       this.selectedImgArr=img;
        imgDiv.setAttribute("style","border:solid;color:#007fff;");
        circle.setAttribute("style","border: solid #007fff; border-radius: 50%;width: 16px; height: 16px;position: absolute;background: #007fff;margin-top: 8px;margin-left: 8px;z-index: 2;");
        check.setAttribute("style","color:white;");

        console.log(this.imgId)
        //remove selected
        if(this.imgId != undefined){
          const imgDiv2: HTMLElement = document.getElementById('img-'+this.imgId);
          const circle2: HTMLElement = document.getElementById('cricle'+this.imgId);
          const check2: HTMLElement = document.getElementById('check'+this.imgId);
          const trash2: HTMLElement = document.getElementById('trash'+this.imgId);
          const overlay2: HTMLElement = document.getElementById('Imgoverlay'+this.imgId);
          imgDiv2.setAttribute("style","border:none;");
          circle2.setAttribute("style","border: none; border-radius: 50%;width: 16px; height: 16px;position: absolute;background: none;margin-top: 8px;margin-left: 8px;z-index: 2;");
          check2.setAttribute("style","color:#ffffff00;");
          trash2.setAttribute("style","opacity: 0;")
          overlay2.setAttribute("style"," background: rgba(0, 0, 0, 0);")
        }
        console.log(this.imgId);
        this.imgId=i;
        
    }else{
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
        trash.setAttribute("style","opacity: 0;")
        overlay.setAttribute("style"," background: rgba(0, 0, 0, 0);")
        this.selectedImgArr.splice(this.selectedImgArr.indexOf(i),1)
        console.log(this.selectedImgArr);
      }
    }
   
  }



  onImgMouseEvent(e,i){
    const imgDiv: HTMLElement = document.getElementById('img-'+i);
    const trash: HTMLElement = document.getElementById('trash'+i);
    const overlay: HTMLElement = document.getElementById('Imgoverlay'+i);
    console.log(imgDiv.style.border)
    if(e.type == "mouseenter" && (imgDiv.style.border=="solid")){
      trash.setAttribute("style","opacity: 1;");
      overlay.setAttribute("style","display:block;  background: rgba(0, 0, 0, .3);")
    }else{
      trash.setAttribute("style","opacity: 0;")
      overlay.setAttribute("style"," background: rgba(0, 0, 0, 0);")
    }
    // console.log(e.type)
  }

  showSetting(){
    if (window.pageYOffset > 81) {      
       this.greterThan = true;
       this.lessThan = false;
       this.forElse = false;
    }
    else if(window.pageYOffset < 0){
      this.greterThan = false;
      this.lessThan = true;
      this.forElse = false;
    } else {   
      this.greterThan = false;
      this.lessThan = false;
      this.forElse = true;
    }
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
     this.performanceDemands[this.pdIndex].question[this.questionIndex].answers[this.answerIndex].imgUrl = this.selectedImgArr.url
     if(this.editableId != ""){
       var e = document.getElementById(this.editableId);
       e.innerHTML += ('<div id="img'+ this.editableId +'" class="row"></div>');
       var k = document.getElementById("img"+this.editableId);
       for(var i in this.selectedImgArr){
         console.log(this.selectedImgArr[i].url,'img');
         var url = this.selectedImgArr[i].url;
         console.log(url)
         // k.innerHTML += ('<div style="width: 120px;height: 120px;float:left;position:relative;background: #f2f4f5"><img style="width:100%;position:absolute;margin: auto;top:0;left:0;right:0;bottom:0;" src="'+url+'"></img><div>');
         k.innerHTML += ('<div class="col-md-4"><div class="innerD p-0"><img class="editableImg" src="'+url+'"></img></div></div>');
       }
     }   
     // e.innerHTML += ('<span class="tag">{'+field+'}<span onclick=removePlaceholder(this) class="remove">x</span></span>&nbsp;')
     // e.innerHTML += ('<div><img src="http://placekitten.com/200/300"></img><div>');
     this.cancelModal();
  }

  onremoveClick(id){
    console.log(id)
    this._service.onDeleteContent(this.regionID,id)
    .subscribe((res: any) => {
      console.log(res)
      // this.contentArr=res.meta;
       this.toastr.success('Successfully Content deleted.');
      this.getAllContent();
      setTimeout(() => {
        this.autoSelectedImg(res.meta);
        console.log(res.meta)
      },300);
    }, err => {
      console.log(err);
      this.toastr.error('Fail Content deleted.');
    });
    // this.onslectedImgDiv(i,img,"exitBorder");
  }
  
  onFocus(type,idx1,idx2,idx3){
    this.editableId = "";
    this.focusPlace = "";
    this.focusType.type = type;
    switch (type) {
      case "pd":
        this.focusPlace = 'pd' + idx1;
        this.focusType.no = idx1
        this.focusType.parentIdx = ""
        break;
      case "question":
        this.focusPlace = 'q' + idx1 + idx2;
        this.focusType.no = idx2;
        this.focusType.parentIdx = idx1
        this.editableId = 'q'+'-'+idx1+idx2;
        console.log(this.editableId)
        break;
      case "answer":
        this.focusPlace = 'a' + idx1 + idx2 + idx3;
        this.focusType.no = idx2;
        this.focusType.parentIdx = idx1
    }
    if(type  == 'answer'){
      this.answerTootipsOptions = true;
      this.answerTootips = idx1 + idx2 + idx3;
    }
    
  }
  hideTooltip(){
    // console.error('object');
    // this.answerTootipsOptions =false;
  }
  // closeDropdown(e,type){
  //   var divToHide = document.getElementById(this.editableId);
  //   if(e.target.parentNode != null){
  //     console.log("~~~hide tooltip");
  //     if(e.target.parentNode.id != divToHide){
  //       console.log("not same")
  //       this.focusPlace = '';
  //     }
  //   }
  // }

  // focusoutMethod(){
  //   console.log("~~~focusOut");
  // }
  pickMultipleAns(item){
    console.log(item);
    this.performanceDemands[this.focusType.parentIdx].question[this.focusType.no].pickMultiple = true;
    console.log(this.performanceDemands)
  }

  cancelConcept(){
    this.conceptCreate = false;
    this.testWerkzCategory =false;
    this.conceptList = true;
    this.pdLists = [];
    this.concept = {};
  }
}
