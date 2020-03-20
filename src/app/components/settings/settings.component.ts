import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ViewContainerRef,
  HostListener
} from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ISubscription } from 'rxjs/Subscription';
import { appService } from '../../service/app.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment-timezone';
import * as currency from 'currency-symbol-map/map';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  ngOnInit() {
    console.log('here in setting');
  }

  ngOnDestroy() {}

  ngAfterViewInit() {}
}