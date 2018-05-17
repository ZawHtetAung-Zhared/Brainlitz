import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from './location'
import { FormsModule,FormGroup,FormControl } from '@angular/forms';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent implements OnInit {
  	
  	@ViewChild('f') form: any;
	public location: Location;
	model: Location = new Location();

	constructor() { }

	ngOnInit() {
		
	}
	
	onSubmit(val) {
		console.log('hi', val)
		if (this.form.valid) {
	      console.log("Form Submitted!");
	      this.form.reset();
	    }
	}

}
