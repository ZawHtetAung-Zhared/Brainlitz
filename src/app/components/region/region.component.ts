import { Component, OnInit } from '@angular/core';
import { appService } from '../../service/app.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit {
	private orgID = environment.orgID;
	public regionLists: any;

  constructor(private _service: appService) { }

  ngOnInit() {
  	this.getAllRegion();
  }

  getAllRegion(){
  	console.log(this.orgID)
  	this._service.getAllRegion(this.orgID)
  	// .subscribe((res:any) => {
  	// 	this.regionLists = res;
  	// 	console.log(this.regionLists);
   //  }, err => {
   //  	console.log(err)
   //  })
  }


}
