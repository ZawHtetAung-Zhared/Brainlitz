import { element } from 'protractor';
import { Input, ComponentFactoryResolver } from "@angular/core";
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
import { connect } from 'tls';
import { LoggedInGuard } from '../../service/loggedIn.guard';

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
  public pickedTag: any = {
    "id": "",
    "name": "",
    "state": ""
  };
  public goBackCat = false;
  public wordLength: any;
  public des_wordLength: any;
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
  public isCollapse : boolean = true;
  public markDownHtml_arr: any = [];
  public settingContents: any = [];
  public toolBarOptions = {
    toolbar: { buttons: ["bold", "italic", "underline", "image"] },
    static: true,
    relativeContainer: "app-testwerkz",
    align: "center",
    sticky: false,
    updateOnEmptySelection: false
  };
  public contentType: string;
  public tagWerkz = {
    name: ""
  };
  public modalReference: any;
  public content_size:any;
  public contentArr:any=[];
  public classCreate = false;
  public regionID = localStorage.getItem("regionId");
  public tagsWerkzList = [];
  public tempContentArr: any = [];
  public selectedImgArr: any = [];
  public ImgArr: any = [];
  public videoArr: any = [];
  public selectedVideoArr: any = [];
  public imgIdArr: any = [];
  public vidIdArr: any = [];
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
  public selectedDuration : any = {};
  public dragItem: any;
  public dragItemParent: any;
  public clickEle: any = "";
  public collectionarr:any=[];
  public isTestwerkztitle:boolean=true;
  public collectionName:string='';
  public collectionDescription:string='';
  // public focusType = {
  //   'type': "",
  //   'no': "",
  //   'parentIdx': ""
  // };
  public focusType: any = {};
  public focusPlace: any;
  public conceptsObj: any = {};
  public contentPage: number = 1;
  public contentRes:any=[];
  public isCollectionList:boolean=true;
  public isCollection:boolean=false;
  public isCollectionCreate:boolean=false;
  public isCollectionEdit:boolean=false;
  public isFocus_collection:boolean=false;
  public concept_in_collection:any=[];
  public selectedConcept:any=[];
  public collectionId:any=[];
  public caretPos = 0;
  public showRemove:boolean =false;
  public hoverIcon:any=""
  public pageConcept:any=1;
  public pageCollection:any=1;
  public collectionArr_slice:any;
  public deleteCollection:string;
  public isExpandExit:boolean=false;
  public isVideoSearch:boolean=false;
  
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
    this.dragulaService.cloned().subscribe(({name,clone,original})=>{
      console.log(name,clone,original)
      console.log($(original).children().children(".rmIcon"))
      $(original).children().children(".rmIcon").css('display','none');
    })  

    
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
    this.getConceptLists(1,20);
    this.getCollectionlist(1,20);
    console.log(this.focusType = {
      'no' : 0,
      'type' : 'pd'
    })

  }
  @HostListener("click", ["$event.target"]) onClick($event) {
    var clickedEle = $event;
    console.log("clickedEle~~~",clickedEle)
    console.log("clickedEle className~~~",clickedEle.className)
    console.log("this.clickEle",this.clickEle)
    if (clickedEle.className.includes("question-insert-img")) {
      console.log("####click on tooltip",clickedEle.className);
      this.selectEle = this.clickEle;
    }else{
      console.log("####click on text")
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
    if(clickedEle.className.includes("removeIcon")){
      this.clickEle = this.tempClick;
      console.log("this.clickEle~~~~~~~~~",this.clickEle);
    }else{
      this.clickEle = $event;
      this.tempClick = null;
      console.log("this.clickEle#######",this.clickEle);
    }
    // this.clickEle = $event;
  }
  tempClick:any;
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
            <img class="removeIcon" src='./assets/images/remove-white.png'>
           </span>`)
        );

        var temp = $(".img-span").parent().attr("id");
        console.log("temp",temp);
        // var x = document.getElementById(temp).previousSibling;
        // console.log("x####",x)
        var x = document.getElementById(temp).parentElement;
        console.log("x###",x)
        $(".img-span").click(function() {
          // console.log($(img).siblings(".editableImg"));
          // console.log($(img).parent());
          $(".img-span").remove();
          if ($(img).siblings(".editableImg").length == 0) {
            $(img)
              .parent()
              .remove();
              // console.log("Remove wrapper~~~",temp)
          }else{
            // console.log("Has wrapper~~~",temp)
            _this.tempClick = document.getElementById(temp); 
          }
          // console.log($(img).remove());
          $(img).remove();
          // console.log("Delete Img", _this.editableId, _this.focusType);
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
    if (window.innerWidth > 1200) {
      this.classCreate = true;
    }
    if (window.innerWidth <= 1200) {
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

  getConceptLists(page,size) {
    console.log(page,size)
    this.blockUI.start("Loading");
    this._service.getAllConcept(this.regionID,1,size).subscribe((res: any) => {
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
    this.pageConcept=1;
    this.testWerkzCategory = true;
    this.conceptList = false;
    this.isCollection=false;
    this.isCollectionList=false;
    this.getAllTag();
    // this.addPd();
    console.log(this.performanceDemands);
    this.showSettingSidebar = false;
    this.concept.name = "";
    this.showHideSideBar('hide')
  }
  showHideSideBar(type){
    const notiSideBar: HTMLElement  = document.getElementById('noti-sidebar');
    const header:HTMLElement = document.getElementById('header');
    const header2:HTMLElement = document.getElementById('header2');
    const largeCol:HTMLElement = document.getElementById('large-col');
    if(type == 'hide'){
      notiSideBar.setAttribute("style", "display:none;");
      header.setAttribute("style", "display:none;");
      header2.setAttribute("style", "display:none;");
      largeCol.setAttribute("style", "width:100%!important;");
    }else{
      notiSideBar.setAttribute("style", "display:block;");
      header.setAttribute("style", "display:block;");
      header2.setAttribute("style", "display:block;");
      if (window.innerWidth > 1200 && window.innerWidth < 1900) {
        largeCol.setAttribute("style", "width:82%!important;");
      }
      if (window.innerWidth > 992 && window.innerWidth < 1199) {
        largeCol.setAttribute("style", "width:75%!important;");
      }
    }
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
    if (status == "name") {
      this.wordLength = word.length;
      $(".limit-type-wordcount").show("slow");
    }
    if (status == "Description") {
      this.des_wordLength = word.length;
      $(".limit-type-wordcount1").show("slow");
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
    console.log("blur", e,status);
    if(status=="name"){
      let wp = this.wordLength;
      $(".limit-type-wordcount").hide("slow");
      $(".limit-word").hide("slow");
      this.wordLength = 0;
    }else{
      let wp = this.wordLength;
      $(".limit-type-wordcount1").hide("slow");
      this.des_wordLength = 0;
    }
   
  }
  changeMethod(val: string) {
    this.wordLength = val.length;
  }
  changeMethodDes(val:string){
    console.log(val)
    this.des_wordLength=val.length
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
    // this.conceptCreate = true;
    this.testWerkzCategory = false;
    this.ischecked = val;
    this.pickedTag.id = val;
    this.pickedTag.name = name;
    console.log(this.performanceDemands);
    if((this.pickedTag.state != "" && this.pickedTag.state == 'conceptCreate') || this.pickedTag.state == ""){
      this.conceptCreate = true;
      this.addPd();
    }else if(this.pickedTag.state != "" && this.pickedTag.state == 'conceptEdit'){
      this.conceptEdit = true;
      console.log(this.performanceDemands)
      setTimeout(()=>{
        var pd = this.performanceDemands;
        for(var i=0;i<pd.length;i++){
          for(var j=0;j<pd[i].questions.length;j++){
            if(pd[i].questions[j].html){
              document.getElementById("q-" + i + "-" + j).innerHTML = pd[i].questions[j].html.question;
            }
          }
        }
      },200)   
    }
    // localStorage.setItem("categoryID", val);
    // localStorage.setItem("categoryName", name);
    // setTimeout(() => {
    //   console.log("--waiting--")
    //   this.goBackCat = true;
    // }, 300);
  }

  backToList() {
    this.showHideSideBar('show')
    this.performanceDemands = [];
    this.ptest = [];
    this.conceptList = true;
    this.isCollectionList=true;
    this.conceptCreate = false;
    this.testWerkzCategory = false;
    this.conceptEdit = false;
    this.videoArr = [];
    this.pickedTag = {
      "id": "",
      "name": "",
      "state": ""
    };
    this.selectedConcept=[];
    this.collectionName="";
    this.collectionDescription="";
    this.collectionId="";
    this.ischecked = "";
    this.isCollectionList=true;
    this.isTestwerkztitle=true;
    this.isCollection=false;
    this.isCollectionCreate=false;
    this.isCollectionEdit=false;
    this.getConceptLists(1,20);
  }
  backToTag(type) {
    console.log("TYPE~~~",type)
    this.conceptList = false;
    this.isCollectionList=false;
    this.conceptCreate = false;
    this.testWerkzCategory = true;
    this.conceptEdit = false;
    if(type == 'conceptCreate'){
      this.performanceDemands = [];
      this.pickedTag.state = "conceptCreate"
    }else{
      this.pickedTag.state = "conceptEdit"
      this.getAllTag();
    }
    // this.performanceDemands = [];
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
            // {
            //   contentId: "",
            //   sequence: 0,
            //   start: 0,
            //   end: 0,
            //   playAt: "BEFORE"
            // }
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
        // {
        //   contentId: "",
        //   sequence: 0,
        //   start: 0,
        //   end: 0,
        //   playAt: "BEFORE"
        // }
      ],
      answers: [
        {
          name: "",
          answer: "",
          imgUrl: "",
          correctness: 0,
          showTooltip: false,
          contents: [
            // {
            //   contentId: "",
            //   sequence: 0,
            //   start: 0,
            //   end: 0,
            //   playAt: "BEFORE"
            // }
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
            // {
            //   contentId: "",
            //   sequence: 0,
            //   start: 0,
            //   end: 0,
            //   playAt: "BEFORE"
            // }
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
  range;
  sel;
  getCaretPosition(e,editableId) {
    if (window.getSelection) {
      this.sel = window.getSelection(); 
      // console.log("sel",this.sel)

      if (this.sel.rangeCount) {
        this.range = this.sel.getRangeAt(0);
        this.caretPos = this.range.endOffset;
        // this.range.deleteContents();
        // console.log("range",this.range)
      }
    } 
  }


  onClickEditor(t) {}
  onInput(content, event, editableId, focusType, i?, j?) {
    if (event.inputType == "insertFromDrop") {
      if ($(window.getSelection().focusNode).attr("class") == "") {
        // console.log($(this.dragItem));
        $(this.dragItemParent).append(this.dragItem);
      }
    }
    // console.log(
    //   $(window.getSelection().focusNode).parents(".img-wrapper").length ||
    //     $(window.getSelection().focusNode).hasClass("img-wrapper")
    // );
    console.log("####", $(this.clickEle).parents(".img-wrapper").length > 0 ||
      $(this.clickEle).hasClass("img-wrapper") ||
      $(window.getSelection().focusNode).parents(".img-wrapper").length > 0 ||
      $(window.getSelection().focusNode).hasClass("img-wrapper"))
    if (
      $(this.clickEle).parents(".img-wrapper").length > 0 ||
      $(this.clickEle).hasClass("img-wrapper") ||
      $(window.getSelection().focusNode).parents(".img-wrapper").length > 0 ||
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
    // var divId=new Date().getTime();
    // console.log("~~~time",divId)
    $(content)
      .contents()
      .eq("0")
      .filter(function() {
        return this.nodeType != 1;
      })
      .wrap("<div />");
      // .wrap("<div id=t-"+divId +"/>");
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
    // $('[contenteditable]').on('paste', function (e) {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     var plaintext = e.clipboardData.getData('text/plain');
    //     document.execCommand('inserttext', false, plaintext);
    // });

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
    this.contentType = "image";
    $(t).blur();
    console.log("open modal>", type);
    this.modelType = type;
    this.modalReference = this.modalService.open(content, {
      backdrop: "static",
      keyboard: false,
      windowClass:
        "modal-xl modal-inv d-flex justify-content-center align-items-center"
    });
    this.contentPage=1;
    this.getAllContent(this.contentPage,20,'');
  }
  openVideoModal(content,type) {
    // $(t).blur();
    this.contentType = "video";
    console.log("open modal>", content);
    this.modelType = type;
    this.modalReference = this.modalService.open(content, {
      backdrop: "static",
      keyboard: false,
      windowClass:
        "video-modal modal-xl modal-inv d-flex justify-content-center align-items-center"
    });
    this.contentPage=1;
    this.getAllContent(1,20,'');
  }
  answerOpenImgModal(content, type, i, j, index) {
    this.contentType = "image";
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
    this.getAllContent(1,20,'');
  }

  cancelModal() {
    this.modalReference.close();
    this.selectedImgArr = [];
    this.imgIdArr = [];
    this.vidIdArr = [];
    this.imgId = undefined;
    this.selectedVideoArr = [];
    this.contentPage=0;
    this.ImgArr=[];
    this.isDisabelInsert=false;
    this.uploadedVid = [];
  }
  public searchWord:any;
  public isSearch:any;
  public result:any;

  contentSearch(keyword){
    this.isVideoSearch=true;
    this.searchWord = keyword;
    this.getAllContent(1,20,keyword)
  }
  showMoreVideo(){
    this.contentPage += 1;
    if(this.isSearch == true){
      console.log("isSearchTrue",this.isSearch)
      this.getAllContent(this.contentPage,20,this.searchWord)
    }else{
      console.log("isSearchfalse",this.isSearch)
      this.getAllContent(1,20*this.contentPage,'')
    }
  }
  /** ************** *** ************** *** **************  start Image Gallery Modal*** ************** *** ************** *** ************** *** ************** */
  //get all content
  getAllContent(page,size,keyword) {
    console.log(page,size,keyword);
    // this.ImgArr = [];
    // this.videoArr = [];
  //  console.error(page,size)
    var isFirst;
    if(page === 1){
      isFirst = true;
    }else{
      isFirst = false;
    }
    this.blockUI.start("Loading...");
    // console.log(this.ImgArr)
      return new Promise((resolve, reject) => {
        this._service.getContent(this.regionID,page,size,keyword,this.contentType).subscribe(
          (res: any) => {
            this.result = res;
            this.contentRes=res;
            this.contentArr=res;
            this.content_size=size;
            if(this.modelType == 'multiple' || this.modelType == 'single'){
              if(res.length > 0){
                for (var i = 0; i < res.length; i++) {
                  if (this.contentType == "image") {
                    if (
                      res[i].type == "image/gif" ||
                      res[i].type == "image/png" ||
                      res[i].type == "image/jpeg"
                    ) {
                      this.ImgArr.push(res[i]);
                    }
                  } 
                }
                this.tempContentArr=this.ImgArr;
                console.log("ImgArr",this.tempContentArr)
              }else{
                this.ImgArr=this.ImgArr;
                console.log('ImgArr####',this.ImgArr)
              }

            }else{
              this.videoArr = res;
              if (isFirst == true) {
                this.videoArr = res;
                // this.isSearch = true;
                this.contentPage = 1;
                console.log(this.videoArr,'first time searching');
                this.tempContentArr = this.videoArr;
              }
              else{
                this.isSearch = false;
                res.map(content => {
                  this.videoArr.push(content)
                })
                console.log(this.videoArr,'not first time searching');
              }
            }
            resolve();
            this.blockUI.stop();
          },
          err => {
            console.log(err);
          }
        );
      });

  }



  showMoreContent(length){
    this.contentPage+=1;
    console.log(this.contentPage)
    console.log(this.ImgArr)
    this.getAllContent(this.contentPage,20,'');
    console.log(length)
  }
  //image upload
  onMetadata(e, id,type) {
    console.log("metadata: ", e);
    console.log("duration: ", e.target.duration);
    this.videoArr[id]["duration"] = e.target.duration;
    console.log(this.videoArr)
    return true;
  }
  uploadedVid = [];
  onloadImg(event, ele?) {
    if (this.isDrop) {
      var file = event;
      this.isDrop = false;
    } else {
      var file = event.target.files;
    }
    console.log(this.modelType)
    // console.error(this.contentPage)
    // console.error(this.selectedImgArr);
    // console.error(20*this.contentPage)
    this.blockUI.start("Loading...");
    this._service.loadImage(this.regionID, file).subscribe(
      (res: any) => {
        console.log("res.meta~~~",res.meta)
        //getAllContent() use pormise because of html create value after use in ts
        this.ImgArr=[];
        if(this.modelType == "single" || this.modelType == "multiple"){
          this.getAllContent(1,20*this.contentPage,'').then(() => {
            setTimeout(() => {
              console.log("res.meta~~~",res.meta)
              this.autoSelectedImg(res.meta,"img");
            }, 300);
          });
        }else{
          console.log("video upload")
          this.uploadedVid = res.meta
          this.getAllContent(1,20*this.contentPage,'').then(()=>{
            setTimeout(() => {
              console.log("res.meta~~~",res.meta)
              this.autoSelectedVideo(res.meta,"video");
            }, 300);
          })
        }
      
        this.blockUI.stop();
      },
      err => {
        console.log(err);
      }
    );
  }

  //this is use for autoselected when upload finish or deleted finsih (this is only selected previous selection image after upload)
  autoSelectedImg(resturnobj,type) {
    for (let i = 0; i < resturnobj.length; i++) {
      for (let j = 0; j < this.tempContentArr.length; j++) {
        if (resturnobj[i]._id == this.tempContentArr[j]._id) {
          console.log("to call onselecedImgDiv~~~")
            this.onslectedImgDiv(
              this.tempContentArr[j]._id,
              this.tempContentArr[j]
            );
          // break;
        }
      }
    }
  }

  autoSelectedVideo(resturnobj,type) {
    for (let i = 0; i < resturnobj.length; i++) {
      for (let j = 0; j < this.tempContentArr.length; j++) {
        if (resturnobj[i]._id == this.tempContentArr[j]._id) {
          console.log("to call onselecedImgDiv~~~")
            this.onslectedVideoDiv(
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
    console.log("onslectedImgDiv",img,i)
    if (this.modelType == "single") {
      //add selected
      if (!this.isRemove) {
        this.selectedImgArr = img;
        this.imgIdArr = i;
        this.isDisabelInsert = true;
        this.imgId = i;
      }
    } else {
      if (this.isRemove) {
        console.log("is remove image");
        this.selectedImgArr.splice(this.selectedImgArr.map(x => x._id).indexOf(i), 1);
        this.imgIdArr.splice(this.imgIdArr.indexOf(i), 1);
        this.isRemove = false;
      } else {
        if (this.imgIdArr.includes(i)) {
          this.selectedImgArr.splice(this.selectedImgArr.map(x => x._id).indexOf(i), 1);
          this.imgIdArr.splice(this.imgIdArr.indexOf(i), 1);
        } else {
          this.imgIdArr.push(i);
          this.selectedImgArr.push(img);
        }
      }
    }
    this.isRemove = false;
    // console.error(this.imgIdArr);
    // console.error("this.selectedImgArr", this.selectedImgArr);
  }

  onslectedVideoDiv(i,video){
    console.log(this.isRemove)
    if (this.isRemove) {
      // this.selectedVideoArr.splice(this.selectedVideoArr.map(x => x._id).indexOf(i), 1);
      // this.vidIdArr.splice(this.vidIdArr.indexOf(i),1);
      console.log("is remove",this.vidIdArr);
      this.isRemove = false;
    } else {
      if (this.vidIdArr.includes(i)) {
        this.selectedVideoArr.splice(this.selectedVideoArr.map(x => x._id).indexOf(i), 1);
        this.vidIdArr.splice(this.vidIdArr.indexOf(i), 1);
      } else {
        this.vidIdArr.push(i);
        this.selectedVideoArr.push(video);
      }
    }
  }

  //when over image from galery modal mouse over or mouse out
  onImgMouseEvent(e, i,type) {
    const imgDiv: HTMLElement = document.getElementById("img-" + i);
    const trash: HTMLElement = document.getElementById("trash" + i);
    const overlay: HTMLElement = document.getElementById("Imgoverlay" + i);
    // console.log(this.contentType)
    // console.log(imgDiv)
    // console.log(e)
    if (this.contentType == "video") {

      // console.log('invideo')
      // if ($(imgDiv).hasClass("highlight") && e.type == "mouseenter") {
      //   // console.log('inmouseenter')
      //   trash.setAttribute("style", "opacity: 1;");
      //   // console.log(trash)
      //   // console.log(overlay)
      //   overlay.setAttribute(
      //     "style",
      //     "display:block;  background: rgba(0, 0, 0, .3);"
      //   );
      // } else {
      //   trash.setAttribute("style", "opacity: 0;");
      //   overlay.setAttribute("style", " background: rgba(0, 0, 0, 0);");
      // }

    } else {
      if(type == "mouseenter"){
        this.isMouseOverID = i;
      }else{
        this.isMouseOverID = "";
      }
      // if (e.type == "mouseenter" && $(imgDiv).hasClass("addImgDivBorder")) {
      //   console.log("is me")
      //   trash.setAttribute("style", "opacity: 1;");
      //   overlay.setAttribute(
      //     "style",
      //     "display:block;  background: rgba(0, 0, 0, .3);"
      //   );
      // } else {
      //   trash.setAttribute("style", "opacity: 0;");
      //   overlay.setAttribute("style", " background: rgba(0, 0, 0, 0);");
      // }
    }

    // console.log(e.type)
  }
  isMouseOverID:any;
  onVidMouseEvent(e,vID, type){
    var videoId:any;
    // console.log("===>",vID)
    if(typeof vID == 'object'){
      if(vID._id == undefined){
        videoId = vID.contentId
      }else{
        videoId = vID._id
      }
    }else{
      videoId = vID;
    }
    if(type == "mouseenter"){
      // console.log("onVidMouseEvent",videoId)
      this.isMouseOverID = videoId;
    }else{
      this.isMouseOverID = "";
    }
  }
  //delete image
  onremoveClick(id) {
    this.ImgArr=[];
    this.isRemove = true;
    // console.error(this.contentPage*20)
    this._service.onDeleteContent(this.regionID, id).subscribe(
      (res: any) => {
        // this.contentArr=res.meta;
        this.toastr.success("Successfully Content deleted.");
        //getAllContent() use pormise because of html create value after use in ts
          this.getAllContent(1,(20*this.contentPage),'').then(() => {
            setTimeout(() => {
              if (this.modelType == "multiple") {
                this.imgIdArr.splice(this.imgIdArr.indexOf(id), 1);
                this.selectedImgArr.splice(this.selectedImgArr.map(x => x._id).indexOf(id), 1);
              } else if(this.modelType == "single") {
                this.imgId = undefined;
              }else if(this.modelType == "video" || this.modelType == "ansVideo"){
                console.log("video delete")
                this.vidIdArr.splice(this.vidIdArr.indexOf(id),1);
                this.selectedVideoArr.splice(this.selectedVideoArr.map(x => x._id).indexOf(id), 1);
              }
            }, 300);
          });
      },
      err => {
        console.error(err);
        this.toastr.error("Fail Content deleted.");
      }
    );
    // this.onslectedImgDiv(i,img,"exitBorder");
  }
  onVideoRemoveClick(id){
    console.error("on remove click")
    this.isRemove=true;
    this._service.onDeleteContent(this.regionID, id).subscribe(
      (res: any) => {
        // this.contentArr=res.meta;
        this.toastr.success("Successfully Content deleted.");
        //getAllContent() use pormise because of html create value after use in ts
          this.getAllContent(1,(20*this.contentPage),'').then(() => {
            setTimeout(() => {
                this.vidIdArr.splice(this.vidIdArr.indexOf(id),1);
                this.selectedVideoArr.splice(this.selectedVideoArr.map(x => x._id).indexOf(id), 1);
            }, 300);
          });
      },
      err => {
        console.error(err);
        this.toastr.error("Fail Content deleted.");
      }
    );
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
    console.log("this.selectEle",this.selectEle);
    if (this.selectEle != undefined) {
      if (
        this.selectEle.className == "img-wrapper" ||
        $(this.selectEle).parents(".img-wrapper").length > 0
      ) {
        return true;
      } else return false;
    }
  }
  changeTimeFormat(element , type){
    console.log("element",element)
    if(this.isVideo(element)){
      if(type == 'toString'){
        var timeString;
        var res;
        //validate for custom start time
        if(typeof element.start == "number"){
          timeString = String(new Date(element.start * 1000).toISOString().substr(11, 8));
          res= timeString.split(":");
          element.start = `${res[0]}h ${res[1]}m ${res[2]}s`;
        }else if(element.start == undefined){
          element.start = 0;
          timeString = String(new Date(element.start * 1000).toISOString().substr(11, 8));
          res= timeString.split(":");
          element.start = `${res[0]}h ${res[1]}m ${res[2]}s`;
        }
        if(typeof element.end == "number"){
          timeString = String(new Date(element.end * 1000).toISOString().substr(11, 8));
          console.log("time string",timeString);
          res= timeString.split(":");
          element.end = `${res[0]}h ${res[1]}m ${res[2]}s`;
        }else if(element.end == undefined){
          console.log("element duration",element.duration)
          timeString = String(new Date(element.duration * 1000).toISOString().substr(11, 8));
          console.log("time string",timeString);
          res= timeString.split(":");
          element.end = `${res[0]}h ${res[1]}m ${res[2]}s`;
        }
        

        // element.start = 0;
        // console.log("~~~duration",element.duration)
        // var timeString = String(new Date(element.duration * 1000).toISOString().substr(11, 8));
        // console.log("time string",timeString);
        // var res= timeString.split(":");
        // element.end = `${res[0]}h ${res[1]}m ${res[2]}s`;
        // timeString = String(new Date(element.start * 1000).toISOString().substr(11, 8));
        // res= timeString.split(":");
        // element.start = `${res[0]}h ${res[1]}m ${res[2]}s`;
      }
      else{
        let res = element.start.split(" ");
        let total = Number(res[0].slice(0, -1)) * 3600 +  Number(res[1].slice(0, -1)) * 60 + Number(res[2].slice(0, -1));
        element.startNumber = total;

        res =  element.end.split(" ");
        total = Number(res[0].slice(0, -1)) * 3600 +  Number(res[1].slice(0, -1)) * 60 + Number(res[2].slice(0, -1));
        element.endNumber  = total;
      }
    } 
  }
  isCollapseVid(content){
    var videoCount = 0;
    if(content.length>=1){
      content.map((cont)=>{
        console.log("cont~~~",cont)
        if(this.isVideo(cont)){
          videoCount += 1;
        }
      })
      if(videoCount >= 1){
        console.log("expand Video",videoCount)
        this.isCollapse = false
      }else{
        this.isCollapse = true;
      }
    }else{
      this.isCollapse = true;
    }
  }
  insertImg() {
    this.uploadedVid = [];
    var inImageWrapper = this.checkFocusPosition();
    console.log("###inImageWrapper",inImageWrapper)
    // console.log("editableID", this.editableId);
    // console.log("model type",this.modelType)
    if(this.editableId != ""){
      //insert for question
      if(this.modelType == 'video'){
        console.log("question ===== insert Video");
        var contArr = this.performanceDemands[this.focusType.parentIdx].questions[this.focusType.no].contents;
        Array.prototype.push.apply(contArr, this.selectedVideoArr);
        this.performanceDemands[this.focusType.parentIdx].questions[this.focusType.no].contents.forEach(element => {
          this.changeTimeFormat(element,'toString');
        });
        this.performanceDemands[this.focusType.parentIdx].questions[this.focusType.no].showVideo = true;
        console.log(this.performanceDemands)
        this.isCollapseVid(this.performanceDemands[this.focusType.parentIdx].questions[this.focusType.no].contents)
      }else{
        var res = this.editableId.split("-");
        console.log("question ===== insert img");
        var imgWrapperId = "img-" + ++res[1] + "-" + new Date().getTime();

        var e = document.getElementById(this.editableId);
        if (inImageWrapper) {
          console.log("this.range",this.range)
          for (var i in this.selectedImgArr) {
            // console.log(this.selectedImgArr[i].url, "img");
            var url = this.selectedImgArr[i].url;
            // console.log(url);
            // k.innerHTML += ('<div style="width: 120px;height: 120px;float:left;position:relative;background: #f2f4f5"><img style="width:100%;position:absolute;margin: auto;top:0;left:0;right:0;bottom:0;" src="'+url+'"></img><div>');
            console.log(this.selectEle)
            $(this.selectEle).append(
              $('<img class="editableImg" src="' + url + '"  ></img>')
            );
            k = this.selectEle;
            this.clickEle = this.selectEle
          }         
        } else {
          // var tempWrapperDiv = $(
          //   `<div id="${imgWrapperId}" class="img-wrapper"></div>`
          // );
         console.log("window.getSelection###",window.getSelection())
          // $(this.selectEle).append(tempWrapperDiv);
          var selectionContents = this.range.extractContents();
          console.log(selectionContents)
          var tempWrapperDiv = document.createElement("div");
          tempWrapperDiv.id = imgWrapperId;
          tempWrapperDiv.className = "img-wrapper";
          // div.style.color = "yellow";
          // tempWrapperDiv.innerHTML = '<div id="${imgWrapperId}" class="img-wrapper"></div>'
          tempWrapperDiv.appendChild(selectionContents);
          this.range.insertNode(tempWrapperDiv);
          this.range = this.range.cloneRange();
          this.range.setStartAfter(tempWrapperDiv);
          this.range.collapse(true);
          this.sel.removeAllRanges();
          this.sel.addRange(this.range);
          this.clickEle = tempWrapperDiv;
          console.log(this.sel)
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
      }
    }else{
      // insert for pd and answer
      if(this.modelType == "single"){
        console.log("answer Img === ", $(".answer-img"));
        this.performanceDemands[this.pdIndex].questions[
          this.questionIndex
        ].answers[this.answerIndex].imgUrl = this.selectedImgArr.url;
      }else if(this.modelType == "ansVideo"){
        console.log("answer insert Video ===",this.focusType)
        // console.log("focusType",this.focusType.no,this.focusType.parentIdx,this.focusType.parentQuesIdx)
        // console.log("focus answer content",)
        var contArr = this.performanceDemands[this.focusType.parentIdx].questions[this.focusType.parentQuesIdx].answers[this.focusType.no].contents;
        Array.prototype.push.apply(contArr, this.selectedVideoArr);
        this.performanceDemands[this.focusType.parentIdx].questions[this.focusType.parentQuesIdx].answers[this.focusType.no].contents.forEach(element => {
          console.log("~~~",element)
          this.changeTimeFormat(element,'toString');
        });
        console.log(this.performanceDemands)
        this.isCollapseVid(this.performanceDemands[this.focusType.parentIdx].questions[this.focusType.parentQuesIdx].answers[this.focusType.no].contents)
      }else if(this.modelType == "video"){
        console.log("pd Insert Video======",this.selectedVideoArr);
        var contArr = this.performanceDemands[this.focusType.no].contents;
        Array.prototype.push.apply(contArr, this.selectedVideoArr);
        console.log("contArr",contArr);
        console.log(this.settingContents)
        console.log(this.selectedVideoArr)
        this.performanceDemands[this.focusType.no].contents.forEach(element => {
          // console.error(element)
          this.changeTimeFormat(element,'toString')
          // element.start = 0;
          // var timeString = String(new Date(element.duration * 1000).toISOString().substr(11, 8));
          // var res= timeString.split(":");
          // element.end = `${res[0]}h ${res[1]}m ${res[2]}s`;
          // timeString = String(new Date(element.start * 1000).toISOString().substr(11, 8));
          // res= timeString.split(":");
          // element.start = `${res[0]}h ${res[1]}m ${res[2]}s`;
          // element.start = 0;
          // element.end = element.duration;
        });
        this.isCollapseVid(this.performanceDemands[this.focusType.no].contents)
        console.log(this.performanceDemands);
      }else if(this.modelType == "multiple"){
        console.log("pd Insert Img======");
        var contArr = this.performanceDemands[this.focusType.no].contents;
        Array.prototype.push.apply(contArr, this.selectedImgArr);
        console.log(this.performanceDemands);
      }
    }
    this.cancelModal();
    console.log($(".editableImg"));
  }

  mouseOver(e, type , i , idx1, idx2) {
    console.log("mouseover",e, i, idx1, idx2);
    this.showRemove = true;
    if(type == 'pdRMI'){
      this.hoverIcon = type + '-' + i + idx1;
    }else{
      this.hoverIcon = type + '-' + i + idx1 + idx2;
    }
    // console.log(e.target.className);
    // console.log("over ");
    // console.log($(event.target).children(".img-pd"));
    // console.log($(event.target).siblings(".img-pd"));
    // if ($(e.target).hasClass("question-vd")) {
    //   $(e.target)
    //     .children(".img-pd")
    //     .show();
    // }
    // if ($(e.target).hasClass("editablePDImg")) {
    //   $(e.target)
    //     .siblings(".img-pd")
    //     .show();
    // }
    // if ($(e.target).hasClass("innerPd")) {
    //   $(e.target)
    //     .children(".img-pd")
    //     .show();
    // }
  }
  mouseOut(event) {
    console.log("mouse out",event.offsetX , event.offsetY)
    console.log(event.target)
    this.showRemove = false;
    this.hoverIcon = "";
    // if (event.offsetX >= 119 || event.offsetX < 0) {
    //   if ($(event.target).hasClass("editablePDImg")) {
    //     $(event.target)
    //       .siblings(".img-pd")
    //       .hide();
    //   }
    //   if ($(event.target).hasClass("innerPd")) {
    //     $(event.target)
    //       .children(".img-pd")
    //       .hide();
    //   }
    // } else if (event.offsetY >= 119 || event.offsetY < 0) {
    //   if ($(event.target).hasClass("editablePDImg")) {
    //     $(event.target)
    //       .siblings(".img-pd")
    //       .hide();
    //   }
    //   if ($(event.target).hasClass("innerPd")) {
    //     $(event.target)
    //       .children(".img-pd")
    //       .hide();
    //   }
    // } else console.log("out but not out", this.showRMIcon);

  }

  showID: any;
  onFocus(type, idx1, idx2, idx3) {
    // this.settingContents = [];
    this.editableId = "";
    this.focusPlace = "";
    this.answerTootips = "";
    var tempType = this.focusType.type;
    this.focusType.type = type;
    this.showID = "";
    console.log(this.performanceDemands , type , idx1);
    console.log(this.performanceDemands.length);
    this.showSetting();
    switch (type) {
      case "pd":
      console.log("###",this.focusType.no != idx1 || tempType != type)
        // if(this.focusType.no != idx1 || tempType != type)
          // this.isCollapse = true;
        var pdContent = this.performanceDemands[idx1].contents;
        if(pdContent!= undefined){
          this.isCollapseVid(pdContent)
        }

        this.showID = "";
        this.focusPlace = "pd" + idx1;
        this.focusType.no = idx1;
        this.focusType.parentIdx = "";
        this.performanceDemands[idx1].showTooltip = true;
        // this.performanceDemands[idx1].contents.forEach(element => {
        //   if(this.isVideo(element))
        //     this.settingContents[idx1].push(element);
        // console.log(this.settingContents)
        // });
        break;
      case "question":
      // if(this.focusType.no != idx2 || tempType != type || this.focusType.parentIdx != idx1) 
        // this.isCollapse = true;
        var quesContent = this.performanceDemands[idx1].questions[idx2].contents;
        if(quesContent!=undefined){
          this.isCollapseVid(quesContent)
        }

        this.showID = "q" + idx1 + idx2;
        this.focusPlace = "q" + idx1 + idx2;
        this.focusType.no = idx2;
        this.focusType.parentIdx = idx1;
        this.editableId = "q" + "-" + idx1 + "-" + idx2;
        this.dragItem = document.getElementById(this.editableId);
        // this.performanceDemands[idx1].question[idx2].showTooltip = true;
        break;
      case "check":
        var ansContent = this.performanceDemands[idx1].questions[idx2].answers[idx3].contents;
        if(ansContent!=undefined){
          this.isCollapseVid(ansContent)
        }
        this.showID = "";
        this.focusPlace = "a" + idx1 + idx2 + idx3;
        this.focusType.no = idx3;
        this.focusType.parentIdx = idx1;
        this.focusType["parentQuesIdx"] = idx2; 
        if (type == "check") {
          this.focusType.type = "answer";
        }
        break;
      case "answer":
      // if(this.focusType.no != idx2 || tempType != type)
      // this.isCollapse = true;
        var ansContent = this.performanceDemands[idx1].questions[idx2].answers[idx3].contents;
        if(ansContent!=undefined){
          this.isCollapseVid(ansContent)
        }
        this.focusPlace = "a" + idx1 + idx2 + idx3;
        this.focusType.no = idx3;
        this.focusType.parentIdx = idx1;
        this.focusType["parentQuesIdx"] = idx2; 
        console.log(this.focusType)
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
    } else if (itemType.type == "question") {
      if (this.performanceDemands[itemType.parentIdx].questions.length > 1) {
        this.performanceDemands[itemType.parentIdx].questions.splice(
          itemType.no,
          1
        );
      }
    }else{
      if(this.performanceDemands[itemType.parentIdx].questions[itemType.parentQuesIdx].answers.length > 1){
        this.performanceDemands[itemType.parentIdx].questions[itemType.parentQuesIdx].answers.splice(itemType.no,1);
      }
    }
    this.focusType = {};
    this.showSettingSidebar = false;
  }

  cancelConcept(type) {
    this.showHideSideBar('show')
    this.conceptCreate = false;
    this.conceptEdit = false;
    this.testWerkzCategory = false;
    this.conceptList = true;
    this.pageConcept=1;
    this.performanceDemands = [];
    this.concept = {
      name: "",
      id: ""
    };
    this.focusType = {};
    this.ischecked = "";
    this.performanceDemands = [];
    this.ptest = [];
    this.pickedTag = {
      "id": "",
      "name": "",
      "state": ""
    };
    if (type == "redirect") {
      this.getConceptLists(1,20);
    }
    this.isCollectionList=true;
    
  }
  // HSYL code
  inputQuestion(quesId, type) {
    console.log("event", quesId);
    this.turn(quesId, type);
  }

  public isConceptFormValid = false; // Global
  public isCollectionFormValid = false; // Global

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
        const test = quest.answers.map(ans => {
          if (
            (ans.answer == "" && ans.imgUrl != "") ||
            (ans.answer != "" && ans.imgUrl == "") ||
            (ans.answer != "" && ans.imgUrl != "")
          ) {
            // console.log("has one~~~");
            // has on ans (Img Or text)
            noAnswer = true;
          } else if (ans.answer == "" && ans.imgUrl == "") {
            // console.log("not has one")
            noAnswer = false;
          }
          // else{
          //   console.log("true~~~");
          // }
        });
        if (noAnswer) {
          return quest.answers.some(ans => ans.correctness === 100);
        }

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
          return content + '  \n';
        }
      });
      // turndownService.addRule("Test", {
      //   filter: "p",
      //   replacement: function(content) {
      //     return content + '  \n';
      //   }
      // });
      var tempStr = turndownService.turndown(myDiv);
      // console.log("tempStr",tempStr)
      if(tempStr.includes("![](./assets/images/remove-white.png)")){
        markdownQues = this.replaceAll('![](./assets/images/remove-white.png)','',tempStr);
        // markdownQues = tempStr.replace("![](./assets/images/remove-white.png)", "");
      }else{
        markdownQues = tempStr;
      }
      // console.log("html",myDiv.innerHTML)
      // console.log("turn to markdown", markdownQues);
      this.performanceDemands[fType.parentIdx].questions[
        fType.no
      ].html.question = String(myDiv.innerHTML);
      this.performanceDemands[fType.parentIdx].questions[
        fType.no
      ].question = markdownQues;
      // console.log("questions", this.performanceDemands[fType.parentIdx].questions);
    }, 200);
  }

  replaceAll(find, replace, str) 
    {
      while( str.indexOf(find) > -1)
      {
        str = str.replace(find, replace);
      }
      return str;
    }

  removePDImg(img, idx, pdIdx) {
    console.log("Delete Img", img);

    this.performanceDemands[pdIdx].contents.splice(idx, 1);
    this.isCollapseVid(this.performanceDemands[pdIdx].contents)
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
    const tempArr = [];
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
    var tempContentArray = [];
    var tempAnsContentArr = [];
    console.log("question contents~~~",question.contents)
    question.contents.map( (contentObj,index) => {
      _this.changeTimeFormat(contentObj,'temp')
      if(contentObj.duration){
        var tempVideoContentObj = {
          contentId: "",
          sequence: 0,
          start:0,
          end: 0,
          duration: 0
        };
        tempVideoContentObj.contentId = contentObj._id;
        tempVideoContentObj.sequence = ++index;
        tempVideoContentObj.start =  contentObj.startNumber;
        tempVideoContentObj.end = contentObj.endNumber;
        if(contentObj.duration!= undefined){
          tempVideoContentObj.duration = contentObj.duration;
        }
        tempContentArray.push(tempVideoContentObj);
      }else{
        var tempImgContentObj = {
          contentId: "",
          sequence: 0,
        };
        tempImgContentObj.contentId = contentObj._id;
        tempImgContentObj.sequence = ++index;
        tempContentArray.push(tempImgContentObj);
      }
    })

    question.answers.map(answer => {
      tempAnsContentArr = [];
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
      if(answer.contents.length >=1){
        answer.contents.map((ansCont,index) => {
          console.log("idx",index,"ansCont",ansCont)
          _this.changeTimeFormat(ansCont,'temp');
          if(ansCont.duration){
            var tempVideoContentObj = {
              contentId: "",
              sequence: 0,
              start:0,
              end: 0,
              duration: 0
            };
            tempVideoContentObj.contentId = ansCont._id;
            tempVideoContentObj.sequence = ++index;
            tempVideoContentObj.start =  ansCont.startNumber;
            tempVideoContentObj.end = ansCont.endNumber;
            if(ansCont.duration!= undefined){
              tempVideoContentObj.duration = ansCont.duration;
            }
            tempAnsContentArr.push(tempVideoContentObj);
          }else{
            var tempImgContentObj = {
              contentId: "",
              sequence: 0,
            };
            tempImgContentObj.contentId = ansCont._id;
            tempImgContentObj.sequence = ++index;
            tempAnsContentArr.push(tempImgContentObj);
          }
        })
        tempObj.contents = tempAnsContentArr;
      }
      console.log("~~~",tempObj);
      tempArr.push(tempObj);
      console.log(tempArr);
      console.log("ques answer~~~",answer)

      // tempObj.contents = tempContentArray;
      
    });
    
    questionFormat.answers = tempArr;
    questionFormat.questionType = question.questionType;
    questionFormat.question = question.question;
    questionFormat.html = question.html;
    questionFormat.contents = tempContentArray;
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
      console.log(contentObj)
      _this.changeTimeFormat(contentObj,'temp')
      if(contentObj.duration){
        var tempVideoContentObj = {
          contentId: "",
          sequence: 0,
          start:0,
          end: 0,
          duration: 0
        };
        tempVideoContentObj.contentId = contentObj._id;
        tempVideoContentObj.sequence = ++index;
        tempVideoContentObj.start =  contentObj.startNumber;
        tempVideoContentObj.end = contentObj.endNumber;
        if(contentObj.duration!= undefined){
          tempVideoContentObj.duration = contentObj.duration;
        }
        tempContentArray.push(tempVideoContentObj);
      }else{
        var tempImgContentObj = {
          contentId: "",
          sequence: 0,
        };
        tempImgContentObj.contentId = contentObj._id;
        tempImgContentObj.sequence = ++index;
        tempContentArray.push(tempImgContentObj);
      }
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
          tagId: this.pickedTag.id
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
      console.log("Error in pdLoopDone", error);
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
  // june june code start (getSingleConcept)
  // async onUpdateTeskWerkz(id) {
  //   console.log(id);
  //   this.conceptId = id;
  //   this.showSettingSidebar = false;
  //   this.conceptEdit = true;
  //   this.testWerkzCategory = false;
  //   this.conceptList = false;
  //   console.log(this.conceptList);
  //   await this._service.getConceptById(this.regionID, id).subscribe(
  //     async (res: any) => {
  //       console.log(res);
  //       this.conceptsObj = res;
  //       this.concept.name = res.name;
  //       await this.getPDById(res.pd);
  //     },
  //     err => {
  //       console.log(err);
  //     }
  //   );
  //   console.log(this.ptest);
  //   this.performanceDemands = this.ptest;
  // }

  // async getPDById(pdObj) {
  //   for (let i = 0; i < pdObj.length; i++) {
  //     console.log(pdObj[i]);
  //     await this._service.getPDById(this.regionID, pdObj[i].pdId).subscribe(
  //       async (res: any) => {
  //         console.log(res);
  //         this.ptest.push(res);
  //         await this.getQueById(res.questions, i);
  //       },
  //       err => {
  //         console.log(err);
  //       }
  //     );
  //   }
  // }

  // getQueById(qObj, id) {
  //   console.log(this.ptest, id);
  //   for (let i = 0; i < qObj.length; i++) {
  //     this._service.getQuesById(this.regionID, qObj[i].questionId).subscribe(
  //       (res: any) => {
  //         console.log(res.html.question);
  //         this.markDownHtml_arr.push(res.html.question);
  //         setTimeout(() => {
  //           document.getElementById("q-" + id + "-" + i).innerHTML =
  //             res.html.question;
  //           console.log(document.getElementById("dd"));
  //         }, 200);
  //         this.ptest[id].showTooltip = false;
  //         this.ptest[id].questions[i] = res;
  //       },
  //       err => {
  //         console.log(err);
  //       }
  //     );
  //     // const inner_markDown:HTMLElement= document.getElementById('q-'+id+i);
  //     // console.log("q-"+id+i);
  //     // console.log(inner_markDown);
  //   }
  // }
// june june code end (getSingleConcept)

// WaiYan code Start(getSingleConcept)
  getSingleConcept(cID){
    console.log("getSingleConcept works");
    const _that =this;
    _that.conceptEdit = true;
    _that.isCollectionList=false;
    _that.blockUI.start('Loading');
    _that._service.getConceptById(_that.regionID, cID).subscribe((res:any) => {
      console.log("SingleConcept",res)
      _that.conceptsObj = res;
      _that.concept.name = res.name;  
      _that.concept.id = res._id; 
      _that.pickedTag.id = res.tag[0].tagId;
      _that.pickedTag.name = res.tag[0].name;
      _that.ischecked = res.tag[0].tagId;
      // _that.blockUI.start('Loading') 
      async.map(
        res.pd, 
        _that.getPDID.bind(null,_that), 
        _that.getPDbyID.bind(null,_that)
      )  
      _that.conceptId = cID;
      this.showHideSideBar('hide')
      _that.showSettingSidebar = false;
      _that.testWerkzCategory = false;
      _that.conceptList = false;  
      // setTimeout(() => {  
      //   _that.blockUI.stop()
      // }, 500);
    },err =>{
      console.log(err)
    })

  }
  getPDID(_that,pd,callback){
    // console.log(pd.pdId, 'getPDID function ')
    callback(null,pd.pdId)
  }

  getPDbyID(_that,error,result){
    if(error){
      // console.error(error, 'error in getPDbyID function')
      console.log(error, 'error in getPDbyID function')
    }
    console.log('getPDbyID function',result)
    async.map(
      result,
      _that.getPDObject.bind(null,_that),
      _that.pdObjectArray.bind(null,_that)
    )
  }
  getPDObject(_that,pdObj,callback){
    // console.log(pdObj,'getPDObject function')
    _that._service.getPDById(_that.regionID, pdObj).subscribe(res => {
      // console.log(res)
      callback(null,res)
    },err => {
      console.log(err)
    })
  }
  pdObjectArray(_that,error,result){
    if(error){
      console.error(error, 'error in pdObjectArray function')
    }
    // console.log(result,'pdObjectArray function')
    _that.ptest = result
    console.log(_that.ptest);
    async.map(
      result,
      _that.getSinglePd.bind(null,_that,result),
      // _that.getSinglePd.bind(null,_that)
    )
  }
  getSinglePd(_that,result,singlePD,callback){
    // console.log(result);
    // console.log(singlePD)
    var pdIndex  = result.indexOf(singlePD)
    // console.log(pdIndex);
    async.map(
      singlePD.questions,
      _that.getQuestionArray.bind(null,_that,singlePD.questions),
      _that.getgQuestionObject.bind(null,_that,pdIndex,singlePD.questions)
      )
    // callback(null,'singlePD')
  }

  getSinglePdDone(_that,error,result){
    console.log(result);
  }

  getQuestionArray(_that,questionArray,question,callback){
    // console.log(question, 'getQuestionArray function')
    callback(null,question.questionId)
  }
  getgQuestionObject(_that,pdIndex,questionArray,error,result){
    if(error){
      console.log(error, 'error in getgQuestionObject function')
    }
    // console.log(questionArray);
    // console.log(result, 'getgQuestionObject function')
    async.map(
      result,
      _that.getQuesById.bind(null,_that,pdIndex,result),
      _that.assignValue.bind(null,_that,pdIndex)
    )
  }
  getQuesById(_that,pdIndex,result,Id,callback){
    // console.log(result);
    // console.log(pdIndex);
    // console.log(result.indexOf(Id))
    _that._service.getQuesById(_that.regionID,Id).subscribe(res => {
      // console.log(res);
      callback(null,res)
    },err => {
      console.log(err);
    })
  }
  assignValue(_that,pdIndex,error,result){
    if(error){
      console.log(error,'error in assignValue function');
    }
    _that.ptest[pdIndex].questions = result;
    _that.performanceDemands = _that.ptest;

    console.log("assign PD",_that.performanceDemands[pdIndex].name)
    _that.performanceDemands[pdIndex].contents.map((cont)=>{
      if(_that.isVideo(cont)){
        // cont["duration"] = cont.end
        if(cont.duration != undefined){
          cont["duration"] = cont.duration
        }else{
          cont["duration"] = cont.end
        }
        setTimeout(()=>{
          _that.changeTimeFormat(cont,'toString')
        },50)
      }
    })
    _that.performanceDemands[pdIndex].questions.map((question,Qindex) => {
      // format duration time for question content array 
      if(question.contents != undefined){
        question.contents.map((quesCont)=>{
          // console.log("###Q content",quesCont)
          if(_that.isVideo(quesCont)){
            // quesCont["duration"] = quesCont.end
            if(quesCont.duration != undefined){
              quesCont["duration"] = quesCont.duration
            }else{
              quesCont["duration"] = quesCont.end
            }
            setTimeout(()=>{
              _that.changeTimeFormat(quesCont,'toString')
            },50)
          }
        })
      }
      setTimeout(() => {
        if ( question.html) {
          document.getElementById("q-" + pdIndex + "-" + Qindex).innerHTML =
          question.html.question;
        }
      }, 200);
      question.answers.map((ans)=>{
        if(ans.contents != undefined){
          // console.log("answerContents",ans.contents)
          ans.contents.map((ansCont)=> {
            if(_that.isVideo(ansCont)){
              console.log("ansCont~~~",ansCont)
              // ansCont["duration"] = ansCont.end
              if(ansCont.duration != undefined){
                ansCont["duration"] = ansCont.duration
              }else{
                ansCont["duration"] = ansCont.end
              }
              setTimeout(()=>{
                _that.changeTimeFormat(ansCont,'toString')
              },50)
            }
          })
        }
      })
    })
    setTimeout(()=>{
      _that.blockUI.stop()
    },500)
  }
  //end get method
// WaiYan code end(getSingleConcept)

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
      console.log("Error in pdLoopDone", error);
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
          tagId: this.pickedTag.id
        }
      ],
      pd: [],
      contents: []
    };

    conceptFormat.pd = formattedPdIds;
    this._service.updateConcept(this.regionID, conceptFormat, cid).subscribe(
      res => {
        console.log("FINALLY", res);

        // this.cancelConcept("redirect");
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
   var tempContentArray = [];
   var tempAnsContentArr = [];
    question.contents.map( (contentObj,index) => {
      // console.error(contentObj)
      _this.changeTimeFormat(contentObj,'temp')
      if(contentObj.duration){
        var tempVideoContentObj = {
          contentId: "",
          sequence: 0,
          start:0,
          end: 0,
          duration: 0
        };
        if(contentObj._id == undefined){
          tempVideoContentObj.contentId = contentObj.contentId;
        }else{
          tempVideoContentObj.contentId = contentObj._id;
        }
        // tempVideoContentObj.contentId = contentObj._id;
        tempVideoContentObj.sequence = ++index;
        tempVideoContentObj.start =  contentObj.startNumber;
        tempVideoContentObj.end = contentObj.endNumber;
        if(contentObj.duration!= undefined){
          tempVideoContentObj.duration = contentObj.duration;
        }
        tempContentArray.push(tempVideoContentObj);
      }else{
        var tempImgContentObj = {
          contentId: "",
          sequence: 0,
        };
        if(contentObj._id == undefined){
          tempImgContentObj.contentId = contentObj.contentId;
        }else{
          tempImgContentObj.contentId = contentObj._id;
        }
        // tempImgContentObj.contentId = contentObj._id;
        tempImgContentObj.sequence = ++index;
        tempContentArray.push(tempImgContentObj);
      }
    })

    question.answers.map(answer => {
      tempAnsContentArr = [];
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
      if(answer.contents.length >=1){
        console.log("ans conr",answer.contents)
        answer.contents.map((ansCont,index) => {
          console.log("idx",index,"ansCont",ansCont)
          _this.changeTimeFormat(ansCont,'temp');
          if(ansCont.duration){
            var tempVideoContentObj = {
              contentId: "",
              sequence: 0,
              start:0,
              end: 0,
              duration: 0
            };
            if(ansCont._id == undefined){
              tempVideoContentObj.contentId = ansCont.contentId;
            }else{
              tempVideoContentObj.contentId = ansCont._id;
            }
            // tempVideoContentObj.contentId = ansCont._id;
            tempVideoContentObj.sequence = ++index;
            tempVideoContentObj.start =  ansCont.startNumber;
            tempVideoContentObj.end = ansCont.endNumber;
            if(ansCont.duration!= undefined){
              tempVideoContentObj.duration = ansCont.duration;
            }
            tempAnsContentArr.push(tempVideoContentObj);
          }else{
            var tempImgContentObj = {
              contentId: "",
              sequence: 0,
            };
            if(ansCont._id == undefined){
              tempImgContentObj.contentId = ansCont.contentId;
            }else{
              tempImgContentObj.contentId = ansCont._id;
            }
            tempImgContentObj.contentId = ansCont._id;
            tempImgContentObj.sequence = ++index;
            tempAnsContentArr.push(tempImgContentObj);
          }
        })
        tempObj.contents = tempAnsContentArr;
      }
      console.log(tempObj);
      testArr.push(tempObj);
      console.log(testArr);
    });
    questionFormat.answers = testArr;
    questionFormat.questionType = question.questionType;
    questionFormat.question = question.question;
    questionFormat.html = question.html;
    questionFormat.contents=tempContentArray;
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
  deleteAnswerImg(i, j, index) {
    this.performanceDemands[i].questions[j].answers[index].imgUrl = "";
  }
  onmouseEnter(e, i, j, index) {
    var Id = String(i) + String(j) + String(index);
    var imgId = $("#imgID" + Id);
    imgId[0].style.display = "block";
  }
  onmouseLeave(event, i, j, index) {
    var Id = String(i) + String(j) + String(index);
    var imgId = $("#imgID" + Id);
    imgId[0].style.display = "none";
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
      _this.changeTimeFormat(contentObj,'temp')
      
      // if(contentObj._id == undefined){
      //   tempContentObj.contentId = contentObj.contentId;
      // }else{
      //   tempContentObj.contentId = contentObj._id;
      // }
      if(contentObj.duration){
        var tempVideoContentObj = {
          contentId: "",
          sequence: 0,
          start:0,
          end: 0,
          duration:0
        };
        if(contentObj._id == undefined){
          tempVideoContentObj.contentId = contentObj.contentId;
        }else{
          tempVideoContentObj.contentId = contentObj._id;
        }
        // tempContentObj.contentId = contentObj.contentId;
        // tempVideoContentObj.contentId = contentObj._id;
        tempVideoContentObj.sequence = ++index;
        tempVideoContentObj.start =  contentObj.startNumber;
        tempVideoContentObj.end = contentObj.endNumber;
        if(contentObj.duration!= undefined){
          tempVideoContentObj.duration = contentObj.duration;
        }
        tempContentArray.push(tempVideoContentObj);
      }else{
        var tempImgContentObj = {
          contentId: "",
          sequence: 0,
        };
        if(contentObj._id == undefined){
          tempImgContentObj.contentId = contentObj.contentId;
        }else{
          tempImgContentObj.contentId = contentObj._id;
        }
        // tempImgContentObj.contentId = contentObj._id;
        tempImgContentObj.sequence = ++index;
        tempContentArray.push(tempImgContentObj);
      }
      console.log("###############contentObj._id",contentObj._id);
      console.log("###",contentObj.contentId)
      
      // tempContentArray.push(tempContentObj);
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
    }else{
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
      this.cancelConcept('redirect');
    })
  }
  isVideo(img){
    let testString = img.type;
    if(testString.includes("video"))
      return true;
    else 
      return false;
  }
  onClickSettingArrow(e){
    console.log(e)
    console.log(this.focusType)
    console.log(this.performanceDemands)
    this.contentType = 'video';
    // if(this.isCollapse)
    //   this.getAllContent();
    this.isCollapse = !this.isCollapse;
  }
  onselectedVid:any;
  onselectedVideoDiv(e,id,video){
    var videoId:any;
    if(video._id == undefined){
      videoId = video.contentId;
      this.onselectedVid = videoId; 
    }else{
      videoId = video._id;
      this.onselectedVid = videoId; 
    }

    // this.onselectedVid = videoId; 
    // if($(e.target).hasClass('duration')){

    // }else{
    //   // $(".vd").children("video").removeClass("highlight-video")
    //   $(".duration-wrapper").hide();
    //   console.log(this.focusType)
    //   console.log(this.performanceDemands)
    //   var videoDiv = $(e.target).parents(".vd");
    //   // console.log(new Date(video.duration * 1000).toISOString().substr(11, 8));
    //   // var timeString = String(new Date(video.end * 1000).toISOString().substr(11, 8));
    //   // // console.log(timeString)
    //   // var res= timeString.split(":");
    //   // video.end = `${res[0]}h ${res[1]}m ${res[2]}s`;
    //   // video.start = 0;
    //   videoDiv.children(".duration-wrapper").show();
    //   // videoDiv.children("video").toggleClass("highlight-video");
    //   // if(videoDiv.children("video").hasClass("highlight-video")){
    //   //   videoDiv.children(".setting-trash").css('opacity','1');
        
    //   // }else
    //   // videoDiv.children("i").css('opacity','0');
    // }
    
  }
  onHoverVideoDiv(e,id){
    // console.log(id)
    // console.log(e.target)
    // console.log($(e.target).children("video"))
    // console.log($(e.target).children("i"))
    // if(e.type == "mouseenter"){
    //   if($(e.target).children("video").hasClass("highlight-video"))
    //     $(e.target).children(".setting-trash").css('opacity','1');
    //   else
    //     $(e.target).children(".setting-trash").css('opacity','0');
    // }
    // else
    //   $(e.target).children(".setting-trash").css('opacity','0');
  }
  deleteSettingContents(i){
    // this.settingContents[this.focusType.no].contents.splice(i, 1)
    // console.log(this.focusType)
    let videoArr = [];
    console.log(i)
    if(this.focusType.type == 'pd'){
      console.log(this.performanceDemands[this.focusType.no])
      this.performanceDemands[this.focusType.no].contents.forEach((element,ind) => {
        if(this.isVideo(element)){
          console.log(ind)
          videoArr.push(ind)
        }
      });
      var deleteId = videoArr[i]
      this.performanceDemands[this.focusType.no].contents.splice(deleteId, 1)
      this.isCollapseVid(this.performanceDemands[this.focusType.no].contents)
    }
    else if(this.focusType.type == 'question'){
      this.performanceDemands[this.focusType.parentIdx].questions[this.focusType.no].contents.splice(i, 1)
      this.isCollapseVid(this.performanceDemands[this.focusType.parentIdx].questions[this.focusType.no].contents)
    }
    else{
      this.performanceDemands[this.focusType.parentIdx].questions[this.focusType.parentQuesIdx].answers[this.focusType.no].contents.splice(i,1)
      this.isCollapseVid(this.performanceDemands[this.focusType.parentIdx].questions[this.focusType.parentQuesIdx].answers[this.focusType.no].contents)
    }
  }
  removeQuestionVideo(video , i){
    console.log(this.performanceDemands[this.focusType.parentIdx].questions[this.focusType.no])
    this.performanceDemands[this.focusType.parentIdx].questions[this.focusType.no].contents.splice(i, 1)
    this.isCollapseVid(this.performanceDemands[this.focusType.parentIdx].questions[this.focusType.no].contents)
  }

  //start collection group
  getCollectionlist(page,size) {
    this.blockUI.start("Loading");
    console.log(page,size)
    this._service.getAllCollection(this.regionID,1,size).subscribe((res: any) => {
      console.log(res)
      console.log(res.slice(0,3));
      this.collectionArr_slice=res.slice(0,3);
      this.collectionarr=res;
      setTimeout(() => {
        this.blockUI.stop();
      }, 300);
    });
  }

  getCollectionSearch(keyword){
    this.blockUI.start("Loading...");
    this._service.getCollectionBySearch(this.regionID,keyword).subscribe(
      (res: any) => {
        console.log(res);
        this.collectionarr=res;
        this.blockUI.stop();
      },
      err => {
        console.log(err);
      }
    );
  }

  goToCollection(){
    console.log(this.collectionarr)
    this.isCollection=true;
    this.isCollectionList=false;
    this.conceptList=false;
    this.isTestwerkztitle=false;
    // this.selectedConcept=[];
    // this.collectionId="";
    // this.collectionName="";
  }

  goToaddNewCollection(){
    this.isCollectionCreate=true;
    this.conceptEdit=false;
    this.isCollection=false;
    this.isCollectionList=false;
    this.conceptList=false;
    this.isTestwerkztitle=false;
  }
  
  backTocollectionList(){
  
    this.isCollectionList=false;
    this.isCollection=true;
    this.conceptList=false;
    this.isCollectionCreate=false;
    this.isCollectionEdit=false;
    this.isTestwerkztitle=false;
    this.selectedConcept=[];
    this.collectionId="";
    this.collectionName="";
    this.collectionDescription="";
  }
  // start concept search
  focusSearch(e) {
    console.log(e)
  
    this.isFocus_collection = true;
    // this.showfixedcreate = true;
    // this.apgList = [];
    this.concept_in_collection=[];
    // this.conceptsArr=[];
  }

  hideSearch(e) {
    console.log(e)
    setTimeout(() => {
      this.isFocus_collection  = false;
      // this.showfixedcreate = false;
    }, 300);
  }

  changeSearch(keyword, type) {
    console.log(keyword,type)
    if (keyword == 0 || keyword == "") {
      this.concept_in_collection=[];
      console.log(this.concept_in_collection)
      // this.getAllAPG(20, 0)
    } else {
      this.getConceptSearch(keyword);
    }
  }

  getConceptSearch(keyword){
    // console.error(this.isCollectionList,this.pageConcept)
    this.blockUI.start("Loading...");
    this._service.getAllConceptBySearch(this.regionID,keyword).subscribe(
      (res: any) => {
        console.log(res)
        if(this.isCollectionList){
          this.conceptsArr=res;
        }else{
          this.concept_in_collection=res;
        }
        this.blockUI.stop();
      },
      err => {
        console.log(err);
      }
    );
  }


  

  selectData(id) {
    console.log(id)
      // this.singleAPG(id);
      // this.selectedAPGlists = true;
    this._service.getConceptById(this.regionID,id).subscribe(
      (res: any) => {
        console.log(res)
        res.isExpand=false;
        this.selectedConcept.push(res);
     
        // this.blockUI.stop();
        this.isfocus = false;
      },
      err => {
        console.log(err);
      }
    );
   

  }

  removeSelectedConcept(data) {
    console.log(data)
    console.log(this.selectedConcept)
    // this.model = '';
    var index = this.selectedConcept.findIndex(function (element) {
      return element._id === data._id;
    })
    if (index !== -1) {
      this.selectedConcept.splice(index, 1)
    }
    console.log(this.selectedConcept)
  }

  expandAccessPoint(i, ind) {
    console.log(i,ind)
    console.log(this.selectedConcept[i])

      this.selectedConcept[i].isExpand = !this.selectedConcept[i].isExpand;
      console.log(i, ind)
    
  }
  collectionvalidateForm() {

    if (!this.collectionName || this.selectedConcept.length == 0) {
      this.isCollectionFormValid = false;
      return this.isCollectionFormValid;
    }else{
      this.isCollectionFormValid = true;
      return this.isCollectionFormValid;
    }
  }

  createCollection(){
    let idArr=[];
    for(let i=0;i<this.selectedConcept.length;i++){
      let conceptIdObj={
        "conceptId":this.selectedConcept[i]._id
      }
      idArr.push(conceptIdObj);
    }
    console.log(idArr)
    let obj={
      "name":this.collectionName,
      "description":this.collectionDescription,
      "concepts":idArr
    };
    console.log(this.collectionName);
    console.log(this.selectedConcept)
    console.log(obj)
    // let obj=this.selectedConcept.push(this.collectionName);
    // console.log(obj)
    this._service.createCollection(this.regionID,obj).subscribe(
      (res: any) => {
        // console.log(res);
        this.getCollectionlist(1,20);
        this.toastr.success("Successfully Plan created.");
      },
      err => {
        console.log(err);
        this.toastr.error("Fail Plan created.");
      }
    );
    this.isCollectionCreate=false;
    this.backToList();
  }

  // collection edit
  pdLoop1(_that,pd,callback){
    // console.log(pd, 'getPDID function ')sq
    callback(null,pd.conceptId)
  }
  pdLoopDone1(_that, error, result) {
    // console.log(result);  
    if(error){
      console.log(error, 'error in getPDbyID function')
    }
    async.map(
      result,
      _that.loopConcept.bind(null,_that),
      _that.conceptLoopDone.bind(null,_that)
    )
  }
  
  loopConcept(_this,concept,callback){
    _this._service.getConceptById(_this.regionID,concept).subscribe(
      (conceptRes: any) => {
        // console.error(conceptRes)
        callback(_this,conceptRes)
        // this.selectedConcept.push(conceptRes);
      },
      err => {
        console.log(err);
      });
    
  }
  
  conceptLoopDone(_this, error, pdIds){
    console.log(pdIds);
    setTimeout(() => {
      _this.selectedConcept = pdIds;
      _this.blockUI.stop();
      console.log( _this.selectedConcept)
    }, 200);
  
  }
  
  goTocollectionEdit(id){
    const _that = this;
    // console.log(id);
    _that.blockUI.start("Loading...");
    _that._service.getCollectionById(_that.regionID,id).subscribe(
      (res: any) => {
        console.log(res)
        _that.isCollectionEdit=true;
        _that.isCollection=false;
        _that.collectionName=res.name;
        _that.collectionDescription=res.description;
        _that.collectionId=res._id;
        // res.concepts.map(obj=>{
        //   _that.getConceptByIdForCollection(obj.conceptId)
        // })
        async.map(
          res.concepts,
          _that.pdLoop1.bind(null, _that),
          _that.pdLoopDone1.bind(null, _that)
        );
        // _that.blockUI.stop();
      },
      err => {
        console.log(err);
      }
    );
  }

  // goTocollectionEdit(id){
  //   console.log(id);
  //   this.blockUI.start("Loading...");
  //   this._service.getCollectionById(this.regionID,id).subscribe(
  //     (res: any) => {
  //       console.log(res)
  //       this.isCollectionEdit=true;
  //       this.isCollection=false;
  //       this.collectionName=res.name;
  //       this.collectionDescription=res.description;
  //       this.collectionId=res._id;
  //       res.concepts.map(obj=>{
  //         this.getConceptByIdForCollection(obj.conceptId)
  //       })
  //       this.blockUI.stop();
  //     },
  //     err => {
  //       console.log(err);
  //     }
  //   );
  // }

  // getConceptByIdForCollection(id){
  //   this._service.getConceptById(this.regionID,id).subscribe(
  //     (conceptRes: any) => {
  //       console.log(conceptRes)
  //       this.selectedConcept.push(conceptRes);
  //     },
  //     err => {
  //       console.log(err);
  //     });
    
  // }

  updateCollection(id){
    // console.log(id)
    this.blockUI.start("Loading...");
    let idArr=[];
    this.isCollectionEdit=false;
    for(let i=0;i<this.selectedConcept.length;i++){
      let conceptIdObj={
        "conceptId":this.selectedConcept[i]._id
      }
      idArr.push(conceptIdObj);
    }
    console.log(idArr)
    let obj={
      "name":this.collectionName,
      "description":this.collectionDescription,
      "concepts":idArr
    };
    this._service.updateCollection(this.regionID,obj,id).subscribe(
      (res: any) => {
        // console.log(res);
        this.blockUI.stop();
        this.toastr.success("Successfully Plan updated."); 
        this.getCollectionlist(1,20);
  
      },
      err => {
        console.log(err);
        this.toastr.error("Fail Plan updated.");
      }
    );
    this.backToList();
  }

  cancelCollection(){
    this.isCollectionCreate=false;
    this.isCollectionEdit=false;
    this.isCollection=false;
    this.isCollectionList=true;
    this.conceptCreate = false;
    this.conceptEdit = false;
    this.testWerkzCategory = false;
    this.conceptList = true;
    this.selectedConcept=[];
    this.collectionName="";
    this.collectionDescription="";
    console.log("cancel")
  }
  showmoreConcept(length){
    this.pageCollection+=1;
    console.log(length)
    console.log(this.pageConcept)
    this.getCollectionlist(1,this.pageConcept*20);
  }

  showmoreCollection(length){
    this.pageCollection+=1;
    console.log(length)
    console.log(this.pageConcept)
    this.getCollectionlist(1,this.pageCollection*20);
  }

  onclickCollectionDelete(alertDelete,col){
    this.deleteCollection=col;
    this.modalReference = this.modalService.open(alertDelete, {
      backdrop: 'static',
      windowClass: 'deleteModal d-flex justify-content-center align-items-center'
    });
    
  }

  collectionDelete(id){
    this.modalReference.close();
    this._service.deleteCollection(this.regionID,id).subscribe(
      (res: any) => {
        console.log(res);
        this.toastr.success("Successfully Plan Delete.");
        this.getCollectionlist(1,this.pageCollection);
      },
      err => {
        console.log(err);
        this.toastr.error("Fail Plan Delete.");
      }
    );
  }
  //end collection group

  // test
  pastePlainText(event){
    event.preventDefault();
    event.stopPropagation();
    var plaintext = event.clipboardData.getData('text/plain');
    document.execCommand('inserttext', false, plaintext);
  }
}
