import { Input } from '@angular/core';
// import { AppComponent } from "./../../app.component";
import { Component, OnInit, HostListener } from "@angular/core";
import { TargetLocator, promise } from "selenium-webdriver";
import { pd } from "./apg";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DragulaService, DragulaModule } from 'ng2-dragula';
import { ToastsManager } from 'ng5-toastr/ng5-toastr';
import { type } from "os";
import { appService } from "../../service/app.service";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { c } from "@angular/core/src/render3";
import { createWhile } from "typescript";
import { BoundCallbackObservable } from "rxjs/observable/BoundCallbackObservable";
import { nsend } from 'q';

// declare var upndown:any;
var Promise = require("bluebird");
const async = require("async")  
var upndown = require("upndown");
var TurndownService = require("turndown").default;

declare var $: any;
@Component({
  selector: "app-testwerkz",
  templateUrl: "./testwerkz.component.html",
  styleUrls: ["./testwerkz.component.css"]
})
export class TestwerkzComponent implements OnInit {
  public answerType = "radio";
  // public id1:any;
  // public id2:any;
  // public id3:any;
  // Component
  public answerSymbols = ["a", "b", "c", "d", "e", "f", "g", "h"];
  public imagePath = "../../../assets/img/answerIcon/";
  public answerSymbolSVG = "Choice_reverse.svg";
  public answerSymbolReverseSVG = "Choice.svg";
  public answerTootips: any;
  public pdIndex: any;
  public questionIndex: any;
  public answerIndex: any;
  public greterThan = false;
  public lessThan = false;
  public forElse = false;
  public showSettingSidebar = false;
  public isGlobal = false;
  public modelType: any;
  public testWerkzCategory = false;
  public conceptCreate = false;
  public conceptEdit = false;
  public isUpdate = false;
  public conceptList = true;
  public isfocus = false;
  public item: any = {};
  public editValue: any;
  public ischecked: any;
  public tagID:any;
  public goBackCat = false;
  public wordLength: any;
  public navIsFixed: boolean = false;
  public iseditfocus = false;
  public otherfocus = false;
  public isEditComplete: boolean = false;
  public isRemove: boolean = false;
  public translateToMarkDown: string;
  public testVar = "";
  public placeholderVar = "Enter Questions";
  public pd: pd = new pd();
  public pdLists: any[];
  public isDrop : boolean=false;
  public toolBarOptions = {
    toolbar: { buttons: ["bold", "italic", "underline", "image"] },
    static: true,
    relativeContainer: "app-testwerkz",
    align: "center",
    sticky: false,
    updateOnEmptySelection: false
  };

  public tagWerkz = {
    name: ""
  };
  public modalReference: any;
  public contentArr: any=[];
  public classCreate= false;
  public regionID = localStorage.getItem('regionId');
  public tagsWerkzList = []
  public tempContentArr:any =[];
  public selectedImgArr:any =[];
  public ImgArr:any =[];
  public imgIdArr:any =[];
  public imgId:any;
  public clickType: boolean=false;
  public editableId:any = "";
  private fileList : any = [];
  private invalidFiles : any = [];
  public ptest:any =[];
  public concept = {
    "name":''
  };
  public clickEle: any = "";
  // public focusType = {
  //   'type': "",
  //   'no': "",
  //   'parentIdx': ""
  // };
  public focusType: any = {};
  public focusPlace: any;
  public conceptsObj:any={};
  @BlockUI() blockUI: NgBlockUI;

  constructor(
    private _service: appService,
    private modalService: NgbModal,
    private dragulaService: DragulaService,
    public toastr: ToastsManager
  ) {
    
  }

  // waiyan's code start

  public performanceDemands = [];
  // waiyan's code end

