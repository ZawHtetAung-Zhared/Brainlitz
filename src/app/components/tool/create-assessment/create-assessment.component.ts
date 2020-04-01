import { CropPosition } from 'ng2-img-cropper/src/model/cropPosition';
import { cloneWithOffset } from 'ngx-bootstrap/chronos/units/offset';
import { DragScrollModule } from 'ngx-drag-scroll';
import { Location } from '@angular/common';
import {
  Component,
  OnInit,
  ViewContainerRef,
  HostListener
} from '@angular/core';

import { apgField } from '../apg';
import { apField } from '../apg';
import { convertField } from '../apg';
import { appService } from '../../../service/app.service';
// import { ToastsManager } from 'ng5-toastr/ng5-toastr';
import { ToastrService } from 'ngx-toastr';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import 'rxjs/add/operator/takeUntil';
declare var $: any;
import { Router, ActivatedRoute } from '@angular/router';
import { DragulaService, DragulaModule } from 'ng2-dragula';
@Component({
  selector: 'app-create-assessment',
  templateUrl: './create-assessment.component.html',
  styleUrls: ['./create-assessment.component.css']
})
export class CreateAssessmentComponent implements OnInit {
  // temp value to selected radio
  public valid: boolean;
  public isCreate: boolean = false;
  public accessPointArrayString: any = [];
  public templateAccessPointGroup: any = [];
  public templateAccessPoint: {};
  public model: any = {};
  public tempSharedApgId: any;

  // public accessPoint:any = {};
  public dataVal: any = {};
  apgField: apgField = new apgField();
  apField: apField = new apField();
  convertField: convertField = new convertField();

  public regionID = localStorage.getItem('regionId');
  public locationID = localStorage.getItem('locationId');
  formObj = {};

  templateList: Array<any> = [];
  apgList: Array<any> = [];

  @BlockUI() blockUI: NgBlockUI;
  moduleId: any;
  isScroll: boolean = true;
  wordLength: any = 0;
  headerHeight: number = 0;
  public dragOut: boolean = false;
  public stillDrag: boolean = false;
  public optionsArray: any = [''];
  public groupNumber: number = 0;
  public isExpandArr: any = [];
  public selectedRadio = '';
  public dragEle: any = [];
  public dropEle: any = [];
  public assessmentId: any;
  testArr: any = [];
  isEmpty: boolean = true;
  delItem: any;
  showDp: boolean = false;

