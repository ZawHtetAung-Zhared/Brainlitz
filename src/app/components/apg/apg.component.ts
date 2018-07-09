import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { apgField } from './apg';
import { apField } from './apg';
import { appService } from '../../service/app.service';
import { ToastsManager } from 'ng5-toastr/ng5-toastr';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-apg',
  templateUrl: './apg.component.html',
  styleUrls: ['./apg.component.css']
})
export class ApgComponent implements OnInit {

  	constructor(private modalService: NgbModal,private _service: appService, public toastr: ToastsManager, public vcr: ViewContainerRef) { 
  		this.toastr.setRootViewContainerRef(vcr);
  	}

  	public modalReference: any;
  	public closeResult: any;
  	apgField: apgField = new apgField();
  	apField: apField = new apField();
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

  	ngOnInit() {
	  	this.getAllAP();
	  	this.getAllTemplate();
	  	this.getAllModule();
	  	this.getAllAPG();
  	}

  	open(content){
  		this.customAP = false;
  		this.templateAPG = false;
  		this.getAllAP();
  		this.apArray = [];
  		this.newAPList = [];
  		this.customCheck = false;
  		this.templateAPG = false;
  		this.templateChecked = false;
      this.createButton = true;
      this.updateButton = false;
      this.checkedModuleID = [];
      this.checkedAPid = [];
      this.newAPListId = [];
  		this.apgField = new apgField();
	  	this.modalReference = this.modalService.open(content, { backdrop:'static', windowClass: 'animation-wrap'});
	    this.modalReference.result.then((result) => {
	    	this.apgField = new apgField();
	    	this.apField = new apField();
		  this.closeResult = `Closed with: ${result}`
	  	}, (reason) => {
	  		this.apgField = new apgField();
	  		this.apField = new apField();
	  	  this.closeResult = `Closed with: ${reason}`;
	  	});
  	}

  	radioEvent(e, type){
	  	if(type == 'custom'){
	  		this.customAP = true;
	  		this.newAP = false;
	  		this.templateAPG = false;
	  		this.existAP = false;
	  		this.newAPshow = false;
        this.apgField.templateId = '';
	  	}
	  	else if(type == 'template'){
	  		this.customAP = false;
	  		this.templateAPG = true;
        this.customCheck = false;
        this.existAP = false;
	  	}
	  	else if(type == 'newap'){
	  		this.newAP = true;
	  		this.existAP = false;
	  		this.newAPshow = false;
	  	}
	  	else if(type == 'existap'){
	  		this.newAP = false;
	  		this.existAP = true;
	  		this.newAPshow = false;
	  	}
	  	else {
	  		console.log('error')
	  	}
	}

	clickTab(type){
    	this.viewType = type;
  	}
  	
  	createAP(formData){
  		console.log(formData);
  		let data = {
      		"name": formData.name,
      		"description": formData.desc,
      	}
        this.customCheck = false;
        this.checkedAPid = [];
      	this._service.createAP(this.regionID,data)
		    .subscribe((res:any) => {
		      	console.log('success post',res);
		      	this.toastr.success('Successfully AP Created.');
		      	this.getAllAP();
		      	res.checked = true;
		      	this.newAPList.push(res);
		      	this.newAPListId.push(res._id);
            this.apArray = this.newAPListId;
		      	this.newAPshow = true;
		      	this.apField = new apField();
		      	;
		    }, err => {
		        this.toastr.error('Created AP Fail');
		        console.log(err)
		    })
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

  	createAPG(formData, type){
  		console.log(formData)
      let data;
      if(!formData.templateId){
          data = {
            'name': formData.name,
            'description': formData.desc,
            'moduleId': formData.moduleId,
            'accessPoints': this.apArray        
          }
        }
  		if(type == 'create'){
        console.log('create',data)
        this.newAPList = [];
        this.modalReference.close();
        this.blockUI.start('Loading...');
        this._service.createAPG(this.regionID, data, formData.templateId)
          .subscribe((res:any) => {
              console.log('success post',res);
              this.toastr.success('Successfully APG Created.');
              this.getAllAPG();
              this.blockUI.stop();
          }, err => {
              this.toastr.error('Created APG Fail');
              console.log(err)
          })  
      }
      else {
        console.log('update', data)
        this.newAPList = [];
        this.modalReference.close();
        this.blockUI.start('Loading...');
        this._service.updateAPG(this.regionID, this.editId, data, formData.templateId)
          .subscribe((res:any) => {
              console.log('success update',res);
              this.toastr.success('Successfully APG Updated.');
              this.getAllAPG();
              this.blockUI.stop();
          }, err => {
              this.toastr.error('Updated APG Fail');
              console.log(err)
          }) 
      }
	
  	}

  	getAllAP(){
  		this._service.getAllAP(this.regionID)
	    .subscribe((res:any) => {
	    	console.log('APLists' ,res)
	    	this.apList = res;
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
  		this._service.getAllAPG(this.regionID)
	    .subscribe((res:any) => {
	    	console.log('apgLists' ,res)
	    	this.apgList = res;
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
      this.modalReference = this.modalService.open(alertDelete, { backdrop:'static', windowClass: 'animation-wrap'});
      this.modalReference.result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Closed with: ${reason}`;
      });
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

  	editAPG(content, id){
  		this.getAllTemplate();
  		this.getAllAP();
      this.apgField = new apgField();
  		this.customAP = false;
  		this.templateAPG = false;
  		this.existAP = false;
	  	this.newAPshow = false;
      this.newAP = false;
      this.createButton = false;
      this.updateButton = true;
	  	this.checkedModuleID = [];
	  	this.checkedAPid = [];
      this.apArray = [];
      //this.checkedTemplateID = [];
      this.checkedAPid = [];
  		this.modalReference = this.modalService.open(content,{ backdrop:'static', windowClass:'animation-wrap'});
  		this._service.getSingleAPG(this.regionID, id)
  		.subscribe((res:any) => {
  			console.log('editapg' ,res)
  			for(var i in this.moduleList){
  				if(this.moduleList[i]._id == res.moduleId){
  					this.checkedModuleID.push(res.moduleId);
  				}
  			}
  			//if(res.templateId){
         // this.getAllAP();
         // this.customAP = true;;
  			//	this.customCheck = false;
  				//this.templateAPG = true;
          //this.existAP = true;
  				//this.templateChecked = true;
          //for(var i in this.templateList){
           // if(this.templateList[i]._id == res.templateId){
            //  this.checkedTemplateID.push(this.templateList[i]._id)
            //  console.log('equal template id', this.templateList)
           // }
          //}
  			//}else {
          if(res.accessPoints == ''){
            this.customCheck = false;
            this.existAP = false;
          }
          else {
            this.customCheck = true;
            this.existAP = true;
          }
  				this.customAP = true;
  				this.templateChecked = false;
  				if(this.newAP == false){
            for(var i in this.apList){
              for(var j in res.accessPoints){
                if(this.apList[i]._id == res.accessPoints[j]){
                  this.checkedAPid.push(this.apList[i]._id)
                  this.apArray = this.checkedAPid;
                  console.log(this.apArray)
                }
              }
            }
          }
          else {
            this.apArray = [];
          }
  			//}
  			this.apgField = res;
        this.editId = id;
  		}, err => {
	        console.log(err)
	    })
  	}


  	convertTemplate(id){
      console.log(id)
      this._service.createConvertAPG(id)
      .subscribe((res:any) => {
        console.log('convertapg' ,res)
        this.toastr.success('Successfully converted from APG to template.');
      }, err => {
          console.log(err)
        })
  	}

}
