import { Component, OnInit , Input, ElementRef, OnChanges } from '@angular/core';

@Component({
  selector: 'read-more',
  templateUrl: './readmore.component.html',
  styleUrls: ['./readmore.component.css']
})
export class ReadmoreComponent implements OnInit {
  @Input() text: string;
  @Input() maxLength: number = 140;
  currentText: string;

  public isCollapsed: boolean = true;
  public hideToggle:boolean = false;

  constructor( private elementRef: ElementRef ) { }

  ngOnInit() {
  }

  toggleView(){ 	
  	this.isCollapsed = !this.isCollapsed;
    this.determineView();
    this.hideToggle = !this.hideToggle;
  }

  determineView() {
  	// console.log("text length",this.text.length)
    if (this.text.length <= 170) {
        this.currentText = this.text;
        this.isCollapsed = false;
        // this.hideToggle = true;
        return;
    }
    // this.hideToggle = false;
    if (this.isCollapsed == true) {
        this.currentText = this.text.substring(0, this.maxLength) + "...";
    } else if(this.isCollapsed == false)  {
        this.currentText = this.text;
    }
  }
  ngOnChanges() {
	this.determineView();       
  }

}
