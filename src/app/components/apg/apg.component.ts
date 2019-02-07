import { cloneWithOffset } from 'ngx-bootstrap/chronos/units/offset';
import { DragScrollModule } from 'ngx-drag-scroll';
import { Component, OnInit, ViewContainerRef, HostListener, style, DoCheck, OnDestroy } from '@angular/core';
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
@Component({
  selector: 'app-apg',
  templateUrl: './apg.component.html',
  styleUrls: ['./apg.component.css']
})
export class ApgComponent implements OnInit, OnDestroy {
  public valid:boolean;
  public templateAccessPointGroup: any = []
  public AccessPoint:any;
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
  public groupNumber : number = 0;
  public selectedRadio = "Number"

  constructor(private modalService: NgbModal,
    private _service: appService,
    public toastr: ToastsManager, public vcr: ViewContainerRef,
    private router: Router,
    private dragulaService: DragulaService) {
    console.log(this.templateAccessPointGroup)

    dragulaService.cloned().subscribe(({ clone, original, cloneType }) => {
      // console.log(clone,original,cloneType)
      // var top = $(clone).height();
      // console.log(top)
      // console.log($(clone).eventX)
      // $(clone).css('height','70')
      // $(clone).css('overflow','hidden')
      // console.log($(clone).css())
      // console.log($(clone))
      // console.log($(original).hide())
      // $(original).hide()
      $(clone).css('top', $("#clone").height() + "px");
      $(clone).children(".close-search").hide();
    })  
    if(this.dragulaService.find("COLUMNS") ==undefined)
    this.dragulaService.createGroup("COLUMNS", {
      direction: 'vertical',
      moves: (el, source, handle) => handle.className === "group-handle" ,
      // accepts : (el,target) => console.log(el,target)
    });
    if(this.dragulaService.find("0") ==undefined)
    this.dragulaService.createGroup("0", {
      direction: 'vertical',
      moves: (el, source, handle) => handle.className === "move-sign"
    });
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
  this.dragulaService.destroy("COLUMNS");
    for(var i=0; i<this.groupNumber ; i++){

     
      console.log(this.dragulaService.destroy(String(i))); ;
            var dd = this.dragulaService.find(String(i))
            console.log("----------------->" , dd)
      console.log("<<<<<<---------------->" , dd)
    }
  }

