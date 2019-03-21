import { Input } from "@angular/core";
// import { AppComponent } from "./../../app.component";
import { Component, OnInit, HostListener } from "@angular/core";
import { TargetLocator, promise } from "selenium-webdriver";
import { pd } from "./apg";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DragulaService, DragulaModule } from "ng2-dragula";
import { ToastsManager } from "ng5-toastr/ng5-toastr";
import { type } from "os";
import { appService } from "../../service/app.service";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { c } from "@angular/core/src/render3";
import { createWhile } from "typescript";
import { BoundCallbackObservable } from "rxjs/observable/BoundCallbackObservable";
import { nsend } from "q";
import { resolve } from "path";

// declare var upndown:any;
// var Promise = require("bluebird");
const async = require("async");
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
  public conceptsArr = [];
  public showRMIcon: any = "";
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
  public tagID: any;
  public goBackCat = false;
  public wordLength: any;
  public navIsFixed: boolean = false;
  public iseditfocus = false;
  public otherfocus = false;
  public isDisabelInsert = false;
  public isEditComplete: boolean = false;
  public isRemove: boolean = false;
  public translateToMarkDown: string;
  public testVar = "";
  public placeholderVar = "Enter Questions";
  public pd: pd = new pd();
  public pdLists: any[];
  public isDrop: boolean = false;
  public selectEle: any;
  public isHover: boolean = false;
  public markDownHtml_arr: any = [];
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
  public contentArr: any = [];
  public classCreate = false;
  public regionID = localStorage.getItem("regionId");
  public tagsWerkzList = [];
  public tempContentArr: any = [];
  public selectedImgArr: any = [];
  public ImgArr: any = [];
  public imgIdArr: any = [];
  public imgId: any;
  public clickType: boolean = false;
  public editableId: any = "";
  private fileList: any = [];
  private invalidFiles: any = [];
  public ptest: any = [];
  public concept = {
    name: "",
    id: ""
  };
  public dragItem: any;
  public dragItemParent: any;
  public clickEle: any = "";
  // public focusType = {
  //   'type': "",
  //   'no': "",
  //   'parentIdx': ""
  // };
  public focusType: any = {};
  public focusPlace: any;
  public conceptsObj: any = {};
  @BlockUI() blockUI: NgBlockUI;

  constructor(
    private _service: appService,
    private modalService: NgbModal,
    private dragulaService: DragulaService,
    public toastr: ToastsManager
  ) {}

  // waiyan's code start

  public conceptId: string;

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
    this.getConceptLists();
  }
  @HostListener("click", ["$event.target"]) onClick($event) {
    console.log(this.dragItem);
    var clickedEle = $event;
    if (clickedEle.className == "question-insert-img") {
      this.selectEle = this.clickEle;
    }
    if (
      clickedEle.className == "tooltip-wrap" ||
      $(clickedEle).parents(".tooltip-wrap").length > 0 ||
      $(clickedEle).hasClass("question") ||
      $(clickedEle).parents(".question").length > 0 ||
      $(this.dragItem).hasClass("question")
    ) {
      console.log("dddd");
    } else {
      this.showID = "";
      this.dragItem = "";
    }

    this.clickEle = $event;
  }
  @HostListener("mouseover", ["$event"])
  onMouseEnter(event: any) {
    // Logs the id of the element
    // where the event is originally invoked.

    if ($(event.target).parents(".img-wrapper").length > 0) {
      var img;
      var _this = this;
      $(".editableImg").mouseenter(function(event) {
        img = this;
        var posLeft = 105 + $(this).position().left;
        var posTop = $(this).position().top;
        $(this).after(
          $(`<span class='img-span' 
          style='z-index: 1001;position:
           absolute;
           top: ${posTop}px;
           left: ${posLeft}px;
           cursor: pointer;
           padding-top: 10px;'
           >
            <img src='./assets/images/remove-white.png'>
           </span>`)
        );

        $(".img-span").click(function() {
          console.log($(img).siblings(".editableImg"));
          console.log($(img).parent());
          $(".img-span").remove();
          if ($(img).siblings(".editableImg").length == 0) {
            $(img)
              .parent()
              .remove();
          }
          // console.log($(img).remove());
          $(img).remove();
          console.log("Delete Img",_this.editableId, _this.focusType)
          _this.turn(_this.editableId, _this.focusType);

        });
      });
      $(".editableImg").mouseout(function(event) {
        if (event.offsetX >= 119 || event.offsetX < 0) $(".img-span").remove();
        else if (event.offsetY >= 119 || event.offsetY < 0)
          $(".img-span").remove();
        else console.log("out but not out");
      });
    }
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

  getConceptLists() {
    this.blockUI.start('Loading')
    this._service.getAllConcept(this.regionID).subscribe((res: any) => {
      console.log("Concept lists", res);
      this.conceptsArr = res;
      setTimeout(() => {
        this.blockUI.stop();
      }, 300);
    });
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
    // this.addPd();
    console.log(this.performanceDemands);
    this.showSettingSidebar = false;
    this.concept.name = "";
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
    this.addPd();
    console.log(this.performanceDemands);
    // localStorage.setItem("categoryID", val);
    // localStorage.setItem("categoryName", name);
    // setTimeout(() => {
    //   console.log("--waiting--")
    //   this.goBackCat = true;
    // }, 300);
  }

  backToList() {
    this.performanceDemands = [];
    this.ptest = [];
    this.conceptList = true;
    this.conceptCreate = false;
    this.testWerkzCategory = false;
    this.conceptEdit = false;
  }
  backToTestWerkz() {
    this.conceptList = false;
    this.conceptCreate = false;
    this.testWerkzCategory = true;
    this.conceptEdit = false;
    this.performanceDemands = [];
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
    var answerIndex = index;
    var newAnswerFoucs = String(
      i.toString() + j.toString() + String(++answerIndex)
    );
    var deleteAnswerFocus = String(
      i.toString() + j.toString() + String(answerIndex - 2)
    );
    if (e.key === "Enter") {
      if (this.performanceDemands[i].questions[j].answers.length < 8) {
        // this.pdLists[i].question[j].answers.push({
        //   answer: "",
        //   rightAnswer:false
        // })

        this.performanceDemands[i].questions[j].answers.push({
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
      if (index < 7) {
        var answerId = `answer${newAnswerFoucs}`;
        setTimeout(() => {
          document.getElementById(answerId).focus();
        }, 10);
      }
    }

    if (e.key == "Backspace") {
      var selectedAnswer = this.performanceDemands[i].questions[j].answers[
        index
      ].answer;

      if (this.performanceDemands[i].questions[j].answers.length > 1) {
        if (
          selectedAnswer == "" ||
          selectedAnswer == undefined ||
          selectedAnswer == null ||
          selectedAnswer.length <= 0
        ) {
          this.performanceDemands[i].questions[j].answers.splice(index, 1);

          if (index >= 1) {
            var answerId = `answer${deleteAnswerFocus}`;
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
      this.performanceDemands[i].questions[j].answers[index].correctness === 0
    ) {
      this.performanceDemands[i].questions[j].answers[index].correctness = 100;
    } else {
      this.performanceDemands[i].questions[j].answers[index].correctness = 0;
    }
    this.onFocus("check", i, j, index);
  }

  trueAnswerRadio(i, j, index, answer) {
    console.log(this.performanceDemands);
    const dataArray = this.performanceDemands[i].questions[j];
    dataArray.answers.map(answer => (answer.correctness = 0));
    // console.log( JSON.stringify(dataArray));
    dataArray.answers[index].correctness = 100;
    this.onFocus("check", i, j, index);
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
    this.performanceDemands[j].questions.push({
      name: "",
      description: "",
      question: "",
      html: {
        question: ""
      },
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
    var lastIndex = this.performanceDemands[j].questions.length - 1;
    // this.performanceDemands[j].questions[lastIndex].answers[0]
    var idNumber = j + String(lastIndex) + "0";
    console.log(idNumber);
    var answerTootips = $("#answerTootips" + idNumber);
    //  var answerTootips = $('#answerTootips'+ j + String(lastIndex) + '0')
    setTimeout(() => {
      answerTootips.hide();
    }, 300);
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
      _id: "",
      name: "",
      showTooltip: false,
      contents: [],
      questions: [
        {
          _id: "",
          allowedAttempts: 0,
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
          name: "",
          description: "",
          question: "",
          html: {
            question: ""
          },
          questionType: "MCQ-OPTION",
          answers: [
            {
              _id: "",
              name: "",
              answer: "",
              showTooltip: false,
              imgUrl: "",
              correctness: 0,
              contents: []
            }
          ]
        }
      ]
    });
    // this.performanceDemands.push({
    //   name: "",
    //   contents: [],
    //   questions: [
    //     {
    //       question: "",
    //       description: "",
    //       html:{
    //         question:""
    //       },
    //       allowedAttempts: 0,
    //       questionType: "MCQ-OPTION",
    //       pickMultiple: false,
    //       viewType: "LIST",
    //       contents: [
    //         {
    //           contentId: "",
    //           sequence: 0,
    //           start: 0,
    //           end: 0,
    //           playAt: "BEFORE"
    //         }
    //       ],
    //       answers: [
    //         {
    //           name: "",
    //           answer: "",
    //           imgUrl: "",
    //           correctness: 0,
    //           showTooltip: false,
    //           contents: [
    //             {
    //               contentId: "",
    //               sequence: 0,
    //               start: 0,
    //               end: 0,
    //               playAt: "BEFORE"
    //             }
    //           ]
    //         }
    //       ]
    //     }
    //   ]
    // });
    console.log(this.performanceDemands);
  }

  onClickEditor(t) {}
  onInput(content, event, editableId, focusType, i?, j?) {
    if (event.inputType == "insertFromDrop") {
      if ($(window.getSelection().focusNode).attr("class") == "") {
        console.log($(this.dragItem));
        $(this.dragItemParent).append(this.dragItem);
      }
    }
    console.log($(window.getSelection().focusNode).parents(".img-wrapper").length ||$(window.getSelection().focusNode).hasClass("img-wrapper"))
    if (
      $(this.clickEle).parents(".img-wrapper").length > 0 ||
      $(this.clickEle).hasClass("img-wrapper") ||
      $(window.getSelection().focusNode).parents(".img-wrapper").length>0 ||
      $(window.getSelection().focusNode).hasClass("img-wrapper")
    ) {
      if (event.inputType == "deleteContentBackward")
        document.execCommand("undo", false);
      if (event.inputType == "insertText") document.execCommand("undo", false);

      if (event.inputType == "insertParagraph") {
        // console.log(win)
        var thisDiv =
          $(window.getSelection().focusNode).hasClass("img-wrapper") ||
          $(window.getSelection().focusNode).parents(".img-wrapper");
        if ($(window.getSelection().focusNode).hasClass("img-wrapper")) {
          thisDiv = $(window.getSelection().focusNode);
        }
        var tempDiv = document.createElement("div");
        var tempBr = document.createElement("br");
        $(tempDiv).append(tempBr);
        $(thisDiv).after(tempDiv);
        this.selectEle = tempDiv;
        document.execCommand("undo", false);
        var range = document.createRange(),
          sel = window.getSelection();
        range.setStart(tempDiv, 0);
        range.setEnd(tempDiv, 0);
        sel.removeAllRanges();
        sel.addRange(range);
        this.clickEle = tempDiv;
        console.log(sel);
      }
    }
    $(content)
      .contents()
      .eq("0")
      .filter(function() {
        return this.nodeType != 1;
      })
      .wrap("<div />");
    // console.log(this.selectEle)
    // console.log(window.getSelection())
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
    this.turn(editableId, focusType);
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
  openImgModal(content, type, t?) {
    $(t).blur();
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
  onloadImg(event) {
    console.log("hello", this.isDrop);
    console.log("dar", event);
    if (this.isDrop) {
      var file = event;
      this.isDrop = false;
    } else {
      var file = event.target.files;
    }
    console.log(file);
    this.blockUI.start("Loading...");
    this._service.loadImage(this.regionID, file).subscribe(
      (res: any) => {
        //getAllContent() use pormise because of html create value after use in ts
        this.getAllContent().then(() => {
          console.log("here me>", res);
          setTimeout(() => {
            this.autoSelectedImg(res.meta);
          }, 300);
        });
        this.blockUI.stop();
      },
      err => {
        console.log(err);
      }
    );
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
  onslectedImgDiv(i, img) {
    const imgDiv: HTMLElement = document.getElementById("img-" + i);
    const circle: HTMLElement = document.getElementById("cricle" + i);
    const check: HTMLElement = document.getElementById("check" + i);
    const trash: HTMLElement = document.getElementById("trash" + i);
    const trashdiv: HTMLElement = document.getElementById("trashdiv-" + i);

    if (this.modelType == "single") {
      //add selected
      if (!this.isRemove) {
        console.log(img)
        this.selectedImgArr = img;
        this.imgIdArr = i;
        if (this.imgId != undefined && this.imgId != i) {
          console.log(this.selectedImgArr)
          this.removerSelected(this.imgId);
          imgDiv.setAttribute("style", "border:solid;color:#007fff;");
          circle.setAttribute(
            "style",
            "border: solid #007fff; border-radius: 50%;width: 16px; height: 16px;position: absolute;background: #007fff;margin-top: 8px;margin-left: 8px;z-index: 2;"
          );
          trashdiv.setAttribute("style", "display:block;");
          check.setAttribute("style", "color:white;");
          this.ischecked = true;
          this.isDisabelInsert = true;
        } else {
          if (imgDiv.style.border == "solid") {
            this.removerSelected(this.imgId);
            this.isDisabelInsert = false;
          } else {
            imgDiv.setAttribute("style", "border:solid;color:#007fff;");
            circle.setAttribute(
              "style",
              "border: solid #007fff; border-radius: 50%;width: 16px; height: 16px;position: absolute;background: #007fff;margin-top: 8px;margin-left: 8px;z-index: 2;"
            );
            check.setAttribute("style", "color:white;");
            trashdiv.setAttribute("style", "display:block;");
            this.isDisabelInsert = true;
          }
        }
        this.imgId = i;
      }
    } else {
      if (this.isRemove) {
        // console.log("is remove");
        this.selectedImgArr.splice(this.selectedImgArr.indexOf(i), 1);
        this.imgIdArr.splice(this.imgIdArr.indexOf(i), 1);
        this.autoImgLoop(this.imgIdArr);
        this.isRemove = false;
      } else {
        console.log(this.imgIdArr.includes(i));
        if (this.imgIdArr.includes(i)) {
          // console.log("is remove seleccted");
          this.removerSelected(i);
        } else {
          // console.log("else");
          this.imgIdArr.push(i);
          this.selectedImgArr.push(img);
          this.autoImgLoop(this.imgIdArr);
        }
      }
    }
    this.isRemove = false;
    console.log(this.imgIdArr);
    console.log("this.selectedImgArr",this.selectedImgArr)
  }

  //this is remove for image selected from gallery modal (this method can slected multiple or single)
  removerSelected(i) {
    // console.log(this.selectedImgArr, i);
    const imgDiv3: HTMLElement = document.getElementById("img-" + i);
    const circle3: HTMLElement = document.getElementById("cricle" + i);
    const check3: HTMLElement = document.getElementById("check" + i);
    const trash3: HTMLElement = document.getElementById("trash" + i);
    const overlay3: HTMLElement = document.getElementById("Imgoverlay" + i);
    const trashdiv: HTMLElement = document.getElementById("trashdiv-" + i);
    imgDiv3.setAttribute("style", "border:none;");
    circle3.setAttribute(
      "style",
      "border: none; border-radius: 50%;width: 16px; height: 16px;position: absolute;background: none;margin-top: 8px;margin-left: 8px;z-index: 2;"
    );
    check3.setAttribute("style", "color:#ffffff00;");
    trash3.setAttribute("style", "opacity: 0;");
    overlay3.setAttribute("style", " background: rgba(0, 0, 0, 0);");
    trashdiv.setAttribute("style", "display:none");
    if (this.modelType == "single") {
      // this.selectedImgArr = [];
      // this.imgIdArr = [];

      // this.imgId=undefined;
      // console.log(this.imgId);

      // if(String(this.imgId)== i){
      //   this.imgId=undefined;
      //   console.log("hrerer",this.imgId)
      // }
    } else {
      this.selectedImgArr.splice(this.selectedImgArr.indexOf(i), 1);
      this.imgIdArr.splice(this.imgIdArr.indexOf(i), 1);
    }
  }

  //this is use for selected image value loop
  autoImgLoop(arr) {
    console.log(arr);
    for (var i = 0; i < arr.length; i++) {
      const imgDiv: HTMLElement = document.getElementById("img-" + arr[i]);
      const circle: HTMLElement = document.getElementById("cricle" + arr[i]);
      const check: HTMLElement = document.getElementById("check" + arr[i]);
      const trash: HTMLElement = document.getElementById("trash" + arr[i]);
      const overlay: HTMLElement = document.getElementById(
        "Imgoverlay" + arr[i]
      );
      const trashdiv: HTMLElement = document.getElementById(
        "trashdiv-" + arr[i]
      );
      // console.log(imgDiv);
      // console.log(circle);
      // console.log(check);
      imgDiv.setAttribute("style", "border:solid;color:#007fff;");
      circle.setAttribute(
        "style",
        "border: solid #007fff; border-radius: 50%;width: 16px; height: 16px;position: absolute;background: #007fff;margin-top: 8px;margin-left: 8px;z-index: 2;"
      );
      check.setAttribute("style", "color:white;");
      trashdiv.setAttribute("style", "display:block");
      // console.log(arr[i]);
    }
  }

  //when over image from galery modal mouse over or mouse out
  onImgMouseEvent(e, i) {
    const imgDiv: HTMLElement = document.getElementById("img-" + i);
    const trash: HTMLElement = document.getElementById("trash" + i);
    const overlay: HTMLElement = document.getElementById("Imgoverlay" + i);

    if (e.type == "mouseenter" && imgDiv.style.border == "solid") {
      trash.setAttribute("style", "opacity: 1;");
      overlay.setAttribute(
        "style",
        "display:block;  background: rgba(0, 0, 0, .3);"
      );
    } else {
      trash.setAttribute("style", "opacity: 0;");
      overlay.setAttribute("style", " background: rgba(0, 0, 0, 0);");
    }
    // console.log(e.type)
  }

  //delete image
  onremoveClick(id) {
    console.log(id);
    this.isRemove = true;
    this._service.onDeleteContent(this.regionID, id).subscribe(
      (res: any) => {
        // console.log(res);
        // this.contentArr=res.meta;
        this.toastr.success("Successfully Content deleted.");
        //getAllContent() use pormise because of html create value after use in ts
        this.getAllContent().then(() => {
          // console.log("here me>", res);
          setTimeout(() => {
            // console.log(this.selectedImgArr);
            // console.log(this.imgIdArr);
            if (this.modelType == "multiple") {
              this.autoImgLoop(this.imgIdArr);
            } else {
              this.imgId = undefined;
            }
          }, 300);
        });
      },
      err => {
        console.log(err);
        this.toastr.error("Fail Content deleted.");
      }
    );
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
  
  checkFocusPosition() {
    console.log(this.selectEle);
    if (this.selectEle != undefined) {
      if (
        this.selectEle.className == "img-wrapper" ||
        $(this.selectEle).parents(".img-wrapper").length > 0
      ) {
        return true;
      } else return false;
    }
  }
  insertImg() {
    var inImageWrapper = this.checkFocusPosition();
    console.log(inImageWrapper);
    console.log("editableID", this.editableId);
    if (this.editableId != "") {
      var res = this.editableId.split("-");
      console.log("question ===== insert img");
      var imgWrapperId = "img-" + ++res[1] + "-" + new Date().getTime();

      var e = document.getElementById(this.editableId);
      if (inImageWrapper) {
        for (var i in this.selectedImgArr) {
          // console.log(this.selectedImgArr[i].url, "img");
          var url = this.selectedImgArr[i].url;
          // console.log(url);
          // k.innerHTML += ('<div style="width: 120px;height: 120px;float:left;position:relative;background: #f2f4f5"><img style="width:100%;position:absolute;margin: auto;top:0;left:0;right:0;bottom:0;" src="'+url+'"></img><div>');
          $(this.selectEle).append(
            $('<img class="editableImg" src="' + url + '"  ></img>')
          );
          k = this.selectEle;
        }
      } else {
        var tempWrapperDiv = $(
          `<div id="${imgWrapperId}" class="img-wrapper"></div>`
        );
        console.log(tempWrapperDiv);
        $(e).append(tempWrapperDiv);
        var k = document.getElementById(imgWrapperId);
        for (var i in this.selectedImgArr) {
          // console.log(this.selectedImgArr[i].url, "img");
          var url = this.selectedImgArr[i].url;
          // console.log(url);
          // k.innerHTML += ('<div style="width: 120px;height: 120px;float:left;position:relative;background: #f2f4f5"><img style="width:100%;position:absolute;margin: auto;top:0;left:0;right:0;bottom:0;" src="'+url+'"></img><div>');
          k.innerHTML += '<img class="editableImg" src="' + url + '"  ></img>';
        }
      }
      // e.innerHTML +=`<div id="${imgWrapperId}" class="img-wrapper"></div>`;

      setTimeout(function() {
        // console.log($(k).children(".editableImg"))
        $(k)
          .children(".editableImg")
          .each(function(i, e) {
            // console.log($(e).height());
            var imgWidth = $(e).width();
            var imgHeight = $(e).height();
            var maxWidthAndHeight = 120;
            console.log(imgWidth, imgHeight);
            if (imgHeight < maxWidthAndHeight) {
              var res = maxWidthAndHeight - imgHeight;
              console.log(res);
              $(e).css("padding-top", res / 2);
              $(e).css("padding-bottom", res / 2);
            }
            if (imgWidth < maxWidthAndHeight) {
              // console.log("less than 120")
              var res = maxWidthAndHeight - imgWidth;
              // console.log(res);
              $(e).css("padding-left", res / 2);
              $(e).css("padding-right", res / 2);
            }
          });
      }, 100);
      this.turn(this.editableId, this.focusType);
    } else if (this.modelType == "single") {
      console.log("answer === " , $(".answer-img") , );
      this.performanceDemands[this.pdIndex].questions[
        this.questionIndex
      ].answers[this.answerIndex].imgUrl = this.selectedImgArr.url;
      // setTimeout(function(){
      //   var img = $(".answer-img");
      //   var imgWidth = img.width();
      //   var imgHeight = img.height();
      //   var maxWidthAndHeight = 120;
      //   console.log(imgWidth, imgHeight);
      //   if (imgHeight < maxWidthAndHeight) {
      //     var topAndBottom = maxWidthAndHeight - imgHeight;
      //     console.log(topAndBottom);
      //     img.css("padding-top", topAndBottom / 2);
      //     img.css("padding-bottom", topAndBottom / 2);
      //   }
      //   if (imgWidth < maxWidthAndHeight) {
      //     // console.log("less than 120")
      //     var leftAndRight = maxWidthAndHeight - imgWidth;
      //     console.log(leftAndRight);
      //     img.css("padding-left", leftAndRight / 2);
      //     img.css("padding-right", leftAndRight / 2);
      //   }
      // },200)
      
    } else {
      console.log("pd Insert Img======");

      // var obj = {
      //   contentId: "",
      //   sequence: 0,
      //   start: 0,
      //   end: 0,
      //   playAt: "BEFORE",
      //   url:""
      // }
      var contArr = this.performanceDemands[this.focusType.no].contents;
      Array.prototype.push.apply(contArr, this.selectedImgArr);
      console.log(this.performanceDemands)
    }
    this.cancelModal();
    console.log($(".editableImg"));
    // var img;
    // var _this = this;
    // $(".editableImg").hover(function(event) {
    //   $('.img-span').remove();
    //   console.log($('.img-span'))
    //   img = this;
    //   var posLeft = 105 + $(this).position().left;
    //   var posTop = $(this).position().top;
    //   $(this).after(
    //     $(`<span class='img-span' 
    //       style='z-index: 1001;position:
    //        absolute;
    //        top: ${posTop}px;
    //        left: ${posLeft}px;
    //        cursor: pointer;
    //        padding-top: 10px;'
    //        >
    //         <img src='./assets/images/remove-white.png'>
    //        </span>`)
    //   );
    //     console.log($('.img-span'))
    //   $(".img-span").click(function() {
    //     $(img).remove();
    //     $(".img-span").remove();
    //     console.log($(img).parents(".question"))
    //     // console.log($(img).remove());
    //     console.log("Delete Img",_this.editableId, _this.focusType)
    //     _this.turn(_this.editableId, _this.focusType);
    //   });
    // });
    // $(".editableImg").mouseout(function(event) {
    //   console.log(event);
    //   if (event.offsetX >= 119 || event.offsetX < 0) $(".img-span").remove();
    //   else if (event.offsetY >= 119 || event.offsetY < 0) $(".img-span").remove();
    //   else console.log("out but not out");
    // });



  }

  mouseOver(e, idx) {
    console.log(e.target.className);
    console.log("over ");
    console.log($(event.target).children(".img-pd"));
    console.log($(event.target).siblings(".img-pd"));
    if ($(e.target).hasClass("editablePDImg")) {
      $(e.target)
        .siblings(".img-pd")
        .show();
    }
    if ($(e.target).hasClass("innerPd")) {
      $(e.target)
        .children(".img-pd")
        .show();
    }
  }
  mouseOut(event) {
    if (event.offsetX >= 119 || event.offsetX < 0) {
      if ($(event.target).hasClass("editablePDImg")) {
        $(event.target)
          .siblings(".img-pd")
          .hide();
      }
      if ($(event.target).hasClass("innerPd")) {
        $(event.target)
          .children(".img-pd")
          .hide();
      }
    } else if (event.offsetY >= 119 || event.offsetY < 0) {
      if ($(event.target).hasClass("editablePDImg")) {
        $(event.target)
          .siblings(".img-pd")
          .hide();
      }
      if ($(event.target).hasClass("innerPd")) {
        $(event.target)
          .children(".img-pd")
          .hide();
      }
    } else console.log("out but not out", this.showRMIcon);
  }

  showID: any;
  onFocus(type, idx1, idx2, idx3) {
    this.editableId = "";
    this.focusPlace = "";
    this.answerTootips = "";
    this.focusType.type = type;
    this.showID = "";
    console.log(this.performanceDemands);
    console.log(this.performanceDemands.length);
    this.showSetting();
    switch (type) {
      case "pd":
        this.showID = "";
        this.focusPlace = "pd" + idx1;
        this.focusType.no = idx1;
        this.focusType.parentIdx = "";
        this.performanceDemands[idx1].showTooltip = true;
        break;
      case "question":
        this.showID = "q" + idx1 + idx2;
        this.focusPlace = "q" + idx1 + idx2;
        this.focusType.no = idx2;
        this.focusType.parentIdx = idx1;
        this.editableId = "q" + "-" + idx1 + "-" + idx2;
        this.dragItem = document.getElementById(this.editableId);
        // this.performanceDemands[idx1].question[idx2].showTooltip = true;
        break;
      case "check":
        this.showID = "";
        this.focusPlace = "a" + idx1 + idx2 + idx3;
        this.focusType.no = idx2;
        this.focusType.parentIdx = idx1;
        if (type == "check") {
          this.focusType.type = "answer";
        }
        break;
      case "answer":
        this.focusPlace = "a" + idx1 + idx2 + idx3;
        this.focusType.no = idx2;
        this.focusType.parentIdx = idx1;
    }
    if (type == "answer") {
      // var tootipsId = $('#answerTootips' + idx1 + idx2 + idx3)
      // tootipsId.show()
      // this.answerTootipsOptions = true;
      this.performanceDemands[idx1].questions[idx2].answers[
        idx3
      ].showTooltip = true;
    }
  }
  onFocusOut(e) {
    this.dragItem = "";
  }
  hideTooltip(hideTooltip, type, idx1, idx2, idx3, t?) {
    console.log("focusout", type);
    if (hideTooltip == "hideTooltip") {
      setTimeout(() => {
        if (type == "answer") {
          if (
            this.performanceDemands[idx1] != undefined &&
            this.performanceDemands[idx1].questions[idx2] != undefined &&
            this.performanceDemands[idx1].questions[idx2].answers[idx3] !=
              undefined
          ) {
            this.performanceDemands[idx1].questions[idx2].answers[
              idx3
            ].showTooltip = false;
          }
          var tootipsId = $("#answerTootips" + idx1 + idx2 + idx3);
          tootipsId.hide();
        } else if (type == "question") {
          console.log(t);
          // $('.tooltip-wrap').hide();
          // this.performanceDemands[idx1].question[idx2].showTooltip = false;
        } else {
          if (this.performanceDemands[idx1] != undefined) {
            this.performanceDemands[idx1].showTooltip = false;
          }
          console.log("object");
        }
      }, 150);
    }
  }
  // closeDropdown(e){
  //   console.log(e)
  //   console.log(e.target.parentNode)
  //   var pId = this.editableId;
  //   console.log(pId)

  //   console.log( $(e.target).parents())
  //   console.log('#'+pId)
  //   if(pId != ""){
  //     if($(e.target)[0].id == pId || $(e.target).parents('#' +pId).length > 0){

  //     }else{
  //       this.showID = "";
  //     }
  //   }

  // }
  // closeDropdown(e,type){
  //   console.log(e)
  //   console.log(e.target.parentNode)
  //   // var divToHide = document.getElementById('divToHide');
  //   var pId = this.editableId;
  //   if(e.target.parentNode != null){
  //     console.log(e.target.parentNode.id)
  //     // console.log(divToHide)
  //     // if(e.target.parentNode.id != 'divToHide' || e.target.parentNode.id != pId){
  //     //   console.log("same")
  //     //   this.showID = '';
  //     // }
  //     if(e.target.parentNode.id == 'divToHide' || e.target.parentNode.id == pId){
  //       console.log("same")

  //     }else if(e.target.parentNode.id != 'divToHide' || e.target.parentNode.id != pId){
  //       console.log("not same")
  //       this.showID = "";
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
      .questions[this.focusType.no];
    var isMultiSelect = dataArray.pickMultiple;
    isMultiSelect = !isMultiSelect;
    // this.performanceDemands[this.focusType.parentIdx].questions[
    //   this.focusType.no
    // ].pickMultiple = !this.performanceDemands[this.focusType.parentIdx]
    //   .questions[this.focusType.no].pickMultiple;
    // if (
    //   this.performanceDemands[this.focusType.parentIdx].questions[
    //     this.focusType.no
    //   ].pickMultiple == true
    // ) {
    //   this.answerType = "checkbox";
    // } else {
    //   this.answerType = "radio";
    // }
    console.log(dataArray);
    // dataArray.questionType = 'MCQ-OPTION'
    if (dataArray.questionType === "MCQ-OPTION") {
      dataArray.questionType = "MCQ-CHECKBOX";
    } else {
      dataArray.questionType = "MCQ-OPTION";
    }
    dataArray.answers.map((answer, i) => (answer.correctness = 0));
  }

  delete(itemType) {
    console.log("delete type", itemType);
    if (itemType.type == "pd") {
      if (this.performanceDemands.length > 1) {
        this.performanceDemands.splice(itemType.no, 1);
      }
    } else if (itemType.type == "question" || itemType.type == "answer") {
      if (this.performanceDemands[itemType.parentIdx].questions.length > 1) {
        this.performanceDemands[itemType.parentIdx].questions.splice(
          itemType.no,
          1
        );
      }
    }
    this.focusType = {};
    this.showSettingSidebar = false;
  }

  cancelConcept(type) {
    this.conceptCreate = false;
    this.conceptEdit = false;
    this.testWerkzCategory = false;
    this.conceptList = true;
    this.performanceDemands = [];
    this.concept = {
      name: "",
      id: ""
    };
    this.focusType = {};
    this.ischecked = "";
    this.performanceDemands = [];
    this.ptest = [];
    if (type == "redirect") {
      this.getConceptLists();
    }
  }
  // HSYL code
  inputQuestion(quesId, type) {
    console.log("event", quesId);
    this.turn(quesId, type);
  }

  public isConceptFormValid = false; // Global

  validateForm() {
    if (!this.concept.name) {
      this.isConceptFormValid = false;
      return this.isConceptFormValid;
    }

    const pds = this.performanceDemands;

    const checkPDs = pds.map(pd => {
      if (!pd.name) {
        return false;
      }

      const questions = pd.questions.map(quest => {
        if (!quest.question) {
          return false;
        }

        // const noAnswer = quest.answers.some(ans => ans.answer === "");

        // if (!noAnswer) {
        //   return quest.answers.some(ans => ans.correctness === 100);
        // }
        var noAnswer = false;
        const test = quest.answers.map((ans) => {
          if((ans.answer == "" && ans.imgUrl != "") || (ans.answer != "" && ans.imgUrl == "") || (ans.answer != "" && ans.imgUrl != "")){
            // console.log("has one~~~");
            // has on ans (Img Or text)
            noAnswer = true;
          }else if(ans.answer == "" && ans.imgUrl == ""){
            // console.log("not has one")
            noAnswer = false;
          }
          // else{
          //   console.log("true~~~");
          // }
        })
         if (noAnswer) {  return quest.answers.some((ans) => ans.correctness === 100); }  

        return false;
      });

      return !questions.includes(false);
    });

    this.isConceptFormValid = !checkPDs.includes(false);
    return this.isConceptFormValid;
  }

  //get html tag in div
  turn(qId, fType) {
    var markdownQues: any;
    // console.log("qId~~~",qId,fType)
    var myDiv = document.getElementById(qId);
    // console.log("myD",myDiv.innerHTML)
    setTimeout(() => {
      var turndownService = new TurndownService();
      turndownService.addRule("Tada", {
        filter: "div",
        replacement: function(content) {
          return content + "";
        }
      });
      markdownQues = turndownService.turndown(myDiv);
      console.log("turn to markdown", markdownQues);
      this.performanceDemands[fType.parentIdx].questions[
        fType.no
      ].html.question = String(myDiv.innerHTML);
      this.performanceDemands[fType.parentIdx].questions[
        fType.no
      ].question = markdownQues;
      console.log("performanceDemands", this.performanceDemands);
    }, 200);
  }

  removePDImg(img, idx, pdIdx) {
    console.log("Delete Img", img);
    this.performanceDemands[pdIdx].contents.splice(idx, 1);
  }
  // HSYL code

  // waiyan's code start
  createConcept() {
    console.log("---------------------");
    console.log(this.performanceDemands);
    console.log("---------------------");
    this.blockUI.start("Loading...");
    async.map(
      this.performanceDemands,
      this.pdLoop.bind(null, this),
      this.pdLoopDone.bind(null, this)
    );
    setTimeout(() => {
      this.blockUI.stop();
    }, 300);
  }
  createQuestions(_this, pd, question, callback) {
    // Update quesiton object and pass it to api
    const testArr = [];
    const questionFormat = {
      name: "",
      description: "",
      question: "",
      html: {
        question: ""
      },
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
      var tempObj = {
        name: "",
        answer: "",
        imgUrl: "",
        correctness: 0,
        contents: []
      };
      tempObj.name = answer.name;
      tempObj.answer = answer.answer;
      tempObj.imgUrl = answer.imgUrl;
      tempObj.correctness = answer.correctness;
      console.log(tempObj);
      testArr.push(tempObj);
      console.log(testArr);
    });
    questionFormat.answers = testArr;
    questionFormat.questionType = question.questionType;
    questionFormat.question = question.question;
    questionFormat.html = question.html;
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
    console.log(pd);
    console.log("PD LOOP", JSON.stringify(pd.questions));
    async.map(
      pd.questions,
      _this.createQuestions.bind(null, _this, pd),
      _this.createQuesitonsDone.bind(null, pd, _this, pdCallback)
    );
    // After ASYNC, pd.quesitons
  }

  createQuesitonsDone(pd, _this, pdCallback, error, questionIds) {
    // const questionIds = questionIds;
    console.log(pd.contentsArr);
    const formattedQuestionIDs = questionIds.map(id => ({ questionId: id }));

    _this.creationPDProcess(_this, pd, formattedQuestionIDs, pdCallback);
  }

  creationPDProcess(_this, pd, formattedQuestionIDs, pdCallback) {
    // Create PD
    let pdCreateFormat = {
      name: "string",
      questions: [],
      contents: []
    };
    const tempContentArray = [];
    pd.contents.map((contentObj, index) => {
      var tempContentObj = {
        contentId: "",
        sequence: 0
      };
      tempContentObj.contentId = contentObj._id;
      tempContentObj.sequence = ++index;
      tempContentArray.push(tempContentObj);
    });
    // Get pd.questions
    pdCreateFormat.questions = formattedQuestionIDs;
    pdCreateFormat.name = pd.name;
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
  onFilesChange(fileList: Array<File>) {
    console.log(fileList.length);
    if (fileList.length != 0) {
      this.isDrop = true;
      this.fileList = fileList;
      this.onloadImg(fileList); //file upload call api
      console.log("exit1", this.fileList);
    }
  }

  //file drop method for invalids
  onFileInvalids(fileList: Array<File>) {
    this.invalidFiles = fileList;
  }

  creationConceptProcess(formattedPdIds, hello, id) {
    // Create Concept
    // var moduleId = localStorage.getItem('moduleID')
    console.log("this", hello);
    const conceptFormat = {
      // "moduleId": moduleId,
      name: this.concept.name,
      tag: [
        {
          tagId: this.tagID
        }
      ],
      pd: [],
      contents: []
    };

    conceptFormat.pd = formattedPdIds;
    this._service.createConcept(this.regionID, conceptFormat).subscribe(
      res => {
        console.log("FINALLY", res);
        this.cancelConcept("redirect");
      },
      err => {
        console.log("err");
      }
    );
  }

  pdLoopDone(_this, error, pdIds) {
    console.log(pdIds);
    if (error) {
      console.error("Error in pdLoopDone", error);
      return;
    }
    const formattedPdIds = pdIds.map((id, index) => ({
      pdId: id,
      sequence: ++index
    }));
    // Concept API Calling
    _this.creationConceptProcess(formattedPdIds, _this);
  }
  onDragStart(e) {
    this.dragItem = e.target;
    console.log($(e.target).parents(".img-wrapper")[0]);
    console.log($(".img-span"));
    $(".img-span").remove();
    // e.preventDefault();
  }
  onDrop(e) {
    console.log(e);
    if ($(e.target).hasClass("img-wrapper")) {
      this.dragItemParent = e.target;
    }
    console.log(this.dragItemParent);
    // if (e.target.className != "editableImg") {
    //   console.log("not that");
    //   // document.execCommand("undo");
    //   this.dropDiv = false;
    // } else {
    //   this.dropDiv = true;
    // }
    // console.log(this.dropDiv.id)
    // console.log(e)
    // console.log(e.target.id)
    // console.log(e.target.id == this.dropDiv.id);
    // if(e.target.id != this.dropDiv.id)
    //   console.log("gg")
  }

  // waiyan's code end

  // waiyan's code end

  /** ************** *** ************** *** **************  start conept  update*** ************** *** ************** *** ************** *** ************** */
  //start get method
  async onUpdateTeskWerkz(id) {
    console.log(id);
    this.conceptId = id;
    this.showSettingSidebar = false;
    this.conceptEdit = true;
    this.testWerkzCategory = false;
    this.conceptList = false;
    console.log(this.conceptList);
    await this._service.getConceptById(this.regionID, id).subscribe(
      async (res: any) => {
        console.log(res);
        this.conceptsObj = res;
        this.concept.name = res.name;
        this.concept.id = res._id;
        this.tagID = res.tag[0].tagId;
        await this.getPDById(res.pd);
      },
      err => {
        console.log(err);
      }
    );
    console.log(this.ptest);
    this.performanceDemands = this.ptest;
  }

  async getPDById(pdObj) {
    for (let i = 0; i < pdObj.length; i++) {
      console.log(pdObj[i]);
      await this._service.getPDById(this.regionID, pdObj[i].pdId).subscribe(
        async (res: any) => {
          console.log(res);
          this.ptest.push(res);
          await this.getQueById(res.questions, i);
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  getQueById(qObj, id) {
    console.log(this.ptest, id);
    for (let i = 0; i < qObj.length; i++) {
      this._service.getQuesById(this.regionID, qObj[i].questionId).subscribe(
        (res: any) => {
          console.log(res.html.question);
          this.markDownHtml_arr.push(res.html.question);
          setTimeout(() => {
            document.getElementById("q-" + id + "-" + i).innerHTML =
              res.html.question;
            console.log(document.getElementById("dd"));
          }, 200);
          this.ptest[id].showTooltip = false;
          this.ptest[id].questions[i] = res;
        },
        err => {
          console.log(err);
        }
      );
      // const inner_markDown:HTMLElement= document.getElementById('q-'+id+i);
      // console.log("q-"+id+i);
      // console.log(inner_markDown);
    }
  }

  //end get method

  //start put method
  updateConcept(id) {
    console.log("---------------------");
    console.log(this.performanceDemands);
    console.log("---------------------", id);
    this.blockUI.start("Loading...");

    async.map(
      this.performanceDemands,
      this.updatepdLoop.bind(null, this, id),
      this.updatepdLoopDone.bind(null, this, id)
    );
    setTimeout(() => {
      this.blockUI.stop();
    }, 300);
  }

  updatepdLoop(_this, id, pd, pdCallback) {
    console.log(_this, pd);
    console.log(id);
    // API CALL
    // Question Creatoion Loop
    console.log("PD LOOP", JSON.stringify(pd.questions));
    async.map(
      pd.questions,
      _this.updateQuestions.bind(null, _this, pd, id),
      _this.updateQuesitonsDone.bind(null, pd, _this, pdCallback)
    );
    // After ASYNC, pd.quesitons
  }

  updatepdLoopDone(_this, conceptId, error, pdIds) {
    console.log(error);
    console.log(pdIds);
    console.log(conceptId);
    console.log(_this);
    if (error) {
      console.error("Error in pdLoopDone", error);
      return;
    }
    const formattedPdIds = pdIds.map((id, index) => ({
      pdId: id,
      sequence: ++index
    }));
    // Concept API Calling
    _this.updateConceptProcess(formattedPdIds, _this, conceptId);
    console.log(conceptId);
  }

  updateConceptProcess(formattedPdIds, hello, cid) {
    // Create Concept
    // var moduleId = localStorage.getItem('moduleID')
    console.log("this", hello);
    console.log(formattedPdIds);
    console.log(cid);
    const conceptFormat = {
      // "moduleId": moduleId,
      name: this.concept.name,
      tag: [
        {
          tagId: this.tagID
        }
      ],
      pd: [],
      contents: []
    };

    conceptFormat.pd = formattedPdIds;
    this._service.updateConcept(this.regionID, conceptFormat, cid).subscribe(
      res => {
        console.log("FINALLY", res);
        this.cancelConcept("redirect");
      },
      err => {
        console.log("err");
      }
    );
  }

  updateQuestions(_this, pd, id, question, callback) {
    console.log(pd);
    console.log(question._id);
    // Update quesiton object and pass it to api
    const testArr = [];
    const questionFormat = {
      name: "",
      description: "",
      question: "",
      html: {
        question: ""
      },
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
      var tempObj = {
        name: "",
        answer: "",
        imgUrl: "",
        correctness: 0,
        contents: []
      };
      tempObj.name = answer.name;
      tempObj.answer = answer.answer;
      tempObj.imgUrl = answer.imgUrl;
      tempObj.correctness = answer.correctness;
      console.log(tempObj);
      testArr.push(tempObj);
      console.log(testArr);
    });
    questionFormat.answers = testArr;
    questionFormat.questionType = question.questionType;
    questionFormat.question = question.question;
    questionFormat.html = question.html;
    console.log(question._id);
    if (question._id == "" || question._id == undefined) {
      console.log("is create");
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
    } else {
      console.log("is update");
      _this._service
        .updatePDQuestion(_this.regionID, questionFormat, question._id)
        .subscribe(
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
  }
  deleteAnswerImg(i,j,index){
    this.performanceDemands[i].questions[j].answers[index].imgUrl='';
  }
  onmouseEnter(e,i,j,index){
    var Id = String(i) + String(j) + String(index)
    var imgId = $('#imgID' + Id)
    imgId[0].style.display = 'block'

  }
  onmouseLeave(event,i,j,index){
    var Id = String(i) + String(j) + String(index)
    var imgId = $('#imgID' + Id)
    imgId[0].style.display = 'none'
  }
  updateQuesitonsDone(pd, _this, pdCallback, error, questionIds) {
    console.log(pd);
    console.log(_this);
    console.log(error);
    console.log(questionIds);
    // const questionIds = questionIds;
    console.log(pd.contentsArr);
    const formattedQuestionIDs = questionIds.map(id => ({ questionId: id }));

    _this.updatePDProcess(_this, pd, formattedQuestionIDs, pdCallback);
  }

  updatePDProcess(_this, pd, formattedQuestionIDs, pdCallback) {
    // Create PD
    let pdCreateFormat = {
      name: "string",
      questions: [],
      contents: []
    };
    console.log(formattedQuestionIDs);
    console.log(pd);
    const tempContentArray = [];
    pd.contents.map((contentObj, index) => {
      var tempContentObj = {
        contentId: "",
        sequence: 0
      };
      tempContentObj.contentId = contentObj._id;
      tempContentObj.sequence = ++index;
      tempContentArray.push(tempContentObj);
    });
    // Get pd.questions
    pdCreateFormat.questions = formattedQuestionIDs;
    pdCreateFormat.name = pd.name;
    pdCreateFormat.contents = tempContentArray;
    // OR
    // pd.name = string",
    // pd.description = string",
    if (pd._id == "" || pd._id == undefined) {
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
    _this._service.updatePD(_this.regionID, pdCreateFormat, pd._id).subscribe(
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
  //end put method
  /** ************** *** ************** *** **************  start conept  update *** ************** *** ************** *** ************** *** ************** */

  onClickDeleteConcept(content,concept){
    console.log("concept",content,concept)
    this.modalReference = this.modalService.open(content, { backdrop:'static', windowClass:'deleteModal d-flex justify-content-center align-items-center' });
  }
  conceptDelete(conceptId){
    console.log("onClickDelete",conceptId);
    this.modalReference.close();
    this._service.deleteConcept(this.regionID,conceptId)
    .subscribe((res:any)=>{
      this.toastr.error("Successfully delete")
      console.log(res);
      this.cancelConcept('redirect');
    })
  }
}
