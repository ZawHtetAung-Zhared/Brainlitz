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
import { catchError, retry, retryWhen, shareReplay } from 'rxjs/operators';

@Injectable()
export class InterceptService implements HttpInterceptor {
  @BlockUI() blockUI: NgBlockUI;
  private err_status;
  private isOnline;
  constructor(private router: Router) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.isOnline = Observable.merge(
      Observable.of(navigator.onLine),
      Observable.fromEvent(window, 'online').map(() => true),
      Observable.fromEvent(window, 'offline').map(() => false)
    );
    this.blockUI.start('Loading...');
    return next
      .handle(request)
      .do(
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
      )
      .pipe(
        retryWhen(errors => {
          this.blockUI.stop();
          errors.subscribe(data => {
            this.err_status = data.status;
          });
          // redirect to log in page
          if (this.err_status === 401) {
            localStorage.clear();
            localStorage.setItem('redirect', 'true');
            this.router.navigateByUrl('/login', {});
          } else if (this.err_status != 0) {
            return errors.switchMap((x: any) => {
              return Observable.throw(x);
            });
          } else {
            this.isOnline.subscribe(data => {
              if (data == true) {
                return errors.switchMap((x: any) => {
                  return Observable.of(x);
                });
              }
            });
            return this.isOnline;
          }

          // return this.refresh(errors);
        })
      );
  }

  refresh(obs: Observable<any>): Observable<any> {
    return obs.switchMap((x: any) => {
      if (x.status == 0) {
        this.isOnline.subscribe(data => {
          if (data == true) {
            return Observable.of(x);
          }
        });
        return this.isOnline.delay(1000);
        // return Observable.of(x);
      }
      return Observable.throw(x);
    });
  }
}
