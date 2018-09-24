import { Component, OnInit,ViewContainerRef, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { apgField } from './apg';
import { apField } from './apg';
import { convertField } from './apg';
import { appService } from '../../service/app.service';
import { ToastsManager } from 'ng5-toastr/ng5-toastr';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
declare var $:any;

@Component({
  selector: 'app-apg',
  templateUrl: './apg.component.html',
  styleUrls: ['./apg.component.css']
})
export class ApgComponent implements OnInit {

  	constructor(private modalService: NgbModal,private _service: appService, public toastr: ToastsManager, public vcr: ViewContainerRef) { 
  		this.toastr.setRootViewContainerRef(vcr);
  	}

    public model:any = {};
  	public modalReference: any;
  	public closeResult: any;
  	apgField: apgField = new apgField();
  	apField: apField = new apField();
    convertField: convertField = new convertField();
  	customAP: boolean = false;
  	newAP: boolean = false;
  	existAP: boolean = false;
  	templateAPG: boolean = false;
  	viewType:any = 'apg';
  	public regionID = localStorage.getItem('regionId');
  	apList: any;
  	moduleList: any[] = [];
  	templateList: any;
  	apgList: any;
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
    emptyAP: boolean = false;

    //
    public ismodule: boolean = false;
    public isshare: boolean = false;
    public shareAPG: boolean = false;
    public iscreate: boolean = false;
    public ischecked: any;
    public sharechecked: any;
    public isUpdate: boolean = false;
    public navIsFixed: boolean = false;
    public singleCheckedAPG: boolean = false;
    responseAP: any;
    wordLength:any;

  	ngOnInit() {
	  	// this.getAllAP();
	  	// this.getAllTemplate();
	  	this.getAllModule();
	  	this.getAllAPG();
  	}

    @HostListener('window:scroll', ['$event']) onScroll($event){
      // console.log($event);
      // console.log("scrolling");
      // console.log(window.pageYOffset)
      if(window.pageYOffset > 40){
        console.log('greater than 100')
        this.navIsFixed = true;
      }else{
        console.log('less than 100')
        this.navIsFixed = false;
      }
    } 

    focusMethod(e){
      $('.limit-wordcount').show('slow'); 
    }

    blurMethod(e){
      $('.limit-wordcount').hide('slow'); 
    }

    changeMethod(val : string){
      console.log(val)
      this.wordLength = val.length;
    }

    cancelapg(){
      this.model = {};
      this.iscreate = false;
      this.ismodule = false;
      this.isUpdate = false;
      this.shareAPG = false;
    }

    goToBack(status){
      if(status == 'type'){
        console.log('type')
        localStorage.removeItem('moduleID');
        this.cancelapg();
      }else if(status == 'create'){        
        this.iscreate = false;
        this.isshare = false;
        this.ismodule = true;
        this.model = {};
      }else{
        this.isshare = true;
        this.shareAPG = false;
        this.iscreate = false;
      }
    }

    addNewAPG(){
      localStorage.removeItem('moduleID');      
      this.ischecked = '';
      this.model = {};
      this.ismodule = true;
      this.isUpdate = false;
    }

    createNewAPG(status){
      if(status == 'create'){
        this.model = {};
        this.iscreate = true;
      }else{
        this.sharechecked = ''
        this.shareAPG = true;
        this.getAllTemplate();
      }
      this.isshare = false;
    }

    

    getsingleTemplate(id){  
      this._service.getSingleTemplate(this.regionID, id)
      .subscribe((res:any) => {
        this.singleCheckedAPG = res;
        console.log(res)
      }, err => {
        console.log(err)
      })
    }

    setShareAPG(obj){
      console.log(this.singleCheckedAPG)

      let data = this.singleCheckedAPG;

      this._service.updateSingleTemplate(this.regionID, data)
      .subscribe((res:any) => {
          console.log(res)
          this.toastr.success('Successfully '+ status + '.');
          this.blockUI.stop();
          this.cancelapg();
          this.getAllAPG();
      }, err => {
          this.toastr.success(status + ' Fail.');
          this.blockUI.stop();
          console.log(err)
      })
    }

    chooseModuleType(val, name){
      console.log(name)
      this.ischecked = val;
      localStorage.setItem('moduleID', val);
      setTimeout(() => {
        this.ismodule = false;
        this.isshare = true;
        console.log('...')
      }, 300);
    }

    chooseShareAPG(val,name){
      console.log(val)
      this.sharechecked = val;
      this.getsingleTemplate(this.sharechecked);
    }

    createapgs(data, update){
      console.log(update)
      var templateID;
      console.log(data)
      if(update == false){
        console.log('create')
        var moduleId = localStorage.getItem('moduleID')
        data["moduleId"] = moduleId;
         this._service.createAP(this.regionID,data)
         .subscribe((res:any) => {
           this.toastr.success('Successfully AP Created.');
           data["accessPoints"] = [res._id]
           console.log(data)
           this._service.createAPG(this.regionID,data, templateID, moduleId)
          .subscribe((res:any) => {
            this.toastr.success('Successfully APG Created.');
            console.log(res)
            this.cancelapg();
            this.getAllAPG();
          }, err => {
            this.toastr.error('Created APG Fail');
            console.log(err)
          });
         }, err => {
           this.toastr.error('Created AP Fail');
           console.log(err)
         });

      }else{
        console.log('update')
        console.log(data)
        this.blockUI.start('Loading...');
        this._service.updateAPG(this.regionID, data._id , data, templateID)
          .subscribe((res:any) => {
              console.log('success update',res);
              this.toastr.success('Successfully APG Updated.');
              this.cancelapg();
              this.getAllAPG();
              this.blockUI.stop();
          }, err => {
              this.toastr.error('Updated APG Fail');
              console.log(err)
          })
      }
    }

    apgPublicShare(apgID){
      console.log(apgID)
      this.singleAPG(apgID, 'share');
    }

    onclickUpdate(id){
      console.log(id)
      this.singleAPG(id, 'update');
      this.iscreate = true;
      this.isUpdate = true;
    }

    singleAPG(id, state){
      this.blockUI.start('Loading...');
      this._service.getSingleAPG(this.regionID, id)
      .subscribe((res:any) => {
        this.blockUI.stop();
        console.log('editapg' ,res)
        this.model = res;
        if(state == 'share'){
          console.log(res)
          res['public'] = true;
          console.log(res.name)
          this.convertTemplate(res, res._id, res.name);
        }
      }, err => {
          this.blockUI.stop();
         console.log(err)
      })
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
  	// 	this.customAP = false;
  	// 	this.templateAPG = false;
  	// 	this.apArray = [];
  	// 	this.newAPList = [];
  	// 	this.customCheck = false;
  	// 	this.templateAPG = false;
  	// 	this.templateChecked = false;
   //    this.createButton = true;
   //    this.updateButton = false;
   //    this.checkedModuleID = [];
   //    this.checkedAPid = [];
   //    this.moduleAPList = [];
   //    this.getAccessPoint = [];
  	// 	this.apgField = new apgField();
	  // 	this.modalReference = this.modalService.open(content, { backdrop:'static', windowClass: 'animation-wrap'});
	  //   this.modalReference.result.then((result) => {
	  //   	this.apgField = new apgField();
	  //   	this.apField = new apField();
		 //  this.closeResult = `Closed with: ${result}`
	  // 	}, (reason) => {
	  // 		this.apgField = new apgField();
	  // 		this.apField = new apField();

	  // 	  this.closeResult = `Closed with: ${reason}`;
	  // 	});
  	// }

  	// radioEvent(e, type){
	  // 	if(type == 'custom'){
	  // 		this.customAP = true;
	  // 		this.newAP = false;
	  // 		this.templateAPG = false;
	  // 		this.existAP = false;
	  // 		this.newAPshow = false;
   //      this.apgField.templateId = '';
	  // 	}
	  // 	else if(type == 'template'){
	  // 		this.customAP = false;
	  // 		this.templateAPG = true;
   //      this.customCheck = false;
   //      this.existAP = false;
   //      this.apgField.moduleId = '';
   //      this.apgField = new apgField();
	  // 	}
	  // 	else if(type == 'newap'){
	  // 		this.newAP = true;
	  // 		this.existAP = false;
	  // 		this.newAPshow = false;
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
	  // 	}
	  // 	else if(type == 'existap'){
	  // 		this.newAP = false;
	  // 		this.existAP = true;
	  // 		this.newAPshow = false;
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

	  // 	}
	  // 	else {
	  // 		console.log('error')
	  // 	}
	  // }

	  clickTab(type){
    	this.viewType = type;
  	}
  	
  	createAP(formData){
  		console.log(formData);
  		let data = {
      		"name": formData.name,
      		"description": formData.desc,
          "moduleId": this.moduleId
      	}
        this.customCheck = false;
        this.checkedAPid = [];
      	this._service.createAP(this.regionID,data)
		    .subscribe((res:any) => {
		      	console.log('success post',res);
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
            if(this.moduleId == ''){
              this.toastr.warning('Firstly, you must choose a module.');
            }else{
              this.toastr.error('Created AP Fail');
            }
		        console.log(err)
		    })
  	}

    moduleAP(id){
      this.newAPList = [];
      this.moduleId = id;
      this.getAPofModule(id);
      this.checkedAPid = [];
      this.apArray = [];
    }

  	checkedAP( id, e){
			var cbIdx = this.apArray.indexOf(id);
  		if(e.target.checked == true){
  			if(cbIdx < 0 )
	        this.apArray.push(id);
	        console.log(this.apArray)
  		}
  		else {
  			if(cbIdx >= 0 ){
	         	this.apArray.splice(cbIdx, 1);
	         	console.log(this.apArray)
	      	}
  		}  		
  	}

  	// createAPG(formData, type){
  	// 	console.log(formData)
   //    let data;
   //    if(!formData.templateId){
   //        data = {
   //          'name': formData.name,
   //          'description': formData.desc,
   //          'moduleId': formData.moduleId,
   //          'accessPoints': this.apArray        
   //        }
   //      }
  	// 	if(type == 'create'){
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
    
    getAPofModule(moduleId){
      this._service.getAllAPmodule(this.regionID, moduleId)
      .subscribe((res:any) => {
          console.log('moduleAPLists' ,res)
          this.moduleAPList = res;
          if(this.getAccessPoint){
            if(this.newAP == false){
              for(var j in this.getAccessPoint){
                this.checkedAPid.push(this.getAccessPoint[j])
                this.apArray = this.checkedAPid;
                console.log(this.apArray)
              }
              if(this.tempModuleId != moduleId){
                this.apArray = [];
              }
            }
            else {
              if(this.tempModuleId){
                if(this.tempModuleId != this.apgField.moduleId){
                  if(this.responseAP){
                    if(this.responseAP.moduleId != this.apgField.moduleId){
                      this.apArray = [];
                    }
                  }else{
                    this.apArray = [];
                  }
                }
                else {
                  this.apArray = this.getAccessPoint;
                }
              }
              else {
                for(var j in this.getAccessPoint){
                  if(this.apArray.indexOf(this.getAccessPoint[j]) < 0){
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

  	getAllAP(){
  		this._service.getAllAP(this.regionID)
	    .subscribe((res:any) => {
	    	console.log('APLists' ,res)
	    	this.apList = res;
        if(res.length == 0){
          this.emptyAP = true;
        } else {
          this.emptyAP = false;
        } 
	      }, err => {
	        console.log(err)
	      })
  	}

  	getAllTemplate(){
  		this._service.getAllTemplate(this.regionID)
	    .subscribe((res:any) => {
	    	console.log('templateLists' ,res)
	    	this.templateList = res;
	      }, err => {
	        console.log(err)
	      })
  	}

  	getAllModule(){
  		this._service.getAllModule(this.regionID)
	    .subscribe((res:any) => {
	    	console.log('moduleLists' ,res)
	    	for(var i in res){
	    		if(res[i]._id != null){
	    			this.moduleList.push(res[i]);
	    		}
	    	}

	      }, err => {
	        console.log(err)
	      })
  	}
    
  	getAllAPG(){
      this.blockUI.start('Loading...');
  		this._service.getAllAPG(this.regionID)
	    .subscribe((res:any) => {
	    	console.log('apgLists' ,res)
        this.apgList = res;
        if(res.length == 0){
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

    onclickDelete(id, alertDelete){
      this.deleteId = id;
      this.getAllAPG();
      for(var i in this.apgList){
        if(this.apgList[i]._id == id){
          this.deleteAPG = this.apgList[i].name;
        }
      }
      this.modalReference = this.modalService.open(alertDelete, { backdrop:'static', windowClass: 'deleteModal d-flex justify-content-center align-items-center'});
    }

  	apgDelete(id){
      this.modalReference.close();
      this.blockUI.start('Loading...');
  		this._service.deleteAPG(this.regionID, id)
	    .subscribe((res:any) => {
	    	console.log('deleteapg' ,res)
        setTimeout(() => {
          this.blockUI.stop(); // Stop blocking
        }, 300);
	    	this.toastr.success('Successfully APG deleted.');
	    	this.getAllAPG();
	    }, err => {
	        console.log(err)
	    }) 
  	}
    
  	// editAPG(id, content){
  	// 	this.getAllTemplate();
   //    this.apgField = new apgField();
  	// 	this.customAP = false;
  	// 	this.templateAPG = false;
  	// 	this.existAP = false;
	  // 	this.newAPshow = false;
   //    this.newAP = false;
   //    this.createButton = false;
   //    this.updateButton = true;
   //    this.newAPList = [];
	  // 	this.checkedModuleID = [];
	  // 	this.checkedAPid = [];
   //    this.apArray = [];
  	// 	this.modalReference = this.modalService.open(content,{ backdrop:'static', windowClass:'animation-wrap'});
  	// 	this._service.getSingleAPG(this.regionID, id)
  	// 	.subscribe((res:any) => {
  	// 		console.log('editapg' ,res)
   //      this.getAPofModule(res.moduleId);
   //      this.tempModuleId = res.moduleId;
   //      this.moduleId = res.moduleId;
  	// 		for(var i in this.moduleList){
  	// 			if(this.moduleList[i]._id == res.moduleId){
  	// 				this.checkedModuleID.push(res.moduleId);
  	// 			}
  	// 		}
   //      if(res.accessPoints == ''){
   //        this.customCheck = false;
   //        this.existAP = false;
   //      }
   //      else {
   //        this.customCheck = true;
   //        this.existAP = true;
   //      }
			// 	this.customAP = true;
			// 	this.templateChecked = false;
   //      this.getAccessPoint = res.accessPoints;
  	// 		this.apgField = res;
   //      this.editId = id;
  	// 	}, err => {
	  //       console.log(err)
	  //   })
  	// }

    // clickConvert(id, cTemplate){
    //   this.convertField = new convertField();
    //   this.convertId = id;
    //   this.modalReference = this.modalService.open(cTemplate, { backdrop:'static', windowClass: 'animation-wrap'});
    // }
    
  	convertTemplate(apgObj, id, apgName){
      console.log(apgObj)
      let data = {
          'name': apgName,     
      }
      console.log(data)
      this.blockUI.start('Loading...');
      this._service.convertApgTemplate(id, data).subscribe((res:any) => {
        console.log(apgObj)                
        // this.createapgs(apgObj, true)
      }, err => {
          console.log(err)
      })
  	}

}
