import { CropPosition } from 'ng2-img-cropper/src/model/cropPosition';
import { cloneWithOffset } from 'ngx-bootstrap/chronos/units/offset';
import { DragScrollModule } from 'ngx-drag-scroll';
import { Component, OnInit, ViewContainerRef, HostListener, DoCheck, OnDestroy   } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { apgField } from './apg';
import { apField } from './apg';
import { convertField } from './apg';
import { appService } from '../../service/app.service';
import { ToastsManager } from 'ng5-toastr/ng5-toastr';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import 'rxjs/add/operator/takeUntil';
declare var $: any;
import { Router } from '@angular/router';
import { DragulaService, DragulaModule } from 'ng2-dragula';
import { modelGroupProvider } from '@angular/forms/src/directives/ng_model_group';
import { csLocale } from 'ngx-bootstrap';
import { promise } from 'protractor';
import { InvokeFunctionExpr } from '@angular/compiler';
@Component({
  selector: 'app-apg',
  templateUrl: './apg.component.html',
  styleUrls: ['./apg.component.css'],
})
export class ApgComponent implements OnInit, OnDestroy {
  // temp value to selected radio
  public tempSharedApgId:any;
  public valueArray :any= [];
  public tempRadioType: any;
  public valid: boolean;
  public moduleID: any;
  public accessPointArrayString: any = []
  public templateAccessPointGroup: any = []
  public templateAccessPoint: {};
  public AccessPoint: any;
  public checkMark: any = [''];
  public isGlobal: boolean = false;
  public apCreate: boolean = false;
  public dataApCreate: boolean = false;
  public keyword: any;
  public isSearch: boolean = false;
  public model: any = {};
  // public accessPoint:any = {};
  public dataVal: any = {};
  public modalReference: any;
  public closeResult: any;
  apgField: apgField = new apgField();
  apField: apField = new apField();
  convertField: convertField = new convertField();
  customAP: boolean = false;
  newAP: boolean = false;
  existAP: boolean = false;
  templateAPG: boolean = false;
  viewType: any = 'apg';
  public regionID = localStorage.getItem('regionId');
  public locationID = localStorage.getItem('locationId');
  apList: any;
  moduleList: any[] = [];
  templateList: Array<any> = [];
  apgList: Array<any> = [];
  apArray: any[] = [];
  @BlockUI() blockUI: NgBlockUI;
  newAPList: any[] = [];
  newAPListId: any[] = [];
  newAPshow: boolean = false;
  createButton: boolean = false;
  updateButton: boolean = false;
  checkedModuleID: any[] = [];
  customCheck: boolean = false;
  checkedAPid: any[] = [];
  checkedTemplateID: any[] = [];
  templateChecked: boolean = false;
  editId: any;
  deleteId: any;
  deleteAPG: any;
  emptyAPG: boolean = false;
  convertId: any;
  template: any = {};
  moduleId: any;
  moduleAPList: any;
  getAccessPoint: any;
  tempModuleId: any;
  result: any;
  emptyAP: boolean = false;
  isFirst: boolean = false;
  searchWord: any;
  itemtype: any;
  isUpDown: Boolean = false;
  isUpDownHide: Boolean = false;
  apgType: any;
  selectedAPGTab = {
    'name': '',
    'id': ''
  }
  allApgList:any = [];
  progressAPG:any = [];
  badgeApg:any = [];
  evAPG:any = [];
  dataApgList:any = [];
  isScroll:boolean=true;

  //

  public ismodule: boolean = false;
  public isshare: boolean = false;
  public shareAPG: boolean = false;
  public iscreate: boolean = false;
  public ischecked: any;
  public dataApg: string;
  public sharechecked: any;
  public isUpdate: boolean = false;
  public navIsFixed: boolean = false;
  public singleCheckedAPG: boolean = false;
  responseAP: any;
  wordLength: any = 0;
  public permissionType: any;
  public apgPermission: any = [];
  public apgDemo: any = [];
  headerHeight: number = 0
  isUpDownId: number;
  public dragOut: boolean = false;
  public stillDrag: boolean = false;
  public optionsArray: any = [""];
  public groupNumber: number = 0;
  public isExpandArr: any = [];
  public selectedRadio = "";
  public dragEle : any = [];
  public dropEle : any = [];
  minValue: any = "";
  maxValue: any = "";
  exitValue: any;
  isEmpty: boolean = true;
  delItem: any;
  emptymin: boolean = true;
  emptymax: boolean = true;
  overmin: boolean = true;

  constructor(private modalService: NgbModal,
    private _service: appService,
    public toastr: ToastsManager, public vcr: ViewContainerRef,
    private router: Router,
    private dragulaService: DragulaService) {
    console.log(this.templateAccessPointGroup)
    dragulaService.cloned().subscribe(({
      clone,
      original,
      cloneType
    }) => {
      // $(clone).css('top', $("#clone").height() + "px");
      $(clone).children(".close-search").hide();
    })


    if (this.dragulaService.find("COLUMNS") === undefined) {
      console.log('COLUMNS WORKing');
        this.dragulaService.createGroup("COLUMNS", {
          direction: 'vertical',
          moves: (el, source, handle) => handle.className === "group-handle",
          // invalid: function (el, handle) {
          //   return false; // don't prevent any drags from initiating by default
          // }
          // revertOnSpill
          // accepts : (el,target) => console.log(el,target)
        });
    }
        // if (this.dragulaService.find("0") == undefined)
        //   this.dragulaService.createGroup("0", {
        //     direction: 'vertical',
        //     moves: (el, source, handle) => handle.className === "move-sign"
        //   });

    this.dragulaService.drop("COLUMNS").subscribe(({
      el,
      target,
      source,
      sibling
    }) => {
      $(target).append($(".add-new-skill"))
    })

    this.toastr.setRootViewContainerRef(vcr);

    this._service.locationID.subscribe((data) => {
      if (this.router.url === '/tools') {
        this._service.permissionList.subscribe((data) => {
          console.log('from apg')
          this.permissionType = data;
          this.checkPermission();
        });

      } else {
        console.log('====', this.router.url)
      }
    });
  }
  ngOnDestroy() {
    this.dragulaService.destroy("data_COLUMNS");
    this.dragulaService.destroy("COLUMNS");
    for (var i = 0; i < this.groupNumber; i++)
      var dd = this.dragulaService.find(String(i))
  }
  testFunct() {
    var stillDragInTestFunc = this.stillDrag;
    var templategroug = this.templateAccessPointGroup;
    // return this.stillDrag;
    // return this.stillDrag;
  }

