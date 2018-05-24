import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(router: Router) { 
      // router.events.subscribe((url:any) => console.log(url));
      console.log(router.events);  // to print only path eg:"/login"
}

  ngOnInit() {
  	// console.log(this.route.url);
  }

}
