import { Component, OnInit, HostListener } from "@angular/core";
import { TargetLocator } from "selenium-webdriver";
import { pd } from "./apg";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DragulaService, DragulaModule } from 'ng2-dragula';

declare var $: any;
// declare var upndown:any;
var upndown = require("upndown");
@Component({
  selector: "app-testwerkz",
  templateUrl: "./testwerkz.component.html",
  styleUrls: ["./testwerkz.component.css"]
})
export class TestwerkzComponent implements OnInit {
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
  ];
  constructor(private modalService: NgbModal,private dragulaService: DragulaService) {}

  ngOnInit() {
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
  }

  goToTestWerkz() {
    this.testWerkzCategory = true;
    this.conceptList = false;
  }
  focusMethod(e, status, word) {
    this.wordLength = word.length;
    if (status == "name") {
      $(".limit-wordcount").show("slow");
    } else if ((status = "input_method")) {
      $(".limit-type-wordcount").show("slow");
    } else {
      $(".limit-wordcount1").show("slow");
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
    this.item = {};
  }
  createCategory(item) {
    this.isfocus = !this.isfocus;
    console.log(item);
    this.item = {};
  }
  somethingChanged(val, name) {
    console.log("hi", val);
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
  updateCategory(data, name) {
    console.log("Update Category", data, name);
    let obj = {
      name: name,
      regionId: data.regionId,
      _id: data._id
    };
    console.log(obj);
    this.iseditfocus = false;
    // this.isEditComplete = false;
    this.item = {};
    this.editValue = "";
  }
  backToList() {
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

  onClickEditor(t) {}
  onInput(content, event, ele, type, i?, j?) {
    console.log(ele);
    console.log(type);
    console.log(window.getSelection().getRangeAt(0))
    console.log(event)
    console.log($(window.getSelection().focusNode).children("img"));
    if ($(window.getSelection().focusNode).children("img").length > 0) {

    if(event.type != "deleteContentBackward"){
      this.modalService.open(content, { backdropClass: "light-blue-backdrop" });
      // imgTag.attr('src','second.jpg');

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
}