  ngOnInit() {
    // this.dragulaService
    //   .drag("COLUMNS")
    //   .subscribe(({ name,el, source})  => {
    //     this.stillDrag = true;
    //     var _this = this;
    //     console.log(name , el, source)
    //     if(this.stillDrag){
    //       document.addEventListener("mousemove", function (event) {
    //         console.log(_this.stillDrag)
    //       })
    //     }
    //     // this.msg = `Dragging the ${value[1].innerText}!`;
    //   });
    this.dragulaService.cancel().subscribe(({ name, el, container, source }) => {

      this.stillDrag = false;
      console.log("CAncel")
      this.dragOut = false;

    })
    this.dragulaService.drop().subscribe(({ el, target, source, sibling }) => {
      // console.log(this.dragId)
      // clearInterval(this.dragId)
      console.log("DRRRROP")
      this.stillDrag = false;
      this.dragOut = false;
    })
    this.dragulaService.drag().subscribe(({ name, el, source }) => {
      // if (name == "COLUMNS") {
      //   var _this = this;
      //   // console.log(_this.stillDrag = true)
      //   if(_this.stillDrag){
      //     document.addEventListener("mousemove", function (event) {
      //       var y = $(".gu-mirror").position().top;
      //       var container = $(el).parents(".requirements-wrapper");
      //     })
      //   }
      // } else {
        console.log(name)
        if(name === "COLUMNS"){
          // console.log(this.stillDrag=true)
          // console.log("fackup")
          // var _this = this;
          // var _this = this;
          this.stillDrag = true;
          var stillDrag = this.stillDrag

          var windowBottom =  window.innerHeight - $('.form-footer').outerHeight()
          document.addEventListener("mousemove", function (event) {
            document.addEventListener("mouseup", function (event) {
              stillDrag = false;
            })
            if (stillDrag) {
              var container = $(el).parents(".requirements-wrapper")[0];
              
              var y = $(".gu-mirror").position().top;
              var dragHeight = y +  $(".gu-mirror").height();
              var dropHeight = $(container).position().top +  $(container).height()
              // console.log( $(container).position().top  , y)
              if(dropHeight - dragHeight < 20){
                container.scrollTop +=60;
              }
              else if( $(container).position().top - y< 20 ){
                container.scrollTop -= 60;
              }
              // console.log($(container).height())
              // console.log(container.offsetHeight)
              // console.log($( container))
              // console.log(stillDrag)
              // var y = $(".gu-mirror").position().top;
              // console.log($(".gu-mirror").height())
              // var dragHeight =  $(".gu-mirror").position().top + $(".gu-mirror").height();
              // if(container.length >0){
              //   // var ddd = container[0].offsetTop +  $(container[0]).offsetHeight;
              //   // console.log(window.innerHeight)
              //   // console.log( $(container))

              //   // console.log($('.form-footer'))
              //   console.log(dragHeight)
              //   console.log(window.innerHeight - $('.form-footer').height())
              //   if ( window.innerHeight - $('.form-footer').height() == dragHeight) {
              //     console.log("Scroll down")
              //     var ele = container[0];
              //   // setTimeout(function(){
              //    ele.scrollTop += 20,
              //     console.log(container[0])
              //   // if (ele.scrollHeight == ele.scrollTop + container.height()) {
              //   //   $(ele).append(el)
              //   // }
              //   // }, 300);
              //   console.log(ele.scrollTop)
              //   }
              // }
            }
          })
        }
        else{
        console.log("other than")
        this.stillDrag = true;

        this.dragOut = false;
        var stillDrag = this.stillDrag;
        document.addEventListener("mousemove", function (event) {
          if (stillDrag) {
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
                  $(ele).append(el)
                }
                // }, 300);
              } else if (y - containerTop <= 20) {
                var ele = container[0];
                // setTimeout(function(){
                ele.scrollTop -= 20
                if (ele.scrollTop == 0) {
                  $(ele).prepend(el)
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

    this.dragulaService.shadow().subscribe(({ el, container, source }) => {
      // console.log(this.stillDrag)
      // console.log(el, container, source)
    })
    this.dragulaService.out().subscribe(({ name, container, source }) => {
      console.log("out now");
      this.dragOut = true;
      // this.dragulaService.cancel(name);
      // this.dragulaService.destroy(name)
    })
    this.dragulaService.cloned().subscribe(({ clone, original, cloneType }) => {
      // if ($(original).parent().children().length == 1) {
      //   console.log($(clone).hide())
      // } else {

      // }
      $(clone).css('top', $("#clone").height() + "px");
      $(clone).children(".close-search").hide();
      $(clone).children(".img-wrapper").empty()
      $(clone).children(".img-wrapper").append('<img src="../../../assets/images/grab-holder.svg" id="move-sign" class="move-sign" style="margin: 0;position: absolute;height: 32px;top: 50%;transform: translate(0, -50%);"/>')
    })
    this.dragulaService.over().subscribe(({ name, el, container, source }) => {

    })

    for (var i = 0; i < this.templateAccessPointGroup.length; i++) {
      this.dragulaService
        .drag(this.templateAccessPointGroup[i].name)
        .subscribe(({ name, el, source }) => {

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
    }
    else {
      $('.limit-wordcount1').show('slow');
    }
  }

  blurMethod(e, status) {
    this.wordLength = 0;
    if (status == 'name') {
      $('.limit-wordcount').hide('slow');
    } else if (status = "input_method") {
      $('.limit-type-wordcount').hide('slow');

    }
    else {
      $('.limit-wordcount1').hide('slow');
    }
  }

  changeMethod(val: string) {
    console.log(val)
    this.wordLength = val.length;
  }

  cancelapg() {
    this.apgList = [];
    this.model = {};
    this.apCreate = false;
    this.iscreate = false;
    this.ismodule = false;
    this.isUpdate = false;
    this.shareAPG = false;
    this.isshare = false;
    this.isGlobal = false;
    //for evaluation APG
    this.templateAccessPointGroup = []

    this.getAllAPG(20, 0);
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
    if (status == 'type') {
      console.log('type')
      localStorage.removeItem('moduleID');
      this.cancelapg();
    } else if (status == 'create') {
      this.iscreate = false;
      this.isshare = false;
      this.ismodule = true;
      this.apCreate = false;
      this.model = {};
    } else {
      this.isshare = true;
      this.shareAPG = false;
      this.iscreate = false;
    }
    this.templateAccessPointGroup = []
  }

  addNewAPG() {
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
  addDataValue(data,i){
    const newValue = ""
    this.templateAccessPointGroup.data.inputTypeProperties.options.push(newValue)
    console.error(this.templateAccessPointGroup.data.inputTypeProperties.options)
    console.log(data)
    console.warn(JSON.stringify(data))
  }
  dataValueClear(item){
    console.warn(item)
    this.templateAccessPointGroup.data.inputTypeProperties.options.splice(item, 1)
    console.error(this.templateAccessPointGroup.data.inputTypeProperties.options)

  }

  createNewAPG(status, name) {
    console.log("Create new APg", name)
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
              "passMark": 0,
              "details": [
                {
                  "requirement": "",
                  "options": [
                    ""
                  ]
                }
              ]
            }
          }
        }

        this.templateAccessPointGroup.push(templateAccessPoint)
        // this.iscreate = false;
        this.apCreate = true;
        // ismodule == false && iscreate == false && isshare == false && shareAPG == false
      } else if (name == 'Data') {
        this.templateAccessPointGroup = {}
        var moduleId = localStorage.getItem('moduleID');
        const templateAccessPoint = {
          "name": "",
          "description": "",
          "moduleId": moduleId,
          "data": {
            "sectionType": "Data",
            "unit": "",
            "inputType": "",
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
      }
      else {
        this.model = {};
        this.dataApCreate = false;
        this.iscreate = true;
        this.isshare = false;
        this.apCreate = false;
      }
    } else {
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
        this.cancelapg();
      }, err => {
        this.toastr.success(status + ' Fail.');
        this.blockUI.stop();
        console.log(err)
      })
  }

  chooseModuleType(val, name) {
    this.apgType = name;
    console.log(name)
    this.ischecked = val;
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
          "passMark": Number,
          "details": [
            {
              "requirement": "",
              "options": [
                ""
              ]
            }
          ]
        }
      }
    }
    console.log(templateAccessPoint);
    this.templateAccessPointGroup.push(templateAccessPoint)
    if(this.dragulaService.find(String(this.groupNumber)) ==undefined)

      this.dragulaService.createGroup(String(this.groupNumber), {
        direction: 'vertical',
        moves: (el, source, handle) => handle.className === "move-sign"
      // });
    })
    
  }

  subAccessPointAdd(skillBlog, i) {

    console.log(this.templateAccessPointGroup)
    console.log('~~~~~~~~', i,skillBlog)
    let req = {
      "requirement": "",
      "options": [
        ""
      ]
    };
    this.templateAccessPointGroup[i].data.evaluation.details.push(req);
    // this.addscrollEvent(skillBlog,i);
    setTimeout(() => {
      this.scrollCalculation(skillBlog, i);
      this.focusAdd(skillBlog.data.evaluation.details.length,i)
    }, 200);
    // this.focusAdd(skillBlog.data.evaluation.details.length,i)
    
  }
   
  subAccessPointClear(item,skillblog,id,x){
    // setTimeout(() => {
    //   i.data.evaluation.details.splice(i.data.evaluation.details.indexOf(item),1);
      
    // }, 0);
    this.templateAccessPointGroup[id].data.evaluation.details.splice(x,1);
    console.log(skillblog)
    // this.removescrollEvent(i,id,x);
    this.scrollCalculation(skillblog,id);
  }

  focusAdd(length,idx){
    var l = length - 1;
    console.log("target~~~",l,idx,document.getElementById('box' + l + idx))
    document.getElementById('box' + l + idx).focus();
  }

  scrollCalculation(skillObj,skillId){
    const skillHeight: HTMLElement = document.getElementById('skill-requirement-id-'+skillId);
    const skillHeader: HTMLElement = document.getElementById('skillHeader'+skillId);
    const skillFooter: HTMLElement = document.getElementById('skillFooter'+skillId);
    const innerBoxHeight: HTMLElement = document.getElementById('requirement-inner-box-'+skillId);
    var req_total_height=0;

    for(var j=0;j<skillObj.data.evaluation.details.length;j++){
      const requirement: HTMLElement = document.getElementById('requirement'+j);
      req_total_height+=requirement.clientHeight;
      console.log(req_total_height);
    }

    var totalHeight=skillHeader.clientHeight+skillFooter.clientHeight+req_total_height;
    var inboxHight=400-(skillHeader.clientHeight+skillFooter.clientHeight);

    console.log(totalHeight);

    if(totalHeight < 400){
      console.log("less than 400")
      skillHeight.setAttribute("style", "height: auto;");
      innerBoxHeight.setAttribute("style","height:auto;overflow:none;")
      this.templateAccessPointGroup[skillId].upDownOptions=false;
      this.templateAccessPointGroup[skillId].upOptions=false;
      this.templateAccessPointGroup[skillId].DownOptions=false;
    }else{
      console.log("greater than 400")
      skillHeight.setAttribute("style", "height: 400px;");
      innerBoxHeight.setAttribute("style","height:"+inboxHight+"px;overflow:overlay;")        
      this.templateAccessPointGroup[skillId].upDownOptions=true;
      this.templateAccessPointGroup[skillId].upOptions=false;
      this.templateAccessPointGroup[skillId].DownOptions=true;
    }
  }

  addScrollOncheckMarkToggle(skillObjId, res) {
    console.log("reach checkMarkToggle>>" + skillObjId);
    const skillHeader: HTMLElement = document.getElementById('skillHeader' + skillObjId);
    const skillHeight: HTMLElement = document.getElementById('skill-requirement-id-' + skillObjId);
    const skillFooterClassName: HTMLElement = document.getElementById('skillFooter' + skillObjId);
    const skillFooter: HTMLElement = document.getElementById('skillFooter' + skillObjId);
    const innerBoxHeight: HTMLElement = document.getElementById('requirement-inner-box-' + skillObjId);

    this.headerHeight = skillHeader.clientHeight;
    var totalHeight = this.headerHeight + skillFooter.clientHeight + innerBoxHeight.clientHeight;
    var mHight = 400 - (this.headerHeight + skillFooter.clientHeight);

    if (totalHeight < 400) {
      skillHeight.setAttribute("style", "height: auto;");
      console.log("under 400")
    } else {
      skillHeight.setAttribute("style", "height: 400px;");
      innerBoxHeight.setAttribute("style", "height:" + mHight + "px;overflow:overlay;")
      // this.templateAccessPointGroup[skillObjId].upOptions=false;
      // this.templateAccessPointGroup[skillObjId].DownOptions=true;
      console.log("over 400")
    }

    console.log("header height in add smark:" + this.headerHeight);
  }

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


  mainAccessPointClear(item) {
    this.templateAccessPointGroup.splice(this.templateAccessPointGroup.indexOf(item), 1);
  }

  checkMarkToggle(item, skillObjId) {
    // this.isGlobal = !this.isGlobal
    item.options = !item.options;
    console.log(item.options)

    setTimeout(() => {
      this.addScrollOncheckMarkToggle(skillObjId, item.options);
      // if(item.options){
      //   const skillHeader: HTMLElement = document.getElementById('skillHeader'+skillObjId);
      //   console.log(skillHeader.clientHeight)
      // } else{
      //   const skillHeader: HTMLElement = document.getElementById('skillHeader'+skillObjId);
      //   console.log(skillHeader.clientHeight)
      // }
    })

  }

  pushDownClick(i) {
    const innerBoxHeight: HTMLElement = document.getElementById('requirement-inner-box-' + i);
    // this.isUpDownHide = true;
    this.templateAccessPointGroup[i].upOptions = false;
    this.templateAccessPointGroup[i].DownOptions = true;
    innerBoxHeight.scrollTop = innerBoxHeight.scrollHeight

  }

  pushUpClick(i) {
    const skillHeight: HTMLElement = document.getElementById('skill-requirement-id-' + i);
    const innerBoxHeight: HTMLElement = document.getElementById('requirement-inner-box-' + i);

    innerBoxHeight.scrollTop = 0;
    this.templateAccessPointGroup[i].upOptions = true;
    this.templateAccessPointGroup[i].DownOptions = false;
    console.log(innerBoxHeight.scrollTop)
  }

  createEvaluateApgs(nameparam) {
    var moduleId = localStorage.getItem('moduleID');
    var arr;

    var apg = { "name": "", "description": "", "moduleId": "", "accessPoints": [] };
    var templateID;

    console.log(nameparam.name)

    this.insertAP().then(res => {
      apg.name = nameparam.name;
      apg.accessPoints = res;
      apg.moduleId = moduleId;

      this._service.createAPG2(this.regionID, this.locationID, apg, moduleId)
        .subscribe((res: any) => {
          this.toastr.success('APG successfully Created.');
          console.log(res)
          this.cancelapg();
        }, err => {
          this.toastr.error('Created APG Fail');
          console.log(err)
        });

    }).catch((err) => {
      console.log(err); // never called
    });

  }

  insertAP() {
    var apArr = {
      "name": "",
      "moduleId": "",
      "description": "",
      "data": {
        "evaluation": {
          "passMark": 0,
          "details": [
            {
              "name": "string",
              "options": [
                "string"
              ]
            }
          ]
        }
      }
    }

    var moduleId = localStorage.getItem('moduleID');
    var APIdarr = [];

    return Promise.all(this.templateAccessPointGroup.map(ap => {
      // for(var j=0;j<ap.data.evaluation.details.length;j++){
      //   console.log(ap.name)
      //   
      // }

      apArr.name = ap.name;
      apArr.moduleId = moduleId;
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

  createDataAccessPoint(){
    this._service.createAP(this.regionID, this.locationID, this.templateAccessPointGroup)
    .subscribe((res: any) => {
      this.AccessPoint = res._id 
      console.log(res._id)
    }, err => {
      this.toastr.error('Created AP Fail');
      console.log(err)
    });
  }

  createDataApg(){
    this.createDataAccessPoint();
    setTimeout(() => {
      var moduleId = localStorage.getItem('moduleID');
      var apg = {
        "name": this.model.name,
        "description": "",
        "moduleId": moduleId, 
        "accessPoints": [this.AccessPoint] };
      this._service.createAPG(this.regionID,this.locationID,apg,null,moduleId).subscribe((res:any) =>{
        console.log(res);
        this.toastr.success('APG successfully Created.');
        this.cancelapg();
      },err =>{
        this.toastr.error('Created APG Fail');
      })
    }, 1000);
      

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
              this.cancelapg();
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

  apgPublicShare(apgID) {
    console.log(apgID)
    this.singleAPG(apgID, 'share');
  }

  onclickUpdate(id) {
    console.log(id)
    this.apgList = [];
    this.singleAPG(id, 'update');
    this.iscreate = true;
    this.isUpdate = true;
  }

  singleAPG(id, state) {
    this.blockUI.start('Loading...');
    this._service.getSingleAPG(this.regionID, id)
      .subscribe((res: any) => {
        this.blockUI.stop();
        console.log('editapg', res)
        this.model = res;
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
      setTimeout(() => {
        this.getEditAccessPoint(this.regionID,this.model.accessPoints)
      }, 1500);
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
        this.apField = new apField();
        ;
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
    }
    else {
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
          }
          else {
            if (this.tempModuleId) {
              if (this.tempModuleId != this.apgField.moduleId) {
                if (this.responseAP) {
                  if (this.responseAP.moduleId != this.apgField.moduleId) {
                    this.apArray = [];
                  }
                } else {
                  this.apArray = [];
                }
              }
              else {
                this.apArray = this.getAccessPoint;
              }
            }
            else {
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
    this._service.getAllTemplate(this.regionID, limit, skip)
      .subscribe((res: any) => {
        console.log('templateLists', res)
        this.result = res;
        this.templateList = this.templateList.concat(res);
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
      this.userSearch(this.keyword, type, 20, skip)
    } else {
      console.log("Not user search")
      this.getAllAPG(20, skip);
    }
  }


  showMoreTemplate(skip) {
    this.getAllTemplate(20, skip);
  }

  changeSearch(keyword, type) {
    console.log(keyword)
    // this.getApgSearch(keyword, type, 20, 0);
    this.searchWord = keyword;
    this.isFirst = true;
    this.itemtype = type;
    // this.isSearch = true;
    if (type == 'apg') {
      if (keyword.length == 0) {
        this.apgList = [];
        this.getAllAPG(20, 0)
      }
    } else {
      if (keyword.length == 0) {
        this.templateList = [];
        this.getAllTemplate(20, 0)
      }
    }
  }

  userSearch(searchWord, type, limit, skip) {
    this.keyword = searchWord;
    console.log('hi hello');
    if (skip == '' && limit == '') {
      console.log("First time search")
      var isFirst = true;
      limit = 20;
      skip = 0;
    }

    if (searchWord.length != 0) {
      this.isSearch = true;
      this._service.getSearchApg(this.regionID, searchWord, type, '', limit, skip)
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
        this.getAllAPG(limit, skip);
        this.isSearch = false;
      }, 300);
    }
  }

  getApgSearch(keyword, type, limit, skip) {
    this._service.getSearchApg(this.regionID, keyword, type, '', limit, skip)
      .subscribe((res: any) => {
        console.log(res);
        this.result = res;
        if (type == 'apg') {
          this.apgList = res;
          // if(this.isFirst == true){
          //   console.log("First time searching");
          //   this.apgList = [];
          //   this.apgList = res;
          // }else{
          //   console.log("Not First time searching")
          //   this.apgList = this.apgList.concat(res);
          // }  
        } else {
          this.templateList = res;
        }
      }, err => {
        console.log(err);
      });
  }

  getAllAPG(limit, skip) {
    this.blockUI.start('Loading...');
    this._service.getAllAPG(this.regionID, limit, skip)
      .subscribe((res: any) => {
        console.log('apgLists', res)
        this.result = res;
        this.apgList = this.apgList.concat(res);
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

  onclickDelete(id, alertDelete) {
    this.deleteId = id;
    for (var i in this.apgList) {
      if (this.apgList[i]._id == id) {
        this.deleteAPG = this.apgList[i].name;
      }
    }
    this.modalReference = this.modalService.open(alertDelete, { backdrop: 'static', windowClass: 'deleteModal d-flex justify-content-center align-items-center' });
  }

  apgDelete(id) {
    this.modalReference.close();
    this.blockUI.start('Loading...');
    this._service.deleteAPG(this.regionID, id)
      .subscribe((res: any) => {
        console.log('deleteapg', res)
        setTimeout(() => {
          this.blockUI.stop(); // Stop blocking
        }, 300);
        this.toastr.success('Successfully APG deleted.');
        this.apgList = [];
        this.getAllAPG(20, 0);
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
    console.log(data)
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
        this.getAllTemplate(20, 0);
        this.toastr.success('Successfully shared to public.');
        this.blockUI.stop();
      }, err => {
        this.toastr.success(status + ' Fail.');
        this.blockUI.stop();
        console.log(err)
      })
  }
  autoResize(e, id) {
    console.log(e.target.style)
    console.log(e.target.scrollHeight)
    e.target.style.cssText = 'height:auto';
    e.target.style.height = e.target.scrollHeight + "px";
    const skillHeight: HTMLElement = document.getElementById('skill-requirement-id-' + id);
    const skillHeader: HTMLElement = document.getElementById('skillHeader' + id);
    const skillFooterClassName: HTMLElement = document.getElementById('skillFooter' + id);
    const skillFooter: HTMLElement = document.getElementById('skillFooter' + id);
    const innerBoxHeight: HTMLElement = document.getElementById('requirement-inner-box-' + id);

    this.headerHeight = skillHeader.clientHeight;
    var totalHeight = this.headerHeight + skillFooter.clientHeight + innerBoxHeight.clientHeight;
    var mHight = 400 - (this.headerHeight + skillFooter.clientHeight);
    console.log("mHight>>" + mHight)
    console.log("header height in add scorll:" + this.headerHeight);
    if (totalHeight < 400) {
      skillHeight.setAttribute("style", "height: auto;");
      console.log("under 400")
    } else {
      skillHeight.setAttribute("style", "height: 400px;");
      innerBoxHeight.setAttribute("style", "height:" + mHight + "px;overflow:overlay;")
      console.log("over 400")
    }
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
    this.templateAccessPointGroup.data.inputType=type;
    if(type == "Radio"){
      this.templateAccessPointGroup.data.unit="";
      this.templateAccessPointGroup.data.inputTypeProperties.min="";
      this.templateAccessPointGroup.data.inputTypeProperties.max="";
      console.log("Radio")
    }else if(type == "Number"){
      this.templateAccessPointGroup.data.inputTypeProperties.options=[""];
      this.templateAccessPointGroup.data.inputTypeProperties.options[0]=[''];
      this.templateAccessPointGroup.data.inputTypeProperties.min="";
      this.templateAccessPointGroup.data.inputTypeProperties.max="";
      console.log("Number")
    }else{
      this.templateAccessPointGroup.data.inputTypeProperties.options=[""];
      this.templateAccessPointGroup.data.inputTypeProperties.options[0]=[""];
      this.templateAccessPointGroup.data.unit="";
      console.log("Range")
    }
  }
  
  checkValidation(arr){
    var apgName = this.model.name
    // console.log(apgName)
    if(this.selectedRadio == 'Radio'|| apgName.length == 0){
      if(arr.includes("")){
        this.valid = false;
      }else{
        this.valid = true
      }
    }else if(this.selectedRadio == "Number"|| apgName.length == 0){
      if(this.templateAccessPointGroup.data.unit == ""){
        this.valid = false;
      }else{
        this.valid =true;
      }
    }else{
      var min =this.templateAccessPointGroup.data.inputTypeProperties.min;
      var max =this.templateAccessPointGroup.data.inputTypeProperties.max;
      if(min== "" || max==""|| apgName.length == 0){
        this.valid = false;
      }else{
        this.valid =true;
      }
    }
  }
  getEditAccessPoint(reginId,accesPointId){
    this._service.getAccessPoint(reginId,accesPointId)
    .subscribe((res: any) => {
      console.log(res)
      this.templateAccessPointGroup = res
    }, err => {
      console.log(err)
    })
  }
}