  ngOnInit() {
    // this.testing()
    console.log(Promise);
    var turndownService = new TurndownService();
    // for div
    turndownService.addRule("Tada", {
      filter: "div",
      replacement: function(content) {
        return content + "";
      }
    });
    if (window.innerWidth > 1366) {
      this.classCreate = true;
    }
    if (window.innerWidth <= 1366) {
      this.classCreate = false;
    }

    console.log(this.pdLists);
  }
  @HostListener("click", ["$event.target"]) onClick($event) {
    console.log("click");
    console.log($event);
    this.clickEle = $event;
  }

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    if (window.innerWidth > 1366) {
      this.classCreate = true;
    }
    if (window.innerWidth <= 1366) {
      this.classCreate = false;
    }
  }

  @HostListener("window:scroll", ["$event"]) onScroll($event) {
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
      $(".setting-sidebar").css({ top: 65 });
      this.greterThan = true;
      this.lessThan = false;
      this.forElse = false;
    } else if (window.pageYOffset < 0) {
      this.greterThan = false;
      this.lessThan = true;
      this.forElse = false;
      $(".setting-sidebar").css({ top: 165 });
    } else {
      this.greterThan = false;
      this.lessThan = false;
      this.forElse = true;
      $(".setting-sidebar").css({ top: 165 });
    }
  }

  createTagWerkz(item) {
    this.isfocus = !this.isfocus;
    console.log(item);
    this._service.createTagWerkz(this.regionID, item).subscribe(
      (res: any) => {
        console.log(res);
        this.tagWerkz = {
          name: ""
        };
        this.getAllTag();
      },
      err => {
        console.log(err);
      }
    );
  }

  goToTestWerkz() {
    this.testWerkzCategory = true;
    this.conceptList = false;
    this.getAllTag();
    this.addPd();
    this.showSettingSidebar = false;
  }

  getAllTag() {
    this.blockUI.start("Loading");
    this._service.getAllTags(this.regionID).subscribe(
      (res: any) => {
        console.log(res);
        this.tagsWerkzList = res;
        setTimeout(() => {
          this.blockUI.stop();
        }, 300);
      },
      err => {
        console.log(err);
      }
    );
  }
  updateTagWerkz(data) {
    console.log("Update Category", data, data._id);
    this.iseditfocus = false;
    // this.isEditComplete = false;
    let obj = {
      name: data.name
    };
    this.editValue = "";
    this._service.updateTagsWerkz(this.regionID, data._id, obj).subscribe(
      (res: any) => {
        console.log(res);
        this.getAllTag();
        this.tagWerkz = {
          name: ""
        };
      },
      err => {
        console.log(err);
      }
    );
  }
  focusMethod(e, status, word) {
    this.wordLength = word.length;
    if (status == "name") {
      $(".limit-type-wordcount").show("slow");
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
    $(".limit-type-wordcount").hide("slow");
    $(".limit-word").hide("slow");
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
      name: ""
    };
    this.getAllTag();
  }

  somethingChanged(val, name) {
    console.log("hi", val);
    this.conceptCreate = true;
    this.testWerkzCategory = false;
    this.ischecked = val;
    this.tagID = val;
    // localStorage.setItem("categoryID", val);
    // localStorage.setItem("categoryName", name);
    // setTimeout(() => {
    //   console.log("--waiting--")
    //   this.goBackCat = true;
    // }, 300);
  }

  backToList() {
    this.conceptList = true;
    this.conceptCreate = false;
    this.testWerkzCategory = false;
    this.conceptEdit=false;
  }
  backToTestWerkz() {
    this.conceptList = false;
    this.conceptCreate = false;
    this.testWerkzCategory = true;
    this.conceptEdit=false;
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
  onKeydown(e, i, j, index) {
    var answerIndex = index
    var newAnswerFoucs=  String(i.toString() + j.toString() + String(++answerIndex ))
    var deleteAnswerFocus=  String(i.toString() + j.toString() + String(answerIndex - 2))
    if (e.key === "Enter") {
      if (this.performanceDemands[i].question[j].answers.length < 8) {
        // this.pdLists[i].question[j].answers.push({
        //   answer: "",
        //   rightAnswer:false
        // })

        this.performanceDemands[i].question[j].answers.push({
          name: "",
          answer: "",
          imgUrl: "",
          correctness: 0,
          showTooltip: false,
          contents: [
            {
              contentId: "",
              sequence: 0,
              start: 0,
              end: 0,
              playAt: "BEFORE"
            }
          ]
        });
      }
      if(index < 7){
        var answerId = `answer${newAnswerFoucs}` ;
        setTimeout(() => {
          document.getElementById(answerId).focus();
        }, 10);
      }

    }

    if(e.key == 'Backspace'){
      var selectedAnswer = this.performanceDemands[i].question[j].answers[index].answer;

      if(this.performanceDemands[i].question[j].answers.length > 1 ){
        if(selectedAnswer == '' || selectedAnswer == undefined || selectedAnswer == null || selectedAnswer.length <= 0){
          this.performanceDemands[i].question[j].answers.splice(index, 1)

          if(index >= 1){
            var answerId = `answer${deleteAnswerFocus}` ;
            setTimeout(() => {
              document.getElementById(answerId).focus();
            }, 10);
          }
        }
      }
    }
  }
  trueAnswer(i, j, index, answer) {
    if (
      this.performanceDemands[i].question[j].answers[index].correctness === 0
    ) {
      this.performanceDemands[i].question[j].answers[index].correctness = 100;
    } else {
      this.performanceDemands[i].question[j].answers[index].correctness = 0;
    }
    this.onFocus('check',i,j,index);
  }

  trueAnswerRadio(i, j, index, answer) {
    console.log(this.performanceDemands);
    const dataArray = this.performanceDemands[i].question[j];
    dataArray.answers.map(answer => (answer.correctness = 0));
    // console.log( JSON.stringify(dataArray));
    dataArray.answers[index].correctness = 100;
    this.onFocus('check',i,j,index);
    // console.log( JSON.stringify(dataArray));
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
    this.performanceDemands[j].question.push({
      name: "",
      description: "",
      question: "",
      allowedAttempts: 0,
      questionType: "MCQ-OPTION",
      pickMultiple: false,
      viewType: "LIST",
      contents: [
        {
          contentId: "",
          sequence: 0,
          start: 0,
          end: 0,
          playAt: "BEFORE"
        }
      ],
      answers: [
        {
          name: "",
          answer: "",
          imgUrl: "",
          correctness: 0,
          showTooltip: false,
          contents: [
            {
              contentId: "",
              sequence: 0,
              start: 0,
              end: 0,
              playAt: "BEFORE"
            }
          ]
        }
      ]
    });
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
    this.performanceDemands.push({
      pdName: "",
      showTooltip: false,
      contentsArr: [],
      question: [
        {
          name: "",
          description: "",
          question: "",
          allowedAttempts: 0,
          questionType: "MCQ-OPTION",
          pickMultiple: false,
          viewType: "LIST",
          contents: [
            {
              contentId: "",
              sequence: 0,
              start: 0,
              end: 0,
              playAt: "BEFORE"
            }
          ],
          answers: [
            {
              name: "",
              answer: "",
              imgUrl: "",
              correctness: 0,
              showTooltip: false,
              contents: [
                {
                  contentId: "",
                  sequence: 0,
                  start: 0,
                  end: 0,
                  playAt: "BEFORE"
                }
              ]
            }
          ]
        }
      ]
    });
    console.log(this.performanceDemands);
  }

  onClickEditor(t) {}
  onInput(content, event, editableId, focusType, i?, j?) {
    if (
      $(this.clickEle).parents(".img-wrapper").length > 0 ||
      $(this.clickEle).hasClass("img-wrapper")
    ) {
      if(event.inputType == "deleteContentBackward")
        document.execCommand("undo", false);
      if(event.inputType == "insertText")
        document.execCommand("undo", false);
      if (event.inputType == "insertParagraph") {
        var thisDiv =  $(this.clickEle).hasClass("img-wrapper") || $(this.clickEle).parents(".img-wrapper");
        if($(this.clickEle).hasClass("img-wrapper")){
          thisDiv =  this.clickEle;
        }
        var tempDiv = document.createElement("div");
        var tempBr = document.createElement("br");
        $(tempDiv).append(tempBr);
        $(thisDiv).after(tempDiv)
        document.execCommand("undo", false);
        var range = document.createRange(),
        sel = window.getSelection();
        range.setStart(tempDiv, 0);
        range.setEnd(tempDiv, 0);
        sel.removeAllRanges();
        sel.addRange(range);
        this.clickEle = tempDiv;
      }
    }
    $(content)
      .contents()
      .eq("0")
      .filter(function() {
        return this.nodeType != 1;
      })
      .wrap("<div />");

    console.log(event);
    var $focused = $(":focus");
    console.log($focused);
    // console.log(ele);
    // console.log(type);
    // console.log(window.getSelection().getRangeAt(0))
    // console.log(event)
    // console.log($(window.getSelection().focusNode).children("img"));
    // if ($(window.getSelection().focusNode).children("img").length > 0) {

    // if(event.type != "deleteContentBackward"){
    //   // this.modalService.open(content, { backdropClass: "light-blue-backdrop" });
    //   // imgTag.attr('src','second.jpg');
    //   this.modalReference = this.modalService.open(content, { backdrop: 'static', keyboard: false, windowClass: 'modal-xl modal-inv d-flex justify-content-center align-items-center' });
    //   this.getAllContent();

    // }
    this.turn(editableId,focusType)
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
  // if (event.inputType == "insertParagraph") {
  //   if (type == "answer") {
  //     this.pdLists[i].question[j].answers.push({ answer: "" });
  //   }

  // }
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

  resizeImage(ele) {
    console.log(ele);
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
  openImgModal(content, type) {
    console.log("open modal>", type);
    this.modelType = type;
    this.modalReference = this.modalService.open(content, {
      backdrop: "static",
      keyboard: false,
      windowClass:
        "modal-xl modal-inv d-flex justify-content-center align-items-center"
    });
    this.getAllContent();
  }
  answerOpenImgModal(content, type, i, j, index) {
    console.log("open modal>", type);
    this.pdIndex = i;
    this.questionIndex = j;
    this.answerIndex = index;
    this.modelType = type;
    this.modalReference = this.modalService.open(content, {
      backdrop: "static",
      keyboard: false,
      windowClass:
        "modal-xl modal-inv d-flex justify-content-center align-items-center"
    });
    this.getAllContent();
  }

  
  cancelModal() {
    this.modalReference.close();
    this.selectedImgArr = [];
    this.imgIdArr = [];
    this.imgId = undefined;
  }

  /** ************** *** ************** *** **************  start Image Gallery Modal*** ************** *** ************** *** ************** *** ************** */
  //get all content
  getAllContent() {
    this.ImgArr = [];
    this.blockUI.start("Loading...");
    return new Promise((resolve, reject) => {
      this._service.getContent(this.regionID).subscribe(
        (res: any) => {
          this.contentArr = res;

          for (var i = 0; i < res.length; i++) {
            if (
              res[i].type == "image/gif" ||
              res[i].type == "image/png" ||
              res[i].type == "image/jpeg"
            ) {
              this.ImgArr.push(res[i]);
            }
          }
          this.tempContentArr = this.ImgArr;

          console.log(this.ImgArr);

          resolve();
          this.blockUI.stop();
        },
        err => {
          console.log(err);
        }
      );
    });
  }

  //image upload
  onloadImg(event){
    console.log("hello",this.isDrop)
    console.log("dar",event)
    if(this.isDrop){
      var file = event;
      this.isDrop=false;
    }else{
      var file = event.target.files;
    }
    console.log(file)
    this.blockUI.start('Loading...');
    this._service.loadImage(this.regionID, file)
      .subscribe((res: any) => {    
        //getAllContent() use pormise because of html create value after use in ts    
        this.getAllContent().then(()=>{
          console.log("here me>",res);
          setTimeout(() => {
            this.autoSelectedImg(res.meta);
          }, 300);
        });
        this.blockUI.stop();
      },
      err => {
        console.log(err);
      });
    }

  //this is use for autoselected when upload finish or deleted finsih (this is only selected previous selection image after upload)
  autoSelectedImg(resturnobj) {
    console.log(this.modelType);
    console.log(this.selectedImgArr);
    for (var i = 0; i < resturnobj.length; i++) {
      for (var j = 0; j < this.tempContentArr.length; j++) {
        if (resturnobj[i]._id == this.tempContentArr[j]._id) {
          this.onslectedImgDiv(
            this.tempContentArr[j]._id,
            this.tempContentArr[j]
          );
          // break;
        }
      }
    }
  }

  //selected image use with css 
  //when image selected from gallery modal this is storage selected value or unselected when remove selected value(single or multiple)
  onslectedImgDiv(i,img){
    console.log(this.isRemove,"is remove",i);

    const imgDiv: HTMLElement = document.getElementById('img-'+i);
    const circle: HTMLElement = document.getElementById('cricle'+i);
    const check: HTMLElement = document.getElementById('check'+i);
    const trash: HTMLElement = document.getElementById('trash'+i);
    const trashdiv: HTMLElement = document.getElementById('trashdiv-'+i);
    
    if (this.modelType == "single") {
      console.log("is single", this.imgId);
      //add selected
      if (!this.isRemove) {
        this.selectedImgArr = img;
        this.imgIdArr = i;
        if (this.imgId != undefined && this.imgId != i) {
          this.removerSelected(this.imgId);
          imgDiv.setAttribute("style", "border:solid;color:#007fff;");
          circle.setAttribute(
            "style",
            "border: solid #007fff; border-radius: 50%;width: 16px; height: 16px;position: absolute;background: #007fff;margin-top: 8px;margin-left: 8px;z-index: 2;"
          );
          trashdiv.setAttribute("style","display:block;");
          check.setAttribute("style", "color:white;");
          this.ischecked = true;
        } else {
          if (imgDiv.style.border == "solid") {
            this.removerSelected(this.imgId);
          } else {
            imgDiv.setAttribute("style", "border:solid;color:#007fff;");
            circle.setAttribute(
              "style",
              "border: solid #007fff; border-radius: 50%;width: 16px; height: 16px;position: absolute;background: #007fff;margin-top: 8px;margin-left: 8px;z-index: 2;"
            );
            check.setAttribute("style", "color:white;");
            trashdiv.setAttribute("style","display:block;")
          }
        }
        this.imgId = i;
      }
    } else {
      console.log(this.imgIdArr.includes(i));
      console.log(this.imgIdArr);
      if (this.isRemove) {
        console.log("is remove");
        this.selectedImgArr.splice(this.selectedImgArr.indexOf(i), 1);
        this.imgIdArr.splice(this.imgIdArr.indexOf(i), 1);
        this.autoImgLoop(this.imgIdArr);
        this.isRemove = false;
      } else {
        console.log(this.imgIdArr.includes(i));
        if (this.imgIdArr.includes(i)) {
          console.log("is remove seleccted");
          this.removerSelected(i);
        } else {
          console.log("else");
          this.imgIdArr.push(i);
          this.selectedImgArr.push(img);
          this.autoImgLoop(this.imgIdArr);
        }
      }
    }
    this.isRemove=false;
    console.log(this.imgIdArr)
  }

  //this is remove for image selected from gallery modal (this method can slected multiple or single)
removerSelected(i){
  console.log(this.selectedImgArr , i)
  const imgDiv3: HTMLElement = document.getElementById('img-'+i);
  const circle3: HTMLElement = document.getElementById('cricle'+i);
  const check3: HTMLElement = document.getElementById('check'+i);
  const trash3: HTMLElement = document.getElementById('trash'+i);
  const overlay3: HTMLElement = document.getElementById('Imgoverlay'+i);
  const trashdiv: HTMLElement = document.getElementById('trashdiv-'+i);
  imgDiv3.setAttribute("style","border:none;");
  circle3.setAttribute("style","border: none; border-radius: 50%;width: 16px; height: 16px;position: absolute;background: none;margin-top: 8px;margin-left: 8px;z-index: 2;");
  check3.setAttribute("style","color:#ffffff00;");
  trash3.setAttribute("style","opacity: 0;")
  overlay3.setAttribute("style"," background: rgba(0, 0, 0, 0);");
  trashdiv.setAttribute("style","display:none")
    if(this.modelType == 'single'){
      this.selectedImgArr=[];
      this.imgIdArr=[];

      // this.imgId=undefined;
      console.log(this.imgId)

      // if(String(this.imgId)== i){
      //   this.imgId=undefined;
      //   console.log("hrerer",this.imgId)
      // }
    }else{
      this.selectedImgArr.splice(this.selectedImgArr.indexOf(i),1)
      this.imgIdArr.splice(this.imgIdArr.indexOf(i),1)
    }

}

//this is use for selected image value loop
autoImgLoop(arr){
  console.log(arr);
  for(var i=0;i<arr.length;i++){
    const imgDiv: HTMLElement = document.getElementById('img-'+arr[i]);
    const circle: HTMLElement = document.getElementById('cricle'+arr[i]);
    const check: HTMLElement = document.getElementById('check'+arr[i]);
    const trash: HTMLElement = document.getElementById('trash'+arr[i]);
    const overlay: HTMLElement = document.getElementById('Imgoverlay'+arr[i]);
    const trashdiv: HTMLElement = document.getElementById('trashdiv-'+arr[i]);
      console.log(imgDiv)
      console.log(circle);
      console.log(check)
      imgDiv.setAttribute("style","border:solid;color:#007fff;");
      circle.setAttribute("style","border: solid #007fff; border-radius: 50%;width: 16px; height: 16px;position: absolute;background: #007fff;margin-top: 8px;margin-left: 8px;z-index: 2;");
      check.setAttribute("style","color:white;");
      trashdiv.setAttribute("style","display:block")
      console.log(arr[i]);
    }
  }

  //when over image from galery modal mouse over or mouse out
  onImgMouseEvent(e,i){
    const imgDiv: HTMLElement = document.getElementById('img-'+i);
    const trash: HTMLElement = document.getElementById('trash'+i);
    const overlay: HTMLElement = document.getElementById('Imgoverlay'+i);
 
    if(e.type == "mouseenter" && (imgDiv.style.border=="solid")){
      trash.setAttribute("style","opacity: 1;");
      overlay.setAttribute("style","display:block;  background: rgba(0, 0, 0, .3);")
    }else{
      trash.setAttribute("style","opacity: 0;")
      overlay.setAttribute("style"," background: rgba(0, 0, 0, 0);")
    }
    // console.log(e.type)
  }

  //delete image
  onremoveClick(id){
    console.log(id)
    this.isRemove=true;
    this._service.onDeleteContent(this.regionID,id)
    .subscribe((res: any) => {
      console.log(res)
      // this.contentArr=res.meta;
       this.toastr.success('Successfully Content deleted.');
       //getAllContent() use pormise because of html create value after use in ts    
       this.getAllContent().then(()=>{
        console.log("here me>",res);
        setTimeout(() => {
          console.log(this.selectedImgArr)
          console.log(this.imgIdArr)
          if(this.modelType == "multiple"){
            this.autoImgLoop(this.imgIdArr)
          }else{
            this.imgId=undefined
          }
          
        }, 300);
      })
    }, err => {
      console.log(err);
      this.toastr.error('Fail Content deleted.');
    });
    // this.onslectedImgDiv(i,img,"exitBorder");
  }
/** ************** *** ************** *** **************  end Image Gallery Modal*** ************** *** ************** *** ************** *** ************** */


  // testing(){
  //   console.log('console')
  //   new Promise(function(resolve, reject) {
  //       resolve('foo');
  //   }).catch();
  // }

  // testin(){
  //   this.testing().then(res=>{

  //   })
  // }
  

  autoResize(e) {
    e.target.style.cssText = "height:auto";
    e.target.style.height = e.target.scrollHeight + "px";
  }


  
  showSetting() {
    if (window.pageYOffset > 81) {
      this.greterThan = true;
      this.lessThan = false;
      this.forElse = false;
    } else if (window.pageYOffset < 0) {
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
  closeSetting() {
    console.log("object");
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

  insertImg() {
    console.log(this.selectedImgArr);
    console.log("editableID", this.editableId);
    if (this.editableId != "") {
      console.log("question ===== insert img");
      var e = document.getElementById(this.editableId);
      
      e.innerHTML +=
        '<div id="img' +
        this.editableId +
        '" class="row img-wrapper"  dragula="' +
        this.editableId +
        '"></div>';
      var k = document.getElementById("img" + this.editableId);
      for (var i in this.selectedImgArr) {
        // console.log(this.selectedImgArr[i].url, "img");
        var url = this.selectedImgArr[i].url;
        // console.log(url);
        // k.innerHTML += ('<div style="width: 120px;height: 120px;float:left;position:relative;background: #f2f4f5"><img style="width:100%;position:absolute;margin: auto;top:0;left:0;right:0;bottom:0;" src="'+url+'"></img><div>');
        k.innerHTML +=
          '<img class="editableImg" src="' +
          url +
          '"></img>';
       
        
      }
      var imgsLength =  $(e).children(".img-wrapper").children("img").length;
      if(imgsLength % 3 == 0){
        console.log(e)
      }else{
        var marginOfFirst = Number($($(e).children(".img-wrapper").children("img")[0]).css('margin-left').replace("px",""))
        console.log($($(e).children(".img-wrapper").children("img")[0]).css('margin-left'))
        if(imgsLength % 3 ==1){
          var lastimg = $($(e).children(".img-wrapper").children("img")[--imgsLength])
          lastimg.css('margin-left' , marginOfFirst)
          lastimg.css('margin-right' , marginOfFirst)
        }
        if(imgsLength % 3 ==2){
          var lastEle = $($(e).children(".img-wrapper").children("img")[--imgsLength])
          var beforeLast = $($(e).children(".img-wrapper").children("img")[--imgsLength]);
          lastEle.css('margin-left' , marginOfFirst)
          lastEle.css('margin-right' , marginOfFirst)
          beforeLast.css('margin-left' , marginOfFirst)
          beforeLast.css('margin-right' , marginOfFirst)
        }
      }
      $('.editableImg').css('margin-top','10px')
      $('.editableImg').css('margin-bottom','10px')

      setTimeout(function(){
        console.log($(k).children(".editableImg"))
        $(k).children(".editableImg").each(function(i,e) {
          console.log($(e).height());
          var imgWidth = $(e).width()
          var imgHeight = $(e).height()
          var maxWidthAndHeight = 120;
          console.log(imgWidth,imgHeight)
          if(imgHeight < maxWidthAndHeight){
            var res = maxWidthAndHeight - imgHeight;
            console.log(res);
            $(e).css('padding-top', res/2)
            $(e).css('padding-bottom', res/2)

          }
          if(imgWidth < maxWidthAndHeight){
            console.log("less than 120")
            var res = maxWidthAndHeight - imgWidth;
            console.log(res);
            $(e).css('padding-left', res/2)
            $(e).css('padding-right', res/2)
          }
        });
      },100)
      this.turn(this.editableId,this.focusType)
    } else if (this.modelType == "single") {
      console.log("answer === ");
      this.performanceDemands[this.pdIndex].question[
        this.questionIndex
      ].answers[this.answerIndex].imgUrl = this.selectedImgArr.url;
    } else {
      console.log("pd Insert Img======");
      var contArr = this.performanceDemands[this.focusType.no].contentsArr;
      Array.prototype.push.apply(contArr,this.selectedImgArr); 
    }
    // e.innerHTML += ('<span class="tag">{'+field+'}<span onclick=removePlaceholder(this) class="remove">x</span></span>&nbsp;')
    // e.innerHTML += ('<div><img src="http://placekitten.com/200/300"></img><div>');
    this.cancelModal();
  }

  
  onFocus(type, idx1, idx2, idx3) {
    this.editableId = "";
    this.focusPlace = "";
    this.answerTootips = "";
    this.focusType.type = type;
    this.showSetting();
    switch (type) {
      case "pd":
        this.focusPlace = "pd" + idx1;
        this.focusType.no = idx1;
        this.focusType.parentIdx = "";
        this.performanceDemands[idx1].showTooltip = true;
        break;
      case "question":
        this.focusPlace = "q" + idx1 + idx2;
        this.focusType.no = idx2;
        this.focusType.parentIdx = idx1;
        this.editableId = "q" + "-" + idx1 + idx2;
        console.log(this.editableId);
        // this.performanceDemands[idx1].question[idx2].showTooltip = true;
        break;
      case "check":
        this.focusPlace = "a" + idx1 + idx2 + idx3;
        this.focusType.no = idx2;
        this.focusType.parentIdx = idx1;
        if(type == 'check'){
          this.focusType.type = 'answer';
        }
        break;
      case "answer":
        this.focusPlace = "a" + idx1 + idx2 + idx3;
        this.focusType.no = idx2;
        this.focusType.parentIdx = idx1;
    }
    if (type == "answer") {
      // this.answerTootipsOptions = true;
      this.performanceDemands[idx1].question[idx2].answers[
        idx3
      ].showTooltip = true;
    }
  }
  hideTooltip(hideTooltip, type, idx1, idx2, idx3) {
    if (hideTooltip == "hideTooltip") {
      setTimeout(() => {
        if (type == "answer") {
          this.performanceDemands[idx1].question[idx2].answers[
            idx3
          ].showTooltip = false;
        } else if (type == "question") {
          // this.performanceDemands[idx1].question[idx2].showTooltip = false;
        } else {
          this.performanceDemands[idx1].showTooltip = false;
          console.log("object");
        }
      }, 150);
    }
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
  // pickMultipleAns(item){
  //   console.log(item);
  //   this.performanceDemands[this.focusType.parentIdx].question[this.focusType.no].pickMultiple = !this.performanceDemands[this.focusType.parentIdx].question[this.focusType.no].pickMultiple;
  //   console.log(this.performanceDemands)
  //   if(this.performanceDemands[this.focusType.parentIdx].question[this.focusType.no].pickMultiple == true){
  //     this.answerType = 'checkbox'
  //   }else{
  //     this.answerType = 'radio'
  //   }
  // }
  pickMultipleAns(item) {
    const dataArray = this.performanceDemands[this.focusType.parentIdx]
      .question[this.focusType.no];
    var isMultiSelect = dataArray.pickMultiple;
    isMultiSelect = !isMultiSelect;
    this.performanceDemands[this.focusType.parentIdx].question[
      this.focusType.no
    ].pickMultiple = !this.performanceDemands[this.focusType.parentIdx]
      .question[this.focusType.no].pickMultiple;
    if (
      this.performanceDemands[this.focusType.parentIdx].question[
        this.focusType.no
      ].pickMultiple == true
    ) {
      this.answerType = "checkbox";
    } else {
      this.answerType = "radio";
    }
    console.log(dataArray);
    dataArray.answers.map((answer, i) => (answer.correctness = 0));
  }

  delete(itemType) {
    console.log("delete type", itemType);
    if (itemType.type == "pd") {
      if (this.performanceDemands.length > 1) {
        this.performanceDemands.splice(itemType.no, 1);
      }
    } else if (itemType.type == "question" || itemType.type == "answer") {
      if (this.performanceDemands[itemType.parentIdx].question.length > 1) {
        this.performanceDemands[itemType.parentIdx].question.splice(
          itemType.no,
          1
        );
      }
    }
    this.focusType = {};
    this.showSettingSidebar = false;
  }

  cancelConcept() {
    this.conceptCreate = false;
    this.testWerkzCategory = false;
    this.conceptList = true;
    this.performanceDemands = [];
    this.concept = {
      "name":''
    };
    this.focusType = {};
    this.ischecked = "";
  }
// HSYL code
  inputQuestion(quesId,type){
    console.log("event",quesId)
    this.turn(quesId,type)
  }

  //get html tag in div
  turn(qId,fType){
    var markdownQues:any;
    // console.log("qId~~~",qId,fType)
    var myDiv = document.getElementById(qId);
    // console.log("myD",myDiv.innerHTML)
    setTimeout(()=>{
      var turndownService = new TurndownService();
      turndownService.addRule('Tada', {
        filter:'div',
        replacement: function (content) {
          return  content + ''
        }
      })
      markdownQues = turndownService.turndown(myDiv);
      console.log("turn to markdown",markdownQues);
      this.performanceDemands[fType.parentIdx].question[fType.no].question = markdownQues;
      console.log("performanceDemands",this.performanceDemands);
    },200)
  }

  removePDImg(img){
    console.log("Delete Img",img)

  }
  // HSYL code

// waiyan's code start
  createConcept() {
    console.log("---------------------");
    console.log(this.performanceDemands);
    console.log("---------------------");
    this.blockUI.start('Loading...')
    async.map(this.performanceDemands, this.pdLoop.bind(null, this), this.pdLoopDone.bind(null, this));
    setTimeout(() => {
      this.blockUI.stop()
    }, 300);
  }
  createQuestions(_this, pd, question, callback) {
    console.log("_THIS QUESTION", _this, pd);
    console.log("_THIS QUESTION", pd);
    console.log("_THIS QUESTION", _this);
    // Update quesiton object and pass it to api
    const testArr = [];
    const questionFormat = {
      name: "",
      description: "",
      question: "",
      allowedAttempts: 0,
      questionType: "MCQ-OPTION",
      viewType: "LIST",
      contents: [],
      answers: [
        {
          name: "",
          answer: "",
          imgUrl:
            "https://brainlitz-dev.s3.ap-southeast-1.amazonaws.com/development/stgbl-cw1/contents/image/155245147905155934231download%20%281%29.jpeg",
          correctness: 100,
          contents: []
        }
      ]
    };
    question.answers.map(answer => {
      var tempObj ={
        "name":'',
        "answer":'',
        "correctness":0,
        "contents":[]
      }
      tempObj.name = answer.name
      tempObj.answer = answer.answer
      tempObj.correctness = answer.correctness
      console.log(tempObj)
      testArr.push(tempObj)
      console.log(testArr)
    })
    questionFormat.answers = testArr
    questionFormat.question = question.question;
    _this._service.createPDQuestion(_this.regionID, questionFormat).subscribe(
      res => {
        console.log(res);
        var questionId = JSON.parse(JSON.stringify(res));

        console.log(questionId.meta._id);
        callback(null, questionId.meta._id);
      },
      err => {
        console.log(err);
      }
    );
  }

  pdLoop(_this, pd, pdCallback) {
    // API CALL 
    // Question Creatoion Loop
    console.log("THIS", _this);
    async.map(pd.question, _this.createQuestions.bind(null, _this, pd), _this.createQuesitonsDone.bind(null, pd, _this, pdCallback));
    // After ASYNC, pd.quesitons
  }

  createQuesitonsDone(pd, _this, pdCallback, error, questionIds) {
    // const questionIds = questionIds;
    console.log(pd.contentsArr);
    const formattedQuestionIDs = questionIds.map(id => ({ questionId: id }) );
  
    _this.creationPDProcess(_this, pd, formattedQuestionIDs, pdCallback)
    
  }
    
  creationPDProcess(_this, pd, formattedQuestionIDs, pdCallback) {
    // Create PD
    let pdCreateFormat = {
      "name": "string",
      "questions": [],
      "contents": [],
    }
    const tempContentArray = [];
    pd.contentsArr.map( (contentObj,index) => {
      var tempContentObj = {
        "contentId" : '',
        "sequence": 0,
      }
      tempContentObj.contentId = contentObj._id
      tempContentObj.sequence = ++index;
      tempContentArray.push(tempContentObj)
    })
    // Get pd.questions
    pdCreateFormat.questions = formattedQuestionIDs;
    pdCreateFormat.name = pd.pdName;
    pdCreateFormat.contents = tempContentArray;
    // OR
    // pd.name = string",
    // pd.description = string",

    _this._service.createPD(_this.regionID, pdCreateFormat).subscribe(
      res => {
        const createdPdId = JSON.parse(JSON.stringify(res));

        console.log(createdPdId.meta._id);
        pdCallback(null, createdPdId.meta._id);
      },
      err => {
        console.log(err);
      }
    );
  }

  //file drop method for valids
  onFilesChange(fileList : Array<File>){
    console.log(fileList.length)
    if(fileList.length !=0){
      this.isDrop=true
      this.fileList = fileList;
      this.onloadImg(fileList);  //file upload call api
      console.log("exit1",this.fileList)
    }
  }

  //file drop method for invalids
  onFileInvalids(fileList : Array<File>){
    this.invalidFiles = fileList;
  }

  creationConceptProcess(formattedPdIds, hello) {
    // Create Concept
    // var moduleId = localStorage.getItem('moduleID')
    console.log('this',hello)
    const conceptFormat = {
      // "moduleId": moduleId,
      "name": this.concept.name,
      "tag": [
        {
          "tagId": this.tagID
        }
      ],
      "pd": [],
      "contents": [
      ]
    }

    conceptFormat.pd = formattedPdIds;
    this._service.createConcept(this.regionID, conceptFormat).subscribe(res => {
      console.log("FINALLY", res);
      this.cancelConcept();
    },err=>{
      console.log("err")
    });
  }

  pdLoopDone(_this, error, pdIds) {
    if (error) {
      console.error("Error in pdLoopDone", error);
      return;
    }
    const formattedPdIds = pdIds.map((id, index) => ({ pdId: id, sequence: ++index}))
    // Concept API Calling
    _this.creationConceptProcess(formattedPdIds, _this);
  }
  onDragStart(e){
    console.log(e)
    // e.preventDefault();
  }
  onDrop(e){
    console.log(e)
  }
  
 
// waiyan's code end

/** ************** *** ************** *** **************  start Image Gallery Modal*** ************** *** ************** *** ************** *** ************** */
onUpdateTeskWerkz(id){
  console.log(id);
  this.conceptEdit = true;
  this.testWerkzCategory = false;
  this.conceptList=false;
  console.log(this.conceptList)
  this._service.getConceptById(this.regionID,id).subscribe((res:any)=>{
    console.log(res);
    this.conceptsObj=res;
    this.concept.name=res.name;
    this.getPDById(res.pd);
  },err=>{
    console.log(err);
  })
  console.log(this.ptest)
  // this.performanceDemands=this.ptest;
}

getPDById(pdObj){
  for(let i=0;i<pdObj.length;i++){
    console.log(pdObj[i]);
    this._service.getPDById(this.regionID,pdObj[i].pdId).subscribe((res:any)=>{
      console.log(res);
      this.ptest.push(res);
      console.error(this.ptest)
      this.getQueById(res.questions,i);
    },err=>{
      console.log(err);
    });
  }
}

getQueById(qObj,id){
 console.log(this.ptest,id);
  for(let i=0;i<qObj.length;i++){
    this._service.getQuesById(this.regionID,qObj[i].questionId).subscribe((res:any)=>{
      console.log(res);
      this.ptest[id].questions[i]=res;
    },err=>{
      console.log(err);
    });
  }
}
/** ************** *** ************** *** **************  end Image Gallery Modal*** ************** *** ************** *** ************** *** ************** */
}
