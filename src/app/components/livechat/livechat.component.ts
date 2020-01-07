import { Component, OnInit, Input } from '@angular/core';
declare var LiveAgent: any;

@Component({
  selector: 'app-livechat',
  templateUrl: './livechat.component.html',
  styleUrls: ['./livechat.component.css']
})
export class LivechatComponent implements OnInit {
  @Input() location: string;
  @Input() region: string;
  @Input() appname: string;
  @Input() userData: object;

  constructor() {}

  ngOnInit() {
    // this.liveChatAgent();
    this.liveChat();
  }

  ngOnChanges() {
    this.liveChat();
  }

  liveChat() {
    setTimeout(() => {
      console.log('liveChatAgent ~~~', this.appname, this.userData);
      if (this.userData == undefined) {
        this.userData = {
          name: '',
          email: ''
        };
      }
      this.location = this.location == undefined ? '' : this.location;
      this.region = this.region == undefined ? '' : this.region;

      this.liveChatAgent(
        this.appname,
        this.userData,
        this.region,
        this.location
      );
    }, 1000);
  }

  liveChatAgent(appname, userData, region, location) {
    //for live chat button
    const head = document.getElementsByTagName('head')[0];
    const livechatBtn = document.getElementById('livechat');
    let scriptUrl = 'https://pagewerkz.ladesk.com/scripts/track.js';
    let node = document.createElement('script');
    node.src = scriptUrl;
    node.id = 'la_x2s6df8d';
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    node.onload = function(e) {
      console.log(appname, userData, region, location);
      livechatBtn.innerHTML += '<div id="chatButton"></div>';
      LiveAgent.createButton(
        '02y1jb4z',
        document.getElementById('chatButton'),
        appname,
        userData.name,
        userData.email,
        region,
        location
      );
    };
    head.appendChild(node);
  }
}