  constructor(
    private _service: appService,
    public toastr: ToastrService,
    public vcr: ViewContainerRef,
    private router: Router,
    private _location: Location,
    private dragulaService: DragulaService,
    private _activeRoute: ActivatedRoute
  ) {
    console.log(this.templateAccessPointGroup);
    dragulaService.cloned().subscribe(({ clone, original, cloneType }) => {
      // $(clone).css('top', $("#clone").height() + "px");
      $(clone)
        .children('.close-search')
        .hide();
    });

    if (this.dragulaService.find('COLUMNS') === undefined) {
      console.log('COLUMNS WORKing');
      this.dragulaService.createGroup('COLUMNS', {
        direction: 'vertical',
        moves: (el, source, handle) => handle.className === 'group-handle'
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

    this.dragulaService
      .drop('COLUMNS')
      .subscribe(({ el, target, source, sibling }) => {
        $(target).append($('.add-new-skill'));
      });

    // this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnDestroy() {
    this.dragulaService.destroy('data_COLUMNS');
    this.dragulaService.destroy('COLUMNS');
    for (var i = 0; i < this.groupNumber; i++)
      var dd = this.dragulaService.find(String(i));
  }
  testFunct() {
    var stillDragInTestFunc = this.stillDrag;
    var templategroug = this.templateAccessPointGroup;
    // return this.stillDrag;
    // return this.stillDrag;
  }

  ngOnInit() {
    this.moduleId = this._activeRoute.snapshot.paramMap.get('mid');
    this.assessmentId = this._activeRoute.snapshot.paramMap.get('id');
    if (this.assessmentId) {
      console.error('is edit');
      this.getSingleAPG();
      this.isCreate = false;
    } else {
      this.isCreate = true;
      const templateAccessPoint = {
        name: '',
        description: '',
        moduleId: '',
        options: false,
        upDownOptions: false,
        upOptions: false,
        DownOptions: false,
        data: {
          evaluation: {
            allowZero: false,
            passMark: '',
            details: [
              {
                name: '',
                options: ['']
              }
            ]
          }
        }
      };

      this.templateAccessPointGroup.push(templateAccessPoint);
      if (this.templateAccessPointGroup.length > 0) {
        this.formObj['skillName0'] = '';
        this.formObj['requirement00'] = '';
        console.log('formObj~~~', this.formObj);
        this.checkProperties(this.formObj);
      }
    }
    console.log(this.assessmentId);

    this.dragulaService.drag('COLUMNS').subscribe(({ name, el, source }) => {
      this.stillDrag = true;
      // var _this = this;
      console.log(name, el, source);
      if (this.stillDrag) {
        document.addEventListener('mousemove', function(event) {
          // console.log(_this.stillDrag)
        });
        document.addEventListener('touchmove', function(event) {
          // event.preventDefault();
          // $('.requirements-wrapper').css('overflow', 'hidden');
        });
      }
      // this.msg = `Dragging the ${value[1].innerText}!`;
    });

    this.dragulaService
      .cloned('data_COLUMNS')
      .subscribe(({ name, clone, original, cloneType }) => {
        console.log('it is work cloning');
        var tempEle = $(clone)
          .children('.selection-wrapper')
          .children('.img-wrapper');
        $(clone).height(70);
        $(clone).width(400);
        $(clone)
          .children('.selection-wrapper')
          .children('.data-close')
          .hide();
        $(clone)
          .children('.data-close')
          .remove();
        tempEle.empty();

        tempEle.append(
          '<img src="../../../assets/images/grab-holder.svg"  style="margin: 0;position: absolute;width: 32px;top: 50%;transform: translate(0, -50%);padding:10px;"/>'
        );
        console.log($(tempEle.children()[0]).css('padding'));
      });
    // no sibling

    this.dragulaService
      .drop('data_COLUMNS')
      .subscribe(({ name, el, target, source, sibling }) => {
        console.log('it is work drpop');
        console.log(name, el, target, source, sibling);
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
    this.dragulaService
      .cancel()
      .subscribe(({ name, el, container, source }) => {
        console.log('it is work draging data columns');
        this.stillDrag = false;
        console.log('CAncel');
        this.dragOut = false;
        console.log('Drag', this.dragEle, 'drop', this.dropEle);
        // $('.requirements-wrapper').css('overflow', '');
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
      });
    this.dragulaService.drop().subscribe(({ el, target, source, sibling }) => {
      // console.log(this.dragId)
      // clearInterval(this.dragId)
      console.log('DRRRROP');

      console.log('------>>', this.templateAccessPointGroup);
      this.stillDrag = false;
      this.dragOut = false;
      // $('.requirements-wrapper').css('overflow', '');
    });
    this.dragulaService.drag().subscribe(({ name, el, source }) => {
      console.log(name === 'COLUMNS');
      if (name === 'COLUMNS') {
        this.stillDrag = true;
        document.addEventListener(
          'mousemove',
          (this.testFunct = () => {
            // console.log(this.stillDrag)
            if (this.stillDrag) {
              var container = $(el).parents('.requirements-wrapper')[0];
              if ($('.gu-mirror').position() && container) {
                var y = $('.gu-mirror').position().top;
                var dragHeight = y + $('.gu-mirror').height();
                var dropHeight =
                  $(container).position().top + $(container).height();
                if (y - $(container).position().top < 10) {
                  container.scrollTop -= 10;
                } else if (dropHeight - dragHeight < 10) {
                  container.scrollTop += 10;
                }
              }
            }
          }),
          false
        );
        document.addEventListener(
          'touchmove',
          (this.testFunct = () => {
            // console.log(this.stillDrag)
            if (this.stillDrag) {
              var container = $(el).parents('.requirements-wrapper')[0];
              if ($('.gu-mirror').position() && container) {
                var y = $('.gu-mirror').position().top;
                var dragHeight = y + $('.gu-mirror').height();
                var dropHeight =
                  $(container).position().top + $(container).height();
                if (y - $(container).position().top < 10) {
                  container.scrollTop -= 10;
                } else if (dropHeight - dragHeight < 10) {
                  container.scrollTop += 10;
                }
              }
            }
          }),
          false
        );
      } else if (name === 'data_COLUMNS') {
        this.stillDrag = true;
        document.addEventListener(
          'mousemove',
          (this.testFunct = () => {
            // console.log(this.stillDrag)
            if (this.stillDrag) {
              var container = $(el).parents('.data-wrapper')[0];
              // var windowHeight = $(window).height();
              if ($('.gu-mirror').position() && container) {
                // var y = $('.gu-mirror').position().top;
                // if (y > 900) {
                //   var x = 5;
                //   window.scrollBy(0, x);
                // } else if (y < 900) {
                //   console.log('s');
                //   var z = -3;
                //   window.scrollBy(0, z);
                // }

                var y = $('.gu-mirror').position().top;
                var dragHeight = y + $('.gu-mirror').height();
                var dropHeight =
                  $(container).position().top + $(container).height();
                if (y - $(container).position().top < 200) {
                  container.scrollTop -= 10;
                } else if (dropHeight - dragHeight < 50) {
                  container.scrollTop += 10;
                }
              }
            }
          }),
          false
        );

        document.addEventListener(
          'touchmove',
          (this.testFunct = () => {
            // console.log(this.stillDrag)
            if (this.stillDrag) {
              var container = $(el).parents('.data-wrapper')[0];
              if ($('.gu-mirror').position() && container) {
                var y = $('.gu-mirror').position().top;
                var dragHeight = y + $('.gu-mirror').height();
                var dropHeight =
                  $(container).position().top + $(container).height();
                if (y - $(container).position().top < 320) {
                  container.scrollTop -= 5;
                } else if (dropHeight - dragHeight < 50) {
                  container.scrollTop += 5;
                }
              }
            }
          }),
          false
        );
      } else {
        console.log('other than');
        this.stillDrag = true;

        this.dragOut = false;
        var stillDrag = this.stillDrag;
        document.addEventListener(
          'mousemove',
          (this.testFunct = () => {
            if (stillDrag) {
              // event.preventDefault();
              // console.log($(event.target).parents(".requirement"))
              // console.log(event.pageY)
              // console.log($(el))
              // var y = event.pageY
              var y = $('.gu-mirror').position().top;
              //$(event.target).parents(".requirement-inner-box")
              var container = $(el).parents('.requirement-inner-box');
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
                  ele.scrollTop += 20;
                  if (ele.scrollHeight == ele.scrollTop + container.height()) {
                    // $(ele).append(el) //For Scroll Down
                  }
                  // }, 300);
                } else if (y - containerTop <= 20) {
                  var ele = container[0];
                  // setTimeout(function(){
                  ele.scrollTop -= 20;
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
          })
        );
        document.addEventListener(
          'touchmove',
          (this.testFunct = () => {
            if (stillDrag) {
              var y = $('.gu-mirror').position().top;
              var container = $(el).parents('.requirement-inner-box');
              if (container.length > 0) {
                var ddd = container[0].getBoundingClientRect().top + 236;
                var containerTop = container[0].getBoundingClientRect().top;
                if (ddd - y <= 70) {
                  var ele = container[0];
                  ele.scrollTop += 20;
                  if (ele.scrollHeight == ele.scrollTop + container.height()) {
                  }
                } else if (y - containerTop <= 20) {
                  var ele = container[0];
                  ele.scrollTop -= 20;
                  if (ele.scrollTop == 0) {
                  }
                }
              }
            }
          })
        );
        document.addEventListener('mouseup', function(event) {
          stillDrag = false;
        });
        document.addEventListener('touchend', function(event) {
          stillDrag = false;
        });
      }
    });

    this.dragulaService.shadow().subscribe(({ el, container, source }) => {
      console.log('shadow', this.templateAccessPointGroup);
    });
    this.dragulaService.out().subscribe(({ name, container, source }) => {
      console.log('out now');
      this.dragOut = true;
      // $('.requirements-wrapper').css('overflow', '');
    });
    this.dragulaService.cloned().subscribe(({ clone, original, cloneType }) => {
      $(clone).css('top', $('#clone').height() + 'px');
      $(clone)
        .children('.close-search')
        .hide();
      $(clone)
        .children('.img-wrapper')
        .empty();
      $(clone)
        .children('.img-wrapper')
        .append(
          '<img src="../../../assets/images/grab-holder.svg" id="move-sign" class="move-sign" style="margin: 0;position: absolute;height: 32px;top: 50%;transform: translate(0, -50%);padding:10px;"/>'
        );
      // console.log( $(clone).children(".img-wrapper").children())
    });
    for (var i = 0; i < this.templateAccessPointGroup.length; i++) {
      this.dragulaService
        .drag(this.templateAccessPointGroup[i].name)
        .subscribe(({ name, el, source }) => {});
    }
    this.dataVal = {
      _id: '',
      moduleId: ''
    };
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

  // @HostListener('window:scroll', ['$event']) onScroll($event) {
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
  // }

  @HostListener('document:click', ['$event']) clickout($event) {
    this.showDp = false;
  }

  focusMethod(e, status, word) {
    this.wordLength = word.length;
    if (status == 'name') {
      $('.limit-wordcount').show('slow');
    } else if ((status = 'input_method')) {
      $('.limit-type-wordcount').show('slow');
    } else {
      $('.limit-wordcount1').show('slow');
    }
  }

  blurMethod(e, status) {
    this.wordLength = 0;
    if (status == 'name') {
      $('.limit-wordcount').hide('slow');
    } else if ((status = 'input_method')) {
      $('.limit-type-wordcount').hide('slow');
    } else {
      $('.limit-wordcount1').hide('slow');
    }
  }

  changeMethod(val: string) {
    console.log(val);
    this.wordLength = val.length;
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

  // goToBack() {
  //   this.router.navigateByUrl('tools/tracking-module/selected-module');
  // }
  goToBack() {
    this._location.back();
  }

  cancelapg() {
    this.router.navigateByUrl('tools/tracking-module/lists/3/' + this.moduleId);
  }

  mainAccessPointAdd() {
    // let testObj = {
    // }
    this.groupNumber += 1;
    console.log(this.groupNumber);
    const templateAccessPoint = {
      name: '',
      description: '',
      moduleId: '',
      options: false,
      upDownOptions: false,
      data: {
        evaluation: {
          allowZero: false,
          passMark: '',
          details: [
            {
              name: '',
              options: ['']
            }
          ]
        }
      }
    };
    console.log(templateAccessPoint);
    this.templateAccessPointGroup.push(templateAccessPoint);
    if (this.templateAccessPointGroup.length > 0) {
      console.log('length', this.templateAccessPointGroup.length);
      var l = this.templateAccessPointGroup.length - 1;
      this.formObj['skillName' + l] = '';
      this.formObj['requirement0' + l] = '';
      console.log('formObj~~~', this.formObj);
      this.checkProperties(this.formObj);
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
      this.formObj['skillName' + k] = this.templateAccessPointGroup[k].name;
      for (
        var kk = 0;
        kk < this.templateAccessPointGroup[k].data.evaluation.details.length;
        kk++
      ) {
        this.formObj['requirement' + kk + k] = this.templateAccessPointGroup[
          k
        ].data.evaluation.details[kk].name;
      }
    }
    console.log('adding Input value to formObj', this.formObj);
    this.checkProperties(this.formObj);
  }

  removeValue(val) {
    this.formObj = {};
    console.log(val);
    for (var k = 0; k < val.length; k++) {
      this.formObj['skillName' + k] = val[k].name;
      for (
        var kk = 0;
        kk < this.templateAccessPointGroup[k].data.evaluation.details.length;
        kk++
      ) {
        this.formObj['requirement' + kk + k] =
          val[k].data.evaluation.details[kk].name;
      }
    }
    console.log('formObj~~~~', this.formObj);
    this.checkProperties(this.formObj);
  }

  checkProperties(obj) {
    var valueArr = Object.values(obj);
    console.log(valueArr);
    if (valueArr.includes('')) {
      this.isEmpty = true;
      console.log('isEmpty', this.isEmpty);
    } else {
      this.isEmpty = false;
      console.log('isEmpty', this.isEmpty);
    }
  }

  subAccessPointAdd(skillBlog, i) {
    console.log(this.templateAccessPointGroup);
    console.log('~~~~~~~~', i, skillBlog);
    let req = {
      name: '',
      options: ['']
    };
    this.templateAccessPointGroup[i].data.evaluation.details.push(req);
    console.log(this.templateAccessPointGroup[i].data.evaluation.details);
    if (this.templateAccessPointGroup.length > 0) {
      console.log(
        'length',
        this.templateAccessPointGroup[i].data.evaluation.details.length
      );
      var x =
        this.templateAccessPointGroup[i].data.evaluation.details.length - 1;
      this.formObj['requirement' + x + i] = '';
      console.log('formObj~~~', this.formObj);
    }

    // this.addscrollEvent(skillBlog,i);
    setTimeout(() => {
      this.scrollCalculation(skillBlog, i);
      this.focusAdd(skillBlog.data.evaluation.details.length, i);
    }, 200);
    this.checkProperties(this.formObj);
    // this.focusAdd(skillBlog.data.evaluation.details.length,i)
  }

  subAccessPointClear(item, skillblog, id, x, name) {
    // setTimeout(() => {
    //   i.data.evaluation.details.splice(i.data.evaluation.details.indexOf(item),1);

    // }, 0);
    this.templateAccessPointGroup[id].data.evaluation.details.splice(x, 1);
    console.log(item);
    // this.removescrollEvent(i,id,x);
    this.scrollCalculation(skillblog, id);
    setTimeout(() => {
      this.removeValue(this.templateAccessPointGroup);
    });
    // this.removeValue(name,id,x,'requirement')
  }

  focusAdd(length, idx) {
    var l = length - 1;
    // console.log("target~~~",l,idx,document.getElementById('box' + l + idx))
    document.getElementById('box' + l + idx).focus();
  }

  //scroll calculation in update for evaluation
  scrollCalculationAfter(data) {
    this.isScroll = true;

    //using setTimeout() for finish html create to get each div hegiht next calculate the totoal height and if div hight extra 400 add scroll and arrow if not remove scroll and arrow
    setTimeout(() => {
      for (var i = 0; i < data.length; i++) {
        const skillHeight: HTMLElement = document.getElementById(
          'skill-requirement-id-' + i
        );
        const skillHeader: HTMLElement = document.getElementById(
          'skillHeader' + i
        );
        const skillFooter: HTMLElement = document.getElementById(
          'skillFooter' + i
        );
        const innerBoxHeight: HTMLElement = document.getElementById(
          'requirement-inner-box-' + i
        );
        var req_total_height = 0;

        for (var j = 0; j < data[i].data.evaluation.details.length; j++) {
          const requirement: HTMLElement = document.getElementById(
            'requirement' + i + j
          );
          req_total_height += requirement.clientHeight;
        }

        var totalHeight =
          skillHeader.clientHeight +
          skillFooter.clientHeight +
          req_total_height;
        var inboxHight =
          400 - (skillHeader.clientHeight + skillFooter.clientHeight);

        if (totalHeight < 400) {
          skillHeight.setAttribute('style', 'height: auto;');
          innerBoxHeight.setAttribute('style', 'height:auto;overflow:none;');
          this.templateAccessPointGroup[i].upDownOptions = false;
          this.templateAccessPointGroup[i].upOptions = false;
          this.templateAccessPointGroup[i].DownOptions = false;
        } else {
          skillHeight.setAttribute('style', 'height: 400px;');
          innerBoxHeight.setAttribute(
            'style',
            'height:' + inboxHight + 'px;overflow:overlay;'
          );
          this.templateAccessPointGroup[i].upDownOptions = true;
          this.templateAccessPointGroup[i].upOptions = false;
          this.templateAccessPointGroup[i].DownOptions = true;
        }
      }
    }, 10);
  }

  // Create in scroll calculation for evaluation
  scrollCalculation(skillObj, skillId) {
    const skillHeight: HTMLElement = document.getElementById(
      'skill-requirement-id-' + skillId
    );
    const skillHeader: HTMLElement = document.getElementById(
      'skillHeader' + skillId
    );
    const skillFooter: HTMLElement = document.getElementById(
      'skillFooter' + skillId
    );
    const innerBoxHeight: HTMLElement = document.getElementById(
      'requirement-inner-box-' + skillId
    );

    var req_total_height = 0;

    for (var j = 0; j < skillObj.data.evaluation.details.length; j++) {
      const requirement: HTMLElement = document.getElementById(
        'requirement' + skillId + j
      );

      req_total_height += requirement.clientHeight;
    }

    var totalHeight =
      skillHeader.clientHeight + skillFooter.clientHeight + req_total_height;
    var inboxHight =
      400 - (skillHeader.clientHeight + skillFooter.clientHeight);

    if (totalHeight < 400) {
      skillHeight.setAttribute('style', 'height: auto;');
      innerBoxHeight.setAttribute('style', 'height:auto;overflow:unset;');
      this.templateAccessPointGroup[skillId].upDownOptions = false;
      this.templateAccessPointGroup[skillId].upOptions = false;
      this.templateAccessPointGroup[skillId].DownOptions = false;
    } else {
      skillHeight.setAttribute('style', 'height: 400px;');
      innerBoxHeight.setAttribute(
        'style',
        'height:' + inboxHight + 'px;overflow:overlay;'
      );
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

  //moving scroll add arrow in evaluation create and update
  requirementInnerBox($event, i) {
    const skillHeight: HTMLElement = document.getElementById(
      'skill-requirement-id-' + i
    );
    const innerBoxHeight: HTMLElement = document.getElementById(
      'requirement-inner-box-' + i
    );

    if (
      innerBoxHeight.scrollHeight - innerBoxHeight.scrollTop ==
      innerBoxHeight.clientHeight
    ) {
      this.templateAccessPointGroup[i].upOptions = true;
      this.templateAccessPointGroup[i].DownOptions = false;
    } else {
      this.templateAccessPointGroup[i].upOptions = false;
      this.templateAccessPointGroup[i].DownOptions = true;
    }
  }

  mainAccessPointClear(item, idx, name, type) {
    this.delItem = item;
    console.log(idx);
    this.templateAccessPointGroup.splice(
      this.templateAccessPointGroup.indexOf(item),
      1
    );
    if (type == 'update') {
      let jsonStringIntoArray = JSON.parse(this.accessPointArrayString);
      // delete element from accesspoint arraystring
      jsonStringIntoArray.splice(idx, 1);
      this.accessPointArrayString = JSON.stringify(jsonStringIntoArray);
    }
    // console.log(JSON.parse(this.accessPointArrayString).splice(idx,1))
    // console.error(JSON.stringify(JSON.parse(this.accessPointArrayString).splice(idx,1)))

    // this.templateAccessPointGroup.splice(this.templateAccessPointGroup.indexOf(item), 1);

    setTimeout(() => {
      this.removeValue(this.templateAccessPointGroup);
    });
    // this.removeValue(name,idx,'','skill')

    // this.templateAccessPointGroup.splice(this.templateAccessPointGroup.indexOf(item), 1);
    // this.removeValue(name,idx,'','skill')
  }
  allowZeroToggle(item) {
    item.data.evaluation.allowZero = !item.data.evaluation.allowZero;
  }
  checkMarkToggle(item, skillObjId) {
    let temPassMark = this.templateAccessPointGroup[skillObjId].data.evaluation
      .passMark;
    console.log(item);
    item.options = !item.options;
    if (!item.options) {
      item.data.evaluation.passMark = '';
    }
    console.log(item.options);
    setTimeout(() => {
      this.scrollCalculation(item, skillObjId);
    });
  }

  //pushDownClick in evaluation create requirement
  pushDownClick(i) {
    const innerBoxHeight: HTMLElement = document.getElementById(
      'requirement-inner-box-' + i
    );
    // this.isUpDownHide = true;
    this.templateAccessPointGroup[i].upOptions = false;
    this.templateAccessPointGroup[i].DownOptions = true;
    innerBoxHeight.scrollTop = innerBoxHeight.scrollHeight;
  }

  //pushUPClick in evaluation create requirement
  pushUpClick(i) {
    const skillHeight: HTMLElement = document.getElementById(
      'skill-requirement-id-' + i
    );
    const innerBoxHeight: HTMLElement = document.getElementById(
      'requirement-inner-box-' + i
    );

    innerBoxHeight.scrollTop = 0;
    this.templateAccessPointGroup[i].upOptions = true;
    this.templateAccessPointGroup[i].DownOptions = false;
    console.log(innerBoxHeight.scrollTop);
  }

  callCreateAPI() {}

  updateAPOnly(apId, ap) {
    console.log('update AP only', ap);
    var editap = {};
    editap['name'] = ap.name;
    editap['description'] = ap.description;
    editap['moduleId'] = ap.moduleId;
    editap['data'] = {
      evaluation: {
        allowZero: ap.data.evaluation.allowZero,
        passMark: ap.data.evaluation.passMark,
        details: ap.data.evaluation.details
      }
    };
    console.log(editap);
    this._service.updateAP(this.regionID, apId, editap).subscribe(
      (res: any) => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  createEvaluateApgs(nameparam) {
    this.templateAccessPointGroup;
    var arr;

    var apg = {
      name: '',
      description: '',
      moduleId: '',
      accessPoints: []
    };
    var templateID;
    console.log(nameparam.name);

    this.insertAP(this.templateAccessPointGroup)
      .then(res => {
        apg.name = nameparam.name;
        apg.accessPoints = res;
        console.log(this.moduleId);
        apg.moduleId = this.moduleId;

        this._service
          .createAPG2(this.regionID, this.locationID, apg, this.moduleId)
          .subscribe(
            (res: any) => {
              this.toastr.success('APG successfully Created.');
              console.log(res);
              this.cancelapg();
            },
            err => {
              this.toastr.error('Created APG Fail');
              console.log(err);
            }
          );
      })
      .catch(err => {
        console.log(err); // never called
      });
  }

  // Made function param to be reuseable
  insertAP(dataCollection) {
    var apArr = {
      name: '',
      moduleId: '',
      description: '',
      data: {
        evaluation: {
          allowZero: false,
          passMark: '',
          details: [
            {
              name: 'string',
              options: ['string']
            }
          ]
        }
      }
    };

    var APIdarr = [];

    return Promise.all(
      dataCollection.map(ap => {
        // for(var j=0;j<ap.data.evaluation.details.length;j++){
        //   console.log(ap.name)
        //
        // }

        apArr.name = ap.name;
        apArr.moduleId = this.moduleId;
        // apArr.moduleId = moduleId;
        console.log('module ID :', this.moduleId);
        apArr.data.evaluation = ap.data.evaluation;
        console.log(apArr);
        return new Promise((resolve, reject) => {
          this._service
            .createAP(this.regionID, this.locationID, apArr)
            .subscribe(
              (res: any) => {
                resolve(res._id);
              },
              err => {
                this.toastr.error('Created AP Fail');
                reject(err);
                console.log(err);
              }
            );
        });
      })
    );
  }

  autoResize(item, e, id, name, x) {
    // console.log(e.target.style);
    // console.log(e.target.scrollHeight);
    console.log(id, 'id');
    e.target.style.cssText = 'height:auto';
    e.target.style.height = e.target.scrollHeight + 'px';
    this.scrollCalculation(item, id);
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

    this.addInputValue();
  }

  getSingleAPG() {
    console.log('get single apg');
    return new Promise((resolve, reject) => {
      this.singleAPG()
        .then(apId => {
          console.error('apid===>', apId);
          resolve(apId);
        })
        .catch(err => {
          console.log(err); // never called1
        });
    })
      .then(accespointId => {
        console.log('accespointId===>', accespointId);
        this.getEditAccessPoint(this.regionID, accespointId)
          .then(dataCollection => {
            console.log('successs', dataCollection);
            let tempArr = [];
            this.templateAccessPointGroup = dataCollection;

            this.templateAccessPointGroup.map(item => {
              if (item.data.evaluation.passMark > 0) {
                item.options = true;
              } else {
                item.options = false;
              }
              tempArr.push(item);
              this.templateAccessPointGroup = tempArr;
            });

            this.accessPointArrayString = JSON.stringify(dataCollection);
            this.testArr = dataCollection;

            console.log('evaluation~~~');
            setTimeout(() => {
              this.scrollCalculationAfter(this.templateAccessPointGroup);
            }, 10);
          })
          .catch(err => {
            console.log(err); // never called
          });

        // this.templateAccessPointGroup.push(res)
        // this.accessPointArrayString.push(JSON.stringify(res));
      })
      .catch(err => {
        console.log(err); // never called
      });
  }

  singleAPG() {
    //this.blockUI.start('Loading...');
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this._service.getSingleAPG(this.regionID, this.assessmentId).subscribe(
          (res: any) => {
            //this.blockUI.stop();
            console.log('editapg', res);
            this.model = res;
            console.log(this.model, 'model');
            console.log('resolve res.accessPoints', res.accessPoints);
            resolve(res.accessPoints);
            // this.convertTemplate(res, res._id, res.name);
          },
          err => {
            //this.blockUI.stop();
            console.log(err);
          }
        );
      }, 300);
    });
    // setTimeout(() => {
    //   this._service.getSingleAPG(this.regionID, id)
    //     .subscribe((res: any) => {
    //       //this.blockUI.stop();
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
    //       //this.blockUI.stop();
    //       console.log(err)
    //     })
    // }, 10);
    // setTimeout(() => {
    // }, 1500);
  }

  convertTemplate(apgObj, id, apgName) {
    console.log(apgObj);
    let data = {
      name: apgName
    };
    this.tempSharedApgId = id;
    console.log(data, id);
    //this.blockUI.start('Loading...');
    this._service.convertApgTemplate(id, data).subscribe(
      (res: any) => {
        console.log(res);
        let returnData = JSON.parse(res._body);
        this.singleAPG();
      },
      err => {
        console.log(err);
      }
    );
  }

  getEditAccessPoint(reginId, accesPointId) {
    console.log('asss ==========>>>');
    this.templateAccessPointGroup = [];
    this.checkProperties(this.formObj);
    return Promise.all(
      accesPointId.map(accesPoint => {
        return new Promise((resolve, reject) => {
          this._service.getAccessPoint(reginId, accesPoint).subscribe(
            (res: any) => {
              console.log(res);
              resolve(res);
              // this.templateAccessPointGroup.push(res)
              // this.accessPointArrayString.push(JSON.stringify(res));
            },
            err => {
              console.log(err);
              reject(err);
            }
          );
        });
      })
    );
  }
  idArr = [];
  editAccessmentApg() {
    var id;
    console.log('templateAPGroup', this.templateAccessPointGroup);
    console.log('testArr', this.testArr);
    return new Promise((resolve, reject) => {
      this.templateAccessPointGroup.forEach((item, index) => {
        console.log(item, index);
        setTimeout(() => {
          if (item._id == undefined) {
            this.createAPonly(item, (this.model as any).moduleId);
          } else {
            console.log('update ap');
            this.updateAPOnly(item._id, item);
            this.idArr.push(item._id);
          }
        }, 200);
      });
      resolve();
    }).then(() => {
      console.log('idArr', this.idArr);
      setTimeout(() => {
        this.updateEVApgOnly(this.idArr);
      }, 1000);
      // this.updateEVApgOnly(idArr)
    });
  }

  createAPonly(ap, moduleId) {
    console.log('Create Ap', ap);
    var createap = {};
    createap['name'] = ap.name;
    createap['description'] = ap.description;
    createap['moduleId'] = moduleId;
    createap['data'] = {
      evaluation: {
        allowZero: ap.data.evaluation.allowZero,
        passMark: ap.data.evaluation.passMark,
        details: ap.data.evaluation.details
      }
    };
    console.log(createap);
    this._service.createAP(this.regionID, this.locationID, createap).subscribe(
      (res: any) => {
        console.log(res);
        this.idArr.push(res._id);
      },
      err => {
        console.log(err);
      }
    );
  }

  updateEVApgOnly(idArray) {
    // setTimeout(() => {
    console.log('UPDATE');
    console.log(idArray);
    (this.model as any).accessPoints = idArray;
    this._service
      .updateAPG(this.regionID, (this.model as any)._id, this.model, null)
      .subscribe(
        (res: any) => {
          console.log(res);
          this.cancelapg();
        },
        err => {
          console.log(err);
        }
      );
    // }, 200);
  }
}
