import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../environments/environment';
declare var LiveAgent: any;

@Component({
  selector: 'app-livechat',
  templateUrl: './livechat.component.html',
  styleUrls: ['./livechat.component.css']
})
export class LivechatComponent implements OnInit {
  @Input() location: string;
  @Input() regionData: object;
  @Input() appname: string;
  @Input() userData: object;

  public livechatDisabled = environment.livechatDisabled;

  constructor() {}

  ngOnInit() {
    // this.liveChatAgent();
    if (this.livechatDisabled == false) {
      this.liveChat();
    }
  }

  ngOnChanges() {
    // this.liveChat();
  }

  liveChat() {
    setTimeout(() => {
      console.log('liveChatAgent ~~~', this.appname, this.userData);
      if (this.userData == undefined) {
        this.userData = {
          id: '',
          role: '',
          name: '',
          email: ''
        };
      }
      const regionData = {
        id: '',
        name: ''
      };
      this.location = this.location == undefined ? '' : this.location;
      this.regionData =
        this.regionData == undefined ? regionData : this.regionData;

      this.liveChatAgent(
        this.appname,
        this.userData,
        this.regionData,
        this.location
      );
    }, 1000);
  }

  liveChatAgent(appname, userData, regionData, location) {
    //for live chat button
    console.log(regionData);
    const head = document.getElementsByTagName('head')[0];
    const livechatBtn = document.getElementById('livechat');
    const requiredInfo =
      'OrganizationName=' +
      appname +
      ',' +
      'UserID=' +
      userData.userId +
      ',' +
      'UserName=' +
      userData.name +
      ',' +
      'UserEmail=' +
      userData.email +
      ',' +
      'UserRole=' +
      userData.role +
      ',' +
      'RegionID=' +
      regionData.id +
      ',' +
      'RegionName=' +
      regionData.name;
    console.log('requiredInfo~~~', requiredInfo);
    let scriptUrl = 'https://pagewerkz.ladesk.com/scripts/track.js';
    let node = document.createElement('script');
    node.src = scriptUrl;
    // node.id = 'la_x2s6df8d';
    node.id = 'la_x2s6df8d';
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    node.onload = function(e) {
      console.log(appname, userData, regionData, location);
      livechatBtn.innerHTML += '<div id="chatButton"></div>';
      LiveAgent.createButton(
        '02y1jb4z',
        document.getElementById('chatButton'),
        requiredInfo
      );
    };
    head.appendChild(node);
  }
}
