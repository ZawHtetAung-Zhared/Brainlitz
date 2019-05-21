import { Component, OnInit,Input ,Output,EventEmitter} from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-flexi',
  templateUrl: './flexi.component.html',
  styleUrls: ['./flexi.component.css']
})
export class FlexiComponent implements OnInit {
  public yPos: any;
  public xPos: any;
  public arrTop: any;
  public arrLeft: any;
  public arrClasses: any;
  conflictBoxShow:boolean=false;
  public styleArr={};
  // lessionIdArr:any=[];
  public modalReference: any;

  constructor() { }
  @Input() flexyObj;
  @Input() showcb;
  
  @Output() lessionIdArr:any=[];
  @Output() checkIdArr = new EventEmitter<number>();
  @Output() passDataconflictBoxShow =new EventEmitter();

  ngOnInit() {
    console.log(this.flexyObj)
    console.log(this.showcb)
  }

  lessonCheck(id){
    console.log(id);
    console.log(this.lessionIdArr)
    console.log(this.lessionIdArr.indexOf(id))
    console.log(this.lessionIdArr.includes(id))
    if(this.lessionIdArr.includes(id)){
      this.lessionIdArr.splice(this.lessionIdArr.indexOf(id), 1);
    }else{
      this.lessionIdArr.push(id);
    }
    this.checkIdArr.emit(this.lessionIdArr);
    console.log(this.lessionIdArr.length)
  }

  
  clickId:any;
  showConflictBox(e,id){
    this.clickId=id;
    console.log(this.showcb);
    
    if(this.conflictBoxShow && this.showcb){
      this.passDataconflictBoxShow.emit(false);
      
      this.conflictBoxShow=false;
    }else{
      this.passDataconflictBoxShow.emit(true);
      this.conflictBoxShow=true;
      setTimeout(function(){
        console.log($('.conflictPopUp'));
        $('.conflictPopUp').show();
      })
    }
    console.error(this.conflictBoxShow)
    this.xPos = (e.clientX-173)-65;
    this.yPos = (e.clientY-150)+85;
    this.arrTop = (e.clientY-150)+68;
    this.arrLeft = (e.clientX-173)-65;
    this.styleArr = {
      'top': this.yPos + "px",
    }
  }
}
