import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { Template } from './template';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgModel, FormsModule, FormGroup, FormControl } from '@angular/forms';
import { appService } from '../../service/app.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastsManager } from 'ng5-toastr/ng5-toastr';
// import { Template } from './template';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  @ViewChild('apForm') yourForm: NgModel;
  public regionID = localStorage.getItem('regionId');
  public locationID = localStorage.getItem('locationId');
  public isUpdate: boolean = false;
  public isempty: boolean = false;
  public ispublic: boolean = false;
	public iscreated: boolean = false;
	private modalReference: NgbModalRef;
	closeResult: string;
  public item:any = {};
  // apField: apField = new apField();
  Template: Template = new Template();
  public moduleLists:any;
  public apLists:any;
	public tempLists:any;
  public currentId: any;
  public templateName: any;
  public singleTemplate: any;
  public singleTemplateName: any;
  public singleTemplateDesc: any;
  public checkedAP: any = [];
  public newcheckedAP: any = [];
  public isAP: any;
  public newAPs: any = [];
  public newApCount: any = [];
  public tempApCount: any = [];
  public demoApCount: any = [];
  public singleAP: any = [];
  public lol: any;
  @BlockUI() blockUI: NgBlockUI;

  constructor(private modalService: NgbModal, private _service: appService, public toastr: ToastsManager, vcr: ViewContainerRef) { 
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.getAllTemplate();
    this.getAllModule();
  }

  getAllAp(id){
    console.log(this.lol)
    console.log(this.item.accessPoints)
    this.newAPs = [];
    this._service.getAllAPmodule(this.regionID, id)
    .subscribe((res:any) => {
      this.blockUI.stop();
      console.log('all ap => ', res)
      this.apLists = res;
      for(let i = 0; i < this.apLists.length; i++){
        this.apLists[i]["checked"] = (this.apLists[i].checked == undefined) ? false : true; 
      }
      if(this.lol == id){
        let returnAP = JSON.parse(localStorage.getItem("returnAP"))
        // for(let i = 0; i < returnAP.length; i++){
        //   console.log('===> ', returnAP[i])
        //   console.log('===> ', this.apLists)

        //   var selectedAP = this.apLists.filter(function(ap){
        //     console.log(':P')
        //     return ap._id == returnAP[i]
        //   })
        //   selectedAP.checked = true;
        //   console.log(selectedAP)
        // }
        // this.checkedAP = returnAP;
        // console.log('same module', this.apLists)

        for(let k = 0; k < returnAP.length; k++){
          for (var i in this.apLists) {
            if (this.apLists[i]._id == returnAP[k]) {
              console.log('....', this.apLists[i]);
              this.apLists[i]["checked"] = true;
            }
          }
        }
        console.log('same module', this.apLists)
        this.checkedAP = returnAP
      }else{
        console.log('not same module')
        this.checkedAP = [];
      }
    }, err => {
       console.log(err)
    })
  }

  getAllModule(){
    this._service.getAllModule(this.regionID)
    .subscribe((res:any) => {
       console.log(res)
       this.moduleLists = res;
    }, err => {
       console.log(err)
    })
  }

  chooseAPType(type, id){
    this.Template = new Template();
    console.log(this.checkedAP)    
    console.log(this.currentId)    
    console.log(id)    
    this.newAPs = [];
    if(this.currentId != ''){
      console.log('exit')
      // this.checkedAP = [];  
    }else{
      console.log('not exit')
      this.checkedAP = []; 
    }
    this.newcheckedAP = [];
    this.isAP = type;
    if(id != undefined){
      this.getAllAp(id);
    }
  }

  open(content) {
    console.log('open create modal')
    this.isAP = ''
    this.lol = '';
    this.currentId = '';
    this.isUpdate = false;
    localStorage.removeItem('checkedAP');
    console.log(this.apLists)
  	this.item = {};
    this.modalReference = this.modalService.open(content, {backdrop:'static', windowClass:'animation-wrap'});
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;	    
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;	    
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  checkedOptions(option, e){
    console.log(option)
    console.log(this.checkedAP)
    // this.checkedAP = JSON.parse(localStorage.getItem("returnAP"))

    var val = option._id;
    console.log(val)
    console.log(this.checkedAP.includes(val))
    if(this.checkedAP.includes(val) == false){
      console.log('in the if')
      this.checkedAP.push(val)
    }else{
      console.log('in the else')
      val = [val]
      this.checkedAP =this.checkedAP.filter(f => !val.includes(f));
    }
    console.log(this.checkedAP)

    localStorage.setItem('checkedAP',JSON.stringify(this.checkedAP))
    console.log(typeof this.checkedAP.length)
  }

  checkedaps(option, e){
    console.log(option)
    option.checked = false;
    var val = option._id; 

    if(this.newAPs.length == this.newApCount.length){
      console.log('same')
    }else{
      console.log('not same')
      this.newApCount = [];
      for(let i=0; i<this.newAPs.length; i++){
        this.newApCount.push(this.newAPs[i]._id)
      }
    }
    
    
    console.log(this.newApCount)    
    this.tempApCount = this.newApCount;    
    console.log('tempApCount => ', this.tempApCount)
    console.log('demoApCount => ', this.demoApCount)
    // console.log(this.tempApCount.includes(val))


    this.tempApCount = this.tempApCount.filter(f => !this.demoApCount.includes(f));
    
    console.log('tempApCount => ', this.tempApCount)
    if(this.tempApCount.includes(val) == false){
      this.newcheckedAP.push(val);
      this.demoApCount = this.demoApCount.filter(f => !val.includes(f));
      console.log('in the if')
    }else{
      console.log('in the else')
      this.demoApCount.push(val);
      val = [val]
      this.newcheckedAP = this.tempApCount.filter(f => !val.includes(f));
      // this.demoApCount =this.demoApCount.filter(f => !val.includes(f));
    }
    console.log(this.newcheckedAP);
   
  }

  createAP(obj, moduleID){
    
    console.log(this.checkedAP)
    console.log(moduleID)
    obj["moduleId"] = moduleID;
    console.log(obj)
    this._service.createAP(this.regionID, this.locationID, obj)
    .subscribe((res:any) => {
       console.log(res)  
       this.toastr.success('Successfully Created.');
       this.Template = new Template();
       this.iscreated = true;
       this.newAPs.push(res); 
       this.newcheckedAP.push(res._id)
    }, err => {
        console.log(err)
    })
  }

  // selectedOptions() { // right now: ['1','3']
  //   return this.apLists
  //     .filter(opt => opt.checked)
  //     .map(opt => opt._id)
  // }

  createTemplate(data, update, id){
    console.log(data)    
    console.log('___',localStorage.getItem('checkedAP'))    
    console.log(this.newcheckedAP)  
    console.log(this.checkedAP)  
    if(update == true){
      // this.checkedAP = this.newcheckedAP;
      let obj={
        "name": data.name,
        "description": data.description,
        "moduleId": data.moduleId,
        "accessPoints": this.checkedAP
      }
      console.log('update')
      this.modalReference.close();
      
      var bb = JSON.parse(localStorage.getItem("checkedAP"))
      console.log(bb.length)
      if(bb.length == 0){
        bb = this.singleAP
      }
      // this.singleAP = this.singleAP.filter(f => !bb.includes(f));

      if(this.newcheckedAP.length != 0){
        obj.accessPoints = this.newcheckedAP.concat(bb)
      }
      obj["_id"] = id;
      console.log(obj)
      
      this.callUpdate(obj, 'updated')
    }else{
      if(this.newcheckedAP != 0){
        this.checkedAP = this.newcheckedAP;
      }
      let obj={
        "name": data.name,
        "description": data.description,
        "moduleId": data.moduleId,
        "accessPoints": this.checkedAP
      }
      console.log(obj)
      this.modalReference.close();
      this.blockUI.start('Loading...');
      this._service.createTemplate(this.regionID, obj)
      .subscribe((res:any) => {
         console.log(res)
         this.toastr.success('Successfully Created.');
         this.blockUI.stop();
         this.getAllTemplate();
      }, err => {
          this.toastr.error('Create Fail.');
          this.blockUI.stop();
          console.log(err)
      })
    }
  }

  getAllTemplate(){
    this.blockUI.start('Loading...');
    this._service.getAllTemplate(this.regionID, 20, 0)
    .subscribe((res:any) => {
       console.log(res.length)
       console.log(res)
       this.blockUI.stop();
       this.tempLists = res;
       this.isempty = (res.length === 0) ? true : false;       
    }, err => {
        this.blockUI.stop();
        console.log(err)
    })
  }

  deleteModal(deletemodal, id, tempName){
    console.log(id, tempName)
    this.templateName = tempName;
    this.currentId = id;
    this.modalReference = this.modalService.open(deletemodal, {backdrop:'static', windowClass:'animation-wrap'});
  }

  deleteTemplate(tempid){
    this.blockUI.start('Loading...');
    this.modalReference.close();
    this._service.deleteTemplate(this.regionID, this.currentId)
    .subscribe((res:any) => {
        this.blockUI.stop();
        this.toastr.success('Successfully Deleted.');
        console.log(res)
        this.getAllTemplate();
    }, err => {
        this.blockUI.stop();
        this.toastr.error('Delete Fail.');
        console.log(err)
    })
  }

  getsingleTemplate(id){  
    this._service.getSingleTemplate(this.regionID, id)
    .subscribe((res:any) => {
        this.item = res;
        console.log(this.item)
        // this.singleEditTemp = res;
        const accessPoints = res.accessPoints;
        this.checkedAP = res.accessPoints;
        console.log(accessPoints)
        console.log(this.apLists)
        for(let i = 0; i < accessPoints.length; i++){
          var hello = this.apLists.filter(function(ap){
            return ap._id == accessPoints[i]
          })
          // this.isAvailable = true;
          console.log(hello[0])
          hello[0].checked = true;
          console.log(hello)
        }

        this.blockUI.stop();
    }, err => {
        console.log(err)
    })
  }

  shareModal(sharemodal, id){
    console.log(id)
    this.modalReference = this.modalService.open(sharemodal, {backdrop:'static', windowClass:'animation-wrap'});
    // this.getsingleTemplate(id);
    this.blockUI.start('Loading...');   
    this._service.getSingleTemplate(this.regionID, id)
    .subscribe((res:any) => {
        // this.item = res;
        console.log(res);
        this.item = res;
        this.ispublic = res.public;
        console.log(this.ispublic)
        this.singleTemplate = res;
        this.singleTemplateName = res.name;
        this.singleTemplateDesc = res.description;
        this.blockUI.stop();
    }, err => {
        console.log(err)
        this.blockUI.stop();
    })
  }

  shareTemplate(data, state){
    console.log(data)
    data.public = state;
    this.singleTemplate['public'] = data.public
    console.log(this.singleTemplate)   
    this.modalReference.close(); 
    if(state == true){
      this.callUpdate(this.singleTemplate, 'shared');
    }else{
      this.callUpdate(this.singleTemplate, 'unshared');
    }
  }

  callUpdate(obj, status){
    this.blockUI.start('Loading...');
    this._service.updateSingleTemplate(this.regionID, obj)
    .subscribe((res:any) => {
        console.log(res)
        this.getAllTemplate();
        this.toastr.success('Successfully '+ status + '.');
        this.blockUI.stop();
    }, err => {
        this.toastr.success(status + ' Fail.');
        this.blockUI.stop();
        console.log(err)
    })
  }

  editTemplate(id, module, content){
    console.log('edit template', module)
    this.checkedAP = [];
    localStorage.setItem('checkedAP',JSON.stringify(this.checkedAP))
    this.newcheckedAP = []
    this.lol = module;
    
    this.isUpdate = true;
    this.isAP = 'existing';
    this.currentId = id;
    // console.log(this.apLists)
    
    this.modalReference = this.modalService.open(content, {backdrop:'static', windowClass:'animation-wrap'});    
    
    this._service.getSingleTemplate(this.regionID, id)
    .subscribe((res:any) => {
        this.item = res;
        console.log(this.item)
        const accessPoints = res.accessPoints;
        localStorage.setItem('returnAP',JSON.stringify(res.accessPoints))
        this.singleAP = res.accessPoints;
        this.getAllAp(module);
        // this.checkedAP = [];
        console.log(this.checkedAP)
        console.log(accessPoints)
        console.log(this.apLists)
        // setTimeout(() => {
        //   this.checkedAP = res.accessPoints;
        //   for(let i = 0; i < accessPoints.length; i++){
        //     var hello = this.apLists.filter(function(ap){
        //       return ap._id == accessPoints[i]
        //     })
        //     // this.isAvailable = true;
        //     console.log(hello[0])
        //     hello[0].checked = true;
        //     console.log(hello)
        //   }
        // }, 500);
        

        

        this.blockUI.stop();
    }, err => {
        console.log(err)
    })

    
    
  }
}
