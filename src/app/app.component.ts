import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { Location } from '@angular/common';
import {
  Http,
  Response,
  RequestOptions,
  Headers,
  URLSearchParams
} from '@angular/http';
import { appService } from './service/app.service';
import { DOCUMENT } from '@angular/platform-browser';

declare var LiveAgent: any;
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  public showSidebar: boolean = true;
  public showHeader: boolean = false;
  public str_res: any;
  public favicon = localStorage.getItem('favicon');
  public appName = localStorage.getItem('appname');
  loadAPI: Promise<any>;
  // public appName = "Hello";

  constructor(
    private titleService: Title,
    private http: Http,
    private _router: Router,
    private _service: appService,
    @Inject(DOCUMENT) private document: any
  ) {
    if (window.location.hash.indexOf('#') === 0) {
      var data = {},
        pairs,
        pair,
        separatorIndex,
        escapedKey,
        escapedValue;
      var queryString = window.location.search.substr(1);
      let pairs = queryString.split('&');
      for (var i = 0; i < pairs.length; i++) {
        pair = pairs[i];
        separatorIndex = pair.indexOf('=');
        if (separatorIndex === -1) {
          escapedKey = pair;
          escapedValue = null;
        } else {
          escapedKey = pair.substr(0, separatorIndex);
          escapedValue = pair.substr(separatorIndex + 1);
        }
        if (escapedKey == 'code') {
          localStorage.setItem('code', escapedValue);
        }
      }
    }

    _router.events.forEach(event => {
      if (event instanceof NavigationStart) {
        this.showSidebar =
          event.url == '/login' ||
          event.url == '/region' ||
          event.url == '/' ||
          event.url == '/category' ||
          event.url == '/courseplan'
            ? (this.showSidebar = false)
            : (this.showSidebar = true);
        this.showHeader =
          event.url == '/login' ||
          event.url == '/' ||
          event.url == '/category' ||
          event.url == '/courseplan'
            ? (this.showHeader = false)
            : (this.showHeader = true);
      }
    });
    console.log(document.location.href);
    let str = document.location.href;
    var start_pos = str.indexOf('//') + 2;
    var end_pos = str.indexOf('/#', start_pos);
    var storeLocal = str.substring(start_pos, end_pos);
    console.log('~~~~~', storeLocal);
    // var redirectURL = storeLocal.split("/").pop();

    if (storeLocal.includes('/')) {
      var str_temp = storeLocal.substr(storeLocal.lastIndexOf('/') + 1);
      this.str_res = str_temp.substring(0, str_temp.indexOf('.'));
    } else {
      this.str_res = storeLocal.substring(0, storeLocal.indexOf('.'));
    }

    console.log('~~~~~', this.str_res);
    localStorage.setItem('appname', this.str_res);

    // var storeLocal = document.location.href.substring(7, document.location.href.indexOf("."));
    if (document.location.href.slice(-5) == 'login') {
      localStorage.setItem('slicePath', this.str_res);
      this._service.getPathLocal();
      this._router.navigateByUrl('/login', { skipLocationChange: true });
    }
  }

  ngOnInit() {
    console.log('favicon', this.favicon);
    this.document
      .getElementById('appFavicon')
      .setAttribute('href', this.favicon);
    // this.document.getElementById('appname').innerHTML = this.appName;
    this.setTitle(this.appName);
    // this.liveChatAgent(this.appName);
  }

  liveChatAgent(appName) {
    //for live chat button
    var locationName = localStorage.getItem('locationName');
    console.log('liveChatAgent works', appName, locationName);
    console.log(this.appName);
    const head = document.getElementsByTagName('head')[0];
    let scriptUrl = 'https://pagewerkz.ladesk.com/scripts/track.js';
    let node = document.createElement('script');
    node.src = scriptUrl;
    node.id = 'la_x2s6df8d';
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    node.onload = function() {
      console.log('livechat onload', appName, locationName);
      LiveAgent.createButton(
        '02y1jb4z',
        document.getElementById('livechat'),
        appName,
        locationName
      );
    };
    head.appendChild(node);
  }

  public setTitle(newTitle: string) {
    console.log('object');
    this.titleService.setTitle(newTitle);
  }

  private scrollPosition: any;
  @HostListener('document:click', ['$event']) documentClick($event): void {
    console.log('DOCUMENT CLICK::::' + this.scrollPosition);
    if (!$('.modal-backdrop')[0]) {
      $('html, body').animate({ scrollTop: this.scrollPosition });
    }
  }
  @HostListener('window:scroll', ['$event']) onScroll($event) {
    if ($('html, body').scrollTop() != 0)
      this.scrollPosition = $('html, body').scrollTop();
  }
}