  ngOnInit() {
    this.selectedAPGTab.name = "All";
    this.selectedAPGTab.id = '';
    this.dragulaService
      .drag("COLUMNS")
      .subscribe(({ name,el, source})  => {
        this.stillDrag = true;
        // var _this = this;
        console.log(name , el, source)
        if(this.stillDrag){
          document.addEventListener("mousemove", function (event) {
            // console.log(_this.stillDrag)
          })
        }
        // this.msg = `Dragging the ${value[1].innerText}!`;
      });

    // remove group 
    // if (this.dragulaService.find("data_COLUMNS") == undefined)
    //   this.dragulaService.createGroup("data_COLUMNS", {
    //     direction: 'vertical',
    //     moves: (el, source, handle) => handle.className === "move-sign",
    //     // invalid: function (el, handle) {
    //     //   return false; // don't prevent any drags from initiating by default
    //     // }
    //     // revertOnSpill
    //     // accepts : (el,target) => console.log(el,target)
    //   });
    // this.dragulaService.createGroup("data_COLUMNS", {
    //   direction: 'vertical',

     // // invalid: function (el, handle) {
    // //    return false; // don't prevent any drags from initiating by default
    //  // }
    //   // revertOnSpill
    //   // accepts : (el,target) => console.log(el,target)
    // });
    
    this.dragulaService.cloned("data_COLUMNS").subscribe(({
      name,
      clone,
      original,
      cloneType
    }) => {
      console.log('it is work cloning');
      var tempEle = $(clone).children(".selection-wrapper").children(".img-wrapper");
      $(clone).height(70)
      $(clone).width(500)
      $(clone).children(".selection-wrapper").children('.data-close').hide()
      $(clone).children(".data-close").remove();
      tempEle.empty();

      tempEle.append('<img src="../../../assets/images/grab-holder.svg"  style="margin: 0;position: absolute;width: 32px;top: 50%;transform: translate(0, -50%);padding:10px;"/>')
      console.log($(tempEle.children()[0]).css('padding'))
    })
    // no sibling

    this.dragulaService.drop("data_COLUMNS").subscribe(({
      name,
      el,
      target,
      source,
      sibling
    }) => {
      console.log('it is work drpop');
      console.log(name, el, target, source, sibling)
      // console.log(this.optionsArray)
      // var newArray = $(target).find("input");
      // console.log(newArray)
      // var textArray = [];
      // for (var i = 0; i < newArray.length; i++) {
      //   console.log($(newArray[i]).val())
      //   textArray.push($(newArray[i]).val())
      // }

    //   // newArray.forEach(element => {
    //   //   console.log(element.val())
      });
    //   // this.optionsArray = textArray
    //   // console.log(textArray)
    //   // this.templateAccessPointGroup.data.inputTypeProperties.options = this.optionsArray;
    //   // $(clone).height(70)
    //   // console.log("OptionsaArray", this.optionsArray)
    //   // $(clone).width(460)
      // $(clone).children(".data-close").remove();
    // })
    this.dragulaService.cancel().subscribe(({
      name,
      el,
      container,
      source
    }) => {
      console.log('it is work draging data columns');
      this.stillDrag = false;
      console.log("CAncel")
      this.dragOut = false;
      console.log("Drag" , this.dragEle , "drop" ,this.dropEle)
      // if(this.dragEle !== [] && this.dropEle !== []){
      //   var temp = this.templateAccessPointGroup[this.dragEle[2]].data.evaluation.details[this.dropEle[0]].name;
      //   console.log(this.templateAccessPointGroup[this.dragEle[2]].data.evaluation.details[this.dropEle[0]])
      //   console.log()
      //   this.templateAccessPointGroup[this.dragEle[2]].data.evaluation.details[this.dropEle[0]].name = this.templateAccessPointGroup[this.dragEle[2]].data.evaluation.details[this.dragEle[0]].name
  
      //   this.templateAccessPointGroup[this.dragEle[2]].data.evaluation.details[this.dragEle[0]].name = temp
      //   console.log(this.templateAccessPointGroup)
      // }
      
      this.dragEle = [];
      this.dropEle = [];
    })
    this.dragulaService.drop().subscribe(({
      el,
      target,
      source,
      sibling
    }) => {
      // console.log(this.dragId)
      // clearInterval(this.dragId)
      console.log("DRRRROP")
    
      console.log("------>>", this.templateAccessPointGroup)
      this.stillDrag = false;
      this.dragOut = false;
    })
    this.dragulaService.drag().subscribe(({
      name,
      el,
      source
    }) => {

      console.log(name === "COLUMNS")
      if (name === "COLUMNS") {
        this.stillDrag = true;
        document.addEventListener("mousemove", this.testFunct = () => {
          // console.log(this.stillDrag)
          if (this.stillDrag) {
            var container = $(el).parents(".requirements-wrapper")[0];
            if ($(".gu-mirror").position() && container) {
              var y = $(".gu-mirror").position().top;
              var dragHeight = y + $(".gu-mirror").height();
              var dropHeight = $(container).position().top + $(container).height()
              if (y - $(container).position().top < 10) {
                container.scrollTop -= 10;
              } else if (dropHeight - dragHeight < 10) {
                container.scrollTop += 10;

              }
            }

          }
        }, false);


      }else if(name === "data_COLUMNS"){
        this.stillDrag = true;
        document.addEventListener("mousemove", this.testFunct = () => {
          // console.log(this.stillDrag)
          if (this.stillDrag) {
            var container = $(el).parents(".data-wrapper")[0];
            var windowHeight = $(window).height()
            if ($(".gu-mirror").position() && container) {
              var y = $(".gu-mirror").position().top;
              if (y  > 900) {
                var x =+ 3
                
                window.scrollBy(0, x);
              } else if ( y < 900) {
                console.log('s');
                var z =- 3
                window.scrollBy(0, z);

              }
            }
          }
        }, false);
      }else {
        console.log("other than")
        this.stillDrag = true;

        this.dragOut = false;
        var stillDrag = this.stillDrag;
        document.addEventListener("mousemove", this.testFunct = () => {
          if (stillDrag) {
            // event.preventDefault();
            // console.log($(event.target).parents(".requirement"))
            // console.log(event.pageY)
            // console.log($(el))
            // var y = event.pageY
            var y = $(".gu-mirror").position().top;
            //$(event.target).parents(".requirement-inner-box")
            var container = $(el).parents(".requirement-inner-box");
            // console.log($(container[0]))
            // console.log(container[0].getBoundingClientRect().top);
            if (container.length > 0) {
              var ddd = container[0].getBoundingClientRect().top + 236;
              // console.log(ddd)
              // console.log()
              var containerTop = container[0].getBoundingClientRect().top;
              // console.log(ddd , y)
              if (ddd - y <= 70) {
                var ele = container[0];
                // setTimeout(function(){
                ele.scrollTop += 20
                if (ele.scrollHeight == ele.scrollTop + container.height()) {

                  // $(ele).append(el) //For Scroll Down
     
                }
                // }, 300);
              } else if (y - containerTop <= 20) {
                var ele = container[0];
                // setTimeout(function(){
                ele.scrollTop -= 20
                if (ele.scrollTop == 0) {
                  // var tempGroup = this.templateAccessPointGroup
                  // var arrId = $(ele).attr('id');
                  // var arrId1 = $(el).attr("id");
                  // var index = arrId1.indexOf("requirement");
                  // var ind = Number(arrId1.slice(index + "requirement".length))
                  // var sliceRes = arrId.split("-");
                  // var tempVar =  tempGroup[sliceRes[3]].data.evaluation.details[0].name;
                  // // console.log(tempVar)
                  // var tempVar1 = tempGroup[sliceRes[3]].data.evaluation.details[ind].name
                  // // console.log(tempVar1)
                  // this.dragEle = [ind , tempVar1 , sliceRes[3]];
                  // this.dropEle = [0 , tempVar , sliceRes[3]]
                  
                  // $(ele).prepend(el)
                  //For Scroll Up

                  //   console.log(sliceRes)
                  //   setTimeout(function () {
                  //     console.log("DDDD")
                  //     console.log(tempGroup)
                  //     console.log(tempGroup[sliceRes[3]])
                  //     tempGroup[sliceRes[3]].data.evaluation.details[0].name = $(el).children("textarea").val();
                  //     $(el).children("textarea").val(tempVar) ;
                  //   }, 100)
                  // });

                  // console.log(sliceRes)
                  // console.log(this.templateAccessPointGroup[sliceRes[3]])
                  // console.log($(el).children("textarea").val())
                  // var tempVar =  this.templateAccessPointGroup[sliceRes[3]].data.evaluation.details[0].name;
                  

                }
                // }, 300);
                // this._scrollUp(container, y);
              }

            }


          }
        });
        document.addEventListener("mouseup", function (event) {
          stillDrag = false;
        });
      }
    })

    this.dragulaService.shadow().subscribe(({
      el,
      container,
      source
    }) => {
      console.log("shadow", this.templateAccessPointGroup)

    })
    this.dragulaService.out().subscribe(({
      name,
      container,
      source
    }) => {
      console.log("out now");
      this.dragOut = true;

    })
    this.dragulaService.cloned().subscribe(({
      clone,
      original,
      cloneType
    }) => {
      $(clone).css('top', $("#clone").height() + "px");
      $(clone).children(".close-search").hide();
      $(clone).children(".img-wrapper").empty()
      $(clone).children(".img-wrapper").append('<img src="../../../assets/images/grab-holder.svg" id="move-sign" class="move-sign" style="margin: 0;position: absolute;height: 32px;top: 50%;transform: translate(0, -50%);padding:10px;"/>')
      // console.log( $(clone).children(".img-wrapper").children())
    })


    for (var i = 0; i < this.templateAccessPointGroup.length; i++) {
      this.dragulaService
        .drag(this.templateAccessPointGroup[i].name)
        .subscribe(({
          name,
          el,
          source
        }) => {

        });
    }
    this.dataVal = {
      '_id': '',
      'moduleId': '',
    }

    if (this.router.url === '/tools') {
      this.permissionType = localStorage.getItem('permission');
      this.checkPermission();
    }
  }

  checkPermission() {
    console.log(this.permissionType)
    this.apgPermission = ["CREATEAPG", "CREATEAP"];
    if (this.permissionType != null) {
      this.apgPermission = this.apgPermission.filter(value => -1 !== this.permissionType.indexOf(value));
      this.apgDemo['addAPG'] = (this.apgPermission.includes("CREATEAPG")) ? 'CREATEAPG' : '';
      this.apgDemo['addAP'] = (this.apgPermission.includes("CREATEAP")) ? 'CREATEAP' : '';
      this.apgDemo['viewAPG'] = (this.apgPermission.includes("VIEWAPG")) ? 'VIEWAPG' : '';

      console.log(this.apgDemo)
    }
    // this.apgPermission = this.apgPermission.filter(value => -1 !== this.permissionType.indexOf(value));
    // this.apgDemo['addAPG'] = (this.apgPermission.includes("CREATEAPG")) ? 'CREATEAPG' : '';
    // this.apgDemo['addAP'] = (this.apgPermission.includes("CREATEAP")) ? 'CREATEAP' : '';
    // this.apgDemo['viewAPG'] = (this.apgPermission.includes("VIEWAPG")) ? 'VIEWAPG' : '';

    // console.log(this.apgDemo)
    if (this.apgPermission.length > 0) {
      this.getAllModule();
      this.getAllAPG(20, 0);
    } else {
      this.apgList = [];
    }
  }


  getContentHeight() {
    let hit = $('.pad-bottom').height();
    return hit;
  }
  // @HostListener('document:mousedown', ['$event'])
  // onMouseDown(event) {
  //   console.log(event)
  //   console.log($(event.target).parents(".requirement-inner-box"))
  //   console.log("DRRRRAAG")
  // }

