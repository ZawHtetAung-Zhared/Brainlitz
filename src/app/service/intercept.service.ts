import { Injectable, ViewContainerRef } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Injectable()
export class InterceptService implements HttpInterceptor {
  @BlockUI() blockUI: NgBlockUI;
  constructor(private router: Router) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.blockUI.start('Loading...');
    return next.handle(request).do(
      (res: HttpEvent<any>) => {
        if (res instanceof HttpResponse) {
          // do something here
          this.blockUI.stop();
        }
      },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          this.blockUI.stop();
          // redirect to log in page
          if (err.status === 401) {
            localStorage.clear();
            localStorage.setItem('redirect', 'true');
            this.router.navigateByUrl('/login', {});
          }
        }
      }
    );
  }
}
