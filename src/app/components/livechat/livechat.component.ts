import { Component, OnInit } from '@angular/core';
declare var LiveAgent: any;

@Component({
  selector: 'app-livechat',
  templateUrl: './livechat.component.html',
  styleUrls: ['./livechat.component.css']
})
export class LivechatComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    let scriptUrl = 'https://pagewerkz.ladesk.com/scripts/track.js';
    let node = document.createElement('script');
    node.src = scriptUrl;
    node.id = 'la_x2s6df8d';
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    node.onload = function(e) {
      document.body.innerHTML += '<div id="chatButton"></div>';
      LiveAgent.createButton('7f6cde40', document.getElementById('chatButton'));
    };
    document.getElementsByTagName('head')[0].appendChild(node);
  }
}