  @HostListener('window:scroll', ['$event']) onScroll($event) {
    // console.log('==== ',$('.pad-bottom').height() + 150)
    // console.log($(window).height())

    // if(window.pageYOffset < 15){
    //   console.log('less than 40')
    //   this.isSticky = false;
    // }
    // console.log($event);
    // console.log("scrolling");
    // console.log(window.pageYOffset)
    // if(window.pageYOffset > 40){
    //   console.log('greater than 100')
    //   this.navIsFixed = true;
    // }else{
    //   console.log('less than 100')
    //   this.navIsFixed = false;
    // }

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

  blurMethod(e, status) {
    this.wordLength = 0;
    if (status == 'name') {
      $('.limit-wordcount').hide('slow');
    } else if (status = "input_method") {
      $('.limit-type-wordcount').hide('slow');

    } else {
      $('.limit-wordcount1').hide('slow');
    }
  }

  changeMethod(val: string) {
    console.log(val)
    this.wordLength = val.length;
  }

  cancelapg() {
    this.apgList = [];
    this.clearAPGTypeArr()
    this.model = {};
    this.apCreate = false;
    this.iscreate = false;
    this.dataApCreate = false;
    this.ismodule = false;
    this.isUpdate = false;
    this.shareAPG = false;
    this.isshare = false;
    this.isGlobal = false;
    this.selectedRadio = ""
    //for evaluation APG
    this.templateAccessPointGroup = []
    this.optionsArray = [""];
    this.valueArray = [];
    this.getAllAPG(20, 0);
    this.formObj = {};
    // for tempValue
    this.tempRadioType = '';
  }
  // cancelAp() {
  //   this.apgList = [];
  //   this.model = {};
  //   this.templateAccessPointGroup = []
  //   console.error(this.templateAccessPointGroup)
  //   // this.accessPoint= {};
  //   this.apCreate = false;
  //   this.iscreate = false;
  //   this.ismodule = false;
  //   this.isUpdate = false;
  //   this.shareAPG = false;
  //   this.isshare = false;
  //   this.isGlobal = false;
  //   this.getAllAPG(20, 0);
  // }

  goToBack(status) {
    console.log(this.isScroll)
    console.log(status)
    if (status == 'type') {
      console.log('type')
      localStorage.removeItem('moduleID');
      this.cancelapg();
    } else if (status == 'create') {
      this.iscreate = false;
      this.isshare = false;
      this.ismodule = true;
      this.apCreate = false;
      this.shareAPG = false
      this.model = {};
    } else {
      this.isshare = true;
      this.shareAPG = false;
      this.iscreate = false;
    }
    this.templateAccessPointGroup = []
  }

  addNewAPG() {
    this.tempSharedApgId = '';
    localStorage.removeItem('moduleID');
    this.ischecked = '';
    this.model = {};
    this.ismodule = true;
    this.isUpdate = false;
  }

  // createNewAPG(status) {
  //   if (status == 'create') {
  //     this.model = {};
  //     this.iscreate = true;
  //   } else {
  //     console.log('hi')
  //     this.sharechecked = ''
  //     this.shareAPG = true;
  //     this.templateList = [];
  //     this.getAllTemplate(20, 0);
  //   }
  //   this.isshare = false;
  // }

  trackByFn(index, item) {
    return index;
  }
  addDataValue(data, i) {
   
    const newValue = ""
    const newObj = {'name' : ''}
    this.valueArray.push(newObj)
    // this.convertObjToArray()
    // this.templateAccessPointGroup.data.inputTypeProperties.options.push(newValue)
    // this.optionsArray.push(newValue)
    setTimeout(() => {
      var a=  this.valueArray.length - 1 
      console.log(a);
      document.getElementById("valueInput"+a).focus();
    }, 300);
  }
  dataValueClear(item, e?) {
    // this.optionsArray.splice(item, 1)
    this.valueArray.splice(item,1)
    // console.log(this.optionsArray)
    // console.error(this.templateAccessPointGroup.data.inputTypeProperties.options)
    // console.log($(".data-wrapper").children())
    // console.log($(".one-selection-wrapper").children(".selection-wrapper").children(".form-group").children("input"))
    // var tempArr = $(".one-selection-wrapper").children(".selection-wrapper").children(".form-group").children("input");
    // for (var i = 0; i < this.optionsArray.length; i++)
    //   $(tempArr[i]).val(this.optionsArray[i])
  }

  formObj = {};
  createNewAPG(status, name) {
    console.log("Create new APg", name)
    this.optionsArray = [""]
    if (status == 'create') {
      this.iscreate = true;
      if (name == 'Assessment' || name == 'Evaluation') {
        this.ismodule = false;
        this.apCreate = true;
        this.dataApCreate = false;
        const templateAccessPoint = {
          "name": "",
          "description": "",
          "moduleId": "",
          "options": false,
          "upDownOptions": false,
          "upOptions": false,
          "DownOptions": false,
          "data": {
            "evaluation": {
              "allowZero": false,
              "passMark": "",
              "details": [{
                "name": "",
                "options": [
                  ""
                ]
              }]
            }
          }
        }

        this.templateAccessPointGroup.push(templateAccessPoint)
        if (this.templateAccessPointGroup.length > 0) {
          this.formObj["skillName0"] = "";
          this.formObj["requirement00"] = "";
          console.log('formObj~~~', this.formObj);
          this.checkProperties(this.formObj)
        }
        // this.iscreate = false;
        this.apCreate = true;
        // ismodule == false && iscreate == false && isshare == false && shareAPG == false
      } else if (name == 'Data') {
        this.templateAccessPointGroup = {}
        this.selectedRadio = 'NUMBER'
        var moduleId = localStorage.getItem('moduleID');
        // this.templateAccessPoint = {
        //   "name": "",
        //   "description": "",
        //   "moduleId": moduleId,
        //   "data": {
        //     "sectionType": "DATA",
        //     "unit": "",
        //     "inputType": this.selectedRadio,
        //     "inputTypeProperties": {
        //       "name": "",
        //       "min": "",
        //       "max": "",
        //       "options": [
        //         ""
        //     ]
        //    }
        //   }
        // }
        const templateAccessPoint = {
          "name": "",
          "description": "",
          "moduleId": moduleId,
          "data": {
            "sectionType": "DATA",
            "unit": "",
            "inputType": this.selectedRadio,
            "inputTypeProperties": {
              "name": "",
              "min": "",
              "max": "",
              "options": [

              ]
            }
          }
        }
        this.templateAccessPointGroup = templateAccessPoint;
        this.dataApCreate = true;
        this.ismodule = false;
        this.apCreate = false;
        this.emptymax=true;
        this.emptymin=true;
        this.overmin=true;
      }
      else {
        this.model = {};
        this.dataApCreate = false;
        this.iscreate = true;
        this.isshare = false;
        this.apCreate = false;
      }
    } else {
      console.log("Create new APg", name)

      console.log('hi')
      this.sharechecked = ''
      this.shareAPG = true;
      this.apCreate = false;
      this.templateList = [];
      this.getAllTemplate(20, 0);
    }
    this.isshare = false;
  }


  getsingleTemplate(id) {
    this._service.getSingleTemplate(this.regionID, id)
      .subscribe((res: any) => {
        this.singleCheckedAPG = res;
        console.log(res)
      }, err => {
        console.log(err)
      })
  }

  setShareAPG(obj) {
    // console.log('set share',this.singleCheckedAPG)

    let data = this.singleCheckedAPG;
    // console.log(obj)
    let emptyObj = {}
    this.dataVal = this.singleCheckedAPG;


    console.log('~~~~', this.dataVal)
    this._service.createAPG(this.regionID, this.locationID, emptyObj, this.dataVal._id, this.dataVal.moduleId)
      .subscribe((res: any) => {
        console.log(res)
        this.toastr.success('APG successfully created.');
        this.blockUI.stop();
        setTimeout(()=>{
          this.cancelapg();
        },200)
        this.setSelectedTab(this.pickedMType)
      }, err => {
        this.toastr.success(status + ' Fail.');
        this.blockUI.stop();
        console.log(err)
      })
  }
  pickedMType = {
    "name": '',
    "id": ''
  }
  chooseModuleType(val, name) {
    console.log("ModuleId --->", val)
    this.apgType = name;
    // if(name == "Assessment")
    //   this.apgType = "evaluation"
    console.log("ModuleName --->", name)
    this.ischecked = val;
    this.moduleID = val;
    this.pickedMType.name = name;
    this.pickedMType.id = val;
    localStorage.setItem('moduleID', val);
    setTimeout(() => {
      this.ismodule = false;
      this.isshare = true;
      if (name == 'Assessment') {
        this.apCreate = true
      }
      console.log('...')
    }, 300);
  }

  chooseShareAPG(val, name) {
    console.log(val)
    this.sharechecked = val;
    this.getsingleTemplate(this.sharechecked);
  }


  mainAccessPointAdd() {
    // let testObj = {
    // }
    this.groupNumber += 1;
    console.log(this.groupNumber)
    const templateAccessPoint = {
      "name": "",
      "description": "",
      "moduleId": "",
      "options": false,
      "upDownOptions": false,
      "data": {
        "evaluation": {
          "allowZero": false,
          "passMark": "",
          "details": [{
            "name": "",
            "options": [
              ""
            ]
          }]
        }
      }
    }
    console.log(templateAccessPoint);
    this.templateAccessPointGroup.push(templateAccessPoint)
    if (this.templateAccessPointGroup.length > 0) {
      console.log("length", this.templateAccessPointGroup.length)
      var l = this.templateAccessPointGroup.length - 1;
      this.formObj["skillName" + l] = "";
      this.formObj["requirement0" + l] = "";
      console.log('formObj~~~', this.formObj);
      this.checkProperties(this.formObj)
    }
    // if (this.dragulaService.find(String(this.groupNumber)) == undefined)

    //   this.dragulaService.createGroup(String(this.groupNumber), {
    //     direction: 'vertical',
    //     moves: (el, source, handle) => handle.className === "move-sign"
    //     // invalid: function (el, handle) {
    //     //   console.log(el,handle)
    //     //   return false; // don't prevent any drags from initiating by default
    //     // },
    //     // });
    //   })

  }

  addInputValue() {
    for (var k = 0; k < this.templateAccessPointGroup.length; k++) {
      this.formObj["skillName" + k] =this.templateAccessPointGroup[k].name;
      for (var kk = 0; kk < this.templateAccessPointGroup[k].data.evaluation.details.length; kk++) {
        this.formObj["requirement" + kk + k] = this.templateAccessPointGroup[k].data.evaluation.details[kk].name;
      }
    }
    console.log("adding Input value to formObj", this.formObj)
    this.checkProperties(this.formObj)
  }

  removeValue(val) {
    this.formObj = {};
    console.log(val)
    for (var k = 0; k < val.length; k++) {
      this.formObj["skillName" + k] = val[k].name;
      for (var kk = 0; kk < this.templateAccessPointGroup[k].data.evaluation.details.length; kk++) {
        this.formObj["requirement" + kk + k] = val[k].data.evaluation.details[kk].name;
      }
    }
    console.log("formObj~~~~", this.formObj)
    this.checkProperties(this.formObj)
  }

  checkProperties(obj) {
    var valueArr = Object.values(obj);
    console.log(valueArr)
    if (valueArr.includes("")) {
      this.isEmpty = true;
      console.log("isEmpty", this.isEmpty)
    } else {
      this.isEmpty = false;
      console.log("isEmpty", this.isEmpty)
    }
  }

  subAccessPointAdd(skillBlog, i) {
    console.log(this.templateAccessPointGroup)
    console.log('~~~~~~~~', i, skillBlog)
    let req = {
      "name": "",
      "options": [
        ""
      ]
    };
    this.templateAccessPointGroup[i].data.evaluation.details.push(req);
    console.log(this.templateAccessPointGroup[i].data.evaluation.details)
    if (this.templateAccessPointGroup.length > 0) {
      console.log("length", this.templateAccessPointGroup[i].data.evaluation.details.length)
      var x = this.templateAccessPointGroup[i].data.evaluation.details.length - 1;
      this.formObj["requirement" + x + i] = "";
      console.log('formObj~~~', this.formObj);
    }
   
    // this.addscrollEvent(skillBlog,i);
    setTimeout(() => {
      this.scrollCalculation( skillBlog,i);
      this.focusAdd(skillBlog.data.evaluation.details.length, i)
    }, 200);
    this.checkProperties(this.formObj)
    // this.focusAdd(skillBlog.data.evaluation.details.length,i)

  }

  subAccessPointClear(item, skillblog, id, x, name) {
    // setTimeout(() => {
    //   i.data.evaluation.details.splice(i.data.evaluation.details.indexOf(item),1);

    // }, 0);
    this.templateAccessPointGroup[id].data.evaluation.details.splice(x, 1);
    console.log(item)
    // this.removescrollEvent(i,id,x);
    this.scrollCalculation( skillblog,id);
    setTimeout(()=>{
      this.removeValue(this.templateAccessPointGroup)
    })
    // this.removeValue(name,id,x,'requirement')
  }

  focusAdd(length, idx) {
    var l = length - 1;
    // console.log("target~~~",l,idx,document.getElementById('box' + l + idx))
    document.getElementById('box' + l + idx).focus();
  }
  scrollCalculationAfter(data){
    this.isScroll=true;
    setTimeout(() => {
      // console.log(data)
      for(var i=0;i<data.length;i++){
        const skillHeight: HTMLElement = document.getElementById('skill-requirement-id-'+i);
        const skillHeader: HTMLElement = document.getElementById('skillHeader'+i);
        const skillFooter: HTMLElement = document.getElementById('skillFooter'+i);
        const innerBoxHeight: HTMLElement = document.getElementById('requirement-inner-box-'+i);
        var req_total_height=0;
        for (var j = 0; j <data[i].data.evaluation.details.length; j++) {
          console.log(j);
          const requirement: HTMLElement = document.getElementById('requirement' + j);
          console.log(requirement)
        
          req_total_height += requirement.clientHeight;
          console.log(req_total_height);
        }
        
        var totalHeight = skillHeader.clientHeight + skillFooter.clientHeight + req_total_height;
        var inboxHight = 400 - (skillHeader.clientHeight + skillFooter.clientHeight);
        console.log(skillHeader.clientHeight)
        console.log(skillFooter.clientHeight)
        console.log(inboxHight);
        console.log(totalHeight)
    
        if (totalHeight < 400) {
          console.log("less than 400")
          skillHeight.setAttribute("style", "height: auto;");
          innerBoxHeight.setAttribute("style", "height:auto;overflow:none;")
          this.templateAccessPointGroup[i].upDownOptions = false;
          this.templateAccessPointGroup[i].upOptions = false;
          this.templateAccessPointGroup[i].DownOptions = false;
        } else {
          console.log("greater than 400")
          skillHeight.setAttribute("style", "height: 400px;");
          // innerBoxHeight.setAttribute("style", "height:auto;overflow:none;")
          innerBoxHeight.setAttribute("style", "height:" + inboxHight + "px;overflow:overlay;")
          this.templateAccessPointGroup[i].upDownOptions = true;
          this.templateAccessPointGroup[i].upOptions = false;
          this.templateAccessPointGroup[i].DownOptions = true;
        }
      }
    }, 10);

  }
  // Create in scroll calculation for evaluation 
 
  scrollCalculation(skillObj, skillId) {
    const skillHeight: HTMLElement = document.getElementById('skill-requirement-id-' + skillId);
    const skillHeader: HTMLElement = document.getElementById('skillHeader' + skillId);
    const skillFooter: HTMLElement = document.getElementById('skillFooter' + skillId);
    const innerBoxHeight: HTMLElement = document.getElementById('requirement-inner-box-' + skillId);
    var req_total_height = 0;

    for (var j = 0; j < skillObj.data.evaluation.details.length; j++) {
      console.log(j);
      const requirement: HTMLElement = document.getElementById('requirement' + j);
      console.log(requirement)
      req_total_height += requirement.clientHeight;
      console.log(req_total_height);
    }

    var totalHeight = skillHeader.clientHeight + skillFooter.clientHeight + req_total_height;
    var inboxHight = 400 - (skillHeader.clientHeight + skillFooter.clientHeight);

    console.log(totalHeight);

    if (totalHeight < 400) {
      console.log("less than 400")
      skillHeight.setAttribute("style", "height: auto;");
      innerBoxHeight.setAttribute("style", "height:auto;overflow:none;")
      this.templateAccessPointGroup[skillId].upDownOptions = false;
      this.templateAccessPointGroup[skillId].upOptions = false;
      this.templateAccessPointGroup[skillId].DownOptions = false;
    } else {
      console.log("greater than 400")
      skillHeight.setAttribute("style", "height: 400px;");
      innerBoxHeight.setAttribute("style", "height:" + inboxHight + "px;overflow:overlay;")
      this.templateAccessPointGroup[skillId].upDownOptions = true;
      this.templateAccessPointGroup[skillId].upOptions = false;
      this.templateAccessPointGroup[skillId].DownOptions = true;
    }
  }

  //
  // addScrollOncheckMarkToggle(skillObjId, res) {
  //   console.log("reach checkMarkToggle>>" + skillObjId);
  //   const skillHeader: HTMLElement = document.getElementById('skillHeader' + skillObjId);
  //   const skillHeight: HTMLElement = document.getElementById('skill-requirement-id-' + skillObjId);
  //   const skillFooterClassName: HTMLElement = document.getElementById('skillFooter' + skillObjId);
  //   const skillFooter: HTMLElement = document.getElementById('skillFooter' + skillObjId);
  //   const innerBoxHeight: HTMLElement = document.getElementById('requirement-inner-box-' + skillObjId);

  //   this.headerHeight = skillHeader.clientHeight;
  //   var totalHeight = this.headerHeight + skillFooter.clientHeight + innerBoxHeight.clientHeight;
  //   var mHight = 400 - (this.headerHeight + skillFooter.clientHeight);

  //   if (totalHeight < 400) {
  //     skillHeight.setAttribute("style", "height: auto;");
  //     console.log("under 400")
  //   } else {
  //     skillHeight.setAttribute("style", "height: 400px;");
  //     innerBoxHeight.setAttribute("style", "height:" + mHight + "px;overflow:overlay;")
  //     // this.templateAccessPointGroup[skillObjId].upOptions=false;
  //     // this.templateAccessPointGroup[skillObjId].DownOptions=true;
  //     console.log("over 400")
  //   }

  //   console.log("header height in add smark:" + this.headerHeight);
  // }

  //moving scroll in evaluation create
  requirementInnerBox($event, i) {
    const skillHeight: HTMLElement = document.getElementById('skill-requirement-id-' + i);
    const innerBoxHeight: HTMLElement = document.getElementById('requirement-inner-box-' + i);

    if ((innerBoxHeight.scrollHeight - innerBoxHeight.scrollTop) == innerBoxHeight.clientHeight) {
      this.templateAccessPointGroup[i].upOptions = true;
      this.templateAccessPointGroup[i].DownOptions = false;
    } else {
      this.templateAccessPointGroup[i].upOptions = false;
      this.templateAccessPointGroup[i].DownOptions = true;
    }
    console.log("dar")
  }

  mainAccessPointClear(item, idx, name, type) {
    this.delItem = item
    console.log(idx)
    this.templateAccessPointGroup.splice(this.templateAccessPointGroup.indexOf(item), 1);
    if (type == 'update') {
      let jsonStringIntoArray = JSON.parse(this.accessPointArrayString)
      // delete element from accesspoint arraystring
      jsonStringIntoArray.splice(idx, 1)
      this.accessPointArrayString = JSON.stringify(jsonStringIntoArray)
    }
    // console.log(JSON.parse(this.accessPointArrayString).splice(idx,1))
    // console.error(JSON.stringify(JSON.parse(this.accessPointArrayString).splice(idx,1)))

    // this.templateAccessPointGroup.splice(this.templateAccessPointGroup.indexOf(item), 1);

    setTimeout(() => {
      this.removeValue(this.templateAccessPointGroup)
    })
    // this.removeValue(name,idx,'','skill')


    // this.templateAccessPointGroup.splice(this.templateAccessPointGroup.indexOf(item), 1);
    // this.removeValue(name,idx,'','skill')
  }
  allowZeroToggle(item) {
    item.data.evaluation.allowZero = !item.data.evaluation.allowZero;
  }
  checkMarkToggle(item, skillObjId) {
    let temPassMark = this.templateAccessPointGroup[skillObjId].data.evaluation.passMark;
    console.log(item)
    item.options = !item.options;
    if(!item.options) {
      item.data.evaluation.passMark = "";
    }
    console.log(item.options)
    setTimeout(() => {
      this.scrollCalculation( item,skillObjId)
    })

  }

  //pushDownClick in evaluation create requirement
  pushDownClick(i) {
    const innerBoxHeight: HTMLElement = document.getElementById('requirement-inner-box-' + i);
    // this.isUpDownHide = true;
    this.templateAccessPointGroup[i].upOptions = false;
    this.templateAccessPointGroup[i].DownOptions = true;
    innerBoxHeight.scrollTop = innerBoxHeight.scrollHeight

  }

  //pushUPClick in evaluation create requirement
  pushUpClick(i) {
    const skillHeight: HTMLElement = document.getElementById('skill-requirement-id-' + i);
    const innerBoxHeight: HTMLElement = document.getElementById('requirement-inner-box-' + i);

    innerBoxHeight.scrollTop = 0;
    this.templateAccessPointGroup[i].upOptions = true;
    this.templateAccessPointGroup[i].DownOptions = false;
    console.log(innerBoxHeight.scrollTop)
  }

  callCreateAPI() {

  }

  callEditAPI() {

  }
  // This function has two array, One is CreatedDataCollection, Another is EditedDataCollection
  editAccessmentApg() {
    let createdDataCollection = [];
    let editedDataCollection = [];
    this.model.accessPoints = [];
    this.templateAccessPointGroup.forEach((item, index) => {
      if (item._id) {
        // Push the item to editedDataCollection Array
        let identical = JSON.stringify(item) === JSON.stringify(JSON.parse(this.accessPointArrayString));
        console.log(item)
        this.model.accessPoints.push(item._id)
        console.log(this.templateAccessPointGroup)
        console.log(JSON.parse(this.accessPointArrayString))
        if (!identical) {
          editedDataCollection.push(item);
          console.log(editedDataCollection)
          // this.updateAp(item._id,item,this.model._id)
        }
      } else {
        // Push the item to createdDataCollection Array
        createdDataCollection.push(item);
      }
    });


    // Loop the CreatedDataCollection and call APIs
    if (createdDataCollection.length) {
      this.insertAP(createdDataCollection).then((createdIdCollection) => {
        // Continue to edit the Main Block
        let accessPoints = this.model['accessPoints'];
        this.model['accessPoints'] = accessPoints.concat(createdIdCollection);
        this._service.updateAPG(this.regionID, this.model._id, this.model, null)
          .subscribe((res: any) => {
            this.cancelapg();
          }), err => {
            console.log("Error in Access Point updating")
          };
      }).catch((error) => {
        console.log("Catching AccessPoint App Error", error);
      });
    }
    if (editedDataCollection.length) {
      this.updateFunction(editedDataCollection).then((item) => {
        console.log(item, 'success')
      }).catch((error) => {
        console.log("Catching AccessPoint App Error", error);
      });
    }

  }

  createEvaluateApgs(nameparam) {
    this.templateAccessPointGroup
    var moduleId = localStorage.getItem('moduleID');
    var arr;

    var apg = {
      "name": "",
      "description": "",
      "moduleId": "",
      "accessPoints": []
    };
    var templateID;
    console.log(nameparam.name)

    this.insertAP(this.templateAccessPointGroup).then(res => {
      apg.name = nameparam.name;
      apg.accessPoints = res;
      apg.moduleId = moduleId;

      this._service.createAPG2(this.regionID, this.locationID, apg, moduleId)
        .subscribe((res: any) => {
          this.toastr.success('APG successfully Created.');
          console.log(res)
          setTimeout(() => {
            this.cancelapg();
          }, 200)
          this.setSelectedTab(this.pickedMType)
        }, err => {
          this.toastr.error('Created APG Fail');
          console.log(err)
        });

    }).catch((err) => {
      console.log(err); // never called
    });

  }

  // Made function param to be reuseable
  insertAP(dataCollection) {
    var apArr = {
      "name": "",
      "moduleId": "",
      "description": "",
      "data": {
        "evaluation": {
          "allowZero": false,
          "passMark": "",
          "details": [{
            "name": "string",
            "options": [
              "string"
            ]
          }]
        }
      }
    }

    var moduleId = localStorage.getItem('moduleID');
    var APIdarr = [];

    return Promise.all(dataCollection.map(ap => {
      // for(var j=0;j<ap.data.evaluation.details.length;j++){
      //   console.log(ap.name)
      //   
      // }

      apArr.name = ap.name;
      apArr.moduleId = this.moduleID;
      // apArr.moduleId = moduleId;
      console.log('module ID :', moduleId);
      apArr.data.evaluation = ap.data.evaluation;
      return new Promise((resolve, reject) => {
        this._service.createAP(this.regionID, this.locationID, apArr)
          .subscribe((res: any) => {
            resolve(res._id)
          }, err => {
            this.toastr.error('Created AP Fail');
            reject(err);
            console.log(err)
          });
      })
    }))
  }
  convertObjToArray(){
    console.log(this.valueArray);
    console.log(this.templateAccessPointGroup);
    this.templateAccessPointGroup.data.inputTypeProperties.options = []
    for(var i =0; i<this.valueArray.length; i++){
      var item = this.valueArray[i].name
      this.templateAccessPointGroup.data.inputTypeProperties.options.push(item)
    }
    console.log( this.templateAccessPointGroup.data.inputTypeProperties.options)
  }

  convertArrayToObj(){
    for(var i =0; i<this.templateAccessPointGroup.data.inputTypeProperties.options.length; i++){
      var item = {'name':''}
      item.name =  this.templateAccessPointGroup.data.inputTypeProperties.options[i]
      this.valueArray.push(item)
    }
    console.log(this.templateAccessPointGroup.data.inputTypeProperties.options);
    console.log( this.valueArray)
  }
  createDataAccessPoint() {
    return new Promise((resolve, reject) => {
      if (this.selectedRadio == 'RADIO') {
        this.convertObjToArray();
      }
      this._service.createAP(this.regionID, this.locationID, this.templateAccessPointGroup)
        .subscribe((res: any) => {
          //  resolve(this.AccessPoint = res._id ) 
          resolve(res._id)
          console.log(res._id)
        }, err => {
          this.toastr.error('Created AP Fail');
          reject(err)
          console.log(err)
        });
    })
  }
//  create Data Apg
  createDataApg() {
    // this.templateAccessPointGroup.data.inputTypeProperties.options = this.optionsArray;
    // this.optionsArray = [];
    this.createDataAccessPoint().then(apId => {
      var moduleId = localStorage.getItem('moduleID');
      var apg = {
        "name": this.model.name,
        "description": "",
        "moduleId": moduleId,
        "accessPoints": [apId]
      };
      this._service.createAPG(this.regionID, this.locationID, apg, null, moduleId).subscribe((res: any) => {
        console.log(res);
        this.toastr.success('APG successfully Created.');
        setTimeout(() => {
          this.cancelapg();
        }, 200)
        this.setSelectedTab(this.pickedMType)
        // this.optionsArray = [];
      }, err => {
        this.toastr.error('Created APG Fail');
      })

    }).catch((err) => {
      console.log(err); // never called
    });
  }
  //model._Id
  updateAp(apId, ap, apgId) {
   if(this.selectedRadio == 'RADIO') {
      this.convertObjToArray()
    }else{
      console.log('not data apg')
    }
    // ap.data.inputTypeProperties.options = this.optionsArray;
    return new Promise((resolve, reject) => {
      this._service.updateAP(this.regionID, apId, ap)
        .subscribe((res: any) => {
          console.log(res)
          resolve(res._id)
        }), err => {
          console.log(err)
        }
    }).then(accespointId => {
      this._service.updateAPG(this.regionID, apgId, this.model, null)
        .subscribe((res: any) => {
          console.log(res)
          this.cancelapg()
        }), err => {
          console.log(err)
        }
    }).catch((err) => {
      console.log(err); // never called
    });
  }
  updateFunction(dataCollection) {
    return Promise.all(dataCollection.map(item => {
      return this.updateAp(item._id, item, this.model._id)
    }))
  }

  createapgs(data, update) {
    console.log(update)
    var templateID;
    console.log(data)
    if (update == false) {
      console.log('create')
      var moduleId = localStorage.getItem('moduleID')
      data["moduleId"] = moduleId;
      this._service.createAP(this.regionID, this.locationID, data)
        .subscribe((res: any) => {
          // this.toastr.success('Successfully AP Created.');
          data["accessPoints"] = [res._id]
          console.log(data)
          this._service.createAPG(this.regionID, this.locationID, data, templateID, moduleId)
            .subscribe((res: any) => {
              this.toastr.success('APG successfully Created.');
              console.log(res)
              setTimeout(() => {
                this.cancelapg();
              }, 200)
              this.setSelectedTab(this.pickedMType)
              // this.cancelapg();
            }, err => {
              this.toastr.error('Created APG Fail');
              console.log(err)
            });
        }, err => {
          this.toastr.error('Created AP Fail');
          console.log(err)
        });

    } else {
      console.log('update')
      console.log(data)
      this.blockUI.start('Loading...');
      this._service.updateAPG(this.regionID, data._id, data, templateID)
        .subscribe((res: any) => {
          console.log('success update', res);
          this.toastr.success('Successfully APG Updated.');
          this.cancelapg();
          this.blockUI.stop();
        }, err => {
          this.toastr.error('Updated APG Fail');
          console.log(err)
        })
    }
  }

  setSelectedTab(apgType) {
    this.selectedAPGTab.name = apgType.name;
    this.selectedAPGTab.id = apgType.id;
  }

  apgPublicShare(apgID) {
    console.log(apgID)
    this.singleAPG(apgID, 'share');
  }
  onclickUpdate(id, apgName) {
    console.log(id)
    this.apgList = [];
    this.iscreate = true;
    this.isUpdate = true;
    if (apgName.module.name == "Data") {
      var moduleId = localStorage.getItem('moduleID');
      const templateAccessPoint = {
        "name": "",
        "description": "",
        "moduleId": moduleId,
        "data": {
          "sectionType": "DATA",
          "unit": " ",
          "inputType": this.selectedRadio,
          "inputTypeProperties": {
            "name": "",
            "min": "",
            "max": "",
            "options": [
              ""
            ]
          }
        }
      }
      this.templateAccessPointGroup = templateAccessPoint;

      this.dataApCreate = true;
      this.ismodule = false;
      this.apCreate = false;
    } else if (apgName.module.name == "Assessment" || apgName.module.name == "Evaluation") {
      this.apCreate = true;
    }
    return new Promise((resolve, reject) => {
      this.singleAPG(id, 'update').then(apId => {
        console.log('apid===>', apId)
        this.moduleID = this.model.moduleId;
        resolve(apId)
      }).catch((err) => {
        console.log(err); // never called1
      });
    }).then(accespointId => {
      console.log('accespointId===>',accespointId)
      this.getEditAccessPoint(this.regionID,accespointId,apgName.module.name)
      .then(dataCollection => {
        console.log('successs',dataCollection)
        let tempArr = [];
        this.templateAccessPointGroup = dataCollection;
        if(apgName.module.name == 'Evaluation' || apgName.module.name == "Assessment" ){
          this.templateAccessPointGroup.map( item => {
            if(item.data.evaluation.passMark > 0){
              item.options = true;
            }else{
              item.options = false; 
            }
            tempArr.push(item)
            this.templateAccessPointGroup = tempArr;
          })
        }
        this.accessPointArrayString = JSON.stringify(dataCollection);
        console.log(apgName.module.name)
        if(apgName.module.name.toLowerCase() == ('assessment' || 'evaluation')){
          console.log("evaluation~~~")
          setTimeout(() => {
            this.scrollCalculationAfter(this.templateAccessPointGroup)
          }, 10);
        }
        if(apgName.module.name .toLowerCase() == 'data'){
          this.sliderMinMax(dataCollection);
        }
      }).catch((err) => {
        console.log(err); // never called
      });
  
          // this.templateAccessPointGroup.push(res)
          // this.accessPointArrayString.push(JSON.stringify(res));
    }).catch((err) => {
      console.log(err); // never called
    });

  }

  singleAPG(id, state) {
    this.blockUI.start('Loading...');

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this._service.getSingleAPG(this.regionID, id)
          .subscribe((res: any) => {
            this.blockUI.stop();
            console.log('editapg', res)
            this.model = res;
            console.log('resolve res.accessPoints', res.accessPoints)
            resolve(res.accessPoints)
            if (state == 'share') {
              console.log(res)
              this.convertTemplate(res, res._id, res.name);
            }
            if (state == 'public') {
              console.log('public ok')
              this.publicAPG(res);

            }
          }, err => {
            this.blockUI.stop();
            console.log(err)
          })
      }, 300);
    })
    // setTimeout(() => {
    //   this._service.getSingleAPG(this.regionID, id)
    //     .subscribe((res: any) => {
    //       this.blockUI.stop();
    //       console.log('editapg', res)
    //       this.model = res;
    //       if (state == 'share') {
    //         console.log(res)
    //         this.convertTemplate(res, res._id, res.name);
    //       }
    //       if (state == 'public') {
    //         console.log('public ok')
    //         this.publicAPG(res);

    //       }
    //     }, err => {
    //       this.blockUI.stop();
    //       console.log(err)
    //     })
    // }, 10);
    // setTimeout(() => {
    // }, 1500);
  }

  // getAllTemplate(){
  //   this.blockUI.start('Loading...');
  //   this._service.getAllTemplate(this.regionID)
  //   .subscribe((res:any) => {
  //      console.log(res.length)
  //      console.log(res)
  //      this.blockUI.stop();
  //      this.tempLists = res;
  //      this.isempty = (res.length === 0) ? true : false;       
  //   }, err => {
  //       this.blockUI.stop();
  //       console.log(err)
  //   })
  // }

  // open(content){
  //   this.customAP = false;
  //   this.templateAPG = false;
  //   this.apArray = [];
  //   this.newAPList = [];
  //   this.customCheck = false;
  //   this.templateAPG = false;
  //   this.templateChecked = false;
  //    this.createButton = true;
  //    this.updateButton = false;
  //    this.checkedModuleID = [];
  //    this.checkedAPid = [];
  //    this.moduleAPList = [];
  //    this.getAccessPoint = [];
  //   this.apgField = new apgField();
  //   this.modalReference = this.modalService.open(content, { backdrop:'static', windowClass: 'animation-wrap'});
  //   this.modalReference.result.then((result) => {
  //     this.apgField = new apgField();
  //     this.apField = new apField();
  //  this.closeResult = `Closed with: ${result}`
  //   }, (reason) => {
  //     this.apgField = new apgField();
  //     this.apField = new apField();

  //     this.closeResult = `Closed with: ${reason}`;
  //   });
  // }

  // radioEvent(e, type){
  //   if(type == 'custom'){
  //     this.customAP = true;
  //     this.newAP = false;
  //     this.templateAPG = false;
  //     this.existAP = false;
  //     this.newAPshow = false;
  //      this.apgField.templateId = '';
  //   }
  //   else if(type == 'template'){
  //     this.customAP = false;
  //     this.templateAPG = true;
  //      this.customCheck = false;
  //      this.existAP = false;
  //      this.apgField.moduleId = '';
  //      this.apgField = new apgField();
  //   }
  //   else if(type == 'newap'){
  //     this.newAP = true;
  //     this.existAP = false;
  //     this.newAPshow = false;
  //      this.checkedAPid = [];
  //      this.apField = new apField();
  //      if(this.createButton == true && !this.apgField.moduleId){
  //        this.moduleId = '';
  //      }else {
  //        this.getAPofModule(this.moduleId);
  //      }
  //      if(this.createButton == true){
  //        this.apArray = [];
  //      }
  //   }
  //   else if(type == 'existap'){
  //     this.newAP = false;
  //     this.existAP = true;
  //     this.newAPshow = false;
  //      this.checkedAPid = [];
  //      this.apField = new apField();
  //      this.newAPList = [];
  //      this.apArray = [];
  //      if(this.createButton == true && !this.apgField.moduleId){
  //        this.moduleAPList = [];
  //      }
  //      else{
  //        this.getAPofModule(this.moduleId);

  //      }

  //   }
  //   else {
  //     console.log('error')
  //   }
  // }

  clickTab(type) {
    this.viewType = type;
  }

  createAP(formData) {
    console.log(formData);
    let data = {
      "name": formData.name,
      "description": formData.desc,
      "moduleId": this.moduleId
    }
    this.customCheck = false;
    this.checkedAPid = [];
    this._service.createAP(this.regionID, this.locationID, data)
      .subscribe((res: any) => {
        console.log('success post', res);
        this.responseAP = res;
        this.toastr.success('Successfully AP Created.');
        this.getAPofModule(this.moduleId);
        res.checked = true;
        this.newAPList.push(res);
        this.apArray.push(res._id);
        console.log(this.apArray)
        this.newAPshow = true;
        this.apField = new apField();;
      }, err => {
        if (this.moduleId == '') {
          this.toastr.warning('Firstly, you must choose a module.');
        } else {
          this.toastr.error('Created AP Fail');
        }
        console.log(err)
      })
  }

  moduleAP(id) {
    this.newAPList = [];
    this.moduleId = id;
    this.getAPofModule(id);
    this.checkedAPid = [];
    this.apArray = [];
  }

  checkedAP(id, e) {
    var cbIdx = this.apArray.indexOf(id);
    if (e.target.checked == true) {
      if (cbIdx < 0)
        this.apArray.push(id);
      console.log(this.apArray)
    } else {
      if (cbIdx >= 0) {
        this.apArray.splice(cbIdx, 1);
        console.log(this.apArray)
      }
    }
  }

  // createAPG(formData, type){
  //   console.log(formData)
  //    let data;
  //    if(!formData.templateId){
  //        data = {
  //          'name': formData.name,
  //          'description': formData.desc,
  //          'moduleId': formData.moduleId,
  //          'accessPoints': this.apArray        
  //        }
  //      }
  //   if(type == 'create'){
  //      console.log('create',data)
  //      this.newAPList = [];
  //      this.modalReference.close();
  //      this.blockUI.start('Loading...');
  //      this._service.createAPG(this.regionID, data, formData.templateId, formData.moduleId)
  //        .subscribe((res:any) => {
  //            console.log('success post',res);
  //            this.toastr.success('Successfully APG Created.');
  //            this.apArray = [];
  //            this.getAllAPG();
  //            this.blockUI.stop();
  //        }, err => {
  //            this.toastr.error('Created APG Fail');
  //            console.log(err)
  //        })  
  //    }
  //    else {
  //      console.log('update', data)
  //      this.newAPList = [];
  //      this.modalReference.close();
  //      this.blockUI.start('Loading...');
  //      this._service.updateAPG(this.regionID, this.editId, data, formData.templateId)
  //        .subscribe((res:any) => {
  //            console.log('success update',res);
  //            this.toastr.success('Successfully APG Updated.');
  //            this.getAllAPG();
  //            this.blockUI.stop();
  //        }, err => {
  //            this.toastr.error('Updated APG Fail');
  //            console.log(err)
  //        }) 
  //    }

  // }

  getAPofModule(moduleId) {
    this._service.getAllAPmodule(this.regionID, moduleId)
      .subscribe((res: any) => {
        console.log('moduleAPLists', res)
        this.moduleAPList = res;
        if (this.getAccessPoint) {
          if (this.newAP == false) {
            for (var j in this.getAccessPoint) {
              this.checkedAPid.push(this.getAccessPoint[j])
              this.apArray = this.checkedAPid;
              console.log(this.apArray)
            }
            if (this.tempModuleId != moduleId) {
              this.apArray = [];
            }
          } else {
            if (this.tempModuleId) {
              if (this.tempModuleId != this.apgField.moduleId) {
                if (this.responseAP) {
                  if (this.responseAP.moduleId != this.apgField.moduleId) {
                    this.apArray = [];
                  }
                } else {
                  this.apArray = [];
                }
              } else {
                this.apArray = this.getAccessPoint;
              }
            } else {
              for (var j in this.getAccessPoint) {
                if (this.apArray.indexOf(this.getAccessPoint[j]) < 0) {
                  this.apArray.push(this.getAccessPoint[j])
                }
              }
            }

            console.log(this.apArray)
            this.checkedAPid = this.getAccessPoint;
          }
        }
      }, err => {
        console.log(err)
      })
  }

  getAllAP() {
    this._service.getAllAP(this.regionID)
      .subscribe((res: any) => {
        console.log('APLists', res)
        this.apList = res;
        if (res.length == 0) {
          this.emptyAP = true;
        } else {
          this.emptyAP = false;
        }
      }, err => {
        console.log(err)
      })
  }

  getAllTemplate(limit, skip) {
    console.log(this.apgType)
    var moduleId = localStorage.getItem('moduleID');
    console.log(moduleId)
    this.blockUI.start('Loading')
    this._service.getAllTemplate(this.regionID, limit, skip, moduleId)
      .subscribe((res: any) => {
        console.log('templateLists', res)
        this.result = res;
        this.templateList = this.templateList.concat(res);
        if (this.apgType == "Assessment") {
          for (var i = 0; i < this.templateList.length; i++) {
            for (var j = 0; j < this.templateList[i].accessPoints.length; j++) {
              this.templateList[i].accessPoints[j].isExpand = false;
            }
          }
        }
        console.log(this.templateList)
        setTimeout(() => {
          this.blockUI.stop();
        }, 300);
      }, err => {
        console.log(err)
      })

  }

  getAllModule() {
    this._service.getAllModule(this.regionID)
      .subscribe((res: any) => {
        console.log('moduleLists', res)
        for (var i in res) {
          if (res[i]._id != null) {
            this.moduleList.push(res[i]);
          }
        }

      }, err => {
        console.log(err)
      })
  }

  showMore(skip: any) {
    // if(skip<=20){
    //   skip = 0;
    // }
    console.log("skip", skip);
    // // this.isFirst = false;
    // // this.getAllAPG(20,skip);
    if (this.isFirst == true) {
      console.log("Apg Search by keyword");
      // this.getApgSearch(this.searchWord, this.itemtype, 20, 0)
    } else {
      console.log("without keyword")
      this.getAllAPG(20, skip);
    }
    // this.getAllAPG(20,skip);
  }

  showmore(type, skip: any) {
    if (this.isSearch == true) {
      console.log("User Search");
      this.apgListSearch(this.keyword, type, 20, skip)
    } else {
      console.log("Not user search")
      this.getAllAPG(20, skip);
    }
  }

  showMoreShareApg(skip){
    if (this.isSearch == true) {
        console.log("User Search");
        this.sharedApgSearch(this.keyword,  20, skip)
      } else {
        console.log("Not user search")
        this.getAllTemplate(20, skip);
    }
}
  sharedApgSearch(keyword,limit,skip){
    this.keyword = keyword;
    if (skip == '' && limit == '') {
      console.log("First time search")
      var isFirst = true;
      limit = 20;
      skip = 0;
    }
    if( keyword.length != 0 ){
      this._service.getSearchTemplate(this.regionID, limit, skip, this.moduleID, keyword)
      .subscribe((res: any) => {
        console.log('templateLists', res)
        if (isFirst == true) {
          console.log("First time searching");
          this.templateList = [];
          this.templateList = res;
        } else {
          console.log("Not First time searching")
          // this.apgList = res;
          this.templateList = this.templateList.concat(res);
        }
        this.result = res;
      }, err => {
        console.log(err)
      })
    }else{
      setTimeout(() => {
        this.templateList = [];
        this.getAllTemplate(20, 0)
        this.isSearch = false;
      }, 100);
    }
  }

  apgListSearch(searchWord, type, limit, skip) {
    this.keyword = searchWord;
    console.log('hi hello');
    if (skip == '' && limit == '') {
      console.log("First time search")
      var isFirst = true;
      limit = 20;
      skip = 0;
    }

    if (searchWord.length != 0) {
      console.log('ApgType', this.selectedAPGTab.id, this.selectedAPGTab.name)
      this.isSearch = true;
      this._service.getSearchApg(this.regionID, searchWord, type, this.selectedAPGTab.id, '', limit, skip)
        .subscribe((res: any) => {
          console.log(res);
          // this.apgList = res;
          this.result = res;
          if (isFirst == true) {
            console.log("First time searching");
            this.apgList = [];
            this.apgList = res;
          } else {
            console.log("Not First time searching")
            // this.apgList = res;
            this.apgList = this.apgList.concat(res);
          }
        }, err => {
          console.log(err);
        });
    } else {
      setTimeout(() => {
        this.apgList = [];
        this.clearAPGTypeArr()
        this.getAllAPG(limit, skip);
        this.isSearch = false;
      }, 100);
    }
  }

  // checkApgType(){
  //   if(this.selectedAPGTab.name.toLowerCase() == 'all'){
  //     console.log('checkApgType',this.selectedAPGTab.id)
  //   }else if(this.selectedAPGTab.name.toLowerCase() == 'badge'){
  //     console.log('checkApgType',this.selectedAPGTab.id)
  //   }else if(this.selectedAPGTab.name.toLowerCase() == 'progress'){
  //    console.log('checkApgType',this.selectedAPGTab.id)
  //   }else if(this.selectedAPGTab.name.toLowerCase() == 'assessment' || this.selectedAPGTab.name.toLowerCase() == 'evaluation'){
  //     console.log('checkApgType',this.selectedAPGTab.id)
  //   }else if(this.selectedAPGTab.name.toLowerCase() == 'data'){
  //     console.log('checkApgType',this.selectedAPGTab.id)
  //   }
  // }

  // getApgSearch(keyword, type, limit, skip) {
  //   this._service.getSearchApg(this.regionID, keyword, type, '', limit, skip)
  //     .subscribe((res: any) => {
  //       console.log(res);
  //       this.result = res;
  //       if (type == 'apg') {
  //         this.apgList = res;
  //         // if(this.isFirst == true){
  //         //   console.log("First time searching");
  //         //   this.apgList = [];
  //         //   this.apgList = res;
  //         // }else{
  //         //   console.log("Not First time searching")
  //         //   this.apgList = this.apgList.concat(res);
  //         // }  
  //       } else {
  //         this.templateList = res;
  //       }
  //     }, err => {
  //       console.log(err);
  //     });
  // }

  getAllAPG(limit, skip) {
    this.blockUI.start('Loading...');
    console.log(this.selectedAPGTab)
    this._service.getAllAPG(this.regionID, this.selectedAPGTab.id, limit, skip)
      .subscribe((res: any) => {
        this.apgList = [];
        this.result = res;
        console.log('apgLists', res)
        if (this.selectedAPGTab.name.toLowerCase() == 'all') {
          this.allApgList = this.allApgList.concat(res);
          this.apgList = this.allApgList;
        } else if (this.selectedAPGTab.name.toLowerCase() == 'badge') {
          this.badgeApg = this.badgeApg.concat(res);
          this.apgList = this.badgeApg;
        } else if (this.selectedAPGTab.name.toLowerCase() == 'progress') {
          this.progressAPG = this.progressAPG.concat(res);
          this.apgList = this.progressAPG;
        } else if (this.selectedAPGTab.name.toLowerCase() == 'assessment' || this.selectedAPGTab.name.toLowerCase() == 'evaluation') {
          this.evAPG = this.evAPG.concat(res);
          this.apgList = this.evAPG;
        } else if (this.selectedAPGTab.name.toLowerCase() == 'data') {
          this.dataApgList = this.dataApgList.concat(res);
          this.apgList = this.dataApgList;
        }
        for(var i=0;i<this.apgList.length;i++){
          if(this.apgList[i].module.name == 'Assessment' || this.apgList[i].module.name == 'Evaluation'){
            for(var j=0;j<this.apgList[i].accessPoints.length;j++){
              this.apgList[i].accessPoints[j].isExpand = false;
            }
          }
        }
        console.log("APG lists",this.apgList);
        
        // this.apgList = res;
        // this.result = res;
        // this.apgList = this.apgList.concat(res);
        // console.log("apglists",this.apgList)
        if (res.length == 0) {
          this.emptyAPG = true;
        } else {
          this.emptyAPG = false;
        }
        setTimeout(() => {
          this.blockUI.stop(); // Stop blocking
        }, 300);
      }, err => {
        console.log(err)
      })
  }

  closeDeleteModal(){
    this.modalReference.close();
  }

  onclickDelete(id, alertDelete) {
    this.deleteId = id;
    for (var i in this.apgList) {
      if (this.apgList[i]._id == id) {
        this.deleteAPG = this.apgList[i].name;
      }
    }
    this.modalReference = this.modalService.open(alertDelete, {
      backdrop: 'static',
      windowClass: 'deleteModal d-flex justify-content-center align-items-center'
    });
  }

  apgDelete(id) {
    this.modalReference.close();
    this.blockUI.start('Loading...');
    this._service.deleteAPG(this.regionID, id)
      .subscribe((res: any) => {
        console.log('deleteapg', res)
        setTimeout(() => {
          this.blockUI.stop(); // Stop blocking
        }, 200);
        this.toastr.success('Successfully APG deleted.');
        this.apgList = [];
        this.getAllAPG(20, 0);
        this.clearAPGTypeArr()
      }, err => {
        console.log(err)
      })
  }

  // editAPG(id, content){
  //   this.getAllTemplate();
  //    this.apgField = new apgField();
  //   this.customAP = false;
  //   this.templateAPG = false;
  //   this.existAP = false;
  //   this.newAPshow = false;
  //    this.newAP = false;
  //    this.createButton = false;
  //    this.updateButton = true;
  //    this.newAPList = [];
  //   this.checkedModuleID = [];
  //   this.checkedAPid = [];
  //    this.apArray = [];
  //   this.modalReference = this.modalService.open(content,{ backdrop:'static', windowClass:'animation-wrap'});
  //   this._service.getSingleAPG(this.regionID, id)
  //   .subscribe((res:any) => {
  //     console.log('editapg' ,res)
  //      this.getAPofModule(res.moduleId);
  //      this.tempModuleId = res.moduleId;
  //      this.moduleId = res.moduleId;
  //     for(var i in this.moduleList){
  //       if(this.moduleList[i]._id == res.moduleId){
  //         this.checkedModuleID.push(res.moduleId);
  //       }
  //     }
  //      if(res.accessPoints == ''){
  //        this.customCheck = false;
  //        this.existAP = false;
  //      }
  //      else {
  //        this.customCheck = true;
  //        this.existAP = true;
  //      }
  //   this.customAP = true;
  //   this.templateChecked = false;
  //      this.getAccessPoint = res.accessPoints;
  //     this.apgField = res;
  //      this.editId = id;
  //   }, err => {
  //       console.log(err)
  //   })
  // }

  // clickConvert(id, cTemplate){
  //   this.convertField = new convertField();
  //   this.convertId = id;
  //   this.modalReference = this.modalService.open(cTemplate, { backdrop:'static', windowClass: 'animation-wrap'});
  // }

  convertTemplate(apgObj, id, apgName) {
    console.log(apgObj)
    let data = {
      'name': apgName,
    }
    this.tempSharedApgId = id;
    console.log(data,id)
    this.blockUI.start('Loading...');
    this._service.convertApgTemplate(id, data).subscribe((res: any) => {
      console.log(res)
      let returnData = JSON.parse(res._body)
      this.singleAPG(returnData._id, 'public');

    }, err => {
      console.log(err)
    })
  }

  publicAPG(data) {
    console.log('public share', data)
    data.public = true;
    this._service.updateSingleTemplate(this.regionID, data)
      .subscribe((res: any) => {
        console.log(res)
        this.clearAPGTypeArr();
        this.getAllAPG(20, 0);
        this.toastr.success('Successfully shared to public.');
        this.blockUI.stop();
      }, err => {
        this.toastr.success(status + ' Fail.');
        this.blockUI.stop();
        console.log(err)
      })
  }
  autoResize(item,e, id, name, x) {
    console.log(e.target.style)
    console.log(e.target.scrollHeight)
    console.log(id);
    e.target.style.cssText = 'height:auto';
    e.target.style.height = e.target.scrollHeight + "px";
    this.scrollCalculation(item,id);
    // const skillHeight: HTMLElement = document.getElementById('skill-requirement-id-' + id);
    // const skillHeader: HTMLElement = document.getElementById('skillHeader' + id);
    // const skillFooterClassName: HTMLElement = document.getElementById('skillFooter' + id);
    // const skillFooter: HTMLElement = document.getElementById('skillFooter' + id);
    // const innerBoxHeight: HTMLElement = document.getElementById('requirement-inner-box-' + id);

    // this.headerHeight = skillHeader.clientHeight;
    // var totalHeight = this.headerHeight + skillFooter.clientHeight + innerBoxHeight.clientHeight;
    // var mHight = 400 - (this.headerHeight + skillFooter.clientHeight);
    // console.log("mHight>>" + mHight)
    // console.log("header height in add scorll:" + this.headerHeight);
    // if (totalHeight < 400) {
    //   skillHeight.setAttribute("style", "height: auto;");
    //   console.log("under 400")
    // } else {
    //   skillHeight.setAttribute("style", "height: 400px;");
    //   innerBoxHeight.setAttribute("style", "height:" + mHight + "px;overflow:overlay;")
    //   console.log("over 400")
    // }

    this.addInputValue()
  }
  minAndMax(e, value, index) {

    console.log(e)
    console.log(value)
    if (value < 0)
      value = 0;
    else if (value > 100)
      value = 100;
    this.templateAccessPointGroup[index].data.evaluation.passMark = value;
    e.target.value = value;
    console.log(value)
    console.log(index)
  }
  radioSelect(type) {
    this.selectedRadio = type;
    this.templateAccessPointGroup.data.inputType = type;
      if (type == "RADIO") {
        // this.optionsArray = ['']
        this.valueArray = [{'name':''}]
        console.log(this.valueArray);
        this.templateAccessPointGroup.data.unit = '';
        this.templateAccessPointGroup.data.inputTypeProperties.min = "";
        this.templateAccessPointGroup.data.inputTypeProperties.max = "";
      } else if (type == "NUMBER") {
        // console.log(this.optionsArray)
        // this.templateAccessPointGroup.data.inputTypeProperties.options = [""];
        // this.templateAccessPointGroup.data.inputTypeProperties.options[0] = [''];
        // this.optionsArray = ['']
        this.templateAccessPointGroup.data.unit = '';
        this.templateAccessPointGroup.data.inputTypeProperties.min = "";
        this.templateAccessPointGroup.data.inputTypeProperties.max = "";
      } else {
        // this.optionsArray = ['']
        this.templateAccessPointGroup.data.unit = '';
      }
    
    this.chkValue('val', 'type')
  }

  checkValidation(arr) {
    var apgName = this.model.name
    // console.log(apgName)
    var tempArr = []
    if (this.selectedRadio == 'RADIO' || apgName.length == 0) {
      for(var i = 0; i < arr.length; i++){
        tempArr.push(arr[i].name)
      }
      if (tempArr.includes("")) {
        this.valid = false;
      } else {
        this.valid = true
      }
    } else if (this.selectedRadio == "NUMBER" || apgName.length == 0) {
      if (this.templateAccessPointGroup.data.unit == "") {
        this.valid = false;
      } else {
        this.valid = true;
      }
    } else {
      var min = this.templateAccessPointGroup.data.inputTypeProperties.min;
      var max = this.templateAccessPointGroup.data.inputTypeProperties.max;
      if (min === "" || max === "" || min >= max || apgName.length == 0 || this.templateAccessPointGroup.data.unit == "" ) {
        this.valid = false;
      } else {
        this.valid = true;
      }
    }
  }
  setInputValueFromObject(arr) {
    setTimeout(() => {
      console.log($(".data-wrapper").children())
      console.log($(".one-selection-wrapper").children(".selection-wrapper").children(".form-group").children("input"))
      var tempArr = $(".one-selection-wrapper").children(".selection-wrapper").children(".form-group").children("input");
      for (var i = 0; i < arr.length; i++)
        $(tempArr[i]).val(arr[i])
    }, 100);
  }
  getEditAccessPoint(reginId, accesPointId, apgName) {
    console.log(apgName, '<<<<<<<<<========')
    if (apgName == "Data") {
      return new Promise((resolve, reject) => {
        this._service.getAccessPoint(reginId, accesPointId)
          .subscribe((res: any) => {
            console.log(res)
            this.templateAccessPointGroup = res;
            // this.optionsArray = this.templateAccessPointGroup.data.inputTypeProperties.options;
            this.selectedRadio = this.templateAccessPointGroup.data.inputType
            this.tempRadioType = this.templateAccessPointGroup.data.inputType
            this.convertArrayToObj()
            this.chkValue('val', 'type')
            // console.log(this.optionsArray)
            resolve(res)
            // this.setInputValueFromObject(this.optionsArray)
          }, err => {
            console.log(err)
          })
      })
    
    } else {
      console.log('asss ==========>>>')
      this.templateAccessPointGroup = [];
      this.checkProperties(this.formObj)
      return Promise.all(accesPointId.map(accesPoint => {
        return new Promise((resolve, reject) => {
          this._service.getAccessPoint(reginId, accesPoint)
            .subscribe((res: any) => {
              console.log(res)
              resolve(res)
              // this.templateAccessPointGroup.push(res)
              // this.accessPointArrayString.push(JSON.stringify(res));
            }, err => {
              console.log(err)
              reject(err)
            })
        })
      }));
    }

  }

  ChangedTimeValue(obj) {
    console.log(obj)
    // var range = this.maxValue - this.minValue;
    var range = this.templateAccessPointGroup.data.inputTypeProperties.max - this.templateAccessPointGroup.data.inputTypeProperties.min;
    // var position = ((obj - this.minValue) / range) * 100;
    var position = ((obj - this.templateAccessPointGroup.data.inputTypeProperties.min) / range) * 100;
    var positionOffset = Math.round(20 * position / 100) - (20 / 2);
    this.exitValue = obj;
    const box: HTMLElement = document.getElementById('arrowBox');

    if (this.templateAccessPointGroup.data.inputTypeProperties.max < this.templateAccessPointGroup.data.inputTypeProperties.min) {
      box.setAttribute("style", 'display:none');
    } else {
      box.setAttribute("style", 'margin-left:calc(' + position + '% - ' + positionOffset + 'px)');
    }
    console.log(this.templateAccessPointGroup)
  }

  chkValue(v, type) {
    console.log(this.templateAccessPointGroup.data.inputTypeProperties.min)
    // if (type == 'min') {
    if (this.templateAccessPointGroup.data.inputTypeProperties.min === '' || this.templateAccessPointGroup.data.inputTypeProperties.min === null) {
      this.emptymin = true;
    } else {
      this.emptymin = false;
    }
    // } 
    // if(type == 'max') {
    if (this.templateAccessPointGroup.data.inputTypeProperties.max === '' || this.templateAccessPointGroup.data.inputTypeProperties.max === null) {
      this.emptymax = true;
    } else {
      this.emptymax = false;
    }
    // }
    if (this.templateAccessPointGroup.data.inputTypeProperties.max <= this.templateAccessPointGroup.data.inputTypeProperties.min) {
      this.overmin = true;
    } else {
      this.overmin = false;
    }
  }
  //slider for edit
  sliderMinMax(obj){
    console.log("here input focus>>",obj.data.inputTypeProperties.min)
    this.chkValue(String(obj.data.inputTypeProperties.min),"min");
    this.chkValue(String(obj.data.inputTypeProperties.max),"max");
  }

  toShowClear() {
    // return this.optionsArray.length > 1;
  }
  addDataValueText(i, e) {
    console.log(e)
    // this.templateAccessPointGroup.data.inputTypeProperties.options[i] = e.target.value;
    // this.optionsArray[i] = e.target.value;
  }

  showApDetails:boolean = false;
  expandAccessPoint(i, ind,type) {
    if(type == 'apg'){
      this.apgList[i].accessPoints[ind].isExpand = !this.apgList[i].accessPoints[ind].isExpand;
    }else{
      this.templateList[i].accessPoints[ind].isExpand = !this.templateList[i].accessPoints[ind].isExpand;
      console.log(i, ind)
    }
  }

  searchName;
  onClickApgTab(name, id) {
    this.clearAPGTypeArr()
    if (name == 'All') {

      this.selectedAPGTab.name = 'All';
      this.selectedAPGTab.id = '';
    } else {
      this.selectedAPGTab.name = name;
      this.selectedAPGTab.id = id;
    }
    this.getAllAPG(20, 0);
    console.log("onClickApgTab", this.selectedAPGTab)
    this.searchName = "";
  }
  public get half(): number {
    return Math.ceil(this.templateList.length / 2);
  }
  clearAPGTypeArr() {
    this.allApgList = [];
    this.progressAPG = [];
    this.badgeApg = [];
    this.evAPG = [];
    this.dataApgList = [];
  }
  numberOnly(event, type) {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    if (event.target.value.search(/^0/) != -1) {
      event.target.value = '';
    }
  }
}
