import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  Input,
  HostListener,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'block-temp',
  styles: [
    `
      :host {
        text-align: center;
        color: orange;
      }
      .progress-bar {
        display: flex;
        width: 240px;
        height: 8px;
        background: #edeef0;
        border-radius: 99px;
        margin-top: 44px;
      }
      .block-ui-template {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .progress {
        width: 0%;
        height: 100%;
        background: #B1B1B3;
        border-radius: 99px;
        animation: linear infinite;
        animation-name: big1;
        animation-duration: 4s;
      }
      .white-bg {
        width: 100vw;
        height: 100vh;
        background: white;
        animation: animated-popup 0.2s;
        transition: 1s;
      }

      @keyframes animated-popup {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      @keyframes big1 {
        0% {
          width: 0%:
        }
        100% {
          width: 100%;
        }
      }
    `
  ],
  template: `
    <div class="white-bg" id="white-id">
      <div class="block-ui-template">
        <img style="width:240px; height:auto" src="{{ orgLogo }}" />
        <div class="progress-bar">
          <div class="progress"></div>
          <div style="width:50%;"></div>
        </div>
      </div>
    </div>
  `
})
export class BlockTemplateComponent implements OnInit {
  public orgLogo: any;
  ngOnInit(): void {
    this.orgLogo = localStorage.getItem('OrgLogo');
    // this.orgLogo = "./assets/img/classWerkz_word@2x.png";
    // this.orgLogo = '';
  }
}
